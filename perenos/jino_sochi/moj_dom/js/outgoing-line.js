//Уход с сайта
$(document).ready(function(){

  var showedPopup = false;
  $('#hiddenclicker').fancybox();

  $('body').mousemove(function( event ) {
    var pageCoords = "( " + event.pageX + ", " + event.pageY + " )";
    if( event.clientY <= 20 && !showedPopup ){
      showedPopup = true;
      $('#hiddenclicker').trigger('click');
    }
  });

});