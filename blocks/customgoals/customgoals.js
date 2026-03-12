export default function decorate(block) {
  const wrapper = block.children[0];
  if (!wrapper) return;
  wrapper.classList.add('goals-head');
  const firstDiv = wrapper.children[0];
  const secondDiv = wrapper.children[1];
  if (firstDiv) {
    firstDiv.classList.add('goals-title');
  }
  if (secondDiv) {
    secondDiv.classList.add('goals-description');
  }
}
