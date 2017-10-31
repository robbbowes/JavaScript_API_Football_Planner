var express = require("express");
var app = express();

var club_router = require("./controller/teams_controller.js");
var table_router = require("./controller/table_controller.js")

app.use("/api/clubExtras", club_router);
app.use("/api/tableData", table_router);
app.use(express.static(__dirname + '/../client/build'))

app.listen(3000, function () {
  console.log("App running");
})
