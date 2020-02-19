const express = require('express');

const authenticate = require('../middleware/authenticate.js');

const router = express.Router();

router.use(authenticate);

router.delete('/:pid', (req, res) => {
    const { pid } = req.params;
    console.log('DELETE /api/player/id');
    res.status(200).json({ message: `Delete player at ${pid}` });
});

router.get('/', (req, res) => {
    console.log('GET /api/player');
    res.status(200).json({ message: 'Get players' });
});

router.get('/:pid', (req, res) => {
    const { pid } = req.params;
    console.log('GET /api/player/id');
    res.status(200).json({ message: `Get player at ${pid}` });
});

router.post('/', (req, res) => {
    console.log('POST /api/player');
    res.status(200).json({ message: 'Post player' });
});

router.put('/:pid', (req, res) => {
    const { pid } = req.params;
    console.log('PUT /api/player/id');
    res.status(200).json({ message: `Put player at ${pid}` });
});

module.exports = router;