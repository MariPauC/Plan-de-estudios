const mysql = require('mysql2');
const config = require('../config')

// Create a connection pool for MariaDB
const pool = mysql.createPool({
    host: config.host, 
    user: config.user, 
    database: config.database,
    password: config.password, 
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

module.exports = pool;