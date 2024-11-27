const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Define the path to the database file
const dbPath = path.join(__dirname, 'db', 'products.db');

// Create a new database instance
const db = new sqlite3.Database(dbPath);

// Create the products table
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sku TEXT NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        brand TEXT NOT NULL,
        description TEXT NOT NULL,
        image TEXT NOT NULL,
        slug TEXT NOT NULL,
        registration_date TEXT NOT NULL,
        is_new INTEGER NOT NULL,
        is_favorite INTEGER NOT NULL
    )`);
});

// Close the database connection
db.close();