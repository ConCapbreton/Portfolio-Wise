import "./UserListPage.css"
import NavBar from "../../components/HeaderFooter/NavBar.js"
import Footer from "../../components/HeaderFooter/Footer.js"
import EditUserModal from "../../components/EditUserModal.js"
import { useAuthContext } from "../../context/authContext.js"
import { getAllUsers } from "../../services/api/usersService.js"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const UserListPage = () => {
  const { accessToken, checkLogin, decodeToken } = useAuthContext()
  const [users, setUsers] = useState()
  const [usersRender, setUsersRender] = useState()
  const [open, setOpen] = useState(false)
  const [oneUser, setOneUser] = useState()
  const [editedUser, setEditedUser] = useState()
  const [deletedUser, setDeletedUser] = useState()
  const [adminMsg, setAdminMsg] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const getUsers = async () => {
      const isLoggedIn = await checkLogin(accessToken)
      if (isLoggedIn.success) {
        const response = await getAllUsers(isLoggedIn.accessToken)
        setUsers(response)
      } else {
        navigate('/')
      }
    }
    getUsers()
  }, [])

  useEffect(() => {
    if (!editedUser) {return}
    const userIndex = users.findIndex(user => user._id === editedUser._id)
    if (userIndex !== -1) {
      const updatedUsers = [...users]
      updatedUsers[userIndex] = editedUser
      setUsers(updatedUsers)
    }
  }, [editedUser])
  
  useEffect(() => {
    if (!deletedUser) {return}
    const usersLessDeleted = users.filter(user => {
      return user._id !== deletedUser._id
    })
    setUsers(usersLessDeleted)
  }, [deletedUser])

  useEffect(() => {
    if (!users?.length) {
      setUsersRender([<p>No users were found!</p>])
      return
    }

    const { id, status } = decodeToken(accessToken)
    const usersLessUser = users.filter(user => {
      return user._id !== id
    })

    if (!usersLessUser?.length) {
      setUsersRender([<p>No users were found!</p>])
      return
    }

    const reversedUsers = usersLessUser.toReversed()

    if (status === "Admin") {
      const userList = reversedUsers.map((user) => {
        return (
          <div id={user._id} key={user._id} className="user-card" >
            <p><strong>User: </strong>{user.username}</p>
            <p><strong>Email: </strong>{user.email}</p>
            <p><strong>Account active: </strong>{user.active ? "Yes" : "No"}</p>
            <div className="user-btn-div">
              <button id={user._id} onClick={navUser} value={user.username}>View {user.username}'s profile</button>
              <button id={user._id} onClick={editUser}>Edit {user.username}'s profile</button>
            </div>
          </div>
        )
      })
      setUsersRender(userList)
    } else {
      const userList = reversedUsers.map((user) => {
        return (
          <div id={user._id} key={user._id} className="user-card" >
            <p><strong>User: </strong>{user.username}</p>
            <p><strong>Email: </strong>{user.email}</p>
            <p><strong>Account active: </strong>{user.active ? "Yes" : "No"}</p>
            <button id={user._id} onClick={navUser} value={user.username} >View {user.username}'s profile</button>
          </div>
        )
      })
      setUsersRender(userList)
    }
    
   }, [users])

  const navUser = (event) => {
    setAdminMsg("")
    const eventId = event.target.id
    const username = event.target.value
    navigate(`/userportfolio/${eventId}/${username}`)
  }

  const editUser = (event) => {
    setAdminMsg("")
    const eventId = event.target.id
    const userToEdit = users.find(user => user._id === eventId)
    setOneUser(userToEdit)
    setOpen(true)
  }

  return (
    <>
      <NavBar />
      <div className="page">
        <h1>Users List</h1>
        <p>{adminMsg}</p>
        <div>{usersRender}</div>
      </div>
      <EditUserModal open={open} setOpen={setOpen} oneUser={oneUser} setOneUser={setOneUser} setEditedUser={setEditedUser} setDeletedUser={setDeletedUser} setAdminMsg={setAdminMsg}/>
      <Footer />
    </>
  )
}

export default UserListPage