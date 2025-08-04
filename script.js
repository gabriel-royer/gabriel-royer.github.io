// Attend que le contenu de la page soit entièrement chargé avant d'exécuter le code.
document.addEventListener('DOMContentLoaded', function () {

    // --- Gestion du Thème Clair/Sombre ---
    const themeToggleButton = document.getElementById("theme-toggle");

    if (themeToggleButton) {
        themeToggleButton.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            // Sauvegarde le choix dans le localStorage
            localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
        });
    }

    // --- Gestion du Menu Burger Responsive ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('#main-navigation');
    const navLinks = document.querySelectorAll('#main-menu a');

    if (burger && nav) {
        burger.addEventListener('click', function () {
            const isOpen = nav.classList.toggle('open');
            burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        // Ferme le menu quand on clique sur un lien (sur mobile)
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                if (window.innerWidth <= 768 && nav.classList.contains('open')) {
                    nav.classList.remove('open');
                    burger.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // --- Gestion du Sélecteur de Langue ---
    const langLinks = document.querySelectorAll('a[hreflang]');

    langLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            const chosenLang = link.getAttribute('hreflang');
            if (chosenLang) {
                localStorage.setItem('lang', chosenLang);
            }
        });
    });

});


// --- Redirection automatique en fonction de la langue (gardée à l'extérieur) ---
// Ce script s'exécute immédiatement sans attendre le chargement complet du DOM.
(function () {
    // Ne pas exécuter la redirection si on est déjà sur la bonne page
    // pour éviter les boucles infinies.
    const currentPath = window.location.pathname.split('/').pop();
    const isEnglishPage = currentPath.includes('en.html');

    const storedLang = localStorage.getItem('lang');
    const browserLang = (navigator.language || navigator.userLanguage).substring(0, 2);

    // On donne la priorité au choix de l'utilisateur, sinon au navigateur
    const preferredLang = storedLang || browserLang;

    if (preferredLang === 'en' && !isEnglishPage) {
        // Redirige vers la version anglaise si on n'y est pas déjà
        window.location.href = 'index-en.html';
    } else if (preferredLang === 'fr' && isEnglishPage) {
        // Redirige vers la version française si on est sur une page anglaise par erreur
        window.location.href = 'index.html';
    }
})();