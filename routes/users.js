var express = require('express');
var router = express.Router();
const Course = require("../models/Course");


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
  Course.find({})
      .exec()
      .then((courses) => {
          res.render('login', { courses });
      })
      .catch((err) => {
          res.status(500).json({ err: err.message });
      });
});


router.post('/login', function(req, res, next) {
  const { email, pass } = req.body;

  Course.findOne({ email: email, pass: pass })
      .exec()
      .then((user) => {
          if (user) {
              // Redirect đến trang chính hoặc bất kỳ trang nào khác bạn muốn sau khi đăng nhập thành công
              // res.redirect('/');
              res.send('thanh công')
          } else {
              // Render trang đăng nhập với thông báo lỗi nếu thông tin đăng nhập không chính xác
              res.render('login', { error: 'Invalid email or password' });
          }
      })
      .catch((err) => {
          res.status(500).json({ err: err.message });
      });
});




router.get('/dangky', function(req, res, next) {
  

  res.render('dangky');
});

router.post('/register', function(req, res, next) {
  const { name, email, phone, pass } = req.body;

  const user = {name:name, email:email, phone:phone, pass:pass}

  if (user === undefined) {
    res.send('tai khoang ton tai'); // User already exists
  } else {
    
    users.push(user);
    res.json('Dang ky thanh cong'); // Successful registration
    console.log(user)
  }
});


module.exports = router;
