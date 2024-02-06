require("dotenv").config({ path: ".env" });
const express = require("express");
const colors = require("colors");
const db = require("./config/db");

const port = process.env.PORT || 8080;
const app = express();

db();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`.yellow.bold);
});
