const mongoose = require('mongoose')

const skillSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, 
        trim: true, 
        minlength: [3, 'Skill title must be at least 3 characters long'],  // Minimum length validation
        maxlength: [20, 'Skill title must be at most 20 characters long'],  // Maximum length validation
    },
    category: {
        type: String,
        required: true,
        trim: true, 
        minlength: [3, 'Skill category must be at least 3 characters long'],  // Minimum length validation
        maxlength: [20, 'Skill category must be at most 20 characters long'],  // Maximum length validation
    },
    level: {
        type: String,
        required: true,          
        enum: ['Beginner', 'Intermediate', 'Advanced'], // Enum for level validation
      },
    image: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model("Skill", skillSchema)