var MapWrapper = function(lat, lng, zoom) {
  var mainDiv = document.getElementById('main-div');
  while (mainDiv.firstChild) { mainDiv.removeChild(mainDiv.firstChild) }
  var mapDiv = document.createElement("div");
  mapDiv.id = "main-map";
  mainDiv.appendChild(mapDiv);
  this.googleMap = new google.maps.Map( mapDiv, {
    center: {lat: lat, lng: lng},
    zoom: zoom
  })
  this.googleMap.id = "map";

  var initDirections = function(map) {
    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();

    function initialize() {
      directionsDisplay = new google.maps.DirectionsRenderer();
      directionsDisplay.setMap(map);
      // console.log("this.googlemap: ",this.googleMap);
      // console.log(map);
      calcRoute();
    }

    function calcRoute() {
      var start = new google.maps.LatLng(53.850033, -0.6500523);
      var end = new google.maps.LatLng(51.5025, -0.1348);
      var request = {
        origin: start,
        destination: end,
        travelMode: 'DRIVING'
      };
      directionsService.route(request, function(result, status) {

        directionsDisplay.setDirections(result);
      });
    }

    initialize();

  }.bind(this);

  initDirections(this.googleMap);

}

module.exports = MapWrapper;
