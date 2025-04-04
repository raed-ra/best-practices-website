$(document).ready(function () {
  "use strict";

  $('form').on('submit', function (e) {
    e.preventDefault();

    const queryInput = $(this).find('input[type="search"]');
    if (!queryInput.length) return;

    const val = queryInput.val().trim().toLowerCase();

    if (val.includes('cv') || val.includes('about')) {
      window.location.href = 'AboutMe.html';
    } else if (val.includes('practice') || val.includes('checklist')) {
      window.location.href = 'index.html';
    } else if (val.includes('portfolio')) {
      window.location.href = 'https://raed-ra.github.io/best-practices-website/RIportfolio.html';
    } else {
      alert("Sorry, I couldn't find that page.");
    }
  });
});
