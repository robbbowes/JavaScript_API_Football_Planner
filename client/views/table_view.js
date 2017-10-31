var requestHelper = require("../helpers/request_helper.js");
var apitoken = 'X-Auth-Token';
var apikey = '16bf6721521f4342aca8f7c7656dff95';


var populateLeagueTable = function(leagueTable) {
  var jsonString = localStorage.getItem("team");
  if (jsonString !== null) {
    var selectedTeam = JSON.parse(jsonString)
    var selectedTeamName = selectedTeam.name;
  }
  var table = document.getElementById("league-table");
  console.log("table = ", table);
  var tableDiv = document.getElementById("table-div")
  tableDiv.style.backgroundColor = 'white'
  while (table.firstChild) { table.removeChild(table.firstChild) }
  var thead = document.createElement("thead");
  var theadRow = document.createElement("tr");
  var hRank = document.createElement("tr");
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
