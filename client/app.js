var requestHelper = require('./helpers/request_helper.js');
var teamsUrl = 'http://api.football-data.org/v1/competitions/445/teams';
var apitoken = 'X-Auth-Token';
var ApiIterator = require("./helpers/api_iterator.js");
var apiIterator = new ApiIterator();
var MapWrapper = require('./views/map_wrapper.js');
var getLeagueTable = require("./views/table_view.js");
var initialiseTransitDropdown = require("./views/transit_dropdown_view.js");
var dateTimeConverter = require("./helpers/date_time_converter.js");
var teamCrests = require("./helpers/crests.js");

var removeBackButton = function() {
  var div = document.getElementById("team-dropdown-div");
  var button = document.getElementById("back-button");
  if (button) div.removeChild(button);
}

var initialiseFixtureInfo = function(jsonFixture) {
  var fixture = JSON.parse(jsonFixture);
  var homeTeamName = document.createElement("h3");
  homeTeamName.innerText = fixture.homeTeamName;
  var awayTeamName = document.createElement("h3");
  awayTeamName.innerText = fixture.awayTeamName;
  var homeTeamCrest = document.createElement("img");
  getHomeTeamCrest(homeTeamCrest, fixture);
  homeTeamCrest.classList += "crest"
  var awayTeamCrest = document.createElement("img");
  getAwayTeamCrest(awayTeamCrest, fixture);
  awayTeamCrest.classList += "crest"
  var homeDiv = document.createElement("div");
  homeDiv.appendChild(homeTeamCrest);
  homeDiv.appendChild(homeTeamName);
  homeDiv.id = "home-div";
  var awayDiv = document.createElement("div");
  awayDiv.appendChild(awayTeamCrest);
  awayDiv.appendChild(awayTeamName);
  awayDiv.id = "away-div";
  var fixtureDiv = document.createElement("div");
  var vs = document.createElement("p");
  vs.id = "vs";
  vs.innerText = "vs";
  fixtureDiv.appendChild(homeDiv);
  fixtureDiv.appendChild(vs);
  fixtureDiv.appendChild(awayDiv);
  fixtureDiv.id = "away-fixture-team-div";

  var awayFixtureInfoDiv = document.getElementById("away-fixture-info-div");
  awayFixtureInfoDiv.appendChild(fixtureDiv);

  var stadiumImg = document.createElement("img");
  requestHelper.getRequest("http://localhost:3000/api/clubExtras", function(dbTeams) {
    var foundTeam = dbTeams.find(function(dbTeam) {
      console.log(dbTeam.name);
      console.log(homeTeamName);
      return dbTeam.name === homeTeamName.innerText;
    });
    stadiumImg.src = foundTeam.stadiumPicture;
  });
  stadiumImg.id = "stadium-image";
  awayFixtureInfoDiv.appendChild(stadiumImg);


}

var initialiseFavouriteButton = function(jsonFixture) {
  var fixture = JSON.parse(jsonFixture);
}

var initialiseBackButton = function() {
  var button = document.createElement("button");
  button.innerText = "Return to fixtures";
  button.id = "back-button";
  var header = document.getElementById("team-dropdown-div");
  header.appendChild(button);
  button.addEventListener("click", function() {
    var instructionsDiv = document.getElementById("instructions-div");
    while (instructionsDiv.firstChild) { instructionsDiv.removeChild(instructionsDiv.firstChild) }
    var statsDiv = document.getElementById("stats-div");
    while (statsDiv.firstChild) { statsDiv.removeChild(statsDiv.firstChild) }
    var team = JSON.parse(localStorage.getItem("team"));
    getStoredTeamFixtures(team);
    removeBackButton();
  });
}

var initialiseDirectionsButton = function(directionsButton) {
  directionsButton.addEventListener("click", function() {
    var mainDiv = document.getElementById("main-div");
    while (mainDiv.firstChild) { mainDiv.removeChild(mainDiv.firstChild) }
    var awayFixtureInfoDiv = document.createElement("div");
    awayFixtureInfoDiv.id = "away-fixture-info-div";
    mainDiv.appendChild(awayFixtureInfoDiv);
    var statsDiv = document.getElementById("stats-div");
    mapWrapper.newMap(statsDiv);
    var currentPosition;
    navigator.geolocation.getCurrentPosition(function(result) {
      currentPosition = {lat: result.coords.latitude, lng: result.coords.longitude}
      var homeTeamName = JSON.parse(directionsButton.value).homeTeamName;
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
        initialiseFixtureInfo(directionsButton.value)
        initialiseFavouriteButton(directionsButton.value)
        initialiseTransitDropdown(mapWrapper);
        initialiseBackButton();
      });
    });
  });
}

var getHomeTeamCrest = function(crestImg, fixture) {
  homeTeamName = fixture.homeTeamName;
  teamCrests.forEach(function(team) {
    if(team.name === homeTeamName) {
      crestImg.src = team.url
    }
  })
}

