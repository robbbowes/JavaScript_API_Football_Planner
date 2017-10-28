var assert = require("assert");
var dateTimeConverter = require("../client/helpers/date_time_converter.js");

//2017-12-09T15:00:00Z

describe("dateTimeConverter", function() {

  it("should retrieve time", function() {
    assert.strictEqual("15:00", dateTimeConverter("2017-12-09T15:00:00Z").time);
  });

  it("should retrieve and convert date into English", function() {
    assert.strictEqual("9th December 2017", dateTimeConverter("2017-12-09T15:00:00Z").date);
  });

});
