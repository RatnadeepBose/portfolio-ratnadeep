// Container Scroll Animations
document.addEventListener('DOMContentLoaded', () => {
  // Initialize scroll animations
  initScrollAnimations();
  
  function initScrollAnimations() {
    // Add animation classes to sections
    addAnimationClasses();
    
    // Setup intersection observer for animations
    setupScrollObserver();
    
    // Add parallax effect to certain elements
    setupParallaxEffect();
  }
  
  function addAnimationClasses() {
    // Add animation classes to main sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
      // Skip sections that already have animation classes
      if (section.classList.contains('fade-in')) return;
      
      // Add different animation classes based on index
      if (index % 3 === 0) {
        section.classList.add('scroll-fade-in');
      } else if (index % 3 === 1) {
        section.classList.add('scroll-slide-up');
      } else {
        section.classList.add('scroll-slide-in');
      }
    });
    
    // Add animation classes to cards and containers
    const cards = document.querySelectorAll('.card, .project-card, .skill-card, .timeline-content');
    cards.forEach((card, index) => {
      // Skip cards that already have animation classes
      if (card.classList.contains('fade-in')) return;
      
      card.classList.add('scroll-scale-in');
      // Add staggered delay based on index
      card.style.transitionDelay = `${(index % 5) * 0.1}s`;
    });
    
    // Add animation to images (except in projects section)
    const images = document.querySelectorAll('img:not([class*="icon"]):not(#projects img)');
    images.forEach(img => {
      // Skip rotation for project images
      if (!img.closest('.project-card') && !img.closest('#projects')) {
        img.classList.add('scroll-rotate-in');
      }
    });
  }
  
  function setupScrollObserver() {
    const options = {
      root: null, // Use viewport as root
      rootMargin: '0px',
      threshold: 0.1 // Trigger when 10% of element is visible
    };
    
    const animatedElements = document.querySelectorAll(
      '.scroll-fade-in, .scroll-slide-up, .scroll-slide-in, .scroll-scale-in, .scroll-rotate-in'
    );
    
    // Track scroll direction
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let scrollDirection = 'down';
    
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
      lastScrollTop = scrollTop;
    });
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add direction class based on current scroll direction
          entry.target.classList.add('animate');
          entry.target.setAttribute('data-scroll-direction', scrollDirection);
          
          // Don't unobserve to allow re-animation when scrolling in opposite direction
          // Instead, we'll handle the animation state in the scroll event
        } else {
          // Remove animation class when element is not in viewport
          entry.target.classList.remove('animate');
        }
      });
    }, options);
    
    animatedElements.forEach(element => {
      observer.observe(element);
    });
    
    // Re-enable animations when scrolling in opposite direction
    let previousScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > previousScrollY ? 'down' : 'up';
      previousScrollY = currentScrollY;
      
      // Update direction attribute on all animated elements
      document.querySelectorAll('.animate').forEach(element => {
        element.setAttribute('data-scroll-direction', direction);
      });
    });
  }
  
  function setupParallaxEffect() {
    // Add parallax effect to hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
      window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        const parallaxElements = heroSection.querySelectorAll('.floating-icon');
        
        parallaxElements.forEach((element, index) => {
          const speed = 0.05 + (index % 3) * 0.02;
          const yPos = scrollPosition * speed;
          element.style.transform = `translateY(${-yPos}px) rotate(${scrollPosition * 0.02}deg)`;
        });
      });
    }
    
    // Add subtle parallax to section backgrounds
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
      const scrollPosition = window.pageYOffset;
      
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const speed = 0.05;
          const yPos = (rect.top - window.innerHeight) * speed;
          section.style.backgroundPosition = `center ${yPos}px`;
        }
      });
    });
  }
});