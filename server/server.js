// Import required modules
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');

// Create the Express app
const app = express();
const port = process.env.PORT || 5000; // Use the specified port or default to 5000

// Route to get all users
app.use(cors());

// Create a connection pool for MariaDB
const pool = mysql.createPool({
  host: 'localhost', // Replace with your database host
  user: 'ingenieria', // Replace with your database username
  password: 'planestudios2023', // Replace with your database password
  database: 'db_planestudios', // Replace with your database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the database connection
pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log('Connected to MariaDB!');
  connection.release();
});

app.get('/api/usuario', (req, res) => {
    pool.query('SELECT * FROM usuario', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error retrieving data from the database' });
        }
        res.json(results);
    });
});

// Start the server
app.listen(port, () => {
  console.log('Server is running on port'+port);
});

app.use('/api', apiRoutes);
app.use('/api/auth', authRoutes);