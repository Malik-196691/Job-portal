const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobs");
const { isLoggedIn, isAdmin } = require("../middleware/authenticate");

router.get("/", jobController.getAllJobs);

router.post("/", isLoggedIn, isAdmin, jobController.createJob);

router.put("/:id", isLoggedIn, isAdmin, jobController.updateJob);

router.delete("/:id", isLoggedIn, isAdmin, jobController.deleteJob);

router.post("/save/:id", isLoggedIn, jobController.saveJob);
router.delete("/unsave/:id", isLoggedIn, jobController.unsaveJob);
router.get("/saved", isLoggedIn, jobController.getSavedJobs);

module.exports = router;
