/**
 * Survive Web Design - Contact Form Engine
 * Architect: Muritala Sodiq / Survive Web Design
 * Location: Ilobu, Osun State, Nigeria
 * Description: Client-side validation, inline error messaging, and asynchronous form state feedback.
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  const contactForm = document.getElementById('contact-form');
  const formResponse = document.getElementById('form-response');

  if (!contactForm) return;

  /**
   * Helper function to validate email format via regular expression
   */
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  /**
   * Displays inline error message for a given input field
   */
  const showError = (input, message) => {
    const formControl = input.parentElement;
    formControl.classList.add('error');
    
    let errorEl = formControl.querySelector('.error-message');
    if (!errorEl) {
      errorEl = document.createElement('span');
      errorEl.className = 'error-message';
      errorEl.style.color = 'var(--color-danger)';
      errorEl.style.fontSize = 'var(--fs-xs)';
      errorEl.style.marginTop = '4px';
      errorEl.style.display = 'block';
      formControl.appendChild(errorEl);
    }
    errorEl.textContent = message;
  };

  /**
   * Clears inline error message for a given input field
   */
  const clearError = (input) => {
    const formControl = input.parentElement;
    formControl.classList.remove('error');
    const errorEl = formControl.querySelector('.error-message');
    if (errorEl) {
      errorEl.remove();
    }
  };

  // Event Listener: Form Submission
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    let isValid = true;

    // 1. Name Validation
    if (!nameInput || !nameInput.value.trim()) {
      if (nameInput) showError(nameInput, 'Full name is required.');
      isValid = false;
    } else {
      clearError(nameInput);
    }

    // 2. Email Validation
    if (!emailInput || !emailInput.value.trim()) {
      if (emailInput) showError(emailInput, 'Email address is required.');
      isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
      showError(emailInput, 'Please enter a valid email address.');
      isValid = false;
    } else {
      clearError(emailInput);
    }

    // 3. Subject Validation
    if (subjectInput && !subjectInput.value.trim()) {
      showError(subjectInput, 'Please provide a subject.');
      isValid = false;
    } else if (subjectInput) {
      clearError(subjectInput);
    }

    // 4. Message Validation
    if (!messageInput || !messageInput.value.trim()) {
      if (messageInput) showError(messageInput, 'Message cannot be empty.');
      isValid = false;
    } else if (messageInput.value.trim().length < 10) {
      showError(messageInput, 'Message must be at least 10 characters long.');
      isValid = false;
    } else {
      clearError(messageInput);
    }

    if (!isValid) return;

    // Trigger UI loading state
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner animate-spin"></i> Sending Message...';

    try {
      // Simulate AJAX form submission latency
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (formResponse) {
        formResponse.style.display = 'block';
        formResponse.className = 'form-response success';
        formResponse.style.color = 'var(--color-success)';
        formResponse.style.padding = '1rem';
        formResponse.style.borderRadius = 'var(--radius-md)';
        formResponse.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
        formResponse.style.border = '1px solid rgba(16, 185, 129, 0.3)';
        formResponse.style.marginTop = '1rem';
        formResponse.textContent = 'Thank you! Your message has been sent successfully. We will get back to you shortly.';
      }

      contactForm.reset();
    } catch (error) {
      if (formResponse) {
        formResponse.style.display = 'block';
        formResponse.className = 'form-response error';
        formResponse.style.color = 'var(--color-danger)';
        formResponse.style.padding = '1rem';
        formResponse.style.borderRadius = 'var(--radius-md)';
        formResponse.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
        formResponse.style.border = '1px solid rgba(239, 68, 68, 0.3)';
        formResponse.style.marginTop = '1rem';
        formResponse.textContent = 'An error occurred while sending your message. Please try again or contact us directly via WhatsApp or Email.';
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });

});
