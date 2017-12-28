var delay = 1000;
$(document).ready(function() {
    $('head').append('<link rel="stylesheet" href="css/bootstrap.min.css"><link rel="stylesheet" href="../netdna.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css" ><link href="css/fractionslider.css" rel="stylesheet" /><link rel="stylesheet" href="css/styles.css"/><link rel="stylesheet" href="css/mobile.css"/>');
    $('.to_top img').click(function() {
        $('body, html').animate({
            scrollTop: 0
        }, delay);
    });
    $('.dropBtn').mouseenter(function() {
        $(this).find('.paintingType').hide();
        var cl = $(this).attr('data-tag');
        $('.' + cl).css("opacity", "1");
        $(this).find('.pt_detaile').css({
            "height": "248px",
            "opacity": "1",
            "z-index": "1000"
        });
    });
    $('.dropBtn').mouseleave(function() {
        $(this).find('.paintingType').show();
        var cl = $(this).attr('data-tag');
        $('.' + cl).css("opacity", "0");
        $(this).find('.pt_detaile').css({
            "height": "0",
            "opacity": "0",
            "z-index": "-100"
        });
    });
});
$(window).load(function() {
    $('.slider').fractionSlider({
        'fullWidth': false,
        'controls': true,
        'pager': false,
        'autoChange': true,
        'timeout': 6000,
    });
    var logos = $('#products li');
    var dbW = 0;
    for (var i = 0; i < logos.length; i++) {
        dbW += $('#products li:eq(' + i + ')').width();
    }
    $('#products ul').width(dbW);
});
$(function() {
    fr = new FilmRoll({
        container: '#film_roll',
    });
});
window.addEvent('domready', function() {
    var myProducts = new ScrollBar('products', 'bar', 'knob', {
        scroll: {
            duration: 2000,
            transition: 'elastic:out',
            onStart: function() {},
            onComplete: function() {}
        },
        slider: {
            offset: -1,
            onChange: function(pos) {},
            onComplete: function(pos) {}
        },
        knob: {
            duration: 1200,
            transition: 'elastic:out',
            onStart: function() {}
        }
    });
});
$(function() {
    $('.closeBtn').click(function() {
        $('body').toggleClass('modal-open');
        $('#forms').fadeOut('slow');
    });
    $('.popup-form').click(function(e) {
        if ($(e.target).is('button')) {
            $(e.target).parent().parent().find('input[type="file"]').click();
        }
    });
    $('.popup-form').change(function(e) {
        if ($(e.target).is('input[type="file"]')) {
            var file = $(e.target).val();
            $(e.target).parent().find('input[type="text"]').val(file);
        }
    });
    $('#moreImg').click(function() {
        $('#uplRow').clone().appendTo('#uploadsImg').fadeIn('slow');
    });
    $('.js-popup').click(function() {
        var db = $(this).attr('data-href');
        $('#forms .container').hide();
        $('.' + db).show();
        $('body').toggleClass('modal-open');
        $('#forms').fadeIn('slow');
        if (db == 'ordCall') {
            var subject = $(this).attr('data-subject');
            $('.ordCall .popup-form > h3').html(subject);
            $('.ordCall input[type="hidden"]').val(subject);
        }
    });
    $('.services .service_db').click(function() {
        var db = $(this).attr('data-block');
        $('.service_db.active').toggleClass('active')
        $(this).toggleClass('active');
        if ($('[data-id="' + db + '"]').hasClass('is-open')) {
            $('.page_top_window').attr('class', 'page_top_window main-banner');
            $('[data-id="' + db + '"]').slideUp('slow');
            $('[data-id="' + db + '"]').toggleClass('is-open');
            $('[data-id="main-banner"]').slideDown('slow').toggleClass('is-open');
        } else {
            $('.page_top_window').attr('class', 'page_top_window ' + db);
            $('.is-open').slideUp('slow');
            $('.is-open').toggleClass('is-open');
            $('[data-id="' + db + '"]').slideDown('slow').toggleClass('is-open');
        }
    });

        $('#forms').on('click', function(event){
	     if( $(event.target).is('#forms') || $(event.target).is('closeBtn') ) {
		   event.preventDefault();
		   $('.form_privacy').fadeOut();
                   $('#forms').fadeOut('slow');
                   $('body').toggleClass('modal-open');

	     }
        });
});
