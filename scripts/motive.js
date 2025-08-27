document.addEventListener('DOMContentLoaded', () => {

    // --- Menu Drawer Functionality (Self-Contained) ---
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

    menuBtn.addEventListener('click', () => {
        if (menuDrawer.classList.contains('open')) {
            closeDrawer();
        } else {
            openDrawer();
        }
    });
    
    closeBtn.addEventListener('click', closeDrawer);
    drawerOverlay.addEventListener('click', closeDrawer);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuDrawer.classList.contains('open')) {
            closeDrawer();
        }
    });

    // --- Dark Mode is not used on this page, but we keep the logic for consistency ---
    const darkModeSwitch = document.getElementById('dark-mode-switch');
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        // We don't apply a data-theme to the body, as this page has its own dark style
        if (currentTheme === 'dark') {
            darkModeSwitch.checked = true;
        }
    }

    darkModeSwitch.addEventListener('change', function(e) {
        // This will set the theme for OTHER pages when toggled here
        if (e.target.checked) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
    
    // --- Header Scroll Effect ---
    const header = document.querySelector('.main-header');
    if (header) {
        const scrollThreshold = 20;
        const handleHeaderScroll = () => {
            if (window.scrollY > scrollThreshold) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        };
        window.addEventListener('scroll', handleHeaderScroll);
        handleHeaderScroll(); 
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
