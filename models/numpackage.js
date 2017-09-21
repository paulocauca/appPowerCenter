var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var NumPackageSchema = new Schema({
		numpkge : Number
},{ collection: 'nextpkge' });


NumPackageSchema.statics.getNumPkge = function (req, callback) {
	var query = {};//ID FIXO { _id : '546e11f5a560e0f75a2a14ff'  };
	var update = { $inc: { 'numpkge': 1 }};
	
	this.update(query, update, function (err, numAffected) {
		if (err) return callback(err);
		if (0 === numAffected) {
		  return callback(new Error('Não foi possivel gerar novo numero do pacote'));
		}
		callback(numAffected);
	});
};




var NumPackage = mongoose.model('NumPackage', NumPackageSchema);
module.exports = NumPackage;


