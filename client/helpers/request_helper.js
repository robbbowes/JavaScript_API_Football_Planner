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
  })
  xhr.send()
},

}

module.exports = requestHelper
