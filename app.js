var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const directorsRouter = require('./routes/director');
const genresRouter = require('./routes/genres');
const actorsRouter = require('./routes/actors');
const bookingRouter = require('./routes/bookings');
const copiesRouter = require('./routes/copies');
const membersRouter = require('./routes/members');
const moviesRouter = require('./routes/movies');

var app = express();
// mongodb://<dbUser>?:<dbPass>?@<url>:<port>/<dbName>
const url = "mongodb://localhost:27017/video_club";
mongoose.connect(url);

const db = mongoose.connection;
db.on('open',()=>{
  console.log('Conexion ok');
});

db.on('error',()=>{
  console.log('No se ha podido conectar a la base de datos');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/directors',directorsRouter);
app.use('/genres',genresRouter);
app.use('/actors', actorsRouter);
app.use('/bookings', bookingRouter);
app.use('/copies', copiesRouter);
app.use('/members', membersRouter);
app.use('/movies', moviesRouter);
app.use('/users', usersRouter);

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
