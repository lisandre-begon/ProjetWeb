const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const {createUser, loginUser, updatePassword, updatePseudo, deleteUser, getUser} = require('../models/indexModels');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
    try {
        const data = req.body;
        const userData = await createUser(data,res);
        res.json(userData);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.loginUser = async (req, res) => {
    try {
        const data = req.body;
        const user = await loginUser(data, res);
        res.json({ message: "Login successful", user: user });
    }
    catch (error) {
        console.error(error); 
        if (error.message === "No user found with this email") {
            return res.status(400).json({ message: "Invalid password or email"});
        }else {res.status(500).json({ error: error.message })}
    }
}

exports.logoutUser = async (req, res) => {
    try {
        // Clear the token cookie
        res.clearCookie('token');
        // Send a response to the client
        res.status(200).json({ auth: false, token: null, message: 'You have been logged out.' });
    } catch (error) {
        // Send an error response to the client
        res.status(500).json({ error: `Error during logout: ${error.message}` });
    }
}

exports.verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    }
    jwt.verify(token, 'tiensletoken', (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }
        // if everything good, save to request for use in other routes
        req.userId = decoded.id;
        next();
    });
}

exports.updatePassword = async (req, res) => {
    try {
        const user = await updatePassword(req);
        res.json({ message: "Password updated", user: user });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updatePseudo = async (req, res) => {
    try {
        const user = await updatePseudo(req);
        res.json({ message: "User updated", user: user });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const email = req.params.email;
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = await prisma.user.delete({
            where: {
                email: email
            }
        });

        res.json({ message: "User deleted", user: user });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getUser = async (req, res) => {
    try {
        const data = req.body;
        const user = await getUser(data);
        res.json({ message: "User found", user: user });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
