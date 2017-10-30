var displayDirections = require("./displayDirections");

var MapWrapper = function(lat, lng, zoom, initialiseTransitDropdown) {
  var mainDiv = document.getElementById('main-div');

  while (mainDiv.firstChild) { mainDiv.removeChild(mainDiv.firstChild) }
  var mapDiv = document.createElement("div");
  mapDiv.id = "main-map";
  mainDiv.appendChild(mapDiv);
  this.googleMap = new google.maps.Map( mapDiv, {
    center: {lat: lat, lng: lng},
    zoom: zoom
  });
  this.geolocate = this.geolocate.bind(this);
  // this.centerMap = this.centerMap.bind(this);
  this.getDirections = this.getDirections.bind(this);
  this.initialiseTransitDropdown = initialiseTransitDropdown;
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
    this.initialiseTransitDropdown();
  }.bind(this));
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
