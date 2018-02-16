$.arcticmodal('setDefault', {
    overlay:{
        css:{
            backgroundColor: '#0b0b0b',
            opacity: .8
        }
    }
});

function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('#menu a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('#menu a').removeClass("active");
            currLink.addClass("active");
        }
        else{
            currLink.removeClass("active");
        }
    });
}

function Timer (date) {
    var s = (new Date(date)).getTime() - (new Date()).getTime();
    s = parseInt(s / 1000);
    var d,h,m;
    if (s>=0) {

        d = parseInt(s / 86400);
        s -= d * 86400;
        h = parseInt(s / 3600);
        s -= h * 3600;
        m = parseInt(s / 60);
        s -= m * 60;
    }else{
        d = 0;
        m = 0;
        h = 0;
        s = 0;
    }
    if (d<10) {
        d = '0'+d;
    }
    if (h<10) {
        h = '0'+h;
    }
    if (m<10) {
        m = '0'+m;
    }
    if (s<10) {
        s = '0'+s;
    }

    var $timer = $('#timer');
    $timer.find('#t_day').html(d);
    $timer.find('#t_hour').html(h);
    $timer.find('#t_min').html(m);
    $timer.find('#t_sec').html(s);



    if ((new Date(date)).getTime() >= (new Date()).getTime()) setTimeout('Timer(\'' + date + '\');', 1000);
}

function parse_calculate_vals(){
    var $wrap = $('.sec8').find('.left');
    var $pop = $('#calculate-pop'); 
    $wrap.find('.btn-wrap').each(function(){
        $pop.find('input[name="'+$(this).attr('data-target')+'"]').val($(this).find('.btn.active').text());
    });
    $pop.find('input[name="comment"]').val($wrap.find('textarea').val());
}
! function(e, t, n) {
    function r() {
        for (; u[0] && "loaded" == u[0][l];) o = u.shift(), o[f] = !a.parentNode.insertBefore(o, a)
    }
    for (var i, s, o, u = [], a = e.scripts[0], f = "onreadystatechange", l = "readyState"; i = n.shift();) s = e.createElement(t), "async" in a ? (s.async = !1, e.head.appendChild(s)) : a[l] ? (u.push(s), s[f] = r) : e.write("<" + t + ' src="' + i + '" defer></' + t + ">"), s.src = i
}(document, "script", ["js/map.js","http://api-maps.yandex.ru/2.1.29/?lang=ru-Ru&onload=init_map"])

var slider1,slider2,slider3,slider4,slider5,slider6;

function init_photo_sliders(){

    slider1 = $('#photo-slide-1 .wrap').bxSlider({
        infiniteLoop: true,
        nextSelector:'#sld1r',
        prevSelector:'#sld1l',
        controls: true,
        pager:true,
        pagerCustom:'#pager1',
        auto: false,
        speed: 500,
        minSlides: 1,
        maxSlides: 1,
        moveSlides: 1
    });

    slider2 = $('#photo-slide-2 .wrap').bxSlider({
        infiniteLoop: true,
        nextSelector:'#sld2r',
        prevSelector:'#sld2l',
        controls: true,
        pager:true,
        pagerCustom:'#pager2',
        auto: false,
        speed: 500,
        minSlides: 1,
        maxSlides: 1,
        moveSlides: 1
    });

    slider3 = $('#photo-slide-3 .wrap').bxSlider({
        infiniteLoop: true,
        nextSelector:'#sld3r',
        prevSelector:'#sld3l',
        controls: true,
        pager:true,
        pagerCustom:'#pager3',
        auto: false,
        speed: 500,
        minSlides: 1,
        maxSlides: 1,
        moveSlides: 1
    });
}
function init_pop_slider1(){

    slider5 = $('.arcticmodal-container #pop1slide').bxSlider({
        infiniteLoop: true,
        nextSelector:'#arrr1',
        prevSelector:'#arrl1',
        controls: true,
        pager:false,
        auto: false,
        speed: 500,
        minSlides: 1,
        maxSlides: 1,
        moveSlides: 1
    });
}
 
