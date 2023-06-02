$(document).ready(function () {
  $('.amenities.popover ul li input[type=checkbox]').on('change', function () {
    const dict = [];
    const myID = [];
    const jCheck = $(this).is(':checked');
    if (jCheck) {
      $('input[type=checkbox]:checked').each(function () {
        dict.push($(this).attr('data-name'));
        myID.push($(this).attr('data-id'));
      });
    } else {
      $('input[type=checkbox]:not(:checked)').each(function () {
        dict.pop($(this).attr('data-name'));
        myID.pop($(this).attr('data-id'));
      });
    }
    if (dict.length === 0) {
      $('.amenities h4').html('&nbsp;');
    } else {
      $('.amenities h4').text(dict.join(', '));
    }
    console.log(myID);
  });
  const apiUrl = 'http://0.0.0.0:5001/api/v1/status/';
  $.ajax({
    url: apiUrl,
    type: 'GET',
    method: 'GET',
    dataType: 'json',
    success: function (response) {
      $('div#api_status').addClass('available');
    },
    error: function () {
      $('div#api_status').removeClass('available');
    }
  });
  $.ajax({
    url: apiUrl,
    type: 'POST',
    method: 'POST',
    dataType: 'json',
    data: {},
    contentType: 'application/json; charset=utf-8',
    success: function (response) {
      for (let i = 0; i < response.length; i++) {
        $('section.places').append(`
          <article>
  <div class="title_box">
    <h2> ${response[i].name}</h2>
    <div class="price_by_night"> ${response[i].price_by_night} </div>
  </div>
  <div class="information">
    <div class="max_guest">
      ${response[i].max_guest}
      ${response[i].max_guest > 1 ? 'Guests' : 'Guest'} 
    </div>
    <div class="number_rooms">
      ${response[i].number_rooms}
      ${response[i].number_rooms > 1 ? 'Bedrooms' : 'Bedroom'}  
    </div>
    <div class="number_bathrooms">
      ${response[i].number_bathrooms}
      ${response[i].number_bathrooms > 1 ? 'Bathrooms' : 'Bathroom'}  
    </div>
  </div>
  <div class="user">
  </div>
  <div class="description">
    ${response[i].description}
  </div>
</article>
        `);
      }
    },
    error: function (xhr, status) {
      console.log('error ' + status);
    }
  });
});
