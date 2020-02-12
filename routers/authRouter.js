const express = require('express');
const bcrypt = require('bcryptjs');

const authHelper = require('../helpers/authHelper');
const userModel = require('../db/models/userModel');

const router = express.Router();

router.post('/login', (req, res) => {
    console.log('/api/auth/login');
    const creds = req.body;
    console.log(creds);
    userModel
        .findByEmail(creds.email)
        .then(user => {
            console.log('findByEmail: then');
            if (user && bcrypt.compareSync(creds.password, user.password)) {
                console.log('findByEmail: then if');
                delete user['password'];
                console.log('findByEmail: then if a');
                const token = authHelper.generateToken(user);
                console.log('findByEmail: then if b');
                res.json({ token });
            } else {
                console.log('findByEmail: then else');
                res.status(401).json({ message: 'Invalid email or password' });
            }
        })
        .catch(err => {
            console.log('findByEmail: catch');
            res.status(500).json({ message: 'Server error' });
        });
});

router.post('/register', (req, res) => {
    const creds = req.body;
    creds.password = bcrypt.hashSync(creds.password, 6);
    userModel
        .insert(creds)
        .then(ids => {
            if (ids.length) {
                res.status(201).json({ message: 'Success' });
            } else {
                res.status(400).json({ message: 'Unable to register user' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Server error' });
        });
});

module.exports = router;