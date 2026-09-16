const fs = require('fs');

const files = ['products.html', 'about.html', 'gallery.html', 'contact.html'];
const dropdownHtml = `<li class="nav-item dropdown">
            <a href="products.html" class="nav-link">Products <i class="fas fa-chevron-down dropdown-icon"></i></a>
            <ul class="dropdown-menu">
              <li><a href="products.html?category=plating"><i class="fas fa-shield-alt"></i> Plating Service</a></li>
              <li><a href="products.html?category=electropolishing"><i class="fas fa-bolt"></i> Electropolishing Services</a></li>
              <li><a href="products.html?category=electroplating"><i class="fas fa-plug"></i> Electroplating Service</a></li>
              <li><a href="products.html?category=metal-polishing"><i class="fas fa-magic"></i> Metal Polishing Service</a></li>
              <li><a href="products.html?category=nickel-plating"><i class="fas fa-coins"></i> Nickel Plating Service</a></li>
              <li><a href="products.html?category=polishing"><i class="fas fa-spray-can"></i> Polishing Service</a></li>
              <li><a href="products.html?category=buffing"><i class="fas fa-hand-sparkles"></i> Buffing Services</a></li>
            </ul>
          </li>`;

files.forEach(file => {
  if (fs.existsSync(file)) {
    let html = fs.readFileSync(file, 'utf8');
    
    // Replace the simple Products link with the dropdown
    // Matches <li><a href="products.html" class="nav-link">Products</a></li> 
    // or <li><a href="products.html" class="nav-link active">Products</a></li>
    const regex = /<li><a href="products\.html" class="nav-link(?: active)?">Products<\/a><\/li>/;
    
    if (regex.test(html)) {
      html = html.replace(regex, dropdownHtml);
      
      // If the file is products.html, make the parent link active
      if (file === 'products.html') {
        html = html.replace(/<a href="products\.html" class="nav-link">Products/, '<a href="products.html" class="nav-link active">Products');
      }
      
      fs.writeFileSync(file, html);
      console.log('Updated ' + file);
    } else {
      console.log('Regex did not match for ' + file);
    }
  }
});
