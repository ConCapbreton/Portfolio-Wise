const User = require('../models/User')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

//@desc Login
//@route POST /auth
//@access Public
const login = async (req, res) => {
    try {
        const {username, password } = req.body

    if(!username || !password) {
        return res.status(400).json({message: "All fields are required"})
    }

    const foundUser = await User.findOne({username})

    if (!foundUser || !foundUser.active) {
        return res.status(401).json({message: 'Unauthorised'})
    }

    const match = await argon2.verify(foundUser.password, password)

    if (!match) return res.status(401).json({message: "Unauthorised"})

    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "username": foundUser.username,
                "roles": foundUser.roles,
                "email": foundUser.email,
                "id": foundUser._id,
                "active": foundUser.active,
            }
        },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' } //IN PRODUCTION SET THIS TO 15 minutes
    )

    const refreshToken = jwt.sign(
        {"username": foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '7d'} //IN PRODUCTION SET THIS TO MAXIMUM 7 DAYS 
    )

    res.cookie('jwt', refreshToken, {
        httpOnly: true, //accessible only by web server
        secure: true, //https
        sameSite: "None", //cross-site cookie (hosting API and application on another so need this to be None)
        maxAge: 7 * 24 * 60 *60 * 1000 //cookie expiry set to 7 days (ready for changing the refreshToken expiresIn to 7d when going to production)
    })

    res.json({accessToken})
    } catch (err) {
        return res.status(500).json({message: `There was an error: ${err.message}`})
    }
    
}

//@desc Refresh
//@route GET /auth/refresh
//@access Public - because access token has expired 
const refresh = (req, res) => {
    try {
        const cookies = req.cookies

        if (!cookies?.jwt) return res.status(401).json({message: 'Unauthorized'})
        
        const refreshToken = cookies.jwt

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET, 
            async (err, decoded) => {
                if (err) return res.status(403).json({message: 'Forbidden'}) 
                
                const foundUser = await User.findOne({username: decoded.username})

                if (!foundUser) return res.status(401).json({message: "Unauthorized"})

                const accessToken = jwt.sign(
                    {
                        "UserInfo": {
                            "username": foundUser.username,
                            "roles": foundUser.roles,
                            "email": foundUser.email,
                            "id": foundUser._id,
                            "active": foundUser.active,
                        }
                    },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: '15m' } //IN PRODUCTION SET THIS TO 15 minutes
                )

                res.json({ accessToken, message: decoded.username })
            }
        )
    } catch (err) {
        return res.status(500).json({message: `There was an error: ${err.message}`})
    }
}

//@desc Logout
//@route Post /auth/logout
//@access Public - just to clear cookie if exists
const logout = (req, res) => {
    try {
        const cookies = req.cookies
        if (!cookies?.jwt) return res.sendStatus(204) //NO CONTENT
        res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true}) 
        res.json({message: "Cookie cleared"})
    } catch (err) {
        return res.status(500).json({message: `There was an error: ${err.message}`})
    }
}

module.exports = {
    login, 
    refresh,
    logout
}