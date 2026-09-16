const fs = require('fs');

const products = [
    { img: 'producat1.png', title: 'Electroplated Copper Busbar', tag: 'Electrical Grade', price: 'Custom Quote', desc: 'High conductivity copper busbars with premium electroplating for optimal electrical performance.' },
    { img: 'producat2.png', title: 'Copper Electroplated Fasteners', tag: 'Fastener Coating', price: 'Custom Quote', desc: 'Precision copper plating on industrial fasteners for enhanced conductivity and anti-galling properties.' },
    { img: 'producat3.png', title: 'Nickel Plated Brass Fittings', tag: 'Bright Nickel', price: 'Custom Quote', desc: 'Durable and corrosion-resistant bright nickel plating on precision brass fittings.' },
    { img: 'producat4.png', title: 'Electropolished SS Filter Housing', tag: 'Hygienic Finish', price: 'Custom Quote', desc: 'Ultra-smooth electropolished finish for stainless steel filter housings, ideal for pharma applications.' },
    { img: 'producat5.png', title: 'Custom Surface Treatment', tag: 'Anodized Defense', price: 'Custom Quote', desc: 'Specialized surface treatments providing enhanced wear resistance and aesthetic appeal.' },
    { img: 'producat6.png', title: 'SS Sanitization Trap', tag: 'Pharma Grade', price: 'Custom Quote', desc: 'High-grade stainless steel sanitization traps with flawless surface finish for cleanroom environments.' },
    { img: 'producat8.png', title: 'Silver Plated Electrical Contacts', tag: 'Precision Silver', price: 'Custom Quote', desc: 'High-purity silver plating on electrical contacts for superior conductivity and low contact resistance.' },
    { img: 'producat9.png', title: 'Tin Plated Copper Strip', tag: 'Tin Coating', price: 'Custom Quote', desc: 'Quality tin plating on copper strips to prevent oxidation and ensure excellent solderability.' },
    { img: 'producat11.png', title: 'Precision Metal Component', tag: 'Industrial Fitting', price: 'Custom Quote', desc: 'Custom precision metal components with tailored surface finishing for industrial applications.' },
    { img: 'producat12.png', title: 'Industrial Metal Fitting', tag: 'Heavy Duty', price: 'Custom Quote', desc: 'Heavy-duty industrial metal fittings treated for maximum durability in harsh environments.' },
    { img: 'producat13.png', title: 'Surface Finished Part', tag: 'Custom Polish', price: 'Custom Quote', desc: 'Specially polished metal parts offering both functional performance and premium aesthetics.' },
    { img: 'producat14.png', title: 'Industrial SS Pressure Vessel', tag: 'High Pressure', price: 'Custom Quote', desc: 'Robust stainless steel pressure vessels featuring high-quality internal and external finishes.' },
    { img: 'producat15.png', title: 'Plated Engineering Component', tag: 'Corrosion Resistant', price: 'Custom Quote', desc: 'Engineered metal components featuring advanced plating for superior corrosion resistance.' },
    { img: 'producat16.png', title: 'Coated Industrial Fastener', tag: 'Weatherproof', price: 'Custom Quote', desc: 'Industrial fasteners with specialized coatings designed to withstand extreme weather conditions.' }
];

let html = fs.readFileSync('products.html', 'utf8');

let newHtml = '';
for (let p of products) {
    newHtml += `
        <!-- Product -->
        <div class="service-card-compact">
          <div class="card-image-header">
            <img src="assets/img/${p.img}" alt="${p.title}">
            <span class="card-tag">${p.tag}</span>
            <div class="photo-overlay-badge">
              <i class="fas fa-camera"></i> Verified Product Photo
            </div>
          </div>
          <div class="card-content">
            <div>
              <h3>${p.title}</h3>
              <p>${p.desc}</p>
              <div class="price-rate"><i class="fas fa-tag"></i> ${p.price}</div>
            </div>
            <div class="card-footer">
              <button class="btn btn-outline open-quote-modal">
                Request Price Quote <i class="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>`;
}

// Find the end of the section by looking for </section> before the modal
const sectionEndRegex = /(<\/div>\s*<\/div>\s*<\/section>)/;
const match = html.match(sectionEndRegex);

if (match) {
    html = html.replace(sectionEndRegex, newHtml + '\n' + match[1]);
    fs.writeFileSync('products.html', html);
    console.log('Products inserted correctly.');
} else {
    console.log('Target not found');
}
