$(document).ready(function () {
  const checkboxes = $(':checkbox');
  const dict = {};
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
