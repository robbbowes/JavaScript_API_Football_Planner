var dateTimeConverter = function(string) {
  var year = string.substring(0, 4);
  var month;
  switch (string.substring(5, 7)) {
    case "01" : month = "January"; break;
    case "02" : month = "February"; break;
    case "03" : month = "March"; break;
    case "04" : month = "April"; break;
    case "05" : month = "May"; break;
    case "06" : month = "June"; break;
    case "07" : month = "July"; break;
    case "08" : month = "August"; break;
    case "09" : month = "September"; break;
    case "10" : month = "October"; break;
    case "11" : month = "November"; break;
    case "12" : month = "December"; break;
  }
  var day = string.substring(8, 10);
  if (day.substring(0, 1) === "0") { day = day.substring(1, 2)}
  if (day === "1") {
    day = day.concat("st");
  } else if (day === "2") {
    day = day.concat("nd");
  } else if (day === "3") {
    day = day.concat("rd");
  } else { day = day.concat("th") }
  var date = day + " " + month + " " + year;
  var time = string.substring(11, 16);
  var info = {
    date: date,
    time: time
  }
  return info;
}

module.exports = dateTimeConverter;
