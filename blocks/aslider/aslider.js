export default function decorate(block) {
 
  const container = block.children[0];
  if (!container) return;
 
  /* main class */
  container.classList.add("nav-head");
 
  /* create track */
  const track = document.createElement("div");
  track.className = "nav-head-2";
 
  const items = [...container.children];
 
  items.forEach((item) => {
    track.appendChild(item);
  });
 
  /* clone items for infinite loop */
  items.forEach((item) => {
    const clone = item.cloneNode(true);
    track.appendChild(clone);
  });
 
  container.appendChild(track);
 
  /* arrows */
  const prev = document.createElement("button");
  prev.className = "nav-arrow prev";
  prev.innerHTML = "‹";
 
  const next = document.createElement("button");
  next.className = "nav-arrow next";
  next.innerHTML = "›";
 
  container.append(prev, next);
 
  let scrollPosition = 0;
  const step = 200;
 
  function moveNext() {
    scrollPosition += step;
 
    if (scrollPosition >= track.scrollWidth / 2) {
      scrollPosition = 0;
    }
 
    track.style.transform = `translateX(-${scrollPosition}px)`;
  }
 
  function movePrev() {
    scrollPosition -= step;
 
    if (scrollPosition < 0) {
      scrollPosition = track.scrollWidth / 2;
    }
 
    track.style.transform = `translateX(-${scrollPosition}px)`;
  }
 
  next.addEventListener("click", moveNext);
  prev.addEventListener("click", movePrev);
 
  /* auto slide */
  setInterval(moveNext, 2500);
 
}
