//USERNAME
export function validateUsername(username) {
  // Regex pattern for a valid username (start with a letter, can contain alphanumeric, underscores, and hyphens, and must be 3-20 characters long)
  const regex = /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/
  
  if (username === "" || username.length < 3 || username.length > 20 || !regex.test(username)) {
    return {
      success: false,
      message: "Invalid username! It must be between 3 and 20 characters (inclusive), start with a letter and can contain only letters, numbers, underscores, or hyphens."        
    }
  } else {
    return {success: true}
  }
}

//PASSWORD
export function validatePassword(password) {
  // Regex pattern for a valid password (at least 6 characters, includes uppercase, lowercase, digit, and special char)
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/

  if (password === "" || !regex.test(password)) {
    return {
      success: false,
      message: "Password must be at least 6 characters long, with at least one uppercase letter, one lowercase letter, one digit, and one special character."        
    }
  } else {
    return {success: true}
  }
}

//UPDATING USER PASSWORD
export function validatePasswordUpdate(password) {
  // Regex pattern for a valid password (at least 6 characters, includes uppercase, lowercase, digit, and special char)
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/

  //USER IS NOT OBLIGED TO UPDATE PASSWORD - SO IF THE FIELD IS EMPTY THEN NOTHING WILL BE UPDATED.
  if (password === "") {return {success: true}}

  if (!regex.test(password)) {
    return {
      success: false,
      message: `${password} Password must be at least 6 characters long, with at least one uppercase letter, one lowercase letter, one digit, and one special character.`        
    }
  } else {
    return {success: true}
  }
}

//EMAIL
export function validateEmail(email) {    
  // Regex pattern for a valid email:
  // 1. A valid local part (the part before the @ symbol).
  // 2. A domain name (the part after the @ symbol) with a valid domain format.
  //3. The domain should end with a proper domain suffix (e.g., .com, .org, etc.).
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  if (email === "" || !regex.test(email)) {
    return {
      success: false,
      message: "Please provide a valid email."        
    }
  } else {
    return {success: true}
  }
}

//SKILL TITLE OR CATEGORY
export function validateSkillText(skillText) {
  const minLength = 3
  const maxLength = 20
  const specialCharsRegex = /[&<>"'`=]/
  
  if (specialCharsRegex.test(skillText)) {
    return {
      success: false,
      message: "Special characters are not allowed in the skill title or category."
    }
  }

  if (skillText.length >= minLength && skillText.length <= maxLength) {
    return {
      success: true,
    }
  } else {
    return {
      success: false,
      message: `Skill title and category must be at least ${minLength} characters long and shorter than ${maxLength}.`,
    }
  }
}

//SKILL LEVEL: 
export function validateLevel(skillLevel) {
  if (skillLevel !== "Beginner" || skillLevel !== "Intermediate" || skillLevel !== "Advanced") {
    return {success: true}
  } else {
    return {
      success: false,
      message: "Please select a skill level from the available options."
    }
  }
}

// IMAGE:
export function validateImage(file) {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  if (!allowedTypes.includes(file.type)) {
    return {
      success: false,
      message: 'Please upload a valid image file (JPG, PNG, GIF, WebP).'
    }
  }

  const maxSize = 5 * 1024 * 1024;  // 5 MB in bytes
  if (file.size > maxSize) {
    return {
      success: false,
      message: 'The file is too large. Please upload an image smaller than 5 MB.'
    }
  }

  return {success: true}
}