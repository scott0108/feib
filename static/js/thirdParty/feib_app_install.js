(function ($, window, document, navigator) {
    var AppProclamation = {};
    var PlaceHolder = {};
    var redirected = false;

    function set_install_view(id, title, url, android_url, ios_url) {
        var style = '<style>'
            + '.ios_mobilearea { display: block;width: 100%;background: #ffe1e1;padding: 10px 7px;position: fixed;top: 0;left: 0;right: 0;z-index: 101;}'
            + '.ios_mobileimage { width: 50px;display: inline-block;vertical-align: top;}'
            + '.ios_mobile_close { color: #fff;vertical-align: top;}'
            + '.ios_mobile_close i { vertical-align: top;}'
            + '.ios_mobile_text { display: inline-block;color: #222;padding-left: 5px;}'
            + '.ios_mobile_text h4 { font-weight: bold;font-size: 16px;}'
            + '.ios_mobile_text p { font-weight: bold;font-size: 12px;}'
            + '.ios_mobile_btn { display: inline-block;background: #e60000;color: #fff;padding: 5px 5px;border: solid 1px #fff;box-shadow: 0 0 0px 1px #e60000;float: right;margin-top: 9px;}'
            + '</style>';

        $('head').append(style);
        AppProclamation = $(`<div class="ios_mobilearea">
                                <a style="cursor: pointer;" onclick="quit_install();" class="ios_mobile_close">
                                    <i class="fa fa-times-circle" aria-hidden="true"></i>
                                </a>
                                <img style="cursor: pointer;" onclick="install_app('${ (isIOS() ? ios_url : android_url)}')" class="ios_mobileimage" src="https://lh3.googleusercontent.com/VxsL7F71zwDzKcB2pE6UFqnoEJytOQHZGg2eR-_MS87nIz3hRdaJD49kYNF09lqz0QE=w300-rw"/>
                                <div class="ios_mobile_text">
                                    ${ title}
                                </div>
                                <a href="${ url}" class="ios_mobile_btn">立即下載</a>
                            </div>`);

        $('body').prepend(AppProclamation);
        PlaceHolder = $("<div/>").height(AppProclamation.innerHeight());
        $('body').prepend(PlaceHolder);
    }

    function install_app(_url) {
        if (isMobile()) {
            window.open(_url);
        }
    }

    function isMobile() {
        return /Android|Windows Phone|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    function isIOS() {
        return /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);
    }

    function detectApp() {
        var appurl = isIOS() ? "feibmbank://" : "'intent://feib/#Intent;scheme=bank;package=com.feib.appbank;end";

        try {
            if (navigator.userAgent.match(/Windows Phone/i)) {
                // Windows Phone
            } else if (navigator.userAgent.match(/Android/i)) {
                if (navigator.userAgent.match(/Chrome/i)) {
                    // Android + Chrome
                    window.location = appurl;
                    setTimeout(function () {
                        if (!document.webkitHidden && !redirected) {
                            redirected = true;
                            call_set_install_view();
                        }
                    }, 1000);
                } else {
                    // Android + 非 Chrome
                    var iframe = document.createElement("iframe");
                    iframe.style.border = "none";
                    iframe.style.width = "1px";
                    iframe.style.height = "1px";
                    t = setTimeout(function () {
                        call_set_install_view();
                    }, 1000);
                    iframe.onload = function () {
                        clearTimeout(t);
                    };
                    iframe.src = appurl;
                    document.body.appendChild(iframe);
                }
            } else if (navigator.userAgent.match(/(iPhone|iPad|iPod)/i)) {
                // iOS
                setTimeout(function() {
                    if (!document.webkitHidden) {
                        call_set_install_view();
                    }
                  }, 25);
                  window.location = appurl;
            } else {
                // 其他
            }
        } catch (e) {
            call_set_install_view();
        }
    }

    function call_set_install_view() {
        set_install_view(
            'appnotice',
            '<h4>行動銀行APP</h4><p>1鍵速查、1秒登入、1掃快轉</p>',
            'https://goo.gl/weHTj7',
            'https://play.google.com/store/apps/details?id=com.feib.appbank',
            'https://itunes.apple.com/tw/app/id1304264514');
    }

    function quit_install() {
        var expires = new Date();
        expires.setMonth(expires.getMonth() + 1);

        document.cookie = "quit_install=1; expires=" + expires.toGMTString();
        AppProclamation.remove();
        PlaceHolder.remove();
    }

    function getCookie(c_name) {
        if (document.cookie.length > 0) {
            var c_start = document.cookie.indexOf(c_name + "=")
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1
                var c_end = document.cookie.indexOf(";", c_start)
                if (c_end == -1)
                    c_end = document.cookie.length
                return unescape(document.cookie.substring(c_start, c_end))
            }
        }
        return ""
    }

    $(function () {
        if (isMobile() && !getCookie('quit_install')) {
            detectApp();
        }
    });
})(jQuery, window, document, navigator);