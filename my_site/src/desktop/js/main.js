$(document).ready(function() {

    $('.menu-item').click(function(e) {
        e.preventDefault();

        var target = $(this).attr('data-href');
                    //#sec2
                    //#sec5
                    //#sec6

        if ($(target).length>0) {

            $("html, body").animate({
                scrollTop: $(target).offset().top
            }, 500);

        }


    });









});