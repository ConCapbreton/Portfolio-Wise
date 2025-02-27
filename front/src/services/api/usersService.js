import axios from 'axios'

//ONLY THE CREATE USER ROUTE IS UNPROTECTED - ALL THE REST ARE JWT VERIFIED

// router.route('/')
//     .get(getAllUsers)

// Possible backend responses: 
// res.status(400).json({message: 'No users found'})
// res.json(users)
// res.status(500).json({message: `There was an error: ${err.message}`}) 
// FROM verifyJWT middleware: 
// res.status(401).json({message: "Unauthorized"})
// res.status(403).json({message: "Forbidden"})

export const getAllUsers = async (accessToken) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/users`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": `Bearer ${accessToken}`,
      },
      withCredentials: true, 
    })
      
    return response.data  
  } catch (err) {
    return err ? err.message : "An error occured."
  }
}

// router.route('/').post(createNewUser)

// Possible backend responses: 
// res.status(400).json({message: "All fields are required"})
// res.status(409).json({message: "Duplicate username or email"})
// res.status(201).json({message: `New user ${username} created`})
// res.status(400).json({message: 'Invalid user data received'})
// res.status(500).json({message: `There was an error: ${err.message}`})

export const createUser = async (username, password, email) => {
  try {
    // Send POST request using axios
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/users`,
      {
        username: username,
        password: password,
        email: email,
        roles: ["Basic"],
      },
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        withCredentials: true, 
      }
    )

    if (response.status === 201) {
      return {
        success: true,
        response: response.data, 
      }
    } else {
      return {
        success: false,
        response: response.data,
      }
    }
  } catch (err) {
    console.log(err)
    return {
      success: false,
      response: err ? err.message : "An error occured."
    }
  }
}

// router.route('/')
//     .delete(deleteUser)

// Possible backend responses: 
// res.status(400).json({message: 'User ID Required'})
// res.status(400).json({message: 'User not found'})
// res.json({message: `Username ${deletedUserName} with ID ${deletedUserid} deleted`})
// res.status(500).json({message: `There was an error: ${err.message}`})
// FROM verifyJWT middleware: 
// res.status(401).json({message: "Unauthorized"})
// res.status(403).json({message: "Forbidden"})

export const deleteUser = async (adminId, id, accessToken) => {
  try {
    const responseJson = await fetch(`${process.env.REACT_APP_API_URL}/users/admin`,
      {   
        method: "DELETE",
        body: JSON.stringify({
          adminId: adminId,
          id: id,
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
      return  {
        success: false,
        response: response,
      }
    }
      
  } catch (err) {
    return  {
      success: false,
      message: err.message || 'An error occurred',
    }
  }
}

// router.route('/')
//     .patch(updateUser)

//Possible backend responses: 
// res.status(400).json({message: "All fields are required"})
// res.status(400).json({message: "User not found"})
// res.status(409).json({message: "Duplicate username or email"})
// res.json({message: `User ${updatedUser.username} updated!`, username: updatedUser.username, email: updatedUser.email})
// res.status(500).json({message: `There was an error: ${err.message}`})
// FROM verifyJWT middleware: 
// res.status(401).json({message: "Unauthorized"})
// res.status(403).json({message: "Forbidden"})

export const updateUser = async (accessToken, id, username, email, password) => {
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_API_URL}/users`,
      {
        id: id,
        username: username,
        password: password,
        email: email,
      },
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Authorization": `Bearer ${accessToken}`,
        },
        withCredentials: true, 
      }
    )

    if (response.status === 200) {
      return {
        success: true,
        response: response.data,
      }
    } else {
      return {
        success: false,
        response: response.data,
      }
    }
  } catch (err) {
    return {
      success: false,
      message: err.message || 'An error occurred',
    }
  }
}

// router.route('/')
//     .patch(updateUser)

//Possible backend responses: 
// res.status(400).json({message: "All fields are required"})
// res.status(400).json({message: "User not found"})
// res.status(409).json({message: "Duplicate username or email"})
// res.json({message: `User ${updatedUser.username} updated!`})
// res.status(500).json({message: `There was an error: ${err.message}`})
// FROM verifyJWT middleware: 
// res.status(401).json({message: "Unauthorized"})
// res.status(403).json({message: "Forbidden"})

export const adminUpdateUser = async (adminId, id, active, roles, accessToken) => {
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_API_URL}/users/admin`,
      {
        adminId: adminId,
        id: id,
        active: active,
        roles: roles,
      },
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Authorization": `Bearer ${accessToken}`,
        },
        withCredentials: true, 
      }
    )

    if (response.status === 200) {
      return {
        success: true,
        response: response.data,
      }
    } else {
      return {
        success: false,
        response: response.data,
      }
    }
  } catch (err) {
    return {
      success: false,
      message: err.message || 'An error occurred',
    }
  }
}