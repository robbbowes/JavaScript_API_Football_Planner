var requestHelper = require('./helpers/request_helper.js');
var teamsUrl = 'http://api.football-data.org/v1/competitions/445/teams';
var apitoken = 'X-Auth-Token';
var ApiIterator = require("./helpers/api_iterator.js");
var apiIterator = new ApiIterator();
var MapWrapper = require('./views/map_wrapper.js');
var getLeagueTable = require("./views/table_view.js");
var initialiseTransitDropdown = require("./views/transit_dropdown_view.js");
var dateTimeConverter = require("./helpers/date_time_converter.js");

var initialiseDirectionsButton = function(directionsButton) {
  directionsButton.addEventListener("click", function() {
    var mainDiv = document.getElementById("main-div");
    mapWrapper.newMap(mainDiv);
    var currentPosition;
    navigator.geolocation.getCurrentPosition(function(result) {
      currentPosition = {lat: result.coords.latitude, lng: result.coords.longitude}
      var homeTeamName = directionsButton.value;
      requestHelper.getRequest("http://localhost:3000/api/clubExtras", function(dbTeams) {
        var foundTeam = dbTeams.find(function(dbTeam) {
          return homeTeamName === dbTeam.name;
        });
        var end = {
          lat: foundTeam.latLng[0],
          lng: foundTeam.latLng[1]
        }
        var jsonEnd = JSON.stringify(end);
        localStorage.setItem("current-end-location", jsonEnd);
        var mode = "DRIVING"
        mapWrapper.getDirections(currentPosition, end, mode);
        initialiseTransitDropdown(mapWrapper);
      });
    });
  });
}

var getTeamCrest = function(crestImg, fixture) {
  var url = fixture._links.homeTeam.href;
  var apikey = apiIterator.getKey();
  requestHelper.getRequest(url, function(team) {
    crestImg.src = team.crestUrl;
  }, apitoken, apikey)
}

var populatePreviousFixturesList = function(team, previousFixtures) {
  var statsDiv = document.getElementById("stats-div");
  while (statsDiv.firstChild) { statsDiv.removeChild(statsDiv.firstChild) }
  statsDiv.style.backgroundColor = "white"
  var ul = document.createElement("ul");
  ul.id = "previous-fixtures-list";
  statsDiv.appendChild(ul);
  var li = document.createElement("li");
  var h5 = document.createElement("h5");
  h5.innerText = "PREVIOUS FIXTURES";
  ul.appendChild(li);
  li.appendChild(h5);
  previousFixtures = previousFixtures.reverse();
  previousFixtures.forEach(function(fixture) {
    var li1 = document.createElement("li");
    var li2 = document.createElement("li");
    li1.innerText = fixture.homeTeamName + "   " + fixture.result.goalsHomeTeam
    li2.innerText = fixture.awayTeamName + "   " + fixture.result.goalsAwayTeam;
    li2.id = "previous-fixture";
    ul.appendChild(li1);
    ul.appendChild(li2);
  })
}

var populateFixturesList = function(team, upcomingFixtures) {
  var mainDiv = document.getElementById("main-div");
  while (mainDiv.firstChild) { mainDiv.removeChild(mainDiv.firstChild) }
  // var ul = document.createElement("ul");
  // ul.id = "away-fixtures-list";
  upcomingFixtures.forEach(function(fixture) {
    // var li = document.createElement("li");
    var fixtureDiv = document.createElement("div");
    fixtureDiv.id = "fixture-div";
    var homeTeamName = document.createElement("h5");
    homeTeamName.id = "home-team-name";
    homeTeamName.innerText = fixture.homeTeamName;
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
    // mainDiv.appendChild(ul);
    // ul.appendChild(li);
    mainDiv.appendChild(fixtureDiv)
    // li.appendChild(fixtureDiv);
    fixtureDiv.appendChild(homeTeamCrest);
    fixtureDiv.appendChild(homeTeamName);
    fixtureDiv.appendChild(date);
    fixtureDiv.appendChild(time);
    fixtureDiv.appendChild(directionsButton);

    initialiseDirectionsButton(directionsButton);
  });
}

