const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const userRoutes = require('../models/User');

router.get('/' , (req, res) => {
    
    res.send('User created');
});

module.exports = router;