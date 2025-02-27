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
const skillRoutes = require('./routes/skillRoutes')

app.use(cors(corsOptions))
app.options('*', cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/skills', skillRoutes)

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