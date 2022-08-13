// require project list schema
const csvModel = require("../models/csv");
const path = require("path");

// Rendering the project details on page

module.exports.home = function (req, res) {
  const uploadPath = path.resolve(__dirname,"../public/uploads");
// console.log("uploadPath name", uploadPath);

  // required file system
  const fs = require("fs");

  // used to redered all the files present on upload folder
  fs.readdir(uploadPath, (err, files) => {
    files.forEach((file) => {
      //   console.log(file);
    });

    if (err) {
      console.log(err);
    } else {
      // check file present than rendered
      if (files != "") {
        res.render("home", { files: files });
      } else {
        res.render("home", { files: "" });
      }
    }
  });
};
