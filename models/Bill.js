const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const BillSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        default: 0 // Giá trị mặc định là 0 nếu không được cung cấp
    },
    products: [{
        type: ObjectId,
        ref: 'ProductsInCart'
    }],
    img:{type:String,required: true},
    title:{type:String},
    titlemini:{type:String},
    
});

const CartDetail = mongoose.model('Bill', BillSchema);

module.exports = CartDetail;