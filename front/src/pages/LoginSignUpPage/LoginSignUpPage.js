import "./LoginSignUpPage.css"
import PwButton from "../../components/PwButton/PwButton" 
import LoginForm from "../../components/LoginSignUp/LoginForm"
import SignUpForm from "../../components/LoginSignUp/SignUpForm"
import { useState, useEffect  } from "react"
import { useNavigate } from "react-router-dom"
import NavBar from "../../components/HeaderFooter/NavBar.js"
import Footer from "../../components/HeaderFooter/Footer.js"
import { useAuthContext } from "../../context/authContext.js"

const LoginSignUpPage = () => {
  const [toggleLogin, setToggleLogin] = useState(false)
  const [newUser, setNewUser] = useState(false)
  const { accessToken, checkLogin } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    const pageLoadLoginCheck = async () => {
      const isLoggedIn = await checkLogin(accessToken)
        if (isLoggedIn.success) {
          navigate(`/portfolio`)
        } else {
          return
        }
    }
    pageLoadLoginCheck()
  }, [])

  return (
    <>
      <NavBar />
      <div className="page">
        <h1>Welcome to PortfolioWise!</h1>
        <div id="login-btns">
          <PwButton buttonType={"Login"} onclickFun={() => {setToggleLogin(false)}}/>
          <PwButton buttonType={"Sign Up"} onclickFun={() => {setToggleLogin(true)}}/>
        </div>
        <div id="form-div">
          <LoginForm showOrHide={toggleLogin} newUser={newUser} setNewUser={setNewUser}/>
          <SignUpForm showOrHide={toggleLogin} setNewUser={setNewUser} setToggleLogin={setToggleLogin}/>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default LoginSignUpPage