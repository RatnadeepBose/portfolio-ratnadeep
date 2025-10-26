// Utilities for Projects section: sanitize titles and ensure numbering is clean
(function(){
  document.addEventListener('DOMContentLoaded', function(){
    const titleEls = document.querySelectorAll('#projects .project-card .project-info h3');
    titleEls.forEach((el) => {
      const original = el.textContent || '';
      // Remove leading numbering like "8. ", "09.", etc.
      const cleaned = original.replace(/^\s*\d+\.?\s+/, '');
      el.textContent = cleaned;
    });
  });
})();