require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3500
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')

app.use(cors(corsOptions))
app.options('*', cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
  
//IN THE INDIVIDUAL ROUTES FILES, BEFORE THE ROUTES THAT NEED A USER TO BE LOGGED IN:
// const verifyJWT = require('../middleware/verifyJWT')
// router.use(verifyJWT)

app.use('/auth', authRoutes)
app.use('/users', userRoutes)

mongoose.connect(process.env.DATABASE_URI)
    .then(() => {
        console.log(`${process.env.NODE_ENV} \nConnected to the database`)
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    })
    .catch((err) => {
        console.log("Not connected to the DB", err)
    }
)