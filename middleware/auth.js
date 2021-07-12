const jwt = require('jsonwebtoken');
const config = require('config');
const { invalid } = require('joi');

module.exports = function auth (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Accses denied');

    try {
        const decoded = jwt.verify(token , config.get('jwtprivatekey'));
        req.user = decoded
        next();
    }

    catch (ex) {
        res.status(400).send('invalid token')
    }
}