const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

// @route     GET api/users
// @desc      Test route
// @access    Public
router.get("/", (req, res) => res.send(`User Route...`));

// @route     POST api/users
// @desc      Register user
// @access    Public
router.post(
  "/register",
  [
    check("name", "Please enter a username").not().isEmpty(),
    check("email", "Please enter a valid email address").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req, res);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // Check if user exists.
      let user = await User.findOne({ email });

      // If, yes then return an error.
      if (user) {
        return res
          .status(400)
          .json({ error: [{ msg: "User already exists." }] });
      }

      // Get users gravatar
      const avatar = gravatar.url(email, {
        s: "200", // default size of avatar
        r: "pg", // Cannot have inappropriate images
        d: "mm", // default image, incase the user does not have one and 'mm' basically adds the default avatar icon
      });

      // Creates the instance of user in MongoDb.
      user = new User({
        name,
        email,
        avatar,
        password,
      });

      // Encrypt the password using becrypt
      const salt = await bcrypt.genSalt(10); // we will hash the password with this salt.
      user.password = await bcrypt.hash(password, salt);

      // Saves and creates the user in the database.
      await user.save();

      // Return JsonWebToken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (error, token) => {
          if (error) throw error;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error.");
    }
  }
);

module.exports = router;
