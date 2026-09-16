const fs = require('fs');
let html = fs.readFileSync('products.html', 'utf8');

const oldBannerRegex = /<section class=\"section section-bg-blue\" style=\"background: linear-gradient\(rgba\(10, 25, 47, 0\.85\), rgba\(10, 25, 47, 0\.85\)\), url\('assets\/img\/products_banner_bg\.png'\) center\/cover no-repeat; padding: 4rem 0 3rem 0;\">/;
const newBanner = `<section class="section section-bg-blue" style="background: linear-gradient(rgba(15, 15, 15, 0.75), rgba(15, 15, 15, 0.75)), url('assets/img/products_banner_dark.png') center/cover no-repeat; padding: 4rem 0 3rem 0;">`;

if (html.match(oldBannerRegex)) {
    html = html.replace(oldBannerRegex, newBanner);
    fs.writeFileSync('products.html', html);
    console.log('Banner updated successfully.');
} else {
    console.log('Banner regex not found.');
}
