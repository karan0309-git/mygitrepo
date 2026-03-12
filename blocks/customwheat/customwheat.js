export default function decorate(block) {
  if (!block) return;

  const children = block.querySelectorAll(':scope > div');

  children.forEach((card, index) => {
    if (index < 6) {
      card.classList.add('card', 'wheat-strategy');

      const h4 = card.querySelector('h4');
      if (h4) h4.classList.add('wheat-strategy-title');

      card.querySelectorAll('p').forEach((para) => {
        para.classList.add('wheat-strategy-text');
      });
    }
  });
}
