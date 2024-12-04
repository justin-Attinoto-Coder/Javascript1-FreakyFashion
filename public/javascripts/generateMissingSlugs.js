const Database = require('better-sqlite3');
const slugify = require('slugify');
const db = new Database('./db/product-manager.db', { verbose: console.log });

// Function to generate a URL slug from a string using slugify
function generateSlug(name) {
  return slugify(name, {
    lower: true, // Convert to lowercase
    strict: true // Remove special characters
  });
}

// Fetch all products without a urlSlug
const rows = db.prepare("SELECT id, name FROM products WHERE urlSlug IS NULL OR urlSlug = ''").all();

// Update each product with a generated slug
const updateStmt = db.prepare('UPDATE products SET urlSlug = ? WHERE id = ?');
rows.forEach((row) => {
  const slug = generateSlug(row.name);
  updateStmt.run(slug, row.id);
});

console.log('Missing URL slugs generated and updated successfully.');