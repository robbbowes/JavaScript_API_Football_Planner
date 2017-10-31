var clearHTML = function(id) {
  var element = document.getElementById(id);
  while (element.firstChild) { element.removeChild(element.firstChild) }
}

module.exports = clearHTML;
