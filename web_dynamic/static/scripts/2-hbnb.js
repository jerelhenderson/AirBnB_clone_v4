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
});
