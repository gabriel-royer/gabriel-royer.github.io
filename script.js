// === script.js ===

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

// Theme toggle
const toggle = document.getElementById('theme-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark' || (prefersDark && !currentTheme)) {
  document.documentElement.setAttribute('data-theme', 'dark');
}

toggle.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
});

// Slider scroll
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector('.slider-track');
  document.querySelector('.next').addEventListener('click', () => {
    track.scrollBy({ left: 320, behavior: 'smooth' });
  });
  document.querySelector('.prev').addEventListener('click', () => {
    track.scrollBy({ left: -320, behavior: 'smooth' });
  });
});