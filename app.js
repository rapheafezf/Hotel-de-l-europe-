/* ==========================================================================
   HÔTEL DE L'EUROPE MEYRUEIS — app.js
   Interactions, animations, booking wizard
   ========================================================================== */

/* ----------------------------------------------------------
   HEADER — SCROLL EFFECT
   ---------------------------------------------------------- */
const header = document.getElementById('main-header');

function updateHeader() {
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

/* ----------------------------------------------------------
   SMOOTH SCROLL & NAV SCROLLSPY
   ---------------------------------------------------------- */
const navSections = ['home', 'histoire', 'tarifs', 'chambres', 'destination', 'contact'];
const headerHeight = 80;

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href').substring(1);
    if (!targetId) return;

    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      e.preventDefault();
      closeMobileNav();

      const top = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({ top, behavior: 'smooth' });
      history.pushState(null, null, `#${targetId}`);
    }
  });
});

// ScrollSpy
function scrollSpy() {
  const scrollPos = window.scrollY + headerHeight + 40;

  navSections.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    const elTop = el.offsetTop;
    const elBottom = elTop + el.offsetHeight;

    if (scrollPos >= elTop && scrollPos < elBottom) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
      document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}

window.addEventListener('scroll', scrollSpy, { passive: true });
scrollSpy();

/* ----------------------------------------------------------
   MOBILE NAVIGATION
   ---------------------------------------------------------- */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

function openMobileNav() {
  hamburger.classList.add('open');
  mobileNav.classList.add('open');
  mobileNav.setAttribute('aria-hidden', 'false');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
  hamburger.classList.remove('open');
  mobileNav.classList.remove('open');
  mobileNav.setAttribute('aria-hidden', 'true');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburger?.addEventListener('click', e => {
  e.stopPropagation();
  mobileNav.classList.contains('open') ? closeMobileNav() : openMobileNav();
});

document.addEventListener('click', e => {
  if (mobileNav?.classList.contains('open') && !mobileNav.contains(e.target) && !hamburger.contains(e.target)) {
    closeMobileNav();
  }
});

/* ----------------------------------------------------------
   HERO SCROLL BUTTON
   ---------------------------------------------------------- */
document.getElementById('scroll-down-btn')?.addEventListener('click', () => {
  const histoire = document.getElementById('histoire');
  if (histoire) {
    const top = histoire.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  }
});

/* ----------------------------------------------------------
   REVEAL ON SCROLL (IntersectionObserver)
   ---------------------------------------------------------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ----------------------------------------------------------
   RESTAURANT PILLS INTERACTION
   ---------------------------------------------------------- */
document.querySelectorAll('.resto-pill').forEach(pill => {
  pill.addEventListener('click', () => {
    document.querySelectorAll('.resto-pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
  });
});

/* ----------------------------------------------------------
   BOOKING MODAL
   ---------------------------------------------------------- */
const modal = document.getElementById('booking-modal');

// Pricing
const prices = { standard: 75, superieure: 95, familiale: 120 };

let state = {
  room: 'standard',
  arrival: '',
  departure: '',
  guests: 2,
  nights: 1,
  breakfast: false,
  animal: false,
  totalPrice: 0
};

function openBooking(roomType = 'standard') {
  state.room = roomType;
  goToStep(1);

  // Highlight pre-selected room
  document.querySelectorAll('.room-option').forEach(opt => {
    opt.classList.toggle('selected', opt.dataset.room === roomType);
  });

  if (!state.arrival) initDates();

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeBooking() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// Open triggers
document.querySelectorAll('.open-booking').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    openBooking('standard');
  });
});

document.querySelectorAll('.select-room-booking').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    openBooking(btn.dataset.room || 'standard');
  });
});

// Close triggers
document.getElementById('modal-close-btn')?.addEventListener('click', closeBooking);
document.getElementById('modal-backdrop')?.addEventListener('click', closeBooking);
document.querySelectorAll('.close-booking-btn').forEach(btn => btn.addEventListener('click', closeBooking));

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal.classList.contains('open')) closeBooking();
});

/* ----------------------------------------------------------
   WIZARD LOGIC
   ---------------------------------------------------------- */
function initDates() {
  const today = new Date();
  const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
  const dayAfter = new Date(tomorrow); dayAfter.setDate(tomorrow.getDate() + 2);

  const fmt = d => d.toISOString().split('T')[0];
  const arrInput = document.getElementById('book-arrival');
  const depInput = document.getElementById('book-departure');

  if (arrInput && depInput) {
    arrInput.value = fmt(tomorrow);
    arrInput.min = fmt(today);
    depInput.value = fmt(dayAfter);
    depInput.min = fmt(tomorrow);
    state.arrival = fmt(tomorrow);
    state.departure = fmt(dayAfter);
    calcNights();
  }
}

