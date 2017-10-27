var MapWrapper = function() {
  var container = document.getElementById('main-map');
  this.googleMap = new google.maps.Map( container, {
    center: {lat: 40, lng: 50},
    zoom: 10
  })
}

module.exports = MapWrapper;
