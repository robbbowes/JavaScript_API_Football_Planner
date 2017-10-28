var MapWrapper = function() {
  var container = document.getElementById('main-div');
  while (container.firstChild) { container.removeChild(container.firstChild) }
  var mapDiv = document.createElement("div");
  mapDiv.id = "main-map";
  container.appendChild(mapDiv);
  this.googleMap = new google.maps.Map( mapDiv, {
    center: {lat: 53.4808, lng: 2.2426},
    zoom: 6
  })
}

module.exports = MapWrapper;
