// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navigation elements
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTopBtn = document.getElementById('back-to-top');
    const contactForm = document.getElementById('contact-form');

    // Mobile Navigation Toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class for background effect
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Show/hide back to top button
        if (scrollTop > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
        
        lastScrollTop = scrollTop;
    });

    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Back to top button functionality
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Contact form handling
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const message = formData.get('message').trim();
        
        // Validate form
        const errors = validateForm(name, email, message);
        
        if (errors.length > 0) {
            showFormErrors(errors);
            return;
        }
        
        // Clear any previous errors
        clearFormErrors();
        
        // Show success message (in a real app, you'd send data to a server)
        showFormSuccess();
        
        // Reset form
        this.reset();
    });

    // Form validation function
    function validateForm(name, email, message) {
        const errors = [];
        
        if (!name || name.length < 2) {
            errors.push({ field: 'name', message: 'Name must be at least 2 characters long' });
        }
        
        if (!email || !isValidEmail(email)) {
            errors.push({ field: 'email', message: 'Please enter a valid email address' });
        }
        
        if (!message || message.length < 10) {
            errors.push({ field: 'message', message: 'Message must be at least 10 characters long' });
        }
        
        return errors;
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Show form errors
    function showFormErrors(errors) {
        // Clear existing errors first
        clearFormErrors();
        
        errors.forEach(error => {
            const field = document.getElementById(error.field);
            const formGroup = field.closest('.form-group');
            
            // Add error class to field
            field.classList.add('error');
            
            // Create error message element
            const errorElement = document.createElement('div');
            errorElement.className = 'form-error';
            errorElement.textContent = error.message;
            errorElement.style.color = 'var(--color-error)';
            errorElement.style.fontSize = 'var(--font-size-sm)';
            errorElement.style.marginTop = 'var(--space-4)';
            
            // Insert error message after the field
            formGroup.appendChild(errorElement);
        });
    }
    
    // Clear form errors
    function clearFormErrors() {
        const errorElements = document.querySelectorAll('.form-error');
        const errorFields = document.querySelectorAll('.form-control.error');
        
        errorElements.forEach(el => el.remove());
        errorFields.forEach(field => field.classList.remove('error'));
    }
    
    // Show form success message
    function showFormSuccess() {
        // Create success message
        const successElement = document.createElement('div');
        successElement.className = 'form-success';
        successElement.innerHTML = `
            <div style="
                background: rgba(50, 184, 198, 0.1);
                border: 1px solid rgba(50, 184, 198, 0.3);
                color: var(--color-success);
                padding: var(--space-16);
                border-radius: var(--radius-base);
                margin-bottom: var(--space-16);
                text-align: center;
                font-weight: var(--font-weight-medium);
            ">
                ✓ Message sent successfully! I'll get back to you soon.
            </div>
        `;
        
        // Insert success message at the top of the form
        contactForm.insertBefore(successElement, contactForm.firstChild);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            if (successElement.parentNode) {
                successElement.remove();
            }
        }, 5000);
    }
    
    // Add error styles to CSS dynamically
    const errorStyles = `
        .form-control.error {
            border-color: var(--color-error);
            box-shadow: 0 0 0 3px rgba(255, 84, 89, 0.1);
        }
        
        .form-control.error:focus {
            border-color: var(--color-error);
            box-shadow: 0 0 0 3px rgba(255, 84, 89, 0.2);
        }
    `;
    
    // Inject error styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = errorStyles;
    document.head.appendChild(styleSheet);

    // Animated elements on scroll
    const animatedElements = document.querySelectorAll('.blog-card, .project-card, .social-card');
    const animationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Set initial state for animated elements
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animationObserver.observe(element);
    });

    // Typing effect for hero subtitle (optional enhancement)
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        
        let charIndex = 0;
        const typingSpeed = 50;
        
        function typeText() {
            if (charIndex < originalText.length) {
                heroSubtitle.textContent += originalText[charIndex];
                charIndex++;
                setTimeout(typeText, typingSpeed);
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(typeText, 1000);
    }

    // Resume iframe fallback handling
    const resumeIframe = document.querySelector('.resume-viewer iframe');
    const resumeFallback = document.querySelector('.resume-fallback');
    
    if (resumeIframe && resumeFallback) {
        // Initially hide the fallback
        resumeFallback.style.display = 'none';
        
        // Show fallback if iframe fails to load
        resumeIframe.addEventListener('error', function() {
            resumeFallback.style.display = 'block';
        });
        
        // Hide fallback if iframe loads successfully
        resumeIframe.addEventListener('load', function() {
            resumeFallback.style.display = 'none';
        });
        
        // Check if iframe content loaded after a timeout
        setTimeout(() => {
            try {
                if (!resumeIframe.contentDocument && !resumeIframe.contentWindow) {
                    resumeFallback.style.display = 'block';
                }
            } catch (e) {
                // Cross-origin restrictions might prevent access
                // In this case, assume the PDF is loading
                console.log('Resume iframe cross-origin access restricted');
            }
        }, 3000);
    }

    // Smooth reveal animations for sections
    const revealElements = document.querySelectorAll('.section-header, .about-content, .contact-content');
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // Add reveal styles
    const revealStyles = `
        .section-header,
        .about-content,
        .contact-content {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .section-header.revealed,
        .about-content.revealed,
        .contact-content.revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    
    const revealStyleSheet = document.createElement('style');
    revealStyleSheet.textContent = revealStyles;
    document.head.appendChild(revealStyleSheet);

    // Parallax effect for hero section (subtle)
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroHeight = hero.offsetHeight;
        
        if (scrolled < heroHeight) {
            const rate = scrolled * -0.3;
            hero.style.transform = `translateY(${rate}px)`;
        }
        
        ticking = false;
    }
    
    function requestParallaxTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestParallaxTick);

    // Skills tags hover effect enhancement
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(0, 212, 255, 0.15)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Tech tags hover effect enhancement
    const techTags = document.querySelectorAll('.tech-tag');
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
            this.style.color = 'var(--color-text)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'var(--color-secondary)';
            this.style.color = 'var(--color-text-secondary)';
        });
    });

    // Console welcome message
    console.log(`
    🚀 Welcome to Aditya Singh's Cybersecurity Portfolio!
    
    This portfolio showcases expertise in:
    • Web Application Security
    • Penetration Testing  
    • Bug Bounty Hunting
    • Security Research
    
    Built with modern web technologies for optimal performance.
    
    Contact: aditya.singh.cybersec@gmail.com
    `);
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization - debounce scroll events
const debouncedScrollHandler = debounce(function() {
    // Any expensive scroll operations can be placed here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Error handling for any unhandled promise rejections
window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
});

// Service worker registration (for future PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment when you have a service worker
        // navigator.serviceWorker.register('/sw.js')
        //   .then(function(registration) {
        //     console.log('ServiceWorker registration successful');
        //   })
        //   .catch(function(err) {
        //     console.log('ServiceWorker registration failed');
        //   });
    });
}
