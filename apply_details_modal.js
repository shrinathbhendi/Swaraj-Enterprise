const fs = require('fs');

// 1. Process products.html
let html = fs.readFileSync('products.html', 'utf8');

// Remove price rate divs
const priceRateRegex = /<div class="price-rate">[\s\S]*?<\/div>/g;
html = html.replace(priceRateRegex, '');

// Update buttons
html = html.replace(/<button class="btn btn-outline open-quote-modal">\s*Request Price Quote <i class="fas fa-paper-plane"><\/i>\s*<\/button>/g, 
  '<button class="btn btn-outline open-details-modal">\n                Check Details <i class="fas fa-info-circle"></i>\n              </button>');

html = html.replace(/<button class="btn btn-primary open-quote-modal">\s*Request Price Quote <i class="fas fa-paper-plane"><\/i>\s*<\/button>/g, 
  '<button class="btn btn-primary open-details-modal">\n                Check Details <i class="fas fa-info-circle"></i>\n              </button>');

// Add details modal HTML
const detailsModalHtml = `
  <!-- Product Details Modal Popup -->
  <div class="modal-overlay" id="details-modal">
    <div class="modal-card details-modal-card">
      <button class="modal-close" id="close-details-modal">&times;</button>
      
      <div class="details-modal-content">
        <div class="details-image-col">
          <img src="" id="details-modal-img" alt="Product Image">
        </div>
        <div class="details-info-col">
          <span class="card-tag" id="details-modal-tag" style="position: static; display: inline-block; margin-bottom: 1rem;"></span>
          <h3 id="details-modal-title" style="color: var(--primary-dark-blue); font-size: 1.8rem; margin-bottom: 1rem;"></h3>
          <p id="details-modal-desc" style="color: var(--text-muted); line-height: 1.6; margin-bottom: 1.5rem;"></p>
          
          <button class="btn btn-primary" id="details-to-quote-btn" style="width: 100%; padding: 0.9rem; font-size: 1rem;">
            Request Price Quote <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
`;

// Insert modal before the existing Quote modal
if (!html.includes('id="details-modal"')) {
    html = html.replace('<!-- Quote Modal Popup -->', detailsModalHtml + '\n  <!-- Quote Modal Popup -->');
}

fs.writeFileSync('products.html', html);

// 2. Process products.css
let css = fs.readFileSync('assets/css/products.css', 'utf8');
const detailsModalCss = `
/* Product Details Modal Styles */
.details-modal-card {
  max-width: 800px;
  width: 90%;
  padding: 2.5rem;
}

.details-modal-content {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.details-image-col {
  flex: 1;
  border-radius: 8px;
  overflow: hidden;
  background: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: center;
}

.details-image-col img {
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
}

.details-info-col {
  flex: 1;
  text-align: left;
}

@media (max-width: 768px) {
  .details-modal-content {
    flex-direction: column;
  }
}
`;

if (!css.includes('.details-modal-card')) {
    fs.appendFileSync('assets/css/products.css', '\n' + detailsModalCss);
}

// 3. Process products.js
let js = fs.readFileSync('assets/js/products.js', 'utf8');
const detailsModalJs = `
// Product Details Modal Logic
document.addEventListener('DOMContentLoaded', () => {
  const detailsModal = document.getElementById('details-modal');
  const quoteModal = document.getElementById('quote-modal');
  const closeDetailsBtn = document.getElementById('close-details-modal');
  const detailsToQuoteBtn = document.getElementById('details-to-quote-btn');
  
  const detailsImg = document.getElementById('details-modal-img');
  const detailsTag = document.getElementById('details-modal-tag');
  const detailsTitle = document.getElementById('details-modal-title');
  const detailsDesc = document.getElementById('details-modal-desc');
  
  const productCards = document.querySelectorAll('.service-card-compact, .service-card');
  const modalServiceSelect = document.getElementById('modal-service');
  
  let currentProductName = '';

  productCards.forEach(card => {
    const detailsBtn = card.querySelector('.open-details-modal');
    if (detailsBtn) {
      detailsBtn.addEventListener('click', () => {
        const titleEl = card.querySelector('h3');
        const descEl = card.querySelector('p');
        const imgEl = card.querySelector('.card-image-header img');
        const tagEl = card.querySelector('.card-tag');
        
        if (titleEl) detailsTitle.textContent = titleEl.textContent.trim();
        if (descEl) detailsDesc.textContent = descEl.textContent.trim();
        if (imgEl) {
          detailsImg.src = imgEl.src;
          detailsImg.alt = imgEl.alt;
        }
        if (tagEl) {
          detailsTag.textContent = tagEl.textContent.trim();
        } else {
          detailsTag.style.display = 'none';
        }
        
        currentProductName = titleEl ? titleEl.textContent.trim() : '';
        
        detailsModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    }
  });
  
  if (closeDetailsBtn) {
    closeDetailsBtn.addEventListener('click', () => {
      detailsModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }
  
  if (detailsToQuoteBtn) {
    detailsToQuoteBtn.addEventListener('click', () => {
      // Close details modal
      detailsModal.classList.remove('active');
      
      // Select the right option in quote modal
      if (modalServiceSelect && currentProductName) {
        Array.from(modalServiceSelect.options).forEach(option => {
          if (currentProductName.toLowerCase().includes(option.value.toLowerCase()) || 
              option.value.toLowerCase().includes(currentProductName.toLowerCase())) {
            modalServiceSelect.value = option.value;
          }
        });
      }
      
      // Open quote modal
      quoteModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }
});
`;

if (!js.includes('details-modal-img')) {
    fs.appendFileSync('assets/js/products.js', '\n' + detailsModalJs);
}

console.log('Update script executed successfully.');
