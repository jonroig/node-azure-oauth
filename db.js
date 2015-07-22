
var mongoose = require('mongoose');

module.exports.getUserModel = function(config) {
    mongoose.connect(config.mongodb);
    return mongoose.model('User', { sub: String, email: String, name: String, logins: Number });
}
