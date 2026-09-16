/**
 * SWARAJ ENTERPRISE PUNE - ABOUT PAGE JAVASCRIPT
 * Specific interactive logic for about.html
 */

document.addEventListener('DOMContentLoaded', () => {
  // Experience Counter Animation
  const yearsEl = document.querySelector('.experience-badge .years');
  if (yearsEl) {
    const startYear = 2017;
    const currentYear = new Date().getFullYear();
    const totalYears = currentYear - startYear;
    let count = 0;
    
    const interval = setInterval(() => {
      if (count < totalYears) {
        count++;
        yearsEl.textContent = `${count}+`;
      } else {
        clearInterval(interval);
      }
    }, 150);
  }

  // About Section Slider
  const aboutSlides = document.querySelectorAll('.about-slide');
  if (aboutSlides.length > 0) {
    let currentAboutSlide = 0;
    setInterval(() => {
      // Fade out current
      aboutSlides[currentAboutSlide].style.display = 'none';
      aboutSlides[currentAboutSlide].classList.remove('active');
      
      // Move to next
      currentAboutSlide = (currentAboutSlide + 1) % aboutSlides.length;
      
      // Fade in next
      aboutSlides[currentAboutSlide].style.display = 'block';
      aboutSlides[currentAboutSlide].classList.add('active');
    }, 3500);
  }
});
