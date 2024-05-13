const {createUser} = require('../models/userModels');
const {loginUser} = require('../models/userModels');

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