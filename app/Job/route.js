const express = require("express");
const {
  handlerGetJobByPosition,
  handlerGetJobByFilter,
  handlerGetRandomJob
} = require("./handler");
const router = express.Router();
const authenticationToken = require("../../middleware/authenticationToken");

router.get("/", authenticationToken, handlerGetJobByPosition);
router.get("/filter", authenticationToken, handlerGetJobByFilter);
router.get("/random", authenticationToken, handlerGetRandomJob);

module.exports = router;