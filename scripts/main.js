document.addEventListener('DOMContentLoaded', () => {

    // --- Menu Drawer Functionality ---
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-btn');
    const menuDrawer = document.getElementById('menu-drawer');
    const drawerOverlay = document.getElementById('drawer-overlay');

    const openDrawer = () => {
        menuDrawer.classList.add('open');
        drawerOverlay.classList.add('open');
        menuBtn.setAttribute('aria-expanded', 'true');
    };

    const closeDrawer = () => {
        menuDrawer.classList.remove('open');
        drawerOverlay.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
    };

    menuBtn.addEventListener('click', openDrawer);
    closeBtn.addEventListener('click', closeDrawer);
    drawerOverlay.addEventListener('click', closeDrawer);
    
    // Close drawer with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuDrawer.classList.contains('open')) {
            closeDrawer();
        }
    });

    // --- Dark Mode Toggle Functionality ---
    const darkModeSwitch = document.getElementById('dark-mode-switch');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            darkModeSwitch.checked = true;
        }
    } else if (prefersDarkScheme.matches) {
        // Set theme based on user's OS preference if no theme is saved
        document.documentElement.setAttribute('data-theme', 'dark');
        darkModeSwitch.checked = true;
    }

    darkModeSwitch.addEventListener('change', function(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });

    // --- Typing Animation Functionality ---
    const animatedHeadings = document.querySelectorAll('.animated-heading');

    const typeEraseLoop = async (element) => {
        const text = element.getAttribute('data-text');
        const typingSpeed = 100 + Math.random() * 50; // Add some variation
        const erasingSpeed = 50;
        const pauseDuration = 2000;

        while (true) {
            // Typing
            for (let i = 0; i < text.length; i++) {
                element.textContent += text.charAt(i);
                await new Promise(resolve => setTimeout(resolve, typingSpeed));
            }
            await new Promise(resolve => setTimeout(resolve, pauseDuration));

            // Erasing
            for (let i = text.length; i > 0; i--) {
                element.textContent = text.substring(0, i - 1);
                await new Promise(resolve => setTimeout(resolve, erasingSpeed));
            }
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    };

    // --- Intersection Observer for Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Fade-in animation for general content
                if (entry.target.classList.contains('reveal-on-scroll')) {
                    entry.target.classList.add('visible');
                }
                
                // Typing animation for headings
                if (entry.target.classList.contains('animated-heading')) {
                    typeEraseLoop(entry.target);
                }

                // Stop observing once the animation has been triggered
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements that need animation
    document.querySelectorAll('.reveal-on-scroll, .animated-heading').forEach(el => {
        observer.observe(el);
    });

});
