document.addEventListener('DOMContentLoaded', () => {

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

    // --- Dark Mode Toggle Functionality ---
    const darkModeSwitch = document.getElementById('dark-mode-switch');
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            darkModeSwitch.checked = true;
        }
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
    
    // --- Multi-layer Parallax Effect ---
    const baseImage = document.querySelector('.bg-image-base');
    const overlayImage = document.querySelector('.bg-image-overlay');

    if (baseImage && overlayImage) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const baseSpeed = 0.1;
            baseImage.style.transform = `translateY(${scrollTop * baseSpeed}px) scale(1.1)`;
            const overlaySpeed = 0.3;
            overlayImage.style.transform = `translateY(${scrollTop * overlaySpeed}px)`;
        });
    }

    // --- Intersection Observer for Fade-in Animations ---
    const observerOptions = {
        root: null, rootMargin: '0px', threshold: 0.1
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
