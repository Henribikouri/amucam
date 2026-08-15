
        // 2. Menu Mobile Toggle
        const btn = document.getElementById('mobile-menu-button');
        const menu = document.getElementById('mobile-menu');
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });

        // 2bis. Sous-navigation "À propos" en fil d'Ariane (desktop)
        (function () {
            const aboutItem = document.getElementById('about-nav-item');
            const aboutSubnav = document.getElementById('about-subnav');
            const aboutChevronBtn = document.getElementById('about-chevron-btn');
            if (!aboutItem || !aboutSubnav) return;

            let closeTimer;

            function openAboutSubnav() {
                clearTimeout(closeTimer);
                aboutItem.classList.add('about-open');
                aboutSubnav.classList.add('open');
                if (aboutChevronBtn) aboutChevronBtn.setAttribute('aria-expanded', 'true');
            }

            function closeAboutSubnav() {
                aboutItem.classList.remove('about-open');
                aboutSubnav.classList.remove('open');
                if (aboutChevronBtn) aboutChevronBtn.setAttribute('aria-expanded', 'false');
            }

            function scheduleClose() {
                clearTimeout(closeTimer);
                closeTimer = setTimeout(closeAboutSubnav, 200);
            }

            [aboutItem, aboutSubnav].forEach((el) => {
                el.addEventListener('mouseenter', openAboutSubnav);
                el.addEventListener('mouseleave', scheduleClose);
            });

            aboutItem.addEventListener('focusin', openAboutSubnav);
            aboutItem.addEventListener('focusout', (e) => {
                if (!aboutItem.contains(e.relatedTarget) && !aboutSubnav.contains(e.relatedTarget)) {
                    scheduleClose();
                }
            });

            if (aboutChevronBtn) {
                aboutChevronBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (aboutSubnav.classList.contains('open')) {
                        closeAboutSubnav();
                    } else {
                        openAboutSubnav();
                    }
                });
            }

            document.addEventListener('click', (e) => {
                if (!aboutItem.contains(e.target) && !aboutSubnav.contains(e.target)) {
                    closeAboutSubnav();
                }
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') closeAboutSubnav();
            });
        })();

        // 2ter. Accordéon "À propos" (mobile)
        (function () {
            const mobileAboutToggle = document.getElementById('mobile-about-toggle');
            const mobileAboutSublinks = document.getElementById('mobile-about-sublinks');
            if (!mobileAboutToggle || !mobileAboutSublinks) return;

            mobileAboutToggle.addEventListener('click', () => {
                const isOpen = mobileAboutSublinks.classList.toggle('open');
                const chevron = mobileAboutToggle.querySelector('.about-chevron');
                if (chevron) chevron.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
                mobileAboutToggle.setAttribute('aria-expanded', String(isOpen));
            });
        })();

        // 2quater. Recherche navbar (desktop + mobile) — champ toujours visible
        function runSiteSearch(query) {
            const q = query.trim();
            if (!q) return;
            const url = 'https://www.google.com/search?q=' + encodeURIComponent('site:' + window.location.hostname + ' ' + q);
            window.open(url, '_blank', 'noopener');
        }

        document.querySelectorAll('.nav-search-box').forEach((box) => {
            const icon = box.querySelector('i');
            const input = box.querySelector('input');
            if (!input) return;
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') { e.preventDefault(); runSiteSearch(input.value); }
            });
            if (icon) {
                icon.addEventListener('click', () => {
                    if (input.value.trim()) runSiteSearch(input.value);
                    else input.focus();
                });
            }
        });

        // 2quinquies. Sélecteur de langue (desktop)
        (function () {
            const switcher = document.getElementById('lang-switch');
            const toggle = document.getElementById('lang-toggle');
            if (!switcher || !toggle) return;

            toggle.addEventListener('click', () => {
                const isOpen = switcher.classList.toggle('open');
                toggle.setAttribute('aria-expanded', String(isOpen));
            });
            document.addEventListener('click', (e) => {
                if (!switcher.contains(e.target)) switcher.classList.remove('open');
            });
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') switcher.classList.remove('open');
            });
        })();

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

window.onscroll = function() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementById("scroll-progress").style.width = scrolled + "%";
};
