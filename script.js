// ============================
// TYPING EFFECT
// ============================
const phrases = [
    'Software Developer',
    'Web Developer',
    'CSE Student @ ISL',
    'HTML / CSS / JavaScript',
    'Building cool things...'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typed-text');

function type() {
    const current = phrases[phraseIndex];

    if (isDeleting) {
        typedEl.textContent = current.slice(0, charIndex - 1);
        charIndex--;
    } else {
        typedEl.textContent = current.slice(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === current.length) {
        speed = 1800; // pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 300;
    }

    setTimeout(type, speed);
}

// Start typing after hero animation delay
setTimeout(type, 1400);

// ============================
// NAVBAR SCROLL
// ============================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ============================
// HAMBURGER MENU
// ============================
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ============================
// SCROLL REVEAL
// ============================
const revealTargets = document.querySelectorAll(
    '.info-card, .skill-card, .project-card, .contact-item, .about-text p'
);

revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // stagger delay based on index within parent
            const siblings = [...entry.target.parentElement.children];
            const idx = siblings.indexOf(entry.target);
            entry.target.style.transitionDelay = `${idx * 80}ms`;
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealTargets.forEach(el => revealObserver.observe(el));

// ============================
// SKILL BAR ANIMATION
// ============================
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.dataset.width + '%';
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.4 });

skillFills.forEach(fill => skillObserver.observe(fill));

// ============================
// ACTIVE NAV HIGHLIGHT
// ============================
const sections = document.querySelectorAll('section[id]');
const navItems  = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 120) {
            current = section.getAttribute('id');
        }
    });
    navItems.forEach(link => {
        link.style.color = '';
        link.style.textShadow = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--neon-cyan)';
            link.style.textShadow = 'var(--glow-cyan)';
        }
    });
});

// ============================
// CONTACT FORM
// ============================
const contactForm = document.getElementById('contactForm');
const formStatus  = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = document.getElementById('formName').value.trim();
    const email   = document.getElementById('formEmail').value.trim();
    const message = document.getElementById('formMessage').value.trim();

    if (!name || !email || !message) {
        formStatus.textContent = '> ERROR: All fields required.';
        formStatus.style.color = 'var(--neon-pink)';
        return;
    }

    const btn = contactForm.querySelector('.btn');
    btn.textContent = '> Transmitting...';
    btn.disabled = true;
    formStatus.textContent = '';

    setTimeout(() => {
        formStatus.style.color = 'var(--neon-green)';
        formStatus.textContent = `> Message received, ${name}. I'll get back to you soon.`;
        contactForm.reset();
        btn.textContent = 'Transmit Message';
        btn.disabled = false;
    }, 1400);
});
