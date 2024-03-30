var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var app = express();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const Category = require("../models/CategoryModel");

router.post('/post', function(req, res){
    var name = req.body.name;
    var parentId = req.body.parentId || null;
    if (parentId) {
        parentId = new ObjectId(parentId);
    }
    Category.create({
        name: name,
        parentId: parentId
    })
    .then(data => {
        res.json('Thêm thành công');
    })
    .catch(err => {
        res.status(500).json('Thất bại');
    });
})

router.get('/get', function(req,res){
    Category.find()
    .then(categories => {
        res.json(categories)
    })
    .catch(err=>{
        res.status(500).json('that bai')
    })
})

router.post('/edit/:_id', function(req, res, next) {
    Category.updateOne({_id: req.params._id}, req.body)
      .then(data=>{
        res.json('sửa thành công')
      })
      .catch(err=>{
        res.status(500).json('thất bai')
      })
  });

  router.delete('/delete/:_id', function(req, res, next){
    Category.deleteOne({_id: req.params._id})
    .then(data=>{
     res.json('xóa thanh công')
    })
    .catch(err=>{
     res.status(500).json('xóa thất bại')
    })
  })

module.exports = router;