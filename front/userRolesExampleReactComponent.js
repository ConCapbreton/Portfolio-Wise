// HOW DO USER ROLES WORK?!?!?!
// In the case of this project we will have two roles (Basic - the default and Admin (extra permissions))
// In the authController when the jwt access token is created the roles of a user are added (in the UserInfo property of the token). 
//{
//     "UserInfo": {
//         "username": foundUser.username,
//         "roles": foundUser.roles,
//     }
// },

// In the front end add the JWT DECODE dependency (npm i jwt-decode) to decode the information stored in the accessToken. 
// In React you can create a custom hook to check the user roles
// FRONT END CODE example:

import jwtDecode from 'jwt-decode'
let isAdmin = false
let status = "Basic" // (default)

const useAuth = (token) => {
  
  if (token) {
    const decoded = jwtDecode(token)
    const { username, roles } = decoded.UserInfo

    isAdmin = roles.includes('Admin')

    if (isAdmin) status = "Admin"

    return {username, roles, isAdmin, status}
  }

  //no token - return empty values
  return {username: '', roles: [], isAdmin, status}
}

// In the component where you want to then check the users roles you can destructure the returned values.
// For example:  
import useAuth from "../hooks/useAuth"
const {username, roles, isAdmin, status} = useAuth(token)

// You then have all the state you might need in order to display the features that the user with those roles has access: 
// For example in this app you could make it so only users with "Admin" roles can delete users: 
if (isAdmin) {
  deleteUserForm.style.display = "block"
}  else {
  deleteUserForm.style.display = "none"
}

// In your app it would be better if the deleteUserForm was only created if the user has the "Admin" role...