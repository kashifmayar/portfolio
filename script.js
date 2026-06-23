// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Apply theme with transition
function applyTheme(theme) {
    // Prevent transition on initial load
    if (!body.classList.contains('theme-transition')) {
        body.classList.add('theme-transition');
    }
    
    if (theme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.checked = true;
    } else {
        body.classList.remove('dark-mode');
        themeToggle.checked = false;
    }
    
    localStorage.setItem('theme', theme);
}

themeToggle.addEventListener('change', () => {
    const newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
    applyTheme(newTheme);
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

// Premium project showcase
const projectCards = document.querySelectorAll('.project-card');
const projectFilters = document.querySelectorAll('.project-filter');
const projectSearch = document.getElementById('project-search');
const projectEmpty = document.querySelector('.project-empty');
let activeProjectFilter = 'all';

function filterProjects() {
    const query = projectSearch ? projectSearch.value.trim().toLowerCase() : '';
    let visibleCount = 0;

    projectCards.forEach(card => {
        const categories = card.dataset.category || '';
        const searchable = `${card.textContent} ${card.dataset.search || ''}`.toLowerCase();
        const matchesFilter = activeProjectFilter === 'all' || categories.includes(activeProjectFilter);
        const matchesSearch = !query || searchable.includes(query);
        const isVisible = matchesFilter && matchesSearch;

        card.classList.toggle('is-hidden', !isVisible);
        if (isVisible) visibleCount += 1;
    });

    if (projectEmpty) {
        projectEmpty.hidden = visibleCount !== 0;
    }
}

projectFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        activeProjectFilter = filter.dataset.filter;
        projectFilters.forEach(item => item.classList.toggle('active', item === filter));
        filterProjects();
    });
});

if (projectSearch) {
    projectSearch.addEventListener('input', filterProjects);
}

// Premium navigation
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');
const scrollProgressBar = document.querySelector('.scroll-progress-bar');
const navAnchors = document.querySelectorAll('.navbar a[href^="#"]');
const observedSections = Array.from(navLinksItems)
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

function setMobileMenu(open) {
    navLinks.classList.toggle('active', open);
    hamburger.classList.toggle('active', open);
    hamburger.setAttribute('aria-expanded', String(open));
    hamburger.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
}

function updateScrollProgress() {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;

    scrollProgressBar.style.transform = `scaleX(${Math.min(progress, 1)})`;
    navbar.classList.toggle('is-scrolled', window.scrollY > 12);
}

function updateActiveNavLink() {
    const navOffset = navbar.offsetHeight + 48;
    let activeSectionId = observedSections[0]?.id;

    observedSections.forEach(section => {
        if (section.getBoundingClientRect().top <= navOffset) {
            activeSectionId = section.id;
        }
    });

    navLinksItems.forEach(link => {
        const isActive = link.getAttribute('href') === `#${activeSectionId}`;

        link.classList.toggle('active', isActive);
        if (isActive) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}

function handleNavigationScroll() {
    updateScrollProgress();
    updateActiveNavLink();
}

navAnchors.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));

        if (!target) return;

        e.preventDefault();
        setMobileMenu(false);

        const targetTop = target.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight - 28;
        window.scrollTo({
            top: targetTop,
            behavior: 'smooth'
        });
    });
});

document.querySelectorAll('.hero-cta[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));

        if (!target) return;

        e.preventDefault();

        const targetTop = target.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight - 28;
        window.scrollTo({
            top: targetTop,
            behavior: 'smooth'
        });
    });
});

hamburger.addEventListener('click', () => {
    setMobileMenu(!navLinks.classList.contains('active'));
});

document.addEventListener('click', event => {
    if (!navbar.contains(event.target)) {
        setMobileMenu(false);
    }
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        setMobileMenu(false);
        hamburger.focus();
    }
});

navLinks.addEventListener('keydown', event => {
    const keys = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'];
    if (!keys.includes(event.key)) return;

    event.preventDefault();

    const items = Array.from(navLinksItems);
    const currentIndex = items.indexOf(document.activeElement);
    const lastIndex = items.length - 1;
    let nextIndex = currentIndex;

    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = lastIndex;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = currentIndex <= 0 ? lastIndex : currentIndex - 1;

    items[nextIndex].focus();
});

window.addEventListener('scroll', handleNavigationScroll, { passive: true });
window.addEventListener('resize', handleNavigationScroll);
handleNavigationScroll();

// Hero interactions
const hero = document.querySelector('.hero');
const heroVisual = document.querySelector('.hero-visual');
const animatedIntro = document.getElementById('animated-intro');
const introPhrases = [
    'an AI Engineer',
    'an LLM application builder',
    'an Agentic AI developer',
    'a RAG systems engineer'
];

let introIndex = 0;

if (animatedIntro) {
    setInterval(() => {
        introIndex = (introIndex + 1) % introPhrases.length;
        animatedIntro.classList.add('is-changing');

        setTimeout(() => {
            animatedIntro.textContent = introPhrases[introIndex];
            animatedIntro.classList.remove('is-changing');
        }, 220);
    }, 2400);
}

