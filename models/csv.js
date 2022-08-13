// required mongoose
const mongoose = require("mongoose");

// create schema for database table
const csvSchema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
    },
    LastName: {
      type: String,
    },
    age: {
      type: String,
    },
    FileName: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("personaldata", csvSchema);
