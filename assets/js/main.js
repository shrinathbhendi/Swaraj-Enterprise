/**
 * SWARAJ ENTERPRISE PUNE - GLOBAL JAVASCRIPT
 * Core shared logic for Header, Footer, Modals, and Toast Notifications
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Navigation Toggle
  const hamburger = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');

  if (hamburger && navMenu) {
    const toggleMenu = () => {
      const isActive = navMenu.classList.toggle('active');
      const icon = hamburger.querySelector('i');
      if (icon) {
        if (isActive) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
          document.body.style.overflow = 'hidden';
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
          document.body.style.overflow = '';
        }
      }
    };

    hamburger.addEventListener('click', toggleMenu);

    // Auto-close menu when clicking links on mobile
    const menuLinks = navMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
          toggleMenu();
        }
      });
    });
  }

  // 2. Active Navigation Link Highlighting
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
      link.classList.add('active');
    }
  });

  // 3. Dynamic Footer Inclusion
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    fetch('footer.html')
      .then(response => {
        if (!response.ok) throw new Error('Footer template not found');
        return response.text();
      })
      .then(html => {
        footerPlaceholder.innerHTML = html;
        const yearSpan = document.getElementById('current-year');
        if (yearSpan) {
          yearSpan.textContent = new Date().getFullYear();
        }
      })
      .catch(err => {
        console.warn('Footer fetch warning:', err);
      });
  }

  // 4. Global Quote Modal Handler
  const quoteModal = document.getElementById('quote-modal');
  const openQuoteBtns = document.querySelectorAll('.open-quote-modal');
  const closeQuoteBtn = document.getElementById('close-quote-modal');

  openQuoteBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (quoteModal) {
        quoteModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeQuoteBtn && quoteModal) {
    closeQuoteBtn.addEventListener('click', () => {
      quoteModal.classList.remove('active');
      document.body.style.overflow = '';
    });

    quoteModal.addEventListener('click', (e) => {
      if (e.target === quoteModal) {
        quoteModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // 5. Global Modal Form Submission & Toast Notifications
  const quoteForm = document.getElementById('quote-form');

  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (typeof window.showToast === 'function') {
        window.showToast('Thank you! Your quote request has been received. Our team will contact you shortly.');
      }
      quoteForm.reset();
      if (quoteModal) {
        quoteModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // 6. Dynamic Floating Action Widgets Stack (Exact Match to User Reference Image)
  let floatingStack = document.querySelector('.floating-widgets-stack');
  if (!floatingStack) {
    floatingStack = document.createElement('div');
    floatingStack.className = 'floating-widgets-stack';
    floatingStack.innerHTML = `
      <a href="tel:+919890000000" class="floating-btn floating-btn-phone" aria-label="Call Us" title="Call Us Direct">
        <i class="fas fa-phone-alt"></i>
      </a>
      <a href="https://wa.me/919890000000" target="_blank" class="floating-btn floating-btn-whatsapp" aria-label="Chat on WhatsApp" title="Chat on WhatsApp">
        <i class="fab fa-whatsapp"></i>
      </a>
      <button class="floating-btn floating-btn-top" id="scroll-to-top-btn" aria-label="Scroll to Top" title="Scroll to Top">
        <i class="fas fa-chevron-up"></i>
      </button>
    `;
    document.body.appendChild(floatingStack);
  }

  const scrollTopBtn = document.getElementById('scroll-to-top-btn') || floatingStack.querySelector('.floating-btn-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 250) {
        scrollTopBtn.classList.add('show');
      } else {
        scrollTopBtn.classList.remove('show');
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});

/**
 * Global Toast Notification Helper
 */
window.showToast = function(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <i class="fas fa-check-circle" style="color: var(--accent-yellow); font-size: 1.2rem;"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideInRight 0.3s ease reverse forwards';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
};
