// Require express
const express = require("express");

// acquire Router function
const router = express.Router();
console.log("router loaded");

// Require home controller
const homeController = require("../controllers/home_controller");

// Require file content controller
const fileContent = require("../controllers/filecontent_controller");

// access home route
router.get("/", homeController.home);

// access home route
router.get("/filecontent", fileContent.fileContent);

// export router
module.exports = router;