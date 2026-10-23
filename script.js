/* ==========================================================================
   Modern Premium Glassmorphism Portfolio Interaction Script
   Author: Senior Full Stack Developer (Pair Programming with Antigravity)
   Target: Sabhasri C S Portfolio
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Vector Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Mobile Nav Menu Toggle Action
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            // Toggle hamburger icon between menu and close
            const menuIcon = hamburgerBtn.querySelector('i');
            if (menuIcon) {
                const isOpen = navMenu.classList.contains('open');
                menuIcon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
                lucide.createIcons({
                    attrs: { id: menuIcon.id }
                });
            }
        });
    }

    // Close menu when clicking navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                const menuIcon = hamburgerBtn.querySelector('i');
                if (menuIcon) {
                    menuIcon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
            }
        });
    });

    // 3. Navbar Sticky & Scroll Effects
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 4. Dark / Light Theme Toggle Setup
    const themeToggleBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';

    // Apply initial theme settings
    document.documentElement.setAttribute('data-theme', savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const targetTheme = currentTheme === 'light' ? 'dark' : 'light';

            document.documentElement.setAttribute('data-theme', targetTheme);
            localStorage.setItem('theme', targetTheme);
        });
    }

    // 5. Typewriter Animation Effect (Hero Title)
    const typingTextEl = document.getElementById('typing-text');
    const rolesArray = ["Full Stack Developer",];
    let currentRoleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingDelay = 150;

    function handleTypewriter() {
        const currentRoleText = rolesArray[currentRoleIndex];

        if (isDeleting) {
            typingTextEl.textContent = currentRoleText.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typingDelay = 50;
        } else {
            typingTextEl.textContent = currentRoleText.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typingDelay = 100;
        }

        if (!isDeleting && currentCharIndex === currentRoleText.length) {
            // Wait before starting backspace deletion
            typingDelay = 2000;
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            // Move to next string role
            currentRoleIndex = (currentRoleIndex + 1) % rolesArray.length;
            typingDelay = 500;
        }

        setTimeout(handleTypewriter, typingDelay);
    }

    if (typingTextEl) {
        setTimeout(handleTypewriter, 1000);
    }

    // 6. Scroll Spy Active Links Highlighter
    const sections = document.querySelectorAll('section');

    function handleScrollSpy() {
        let scrollPosition = window.scrollY + 150; // Offset for navbar height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', handleScrollSpy);

    // 7. Intersection Observer for Scroll Reveals
    const revealOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Reveal once
            }
        });
    }, revealOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => revealObserver.observe(el));

    // 8. Contact Form Interactive Feedback Logic
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameVal = document.getElementById('form-name').value.trim();
            const emailVal = document.getElementById('form-email').value.trim();
            const messageVal = document.getElementById('form-message').value.trim();

            // Simple client-side check
            if (!nameVal || !emailVal || !messageVal) {
                showFormStatus('Please complete all form fields.', 'error');
                return;
            }

            if (!validateEmail(emailVal)) {
                showFormStatus('Please provide a valid email address.', 'error');
                return;
            }

            // Simulate sending API request
            showFormStatus('Sending your message... Please wait.', 'pending');
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if (submitBtn) submitBtn.disabled = true;

            setTimeout(() => {
                showFormStatus(`Thank you, ${nameVal}! Your message has been sent successfully.`, 'success');
                contactForm.reset();
                if (submitBtn) submitBtn.disabled = false;
            }, 1800);
        });
    }

    function showFormStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = 'form-status-msg'; // Reset

        if (type === 'success') {
            formStatus.classList.add('success');
        } else if (type === 'error') {
            formStatus.classList.add('error');
        } else {
            // Pending/Loading message color coding
            formStatus.style.display = 'block';
            formStatus.style.background = 'rgba(139, 92, 246, 0.1)';
            formStatus.style.color = 'var(--primary-accent)';
            formStatus.style.border = '1px solid rgba(139, 92, 246, 0.2)';
        }
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});
