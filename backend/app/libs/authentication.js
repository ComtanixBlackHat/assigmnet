// lib/authentication.js
const userModel = require('../models/user.model');

const authenticate = async (req, res, next) => {
    // Get the X-Authorization token from headers
    const token = req.headers['x-authorization'];

    // If no token is present, return a 401 Unauthorised response
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - Token not provided' });
    }

    // Use the model function to convert the token to an ID
    userModel.getIDFromToken(token, (err, userId) => {
        if (err || !userId) {
            return res.status(401).json({ error: 'Unauthorized - Invalid token' });
        }

        // Attach the user ID to the request for later use
        req.userId = userId;

        // Execute next() to continue processing
        next();
    });
};

module.exports = authenticate;
