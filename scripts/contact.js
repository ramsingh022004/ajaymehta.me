document.addEventListener('DOMContentLoaded', () => {

    // --- Multi-layer Parallax Effect ---
    const baseImage = document.querySelector('.bg-image-base');
    const overlayImage = document.querySelector('.bg-image-overlay');

    if (baseImage && overlayImage) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            
            // Base image moves slowly
            const baseSpeed = 0.1;
            baseImage.style.transform = `translateY(${scrollTop * baseSpeed}px) scale(1.1)`;

            // Overlay image moves faster, creating depth
            const overlaySpeed = 0.3;
            overlayImage.style.transform = `translateY(${scrollTop * overlaySpeed}px)`;
        });
    }

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

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        observer.observe(el);
    });

});
