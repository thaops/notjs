// ProductsInCart.js
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const ProductsInCartSchema = new mongoose.Schema({
    userId: {
        type: ObjectId, // Tham chiếu đến ID của người dùng
        ref: 'User' // Sử dụng 'User' là tên của bảng người dùng
    },
    productId: {
        type: ObjectId, // Tham chiếu đến ID của sản phẩm
        ref: 'Product' // Sử dụng 'Product' là tên của bảng sản phẩm
    },
    quantity: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now // Giá trị mặc định là thời gian hiện tại nếu không được cung cấp
    },
    status: {
        type: Number,
        default: 0 // Giá trị mặc định là 0 nếu không được cung cấp
    },
    img:{type:String,required: true},
    title:{type:String},
    titlemini:{type:String},
    gia:{type:Number,required: true},
});

const ProductsInCart = mongoose.model('ProductsInCart', ProductsInCartSchema);

module.exports = ProductsInCart;