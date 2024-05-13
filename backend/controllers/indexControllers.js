const {createUser} = require('../models/userModels');

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
