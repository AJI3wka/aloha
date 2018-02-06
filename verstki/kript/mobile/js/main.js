$.arcticmodal('setDefault', {
    overlay:{
        css:{
            backgroundColor: '#131e48',
            opacity: .88
        }
    }
});

var courses = {
    bit_dol: 1,
    bit_rub: 1 * 1,
    ltc_dol: 1,
    ltc_rub: 1 * 1,
    eth_dol: 1,
    eth_rub: 1 * 1,
    dol_bit: 1 / 1,
    rub_bit: 1 / (1 * 1),
    dol_ltc: 1 / 1,
    rub_ltc: 1 / (1 * 1),
    dol_eth: 1 / 1,
    rub_eth: 1 / (1 * 1)
}

function get_course() {

    var cb_usd = 0;
    var cb_loaded = false;
    var btc_usd = 0;
    var btc_loaded = false;
    var ltc_usd = 0;
    var ltc_loaded = false;
    var etc_usd = 0;
    var etc_loaded = false;

    function defining() {

        if (btc_loaded && cb_loaded && ltc_loaded && etc_loaded) {


            courses = {
                bit_dol: btc_usd,
                bit_rub: btc_usd * cb_usd,
                ltc_dol: ltc_usd,
                ltc_rub: ltc_usd * cb_usd,
                eth_dol: etc_usd,
                eth_rub: etc_usd * cb_usd,
                dol_bit: 1 / btc_usd,
                rub_bit: 1 / (btc_usd * cb_usd),
                dol_ltc: 1 / ltc_usd,
                rub_ltc: 1 / (ltc_usd * cb_usd),
                dol_eth: 1 / etc_usd,
                rub_eth: 1 / (etc_usd * cb_usd)
            }
        }

    }

    $.get("ajax/get_btc.php", function(data) {
        data = $.parseJSON(data);
        btc_usd = parseFloat(data.bid);
        console.log('bitstamp DATA = ', btc_usd);
        btc_loaded = true;
        defining();

    });

    $.get("ajax/get_etc.php", function(data) {
        data = $.parseJSON(data);
        etc_usd = parseFloat(data.bid);
        console.log('bitstamp DATA = ', etc_usd);
        etc_loaded = true;
        defining();

    });

    $.get("ajax/get_ltc.php", function(data) {
        data = $.parseJSON(data);
        ltc_usd = parseFloat(data.bid);
        console.log('bitstamp DATA = ', ltc_usd);
        ltc_loaded = true;
        defining();

    });



    $.get("ajax/get_cb.php", function(data) {
        data = $.parseXML(data);
        $xml = $(data);
        var curs = 0;
        $xml.find('CharCode').each(function(index, el) {
            if ($(this).text() == 'USD') {
                cb_usd = parseFloat($(this).parent().find('Value').text().replace(',', '.'));
                cb_loaded = true;
                defining();

            }
        });
        console.log('bitstamp DATA = ', cb_usd);
    });

};
    function calculate() {
        var $wrap = $('.s2:visible');
        var give = $wrap.find('.valut').find('.current').attr('data-selected');
        var get = $wrap.find('.type').children('.active').attr('data-type');
        //alert(get);
        var give_count = parseFloat($wrap.find('.number').val());
        var get_count = 0;
        var coef = 0;
        
        if (give_count > 0) {

            if (give == 'bitcoin') {
                if (get == 'dollar') {
                    coef = courses.bit_dol
                } else {

                    coef = courses.bit_rub
                }
            } else if (give == 'ethereum') {
                if (get == 'dollar') {
                    coef = courses.eth_dol
                } else {

                    coef = courses.eth_rub
                }
            } else if (give == 'litecoin') {
                if (get == 'dollar') {
                    coef = courses.ltc_dol
                } else {

                    coef = courses.ltc_rub
                }

            } else if (give == 'dollar') {
                if (get == 'bitcoin') {
                    coef = courses.dol_bit
                } else if (get == 'litecoin') {
                    coef = courses.dol_ltc

                } else {
                    coef = courses.dol_eth

                }

            } else if (give == 'ruble') {
                if (get == 'bitcoin') {
                    coef = courses.rub_bit
                } else if (get == 'litecoin') {
                    coef = courses.rub_ltc
                } else {
                    coef = courses.rub_eth
                }

            }


            get_count = give_count * coef;

            get_count = Math.round(get_count * Math.pow(10, 5)) / Math.pow(10, 5)

        }

        $('form').find('input[name="give"]').val(give);
        $('form').find('input[name="count_give"]').val(give_count);
        $('form').find('input[name="get"]').val(get);
        $('form').find('input[name="count_get"]').val(get_count);
        $wrap.find('.curs').html(get_count);

    }

