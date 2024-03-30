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
        type: String,
        required: true
    },
    products: [{
        type: ObjectId,
        ref: 'ProductsInCart'
    }]
});

const CartDetail = mongoose.model('Bill', BillSchema);

module.exports = CartDetail;