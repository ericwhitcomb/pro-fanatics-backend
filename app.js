const express = require('express');
const cors = require('cors');

const userModel = require('./db/models/userModel');

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || '4000';

app.get('/', (req, res) => {
    userModel
        .findAllUsers()
        .then(users => {
            console.log(users);
        })
        .catch(err => {
            res.status(500).json({ message: 'Server error' });
        });
    res.status(200).send(`API active on port: ${PORT}`);
});

module.exports = app;