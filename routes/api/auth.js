const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/auth");
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

module.exports = router;
