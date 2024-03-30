var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var app = express();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const Bill = require("../models/Bill");

router.post('/post', function(req, res){
    var user = req.body.user;
    var date = req.body.date;
    var total = req.body.total;
    var status = req.body.status;
    var products = req.body.products;
    

    Bill.create({
        user: user,
        date: date,
        total:total,
        status:status,
        products:products
    })
    .then(data => {
        res.json('Thêm thành công');
    })
    .catch(err => {
        res.status(500).json('Thất bại');
    });
})

router.get('/get', function(req,res){
    Bill.find()
    .then(bill => {
        res.json(bill)
    })
    .catch(err=>{
        res.status(500).json('that bai')
    })
   
})


module.exports = router;
