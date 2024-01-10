
const crypto = require('crypto'); // for hash generation
const db = require('../../database')



const generateSalt = () => {
    return crypto.randomBytes(16).toString('hex');
};


const getHash = (password, salt) => {
    console.log('Password:', password);
    console.log('Salt:', salt);
    
    const hash = crypto.createHmac('sha256', salt).update(password).digest('hex');
    
    console.log('Hash:', hash);
    
    return hash;
};


const addNewUser = (user, done) => {
    console.log(user);
    const salt = generateSalt();
    const hashedPassword = getHash(user.password, salt);

    db.run(
        'INSERT INTO users (username, password, salt , first_name , last_name ) VALUES (?, ?, ? , ? , ? )',
        [user.username, hashedPassword, salt , user.first_name , user.last_name ],
        (err) => {
            if (err) {
                console.log(err)
                return done(err, null);
            }

         
            return done(null, { username: user.username });
        }
    );
};


const authenticateUser = (username, password, done) => {
    db.get(
        'SELECT * FROM users WHERE username = ?',
        [username],
        (err, user) => {
            if (err) {
                return done(err, null);
            }

            if (!user) {
           
                return done("Username not found", null);
            }

            const hashedPassword = getHash(password, user.salt);

            if (hashedPassword !== user.password) {
          
                return done("Incorrect password", null);
            }
            console.log(user)
         
            done(null, user);
        }
    );
};

const getToken = (id, done) => {
    db.get('SELECT session_token FROM users WHERE user_id = ?', [id], (err, row) => {
        if (err) {
            console.log(err)
            return done(err, null);
        }

        if (row) {
            return done(null, row.token);
        }

        
        return done(null, null);
    });
};
const setToken = (id, done) => {
    const token = generateSalt();

    db.run('UPDATE users SET session_token = ? WHERE user_id = ?', [token, id], function (err) {
        if (err) {
            return done(err, null);
        }

     
        return done(null, token);
    });
};


const removeToken = (token, done) => {
    db.run('DELETE FROM tokens WHERE token = ?', [token], (err) => {
        if (err) {
            return done(err);
        }

      
        return done(null);
    });
};


const getIDFromToken = (token, done) => {
    db.get('SELECT userId FROM tokens WHERE token = ?', [token], (err, row) => {
        if (err) {
            return done(err, null);
        }

        if (!row) {
           
            return done("Invalid token", null);
        }

       
        done(null, row.userId);
    });
};

module.exports = {
    getHash,
    addNewUser,
    authenticateUser,
    getToken,
    setToken,
    removeToken,
    getIDFromToken
};
