const mobileBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');

if (mobileBtn && nav) {
  mobileBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      if (nav && nav.classList.contains('active')) {
        nav.classList.remove('active');
      }
    }
  });
});

const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(question => {
  question.addEventListener('click', () => {
    const answer = question.nextElementSibling;
    if (answer && answer.classList.contains('faq-answer')) {
      const isActive = answer.classList.contains('active');
      document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('active'));
      if (!isActive) {
        answer.classList.add('active');
      }
    }
  });
});

const backToTop = document.createElement('a');
backToTop.href = '#';
backToTop.className = 'back-to-top';
backToTop.innerHTML = '↑';
backToTop.setAttribute('aria-label', 'Back to top');
document.body.appendChild(backToTop);

backToTop.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.style.display = 'flex';
  } else {
    backToTop.style.display = 'none';
  }
});
backToTop.style.display = 'none';

const copyrightSpan = document.querySelector('.copyright-year');
if (copyrightSpan) {
  copyrightSpan.textContent = new Date().getFullYear();
}

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a');

function updateActiveNav() {
  let current = '';
  const scrollPos = window.scrollY + 100;
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = contactForm.querySelector('[name="name"]').value.trim();
    const email = contactForm.querySelector('[name="email"]').value.trim();
    const message = contactForm.querySelector('[name="message"]').value.trim();
    if (!name || !email || !message) {
      alert('Please fill in all fields.');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      alert('Please enter a valid email address.');
      return;
    }
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    try {
      const response = await fetch('https://formspree.io/f/wen471942@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });
      if (response.ok) {
        alert('Thank you! Your message has been sent.');
        contactForm.reset();
      } else {
        alert('Sorry, something went wrong. Please email us directly at wen471942@gmail.com');
      }
    } catch (error) {
      alert('Network error. Please email us directly at wen471942@gmail.com');
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

const header = document.querySelector('.header');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll <= 0) {
    header.classList.remove('scroll-up');
    return;
  }
  if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
    header.classList.remove('scroll-up');
    header.classList.add('scroll-down');
  } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
    header.classList.remove('scroll-down');
    header.classList.add('scroll-up');
  }
  lastScroll = currentScroll;
});

document.querySelectorAll('.instagram-card, .coach-instagram').forEach(link => {
  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noopener noreferrer');
});

const scheduleCard = document.querySelector('.schedule-card');
if (scheduleCard) {
  const tuesdayNotice = document.createElement('div');
  tuesdayNotice.className = 'mt-4 text-sm';
  tuesdayNotice.innerHTML = '<strong>Note:</strong> This schedule repeats every Tuesday. No changes, quiet hours always observed.';
  scheduleCard.appendChild(tuesdayNotice);
}

const lazyImages = document.querySelectorAll('img[data-src]');
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  lazyImages.forEach(img => imageObserver.observe(img));
} else {
  lazyImages.forEach(img => {
    img.src = img.dataset.src;
    img.removeAttribute('data-src');
  });
}

const volunteerSection = document.querySelector('#volunteers');
if (volunteerSection) {
  const volunteerBtn = document.createElement('a');
  volunteerBtn.href = '#contact';
  volunteerBtn.className = 'btn mt-4';
  volunteerBtn.textContent = 'Contact Us to Volunteer →';
  volunteerSection.querySelector('.container')?.appendChild(volunteerBtn);
}

const helmetNotice = document.querySelector('.helmet-notice');
if (!helmetNotice && document.querySelector('#schedule')) {
  const notice = document.createElement('div');
  notice.className = 'text-center mt-4 p-3 bg-yellow-100 rounded';
  notice.style.background = '#fef3c7';
  notice.style.padding = '0.75rem';
  notice.style.borderRadius = '0.5rem';
  notice.innerHTML = '⛑️ <strong>Helmet Rule:</strong> Beginners (Canskate) MUST wear a helmet. Others optional but recommended.';
  const scheduleSection = document.querySelector('#schedule .container');
  if (scheduleSection) scheduleSection.appendChild(notice);
}

document.querySelectorAll('.policy-card, .safety-card').forEach(card => {
  card.addEventListener('click', () => {
    const link = card.querySelector('a');
    if (link) window.location.href = link.href;
  });
});

const searchInput = document.createElement('input');
searchInput.type = 'text';
searchInput.placeholder = 'Search FAQ...';
searchInput.className = 'faq-search';
searchInput.style.cssText = 'width:100%; padding:0.75rem; margin-bottom:1.5rem; border:1px solid var(--gray-300); border-radius:0.5rem;';
const faqContainer = document.querySelector('#faq .container');
if (faqContainer && document.querySelectorAll('.faq-item').length > 0) {
  faqContainer.insertBefore(searchInput, faqContainer.querySelector('.faq-item'));
  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    document.querySelectorAll('.faq-item').forEach(item => {
      const question = item.querySelector('.faq-question')?.innerText.toLowerCase() || '';
      const answer = item.querySelector('.faq-answer')?.innerText.toLowerCase() || '';
      if (question.includes(term) || answer.includes(term)) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
}

const skipLink = document.createElement('a');
skipLink.href = '#main-content';
skipLink.className = 'skip-to-content';
skipLink.textContent = 'Skip to main content';
document.body.insertBefore(skipLink, document.body.firstChild);

const mainElement = document.querySelector('main');
if (mainElement) mainElement.id = 'main-content';

const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="math-12393.github.io"]):not([href*="localhost"])');
externalLinks.forEach(link => {
  link.setAttribute('rel', 'noopener noreferrer');
  link.setAttribute('target', '_blank');
});

if (localStorage.getItem('cookieConsent') === null) {
  const consentBanner = document.createElement('div');
  consentBanner.className = 'cookie-consent';
  consentBanner.style.cssText = 'position:fixed; bottom:0; left:0; right:0; background:var(--gray-900); color:white; padding:1rem; text-align:center; z-index:1000; display:flex; justify-content:center; gap:1rem; flex-wrap:wrap;';
  consentBanner.innerHTML = '<span>This website uses essential cookies for functionality. No tracking.</span><button id="acceptCookies" class="btn btn-white" style="padding:0.25rem 1rem;">OK</button>';
  document.body.appendChild(consentBanner);
  document.getElementById('acceptCookies')?.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'accepted');
    consentBanner.remove();
  });
}

console.log('Autistic Figure Skating Club website loaded. Made for fun ❤️');
