
  // event.preventDefault();
  ////////////////////////////////////////////
  //  recorderImplementation.js
  //
  //  contains cutom methods, etc for implementing
  //  the speech Recognition
  ////////////////////////////////////////////
  var id = 1;
  var final_transcript = '';

  function reset() {
      return false;
  }

function textColorChange(array){
  for(var i=0;i< array.length;i++){
  var colors = (array[i].style = 'color: #F00')
  }
return colors
}

  if (!('webkitSpeechRecognition' in window)) {
      upgrade();
  } else {
      var recognizing = false;
      var ignore_onend;
      var start_timestamp;
      // var timeStamp= Date.now();

      var recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognizing=reset();
      recognition.onend = reset;

      recognition.onstart = function() {
          recognizing = true;
      };

      recognition.onerror = function(event) {
          console.log('error occurred', event);
          if(event.error === "network") {
              displayMessageGrowl('network error - this application requires a working internet connection', 'error');
          }
          // TODO handle other errors
          // see https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html#dfn-emma
          // for error msgs

          //   if (event.error == 'no-speech') {
          //     start_img.src = '//www.google.com/intl/en/chrome/assets/common/images/content/mic.gif';
          //     showInfo('info_no_speech');
          //     ignore_onend = true;
          //   }
            // if (event.error == 'audio-capture') {
            //   start_img.src = '//www.google.com/intl/en/chrome/assets/common/images/content/mic.gif';
            //   showInfo('info_no_microphone');
            //   ignore_onend = true;
            // }
            if (event.error == 'not-allowed') {
              console.log('if ',event.error)
              if (event.timeStamp - start_timestamp < 100) {
                // showInfo('info_blocked');
                console.log('if ',event.error)
              } else {
                console.log('else',event.error)
                // showInfo('info_denied');
              }
              ignore_onend = true;
            }
      };

      recognition.onend = function() {
          recognizing = false;
          if (ignore_onend) {
              return;
          }
          if (!final_transcript) {
              return;
          }
          if (window.getSelection) {
              window.getSelection().removeAllRanges();
              var range = document.createRange();
              range.selectNode(document.getElementById('final_span'));
              window.getSelection().addRange(range);

          }
      };

      recognition.onresult = function(event) {
          var interim_transcript = '';
          if (typeof(event.results) == 'undefined') {
              recognition.onend = null;
              recognition.stop();
              upgrade();
              return;
          }
          for (var i = event.resultIndex; i < event.results.length; ++i) {
              if (event.results[i].isFinal) {
                  final_transcript += event.results[i][0].transcript;
              } else {
                  interim_transcript += event.results[i][0].transcript;
              }
          }
          console.log(final_transcript);
          final_span.innerHTML = final_transcript;
          interim_span.innerHTML = interim_transcript;

      }

//       Array.prototype.forEach.call(document.getElementsByClassName('final_span'), function (element) {
//   element.style = 'color: #F00';
// });
var array= document.getElementsByClassName('final_span');
textColorChange(array);
}
      function upgrade() {
          displayMessageGrowl('browser not compatible - upgrade to latest chrome', 'error');
      }



      function toggleStop(){
          if (recognizing) {
              recognition.stop();
              if(recognition.stop()==true){
                return (localStorage.key);
              }
          }
          console.log('toggle recog ', recognizing);
          reset();
          document.getElementById('record_button').innerHTML = 'Click to Record';
          console.log(event.target);
          // if(event.target).on('click',function(audio){
          //
          // })
        id++;
      }

      function toggleStartStop() {
          if (recognizing) {
              toggleStop();
              // document.getElementById('analyser').style.display = 'none';
              console.log("done recognizing", id, final_transcript);
              localStorage.setItem(id, final_transcript);
              localStorage.getItem('id');
          } else {
              final_transcript = '';
              recognition.lang = 'en-US';
              recognition.start();
              final_span.innerHTML = '';
              interim_span.innerHTML = '';
              start_timestamp = event.timeStamp;
              document.getElementById('record_button').innerHTML = 'Stop Recording';

              // document.getElementById('analyser').style.display = 'block';
          }
      }
