    var goods = 0;

$('.addToBasket').click(function () {
    $('#alertForBasket').fadeIn(function () {
        setTimeout(function () {
            $('#alertForBasket').fadeOut();
        }, 6000);
    });
    
    goods++;
    $('.goods_indicator').html(goods);

    var pn = $(this).closest('.theEnd').find(".productName");
    var firstProductName = pn.find("p").html();
    var secondProductName = pn.find("span").html();
    var productName = firstProductName + ': ' + secondProductName;

    var productPrice = $(this).closest('.theEnd').find('.productPrice').html();

    /*
    var select = document.createElement('input');
    select.type = 'number';
    select.min = 1;
    select.step = 1;
    select.pattern = '[0-9]*';
    select.classList = 'productCount';
    select.value = 1;
    */
    //var tr = document.createElement('tr');

    if ($(this).attr("id") === 'modalButton') {
        var sr = $(this).closest(".theEnd").find("img").attr('src');
    } else {
        var sr = $(this).closest('.theEnd').find('.img').css('background-image').replace('url("', '').replace('")', '');
    }

    /*
    var tdForImg = document.createElement('td');
    tdForImg.classList = 'tdForImg';
    var img = document.createElement('img');
    tdForImg.appendChild(img);
    $(tdForImg).find('img').attr('src', sr);
    var thForName = document.createElement('td');
    var strong = document.createElement('strong');
    strong.append(firstProductName);
    thForName.classList = 'productNameRequest';
    thForName.append(strong);
    thForName.append(secondProductName);
    tdForImg.appendChild(thForName);

    var thForPrice = document.createElement('td');
    thForPrice.classList = 'productPrice';
    thForPrice.append(productPrice);

    var thForSelect = document.createElement('td');
    thForSelect.classList = 'productCountRequest';
    thForSelect.append(select);

    var thForFinishPrice = document.createElement('td');
    thForFinishPrice.classList = 'allProducts';
    thForFinishPrice.append(productPrice);

    var tdDeleteButton = document.createElement('td');
    var deleteButton = document.createElement('a');
    deleteButton.innerHTML = 'x';
    deleteButton.href = '#';
    deleteButton.id = 'deleteProduct';
    tdDeleteButton.appendChild(deleteButton);

    tr.appendChild(tdForImg);
    tr.appendChild(thForPrice);
    tr.appendChild(thForSelect);
    tr.appendChild(thForFinishPrice);
    tr.appendChild(tdDeleteButton);

    $('#tbody').append(tr);
    */

    var productPrice = $(this).closest('.theEnd').find('.productPrice').html();
    $('#tbody').append('<div class="col-md-4"><img src="'+sr+'"/><p class="prod-name">'+productName+'</p><p class="prod-price">'+productPrice+'&nbsp;<input type="number" min="1" step="1" pattern="[0-9]*" class="productCountRequest" value="1"/></p></div>');
    finishPrice();
    
    var $a = $('a[href="#cart-modal"]').eq(0);
    //$(window).scrollTop($a.offset().top);
    $(window).scrollTop(0);
    $a.trigger('click');

});

$('body').on('input', '.productCount', function () {
    var productPrice = $(this).closest('tr').find('.productPrice').html();
    var productPriceInNumber = productPrice.replace('р.', '');
    var allProductsPrice = this.value * productPriceInNumber;
    var allProducts = $(this).closest('tr').find('.allProducts');
    allProducts.html(allProductsPrice + 'р.');

    finishPrice();
});

$('body').on('click', '#deleteProduct', function () {
    $(this).closest('tr').remove();
    goods--;
    finishPrice();
    $('.goods_indicator').html(goods);
});

$('.buttonOpenBasket').click(function () {
    $('#form1').hide();
    var trHave = $('#tbody').children().length;
    if (trHave < 1) {
        $('.empty').show();
        $('#haveProducts').hide();
    } else {
        $('.empty').hide();
        $('#haveProducts').show();
    }
});

