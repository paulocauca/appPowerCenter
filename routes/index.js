var mongoose = require('mongoose');

var loggedIn = require('../middleware/loggedIn');

var Package = require('../models/package.js');
var User = require('../models/user.js');

var package = require('./package');
var ambProducao = require('./ambProducao');
var numpackage = require('./numpackage');
var login = require('./login');



module.exports = function(app){

	// TODO : Lista todas as Folders Criadas no Power Center
	app.get('/',loggedIn, function (req, res, next ) {
        if (req.session.userInf) {

            Package.find({'owner' : req.session.userInf._id}).sort({_id : -1}).exec(function(err, packages){
                res.render('index',{
                    title : 'Power Center Package',
                    packages: packages, 
					name :req.session.userInf.name
                });
            });
        }else{
            res.render('index',{title : 'Power Center Package'});
        }
  });

  login(app);
  package(app);
  numpackage(app);
  ambProducao(app);
};
