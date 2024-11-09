const mongoose = require('mongoose');

// Define the User schema
const UserSchema = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true },  // Ensure email is unique
    password: String,
});

// Export the User model
module.exports = mongoose.model('User', UserSchema);
