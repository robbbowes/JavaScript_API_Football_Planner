var express = require("express");
var app = express();

var club_router = require("./controller/teams_controller.js");

app.use("/api/clubExtras", club_router);

app.listen(3000, function () {
  console.log("App running");
})
