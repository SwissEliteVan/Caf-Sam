/**
 * Café Samsara - Main JavaScript
 * Vanilla JS - No dependencies
 */

// ==========================================================================
// Configuration
// ==========================================================================

const CONFIG = {
  SITE_URL: "https://cafesamsara.example/",
  PHONE_DISPLAY: "+52 56 2360 2203",
  PHONE_TEL: "+525623602203",
  EMAIL: "hola@cafesamsara.example",
  WHATSAPP: "", // Leave empty if not available
  ADDRESS: "Calle Principal s/n, Zipolite, San Pedro Pochutla, Oaxaca, México",
  HOURS: "Lunes a Domingo: 8:00 – 15:00",
  HOURS_EN: "Open daily 8am–3pm",
  MAPS_URL: "https://maps.google.com/?q=Zipolite,Oaxaca,Mexico",
  MAPS_EMBED_URL: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15284.721!2d-96.5!3d15.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sZipolite!5e0!3m2!1ses!2smx!4v1",
  CONTACT_ENDPOINT: "" // Leave empty to use mailto
};

// ==========================================================================
// Utility Functions
// ==========================================================================

/**
 * Check if user prefers reduced motion
 */
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Trap focus within an element (for modals/menus)
 */
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );

  if (focusableElements.length === 0) return;

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  function handleTabKey(e) {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  }

  element.addEventListener('keydown', handleTabKey);

  return function cleanup() {
    element.removeEventListener('keydown', handleTabKey);
  };
}

// ==========================================================================
// Mobile Navigation
// ==========================================================================

function initMobileNav() {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');

  if (!navToggle || !nav) return;

  let focusTrapCleanup = null;

  function openNav() {
    navToggle.setAttribute('aria-expanded', 'true');
    nav.setAttribute('data-visible', 'true');
    document.body.style.overflow = 'hidden';

    // Focus first link in nav
    const firstLink = nav.querySelector('.nav__link');
    if (firstLink) {
      setTimeout(() => firstLink.focus(), 100);
    }

    // Trap focus
    focusTrapCleanup = trapFocus(nav);
  }

  function closeNav() {
    navToggle.setAttribute('aria-expanded', 'false');
    nav.setAttribute('data-visible', 'false');
    document.body.style.overflow = '';

    // Return focus to toggle button
    navToggle.focus();

    // Cleanup focus trap
    if (focusTrapCleanup) {
      focusTrapCleanup();
      focusTrapCleanup = null;
    }
  }

  function toggleNav() {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeNav();
    } else {
      openNav();
    }
  }

  // Toggle button click
  navToggle.addEventListener('click', toggleNav);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.getAttribute('data-visible') === 'true') {
      closeNav();
    }
  });

  // Close on click outside
  document.addEventListener('click', (e) => {
    if (nav.getAttribute('data-visible') === 'true' &&
        !nav.contains(e.target) &&
        !navToggle.contains(e.target)) {
      closeNav();
    }
  });

  // Close nav on link click (mobile)
  nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 968) {
        closeNav();
      }
    });
  });
}

// ==========================================================================
// Accordion (FAQ)
// ==========================================================================

function initAccordions() {
  const accordions = document.querySelectorAll('.accordion');

  accordions.forEach(accordion => {
    const triggers = accordion.querySelectorAll('.accordion-trigger');

    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
        const content = document.getElementById(trigger.getAttribute('aria-controls'));

        if (!content) return;

        if (isExpanded) {
          // Close
          trigger.setAttribute('aria-expanded', 'false');
          content.setAttribute('data-visible', 'false');
        } else {
          // Open
          trigger.setAttribute('aria-expanded', 'true');
          content.setAttribute('data-visible', 'true');
        }
      });

      // Keyboard navigation
      trigger.addEventListener('keydown', (e) => {
        const triggers = Array.from(accordion.querySelectorAll('.accordion-trigger'));
        const currentIndex = triggers.indexOf(trigger);

        let targetIndex = -1;

        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault();
            targetIndex = (currentIndex + 1) % triggers.length;
            break;
          case 'ArrowUp':
            e.preventDefault();
            targetIndex = (currentIndex - 1 + triggers.length) % triggers.length;
            break;
          case 'Home':
            e.preventDefault();
            targetIndex = 0;
            break;
          case 'End':
            e.preventDefault();
            targetIndex = triggers.length - 1;
            break;
        }

        if (targetIndex >= 0) {
          triggers[targetIndex].focus();
        }
      });
    });
  });
}

