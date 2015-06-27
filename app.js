/////////////////////////////
////    server side     ////
///////////////////////////

// var routes = require('./routes');
// var user = require('./routes/user');

// dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var request = require('request');
var util = require('util')
var app = express();
var vm = require('vm');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// first route
app.get('/', function(req, res) {res.render('index')});

// second route
app.get('/searching', function(req, res){

	// input value from search
	var val = req.query.search;
	//console.log(val);

	// url used to search reddit
	var url = "http://reddit.com/r/" + val + "/hot.json?jsonp=test&limit=50";
	
	request({uri: url}, 
		function(err, resp, body){ 
			jsonpData = body;
			jsonpSandbox = vm.createContext({test: function(r){return r;}});
			myObject = vm.runInContext(jsonpData,jsonpSandbox);
			var jsonObj = myObject.data.children;
			res.send(jsonObj);
		});

});

// old routes
// app.get('/', routes.index);
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
