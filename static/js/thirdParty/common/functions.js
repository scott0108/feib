/**
*** Functions
*   
*** @ 2017, Muzaffer Dede
*   
*** Lexionlu Design Firm
*   
*** Executable Functions 
*/


/** # Main Menu **/
function tCls(arr, cls) {
    $(arr).each(function () {
        $(this).toggleClass(cls);
    });
}

/*Inputs label*/
function inpLabel($this) {
    $this.focus(function () {
        $this.parent('.input').addClass('active');
    });

    $this.on('blur', function () {
        if ($this.val().length == 0) {
            $this.parent('.input').removeClass('active');
        }
    });
    if ($this.val() != "") $this.parent('.input').addClass('active');
}

/*Link Wrap*/
function coverIt(a) {
    // make it scrollable if more then 4 child
    if (a.children().size() > 4) {
        a.addClass('-scrollable');
    }

    //wrapp all in link wrapper
    var wrapper = $("<div class='link-wrapper' />");
    $("a", a).wrapAll(wrapper);


    //slide scroll
    if (a.is(".-scrollable")) {
        slideable(a, $('.link-wrapper', a));
    }

    //append mobile dropdown button to toggle links
    var current = $('a.active', a).clone();

    a.prepend("<button class='link-wrap-trigger'>" + current.html());
    $(".link-wrap-trigger", a).click(function (e) {
        e.preventDefault();
        $('.link-wrapper', a).toggleClass("open");
        $(this).toggleClass("triggered")
    });
}
/*Slide scroll*/
function slideable(element, target) {
    //prepare variables
    var active = $(".active", element);
    var offset = active.outerWidth(true);

    //if scrollable append next previuous links
    element.prepend('<a data-operation="-=" href="#" class="-scroll-control -prev">Prev</a>');
    element.append('<a data-operation="+=" href="#" class="-scroll-control -next">Next</a>');

    //scroll to active link
    var to = offset * active.index();
    doIt(to);

    //bind click event for next and previous controls
    $('.-scroll-control', element).on('click', function (e) {
        e.preventDefault();
        var value = $(this).data("operation") + offset;
        doIt(value);
    });

    //Do  scroll
    function doIt(val) {
        target.stop().animate({ scrollLeft: val });
    }
}
/*#Slide Scroll*/

/*Accordin Wrap*/
function accordionIt(a) {
    var current = $(".active", a).html();
    if (!$(a).is('.-single')) {
        a.prepend("<button class='accordion-wrap-trigger'>" + current);
    }
    $(".accordion-wrap-trigger", a).click(function (e) {
        e.preventDefault();
        $('.tabs', a).toggleClass("open");
        $(this).toggleClass("triggered")
    });

    /*Tab Callback*/
    $('a[data-toggle="tab"]', a).on('shown.bs.tab', function (e) {
        $('.tabs', a).toggleClass("open");
        $(this).toggleClass("triggered");
        $('.accordion-wrap-trigger').html($(this).html());
    });
}

/*Menu*/
function mainMenu(nav) {
    $('li', nav).each(function () {
        var $this = $(this);
        if ($('>div', $this).length > 0) {
            $this.addClass("hasUl");
            $('> a', $this).append("<button></button>");
        }
    });

    $("a button", nav).click(function (e) {
        e.preventDefault();
        var parent = $(this).parent().parent();
        var parentPar = parent.parent();
        if (parent.is(".open")) {
            parent.removeClass("open");
            return;
        }
        if (parent.is(".hasUl")) {
            $('.open', parentPar).removeClass("open");
            parent.addClass("open");
        }
    });
}

function scrollEvents() {
    var timer;
    var duration = 200;
    var elements = [$('.back-to.-top'), $('.show-scroll')];

    function fi(a) {
        $(a).each(function () {
            $(this).stop(true, true).fadeIn(duration);
        });
    }

    function fo(a) {
        $(a).each(function () {
            $(this).stop(true, true).fadeOut(duration);
        });
    }

    /*When Windows scrolls trigger*/
    $(window).scroll(function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
            var offset = $(window).scrollTop();
            if (offset > 500) {
                fi(elements);
                fo($('.back-to.-down'));
            } else {
                fo(elements);
                fi($('.back-to.-down'));
            }
        }, 100);
    });

    /*Binding Scroll To Top*/
    elements[0].click(function (e) {
        e.preventDefault();
        $('html,body').animate({ scrollTop: 0 });
    });

    $('.table-chart').each(function () {
        var timer;
        var $this = $(this);
        var par = $this.parent();
        var w = $this.width();
        var sw = $this[0].scrollWidth;
        $this.scroll(function () {
            var sl = $this.scrollLeft();
            clearTimeout(timer);
            setTimeout(function () {
                if (sl > w) {
                    par.addClass("left-reach");
                } else {
                    par.removeClass("left-reach");

                }

                if (sl > (sw - (w + 100))) {
                    par.addClass("right-reach");
                } else {
                    par.removeClass("right-reach");
                }

            }, 500);
        });
    });
}

function focusOn() {
    function param(name) {
        return (location.search.split(name + '=')[1] || '').split('&')[0];
    }
    var focus = param("focusid");
    var target = param("targetid")
    var slide = param("slideid");
    if (focus != "") {
        var headerHeight = $('.header').outerHeight(true);
        $('html, body').animate({
            scrollTop: $('#' + focus).offset().top - headerHeight
        }, 1000, function () {
            if (target != "") {
                $('a[data-toggle="tab"]').bind('click', function () {
                    var op = $(this).offset().left - 48;
                    $('.-navigation-container', $('#' + focus)).scrollLeft(op);
                });
                $('a[href="#' + target + '"]').trigger("click");
            }
            if (slide != "") {
                $('[data-slide-to="' + slide + '"]').trigger("click");
            }
        });
    }
}

function lazyload() {
    $(".key-image img").each(function () {
        var source = $(this).attr("data-src");
        if (typeof source != "undefined") {
            var format = source.slice(-4);
            var filesrc = source.substring(0, source.length - 4);

            if ($(window).width() > 760) {
                $(this).attr('src', filesrc + format);
            } else {
                $(this).attr('src', filesrc + "_mobile" + format);
            }
        }

    });
}

/*Set Browser version*/
function setBrowser() {
    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);
}

/*Set Fancyblock*/
function setFancyBox(a) {
    var data = a.data('fancy');

    var bg = "url(/static/css/common/img/banners/fancy" + data + ".jpg)";
    var imageBox = $('<div/>');
    a.addClass(data);
    imageBox.addClass("before " + data).css('background-image', bg);
    a.prepend(imageBox);
}

/* 偵測是否版本小於IE9 */
function PCIEVerLessThan9() {

    // if(isPCDevice()){

    var ver = detectUserAgent();
    // alert(ver);
    if (ver != null && ver != '') {
        if (ver.browserName === 'Microsoft Internet Explorer' && ver.browserVersion < 11.0)
            return true;
        else if (ver.browserName === 'Chrome' && ver.browserVersion < 49)
            return true;
        else if (ver.browserName === 'Firefox' && ver.browserVersion < 40)
            return true;
        else
            return false;
    }

    // }
    return false;
}

function getInternetExplorerVersion()
    // Returns the version of Internet Explorer or a -1
    // (indicating the use of another browser).
{
    var rv = -1; // Return value assumes failure.
    if (navigator.appName == 'Microsoft Internet Explorer') {
        var ua = navigator.userAgent;
        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat(RegExp.$1);
    }
    return rv;
}