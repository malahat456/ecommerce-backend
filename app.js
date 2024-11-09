const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');  // Import auth routes
const productRoutes = require('./routes/products');  // Import product routes
const app = express();
const cors = require('cors');
app.use(cors()); // Enable CORS for all routes

// Middleware to parse incoming JSON requests
app.use(express.json()); // Use express.json() to parse JSON

// MongoDB connection (using environment variables)
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce'; // Use env variable for URI
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Database connected'))
.catch(err => console.error('Database connection error:', err));

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

// Use the authentication routes
app.use('/auth', authRoutes);

// Use the product routes (this is important to make the /products endpoint work)
app.use('/products', productRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
