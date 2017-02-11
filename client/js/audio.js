window.URL = window.URL || window.webkitURL;
navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

//recorder will be an isntance of Recorder which  encodes the output of audio api nodes, returns a blob
var recorder;
var audio = document.querySelector('#audio-record');

/*----------   start and stop recording        ----------*/
function startRecording() {
  if (navigator.getUserMedia) {
    navigator.getUserMedia({audio: true}, onSuccess, onFail);
  } else {
    console.log('navigator.getUserMedia not present');
  }
}

function stopRecording() {
  recorder.stop();
  recorder.exportWAV(function(s) {
    audio.src = window.URL.createObjectURL(s);
    saveBlobAsURL(s);
  });
}

/*----------    callbacks for navigator.getUserMedia  on line 11   ----------*/
var onFail = function(e) {
  console.log('Rejected!', e);
};

var onSuccess = function(s) {
  var context = new AudioContext();
  var mediaStreamSource = context.createMediaStreamSource(s);
  recorder = new Recorder(mediaStreamSource);
  recorder.record();
  // audio loopback
  // mediaStreamSource.connect(context.destination);
}

//save audio blob as url to send to s3, called in stopRecordin line 21
var audioURL;
function saveBlobAsURL(blob) {
  var reader = new FileReader();
  reader.addEventListener("loadend", function() {
    audioURL = reader.result// reader.result contains the contents of blob as a typed array
  });
  reader.readAsDataURL(blob);
}
