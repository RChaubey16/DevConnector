const mongoose = require("mongoose");
const config = require("config");
// Using the config package to get the global variable from config/default.json.
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
    });

    console.log(`MONGO DB CONNECTED...`);
  } catch (error) {
    console.log(error);
    // Exit process with failure.
    process.exit(1);
  }
};

// To make the connectDB available to other files in the applcation.
module.exports = connectDB;
