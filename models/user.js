var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var User = new Schema({
    _id : {type: String, lowercase: true},
    name : String,
    equipe : [{type: String, required: true}]
}, {collection: 'users'});

// properties that do not get saved to the db
User.virtual('fullname').get(function () {
    return this.name;
});

module.exports = mongoose.model('User', User);

