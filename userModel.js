// userModel.js
const db = require('./database');
const bcrypt = require('bcryptjs');

// User model functions
const User = {
    // Create new user
    create: (name, email, password, callback) => {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) return callback(err);
            
            db.run(
                'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
                [name, email, hash],
                function(err) {
                    if (err) return callback(err);
                    callback(null, { id: this.lastID, name, email });
                }
            );
        });
    },

    // Find user by email
    findByEmail: (email, callback) => {
        db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
            if (err) return callback(err);
            callback(null, row);
        });
    },

    // Verify user credentials
    verifyCredentials: (email, password, callback) => {
        User.findByEmail(email, (err, user) => {
            if (err) return callback(err);
            if (!user) return callback(null, false);
            
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) return callback(err);
                if (!result) return callback(null, false);
                
                // Don't return password hash
                delete user.password;
                callback(null, user);
            });
        });
    }
};

module.exports = User;