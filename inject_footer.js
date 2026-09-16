const fs = require('fs');
const path = require('path');

const dir = __dirname;
const footerPath = path.join(dir, 'footer.html');
const footerContent = fs.readFileSync(footerPath, 'utf8');

const files = fs.readdirSync(dir);
files.forEach(file => {
  if (file.endsWith('.html') && file !== 'footer.html') {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace the placeholder with the actual footer content
    // We can use a regex to match the placeholder, including any surrounding comments if we want,
    // but just replacing the div is fine.
    if (content.includes('<div id="footer-placeholder"></div>')) {
      content = content.replace('<div id="footer-placeholder"></div>', footerContent);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Injected footer into ' + file);
    } else {
      console.log('No placeholder found in ' + file + ' or already injected.');
    }
  }
});
