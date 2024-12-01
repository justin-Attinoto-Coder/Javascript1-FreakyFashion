/* const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to the database
const dbPath = path.resolve(__dirname, 'db', 'products.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the products database.');
    }
});

// Create the products table if it doesn't exist
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        image TEXT NOT NULL,
        sku TEXT NOT NULL,
        price REAL NOT NULL,
        slug TEXT NOT NULL,
        publishing_date TEXT NOT NULL
    )`);
});

module.exports = db; */