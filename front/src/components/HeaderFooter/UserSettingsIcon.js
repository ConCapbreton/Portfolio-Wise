import React, { useState, useEffect } from 'react'
import { Button, Col, Drawer, Form, Input, Row } from 'antd'
import LogoutButton from './LogoutButton'
import { useAuthContext } from "../../context/authContext.js"
import { validateUsername, validateEmail, validatePasswordUpdate } from "../../utils/formChecking.js"
import { updateUser } from "../../services/api/usersService.js"

const UserSettingsIcon = () => {
  const {decodeToken, accessToken} = useAuthContext()
  const [open, setOpen] = useState(false)
  const [editUserMsg, setEditUserMsg] = useState("")
  const [editSuccessMsg, setEditSuccessMsg] = useState("")
  const [editUser, setEditUser] = useState(false)
  const [user, setUser] = useState({
    username: "", 
    email: "", 
    id: "", 
    status: "",
  })
  const [formData, setFormData] = useState({
    newUsername: user.username,
    newEmail: user.email,
    newPassword: '',
    newPasswordCheck: '',
  })
  const [form] = Form.useForm()
  
  //ON PAGE LOAD
  useEffect(() => {
    const {username, email, id, status} = decodeToken(accessToken)
    setUser({
      username,
      email,
      id,
      status,
    })
  }, [accessToken])

  //FORM LOGIC
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value, 
    })
  }

  const registerSubmit = async (e) => {
    e.preventDefault()
    setEditUserMsg("")
    
    formData.newUsername = formData.newUsername === "" ? user.username : formData.newUsername
    formData.newEmail = formData.newEmail === "" ? user.email : formData.newEmail
  
    //CHECK INPUTS
    if (formData.newUsername === user.username && formData.newEmail === user.email && formData.newPassword === "") {
      setEditUserMsg("Your username, email and password are the same as before.")
      return
    }
    const usernameCheck = validateUsername(formData.newUsername)
    if (!usernameCheck.success) {
      setEditUserMsg(usernameCheck.message)
      return
    } 
    const emailCheck = validateEmail(formData.newEmail)
    if (!emailCheck.success) {
      setEditUserMsg(emailCheck.message)
      return
    }
    if (formData.newPassword !== formData.newPasswordCheck) {
      setEditUserMsg("Passwords do not match")
      return
    }
    if (formData.newPassword) {
      const passwordCheck = validatePasswordUpdate(formData.newPassword)
      if (!passwordCheck.success) {
        setEditUserMsg(passwordCheck.message)
        return
      }
    }

    const response = await updateUser(accessToken, user.id, formData.newUsername, formData.newEmail, formData.newPassword)
    
    if (response.success) {
      setUser({
        ...user,
        username: response.response.username,
        email: response.response.email,
      })
      setEditSuccessMsg(response.response.message)
      setEditUser(false)
    } else {
      const editUserIssue = response.response ? response.response.message : "The user details were not updated."
      setEditUserMsg(`It seems there was an issue... Message: ${editUserIssue}. \n`)
    }
  }

  //DRAWER LOGIC
  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
    setEditUser(false)
    setFormData({newUsername: user.username, newEmail: user.email})
    form.resetFields()
  }

  const toggleEditForm = () => {
    setEditUser(prevState => !prevState)
    setEditSuccessMsg("")
    setEditUserMsg("")
    setFormData({newUsername: user.username, newEmail: user.email})
    form.resetFields();
  }

  return (
    <div>
      <svg tabIndex="0" onClick={showDrawer} className="header-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z"/></svg>
      <Drawer
        title={`User ${user.username}'s settings`}
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <div className={editUser ? "hide-element" : "show-element"}>
          <LogoutButton onClose={onClose}/>
          <p>{editSuccessMsg}</p>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>User permissions: {user.status}</p>
          <div className="menu-button-div">
            <Button onClick={toggleEditForm}>Edit</Button>
          </div>
        </div>
        <Form className={editUser ? "show-element" : "hide-element"} layout="vertical" form={form} initialValues={{newUsername: user.username, newEmail: user.email}} hideRequiredMark>
          <div className="menu-button-div">
            <Button onClick={toggleEditForm}>Cancel</Button>
            <Button onClick={registerSubmit} type="primary">Submit</Button>
          </div>
          <p>{editUserMsg}</p>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Userame"
                name="newUsername" 
                rules={[
                  {
                    required: true,
                    type: "text", 
                    minLength: "3", 
                    maxLength: "20", 
                  },
                ]}
              >
                <Input onChange={handleInputChange} name="newUsername" value={formData.username}/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="newEmail"
                rules={[
                  {
                    required: true,
                    type: "email",
                  },
                ]}
              >
                <Input onChange={handleInputChange} name="newEmail" value={formData.email}/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="New password"
                name="newPassword"
                rules={[
                  {
                    required: true,
                    minLength: "6", 
                    message: 'Please enter your new password',
                  },
                ]}
              >
                <Input placeholder="Please enter your password" onChange={handleInputChange} name="newPassword" type="password" value={formData.newPassword}/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Confirm your new password"
                name="newPasswordCheck"
                rules={[
                  {
                    required: true,
                    minLength: "6", 
                    message: 'Please confirm your new password',
                  },
                ]}
              >
                <Input placeholder="Please confirm your password" onChange={handleInputChange} name="newPasswordCheck" type="password" value={formData.newPasswordCheck} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </div>
  )
}

export default UserSettingsIcon