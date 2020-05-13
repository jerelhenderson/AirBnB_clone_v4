// Adds amenity ID and name to an object if box is checked
let amenities = {};
$( document ).ready(function() {
  $('ul.popover').on('change', ':checkbox', function () {
    if (this.checked) {
      amenities[($(this).data().id)] = $(this).data().name;
    } else {
      delete amenities[($(this).data().id)];
    }
    // Displays amenities checked in amenities filter
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
  // Fetch status of API and change of circle, red for available, grey for not
  const url = 'http://localhost:5001/api/v1/status/';
  $.get(url, (data) => {
    if (data.status === "OK") {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
  // Fetch data about places from API and insert them into HTML
  $.ajax({
    type: 'POST',
    contentType: 'application/json',
    data: '{}',
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    dataType: 'json',
    success: function (data) {
      for (let i = 0; i < data.length; i++) {
        let place = data[i];
        data_list = [ $('section.places').append(
          '<article><div class="title"><h2>' + place.name + '</h2>' +
          '<div class="price_by_night">' + place.price_by_night + '</div>' +
          '</div>' + '<div class="information">' + '<div class="max_guest">' +
          '<i class="fa fa-users fa-3x" aria-hidden="true"></i>' +
          '<br />' + place.max_guest + ' Guests</div>' +
          '<div class="number_rooms">' +
          '<i class="fa fa-bed fa-3x" aria-hidden="true"></i>' +
          '<br />' + place.number_rooms + ' Bedrooms</div>' +
          '<div class="number_bathrooms">' +
          '<i class="fa fa-bath fa-3x" aria-hidden="true"></i>' +
          '<br />' + place.number_bathrooms + ' Bathroom</div>' +
          '</div>' +
          '<div class=description">' + place.description + '</div>' +
          '</article>')];
      }
    }
  });
  // Fetch data about places on each button click
  $('.button', on('click', function () {
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      data: jsonify({ 'amenities': text.keys(amenities) }),
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      dataType: 'json',
      success: function (data) {
        for (let i = 0; i < data.length; i++) {
          let place = data[i];
          data_list = [ $('section.places').append(
            '<article><div class="title"><h2>' + place.name + '</h2>' +
            '<div class="price_by_night">' + place.price_by_night + '</div>' +
            '</div>' + '<div class="information">' + '<div class="max_guest">' +
            '<i class="fa fa-users fa-3x" aria-hidden="true"></i>' +
            '<br />' + place.max_guest + ' Guests</div>' +
            '<div class="number_rooms">' +
            '<i class="fa fa-bed fa-3x" aria-hidden="true"></i>' +
            '<br />' + place.number_rooms + ' Bedrooms</div>' +
            '<div class="number_bathrooms">' +
            '<i class="fa fa-bath fa-3x" aria-hidden="true"></i>' +
            '<br />' + place.number_bathrooms + ' Bathroom</div>' +
            '</div>' +
            '<div class=description">' + place.description + '</div>' +
            '</article>')];
	  }
        }
      });
}));
