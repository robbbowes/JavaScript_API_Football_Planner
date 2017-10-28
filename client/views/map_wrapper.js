var MapWrapper = function(lat, lng, zoom) {
  var container = document.getElementById('main-div');
  while (container.firstChild) { container.removeChild(container.firstChild) }
  var mapDiv = document.createElement("div");
  mapDiv.id = "main-map";
  container.appendChild(mapDiv);
  this.googleMap = new google.maps.Map( mapDiv, {
    center: {lat: lat, lng: lng},
    zoom: zoom
  })
}

module.exports = MapWrapper;
