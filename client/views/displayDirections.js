var displayDirections = function(routeData) {
  var timeTaken = routeData.routes[0].legs[0].duration.text
  var mainDiv = document.getElementById("main-map")
  var displayTime = document.createElement("p")
  displayTime.id = "display-journey-time"
  displayTime.innerText = timeTaken
  mainDiv.appendChild(displayTime)
}

module.exports = displayDirections
