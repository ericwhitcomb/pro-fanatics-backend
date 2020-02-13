const express = require('express');
const bcrypt = require('bcryptjs');

const authHelper = require('../helpers/authHelper');
const userModel = require('../db/models/userModel');

const router = express.Router();

router.post('/login', (req, res) => {
    const creds = req.body;
    userModel
        .findByEmail(creds.email)
        .then(user => {
            if (user && bcrypt.compareSync(creds.password, user.password)) {
                delete user['password'];
                const token = authHelper.generateToken(user);
                res.json({ token });
            } else {
                res.status(401).json({ message: 'Invalid email or password' });
            }
        })
        .catch(err => {
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