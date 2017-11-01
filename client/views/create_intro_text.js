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

module.exports = createIntroText;