// ==========================================================================
// Events Filter
// ==========================================================================

function initEventsFilter() {
  const filterContainer = document.querySelector('.events-filter');
  const eventsGrid = document.querySelector('.events-grid');

  if (!filterContainer || !eventsGrid) return;

  const filterButtons = filterContainer.querySelectorAll('.events-filter__btn');
  const eventCards = eventsGrid.querySelectorAll('.event-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.category;

      // Update active state
      filterButtons.forEach(btn => {
        btn.setAttribute('aria-pressed', 'false');
        btn.classList.remove('events-filter__btn--active');
      });
      button.setAttribute('aria-pressed', 'true');
      button.classList.add('events-filter__btn--active');

      // Filter events
      eventCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.hidden = false;
        } else {
          card.hidden = true;
        }
      });
    });
  });
}

// ==========================================================================
// Contact Form
// ==========================================================================

function initContactForm() {
  const form = document.querySelector('.contact-form');

  if (!form) return;

  const submitButton = form.querySelector('button[type="submit"]');
  const honeypot = form.querySelector('.form-hp input');

  // Form validation
  function validateField(field) {
    const errorElement = document.getElementById(`${field.id}-error`);
    let isValid = true;
    let errorMessage = '';

    // Required check
    if (field.hasAttribute('required') && !field.value.trim()) {
      isValid = false;
      errorMessage = 'Este campo es obligatorio';
    }

    // Email validation
    if (field.type === 'email' && field.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value)) {
        isValid = false;
        errorMessage = 'Por favor ingresa un email válido';
      }
    }

    // Phone validation (optional field)
    if (field.type === 'tel' && field.value) {
      const phoneRegex = /^[\d\s\-\+\(\)]{7,20}$/;
      if (!phoneRegex.test(field.value)) {
        isValid = false;
        errorMessage = 'Por favor ingresa un teléfono válido';
      }
    }

    // Update UI
    if (errorElement) {
      if (isValid) {
        field.classList.remove('form-input--error');
        errorElement.hidden = true;
        errorElement.textContent = '';
      } else {
        field.classList.add('form-input--error');
        errorElement.hidden = false;
        errorElement.textContent = errorMessage;
      }
    }

    return isValid;
  }

  // Real-time validation on blur
  const fields = form.querySelectorAll('.form-input, .form-textarea, .form-select');
  fields.forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.classList.contains('form-input--error')) {
        validateField(field);
      }
    });
  });

  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Check honeypot (spam detection)
    if (honeypot && honeypot.value) {
      console.log('Spam detected');
      return;
    }

    // Validate all fields
    let isFormValid = true;
    fields.forEach(field => {
      if (!validateField(field)) {
        isFormValid = false;
      }
    });

    // Check consent checkbox
    const consent = form.querySelector('input[name="consent"]');
    if (consent && !consent.checked) {
      isFormValid = false;
      const consentError = document.getElementById('consent-error');
      if (consentError) {
        consentError.hidden = false;
        consentError.textContent = 'Debes aceptar el aviso de privacidad';
      }
    }

    if (!isFormValid) {
      // Focus first error
      const firstError = form.querySelector('.form-input--error, .form-textarea--error');
      if (firstError) {
        firstError.focus();
      }
      return;
    }

    // Collect form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Submit
    if (CONFIG.CONTACT_ENDPOINT) {
      // Send to endpoint
      submitButton.disabled = true;
      submitButton.textContent = 'Enviando...';

      fetch(CONFIG.CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if (response.ok) {
          showFormSuccess(form);
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        showFormError(form);
      })
      .finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = 'Enviar mensaje';
      });
    } else {
      // Fallback to mailto
      const subject = encodeURIComponent(`[Café Samsara] ${data.motivo || 'Contacto'}`);
      const body = encodeURIComponent(
        `Nombre: ${data.nombre}\n` +
        `Email: ${data.email}\n` +
        `Teléfono: ${data.telefono || 'No proporcionado'}\n` +
        `Motivo: ${data.motivo}\n\n` +
        `Mensaje:\n${data.mensaje}`
      );

      window.location.href = `mailto:${CONFIG.EMAIL}?subject=${subject}&body=${body}`;
      showFormSuccess(form);
    }
  });

  function showFormSuccess(form) {
    const successMessage = document.createElement('div');
    successMessage.className = 'alert alert--success mt-lg';
    successMessage.innerHTML = '¡Gracias por tu mensaje! Te responderemos pronto.';
    form.reset();
    form.appendChild(successMessage);

    setTimeout(() => {
      successMessage.remove();
    }, 5000);
  }

  function showFormError(form) {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'alert alert--error mt-lg';
    errorMessage.innerHTML = 'Hubo un error al enviar el mensaje. Por favor intenta de nuevo.';
    form.appendChild(errorMessage);

    setTimeout(() => {
      errorMessage.remove();
    }, 5000);
  }
}

