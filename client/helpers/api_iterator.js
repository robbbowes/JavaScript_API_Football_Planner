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
