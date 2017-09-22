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
			
			child = exec("sh /app/server/scripts/show_log_powercenter.sh " + req.body.folder + " " + req.body.wf, function (error, stdout, stderr) {
							
			//  sys.print('stdout: ' + stdout);

			  if (error !== null) {
				console.log('exec error: ' + error);
			  }
			  
			//console.log(stdout);
            res.end(stdout);

			});
			
			
	 });

    app.post('/showModifiedProcess',  function(req, res, next){


        console.log(req.body.wf);

        child = exec("sh /app/server/portal/appPowerCenter/scripts/realiza_check_process.sh " + req.body.wf, function (error, stdout, stderr) {

            //  sys.print('stdout: ' + stdout);

            if (error !== null) {
                console.log('exec error: ' + error);
            }
            //console.log(stdout);
            res.end(stdout);

        });


    })
	
};
