const { CloudinaryStorage } = require('multer-storage-cloudinary')
const cloudinary = require('../config/cloudinaryConfig')
const multer = require('multer')
  
// Set up Multer storage engine with Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        // folder: 'your-folder-name',  // Optional: Specify the folder name for storing images in Cloudinary
        allowedFormats: ['jpg', 'jpeg', 'png', 'gif'],  // Allowed image formats
        transformation: [{ width: 500, height: 500, crop: 'fill' }]  // Optional: Resize or transform images before upload
    },
})

// Create Multer upload instance
const upload = multer({ storage: storage })

const uploadWithErrorHandling = (req, res, next) => {
    
    upload.single('image')(req, res, (err) => {
    if (err) {
    // Handle Multer's error
        if (err instanceof multer.MulterError) {
            // Multer-specific error (file size, file format, etc.)
            return res.status(400).json({ message: 'File upload error: ' + err.message })
        } else {
            // Other errors (e.g., Cloudinary API errors)
            return res.status(500).json({ message: 'Unexpected error: ' + err.message })
        }
    }
    next() // No error, proceed to the next middleware or route handler
})
}


module.exports = uploadWithErrorHandling