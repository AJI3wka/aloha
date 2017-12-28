$(document).ready(function(){

    var page = document.title;
    var url = location.href;
    if (location.pathname == '/'){
        page = 'Главная';
    }
    console.log(page);
    $('input[name="page"]').val(page);
    $('input[name="url"]').val(url);

    $('#slider_container').owlCarousel({
    items: 3,
    loop: true,
    nav: true,
    dots: false,
    navText: ["",""],
     responsive:{
                320:{
                    items:1
                },
                768:{
                    items:2
                },
                1201:{
                    items:3
                }
            }

	});
    $(".more").on("click", function(e){
        e.preventDefault();
        $(this).parent().find(".listhidden").slideToggle();
    });

    var $hamburger = $(".hamburger");
        $hamburger.on("click", function(e) {
        $hamburger.toggleClass("is-active");
        $(".first-menu").slideToggle();
  });

     

       

    function show_menu(mql) {
        if (mql.matches) {

            $(".first-menu .open").on("click", function(e){
            e.preventDefault();   
            $(this).parent().find("ul:first").slideToggle();
            });   
        } 
        
    }
     


    var mql = window.matchMedia('all and (max-width: 1330px)');  
    show_menu(mql);



     

});
