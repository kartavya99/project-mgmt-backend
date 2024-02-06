const mongoose = require("mongoose");
const colors = require("colors");

mongoose.connect(process.env.MONGO_URI).catch((err) => console.log(err));
console.log("MongoDB Connected".cyan.underline.bold);

module.exports = mongoose.connection;
