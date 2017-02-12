var selectedLocation = document.getElementById('selected-location');
function geocodeLatLng(geocoder, map, infowindow, latLng) {
  var latlng = {lat: parseFloat(latLng.lat), lng: parseFloat(latLng.lng)};
  geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === 'OK') {
      if (results[3]) {
        addGeoCodeMarker(results[3], latlng);
      } else if(results[2]) {
        addGeoCodeMarker(results[2], latlng);
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}
function addGeoCodeMarker(result, latlng) {
  // map.setZoom(11);
  var marker = new google.maps.InfoWindow({
    map: map,
    position: latlng,
    content: result.formatted_address
  });
  deleteMarkers();
  markers.push(marker);
  markerData = latlng;
  selectedLocation.innerHTML = result.formatted_address;
}
