const Database = require('better-sqlite3');
const slugify = require('slugify');
const db = new Database('./db/product-manager.db');

// Function to generate a URL slug from a string using slugify
function generateSlug(name) {
  return slugify(name, {
    lower: true, // Convert to lowercase
    strict: true // Remove special characters
  });
}

// Add the urlslug column if it doesn't exist
try {
  db.exec('ALTER TABLE products ADD COLUMN urlSlug TEXT');
} catch (err) {
  if (!err.message.includes('duplicate column name')) {
    console.error(err.message);
    process.exit(1);
  }
}

// Fetch all products
const rows = db.prepare('SELECT id, name FROM products').all();

// Update each product with a generated slug
const updateStmt = db.prepare('UPDATE products SET urlSlug = ? WHERE id = ?');
rows.forEach((row) => {
  const slug = generateSlug(row.name);
  updateStmt.run(slug, row.id);
});

console.log('URL slugs generated and updated successfully.');