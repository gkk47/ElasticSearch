var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose =  require('mongoose');
var mongoosastic = require('mongoosastic');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/silly-blog', function(err){
		  console.log(err);
		    console.log('connected.... unless you see an error the line before this!');
 });

var User = new Schema({
	name:String,
    	email: String,
    	city: String
});

User.plugin(mongoosastic);

var user = mongoose.model('user',User);

var test_user = {
		   name: "Gautham",
		   email: "gautham.kumar128@gmail.com",
	           city: "Toronto"		   
		};
var test = user(test_user);

test.save(function(err,test_user){
	if (err) throw err;
	console.log("Saved user "+test_user );
});


var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
