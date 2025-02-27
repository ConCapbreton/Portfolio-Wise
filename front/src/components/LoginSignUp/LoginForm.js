import {useState} from "react"
import PwButton from '../PwButton/PwButton'
import {validateUsername} from "../../utils/formChecking.js"
import {loginFunction} from "../../services/api/authService.js"
import { useAuthContext } from "../../context/authContext.js"
import { useNavigate } from "react-router-dom";

const LoginForm = ({showOrHide, newUser, setNewUser}) => {
  const navigate = useNavigate()
  const { setAccessToken, setLogin } = useAuthContext()
  const [loginMessage, setLoginMessage] = useState("")
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value, 
    })
  }
  
  const loginSubmit = async (e) => {
    e.preventDefault()
    setLoginMessage("")
    setNewUser("")
  
    //CHECK USERNAME
    const usernameCheck = validateUsername(formData.username)
    if (!usernameCheck.success) {
      setLoginMessage(usernameCheck.message)
      return
    } else if (formData.password === "") {
      //LET BACKEND DO A DETAILED PASSWORD CHECK - FOR THE LOGIN WE WILL JUST CHECK THAT SOMETHING HAS BEEN PROVIDED
      setLoginMessage("Please provide a password")
      return
    }
    
    const response = await loginFunction(formData.username, formData.password)
    if (response.accessToken) {
      setAccessToken(response.accessToken)
      setLogin(true)
      navigate(`/portfolio`)
    } else {
      let responseMessage = response.response ? response.response.data.message : "Please try and login again"
      setLoginMessage(`Seems there was an issue... \nMessage: ${responseMessage}`)
    }
  }

  return (
    <form id="login-form" className={showOrHide ? "hide-element" : "flex-element"}>
      <h2>Login</h2>
      <p>{loginMessage}{newUser}</p>
      <label htmlFor="login-username">Username</label>
      <input 
        id="login-username" 
        type="text" 
        minLength="3" 
        maxLength="20" 
        required 
        name="username"
        value={formData.username}
        onChange={handleInputChange}
      />
      <label htmlFor="login-password">Password</label>
      <input 
        id="login-password" 
        type="password" 
        required 
        name="password"
        value={formData.password}
        onChange={handleInputChange}
      />
      <PwButton buttonType="Submit" onclickFun={loginSubmit} />
    </form> 
  )
}

export default LoginForm