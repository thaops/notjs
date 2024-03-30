const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Register = new Schema({
    name: {type: String},
    email: {type: String},
    pass: {type: String},
    phone:{type:String},
  
});
module.exports = mongoose.model('register', Register);
