const express = require('express');
const router = express.Router();
const { createUser, loginUser, updatePassword, updatePseudo, deleteUser, getUser, verifyToken, logoutUser } = require('../controllers/indexControllers');


router.get('/' , (req, res) => {res.send('Hello World!');});
router.get('/getUser', getUser);
router.get('/logout', logoutUser);
router.post('/register', createUser);
router.post('/login', loginUser);
router.put('/updatePassword', verifyToken, updatePassword);
router.put('/updatePseudo', verifyToken, updatePseudo);
router.delete('/:email', deleteUser);


module.exports = router;