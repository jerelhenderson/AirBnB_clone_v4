// Adds amenity ID and name to an object if box is checked
let amenities = {};
$( document ).ready(function() {
  $('ul.popover').on('change', ':checkbox', function () {
    if (this.checked) {
      amenities[($(this).data().id)] = $(this).data().name;
    } else {
      delete amenities[($(this).data().id)];
    }
    // Displays amenities checked in amenities fileter box
    let text = '';
    let count = 0;
    $.each(amenities, (id, name) => {
      if (count != 0) {
        text += ', '
      }
      text += name;
      count++;
    });
    if (count === 0) {
      $('div.amenities h4').html('&nbsp;')
    } else {
      $('div.amenities h4').text(text);
    }
  });
  const url = 'http://localhost:5001/api/v1/status/';
  $.get(url, (data) => {
    if (data.status === "OK") {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
  $.ajax({
    type: 'POST',
    contentType: 'application/json',
    data: '{}',
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    dataType: 'json',
    success: function (data) {
      let place = data[i];
      for (let i = 0; i < data.length; i++) {
	data_list = [ $('#places').append(
	  '<article><div class="title"><h2>' + place.name + '<h2>' +
	  '<div class="price_by_night">' + place.price_by_night + '</div>' +
          '<div class="information">' +
          '<div class="max_guest"><br />' + place.max_guest + '</div>' +
          '<div class="number_rooms">' + place.number_rooms + '</div>' +
          '<div class="number_bathrooms">' + place.number_bathrooms + '</div>' +
          '</div>' +
          '<div class=description">' + place.description + '</div>' +
          '</article>')];
      }
    }
  });
});
