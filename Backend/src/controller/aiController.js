const aiService = require("../services/aiService");

module.exports.getReview = async (req, res) => {
    try {
        const code = req.body.code;
        if (!code) {
            return res.status(400).send("code is required");
        }

        const response = await aiService(code);
        res.send(response);
    } catch (err) {
        res.status(500).send(err.message);
    }
};
