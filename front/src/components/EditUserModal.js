import React, { useState, useEffect} from 'react'
import { Modal } from 'antd'
import ConfirmUserDeleteModal from './ConfirmUserDeleteModal'
import { adminUpdateUser } from '../services/api/usersService'
import { useAuthContext } from '../context/authContext'

const EditUserModal = ({open, setOpen, oneUser, setAdminMsg, setEditedUser, setDeletedUser}) => {
    const { accessToken, decodeToken } = useAuthContext()
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [userDetails, setUserDetails] = useState()
    const [openDelete, setOpenDelete] = useState(false)
    const [checkedItems, setCheckedItems] = useState({
        isAdmin: false,
        isActive: false,
    })

    useEffect(() => {
        if (!oneUser) {
            setUserDetails([<p>User not found.</p>])
            return
        }
        
        setCheckedItems({
            isAdmin: oneUser.roles.includes('Admin'),
            isActive: oneUser.active,
        })
        
    }, [oneUser])

    useEffect(() => {
        if (!checkedItems || !oneUser) {
            return
        }
        const userForm = [
            <>
                <h2>Delete User:</h2>
                <button onClick={handleDeleteClick}>Delete User</button>
                <form className="edit-user-form ">
                    <h2>Edit User:</h2>
                    <p><strong>Username:</strong> {oneUser.username || ""}</p>
                    <p><strong>Email:</strong> {oneUser.email || ""}</p>
                    <label htmlFor="edit-active" >
                        <input 
                            id="edit-active"
                            className="checkbox-input"
                            type="checkbox" 
                            name="isActive"
                            value="true"
                            checked={checkedItems.isActive}
                            onChange={handleChange}
                        />
                        <strong>User "Active" (checked) or "Not active".</strong>
                    </label>
                    <p>Note: an inactive user will no longer be able to login.</p>
                    <label htmlFor="edit-role">
                        <input
                            id="edit-role" 
                            className="checkbox-input"
                            type="checkbox" 
                            name="isAdmin" 
                            value="true"
                            checked={checkedItems.isAdmin}
                            onChange={handleChange}
                        />
                        <strong>Give the user Admin permissions.</strong>
                    </label>
                    <p>Note: Users with Admin permissions can edit and delete other users.</p>
                </form>
            </>
        ]
        setUserDetails(userForm)
    }, [checkedItems])

    const handleDeleteClick = () => {
        setOpenDelete(true)
        setOpen(false)
    }

    const handleChange = (event) => {
        const { name, checked } = event.target
        setCheckedItems(prevState => {
            return {
                ...prevState, 
                [name]: checked,
            }
        })
    }

    const handleOk = async () => {
        setConfirmLoading(true)
        const { id } = decodeToken(accessToken) 
        const userRoles = checkedItems.isAdmin ? ["Basic", "Admin"] : ["Basic"]
        const response = await adminUpdateUser(id, oneUser._id, checkedItems.isActive, userRoles, accessToken)
        if (response.success) {
            const modifiedUser = ({...oneUser, roles: userRoles, active: checkedItems.isActive})
            setEditedUser(modifiedUser)
            setAdminMsg(response.response.message)
        } else {
            const editUserIssue = response.response ? response.response.message : "It seems there was an issue, please try again"
            setAdminMsg(editUserIssue)
            setCheckedItems({
                isAdmin: oneUser.roles.includes('Admin'),
                isActive: oneUser.active,
            })
        }
        setConfirmLoading(false)
        setOpen(false)
    }

    const handleCancel = () => {
        setCheckedItems({
            isAdmin: oneUser.roles.includes('Admin'),
            isActive: oneUser.active,
        })
        setOpen(false)
    }

  return (
    <>
      <Modal
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div>{userDetails}</div>
      </Modal>
      <ConfirmUserDeleteModal openDelete={openDelete} setOpenDelete={setOpenDelete} oneUser={oneUser} setDeletedUser={setDeletedUser} setAdminMsg={setAdminMsg}/>
    </>
  )
}

export default EditUserModal