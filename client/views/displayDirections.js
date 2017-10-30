var displayDirections = function(routeData) {
  console.log(routeData);
  // var mainDiv = document.getElementById("main-div");
  var instructionsDiv = document.getElementById("instructions-div")
  // var statsDiv = document.getElementById("stats-div");
  // var dirInstructions = document.getElementById("directions-div")

  var awayAddress = routeData.routes[0].legs[0].end_address;
  var timeTaken = routeData.routes[0].legs[0].duration.text;
  var distance  = routeData.routes[0].legs[0].distance.text;
  console.log(distance);
  // var routeInstructions = routeData.routes[0].legs[0].steps;
  // console.log(routeInstructions);

  var displayAddress = document.createElement("li");
  var displayTime = document.createElement("li");
  var displayDistance = document.createElement("li");
  // var showMeTheWay = document.createElement("ul")
  console.log(displayAddress);

  displayAddress.id = "display-away-address";
  displayTime.id = "display-journey-time";
  displayDistance.id = "display-distance";
  // displayInstructions = "display-instructions";

  displayAddress.innerText = "Away Stadium address: " + awayAddress;
  displayTime.innerText = "Estimated travel time: " + timeTaken;
  displayDistance.innerText = "Distance: " + distance;



  instructionsDiv.appendChild(displayAddress);
  instructionsDiv.appendChild(displayTime);
  instructionsDiv.appendChild(displayDistance);


}

module.exports = displayDirections
