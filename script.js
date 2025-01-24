/*const texts = ["FE Developer", "UI Designer", "Web Designer", "UX Designer"];
        let currentIndex = 0;
        
        function updateText() {
            const textElement = document.querySelector('.typing-text span');
            textElement.textContent = texts[currentIndex];
            currentIndex = (currentIndex + 1) % texts.length;
        }

        updateText();
        setInterval(updateText, 4000);*/


// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');
const header = document.querySelector('.header');

menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    navbar.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!header.contains(e.target) && navbar.classList.contains('active')) {
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

// Scroll Effect
let lastScroll = 0;
const scrollThreshold = 50;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > scrollThreshold) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
}, { passive: true });


 document.addEventListener('DOMContentLoaded', function() {
            const items = document.querySelectorAll('.testimonial-item');
            const prevButton = document.querySelector('.prev-button');
            const nextButton = document.querySelector('.next-button');
            const dotsContainer = document.querySelector('.dots-container');
            let currentIndex = 0;

            // Create dots
            items.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
            });

            function updateSlides() {
                items.forEach(item => {
                    item.classList.remove('active');
                });
                items[currentIndex].classList.add('active');

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
                currentIndex = (currentIndex + 1) % items.length;
                updateSlides();
            }

            function prevSlide() {
                currentIndex = (currentIndex - 1 + items.length) % items.length;
                updateSlides();
            }

            // Event listeners
            prevButton.addEventListener('click', prevSlide);
            nextButton.addEventListener('click', nextSlide);

            // Auto-advance slides every 5 seconds
            setInterval(nextSlide, 5000);
        });

/**
   * Preloader
   */
  /*const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }*/



document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

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
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    
    const validateField = (field) => {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        switch(field.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isValid = emailRegex.test(value);
                errorMessage = 'Please enter a valid email address';
                break;
            default:
                isValid = value.length > 0;
                errorMessage = 'This field is required';
        }
        
        field.classList.toggle('error', !isValid);
        const errorElement = field.nextElementSibling;
        if (errorElement?.classList.contains('error-message')) {
            errorElement.textContent = isValid ? '' : errorMessage;
        }
        
        return isValid;
    };
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const fields = form.querySelectorAll('input, textarea');
        let isValid = true;
        
        fields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // Add your form submission logic here
            console.log('Form is valid, ready to submit');
        }
    });
    
    form.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('blur', () => validateField(field));
    });
});