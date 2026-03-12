export default function decorate(block) {

  const container = block.children[0];

  const membersWrapper = block.children[1];

  if (!container || !membersWrapper) return;

  /* main container */

  container.classList.add("experts-container");

  /* wrapper for members */

  membersWrapper.classList.add("experts-wrapper");

  const members = membersWrapper.children;

  [...members].forEach((member) => {

    member.classList.add("expert-card");

    const img = member.querySelector("picture");

    const name = member.querySelector("h3");

    if (img) {

      img.classList.add("expert-image");

    }

    if (name) {

      name.classList.add("expert-name");

    }

  });

}
 
