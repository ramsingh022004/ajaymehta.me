document.addEventListener('DOMContentLoaded', () => {

    // --- Menu Drawer Functionality ---
    const menuBtn = document.getElementById('menu-btn');
    const menuDrawer = document.getElementById('menu-drawer');
    const drawerOverlay = document.getElementById('drawer-overlay');
    // Note: The close button inside the drawer is no longer needed with the new design

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

    menuBtn.addEventListener('click', () => {
        const isDrawerOpen = menuDrawer.classList.contains('open');
        if (isDrawerOpen) {
            closeDrawer();
        } else {
            openDrawer();
        }
    });
    
    drawerOverlay.addEventListener('click', closeDrawer);
    
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
        const typingSpeed = 100 + Math.random() * 50;
        const erasingSpeed = 50;
        const pauseDuration = 2000;

        while (true) {
            for (let i = 0; i < text.length; i++) {
                element.textContent += text.charAt(i);
                await new Promise(resolve => setTimeout(resolve, typingSpeed));
            }
            await new Promise(resolve => setTimeout(resolve, pauseDuration));
            for (let i = text.length; i > 0; i--) {
                element.textContent = text.substring(0, i - 1);
                await new Promise(resolve => setTimeout(resolve, erasingSpeed));
            }
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    };

    // --- Intersection Observer for Animations ---
    const observerOptions = {
        root: null, rootMargin: '0px', threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('reveal-on-scroll')) {
                    entry.target.classList.add('visible');
                }
                if (entry.target.classList.contains('animated-heading')) {
                    typeEraseLoop(entry.target);
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll, .animated-heading').forEach(el => {
        observer.observe(el);
    });

    // --- NEW: Parallax Effect on Images ---
    const parallaxImages = document.querySelectorAll('.parallax-image');

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        parallaxImages.forEach(image => {
            // Check if the image is in the viewport to save performance
            const rect = image.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                const speed = 0.2; // Adjust this value for more or less parallax effect
                const yPos = (scrollTop - image.offsetTop) * speed;
                image.style.transform = `translateY(${yPos}px)`;
            }
        });
    });
});
