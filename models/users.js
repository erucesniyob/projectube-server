const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    DOB: Date,
    ava: String,
    bio: String, 
    personalPref: String
});

module.exports = mongoose.model('User', UserSchema)