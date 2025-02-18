const express = require('express')
const router = express.Router()
const { getAllUsers, createNewUser, updateUser, deleteUser } = require('../controllers/usersController')
const verifyJWT = require('../middleware/verifyJWT')

router.route('/').post(createNewUser)

router.use(verifyJWT)

router.route('/')
    .get(getAllUsers)
    .patch(updateUser)
    .delete(deleteUser)

module.exports = router