import axios from 'axios'

///skills
// router.route('/').post(createNewSkill)

// Possible backend responses: 
// res.status(400).json({message: "All fields are required"})
// return res.status(400).json({message: "User not found"})
// res.status(201).json({message: `New skill ${title} created`, skill})
// res.status(400).json({message: 'Invalid data received'})
// return res.status(500).json({message: `There was an error: ${err.message}`})
// FROM verifyJWT middleware: 
// res.status(401).json({message: "Unauthorized"})
// res.status(403).json({message: "Forbidden"})
//FROM MULTER FILEUPLOAD TO CLOUDIANARY: 
// return res.status(400).json({ message: 'File upload error: ' + err.message })
// return res.status(500).json({ message: 'Unexpected error: ' + err.message })

export const createNewSkill = async (title, category, level, id, image, accessToken) => {
    
  try {
    const formData = new FormData()
    
    formData.append('title', title)
    formData.append('category', category)
    formData.append('level', level)
    formData.append('id', id)
    formData.append('image', image)
    
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/skills`, formData,
      {
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
        withCredentials: true, 
      }
    )

    // Check if the status code is 201 (Created)
    if (response.status === 201) {
      return {
        success: true,
        response: response.data, 
      };
    } else {
      return {
        success: false,
        response: response.data,
      };
    }
  } catch (err) {
    return {
      success: false,
      response: err.response ? err.response.data : "There was an issue and the skill was not created", 
    }
  }
}

//GET SKILLS
// router.route('/:userId').get(getUserSkills)

// Possible responses from backend: 
// res.status(400).json({message: 'No skills found'})
// res.json(skills)
// return res.status(500).json({message: `There was an error: ${err.message}`})
// FROM verifyJWT middleware: 
// res.status(401).json({message: "Unauthorized"})
// res.status(403).json({message: "Forbidden"})

export const getSkills = async (userId, accessToken) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/skills/${userId}`,
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Authorization": `Bearer ${accessToken}`,
        },
        withCredentials: true 
      }
    )
      
    return {
      success: true,
      response: response.data,
    }
  } catch (err) {
    return {
      success: false,
      response: err
    }
  }
}

// router.route('/').post(updateSkill)

//Possible backend responses: 
// res.status(400).json({message: "All fields, except image, are required"})
// res.status(400).json({message: "Skill not found"})
// res.json({message: `${updatedSkill.title} updated`, updatedSkill})
// res.status(500).json({message: `There was an error: ${err.message}`})
// FROM verifyJWT middleware: 
// res.status(401).json({message: "Unauthorized"})
// res.status(403).json({message: "Forbidden"})
//FROM MULTER FILEUPLOAD TO CLOUDIANARY: 
// return res.status(400).json({ message: 'File upload error: ' + err.message })
// return res.status(500).json({ message: 'Unexpected error: ' + err.message })

export const updateSkill = async (title, category, level, id, image, accessToken) => {
    
  try {
    const formData = new FormData()
    
    formData.append('title', title)
    formData.append('category', category)
    formData.append('level', level)
    formData.append('id', id)
    formData.append('image', image)
    
    const response = await axios.patch(
      `${process.env.REACT_APP_API_URL}/skills`, formData,
      {
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
        withCredentials: true, 
      }
    )

   
    return {
      success: true,
      response: response.data, 
    }
    
  } catch (err) {
    
    return {
      success: false,
      response: err.response ? err.response.data : "There was an issue and the skill was not updated", 
    }
  }
}

// router.route('/').delete(deleteSkill)

// res.status(400).json({message: 'Skill ID Required'})
// res.status(400).json({message: 'Skill not found'})
// res.json({message: `Skill ${deletedSkill} with ID ${deletedSkillId} deleted`, cloudinaryResponse: cloudinaryResponse})
// res.status(500).json({message: `There was an error: ${err.message}`})
// FROM verifyJWT middleware: 
// res.status(401).json({message: "Unauthorized"})
// res.status(403).json({message: "Forbidden"})

export const deleteSkill = async (skillId, accessToken) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/skills`, {
        data: {id: skillId},
        headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": `Bearer ${accessToken}`,
        },
        withCredentials: true
      }
    )

    return {
      success: true,
      response: response.data, 
    }
  } catch (err) {
    return {
      success: false,
      message: err.response ? err.response.data : "There was an issue and the skill was not deleted."
    }
  }
}