const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const Product = new Schema({
  key: { type: String },
  img: { type: String, required: true },
  img2: { type: String },
  title: { type: String },
  titlemini: { type: String },
  gia: { type: Number, required: true },
  loai: { type: String, required: true },
  kichthuoc: { type: String, required: true },
  xuatxu: { type: String, required: true },
  tinhtrang: { type: String, required: true },
  categoryId: {
    type: ObjectId,
    ref: "Categories",
  },
  parentId: {
    type: ObjectId,
    ref: "Categories",
  },
});

module.exports = mongoose.model("Product", Product);
