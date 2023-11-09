var express = require('express');
var createError = require('http-errors');
var path = require('path');

var cookieParser = require('cookie-parser');
var logger = require('morgan');

const Router = express.Router;
const api = require('./routes/api');

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');

const app = express(); // instance express -> assign ke variabel app
const { PORT = 8081 } = process.env;
const PUBLIC_DIR = path.join(__dirname, 'public');

app.set('view engine', 'ejs');
app.use(express.static(PUBLIC_DIR)); // membuat URL sendiri untuk apa saja
// yang ada di dalam folder PUBLIC_DIR -> "public"

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use('/api/books', api.books());

app.use('/', indexRouter);

app.use('/admin', adminRouter);

app.listen(PORT, () => {
  console.log('Server is running on http://localhost:%d', PORT);
});
