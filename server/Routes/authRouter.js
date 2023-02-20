const {
  signupController,
  loginController,
  refreshAccessTokenController,
} = require("../Controllers/authController");

const router = require("express").Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.get("/refresh", refreshAccessTokenController);

module.exports = router;
