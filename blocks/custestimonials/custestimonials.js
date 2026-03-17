<script>
(() => {
  const sliders = document.querySelectorAll('.custestimonials .eds-slider');
  if (!sliders.length) return;
  sliders.forEach(initSlider);

  function initSlider(root) {
    const viewport = root.querySelector('.eds-viewport');
    const track = root.querySelector('.eds-track');
    const prevBtn = root.querySelector('.eds-prev');
    const nextBtn = root.querySelector('.eds-next');
    const dotsWrap = root.querySelector('.eds-dots');

    if (!viewport || !track) return;

    const autoplay = root.dataset.autoplay === 'true';
    const interval = Number(root.dataset.interval || 5000);
    const loop = root.dataset.loop !== 'false';

    let slides = Array.from(track.children);
    let slideCount = slides.length;
    let perView = 1;
    let index = 0;                // current index in the (possibly cloned) list
    let timer = null;
    let isTransitioning = false;

    function computePerView() {
      if (!slides.length) { perView = 1; return; }
      const slideWidth = slides[0].getBoundingClientRect().width || 1;
      const vpWidth = viewport.getBoundingClientRect().width || slideWidth;
      perView = Math.max(1, Math.round(vpWidth / slideWidth));
    }

    function setupClones() {
      if (!loop || slideCount <= perView) return;
      const head = slides.slice(0, perView).map(s => s.cloneNode(true));
      const tail = slides.slice(-perView).map(s => s.cloneNode(true));
      head.forEach(c => { c.classList.add('eds-clone'); track.appendChild(c); });
      tail.forEach(c => { c.classList.add('eds-clone'); track.insertBefore(c, track.firstChild); });
      slides = Array.from(track.children);
      index = perView; // start at the first real slide
      updateTransform(false);
    }

    function buildDots() {
      dotsWrap.innerHTML = '';
      const pages = Math.max(1, Math.ceil(slideCount / perView));
      for (let i = 0; i < pages; i++) {
        const b = document.createElement('button');
        b.className = 'eds-dot';
        b.type = 'button';
        b.setAttribute('role', 'tab');
        b.setAttribute('aria-label', `Go to slide ${i + 1}`);
        b.addEventListener('click', () => goTo(i * perView));
        dotsWrap.appendChild(b);
      }
      updateDots();
    }

    function updateDots() {
      const pages = dotsWrap.querySelectorAll('.eds-dot');
      const currentPage = Math.floor(getRealIndex() / perView);
      pages.forEach((p, i) => p.setAttribute('aria-selected', String(i === currentPage)));
    }

    function updateTransform(animate = true) {
      if (!slides.length) return;
      const slideW = slides[0].getBoundingClientRect().width || 0;
      if (!animate) track.style.transition = 'none';
      track.style.transform = `translateX(${-index * slideW}px)`;
      if (!animate) requestAnimationFrame(() => { track.style.transition = ''; });
    }

    function getRealIndex() {
      if (!loop) return Math.min(Math.max(index, 0), Math.max(0, slideCount - perView));
      const real = (index - perView) % slideCount;
      return (real + slideCount) % slideCount;
    }

    function next() { goTo(getRealIndex() + perView); }
    function prev() { goTo(getRealIndex() - perView); }

    function goTo(realIdx) {
      if (isTransitioning || !slides.length) return;
      isTransitioning = true;

      if (!loop) {
        index = Math.max(0, Math.min(realIdx, Math.max(0, slideCount - perView)));
        updateTransform(true);
        setTimeout(afterTransition, 420);
        return;
      }

      index = realIdx + perView; // account for leading clones
      updateTransform(true);

      setTimeout(() => {
        const atEnd = realIdx >= slideCount;
        const atStart = realIdx < 0;
        if (atEnd) index = perView;
        if (atStart) index = slideCount + perView - perView;
        updateTransform(false);
        afterTransition();
      }, 420);
    }

    function afterTransition() {
      isTransitioning = false;
      updateDots();
      restartAutoplay();
    }

    function startAutoplay() {
      if (!autoplay || slideCount <= perView) return;
      stopAutoplay();
      timer = setInterval(next, interval);
    }
    function stopAutoplay() { if (timer) { clearInterval(timer); timer = null; } }
    function restartAutoplay() { stopAutoplay(); startAutoplay(); }

    // Keyboard controls
    root.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    });

    // Pause on hover
    root.addEventListener('mouseenter', stopAutoplay);
    root.addEventListener('mouseleave', startAutoplay);

    // Pointer swipe
    let startX = 0, currentX = 0, dragging = false, pointerId = null;
    viewport.addEventListener('pointerdown', (e) => {
      dragging = true; pointerId = e.pointerId;
      startX = currentX = e.clientX; track.style.transition = 'none';
      viewport.setPointerCapture(pointerId);
      stopAutoplay();
    });
    viewport.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      currentX = e.clientX;
      const delta = currentX - startX;
      const slideW = slides[0].getBoundingClientRect().width || 0;
      const base = -index * slideW;
      track.style.transform = `translateX(${base + delta}px)`;
    });
    viewport.addEventListener('pointerup', () => {
      if (!dragging) return;
      dragging = false;
      track.style.transition = '';
      const delta = currentX - startX;
      const threshold = (slides[0].getBoundingClientRect().width || 1) * 0.25;
      if (delta < -threshold) next();
      else if (delta > threshold) prev();
      else updateTransform(true);
      if (pointerId !== null) { try { viewport.releasePointerCapture(pointerId); } catch(_) {} pointerId = null; }
      startAutoplay();
    });

    // Recompute on resize
    const ro = new ResizeObserver(() => {
      const old = perView;
      computePerView();
      if (old !== perView) {
        // remove clones and rebuild
        track.querySelectorAll('.eds-clone').forEach(c => c.remove());
        slides = Array.from(track.children).filter(el => !el.classList.contains('eds-clone'));
        slideCount = slides.length;
        setupClones();
        buildDots();
      } else {
        updateTransform(false);
      }
    });

    // Init
    computePerView();
    setupClones();
    buildDots();
    updateDots();
    updateTransform(false);
    startAutoplay();
    ro.observe(viewport);

    // Buttons
    if (prevBtn) prevBtn.addEventListener('click', prev);
    if (nextBtn) nextBtn.addEventListener('click', next);
  }
})();
</script>
