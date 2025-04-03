$(document).ready(function () {
  "use strict";

  const practices = [
    { id: 'semantic', text: 'Use semantic HTML elements (e.g., <header>, <main>, <footer>)' },
    { id: 'alt-text', text: 'Add alt text to all images' },
    { id: 'indented', text: 'Keep HTML well-indented and readable' },
    { id: 'labels', text: 'Use <label> elements with inputs for accessibility' },
    { id: 'validation', text: 'Validate HTML with W3C validator' },
    { id: 'no-inline-css', text: 'Avoid inline CSS' },
    { id: 'responsive-units', text: 'Use %/rem/em for font-size and spacing' },
    { id: 'media-queries', text: 'Use media queries for responsiveness' },
    { id: 'css-modular', text: 'Organize CSS into clear sections or modules' },
    { id: 'bootstrap', text: 'Use Bootstrap grid effectively' },
    { id: 'no-inline-js', text: 'Avoid inline JavaScript' },
    { id: 'defer-async', text: 'Use defer or async for script loading' },
    { id: 'strict-mode', text: 'Use strict mode in JavaScript' },
    { id: 'let-const', text: 'Use let/const instead of var' },
    { id: 'event-listeners', text: 'Use addEventListener instead of inline handlers' },
    { id: 'no-globals', text: 'Avoid global JS variables' },
    { id: 'localstorage', text: 'Use localStorage for saving preferences' },
    { id: 'ajax', text: 'Use AJAX to fetch external data' }
  ];

  const $checklistContainer = $('#practices');
  const $summary = $('#summary');
  const $loader = $('#loader');
  const $animalContainer = $('#animalContainer');
  const $progressBar = $('#practiceProgressBar');

  function updateSummary() {
    const total = practices.length;
    const checked = practices.filter(p => localStorage.getItem(p.id) === 'true').length;
    $summary.html(`You have fulfilled <span id="checkedCount">${checked}</span> out of ${total} best practices.`);

    const $checkedCount = $('#checkedCount');
    $checkedCount.css('color', checked < 12 ? 'red' : 'green');

    const percentage = (checked / total) * 100;
    $progressBar.css('width', `${percentage}%`).attr('aria-valuenow', checked);

    if (checked >= 12) {
      $loader.removeClass('hidden');
      $progressBar.removeClass('bg-danger').addClass('bg-success');
      if (localStorage.getItem('animalShown')) {
        showAnimal(localStorage.getItem('animalUrl'));
      } else {
        fetchAnimalImage();
      }
    } else {
      localStorage.removeItem('animalShown');
      localStorage.removeItem('animalUrl');
      $progressBar.removeClass('bg-success').addClass('bg-danger');
      $animalContainer.empty();
      $loader.addClass('hidden');
    }
  }

  async function fetchAnimalImage() {
    try {
      const response = await fetch('https://random.dog/woof.json');
      const data = await response.json();
      showAnimal(data.url);
      localStorage.setItem('animalShown', 'true');
      localStorage.setItem('animalUrl', data.url);
    } catch (error) {
      $animalContainer.html("<p>🐶 Failed to load image. Try again!</p>");
    }
  }

  function showAnimal(url) {
    $animalContainer.empty();
    const img = $('<img>', {
      src: url || '',
      alt: 'A cute animal',
      class: 'reward-img'
    });
    $animalContainer.append("<h3>Congrats! 🎉 You've made this guy happy!</h3>");
    $animalContainer.append(img);
    $loader.addClass('hidden');
  }

  practices.forEach(p => {
    const $div = $('<div>', { class: 'practice' });
    const $checkbox = $('<input>', {
      type: 'checkbox',
      id: p.id,
      checked: localStorage.getItem(p.id) === 'true'
    });

    $checkbox.on('change', function () {
      localStorage.setItem(p.id, this.checked);
      updateSummary();
    });

    const $label = $('<label>', {
      for: p.id,
      text: ' ' + p.text
    });

    $div.append($checkbox, $label);
    $checklistContainer.append($div);
  });

  updateSummary();
});

