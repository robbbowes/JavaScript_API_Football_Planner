var MapWrapper = function(lat, lng, zoom) {
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
  this.centerMap = this.centerMap.bind(this);
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
  });
}

MapWrapper.prototype.geolocate = function() {
  navigator.geolocation.getCurrentPosition;
  navigator.geolocation.getCurrentPosition(this.centerMap)
}

MapWrapper.prototype.centerMap = function(position) {
  var center = {lat: position.coords.latitude, lng: position.coords.longitude}
  this.googleMap.setCenter(center);
}

// var initDirections = function(map) {
//   var directionsDisplay;
//   var directionsService = new google.maps.DirectionsService();
//
//   function initialize() {
//     directionsDisplay = new google.maps.DirectionsRenderer();
//     directionsDisplay.setMap(map);
//     calcRoute();
//   }
//
//   function calcRoute() {
//     var start = "Ipswich";
//     var end = new google.maps.LatLng(51.5025, -0.1348);
//     var request = {
//       origin: start,
//       destination: end,
//       travelMode: 'DRIVING'
//     };
//     directionsService.route(request, function(result, status) {
//       console.log(result);
//       directionsDisplay.setDirections(result);
//     });
//   }
//
//   initialize();
//
// }
//
// initDirections(this.googleMap);

module.exports = MapWrapper;
