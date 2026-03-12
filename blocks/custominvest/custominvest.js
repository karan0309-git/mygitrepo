(function () {

  var icons = [

    "fa-briefcase",

    "fa-chart-line",

    "fa-file-alt",

    "fa-piggy-bank"

  ];

  function loadFontAwesome() {

    if (

      document.querySelector('link[href*="font-awesome"]') ||

      document.querySelector('link[href*="fontawesome"]')

    ) {

      return;

    }

    var link = document.createElement("link");

    link.rel = "stylesheet";

    link.href =

      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css";

    document.head.appendChild(link);

  }

  function initInvestmentBlock() {

    loadFontAwesome();

    var block = document.querySelector(".investment.block");

    if (!block) return;

    var imageDiv = null;

    var headingDiv = null;

    var allItems = [];

    // Find image element and walk up to block's direct child

    var imgEl = block.querySelector("img, picture");

    var imageRow = null;

    if (imgEl) {

      var el = imgEl;

      while (el.parentElement && el.parentElement !== block) {

        el = el.parentElement;

      }

      if (el.parentElement === block) {

        imageRow = el;

      }

    }

    if (!imageRow) {

      imageRow = block.children[0];

    }

    // Extract image cell and heading cell from image row

    var imageRowCells = Array.from(imageRow.querySelectorAll(":scope > div"));

    if (imageRowCells.length >= 2) {

      imageDiv = imageRowCells[0];

      headingDiv = imageRowCells[1];

    } else if (imageRowCells.length === 1) {

      imageDiv = imageRowCells[0];

    } else {

      imageDiv = imageRow;

    }

    imageDiv.classList.add("investment-block__image");

    // Process all other direct children (skip the image row)

    var allDirectChildren = Array.from(block.children);

    for (var i = 0; i < allDirectChildren.length; i++) {

      var child = allDirectChildren[i];

      if (child === imageRow) continue;

      var cells = Array.from(child.querySelectorAll(":scope > div"));

      if (cells.length === 0) {

        if (!headingDiv && child.querySelector("h1, h2, h3")) {

          headingDiv = child;

        } else {

          allItems.push(child);

        }

      } else {

        for (var j = 0; j < cells.length; j++) {

          var cell = cells[j];

          if (!headingDiv && cell.querySelector("h1, h2, h3")) {

            headingDiv = cell;

          } else {

            allItems.push(cell);

          }

        }

      }

    }

    block.classList.add("investment-block--initialized");

    var contentWrapper = document.createElement("div");

    contentWrapper.classList.add("investment-block__content");

    if (headingDiv) {

      headingDiv.classList.add("investment-block__heading");

      contentWrapper.appendChild(headingDiv);

    }

    var gridWrapper = document.createElement("div");

    gridWrapper.classList.add("investment-block__grid");

    for (var k = 0; k < allItems.length; k++) {

      var item = allItems[k];

      item.classList.add("investment-block__item");

      var iconClass = icons[k % icons.length];

      var iconBox = document.createElement("div");

      iconBox.classList.add("investment-block__icon");

      var iconEl = document.createElement("i");

      iconEl.classList.add("fas", iconClass);

      iconBox.appendChild(iconEl);

      item.insertBefore(iconBox, item.firstChild);

      gridWrapper.appendChild(item);

    }

    contentWrapper.appendChild(gridWrapper);

    // Clear block and rebuild cleanly

    while (block.firstChild) {

      block.removeChild(block.firstChild);

    }

    block.appendChild(imageDiv);

    block.appendChild(contentWrapper);

  }

  if (document.readyState === "loading") {

    document.addEventListener("DOMContentLoaded", initInvestmentBlock);

  } else {

    initInvestmentBlock();

  }

})();

 
