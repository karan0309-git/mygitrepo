const header = document.querySelector("header");
  
  // Listen for scroll events
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header?.classList.add("header-fixed");
    } else {
      header?.classList.remove("header-fixed");
    }
  });
