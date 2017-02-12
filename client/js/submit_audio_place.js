var audioContainer = document.querySelector('div.audio-container');
var radioUpload = document.getElementById('use-uploaded');
var radioRecorded = document.getElementById('use-recorded');
var submissionAudio = document.getElementById('audio-submission');
var r = document.getElementById('returned');

audioContainer.addEventListener('click', function(event) {
  var target = event.target;
  if(target.type === 'radio') {
    if(target.value === 'recorded') {
      unCheck(radioUpload);
      setSubmissionAudio(recordedBuffer, recordedURL);
    } else if(target.value === 'uploaded') {
      unCheck(radioRecorded);
      setSubmissionAudio(uploadedBuffer, uploadedURL);
    }
  }
})

function saveAudioPlace() {
  // var str = new Uint8Array(recordedBuffer);
  var str =  arrayBufferToBase64(recordedBuffer)
  // $.ajax({
  //   url: "http://localhost:3002/api/audio/save",
  //   data: str,
  //   // contentType: "base64,
  //   type: "POST",
  //   success: function(bs64) {
  //     console.log('base64 string returned');
  //   },
  //   error: function(err) {
  //     console.error(err, 'error');
  //   }
  // });
  $.ajax({
    url: "http://localhost:3002/api/audio/save",
    data: {coordinates:markerData},
    // contentType: "base64,
    type: "POST",
    success: function(response) {
      console.log(response, 'response returned success');
    },
    error: function(err) {
      console.error(err, 'error');
    }
  });

}

function setSubmissionAudio(buffer, url) {
  submissionAudio.src = url;
  submissionAudio.style.display = ''
}

function unCheck(radio) {
  if(radio.checked) {
    radio.checked = false;
  }
}

function arrayBufferToBase64(buffer) {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}
