document.addEventListener('DOMContentLoaded', () => {

    const hindiBtn = document.getElementById('lang-hindi');
    const englishBtn = document.getElementById('lang-english');
    const hindiStory = document.getElementById('story-hindi');
    const englishStory = document.getElementById('story-english');

    if (hindiBtn && englishBtn && hindiStory && englishStory) {

        hindiBtn.addEventListener('click', () => {
            // Show Hindi content
            hindiStory.classList.add('active');
            englishStory.classList.remove('active');
            
            // Set active button style
            hindiBtn.classList.add('active');
            englishBtn.classList.remove('active');
        });

        englishBtn.addEventListener('click', () => {
            // Show English content
            englishStory.classList.add('active');
            hindiStory.classList.remove('active');

            // Set active button style
            englishBtn.classList.add('active');
            hindiBtn.classList.remove('active');
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
