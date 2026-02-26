/**
 * Initializes the Typed.js text animation for the introduction section.
 */
function initTyped() {
    new Typed(".autoType", {
        strings: ["I'm a Frontend developer.", "I build things for the web."],
        typeSpeed: 60,
        backSpeed: 60,
        loop: true,
    });
}

/**
 * Updates the active navigation link highlight to match the given section ID.
 * @param {NodeList} navLinks - All navigation anchor elements.
 * @param {string} sectionId - The ID of the currently active section.
 */
function updateActiveNavLink(navLinks, sectionId) {
    navLinks.forEach((link) => {
        link.classList.remove("activeMenu");
        link.removeAttribute("aria-current");
    });
    const activeLink = document.querySelector(`nav a[href="#${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add("activeMenu");
        activeLink.setAttribute("aria-current", "page");
    }
}

/**
 * Enables smooth section-by-section scrolling via the mouse wheel.
 */
function initScrollNavigation() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");

    document.addEventListener("wheel", (event) => {
        if (event.ctrlKey || event.metaKey) return;

        event.preventDefault();
        const currentIndex = Math.round(window.scrollY / window.innerHeight);
        const direction = event.deltaY > 0 ? 1 : -1;
        const nextIndex = Math.max(0, Math.min(sections.length - 1, currentIndex + direction));

        window.scrollTo({ top: nextIndex * window.innerHeight, behavior: "smooth" });
        updateActiveNavLink(navLinks, sections[nextIndex].id);
    }, { passive: false });
}

/**
 * Attaches smooth-scroll and active-link behavior to nav anchor clicks.
 */
function initNavLinks() {
    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const targetSection = document.querySelector(link.getAttribute("href"));
            if (targetSection) {
                window.scrollTo({ top: targetSection.offsetTop, behavior: "smooth" });
                updateActiveNavLink(navLinks, targetSection.id);
            }
        });
    });
}

/**
 * Triggers a PDF download for the CV file.
 */
function downloadFile() {
    const link = document.createElement("a");
    link.href = "assets/szentgyorgyhegyi_roland_cv.pdf";
    link.download = "szentgyorgyhegyi_roland_cv.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/**
 * Attaches the CV download handler to the download button.
 */
function initCvDownload() {
    document.getElementById("cv-button").addEventListener("click", downloadFile);
}

/**
 * Shows the selected experience panel and updates the timeline button state.
 * @param {number} contentNumber - 1-based index of the experience entry to show.
 */
function showContent(contentNumber) {
    document.querySelectorAll(".circle-button").forEach((button) => {
        button.classList.remove("active");
        button.setAttribute("aria-pressed", "false");
    });
    document.querySelectorAll(".text-content").forEach((content) => {
        content.classList.remove("active");
        content.setAttribute("aria-hidden", "true");
    });

    const selectedButton = document.getElementById(`btn-${contentNumber}`);
    if (selectedButton) {
        selectedButton.classList.add("active");
        selectedButton.setAttribute("aria-pressed", "true");
    }

    const selectedContent = document.getElementById(`content-${contentNumber}`);
    if (selectedContent) {
        selectedContent.classList.add("active");
        selectedContent.setAttribute("aria-hidden", "false");
    }
}

/**
 * Attaches click handlers to the experience timeline buttons.
 */
function initExperienceTimeline() {
    document.querySelectorAll(".circle-button").forEach((button) => {
        button.addEventListener("click", () => {
            const index = parseInt(button.id.replace("btn-", ""), 10);
            showContent(index);
        });
    });
}

/**
 * Initializes the projects slideshow with auto-advance, navigation controls,
 * dot indicators, and keyboard support.
 */
function initSlideshow() {
    const SLIDE_INTERVAL_MS = 5000;
    let slideIndex = 1;
    let slideInterval;

    function showSlides(n) {
        const slides = document.querySelectorAll(".my-slides");
        const dots = document.querySelectorAll(".dot");

        if (n > slides.length) slideIndex = 1;
        if (n < 1) slideIndex = slides.length;

        slides.forEach((slide) => {
            slide.style.display = "none";
            slide.setAttribute("aria-hidden", "true");
            slide.classList.remove("fade");
        });
        dots.forEach((dot) => {
            dot.classList.remove("active");
            dot.removeAttribute("aria-current");
        });

        slides[slideIndex - 1].style.display = "block";
        slides[slideIndex - 1].setAttribute("aria-hidden", "false");
        slides[slideIndex - 1].classList.add("fade");
        dots[slideIndex - 1].classList.add("active");
        dots[slideIndex - 1].setAttribute("aria-current", "true");
    }

    function startTimer() {
        slideInterval = setInterval(() => { plusSlides(1); }, SLIDE_INTERVAL_MS);
    }

    function resetTimer() {
        clearInterval(slideInterval);
        startTimer();
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
        resetTimer();
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
        resetTimer();
    }

    document.querySelector(".prev").addEventListener("click", () => plusSlides(-1));
    document.querySelector(".next").addEventListener("click", () => plusSlides(1));

    document.querySelectorAll(".dot").forEach((dot, index) => {
        dot.addEventListener("click", () => currentSlide(index + 1));
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            const active = document.activeElement;
            if (active && active.classList.contains("dot")) {
                event.preventDefault();
                const dots = Array.from(document.querySelectorAll(".dot"));
                const index = dots.indexOf(active);
                if (index !== -1) currentSlide(index + 1);
            }
        }
    });

    showSlides(slideIndex);
    startTimer();
}

document.addEventListener("DOMContentLoaded", () => {
    initTyped();
    initScrollNavigation();
    initNavLinks();
    initCvDownload();
    initExperienceTimeline();
    initSlideshow();
});
