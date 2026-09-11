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
});
