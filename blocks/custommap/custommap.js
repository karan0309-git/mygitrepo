export default function decorate(block) {
  const link = block.querySelector('a');
  if (!link) return;

  const iframe = document.createElement('iframe');
  iframe.src = link.href;
  iframe.loading = 'lazy';
  iframe.style.border = '0';
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = 'no-referrer-when-downgrade';

  block.innerHTML = '';
  block.appendChild(iframe);
}