function finishPrice() {
    var prices = $('.allProducts');
    var finishPrice = 0;
    for (var i = 0; i < prices.length; i++) {
        finishPrice += +$(prices[i]).html().replace('р.', '');
    }
    $('#finishPrice').html(finishPrice + 'р.');
}

$(document).ready(function () {
    var discountMinus = setInterval(function () {
        var discount = +$('.discountMinus').html().replace('р.', '');
        if (discount === 0) {
            clearInterval(discountMinus);
        } else {
            discount -= 20;
            $('.discountMinus').html(discount + 'р.');
        }
    }, 3000);
    
    function validateForm(){
        var elementPhone = $('#exampleInputPassword1');
        var phone = $.trim(elementPhone.val());
        if(phone == ''){
            swal('Неправильно заполнены поля:', 'Поле «Телефон» обязательно для заполнения.', 'error');
            return false;
        }
        return true;
    }

    //E-mail Ajax Send
    $("form").submit(function () { //Change
        var isValidForm = validateForm();
        if(!isValidForm){
            return false;
        }
        var th = $(this);
        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function () {
            $('#trigger_id').hide();
            $('.alert-info').fadeIn(function () {
                setTimeout(function () {
                    $('.alert-info').fadeOut();
                    $('#lean_overlay').hide();
                }, 1500)
            });
            setTimeout(function () {
                // Done Functions
                th.trigger("reset");
            }, 1000);
        });
        return false;
    });

    $('a[href^="#"]').click(function () {
        var elementClick = $(this).attr("href");
        var destination = $(elementClick).offset().top - 40;
        jQuery("html:not(:animated), body:not(:animated)").animate({scrollTop: destination}, 800);
        return false;
    });

    $('.t-list li div.hover_block').click(function (event) {
        event.preventDefault(); // Для того чтобы при нажатии на ссылку не кидало вверх
        $(this).find('p.hover_p').slideToggle().next().text($(this).find('.spoiler-but').text() === 'Описание аромата' ? 'Свернуть' : 'Описание аромата');
    });

    $('.reviews').slick({
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500
    });

    $('a.t-modal').click(function () {
        var title = $(this).attr("title");
        var img = $(this).parent().find("img").attr("src");
        $(".popup").fadeIn(500);
        $("body").append("<div id='overlay'></div>");
        $('#overlay').show().css('opacity', '0.8');
        $('.img-cont').prepend("<img src='" + img + "'>");
        $('.popup-title').html(title);
        $(".popup input[type='hidden']").val(title);
        $('a.close, #overlay').click(function () {
            $('.popup').fadeOut(100);
            $('.popup-left img').remove();
            $('#overlay').remove();
            return false;
        });
        $('.popup').click(function (e) {
            e.stopPropagation();
        });
        return false;
    });

    var itembox = $(".review_radio");
    itembox.click(function () {
        var _this = $(this);
        _this.addClass("active").siblings(itembox).removeClass("active").find("input[type='radio']").removeAttr("checked");

        if (_this.hasClass('active')) {
            _this.find("input[type='radio']").attr("checked", "checked");
        }
    });


    var itembox = $(".review_radio");
    itembox.click(function () {
        itembox.hide();
        $(".review_result").fadeIn();

        $(".green_result").addClass("green_view");
        $(".red_result").addClass("red_view");
        $(".blue_result").addClass("blue_view");
    });


    // Стилизация input[type=file]
    $('.min_input .button').click(function () {
        $(this).siblings('input[type=file]').click();
        return false;
    });
});

$('.backing').click(function () {
    $('#cart-modal').hide();
    $('#lean_overlay').hide();
    $('#priceInput').val($("#finishPrice").html());

    var products = '';
    for (var i = 0; i < $('.productNameRequest').length; i++) {
        var productCount = $($('.productNameRequest')[i]).closest('tr').find('.productCountRequest>input').val();
        products += $($('.productNameRequest')[i]).html() + '(' + productCount + ')' + '; ';
    }

    $('#productsInput').val(products);
    $('#priceInput').val($('#finishPrice').html());
});