const User = require('../models/User')
const argon2 = require('argon2')

//@desc Get all users
//@route GET /users
//@access Private
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password').lean()
        if (!users?.length) {
            return res.status(400).json({message: 'No users found'})
        }
        res.json(users)
    } catch (err) {
        return res.status(500).json({message: `There was an error: ${err.message}`})
    }
}

//@desc Create new user
//@route POST /users
//@access Private
const createNewUser = async (req, res) => {
    try {
        const { username, password, email, roles } = req.body
        //Confirm data 
        if (!username || !password || !email || !roles || !Array.isArray(roles) || !roles.length) {
            return res.status(400).json({message: "All fields are required"})
        }

        //check to see if the new username or email is already present in the database
        const duplicate = await User.find({$or:[{username: username}, {email: email}]}).lean().exec()

        //if the array still has a user then the email or username you are trying to add exists on another user
        if (duplicate?.length) {
            return res.status(409).json({message: "Duplicate username or email"})
        }

        //Hash the password
        const hashedPwd = await argon2.hash(password)

        const userObject = {
            username, 
            "password": hashedPwd, 
            email, 
            roles
        }
        const user = await User.create(userObject)

        if (user) {
            res.status(201).json({message: `New user ${username} created`})
        } else {
            res.status(400).json({message: 'Invalid user data received'})
        }
    } catch (err) {
        return res.status(500).json({message: `There was an error: ${err.message}`})
    }
}

//@desc Update user
//@route PATCH /users
//@access Private
const updateUser = async (req, res) => {
    //CURRENT CODE REQUIRES A VALUE FOR ALL FIELDS - MAYBE UPDATE TO MAKE THIS OPTIONAL?
    
    try {
        const { id, username, email, roles, active, password } = req.body
        
        if (!id || !username || !email || !roles || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
            return res.status(400).json({message: "All fields are required"})
        }

        const user = await User.findById(id).exec()

        if (!user) {
            return res.status(400).json({message: "User not found"})
        }

        //check to see if the new username or email is already present in the database
        const duplicate = await User.find({$or:[{username: username}, {email: email}]}).lean().exec()
        
        //remove the user that you are trying to update from the array: 
        const duplicateCheck = duplicate.filter(duplicateUser => duplicateUser._id.toString() !== id)

        //if the array still has a user then the email or username you are trying to add exists on another user
        if (duplicateCheck?.length) {
            return res.status(409).json({message: "Duplicate username or email"})
        }
        
        user.username = username
        user.roles = roles
        user.email = email
        user.active = active
    
        if (password) {
            user.password = await argon2.hash(password)
        }

        const updatedUser = await user.save()

        res.json({message: `${updatedUser.username} updated`})

    } catch (err) {
        return res.status(500).json({message: `There was an error: ${err.message}`})
    }
}

//@desc delete user
//@route DELETE /users
//@access Private
const deleteUser = async (req, res) => {
    //NEED TO UPDATE SO A USER CANNOT DELETE THEMSELVES...
    
    try {
        const { id } = req.body

        if (!id) {
            return res.status(400).json({message: 'User ID Required'})
        }

        // IF USER HAS ASSOCIATED DATA THEN HERE YOU NEED TO SEARCH THE DATABASE FOR THIS DATA AND DELETE IT TOO

        const user = await User.findById(id).exec()

        if (!user) {
            return res.status(400).json({message: 'User not found'})
        }

        const deletedUserName = user.username
        const deletedUserid = user._id.toString()

        const result = await user.deleteOne()
        
        if (result.deletedCount > 0) {
            res.json({message: `Username ${deletedUserName} with ID ${deletedUserid} deleted`})
        } else {
            throw new Error(`Username ${deletedUserName} was not deleted`)
        }
        
    } catch (err) {
        return res.status(500).json({message: `There was an error: ${err.message}`})
    }
}

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser, 
    deleteUser
}