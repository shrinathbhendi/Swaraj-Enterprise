const fs = require('fs');
const cssPath = 'assets/css/index.css';

let css = fs.readFileSync(cssPath, 'utf8');

const animationCSS = `
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(100px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.about-image-stack {
  animation: slideInLeft 1.2s ease-out forwards;
}

.about-grid > div:not(.about-image-stack) {
  animation: slideInUp 1.2s ease-out forwards;
}
`;

if (!css.includes('slideInUp')) {
    fs.appendFileSync(cssPath, animationCSS);
    console.log('Animations added to index.css');
} else {
    console.log('Animations already exist');
}
