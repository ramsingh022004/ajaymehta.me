document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const navLinks = document.getElementById('navLinks');
    const fixedSubscribeButton = document.getElementById('fixedSubscribe');

    // Toggle mobile navigation menu
    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Accessibility: toggle aria-expanded attribute
            const isExpanded = hamburgerMenu.getAttribute('aria-expanded') === 'true';
            hamburgerMenu.setAttribute('aria-expanded', !isExpanded);
        });

        // Close menu when a link is clicked (optional, good for single-page apps)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburgerMenu.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // Handle fixed subscribe button visibility based on scroll
    if (fixedSubscribeButton) {
        const headerSubscribeButton = document.querySelector('.navbar .subscribe-button');
        
        const toggleFixedButton = () => {
            // Only show fixed button if the header's subscribe button is not visible
            // This is a rough estimation, you might need to fine-tune based on actual layout
            if (headerSubscribeButton) {
                const rect = headerSubscribeButton.getBoundingClientRect();
                if (rect.bottom < 0 || rect.top > window.innerHeight) {
                    fixedSubscribeButton.style.display = 'flex'; // Show
                } else {
                    fixedSubscribeButton.style.display = 'none'; // Hide
                }
            } else {
                // Fallback: always show if header button isn't found
                fixedSubscribeButton.style.display = 'flex';
            }
        };

        // Initial check and on scroll
        toggleFixedButton();
        window.addEventListener('scroll', toggleFixedButton);
        window.addEventListener('resize', toggleFixedButton); // Also adjust on resize
    }
});
