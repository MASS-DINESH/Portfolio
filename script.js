(function () {
    // ----- LOADING -----
    window.addEventListener('load', () => {
        const loading = document.getElementById('loading');
        loading.classList.add('hide');
        setTimeout(() => loading.style.display = 'none', 700);
    });

    // ----- THEME TOGGLE -----
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    const html = document.documentElement;

    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        localStorage.setItem('theme', theme);
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
    }

    themeToggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        setTheme(current === 'dark' ? 'light' : 'dark');
        themeToggle.style.transform = 'scale(0.7) rotate(30deg)';
        setTimeout(() => themeToggle.style.transform = '', 400);
    });

    // ----- TYPING EFFECT -----
    const strings = ['MCA Student', 'Full Stack Developer', 'MERN Stack Developer'];
    let strIdx = 0,
        charIdx = 0,
        isDeleting = false;
    const typingText = document.querySelector('.typing-text');
    const speed = 80,
        delSpeed = 35,
        pause = 2400;

    function typeEffect() {
        const current = strings[strIdx];
        if (!isDeleting) {
            typingText.textContent = current.substring(0, charIdx + 1);
            charIdx++;
            if (charIdx === current.length) {
                isDeleting = true;
                setTimeout(typeEffect, pause);
                return;
            }
            setTimeout(typeEffect, speed);
        } else {
            typingText.textContent = current.substring(0, charIdx - 1);
            charIdx--;
            if (charIdx === 0) {
                isDeleting = false;
                strIdx = (strIdx + 1) % strings.length;
                setTimeout(typeEffect, 300);
                return;
            }
            setTimeout(typeEffect, delSpeed);
        }
    }
    typeEffect();

    // ----- NAVBAR / HAMBURGER -----
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ----- NAVBAR SCROLL EFFECT -----
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active nav link
        let current = '';
        document.querySelectorAll('section').forEach(section => {
            const top = section.offsetTop - 130;
            if (window.scrollY >= top) current = section.getAttribute('id');
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) link.classList.add('active');
        });

        // Scroll top button
        const btn = document.getElementById('scrollTopBtn');
        if (window.scrollY > 500) btn.classList.add('show');
        else btn.classList.remove('show');
    });

    // ----- SCROLL TOP -----
    document.getElementById('scrollTopBtn').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ----- ANIMATED COUNTERS -----
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(c => {
            const target = parseInt(c.getAttribute('data-target'));
            let current = 0;
            const increment = target / 50;
            const update = () => {
                current += increment;
                if (current < target) {
                    c.textContent = Math.ceil(current);
                    requestAnimationFrame(update);
                } else {
                    c.textContent = target;
                }
            };
            update();
        });
        countersAnimated = true;
    }

    // ----- SCROLL REVEAL -----
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (entry.target.closest('#about') && !countersAnimated) {
                    animateCounters();
                }
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // ----- TIMELINE & CERTIFICATES OBSERVER -----
    const animObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.timeline-item, .cert-card').forEach(el => animObserver.observe(el));

    // ----- SMOOTH SCROLL -----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ----- PARALLAX SHAPES -----
    document.addEventListener('mousemove', (e) => {
        const shapes = document.querySelectorAll('.shape');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        shapes.forEach((shape, i) => {
            const speed = 20 + (i * 12);
            const moveX = (x - 0.5) * speed;
            const moveY = (y - 0.5) * speed;
            shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });

    // ----- FORCE PROJECT LINKS TO WORK -----
    document.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const url = this.getAttribute('href');
            if (url && url !== '#') {
                e.preventDefault();
                window.open(url, '_blank');
            }
        });
    });
})();