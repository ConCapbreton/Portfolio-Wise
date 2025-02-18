const serverBaseUrl =  "http://localhost:4000"

// router.route('/')
//     .post(loginLimiter, login)

//Possible responses from backend: 
//res.status(400).json({message: "All fields are required"})
//res.status(401).json({message: 'Unauthorised'})
//res.json({accessToken}) with the refreshToken sent as a cookie
//res.status(500).json({message: `There was an error: ${err.message}`})
//FROM LOGIN LIMITER: res.status(options.statusCode).send(options.message) - message: { message: "Too many login attempts from this IP, please try again after a 60 second pause" },

export const loginFunction = async (username, password, email) => {
    try {
        const responseJson = await fetch(`${serverBaseUrl}/auth`,
            {   
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                credentials: 'include'
            }
        )
        const response = await responseJson.json()
        return response
    } catch (err) {
        return err
    }
}

// router.route('/refresh')
//     .get(refresh)

//Possible responses from backend: 
// res.status(401).json({message: 'Unauthorized'})
// res.status(403).json({message: 'Forbidden'}) 
// res.status(401).json({message: "Unauthorized"})
// res.json({ accessToken, message: decoded.username }) 
// res.status(500).json({message: `There was an error: ${err.message}`})
export const refreshLogin = async () => {
    try {
        const responseJson = await fetch(`${serverBaseUrl}/auth/refresh`,
            {   
                method: "GET",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                credentials: 'include'
            }
        )
        const response = await responseJson.json()
        return response
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
        const responseJson = await fetch(`${serverBaseUrl}/auth/logout`,
            {   
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                credentials: 'include'
            }
        )
        if (responseJson.status === 204) {
            //if code is 204 there was no cookie to clear (and the response has no body to .json())
            return responseJson.status
        } else {
            const response = await responseJson.json()
            return response
        }
        
    } catch (err) {
        return err
    }
}