const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    }
});

const emailSchema = mongoose.Schema({
    userTo: String,
    userFrom: String,
    subject: String,
    dateSent: { type: Date, default: Date.now },
    contents: String
});

var User = mongoose.model('User', userSchema);

var Email = mongoose.model('Email', emailSchema);

module.exports = {User, Email};