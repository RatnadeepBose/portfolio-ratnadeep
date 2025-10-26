// Modern animated timeline with scroll progress indicator
document.addEventListener('DOMContentLoaded', () => {
  // Timeline data - will be populated from existing timeline items
  const timelineData = [];
  
  // Initialize the timeline component
  initAnimatedTimeline();
  
  function initAnimatedTimeline() {
    const timelineSection = document.querySelector('.experience-section');
    if (!timelineSection) return;
    
    // Add the timeline header
    const timelineHeader = document.createElement('div');
    timelineHeader.className = 'timeline-header';
    timelineHeader.innerHTML = `
      <h2 class="section-title">Changelog from my journey</h2>
      <p class="section-subtitle">A timeline of my professional journey and key milestones.</p>
    `;
    
    // Insert the header before the existing timeline
    const existingTimeline = timelineSection.querySelector('.timeline');
    timelineSection.insertBefore(timelineHeader, existingTimeline);
    
    // Add the progress line container
    const progressLineContainer = document.createElement('div');
    progressLineContainer.className = 'timeline-progress-container';
    progressLineContainer.innerHTML = '<div class="timeline-progress-line"></div>';
    existingTimeline.parentNode.insertBefore(progressLineContainer, existingTimeline);
    
    // Position the progress line relative to the timeline
    positionProgressLine();
    
    // Setup the scroll animation for the progress line
    setupScrollProgress();
    
    // Add animation classes to timeline items
    enhanceTimelineItems();
  }
  
  function positionProgressLine() {
    const progressContainer = document.querySelector('.timeline-progress-container');
    const timeline = document.querySelector('.timeline');
    if (!progressContainer || !timeline) return;
    
    // Position the progress line container
    progressContainer.style.position = 'absolute';
    progressContainer.style.left = '0';
    progressContainer.style.top = '0';
    progressContainer.style.height = '100%';
    progressContainer.style.width = '2px';
    
    // Style the progress line
    const progressLine = progressContainer.querySelector('.timeline-progress-line');
    progressLine.style.position = 'absolute';
    progressLine.style.width = '100%';
    progressLine.style.background = 'linear-gradient(to bottom, var(--accent) 0%, var(--accent-light) 50%, transparent 100%)';
    progressLine.style.height = '0';
    progressLine.style.transition = 'height 0.3s ease';
    progressLine.style.boxShadow = '0 0 8px var(--accent-glow)';
  }
  
  function setupScrollProgress() {
    const timelineSection = document.querySelector('.experience-section');
    const progressLine = document.querySelector('.timeline-progress-line');
    if (!timelineSection || !progressLine) return;
    
    window.addEventListener('scroll', () => {
      const rect = timelineSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far we've scrolled within the section
      let scrollPercentage = 0;
      
      if (rect.top <= 0) {
        // We've scrolled past the top of the section
        if (rect.bottom <= windowHeight) {
          // We've scrolled past the bottom of the section
          scrollPercentage = 1;
        } else {
          // We're somewhere in the middle of the section
          scrollPercentage = Math.abs(rect.top) / (rect.height - windowHeight);
        }
      }
      
      // Update progress line height
      progressLine.style.height = `${scrollPercentage * 100}%`;
    });
  }
  
  function enhanceTimelineItems() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
      // Add staggered animation delay
      item.style.transitionDelay = `${index * 0.1}s`;
      
      // Add hover effect for timeline markers
      const marker = item.querySelector('.timeline-marker');
      if (marker) {
        marker.addEventListener('mouseenter', () => {
          marker.style.transform = 'scale(1.5)';
          marker.style.boxShadow = '0 0 15px var(--accent-glow)';
        });
        
        marker.addEventListener('mouseleave', () => {
          marker.style.transform = 'scale(1)';
          marker.style.boxShadow = '0 0 10px var(--accent-glow)';
        });
      }
    });
    
    // Setup intersection observer for animations
    setupObserver(timelineItems);
  }
  
  function setupObserver(items) {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, options);

    items.forEach(item => {
      observer.observe(item);
    });
  }
});