document.addEventListener('DOMContentLoaded', function () {
  const $h4Amenities = $('div.amenities h4');
  const amenitiesFilter = [];

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

  // check status of website
  $(function () {
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
  });
});
