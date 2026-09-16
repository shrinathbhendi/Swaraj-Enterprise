const fs = require('fs');

// 1. Add CSS for scroll animation
const cssPath = 'assets/css/index.css';
let css = fs.readFileSync(cssPath, 'utf8');
const scrollCss = `
/* Scroll Animations */
.animate-up {
  opacity: 0;
  transform: translateY(60px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}
.animate-up.in-view {
  opacity: 1;
  transform: translateY(0);
}
`;
if (!css.includes('.animate-up')) {
  fs.appendFileSync(cssPath, scrollCss);
}

// 2. Add IntersectionObserver to index.js
const jsPath = 'assets/js/index.js';
let js = fs.readFileSync(jsPath, 'utf8');
const observerJs = `
// Scroll Animations Observer
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.animate-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // Optional: stop observing once animated
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  animatedElements.forEach(el => observer.observe(el));
});
`;
if (!js.includes('IntersectionObserver')) {
  fs.appendFileSync(jsPath, observerJs);
}

// 3. Add .animate-up class to the relevant HTML elements in index.html
let html = fs.readFileSync('index.html', 'utf8');

// The stats cards
html = html.replace(/class=\"stat-card\"/g, 'class=\"stat-card animate-up\"');

// The process step cards
html = html.replace(/class=\"process-card\"/g, 'class=\"process-card animate-up\"');

// The tree features (the 4 boxes)
html = html.replace(/class=\"tree-feature-box\"/g, 'class=\"tree-feature-box animate-up\"');

fs.writeFileSync('index.html', html);
console.log('Scroll animations implemented.');
