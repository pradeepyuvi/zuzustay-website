// Naadhe Core Logic

// 1. Preloader Screen Timeout
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('fade-out');
    }, 600);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  console.log('Naadhe premium platform homepage initialized successfully.');

  // 2. Navigation Scroll Effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 3. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navbarMenu = document.getElementById('navbar-menu');

  if (mobileToggle && navbarMenu) {
    mobileToggle.addEventListener('click', () => {
      navbarMenu.classList.toggle('active');
      mobileToggle.innerHTML = navbarMenu.classList.contains('active') ? '&#10005;' : '&#9776;';
    });

    // Close menu when link is clicked
    document.querySelectorAll('.navbar-link').forEach(link => {
      link.addEventListener('click', () => {
        navbarMenu.classList.remove('active');
        mobileToggle.innerHTML = '&#9776;';
      });
    });
  }

  // 4. Robust Viewport Scroll-Reveal Animations using IntersectionObserver
  // Using JS-observer for all reveal triggers to guarantee 100% text readability and no faded-out cards.
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Once visible, we can unobserve to save processing cycles
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05,            // Trigger immediately when 5% enters viewport
      rootMargin: '0px 0px -10% 0px' // Offset bottom margin to reveal early
    });

    revealElements.forEach(el => {
      revealObserver.observe(el);
    });
  }

  // 5. Statistics Count-Up Animation
  const counterElements = document.querySelectorAll('.counter');
  
  if (counterElements.length > 0) {
    const countDuration = 2000; // 2 seconds count duration
    const animateCounters = (counter) => {
      const targetCount = parseInt(counter.getAttribute('data-count'), 10);
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / countDuration, 1);
        
        // Easing out quadratic function
        const easedProgress = progress * (2 - progress);
        const currentCount = Math.floor(easedProgress * targetCount);
        
        counter.textContent = currentCount;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = targetCount;
        }
      };

      requestAnimationFrame(updateCounter);
    };

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          // Avoid double counting
          if (!counter.classList.contains('counted')) {
            counter.classList.add('counted');
            animateCounters(counter);
          }
        }
      });
    }, { threshold: 0.5 });

    counterElements.forEach(el => statsObserver.observe(el));
  }

  // 6. Product Showcase Switcher Tabs
  const tabs = document.querySelectorAll('.showcase-tab');
  const screens = document.querySelectorAll('.showcase-screen-img');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Deactivate current active tab
      tabs.forEach(t => t.classList.remove('active'));
      // Deactivate current active screen
      screens.forEach(s => s.classList.remove('active'));

      // Activate clicked tab
      tab.classList.add('active');
      // Show targeted mockup screen image
      const targetId = tab.getAttribute('data-target');
      const targetScreen = document.getElementById(targetId);
      if (targetScreen) {
        targetScreen.classList.add('active');
      }

      // Trigger crisp shimmer feedback on showcase screen container
      const browserFrame = document.querySelector('.showcase-browser-frame');
      if (browserFrame && window.ZuzuShimmer) {
        window.ZuzuShimmer.triggerLoading(browserFrame, 400);
      }
    });
  });

  // 7. Testimonials Slider Carousel Logic
  const slider = document.getElementById('testimonials-slider');
  const cards = document.querySelectorAll('.testimonial-card');
  const prevBtn = document.getElementById('prev-testimonial');
  const nextBtn = document.getElementById('next-testimonial');

  if (slider && cards.length > 0) {
    let currentIndex = 0;
    const updateSliderPosition = () => {
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % cards.length;
      updateSliderPosition();
    });

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + cards.length) % cards.length;
      updateSliderPosition();
    });

    // Auto-swipe testimonial slider every 8 seconds
    let sliderTimer = setInterval(() => {
      currentIndex = (currentIndex + 1) % cards.length;
      updateSliderPosition();
    }, 8000);

    // Pause timer on button interaction
    const resetTimer = () => {
      clearInterval(sliderTimer);
      sliderTimer = setInterval(() => {
        currentIndex = (currentIndex + 1) % cards.length;
        updateSliderPosition();
      }, 8000);
    };

    prevBtn.addEventListener('click', resetTimer);
    nextBtn.addEventListener('click', resetTimer);
  }

  // 8. FAQ Accordion Toggle
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      const isActive = faqItem.classList.contains('active');

      // Close all active FAQs first for accordion behavior
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });

      // Toggle current FAQ
      if (!isActive) {
        faqItem.classList.add('active');
      }
    });
  });

  // 9. Interactive Scroll Progress Indicator
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      progressBar.style.width = scrolled + '%';
    });
  }

  // 10. Smooth Scrolling with Offset for Navigation Links and CTAs
  const smoothLinks = document.querySelectorAll('a[href^="#"]');
  smoothLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#' || !targetId.startsWith('#')) return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        // Close mobile nav menu if active
        if (navbarMenu && navbarMenu.classList.contains('active')) {
          navbarMenu.classList.remove('active');
          if (mobileToggle) {
            mobileToggle.innerHTML = '&#9776;';
          }
        }
        
        // Smooth scroll to the target element with custom offsets (fixed navbar height + padding)
        const offset = 100; // Offset in px to center elements below navbar
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 11. Mouse Parallax for Background Spheres, Rings & Blobs
  const floatingElements = document.querySelectorAll('.floating-element');
  const backgroundBlobs = document.querySelectorAll('.blob');
  
  if (window.innerWidth > 768) {
    window.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX / window.innerWidth - 0.5;
      const mouseY = e.clientY / window.innerHeight - 0.5;
      
      floatingElements.forEach((el, index) => {
        const speed = (index + 1) * 15;
        const xOffset = mouseX * speed;
        const yOffset = mouseY * speed;
        el.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
      });

      backgroundBlobs.forEach((blob, index) => {
        const speed = (index + 1) * 8;
        const xOffset = mouseX * speed;
        const yOffset = mouseY * speed;
        blob.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
      });
    });
  }

  // 12. Dynamic Glow Cursor Tracking for Property Cards
  const propertyCards = document.querySelectorAll('.property-card.glass-card');
  propertyCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });
  });
});
