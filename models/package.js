/**
 * Created by Paulo Cauca on 28/11/2014.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema;


var PackageSchema = new Schema({
    _id: Number,
    objetos: [{
        ambOrigem: String,
        ambDestino: String,
        folderOrigem: String,
        folderDestino: String,
        tipoObjeto: String,
        nomeObjeto: String,
        versao : Number,
        relace: String
    }],
    status : {type : String, default : 'Desenvolvimento'},
    owner : String,
    dataPkge : {type : Date, default : Date.now()}
},{ collection: 'package' });


// Adiciona Objetos

PackageSchema.statics.addObjetos = function (req, callback) {

    var pkge = req.param('pkge');
    var ambOrigem = req.param('ambOrigem');
    var ambDestino = req.param('ambDestino');
    var folderOrigems = req.param('folderOrigems');
    var folderDestino = req.param('folderDestino');
    var tipoObjeto = req.param('tipoObjeto');
    var nomeObjeto = req.param('nomeObjeto');
    var obj_version = req.param('obj_version');
    var replace = req.param('replace');

    //console.log("ID :" + id + " " + "comentario : " +  comentario_atividade + " Quem " + quemComentou );
    this.update({ _id : pkge },{
            $push : {
                objetos : {
                        ambOrigem: ambOrigem,
                        ambDestino: ambDestino,
                        folderOrigem: folderOrigems,
                        folderDestino: folderDestino,
                        tipoObjeto: tipoObjeto,
                        nomeObjeto: nomeObjeto,
                        versao : obj_version,
                        relace: replace
                        }
                    }},{upsert:true}, function (err, numAffected) {

        if (err) return callback(err);
        if (0 === numAffected) {
            return callback(new Error('Nenhum alteracao realziada'));
        }
        callback();
    })
};


// Altera Status

PackageSchema.statics.changeStatusPackage = function (req, callback) {

    var pkge = req.param('pkge');
    var status = req.param('status');
   
    this.update({ _id : pkge },{ $set : { status : status  } }, function (err, numAffected) {

        if (err) return callback(err);
        if (0 === numAffected) {
            return callback(new Error('Nenhum alteracao realziada'));
        }
        callback();
    })
};


var Package = mongoose.model('Package', PackageSchema);
module.exports = Package;
