// Fluid Gradient Animation
class Gradient {
    constructor() {
        this.canvas = document.getElementById('gradient-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.colors = [
            { r: 10, g: 0, b: 17 },     // #0a0011 (Darker primary)
            { r: 26, g: 5, b: 44 },     // #1a052c (Darker secondary)
            { r: 42, g: 8, b: 71 },     // #2a0847 (Darker accent)
            { r: 10, g: 0, b: 17 }      // #0a0011 (Darker primary)
        ];
        this.particles = [];
        this.numberOfParticles = 15;
        this.mouse = {
            x: undefined,
            y: undefined,
            radius: 100
        };
        this.init();
    }

    init() {
        // Set canvas size
        this.handleResize();
        // Create initial particles
        this.createParticles();
        // Add event listeners
        window.addEventListener('resize', () => this.handleResize());
        window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        // Start animation
        this.animate();
    }

    handleResize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.createParticles(); // Recreate particles on resize
    }

    handleMouseMove(e) {
        this.mouse.x = e.x;
        this.mouse.y = e.y;
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.numberOfParticles; i++) {
            const color = this.colors[Math.floor(Math.random() * this.colors.length)];
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 200 + 100,
                color: color,
                baseX: Math.random() * this.canvas.width,
                baseY: Math.random() * this.canvas.height,
                density: (Math.random() * 30) + 1,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Create base gradient with darker colors
        const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
        gradient.addColorStop(0, '#0a0011');  // Darker primary
        gradient.addColorStop(1, '#2a0847');  // Darker accent
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            // Mouse interaction
            if (this.mouse.x && this.mouse.y) {
                let dx = this.mouse.x - particle.x;
                let dy = this.mouse.y - particle.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;

                const maxDistance = 300;
                let force = (maxDistance - distance) / maxDistance;
                if (force < 0) force = 0;

                let directionX = (forceDirectionX * force * particle.density) * -1;
                let directionY = (forceDirectionY * force * particle.density) * -1;

                if (distance < maxDistance) {
                    particle.x += directionX;
                    particle.y += directionY;
                }
            }

            // Natural movement
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Boundary checking
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            // Return to base position
            let dx = particle.x - particle.baseX;
            let dy = particle.y - particle.baseY;
            particle.x -= dx * 0.02;
            particle.y -= dy * 0.02;

            // Draw particle with adjusted opacity for darker theme
            const particleGradient = this.ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.radius
            );
            particleGradient.addColorStop(0, `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, 0.15)`); // Reduced opacity
            particleGradient.addColorStop(1, 'transparent');
            
            this.ctx.beginPath();
            this.ctx.fillStyle = particleGradient;
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize gradient animation
new Gradient();

// Typing Animation
document.addEventListener('DOMContentLoaded', function() {
    const typed = new Typed('.typed', {
        strings: [
            "CS Student/ AI Enthusiast",
            "Creating Engaging Videos",
            "AI Automation & Optimization"
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        cursorChar: '|',
        showCursor: true,
        autoInsertCss: true,
        onStringTyped: function(arrayPos, self) {
            document.querySelector('.typed').style.color = '#ffffff';
            document.querySelector('.typed-cursor').style.color = '#ffffff';
        }
    });
});

// Scroll Animations
function checkScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    const triggerBottom = window.innerHeight * 0.8;

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < triggerBottom) {
            element.classList.add('animate');
        }
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize scroll animations
window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);

// Header Scroll Effect
const header = document.querySelector('.sticky-header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Form Submission Handler
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Form submitted');
        form.reset();
    });
}
// Add this to your existing JavaScript
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - sectionHeight/3)) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Add scroll event listener
window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("show");
    });
});
