import { Modal } from 'antd'
import { useState, useEffect } from 'react'
import { useAuthContext } from '../context/authContext'
import { deleteUser } from '../services/api/usersService'

const ConfirmUserDeleteModal = ({openDelete, setOpenDelete, oneUser, setDeletedUser, setAdminMsg}) => {
    const {decodeToken, accessToken} = useAuthContext()
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [username, setUsername] = useState()
    const [modalMsg, setModalMsg] = useState("")

    useEffect(() => {
        if (!oneUser) {return}
        setUsername(oneUser.username)
    }, [oneUser])

    const handleOk = async () => {
        setConfirmLoading(true)
        const {id} = decodeToken(accessToken)
        const response = await deleteUser(id, oneUser._id, accessToken)
        
        if (response.success) {
            setDeletedUser(oneUser)
            setAdminMsg(response.response.message)
            setModalMsg("")
            setOpenDelete(false)
        } else {
            const deleteUserIssue = response.response ? response.response.message : "It seems there was an issue, the user was not deleted." 
            setModalMsg(deleteUserIssue)
        }
        setConfirmLoading(false)     
    }

    const handleCancel = () => {
        setModalMsg("")
        setOpenDelete(false)
    }

  return (
    <Modal
        open={openDelete}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
    >
        <p>{modalMsg}</p>
        <p>Are you sure you want to delete {username} This will delete the user and all their stored skills and data. This is irreversible.</p>
    </Modal>
  )
}

export default ConfirmUserDeleteModal