/**
*** Controller
*   
*** @ 2017, Muzaffer Dede
*   
*** Lexionlu Design Firm
*   
*** Function Controller 
*/

$(function () {
    /*Set Browser*/
    setBrowser();

    /*Focus On landing*/
    focusOn();

    /*Set Menu Structure if there is List item with Dropdown*/
    mainMenu($('.main-menu'));

    /*Hamburger menu trigger*/
    $('.menu-trigger').click(function (e) {
        e.preventDefault();
        tCls([this, $('.main-menu')], 'active');
    });

    /*Show Costumer Service Dropdown*/
    $('.costumer-service button').click(function (e) {
        e.preventDefault();
        tCls([this, $('.costumer-service')], 'active');
    });

    /*Handle clicking outside of menu container*/
    $('.page').click(function (e) {
        if ($('.main-menu').is('.active')) {
            $('.menu-trigger').trigger('click');
        }
        if ($('.header .top').is('.active')) {
            $('.header >.top > button.close-top').trigger('click');
        }
        if ($('.costumer-service').is('.active')) {
            $('.costumer-service > button').trigger('click');
            $('.costumer-service').removeClass('active');
        }
    });

    /*Input label placeholder swtich*/
    $('input[type="text"],input[type="password"],textarea', $('.input')).each(function () {
        inpLabel($(this));
    });

    /*Input Tooltips*/
    $('[data-toggle="tooltip"]').tooltip();

    /*Footer Accordion menu*/
    $('.footer .mid .row .item h2').click(function (e) {
	e.preventDefault();
        tCls([this, $(this).parents('.item')], 'active');
    });

    /*Category layer dropdown switch*/
    $(".layer-tabs").each(function () {
        var $this = $(this);
        coverIt($this);
    });

    /*Slideable*/
    $(".slide-navigation").each(function () {
        slideable($(this), $('.-navigation-container', $(this)));
    });

    /*Tab Panels*/
    $(".tab-panels").each(function () {
        var $this = $(this);
        accordionIt($this);
    });

    /*Handle Scroll Events*/
    scrollEvents();

    /*Load images for key image*/
    lazyload();

    /*Window Resize Events*/
    var resizer;
    $(window).resize(function () {
        clearTimeout(resizer);
        resizer = setTimeout(function () {
            lazyload();
        }, 500);
    });


    /* Fancyblock */
    $('.-fancy-block').each(function () {
        setFancyBox($(this));
    });
});



var browserVersion = '';
var webContextPath = window.location.pathname.substring(0, window.location.pathname.indexOf("/", 2));

function getWebContextPath() {
    console.log(webContextPath);
    if (webContextPath == null || webContextPath == '' || webContextPath == '/') {
        //webContextPath = window.location.href.replace("rateList", "");
    }
    if (webContextPath.lastIndexOf("/") === (webContextPath.length - 1)) {
        console.log(webContextPath);
        //webContextPath = webContextPath.substring(0, webContextPath.lastIndexOf("/"));
    }
    console.log(webContextPath);
    return webContextPath;
}
function get_browser_info() {
    var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return {
            name: 'IE',
            version: (tem[1] || '')
        };
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\bOPR\/(\d+)/);
        if (tem != null) {
            return {
                name: 'Opera',
                version: tem[1]
            };
        }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) {
        M.splice(1, 1, tem[1]);
    }
    return {
        name: M[0],
        version: M[1]
    };
}
/* 偵測使用平台 */
function detectUserAgent() {

    var obj = new Object();
    var strUserAgent = window.navigator.userAgent;
    try {

        if (browserVersion == '') {
            browserVersion = get_browser_info().version;
        }
        obj.browserVersion = browserVersion;
    } catch (err) {

    }
    // browser Version

    // OS 
    if (strUserAgent.match(/iPad/i)) {
        obj.OSName = "iPad";
    } else if (strUserAgent.match(/iPhone/i)) {
        obj.OSName = "iPhone";
    } else if (strUserAgent.match(/Android/i)) {
        obj.OSName = "Android";
    } else if (strUserAgent.match(/BlackBerry/i)) {
        obj.OSName = "BlackBerry";
    } else if (strUserAgent.match(/Macintosh/i)) {
        obj.OSName = "Macintosh";
    } else if (strUserAgent.match(/IEMobile/i)) {
        obj.OSName = "WindowsPhone";
    } else if (strUserAgent.match(/Opera Mini/i)) {
        obj.OSName = "Opera";
    } else if (strUserAgent.match(/Windows NT/i)) {
        obj.OSName = "Windows";
    } else {
        obj.OSName = navigator.userAgent;
    }
    // broswer name
    if (strUserAgent.match(/Opera/i)) {
        obj.browserName = "Opera";
    } else if (strUserAgent.match(/MSIE/i)) {
        obj.browserName = "Microsoft Internet Explorer";
    } else if (strUserAgent.match(/Trident/i)) {
        obj.browserName = "Microsoft Internet Explorer";
    } else if (strUserAgent.match(/Chrome/i)) {
        obj.browserName = "Chrome";
    } else if (strUserAgent.match(/Safari/i)) {
        obj.browserName = "Safari";
    } else if (strUserAgent.match(/AppleWebkit/i)) {
        obj.browserName = "Safari";
    } else if (strUserAgent.match(/Firefox/i)) {
        obj.browserName = "Firefox";
    } else {
        obj.browserName = "";
    }

    return obj;
}