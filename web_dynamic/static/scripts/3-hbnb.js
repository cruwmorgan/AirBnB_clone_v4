document.addEventListener('DOMContentLoaded', function () {
  const $h4Amenities = $('div.amenities h4');
  const amenitiesFilter = [];

  // sort in alphabetical order
  function compare (a, b) {
    if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
    if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
    return 0;
  }

  // amenities checkboxes
  $('div.amenities input').each(function (idx, ele) {
    const id = $(this).attr('data-id');
    const name = $(this).attr('data-name');

    // set change method on checkboxes
    $(ele).change(function () {
      const delimiter = '<span class="delim">, </span>';
      $('div.amenities h4 span.delim').remove();

      if (this.checked) {
        $h4Amenities.append('<span id=' + id + '>' + name + '</span>');
        amenitiesFilter.push(id);
      } else {
        $('span#' + id).remove();
        amenitiesFilter.splice(amenitiesFilter.indexOf(id), 1);
      }

      // add delimeter
      const length = $('div.amenities h4 > span').length;
      $('div.amenities h4 span').each(function (idx, ele) {
        if (idx < length - 1) {
          $(this).append(delimiter);
        }
      });
    });
  });

  $(function () {
    // API status
    $.ajax({
      type: 'GET',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      success: function (data) {
        const $apiStatus = $('div#api_status');
        if (data.status === 'OK') {
          $apiStatus.addClass('available');
        } else {
          $apiStatus.removeClass('available');
        }
      }
    });

    // Fetch and sort places
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: JSON.stringify({}),
      success: function (data) {
        data.sort(compare);
        populatePlaces(data);
      }
    });
  });

  // display places
  function populatePlaces (data) {
    $.ajax({
      type: 'GET',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      success: function (users) {
        const userDict = {};
        $(users).each(function (index, user) {
          userDict[user.id] = user;
        });

        $(data).each(function (index, place) {
          $('SECTION.places').append('<article><div class="title"><h2>' + place.name + '</h2><div class="price_by_night">$' + place.price_by_night + '</div></div><div class="information"><div class="max_guest"><i class="fa fa-users fa-3x" aria-hidden="true"></i><br />' + place.max_guest + 'Guests</div><div class="number_rooms"><i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />' + place.number_rooms + 'Bedrooms</div><div class="number_bathrooms"><i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />' + place.number_bathrooms + 'Bathroom</div></div><div class="user"><strong>Owner: </strong>' + userDict[place.user_id].first_name + ' ' + userDict[place.user_id].last_name + '</div><div class="description">' + place.description + '</div></article>');
        });
      }
    });
  }
});
