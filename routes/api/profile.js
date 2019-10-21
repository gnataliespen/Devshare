const express = require("express");
const router = express.Router();

//@route get api/Profile
//@desc test route
//@access Public
router.get("/", (req, res) => res.send("Profile route"));

module.exports = router;
