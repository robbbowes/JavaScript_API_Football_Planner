var displayDirections = require("./displayDirections")

var MapWrapper = function(lat, lng, zoom) {
  var mainDiv = document.getElementById('main-div');
  var div = document.createElement("div")
  // div.id = "floating-panel"
  // var modeSelect = document.createElement("select")
  // modeSelect.id = "mode"
  // var carOption = document.createElement("option")
  // carOption.value = "DRIVING"
  // carOption.innerText = "Car"
  // var transitOption = document.createElement("option")
  // transitOption.value = "TRANSIT"
  // transitOption.innerText = "Transit"
  // modeSelect.appendChild(carOption)
  // modeSelect.appendChild(transitOption)
  while (mainDiv.firstChild) { mainDiv.removeChild(mainDiv.firstChild) }
  var mapDiv = document.createElement("div");
  mapDiv.id = "main-map";
  // mainDiv.appendChild(modeSelect);
  mainDiv.appendChild(mapDiv);
  this.googleMap = new google.maps.Map( mapDiv, {
    center: {lat: lat, lng: lng},
    zoom: zoom
  });
  this.geolocate = this.geolocate.bind(this);
  // this.centerMap = this.centerMap.bind(this);
  this.getDirections = this.getDirections.bind(this);
}

MapWrapper.prototype.getDirections = function(start, end, mode) {
  var directionsService = new google.maps.DirectionsService();
  var directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(this.googleMap);
  var request = {
    origin: start,
    destination: end,
    travelMode: mode
  }
  directionsService.route(request, function(result, status) {
    directionsRenderer.setDirections(result);
    displayDirections(result)
  });
}

MapWrapper.prototype.geolocate = function() {
  navigator.geolocation.getCurrentPosition;
  navigator.geolocation.getCurrentPosition(this.centerMap)
}

// MapWrapper.prototype.centerMap = function(position) {
//   var center = {lat: position.coords.latitude, lng: position.coords.longitude}
//   this.googleMap.setCenter(center);
// }

module.exports = MapWrapper;
