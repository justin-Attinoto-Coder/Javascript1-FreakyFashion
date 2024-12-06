const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Database = require('better-sqlite3');
const slugify = require('slugify');
const db = new Database('./db/product-manager.db', { verbose: console.log });

// Middleware to parse JSON bodies
router.use(express.json());

// Middleware to serve static files
router.use(express.static('public'));

router.use(bodyParser.urlencoded({ extended: true }));

// Function to get products from the database
function getProducts() {
  return db.prepare(`
    SELECT id, name, sku, price, image, brand, description, urlSlug, publishingDate
    FROM products
  `).all();
}

// GET /admin/products - Admin products page (initially empty)
router.get('/admin/products', function (req, res, next) {
  res.render('admin/products/index', {
    title: 'Admin Products',
    products: []
  });
});

// GET /admin/products/load - API endpoint to load all products
router.get('/admin/products/load', function (req, res, next) {
  const rows = getProducts();
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

// GET /products/:urlSlug - Render product details page
router.get('/products/:urlSlug', function(req, res, next) {
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
    const allProducts = db.prepare(`
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
      WHERE id != ?
      ORDER BY RANDOM()
    `).all(product.id);  // Ensure only one parameter is passed

    res.render('product-details', { 
      title: 'Product Details', 
      product: product,
      similarProducts: allProducts
    });
  } else {
    res.status(404).send('Product not found');
  }
});

// GET search results
router.get('/search', function(req, res, next) {
    const query = req.query.query;
    console.log('Search query:', query); // Debugging: Log the search query
    if (!query) {
        return res.render('search', { query: '', products: [] });
    }
    const lowerCaseQuery = query.toLowerCase();
    const products = getProducts();
    console.log('Products:', products); // Debugging: Log the fetched products
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(lowerCaseQuery) || 
        product.description.toLowerCase().includes(lowerCaseQuery)
    );
    console.log('Filtered Products:', filteredProducts); // Debugging: Log the filtered products
    res.render('search', { query, products: filteredProducts });
});

/* GET checkout page. */
router.get('/checkout', function(req, res, next) {
  res.render('checkout', { 
    title: 'Checkout' 
  });
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About Us' });
});

/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact Us' });
});

// POST delete product
router.post('/delete-product', function(req, res, next) {
    const productId = req.body.id;
    const stmt = db.prepare('DELETE FROM products WHERE id = ?');
    const result = stmt.run(productId);
    if (result.changes > 0) {
        res.status(200).send('Product deleted');
    } else {
        res.status(404).send('Product not found');
    }
});

module.exports = router;
