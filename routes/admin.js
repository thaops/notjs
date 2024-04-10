
const express = require('express');
const router = express.Router();

const Admin = require("../models/AdminModel");
router.get('/login', function(req, res) {
    res.render('login'); 
});

router.post('/login', function(req, res, next) {
    const { email, pass } = req.body;
    Admin.findOne({ email: email, pass: pass })
        .then((admin) => res.redirect('/'))
            
        .catch((err) => {
            res.status(500).json({ err: err.message });
        });
  });


  module.exports = router;