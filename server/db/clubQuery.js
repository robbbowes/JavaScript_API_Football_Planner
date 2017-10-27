var MongoClient = require("mongodb").MongoClient;

var clubQuery = {
  url: "mongodb://localhost:27017/team_extra_data",
  all: function (result) {
    MongoClient.connect(this.url, function (err, db) {
      var teamsCollection = db.collection("teams");

      teamsCollection.find().toArray(function (err, docs) {
        result(docs);
      })
    })
  }
}

module.exports = clubQuery;
