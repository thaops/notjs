var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var app = express();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const ProductsInCart = require("../models/ProductsInCart");
const Product = require("../models/Product");





router.post('/addProduct', function(req, res){
    const { userId, productId, quantity,img,title,titlemini,gia } = req.body;

    ProductsInCart.findOne({ userId: userId, productId: productId,img:img,title:title,titlemini:titlemini,gia:gia })
        .then(existingProduct => {
            if (existingProduct) {
                existingProduct.quantity += quantity;
                return existingProduct.save();
            } else {
                const newProductInCart = new ProductsInCart({
                    userId: userId,
                    productId: productId,
                    quantity: quantity,
                    img:img,
                    title:title,
                    titlemini:titlemini,
                    gia:gia,
                });
                return newProductInCart.save();
            }
        })
        .then(savedProductInCart => {
            const statusCode = savedProductInCart ? 200 : 201;
            res.status(statusCode).json(savedProductInCart);
        })
        .catch(error => {
            res.status(400).json({ message: error.message });
        });
});
//xoa 1
router.delete('/api/delete/:_id', function(req, res, next){
    ProductsInCart.deleteOne({_id: req.params._id})
    .then(data=>{
     res.json({code:1,msg:'xóa thanh công'})
    })
    .catch(err=>{
     res.status(500).json({msg:'xóa thất bại'})
    })
  });
//xoa nhieu sp
router.delete('/api/delete', function(req, res, next) {
    const ids = req.body.ids; 

    // Kiểm tra nếu ids không phải là một mảng
    if (!Array.isArray(ids)) {
        return res.status(400).json({ msg: 'IDs phải là một mảng' });
    }

    ProductsInCart.deleteMany({ _id: { $in: ids } })
    .then(data => {
        if (data.deletedCount > 0) {
            // Trả về mã 200 (OK) và thông báo xóa thành công
            return res.status(200).json({ msg: 'Xóa thành công' });
        } else {
            // Trường hợp không có dữ liệu nào được xóa
            return res.status(404).json({ msg: 'Không tìm thấy dữ liệu để xóa' });
        }
    })
    .catch(err => {
        // Ghi log lỗi và trả về mã lỗi 500 (Internal Server Error)
        console.error('Lỗi khi xóa dữ liệu:', err);
        return res.status(500).json({ msg: 'Xóa thất bại' });
    });
});


//san pham nguoi dung
router.get('/product/:userId', function(req,res){
    const userId = req.params.userId;

    ProductsInCart.find({ userId: userId })
        .then(data =>{
            res.json(data);
        })
        .catch(err=>{
            res.status(400).json({ message: err.message });
        });
});




module.exports = router;