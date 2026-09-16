const fs = require('fs');
const path = require('path');

const products = [
  { img: 'photo1.png', id: 'ss-floor-drain', title: 'SS Floor Drain Trap Assembly', tag: 'Sanitary Grade', desc: 'Heavy-duty SS 304 / SS 316 square drain cover plate with integrated anti-odor cup trap.' },
  { img: 'producat1.png', id: 'copper-busbar', title: 'Copper Busbar Electroplating', tag: 'Electrical Grade', desc: 'High-conductivity pure copper electroplating for electrical busbars and switchgears.' },
  { img: 'producat2.png', id: 'copper-bolts', title: 'Copper Electroplated Bolts & Studs', tag: 'Fastener Coating', desc: 'Electrolytic pure copper plating on industrial bolts for anti-galling.' },
  { img: 'producat3.png', id: 'brass-polishing', title: 'Brass Polishing & Plating Service', tag: 'Bright Nickel', desc: 'High-shine mirror polishing and protective coating for brass components.' },
  { img: 'producat4.png', id: 'ss-filter-housing', title: 'Electropolished SS Filter Housing', tag: 'Hygienic Finish', desc: 'Internal & External Electropolishing for stainless steel filter housings.' },
  { img: 'producat5.png', id: 'custom-fixture', title: 'Custom Surface Treatment Fixture', tag: 'Anodized Defense', desc: 'Specialized protective coatings for custom manufactured industrial fixtures.' },
  { img: 'producat6.png', id: 'ss-cleanroom-trap', title: 'SS Sanitization Cleanroom Trap', tag: 'Pharma Grade', desc: 'Ultra-smooth hygienic finish traps designed for pharmaceutical cleanrooms.' },
  { img: 'producat8.png', id: 'silver-contacts', title: 'Silver Plated Electrical Contacts', tag: 'Precision Silver', desc: 'Premium silver plating for high-voltage electrical contacts and terminals.' },
  { img: 'producat9.png', id: 'tin-copper-strips', title: 'Tin Plated Copper Strips & Terminal', tag: 'Tin Coating', desc: 'Excellent solderability and corrosion resistance for copper terminals.' },
  { img: 'producat10.png', id: 'bike-parts-chrome', title: 'Bike Parts Bright Chrome Plating', tag: 'Automotive Special', desc: 'Triple-layer copper-nickel-chrome electroplating for motorcycle parts.' },
  { img: 'producat14.png', id: 'ss-pressure-vessels', title: 'Industrial SS Pressure Vessels', tag: 'High Pressure', desc: 'Large-capacity stainless steel cylindrical pressure tanks and reaction vessels.' }
];

const template = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{TITLE}} - Swaraj Enterprise</title>
  <link rel="icon" type="image/png" href="assets/img/favicon.png">
  <link rel="shortcut icon" href="favicon.ico">
  
  <link rel="stylesheet" href="assets/css/global.css">
  <link rel="stylesheet" href="assets/css/header.css">
  <link rel="stylesheet" href="assets/css/footer.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    .product-page-section { padding: 4rem 0; }
    .product-details-container {
      display: flex; flex-wrap: wrap; gap: 3rem; align-items: center;
      background: white; border-radius: 12px; padding: 2rem;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    }
    .product-image-col { flex: 1 1 400px; }
    .product-image-col img {
      width: 100%; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      max-height: 500px; object-fit: cover;
    }
    .product-info-col { flex: 1 1 400px; }
    .product-info-col h1 { color: var(--primary-dark-blue); font-size: 2.5rem; margin-bottom: 1rem; }
    .product-info-col p { color: var(--text-muted); font-size: 1.2rem; line-height: 1.6; margin-bottom: 2rem; }
    .features-list { list-style: none; padding: 0; margin-bottom: 2rem; }
    .features-list li { margin-bottom: 0.8rem; font-size: 1.1rem; }
    .features-list i { color: var(--primary-orange); margin-right: 10px; }
    .tag { display: inline-block; padding: 5px 12px; background: var(--primary-orange); color: white; border-radius: 20px; font-size: 0.9rem; font-weight: bold; margin-bottom: 1rem; }
  </style>
