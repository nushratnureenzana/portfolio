// Theme Toggle Function
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (body.classList.contains('light-mode')) {
        body.classList.remove('light-mode');
        themeToggle.textContent = '☀';
        themeToggle.setAttribute('aria-label', 'Switch to light mode');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.add('light-mode');
        themeToggle.textContent = '🌙';
        themeToggle.setAttribute('aria-label', 'Switch to dark mode');
        localStorage.setItem('theme', 'light');
    }
}

// Load saved theme preference
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        themeToggle.textContent = '🌙';
        themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    } else {
        themeToggle.textContent = '☀';
        themeToggle.setAttribute('aria-label', 'Switch to light mode');
    }
    
    initializeSliders();
    initializeNavigation();
});

// Initialize image sliders
function initializeSliders() {
    const sliders = document.querySelectorAll('.image-slider');
    sliders.forEach(slider => {
        const firstSlide = slider.querySelector('.slide:first-child');
        if (firstSlide) {
            firstSlide.classList.add('active');
        }
    });
}

// Change slide in a single image slider
function changeSlide(button, direction) {
    const slider = button.closest('.image-slider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.slide');
    if (slides.length === 0) return;

    let currentIndex = 0;
    slides.forEach((slide, idx) => {
        if (slide.classList.contains('active')) {
            currentIndex = idx;
        }
    });

    let newIndex = currentIndex + direction;
    if (newIndex >= slides.length) newIndex = 0;
    if (newIndex < 0) newIndex = slides.length - 1;

    slides.forEach(slide => slide.classList.remove('active'));
    slides[newIndex].classList.add('active');
}

// Initialize navigation buttons and scroll highlighting
function initializeNavigation() {
    const nav = document.querySelector('nav');
    const navToggle = document.querySelector('.nav-toggle');
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('section');

    function getNavOffset() {
        return nav ? nav.offsetHeight + 12 : 76;
    }

    function scrollToSection(targetSection) {
        const offset = getNavOffset();
        const top = targetSection.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    }

    if (nav && navToggle) {
        navToggle.addEventListener('click', function() {
            const isOpen = nav.classList.toggle('menu-open');
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
    }

    function closeMenuOnMobile() {
        if (!nav || !navToggle) return;
        nav.classList.remove('menu-open');
        navToggle.setAttribute('aria-expanded', 'false');
    }

    navButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-section');
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                navButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                scrollToSection(targetSection);
                closeMenuOnMobile();
            }
        });
    });

    window.addEventListener('scroll', function() {
        let current = '';
        const offset = getNavOffset() + 80;

        sections.forEach(section => {
            if (window.pageYOffset >= section.offsetTop - offset) {
                current = section.getAttribute('id');
            }
        });

        navButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-section') === current);
        });
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 820) {
            closeMenuOnMobile();
        }
    });
}
