var tableQuery = require("../db/tableQuery.js")
var express = require("express")
var tableRouter = express.Router();

tableRouter.get("/", function (req, res) {
  tableQuery.all(function (table) {
    res.json(table)
  })
})

module.exports = tableRouter;
