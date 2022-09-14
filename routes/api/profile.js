const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/auth");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route     GET api/profile/me
// @desc      Get current users profile
// @access    Private
router.get("/me", authMiddleware, async (req, res) => {
  try {
    // find user using user's id and then populate or get some extra data that we require from other model like 'User Model'.
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );

    if (!profile) {
      return res
        .status(400)
        .json({ msg: "There is no profile for this user." });
    }

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error.");
  }
});

module.exports = router;
