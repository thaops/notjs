var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var app = express();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const Category = require("../models/CategoryModel");
const Product = require("../models/Product");



router.get("/getCategory", function (req, res) {
  Category.find({})
    .then((categories) => {
      res.render('categoryIndex',{categories});
    })
    .catch((err) => {
      res.status(500).json("that bai");
    });
});

router.get('/addCategory', function(req, res){
    Category.find({ parentId: null }).exec()
    .then(categories => {
        res.render('addCategory',{categories});
    })
    .catch(err => {
        res.status(500).json('Thất bại');
    });
});
  router.post('/addCategory', function(req, res, next) {
    const categoryData = req.body;
    const category = new Category(categoryData); 
    category.save() 
      .then(savedProduct => {
        res.redirect('/cate/getCategory')
      })
      .catch(error => {
        res.status(500).send('Lỗi khi lưu sản phẩm: ' + error);
      });
  });


  router.get('/editCategory/:_id', function(req, res, next) {
    Category.findById(req.params._id)
    .then(category => {
    res.render('editCategory',{category: category});
   })
   .catch(next)
  });
  
  router.post('/editCategory/:_id', function(req, res, next) {
    Category.updateOne({_id: req.params._id}, req.body)
    .then(() => res.redirect('/cate/getCategory'))
    .catch(next);
  });

  router.delete('/deleteCategory/:_id', function(req, res, next){
    Category.deleteOne({_id: req.params._id})
    .then(data => {
      res.redirect('/cate/getCategory')
    })
    .catch(err => {
        res.status(500).json({msg:'xóa thất bại'});
    });
  });
  
//api




router.get('/get', function(req,res){
    Category.find()
    .then(categories => {
        res.json(categories)
    })
    .catch(err=>{
        res.status(500).json('that bai')
    })
});



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
  });



router.get('/muc/:_id', function(req,res){
    Category.find({_id: req.params._id})
    .then(data =>{
        res.json(data)
    })
    .catch(err=>{
        res.status(400).json({message: err.message})
    })
});

router.get('/mucProduct/:_id?', function(req, res){
    const id = req.params._id; 
    let query = {}; 
    if (id) {
        query = {
            $or: [
                { categoryId: id },
                { parentId: id }
            ]
        };
    }
    Product.find(query) 
    .then(data =>{
        res.json(data); 
    })
    .catch(err=>{
        res.status(400).json({message: err.message}); 
    });
});







module.exports = router;
