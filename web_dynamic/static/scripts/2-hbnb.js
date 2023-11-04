$(document).ready(function () {
  const checkboxes = $(':checkbox');
  const dict = {};
  const apiStatusDiv = $('div#api_status');
  $.get('http://0.0.0.0:5001/api/v1/status/', (data) => {
      if (data.status === 'OK') {
      apiStatusDiv.addClass('available');
    } else {
      apiStatusDiv.removeClass('available');
    }
  });
  $.each(checkboxes, function (i, checkboxe) {
    $(checkboxe).on('change', function () {
      if ($(this).is(':checked')) {
        dict[$(this).data('id')] = $(this).data('name');
      } else {
        delete dict[$(this).data('id')];
      }
      $('.amenities h4').text(Object.values(dict));
    });
  });
});
