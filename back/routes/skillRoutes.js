const express = require('express')
const router = express.Router()
const { getUserSkills, createSkill, updateSkill, deleteSkill } = require('../controllers/skillsController')
const verifyJWT = require('../middleware/verifyJWT')
const uploadWithErrorHandling = require('../middleware/uploadImage')

router.use(verifyJWT)

router.route('/:userId').get(getUserSkills)
router.route('/').delete(deleteSkill)

router.route('/')
    .post(uploadWithErrorHandling, createSkill)
    .patch(uploadWithErrorHandling, updateSkill)

module.exports = router