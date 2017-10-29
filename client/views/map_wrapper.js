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
}

module.exports = MapWrapper;