// ==========================================================================
// Table of Contents (Article)
// ==========================================================================

function initTableOfContents() {
  const tocContainer = document.querySelector('.article-toc__list');
  const articleContent = document.querySelector('.article-content');

  if (!tocContainer || !articleContent) return;

  const headings = articleContent.querySelectorAll('h2');

  if (headings.length === 0) {
    const tocSection = document.querySelector('.article-toc');
    if (tocSection) {
      tocSection.style.display = 'none';
    }
    return;
  }

  headings.forEach((heading, index) => {
    // Add ID to heading if not present
    if (!heading.id) {
      heading.id = `section-${index + 1}`;
    }

    // Create TOC link
    const link = document.createElement('a');
    link.href = `#${heading.id}`;
    link.className = 'article-toc__link';
    link.textContent = heading.textContent;

    const listItem = document.createElement('li');
    listItem.appendChild(link);
    tocContainer.appendChild(listItem);
  });
}

// ==========================================================================
// Click-to-Load Map
// ==========================================================================

function initClickToLoadMap() {
  const mapPlaceholder = document.querySelector('.map-placeholder');
  const mapContainer = document.querySelector('.map-container');

  if (!mapPlaceholder || !mapContainer) return;

  mapPlaceholder.addEventListener('click', loadMap);
  mapPlaceholder.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      loadMap();
    }
  });

  function loadMap() {
    const iframe = document.createElement('iframe');
    iframe.src = CONFIG.MAPS_EMBED_URL;
    iframe.title = 'Ubicación de Café Samsara en Google Maps';
    iframe.loading = 'lazy';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'no-referrer-when-downgrade';

    mapContainer.innerHTML = '';
    mapContainer.appendChild(iframe);
  }
}

// ==========================================================================
// Dynamic Year in Footer
// ==========================================================================

function initDynamicYear() {
  const yearElements = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();

  yearElements.forEach(el => {
    el.textContent = currentYear;
  });
}

// ==========================================================================
// Smooth Scroll (respects reduced motion)
// ==========================================================================

function initSmoothScroll() {
  if (prefersReducedMotion()) return;

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');

      if (targetId === '#') return;

      const target = document.querySelector(targetId);

      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // Update focus for accessibility
        target.setAttribute('tabindex', '-1');
        target.focus();
      }
    });
  });
}

// ==========================================================================
// WhatsApp/Phone Button Logic
// ==========================================================================

function initContactButtons() {
  const whatsappButtons = document.querySelectorAll('[data-whatsapp]');
  const phoneButtons = document.querySelectorAll('[data-phone]');

  whatsappButtons.forEach(button => {
    if (CONFIG.WHATSAPP) {
      button.href = `https://wa.me/${CONFIG.WHATSAPP}`;
      button.style.display = '';
    } else {
      // Hide WhatsApp button or replace with phone
      button.style.display = 'none';
    }
  });

  phoneButtons.forEach(button => {
    button.href = `tel:${CONFIG.PHONE_TEL}`;
    button.querySelector('.phone-display')?.textContent === CONFIG.PHONE_DISPLAY;
  });
}

// ==========================================================================
// Skip Link Enhancement
// ==========================================================================

function initSkipLink() {
  const skipLink = document.querySelector('.skip-link');
  const mainContent = document.querySelector('main');

  if (!skipLink || !mainContent) return;

  skipLink.addEventListener('click', (e) => {
    e.preventDefault();
    mainContent.setAttribute('tabindex', '-1');
    mainContent.focus();
    mainContent.scrollIntoView();
  });
}

// ==========================================================================
// Initialize Everything
// ==========================================================================

function init() {
  initMobileNav();
  initAccordions();
  initEventsFilter();
  initContactForm();
  initTableOfContents();
  initClickToLoadMap();
  initDynamicYear();
  initSmoothScroll();
  initContactButtons();
  initSkipLink();
}

// Run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
