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
    });

    $('button').click(function(){
        $.ajax({
            url: 'http://127.0.0.1:5001/api/v1/places_search',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({"amenities": Object.keys(dict)}),
            success: function(data) {
                // console.log(data);
                // console.log(i);
                var list_articles = []
                var placesSection = $('.places article');
                $.each(placesSection, function(i, article){
                    $.each(data, function(i, place){
                        if ($('article .title_box h2').text() === place.name){
                            console.log('m');
                            list_articles.push(article)
                        }
                    })
                    article.remove()
                    $('.places').html(list_articles)
                    console.log(list_articles);
                })
            },
        });
    }) 
});
  