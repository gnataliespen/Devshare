const express = require("express");
const router = express.Router();

//@route get api/users
//@desc test route
//@access Public
router.get("/", (req, res) => res.send("user route"));

module.exports = router;
