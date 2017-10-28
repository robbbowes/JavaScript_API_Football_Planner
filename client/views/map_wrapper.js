var MapWrapper = function() {
  var container = document.getElementById('main-map');
  this.googleMap = new google.maps.Map( container, {
    center: {lat: 53.4808, lng: 2.2426},
    zoom: 6
  })
}

module.exports = MapWrapper;
