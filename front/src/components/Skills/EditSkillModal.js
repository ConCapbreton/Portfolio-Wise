import React, { useState, useEffect, useRef } from 'react'
import { Modal } from 'antd'
import { useAuthContext } from '../../context/authContext'
import { updateSkill } from '../../services/api/skillsService'
import { validateSkillText, validateLevel, validateImage } from '../../utils/formChecking' 

const EditSkillModal = ({openEdit, setOpenEdit, skills, setSkills, oneSkill, setSkillMsg}) => {
  const { accessToken } = useAuthContext()
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [modalText, setModalText] = useState('')
  const [formData, setFormData] = useState({
    updateTitle: "",
    updateCategory: "",
    updateLevel: "",
  })
  const imageInputRef = useRef(null)

  useEffect(() => {
    setFormData({
      updateTitle: oneSkill.title,
      updateCategory: oneSkill.category,
      updateLevel: oneSkill.level,
    })
  }, [oneSkill])
  
  const handleInputChange = (e) => {
    const { name, value, files } = e.target
    
    setFormData(prevData => ({
      ...prevData,
      [name]: name === "updateImage" ? files[0] : value,
    }))
  }

  const handleOk = async () => {
    
    const titleTest = validateSkillText(formData.updateTitle)
    if (!titleTest.success) {
      setModalText(titleTest.message)
      return
    }
    const categoryTest = validateSkillText(formData.updateCategory)
    if (!categoryTest.success) {
      setModalText(categoryTest.message)
      return
    }
    const levelTest = validateLevel(formData.updateLevel) 
    if (!levelTest.success) {
      setModalText(levelTest.message)
      return
    }

    if (formData.updateImage) {
      const imageTest = validateImage(formData.updateImage)
      if (!imageTest.success) {
        setModalText(imageTest.message)
        return
      }
    }

    setConfirmLoading(true)

    const response = await updateSkill(formData.updateTitle, formData.updateCategory, formData.updateLevel, oneSkill._id, formData.updateImage, accessToken)
    if (response.success) {
      const skillIndex = skills.findIndex(skill => skill._id === response.response.updatedSkill._id)
      if (skillIndex !== -1) {
        const updatedSkills = [...skills]
        updatedSkills[skillIndex] = response.response.updatedSkill
        setSkills(updatedSkills)
        setSkillMsg(response.response.message) 
      } 
    } else {
      const updateSkillIssue = response.response ? response.response.message : "It seems there was an issue and your skill was not updated." 
      setSkillMsg(updateSkillIssue)  
    }
    setOpenEdit(false)
    setConfirmLoading(false)
  }

  const handleCancel = () => {
    setFormData({
      updateTitle: oneSkill.title,
      updateCategory: oneSkill.category,
      updateLevel: oneSkill.level,
    })
    imageInputRef.current.value = ''
    setOpenEdit(false)
  }
  
  return (
    <Modal
      title="Edit Skill"
      open={openEdit}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      >
      <p>{modalText}</p>
      <form id="update-form" className="skill-forms" encType="multipart/form-data">
        <label htmlFor="update-title">Title:</label>
        <input 
          id="update-title" 
          type="text" 
          minLength="3" 
          maxLength="20" 
          required 
          name="updateTitle"
          value={formData.updateTitle}
          onChange={handleInputChange}
        />
        <label htmlFor="update-category">Category:</label>
        <input 
          id="update-category" 
          type="text" 
          minLength="3" 
          maxLength="20" 
          required 
          name="updateCategory"
          value={formData.updateCategory}
          onChange={handleInputChange}
        />
        <label htmlFor="update-level">Level:</label>
        <select id="update-level" value={formData.updateLevel} name="updateLevel" onChange={handleInputChange}>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select> 
        <label htmlFor="update-image">Upload your image:</label>
        <input 
          id="update-image" 
          type="file" 
          name="updateImage"
          onChange={handleInputChange}
          ref={imageInputRef}
          accept="image/*"
        />
      </form> 
    </Modal>
  )
}

export default EditSkillModal;