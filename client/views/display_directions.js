var displayDirections = function(routeData) {
  console.log(routeData);

  var mainDiv = document.getElementById("main-div");
  var instructionsDiv = document.createElement("div");
  var instructionsContainer = document.createElement("div");
  instructionsContainer.id = "instructions-container";
  instructionsDiv.id = "instructions-div";
  mainDiv.appendChild(instructionsContainer);
  instructionsContainer.appendChild(instructionsDiv);
  console.log(instructionsDiv);

  var awayAddress = routeData.routes[0].legs[0].end_address;
  var timeTaken = routeData.routes[0].legs[0].duration.text;
  var distance  = routeData.routes[0].legs[0].distance.text;


  var displayAddress = document.createElement("li");
  var displayTime = document.createElement("li");
  var displayDistance = document.createElement("li");

  displayAddress.id = "display-away-address";
  displayTime.id = "display-journey-time";
  displayDistance.id = "display-distance";

  displayAddress.innerHTML = "<b>Away Stadium address:</b>  " + awayAddress;
  displayTime.innerHTML = "<b>Estimated travel time:</b>  " + timeTaken;
  displayDistance.innerHTML = "<b>Distance:</b>  " + distance;

  instructionsDiv.appendChild(displayAddress);
  instructionsDiv.appendChild(displayTime);
  instructionsDiv.appendChild(displayDistance);

  var ol = document.createElement("ol");

  routeData.routes[0].legs[0].steps.forEach(function(step) {
    var li = document.createElement("li");
    var instructions = document.createElement("p");
    instructions.innerHTML = step.instructions;
    var distance = document.createElement("p");
    distance.innerHTML = step.distance.text;
    li.appendChild(instructions);
    li.appendChild(distance);
    ol.appendChild(li);
  });

  instructionsDiv.appendChild(ol);


}

module.exports = displayDirections
