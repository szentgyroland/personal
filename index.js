const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

/**
 * Types and deletes each phrase from `data-phrases` in turn.
 * The element is aria-hidden; screen readers read the static copy next to it.
 */
function initTypewriter() {
    const element = document.querySelector("[data-phrases]");
    if (!element || reducedMotion.matches) return;

    const TYPE_DELAY_MS = 70;
    const DELETE_DELAY_MS = 35;
    const HOLD_DELAY_MS = 1800;

    const phrases = element.dataset.phrases.split("|");
    let phraseIndex = 0;
    let length = phrases[0].length;
    let deleting = true;

    function tick() {
        const phrase = phrases[phraseIndex];
        length += deleting ? -1 : 1;
        element.textContent = phrase.slice(0, length);

        let delay = deleting ? DELETE_DELAY_MS : TYPE_DELAY_MS;
        if (!deleting && length === phrase.length) {
            deleting = true;
            delay = HOLD_DELAY_MS;
        } else if (deleting && length === 0) {
            deleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            delay = TYPE_DELAY_MS * 4;
        }
        setTimeout(tick, delay);
    }

    setTimeout(tick, HOLD_DELAY_MS);
}

/**
 * Collapses the navigation behind a menu button on small screens.
 */
function initMobileNav() {
    const header = document.querySelector(".site-header");
    const toggle = header?.querySelector(".menu-toggle");
    const nav = document.getElementById("site-nav");
    if (!toggle || !nav) return;

    const isOpen = () => toggle.getAttribute("aria-expanded") === "true";
    const setOpen = (open) => {
        header.dataset.nav = open ? "open" : "closed";
        toggle.setAttribute("aria-expanded", String(open));
    };

    setOpen(false);
    toggle.hidden = false;

    toggle.addEventListener("click", () => setOpen(!isOpen()));

    nav.addEventListener("click", (event) => {
        if (event.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && isOpen()) {
            setOpen(false);
            toggle.focus();
        }
    });
}

/**
 * Marks the nav link for the section crossing the middle of the viewport
 * with aria-current, which the CSS also uses for the highlight.
 */
function initScrollspy() {
    const links = [...document.querySelectorAll('.site-nav a[href^="#"]')];
    if (links.length === 0) return;

    const setCurrent = (current) => {
        links.forEach((link) => {
            if (link === current) link.setAttribute("aria-current", "true");
            else link.removeAttribute("aria-current");
        });
    };

    const linkBySectionId = new Map(links.map((link) => [link.hash.slice(1), link]));
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) setCurrent(linkBySectionId.get(entry.target.id));
        });
    }, { rootMargin: "-50% 0px -50% 0px" });

    // Observe every section, including ones without a nav link (like the hero),
    // so scrolling back to them clears the highlight.
    document.querySelectorAll("main section[id]").forEach((section) => observer.observe(section));
}

/**
 * Copies `data-copy` to the clipboard and reports the result in the status line.
 */
function initCopyButtons() {
    const status = document.getElementById("copy-status");

    document.querySelectorAll("[data-copy]").forEach((button) => {
        const label = button.dataset.copyLabel;
        let resetTimer;

        button.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(button.dataset.copy);
                button.dataset.copied = "";
                status.textContent = `Copied ${label}.`;
            } catch {
                status.textContent = `Couldn't copy the ${label}. Select it and copy it manually.`;
            }

            clearTimeout(resetTimer);
            resetTimer = setTimeout(() => {
                delete button.dataset.copied;
                status.textContent = "";
            }, 2500);
        });
    });
}

function initFooterYear() {
    document.querySelectorAll("[data-year]").forEach((element) => {
        element.textContent = new Date().getFullYear();
    });
}

initTypewriter();
initMobileNav();
initScrollspy();
initCopyButtons();
initFooterYear();
