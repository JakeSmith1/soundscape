window.URL = window.URL || window.webkitURL;
navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

//recorder will be an isntance of Recorder which  encodes the output of audio api nodes, returns a blob
var recorder;

//elements:
var audio = document.querySelector('#audio-record');
var spinner = document.getElementById('recording-spinner');
var recordingSection = document.getElementById('recording-inputs');

//all auido events handled through a listnere on the containing div:
recordingSection.addEventListener('click', handleRecording);


/*----------   start and stop recording      ----------*/
function startRecording() {
  if (navigator.getUserMedia) {
    navigator.getUserMedia({audio: true}, onSuccess, onFail);
  } else {
    alert('your browser does not support this type of audio recording, try chrome or safari')
  }
}

function stopRecording() {
  if(!recorder) {
    return;
  }
  recorder.stop();
  recorder.exportWAV(function(s) {
    audio.src = window.URL.createObjectURL(s);
    saveBlobAsURL(s);
  });
}

/*----------    callbacks for navigator.getUserMedia  on line 11   ----------*/
var onFail = function(e) {
  alert('Audio recording failed, please try again, but don\'t try forever!');
};

var onSuccess = function(s) {
  startSpinner(spinner);
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

function handleRecording(e) {
  e.preventDefault();
  var action = e.target.name;
  if(action === 'start') {
    startRecording();
  } else if(action === 'stop') {
    stopRecording();
    stopSpinner(spinner);
  }
}

function startSpinner(spinner) {
  spinner.className = "mdl-spinner mdl-js-spinner is-active";
}
function stopSpinner(spinner) {
  spinner.className = "mdl-spinner mdl-js-spinner"
}
