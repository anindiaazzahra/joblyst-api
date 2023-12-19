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

router.get("/", handlerGetJobByPosition);
router.get("/filter", handlerGetJobByFilter);
router.get("/random", handlerGetRandomJob);
router.get("/categories", handlerGetJobCategories);
router.get("/salaries", handlerGetSalaries);
router.get("/levels", handlerGetJobLevels);
router.get("/work-times", handlerGetWorkTimes);
router.get("/cities", handlerGetCities);

module.exports = router;