
$(document).ready(function() {
	
    //$('<script type="text/javascript" charset="utf-8" async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Ada875ff33ada0b8590de86351c01c409b6ff02ec3b3a0c5ca9998de1413acd83&amp;width=100%25&amp;height=350&amp;lang=ru_UA&amp;scroll=true"></script>').appendTo('.sec11 .block .map');
	
    //$('.sec11 .block .map').html('<script type="text/javascript" charset="utf-8" async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Ada875ff33ada0b8590de86351c01c409b6ff02ec3b3a0c5ca9998de1413acd83&amp;width=100%25&amp;height=350&amp;lang=ru_UA&amp;scroll=true"></script>');

    !function(e,t,n){function r(){for(;u[0]&&"loaded"==u[0][l];)o=u.shift(),o[f]=!a.parentNode.insertBefore(o,a)}for(var i,s,o,u=[],a=e.scripts[0],f="onreadystatechange",l="readyState";i=n.shift();)s=e.createElement(t),"async"in a?(s.async=!1,e.head.appendChild(s)):a[l]?(u.push(s),s[f]=r):e.write("<"+t+' src="'+i+'" defer></'+t+">"),s.src=i}(document,"script",["https://maps.googleapis.com/maps/api/js?key=AIzaSyAdzwz73OHrdVGjKVKow8ID8T31yNxiBSI","js/map.js"]);


    $('input[name="name"]').blur(function() {if($(this).val().length < 2) {$(this).addClass('error-input');}});
    $('input[name="name"]').focus(function() {$(this).removeClass('error-input');});

  	$('input[name="phone"]').mask('+7 (999) 999-99-99');
    $('input[name="phone"]').blur(function() {if($(this).val().length != 18) {$(this).addClass('error-input');}});
  	$('input[name="phone"]').focus(function() {$(this).removeClass('error-input');});

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
	    $('form').submit(function(e){
        e.preventDefault();
        $(this).find('input[type="text"]').trigger('blur');
        if(!$(this).find('input[type="text"]').hasClass('error-input')){
            var type=$(this).attr('method');
            var url=$(this).attr('action');
            var data=$(this).serialize();
            var track_event=$(this).find('input[name="event"]').val();
            $.ajax({type: type, url: url, data: data,
                success : function(){
                    $.arcticmodal('close');$('#okgo').arcticmodal();
                    $('input[name="name"]').val('');
                    $('input[name="phone"]').val('');
                    //submit_track_event(track_event);
                    if(typeof yaCounter46130505 !== "undefined"){
                        yaCounter46130505.reachGoal('zayavka_advertexperts.ru');
                    }
                    if (typeof ga !== "undefined") {
                        ga('send', 'event', 'zayavka_advertexperts.ru', 'zayavka_advertexperts.ru');
                    }
                    if (typeof _gaq !== "undefined") {
                        _gaq.push('_trackEvent', 'zayavka_advertexperts.ru', 'zayavka_advertexperts.ru');
                    }
                }
            }); 
        }else{

            var eror_pop_text = '';

            if ($(this).find('input[name="name"]').hasClass('error-input') && !$(this).find('input[name="phone"]').hasClass('error-input')) {
                eror_pop_text = 'Пожалуйста введите имя';
            } else

            if($(this).find('input[name="phone"]').hasClass('error-input') && !$(this).find('input[name="name"]').hasClass('error-input')){
                eror_pop_text = 'Пожалуйста введите телефон';
            }else

            if($(this).find('input[name="phone"]').hasClass('error-input') && $(this).find('input[name="name"]').hasClass('error-input')){
                eror_pop_text = 'Пожалуйста введите имя и телефон';
            }

            $('#form-error-text').html(eror_pop_text)
            $('#form-error-pop').arcticmodal();
        }
    });

	$('.pop .close').click(function(){
		$(this).closest('.pop').arcticmodal('close');
	});


});