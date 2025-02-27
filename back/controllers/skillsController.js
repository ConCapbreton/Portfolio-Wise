const Skill = require('../models/Skill')
const User = require('../models/User')
const deleteCloudinaryImg = require('../services/deleteCloudinaryImg')

//@desc Get user skills
//@route GET /skills
//@access Private
const getUserSkills = async (req, res) => {
    //search the skill model using the userId to all their skills
    try {
        const {userId} = req.params
        const skills = await Skill.find({userId: userId}).lean()
        if (!skills?.length) {
            return res.status(400).json({message: 'No skills found'})
        }
        res.json(skills)
    } catch (err) {
        return res.status(500).json({message: `There was an error: ${err.message}`})
    }
}

//@desc Create new skill
//@route POST /skills
//@access Private
const createSkill = async (req, res) => {
    try {
        const { title, category, level, id } = req.body
        let imageUrl = ""
    
        if (req.file?.path) {
            imageUrl = req.file.path
        }
        
        //Confirm data 
        if (!title || !category || !level || !id ) {
            return res.status(400).json({message: "All fields, except image, are required"})
        }

        //CHECK THE USER EXISTS: 
        const user = await User.findById(id).exec()

        if (!user) {
            return res.status(400).json({message: "User not found"})
        }

        const skillObject = {
            title, 
            category, 
            level,
            image: imageUrl,
            userId: id,
        }

        const skill = await Skill.create(skillObject)

        if (skill) {
            res.status(201).json({message: `New skill ${title} created`, skill})
        } else {
            res.status(400).json({message: 'Invalid data received'})
        }
    } catch (err) {
        return res.status(500).json({message: `There was an error: ${err.message}`})
    }
}

//@desc Update skill
//@route PATCH /skills
//@access Private
const updateSkill = async (req, res) => {
    
    try {
        const { id, title, category, level } = req.body
        
        //Confirm data 
        if (!title || !category || !level || !id ) {
            return res.status(400).json({message: "All fields, except image, are required"})
        }

        const skill = await Skill.findById(id).exec()

        if (!skill) {
            return res.status(400).json({message: "Skill not found"})
        }

        let imageUrl
        if (req.file?.path) {
            imageUrl = req.file.path
            const publicId = skill.image.split('/').pop().split('.')[0]
            await deleteCloudinaryImg(publicId)
        } else {
            imageUrl = skill.image
        }
        
        skill.title = title
        skill.category = category
        skill.level = level
        skill.image = imageUrl
    
        const updatedSkill = await skill.save()

        res.json({message: `Skill with title: ${updatedSkill.title} updated`, updatedSkill})

    } catch (err) {
        return res.status(500).json({message: `There was an error: ${err.message}`})
    }
}

//@desc delete user
//@route DELETE /users
//@access Private
const deleteSkill = async (req, res) => {
    
    try {
        const { id } = req.body
        
        if (!id) {
            return res.status(400).json({message: 'Skill ID Required'})
        }

        const skill = await Skill.findById(id).exec()
        
        if (!skill) {
            return res.status(400).json({message: 'Skill not found'})
        }
        
        if (skill.image || skill.image !== "") {
            const publicId = skill.image.split('/').pop().split('.')[0]
            await deleteCloudinaryImg(publicId)
        }
        
        const deletedSkill = skill.title
        const deletedSkillId = skill._id.toString()

        const result = await skill.deleteOne()
        

        if (result.deletedCount > 0) {
            res.json({message: `Skill ${deletedSkill} with ID ${deletedSkillId} deleted`})
        } else {
            throw new Error(`Skill ${deletedSkill} was not deleted`)
        }
        
    } catch (err) {
        return res.status(500).json({message: `There was an error: ${err.message}`})
    }
}

module.exports = {
    getUserSkills,
    createSkill,
    updateSkill, 
    deleteSkill
}