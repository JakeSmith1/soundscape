var audioUpload = document.getElementById("upload-audio");
var uploadAudioPlayer = document.getElementById("uploaded-audio");
var upload = document.getElementById('upload');

upload.addEventListener("click", function (e) {
  if (audioUpload) {
    audioUpload.click();
  }
  e.preventDefault(); // prevent navigation to "#"
}, false);

function handleFiles(files) {
  if (!files.length) {
    alert('no files uploaded, please try again');
  } else {
    var reader = new FileReader();
    reader.addEventListener("loadend", function() {
      uploadAudioPlayer.src = reader.result;// reader.result contains the contents of blob as a typed array
      audioURL = reader.result
    });
    reader.readAsDataURL(files[0]);
  }
}
