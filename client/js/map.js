var map;
var markers = [];
var markerData = {};

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 39.98311399769469, lng: -100.93670526250001},
    zoom: 4
  });

  var infoWindow = new google.maps.InfoWindow({map: map});
  markers.push(infoWindow);

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });

    //initialize the search box
    initAutocomplete();

    //geocoder and info window for getting location information when users click on a location
    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;

    //add map event listeners
    // map.addListener('click', mapClick);
    map.addListener('click', function(e) {
      var lat = e.latLng.lat(), lng = e.latLng.lng();
      geocodeLatLng(geocoder, map, infowindow, {lat,lng});
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
}

function mapClick(e) {
  var marker = new google.maps.InfoWindow({map: map});
  var lat = e.latLng.lat(), lng = e.latLng.lng();
  deleteMarkers();
  marker.setPosition({lat: lat, lng: lng});
  marker.setContent("Selected Location");
  markers.push(marker);
  markerData = {lat: lat, lng: lng};
  // map.setCenter(marker.getPosition());
  // map.setZoom(8);
}
// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}
