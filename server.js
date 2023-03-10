const express = require("express");
const connectDB = require("./config/db");
const app = express();

// Connect to DB
connectDB();

// Init middleware
app.use(express.json({ extended: false })); // request-body parser.

// A simple get request which takes a callback function with the request and response as arguments.
app.get("/", (req, res) => res.send(`API up and running...`));

// Define routes.
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on PORT : ${PORT}`));
