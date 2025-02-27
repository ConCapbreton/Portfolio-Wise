import React, { useState, useRef } from 'react'
import { Modal } from 'antd'
import { useAuthContext } from '../../context/authContext'
import { createNewSkill } from '../../services/api/skillsService'
import { validateSkillText, validateLevel, validateImage } from '../../utils/formChecking' 

const SkillModal = ({open, setOpen, setSkills, setSkillMsg}) => {
  const { accessToken, decodeToken } = useAuthContext()
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [modalText, setModalText] = useState('')
  const [formData, setFormData] = useState({
    createTitle: '',
    createCategory: '',
    createLevel: "Beginner",
  })
  const imageInputRef = useRef(null)

  const handleInputChange = (e) => {
    const { name, value, files } = e.target
    
    setFormData(prevData => ({
      ...prevData,
      [name]: name === "createImage" ? files[0] : value,
    }))
  }

  const handleOk = async () => {

    const titleTest = validateSkillText(formData.createTitle)
    if (!titleTest.success) {
      setModalText(titleTest.message)
      return
    }
    const categoryTest = validateSkillText(formData.createCategory)
    if (!categoryTest.success) {
      setModalText(categoryTest.message)
      return
    }
    const levelTest = validateLevel(formData.createLevel) 
    if (!levelTest.success) {
      setModalText(levelTest.message)
      return
    }

    if (formData.createImage) {
      const imageTest = validateImage(formData.createImage)
      if (!imageTest.success) {
        setModalText(imageTest.message)
        return
      }
    }
    
    setConfirmLoading(true)
    const { id } = decodeToken(accessToken)
    const response = await createNewSkill(formData.createTitle, formData.createCategory, formData.createLevel, id, formData.createImage, accessToken)
    if (response.success) {
      setSkills((prevSkills) => {return[...prevSkills, response.response.skill]})
      setSkillMsg(response.response.message)  
    } else {
      const createSkillIssue = response.response ? response.response.message : "It seems there was an issue." 
      setSkillMsg(createSkillIssue)  
    }
    setFormData({
      createTitle: '',
      createCategory: '',
      createLevel: "Beginner",
    })
    imageInputRef.current.value = ''
    setOpen(false)
    setConfirmLoading(false)
  }

  const handleCancel = () => {
    setFormData({
      createTitle: '',
      createCategory: '',
      createLevel: "Beginner",
    })
    imageInputRef.current.value = ''
    setOpen(false)
  }

  return (
    <Modal
      title="Create New Skill"
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <p>{modalText}</p>
      <form id="create-form" className="skill-forms" encType="multipart/form-data">
        <label htmlFor="create-title">Title:</label>
        <input 
          id="create-title" 
          type="text" 
          minLength="3" 
          maxLength="20" 
          required 
          name="createTitle"
          value={formData.createTitle}
          onChange={handleInputChange}
        />
        <label htmlFor="create-category">Category:</label>
        <input 
          id="create-category" 
          type="text" 
          minLength="3" 
          maxLength="20" 
          required 
          name="createCategory"
          value={formData.createCategory}
          onChange={handleInputChange}
        />
        <label htmlFor="create-level">Level:</label>
        <select id="create-level" value={formData.createLevel} name="createLevel" onChange={handleInputChange}>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select> 
        <label htmlFor="create-image">Upload your image:</label>
        <input 
          id="create-image" 
          type="file" 
          name="createImage"
          accept="image/*"
          onChange={handleInputChange}
          ref={imageInputRef} 
        />
      </form> 
    </Modal>
  )
}
export default SkillModal