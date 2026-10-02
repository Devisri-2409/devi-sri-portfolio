const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('#nav');
const navLinks = document.querySelectorAll('.nav-link');

const setMenuOpen = (open) => {
  if (!menuBtn || !nav) return;
  nav.classList.toggle('open', open);
  menuBtn.setAttribute('aria-expanded', String(open));
};

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    setMenuOpen(!nav.classList.contains('open'));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      setMenuOpen(false);
      menuBtn.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 850) setMenuOpen(false);
  });
}

const sections = [...document.querySelectorAll('main section[id]')];
const sectionLinks = [...document.querySelectorAll('.nav-link[href^="#"]')];

const updateActiveLink = () => {
  if (!sections.length || !sectionLinks.length) return;
  const scrollPosition = window.scrollY + 180;
  let current = 'home';

  sections.forEach((section) => {
    if (scrollPosition >= section.offsetTop) current = section.id;
  });

  sectionLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${current}`;
    link.classList.toggle('active', isActive);
    if (isActive) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
};

window.addEventListener('scroll', updateActiveLink, { passive: true });
window.addEventListener('load', updateActiveLink);
updateActiveLink();

/* Reveal sections gently as they enter view; keep content visible without observer support. */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealTargets = document.querySelectorAll('main > section, .project, .skill, .cert-card, .activity, .blog-mini, .topic-card');
if ('IntersectionObserver' in window && !reduceMotion) {
  document.documentElement.classList.add('reveal-ready');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

  revealTargets.forEach((element) => {
    element.classList.add('reveal');
    revealObserver.observe(element);
  });
}

/* Accessible certificate preview with Escape, focus restoration, and keyboard containment. */
const certificateButtons = document.querySelectorAll('.certificate-image-btn');
if (certificateButtons.length) {
  const modal = document.createElement('div');
  modal.className = 'certificate-modal';
  modal.hidden = true;
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', 'Certificate preview');
  modal.innerHTML = '<button class="certificate-modal-close" type="button" aria-label="Close certificate preview">×</button><img alt="Certificate preview">';
  document.body.appendChild(modal);

  const modalImage = modal.querySelector('img');
  const closeButton = modal.querySelector('.certificate-modal-close');
  let lastFocusedElement = null;

  const closeModal = () => {
    modal.hidden = true;
    document.body.style.overflow = '';
    if (lastFocusedElement) lastFocusedElement.focus();
  };

  certificateButtons.forEach((button) => {
    button.addEventListener('click', () => {
      lastFocusedElement = button;
      modalImage.src = button.dataset.certificate;
      modalImage.alt = button.querySelector('img')?.alt || 'Certificate preview';
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
      closeButton.focus();
    });
  });

  closeButton.addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener('keydown', (event) => {
    if (modal.hidden) return;
    if (event.key === 'Escape') {
      closeModal();
      return;
    }
    if (event.key === 'Tab') {
      event.preventDefault();
      closeButton.focus();
    }
  });
}
