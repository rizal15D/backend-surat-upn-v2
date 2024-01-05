const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dycdzi3xc",
  api_key: "939825791654757",
  api_secret: "sn4jEnxbngF0H6QAQRnYFpkzyX8",
  secure: true,
});

module.exports = cloudinary;
