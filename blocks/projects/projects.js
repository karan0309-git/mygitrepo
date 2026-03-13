export default function decorate(block) {

  const filter = block.children[0];

  if (!filter) return;

  /* FILTER SECTION */

  filter.classList.add("project-filter");

  const filterDiv = filter.querySelector("div");

  if (filterDiv) filterDiv.classList.add("filter-wrapper");

  const ul = filter.querySelector("ul");

  if (ul) ul.classList.add("filter-list");

  const liItems = filter.querySelectorAll("li");

  const totalFilters = liItems.length - 1;

  /* PROJECT ITEMS */

  const items = Array.from(block.children).slice(1);

  items.forEach((item, index) => {

    if (!item) return;

    item.classList.add("project-item");

    item.dataset.category = String(index % totalFilters);

    const childDivs = item.querySelectorAll(":scope > div");

    childDivs.forEach((div, di) => {

      if (di === 0) {

        div.classList.add("project-img");

        const picture = div.querySelector("picture");

        if (picture) picture.classList.add("project-picture");

      } else if (di === 1) {

        div.classList.add("project-col-2");

      } else if (di === 2) {

        div.classList.add("project-col-3");

      }

    });

  });

  /* FILTER CLICK */

  liItems.forEach((li, i) => {

    li.classList.add("filter-btn");

    if (i === 0) li.classList.add("active");

    li.addEventListener("click", () => {

      liItems.forEach(btn => btn.classList.remove("active"));

      li.classList.add("active");

      const projects = block.querySelectorAll(".project-item");

      // Count how many items match

      let matchCount = 0;

      if (i !== 0) {

        projects.forEach(card => {

          if (card.dataset.category === String(i - 1)) matchCount++;

        });

      }

      const showAll = i === 0 || matchCount === 0;

      // Fade all out first

      projects.forEach(card => {

        card.style.opacity = "0";

      });

      // After fade out, show matching items with stagger fade in

      setTimeout(() => {

        let visibleIndex = 0;

        projects.forEach(card => {

          const matches = showAll || card.dataset.category === String(i - 1);

          if (matches) {

            card.style.display = "";

            const delay = visibleIndex * 80;

            setTimeout(() => {

              card.style.opacity = "1";

            }, delay);

            visibleIndex++;

          } else {

            card.style.display = "none";

            card.style.opacity = "0";

          }

        });

      }, 300);

    });

  });

}

 
