const fs = require('fs');
const cssPath = 'assets/css/index.css';

let css = fs.readFileSync(cssPath, 'utf8');

const animationCSS = `
/* Hero Animations */
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.hero-content {
  animation: slideInLeft 1.2s ease-out forwards;
}

.hero-slider-wrapper {
  animation: slideInRight 1.2s ease-out forwards;
}
`;

if (!css.includes('slideInLeft')) {
    fs.appendFileSync(cssPath, animationCSS);
    console.log('Animations added to index.css');
} else {
    console.log('Animations already exist');
}
