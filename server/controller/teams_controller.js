var clubQuery = require("../db/clubQuery.js");
var express = require("express");
var clubRouter = express.Router();

clubRouter.get("/", function (req, res) {
  clubQuery.all(function (teams) {
    res.json(teams)
  })
})
module.exports = clubRouter;
