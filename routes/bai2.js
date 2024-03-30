var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser')
var app = express();

app.use(bodyParser.urlencoded({ extended: false }))
const Register = require("../models/Register");

// parse application/json
app.use(bodyParser.json())



router.post('/register', function(req, res) {
   var name = req.body.name;
   var phone = req.body.phone;
   var email = req.body.email;
   var pass = req.body.pass;

   Register.findOne({
    email:email
   })
   .then(data=> {
    if(data){
        res.json({msg: 'tai khoang tôn tại'});
    }
    else{
   return Register.create({
        name: name,
        phone:phone,
        email:email,
        pass:pass
       })
    }
   })

   .then(data=> {
    res.json({msg:'tao tai khoang'})
   })
   .catch(err =>{
    res.status(500).json({msg:'khong thanh công'})
   })
});
router.post('/login', function(req, res) {
var email = req.body.email
var pass = req.body.pass;

Register.findOne({
    email:email,
    pass:pass
})
.then(data=>{
    if(data){
        res.json({msg:'đang nhập thành công'})
    }
    else{
        res.status(500).json({msg:'đăng nhập thất bại'})
    }
})
.catch(err=>{
    res.status(500).json({msg:'có lỗi'})
})
});
module.exports = router;