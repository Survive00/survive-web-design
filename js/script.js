/**
 * Survive Web Design - Main JavaScript File
 * Stack: Pure Vanilla JavaScript (Framework-free)
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================
  // 1. STICKY HEADER SCROLL EFFECT
  // =========================================================
  const header = document.getElementById('header') || document.querySelector('.header');
  
  if (header) {
    const handleHeaderScroll = () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';
        header.style.padding = '0.7rem 0';
      } else {
        header.classList.remove('scrolled');
        header.style.boxShadow = 'none';
        header.style.padding = '1.1rem 0';
      }
    };

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    // Run on initial load in case page refreshes mid-scroll
    handleHeaderScroll();
  }

  // =========================================================
  // 2. MOBILE NAVIGATION MENU TOGGLE
  // =========================================================
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileNavToggle && navMenu) {
    mobileNavToggle.addEventListener('click', () => {
      const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
      mobileNavToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('active');
      mobileNavToggle.classList.toggle('active');
    });

    // Close menu when clicking anywhere outside of it
    document.addEventListener('click', (e) => {
      if (
        !mobileNavToggle.contains(e.target) && 
        !navMenu.contains(e.target) && 
        navMenu.classList.contains('active')
      ) {
        navMenu.classList.remove('active');
        mobileNavToggle.classList.remove('active');
        mobileNavToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // =========================================================
  // 3. AUTO-DETECT ACTIVE PAGE FOR NAVIGATION LINKS
  // =========================================================
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // =========================================================
  // 4. SMOOTH SCROLLING FOR INTERNAL ANCHORS
  // =========================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          e.preventDefault();
          
          // Calculate offset to account for sticky header height
          const headerOffset = header ? header.offsetHeight : 0;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Close mobile menu if open after clicking a link
          if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (mobileNavToggle) {
              mobileNavToggle.classList.remove('active');
              mobileNavToggle.setAttribute('aria-expanded', 'false');
            }
          }
        }
      }
    });
  });

  // =========================================================
  // 5. DYNAMIC FOOTER COPYRIGHT YEAR
  // =========================================================
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // =========================================================
  // 6. CONTACT FORM SUBMISSION HANDLER
  // =========================================================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerText : 'Send Message';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Sending...';
      }

      // Simulate form processing (Replace with actual API / Formspree / Webhook if needed)
      setTimeout(() => {
        alert('Thank you! Your message has been submitted successfully. We will get back to you shortly.');
        contactForm.reset();
        
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerText = originalText;
        }
      }, 1000);
    });
  }

});
