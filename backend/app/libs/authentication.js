
const userModel = require('../models/user.model');

const authenticate = async (req, res, next) => {
  
    const token = req.headers['x-authorization'];

  
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - Token not provided' });
    }

   
    userModel.getIDFromToken(token, (err, userId) => {
        if (err || !userId) {
            return res.status(401).json({ error: 'Unauthorized - Invalid token' });
        }

      
        req.userId = userId;

      
        next();
    });
};

module.exports = authenticate;
