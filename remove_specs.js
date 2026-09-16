const fs = require('fs');
let html = fs.readFileSync('products.html', 'utf8');

// Use regex to remove all <ul class="product-specs-list"> blocks
const regex = /<ul class="product-specs-list">[\s\S]*?<\/ul>/g;
html = html.replace(regex, '');

fs.writeFileSync('products.html', html);
console.log('Removed spec lists from all cards.');
