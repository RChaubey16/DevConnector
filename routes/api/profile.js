const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");

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

// @route     POST api/profile
// @desc      Create or Update a user profile
// @access    Private
router.post(
  "/",
  [
    authMiddleware,
    [
      check("status", "Status is required").not().isEmpty(),
      check("skills", "Skills is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    // Error validations.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Pull out of the request body.
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    // Build Profile objects
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }

    // Build Social objects
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      // Update profile.
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields }, // The updation data to be passed here
          { new: true }
        );

        return res.json(profile);
      }

      // Create Profile.
      // Creates the profile instance in the MongoDB
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error.");
    }
  }
);

// @route     GET api/profile
// @desc      get all profiles
// @access    Public
router.get("/", async (req, res) => {
  try {
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
