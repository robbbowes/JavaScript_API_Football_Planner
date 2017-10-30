var requestHelper = {

  getRequest: function(url, callback, token, key) {
    console.log(url);
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
