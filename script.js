// Basculer le thème clair/sombre
document.getElementById("theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
});

// Appliquer le thème préféré au chargement
window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }
});

// Initialiser Swiper
const swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});

// Rendre chaque carte cliquable si un lien est présent
document.querySelectorAll(".project").forEach((project) => {
    const url = project.getAttribute("data-url");
    if (url) {
        project.style.cursor = "pointer";
        project.addEventListener("click", () => {
            window.open(url, "_blank");
        });
    }
});

// Script pour le menu burger responsive

document.addEventListener('DOMContentLoaded', function () {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('#main-navigation');
    const navLinks = document.querySelectorAll('#main-menu a');

    if (burger && nav) {
        burger.addEventListener('click', function () {
            const isOpen = nav.classList.toggle('open');
            burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                if (window.innerWidth <= 768 && nav.classList.contains('open')) {
                    nav.classList.remove('open');
                    burger.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }
});

// Script pour la redirection automatique en fonction de la langue
(function () {
    const currentPath = window.location.pathname;
    const currentLang = currentPath.includes('index-en') ? 'en' : 'fr';
    const storedLang = localStorage.getItem('lang');
    const browserLang = navigator.language || navigator.userLanguage;
    const preferredLang = storedLang || browserLang;

    // Automattic redirection based on language preference
    if (preferredLang.startsWith('en') && currentLang !== 'en') {
        window.location.href = 'index-en.html';
    } else if (preferredLang.startsWith('fr') && currentLang !== 'fr') {
        window.location.href = 'index.html';
    }

    // Langue switcher loading
    document.addEventListener('DOMContentLoaded', function () {
        const langLinks = document.querySelectorAll('a[hreflang]');

        langLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                const chosenLang = link.getAttribute('hreflang');
                if (chosenLang) {
                    localStorage.setItem('lang', chosenLang);
                }
                // No redirection needed
            });
        });
    });
})();