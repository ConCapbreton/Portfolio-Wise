import React, { useState, useEffect } from 'react'
import { Modal } from 'antd'
import { useAuthContext } from '../../context/authContext'
import { deleteSkill } from '../../services/api/skillsService'

const DeleteSkillModal = ({openDelete, setOpenDelete, skills, setSkills, oneSkill, setSkillMsg}) => {
  const { accessToken } = useAuthContext()
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [modalText, setModalText] = useState(``)
  
  useEffect(() => {
    setModalText(`Are you sure you want to delete skill: "${oneSkill.title}"`)
  }, [oneSkill])

  const handleOk = async () => {
    setConfirmLoading(true)
    const response = await deleteSkill(oneSkill._id, accessToken)
    if (response.success) {
      const remainingSkills = skills.filter(skill => {
        return skill._id !== oneSkill._id
      })
      setSkills(remainingSkills)
      setSkillMsg(response.response.message)  
    } else {
      const deleteSkillIssue = response.response ? response.response.message : "It seems there was an issue and your skill was not deleted." 
      setSkillMsg(deleteSkillIssue)  
    }
    setOpenDelete(false)
    setConfirmLoading(false)
  }

  const handleCancel = () => {
    setOpenDelete(false)
  }

  return (
    <Modal
      title="Delete skill"
      open={openDelete}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <p>{modalText}</p>
    </Modal>
  )
}

export default DeleteSkillModal