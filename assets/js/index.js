/**
 * SWARAJ ENTERPRISE PUNE - HOME PAGE JAVASCRIPT
 * Specific interactive logic for index.html
 */

document.addEventListener('DOMContentLoaded', () => {
  // Hero Preview Card Interactions
  const previewItems = document.querySelectorAll('.preview-list-item');
  previewItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      previewItems.forEach(i => i.style.borderColor = 'rgba(255,255,255,0.08)');
      item.style.borderColor = 'var(--accent-yellow)';
    });
  });

  // Highlight bar quick interaction effects
  const highlightBoxes = document.querySelectorAll('.highlight-box');
  highlightBoxes.forEach(box => {
    box.addEventListener('click', () => {
      const quoteBtn = document.querySelector('.open-quote-modal');
      if (quoteBtn) quoteBtn.click();
    });
  });

  // Hero Right Showcase 6-Photo Auto Slider
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('#hero-slider-dots .dot');
  const prevBtn = document.getElementById('hero-slider-prev');
  const nextBtn = document.getElementById('hero-slider-next');

  if (slides.length > 0) {
    let currentSlide = 0;
    let slideInterval = null;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
      currentSlide = index;
    }

    function nextSlide() {
      let nextIndex = (currentSlide + 1) % slides.length;
      showSlide(nextIndex);
    }

    function prevSlide() {
      let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(prevIndex);
    }

    function startAutoSlide() {
      stopAutoSlide();
      slideInterval = setInterval(nextSlide, 3200);
    }

    function stopAutoSlide() {
      if (slideInterval) clearInterval(slideInterval);
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        startAutoSlide();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        startAutoSlide();
      });
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        showSlide(i);
        startAutoSlide();
      });
    });

    const sliderCard = document.querySelector('.hero-slider-card');
    if (sliderCard) {
      sliderCard.addEventListener('mouseenter', stopAutoSlide);
      sliderCard.addEventListener('mouseleave', startAutoSlide);
    }

    startAutoSlide();
  }

  // Animated Counter Section on Scroll
  const counterElements = document.querySelectorAll('.counter-value');
  if (counterElements.length > 0) {
    const animateCounter = (el) => {
      const target = parseFloat(el.getAttribute('data-target'));
      const suffix = el.getAttribute('data-suffix') || '';
      const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      const duration = 2000;
      const startTime = performance.now();

      const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentVal = progress === 1 ? target : (target * easeProgress);

        el.textContent = currentVal.toFixed(decimals) + suffix;

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      };
      requestAnimationFrame(update);
    };

    const counterObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    counterElements.forEach(el => counterObserver.observe(el));
  }

  // Interactive Product Marquee: Drag to Scroll + Navigation Arrow Buttons
  const marqueeContainer = document.getElementById('product-marquee-container');
  const marqueeTrack = document.getElementById('product-marquee-track');
  const marqueePrevBtn = document.getElementById('marquee-prev-btn');
  const marqueeNextBtn = document.getElementById('marquee-next-btn');

  if (marqueeContainer && marqueeTrack) {
    let isDown = false;
    let startX;
    let scrollLeft;

    // Mouse Drag to Scroll
    marqueeContainer.addEventListener('mousedown', (e) => {
      isDown = true;
      marqueeContainer.classList.add('active-drag');
      marqueeTrack.style.animationPlayState = 'paused';
      startX = e.pageX - marqueeContainer.offsetLeft;
      scrollLeft = marqueeContainer.scrollLeft;
    });

    marqueeContainer.addEventListener('mouseleave', () => {
      isDown = false;
      marqueeContainer.classList.remove('active-drag');
      marqueeTrack.style.animationPlayState = 'running';
    });

    marqueeContainer.addEventListener('mouseup', () => {
      isDown = false;
      marqueeContainer.classList.remove('active-drag');
      marqueeTrack.style.animationPlayState = 'running';
    });

    marqueeContainer.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - marqueeContainer.offsetLeft;
      const walk = (x - startX) * 2;
      marqueeContainer.scrollLeft = scrollLeft - walk;
    });

    // Touch Drag to Scroll for Mobile / Tablet
    let touchStartX = 0;
    let touchScrollLeft = 0;

    marqueeContainer.addEventListener('touchstart', (e) => {
      marqueeTrack.style.animationPlayState = 'paused';
      touchStartX = e.touches[0].pageX - marqueeContainer.offsetLeft;
      touchScrollLeft = marqueeContainer.scrollLeft;
    }, { passive: true });

    marqueeContainer.addEventListener('touchmove', (e) => {
      const touchX = e.touches[0].pageX - marqueeContainer.offsetLeft;
      const walk = (touchX - touchStartX) * 2;
      marqueeContainer.scrollLeft = touchScrollLeft - walk;
    }, { passive: true });

    marqueeContainer.addEventListener('touchend', () => {
      marqueeTrack.style.animationPlayState = 'running';
    });

    // Navigation Arrow Buttons Click Handlers
    const scrollAmount = 320;
    if (marqueeNextBtn) {
      marqueeNextBtn.addEventListener('click', () => {
        marqueeTrack.style.animationPlayState = 'paused';
        marqueeContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        setTimeout(() => {
          if (!isDown) marqueeTrack.style.animationPlayState = 'running';
        }, 1500);
      });
    }

    if (marqueePrevBtn) {
      marqueePrevBtn.addEventListener('click', () => {
        marqueeTrack.style.animationPlayState = 'paused';
        marqueeContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        setTimeout(() => {
          if (!isDown) marqueeTrack.style.animationPlayState = 'running';
        }, 1500);
      });
    }
  }

  // 1-by-1 Client Review Slider (Positioned directly after Quality Assurance)
  const reviewCards = document.querySelectorAll('.reviews-slider-track .client-card');
  const reviewDots = document.querySelectorAll('#review-dots .review-dot');
  const reviewPrevBtn = document.getElementById('review-prev-btn');
  const reviewNextBtn = document.getElementById('review-next-btn');

  if (reviewCards.length > 0) {
    let currentReview = 0;
    let reviewInterval = null;

    function showReview(index) {
      reviewCards.forEach((card, i) => {
        card.classList.toggle('active', i === index);
      });
      reviewDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
      currentReview = index;
    }

    function nextReview() {
      let nextIndex = (currentReview + 1) % reviewCards.length;
      showReview(nextIndex);
    }

    function prevReview() {
      let prevIndex = (currentReview - 1 + reviewCards.length) % reviewCards.length;
      showReview(prevIndex);
    }

    function startAutoReview() {
      stopAutoReview();
      reviewInterval = setInterval(nextReview, 4500);
    }

    function stopAutoReview() {
      if (reviewInterval) clearInterval(reviewInterval);
    }

    if (reviewNextBtn) {
      reviewNextBtn.addEventListener('click', () => {
        nextReview();
        startAutoReview();
      });
    }

    if (reviewPrevBtn) {
      reviewPrevBtn.addEventListener('click', () => {
        prevReview();
        startAutoReview();
      });
    }

    reviewDots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        showReview(i);
        startAutoReview();
      });
    });

    const reviewsWrapper = document.querySelector('.reviews-slider-wrapper');
    if (reviewsWrapper) {
      reviewsWrapper.addEventListener('mouseenter', stopAutoReview);
      reviewsWrapper.addEventListener('mouseleave', startAutoReview);
    }

    startAutoReview();
  }
});




