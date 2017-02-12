var audioContainer = document.querySelector('div.audio-container');
var radioUpload = document.getElementById('use-uploaded');
var radioRecorded = document.getElementById('use-recorded');
var submissionAudio = document.getElementById('audio-submission');

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

function setSubmissionAudio(buffer, url) {
  submissionAudio.src = url;
  submissionAudio.style.display = ''
}

function unCheck(radio) {
  if(radio.checked) {
    radio.checked = false;
  }
}
