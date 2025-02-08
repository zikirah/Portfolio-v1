document.addEventListener('DOMContentLoaded', () => {
    // Initialize Typed.js
    const typed = new Typed('.typed', {
        strings: [
            'Specializing in Video Editing',
            'Creating Motion Graphics',
            'Designing Visual Stories',
            'Bringing Ideas to Life'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true
    });

    // Scroll animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Animate statistics when they come into view
                if (entry.target.classList.contains('stat-number')) {
                    animateValue(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.animate-on-scroll, .stat-number').forEach(element => {
        observer.observe(element);
    });

    // Statistics animation function
    function animateValue(element) {
        const end = parseInt(element.textContent);
        const duration = 2000;
        const start = 0;
        const increment = end / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                element.textContent = end + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 16);
    }

    // Cursor gradient effect
    let timeout;
    document.addEventListener('mousemove', (e) => {
        if (timeout) {
            window.cancelAnimationFrame(timeout);
        }

        timeout = window.requestAnimationFrame(() => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            const gradientBg = document.querySelector('.gradient-bg');
            gradientBg.style.background = `
                radial-gradient(
                    circle at ${x * 100}% ${y * 100}%,
                    var(--gradient-2),
                    var(--gradient-1) 30%,
                    var(--gradient-3) 60%
                )
            `;
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('nav a, .btn').forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Parallax effect for sections
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        document.querySelectorAll('section').forEach((section, index) => {
            const speed = 0.3;
            const yPos = -(scrolled * speed);
            section.style.backgroundPosition = `50% ${yPos}px`;
        });
    });

    // Add active class to nav links
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Service cards hover effect
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.background = `
                radial-gradient(
                    circle at ${x}px ${y}px,
                    rgba(255, 255, 255, 0.1),
                    rgba(255, 255, 255, 0.05) 40%
                )
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.background = 'rgba(255, 255, 255, 0.05)';
        });
    });

    // Profile image hover effect
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        profileImg.addEventListener('mouseenter', () => {
            profileImg.querySelector('img').style.transform = 'scale(1.1)';
        });
        
        profileImg.addEventListener('mouseleave', () => {
            profileImg.querySelector('img').style.transform = 'scale(1)';
        });
    }

    // Social links hover effect
    document.querySelectorAll('.social-links a').forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-5px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Form validation and animation
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add your form submission logic here
            console.log('Form submitted');
        });

        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }

    // Initialize animations on load
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        document.querySelectorAll('.animate-on-scroll').forEach(element => {
            if (element.getBoundingClientRect().top < window.innerHeight) {
                element.classList.add('animate');
            }
        });
    });
});