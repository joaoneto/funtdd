
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , ticket = require('./routes/ticket')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose');

var app = module.exports = express();

app.configure(function () {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
  mongoose.connect('mongodb://localhost/tickets_dev');
  app.use(express.errorHandler());
});

app.configure('test', function () {
  app.set('port', process.env.PORT || 3001);
  mongoose.connect('mongodb://localhost/tickets_test');
});

app.get('/', routes.index);
app.get('/users', user.list);

app.get('/tickets', ticket.index);
app.post('/tickets', ticket.create);
app.get('/tickets/success', ticket.success);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
