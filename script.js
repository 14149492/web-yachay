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
});
