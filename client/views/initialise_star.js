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

module.exports = initialiseStar;
