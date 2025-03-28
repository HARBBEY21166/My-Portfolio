// DOM Elements
const header = document.querySelector('.header');
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');
const themeToggle = document.getElementById('theme-toggle');
const backToTop = document.getElementById('back-to-top');
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const testimonialItems = document.querySelectorAll('.testimonial-item');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const dotsContainer = document.querySelector('.dots-container');
const contactForm = document.getElementById('contactForm');

// Theme Toggle Functionality
function initThemeToggle() {
    // Check for saved theme preference or prefer-color-scheme
    const getThemePreference = () => {
        if (localStorage.getItem('theme') === 'light') return 'light';
        if (localStorage.getItem('theme') === 'dark') return 'dark';
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    // Apply the theme
    const applyTheme = (theme) => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
        localStorage.setItem('theme', theme);
    };

    // Initial theme setup
    applyTheme(getThemePreference());

    // Toggle theme on button click
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.classList.contains('light') ? 'light' : 'dark';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            applyTheme(newTheme);
        });
    }
}

// Scroll Animation Function
function addScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navbar.classList.toggle('active');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (header && navbar && !header.contains(e.target) && navbar.classList.contains('active')) {
            navbar.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navbar.classList.contains('active')) {
            navbar.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Close mobile menu when clicking on a nav link
    const navLinks = navbar.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// Scroll Effect
function initScrollEffects() {
    const scrollThreshold = 50;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Show/hide back to top button
        if (backToTop) {
            if (currentScroll > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
    }, { passive: true });

    // Back to top button click handler
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Portfolio Filter Functionality
function initPortfolioFilter() {
    if (filterButtons.length && portfolioItems.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                });
            });
        });
    }
}


// Testimonial Carousel
function initTestimonialCarousel() {
    if (testimonialItems.length) {
        let currentIndex = 0;

        // Create dots
        testimonialItems.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        function updateSlides() {
            testimonialItems.forEach(item => {
                item.classList.remove('active');
            });
            testimonialItems[currentIndex].classList.add('active');

            // Update dots
            const dots = document.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        function goToSlide(index) {
            currentIndex = index;
            updateSlides();
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % testimonialItems.length;
            updateSlides();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + testimonialItems.length) % testimonialItems.length;
            updateSlides();
        }

        // Event listeners
        if (prevButton) prevButton.addEventListener('click', prevSlide);
        if (nextButton) nextButton.addEventListener('click', nextSlide);

        // Auto-advance slides every 5 seconds
        const autoPlayInterval = setInterval(nextSlide, 5000);

        // Pause auto-play when user interacts with carousel
        const pauseAutoPlay = () => {
            clearInterval(autoPlayInterval);
        };

        if (prevButton) prevButton.addEventListener('click', pauseAutoPlay);
        if (nextButton) nextButton.addEventListener('click', pauseAutoPlay);
        document.querySelectorAll('.dot').forEach(dot => {
            dot.addEventListener('click', pauseAutoPlay);
        });
    }
}

// Form Validation
function initFormValidation() {
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        
        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const subjectError = document.getElementById('subject-error');
        const messageError = document.getElementById('message-error');
        
        const validateEmail = (email) => {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        };
        
        const showError = (input, errorElement, message) => {
            input.classList.add('error');
            if (errorElement) {
                errorElement.textContent = message;
                errorElement.style.opacity = '1';
                errorElement.style.transform = 'translateY(0)';
            }
        };
        
        const hideError = (input, errorElement) => {
            input.classList.remove('error');
            if (errorElement) {
                errorElement.textContent = '';
                errorElement.style.opacity = '0';
                errorElement.style.transform = 'translateY(-10px)';
            }
        };
        
        // Real-time validation
        if (nameInput) {
            nameInput.addEventListener('input', () => {
                if (nameInput.value.trim() === '') {
                    showError(nameInput, nameError, 'Name is required');
                } else {
                    hideError(nameInput, nameError);
                }
            });
        }
        
        if (emailInput) {
            emailInput.addEventListener('input', () => {
                if (emailInput.value.trim() === '') {
                    showError(emailInput, emailError, 'Email is required');
                } else if (!validateEmail(emailInput.value.trim())) {
                    showError(emailInput, emailError, 'Please enter a valid email');
                } else {
                    hideError(emailInput, emailError);
                }
            });
        }
        
        if (subjectInput) {
            subjectInput.addEventListener('input', () => {
                if (subjectInput.value.trim() === '') {
                    showError(subjectInput, subjectError, 'Subject is required');
                } else {
                    hideError(subjectInput, subjectError);
                }
            });
        }
        
        if (messageInput) {
            messageInput.addEventListener('input', () => {
                if (messageInput.value.trim() === '') {
                    showError(messageInput, messageError, 'Message is required');
                } else {
                    hideError(messageInput, messageError);
                }
            });
        }
        
        // Form submission
        contactForm.addEventListener('submit', function(event) {
            let isValid = true;
            
            // Validate name
            if (nameInput && nameInput.value.trim() === '') {
                showError(nameInput, nameError, 'Name is required');
                isValid = false;
            }
            
            // Validate email
            if (emailInput) {
                if (emailInput.value.trim() === '') {
                    showError(emailInput, emailError, 'Email is required');
                    isValid = false;
                } else if (!validateEmail(emailInput.value.trim())) {
                    showError(emailInput, emailError, 'Please enter a valid email');
                    isValid = false;
                }
            }
            
            // Validate subject
            if (subjectInput && subjectInput.value.trim() === '') {
                showError(subjectInput, subjectError, 'Subject is required');
                isValid = false;
            }
            
            // Validate message
            if (messageInput && messageInput.value.trim() === '') {
                showError(messageInput, messageError, 'Message is required');
                isValid = false;
            }
            
            if (!isValid) {
                event.preventDefault();
            }
        });
    }
}

// Active link highlighting based on scroll position
function initActiveNavLinks() {
    const navLinks = document.querySelectorAll('.navbar a');
    
    const highlightActiveLink = () => {
        let scrollPosition = window.scrollY;
        
        // Find which section is currently in view
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to corresponding link
                const correspondingLink = document.querySelector(`.navbar a[href="#${sectionId}"]`);
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
        
        // Special case for home link when at the top of the page
        if (scrollPosition < 100) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            const homeLink = document.querySelector('.navbar a[href="index.html"]');
            if (homeLink) {
                homeLink.classList.add('active');
            }
        }
    };
    
    window.addEventListener('scroll', highlightActiveLink, { passive: true });
    
    // Initial call to set active link on page load
    highlightActiveLink();
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    addScrollAnimations();
    initMobileMenu();
    initScrollEffects();
    initPortfolioFilter();
    initTestimonialCarousel();
    initFormValidation();
    initActiveNavLinks();
});
