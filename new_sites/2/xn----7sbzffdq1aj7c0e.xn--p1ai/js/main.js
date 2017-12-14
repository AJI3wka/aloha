$(document).ready(function () {

    new WOW().init();

    $(".fancybox").fancybox();

    $('a[data-role="open-modal"]').on('click', function () {
        return false;
    });

    /* Открытие модалок */
    $('[data-role="open-modal"]').on('click', function () {
        var target = $(this).data('modal-id');
        $('[data-modal="' + target + '"').addClass('active');
    });

    $(document).mouseup(function (e) {
        var div = $('.modal .modal__box');
        if (!div.is(e.target) && div.has(e.target).length === 0) {
            $('.modal').removeClass('active');
        }
    });

    /* Табы. Для кого этот курс */
    $('[data-role="tab-ctrl-for-you"] li').mouseenter(function () {
        var target = $(this).data('id');
        $('[data-role="tab-ctrl-for-you"] li').each(function () {
            $(this).removeClass('for-you__tabs-ctrl--active');
        });
        $('[data-role="tab-content"] .for-you__tab').each(function () {
            $(this).removeClass('for-you__tab--active');
        });
        $(this).addClass('for-you__tabs-ctrl--active');
        $('[data-tab="' + target + '"]').addClass('for-you__tab--active');
    });

    /* Табы. фак */
    $('[data-role="tab-ctrl-faq"] li').click(function () {
        var target = $(this).data('faq-id');
        $('[data-role="tab-ctrl-faq"] li').each(function () {
            $(this).removeClass('faq__ctrl--active');
        });
        $('[data-role="faq-content"] .faq__box').each(function () {
            $(this).removeClass('faq__box--active');
        });
        $(this).addClass('faq__ctrl--active');
        $('[data-faq="' + target + '"]').addClass('faq__box--active');
    });

    /* Табы. Преподователи */
    $('[data-role="tab-ctrl-teachers"] li').mouseenter(function () {
        var target = $(this).data('id');
        $('[data-role="tab-ctrl-teachers"] li').each(function () {
            $(this).removeClass('teachers__list--active');
        });
        $('[data-role="tab-content"] .teacher').each(function () {
            $(this).removeClass('teacher--active');
        });
        $(this).addClass('teachers__list--active');
        $('[data-tab="' + target + '"]').addClass('teacher--active');
    });

    /* Табы. Ученики */
    $('[data-role="tab-ctrl-students"] li').mouseenter(function () {
        var target = $(this).data('id');
        $('[data-role="tab-ctrl-students"] li').each(function () {
            $(this).removeClass('students__list--active');
        });
        $('[data-role="tab-content"] .student').each(function () {
            $(this).removeClass('student--active');
        });
        $(this).addClass('students__list--active');
        $('[data-tab="' + target + '"]').addClass('student--active');
    });

    $('[data-role="our-school"]').owlCarousel({
        nav: true,
        navText: ['<i class="icon prev"></i>', '<i class="icon next"></i>'],
        center: true,
        loop: true
    });

    $('[data-role="teacher-portfolio"]').owlCarousel({
        nav: true,
        navText: ['<i class="icon prev"></i>', '<i class="icon next"></i>'],
        items: '4'
    });

    $('[data-role="student-portfolio"]').owlCarousel({
        nav: true,
        navText: ['<i class="icon prev"></i>', '<i class="icon next"></i>'],
        items: '4'
    });

    $('[data-role="teacher-coop"]').owlCarousel({
        nav: true,
        navText: ['<i class="icon prev"></i>', '<i class="icon next"></i>'],
        items: '8'
    });

    $('[data-role="teacher-cert"]').owlCarousel({
        nav: true,
        navText: ['<i class="icon prev"></i>', '<i class="icon next"></i>'],
        items: '4'
    });

    $('[data-role="coop"]').owlCarousel({
        nav: true,
        navText: ['<i class="icon prev"></i>', '<i class="icon next"></i>'],
        items: '6'
    });

    $('.masonry-grid').masonry({
        // options
        itemSelector: '.masonry-grid__img',
        columnWidth: 360
    });

    $('[data-role="more-smi"]').on('click', function () {
        $('.smi__list').addClass('active');
        $(this).fadeOut();
    });


    $("[data-role='submit']").submit(function () {

            var form = $(this);
            var error = false;
            form.find('[name="phone"]').each(function () {
                if ($(this).val() == '') {
                    $(this).addClass('no-valid');
                    $(this).attr('placeholder','* обязательно для заполения');
                    error = true;
                } else {
                    $(this).removeClass('no-valid');
                }
            });
            if (!error) {
                var data = form.serialize();
                $.ajax({
                        type: 'POST',
                        url: '/send.php',
                        dataType: 'json',
                        data: data,
                        complete: function () {
                        $('.modal').removeClass('active');
                        $('.modal-success').addClass('active');
                        }
                    }
                );
            }
            return false;
        }
    );

    $(".main-head__menu--link").click(function () {
        var elementClick = $(this).attr("href");
        var destination = $(elementClick).offset().top;
        $('html,body').animate( { scrollTop: destination }, 1100 );
        return false;
    });

    $('[name="phone"]').mask("+7(999) 999-9999");

    $('.price__btn').click(function () {
       var tag = $(this).data('price'),
           title;
       if(tag == 'online') {
           title = 'Заказ на онлайн курс';
       } else if(tag == 'full') {
           title = 'Заказ на полный курс'
       } else if (tag == 'vip') {
           title = 'Заказ на VIP курс'
       };

        $('#priceInput').val(title);
        $('[data-modal="price"]').addClass('active');
    });

});