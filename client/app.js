var requestHelper = require('./helpers/request_helper.js')
var teamsUrl = 'http://api.football-data.org/v1/competitions/445/teams'
var apitoken = 'X-Auth-Token'
var apikey = '16bf6721521f4342aca8f7c7656dff95'
var MapWrapper = require('./views/map_wrapper.js')
var getLeagueTable = require("./views/table_view.js");

var initialiseDirectionsButton = function(directionsButton) {
  directionsButton.addEventListener("click", function() {
    var select = document.getElementById("team-dropdown");
    var team = JSON.parse(select.value);
    initMap(team);
  });
}

var getTeamCrest = function(crestImg, fixture) {
  var url = fixture._links.homeTeam.href;
  requestHelper.getRequest(url, function(team) {
    crestImg.src = team.crestUrl;
  }, apitoken, apikey)
}


var populateFixturesList = function(team, upcomingFixtures) {
  var mainDiv = document.getElementById("main-div");
  while (mainDiv.firstChild) { mainDiv.removeChild(mainDiv.firstChild) }
  var ul = document.createElement("ul");
  ul.id = "away-fixtures-list";
  upcomingFixtures.forEach(function(fixture) {
    var li = document.createElement("li");
    var fixtureDiv = document.createElement("div");
    fixtureDiv.id = "fixture-div";
    var homeTeamName = document.createElement("h5");
    homeTeamName.id = "home-team-name";
    homeTeamName.innerText = fixture.homeTeamName + " (AWAY)";
    var homeTeamCrest = document.createElement("img");
    homeTeamCrest.classList += "crest";
    getTeamCrest(homeTeamCrest, fixture);
    var date = document.createElement("p");
    date.innerText = fixture.date;
    var directionsButton = document.createElement("button");
    directionsButton.id = "directions-button";
    directionsButton.innerText = "Stadium Location";
    directionsButton.value = fixture;
    mainDiv.appendChild(ul);
    ul.appendChild(li);
    li.appendChild(fixtureDiv);
    fixtureDiv.appendChild(homeTeamName);
    fixtureDiv.appendChild(homeTeamCrest);
    fixtureDiv.appendChild(date);
    fixtureDiv.appendChild(directionsButton);
    initialiseDirectionsButton(directionsButton);
  });
}

var getSelectedTeamFixtures = function(teams) {
  var select = document.querySelector("#team-dropdown");
  select.addEventListener("change", function() {
    var team = JSON.parse(select.value);
    var fixturesUrl = team._links.fixtures.href;
    requestHelper.getRequest(fixturesUrl, function(info) {
      var upcomingFixtures = info.fixtures.filter(function(fixture) {
        return fixture.homeTeamName !== team.name
              && fixture.status !== "FINISHED";
      });
      populateFixturesList(team, upcomingFixtures);
    }, apitoken, apikey)
    getLeagueTable();
  })
}

var populateDropdown = function(information) {
  var select = document.querySelector('#team-dropdown');
  while (select.firstChild) { select.removeChild(select.firstChild) }
  var disabledOption = document.createElement("option");
  disabledOption.innerText = "Choose your team";
  disabledOption.disabled = true;
  disabledOption.selected = true;
  var teams = information.teams;
  select.appendChild(disabledOption);
  teams.forEach(function(team) {
    var option = document.createElement("option");
    option.innerText = team.name;
    option.value = JSON.stringify(team);
    select.appendChild(option);
  });
  getSelectedTeamFixtures(teams);
}

var initMap = function(team) {
  var mainMap = new MapWrapper()
  console.log(team);
}

window.addEventListener("DOMContentLoaded", function() {
  requestHelper.getRequest(teamsUrl, populateDropdown, apitoken, apikey);
});
