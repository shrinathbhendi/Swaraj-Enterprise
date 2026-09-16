const fs = require('fs');

let html = fs.readFileSync('products.html', 'utf8');

// Categories based on the user screenshot
// 1. Plating Service
// 2. Electropolishing Services
// 3. Electroplating Service
// 4. Metal Polishing Service
// 5. Nickel Plating Service
// 6. Polishing Service
// 7. Buffing Services

const categoryMapping = {
    'SS Floor Drain Trap & Jali Assembly': 'Electropolishing Services',
    'Industrial SS Pressure Vessels & Columns': 'Electropolishing Services',
    'Copper Electroplated Bolts & Fasteners': 'Electroplating Service',
    'Brass Polishing Service': 'Polishing Service',
    'Antique Finishing Coating Services': 'Polishing Service',
    'Electroplated Copper Busbar': 'Electroplating Service',
    'Copper Electroplated Fasteners': 'Electroplating Service',
    'Nickel Plated Brass Fittings': 'Nickel Plating Service',
    'Electropolished SS Filter Housing': 'Electropolishing Services',
    'Custom Surface Treatment': 'Plating Service', // Generic fallback
    'SS Sanitization Trap': 'Electropolishing Services',
    'Silver Plated Electrical Contacts': 'Electroplating Service',
    'Tin Plated Copper Strip': 'Plating Service', // Tin plating
    'Precision Metal Component': 'Metal Polishing Service',
    'Industrial Metal Fitting': 'Plating Service',
    'Surface Finished Part': 'Plating Service',
    'Industrial SS Pressure Vessel': 'Electropolishing Services',
    'Plated Engineering Component': 'Plating Service',
    'Coated Industrial Fastener': 'Plating Service'
};

// Add data attributes to existing cards based on their titles
const regex = /<div class="service-card-compact">([\s\S]*?)<\/h3>/g;
html = html.replace(regex, (match, p1) => {
    const titleMatch = p1.match(/<h3>(.*)$/);
    if (titleMatch) {
        let title = titleMatch[1].trim();
        let cat = categoryMapping[title] || 'Plating Service';
        return `<div class="service-card-compact" data-category="${cat}">${p1}</h3>`;
    }
    return match;
});

const filterHtml = `
  <div class="product-filter-container">
    <div class="filter-wrapper">
      <label for="product-category-filter">Filter by Service:</label>
      <select id="product-category-filter" class="category-dropdown">
        <option value="all">All Categories</option>
        <option value="Plating Service">Plating Service</option>
        <option value="Electropolishing Services">Electropolishing Services</option>
        <option value="Electroplating Service">Electroplating Service</option>
        <option value="Metal Polishing Service">Metal Polishing Service</option>
        <option value="Nickel Plating Service">Nickel Plating Service</option>
        <option value="Polishing Service">Polishing Service</option>
        <option value="Buffing Services">Buffing Services</option>
      </select>
    </div>
  </div>
`;

if (!html.includes('product-filter-container')) {
    html = html.replace('<div class="catalog-grid-side-by-side">', filterHtml + '\n  <div class="catalog-grid-side-by-side">');
}

fs.writeFileSync('products.html', html);

// CSS Updates
let css = fs.readFileSync('assets/css/products.css', 'utf8');
const filterCss = `
/* Category Filter Dropdown */
.product-filter-container {
  max-width: 1240px;
  margin: 0 auto 2rem auto;
  display: flex;
  justify-content: flex-end;
}

.filter-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--bg-white);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-light);
}

.filter-wrapper label {
  font-weight: 600;
  color: var(--primary-dark-blue);
  font-size: 0.95rem;
}

.category-dropdown {
  padding: 0.6rem 1rem;
  border: 1px solid var(--border-light);
  border-radius: 6px;
  background-color: #f8fafc;
  color: var(--text-dark);
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  outline: none;
  transition: all 0.3s ease;
  min-width: 250px;
}

.category-dropdown:focus {
  border-color: var(--accent-yellow);
  box-shadow: 0 0 0 3px rgba(253, 184, 19, 0.2);
}
`;

if (!css.includes('.product-filter-container')) {
    fs.appendFileSync('assets/css/products.css', '\n' + filterCss);
}

// JS Updates
let js = fs.readFileSync('assets/js/products.js', 'utf8');
const filterJs = `
// Product Category Filter Logic
document.addEventListener('DOMContentLoaded', () => {
  const categoryFilter = document.getElementById('product-category-filter');
  const productCards = document.querySelectorAll('.service-card-compact');

  if (categoryFilter) {
    categoryFilter.addEventListener('change', (e) => {
      const selectedCategory = e.target.value;
      
      productCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (selectedCategory === 'all' || cardCategory === selectedCategory) {
          card.style.display = 'flex'; // show
        } else {
          card.style.display = 'none'; // hide
        }
      });
    });
  }
});
`;

if (!js.includes('product-category-filter')) {
    fs.appendFileSync('assets/js/products.js', '\n' + filterJs);
}

console.log("Updated HTML, CSS, and JS successfully.");
