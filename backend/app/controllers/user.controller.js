
const userModel = require('../models/user.model');


const createUser = (req, res) => {
  
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

   
    const newUser = {
        username: username,
        password: password
    };

   
    userModel.addNewUser(newUser, (err, userId) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

   
        return res.status(201).json({ userId });
    });
};

module.exports = {
    createUser
   
};
