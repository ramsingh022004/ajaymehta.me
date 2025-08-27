document.addEventListener('DOMContentLoaded', () => {

    // --- NEW: Header Scroll Effect ---
    // This is the same logic from main.js to make the header consistent
    const header = document.querySelector('.main-header');
    if (header) {
        const scrollThreshold = 20; // How many pixels to scroll before header becomes solid

        const handleHeaderScroll = () => {
            if (window.scrollY > scrollThreshold) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        };
        
        window.addEventListener('scroll', handleHeaderScroll);
        // Run on page load as well
        handleHeaderScroll(); 
    }

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
