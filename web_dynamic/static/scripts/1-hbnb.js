$(document).ready(function(){
  var checkboxes = $(":checkbox");
  var my_list = [] ;
  console.log(checkboxes)
  $.each(checkboxes, function(i, checkboxe) {
    if(checkboxe.is(':checked')){
        my_list.push($(this).prop('data-id'))
    }
    console.log(checkboxe)
})
console.log(my_list)
});
