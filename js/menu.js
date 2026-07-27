/**
 * Survive Web Design - Mobile Navigation Menu Engine
 * Architect: Muritala Sodiq / Survive Web Design
 * Location: Ilobu, Osun State, Nigeria
 * Description: Accessible drawer navigation toggle, scroll locking, and event cleanup.
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const body = document.body;

  if (!mobileToggle || !navMenu) return;

  /**
   * Opens the mobile menu drawer
   */
  const openMenu = () => {
    navMenu.classList.add('active');
    mobileToggle.classList.add('active');
    mobileToggle.setAttribute('aria-expanded', 'true');
    navMenu.setAttribute('aria-hidden', 'false');
    body.style.overflow = 'hidden'; // Lock background scrolling
  };

  /**
   * Closes the mobile menu drawer
   */
  const closeMenu = () => {
    navMenu.classList.remove('active');
    mobileToggle.classList.remove('active');
    mobileToggle.setAttribute('aria-expanded', 'false');
    navMenu.setAttribute('aria-hidden', 'true');
    body.style.overflow = ''; // Restore background scrolling
  };

  /**
   * Toggles the menu state
   */
  const toggleMenu = () => {
    const isOpen = navMenu.classList.contains('active');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  // Event Listener: Toggle button click
  mobileToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Event Listener: Close menu when clicking any navigation link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        closeMenu();
      }
    });
  });

  // Event Listener: Close menu on pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      closeMenu();
    }
  });

  // Event Listener: Close menu when clicking outside the menu area
  document.addEventListener('click', (e) => {
    const isClickInside = navMenu.contains(e.target) || mobileToggle.contains(e.target);
    if (!isClickInside && navMenu.classList.contains('active')) {
      closeMenu();
    }
  });

  // Event Listener: Reset mobile menu state on window resize (e.g., orientation change to desktop)
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
      closeMenu();
    }
  });

});
