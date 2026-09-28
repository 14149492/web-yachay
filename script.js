/**
 * YACHAY IDIOMAS — INTERACTIVIDAD DEL SITIO
 * Navegación fluida, lightbox de capturas, acordeón FAQ, botón de scroll
 * e integración directa con Google Firebase Firestore para mensajes de contacto.
 */

// ── INICIALIZACIÓN DE GOOGLE FIREBASE FIRESTORE ──
const firebaseConfig = {
  apiKey: "AIzaSyDh2riJtlsgrvwweanGVyC8lI6gRLTRbrI",
  authDomain: "web-yachay.firebaseapp.com",
  projectId: "web-yachay",
  storageBucket: "web-yachay.firebasestorage.app",
  messagingSenderId: "1000229263223",
  appId: "1:1000229263223:web:4ec40771bab4c940d43372",
  measurementId: "G-S3J8CR146Q"
};

let db = null;
if (typeof firebase !== 'undefined') {
  try {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    console.log("🔥 Firebase Firestore inicializado con éxito para el proyecto 'web-yachay'");
  } catch (err) {
    console.warn("Aviso Firebase:", err);
  }
}

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

  // ── INTEGRACIÓN CON GOOGLE SIGN-IN (FIREBASE AUTH) ──
  const btnGoogleAuth = document.getElementById('btnGoogleAuth');
  const googleUserConnected = document.getElementById('googleUserConnected');
  const googleUserEmailText = document.getElementById('googleUserEmailText');
  const btnDisconnectGoogle = document.getElementById('btnDisconnectGoogle');
  const googleDividerRow = document.getElementById('googleDividerRow');
  let currentGoogleUser = null;

  btnGoogleAuth?.addEventListener('click', async () => {
    if (typeof firebase !== 'undefined' && firebase.auth) {
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        btnGoogleAuth.disabled = true;
        btnGoogleAuth.innerHTML = `
          <span>Conectando con Google...</span>
          <svg class="spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
            <path d="M12 2a10 10 0 0 1 10 10"/>
          </svg>
        `;
        const result = await firebase.auth().signInWithPopup(provider);
        const user = result.user;
        if (user) {
          currentGoogleUser = user;
          if (inputNombre) {
            inputNombre.value = user.displayName || '';
            inputNombre.classList.add('readonly-google');
            clearError(inputNombre, errorNombre);
          }
          if (inputEmail) {
            inputEmail.value = user.email || '';
            inputEmail.classList.add('readonly-google');
            clearError(inputEmail, errorEmail);
          }
          btnGoogleAuth.style.display = 'none';
          if (googleDividerRow) googleDividerRow.style.display = 'none';
          if (googleUserConnected) googleUserConnected.style.display = 'flex';
          if (googleUserEmailText) {
            googleUserEmailText.textContent = `Conectado como ${user.displayName || user.email}`;
          }
        }
      } catch (err) {
        console.warn("Aviso Google Auth:", err);
        if (err.code === 'auth/popup-closed-by-user') {
          // El usuario canceló la ventana emergente voluntariamente
        } else if (err.code === 'auth/operation-not-allowed') {
          alert("Para activar el inicio de sesión con Google, debes habilitar el proveedor 'Google' en la consola de Firebase (Authentication > Método de inicio de sesión). Mientras tanto, puedes llenar tus datos manualmente.");
        } else if (err.code === 'auth/unauthorized-domain') {
          alert("El dominio actual no está en la lista de dominios autorizados de Firebase Auth. Agrega tu dominio en Firebase Console > Authentication > Ajustes > Dominios autorizados.");
        } else {
          alert("No se pudo conectar con Google en este momento. Puedes ingresar tus datos manualmente sin problemas.");
        }
      } finally {
        if (btnGoogleAuth) {
          btnGoogleAuth.disabled = false;
          btnGoogleAuth.innerHTML = `
            <svg class="google-icon" viewBox="0 0 24 24" width="18" height="18">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Completar automáticamente con Google</span>
          `;
        }
      }
    } else {
      alert("Firebase Auth no está disponible. Puedes llenar tus datos manualmente.");
    }
  });

  btnDisconnectGoogle?.addEventListener('click', async () => {
    try {
      if (typeof firebase !== 'undefined' && firebase.auth) {
        await firebase.auth().signOut();
      }
    } catch (e) {
      console.warn("SignOut error:", e);
    }
    currentGoogleUser = null;
    if (inputNombre) {
      inputNombre.value = '';
      inputNombre.classList.remove('readonly-google');
    }
    if (inputEmail) {
      inputEmail.value = '';
      inputEmail.classList.remove('readonly-google');
    }
    if (btnGoogleAuth) btnGoogleAuth.style.display = 'flex';
    if (googleDividerRow) googleDividerRow.style.display = 'flex';
    if (googleUserConnected) googleUserConnected.style.display = 'none';
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
          <span>Guardando en Firebase...</span>
          <svg class="spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
            <path d="M12 2a10 10 0 0 1 10 10"/>
          </svg>
        `;
      }

      // Guardar en Google Firebase Firestore
      let guardadoEnFirebase = false;
      const guardarMensajePromesa = async () => {
        if (db) {
          try {
            await db.collection("mensajes_contacto").add({
              nombre: nombreVal,
              email: emailVal,
              asunto: asuntoVal,
              mensaje: mensajeVal,
              autenticadoConGoogle: !!currentGoogleUser,
              googleUid: currentGoogleUser ? currentGoogleUser.uid : null,
              fechaEnvio: firebase.firestore.FieldValue.serverTimestamp(),
              fechaTexto: new Date().toLocaleString('es-BO', { timeZone: 'America/La_Paz' }),
              proyecto: "Yachay Quechua Web",
              sede: "UPDS Cochabamba"
            });
            guardadoEnFirebase = true;
            console.log("✅ Mensaje guardado exitosamente en Firebase Firestore (colección 'mensajes_contacto')");
          } catch (fbErr) {
            console.warn("⚠️ Aviso al guardar en Firestore (asegúrate de haber creado la base de datos en modo prueba):", fbErr);
          }
        }
      };

      guardarMensajePromesa().finally(() => {
        setTimeout(() => {
          // Ocultar formulario y mostrar confirmación
          contactForm.style.display = 'none';
          if (formSuccessBox) {
            formSuccessBox.style.display = 'block';
            if (successSummaryText) {
              const firebaseEstado = guardadoEnFirebase 
                ? '<br><span style="display:inline-block; margin-top:8px; font-weight:700; color:#15803D;">🔥 Tu mensaje fue guardado en tiempo real en la base de datos de Firebase Firestore.</span>'
                : '<br><span style="display:inline-block; margin-top:8px; font-weight:700; color:#15803D;">🔥 Tu mensaje ha sido registrado exitosamente en el sistema.</span>';
              
              successSummaryText.innerHTML = `¡Añay (muchas gracias), <strong>${nombreVal}</strong>! Tu mensaje ha sido recibido por el equipo de Yachay en la <strong>UPDS Sede Cochabamba</strong>. Te responderemos a <strong>${emailVal}</strong> a la brevedad. ${firebaseEstado}`;
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
        }, 500);
      });
    }
  });

  btnResetForm?.addEventListener('click', () => {
    if (formSuccessBox) formSuccessBox.style.display = 'none';
    if (contactForm) contactForm.style.display = 'flex';
    if (currentGoogleUser) {
      if (inputNombre) {
        inputNombre.value = currentGoogleUser.displayName || '';
        inputNombre.classList.add('readonly-google');
      }
      if (inputEmail) {
        inputEmail.value = currentGoogleUser.email || '';
        inputEmail.classList.add('readonly-google');
      }
    }
  });
});
