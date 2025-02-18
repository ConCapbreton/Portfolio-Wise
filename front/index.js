//FORMS
const loginForm = document.getElementById("login-form")
const registerForm = document.getElementById("register-form")
const deleteUserForm = document.getElementById("delete-user")
const updateUserForm = document.getElementById("update-user")
//BUTTONS / SUBMITS
const loginRegisterBtn = document.getElementById("login-register-btn")
const logoutBtn = document.getElementById("logout-btn")
const getUsers = document.getElementById("get-users-btn")
const loginSubmit = document.getElementById("login-submit")
//MESSAGES
const messagesP = document.getElementById("messages")
const getUsersMessage = document.getElementById("get-users-message")
const deleteUserMessage = document.getElementById("delete-user-message")
const updateUserMessage = document.getElementById("update-user-message")
//DIVs
const userRoutes = document.getElementById("user-routes")
const getUsersDiv = document.getElementById("get-users-div")

//GLOBAL VARIABLE
let accessToken

//EXAMPLE CODE TO IMPORT IN VANILLA JAVASCRIPT (HTML SCRIPT ELEMENT type="module" (MUST HAVE A SCRIPT ELEMENT PER FILE) - make sure to include file extension in import route)
import { loginFunction, logoutFunction, refreshLogin } from './fetches/authFetches.js'
import { createUser, getAllUsers, deleteUser, updateUser } from './fetches/userFetches.js'
import { validatePassword, validateUsername, validateEmail, validateId } from './formLogic/formLogic.js'

//REFRESHTOKEN ROUTE - CHECK IF USER IS LOGGED IN ALREADY ON PAGE LOAD (NOT RECOMENDED ON PRODUCTION AS YOU GET A MESSAGE IN THE CONSOLE - YOU NEED TO MORE GRACEFULLY HANDLE THE 401 UNauthorized response (eg re-direct to the login page))
const isUserLoggedIn = async () => {
    const response = await refreshLogin()
    if (!response?.accessToken) {
        return
    }
    else {
        accessToken = response.accessToken
        messagesP.innerText = `User ${response.message} is already logged in thanks to the refresh token!`
        loginForm.style.display = "none"
        loginRegisterBtn.style.display = "none"
        logoutBtn.style.display = "block"
        userRoutes.style.display = "block"
    } 
}
isUserLoggedIn()

//LOGIN VS REGISTER TOGGLE BUTTON
loginRegisterBtn.addEventListener("click", () => {
    messagesP.innerText = ""
    loginForm.reset()
    registerForm.reset()
    if (loginRegisterBtn.innerText === "Click to register a new user") {
        loginRegisterBtn.innerText = "Click to login an existing user"
        loginForm.style.display = "none"
        registerForm.style.display = "flex"
    } else {
        loginRegisterBtn.innerText = "Click to register a new user"
        loginForm.style.display = "flex"
        registerForm.style.display = "none"
    }
})

//LOGIN FORM
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault()
    messagesP.innerText = ""
    const username = document.getElementById("login-username").value
    const password = document.getElementById("login-password").value

    //CHECK USERNAME
    const usernameCheck = validateUsername(username)
    if (!usernameCheck.success) {
        messagesP.innerText = usernameCheck.message
        return
    } else if (password === "") {
        //LET BACKEND DO A DETAILED PASSWORD CHECK - FOR THE LOGIN WE WILL JUST CHECK THAT SOMETHING HAS BEEN PROVIDED
        messagesP.innerText = "Please provide a password"
        return
    }

    const response = await loginFunction(username, password)
    
    if (response.accessToken) {
        accessToken = response.accessToken
        messagesP.innerText = `User ${username} is logged in`
        loginRegisterBtn.style.display = "none"
        logoutBtn.style.display = "block"
        loginSubmit.disabled = true
        loginForm.style.display = "none"
        userRoutes.style.display = "block"
        const forms = document.querySelectorAll("form")
        forms.forEach(form => form.reset())
        getUsersMessage.innerText = ""
        getUsersDiv.innerHTML = ""
        deleteUserMessage.innerText = ""
    } else {
        let responseMessage = response.message ? response.message : "Please try and login again"
        messagesP.innerText = `Seems there was an issue... \nMessage: ${responseMessage} \nPlease try and login again`
    }
})

//LOGOUT BUTTON
logoutBtn.addEventListener("click", async () => {
    messagesP.innerText = ""
    const response = await logoutFunction()
    if (response.message === "Cookie cleared") {
        messagesP.innerText = "You successfully logged out"
        loginRegisterBtn.style.display = "block"
        loginForm.style.display = "flex"
        const forms = document.querySelectorAll("form")
        forms.forEach(form => form.reset())
        logoutBtn.style.display = "none"
        loginSubmit.disabled = false
        userRoutes.style.display = "none"
        getUsersMessage.innerText = ""
        deleteUserMessage.innerText = ""
    } else {
        messagesP.innerText = "It seems there may have been an issue, maybe try logging out again."
    }
})

