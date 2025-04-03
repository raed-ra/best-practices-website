document.addEventListener('DOMContentLoaded', function () {
    "use strict";
  
    const searchForms = document.querySelectorAll('form');
  
    searchForms.forEach(form => {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
  
        const queryInput = this.querySelector('input[type="search"]');
        if (!queryInput) return;
  
        const val = queryInput.value.trim().toLowerCase();
  
        if (val.includes('cv') || val.includes('about')) {
          window.location.href = 'AboutMe.html';
        } else if (val.includes('practice') || val.includes('checklist')) {
          window.location.href = 'index.html';
        } else if (val.includes('portfolio')) {
          window.location.href = 'RIportfolio.html';
        } else {
          alert("Sorry, I couldn't find that page.");
        }
      });
    });
  });