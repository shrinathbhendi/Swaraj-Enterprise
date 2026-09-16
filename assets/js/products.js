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


// Enhanced Category Filtering Logic (URL Parameter & Pills)
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  
  const products = document.querySelectorAll('.service-card-compact');
  const filterPills = document.querySelectorAll('.filter-pill');

  // Category mapping dictionary for URL slugs and full names
  const categoryMap = {
    'all': 'all',
    'plating': 'Plating Service',
    'electropolishing': 'Electropolishing Services',
    'electroplating': 'Electroplating Service',
    'metal-polishing': 'Metal Polishing Service',
    'nickel-plating': 'Nickel Plating Service',
    'polishing': 'Polishing Service',
    'buffing': 'Buffing Services'
  };

  const normalizeCategory = (cat) => {
    if (!cat) return 'all';
    const cleanCat = cat.trim();
    const lowerSlug = cleanCat.toLowerCase();
    if (categoryMap[lowerSlug]) return categoryMap[lowerSlug];
    return cleanCat;
  };
  
  // Function to apply filter
  const applyFilter = (rawCategory) => {
    const targetCategory = normalizeCategory(rawCategory);
    
    // 1. Update Products
    if (products.length > 0) {
      products.forEach(product => {
        const productCat = product.getAttribute('data-category') || '';
        const normProductCat = normalizeCategory(productCat);

        if (targetCategory === 'all' || 
            normProductCat.toLowerCase() === targetCategory.toLowerCase() ||
            productCat.toLowerCase() === targetCategory.toLowerCase() ||
            (rawCategory && productCat.toLowerCase().includes(rawCategory.toLowerCase()))) {
          product.style.display = 'flex';
          // re-trigger animation if present
          product.classList.remove('in-view');
          setTimeout(() => product.classList.add('in-view'), 50);
        } else {
          product.style.display = 'none';
        }
      });
    }
    
    // 2. Update Pills
    if (filterPills.length > 0) {
      filterPills.forEach(pill => {
        const pillFilter = pill.getAttribute('data-filter') || '';
        const normPillFilter = normalizeCategory(pillFilter);
        
        if (pillFilter === rawCategory || 
            normPillFilter.toLowerCase() === targetCategory.toLowerCase() || 
            pillFilter.toLowerCase() === targetCategory.toLowerCase()) {
          pill.classList.add('active');
        } else {
          pill.classList.remove('active');
        }
      });
    }
  };

  // Initial load filter
  if (categoryParam) {
    applyFilter(categoryParam);
  }

  // Click event for pills
  if (filterPills.length > 0) {
    filterPills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedCategory = pill.getAttribute('data-filter');
        
        // Update URL without reloading page
        const newUrl = new URL(window.location);
        newUrl.searchParams.set('category', selectedCategory);
        window.history.pushState({}, '', newUrl);
        
        applyFilter(selectedCategory);
      });
    });
  }
});


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
        
        if (titleEl && detailsTitle) detailsTitle.textContent = titleEl.textContent.trim();
        if (descEl && detailsDesc) detailsDesc.textContent = descEl.textContent.trim();
        if (imgEl && detailsImg) {
          detailsImg.src = imgEl.src;
          detailsImg.alt = imgEl.alt;
        }
        if (tagEl && detailsTag) {
          detailsTag.textContent = tagEl.textContent.trim();
          detailsTag.style.display = 'inline-block';
        } else if (detailsTag) {
          detailsTag.style.display = 'none';
        }
        
        currentProductName = titleEl ? titleEl.textContent.trim() : '';
        
        if (detailsModal) {
          detailsModal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    }
  });
  
  if (closeDetailsBtn && detailsModal) {
    closeDetailsBtn.addEventListener('click', () => {
      detailsModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }
  
  if (detailsToQuoteBtn) {
    detailsToQuoteBtn.addEventListener('click', () => {
      // Close details modal
      if (detailsModal) detailsModal.classList.remove('active');
      
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
      if (quoteModal) {
        quoteModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  }
});
