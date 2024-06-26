
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require('method-override');
const Handlebars = require('handlebars');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bai2Router = require('./routes/bai2');
var categoryRouter = require('./routes/category');
var billRouter = require('./routes/Bill');
var adminRouter = require('./routes/admin');
var cartRouter = require('./routes/cart');
var app = express();

app.use(methodOverride('_method'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/us', usersRouter);
app.use('/users', bai2Router);
app.use('/cate',categoryRouter);
app.use('/bill',billRouter);
app.use('/cart',cartRouter);
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
