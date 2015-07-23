﻿
var mongoose = require('mongoose');

module.exports.getUserModel = function(config) {
    mongoose.connect(config.mongodb);
    return mongoose.model('User', { tid: String, email: String, name: String, logins: Number });
}
