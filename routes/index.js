var express = require('express');
var router = express.Router();
const Database = require('better-sqlite3');
const db = new Database('./db/product-manager.db', { verbose: console.log });


// GET / - Admin new product page

router.get('/admin/products/new', function (req, res, next) {

  res.render('admin/products/new', {
    title: 'Admin Products',
    products: []
    });
  });

router.get('/admin/products', function (req, res, next) {
  res.render('admin/products/index', {
    title: 'Admin Products',
    products: []
  });
});

// GET / admin/products/load - API endpoint Load all products
router.get('/admin/products/load', function (req, res, next) {

  const rows = db.prepare(`
    SELECT id,
          name as name,
          description as description,
          image as image,
          SKU as SKU,
          price as price,
          publishing_date as publishing_date,
          category_id as category_id
    FROM products
    `).all();

    res.json(rows);
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
