const fs = require('fs');
let html = fs.readFileSync('products.html', 'utf8');

// The Bike Spare Parts card
const startComment = '<!-- Product 3: Bike Spare Parts Bright Chrome Plating -->';
const endComment = '<!-- Product 4: Electropolished SS Filter Housing -->';

const idxStart = html.indexOf(startComment);
let idxEnd = html.indexOf(endComment);

// If the end comment isn't found, we can look for the next card or end of grid
if (idxStart !== -1) {
    if (idxEnd === -1) {
        // Find the next service-card-compact
        idxEnd = html.indexOf('<div class="service-card-compact">', idxStart + 100);
    }
    if (idxEnd !== -1) {
        html = html.substring(0, idxStart) + html.substring(idxEnd);
    } else {
        console.log("Could not find end of card");
    }
} else {
    console.log("Could not find start of card");
}

// Remove the option from the modal
const optionString = '<option value="Bike Spare Parts Bright Chrome Plating">Bike Spare Parts Bright Chrome Plating (₹ 4/Sq Inch)</option>';
html = html.replace(optionString, '');

fs.writeFileSync('products.html', html);
console.log('Removed Bike Spare Parts.');
