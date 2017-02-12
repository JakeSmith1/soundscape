var audioUpload = document.getElementById("upload-audio");
var uploadAudioPlayer = document.getElementById("uploaded-audio");
var upload = document.getElementById('upload');

upload.addEventListener("click", function (e) {
  if (audioUpload) {
    audioUpload.click();
  }
  e.preventDefault(); // prevent navigation to "#"
}, false);

var uploadedURL, uploadedBuffer;

function handleFiles(files) {
  if (!files.length) {
    alert('no files uploaded, please try again');
  } else {
    saveAsURL(files[0]);
    saveAsBuffer(files[0]);
    // var reader = new FileReader();
    // reader.addEventListener("loadend", function() {
    //   uploadAudioPlayer.src = reader.result;// reader.result contains the contents of blob as a typed array
    //   uploadedUrl = reader.result
    // });
    // reader.readAsDataURL(files[0]);
  }
}

function saveAsURL(file) {
  var reader = new FileReader();
  reader.addEventListener("loadend", function() {
    uploadAudioPlayer.src = reader.result;// reader.result contains the contents of blob as a typed array
    uploadedURL = reader.result// reader.result contains the contents of file as a typed array
  });
  reader.readAsDataURL(file);
}
function saveAsBuffer(file) {
  var reader = new FileReader();
  reader.addEventListener("loadend", function() {
    uploadedBuffer = reader.result// reader.result contains the contents of file as a typed array
  });
  reader.readAsArrayBuffer(file);
}
