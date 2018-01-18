function scrollWidth() {
    var div = document.createElement('div');
    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.visibility = 'hidden';
    document.body.appendChild(div);
    var scrollWidth = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);

    return scrollWidth;
}

function lightboxShow(lighboxContent) {
    $('body').append("<div class='lightbox__overlay'><div class='lightbox__wrap'><div class='lightbox__content'><div class='lightbox__close'></div></div></div></div>");
    var lightBoxContent = lighboxContent.clone();
    $('.lightbox__content').html(lightBoxContent).prepend('<div class="lightbox__close"></div>');
    $('body').css('overflow', 'hidden').css('padding-right', scrollWidth() + 'px');
    $('.lightbox__overlay, .lightbox__wrap').fadeIn();

    $('.lightbox__content').on('click', function(event) {
        event.stopPropagation();
    });

    $('.lightbox__close').on('click', function() {
        lightBoxClose();
    });
    $('.lightbox__overlay').on('click', function() {
        lightBoxClose();
    });
}

function lightBoxClose() {
    $('.lightbox__overlay, .lightbox__wrap').fadeOut();
    $('body').css('overflow', 'auto').css('padding-right', '0px');
    $('.lightbox__overlay, .lightbox__wrap').remove();
}
$(function() {
    $('.catalog__button, .scheme__button').on('click', function() {
        $('html, body').animate({
            scrollTop: ($('.form').eq(0).offset().top) + "px"
        }, {
            duration: 1000,
            complete: function() {
                $('.form').eq(0).find('.form__text').eq(0).focus();
            }
        });
    });
});
$(function() {

    var myMap,
        myPlacemark;

    function init() {
        myMap = new ymaps.Map("yaMapPopup", {
            center: [58.592046, 49.674976],
            zoom: 15,
            controls: ['zoomControl']
        });
        myPlacemark = new ymaps.Placemark([58.592046, 49.674976], {
            hintContent: 'г.Киров, Красноармейская, 19'
        }, {
            preset: 'islands#darkGreenDotIcon'
        });
        myMap.geoObjects.add(myPlacemark);
    }

    $('.contacts__adress').on('click', function(e) {
        e.stopPropagation();
        var mapContent = $('#mapContent');
        var itemContentId = mapContent.find('#yaMap').attr('id') + 'Popup';
        lightboxShow(mapContent);
        $('.lightbox__content #yaMap').attr('id', itemContentId);
        ymaps.ready(init);
    });
});
$(function() {
    $('.header__button,.yellow-btn-scheme,.yellow-btn-catalog').on('click', function() {
        var formContent = $('.formModal');
        lightboxShow(formContent);
        forms_bind();
    });
});

function forms_bind() {

    $('input[name="name"]').unbind('focus');
    $('input[name="name"]').unbind('blur');
    $('input[name="name"]').blur(function() {
        if ($(this).val().length < 2) {
            $(this).addClass('error-input');
        }
    });
    $('input[name="name"]').focus(function() {
        $(this).removeClass('error-input');
    });


    $('input[name="phone"]').unbind('focus');
    $('input[name="phone"]').unbind('blur');

    $('input[name="phone"]').mask('+7 (999) 999-99-99');
    $('input[name="phone"]').blur(function() {
        if ($(this).val().length != 18) {
            $(this).addClass('error-input');
        }
    });
    $('input[name="phone"]').focus(function() {
        $(this).removeClass('error-input');
    });


    $('form').unbind('focus');
    $('form').submit(function(e) {
        e.preventDefault();
        $(this).find('input[type="text"]').trigger('blur');
        if (!$(this).find('input[type="text"]').hasClass('error-input')) {
            var type = 'post';
            var url = 'mail.php';
            var data = $(this).serialize();
            $.ajax({
                type: type,
                url: url,
                data: data,
                success: function() {
                    var formContent = $('#okgo');
                    lightboxShow(formContent);
                }
            });
        }
    });

}
$(document).ready(function() {

    function getURLParameter(name) {return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;} 
    function run_geo(geo_url){
        $.ajax({type: 'GET',url: geo_url,dataType: 'xml',
            success: function(xml) {$(xml).find('ip').each(function(){
            var city = $(this).find('city').text();
            var region = $(this).find('region').text();
            if(city!=region){var ipg = city+', '+region;}else{var ipg = city;}
            $('<input type="hidden" />').attr({name: 'location', class: 'location', value:ipg}).appendTo("form");
        });}});
    }
    $.get("http://ipinfo.io", function(response) {geo_url='http://ipgeobase.ru:7020/geo?ip='+response.ip; run_geo(geo_url);}, "jsonp");
    utm=[];$.each(["utm_source","utm_medium","utm_campaign","utm_term",'source_type','source','position_type','position','added','creative','matchtype'],function(i,v){$('<input type="hidden" />').attr({name: v, class: v, value: function(){if(getURLParameter(v) == undefined)return '-'; else return getURLParameter(v)}}).appendTo("form")});
    $('<input type="hidden" />').attr({name: 'url', value: document.location.href}).appendTo("form");
    $('<input type="hidden" />').attr({name: 'title', value: document.title}).appendTo("form");

    forms_bind();

    $('#show_works').click(function(){
        $(this).hide();
        $('#hidden-works').show();
    });
    $('#show_otz').click(function(){
        $(this).hide();
        $('#hidden-otz').show();
    });

});