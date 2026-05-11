// ==============================================
// SMOOTH SCROLL & NAVIGATION HIGHLIGHTING
// ==============================================

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollAnimations();
    initScrollReveal();
});

// Navigation active state tracking
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollY >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === currentSection) {
                link.classList.add('active');
            }
        });
    });
}

// Add active style to nav links
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--accent-primary) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// ==============================================
// SCROLL REVEAL ANIMATIONS
// ==============================================

function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `fadeInUp 0.6s ease-out forwards`;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with reveal animation
    const revealElements = document.querySelectorAll(
        '.timeline-item, .skill-category, .stat-card, .education-card, .contact-content'
    );

    revealElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
}

// ==============================================
// SCROLL ANIMATIONS & PARALLAX EFFECTS
// ==============================================

function initScrollAnimations() {
    const scrollElements = document.querySelectorAll('section');

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add subtle background animation on section enter
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.1 });

    scrollElements.forEach(el => {
        el.style.opacity = '1';
        scrollObserver.observe(el);
    });

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition < window.innerHeight) {
                heroSection.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
            }
        });
    }
}

// ==============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==============================================
// INTERACTIVE SKILL CARDS
// ==============================================

function initSkillCards() {
    const skillTags = document.querySelectorAll('.skill-tag');

    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });

        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// ==============================================
// DYNAMIC TEXT ANIMATION
// ==============================================

function animateText(element) {
    if (!element) return;

    const text = element.textContent;
    element.textContent = '';
    let index = 0;

    const typeInterval = setInterval(() => {
        if (index < text.length) {
            element.textContent += text[index];
            index++;
        } else {
            clearInterval(typeInterval);
        }
    }, 20);
}

// ==============================================
// STAT COUNTER ANIMATION
// ==============================================

function initStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');

    const countUpObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const finalValue = entry.target.textContent.replace(/[^0-9]/g, '');
                const isPlus = entry.target.textContent.includes('+');
                
                animateCounter(entry.target, 0, parseInt(finalValue), 1000, isPlus);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => countUpObserver.observe(stat));
}

function animateCounter(element, start, end, duration, isPlus = false) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const counterInterval = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(counterInterval);
        }
        element.textContent = Math.floor(current) + (isPlus ? '+' : '');
    }, 16);
}

// ==============================================
// HOVER GLOW EFFECTS
// ==============================================

function initGlowEffects() {
    const glowElements = document.querySelectorAll('.timeline-marker, .btn-primary');

    glowElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.animation = 'glow 0.6s ease-in-out infinite';
        });

        el.addEventListener('mouseleave', function() {
            this.style.animation = 'none';
        });
    });
}

// ==============================================
// INITIALIZE ALL FEATURES
// ==============================================

window.addEventListener('load', () => {
    initSkillCards();
    initStatCounters();
    initGlowEffects();
});

// ==============================================
// RESIZE OBSERVER FOR RESPONSIVE ADJUSTMENTS
// ==============================================

const resizeObserver = new ResizeObserver(() => {
    const isMobile = window.innerWidth < 768;
    // Add any responsive adjustments here
});

resizeObserver.observe(document.body);

// ==============================================
// PERFORMANCE: LAZY LOAD IMAGES
// ==============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==============================================
// SCROLL POSITION MEMORY
// ==============================================

window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('scrollPosition', window.scrollY);
});

window.addEventListener('load', () => {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition));
    }
});

// ==============================================
// HEADER SHADOW ON SCROLL
// ==============================================

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 8px 24px rgba(0, 217, 255, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// ==============================================
// KEYBOARD NAVIGATION
// ==============================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any modals or dropdowns if needed
    }
});

// ==============================================
// UTILITY: LOG INITIALIZATION
// ==============================================

console.log('%c👨‍💻 Gourob\'s Portfolio Loaded', 'color: #00d9ff; font-size: 16px; font-weight: bold;');
console.log('%cSenior QA Engineer | AI Validation Specialist', 'color: #8b5cf6; font-size: 12px;');
