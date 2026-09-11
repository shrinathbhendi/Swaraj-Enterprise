/**
 * SWARAJ ENTERPRISE PUNE - GALLERY PAGE JAVASCRIPT
 * Specific interactive logic for gallery.html filter & lightbox preview
 */

document.addEventListener('DOMContentLoaded', () => {
  // Gallery Category Filter Logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // Lightbox Image Preview Modal
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('h4')?.textContent || 'Swaraj Enterprise Gallery';
      const desc = item.querySelector('p')?.textContent || '';

      if (!img) return;

      let lightbox = document.getElementById('gallery-lightbox');
      if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.id = 'gallery-lightbox';
        lightbox.className = 'modal-overlay active';
        lightbox.style.display = 'flex';
        lightbox.style.zIndex = '1100';
        lightbox.innerHTML = `
          <div style="position: relative; max-width: 90vw; max-height: 90vh; background: #0b1329; padding: 1.5rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); text-align: center;">
            <button id="close-lightbox" style="position: absolute; top: 10px; right: 15px; background: none; border: none; color: white; font-size: 2rem; cursor: pointer;">&times;</button>
            <img id="lightbox-img" src="" alt="Preview" style="max-width: 100%; max-height: 70vh; border-radius: 8px; object-fit: contain;">
            <h3 id="lightbox-title" style="color: white; margin-top: 1rem; font-size: 1.25rem;"></h3>
            <p id="lightbox-desc" style="color: rgba(255,255,255,0.7); font-size: 0.9rem; margin-top: 0.3rem;"></p>
          </div>
        `;
        document.body.appendChild(lightbox);

        lightbox.addEventListener('click', (e) => {
          if (e.target === lightbox || e.target.id === 'close-lightbox') {
            lightbox.classList.remove('active');
            lightbox.remove();
            document.body.style.overflow = '';
          }
        });
      }

      const lbImg = lightbox.querySelector('#lightbox-img');
      const lbTitle = lightbox.querySelector('#lightbox-title');
      const lbDesc = lightbox.querySelector('#lightbox-desc');

      if (lbImg) lbImg.src = img.src;
      if (lbTitle) lbTitle.textContent = title;
      if (lbDesc) lbDesc.textContent = desc;

      document.body.style.overflow = 'hidden';
    });
  });
});
