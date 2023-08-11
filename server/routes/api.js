const express = require('express');
const router = express.Router();
const pool = require('../database/database')

/*router.get('/api/usuario', async function(req, res) {
        try{
                const rows = await pool.query('SELECT * FROM usuario', (err, result))
                res.status(200).json(rows)
        } catch(error){
                res.status(400).send(erro.message)
        }

});*/


// Define a sample route to test the API
router.get('/sample', (req, res) => {
        res.json({ message: 'Sample API route is working!' });
});

router.get('/usuario', (req, res) => {
        pool.query('SELECT * FROM usuario', (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Error retrieving data from the database' });
            }
            res.json(results);
        });
    });

// Add more API routes here

module.exports = router;