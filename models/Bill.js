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
        default: 0 
    },
    products: [{
        type: ObjectId,
        ref: 'ProductsInCart'
    }],
    img:{type:String,required: true},
    title:{type:String},
    titlemini:{type:String},
    name: {type: String},
    email: {type: String},
    diaChi: {type: String},
    phone:{type:String},
    gia:{type:Number,required: true},
    quantity: {
        type: Number,
        required: true
    },
});

const CartDetail = mongoose.model('Bill', BillSchema);

module.exports = CartDetail;