if (hero) {
    hero.addEventListener('mousemove', event => {
        const rect = hero.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        const tiltX = (x - 50) / 16;
        const tiltY = (50 - y) / 18;

        hero.style.setProperty('--mouse-x', `${x}%`);
        hero.style.setProperty('--mouse-y', `${y}%`);
        if (heroVisual) {
            heroVisual.style.setProperty('--hero-tilt-x', `${tiltX}deg`);
            heroVisual.style.setProperty('--hero-tilt-y', `${tiltY}deg`);
        }
    });

    hero.addEventListener('mouseleave', () => {
        hero.style.setProperty('--mouse-x', '50%');
        hero.style.setProperty('--mouse-y', '45%');
        if (heroVisual) {
            heroVisual.style.setProperty('--hero-tilt-x', '0deg');
            heroVisual.style.setProperty('--hero-tilt-y', '0deg');
        }
    });
}

// About section reveal animations
const aboutRevealItems = document.querySelectorAll('.about-reveal');
if (aboutRevealItems.length) {
    const aboutRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                aboutRevealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.18 });

    aboutRevealItems.forEach((item, index) => {
        item.style.transitionDelay = `${Math.min(index * 90, 360)}ms`;
        aboutRevealObserver.observe(item);
    });
}

// Experience and certification reveal animations
const timelineRevealItems = document.querySelectorAll('.experience-reveal, .cert-reveal, .contact-reveal');
if (timelineRevealItems.length) {
    const timelineRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                timelineRevealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.16 });

    timelineRevealItems.forEach((item, index) => {
        item.style.transitionDelay = `${Math.min(index * 80, 420)}ms`;
        timelineRevealObserver.observe(item);
    });
}

// Enhanced scroll animations for skills
const skillsSection = document.querySelector('.skills');
const skillItems = document.querySelectorAll('.skill-card');

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            skillItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                    item.classList.add('is-visible');
                }, index * 100);
            });
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

skillItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'all 0.5s ease-out';
});

if (skillsSection && skillItems.length) {
    skillsObserver.observe(skillsSection);
}

// Project card spotlight and tilt effects
projectCards.forEach(card => {
    card.addEventListener('mousemove', event => {
        if (prefersReducedMotion) return;

        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const rotateY = ((x / rect.width) - 0.5) * 8;
        const rotateX = ((0.5 - (y / rect.height))) * 8;

        card.style.setProperty('--spotlight-x', `${x}px`);
        card.style.setProperty('--spotlight-y', `${y}px`);
        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
});

document.querySelectorAll('.disabled-link').forEach(link => {
    link.addEventListener('click', event => event.preventDefault());
});

// Contact form validation and feedback
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    const status = contactForm.querySelector('.form-status');
    const submitButton = contactForm.querySelector('.submit-btn');

    contactForm.addEventListener('submit', event => {
        event.preventDefault();
        const fields = contactForm.querySelectorAll('input, textarea');
        let isValid = true;

        fields.forEach(field => {
            const fieldIsValid = field.checkValidity();
            field.closest('.form-row').classList.toggle('has-error', !fieldIsValid);
            if (!fieldIsValid) isValid = false;
        });

        if (!isValid) {
            status.textContent = 'Please fix the highlighted fields.';
            return;
        }

        submitButton.classList.add('is-loading');
        submitButton.disabled = true;
        status.textContent = 'Sending your message...';

        setTimeout(() => {
            submitButton.classList.remove('is-loading');
            submitButton.classList.add('is-success');
            status.textContent = 'Message ready. Your email app will open with the project brief.';

            const data = new FormData(contactForm);
            const subject = encodeURIComponent(`Portfolio inquiry from ${data.get('name')}`);
            const bodyText = encodeURIComponent(`${data.get('message')}\n\nFrom: ${data.get('name')} <${data.get('email')}>`);
            window.location.href = `mailto:kashifmayar7@gmail.com?subject=${subject}&body=${bodyText}`;

            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.classList.remove('is-success');
                contactForm.reset();
            }, 1200);
        }, 700);
    });

    contactForm.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('input', () => {
            field.closest('.form-row').classList.remove('has-error');
        });
    });
}

// Global background and cursor polish
const cursorGlow = document.querySelector('.cursor-glow');
if (cursorGlow && !prefersReducedMotion) {
    window.addEventListener('pointermove', event => {
        cursorGlow.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    }, { passive: true });
}

const revealTargets = document.querySelectorAll('section > .container, .project-card, .skill-card, .cert-card, .experience-card-modern');
if (revealTargets.length) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('motion-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    revealTargets.forEach((target, index) => {
        target.classList.add('motion-item');
        target.style.transitionDelay = `${Math.min(index * 18, 160)}ms`;
        revealObserver.observe(target);
    });
}

if (!prefersReducedMotion) {
    window.addEventListener('scroll', () => {
        document.documentElement.style.setProperty('--scroll-y', `${window.scrollY * 0.04}px`);
    }, { passive: true });
}