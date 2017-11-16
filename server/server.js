var express = require("express");
var app = express();

var club_router = require("./controller/teams_controller.js");
var table_router = require("./controller/table_controller.js")

app.use("/api/clubExtras", club_router);
app.use("/api/tableData", table_router);
app.use(express.static(__dirname + '/../client/build'))

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log("App running");
})
