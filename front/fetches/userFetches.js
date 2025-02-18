const serverBaseUrl =  "http://localhost:4000"

//ONLY THE CREATE USER ROUTE IS UNPROTECTED - ALL THE REST ARE JWT VERIFIED
// router.route('/').post(createNewUser)
// router.use(verifyJWT)

// router.route('/')
//     .get(getAllUsers)
//     .patch(updateUser)
//     .delete(deleteUser)


// router.route('/')
//     .get(getAllUsers)

//Possible backend responses: 
// res.status(400).json({message: 'No users found'})
// res.json(users)
// res.status(500).json({message: `There was an error: ${err.message}`}) 
// FROM verifyJWT middleware: 
// res.status(401).json({message: "Unauthorized"})
// res.status(403).json({message: "Forbidden"})

export const getAllUsers = async (accessToken) => {
    try {
        const responseJson = await fetch(`${serverBaseUrl}/users`,
            {   
                method: "GET",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": `Bearer ${accessToken}`
                },
                credentials: 'include'
            }
        )
        const response = responseJson.json()
        return response
    } catch (err) {
        return err
    }  
}

// router.route('/').post(createNewUser)

//Possible backend responses: 
// res.status(400).json({message: "All fields are required"})
// res.status(409).json({message: "Duplicate username or email"})
// res.status(201).json({message: `New user ${username} created`})
// res.status(400).json({message: 'Invalid user data received'})
// res.status(500).json({message: `There was an error: ${err.message}`})

export const createUser = async (username, password, email) => {
    try {
        const responseJson = await fetch(`${serverBaseUrl}/users`,
            {   
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    password: password,
                    email: email,
                    roles: ["Basic"]
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                credentials: 'include'
            }
        )
        
        const response = await responseJson.json()
        if (responseJson.status === 201) {
            return {
                success: true,
                response: response,
            }
        } else {
            return {
                success: false,
                response: response,
            }
        }
    } catch (err) {
        return {
            success: false,
            response: err,
        }
    }
}

// router.route('/')
//     .delete(deleteUser)

//Possible backend responses: 
// res.status(400).json({message: 'User ID Required'})
// res.status(400).json({message: 'User not found'})
// res.json({message: `Username ${deletedUserName} with ID ${deletedUserid} deleted`})
// res.status(500).json({message: `There was an error: ${err.message}`})
// FROM verifyJWT middleware: 
// res.status(401).json({message: "Unauthorized"})
// res.status(403).json({message: "Forbidden"})

export const deleteUser = async (id, accessToken) => {
    try {
        const responseJson = await fetch(`${serverBaseUrl}/users`,
            {   
                method: "DELETE",
                body: JSON.stringify({
                    id: id,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": `Bearer ${accessToken}`
                },
                credentials: 'include'
            }
        )
        // 400 "User ID Required"
        // 403 "Forbidden"
        //500
        //message: 'Username Harry with ID 67ae00f767ca520c0d2b3e16 deleted'
        const response = await responseJson.json()
        if (responseJson.ok) {
            return {
                success: true,
                response: response,
            }
        } else {
            return  {
                success: false,
                response: response,
            }
        }
        
    } catch (err) {
        return  {
            success: false,
            message: err.message,
        }
    }
}

// router.route('/')
//     .patch(updateUser)

//Possible backend responses: 
// res.status(400).json({message: "All fields are required"})
// res.status(400).json({message: "User not found"})
// res.status(409).json({message: "Duplicate username or email"})
// res.json({message: `${updatedUser.username} updated`})
// res.status(500).json({message: `There was an error: ${err.message}`})
// FROM verifyJWT middleware: 
// res.status(401).json({message: "Unauthorized"})
// res.status(403).json({message: "Forbidden"})

export const updateUser = async (accessToken, id, username, email, password) => {
    //id, username, email, roles, active, password
    try {
        const responseJson = await fetch(`${serverBaseUrl}/users`,
            {   
                method: "PATCH",
                body: JSON.stringify({
                    id: id,
                    username: username,
                    password: password,
                    email: email,
                    roles: ["Basic"],
                    active: true,
                    password: password,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": `Bearer ${accessToken}`
                },
                credentials: 'include'
            }
        )
        
        const response = await responseJson.json()
        if (responseJson.ok) {
            return {
                success: true,
                response: response,
            }
        } else {
            return {
                success: false,
                response: response,
            }
        }
    } catch (err) {
        return {
            success: false,
            message: err.message,
        }
    }
}