const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

// @route     GET api/auth/sample
// @desc      Sample route
// @access    Public
router.get("/sample", (req, res) => res.send(`sample Route...`));

// @route     GET api/auth
// @desc      Test route
// @access    Public
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error.");
  }
});

// @route       POST api/auth/login
// @desc        Authenticate user & get token
// @access      Public
router.post(
  "/login",
  [
    check("email", "Please enter a valid email address").isEmail(),
    check("password", "Passsword is required.").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req, res);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if user exists.
      let user = await User.findOne({ email });

      // If, not then return an error.
      if (!user) {
        return res
          .status(400)
          .json({ error: [{ msg: "Invalid Credentials" }] });
      }

      // Match User's data with the database.
      const isMatch = await bcrypt.compare(password, user.password);

      // If not, then send error.
      if (!isMatch) {
        return res
          .status(400)
          .json({ error: [{ msg: "Invalid Credentials" }] });
      }

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
