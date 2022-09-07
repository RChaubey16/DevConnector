const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

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
  (req, res) => {
    const errors = validationResult(req, res);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    console.log(req.body);
    res.send(`User Route...` + req.body.name);
  }
);

module.exports = router;
