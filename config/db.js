//The default json file under the config folder is part of the CONFIG package
//All the values defined in the default json file is globally accessible
//This file db.js contains methods to connect our app to the mongoDB database

//import mongoose
const mongoose = require("mongoose");
//import config to get access to global variables
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
