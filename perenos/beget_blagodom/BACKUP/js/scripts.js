//Калькулятор
var firstClickCalculation = false;
$(document).ready(function(){
    $('.btn-callback').on('click', function(e){
        var $btn = $(this);
        if( $btn.data('action') == 'calc' && !firstClickCalculation ){
            //console.log('Фиксация кнопки калькулятора');
            firstClickCalculation = true;
            ga('send', 'event', 'button', 'calc');
        }
    });
    
    // Flipclock
    clock = $('.countdown').FlipClock({
        // clockFace: 'DailyCounter', //вид счетчика (с количеством дней)
        autoStart: true, //Отключаем автозапуск
        countdown: true	, //Отсчет назад
        language:'ru-ru', //Локаль языка
        callbacks: { //Действие после окончания отсчета
            stop: function() {
    		   
           	}
       }
    });
  
    clock.setTime(300); //Устанавливаем нужное время в секундах
    clock.setCountdown(true); //Устанавливаем отсчет назад
    clock.start(); //Запускаем отсчет
    
    // Анимация цены
    function printNumbersInterval() {
        var i = 15000;
        var timerId = setInterval(function() {
            $('.discount_count').text(i + " руб.");
            if (i == 0) {
                clearInterval(timerId);
            }
            i = i - 50;

            function func() {
                $('.discount_count').removeClass('animated flash');
            }
            setTimeout(func, 500);

            function func2() {
                $('.discount_count').addClass('animated flash');
            }
            setTimeout(func2, 1000);
        }, 1000);
    }
    printNumbersInterval();
    
    
});

