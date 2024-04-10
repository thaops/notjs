var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser')
var app = express();

app.use(bodyParser.urlencoded({ extended: false }))
const Register = require("../models/Register");

app.use(bodyParser.json())


router.get('/userIndex', function(req, res, next) {
  Register.find({})
      .exec()
      .then((registers) => {
          res.render('userIndex', { registers });
      })
      .catch((err) => {
          res.status(500).json({ err: err.message });
      });
});
//dang ky
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
    res.status(200).json({code:1,"msg":'thanh công'})
    res.json(data)
   })
   .catch(err =>{
    res.status(500).json({code:2,"msg":'khong thanh công'})
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
        res.status(200).json({code:1,"msg":'thanh công',data});
    }
    else{
        res.status(500).json({code:2,"msg":'khong thanh công'})
    }
})
.catch(err=>{
    res.status(500).json({msg:'có lỗi'})
})
});

//api
router.route('/api/edit/:_id')
  .get(function(req, res, next) {
    Register.find({_id: req.params._id})
      .then(data =>{
        res.json(data)
      })
      .catch(err=>{
        res.status(400).json({message: err.message})
      });
  })
  .post(function(req, res, next) {
    const newData = req.body;
    delete newData.pass; 

    Register.updateOne({_id: req.params._id}, { $set: newData })
      .then(data=>{
        res.json({code:1,msg:'Sửa thành công'})
      })
      .catch(err=>{
        res.status(500).json({msg:'Thất bại'})
      });
  });


module.exports = router;