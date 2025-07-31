// Form handling and animations
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    // Only initialize form handling if contactForm exists
    if (contactForm) {
        // Form submission handler
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!validateForm(data)) {
                return;
            }
            
            // Simulate form submission
            submitForm(data);
        });
    }
    
    // Form validation
    function validateForm(data) {
        const requiredFields = ['fullName', 'company', 'email', 'subject', 'message'];
        
        for (let field of requiredFields) {
            if (!data[field] || data[field].trim() === '') {
                showError(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
                return false;
            }
        }
        
        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(data.email)) {
            showError('Please enter a valid email address.');
            return false;
        }
        
        return true;
    }
    
    // Show error message
    function showError(message) {
        // Create temporary error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <div class="error-icon">⚠</div>
            <p>${message}</p>
        `;
        errorDiv.style.cssText = `
            display: block;
            text-align: center;
            background: rgba(239, 68, 68, 0.1);
            border: 1px solid rgba(239, 68, 68, 0.3);
            border-radius: 8px;
            padding: 16px;
            margin-top: 16px;
            color: #fca5a5;
            animation: slideDown 0.5s ease;
        `;
        
        contactForm.appendChild(errorDiv);
        
        // Remove error message after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }
    
    // Submit form
    function submitForm(data) {
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<span class="btn-text">Sending...</span>';
        submitBtn.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            // Show success message
            contactForm.style.display = 'none';
            successMessage.classList.add('show');
            
            // Log form data (in real app, this would be sent to server)
            console.log('Form submitted:', data);
            
            // Reset form after showing success
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.display = 'flex';
                successMessage.classList.remove('show');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 5000);
        }, 1500);
    }
    
    // Enhanced form interactions
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    
    formInputs.forEach(input => {
        // Add focus/blur effects
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            if (this.value) {
                this.parentElement.classList.add('filled');
            } else {
                this.parentElement.classList.remove('filled');
            }
        });
        
        // Initialize filled state
        if (input.value) {
            input.parentElement.classList.add('filled');
        }
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
    
    // Header background on scroll
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide header on scroll down, show on scroll up
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Add CSS for scrolled header state
    const style = document.createElement('style');
    style.textContent = `
        .header.scrolled {
            background: rgba(10, 14, 26, 0.95);
            backdrop-filter: blur(25px);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }
        
        .header {
            transition: all 0.3s ease;
        }
        
        .form-group.focused label {
            color: #00d4ff;
            transform: translateY(-2px);
        }
        
        .form-group.filled label {
            color: #00d4ff;
        }
        
        .error-message {
            font-size: 0.9rem;
        }
        
        .error-icon {
            font-size: 1.5rem;
            margin-bottom: 8px;
            color: #ef4444;
        }
        
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .form-group label {
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(style);
    
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
    
    // Observe sections for animations
    const sections = document.querySelectorAll('.contact-form-section, .direct-contact-section, .departments-section, .social-section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Add animation styles
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .contact-form-section,
        .direct-contact-section,
        .departments-section,
        .social-section {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .contact-form-section.animate-in,
        .direct-contact-section.animate-in,
        .departments-section.animate-in,
        .social-section.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .contact-method,
        .department-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .contact-method:hover .contact-icon,
        .department-card:hover .dept-icon {
            transform: scale(1.1) rotate(5deg);
        }
        
        .social-link:hover .social-icon {
            transform: scale(1.2);
        }
        
        .social-icon {
            transition: transform 0.3s ease;
        }
    `;
    document.head.appendChild(animationStyle);
});

// Additional utility functions
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Show temporary confirmation
        const notification = document.createElement('div');
        notification.textContent = 'Copied to clipboard!';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(34, 197, 94, 0.9);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-weight: 500;
            z-index: 9999;
            animation: slideInRight 0.3s ease;
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    });
}

// Add click-to-copy functionality for email addresses
document.addEventListener('DOMContentLoaded', function() {
    const emailElements = document.querySelectorAll('.contact-details p');
    emailElements.forEach(element => {
        if (element.textContent.includes('@')) {
            element.style.cursor = 'pointer';
            element.title = 'Click to copy email address';
            
            element.addEventListener('click', function() {
                const emailMatch = this.textContent.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
                if (emailMatch) {
                    copyToClipboard(emailMatch[1]);
                }
            });
        }
    });
});

// Features dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    const dropdownTrigger = document.querySelector('.nav-item-dropdown');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    let dropdownTimeout;
    
    if (dropdownTrigger && dropdownMenu) {
        // Show dropdown on hover
        dropdownTrigger.addEventListener('mouseenter', function() {
            clearTimeout(dropdownTimeout);
            dropdownMenu.style.pointerEvents = 'auto';
        });
        
        // Hide dropdown with delay
        dropdownTrigger.addEventListener('mouseleave', function() {
            dropdownTimeout = setTimeout(() => {
                dropdownMenu.style.pointerEvents = 'none';
            }, 150);
        });
        
        // Keep dropdown open when hovering over menu items
        dropdownMenu.addEventListener('mouseenter', function() {
            clearTimeout(dropdownTimeout);
        });
        
        dropdownMenu.addEventListener('mouseleave', function() {
            dropdownTimeout = setTimeout(() => {
                dropdownMenu.style.pointerEvents = 'none';
            }, 150);
        });
        
        // Handle sustainability link click
        const sustainabilityLink = document.querySelector('.sustainability-link');
        if (sustainabilityLink) {
            sustainabilityLink.addEventListener('click', function(e) {
                // Let the default link behavior work
                console.log('Navigating to sustainability page');
            });
        }
        
        // Close dropdown on outside click
        document.addEventListener('click', function(e) {
            if (!dropdownTrigger.contains(e.target)) {
                dropdownMenu.style.pointerEvents = 'none';
            }
        });
        
        // Handle keyboard navigation
        dropdownTrigger.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const firstItem = dropdownMenu.querySelector('.dropdown-item');
                if (firstItem) {
                    firstItem.focus();
                }
            }
        });
        
        // Arrow key navigation within dropdown
        const dropdownItems = dropdownMenu.querySelectorAll('.dropdown-item');
        dropdownItems.forEach((item, index) => {
            item.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const nextItem = dropdownItems[index + 1] || dropdownItems[0];
                    nextItem.focus();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prevItem = dropdownItems[index - 1] || dropdownItems[dropdownItems.length - 1];
                    prevItem.focus();
                } else if (e.key === 'Escape') {
                    dropdownTrigger.querySelector('.nav-link').focus();
                    dropdownMenu.style.pointerEvents = 'none';
                }
            });
        });
    }
});

// Performance optimization: Reduce particle animations on mobile
if (window.innerWidth <= 768) {
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        if (index > 4) {
            particle.style.display = 'none';
        }
    });
}

// Add loading state for demo button
document.addEventListener('DOMContentLoaded', function() {
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
                // Here you would typically redirect to demo page
                console.log('Demo button clicked - would redirect to demo page');
            }, 2000);
        });
    }
});