var requestHelper = require('./helpers/request_helper.js')
var teamsUrl = 'http://api.football-data.org/v1/competitions/445/teams'
var apitoken = 'X-Auth-Token'
var apikey = '16bf6721521f4342aca8f7c7656dff95'
var MapWrapper = require('./views/map_wrapper.js')
var getLeagueTable = require("./views/table_view.js");
var dateTimeConverter = require("./helpers/date_time_converter.js");

var initialiseDirectionsButton = function(directionsButton) {
  directionsButton.addEventListener("click", function() {
    var homeTeamName = directionsButton.value;
    initMap(homeTeamName);
  });
}

var getTeamCrest = function(crestImg, fixture) {
  var url = fixture._links.homeTeam.href;
  requestHelper.getRequest(url, function(team) {
    crestImg.src = team.crestUrl;
  }, apitoken, apikey)
}

var populatePreviousFixturesList = function(team, previousFixtures) {
  var statsDiv = document.getElementById("stats-div");
  while (statsDiv.firstChild) { statsDiv.removeChild(statsDiv.firstChild) }
  var ul = document.createElement("ul");
  ul.id = "previous-fixtures-list";
  statsDiv.appendChild(ul);
  previousFixtures.forEach(function(fixture) {
    var li = document.createElement("li");
    li.innerText = fixture.homeTeamName + "   " + fixture.result.goalsHomeTeam +
      " - " + fixture.awayTeamName + "   " + fixture.result.goalsAwayTeam;
    ul.appendChild(li);
  })
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
    date.innerText = dateTimeConverter(fixture.date).date;
    var time = document.createElement("p");
    time.innerText = dateTimeConverter(fixture.date).time;
    var directionsButton = document.createElement("button");
    directionsButton.id = "directions-button";
    directionsButton.innerText = "Stadium Location";
    directionsButton.value = fixture.homeTeamName;
    mainDiv.appendChild(ul);
    ul.appendChild(li);
    li.appendChild(fixtureDiv);
    fixtureDiv.appendChild(homeTeamName);
    fixtureDiv.appendChild(homeTeamCrest);
    fixtureDiv.appendChild(date);
    fixtureDiv.appendChild(time);
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
      var previousFixtures = info.fixtures.filter(function(fixture) {
        return fixture.status === "FINISHED";
      });
      populatePreviousFixturesList(team, previousFixtures)
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

var initMap = function(teamName) {
  requestHelper.getRequest("http://localhost:3000/api/clubExtras", function(dbTeams) {
    console.log(teamName);
    var foundTeam = dbTeams.find(function(dbTeam) {
      return teamName === dbTeam.name;
    });
    var lat = foundTeam.latLng[0];
    var lng = foundTeam.latLng[1];
    var mainMap = new MapWrapper(lat, lng, 10);
  });
}

window.addEventListener("DOMContentLoaded", function() {
  requestHelper.getRequest(teamsUrl, populateDropdown, apitoken, apikey);
  // var directionsService = new google.maps.DirectionsService();
  // var directionsRenderer = new google.maps.DirectionsRenderer();
  //
  // var initialise = function() {
  //   var directionsRenderer = new google.maps.DirectionsRenderer();
  //   var mapDiv = document.createElement("div");
  //   var container = document.getElementById("main-div");
  //   container.appendChild(mapDiv);
    // var map = new google.maps.Map(mapDiv, {
    //   zoom: 7,
    //   center: {lat: 0, lng: 0}
    // });
    // mapDiv.id = "test-map-div";
  //   directionsRenderer.setMap(map);
  //   calcRoute();
  // }
  //
  // var calcRoute = function() {
  //   var directionsRequest = {
  //     origin: "joplin, mo",
  //     destination: "flagstaff, az",
  //     travelMode: "DRIVING"
  //   }
  //   directionsService.route(directionsRequest, function(result, status) {
  //     directionsRenderer.setDirections(result);
  //   })
  // }
  //
  // initialise();

//////////////////////////////////////////////////
//
//   var directionsDisplay;
// var directionsService = new google.maps.DirectionsService();
// var map;
//
// function initialize() {
//   directionsDisplay = new google.maps.DirectionsRenderer();
//   var chicago = new google.maps.LatLng(41.850033, -87.6500523);
//   var mapOptions = {
//     zoom:7,
//     center: chicago
//   }
//   map = new google.maps.Map(document.getElementById('map');
//   directionsDisplay.setMap(map);
//   calcRoute();
// }
//
// function calcRoute() {
//   var start = document.getElementById('start').value;
//   var end = document.getElementById('end').value;
//   var request = {
//     origin: start,
//     destination: end,
//     travelMode: 'DRIVING'
//   };
//   directionsService.route(request, function(result, status) {
//     if (status == 'OK') {
//       directionsDisplay.setDirections(result);
//     }
//   });
// }
//
// initialize();

});
