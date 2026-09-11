/**
 * SWARAJ ENTERPRISE PUNE - PRODUCTS PAGE JAVASCRIPT
 * Specific interactive logic for products.html catalog
 */

document.addEventListener('DOMContentLoaded', () => {
  // Pre-select service in modal when clicking specific product quote button
  const productCards = document.querySelectorAll('.service-card-compact, .service-card');
  const modalServiceSelect = document.getElementById('modal-service');

  productCards.forEach(card => {
    const titleEl = card.querySelector('h3');
    const quoteBtn = card.querySelector('.open-quote-modal');

    if (titleEl && quoteBtn && modalServiceSelect) {
      quoteBtn.addEventListener('click', () => {
        const productName = titleEl.textContent.trim();
        
        // Find matching option in select dropdown
        Array.from(modalServiceSelect.options).forEach(option => {
          if (productName.toLowerCase().includes(option.value.toLowerCase()) || 
              option.value.toLowerCase().includes(productName.toLowerCase())) {
            modalServiceSelect.value = option.value;
          }
        });
      });
    }
  });
});
