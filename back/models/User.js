const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,   
        trim: true, // Remove whitespace from both ends of the username
        minlength: [3, 'Username must be at least 3 characters long'],  // Minimum length validation
        maxlength: [20, 'Username must be at most 20 characters long'],  // Maximum length validation
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long'],  // Minimum length for password
    },
    email: {
        type: String,
        required: true,          // Make the email required
        unique: true,            // Ensure the email is unique
        lowercase: true,         // Converts the email to lowercase
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'], // Regex to validate email format
      },
    roles: [{
        type: String,
        default: "Basic"
    }],
    active: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model("User", userSchema)