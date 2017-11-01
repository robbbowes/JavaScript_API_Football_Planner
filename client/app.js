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
var clearHTML = require("./helpers/clearHTML.js")

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
  homeTeamCrest.classList += "fixture-crest"
  var awayTeamCrest = document.createElement("img");
  getAwayTeamCrest(awayTeamCrest, fixture);
  awayTeamCrest.classList += "fixture-crest"
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

  var ticketForm = document.createElement("form");
  var input = document.createElement("input");
  input.type = "submit";
  input.value = "Buy Tickets"
  ticketForm.appendChild(input);
  input.id = "ticket-button";

  requestHelper.getRequest("http://localhost:3000/api/clubExtras", function(dbTeams) {
    var foundTeam = dbTeams.find(function(dbTeam) {
      return dbTeam.name === awayTeamName.innerText;
    });
    ticketForm.action = foundTeam.ticketLink;
  });

  var star = document.createElement("img");
  star.selected = fixture.star.selected;
  fixture.star = star;
  star.id = "star"
  initialiseStar(fixture);



  var awayFixtureInfoDiv = document.getElementById("away-fixture-info-div");
  awayFixtureInfoDiv.appendChild(fixtureDiv);
  awayFixtureInfoDiv.appendChild(ticketForm);
  fixtureDiv.appendChild(star);

  var stadiumName = document.createElement("p");
  stadiumName.id = "stadium-name";
  requestHelper.getRequest("http://localhost:3000/api/clubExtras", function(dbTeams) {
    var foundTeam = dbTeams.find(function(dbTeam) {
      return dbTeam.name === homeTeamName.innerText;
    });
    stadiumName.innerText = foundTeam.stadiumName;
  });

  var stadiumImg = document.createElement("img");

  requestHelper.getRequest("http://localhost:3000/api/clubExtras", function(dbTeams) {
    var foundTeam = dbTeams.find(function(dbTeam) {
      return dbTeam.name === homeTeamName.innerText;
    });
    stadiumImg.src = foundTeam.stadiumPicture;
  });
  stadiumImg.id = "stadium-image";

  awayFixtureInfoDiv.appendChild(stadiumName);
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
    clearHTML("instructions-div");
    var statsDiv = document.getElementById("stats-div");
    clearHTML("stats-div");
    var team = JSON.parse(localStorage.getItem("team"));
    getStoredTeamFixtures(team);
    removeBackButton();
  });
}

var initialiseFavouritesButton = function() {
  var button = document.createElement("button");
  button.innerText = "Favourites";
  button.id = "favourites-button";
  var header = document.getElementById("team-dropdown-div");
  var previousButton = document.getElementById("favourites-button");
  if (previousButton) header.removeChild(previousButton);
  header.appendChild(button);
  button.addEventListener("click", function() {
    var mainDiv = document.getElementById("main-div");
    clearHTML("main-div");
    var statsDiv = document.getElementById("stats-div");
    clearHTML("stats-div");
    removeBackButton();
    var favouriteFixtures = JSON.parse(localStorage.getItem("favouriteFixtures")) || [];
    populateFixturesList(null, favouriteFixtures);
  })
}

