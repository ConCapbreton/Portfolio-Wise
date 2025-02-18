//ID
export function validateId(id) {
    // Regex pattern for a valid Mongoose ObjectId (24 hex characters)
    const regex = /^[a-f0-9]{24}$/

    if (id === "" || !regex.test(id)) {
        return {
            success: false,
            message: "Invalid ID! It must be a 24-character hexadecimal string." 
        }           
    } else {
        return {success: true}
    }
  }

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
