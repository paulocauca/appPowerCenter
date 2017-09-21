
/**
 * Module dependencies.
 */


var express = require('express');
var routes = require('./routes');

//Paulo Cauca
var middleware = require('./middleware');
var mongoose = require('mongoose');

var http = require('http');
var path = require('path');

var optionsDB = {
  //db: { native_parser: true },
  server: { poolSize: 10 }//,
 // replset: { rs_name: 'myReplicaSetName' },
  //user: 'myUserName',
 // pass: 'myPassword'
}


mongoose.connect('mongodb://svuxppbi1/PowerCenterPackageDB',optionsDB, function(err){
	if (err) throw err; 
	console.log('Mongo Connected');
   
	var app = express();
	app.locals.moment = require('moment');
	// all environments
	app.set('port', process.env.PORT || 3002);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	//app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	//app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));

	// development only
	if ('development' == app.get('env')) {
	  app.use(express.errorHandler());
	}

	middleware(app);
	routes(app);



	//app.get('/', routes.index);
	//app.get('/users', user.list);

	http.createServer(app).listen(app.get('port'), function(){
	  console.log('Express server listening on port ' + app.get('port'));
	});

});