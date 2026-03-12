import { createOptimizedPicture } from '../../scripts/aem.js';
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.experts-backtotop');
  if (!btn) return;
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

