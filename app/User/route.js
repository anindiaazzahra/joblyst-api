const express = require("express");
const { 
  handlerGetUserProfile, 
  handlerUpdateUserProfile
} = require("./handler");
const router = express.Router();
const authenticationToken = require("../../middleware/authenticationToken");
const uploadImage = require("../../middleware/multer");

router.get("/profile", authenticationToken, handlerGetUserProfile);
router.put("/profile", authenticationToken, uploadImage, handlerUpdateUserProfile);

module.exports = router;