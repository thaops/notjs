
var express = require("express");
const { required } = require("nodemon/lib/config");
var router = express.Router();
const Bill = require("../models/Bill");
const Product = require("../models/Product");
const Category = require("../models/CategoryModel");
const Register = require("../models/Register");
const methodOverride = require('method-override');
const app = express();
const db = require("../config/db");
db.connect();

app.use(methodOverride('_method'));

/* GET home page. */


router.get("/", function (req, res) {
  Product.find({})
    .then((products) => {
      res.render('index',{products});
    })
    .catch((err) => {
      res.status(500).json("that bai");
    });
});


router.get('/add', function(req, res, next) {
  res.render('add');
})
router.post('/add', function(req, res, next) {
  const productData = req.body;
  const product = new Product(productData); 

  product.save() 
    .then(savedProduct => {
      res.redirect('/')
    })
    .catch(error => {
      res.status(500).send('Lỗi khi lưu sản phẩm: ' + error);
    });
});
router.get('/edit/:_id', function(req, res, next) {
  Product.findById(req.params._id)
  .then(product => {
  res.render('edit',{product: product});
 })
 .catch(next)

});

router.post('/edit/:_id', function(req, res, next) {
  Product.updateOne({_id: req.params._id}, req.body)
    .then(() => res.redirect('/'))
    .catch(next);
});



router.delete('/delete/:_id', function(req, res, next){
  Product.deleteOne({_id: req.params._id})
  .then(data => {
    res.redirect('/')
  })
  .catch(err => {
      res.status(500).json({msg:'xóa thất bại'});
  });
});



// api
router.delete('/api/delete/:_id', function(req, res, next){
  Product.deleteOne({_id: req.params._id})
  .then(data=>{
   res.json({msg:'xóa thanh công'})
  })
  .catch(err=>{
   res.status(500).json({msg:'xóa thất bại'})
  })
});

router.get('/api/get/product', function(req,res){

  Product.find().limit(4)
  .then(product => {
    
      res.json(product)
  })
  .catch(err=>{
      res.status(500).json({msg:'that bai '})
  })
});

//tim
router.post('/api/get/product', function(req, res){
  const title = req.body.title;

  if (title) {
    Product.find({ title: { $regex: title, $options: 'i' } })
      .then(products => {
        res.json(products);
      })
      .catch(err => {
        res.status(500).json({ msg: 'Thất bại trong việc tìm kiếm theo tiêu đề.' });
      });
  } else {
    
    res.status(400).json({ msg: 'Tiêu đề không được tìm thấy trong dữ liệu yêu cầu.' });
  }
});



router.post('/api/edit/:_id', function(req, res, next) {
  Product.updateOne({_id: req.params._id}, req.body)
    .then(data=>{
      res.json({msg:'sửa thành công'})
    })
    .catch(err=>{
      res.status(500).json({msg:'thất bai'})
    })
});

router.post('/api/add', function(req, res, next) {
  const productData = req.body; 
  const product = new Product(productData); 
  product.save() 
   .then(data=>{
    res.json({msg:'add thanh cong'})
   })
   .catch(err=>{
    res.status(500).json({msg:'that bai'})
   })
});
module.exports = router;
