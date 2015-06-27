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

	// url used to search yql
	var url = "http://reddit.com/r/" + val + ".json?jsonp=test";
	// console.log(url);

	// request module is used to process the yql url and return the results in JSON format
	// request(url, function(err, resp, body) {
	// 	// body = JSON.parse(body);
	// 	// var jsonObj = body.data.children;
	// 	function test(data){
	// 		console.log(data);
	// 	}
	// 	test();
		
	// 	// console.log(jasonObj[0].data.url);
	// 	// for(var i = 0; i < jsonObj.length; i++) {
	// 	//     var obj = jsonObj[i];

	// 	//     console.log(obj.data.url);
	// 	// }
		
	// });

	// testing the route
	// res.send("WHEEE");
	request({uri: url}, 
		function(err, resp, body){ 
			jsonpData = body;
			jsonpSandbox = vm.createContext({test: function(r){return r;}});
			myObject = vm.runInContext(jsonpData,jsonpSandbox);
			var jsonObj = myObject.data.children;
			for(var i = 0; i < jsonObj.length; i++) {
			    var obj = jsonObj[i];

			    console.log(obj.data.url);
			}
		});

});

// old routes
// app.get('/', routes.index);
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
