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
});
