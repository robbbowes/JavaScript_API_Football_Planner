var MapWrapper = require('./map_wrapper.js');


var initialiseTransitDropdown = function(mapWrapper) {
  var container = document.createElement("div");
  container.id = "transit-div";
  var statsDiv = document.getElementById("stats-div")
  statsDiv.appendChild(container);
  var description = document.createElement("p");
  description.innerText = "How do you plan on travelling?";
  container.appendChild(description)
  var modeSelect = document.createElement("select");
  modeSelect.id = "mode"
  var carOption = document.createElement("option")
  carOption.value = "DRIVING"
  carOption.innerText = "Car"
  var transitOption = document.createElement("option")
  transitOption.value = "TRANSIT"
  transitOption.innerText = "Transit"
  var walkOption = document.createElement("option");
  walkOption.value = "WALKING";
  walkOption.innerText = "Walking";
  modeSelect.appendChild(carOption);
  modeSelect.appendChild(transitOption);
  modeSelect.appendChild(walkOption);
  container.appendChild(modeSelect);

  modeSelect.addEventListener("change", function() {
    var awayFixtureInfoDiv = document.getElementById("away-fixture-info-div");
    var directionsContainer = document.getElementById("instructions-container")
    awayFixtureInfoDiv.removeChild(directionsContainer);
    var end = JSON.parse(localStorage.getItem("current-end-location"));
    var transitOption = document.getElementById("mode").value;
    navigator.geolocation.getCurrentPosition(function(result) {
      currentPosition = {lat: result.coords.latitude, lng: result.coords.longitude}
        mapWrapper.getDirections(currentPosition, end, transitOption);
    });
  });
}

module.exports = initialiseTransitDropdown;
