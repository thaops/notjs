
const express = require('express');
const router = express.Router();

const Admin = require("../models/AdminModel");
router.get('/login', function(req, res) {
    res.render('login'); 
});

router.post('/login', function(req, res, next) {
    const { email, pass } = req.body;
    Admin.findOne({ email: email, pass: pass })
        .then((admin) => {
            if (admin) {
                res.redirect('/');
            } else {
                res.status(401).send("Email hoặc mật khẩu không chính xác");
            }
        })
        .catch((err) => {
            // Xử lý lỗi nếu có
            res.status(500).json({ err: err.message });
        });
});



  module.exports = router;