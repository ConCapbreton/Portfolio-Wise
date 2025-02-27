import axios from 'axios'

// router.route('/')
//     .post(loginLimiter, login)

// Possible responses from backend: 
// res.status(400).json({message: "All fields are required"})
// res.status(401).json({message: 'Unauthorised'})
// res.json({accessToken}) with the refreshToken sent as a cookie
// res.status(500).json({message: `There was an error: ${err.message}`})
// FROM LOGIN LIMITER: 
// res.status(options.statusCode).send(options.message) - message: { message: "Too many login attempts from this IP, please try again after a 60 second pause" },

export const loginFunction = async (username, password) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/auth`, 
            {
                username: username,
                password: password
            },
            {
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                withCredentials: true 
            }
        )
        return response.data
    } catch (err) {
        return err
    }
}

// router.route('/refresh')
//     .get(refresh)

// Possible responses from backend: 
// res.status(401).json({message: 'Unauthorized'})
// res.status(403).json({message: 'Forbidden'}) 
// res.status(401).json({message: "Unauthorized"})
// res.json({ accessToken, message: decoded.username }) 
// res.status(500).json({message: `There was an error: ${err.message}`}) 

export const refreshLogin = async () => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/auth/refresh`,
            {
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                withCredentials: true // Equivalent to 'credentials: include' in fetch
            }
        )
        
        return response.data
        
    } catch (err) {
        return err
    }
}

// router.route('/logout')
//     .post(logout)

// Possible responses from backend: 
// res.sendStatus(204) //NO CONTENT
// res.json({message: "Cookie cleared"})
// res.status(500).json({message: `There was an error: ${err.message}`})

export const logoutFunction = async () => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/auth/logout`, 
            {},
            {
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                withCredentials: true 
            }
        )

        if (response) {
            return {success: true}
        } else {
            return {success: false}
        }

    } catch (err) {
        return {
            success: false,
            message: err.response ? err.response.data : "There was an issue and you were not logged out."
        }
    }
}