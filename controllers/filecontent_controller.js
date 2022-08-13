// require project list schema
const csvModel = require("../models/csv");
const path = require("path");

// Rendering the project details on page

module.exports.fileContent = function (req, res) {
  // console.log(req.query.filename);
  const filename = req.query.filename;
  csvModel.find({ FileName: filename }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      // check data present than rendered 
      if (data != "") {
        // ~console.log("data", data);
        res.render("filecontent", { data: data });
      } else {
        res.render("filecontent", { data: "" });
      }
    }
  });
};
