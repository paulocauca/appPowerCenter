var mongoose = require('mongoose');
var User = mongoose.model('User');
var cleanString = require('../helpers/cleanString');
var ldap = require('ldapjs');



module.exports = function (app) {

    app.get('/login', function (req, res) {
        res.render('login.jade');
    });

    app.post('/login', function (req, res, next) {
        // validate input
        var matricula = cleanString(req.param('matricula'));
        var senha     = req.param('senha');

        if (!(matricula)) {
            return invalid();
        }

        // user friendly
        matricula = matricula.toLowerCase();

        // query mongodb
        User.findById(matricula, function (err, user) {
            if (err) return next(err);

            if (!user) {
                return invalid();
            }

            var optionsLdap = 'cn='+matricula+',ou=colaboradores, ou=GVT, dc=gvt,dc=net,dc=br';
            var clientldap = ldap.createClient({
                url: 'ldap://ldapgvt:389'
            });

            clientldap.bind(optionsLdap, senha, function(err) {
                if(err){
                    console.log( "Auth NOK : " + err);
                    return invalid();
                }else{
                    console.log('Auth OK')
                    req.session.isLoggedIn = true;
                    req.session.userInf = user;
                    console.log('user log in : ' + user);
                    res.redirect('/');
                    clientldap.unbind();

                }
            });

        });

        function invalid () {
            return res.render('login.jade', { invalid: true });
        }
    })

};