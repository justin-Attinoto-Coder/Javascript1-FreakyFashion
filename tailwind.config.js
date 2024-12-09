/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.ejs', // Include all EJS files in the views directory
    './public/**/*.js', // Include all JavaScript files in the public directory
    './public/**/*.html' // Include all HTML files in the public directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