function calcNights() {
  const arr = document.getElementById('book-arrival');
  const dep = document.getElementById('book-departure');
  if (!arr || !dep) return;

  const d1 = new Date(arr.value), d2 = new Date(dep.value);
  if (d2 <= d1) {
    const next = new Date(d1); next.setDate(d1.getDate() + 1);
    dep.value = next.toISOString().split('T')[0];
  }

  dep.min = (() => { const m = new Date(d1); m.setDate(d1.getDate() + 1); return m.toISOString().split('T')[0]; })();

  const diff = Math.ceil(Math.abs(new Date(dep.value) - new Date(arr.value)) / 864e5);
  state.nights = diff;
  state.arrival = arr.value;
  state.departure = dep.value;
}

function calcTotal() {
  const base = prices[state.room] * state.nights;
  let extras = 0;
  if (state.breakfast) extras += 11 * state.guests * state.nights;
  if (state.animal) extras += 8 * state.nights;
  state.totalPrice = base + extras;
}

function updateSummary() {
  calcTotal();
  const lang = localStorage.getItem('hotelLanguage') || 'fr';
  const t = (typeof window.translations !== 'undefined' && window.translations[lang] && window.translations[lang].booking) ? window.translations[lang].booking : {
    room_std: 'Standard', room_conf: 'Confort', room_fam: 'Familiale',
    from: 'Du', to: 'au', nights: 'nuit(s)', guests: 'voyageur(s)'
  };
  const names = { standard: t.room_std, superieure: t.room_conf, familiale: t.room_fam };
  const fmtDate = s => {
    let loc = 'fr-FR';
    if (lang === 'en') loc = 'en-US';
    else if (lang === 'es') loc = 'es-ES';
    else if (lang === 'de') loc = 'de-DE';
    return new Date(s).toLocaleDateString(loc, { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const el = id => document.getElementById(id);
  if (el('sum-room')) el('sum-room').textContent = names[state.room];
  if (el('sum-dates')) el('sum-dates').textContent = `${t.from} ${fmtDate(state.arrival)} ${t.to} ${fmtDate(state.departure)}`;
  if (el('sum-duration')) el('sum-duration').textContent = `${state.nights} ${t.nights} · ${state.guests} ${t.guests}`;
  if (el('sum-total')) el('sum-total').textContent = `${state.totalPrice} €`;
}

function goToStep(n) {
  document.querySelectorAll('.wizard-pane').forEach((p, i) => p.classList.toggle('active', i + 1 === n));
  document.querySelectorAll('.wizard-step-tab').forEach((t, i) => t.classList.toggle('active', i + 1 === n));
  if (n === 2) updateSummary();
}

// Room select buttons in step 1
document.querySelectorAll('.btn-select-room').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    state.room = btn.dataset.roomType;
    document.querySelectorAll('.room-option').forEach(opt => {
      opt.classList.toggle('selected', opt.dataset.room === state.room);
    });
    const guestsSel = document.getElementById('book-guests');
    if (guestsSel) state.guests = parseInt(guestsSel.value);
    calcNights();
    goToStep(2);
  });
});

// Recalculate button
document.getElementById('btn-recalculate')?.addEventListener('click', () => {
  calcNights();
  updateSummary();
});

// Back button
document.getElementById('btn-back-step1')?.addEventListener('click', () => goToStep(1));

// Options
['opt-breakfast', 'opt-animal'].forEach(id => {
  document.getElementById(id)?.addEventListener('change', e => {
    if (id === 'opt-breakfast') state.breakfast = e.target.checked;
    if (id === 'opt-animal') state.animal = e.target.checked;
    updateSummary();
  });
});

