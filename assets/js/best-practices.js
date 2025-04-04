console.log("✅ JS file is definitely being loaded");

$(document).ready(async function () {
  console.log("✅ jQuery document.ready is running");
  "use strict";

  const $checklistContainer = $('#practices'); // Container for the checklist items
  const $summary = $('#summary'); // Summary of checked items shows the number of checked items
  const $loader = $('#loader'); // Loader for the animal image while fetching
  const $animalContainer = $('#animalContainer'); // Container for the animal image
  const $progressBar = $('#practiceProgressBar'); // Progress bar for the checklist it goes green when 12 or more items are checked
  const $infoBox = $('#infoBox'); // Info box for the selected practice it contains both infoText and codeExample
  const $infoText = $('#infoText'); //this is for the info box text that shows the description of the selected practice
  const $codeExample = $('#codeExample'); //this is for the info box code example that shows the code example of the selected practice

  let selectedPractice = null; // Variable to store the selected and checked practice

  const practices = [
    {
      "id": "semantic",
      "text": "Use semantic HTML elements (e.g., <header>, <main>, <footer>)",
      "info": "Semantic HTML improves structure, SEO, accessibility, readability, and helps tools understand content.",
      "example": "<main>\n  <section>\n    <h1>About Us</h1>\n  </section>\n</main>"
    },
    {
      "id": "alt-text",
      "text": "Add alt text to all images",
      "info": "Alt text improves accessibility, SEO, page fallback, assistive tech compatibility, and enhances user understanding.",
      "example": "<img src='cat.jpg' alt='A cute cat sleeping on the sofa' />"
    },
    {
      "id": "indented",
      "text": "Keep HTML well-indented and readable",
      "info": "Well-indented code improves readability, maintainability, team collaboration, debugging ease, and professionalism.",
      "example": "<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</ul>"
    },
    {
      "id": "labels",
      "text": "Use <label> elements with inputs for accessibility",
      "info": "Labels improve accessibility, usability, focus handling, screen reader compatibility, and overall UX.",
      "example": "<label for='email'>Email:</label>\n<input type='email' id='email' />"
    },
    {
      "id": "validation",
      "text": "Validate HTML with W3C validator",
      "info": "Validation ensures standards compliance, fewer bugs, better rendering, improved SEO, and error catching.",
      "example": "Use https://validator.w3.org to check your HTML."
    },
    {
      "id": "no-inline-css",
      "text": "Avoid inline CSS",
      "info": "Avoiding inline CSS promotes separation of concerns, maintainability, reusability, cleaner HTML, and faster styling changes.",
      "example": "<div class='highlight'></div>\n/* CSS */\n.highlight { background-color: yellow; }"
    },
    {
      "id": "responsive-units",
      "text": "Use %/rem/em for font-size and spacing",
      "info": "Responsive units enhance accessibility, scaling, device adaptability, user preference support, and flexible layout.",
      "example": "body { font-size: 1rem; margin: 2em; }"
    },
    {
      "id": "media-queries",
      "text": "Use media queries for responsiveness",
      "info": "Media queries support responsive design, device optimization, better UX, accessibility, and adaptive layout.",
      "example": "@media (max-width: 768px) {\n  .container { flex-direction: column; }\n}"
    },
    {
      "id": "css-modular",
      "text": "Organize CSS into clear sections or modules",
      "info": "Modular CSS improves maintainability, readability, reuse, debugging, and team efficiency.",
      "example": "/* Buttons */\n.btn-primary { background: blue; color: white; }"
    },
    {
      "id": "bootstrap and FlexBox Grid System",
      "text": "Use Bootstrap grid effectively - Used in header and footer and FlexBox in the main",
      "info": "Bootstrap grid speeds up development, ensures consistency, handles responsiveness, supports design patterns, and simplifies layout.",
      "example": "<div class='row'>\n  <div class='col-md-6'>Left</div>\n  <div class='col-md-6'>Right</div>\n</div>"
    },
    {
      "id": "no-inline-js",
      "text": "Avoid inline JavaScript",
      "info": "Avoiding inline JS improves separation of concerns, maintainability, security, readability, and performance.",
      "example": "// Instead of: <button onclick='alert()'>\n// Use:\n<button id='btn'>Click</button>\n\n$('#btn').on('click', () => alert());"
    },
    {
      "id": "defer-async",
      "text": "Use defer or async for script loading",
      "info": "Using defer/async speeds up loading, prevents render blocking, improves performance, enhances UX, and avoids race conditions.",
      "example": "<script src='main.js' defer></script>"
    },
    {
      "id": "strict-mode",
      "text": "Use strict mode in JavaScript",
      "info": "Strict mode catches errors, improves debugging, prevents unsafe actions, enforces cleaner code, and boosts performance.",
      "example": "'use strict';\nlet x = 5;"
    },
    {
      "id": "let-const",
      "text": "Use let/const instead of var",
      "info": "let/const offer block scoping, prevent redeclaration, reduce bugs, improve clarity, and reflect modern standards.",
      "example": "const name = 'Raed';\nlet count = 3;"
    },
    {
      "id": "event-listeners",
      "text": "Use addEventListener instead of inline handlers",
      "info": "addEventListener improves structure, separation of concerns, code reusability, event control, and scalability.",
      "example": "element.addEventListener('click', function () { alert('Clicked'); });"
    },
    {
      "id": "no-globals",
      "text": "Avoid global JS variables",
      "info": "Avoiding globals prevents conflicts, enhances modularity, reduces bugs, improves encapsulation, and boosts reusability.",
      "example": "// Avoid\nwindow.myAppData = {}\n\n// Prefer\nconst appData = {};"
    },
    {
      "id": "localstorage",
      "text": "Use localStorage for saving preferences",
      "info": "localStorage keeps settings persistent, improves UX, allows offline access, speeds loading, and reduces server load.",
      "example": "localStorage.setItem('theme', 'dark');"
    },
    {
      "id": "ajax",
      "text": "Use AJAX to fetch external data",
      "info": "AJAX improves UX with dynamic updates, reduces page reloads, saves bandwidth, enables async operations, and allows modular interaction.",
      "example": "fetch('data.json').then(res => res.json()).then(data => console.log(data));"
    }
  ];
  
  function renderPractices() {
    practices.forEach(p => {

      //create wrapper for the practice
      const $wrapper = $('<div>', { class: 'practice-wrapper-item' }); 

      //create div for the practice
      const $div = $('<div>', { class: 'practice' }); 
      
      //create checkbox for the practice
      const $checkbox = $('<input>', { 
        type: 'checkbox',
        id: p.id,
        checked: localStorage.getItem(p.id) === 'true'
      });

      const $label = $('<label>', { //create label for the checkbox
        for: p.id,
        text: ' ' + p.text
      });

      //create event listener ->checkbox<- for the checkbox to click
      $checkbox.on('change', function () { 
        localStorage.setItem(p.id, this.checked); // Store the checkbox state in localStorage
        updateSummary(); //update counter
        if (this.checked) {
          selectedPractice = p; // Store the selected practice
          showInfoBox(p, $wrapper); // If checked-Show the info box by injecting to wrapper
        } else {
          selectedPractice = null;
          resetInfoBox($wrapper); // If not- Reset the info box
        }
      });  //end of event listener - checkbox click

      //creating event listener on ->div<- for mouse enter/hover/leave
      $div.on('mouseenter', function () { 
        if (window.innerWidth > 768) {  // When not in mobile - Show info box on mouse enter
          //showInfoBox(p, $wrapper); 
        }
      }).on('mouseleave', function () { // Hide info box on mouse leave unless checked
        if (window.innerWidth > 768) {
          if (selectedPractice) { // working on the checked item
            showInfoBox(selectedPractice, $wrapper); 
          } else {
            resetInfoBox($wrapper);
          }
        }
      }); //end of event listener - div mouse enter

      //Creating checklist elements by bringing all together by appending, wrapper, div, checkbox and label with TWO event listeners - one only for big screens
      $div.append($checkbox, $label);
      $wrapper.append($div);

      // Responsive info box per item (only visible on small screens - MOBILE) unlike the bg page one this is created dynamically below each checklist item
      const $infoClone = $infoBox.clone().removeAttr('id').addClass('mobile-info-box hidden');
      const $textClone = $('<p>', { class: 'info-text' });
      const $codeClone = $('<pre>', { class: 'code-sample hidden' });
      $infoClone.append($textClone, $codeClone);
      $wrapper.append($infoClone);

      // Store the info box, text, and code example in the wrapper for later use - I can't use classes with jQuery because of the clone as we have multiple clones
      $wrapper.data('infoBox', $infoClone);
      $wrapper.data('infoText', $textClone);
      $wrapper.data('codeExample', $codeClone);

      $checklistContainer.append($wrapper); // Append the wrapper to the checklist container
    });
  } //end of renderPractices function - created all the checklist items with wrappers, divs, checkboxes and labels and event listeners 


  // Function to show the info box with the practice information
  function showInfoBox(practice, $wrapper) {
    //for small screens - mobile
    const $info = $wrapper.data('infoBox'); //item 1
    const $text = $wrapper.data('infoText'); //item 2
    const $code = $wrapper.data('codeExample'); //item 3

    $info.removeClass('hidden');//item 1
    $text.text(practice.info || 'No description provided.');//item 2
    if (practice.example) { //item 3
      $code.removeClass('hidden').text(practice.example);
    } else {
      $code.addClass('hidden').text('');
    }

    if (window.innerWidth > 768) { // For larger screens - desktop
      $infoBox.removeClass('hidden'); //item 1
      $infoText.text(practice.info || 'No description provided.'); //item 2
      if (practice.example) { //item 3
        $codeExample.removeClass('hidden').text(practice.example);
      } else {
        $codeExample.addClass('hidden').text('');
      }
    } else {
      $infoBox.infoClass('hidden'); // Hide the desktop info box on mobile
    }
  }

  function resetInfoBox($wrapper) {
    //reset the box for mobile
    const $info = $wrapper.data('infoBox');
    const $text = $wrapper.data('infoText');
    const $code = $wrapper.data('codeExample');

    $info.addClass('hidden');
    $text.text('');
    $code.addClass('hidden').text('');

    //reset the box for desktop
    $infoBox.addClass('hidden');
    $infoText.text('');
    $codeExample.addClass('hidden').text('');
  }

  // Function to update the summary percentage and progress bar
  function updateSummary() {
    const total = practices.length;
    const checked = practices.filter(p => localStorage.getItem(p.id) === 'true').length; // Count checked items
    $summary.html(`You have fulfilled <span id="checkedCount">${checked}</span> out of ${total} best practices.`); 

    // Update the color of the checked items to red or green
    const $checkedCount = $('#checkedCount');
    $checkedCount.css('color', checked < 12 ? 'red' : 'green');

    // Calculate the percentage and update the progress bar
    const percentage = (checked / total) * 100;
    $progressBar.css('width', `${percentage}%`).attr('aria-valuenow', checked); //accessibility

    // loader comes up, progress bar goes green if 12 or more items are checked and animal image is fetched either from local storage or from the API
    if (checked >= 12) {
      $loader.removeClass('hidden');
      $progressBar.removeClass('bg-danger').addClass('bg-success');
      if (localStorage.getItem('animalShown')) {
        showAnimal(localStorage.getItem('animalUrl'));
      } else {
        fetchAnimalImage();
      }
    } else {
      // If less than 12 items are checked, reset the progress bar and hide the loader
      localStorage.removeItem('animalShown');
      localStorage.removeItem('animalUrl');
      $progressBar.removeClass('bg-success').addClass('bg-danger');
      $animalContainer.empty();
      $loader.addClass('hidden');
    }
  }
  // Function to fetch a random animal image from the API
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
  // Function to show the animal image in the container and hide the loader
  function showAnimal(url) {
    $animalContainer.empty();
    const img = $('<img>', {
      src: url || '',
      alt: 'A cute animal',
      class: 'reward-img'
    });
    $loader.addClass('hidden');
    $animalContainer.append("<h3>Congrats! 🎉 You've made this guy happy!</h3>");
    $animalContainer.append(img);
  }

  renderPractices();
  updateSummary();
});
