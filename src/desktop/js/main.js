jQuery(document).ready(function($) {
$('.mena').click(function(e){e.preventDefault();$("html, body").animate({ scrollTop: $($(this).attr('href')).offset().top-62}, 2000);});








});