var initialiseDirectionsButton = function(directionsButton) {
  directionsButton.addEventListener("click", function() {
    var container = document.getElementById("container");
    // var table = document.getElementById("table-div");
    var loadingDiv = document.createElement("div");
    loadingDiv.id = "loading-div"
    var loadingImg = document.createElement("img");
    document.body.appendChild(loadingImg);
    loadingImg.id = "loading-image"
    container.appendChild(loadingDiv);
    loadingImg.src = "https://cdn.dribbble.com/users/494229/screenshots/1601132/loadingicon14.gif"
    clearHTML("main-div");
    var awayFixtureInfoDiv = document.createElement("div");
    awayFixtureInfoDiv.id = "away-fixture-info-div";
    var mainDiv = document.getElementById("main-div")
    mainDiv.appendChild(awayFixtureInfoDiv);
    // table.id = "hidden"
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
        initialiseFixtureInfo(directionsButton.value);
        initialiseTransitDropdown(mapWrapper);
        initialiseBackButton();
        initialiseFavouritesButton();
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
  clearHTML("stats-div");
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

var initialiseStar = function(fixture) {
  var star = fixture.star;
  var favouriteFixtures = JSON.parse(localStorage.getItem("favouriteFixtures")) || [];
  var foundFixture = favouriteFixtures.find(function(localStorageFixture) {
    return fixture.homeTeamName === localStorageFixture.homeTeamName
          && fixture.awayTeamName === localStorageFixture.awayTeamName;
  });
  if (foundFixture) {
    star.src = "https://thecliparts.com/wp-content/uploads/2017/04/dark-blue-star-clipart.png";
    star.selected = true;
  }
  if (!foundFixture) {
    star.src = "http://images.clipartpanda.com/star-clipart-black-and-white-RTG7BpqTL.png";
    star.selected = false;
  }

  star.addEventListener("click", function() {
    star.selected = !star.selected
    if (star.selected) {
      star.src = "https://thecliparts.com/wp-content/uploads/2017/04/dark-blue-star-clipart.png";
      var favouriteFixtures = JSON.parse(localStorage.getItem("favouriteFixtures")) || [];
      favouriteFixtures.push(fixture);
      localStorage.setItem("favouriteFixtures", JSON.stringify(favouriteFixtures));
    }
    if (!star.selected) {
      star.src = "http://images.clipartpanda.com/star-clipart-black-and-white-RTG7BpqTL.png";
      var favouriteFixtures = JSON.parse(localStorage.getItem("favouriteFixtures")) || [];
      var newFavouriteFixtures = favouriteFixtures.filter(function(localStorageFixture) {
        return fixture.homeTeamName != localStorageFixture.homeTeamName
      });
      localStorage.setItem("favouriteFixtures", JSON.stringify(newFavouriteFixtures));
    }
  });
}

var populateFixturesList = function(team, upcomingFixtures) {
  var mainDiv = document.getElementById("main-div");
  clearHTML("main-div");
  upcomingFixtures.forEach(function(fixture) {
    var fixtureDiv = document.createElement("div");
    fixtureDiv.id = "fixture-div";
    var homeTeamName = document.createElement("h5");
    homeTeamName.id = "home-team-name";
    homeTeamName.innerText = fixture.homeTeamName;
    var star = document.createElement("img");
    star.id = "star";
    fixture.star = star;
    initialiseStar(fixture);
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
    fixtureDiv.appendChild(star)
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

var removeIntroText = function() {
  var mainDiv = document.getElementById("main-div");
  var introDiv = document.getElementById("intro-div");
  if (introDiv) mainDiv.removeChild(introDiv);
}

var getSelectedTeamFixtures = function(teams) {
  var select = document.querySelector("#team-dropdown");
  select.addEventListener("change", function() {
    var statsDiv = document.getElementById("stats-div");
    clearHTML("stats-div");
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
      removeIntroText();
      setBackground(team);
    }, apitoken, apikey)
    var jsonString = JSON.stringify(team);
    localStorage.setItem("team", jsonString);
    getLeagueTable();
  })
}

var createIntroText = function() {
  var mainDiv = document.getElementById("main-div");
  var introDiv = document.createElement("div");
  introDiv.id = "intro-div";
  var introHeading = document.createElement("h3");
  introHeading.innerHTML = "Let us help you support your team away."
  introHeading.id = "intro-heading"
  var introText = document.createElement("p");
  introText.innerHTML = "Haway Days allows you to follow your favourite team around the country."+
  "<br><br>You can find out your information about your team's upcoming fixtures, and plan your route to the next big match."+
  "<br><br>To use the Haway Days app, just select your favourite team, browse the list of fixtures, and select from a range"+
  " of travel options. You can also save a fixture and come back to it later.";
  introText.id = "intro-text";
  introDiv.appendChild(introHeading);
  introDiv.appendChild(introText);
  mainDiv.appendChild(introDiv);
}

var populateDropdown = function(information) {
  var select = document.querySelector('#team-dropdown');
  clearHTML("team-dropdown");
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
  createIntroText();
  getSelectedTeamFixtures(teams);
}


var getStoredTeamFixtures = function(team) {
  var statsDiv = document.getElementById("stats-div");
  clearHTML("stats-div");
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
    setBackground(team);
  }, apitoken, apikey)
}

window.addEventListener("DOMContentLoaded", function() {
  // document.body.style.zoom = "60%"
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
  initialiseFavouritesButton();
});