</head>
<body>

  <!-- Top Header Bar -->
  <div class="top-bar">
    <div class="container">
      <div class="top-info">
        <div class="top-info-item">
          <i class="fas fa-phone-alt"></i> <a href="tel:+919960098355" style="color: inherit; font-weight: 600;">+91 99600 98355</a>
        </div>
        <div class="top-info-item">
          <i class="fas fa-envelope"></i> <a href="mailto:info@swarajenterprisepune.com" style="color: inherit;">info@swarajenterprisepune.com</a>
        </div>
      </div>
    </div>
  </div>

  <header class="navbar">
    <div class="container">
      <a href="index.html" class="logo-brand">
        <img src="assets/img/logo.png" alt="Swaraj Enterprise Logo" class="logo-img">
        <div class="brand-text">
          <span class="brand-name">SWARAJ <span>ENTERPRISE</span></span>
        </div>
      </a>
      <nav>
        <ul class="nav-menu" id="nav-menu">
          <li><a href="index.html" class="nav-link">Home</a></li>
          <li><a href="about.html" class="nav-link">About Us</a></li>
          <li class="nav-item dropdown">
            <a href="products.html" class="nav-link active">Products <i class="fas fa-chevron-down dropdown-icon"></i></a>
            <ul class="dropdown-menu">
              <li><a href="products.html?category=plating"><i class="fas fa-shield-alt"></i> Plating Service</a></li>
              <li><a href="products.html?category=electropolishing"><i class="fas fa-bolt"></i> Electropolishing Services</a></li>
              <li><a href="products.html?category=electroplating"><i class="fas fa-plug"></i> Electroplating Service</a></li>
              <li><a href="products.html?category=metal-polishing"><i class="fas fa-magic"></i> Metal Polishing Service</a></li>
              <li><a href="products.html?category=nickel-plating"><i class="fas fa-coins"></i> Nickel Plating Service</a></li>
              <li><a href="products.html?category=polishing"><i class="fas fa-spray-can"></i> Polishing Service</a></li>
              <li><a href="products.html?category=buffing"><i class="fas fa-hand-sparkles"></i> Buffing Services</a></li>
            </ul>
          </li>
          <li><a href="gallery.html" class="nav-link">Gallery</a></li>
          <li><a href="contact.html" class="nav-link">Contact Us</a></li>
        </ul>
        <button class="menu-toggle" id="mobile-menu-btn"><i class="fas fa-bars"></i></button>
      </nav>
    </div>
  </header>

  <!-- Banner -->
  <section class="page-banner" style="background: linear-gradient(rgba(5, 19, 41, 0.8), rgba(5, 19, 41, 0.8)), url('assets/img/custom_bg_pattern.png') center/cover;">
    <div class="container text-center">
      <h1 class="banner-title">{{TITLE}}</h1>
      <p class="banner-subtitle"><a href="index.html">Home</a> &nbsp;/&nbsp; <a href="products.html">Products</a> &nbsp;/&nbsp; {{TITLE}}</p>
    </div>
  </section>

  <section class="product-page-section">
    <div class="container">
      <a href="products.html" class="btn btn-secondary" style="margin-bottom: 2rem; display: inline-block;">
        <i class="fas fa-arrow-left"></i> Back to Products
      </a>
      
      <div class="product-details-container">
        <div class="product-image-col">
          <img src="assets/img/{{IMG}}" alt="{{TITLE}}">
        </div>
        <div class="product-info-col">
          <span class="tag">{{TAG}}</span>
          <h1>{{TITLE}}</h1>
          <p>{{DESC}}</p>
          
          <ul class="features-list">
            <li><i class="fas fa-check-circle"></i> High quality finishing</li>
            <li><i class="fas fa-check-circle"></i> Strict dimensional tolerances</li>
            <li><i class="fas fa-check-circle"></i> ISO Certified process</li>
          </ul>

          <a href="contact.html" class="btn btn-primary" style="padding: 1rem 2rem; font-size: 1.1rem; display: inline-block; margin-top: 1rem;">
            Request Quote <i class="fas fa-paper-plane"></i>
          </a>
        </div>
      </div>
    </div>
  </section>

  <div id="footer-placeholder"></div>
  <script src="assets/js/main.js"></script>
</body>
</html>`;

products.forEach(p => {
  let fileContent = template
    .replace(/{{TITLE}}/g, p.title)
    .replace(/{{IMG}}/g, p.img)
    .replace(/{{TAG}}/g, p.tag)
    .replace(/{{DESC}}/g, p.desc);
    
  let filename = `product-${p.id}.html`;
  fs.writeFileSync(path.join(__dirname, filename), fileContent);
  console.log('Created:', filename);
});
