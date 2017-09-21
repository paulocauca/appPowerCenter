var mongoose = require('mongoose');
var async = require('async');
var Package = require('../models/package.js');

var exec = require('child_process').exec;
var loggedIn = require('../middleware/loggedIn');
var child;

module.exports = function(app){

	// TODO :
	app.get('/package/:numPKg',loggedIn, function (req, res, next) {		
				if (Number(req.params.numPKg)) {
					Package.find({_id :req.params.numPKg}).exec(function(err, package){
						res.render('package',{
							title : 'Power Center Package',
							package: JSON.stringify(package), name :req.session.userInf.name
						});
						
					});
				}else{
					res.render('error',{
                        title : 'Power Center Package',
                        });
			}
  	});

	//TODO : Lista Folders Origem
	app.get('/listaFoldersDev/:idNumPkge', function (req, res, next) {
		var idNumPkge = parseInt(req.params.idNumPkge);

		child = exec("sh /app/server/portal/appPowerCenter/scripts/chamaRepositorioDev.sh listaFolders " + idNumPkge , function (error, stdout, stderr) {
			if (error !== null) {
				console.log('exec error: ' + error);
			}
			res.writeHead(200, {'Content-Type': 'text/json'});
			res.end(JSON.stringify(stdout));
			//console.log(JSON.stringify(stdout));
		});
  });

	// TODO : Lista Folders Prod
	app.get('/listaFoldersProd/:idNumPkge', function (req, res, next) {
		var idNumPkge = parseInt(req.params.idNumPkge);

		child = exec("sh /app/server/portal/appPowerCenter/scripts/chamaRepositorioProd.sh listaFolders " + idNumPkge , function (error, stdout, stderr) {

		if (error !== null) {
			console.log('exec error: ' + error);
		}
		res.writeHead(200, {'Content-Type': 'text/json'});
		res.end(JSON.stringify(stdout));
		//console.log(JSON.stringify(stdout));
	});
  });
 
	// TODO : Lista Todos os WFs filtrando por Folder
	app.get('/listaWorkflowByFolderID/:subject_id/:idNumPkge', function (req, res, next) {
		var subject_id = parseInt(req.params.subject_id);
		var idNumPkge = parseInt(req.params.idNumPkge);

		child = exec("sh /app/server/portal/appPowerCenter/scripts/chamaRepositorioDev.sh listaWorkflowByFolderID " + idNumPkge + " " + subject_id , function (error, stdout, stderr) {

			if (error !== null) {
				console.log('exec error: ' + error);
			}
			res.writeHead(200, {'Content-Type': 'text/json'});
			res.end(JSON.stringify(stdout));
		});
  });

	// TODO : Lista Todos os MAPs filtrando por Folder
	app.get('/listaMappingByFolderID/:subject_id/:idNumPkge', function (req, res, next) {
		var subject_id = parseInt(req.params.subject_id);
		var idNumPkge = parseInt(req.params.idNumPkge);

		child = exec("sh /app/server/portal/appPowerCenter/scripts/chamaRepositorioDev.sh listaMappingByFolderID " + idNumPkge + " " + subject_id , function (error, stdout, stderr) {

			if (error !== null) {
				console.log('exec error: ' + error);
			}
			//res.writeHead(200, {'Content-Type': 'application/json'});
			//res.end(JSON.stringify(stdout));
			
			//console.log(unescape(JSON.stringify(stdout)));
			
			//res.writeHead(200, {'Content-Type': 'text/json'});
			//res.end(JSON.stringify(stdout));
			
			res.json(stdout);
			console.log(stdout);
		
			
		});
	});

  	// TODO : Lista WF filtrando por Task_Id
	app.get('/listaWorkflowByTaskID/:task_id/:idNumPkge', function (req, res, next) {
		var task_id = parseInt(req.params.task_id);
		var idNumPkge = parseInt(req.params.idNumPkge);

		child = exec("sh /app/server/portal/appPowerCenter/scripts/chamaRepositorioDev.sh listaWorkflowByTaskID " + idNumPkge + " " + task_id , function (error, stdout, stderr) {

		if (error !== null) {
			console.log('exec error: ' + error);
		}
		res.writeHead(200, {'Content-Type': 'text/json'});
		res.end(JSON.stringify(stdout));
		});
  });

	// TODO : Lista MAP filtrando por Mapping_ID
	app.get('/listaMappingByMappingID/:task_id/:idNumPkge', function (req, res, next) {
		var task_id = parseInt(req.params.task_id);
		var idNumPkge = parseInt(req.params.idNumPkge);

		child = exec("sh /app/server/portal/appPowerCenter/scripts/chamaRepositorioDev.sh listaMappingByMappingID " + idNumPkge + " " + task_id , function (error, stdout, stderr) {

			if (error !== null) {
				console.log('exec error: ' + error);
			}
			res.writeHead(200, {'Content-Type': 'text/json'});
			res.end(JSON.stringify(stdout));
			
			//
		});
	});

  // TODO : Lista Session por Task_ID
	app.get('/listaSessionByTaskID/:task_id/:idNumPkge', function (req, res, next) {
		var task_id = parseInt(req.params.task_id);
		var idNumPkge = parseInt(req.params.idNumPkge);

		child = exec("sh /app/server/portal/appPowerCenter/scripts/chamaRepositorioDev.sh listaSessionByTaskID " + idNumPkge + " " + task_id , function (error, stdout, stderr) {

	  if (error !== null) {
		console.log('exec error: ' + error);
	  }
		res.writeHead(200, {'Content-Type': 'text/json'});
		res.end(JSON.stringify(stdout));
	});
  });

	// TODO : Lista Todos os Sources filtrando por Folder
	app.get('/listaSourcesByFolderID/:subject_id/:idNumPkge', function (req, res, next) {
		var subject_id = parseInt(req.params.subject_id);
		var idNumPkge = parseInt(req.params.idNumPkge);

		child = exec("sh /app/server/portal/appPowerCenter/scripts/chamaRepositorioDev.sh listaSourcesByFolderID " + idNumPkge + " " + subject_id , function (error, stdout, stderr) {

			if (error !== null) {
				console.log('exec error: ' + error);
			}
			res.writeHead(200, {'Content-Type': 'text/json'});
			res.end(JSON.stringify(stdout));
		});
	});

	// TODO : Lista Todos os Sources filtrando por SRC_ID
	app.get('/listaSourceBySrcID/:srcid/:idNumPkge', function (req, res, next) {
		var srcid = parseInt(req.params.srcid);
		var idNumPkge = parseInt(req.params.idNumPkge);

		child = exec("sh /app/server/portal/appPowerCenter/scripts/chamaRepositorioDev.sh listaSourceBySrcID " + idNumPkge + " " + srcid , function (error, stdout, stderr) {

			if (error !== null) {
				console.log('exec error: ' + error);
			}
			res.writeHead(200, {'Content-Type': 'text/json'});
			res.end(JSON.stringify(stdout));
		});
	});

	// TODO : Lista Todos os Targets filtrando por Folder
	app.get('/listaTargetsByFolderID/:subject_id/:idNumPkge', function (req, res, next) {
		var subject_id = parseInt(req.params.subject_id);
		var idNumPkge = parseInt(req.params.idNumPkge);

		child = exec("sh /app/server/portal/appPowerCenter/scripts/chamaRepositorioDev.sh listaTargetsByFolderID " + idNumPkge + " " + subject_id , function (error, stdout, stderr) {

			if (error !== null) {
				console.log('exec error: ' + error);
			}
			res.writeHead(200, {'Content-Type': 'text/json'});
			res.end(JSON.stringify(stdout));
		});
	});

	// TODO : Lista Todos os Targets filtrando por TARGET_ID
	app.get('/listaTargetByTgtID/:tgtid/:idNumPkge', function (req, res, next) {
		var tgtid = parseInt(req.params.tgtid);
		var idNumPkge = parseInt(req.params.idNumPkge);

		child = exec("sh /app/server/portal/appPowerCenter/scripts/chamaRepositorioDev.sh listaTargetByTgtID " + idNumPkge + " " + tgtid , function (error, stdout, stderr) {

			if (error !== null) {
				console.log('exec error: ' + error);
			}
			res.writeHead(200, {'Content-Type': 'text/json'});
			res.end(JSON.stringify(stdout));
		});
	});

	// TODO : Realiza a inserção do Pacote
	app.get('/doPackage/:pkge',loggedIn, function(req, res){

		Package.create({
					_id : req.params.pkge,
					owner : req.session.userInf._id,
					dataPkge : Date.now()
				},
				function(err, numAffected) {

					if (err) return callback(err);
					if (0 === numAffected) {
						return callback(new Error('Nenhuma alteracao realizada!'));
					}else {
						
						Package.find({_id :req.params.pkge}).exec(function(err, package){
							res.render('package',{
							title : 'Power Center Package',
							package: JSON.stringify(package), name :req.session.userInf.name
						});
						
						});
						
						
					}
					//res.writeHead(200, {'Content-Type': 'text/json'});
					//res.end('OK');
					
				}
		);
	});
	
	// TODO : Deleta Pkage
	app.get('/delPkge/:pkge',loggedIn, function(req, res){

		Package.remove({
					_id : req.params.pkge,
				},
				function(err, numAffected) {					
					if (err) return callback(err);
					if (0 === numAffected) {
						return callback(err);
					}
					res.redirect('/');
				}
		);
	});

	// TODO : Deleta objeto dentro do PKGe
	app.get('/delObjeto/:pkge/:id_obj',loggedIn, function(req, res){
		Package.findByIdAndUpdate( {_id : req.params.pkge},{ $pull : { "objetos" : { _id : req.params.id_obj}}},							
				function(err, numAffected) {					
					if (err) return callback(err);
					if (0 === numAffected) {
						return callback(err);
					}
					res.redirect('/package/'+req.params.pkge);
				}
		);
	});
	
	//TODO : Realiza a Inserção do Objeto
	app.post('/doObjeto/:pkge/:ambOrigem/:ambDestino/:folderOrigems/:folderDestino/:tipoObjeto/:nomeObjeto/:obj_version/:replace',loggedIn, function(req, res){

	Package.addObjetos(req, function (err) {
		if (err) return next(err);
		console.log('Objeto inserido  com sucesso!' );
		res.writeHead(200, {'Content-Type': 'text/json'});
		res.end('OK');
	})
	});
	
	// TODO : Realiza a troca do Status na página inicial 
	app.post('/changeStatusPackage/:pkge/:status',loggedIn, function(req, res){
	
	Package.changeStatusPackage(req, function (err) {
		if (err) return next(err);
		console.log('Status alterado com sucesso!' );
		res.writeHead(200, {'Content-Type': 'text/json'});
		res.end('OK');
	})
	});

	// TODO : Realiza count dos Objetos
	app.get('/returnCountObjetos/:pkge', function (req, res) {
		var pkge = parseInt(req.params.pkge);

		Package.aggregate([{$match : { _id : pkge}},{ '$unwind' : '$objetos'},{ $group : { _id : '$objetos.tipoObjeto', count : {'$sum' : 1}}}],function(err, seeds) {
			if( err || !seeds) console.log("No seeds found");
			else
			{
				res.writeHead(200, {'Content-Type': 'text/json'});
				seedscollection = seeds;

				str = '[';

				seedscollection.forEach( function(seed) {
					str = str + '{"tipoObjeto":"'+ seed._id + '","count":"'+ seed.count +'"},';
				});
				str = str.substring(0,str.length-1);
				str = str + ']';
				res.end(JSON.stringify(str));
			}
		});


	});

};