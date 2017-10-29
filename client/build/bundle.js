/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var requestHelper = {

  getRequest: function(url, callback, token, key) {
  var xhr = new XMLHttpRequest()
  xhr.open('GET', url)
  if (token && key !== null) {
    xhr.setRequestHeader(token, key)
  }

  xhr.addEventListener('load', function() {
    var jsonString = xhr.responseText
    var data = JSON.parse(jsonString)
    callback(data)
  })
  xhr.send()
},

}

module.exports = requestHelper


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var requestHelper = __webpack_require__(0);
var teamsUrl = 'http://api.football-data.org/v1/competitions/445/teams';
var apitoken = 'X-Auth-Token';
var ApiIterator = __webpack_require__(5);
var apiIterator = new ApiIterator();
var MapWrapper = __webpack_require__(2);
var getLeagueTable = __webpack_require__(3);
var dateTimeConverter = __webpack_require__(4);

var initialiseDirectionsButton = function(directionsButton) {
  directionsButton.addEventListener("click", function() {
    var homeTeamName = directionsButton.value;
    initMap(homeTeamName);
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
  var ul = document.createElement("ul");
  ul.id = "previous-fixtures-list";
  statsDiv.appendChild(ul);

  var li = document.createElement("li");
  var h5 = document.createElement("h5");
  h5.innerText = "PREVIOUS FIXTURES";
  ul.appendChild(li);
  li.appendChild(h5);

  previousFixtures.forEach(function(fixture) {
    var li1 = document.createElement("li");
    var li2 = document.createElement("li");
    // var liBreak = document.createElement("li");

    // var br = document.createElement("br");
    li1.innerText = fixture.homeTeamName + "   " + fixture.result.goalsHomeTeam
    li2.innerText = fixture.awayTeamName + "   " + fixture.result.goalsAwayTeam;
    li2.id = "previous-fixture";
    // liBreak.innerText = " ";

    // li.innerHTML = fixture.homeTeamName + "   " + fixture.result.goalsHomeTeam
    // + br + fixture.awayTeamName + "   " + fixture.result.goalsAwayTeam;
    ul.appendChild(li1);
    ul.appendChild(li2);
    // ul.appendChild(liBreak);
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

var setClubLogo = function(team) {
  var logo = document.getElementById("club-logo");
  logo.src = team.crestUrl;
}

var setBackground = function (team) {
  var mainDiv = document.getElementById("main-div");
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
      var previousFixtures = info.fixtures.filter(function(fixture) {
        return fixture.status === "FINISHED";
      });
      populatePreviousFixturesList(team, previousFixtures)
      var upcomingFixtures = info.fixtures.filter(function(fixture) {
        return fixture.homeTeamName !== team.name
              && fixture.status !== "FINISHED";
      });
      populateFixturesList(team, upcomingFixtures);
      setClubLogo(team);
      setBackground(team);
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
  var apikey = apiIterator.getKey();
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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var requestHelper = __webpack_require__(0);
var apitoken = 'X-Auth-Token';
var apikey = '16bf6721521f4342aca8f7c7656dff95';


var populateLeagueTable = function(leagueTable) {
  var select = document.getElementById("team-dropdown");
  var selectedTeam = JSON.parse(select.value);
  var selectedTeamName = selectedTeam.name;

  var table = document.getElementById("league-table");
  while (table.firstChild) { table.removeChild(table.firstChild) }
  var thead = document.createElement("thead");
  var theadRow = document.createElement("tr");
  var hRank = document.createElement("tr");
  hRank.innerText = "Rank";
  var hTeam = document.createElement("td");
  hTeam.innerText = "Team";
  var hPlayed = document.createElement("td");
  hPlayed.innerText = "P";
  var hGoalDifference = document.createElement("td");
  hGoalDifference.innerText = "GD";
  var hPoints = document.createElement("td");
  hPoints.innerText = "Pts"
  table.appendChild(thead);
  thead.appendChild(theadRow);
  theadRow.appendChild(hRank);
  theadRow.appendChild(hTeam);
  theadRow.appendChild(hPlayed);
  theadRow.appendChild(hGoalDifference);
  theadRow.appendChild(hPoints);

  var tbody = document.createElement("tbody");
  table.appendChild(tbody);
  leagueTable.standing.forEach(function(team) {
    var tr = document.createElement("tr");
    var rank = document.createElement("td");
    rank.innerText = team.position;
    var teamName = document.createElement("td");
    teamName.innerText = team.teamName;
    var teamPlayed = document.createElement("td");
    teamPlayed.innerText = team.playedGames;
    var teamGD = document.createElement("td");
    teamGD.innerText = team.goalDifference;
    var teamPoints = document.createElement("td");
    teamPoints.innerText = team.points;
    tbody.appendChild(tr);
    tr.appendChild(rank);
    tr.appendChild(teamName);
    tr.appendChild(teamPlayed);
    tr.appendChild(teamGD);
    tr.appendChild(teamPoints);
    if (selectedTeamName === team.teamName) {tr.classList += "highlighted"}
  })
}


var getLeagueTable = function() {
  requestHelper.getRequest("http://api.football-data.org/v1/competitions/445/leagueTable", populateLeagueTable, apitoken, apikey)
}

module.exports = getLeagueTable


/***/ }),
/* 4 */
/***/ (function(module, exports) {

var dateTimeConverter = function(string) {
  //year
  var year = string.substring(0, 4);

  //month
  var month;
  switch (string.substring(5, 7)) {
    case "01" : month = "January"; break;
    case "02" : month = "February"; break;
    case "03" : month = "March"; break;
    case "04" : month = "April"; break;
    case "05" : month = "May"; break;
    case "06" : month = "June"; break;
    case "07" : month = "July"; break;
    case "08" : month = "August"; break;
    case "09" : month = "September"; break;
    case "10" : month = "October"; break;
    case "11" : month = "November"; break;
    case "12" : month = "December";
  }

  //day
  var day = string.substring(8, 10);
  if (day.substring(0, 1) === "0") { day = day.substring(1, 2)}
  switch (day) {
    case "1" : day = day.concat("st"); break;
    case "21": day = day.concat("st"); break;
    case "31": day = day.concat("st"); break;
    case "2" : day = day.concat("nd"); break;
    case "22": day = day.concat("nd"); break;
    case "3" : day = day.concat("rd"); break;
    case "23": day = day.concat("rd"); break;
    default  : day = day.concat("th");
  }

  //date and time
  var date = day + " " + month + " " + year;
  var time = string.substring(11, 16);
  var info = {
    date: date,
    time: time
  }
  return info;
}

module.exports = dateTimeConverter;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

var ApiIterator = function() {
  this.apiKeys = ["3d6c8c6d3b7842f2b6b4b6c1575ecdb4",
                 "16bf6721521f4342aca8f7c7656dff95",
                 "3a097a6f21e3466ea51f1c49cf3e657c",
                 "cf32777623b9432c8b8c34072e44a1fd"]
  this.index = 0
}

ApiIterator.prototype.getKey = function() {
  if ((this.index + 1) < this.apiKeys.length - 1) { this.index ++ }
  if ((this.index + 1) > this.apiKeys.length - 1) { this.index = 0 }
  return this.apiKeys[0];
}

module.exports = ApiIterator;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map