document.addEventListener("DOMContentLoaded", function () {
  "use strict";
  // Best practices for HTML, CSS, and JavaScript  
  
  const practices = [
      { id: 'semantic', text: 'Use semantic HTML elements (e.g., <header>, <main>, <footer>)' }, // for SEO, accessibility, maintainability, better structure
      { id: 'alt-text', text: 'Add alt text to all images' },  // for accessibility, SEO fallback
      { id: 'indented', text: 'Keep HTML well-indented and readable' }, // for maintainability, readability and collaboration 
      { id: 'labels', text: 'Use <label> elements with inputs for accessibility' }, // for accessibility, better UX and usability
      { id: 'validation', text: 'Validate HTML with W3C validator' }, // for standards compliance, better performance and SEO
      { id: 'no-inline-css', text: 'Avoid inline CSS' }, // for separation of concerns, maintainability and performance
      { id: 'responsive-units', text: 'Use %/rem/em for font-size and spacing' }, //for responsive design, better accessibility and maintainability
      { id: 'media-queries', text: 'Use media queries for responsiveness' }, //for responsive design, better UX and usability
      { id: 'css-modular', text: 'Organize CSS into clear sections or modules' }, // for maintainability, readability and collaboration
      { id: 'bootstrap', text: 'Use Bootstrap grid effectively' }, // for responsive design, better UX and usability
      { id: 'no-inline-js', text: 'Avoid inline JavaScript' }, // for separation of concerns, maintainability and performance
      { id: 'defer-async', text: 'Use defer or async for script loading' }, // for performance, better UX and usability
      { id: 'strict-mode', text: 'Use strict mode in JavaScript' }, // for better error handling, performance and security
      { id: 'let-const', text: 'Use let/const instead of var' }, // for block scoping, better readability and maintainability
      { id: 'event-listeners', text: 'Use addEventListener instead of inline handlers' }, // for separation of concerns, maintainability and performance
      { id: 'no-globals', text: 'Avoid global JS variables' }, // for better performance, security and maintainability
      { id: 'localstorage', text: 'Use localStorage for saving preferences' },
      { id: 'ajax', text: 'Use AJAX to fetch external data' }
    ];
  
  const container = document.getElementById('practices');
  const summary = document.getElementById('summary');
  const animalContainer = document.getElementById('animalContainer');

  function updateSummary() {
    const total = practices.length;
    const checked = practices.filter(p => localStorage.getItem(p.id) === 'true').length; //this line counts the number of checked items by filtering the practices array and checking if the localStorage item is true
    summary.textContent = `You have fulfilled ${checked} out of ${total} best practices.`;

    if (checked >= 12) {
      if (localStorage.getItem('animalShown')) {
        showAnimal(localStorage.getItem('animalUrl'));
      } else {
        fetch('https://random.dog/woof.json')
          .then(response => response.json())
          .then(data => {
            showAnimal(data.url);
            localStorage.setItem('animalShown', 'true');
            localStorage.setItem('animalUrl', data.url);
          });
      }
    } else {
      localStorage.removeItem('animalShown');
      localStorage.removeItem('animalUrl');
      animalContainer.innerHTML = '';
    }
  }

  function showAnimal(url) {
    const img = document.createElement('img');
    img.src = url || ''; //  fallback here
    img.alt = 'A cute animal';
    img.className = 'reward-img';
    animalContainer.innerHTML = "<h3>Congrats! 🎉 Look! Someone is happy for you!:</h3>";
    animalContainer.appendChild(img);
  }

  practices.forEach(p => {
    const div = document.createElement('div');
    div.className = 'practice';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = p.id;
    checkbox.checked = localStorage.getItem(p.id) === 'true';
    checkbox.addEventListener('change', () => {
      localStorage.setItem(p.id, checkbox.checked); //this line
      updateSummary();
    });

    const label = document.createElement('label');
    label.htmlFor = p.id;
    label.textContent = ' ' + p.text;

    div.appendChild(checkbox);
    div.appendChild(label);
    container.appendChild(div);
  });

  updateSummary();
});