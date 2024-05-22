const express = require('express');
const router = express.Router();
const { createUser, loginUser, updatePassword, updatePseudo, deleteUser, getUser } = require('../controllers/indexControllers');


router.get('/' , (req, res) => {res.send('Hello World!');});
router.get('/getUser', getUser);
router.post('/register', createUser);
router.post('/login', loginUser);
router.put('/updatePassword', updatePassword);
router.put('/updatePseudo', updatePseudo);
router.delete('/:email', deleteUser);


module.exports = router;