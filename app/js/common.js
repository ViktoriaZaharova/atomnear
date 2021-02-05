$('.about-numbers__box-slider').slick({
    slidesToShow: 1,
    arrows: false,
    dots: true,
    autoplay: true,
    fade: true
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