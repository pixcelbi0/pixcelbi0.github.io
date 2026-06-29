// Nav scroll effect
const nav = document.querySelector('.glass-nav');
const heroBg = document.querySelector('.hero-bg');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
        if (heroBg) heroBg.classList.add('scrolled-bg');
    } else {
        nav.classList.remove('scrolled');
        if (heroBg) heroBg.classList.remove('scrolled-bg');
    }
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Stop observing once revealed
        }
    });
};

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Mouse glow effect on cards
const cards = document.querySelectorAll('.glass-card');

cards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Forward mouse movements to the background brain iframe
window.addEventListener('mousemove', (e) => {
    if (heroBg && heroBg.contentWindow) {
        heroBg.contentWindow.postMessage({
            type: 'mousemove',
            clientX: e.clientX,
            clientY: e.clientY
        }, '*');
    }
});
