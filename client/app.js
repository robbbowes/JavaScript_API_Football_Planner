var requestHelper = require('./helpers/request_helper.js')
var teamsUrl = 'http://api.football-data.org/v1/competitions/445/teams'
var apitoken = 'X-Auth-Token'
var apikey = '16bf6721521f4342aca8f7c7656dff95'
var MapWrapper = require('./views/mapWrapper.js')

var populateDropdown = function(information) {
  var select = document.querySelector('#team-dropdown');
  while (select.firstChild) { select.removeChild(select.firstChild) }
  var teams = information.teams;
  teams.forEach(function(team) {
    var option = document.createElement("option");
    option.innerText = team.name;
    option.value = JSON.stringify(team);
    select.appendChild(option);
  })
}

var initMap = function() {
  var mainMap = new MapWrapper()
}

window.addEventListener("DOMContentLoaded", function() {
  requestHelper.getRequest(teamsUrl, populateDropdown, apitoken, apikey)

initMap();
})
