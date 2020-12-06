var express = require('express');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var usersRouter = require('./routes/metrics');
const stackTrace = require('stack-trace');

var app = express();
app.disable('x-powered-by');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/heartbeat', (req,res,next) => {
  res.status(200).end('ok');
});
app.use('/', usersRouter);

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
  if(err.status === 500) {
    const stack = stackTrace.get();
    stack.forEach(s => {
      const caller = s;
      const fileName = caller.getFileName().split('\\')[caller.getFileName().split('\\').length - 1] || '';
      const lineNumber = caller.getLineNumber() || '';
      const columnNumber = caller.getColumnNumber() || '';
      console.error(`==> Error | T:${new Date().toISOString()} | F: ${fileName} ${lineNumber}:${columnNumber} ->`);
    });
  }
  res.status(err.status || 500).send({err});
  res.end();
});

module.exports = app;
