var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Define the route for the index page
app.get('/', (req, res) => {
    res.render('index'); // This will render views/index.ejs
});

app.use('/', indexRouter);

app.post('/admin/products/new', (req, res) => {
  const { name, description, image, brand, sku, price, publishingDate } = req.body;
  
  console.log(name, description, image, brand, sku, price, publishingDate);
})

// Route to render the product details page
app.get('/product-details', (req, res) => {
    res.render('product-details');
});

// Define the route for the nested index page
app.get('/admin/products', (req, res) => {
    res.render('admin/products/index'); // This will render views/admin/products/index.ejs
});

// Define the route for the new product page
app.get('/admin/products/new', (req, res) => {
    res.render('admin/products/new'); // This will render views/admin/products/new.ejs
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
