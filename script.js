// === script.js ===

// Theme toggle
document.getElementById("theme-toggle").addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
});

// Load saved theme
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
});

// Lazy loading images
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

// Dynamic screenshot generation placeholder (uses external API e.g. via backend or pre-generated images)
// Assuming each .project has data-url and .project-img inside

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".project").forEach(project => {
    const url = project.dataset.url;
    const img = project.querySelector(".project-img");
    // You would replace this with your own backend screenshot endpoint or pre-made screenshot service
    img.src = `https://image.thum.io/get/width/800/crop/600/${encodeURIComponent(url)}`;
  });
});
