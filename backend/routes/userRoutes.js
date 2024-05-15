const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexControllers');
const userRoutes = require('../models/userModels');

router.get('/' , (req, res) => {
    
    res.send('Hello World!');
});

module.exports = router;