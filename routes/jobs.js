const router = express.Router();
const jobController = require("../controllers/jobs");

router.get("/jobs", jobController.getAllJobs);

router.post("/jobs", jobController.createJob);

router.put("/jobs/:id", jobController.updateJob);

router.delete("/jobs/:id", jobController.deleteJob);

module.exports = router;
