const express = require("express");
const { handlerGetDetailUser, handlerUpdateUserProfile, handlerUpdatePhotoProfile, handlerDeletePhotoProfile } = require("./handler");
const router = express.Router();

router.get("/profile", handlerGetDetailUser);
router.put("/profile", handlerUpdateUserProfile);
router.put("/photoprofile", handlerUpdatePhotoProfile);
router.delete("/photoprofile", handlerDeletePhotoProfile);

module.exports = router;