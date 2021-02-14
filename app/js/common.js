$('.about-numbers__box-slider').slick({
    slidesToShow: 1,
    arrows: false,
    dots: true,
    // autoplay: true,
});

$('.product-slider-max').slick({
    slidesToShow: 1,
    asNavFor: '.product-slider-min',
    fade: true,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                infinite: true
            }
        }
    ]
});

$('.product-slider-min').slick({
    slidesToShow: 4,
    asNavFor: '.product-slider-max',
    focusOnSelect: true,
    arrows: false,
    variableWidth: true,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                infinite: true
            }
        }
    ]
});

// tabs
$('ul.tabs__caption').on('click', 'li:not(.active)', function () {
    $(this)
        .addClass('active').siblings().removeClass('active')
        .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
});

// animate scroll
$('.go_to').click(function () {
    let scroll_el = $(this).attr('href');
    if ($(scroll_el).length !== 0) {
        $('html, body').animate({
            scrollTop: $(scroll_el).offset().top
        }, 500);
    }
    return false;
});

$('.down').on("click", function () {
    let $input = $(this).parent().find('input');
    let count = parseInt($input.val()) - 1;
    count = count < 1 ? 1 : count;
    $input.val(count);
    $input.change();
    return false;
});
$('.up').on("click",function () {
    let $input = $(this).parent().find('input');
    $input.val(parseInt($input.val()) + 1);
    $input.change();
    return false;
});

// mask phone
$('[name="phone"]').mask('+7 999 999-99-99');


// модальные окна (несколько)
$(function () {
    let overlay = $('.overlay');
    let open_modal = $('.open_modal');
    let close = $('.modal__close, .overlay, .btn-modal-close');
    let modal = $('.modal__div');

    open_modal.on('click',function (event) {
        event.preventDefault();

        modal.css('display', 'none').animate({
            opacity: 0,
            top: '45%'
        }, 200);

        let div = $(this).attr('href');
        overlay.fadeIn(400,
            function () {
                $(div)
                    .css('display', 'flex')
                    .animate({
                        opacity: 1,
                        top: '50%'
                    }, 200);
            });
    });

    close.on('click', function (e) {
        e.preventDefault();
        modal
            .animate({
                    opacity: 0,
                    top: '45%'
                }, 200,
                function () {
                    $(this).css('display', 'none');
                    overlay.fadeOut(400);
                }
            );
    });
});

// mobile menu
$('.btn-burger').on('click', function () {
   $('.mobile-menu').fadeToggle();
});

$('.mobile-menu .btn-close').on('click', function () {
   $('.mobile-menu').fadeOut();
});

$(document).mouseup(function (e) { // событие клика по веб-документу
    let div = $(".mobile-menu"); // тут указываем ID элемента
    let btn = $('.btn-close');
    if (!div.is(e.target) && !btn.is(e.target) && div.has(e.target).length === 0) { // и не по его дочерним элементам
        div.fadeOut(); // скрываем его
        btn.removeClass('active');
    }
});

// клик вне модального окна
$(document).on('click', function (e) {
    let div = $(".modal__body");
    let btn = $('.open_modal');
    if (!div.is(e.target) && !btn.is(e.target) && btn.has(e.target).length === 0 && div.has(e.target).length === 0) { // и не по его дочерним элементам
        $('.modal__div').animate({
                opacity: 0,
                top: '45%'
            }, 200,
            function () {
                $(this).css('display', 'none');
                $('.overlay').fadeOut(400);
            }
        );
    }
});

// активная ссылка меню
$('.cabinet-menu li a').each(function () {
    let location = window.location.href;
    let link = this.href;
    if (location === link) {
        $(this).addClass('active');
    }
});
// end

// accordeon
function accordeon() {
    var panel = $('.panel_heading');

    if (panel.hasClass('in')) {
        $('.in').find('.block_hover').slideDown();
    }

    $('.panel_heading .block_title').on('click', function () {
        $(this).parent().toggleClass('in').find('.block_hover').slideToggle();
    });
}

accordeon();