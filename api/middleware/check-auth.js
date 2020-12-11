// default middleware pattern we use in express apps
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, "secret")
        req.userData = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            message: 'Auth failed'
        })
    }
};