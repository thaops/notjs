
var express = require("express");
const { required } = require("nodemon/lib/config");
var router = express.Router();
const Course = require("../models/Course");
const Product = require("../models/Product");
const Category = require("../models/CategoryModel");
const methodOverride = require('method-override');
const app = express();
const db = require("../config/db");
db.connect();

app.use(methodOverride('_method'));

/* GET home page. */

router.get("/", function (req, res, next) {
  Promise.all([
    Course.find({}).exec(),
    Product.find({}).exec(),
    Category.find({}).exec()
  ])
  .then(([courses, products, categories]) => {
    res.render('index', { courses, products, categories });
  })
  .catch((err) => {
    res.status(500).json({ err: err.message });
  });
});


router.get("/courses", function (req, res, next) {
  Course.find({}).exec()
  .then((courses)=>{
    res.render('courses', {courses});
  })
  .catch((err) => {
    res.status(500).json({ err: err.message });
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
      // Xử lý khi có lỗi xảy ra trong quá trình lưu
      res.status(500).send('Lỗi khi lưu sản phẩm: ' + error);
    });
});




router.get('/edit/:_id', function(req, res, next) {
  Product.findById(req.params._id)
  .then(product => {
  res.render('edit',{product: product});
 })
 .catch(next)

  // res.render('edit')

});

router.post('/edit/:_id', function(req, res, next) {
  Product.updateOne({_id: req.params._id}, req.body)
    .then(() => res.redirect('/'))
    .catch(next);
});

router.delete('/delete/:_id', function(req, res, next){
  Product.deleteOne({_id: req.params._id})
      .then(() => res.redirect('back'))
      .catch(next);
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

  Product.find()
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