$(document).ready(function() {

    get_course();



slider2 = $('.sec3').find('ul').bxSlider({
        infiniteLoop: true,
        pagerCustom:'.slide',
        controls: false,
        pager:true,
        auto: false,
        speed: 500,
        minSlides: 1,
        maxSlides: 1,
        moveSlides: 1,
    onSlideNext:function($slideElement, oldIndex, newIndex){},
      onSlidePrev:function($slideElement, oldIndex, newIndex){ },
      onSliderLoad:function(){
      }
    });

    $('input[name="name"]').blur(function() {
        if ($(this).val().length < 2) {
            $(this).addClass('error-input');
        }
    });
    $('input[name="name"]').focus(function() {
        $(this).removeClass('error-input');
    });

    $('input[name="phone"]').mask('+7 (999) 999-99-99');
    $('input[name="phone"]').blur(function() {
        if ($(this).val().length != 18) {
            $(this).addClass('error-input');
        }
    });
    $('input[name="phone"]').focus(function() {
        $(this).removeClass('error-input');
    });

    function getURLParameter(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
    }

    function run_geo(geo_url) {
        $.ajax({
            type: 'GET',
            url: geo_url,
            dataType: 'xml',
            success: function(xml) {
                $(xml).find('ip').each(function() {
                    var city = $(this).find('city').text();
                    var region = $(this).find('region').text();
                    if (city != region) {
                        var ipg = city + ', ' + region;
                    } else {
                        var ipg = city;
                    }
                    $('<input type="hidden" />').attr({
                        name: 'location',
                        class: 'location',
                        value: ipg
                    }).appendTo("form");
                });
            }
        });
    }
    $.get("http://ipinfo.io", function(response) {
        geo_url = 'http://ipgeobase.ru:7020/geo?ip=' + response.ip;
        run_geo(geo_url);
    }, "jsonp");
    utm = [];
    $.each(["utm_source", "utm_medium", "utm_campaign", "utm_term", 'source_type', 'source', 'position_type', 'position', 'added', 'creative', 'matchtype'], function(i, v) {
        $('<input type="hidden" />').attr({
            name: v,
            class: v,
            value: function() {
                if (getURLParameter(v) == undefined) return '-';
                else return getURLParameter(v)
            }
        }).appendTo("form")
    })

    $('<input type="hidden" />').attr({
        name: 'url',
        value: document.location.href
    }).appendTo("form");
    $('<input type="hidden" />').attr({
        name: 'title',
        value: document.title
    }).appendTo("form");



    $('form').submit(function(e) {
        e.preventDefault();
        $(this).find('input[type="text"]').trigger('blur');
        if (!$(this).find('input[type="text"]').hasClass('error-input')) {
            var type = $(this).attr('method');
            var url = $(this).attr('action');
            var data = $(this).serialize();
            var track_event = $(this).find('input[name="event"]').val();
            $.ajax({
                type: type,
                url: url,
                data: data,
                success: function() {
                    $.arcticmodal('close');
                    $('#okgo').arcticmodal();
                    $('input[name="name"]').val('');
                    $('input[name="phone"]').val('');

                }
            });
        } else {

            var eror_pop_text = '';

            if ($(this).find('input[name="name"]').hasClass('error-input') && !$(this).find('input[name="phone"]').hasClass('error-input')) {
                eror_pop_text = 'Пожалуйста введите имя';
            } else

            if ($(this).find('input[name="phone"]').hasClass('error-input') && !$(this).find('input[name="name"]').hasClass('error-input')) {
                eror_pop_text = 'Пожалуйста введите телефон';
            } else

            if ($(this).find('input[name="phone"]').hasClass('error-input') && $(this).find('input[name="name"]').hasClass('error-input')) {
                eror_pop_text = 'Пожалуйста введите имя и телефон';
            }

            $('#form-error-text').html(eror_pop_text)
            $('#form-error-pop').arcticmodal();
        }
    });

    $('.scrlto').click(function(e) {
        e.preventDefault();
        $("html, body").animate({
            scrollTop: $('.sec4').offset().top
        }, 400);
    });


    $('.sec4 .s1 .item').click(function() {

        $('.sec4 .s1').hide();
        var type = $(this).attr('data-type');
        if (type == 'buy') {
            $('.sec4 .s2.step2').show();
        } else {
            $('.sec4 .s2.step2_b').show();
        }
        $('.sec4 .s3').attr('data-type', type);
        $('form').find('input[name="type"]').val(type);

    });

    $('.sec4 .s2 .back').click(function() {
        $('.sec4 .s2 input.number').val('');
        calculate();
        $('.sec4 .s2').hide();
        $('.sec4 .s1').show();

    });

    // Numeric only control handler
    jQuery.fn.ForceNumericOnly =
        function() {
            return this.each(function() {
                $(this).keydown(function(e) {
                    var key = e.charCode || e.keyCode || 0;
                    // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
                    // home, end, period, and numpad decimal
                    return (
                        key == 8 ||
                        key == 9 ||
                        key == 13 ||
                        key == 46 ||
                        key == 110 ||
                        key == 190 ||
                        (key >= 35 && key <= 40) ||
                        (key >= 48 && key <= 57) ||
                        (key >= 96 && key <= 105));
                });
            });
        };

    //

    $("input.number").ForceNumericOnly();



    $('input.number').keyup(function() {
        calculate();
    });

    $('.sec4 .s2 .type').children().click(function() {
        $(this).parent().children().removeClass('active');
        $(this).addClass('active');
        calculate();
    });


    $('.sec4 .s2 .valut .current').click(function() {
        var $select = $(this).parent().children('.select');
        if ($select.is(':visible')) {
            $select.hide();
        } else {
            $select.show();
        }
    });

    $('.sec4 .s2 .valut .select .item').click(function() {
        var $select = $(this).parent();

        $select.parent().children('.current').attr('data-selected', $(this).attr('data-type'));

        $select.hide();
        calculate();
    });

    $('.sec4 .s2 .btn').click(function() {
        if (parseFloat($(this).closest('.block').find('input.number').val()) > 0) {

            $('.sec4 .s2').hide();

            $('.sec4 .s3').show();

        } else {

            $('#form-error-text').html("Пожалуйста введите сумму сделки")
            $('#form-error-pop').arcticmodal();
        }
    });

    $('.sec4 .s3 .back').click(function() {

        $('.sec4 .s3').hide();
        if ($(this).closest('.s3').attr('data-type') == 'buy') {

            $('.sec4 .s2.step2').show();
        } else {
            $('.sec4 .s2.step2_b').show();

        }
    });


    $('.pop .close').click(function() {
        $(this).closest('.pop').arcticmodal('close');
    });

    $('.confidential').click(function() {
        $('#conf').arcticmodal();
    })

});