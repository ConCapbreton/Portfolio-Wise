import {useState} from "react"
import PwButton from "../PwButton/PwButton"
import {validateUsername, validateEmail, validatePassword} from "../../utils/formChecking.js"
import { createUser } from "../../services/api/usersService.js"


const SignUpForm = ({showOrHide, setNewUser, setToggleLogin}) => {
  
  const [registerMessage, setRegisterMessage] = useState("")
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordCheck: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value, 
    })
  }

  const registerSubmit = async (e) => {
    e.preventDefault()
    setRegisterMessage("")
  
    //CHECK INPUTS
    const usernameCheck = validateUsername(formData.username)
    if (!usernameCheck.success) {
      setRegisterMessage(usernameCheck.message)
      return
    } 
    const emailCheck = validateEmail(formData.email)
    if (!emailCheck.success) {
      setRegisterMessage(emailCheck.message)
      return
    }
    if (formData.password !== formData.passwordCheck) {
      setRegisterMessage("Passwords do not match")
      return
    }
    const passwordCheck = validatePassword(formData.password)
    if (!passwordCheck.success) {
      setRegisterMessage(passwordCheck.message)
      return
    } 

    const response = await createUser(formData.username, formData.password, formData.email)
    
    if (response.success) {
      setNewUser(`${response.response.message}! \nPlease login.`)
      setToggleLogin(false)
      setFormData({
        username: '',
        email: '',
        password: '',
        passwordCheck: '',
      })
    } else {
      let createUserIssue = response.response ? response.response : "Please try again"
      setRegisterMessage(`It seems there was an issue... Message: ${createUserIssue}`)
    }
  }

  return (
    <form id="register-form" className={showOrHide ? "flex-element" : "hide-element"}>
      <h2>Sign up a new user</h2>
      <p>{registerMessage}</p>
      <label htmlFor="register-username">Username</label>
      <input 
        id="register-username" 
        type="text" 
        minLength="3" 
        maxLength="20" 
        required
        name="username"
        value={formData.username}
        onChange={handleInputChange}
      />
      <label htmlFor="register-email">Email</label>
      <input 
        id="register-email" 
        type="email" 
        required
        name="email"
        value={formData.email}
        onChange={handleInputChange}
      />
      <label htmlFor="register-password">Password</label>
      <input 
        id="register-password" 
        type="password" 
        minLength="6" 
        required
        name="password"
        value={formData.password}
        onChange={handleInputChange}
      />
      <label htmlFor="confirm-password">Confirm password</label>
      <input 
        id="confirm-password" 
        type="password" 
        minLength="6" 
        required
        name="passwordCheck"
        value={formData.passwordCheck}
        onChange={handleInputChange}
      />
      <PwButton buttonType="Submit" onclickFun={registerSubmit} />
    </form>
  )
}

export default SignUpForm
