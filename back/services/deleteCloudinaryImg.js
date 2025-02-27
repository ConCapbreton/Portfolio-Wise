const cloudinary = require('cloudinary').v2;

// Function to delete an image from Cloudinary
const deleteCloudinaryImg = (publicId) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

module.exports = deleteCloudinaryImg