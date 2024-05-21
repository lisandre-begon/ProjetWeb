const {userModels} = require('../models/userModels');

exports.register = async (req, res) => {
    try {
        const data = req.body;
        const userData = await createUser(data);
        res.json(userData);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.login = async (req, res) => {
    try {
        const data = req.body;
        const user = await loginUser(data);
        res.json({ message: "Login successful", user: user });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updatePassword = async (req, res) => {
    try {
        const data = req.body;
        const user = await updatePassword(data);
        res.json({ message: "Password updated", user: user });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateUser = async (req, res) => {
    try {
        const data = req.body;
        const user = await updatePseudo(data);
        res.json({ message: "User updated", user: user });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const data = req.body;
        const user = await deleteUser(data);
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
