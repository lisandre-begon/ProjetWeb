const express = require('express');
const router = express.Router();
const receiptControllers = require('../controllers/receiptControllers');

router.get('/' , (req, res) => {res.send('Hello World!');});
router.get('/getReceipt', receiptControllers.read);
/*
router.post('/post', receiptControllers.post);
router.delete('/deleteReceipt', receiptControllers.deletreReceipt);*/

module.exports = router;