const express = require("express");
const connectDB = require("./config/db");
const app = express();

// Connect to DB
connectDB();

// A simple get request whick takes a callback function with the request and response as arguments.
app.get("/", (req, res) => res.send(`API up and running...`));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on PORT : ${PORT}`));
