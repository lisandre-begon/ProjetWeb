const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexControllers');

router.get('/' , (req, res) => {
    res.send('Hello World!');
});

router.post('/register', indexController.register);
router.post('/login', indexController.login);

module.exports = router;