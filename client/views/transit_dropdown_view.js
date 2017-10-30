var MapWrapper = require('./map_wrapper.js');
console.log(MapWrapper);


var initialiseTransitDropdown = function() {
  var mainDiv = document.getElementById("main-div")
  var div = document.createElement("div");
  div.id = "floating-panel";
  var modeSelect = document.createElement("select");
  modeSelect.id = "mode"
  var carOption = document.createElement("option")
  carOption.value = "DRIVING"
  carOption.innerText = "Car"
  var transitOption = document.createElement("option")
  transitOption.value = "TRANSIT"
  transitOption.innerText = "Transit"
  modeSelect.appendChild(carOption)
  modeSelect.appendChild(transitOption)
  mainDiv.appendChild(modeSelect);

  modeSelect.addEventListener("change", function() {
    var end = JSON.parse(localStorage.getItem("current-end-location"));
    var transitOption = document.getElementById("mode").value;
    // console.log(google.maps.Map);

    var mapWrapper = new MapWrapper(54.732523, -3, 5, initialiseTransitDropdown);
    console.log(MapWrapper);

    navigator.geolocation.getCurrentPosition(function(result) {
      currentPosition = {lat: result.coords.latitude, lng: result.coords.longitude}
        mapWrapper.getDirections(currentPosition, end, transitOption);
    });
  });
}

module.exports = initialiseTransitDropdown;
