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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var requestHelper = __webpack_require__(1)
var teamsUrl = 'http://api.football-data.org/v1/competitions/445/teams'
var apitoken = 'X-Auth-Token'
var apikey = '16bf6721521f4342aca8f7c7656dff95'
var MapWrapper = __webpack_require__(2)
var getLeagueTable = __webpack_require__(3);

var getTeamCrest = function(crestImg, fixture) {
  var url = fixture._links.homeTeam.href;
  requestHelper.getRequest(url, function(team) {
    crestImg.src = team.crestUrl;
  }, apitoken, apikey)
}

var populateFixturesList = function(team, upcomingFixtures) {
  var ul = document.querySelector("#away-fixtures-list");
  while (ul.firstChild) { ul.removeChild(ul.firstChild) }
  upcomingFixtures.forEach(function(fixture) {
    var li = document.createElement("li");
    var fixtureDiv = document.createElement("div");
    var homeTeamName = document.createElement("h5");
    homeTeamName.innerText = fixture.homeTeamName;
    var homeTeamCrest = document.createElement("img");
    homeTeamCrest.classList += "crest";
    getTeamCrest(homeTeamCrest, fixture);
    ul.appendChild(li);
    li.appendChild(fixtureDiv);
    fixtureDiv.appendChild(homeTeamName);
    fixtureDiv.appendChild(homeTeamCrest);
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
  var teams = information.teams;
  teams.forEach(function(team) {
    var option = document.createElement("option");
    option.innerText = team.name;
    option.value = JSON.stringify(team);
    select.appendChild(option);
  });
  getSelectedTeamFixtures(teams);
}

var initMap = function() {
  var mainMap = new MapWrapper()
}

window.addEventListener("DOMContentLoaded", function() {
  requestHelper.getRequest(teamsUrl, populateDropdown, apitoken, apikey);
});


/***/ }),
/* 1 */
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
    console.log(data);
    callback(data)
  })
  xhr.send()
},

}

module.exports = requestHelper


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var MapWrapper = function() {
  var container = document.getElementById('main-map');
  this.googleMap = new google.maps.Map( container, {
    center: {lat: 53.4808, lng: 2.2426},
    zoom: 6
  })
}

module.exports = MapWrapper;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var requestHelper = __webpack_require__(1);
var apitoken = 'X-Auth-Token';
var apikey = '16bf6721521f4342aca8f7c7656dff95';


var populateLeagueTable = function(leagueTable) {
  var table = document.getElementById("league-table");
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
  })
}


var getLeagueTable = function() {
  requestHelper.getRequest("http://api.football-data.org/v1/competitions/445/leagueTable", populateLeagueTable, apitoken, apikey)
}

module.exports = getLeagueTable


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map