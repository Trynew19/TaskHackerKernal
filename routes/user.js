const express = require("express");
const router = express();
const User = require("../models/user")

// Show all User
router.get('/', async (req, res) => {
    const users = await User.query();
    res.render('dashBoard', { users });
});

// Add User
router.post('/create', async (req, res) => {
    const { name, email, mobile } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;
  
    if (!emailRegex.test(email) || !mobileRegex.test(mobile)) {
      return res.status(400).json({ error: 'Invalid email or mobile' });
    }
  
    await User.query().insert({ name, email, mobile });
    res.redirect('/dashBoard');
  });













module.exports = router;