const {getReceipt} = require('../models/receiptModels');

exports.read = async (req, res) => {
    try {
        const data = req.body;
        const receipt = await getReceipt(data);
        res.json({ message: "Receipt found", receipt: receipt });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

