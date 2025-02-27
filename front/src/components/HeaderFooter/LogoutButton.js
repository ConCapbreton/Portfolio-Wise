import { Button, Modal } from 'antd'
import { useState } from "react"
import {logoutFunction} from "../../services/api/authService"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../../context/authContext" 

const LogoutButton = ({ onClose }) => {
    const [open, setOpen] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [modalText, setModalText] = useState("Are you sure you want to log out?")
    const {setLogin, setAccessToken} = useAuthContext()
    const navigate = useNavigate()
   
    const showModal = () => {
      setOpen(true)
    }

    const handleOk = async () => {
      setConfirmLoading(true)
      const logoutConfirm = await logoutFunction()
      if (logoutConfirm.success) {
        setLogin(false)
        setAccessToken("")
        setOpen(false)
        setConfirmLoading(false)
        onClose()
        navigate('/')
      } else {
        const logoutIssue = logoutConfirm.message ? logoutConfirm.message : "There was an issue and you were not logged out, please try again."
        setModalText(`There was a problem, you were not logged out. Message: ${logoutIssue}`)
      }
    }

    const handleCancel = () => {
      setOpen(false)
    }
  
  return (
    <>
      <Button onClick={showModal} type="primary">Logout</Button>
      <Modal
        title="Logout:"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  )
}

export default LogoutButton
