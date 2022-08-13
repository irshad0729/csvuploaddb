// required express
const express = require("express");

// required mongoose
const mongoose = require("mongoose");

// provide the path of the database on mongodb atlas
const DB =
  "mongodb+srv://root:root@cluster0.uvvwmyo.mongodb.net/csvupload?retryWrites=true&w=majority";

// Established the connection to database

mongoose
  .connect(DB)
  .then(() => {
    console.log("Mongo Atlas server connected ");
  })
  .catch((err) => {
    console.log("error", err);
  });

// required multer
const multer = require("multer");

// required path
const path = require("path");

// required csv schema
const csvModel = require("./models/csv");

// required csvtojson
const csv = require("csvtojson");

// required body-parser
const bodyParser = require("body-parser");

// required route
const route = require("route");

// require os module
const os = require("os");

// invoke userInfo() method
const userInfo = os.userInfo();

// get uid property
// from the userInfo object
const uid = userInfo.uid;

// console.log("uid ",uid); // 20

// defined csv file storage location with name
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "./public/uploads");
    
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploads = multer({ storage: storage });

//connect to db
// mongoose
//   .connect("mongodb://localhost:27017/csvupload", { useNewUrlParser: true })
//   .then(() => console.log("connected to db"))
//   .catch((err) => console.log(err));

//init app
const app = express();

// use express router
app.use("/", require("./routes/index"));

//set the template engine
app.set("view engine", "ejs");

//fetch data from the request
app.use(bodyParser.urlencoded({ extended: false }));

//static folder
app.use(express.static(path.join(__dirname, "public")));
var temp;
// console.log(path.resolve(__dirname));
// used to upload only csv file
app.post("/", uploads.single("csv"), (req, res) => {
  var ext = path.extname(req.file.originalname);
  // console.log("ext", ext, typeof ".xsls");

  // file extention validation check for csv
  console.log("req.file.mimetype", req.file.mimetype);
  if (ext==".csv") {
    // console.log("inside insertion ");

    //convert csvfile to jsonArray
    csv()
      .fromFile(req.file.path)
      .then((jsonObj) => {
        // console.table(jsonObj);

        // add filename to each object
        for (let i of jsonObj) {
          // console.log("file name", req.file.filename);
          i.FileName = req.file.filename;
        }

        // insert object entire value to database
        csvModel.insertMany(jsonObj, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            res.redirect("/");
          }
        });
      });
  } else {
    console.log("File Uploaded was not CSV file");
    res.redirect("/");
  }
});

//assign port
var port = process.env.PORT || 8000;
app.listen(port, () => console.log("server run at port " + port));
