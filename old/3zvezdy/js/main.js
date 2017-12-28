	
    (function($){
        $(window).on("load",function(){
            $(".scroll").mCustomScrollbar({
				theme:"dark-3"
			});
        });
    })(jQuery);		
	
	jQuery(document).ready(function(){
		
		$('.click-m').click(function(e){
			e.preventDefault();
			var th = $(this);
			th.nextAll().addClass('vis');
			setTimeout(function(){ 
				th.nextAll().removeClass('vis');
			}, 3000);
		});
		
	   var sourceSwap = function () {
			var $this = $(this).find('img');
			var newSource = $this.data('alt-src');
			$this.data('alt-src', $this.attr('src'));
			$this.attr('src', newSource);
		}

	
			$('img[data-alt-src]').each(function() { 
				new Image().src = $(this).data('alt-src'); 
			}).hover(sourceSwap, sourceSwap); 

			$('.stars-item, .invite-item').each(function() { 
				new Image().src = $(this).find('img').data('alt-src'); 
			}).hover(sourceSwap, sourceSwap); 
		
	new WOW().init();	
		
	
	$('.advice .row').hover(function(){
		$('.advice .row .advice-item').removeClass('red');
		$(this).find('.advice-item').addClass('red');
	});
	
  
	
    //Видео в модальном окне
    var height = screen.height;
    $('a.play')
        .attr('rel', 'media-gallery')
        .fancybox({
        width : 4/3. * height,
        height : height,
        autoDimensions : false,
        openEffect : 'none',
        closeEffect : 'none',
        prevEffect : 'none',
        nextEffect : 'none',
        padding: 0,
        arrows : false,
        helpers : {
            media : {},
            buttons : {},
			overlay: {
			  locked: false
			}
        }
    });		
	
	
var day_z = new Date("28 December 2017 00:01"); // January, February, March, April, May, June, July, August, September, October, November, December

function timer() {
  var time_now = new Date(),
    time_delta = day_z - time_now;
  if (time_delta < 0) {
    time_delta = 0;
  }
  var time_day = Math.floor(time_delta / 86400000),
    time_ost = time_delta - Math.floor(time_delta / 86400000) * 86400000,
    time_hrs = Math.floor(time_ost / 3600000);
  time_ost = time_ost - Math.floor(time_ost / 3600000) * 3600000;
  var time_min = Math.floor(time_ost / 60000);
  time_ost = time_ost - Math.floor(time_ost / 60000) * 60000;
  var time_sec = Math.floor(time_ost / 1000);
  if (time_day < 10) {
    time_day = '0' + time_day;
  }
  if (time_hrs < 10) {
    time_hrs = '0' + time_hrs;
  }
  if (time_min < 10) {
    time_min = '0' + time_min;
  }
  if (time_sec < 10) {
    time_sec = '0' + time_sec;
  }
  $('.timer .sec ').text(time_sec);
  $('.timer .hours ').text(time_hrs);
  $('.timer .days ').text(time_day);
  $('.timer .mins ').text(time_min);
  if (time_delta == 0) {
    clearInterval(akcia_interval);
	$('.timer').addClass('over');
	$('.timer').prepend('<div class="end">АКЦИЯ ЗАКОНЧИЛАСЬ!</div>');
  }
  //alert(time_day.toString().length);
  var dney = time_day.toString().length;
  if (dney == 3) {
    //$('.days strong').addClass('three');

  } else if (dney == 2) {
   // $('.days strong').addClass('two')
  }

}
	
// timer run	
 var akcia_interval = setInterval(timer, 1);	
 

	
		var owl = $('.owl-carousel');
		owl.owlCarousel({
			loop:true,
			margin:0,
			nav:false,
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				1000:{
					items:1
				}
			}
		});
		
	$('.nav .next').click(function(e) {
		e.preventDefault();
		owl.trigger('next.owl.carousel');
	})
	// Go to the previous item
	$('.nav .prev').click(function(e) {
		e.preventDefault();
		owl.trigger('prev.owl.carousel', [300]);
	})
		
		$('.owl-partners').owlCarousel({
			loop:true,
			margin:30,
			nav:true,
			responsive:{
				0:{
					items:2
				},
				600:{
					items:3
				},
				1000:{
					items:6
				}
			}
		});	
		
		

    //Отправка письма
    jQuery.validator.addMethod("digits", function(value, element) {
        return this.optional(element) || /^(\+?\d+)?\s*(\(\d+\))?[\s-]*([\d-]*)$/i.test(value);
    });

    jQuery.validator.addMethod("letters", function(value, element) {
        return this.optional(element) || /^[а-яА-ЯёЁa-zA-Z_\s]+$/i.test(value);
    });		
		
    $("form").each(function(){
		$(this).validate({

        rules:{

            name:{
                required: true,
                letters:true,
                minlength: 2
            },

            email:{
                required: true,
                email:true
            },			

            phone:{
                required: true,
                digits: true,
                minlength: 4
            }
        },

        errorPlacement: function(error, element) {
            return true;
        },
        submitHandler: function(form) {
            var action = $(form).attr('action'),
                post = $(form).serializeArray(),
                sendmessage_text='Идет регистрация...';
            $.ajax({
                url: action,
                type: 'post',
                data: post,
                dataType: 'json',
                beforeSend: function() {
			
                    $('body').append('<div class="sendmessage-overlay"><div class="content"><i></i><br /> '+sendmessage_text+'</div></div>');
                    $('.sendmessage-overlay').fadeIn(150);

                },
                success: function(data) {
                    if(data.location) {
                        window.location.href=data.location;
                    }
                },
                complete: function() {
                    $('.sendmessage-overlay').fadeOut(150, function() {
                        $(this).remove();
                    });
                }
            });
        }
	})


    });			


function initialize() {
    var myLatlng = new google.maps.LatLng(59.893694, 30.3175979);
    var mapOptions = {
        zoom: 16,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
		scrollwheel: false,
		styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"administrative.country","elementType":"geometry.stroke","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
    }
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

     //=====Initialise Default Marker    
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
		icon: 'images/marker.png',
        title: 'Россия, Санкт-Петербург, Московский пр., 97, лит. А, Санкт-Петербург, отель «Холидей Инн»'
     //=====You can even customize the icons here
    });

     //=====Initialise InfoWindow
    var infowindow = new google.maps.InfoWindow({
      content: "<div class='map-descr'>Россия, Санкт-Петербург, Московский пр., 97, лит. А, Санкт-Петербург, отель «Холидей Инн»</div>"
  });

   //=====Eventlistener for InfoWindow
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
	
		
	
	});
	