$(document).ready(function () {
    const checkboxes = $(':checkbox');
    const dict = {};
    const apiStatusDiv = $('#api_status');
    $.get('http://127.0.0.1:5001/api/v1/status/', (data) => {
        if (data.status === 'OK') {
        apiStatusDiv.addClass('available');
      } else {
        apiStatusDiv.removeClass('available');
      }
    });
    $.ajax({
        url: 'http://127.0.0.1:5001/api/v1/places_search',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({}),
        success: function(data) {
            var placesSection = $('.places');
            var article = placesSection.find('article')
    
          $.each(data, function(i, place){
            console.log(place.name);
    
            var new_article = article.clone()
            new_article.find('.title_box h2').text(place.name)
            new_article.find('.price_by_night').text(place.price_by_night)
            new_article.find('.max_guest').text(place.max_guest)
            new_article.find('.number_rooms').text(place.number_rooms)
            new_article.find('.number_bathrooms').text(place.number_bathrooms)
            // newArticle.find('.user').html('<b>Owner:</b> ' + place.user.first_name + ' ' + place.user.last_name);
            new_article.find('.description').html(place.description);
    
            placesSection.append(new_article);
        })
        article.remove()
        },
        // error: function(xhr, status, error) {
        //   // Handle errors here
        // }
      });
      
    // $.post('http://192.168.1.14:5001/api/v1/places_search', '{}', (data) => {
    //     var placesSection = $('.places');
    //     var article = placesSection.find('article')

    //   $.each(data, function(i, place){

    //     var new_article = article.clone()
    //     new_article.find('.title_box h2').text(place.name)
    //     new_article.find('.price_by_night').text(place.price_by_night)
    //     new_article.find('.max_guest').text(place.max_guest)
    //     new_article.find('.number_rooms').text(place.number_rooms)
    //     new_article.find('.number_bathrooms').text(place.number_bathrooms)
    //     newArticle.find('.user').html('<b>Owner:</b> ' + place.user.first_name + ' ' + place.user.last_name);
    //     newArticle.find('.description').html(place.description);

    //     placesSection.append(newArticle);
        
    //   })
    // }, 'json');
  
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
  