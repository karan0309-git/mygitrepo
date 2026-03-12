export default function decorate(block) {

  /* first child */

  const container = block.children[0];

  if (!container) return;

  container.classList.add("stats-container");

  const items = container.children;

  [...items].forEach((item) => {

    item.classList.add("stat-item");

    const number = item.querySelector("h3");

    const text = item.querySelector("p");

    if (number) {

      number.classList.add("stat-number");

    }

    if (text) {

      text.classList.add("stat-text");

    }

  });

  /* counter animation */

  const counters = container.querySelectorAll(".stat-number");

  counters.forEach((counter) => {

    const target = counter.innerText.replace(/[^0-9]/g, "");

    let count = 0;

    const updateCounter = () => {

      const speed = 50;

      const increment = Math.ceil(target / speed);

      if (count < target) {

        count += increment;

        counter.innerText = count;

        setTimeout(updateCounter, 40);

      } else {

        counter.innerText = counter.dataset.original || counter.innerText;

      }

    };

    counter.dataset.original = counter.innerText;

    updateCounter();

  });

}

 
