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

            navLinks.forEach((link) => {
                  link.classList.remove("activeMenu");
                  link.removeAttribute("aria-current");
            });
            const activeLink = document.querySelector(`nav a[href="#${sections[nextSection].id}"]`);
            if (activeLink) {
                  activeLink.classList.add("activeMenu");
                  activeLink.setAttribute("aria-current", "page");
            }
      }, {passive: false});

      const navLinks = document.querySelectorAll("nav a");
      navLinks.forEach((link) => {
            link.addEventListener("click", (event) => {
                  event.preventDefault();

                  const targetSection = document.querySelector(link.getAttribute("href"));
                  if (targetSection) {
                        const targetPosition = targetSection.offsetTop;

                        window.scrollTo({top: targetPosition, behavior: "smooth"});

                        navLinks.forEach((l) => {
                              l.classList.remove("activeMenu");
                              l.removeAttribute("aria-current");
                        });
                        link.classList.add("activeMenu");
                        link.setAttribute("aria-current", "page");
                  }
            });
      });
});

function downloadFile() {
      const link = document.createElement("a");
      link.href = 'assets/szentgyorgyhegyi_roland_cv.pdf';
      link.download = 'szentgyorgyhegyi_roland_cv.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
}


function showContent(contentNumber) {

      const allButtons = document.querySelectorAll('.circle-button');
      allButtons.forEach(button => {
            button.classList.remove('active');
            button.setAttribute('aria-pressed', 'false');
      });

      const allContents = document.querySelectorAll('.text-content');
      allContents.forEach(content => {
            content.classList.remove('active');
            content.setAttribute('aria-hidden', 'true');
      });

      const selectedButton = document.getElementById(`btn${contentNumber}`);
      selectedButton.classList.add('active');
      selectedButton.setAttribute('aria-pressed', 'true');

      const selectedContent = document.getElementById(`content${contentNumber}`);
      selectedContent.classList.add('active');
      selectedContent.setAttribute('aria-hidden', 'false');
}
