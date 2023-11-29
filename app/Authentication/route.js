const express = require("express");
const { handlerLoginUser, handlerRegisterUser } = require("./handler");
const router = express.Router();

router.post("/register", handlerRegisterUser);
router.post("/login", handlerLoginUser);

module.exports = router;