import Nakamura from "./nakamura"
var n = new Nakamura()
var name = n.getName()
console.log( name + " !!!" );

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
app.set('views', 'views');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('../public'));

var router = express.Router();
router.get('/', function(req, res, next) {
  res.render("index", {title: "Express & Webpack"});
});
app.use('/', router);

var http = require('http');
var server = http.createServer(app);
server.listen(3000);
