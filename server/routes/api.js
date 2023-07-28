const express = require('express');
const router = express.Router();

// Define a sample route to test the API
router.get('/sample', (req, res) => {
        res.json({ message: 'Sample API route is working!' });
});

// Add more API routes here

module.exports = router;