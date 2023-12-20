const express = require("express");
const {
  handlerGetJobByPosition,
  handlerGetJobByFilter,
  handlerGetRandomJob,
  handlerGetJobCategories,
  handlerGetSalaries,
  handlerGetJobLevels,
  handlerGetWorkTimes,
  handlerGetCities,
  handlerGetJobs
} = require("./handler");
const router = express.Router();
const authenticationToken = require("../../middleware/authenticationToken");

router.get("/", authenticationToken, handlerGetJobByPosition);
router.get("/filter", authenticationToken, handlerGetJobByFilter);
router.get("/random", authenticationToken, handlerGetRandomJob);
router.get("/categories", authenticationToken, handlerGetJobCategories);
router.get("/salaries", authenticationToken, handlerGetSalaries);
router.get("/levels", authenticationToken, handlerGetJobLevels);
router.get("/work-times", authenticationToken, handlerGetWorkTimes);
router.get("/cities",authenticationToken, handlerGetCities);
router.get("/search", authenticationToken, handlerGetJobs);

module.exports = router;