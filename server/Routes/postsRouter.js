const getAllPostController = require("../Controllers/postsController");
const requireUser = require("../Middlewares/requireUser");
const router = require("express").Router();

router.get("/all", requireUser, getAllPostController);

module.exports = router;
