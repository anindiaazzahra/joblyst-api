const express = require("express");
const { 
  handlerGetUserProfile, 
  handlerUpdateUserProfile, 
  handlerUpdatePhotoProfile, 
  handlerDeletePhotoProfile 
} = require("./handler");
const router = express.Router();
const authenticationToken = require("../../middleware/authenticationToken");

router.get("/profile", authenticationToken, handlerGetUserProfile);
router.put("/profile", handlerUpdateUserProfile);
router.put("/photoprofile", handlerUpdatePhotoProfile);
router.delete("/photoprofile", handlerDeletePhotoProfile);

module.exports = router;