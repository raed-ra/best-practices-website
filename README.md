# Best Practices Website — CITS5505 Individual Project

This project is part of the CITS5505 Web and Internet Technologies unit at the University of Western Australia (2025).

## 📌 Project Overview

The website demonstrates research into HTML, CSS, and JavaScript best practices. It contains:

- ✅ A **Best Practices** checklist with dynamic stats and AJAX reward
- ✅ A **CV page** showcasing the author's background and skills
- ✅ Responsive design using Bootstrap and custom CSS

## 🧱 Pages Included

### 🔍 best-practices.html
- Interactive checklist of 15 web dev best practices
- Uses `localStorage` to remember user selections
- If the user selects ≥12 practices, a random animal image is fetched using AJAX

### 👤 cv.html
- Professional biography of Raed Rahmanseresht
- Highlights skills, experience, education
- Clearly marked references and AI usage section

## 🛠️ Technologies Used
- HTML5
- CSS3 (custom and Bootstrap 4)
- JavaScript (ES6+)
- AJAX (public API from [random.dog](https://random.dog/woof.json))
- No frameworks like React or Node.js were used, as per assignment rules

## 📁 How to Run Locally

You can open the `.html` files directly in a browser, or serve them via a local server for full functionality:

```bash
python3 -m http.server
# then open http://localhost:8000