var setClubLogo = function(team) {
  var logo = document.getElementById("club-logo");
  logo.src = team.crestUrl;
}

var setBackground = function (team) {
  var mainDiv = document.getElementById("main-header");
  switch(team.name) {
    case "Newcastle United FC": mainDiv.className = "Newcastle"; break;
    case "Manchester City FC": mainDiv.className = "ManCity"; break;
    case "Manchester United FC": mainDiv.className = "ManUtd"; break;
    case "Tottenham Hotspur": mainDiv.className = "Tottenham"; break;
    case "Chelsea FC": mainDiv.className = "Chelsea"; break;
    case "Arsenal FC": mainDiv.className = "Arsenal"; break;
    case "Liverpool FC": mainDiv.className = "Liverpool"; break;
    case "Watford FC": mainDiv.className = "Watford"; break;
    case "Burnley FC": mainDiv.className = "Burnley"; break;
    case "Southampton FC": mainDiv.className = "Southampton"; break;
    case "Huddersfield Town": mainDiv.className = "Huddersfield"; break;
    case "Brighton & Hove Albion": mainDiv.className = 'Brighton'; break;
    case "Stoke City FC": mainDiv.className = "Stoke"; break;
    case "West Bromwich Albion FC": mainDiv.className = "WBA"; break;
    case "Leicester City FC": mainDiv.className = "Leicester"; break;
    case "Crystal Palace FC": mainDiv.className = "Palace"; break;
    case "Swansea City FC": mainDiv.className = "Swansea"; break;
    case "Everton FC": mainDiv.className = "Everton"; break;
    case "AFC Bournemouth": mainDiv.className = "Bournemouth"; break;
    case "West Ham United FC": mainDiv.className = "WHAM"; break;
    default: mainDiv.className = "Swansea";
  }
}

var getSelectedTeamFixtures = function(teams) {
  var select = document.querySelector("#team-dropdown");
  select.addEventListener("change", function() {
    var apikey = apiIterator.getKey();
    var team = JSON.parse(select.value);
    var fixturesUrl = team._links.fixtures.href;
    requestHelper.getRequest(fixturesUrl, function(info) {
      // var previousFixtures = info.fixtures.filter(function(fixture) {
      //   return fixture.status === "FINISHED";
      // });
      // populatePreviousFixturesList(team, previousFixtures)
      var upcomingFixtures = info.fixtures.filter(function(fixture) {
        return fixture.homeTeamName !== team.name
              && fixture.status !== "FINISHED";
      });
      populateFixturesList(team, upcomingFixtures);
      setClubLogo(team);
      setBackground(team);
    }, apitoken, apikey)
    var jsonString = JSON.stringify(team);
    localStorage.setItem("team", jsonString);
    getLeagueTable();
  })
}

var populateDropdown = function(information) {
  var select = document.querySelector('#team-dropdown');
  while (select.firstChild) { select.removeChild(select.firstChild) }
  var disabledOption = document.createElement("option");
  disabledOption.innerText = "Choose a different team";
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

var getStoredTeamFixtures = function(team) {
  var apikey = apiIterator.getKey();
  var fixturesUrl = team._links.fixtures.href;
  requestHelper.getRequest(fixturesUrl, function(info) {
    var upcomingFixtures = info.fixtures.filter(function(fixture) {
      return fixture.homeTeamName !== team.name
            && fixture.status !== "FINISHED";
    });
    populateFixturesList(team, upcomingFixtures);
    setClubLogo(team);
    setBackground(team);
  }, apitoken, apikey)
}

window.addEventListener("DOMContentLoaded", function() {
  mapWrapper = new MapWrapper();
  var apikey = apiIterator.getKey();
  requestHelper.getRequest(teamsUrl, populateDropdown, apitoken, apikey);
  var jsonString = localStorage.getItem("team");
  if (jsonString !== null) {
    savedTeam = JSON.parse(jsonString)
    getStoredTeamFixtures(savedTeam)
  }
  getLeagueTable()
});
