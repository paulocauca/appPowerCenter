var loggedIn = require('../middleware/loggedIn');
var mongoose = require('mongoose');
var NumPackage = require('../models/numpackage.js');

module.exports = function(app){
	// TODO : Reserva numero do Pacote 

	app.get('/numpackage', function (req, res, next) {
		  NumPackage.getNumPkge(req, function (result) {
			  console.log(result);
				if(result === 1 ){
					NumPackage.find().exec(function(err, pkge){
						if(err) return callback(err);
						/*
							res.render('package',{
								title : 'Power Center Package',
								numpkge : pkge.numpkge
								
							});
								console.log('NUM PKGE ' + JSON.stringify(pkge) );
						
						
						*/
								res.writeHead(200, {'Content-Type': 'text/json'});
								seedscollection = pkge;
								var str;
								seedscollection.forEach( function(seed) {
									str = '{"numpkge" : "' + seed.numpkge + '"},';
								});
								str = str.substring(0,str.length-1);
								res.end(JSON.stringify(str));
								//console.log(str);
								
						});
				} else {
					console.log("Erro ao consultar numero do pacote")
				}
			});
				
  });
};

//db.nextpkge.insert({ _id: '546e11f5a560e0f75a2a14ff', numpkge: 1 })