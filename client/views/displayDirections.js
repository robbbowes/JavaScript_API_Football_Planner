var displayDirections = function(routeData) {
  console.log(routeData);
  var instructionsDiv = document.getElementById("instructions-div")

  var awayAddress = routeData.routes[0].legs[0].end_address;
  var timeTaken = routeData.routes[0].legs[0].duration.text;
  var distance  = routeData.routes[0].legs[0].distance.text;
  console.log(distance);


  var displayAddress = document.createElement("li");
  var displayTime = document.createElement("li");
  var displayDistance = document.createElement("li");
  console.log(displayAddress);

  displayAddress.id = "display-away-address";
  displayTime.id = "display-journey-time";
  displayDistance.id = "display-distance";

  displayAddress.innerText = "Away Stadium address: " + awayAddress;
  displayTime.innerText = "Estimated travel time: " + timeTaken;
  displayDistance.innerText = "Distance: " + distance;



  instructionsDiv.appendChild(displayAddress);
  instructionsDiv.appendChild(displayTime);
  instructionsDiv.appendChild(displayDistance);


}

module.exports = displayDirections
