$(document).ready(function() {
  $('#demo').scrollbox();
  var localStor = localStorage
  let list = $('.localStor')
  for (var key in localStor) {
    console.log(localStor[key])
    list.append('<li>' + localStor[key] + '</li>');
  }
});