function init_pop_slider2(){
    
    slider6 = $('.arcticmodal-container #pop2slide').bxSlider({
        infiniteLoop: true,
        nextSelector:'#arrr2',
        prevSelector:'#arrl2',
        controls: true,
        pager:false,
        auto: false,
        speed: 500,
        minSlides: 1,
        maxSlides: 1,
        moveSlides: 1
    });
}
function show_form_error($form){
    var eror_pop_text = '';

    if ($form.find('input[name="name"]').hasClass('error-input') 
        && !$form.find('input[name="phone"]').hasClass('error-input')
        && !$form.find('input[name="email"]').hasClass('error-input')) {
        eror_pop_text = 'Пожалуйста введите имя';
    } else

    if ($form.find('input[name="phone"]').hasClass('error-input') 
        && !$form.find('input[name="name"]').hasClass('error-input')
        && !$form.find('input[name="email"]').hasClass('error-input')) {
        eror_pop_text = 'Пожалуйста введите телефон';
    } else

    if (!$form.find('input[name="phone"]').hasClass('error-input') 
        && !$form.find('input[name="name"]').hasClass('error-input')
        && $form.find('input[name="email"]').hasClass('error-input')) {
        eror_pop_text = 'Пожалуйста введите email';
    } else

    if ($form.find('input[name="name"]').hasClass('error-input') 
        && $form.find('input[name="phone"]').hasClass('error-input')
        && !$form.find('input[name="email"]').hasClass('error-input')) {
        eror_pop_text = 'Пожалуйста введите имя и телефон';
    } else

    if ($form.find('input[name="name"]').hasClass('error-input') 
        && !$form.find('input[name="phone"]').hasClass('error-input')
        && $form.find('input[name="email"]').hasClass('error-input')) {
        eror_pop_text = 'Пожалуйста введите имя и email';
    } else

    if (!$form.find('input[name="name"]').hasClass('error-input') 
        && $form.find('input[name="phone"]').hasClass('error-input')
        && $form.find('input[name="email"]').hasClass('error-input')) {
        eror_pop_text = 'Пожалуйста введите телефон и email';
    } else

    if ($form.find('input[name="name"]').hasClass('error-input') 
        && $form.find('input[name="phone"]').hasClass('error-input')
        && $form.find('input[name="email"]').hasClass('error-input')) {
        eror_pop_text = 'Пожалуйста введите имя, телефон и email';
    } 

    $('#form-error-text').html(eror_pop_text);
    $('#form-error-pop').arcticmodal();
}
function price_updated(){

    var date = new Date();

    date.setDate(date.getDate() - 1);

    var date_s = 
    ("0" + date.getUTCDate()).slice(-2) + "." +
    ("0" + (date.getUTCMonth()+1)).slice(-2) + "." +
    date.getUTCFullYear();



    $('.price-updated').html(date_s);
}

