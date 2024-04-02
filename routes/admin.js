
const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin } = require('../controller/adminController');

router.get('/login', function(req, res) {
    res.render('login'); 
});


router.post('/register_admin', async (req, res) => {
    const { email, name, password } = req.body;
    const result = await registerAdmin(email, name, password);
    if (result.error) {
        return res.status(400).json({ error: result.error });
    }
    res.status(201).json({ admin: result.admin });
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const result = await loginAdmin(email, password);
    if (result.error) {
        return res.status(401).json({ error: result.error });
    }
    res.status(200).json({ message: result.message });
});

  module.exports = router;