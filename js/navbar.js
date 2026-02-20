
        // 2. Menu Mobile Toggle
        const btn = document.getElementById('mobile-menu-button');
        const menu = document.getElementById('mobile-menu');
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });

        // 3. Animation Reveal au Scroll
        const observerOptions = { threshold: 0.15 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        // 4. Effet de Scroll sur la Navbar
        window.addEventListener('scroll', () => {
            const nav = document.getElementById('main-nav');
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });

        // 5. Slider Statistiques
        let currentStatIndex = 0;
        const statsSlider = document.getElementById('stats-slider');
        const totalStats = 4; // Nombre total de tes stats
        let autoSlideInterval;

        function updateSlider() {
            const isMobile = window.innerWidth < 768;
            const step = isMobile ? 100 : 25;
            const maxIndex = isMobile ? totalStats - 1 : 0;
            
            if (currentStatIndex > maxIndex) currentStatIndex = 0;
            if (currentStatIndex < 0) currentStatIndex = maxIndex;
            
            // statsSlider.style.transform = `translateX(-${currentStatIndex * step}%)`;
        }

        function startAutoSlide() {
            autoSlideInterval = setInterval(() => {
                currentStatIndex++;
                updateSlider();
            }, 4000); // Change toutes les 4 secondes
        }

        function manualNext() {
            clearInterval(autoSlideInterval);
            currentStatIndex++;
            updateSlider();
            startAutoSlide();
        }

        function manualPrev() {
            clearInterval(autoSlideInterval);
            currentStatIndex--;
            updateSlider();
            startAutoSlide();
        }

        window.addEventListener('resize', updateSlider);
        startAutoSlide();

        // 6. Animation des compteurs
        const counters = document.querySelectorAll('.counter');
        const speed = 200;

        const startCounters = () => {
            counters.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 15);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
            });
        };

        const observerStats = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounters();
                    observerStats.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

    document.querySelectorAll('.counter').forEach(c => observerStats.observe(c.parentElement));

    const nav = document.getElementById('main-nav');
    const mobileMenuBtn = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    window.addEventListener('scroll', () => {
        // On déclenche l'effet dès qu'on dépasse 10px de scroll
        if (window.scrollY > 10) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }
    });

    mobileMenuBtn.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');

        if (isOpen) {
            icon.classList.replace('fa-bars', 'fa-times');
            icon.style.transform = "rotate(180deg)";
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
            icon.style.transform = "rotate(0deg)";
        }
    });

    document.addEventListener('DOMContentLoaded', function() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const slideInterval = 6000;

    if (slides.length === 0 || dots.length === 0) return;

    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        currentSlide = (n + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // --- LA CLÉ EST ICI ---
    // On force le retrait et l'ajout immédiat pour déclencher les animations CSS
    slides[0].classList.remove('active'); 
    void slides[0].offsetWidth; // "Magic trigger" : force le navigateur à recalculer le style
    slides[0].classList.add('active');
    // -----------------------

    let timer = setInterval(() => goToSlide(currentSlide + 1), slideInterval);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(timer);
            goToSlide(index);
            timer = setInterval(() => goToSlide(currentSlide + 1), slideInterval);
        });
    });
});