$(document).ready(function () {

    price_updated();

    $(document).on("scroll", onScroll);
    
    //smoothscroll
    $('#menu a').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");
        
        $('a').each(function () {
            $(this).removeClass('active');
        })
        $(this).addClass('active');
      
        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top-135
        }, 500, 'swing', function () {
            $(document).on("scroll", onScroll);
        });
    });

    $('.pop-btn').click(function(e){
        e.preventDefault();
        var conf = {}
        if ($(this).hasClass('calculate')) {
             parse_calculate_vals();
        }
        if ($(this).attr('href') == '#zz-pop') {
            conf = {
                afterOpen:function(){
                    if (slider5) {
                        slider5.destroySlider();
                    }
                    init_pop_slider1();         
                }
            }
        }
        if ($(this).attr('href') == '#consult-pop') {
            conf = {
                afterOpen:function(){
                    if (slider6) {
                        slider6.destroySlider();
                    }
                    init_pop_slider2();                     
                }
            }          
        }
        $($(this).attr('href')).arcticmodal(conf);
        
    });
    $('.pop-box').find('.close').click(function(e){
        $(this).closest('.pop-box').arcticmodal('close');
    });

    $('.sec1').find('a.action').click(function(e) {
        e.preventDefault();
        $("html, body").animate({ scrollTop: $($(this).attr('href')).offset().top-135}, 500, 'swing');        /* Act on the event */
    });

    $('.project-gallery').magnificPopup({
      delegate: 'a',
      type: 'image',
        gallery: {
          enabled: true
        }
    });

    $('.sec7').find('.block').find('.left').find('li').click(function(event) {
        $(this).closest('.left').find('li').removeClass('active');
        $(this).addClass('active');
        $(this).closest('.block').find('.right').removeClass('active');
        $('#'+$(this).attr('data-target')).addClass('active');
    });

    $('.sec8').find('.left').find('.btn').click(function(){
        $(this).closest('.li').find('.btn').removeClass('active');
        $(this).addClass('active');
    });


    init_photo_sliders();

    $('.sec11').find('.nav').find('a').click(function(e){
        e.preventDefault();
        $(this).parent().children().removeClass('active');
        $(this).addClass('active');
        $(this).closest('section').find('.slider').removeClass('active');
        $(this).closest('section').find($(this).attr('href')).addClass('active');
        slider1.destroySlider();
        slider2.destroySlider();
        slider3.destroySlider();
        init_photo_sliders()
    });

    var slider4 = $('#slider-otz .wrap').bxSlider({
        infiniteLoop: true,
        nextSelector:'#sld4r',
        prevSelector:'#sld4l',
        controls: true,
        pager:true,
        pagerCustom:'#pager4',
        auto: false,
        speed: 500,
        minSlides: 1,
        maxSlides: 1,
        moveSlides: 1,        
        onSliderLoad:function(){
            $('#slider-otz .slide').click(function(){
                $(this).append('<iframe src="https://www.youtube.com/embed/'+$(this).attr('data-video-id')+'?autoplay=1&rel=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
            }); 
        }
    });
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


    $('input[name="name"]').blur(function() {
        $(this).removeClass('correct-input').removeClass('error-input');
      if ($(this).val().length < 2) {
            $(this).addClass('error-input');
            $(this).parent().find('span').show();
      }else{
          $(this).addClass('correct-input');
              var _this = this;
              setTimeout(function(){
                $(_this).closest('form').find('input.hidden').addClass('show');
              },150);
      }
      });
      $('input[name="name"]').focus(function() {
        $(this).removeClass('correct-input').removeClass('error-input');
        $(this).parent().find('span').hide();
      });

      $('input[name="phone"]').mask('+7 (999) 999-99-99');
      $('input[name="phone"]').blur(function() {

        $(this).removeClass('correct-input').removeClass('error-input');
          if ($(this).val().length != 18 || $(this).val().indexOf('_') > -1) {
                $(this).addClass('error-input');
                $(this).parent().find('span').show();
          } else {
              $(this).addClass('correct-input');
              var _this = this;
              setTimeout(function(){
                $(_this).closest('form').find('input.hidden').addClass('show');
              },150);
          }

      });
      $('input[name="phone"]').on('input keyup',function() {
        console.log($(this).val().indexOf('_'));
        if ($(this).val().length == 18 && $(this).val().indexOf('_') == -1) {     
            $(this).addClass('correct-input');
                var _this = this;
                setTimeout(function(){
                    $(_this).closest('form').find('input.hidden').addClass('show');
            },150);
        }
      });
      $('input[name="phone"]').focus(function() {
        $(this).removeClass('correct-input').removeClass('error-input');
        $(this).parent().find('span').hide();
      });

      function validateEmail(email) {
          var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
          return re.test(email);
      };


      $('input[name="email"]').blur(function() {
        $(this).removeClass('correct-input').removeClass('error-input');
          if (!validateEmail($(this).val())) {
                $(this).addClass('error-input');
                $(this).parent().find('span').show();
          }else{
              $(this).addClass('correct-input');
              var _this = this;
              setTimeout(function(){
                $(_this).closest('form').find('input.hidden').addClass('show');
              },150);
          }
      });
      $('input[name="email"]').on('input keyup',function() {
        var val = $(this).val();
        if (validateEmail(val)) {
            if (val.indexOf(".ru") >= 0||val.indexOf(".net") >= 0||val.indexOf(".com") >= 0){
                
                $(this).addClass('correct-input');
                var _this = this;
                setTimeout(function(){
                $(_this).closest('form').find('input.hidden').addClass('show');
                },150);
            
            }
        }
      });
      $('input[name="email"]').focus(function() {
        $(this).removeClass('correct-input').removeClass('error-input');
        $(this).parent().find('span').hide();
      });



    $('form').submit(function(e) {
        e.preventDefault();
        $(this).find('input.hidden.show,input.active').trigger('blur');
        if ($(this).find('input.error-input').length>0) {

            show_form_error($(this));
                

        }
        if ($(this).find('input.hidden').length != $(this).find('input.hidden.show').length) return
        
        $(this).find('input[type="text"],input[type="email"]').trigger('blur');
        if (!$(this).find('input[type="text"],input[type="email"]').hasClass('error-input')) {
                var type = $(this).attr('method');
                var url = $(this).attr('action');
                var tar = $(this).find('input[name="submit_target"]').val();
                var data = $(this).serialize();
                $.ajax({
                    type: type,
                    url: url,
                    data: data,
                    success: function() {
                        $.arcticmodal('close');
                        $('#okgo').arcticmodal();
                        $('input[name="name"]').val('');
                        $('input[name="phone"]').val('');
                        $('input[name="email"]').val('');
                        submit_target(tar);
                    }
                });
            } else {
                
                show_form_error($(this));
            }
    });

    $('.pop3').find('.var').click(function(){
        $(this).closest('.wrap').find('.var').removeClass('active');
        $(this).addClass('active');
        $(this).closest('.pop3').addClass('can_next');
    });

    $('.pop3').find('.back').click(function(e){
        e.preventDefault();
        var $pop = $(this).closest('.pop3')
        $pop.removeClass('can_next');
        var status = parseInt($pop.attr('data-status'));
        if (status>1) {
            var new_status = status-1;
            $pop.attr('data-status',new_status);
            $pop.find('.wrap[data-status="'+new_status+'"]').find('.var').removeClass('active');
        }

    });
    $('.pop3').find('.forward').click(function(e){
        e.preventDefault();
        var $pop = $(this).closest('.pop3')
        $pop.removeClass('can_next');
        var status = parseInt($pop.attr('data-status'));
        var question_text = $pop.find('.left').find('p').find('span[data-status="'+status+'"]').text() + ' - ' + $pop.find('.left').find('.select').find('.wrap[data-status="'+status+'"]').find('.active').text();
        $pop.find('form').find('input[name="question_'+status+'"]').val(question_text);
        if (status<5) {
            var new_status = status+1;
            $pop.attr('data-status',new_status);
            $pop.find('.wrap[data-status="'+new_status+'"]').find('.var').removeClass('active');
        }else{            
            $pop.attr('data-status','form');
        }
    });

    Timer('2018-03-01 00:00:00');
});