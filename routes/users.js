const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
//import express validator
const { check, validationResult } = require("express-validator/check");
//import jsonwebtoken
const jwt = require("jsonwebtoken");

const config = require("config");

//import USER SCHEMA
const User = require("../models/User");

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    // password must be at least 6 chars long
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      //finds whether email is in the database or not
      let user = await User.findOne({ email });
      //if email is in database status 400
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }

      //create user --> using the User model to create a new user
      user = new User({
        name,
        email,
        password,
      });
      //encrypt password with bcrypt
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      //save the user in the database
      //password is saved in the encypted format using bcrypt
      await user.save();
      //creating a payload object which contains the user id
      const payload = {
        user: {
          id: user.id,
        },
      };
      //jwt
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
