var express = require('express');
var router = express.Router();
const Database = require('better-sqlite3');
const db = new Database('./db/product-manager.db', { verbose: console.log });

// Middleware to parse JSON bodies
router.use(express.json());

// Middleware to serve static files
router.use(express.static('public'));

// GET /admin/products - Admin products page (initially empty)
router.get('/admin/products', function (req, res, next) {
  res.render('admin/products/index', {
    title: 'Admin Products',
    products: []
  });
});

// GET /admin/products/load - API endpoint to load all products
router.get('/admin/products/load', function (req, res, next) {
  const rows = db.prepare(`
    SELECT id,
          name,
          description,
          image,
          brand,
          SKU,
          price,
          publishingDate
    FROM products
  `).all();

  res.json(rows);
});

// POST /admin/products - API endpoint to add a new product
router.post('/admin/products', function (req, res, next) {
  const { name, description, image, brand, sku, price, publishingDate} = req.body;

  const stmt = db.prepare(`
    INSERT INTO products (name, description, image, brand, sku, price, publishingDate)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const info = stmt.run(name, description, image, brand, sku, price, publishingDate);

  res.json({ id: info.lastInsertRowid });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('freaky-fashion', { title: 'Freaky Fashion' });
});

/* GET checkout page. */
router.get('/checkout', function(req, res, next) {
  res.render('checkout', { title: 'Checkout' });
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About Us' });
});

/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact Us' });
});

module.exports = router;
