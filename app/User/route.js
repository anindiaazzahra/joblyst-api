const express = require("express");
const { 
  handlerGetUserProfile, 
  handlerUpdateUserProfile,
  handlerPostUserPreferredJobs
} = require("./handler");
const router = express.Router();
const authenticationToken = require("../../middleware/authenticationToken");
const uploadImage = require("../../middleware/multer");

router.get("/", authenticationToken, handlerGetUserProfile);
router.put("/", authenticationToken, uploadImage, handlerUpdateUserProfile);
router.post("/preferredJobs", authenticationToken, handlerPostUserPreferredJobs);

module.exports = router;