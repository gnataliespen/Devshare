const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const config = require("config");
const User = require("../../models/User");

//@route POST api/users
//@desc Register user
//@access Public
router.post(
  "/",
  [
    check("name", "Name is require")
      .not()
      .isEmpty(),
    check("email", "Please include valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters",
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      //Check that email is unique
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          errors: [{ msg: "User with that email already exists" }],
        });
      }
      //Get avatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });
      //Create User
      user = new User({
        name,
        email,
        avatar,
        password,
      });
      //Encrypt Password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      //Save User
      await user.save();

      //Set Payload
      const payload = {
        user: {
          id: user.id,
        },
      };
      //Sign jwt token
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        },
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  },
);

module.exports = router;
