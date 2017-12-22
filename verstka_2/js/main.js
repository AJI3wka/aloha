
$(document).ready(function() {
	
    

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

    $('.scrlto').click(function(e){e.preventDefault();$("html, body").animate({ scrollTop: $('.sec4').offset().top}, 400);});


    $('.sec4 .s1 .item').click(function(){

    	$('.sec4 .s1').hide();
    	var type = $(this).attr('data-type');
    	if (type=='buy') {
    		$('.sec4 .s2.step2').show();	
    	}else{
    		$('.sec4 .s2.step2_b').show();
    	}
    	$('.sec4 .s3').attr('data-type',type);
    	$('form').find('input[name="type"]').val(type);

    });
    $('.sec4 .s2 .back').click(function(){
    	$('.sec4 .s2 input.number').val('');
    	calculate();
    	$('.sec4 .s2').hide();
    	$('.sec4 .s1').show();
    	
    });

    var courses = {
    	bit_dol:11999,
    	bit_eur:10050,
    	ltc_dol:202.59,
    	ltc_eur:170.99,
    	eth_dol:560.03,
    	eth_eur:470.54,
    	dol_bit:1/11999,
    	eur_bit:1/10050,
    	dol_ltc:1/202.59,
    	eur_ltc:1/170.99,
    	dol_eth:1/560.03,
    	eur_eth:1/470.54
    }

	// Numeric only control handler
	jQuery.fn.ForceNumericOnly =
	function()
	{
	    return this.each(function()
	    {
	        $(this).keydown(function(e)
	        {
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


    function calculate(){
    	var $wrap = $('.s2:visible');
    	var give = $wrap.find('.valut').find('.current').attr('data-selected');
    	var get = $wrap.find('.line').find('.type').children('.active').attr('data-type');
    	//alert(get);
    	var give_count = parseFloat($wrap.find('.number').val());
    	var get_count = 0;
    	var coef = 0;
    	if (give_count>0) {

    		if (give == 'bitcoin') {
    			if (get =='dollar') {
    				coef = courses.bit_dol
    			}else{

    				coef = courses.bit_eur
    			}
    		}else if(give== 'ethereum'){
    			if (get =='dollar') {
    				coef = courses.eth_dol
    			}else{

    				coef = courses.eth_eur
    			}
    		}else if(give =='litecoin'){
    			if (get =='dollar') {
    				coef = courses.ltc_dol
    			}else{

    				coef = courses.ltc_eur
    			}
    			
    		}else if(give== 'dollar'){
    			if (get =='bitcoin') {
    				coef = courses.dol_bit
    			}else if (get =='litecoin') {
    				coef = courses.dol_ltc
    				
    			}else{
    				coef = courses.dol_eth

    			}
    			
    		}else if(give =='euro'){
    			if (get =='bitcoin') {
    				coef = courses.eur_bit
    			}else if (get =='litecoin') {
    				coef = courses.eur_ltc
    			}else{
    				coef = courses.eur_eth
    			}
    			
    		}


    		get_count = give_count*coef;

    		get_count = Math.round(get_count * Math.pow(10, 5)) / Math.pow(10,5)

    	}

    	$('form').find('input[name="give"]').val(give);
    	$('form').find('input[name="count_give"]').val(give_count);
    	$('form').find('input[name="get"]').val(get);
    	$('form').find('input[name="count_get"]').val(get_count);
    	$wrap.find('.curs').html(get_count);

    }

    $('input.number').keyup(function(){
    	calculate();
    });

   	$('.sec4 .s2 .type').children().click(function(){
   		$(this).parent().children().removeClass('active');
   		$(this).addClass('active');
   		calculate();
   	});
   	$('.sec4 .s2 .valut .current').click(function(){
   		var $select = $(this).parent().children('.select');
   		if ($select.is(':visible')) {
   			$select.hide();
   		}else{
   			$select.show();
   		}
   	});
   	$('.sec4 .s2 .valut .select .item').click(function(){
   		var $select = $(this).parent();

   		$select.parent().children('.current').attr('data-selected',$(this).attr('data-type'));

   		$select.hide();
   		calculate();
   	});

   	$('.sec4 .s2 .btn').click(function(){
   		if (parseFloat($(this).closest('.block').find('input.number').val())>0) {

   			$('.sec4 .s2').hide();

			$('.sec4 .s3').show();
   			
   		}else{

            $('#form-error-text').html("Пожалуйста введите сумму сделки")
            $('#form-error-pop').arcticmodal();
   		}
   	});

   	$('.sec4 .s3 .back').click(function(){
   		
			$('.sec4 .s3').hide();
   		if ($(this).closest('.s3').attr('data-type')=='buy') {

			$('.sec4 .s2.step2').show();
   		}else{
			$('.sec4 .s2.step2_b').show();

   		}
   	});


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

	$('.confidential').click(function(){
		$('#conf').arcticmodal();
	})

});