const express = require("express");
const router = express.Router();
const urlsController = require("./urls.controller");
const usesRouter = require("../uses/uses.router");
const methodNotAllowed = require("../errors/methodNotAllowed")

// Delegate requests to /urls/:urlId/uses to the usesRouter
router.use("/:urlId/uses", usesRouter);

// For a single URL
router.route("/:urlId")
  .get(urlsController.read)   // retrieve URL by its ID
  .put(urlsController.update) // update a URL by its ID
  .all(methodNotAllowed);     // use mna middleware for all other methods
  
// For the group of URLs
router.route("/")
  .get(urlsController.list)   // list all URLs
  .post(urlsController.create)// create a new URL 
  .all(methodNotAllowed);     // use mna middleware for all other methods

module.exports = router;