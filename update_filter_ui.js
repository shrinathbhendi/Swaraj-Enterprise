const fs = require('fs');

// 1. Update HTML
let html = fs.readFileSync('products.html', 'utf8');

const oldFilterHtmlRegex = /<div class="product-filter-container">[\s\S]*?<\/div>\s*<\/div>/;

const newFilterHtml = `
  <div class="product-filter-pills-container">
    <button class="filter-pill active" data-filter="all">All Categories</button>
    <button class="filter-pill" data-filter="Plating Service">Plating Service</button>
    <button class="filter-pill" data-filter="Electropolishing Services">Electropolishing Services</button>
    <button class="filter-pill" data-filter="Electroplating Service">Electroplating Service</button>
    <button class="filter-pill" data-filter="Metal Polishing Service">Metal Polishing Service</button>
    <button class="filter-pill" data-filter="Nickel Plating Service">Nickel Plating Service</button>
    <button class="filter-pill" data-filter="Polishing Service">Polishing Service</button>
    <button class="filter-pill" data-filter="Buffing Services">Buffing Services</button>
  </div>
`;

html = html.replace(oldFilterHtmlRegex, newFilterHtml);
fs.writeFileSync('products.html', html);


// 2. Update CSS
let css = fs.readFileSync('assets/css/products.css', 'utf8');

// Remove old dropdown CSS
const oldCssRegex = /\/\* Category Filter Dropdown \*\/[\s\S]*?\.category-dropdown:focus {[\s\S]*?}/;
css = css.replace(oldCssRegex, '');

const newCss = `
/* Category Pill Filters */
.product-filter-pills-container {
  max-width: 1240px;
  margin: 0 auto 2.5rem auto;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.filter-pill {
  background: #ffffff;
  color: var(--primary-dark-blue);
  border: 1px solid var(--border-light);
  padding: 0.6rem 1.25rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0,0,0,0.02);
}

.filter-pill:hover {
  border-color: var(--accent-yellow);
  color: var(--accent-yellow);
}

.filter-pill.active {
  background: var(--accent-yellow);
  color: #ffffff;
  border-color: var(--accent-yellow);
  box-shadow: 0 4px 12px rgba(253, 184, 19, 0.3);
}
`;

css += '\n' + newCss;
fs.writeFileSync('assets/css/products.css', css);


// 3. Update JS
let js = fs.readFileSync('assets/js/products.js', 'utf8');

const oldJsRegex = /\/\/ Product Category Filter Logic[\s\S]*?\}\);/;
js = js.replace(oldJsRegex, '');

const newJs = `
// Product Category Filter Logic (Pills)
document.addEventListener('DOMContentLoaded', () => {
  const filterPills = document.querySelectorAll('.filter-pill');
  const productCards = document.querySelectorAll('.service-card-compact');

  if (filterPills.length > 0) {
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        // Remove active class from all pills
        filterPills.forEach(p => p.classList.remove('active'));
        // Add active class to clicked pill
        pill.classList.add('active');

        const selectedCategory = pill.getAttribute('data-filter');
        
        productCards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');
          
          if (selectedCategory === 'all' || cardCategory === selectedCategory) {
            card.style.display = 'flex'; // show
          } else {
            card.style.display = 'none'; // hide
          }
        });
      });
    });
  }
});
`;

js += '\n' + newJs;
fs.writeFileSync('assets/js/products.js', js);

console.log("Replaced dropdown with pill filters.");
