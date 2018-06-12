const mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

module.exports.userSchema = new Schema({
    _id: ObjectId,
    email:String,
    password: String
 });