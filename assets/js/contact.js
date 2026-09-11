/**
 * SWARAJ ENTERPRISE PUNE - CONTACT PAGE JAVASCRIPT
 * Specific interactive logic for contact.html forms and map actions
 */

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contact-name')?.value || 'Valued Customer';
      const phone = document.getElementById('contact-phone')?.value || '';
      
      if (!phone) {
        if (typeof window.showToast === 'function') {
          window.showToast('Please provide a valid contact phone number.', 'error');
        }
        return;
      }

      if (typeof window.showToast === 'function') {
        window.showToast(`Thank you ${name}! Your inquiry has been sent to Swaraj Enterprise Pune. We will reply within 2 hours.`);
      }
      
      contactForm.reset();
    });
  }
});
