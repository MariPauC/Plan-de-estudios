// Import required modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');

// Create the Express app
const app = express();


// Route to get all users
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Server - Backend")
})

app.use('/api', apiRoutes);
app.use('/api/auth', authRoutes);
app.use('/uploads', express.static("./uploads"));

// Start the server
const port = process.env.PORT || 5000; // Use the specified port or default to 5000
app.listen(port, () => {
  console.log('Server is running on port'+port);
});

