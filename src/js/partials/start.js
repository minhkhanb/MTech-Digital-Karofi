var MT = window.MT || {};
MT.utils = {
    slideVideo: $('.slide-video'),
    nav: $('.nav-menu'),
    verNav: $('.verNav'),
    term: $('.termLink'),
    nextStep: function (currentState, nextState, isActiveStep, callback) {
        if (!isActiveStep) {
            currentState.addClass('imVisible');
            nextState.removeClass('imVisible');
        }
        else {
            nextState.removeClass('imVisible');
            nextState.siblings('section').addClass('imVisible');
            if (typeof callback === 'function') {
                callback();
            }
        }
    },
    hrefExecu: function (href) {
        var str = href.split('#');
        return str[1];
    }
};
MT.isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (MT.isMobile.Android() || MT.isMobile.BlackBerry() || MT.isMobile.iOS() || MT.isMobile.Opera() || MT.isMobile.Windows());
    }
}
MT.initSlider = function () {
    $('.slick-container').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        infinite: false,
        dots: false,
        draggable: false
    });
}
MT.routePage = function () {
    var item = MT.utils.slideVideo.find('.item');
    item.on('click', 'a', function (evt) {
        evt.preventDefault();
        var curState = $('section.home'),
            nextState = $('section.guard');
        MT.utils.nextStep(curState, nextState);
    });

    var navItem = MT.utils.nav.find('li');
    navItem.on('click', 'a', function (evt) {
        evt.preventDefault();
        var el = $(this),
            step = el.attr('href'),
            direct = $('section.' + MT.utils.hrefExecu(step)),
            setActiveNav = function () {
                el.closest('li').siblings().find('a').removeClass('active');
                el.addClass('active');
                MT.utils.nav.find('a').removeClass('active');
                MT.utils.nav.find('a[href*=' + step + ']').addClass('active');
                MT.utils.verNav.find('a').removeClass('active');
                MT.utils.verNav.find('a[href*=' + step + ']').addClass('active');
            };


        MT.utils.nextStep(null, direct, true, setActiveNav);

    });

    var term = MT.utils.term;
    term.on('click', function (evt) {
        evt.preventDefault();
        var el = $(this),
            secTerm = el.attr('href');
        secTerm = $('section.' + MT.utils.hrefExecu(secTerm));
        MT.utils.nextStep(null, secTerm, true, function () {
            MT.utils.nav.find('a').removeClass('active');
            MT.utils.verNav.find('a').removeClass('active');
        });
    });
}
MT.init = function () {
    MT.initSlider();
    MT.routePage();
}

$(document).ready(MT.init);



