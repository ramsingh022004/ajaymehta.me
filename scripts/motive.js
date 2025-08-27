document.addEventListener('DOMContentLoaded', () => {

    // --- Intersection Observer for Fade-in Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add staggered delays for a cascading effect
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

});
