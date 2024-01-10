
const userModel = require('../models/user.model');


const loginUser = (req, res) => {
   
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

  
    userModel.authenticateUser(username, password, (err, user) => {
        if (err) {
            return res.status(401).json({ error: 'Authentication failed' });
        }

      
        userModel.getToken(user.user_id, (tokenErr, token) => {
            if (tokenErr) {
                return res.status(500).json({ error: 'Internal Server token Error' });
            }

          
            if (!token) {
                userModel.setToken(user.user_id, (setTokenErr, newToken) => {
                    if (setTokenErr) {
                        return res.status(500).json({ error: 'Internal Server setrtoken Error' });
                    }
                    
                    return res.status(200).json({ token: newToken , user_id : user.user_id });
                });
            } else {
               
                return res.status(200).json({ token });
            }
        });
    });
};
const logoutUser = (req, res) => {
    // Get the token header from the request
    const token = req.headers.authorization;

    // Check if the token is present in the request headers
    if (!token) {
        return res.status(400).json({ error: 'Token is required in the headers' });
    }

    // Remove the token from the DB using the model function
    userModel.removeToken(token, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Handle successful logout
        return res.status(200).json({ message: 'Logout successful' });
    });
};
const registerUser = (req, res) => {
    const user = req.body; // Assuming you're sending user data in the request body

    userModel.addNewUser(user, (err, newUser) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.status(201).json(newUser);
    });
};
module.exports = {
    loginUser,
    logoutUser ,
    registerUser
};