var getAwayTeamCrest = function(crestImg, fixture) {
  awayTeamName = fixture.awayTeamName;
  var team = teamCrests.find(function(team) {
    return team.name === awayTeamName
  });
  crestImg.src = team.url;
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

// var initialiseStar = function(fixture) {
//   var star = fixture.star;
//   star.addEventListener("click", function() {
//     star.selected = !star.selected;
//     if (star.selected) {
//       star.src = "https://thecliparts.com/wp-content/uploads/2017/04/dark-blue-star-clipart.png";
//       var favouriteFixtures = JSON.parse(localStorage.getItem("favouriteFixtures")) || [];
//       favouriteFixtures.push(fixture);
//       console.log(favouriteFixtures);
//       localStorage.setItem("favouriteFixtures", JSON.stringify(favouriteFixtures));
//     }
//     if (!star.selected) {
//       star.src = "http://images.clipartpanda.com/star-clipart-black-and-white-RTG7BpqTL.png";
//       var favouriteFixtures = JSON.parse(localStorage.getItem("favouriteFixtures")) || [];
//       var newFavouriteFixtures = favouriteFixtures.filter(function(localStorageFixture) {
//         return fixture.homeTeamName === localStorageFixture.homeTeamName
//               && fixture.awayTeamName === localStorageFixture.awayTeamName;
//       });
//       console.log(newFavouriteFixtures);
//       localStorage.setItem("favouriteFixtures", JSON.stringify(newFavouriteFixtures));
//     }
//   });
// }

var populateFixturesList = function(team, upcomingFixtures) {
  var mainDiv = document.getElementById("main-div");
  while (mainDiv.firstChild) { mainDiv.removeChild(mainDiv.firstChild) }
  upcomingFixtures.forEach(function(fixture) {
    var fixtureDiv = document.createElement("div");
    fixtureDiv.id = "fixture-div";
    var homeTeamName = document.createElement("h5");
    homeTeamName.id = "home-team-name";
    homeTeamName.innerText = fixture.homeTeamName;
    // var star = document.createElement("img");
    // star.id = "star";
    // fixture.star = star;
    // initialiseStar(fixture);
    // console.log(star.selected);
    var homeTeamCrest = document.createElement("img");
    homeTeamCrest.classList += "crest";
    getHomeTeamCrest(homeTeamCrest, fixture);
    var date = document.createElement("p");
    date.innerText = dateTimeConverter(fixture.date).date;
    var time = document.createElement("p");
    time.innerText = dateTimeConverter(fixture.date).time;
    var directionsButton = document.createElement("button");
    directionsButton.id = "directions-button";
    directionsButton.innerText = "Get Directions";
    directionsButton.value = JSON.stringify(fixture);
    mainDiv.appendChild(fixtureDiv)
    // fixtureDiv.appendChild(star)
    fixtureDiv.appendChild(homeTeamCrest);
    fixtureDiv.appendChild(homeTeamName);
    fixtureDiv.appendChild(date);
    fixtureDiv.appendChild(time);
    fixtureDiv.appendChild(directionsButton);
    initialiseDirectionsButton(directionsButton);
  });
}

// var setClubTitle = function(team) {
//   var title = document.createElement("h2");
//   title.innerText = team.name;
//   var header = document.getElementById("main-header");
//   header.appendChild(title);
// }

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
    var statsDiv = document.getElementById("stats-div");
    while (statsDiv.firstChild) { statsDiv.removeChild(statsDiv.firstChild) }
    var apikey = apiIterator.getKey();
    var team = JSON.parse(select.value);
    var fixturesUrl = team._links.fixtures.href;
    requestHelper.getRequest(fixturesUrl, function(info) {
      var upcomingFixtures = info.fixtures.filter(function(fixture) {
        return fixture.homeTeamName !== team.name
              && fixture.status !== "FINISHED"
              && fixture.matchday > 10;
      });
      populateFixturesList(team, upcomingFixtures);
      setClubLogo(team);
      removeBackButton();
      // setClubTitle(team);
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
  var statsDiv = document.getElementById("stats-div");
  while (statsDiv.firstChild) { statsDiv.removeChild(statsDiv.firstChild) }
  var apikey = apiIterator.getKey();
  var fixturesUrl = team._links.fixtures.href;
  requestHelper.getRequest(fixturesUrl, function(info) {
    var upcomingFixtures = info.fixtures.filter(function(fixture) {
      return fixture.homeTeamName !== team.name
            && fixture.status !== "FINISHED"
            && fixture.matchday > 10;
    });
    populateFixturesList(team, upcomingFixtures);
    removeBackButton();
    setClubLogo(team);
    // setClubTitle(team);
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
  var plLogo = document.getElementById("premier-league-logo")
  plLogo.addEventListener("click", function() {
    var jsonString = localStorage.getItem("team");
    if (jsonString !== null) {
      savedTeam = JSON.parse(jsonString)
      getStoredTeamFixtures(savedTeam)
    }
  })
  getLeagueTable()
});
