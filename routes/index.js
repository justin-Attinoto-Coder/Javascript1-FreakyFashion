var express = require('express');
var router = express.Router();
const Database = require('better-sqlite3');
const slugify = require('slugify');
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

// GET /admin/products/new - Render the form for adding a new product
router.get('/admin/products/new', function (req, res, next) {
  res.render('admin/products/new', {
    title: 'Add New Product'
  });
});

// POST /admin/products - API endpoint to add a new product
router.post('/admin/products', function (req, res, next) {
  const { name, description, image, brand, sku, price, publishingDate } = req.body;

  // Generate a URL slug for the new product
  const urlSlug = slugify(name, { lower: true, strict: true });

  const stmt = db.prepare(`
    INSERT INTO products (name, description, image, brand, sku, price, publishingDate, urlSlug)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const info = stmt.run(name, description, image, brand, sku, price, publishingDate, urlSlug);

  res.json({ id: info.lastInsertRowid });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  const rows = db.prepare(`
    SELECT  id,
            name,
            description,
            image,
            brand,
            sku, 
            price,
            publishingDate,
            urlSlug
    FROM products
    ORDER BY RANDOM()
    LIMIT 8
  `).all();

  res.render('index', { 
    title: 'Freaky Fashion', 
    products: rows 
  });
});

router.get('/product-details/:urlSlug', function(req, res, next) {
  const urlSlug = req.params.urlSlug;
  const product = db.prepare(`
    SELECT id,
           name,
           description,
           image,
           brand,
           sku, 
           price,
           publishingDate,
           urlSlug
    FROM products
    WHERE urlSlug = ?
  `).get(urlSlug);

  if (product) {
    const similarProducts = db.prepare(`
      SELECT id,
             name,
             description,
             image,
             brand,
             sku,
             price,
             publishingDate,
             urlSlug
      FROM products
      WHERE brand = ? AND id != ?
      ORDER BY RANDOM()
      LIMIT 3
    `).all(product.brand, product.id);

    res.render('product-details', { 
      title: 'Product Details', 
      product: product,
      similarProducts: similarProducts
    });
  } else {
    res.status(404).send('Product not found');
  }
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
