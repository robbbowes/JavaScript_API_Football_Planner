var requestHelper = require('./helpers/request_helper.js')
var teamsUrl = 'http://api.football-data.org/v1/competitions/445/teams'
var apitoken = 'X-Auth-Token'
var apikey = '16bf6721521f4342aca8f7c7656dff95'
var MapWrapper = require('./views/mapWrapper.js')


var initMap = function() {
  var mainMap = new MapWrapper()
}

window.addEventListener("DOMContentLoaded", function() {
  requestHelper.getRequest(teamsUrl, null, apitoken, apikey)

 initMap();

})