// Submit form → Step 3
document.getElementById('booking-guest-form')?.addEventListener('submit', e => {
  e.preventDefault();
  const id = `#EUR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const el = document.getElementById('booking-id-val');
  if (el) el.textContent = id;
  goToStep(3);
});

/* ----------------------------------------------------------
   CONTACT FORM
   ---------------------------------------------------------- */
document.getElementById('hotel-contact-form')?.addEventListener('submit', e => {
  e.preventDefault();
  const nom = document.getElementById('contact-nom')?.value || 'vous';
  const lang = localStorage.getItem('hotelLanguage') || 'fr';
  const t = (typeof window.translations !== 'undefined' && window.translations[lang] && window.translations[lang].alerts) ? window.translations[lang].alerts : { thanks: "Merci", sent: "votre message a bien été envoyé !\\n\\nNotre équipe vous contactera dans les plus brefs délais.\\nTél. : 04 66 45 60 05" };
  alert(`${t.thanks} ${nom}, ${t.sent}`);
  e.target.reset();
});

/* ----------------------------------------------------------
   LANG SWITCHER (cosmetic)
   ---------------------------------------------------------- */
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

/* ----------------------------------------------------------
   INIT
   ---------------------------------------------------------- */
window.addEventListener('DOMContentLoaded', () => {
  initDates();
  scrollSpy();
});

/* ----------------------------------------------------------
   ACTIVITE MODAL — données & logique
   ---------------------------------------------------------- */

// SVG icons helper (Material Design paths)
const SVG = {
  water:     '<path d="M17 8C8 10 5.9 16.17 3.82 19.82L5.71 21l1-1.29C7.13 19.06 8.05 19 9 19c0 0 6-7 17-5-1.19-1.19-4.87-5.52-9-6z"/>',
  swim:      '<path d="M22 21c-1.11 0-1.73-.37-2.18-.64-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.07.64-2.18.64s-1.73-.37-2.18-.64c-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.08.64-2.19.64-1.11 0-1.73-.37-2.18-.64-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.08.64-2.19.64v-2c.56 0 .78-.13 1.15-.36.46-.27 1.08-.64 2.19-.64 1.11 0 1.73.37 2.18.64.37.22.6.36 1.15.36.56 0 .78-.13 1.15-.36.46-.27 1.08-.64 2.19-.64 1.11 0 1.73.37 2.18.64.37.22.6.36 1.15.36.56 0 .78-.13 1.15-.36.46-.27 1.08-.64 2.19-.64v2zM13 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>',
  hike:      '<path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z"/>',
  leaf:      '<path d="M17 8C8 10 5.9 16.17 3.82 19.82L5.71 21l1-1.29C7.13 19.06 8.05 19 9 19c0 0 6-7 17-5-1.19-1.19-4.87-5.52-9-6zM9.13 13.52C9.58 12.16 10.37 10.68 11.93 9.4c-1.18 1.08-1.96 2.58-2.43 3.96-.22.65-.32 1.29-.34 1.89-.19-.74-.2-1.56-.03-2.37l-.58.7c-.43.9-.54 1.94-.41 2.99A5.13 5.13 0 0 0 9.13 13.52z"/>',
  village:   '<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>',
  market:    '<path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96C5 16.1 6.1 17 7.2 17H19v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H15.5c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0 0 20 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>',
  heritage:  '<path d="M12 3L2 12h3v9h6v-6h2v6h6v-9h3L12 3zm0 12.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>',
  restaurant:'<path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/>',
  wine:      '<path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2V3zm-4 7H8V5h8v5z"/>',
  coffee:    '<path d="M2 21h18v-2H2v2zM20 8h-2V5h2v3zm0-5H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2z"/>',
  bird:      '<path d="M18.14 10.95C17.12 7.27 13.75 5 10 5 5.58 5 2 8.58 2 13s3.58 8 8 8c3.49 0 6.48-2.12 7.73-5.27l.27-.73H22v-4h-3.86zm-8.14 7.05c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>',
  mountain:  '<path d="M14 6l-1-2H5v17h2v-7h5l1 2h7V6h-6zm4 8h-4l-1-2H7V6h5l1 2h5v6z"/>',
  photo:     '<path d="M12 15.2c-1.77 0-3.2-1.43-3.2-3.2s1.43-3.2 3.2-3.2 3.2 1.43 3.2 3.2-1.43 3.2-3.2 3.2zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>',
  thermo:    '<path d="M15 13V5c0-1.66-1.34-3-3-3S9 3.34 9 5v8c-1.21.91-2 2.37-2 4 0 2.76 2.24 5 5 5s5-2.24 5-5c0-1.63-.79-3.09-2-4zm-4-8c0-.55.45-1 1-1s1 .45 1 1h-1v1h1v2h-1v1h1v2h-2V5z"/>',
  panorama:  '<path d="M12 6c2.45 0 4.71.2 6.86.5 1.29.19 2.14 1.36 2.14 2.66V14c0 1.3-.85 2.47-2.14 2.66-2.15.3-4.41.5-6.86.5-2.45 0-4.71-.2-6.86-.5C3.85 16.47 3 15.3 3 14V9.16c0-1.3.85-2.47 2.14-2.66C7.29 6.2 9.55 6 12 6zM10 14.5l6-3.5-6-3.5v7z"/>',
  history:   '<path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>',
  family:    '<path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>',
  heart:     '<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>',
  altitude:  '<path d="M22 9V7h-2V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2v-2h-2V9h2zm-4 10H4V5h14v14z"/>',
  eye:       '<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>',
};

function svgTag(iconKey, label) {
  return `<span class="activite-tag"><svg viewBox="0 0 24 24" style="width:14px;height:14px;fill:var(--forest);flex-shrink:0">${SVG[iconKey]}</svg>${label}</span>`;
}

const activiteData = {
  gorges_tarn: {
    title: 'Gorges du Tarn',
    badge: 'À 5 min',
    image: '/images/activite_2.png',
    tags: () => [svgTag('water','Canoë-Kayak'), svgTag('swim','Baignade'), svgTag('hike','Randonnée'), svgTag('leaf','Nature')].join(''),
    desc: `Les Gorges du Tarn sont l'un des joyaux naturels du Massif Central. Taillées dans les causses calcaires sur plus de 50 km, elles offrent des paysages à couper le souffle avec leurs falaises vertigineuses, leur rivière turquoise et leurs villages perchés. Depuis Meyrueis, vous y êtes en quelques minutes — un terrain de jeu exceptionnel pour toute la famille.`,
    info: [
      { icon: '<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>', label: 'Distance', value: '~5 km (10 min)' },
      { icon: '<path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>', label: 'Saison', value: 'Juin à Septembre' },
      { icon: '<path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>', label: 'Public', value: 'Familles, sportifs' },
    ],
    highlights: ['Descente en canoë sur le Tarn (prestataires à Meyrueis)', 'Baignade dans des eaux cristallines et naturelles', 'Randonnée sur les corniches des Causses', 'Villages perchés : Sainte-Énimie, La Malène', 'Pêche en rivière (truites, ombres communs)', 'Escalade sur les falaises calcaires'],
    footer: "L'hôtel peut vous recommander les meilleurs prestataires de canoë de la région."
  },
  village_meyrueis: {
    title: 'Village de Meyrueis',
    badge: 'À pied',
    image: '/images/activite_4.png',
    tags: () => [svgTag('village','Village médiéval'), svgTag('market','Marché'), svgTag('heritage','Patrimoine'), svgTag('restaurant','Gastronomie')].join(''),
    desc: `Meyrueis est un village chargé d'histoire, fondé au Moyen Âge et marqué par les guerres de religion. Situé au confluent de la Jonte, de la Brèze et du Béthuzon, c'est un carrefour naturel entre les Causses et les Cévennes. Son marché traditionnel du mercredi matin, ses ruelles pavées et son château d'Ayres du XIIe siècle en font une étape incontournable.`,
    info: [
      { icon: '<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>', label: 'Accès', value: '2 min à pied' },
      { icon: '<path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/>', label: 'Marché', value: 'Mercredi matin' },
      { icon: '<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>', label: 'Histoire', value: 'Depuis le Xe siècle' },
    ],
    highlights: ["Marché hebdomadaire du mercredi (produits du terroir)", "Château d'Ayres — ancien monastère du XIIe siècle", "Tour de l'Horloge et ruelles médiévales", "Foire de la Saint-Michel (fin septembre, 800 ans d'histoire)", "Temple protestant (1840) et maisons Renaissance", "Office de Tourisme — infos randonnées et activités"],
    footer: "À seulement 2 min à pied de l'hôtel — parfait pour une promenade du soir."
  },
  bonnes_adresses: {
    title: 'Bonnes adresses',
    badge: 'Au village',
    image: '/images/activite_3.png',
    tags: () => [svgTag('restaurant','Restaurants'), svgTag('leaf','Terroir'), svgTag('wine','Gastronomie'), svgTag('coffee','Terrasses')].join(''),
    desc: `Meyrueis regorge de bonnes tables proposant la cuisine authentique des Causses et des Cévennes. Gibier, truites, fromages de Lozère, miel du Parc national... Notre équipe connaît chaque adresse et se fera un plaisir de vous orienter selon vos envies. La vue depuis certaines terrasses sur la Jonte et les falaises est simplement inoubliable.`,
    info: [
      { icon: '<path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/>', label: 'Cuisine', value: 'Terroir Causses' },
      { icon: '<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>', label: 'Distance', value: 'Moins de 5 min' },
      { icon: '<path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>', label: 'Service', value: 'Midi & soir' },
    ],
    highlights: ['Le Jardin des Glaces — aligot maison (notre coup de coeur !)', 'Auberge du Doiron — spécialités gibier et truites', 'La Truite — poissons de rivière en bord de Jonte', 'Le Belvedere — terrasse panoramique sur les gorges', 'Restaurant de la Jonte — cadre naturel exceptionnel', 'Le Moulin de la Foux — ancienne meunerie reconvertie'],
    footer: 'Notre réception peut vous aider à réserver une table selon vos préférences.'
  },
  gorges_jonte: {
    title: 'Gorges de la Jonte',
    badge: 'À portée',
    image: '/images/gorges_landscape.png',
    tags: () => [svgTag('bird','Vautours'), svgTag('mountain','Falaises'), svgTag('eye','Grand Site'), svgTag('photo','Panorama')].join(''),
    desc: `Les Gorges de la Jonte, classées Grand Site de France, sont le paradis des vautours réintroduits dans les années 1980. Depuis la Maison des Vautours à Saint-Pierre-des-Tripiers, vous pouvez observer en direct ces rapaces majestueux évoluer dans le ciel des falaises calcaires. Un spectacle naturel unique en Europe.`,
    info: [
      { icon: '<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>', label: 'Distance', value: '~8 km de Meyrueis' },
      { icon: '<path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>', label: 'Ouverture', value: 'Avr. à Nov.' },
      { icon: '<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>', label: 'Site', value: 'Grand Site de France' },
    ],
    highlights: ['Maison des Vautours — musée 1000m² sur les rapaces', '4 espèces : Vautour fauve, Moine, Percnoptère, Gypaète barbu', 'Caméras en direct sur les nids et aires de nourrissage', 'Terrasse panoramique avec longues-vues', 'Randonnées sur les corniches (vues plongeantes)', 'Observation des chevaux de Przewalski sur le Causse Méjean'],
    footer: 'Maison des Vautours : 05 65 62 69 69 — Idéal avec les enfants !'
  },
  mont_aigoual: {
    title: 'Mont Aigoual',
    badge: '35 km',
    image: '/images/activite_1.png',
    tags: () => [svgTag('altitude','1 567 m'), svgTag('thermo','Météo'), svgTag('panorama','Panorama 360°'), svgTag('leaf','Cévennes')].join(''),
    desc: `Le Mont Aigoual culmine à 1 567 mètres, point culminant du Gard. Son observatoire inauguré en 1894, toujours actif, abrite "Le Climatographe" — le premier centre européen dédié au changement climatique. Par temps clair, la vue embrasse un quart de la France, des Alpes aux Pyrénées jusqu'à la mer Méditerranée.`,
    info: [
      { icon: '<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>', label: 'Distance', value: '35 km (45 min)' },
      { icon: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>', label: 'Altitude', value: '1 567 m' },
      { icon: '<path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>', label: 'Ouverture', value: 'Avr. à Oct.' },
    ],
    highlights: ['Le Climatographe — 10 espaces interactifs sur le climat', 'Panorama 360° : Alpes, Pyrénées, Méditerranée visible', 'Station Météo-France active depuis 1894', 'Ateliers pédagogiques pour enfants', 'Conférences thématiques en juillet-août', 'Prévoir vêtements chauds même en été (vent et brouillard)'],
    footer: 'Climatographe : 04 67 42 59 83 — climatographe.fr'
  },
  hotel_autrefois: {
    title: "L'hôtel autrefois",
    badge: 'Depuis 1892',
    image: '/images/hotel_autrefois.jpg',
    tags: () => [svgTag('history','Histoire'), svgTag('family','5 Générations'), svgTag('photo','Patrimoine'), svgTag('heart','Familial')].join(''),
    desc: `L'Hôtel de l'Europe est une institution de Meyrueis. Fondé à la fin du XIXe siècle, il est transmis de génération en génération dans la même famille depuis plus de 130 ans. Cette photo ancienne témoigne d'une époque où l'hôtel était déjà le coeur battant de la vie locale, accueillant voyageurs, marchands et touristes dans un esprit d'hospitalité authentique qui n'a jamais changé.`,
    info: [
      { icon: '<path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/>', label: 'Fondé en', value: '1892' },
      { icon: '<path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>', label: 'Générations', value: '5 familles' },
      { icon: '<path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z"/>', label: 'Chambres', value: '29 chambres' },
    ],
    highlights: ["Plus de 130 ans d'hospitalité familiale ininterrompue", "Même esprit d'accueil chaleureux depuis les origines", "Témoin de l'histoire de Meyrueis et de la Lozère", "Rénovations successives préservant l'âme du lieu", "Parking privé — une rareté dans ce village historique", "Aujourd'hui : Wi-Fi Fibre et confort moderne"],
    footer: "L'histoire continue... Merci de faire partie de notre aventure familiale."
  }
};

const cardKeys = ['gorges_tarn','village_meyrueis','bonnes_adresses','gorges_jonte','mont_aigoual','hotel_autrefois'];
const activiteModal    = document.getElementById('activite-modal');
const activiteBackdrop = document.getElementById('activite-modal-backdrop');
const activiteCloseBtn = document.getElementById('activite-modal-close-btn');

function openActiviteModal(key) {
  const data = activiteData[key];
  if (!data) return;
  const lang = localStorage.getItem('hotelLanguage') || 'fr';
  const tData = (typeof window.translations !== 'undefined' && window.translations[lang] && window.translations[lang].activiteData) ? window.translations[lang].activiteData[key] : data;

  const img = document.getElementById('am-hero-img');
  img.src = data.image; img.alt = tData.title || data.title;
  document.getElementById('activite-modal-title').textContent = tData.title || data.title;
  document.getElementById('am-badge').textContent = tData.badge || data.badge;

  const iconMaps = {
       gorges_tarn: ['water', 'swim', 'hike', 'leaf'],
       village_meyrueis: ['village', 'market', 'heritage', 'restaurant'],
       bonnes_adresses: ['restaurant', 'leaf', 'wine', 'coffee'],
       gorges_jonte: ['bird', 'mountain', 'eye', 'photo'],
       mont_aigoual: ['altitude', 'thermo', 'panorama', 'leaf'],
       hotel_autrefois: ['history', 'family', 'photo', 'heart']
  };
  const tagsHtml = iconMaps[key].map((iconKey, i) => svgTag(iconKey, tData.tags_labels ? tData.tags_labels[i] : "Tag")).join('');
  document.getElementById('am-tags').innerHTML = tagsHtml;
  document.getElementById('am-desc').textContent = tData.desc || data.desc;

  document.getElementById('am-info-grid').innerHTML = data.info.map((inf, i) => {
      const tLabel = tData.info && tData.info[i] ? tData.info[i].label : inf.label;
      const tValue = tData.info && tData.info[i] ? tData.info[i].value : inf.value;
      return `<div class="activite-info-card"><svg viewBox="0 0 24 24">${inf.icon}</svg><span class="activite-info-label">${tLabel}</span><span class="activite-info-value">${tValue}</span></div>`;
  }).join('');

  document.getElementById('am-highlights').innerHTML = (tData.highlights || data.highlights).map(h => `<div class="activite-highlight-item">${h}</div>`).join('');
  document.getElementById('am-footer-text').textContent = tData.footer || data.footer;

  activiteModal.classList.add('open');
  activiteModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  activiteModal.querySelector('.activite-modal-panel').scrollTop = 0;
}

function closeActiviteModal() {
  activiteModal.classList.remove('open');
  activiteModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('.activite-card').forEach((card, i) => {
  card.addEventListener('click', () => openActiviteModal(cardKeys[i]));
});
activiteBackdrop?.addEventListener('click', closeActiviteModal);
activiteCloseBtn?.addEventListener('click', closeActiviteModal);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && activiteModal?.classList.contains('open')) closeActiviteModal();
});

/* ----------------------------------------------------------
   I18N: TRANSLATION LOGIC
   ---------------------------------------------------------- */
window.setLanguage = function(lang) {
  // Update Active Class on buttons
  document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById('btn-lang-' + lang);
  if (activeBtn) activeBtn.classList.add('active');

  // Load translations from translations.js
  const dict = window.translations[lang];
  if (!dict) return;

  // Replace text for all data-i18n attributes
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const keys = el.getAttribute('data-i18n').split('.');
    let value = dict;
    keys.forEach(k => {
      if (value) value = value[k];
    });
    if (value) {
      el.innerHTML = value;
    }
  });

  // Save preference
  localStorage.setItem('hotelLanguage', lang);
  if (typeof updateSummary === 'function') updateSummary();
};

// Initialize Language on Load
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('hotelLanguage') || 'fr';
  setLanguage(savedLang);
});
