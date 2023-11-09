const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'ddpriosuk',
  api_key: '845128578186369',
  api_secret: 'FEaNCR0ZORheUUSu3_ShOSDnldI',
});

module.exports = cloudinary;
