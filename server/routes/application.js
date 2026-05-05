const router = require("express").Router();
const {
  apply,
  getAllapplications,
  getMyapplications,
  updateStatus,
  deleteById,
} = require("../controllers/application");
const { isAdmin, isLoggedIn } = require("../middleware/authenticate");

router.post("/apply", isLoggedIn, apply);
router.get("/",isLoggedIn,isAdmin, getAllapplications);
router.get("/:userId",isLoggedIn, getMyapplications);
router.put("/:id",isLoggedIn, isAdmin, updateStatus);
router.delete("/:id",isLoggedIn, deleteById);

module.exports = router;
