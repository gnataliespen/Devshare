const express = require("express");
const router = express.Router();

//@route get api/Post
//@desc test route
//@access Public
router.get("/", (req, res) => res.send("Post route"));

module.exports = router;
