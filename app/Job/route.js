const express = require("express");
const {
  handlerGetJobByPosition,
  handlerGetJobByFilter,
  handlerGetRandomJob,
  handlerGetJobCategories,
  handlerGetSalaries,
  handlerGetJobLevels,
  handlerGetWorkTimes,
  handlerGetCities
} = require("./handler");
const router = express.Router();
const authenticationToken = require("../../middleware/authenticationToken");

router.get("/", authenticationToken, handlerGetJobByPosition);
router.get("/filter", authenticationToken, handlerGetJobByFilter);
router.get("/random", authenticationToken, handlerGetRandomJob);
router.get("/categories", handlerGetJobCategories);
router.get("/salaries", handlerGetSalaries);
router.get("/levels", handlerGetJobLevels);
router.get("/work-times", handlerGetWorkTimes);
router.get("/cities", handlerGetCities);

module.exports = router;