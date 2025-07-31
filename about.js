// About Us Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Animate value cards
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        observer.observe(card);
    });

    // Animate tech pillars
    const techPillars = document.querySelectorAll('.tech-pillar');
    techPillars.forEach((pillar, index) => {
        pillar.style.opacity = '0';
        pillar.style.transform = 'translateX(-30px)';
        pillar.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`;
        observer.observe(pillar);
    });

    // Animate hero elements
    const heroElements = document.querySelectorAll('.hero-content > *, .hero-visual');
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.2}s`;
        observer.observe(element);
    });

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .tech-pillar.animate-in {
            transform: translateX(0) !important;
        }
        
        .value-card:hover .value-icon {
            transform: scale(1.1) rotate(5deg);
        }
        
        .tech-pillar:hover .pillar-icon {
            transform: scale(1.1) rotate(5deg);
        }
        
        .vessel-icon:hover,
        .processing-icon:hover,
        .insights-icon:hover {
            transform: scale(1.1);
        }
    `;
    document.head.appendChild(style);

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(15, 29, 54, 0.95)';
            header.style.backdropFilter = 'blur(25px)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(0, 0, 128, 0.9)';
            header.style.backdropFilter = 'blur(20px)';
            header.style.boxShadow = 'none';
        }
        
        // Hide header on scroll down, show on scroll up
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Demo button functionality
    const demoBtn = document.querySelector('.demo-btn');
    if (demoBtn) {
        demoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const originalText = this.textContent;
            this.textContent = 'Loading...';
            this.disabled = true;
            
            // Simulate demo loading
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
                // Here you would typically redirect to demo page or open modal
                console.log('Demo button clicked - would redirect to demo page');
            }, 2000);
        });
    }

    // CTA buttons functionality
    const ctaPrimary = document.querySelector('.cta-primary');
    const ctaSecondary = document.querySelector('.cta-secondary');

    if (ctaPrimary) {
        ctaPrimary.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Start transformation clicked');
            // Add your transformation logic here
        });
    }

    if (ctaSecondary) {
        ctaSecondary.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Schedule demo clicked');
            // Add your demo scheduling logic here
        });
    }

    // Enhanced hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('.value-card, .tech-pillar');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = this.classList.contains('tech-pillar') ? 
                'translateX(8px)' : 'translateY(-8px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = this.classList.contains('tech-pillar') ? 
                'translateX(0)' : 'translateY(0)';
        });
    });

    // Parallax effect for background particles
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const particles = document.querySelectorAll('.particle');
        
        particles.forEach((particle, index) => {
            const speed = 0.5 + (index * 0.1);
            particle.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Dynamic particle generation
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        
        document.querySelector('.bg-animation').appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 25000);
    }

    // Add new particles periodically
    setInterval(createParticle, 3000);

    // Performance optimization: Reduce animations on mobile
    if (window.innerWidth <= 768) {
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            if (index > 4) {
                particle.style.display = 'none';
            }
        });
    }

    // Add loading state for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('./')) {
                const originalText = this.textContent;
                this.style.opacity = '0.7';
                
                setTimeout(() => {
                    this.style.opacity = '1';
                }, 500);
            }
        });
    });

    // Add subtle glow effect to icons on hover
    const icons = document.querySelectorAll('.value-icon, .pillar-icon');
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.filter = 'drop-shadow(0 0 15px rgba(35, 189, 238, 0.6))';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.filter = 'none';
        });
    });

    // Initialize entrance animations for hero section
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroDescription = document.querySelector('.hero-description');
        const heroVisual = document.querySelector('.hero-visual');
        
        if (heroTitle) heroTitle.classList.add('animate-in');
        if (heroSubtitle) setTimeout(() => heroSubtitle.classList.add('animate-in'), 200);
        if (heroDescription) setTimeout(() => heroDescription.classList.add('animate-in'), 400);
        if (heroVisual) setTimeout(() => heroVisual.classList.add('animate-in'), 600);
    }, 100);
});