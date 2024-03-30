const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Course = new Schema({
    
    name: {type: String},
    email: {type: String},
    pass: {type: String},
    phone:{type:String},
    createdAte: { type: Date, default: Date.now },
    updatedAte: { type: Date, default: Date.now },
  });

  module.exports = mongoose.model('Course', Course);