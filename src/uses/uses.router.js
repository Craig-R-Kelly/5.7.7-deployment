const express = require('express');
const usesController = require('./uses.controller');
const router = express.Router({ mergeParams: true });
const methodNotAllowed = require("../errors/methodNotAllowed")

router.route("/")
  .get(usesController.list)  // list all metrics, either filtered by URL ID or not depending on whether accessed by direct or nested route 
  .all(methodNotAllowed);    // catch-all for all other methods

router.route("/:useId")
  .get(usesController.read)  // retrieve specific use metric by its ID
  .delete(usesController.destroy) // remove  "     "    "    "   "  "
  .all(methodNotAllowed);    // catch-all for all other methods

module.exports = router;


