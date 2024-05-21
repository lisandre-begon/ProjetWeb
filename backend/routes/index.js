const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexControllers');

router.get('/' , (req, res) => {res.send('Hello World!');});
router.get('/getUser', indexController.getUser);
router.post('/register', indexController.register);
router.post('/login', indexController.login);
router.put('/updatePassword', indexController.updatePassword);
router.put('/updateUser', indexController.updateUser);
router.delete('/deleteUser', indexController.deleteUser);

module.exports = router;