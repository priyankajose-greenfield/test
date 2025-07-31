// Contact Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const scrollTopBtn = document.getElementById('scrollTop');
    
    // Form submission handler
    if (contactForm) {
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
        const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'company', 'message'];
        
        for (let field of requiredFields) {
            if (!data[field] || data[field].trim() === '') {
                showError(`Please fill in the ${getFieldLabel(field)} field.`);
                return false;
            }
        }
        
        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(data.email)) {
            showError('Please enter a valid email address.');
            return false;
        }
        
        // Phone validation
        const phonePattern = /^[\d\s\-\+\(\)]+$/;
        if (!phonePattern.test(data.phone)) {
            showError('Please enter a valid phone number.');
            return false;
        }
        
        // reCAPTCHA validation
        if (!data.recaptcha) {
            showError('Please verify that you are not a robot.');
            return false;
        }
        
        return true;
    }
    
    // Get field label for error messages
    function getFieldLabel(field) {
        const labels = {
            firstName: 'First Name',
            lastName: 'Last Name',
            email: 'Email',
            phone: 'Phone',
            company: 'Company Name',
            message: 'Message'
        };
        return labels[field] || field;
    }
    
    // Show error message
    function showError(message) {
        // Remove existing error messages
        const existingErrors = document.querySelectorAll('.error-message');
        existingErrors.forEach(error => error.remove());
        
        // Create new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <div class="error-content">
                <div class="error-icon">⚠</div>
                <p>${message}</p>
            </div>
        `;
        
        // Style the error message
        errorDiv.style.cssText = `
            background: rgba(239, 68, 68, 0.1);
            border: 1px solid rgba(239, 68, 68, 0.3);
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 20px;
            color: #FCA5A5;
            animation: slideDown 0.5s ease;
        `;
        
        // Add error styles
        const errorStyle = document.createElement('style');
        errorStyle.textContent = `
            .error-content {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .error-icon {
                font-size: 1.2rem;
                color: #EF4444;
            }
            
            .error-message p {
                margin: 0;
                font-size: 0.9rem;
                font-weight: 500;
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
        `;
        document.head.appendChild(errorStyle);
        
        // Insert error message before the form
        contactForm.parentNode.insertBefore(errorDiv, contactForm);
        
        // Remove error message after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
        
        // Scroll to error message
        errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Submit form
    function submitForm(data) {
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = `
            <span class="btn-text">Sending...</span>
            <div class="loading-spinner"></div>
        `;
        submitBtn.disabled = true;
        
        // Add loading spinner styles
        const spinnerStyle = document.createElement('style');
        spinnerStyle.textContent = `
            .loading-spinner {
                width: 20px;
                height: 20px;
                border: 2px solid rgba(255, 255, 255, 0.3);
                border-top: 2px solid #ffffff;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(spinnerStyle);
        
        // Simulate API call delay
        setTimeout(() => {
            // Hide form and show success message
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
                
                // Remove any error messages
                const errorMessages = document.querySelectorAll('.error-message');
                errorMessages.forEach(error => error.remove());
            }, 5000);
        }, 2000);
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
    
    // Scroll to top functionality
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
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
    
    // Features dropdown functionality
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
    }
    
    // Social media click tracking
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            console.log('Social media clicked:', href);
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
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
    
    // Add form field animation styles
    const formAnimationStyle = document.createElement('style');
    formAnimationStyle.textContent = `
        .form-group.focused input,
        .form-group.focused textarea,
        .form-group.focused select {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(51, 102, 255, 0.15);
        }
        
        .form-group input,
        .form-group textarea,
        .form-group select {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .checkbox-group input[type="checkbox"]:checked {
            background: #3366FF;
            border-color: #3366FF;
        }
        
        .recaptcha-placeholder {
            transition: all 0.3s ease;
        }
        
        .recaptcha-placeholder:hover {
            border-color: #3366FF;
            box-shadow: 0 4px 12px rgba(51, 102, 255, 0.1);
        }
    `;
    document.head.appendChild(formAnimationStyle);
    
    // Add entrance animations
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
    
    // Observe form elements for animations
    const formElements = document.querySelectorAll('.form-content > *');
    formElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        observer.observe(element);
    });
    
    // Add animation styles
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .maritime-image {
            animation: fadeInLeft 1s ease-out;
        }
        
        .contact-form-container {
            animation: slideInRight 1s ease-out;
        }
        
        @keyframes fadeInLeft {
            from {
                opacity: 0;
                transform: translateX(-50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .floating-social {
            animation: fadeInRight 1s ease-out 0.5s both;
        }
        
        @keyframes fadeInRight {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(animationStyle);
});