const express = require('express');
const router = express.Router();
const { createUser, loginUser, updatePassword, updatePseudo, deleteUser, getUser, logoutUser, checkAdmin } = require('../controllers/indexControllers');
const { verifyToken } = require('../controllers/verifyTokenControllers');

// Public routes
router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);

// Protected routes
router.get('/getUser', verifyToken, getUser);
router.get('/admin', verifyToken, async (req, res) => {
    const isAdmin = await checkAdmin(req, res);
    if (isAdmin) {
        res.status(200).send({ isAdmin: true });
    } else {
        res.status(403).send({ isAdmin: false });
    }
});
router.put('/updatePassword', verifyToken, updatePassword);
router.put('/updatePseudo', verifyToken, updatePseudo);
router.delete('/:email', verifyToken, deleteUser);

module.exports = router;
