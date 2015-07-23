
var mongoose = require('mongoose');

module.exports.getUserModel = function(config) {
    mongoose.connect(config.mongodb);
    return mongoose.model('User', { accessToken: String, email: String, name: String, logins: Number });
}
