/**
 * YACHAY IDIOMAS — INTERACTIVIDAD DEL SITIO
 * Navegación fluida, lightbox de capturas, acordeón FAQ y botón de scroll.
 * (Funciones de voz eliminadas según solicitud)
 */

document.addEventListener('DOMContentLoaded', () => {
  // ── NAVBAR SCROLL & ACTIVE LINK ──
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], header[id]');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Sombra al hacer scroll
    if (scrollPos > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    // Scrollspy para resaltar el enlace activo
    let currentId = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 110;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });

    // Botón volver arriba
    const btt = document.getElementById('backToTop');
    if (btt) {
      if (scrollPos > 350) {
        btt.classList.add('visible');
      } else {
        btt.classList.remove('visible');
      }
    }
  });

  // Botón volver arriba
  const btt = document.getElementById('backToTop');
  btt?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ── MENÚ MÓVIL HAMBURGUESA ──
  const hamburger = document.getElementById('navHamburger');
  const navMenu = document.getElementById('navMenu');

  hamburger?.addEventListener('click', () => {
    navMenu?.classList.toggle('open');
  });

  navLinks.forEach(l => {
    l.addEventListener('click', () => {
      navMenu?.classList.remove('open');
    });
  });

  // ── MASCOTA OFICIAL YACHI (INTERACCIÓN CLIC) ──
  const yachiMascot = document.getElementById('yachiHeroMascot');
  const mascotBubble = document.getElementById('mascotBubble');

  const yachiPhrases = [
    '¡Allillanchu! Soy Yachi 🦙✨',
    '¡Aprende Quechua jugando! 🏔️',
    '¡Sumaq P\'unchaw! (Buen día) ☀️',
    '¡Ama Qilla! (¡Sin flojera!) ⚡',
    '¡Kusa! (¡Excelente avance!) 🌟'
  ];

  let phraseIndex = 0;

  yachiMascot?.addEventListener('click', () => {
    phraseIndex = (phraseIndex + 1) % yachiPhrases.length;
    if (mascotBubble) {
      mascotBubble.textContent = yachiPhrases[phraseIndex];
      mascotBubble.style.transform = 'scale(1.1)';
      setTimeout(() => {
        mascotBubble.style.transform = '';
      }, 250);
    }
  });

  // ── LIGHTBOX MODAL PARA SCREENSHOTS ──
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  const zoomableTargets = document.querySelectorAll(
    '.guide-phone-frame, .phone-mockup, .hero-phone-frame, .guide-img-box img, .phone-mockup img, .hero-phone-screen'
  );

  zoomableTargets.forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const img = el.tagName.toLowerCase() === 'img' ? el : el.querySelector('img');
      if (img && lightbox && lightboxImg && lightboxCaption) {
        lightboxImg.src = img.src;
        lightboxCaption.textContent = img.alt || 'Captura de pantalla de Yachay';
        lightbox.classList.add('open');
      }
    });
  });

  function closeLightbox() {
    lightbox?.classList.remove('open');
  }

  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // ── FAQ ACCORDION ──
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Cerrar otros acordeones
      faqItems.forEach(other => other.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // ── INTERSECTION OBSERVER (EFECTO REVEAL) ──
  const revealElements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));

  // ── FORMULARIO DE CONTACTO (AYLLU YACHAY) ──
  const contactForm = document.getElementById('contactForm');
  const formSuccessBox = document.getElementById('formSuccessBox');
  const successSummaryText = document.getElementById('successSummaryText');
  const btnResetForm = document.getElementById('btnResetForm');
  const btnSubmitContact = document.getElementById('btnSubmitContact');

  const inputNombre = document.getElementById('formNombre');
  const inputEmail = document.getElementById('formEmail');
  const inputAsunto = document.getElementById('formAsunto');
  const inputMensaje = document.getElementById('formMensaje');

  const errorNombre = document.getElementById('errorNombre');
  const errorEmail = document.getElementById('errorEmail');
  const errorAsunto = document.getElementById('errorAsunto');
  const errorMensaje = document.getElementById('errorMensaje');

  function clearError(input, errorElement) {
    input?.classList.remove('error');
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.classList.remove('visible');
    }
  }

  function setError(input, errorElement, message) {
    input?.classList.add('error');
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.add('visible');
    }
  }

  [inputNombre, inputEmail, inputAsunto, inputMensaje].forEach(field => {
    field?.addEventListener('input', () => {
      clearError(field, document.getElementById(`error${field.id.replace('form', '')}`));
    });
    field?.addEventListener('change', () => {
      clearError(field, document.getElementById(`error${field.id.replace('form', '')}`));
    });
  });

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validación Nombre
    const nombreVal = inputNombre?.value.trim() || '';
    if (!nombreVal || nombreVal.length < 3) {
      setError(inputNombre, errorNombre, 'Por favor, ingresa tu nombre completo (mínimo 3 letras).');
      isValid = false;
    } else {
      clearError(inputNombre, errorNombre);
    }

    // Validación Email
    const emailVal = inputEmail?.value.trim() || '';
    if (!emailVal || !emailRegex.test(emailVal)) {
      setError(inputEmail, errorEmail, 'Por favor, ingresa un correo electrónico válido.');
      isValid = false;
    } else {
      clearError(inputEmail, errorEmail);
    }

    // Validación Asunto
    const asuntoVal = inputAsunto?.value || '';
    if (!asuntoVal) {
      setError(inputAsunto, errorAsunto, 'Por favor, selecciona el motivo de tu consulta.');
      isValid = false;
    } else {
      clearError(inputAsunto, errorAsunto);
    }

    // Validación Mensaje
    const mensajeVal = inputMensaje?.value.trim() || '';
    if (!mensajeVal || mensajeVal.length < 10) {
      setError(inputMensaje, errorMensaje, 'Por favor, escribe un mensaje de al menos 10 caracteres.');
      isValid = false;
    } else {
      clearError(inputMensaje, errorMensaje);
    }

    if (isValid) {
      // Estado de envío con botón cargando
      if (btnSubmitContact) {
        btnSubmitContact.disabled = true;
        btnSubmitContact.innerHTML = `
          <span>Enviando al Ayllu...</span>
          <svg class="spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
            <path d="M12 2a10 10 0 0 1 10 10"/>
          </svg>
        `;
      }

      setTimeout(() => {
        // Ocultar formulario y mostrar confirmación
        contactForm.style.display = 'none';
        if (formSuccessBox) {
          formSuccessBox.style.display = 'block';
          if (successSummaryText) {
            successSummaryText.innerHTML = `¡Añay (muchas gracias), <strong>${nombreVal}</strong>! Tu mensaje ha sido recibido por el equipo de Yachay en la <strong>UPDS Sede Cochabamba</strong>. Te responderemos a <strong>${emailVal}</strong> a la brevedad.`;
          }
        }
        contactForm.reset();
        if (btnSubmitContact) {
          btnSubmitContact.disabled = false;
          btnSubmitContact.innerHTML = `
            <span>Enviar Mensaje</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          `;
        }
      }, 600);
    }
  });

  btnResetForm?.addEventListener('click', () => {
    if (formSuccessBox) formSuccessBox.style.display = 'none';
    if (contactForm) contactForm.style.display = 'flex';
  });

  // ── MODAL PRÓXIMAMENTE APK ──
  const apkModal = document.getElementById('apkModal');
  const apkModalClose = document.getElementById('apkModalClose');
  const apkTriggers = document.querySelectorAll('.btn-apk-trigger');
  const btnModalGoGuide = document.getElementById('btnModalGoGuide');

  function openApkModal() {
    apkModal?.classList.add('open');
  }

  function closeApkModal() {
    apkModal?.classList.remove('open');
  }

  apkTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openApkModal();
    });
  });

  apkModalClose?.addEventListener('click', closeApkModal);
  apkModal?.addEventListener('click', (e) => {
    if (e.target === apkModal) closeApkModal();
  });

  btnModalGoGuide?.addEventListener('click', () => {
    closeApkModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && apkModal?.classList.contains('open')) {
      closeApkModal();
    }
  });
});
