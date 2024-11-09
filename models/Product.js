const mongoose = require('mongoose');

// Define the schema for the Product model
const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    category: String,
});

// Create and export the Product model based on the schema
module.exports = mongoose.model('Product', ProductSchema);
