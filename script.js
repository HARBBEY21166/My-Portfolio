document.addEventListener("DOMContentLoaded", () => {
  // Preloader
  const preloader = document.querySelector('.preloader');
  
  // Hide preloader after page loads
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('fade-out');
      document.body.style.overflow = 'auto'; // Enable scrolling
    }, 5000);
  });

  // Set current year in footer
  document.getElementById("currentYear").textContent = new Date().getFullYear();

  // Dark mode toggle
  const themeToggle = document.getElementById("theme-toggle");
  const htmlElement = document.documentElement;
  
  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    htmlElement.classList.add("dark-mode");
    htmlElement.classList.remove("light-mode");
  } else {
    htmlElement.classList.add("light-mode");
    htmlElement.classList.remove("dark-mode");
  }
  
  // Toggle theme when button is clicked
  themeToggle.addEventListener("click", () => {
    htmlElement.classList.toggle("dark-mode");
    htmlElement.classList.toggle("light-mode");
    
    // Save preference to localStorage
    const currentTheme = htmlElement.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem("theme", currentTheme);
  });

  // Typing animation for hero section
  const typingText = document.getElementById("typing-text");
  const phrases = ["I'm a Front-end developer", "I'm a UI/UX designer", "I'm a Web Designer", "I'm a WordPress Developer"];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      // Deleting text
      typingText.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      // Typing text
      typingText.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }
    
    // If finished typing the phrase
    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at the end of typing
      isDeleting = true;
      typingSpeed = 1500;
    } 
    // If finished deleting the phrase
    else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500;
    }
    
    setTimeout(typeEffect, typingSpeed);
  }
  
  // Start the typing animation
  setTimeout(typeEffect, 1000);

  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");

  if (mobileMenuBtn) {
    // Create mobile nav if it doesn't exist
    if (!document.querySelector(".mobile-nav")) {
      const mobileNav = document.createElement("div");
      mobileNav.className = "mobile-nav";

      const navList = document.querySelector(".nav-list");
      if (navList) {
        const mobileNavList = document.createElement("ul");
        mobileNavList.className = "mobile-nav-list";

        // Clone nav items for mobile menu
        Array.from(navList.children).forEach((item) => {
          const li = document.createElement("li");
          const link = item.querySelector("a").cloneNode(true);
          link.className = "mobile-nav-link";
          li.appendChild(link);
          mobileNavList.appendChild(li);
        });

        mobileNav.appendChild(mobileNavList);
        document.body.appendChild(mobileNav);
      }
    }

    const mobileNav = document.querySelector(".mobile-nav");

    mobileMenuBtn.addEventListener("click", function () {
      mobileNav.classList.toggle("active");
      document.body.classList.toggle("menu-open");

      // Toggle menu button appearance
      const spans = this.querySelectorAll("span");
      if (mobileNav.classList.contains("active")) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
      } else {
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      }
    });

    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("active");
        document.body.classList.remove("menu-open");

        // Reset menu button
        const spans = mobileMenuBtn.querySelectorAll("span");
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      });
    });
  }

  // Project card hover effects
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    const img = card.querySelector("img");

    card.addEventListener("mouseenter", () => {
      if (img) {
        img.style.transform = "scale(1.1)";
      }
    });

    card.addEventListener("mouseleave", () => {
      if (img) {
        img.style.transform = "scale(1)";
      }
    });
  });

  // Project category filtering
  const categoryButtons = document.querySelectorAll(".category-btn");
  const projects = document.querySelectorAll(".project-card");

  categoryButtons.forEach(button => {
    button.addEventListener("click", function() {
      // Remove active class from all buttons
      categoryButtons.forEach(btn => btn.classList.remove("active"));
      
      // Add active class to clicked button
      this.classList.add("active");
      
      const category = this.getAttribute("data-category");
      
      // Filter projects
      projects.forEach(project => {
        const projectCategory = project.getAttribute("data-category");
        
        if (category === "all" || category === projectCategory) {
          project.style.display = "block";
          setTimeout(() => {
            project.style.opacity = "1";
            project.style.transform = "translateY(0)";
          }, 100);
        } else {
          project.style.opacity = "0";
          project.style.transform = "translateY(20px)";
          setTimeout(() => {
            project.style.display = "none";
          }, 300);
        }
      });
    });
  });

  // Remove the existing fade-in animations for sections as they will conflict with ScrollReveal.
  // The fade-in and delay classes should also be removed from the CSS if they are only used for this purpose.

  // Initialize ScrollReveal
  ScrollReveal({
    distance: '50px',
    duration: 3000,
    reset: true // Optional: set to false if you only want the animation to play once
  });

  // Apply ScrollReveal to sections
  ScrollReveal().reveal('#about');
  ScrollReveal().reveal('#skills');
  ScrollReveal().reveal('#services');
  ScrollReveal().reveal('#projects');
  ScrollReveal().reveal('#testimonials');
  ScrollReveal().reveal('#resume');
  ScrollReveal().reveal('#contact');

  // Testimonial slider (keep existing code for slider functionality)
  const testimonialTrack = document.querySelector(".testimonial-track");
  const testimonialCards = document.querySelectorAll(".testimonial-card");
  const dotsContainer = document.querySelector(".testimonial-dots");
  const prevBtn = document.querySelector(".testimonial-btn.prev");
  const nextBtn = document.querySelector(".testimonial-btn.next");
  
  let currentIndex = 0;
  
  // Create dots
  testimonialCards.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
  
  const dots = document.querySelectorAll(".dot");
  
  // Go to specific slide
  function goToSlide(index) {
    testimonialTrack.style.transform = `translateX(-${index * 100}%)`;
    currentIndex = index;
    updateDots();
  }
  
  // Update dots
  function updateDots() {
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }
  
  // Next slide
  function nextSlide() {
    currentIndex = (currentIndex + 1) % testimonialCards.length;
    goToSlide(currentIndex);
  }
  
  // Previous slide
  function prevSlide() {
    currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
    goToSlide(currentIndex);
  }
  
  // Add event listeners
  if (prevBtn) prevBtn.addEventListener("click", prevSlide);
  if (nextBtn) nextBtn.addEventListener("click", nextSlide);
  
  // Auto slide every 5 seconds
  setInterval(nextSlide, 5000);

  // Contact form submission

  // Toast notification function
  function showToast(title, message, type = "success") {
    const toast = document.getElementById("toast");
    const toastTitle = toast.querySelector(".toast-title");
    const toastMessage = toast.querySelector(".toast-message");

    // Set content
    toastTitle.textContent = title;
    toastMessage.textContent = message;

    // Set type
    toast.className = "toast";
    toast.classList.add(type);
    toast.classList.add("show");

    // Auto hide after 5 seconds
    setTimeout(() => {
      toast.classList.remove("show");
    }, 5000);
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Service icon animations
  const serviceIcons = document.querySelectorAll('.service-icon');
  
  serviceIcons.forEach(icon => {
    // Add random float animation duration between 3-5s for variety
    const animationDuration = 3 + Math.random() * 2;
    icon.querySelector('i').style.animationDuration = `${animationDuration}s`;
  });

  // Skill icon animations
  const skillIcons = document.querySelectorAll('.skill-icon');

  skillIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
      const iconElement = this.querySelector('i');
      iconElement.style.animation = 'pulse 1s infinite';
    });
    
    icon.addEventListener('mouseleave', function() {
      const iconElement = this.querySelector('i');
      iconElement.style.animation = '';
    });
  });
});

// Add this to your existing script.js file

// Resume tab functionality
document.addEventListener("DOMContentLoaded", () => {
  const resumeTabs = document.querySelectorAll(".resume-tab");
  const resumeContents = document.querySelectorAll(".resume-tab-content");
  
  if (resumeTabs.length > 0) {
    resumeTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        // Remove active class from all tabs
        resumeTabs.forEach(t => t.classList.remove("active"));
        
        // Add active class to clicked tab
        tab.classList.add("active");
        
        // Hide all tab contents
        resumeContents.forEach(content => {
          content.classList.remove("active");
        });
        
        // Show selected tab content
        const tabId = tab.getAttribute("data-tab");
        document.getElementById(tabId).classList.add("active");
      });
    });
  }
});

// Add this to your existing script.js file
// Scroll to top button functionality
//
const backToTopButton = document.getElementById('back-to-top');

// Show button when user scrolls down 200px
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 200) {
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
});

// Scroll to top when clicked
backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
