const express = require('express');
const cors = require('cors');

const authRouter = require('./routers/authRouter');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRouter);

// root page
app.get('/', (req, res) => {
    res.status(200).send(`API is active`);
});

// root api page
app.get('/api', (req, res) => {
    res.status(200).send(`API documentation will go here`);
});

module.exports = app;