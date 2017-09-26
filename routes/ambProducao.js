var loggedIn = require('../middleware/loggedIn');
var sys = require('sys')
var exec = require('child_process').exec;
var child;


module.exports = function(app){

	// TODO : Lista todas as Folders Criadas no Power Center
	app.get('/ambProducao',loggedIn, function (req, res, next ) {
            res.render('ambProducao',{
				title : 'Power Center Package',
				name :req.session.userInf.name
				});
	});
	
	 app.post('/showLogPowerCenter',  function(req, res, next){

			child = exec("sh /app/server/scripts/show_log_powercenter.sh " + req.body.folder + " " + req.body.wf,{maxBuffer: 1024 * 1000}, function (error, stdout, stderr) {
			  if (error !== null) {
				console.log('exec error: ' + error);
			  }
            res.end(stdout);
			});
	 });

    app.post('/showModifiedProcess',  function(req, res, next){
        child = exec("sh /app/server/portal/appPowerCenter/scripts/realiza_check_process.sh " + req.body.wf,{maxBuffer: 1024 * 500}, function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            }
            res.end(stdout);
        });
    });

    app.post('/checkConnection',  function(req, res, next){
        child = exec("sh /app/server/portal/appPowerCenter/scripts/realiza_check_connections.sh " + req.body.connection, function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            }
            res.end(stdout);
        });
    });

    app.post('/checkProcessConnection',  function(req, res, next){
        child = exec("sh /app/server/portal/appPowerCenter/scripts/realiza_check_process_connection.sh " + req.body.connection, {maxBuffer: 1024 * 1000}, function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            }
            res.end(stdout);
        });
    });
	
};
