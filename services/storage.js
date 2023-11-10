const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: '<YOUR_CLOUD_NAME>',
  api_key: '<YOUR_CLOUDINARY_API_KEY>',
  api_secret: '<YOUR_CLOUDINARY_API_SECRET>',
});

module.exports = cloudinary;