const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");
const {isAdmin, isLoggedIn} = require("../middleware/authenticate");

router.post("/signup", userController.signup);
router.post("/adminSignup", userController.adminSignup);


router.post("/logout/:id", userController.logout);
router.post("/login", userController.generateToken);
router.post("/adminLogin", userController.adminLogin);
router.get("/analytics",isLoggedIn, isAdmin, userController.getAnalytics);

module.exports = router;