//REGISTER FORM
registerForm.addEventListener("submit", async (event) => {
    event.preventDefault()
    messagesP.innerText = ""
    const username = document.getElementById("register-username").value
    const email = document.getElementById("register-email").value
    const password = document.getElementById("register-password").value
    
    //CHECK USERNAME / EMAIL / PASSWORD
    const usernameCheck = validateUsername(username)
    if (!usernameCheck.success) {
        messagesP.innerText = usernameCheck.message
        return
    } 
    const emailCheck = validateEmail(email)
    if (!emailCheck.success) {
        messagesP.innerText = emailCheck.message
    }
    const passwordCheck = validatePassword(password)
    if (!passwordCheck.success) {
        messagesP.innerText = passwordCheck.message
        return
    } 
    
    const response = await createUser(username, password, email)
    
    if (response.success) {
        messagesP.innerText = response.response.message
        registerForm.style.display = "none"
    } else {
        messagesP.innerText = `It seems there was an issue... Message: ${response.response.message}. \nPlease try again`
    }
})

//JWT PROTECTED ROUTE LOGIC

//GET ALL USERS
getUsers.addEventListener("click", async () => {
    const response = await getAllUsers(accessToken)
    getUsersDiv.innerHTML =""
    getUsersMessage.innerText = "" 

    if (response.message) {
        //YOU COULD ADD LOGIC HERE TO CHECK THE REFRESH ROUTE AS POTENTIALLY THE ACCESSTOKEN IS EXPIRED. ONLY IF THIS IS UNSUCCESFUL CAN YOU DISPLAY THE ERROR TO THE USER.  
        getUsersMessage.innerText = `It seems there was a problem... Message: ${response.message} \nPlease try again`
    } else {
        response.forEach(user => {
            const userP = document.createElement("p")
            userP.className = "userP"
            userP.innerText = `
                Username: ${user.username}
                \nID: ${user._id}
                \nEmail: ${user.email}
                \nActive: ${user.active}
                \nRoles: ${user.roles[0]}
            `
            getUsersDiv.appendChild(userP)
        })
    }
})

//DELETE USER
deleteUserForm.addEventListener("submit", async (event) => {
    event.preventDefault()
    let deleteUserId = document.getElementById("delete-id").value
    deleteUserMessage.innerText = ""

    //CHECK ID
    const checkId = validateId(deleteUserId)
    if (!checkId.success) {
        deleteUserMessage.innerText = checkId.message
        return
    }

    const response = await deleteUser(deleteUserId, accessToken)
    
    if (response.success) {
        deleteUserMessage.innerText = response.response.message
        deleteUserForm.reset()
    } else {
        //YOU COULD ADD LOGIC HERE TO CHECK THE REFRESH ROUTE AS POTENTIALLY THE ACCESSTOKEN IS EXPIRED. ONLY IF THIS IS UNSUCCESFUL CAN YOU DISPLAY THE ERROR TO THE USER.  
        deleteUserMessage.innerText = `It seems there was a problem... Message: ${response.response.message} \n Please try again.`
    }
})

//UPDATE USER
updateUserForm.addEventListener("submit", async (event) => {
    event.preventDefault()
    let updateId = document.getElementById("update-id").value
    let updateUsername = document.getElementById("update-username").value
    let updateEmail = document.getElementById("update-email").value
    let updatePassword = document.getElementById("update-password").value
    updateUserMessage.innerText = ""

    //CHECK ID / USERNAME / EMAIL / PASSWORD
    const checkId = validateId(updateId)
    if (!checkId.success) {
        updateUserMessage.innerText = checkId.message
        return
    }
    const usernameCheck = validateUsername(username)
    if (!usernameCheck.success) {
        messagesP.innerText = usernameCheck.message
        return
    } 
    const emailCheck = validateEmail(email)
    if (!emailCheck.success) {
        messagesP.innerText = emailCheck.message
    }
    const passwordCheck = validatePassword(password)
    if (!passwordCheck.success) {
        messagesP.innerText = passwordCheck.message
        return
    } 

    const response = await updateUser(accessToken, updateId, updateUsername, updateEmail, updatePassword)
    
    if (response.success) {
        updateUserMessage.innerText = response.response.message
        updateUserForm.reset()
    } else {
        //YOU COULD ADD LOGIC HERE TO CHECK THE REFRESH ROUTE AS POTENTIALLY THE ACCESSTOKEN IS EXPIRED. ONLY IF THIS IS UNSUCCESFUL CAN YOU DISPLAY THE ERROR TO THE USER.  
        updateUserMessage.innerText = `It seems there was a problem... Message: ${response.response.message} \n Please try again.`
    }
})