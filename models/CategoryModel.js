const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const CategorySchema = new Schema({
    name: { type: String, required: true },
    parentId: { type: ObjectId, default: null } 
});

module.exports = mongoose.model('Category', CategorySchema);
