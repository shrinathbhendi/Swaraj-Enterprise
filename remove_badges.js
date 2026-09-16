const fs = require('fs');

let html = fs.readFileSync('products.html', 'utf8');

// Remove <span class="card-tag">...</span>
html = html.replace(/<span class="card-tag">.*?<\/span>\s*/g, '');

// Remove <div class="photo-overlay-badge">...</div>
html = html.replace(/<div class="photo-overlay-badge">\s*<i class="fas fa-camera"><\/i> Verified Product Photo\s*<\/div>\s*/g, '');

fs.writeFileSync('products.html', html);
console.log('Badges removed successfully from products.html.');
