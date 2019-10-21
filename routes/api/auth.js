const express = require("express");
const router = express.Router();

//@route get api/Auth
//@desc test route
//@access Public
router.get("/", (req, res) => res.send("Auth route"));

module.exports = router;
