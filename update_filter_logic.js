const fs = require('fs');
let js = fs.readFileSync('assets/js/products.js', 'utf8');

const betterFilterLogic = `
// Enhanced Category Filtering Logic (URL Parameter & Pills)
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  
  const products = document.querySelectorAll('.service-card-compact');
  const filterPills = document.querySelectorAll('.filter-pill');
  
  // Function to apply filter
  const applyFilter = (category) => {
    // 1. Update Products
    if (products.length > 0) {
      products.forEach(product => {
        const productCat = product.getAttribute('data-category');
        if (category === 'all' || productCat === category) {
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
        if (pill.getAttribute('data-filter') === category) {
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
`;

js = js.replace(/\/\/ Sidebar Category Filtering Logic[\s\S]*?\/\/ Product Details Modal Logic/, betterFilterLogic + '\n\n// Product Details Modal Logic');
js = js.replace(/\/\/ Product Category Filter Logic \(Pills\)[\s\S]*$/, '');

fs.writeFileSync('assets/js/products.js', js);
console.log('Filtering logic updated');
