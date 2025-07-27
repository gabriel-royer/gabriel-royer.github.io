// === script.js ===

// Gestion du thème clair/sombre avec persistance
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

document.getElementById('theme-toggle').addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
});

// Au chargement de la page, appliquer le thème sauvegardé ou celui du système
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }
});

// Lazy loading des images avec IntersectionObserver
const lazyImages = document.querySelectorAll('img[data-src]');
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      obs.unobserve(img);
    }
  });
});
lazyImages.forEach(img => observer.observe(img));

// Génération dynamique des captures d’écran (à adapter selon ta solution)
// Ici, on suppose que chaque projet a un attribut data-url et une image avec class .project-img
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.project').forEach(project => {
    const url = project.dataset.url;
    const img = project.querySelector('.project-img');
    if(url && img) {
      img.src = `https://image.thum.io/get/width/800/crop/600/${encodeURIComponent(url)}`;
    }
  });
});
