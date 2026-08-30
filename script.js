/* =========================================================
   KRUTIKA KAMBLE — PORTFOLIO
   MAIN JAVASCRIPT
   Professional Light Theme
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const navbar = document.querySelector(".navbar");

    const menuToggle =
        document.querySelector(".menu-toggle");

    const navLinks =
        document.querySelectorAll(".nav-links a");

    const sections =
        document.querySelectorAll("main section[id]");

    const roleElement =
        document.querySelector(".role-changing");

    const yearElement =
        document.getElementById("current-year");

    const scrollIndicator =
        document.querySelector(".scroll-indicator");

    const logo =
        document.querySelector(".logo");


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (menuToggle && navbar) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                navbar.classList.toggle("menu-open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        });

    }


    /* =====================================================
       CLOSE MOBILE MENU AFTER NAVIGATION
    ===================================================== */

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            if (!navbar) return;

            navbar.classList.remove("menu-open");

            if (menuToggle) {

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    });


    /* =====================================================
       CLOSE MOBILE MENU WITH ESCAPE
    ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            navbar
        ) {

            navbar.classList.remove("menu-open");

            if (menuToggle) {

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }

    });


    /* =====================================================
       CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener("click", (event) => {

        if (!navbar) return;

        if (!navbar.classList.contains(
                "menu-open"
            )) {
            return;
        }

        if (!navbar.contains(
                event.target
            )) {

            navbar.classList.remove(
                "menu-open"
            );

            if (menuToggle) {

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }

    });


    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    function updateNavbar() {

        if (!navbar) return;

        if (window.scrollY > 25) {

            navbar.classList.add(
                "scrolled"
            );

        } else {

            navbar.classList.remove(
                "scrolled"
            );

        }

    }

    updateNavbar();

    window.addEventListener(
        "scroll",
        updateNavbar, {
            passive: true
        }
    );


    /* =====================================================
       ACTIVE NAVIGATION SECTION
    ===================================================== */

    function updateActiveSection() {

        let currentSection = "home";

        const scrollPosition =
            window.scrollY + 180;


        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop;

            const sectionBottom =
                sectionTop +
                section.offsetHeight;


            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionBottom
            ) {

                currentSection =
                    section.id;

            }

        });


        navLinks.forEach((link) => {

            const href =
                link.getAttribute("href");


            link.classList.toggle(
                "active",
                href ===
                `#${currentSection}`
            );

        });

    }

    updateActiveSection();

    window.addEventListener(
        "scroll",
        updateActiveSection, {
            passive: true
        }
    );


    /* =====================================================
       SMOOTH NAVIGATION
    ===================================================== */

    navLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const href =
                    link.getAttribute(
                        "href"
                    );


                if (!href ||
                    !href.startsWith("#")
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        href
                    );


                if (!target) return;


                event.preventDefault();


                const navbarHeight =
                    navbar ?
                    navbar.offsetHeight :
                    0;


                const targetPosition =
                    target.offsetTop -
                    navbarHeight;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            }
        );

    });


    /* =====================================================
       HERO ROLE TYPING ANIMATION
    ===================================================== */

    if (roleElement) {

        const roles = [

            "AI & ML Engineer",

            "Machine Learning",

            "Computer Vision",

            "Generative AI",

            "Agentic AI"

        ];


        let roleIndex = 0;

        let characterIndex = 0;

        let deleting = false;

        let pauseCounter = 0;


        function animateRole() {

            const currentRole =
                roles[roleIndex];


            /* ---------------------------------------------
               TYPING
            --------------------------------------------- */

            if (!deleting) {

                characterIndex++;


                roleElement.textContent =
                    currentRole.substring(
                        0,
                        characterIndex
                    );


                if (
                    characterIndex >=
                    currentRole.length
                ) {

                    pauseCounter++;


                    if (
                        pauseCounter >= 20
                    ) {

                        deleting = true;

                        pauseCounter = 0;

                    }

                }

            }


            /* ---------------------------------------------
               DELETING
            --------------------------------------------- */
            else {

                characterIndex--;


                roleElement.textContent =
                    currentRole.substring(
                        0,
                        characterIndex
                    );


                if (
                    characterIndex <= 0
                ) {

                    characterIndex = 0;

                    deleting = false;

                    roleIndex =
                        (
                            roleIndex + 1
                        ) %
                        roles.length;

                }

            }


            let speed =
                deleting ?
                45 :
                75;


            if (!deleting &&
                characterIndex ===
                currentRole.length
            ) {

                speed = 100;

            }


            setTimeout(
                animateRole,
                speed
            );

        }


        /*
           Start animation after
           hero has appeared.
        */

        setTimeout(
            animateRole,
            900
        );

    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(

            ".section-heading, " +

            ".about-text, " +

            ".highlight-card, " +

            ".experience-item, " +

            ".project-category, " +

            ".project-card, " +

            ".skill-group, " +

            ".achievement-card, " +

            ".contact-intro, " +

            ".contact-card"

        );


    revealElements.forEach(
        (element, index) => {

            element.classList.add(
                "reveal"
            );


            /*
               Small staggered delay
               for natural appearance.
            */

            element.style.transitionDelay =
                `${(index % 5) * 70}ms`;

        }
    );


    /* =====================================================
       INTERSECTION OBSERVER
    ===================================================== */

    if (
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(

                (entries, observer) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );


                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },

                {
                    threshold: 0.12,

                    rootMargin: "0px 0px -50px 0px"
                }

            );


        revealElements.forEach(
            (element) => {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        /*
           Fallback for older browsers.
        */

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    /* =====================================================
       SCROLL INDICATOR
    ===================================================== */

    if (scrollIndicator) {

        scrollIndicator.addEventListener(
            "click",
            (event) => {

                const target =
                    document.querySelector(
                        "#about"
                    );


                if (!target) return;


                event.preventDefault();


                const navbarHeight =
                    navbar ?
                    navbar.offsetHeight :
                    0;


                window.scrollTo({

                    top: target.offsetTop -
                        navbarHeight,

                    behavior: "smooth"

                });

            }
        );

    }


    /* =====================================================
       LOGO → HOME
    ===================================================== */

    if (logo) {

        logo.addEventListener(
            "click",
            (event) => {

                const target =
                    document.querySelector(
                        "#home"
                    );


                if (!target) return;


                event.preventDefault();


                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }


    /* =====================================================
       EXPERIENCE TIMELINE ANIMATION
    ===================================================== */

    const experienceItems =
        document.querySelectorAll(
            ".experience-item"
        );


    if (
        experienceItems.length &&
        "IntersectionObserver" in window
    ) {

        const experienceObserver =
            new IntersectionObserver(

                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "timeline-active"
                                );

                            }

                        }
                    );

                },

                {
                    threshold: 0.25
                }

            );


        experienceItems.forEach(
            (item) => {

                experienceObserver.observe(
                    item
                );

            }
        );

    }


    /* =====================================================
       CONTACT CARD FEEDBACK
    ===================================================== */

    const contactCards =
        document.querySelectorAll(
            ".contact-card"
        );


    contactCards.forEach(
        (card) => {

            card.addEventListener(
                "click",
                () => {

                    card.classList.add(
                        "contact-clicked"
                    );


                    setTimeout(
                        () => {

                            card.classList.remove(
                                "contact-clicked"
                            );

                        },
                        250
                    );

                }
            );

        }
    );


    /* =====================================================
       BACKGROUND PARALLAX
       
       This is a subtle background effect.
       It does NOT follow the mouse/cursor.
    ===================================================== */

    const glowLeft =
        document.querySelector(
            ".glow-left"
        );

    const glowRight =
        document.querySelector(
            ".glow-right"
        );


    if (
        glowLeft &&
        glowRight
    ) {

        let ticking = false;


        window.addEventListener(
            "scroll",
            () => {

                if (ticking) return;


                window.requestAnimationFrame(
                    () => {

                        const scrollY =
                            window.scrollY;


                        glowLeft.style.transform =
                            `translateY(${scrollY * 0.035}px)`;


                        glowRight.style.transform =
                            `translateY(${scrollY * -0.025}px)`;


                        ticking = false;

                    }
                );


                ticking = true;

            }, {
                passive: true
            }
        );

    }


    /* =====================================================
       RESIZE HANDLING
    ===================================================== */

    let resizeTimer;


    window.addEventListener(
        "resize",
        () => {

            clearTimeout(
                resizeTimer
            );


            resizeTimer =
                setTimeout(
                    () => {

                        /*
                           Close mobile menu when
                           returning to desktop.
                        */

                        if (
                            window.innerWidth > 800 &&
                            navbar
                        ) {

                            navbar.classList.remove(
                                "menu-open"
                            );


                            if (menuToggle) {

                                menuToggle.setAttribute(
                                    "aria-expanded",
                                    "false"
                                );

                            }

                        }

                    },
                    150
                );

        }
    );


    /* =====================================================
       REDUCED MOTION
    ===================================================== */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (
        prefersReducedMotion.matches
    ) {

        /*
           Keep a static professional
           role instead of animated typing.
        */

        if (roleElement) {

            roleElement.textContent =
                "AI & ML Engineer";

        }

    }


    /* =====================================================
       PAGE LOADED
    ===================================================== */

    requestAnimationFrame(
        () => {

            document.body.classList.add(
                "page-loaded"
            );

        }
    );


});