$(document).ready(function() {
    //Ширина и высота экрана
    var w = screen.width,
        h = screen.height;
    //E-mail Ajax Send
    ;

    //  scroll with offset
    $("#navigation_list").on("click", "a", function(event) {
        var id = $(this).attr('href');
        // screen width
        // if (w < 768) {
        //     $(id).attr('data-top', 90);
        // }
        var topOffset = $(id).attr("data-top");
        var top = $(id).offset().top;
        var finalTop = top - topOffset;
        // console.log(id);
        $('body,html').animate({ scrollTop: finalTop }, 700);
        event.preventDefault();
    });


    $(".scroll_btn").click(function() {
        var id = $(this).attr('href'),
            topOffset = $(this).attr("data-top"),
            top = $(id).offset().top,
            finalTop = top - topOffset;
        // console.log(top);
        $('body,html').animate({ scrollTop: finalTop }, 700);
        return false;
    });


    // top menu
    if (w > 768) {
        $(window).scroll(function() {
            var top = $(document).scrollTop();
            if (top < 700) $(".nav_list").removeClass("more");
            else $(".nav_list").addClass("more").fadeIn("slow");
        });
    }

    // menu-btn
    $(".hidden_trigger").click(function() {
        $(".nav_list").slideToggle();
        $(this).toggleClass('open_menu');
    });

    //masked
    $('input[type=tel]').mask("+9(999)999-99-99");


    // slick
    $('.scr14_slider').slick({
        infinite: true,
        slidesToShow: 2,
        arrows: false,
        dots: true,
        draggable: false,
        swipe: false,
        autoplay: false,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                draggable: true,
                swipe: true
            }
        }]
    });

    $(".scr14_btns .btn_sl_n").click(function() {
        $('.scr14_slider').slick('slickNext');
    });
    $(".scr14_btns .btn_sl_pr").click(function() {
        $('.scr14_slider').slick('slickPrev');
    });

    $('.scr15_slider1').slick({
        infinite: false,
        slidesToShow: 4,
        arrows: false,
        dots: true,
        draggable: false,
        swipe: false,
        autoplay: false,
        slidesToScroll: 4,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 3
            }
        }, {
            breakpoint: 470,
            settings: {
                slidesToShow: 1,
                draggable: true,
                swipe: true
            }
        }]
    });

    $('.partners_popup').magnificPopup({
    	delegate: 'a',
		type: 'image',
		//tLoading: 'Загрузка фото №%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">Фото №%curr%</a> не удалось загрузить.',
			/*
            titleSrc: function(item) {
				return item.el.attr('title');
			}
            */
		}
    });

    $(".scr15_btns .btn_sl_n").click(function() {
        $('.scr15_slider1').slick('slickNext');
    });
    $(".scr15_btns .btn_sl_pr").click(function() {
        $('.scr15_slider1').slick('slickPrev');
    });



    $('.scr15_slider2').slick({
        infinite: true,
        slidesToShow: 6,
        arrows: false,
        dots: true,
        draggable: false,
        swipe: false,
        autoplay: false,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 3
            }
        }, {
            breakpoint: 470,
            settings: {
                slidesToShow: 1,
                draggable: true,
                swipe: true
            }
        }]
    });


    $(".scr3_trigger").click(function() {
        var thisParent = $(this).closest('.scr3_block_text_wrapper');
        if ($(thisParent).hasClass('slided_down')) {
            $(this).find("i").text('Развернуть');
            $(thisParent).removeClass('slided_down');
            $(this).closest('.scr3_block').removeClass('more_index');

        } else {
            $(this).find("i").text("Свернуть");
            $(this).closest('.scr3_block_text_wrapper').addClass('slided_down');
            $(this).closest('.scr3_block').addClass('more_index');
        }
    });


    $(".scr4_trigger").click(function() {
        var thisParent = $(this).closest('.scr4_block_container');
        if ($(thisParent).hasClass('slided_down')) {
            $(this).find("i").text('Развернуть');
            $(thisParent).removeClass('slided_down');
        } else {
            $(this).find("i").text("Свернуть");
            $(this).closest('.scr4_block_container').addClass('slided_down');
        }
    });

    $(".scr10_trigger").click(function() {
        var thisParent = $(this).closest('.scr10_block_middle');
        if ($(thisParent).hasClass('slided_down')) {
            $(this).find("i").text('Развернуть');
            $(thisParent).removeClass('slided_down');
        } else {
            $(this).find("i").text("Свернуть");
            $(this).closest('.scr10_block_middle').addClass('slided_down');
        }
    });

    // maps
    ymaps.ready(init);
    var myMap,
        myPlacemark;

    function init() {
        myMap = new ymaps.Map("map", {
            center: [47.281023, 39.682736], // посунуть карту вправо или влево - второй параметр
            zoom: 16,
            controls: []
        });
        myPlacemark = new ymaps.Placemark([47.281023, 39.682736], {
            hintContent: 'г. Ростов-на-Дону, ул. Вавилова, 71 В',
            balloonContent: 'г. Ростов-на-Дону, ул. Вавилова, 71 В'
        }, { preset: 'islands#darkGreenDotIcon' });
        myMap.geoObjects.add(myPlacemark);
        myMap.behaviors.disable('scrollZoom');
    };

    $(".scr11_clock a").click(function() {
        return false;
    });

    // ---------------------------------------------------
    // timers count to the end of the month
    var today = new Date();
    var year = today.getFullYear();
    var day = today.getDate();
    var month = today.getMonth();
    // this function returns to us quantity of days in the month
    function getLastDayOfMonth(year, month) {
        var date = new Date(year, month + 1, 0);
        return date.getDate();
    }
    // this var returns us quantity of days in the month
    var daysInMonth = getLastDayOfMonth(year, month);
    // this var returns us quantity of days to the months end
    var daysRemain = daysInMonth - day;
    // this var returns to us quantity of days in seconds to the months end
    var daysRemainTime = daysRemain * 86400;
    // to the day end
    var endDayDate = new Date().setHours(23, 59, 59);
    var currentDayDate = new Date();
    var diff = (endDayDate - currentDayDate) / 1000;
    var totalDiff = diff + daysRemainTime;
    // end of to the day end
    // $('.scr11_clock').FlipClock(totalDiff, {
    //     clockFace: 'DailyCounter',
    //     language: "ru",
    //     showSeconds: false,
    //     countdown: true
    //         // callbacks: {
    //         //     stop: function() {
    //         //         $('.scr11_clock').html('Время вышло!');
    //         //     }
    //         // }
    // });
    // ---------------------------------------------------

    AOS.init({
        duration: 1200,
        disable: 'mobile'
    });

});

/* checkbox-152 */
$(document).ready(function(){
  $('.checkbox-152 label input').change(function(e){
    var $checkbox = $(this);
    var $btn = $checkbox.closest('form').find('.btn-152');
    if(this.checked) $btn.attr('disabled', false);
    else             $btn.attr('disabled', true);
  });
});