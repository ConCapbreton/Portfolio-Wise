import { createContext, useContext, useState } from 'react';
import {jwtDecode} from 'jwt-decode'
import { refreshLogin } from "../services/api/authService" 

const AuthContext = createContext()

const AuthContextProvider = ({ children = null }) => {
  const [accessToken, setAccessToken] = useState("")
  const [login, setLogin] = useState(false)
  
  const checkLogin = async (token) => {
    const loggedIn = await refreshLogin(token)
    if (!loggedIn?.accessToken) {
      return {success: false}
    }
    else {
      setLogin(true)
      setAccessToken(loggedIn.accessToken)
      return {
        success: true,
        accessToken: loggedIn.accessToken
      }
    }  
  }

  let isAdmin = false
  let status = "Basic" // (default)
  const decodeToken = (token) => {
    if (token !== "") {
      const decoded = jwtDecode(token)
      const { username, roles, email, id, active } = decoded.UserInfo
      isAdmin = roles.includes('Admin')
      if (isAdmin) status = "Admin"
      return  {username, email, id, active, isAdmin, status}
    }
    //no token - return empty values
    return {username: '', roles: [], isAdmin, status}
  }
  
  return (
    <AuthContext.Provider value={{accessToken, setAccessToken, decodeToken, login, setLogin, checkLogin}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
export const useAuthContext = () => useContext(AuthContext)