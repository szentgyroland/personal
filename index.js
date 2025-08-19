document.addEventListener("DOMContentLoaded", () => {
      document.addEventListener("wheel", (event) => {

            if (event.ctrlKey || event.metaKey) {
                  return;
            }

            event.preventDefault();
            const sections = document.querySelectorAll("section");
            const navLinks = document.querySelectorAll("nav a");

            let currentSection = Math.round(window.scrollY / window.innerHeight);
            const direction = event.deltaY > 0 ? 1 : -1;
            const nextSection = Math.max(0, Math.min(sections.length - 1, currentSection + direction));

            window.scrollTo({top: nextSection * window.innerHeight, behavior: "smooth"});

            navLinks.forEach((link) => link.classList.remove("activeMenu"));
            const activeLink = document.querySelector(`nav a[href="#${sections[nextSection].id}"]`);
            if (activeLink) activeLink.classList.add("activeMenu");
      }, {passive: false});

      const navLinks = document.querySelectorAll("nav a");
      navLinks.forEach((link) => {
            link.addEventListener("click", (event) => {
                  event.preventDefault();

                  const targetSection = document.querySelector(link.getAttribute("href"));
                  if (targetSection) {
                        const targetPosition = targetSection.offsetTop;

                        window.scrollTo({top: targetPosition, behavior: "smooth"});

                        navLinks.forEach((l) => l.classList.remove("activeMenu"));
                        link.classList.add("activeMenu");
                  }
            });
      });
});

function showContent(contentNumber) {

      const allButtons = document.querySelectorAll('.circle-button');
      allButtons.forEach(button => {
            button.classList.remove('active');
      });

      const selectedButton = document.getElementById(`btn${contentNumber}`);
      selectedButton.classList.add('active');

      const allContents = document.querySelectorAll('.text-content');
      allContents.forEach(content => {
            content.classList.remove('active');
      });

      const selectedContent = document.getElementById(`content${contentNumber}`);
      selectedContent.classList.add('active');
}
