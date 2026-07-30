/**
 * Survive Web Design - Master Script
 * Stack: Pure Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. STICKY HEADER SCROLL SHADOW
  const header = document.getElementById('header') || document.querySelector('.header');
  if (header) {
    const handleHeaderScroll = () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';
      } else {
        header.classList.remove('scrolled');
        header.style.boxShadow = 'none';
      }
    };
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll();
  }

  // 2. MOBILE NAVIGATION TOGGLE
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (mobileNavToggle && navMenu) {
    mobileNavToggle.addEventListener('click', () => {
      const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
      mobileNavToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.style.display = isExpanded ? 'none' : 'flex';
      navMenu.style.flexDirection = 'column';
      navMenu.style.position = 'absolute';
      navMenu.style.top = '100%';
      navMenu.style.left = '0';
      navMenu.style.right = '0';
      navMenu.style.background = '#0f172a';
      navMenu.style.padding = '1.5rem';
    });
  }

  // 3. AUTO-DETECT ACTIVE NAV LINK
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
      link.classList.add('active');
    }
  });

  // 4. DYNAMIC COPYRIGHT YEAR
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // 5. LIVE WEB3FORMS AJAX SUBMISSION
  const contactForm = document.getElementById('contact-form');
  const formResponse = document.getElementById('form-response');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerText : 'Send Message';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Sending...';
      }

      const formData = new FormData(contactForm);
      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.status === 200) {
          if (formResponse) {
            formResponse.style.color = '#38bdf8';
            formResponse.innerText = 'Thank you! Message sent successfully.';
          }
          contactForm.reset();
        } else {
          throw new Error('Form submission failed.');
        }
      } catch (err) {
        if (formResponse) {
          formResponse.style.color = '#ef4444';
          formResponse.innerText = 'Something went wrong. Please try again or WhatsApp directly.';
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerText = originalText;
        }
      }
    });
  }

  // 6. PORTFOLIO CATEGORY FILTER (Updated with .hide class)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (filterBtns.length > 0 && portfolioItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        portfolioItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            item.classList.remove('hide');
          } else {
            item.classList.add('hide');
          }
        });
      });
    });
  }

  // 7. TESTIMONIAL CAROUSEL
  const testimonials = document.querySelectorAll('.testimonial-card');
  const prevBtn = document.getElementById('prev-testimonial');
  const nextBtn = document.getElementById('next-testimonial');
  let currentTestimonial = 0;

  function showTestimonial(index) {
    testimonials.forEach((card, i) => {
      card.classList.toggle('active', i === index);
    });
  }

  if (testimonials.length > 0) {
    showTestimonial(currentTestimonial);

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
      });
    }
  }

});
