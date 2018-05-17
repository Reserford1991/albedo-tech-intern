$(function () {
    $("#birthdate").datepicker({
        dateFormat: 'dd-mm-yy',
        changeMonth: true,
        changeYear: true,
        maxDate: new Date,
        minDate: new Date(1900, 1, 1),
    });
});

function openSocialLink(event, url, pagename) {
    event.preventDefault();
    window.open(url, pagename, 'resizable,height=500,width=600');
}

window.onload = function () {

    if (window.location.href.indexOf("?controller=pages&action=table") == -1) {
        if (localStorage) {
            document.getElementById("name").value = localStorage.getItem('name');
            document.getElementById("surname").value = localStorage.getItem('surname');
            document.getElementById("birthdate").value = localStorage.getItem('birtdate');
            document.getElementById("report").value = localStorage.getItem('report');
            document.getElementById("selectCountry").value = localStorage.getItem('country');
            document.getElementById("phone").value = localStorage.getItem('phone');
            document.getElementById("mail").value = localStorage.getItem('mail');
            document.getElementById("company").value = localStorage.getItem('company');
            document.getElementById("position").value = localStorage.getItem('position');
            document.getElementById("about").value = localStorage.getItem('about');
            document.getElementById("photo").value = localStorage.getItem('photo');

            if (localStorage.getItem('step') == 2) {
                $("#partTwo").show();
                $("#prevDiv").show();
                $("#next").data("step", "2");
                $("#partOne").hide();
            }
            if (localStorage.getItem('step') == 3) {
                $("#partOne").hide();
                $("#partTwo").hide();
                $("#formOneHead").hide();
                $("#next").data("step", "3");
                $(".buttons").hide();
                $("#shareDiv").show();
            }
        } else {

            document.getElementById("name").value = localStorage.getItem('name');
            document.getElementById("surname").value = localStorage.getItem('surname');
            document.getElementById("birthdate").value = localStorage.getItem('birtdate');
            document.getElementById("report").value = localStorage.getItem('report');
            document.getElementById("country").value = localStorage.getItem('country');
            document.getElementById("phone").value = localStorage.getItem('phone');
            document.getElementById("mail").value = localStorage.getItem('mail');
            document.getElementById("company").value = localStorage.getItem('company');
            document.getElementById("position").value = localStorage.getItem('position');
            document.getElementById("about").value = localStorage.getItem('about');
            document.getElementById("photo").value = localStorage.getItem('photo');

            $("#partTwo").hide();
            $("#prevDiv").css('display', 'none');
            $("#next").data("step", "1");
            $("#partOne").show();
        }
    } else {
        if (localStorage) {
            localStorage.setItem('update', 0);
        } else {
            sessionStorage.setItem('update', 1);
        }
    }
}

$(window).bind('beforeunload', function () {
    if (window.location.href.indexOf("?controller=pages&action=table") == -1) {
        if (localStorage) {
            localStorage.setItem('name', document.getElementById("name").value);
            localStorage.setItem('surname', document.getElementById("surname").value);
            localStorage.setItem('birtdate', document.getElementById("birthdate").value);
            localStorage.setItem('report', document.getElementById("report").value);
            localStorage.setItem('country', document.getElementById("selectCountry").value);
            localStorage.setItem('phone', document.getElementById("phone").value);
            localStorage.setItem('mail', document.getElementById("mail").value);
            localStorage.setItem('company', document.getElementById("company").value);
            localStorage.setItem('position', document.getElementById("position").value);
            localStorage.setItem('about', document.getElementById("about").value);
            localStorage.setItem('step', $("#next").data("step"));

        } else {
            sessionStorage.setItem('name', document.getElementById("name").value);
            sessionStorage.setItem('surname', document.getElementById("surname").value);
            sessionStorage.setItem('birtdate', document.getElementById("birthdate").value);
            sessionStorage.setItem('report', document.getElementById("report").value);
            sessionStorage.setItem('country', document.getElementById("country").value);
            sessionStorage.setItem('phone', document.getElementById("phone").value);
            sessionStorage.setItem('mail', document.getElementById("mail").value);
            sessionStorage.setItem('company', document.getElementById("company").value);
            sessionStorage.setItem('position', document.getElementById("position").value);
            sessionStorage.setItem('about', document.getElementById("about").value);
            localStorage.setItem('step', $("#next").data("step"));
        }
        $('#phone').trigger(jQuery.Event('keypress', {keycode: 32}));
    }
});


function sendInfo(event) {
    var x = document.getElementById("snackbar");
    event.preventDefault();

    //todo: replace split and join with relplace method
    var info = {
        name: $("#name").val(),
        surname: $("#surname").val(),
        birthdate: $("#birthdate").val(),
        report: $("#report").val(),
        country: $("#selectCountry").val(),
        phone: $("#phone").val().split(" ").join("").split("+").join("").split("(").join("").split(")").join("").split("-").join(""),
        mail: $("#mail").val(),
        company: $("#company").val(),
        position: $("#position").val(),
        about: $("#about").val(),
        photo: $("#photo").val(),
        created_at: Math.floor(Date.now() / 1000)
    };

    var errors = "";
    Object.keys(info).forEach(function (key) {
        // console.log(key, typeof info[key] , info[key]);
        var type = typeof info[key];
        var element = info[key];
        // console.log(type);
        if (type == 'string' || type == 'number' || type == 'object') {
            return;
        }
        errors += key + " has wrong format<br>";
    });

    var errorFlag = false;

    if (info.name == "" && info.surname == "" && info.birthdate == "" && info.report == ""
        && info.country == "" && info.phone == "" && info.mail == "") {
        x.className = "show";
        x.innerHTML = "Please fill all the required fields";
        $("#nameGroup").addClass("has-error");
        $("#surnameGroup").addClass("has-error");
        $("#birthdateGroup").addClass("has-error");
        $("#reportGroup").addClass("has-error");
        $("#countryGroup").addClass("has-error");
        $("#phoneGroup").addClass("has-error");
        $("#mailGroup").addClass("has-error");
        setTimeout(function () {
            x.className = x.className.replace("show", "");
            $("#nameGroup").removeClass("has-error");
            $("#surnameGroup").removeClass("has-error");
            $("#birthdateGroup").removeClass("has-error");
            $("#reportGroup").removeClass("has-error");
            $("#countryGroup").removeClass("has-error");
            $("#phoneGroup").removeClass("has-error");
            $("#mailGroup").removeClass("has-error");
        }, 3000);
        return;
    }

    if (info.name == "") {
        $("#nameGroup").addClass("has-error");
        $("#nameErrorSpan").html("Name is a required field");
        $("#nameErrorSpanDiv").show();

        setTimeout(function () {
            $("#nameGroup").removeClass("has-error");
            $("#nameErrorSpanDiv").hide();
        }, 3000);
        errorFlag = true;
    }

    if (info.name != "" && $("#next").data("step") == 1) {
        regexp = "^[\\D\\d\\s]{1,255}$";
        if (info.name.match(regexp) == null) {
            $("#nameGroup").addClass("has-error");
            $("#nameErrorSpan").html("Name cannot exceed 255 characters");
            $("#nameErrorSpanDiv").show();

            setTimeout(function () {
                $("#nameGroup").removeClass("has-error");
                $("#nameErrorSpanDiv").hide();
            }, 3000);
            errorFlag = true;
        }
    }

    if (info.surname == "") {
        $("#surnameGroup").addClass("has-error");
        $("#surnameErrorSpan").html("Surname is a required field");
        $("#surnameErrorSpanDiv").show();

        setTimeout(function () {
            $("#surnameGroup").removeClass("has-error");
            $("#surnameErrorSpanDiv").hide();
        }, 3000);
        errorFlag = true;
    }

    if (info.surname != "" && $("#next").data("step") == 1) {
        regexp = "^[\\D\\d\\s]{1,255}$";
        if (info.surname.match(regexp) == null) {
            $("#surnameGroup").addClass("has-error");
            $("#surnameErrorSpan").html("Surname cannot exceed 255 characters");
            $("#surnameErrorSpanDiv").show();

            setTimeout(function () {
                $("#surnameGroup").removeClass("has-error");
                $("#surnameErrorSpanDiv").hide();
            }, 3000);
            errorFlag = true;
        }
    }

    if (info.birthdate == "") {
        $("#birthdateGroup").addClass("has-error");
        $("#birthdateErrorSpan").html("Birthdate is a required field");
        $("#birthdateErrorSpanDiv").show();

        setTimeout(function () {
            $("#birthdateGroup").removeClass("has-error");
            $("#birthdateErrorSpanDiv").hide();
        }, 3000);
        errorFlag = true;
    }

    if (info.birthdate != "" && $("#next").data("step") == 1) {
        regexp = "^[0-9]{2}-[0-9]{2}-[0-9]{4}$";
        if (info.birthdate.match(regexp) == null) {
            $("#birthdateGroup").addClass("has-error");
            $("#birthdateErrorSpan").html("Please put birthdate in the following format: dd-mm-yyyy");
            $("#birthdateErrorSpanDiv").show();

            setTimeout(function () {
                $("#birthdateGroup").removeClass("has-error");
                $("#birthdateErrorSpanDiv").hide();
            }, 3000);
            errorFlag = true;
        }
    }

    if (info.report == "") {
        $("#reportGroup").addClass("has-error");
        $("#reportErrorSpan").html("Report subject is a required field");
        $("#reportErrorSpanDiv").show();

        setTimeout(function () {
            $("#reportGroup").removeClass("has-error");
            $("#reportErrorSpanDiv").hide();
        }, 3000);
        errorFlag = true;
    }

    if (info.report != "" && $("#next").data("step") == 1) {
        regexp = "^[\\D\\d\\s]{1,255}$";
        if (info.report.match(regexp) == null) {
            $("#reportGroup").addClass("has-error");
            $("#reportErrorSpan").html("Report subject cannot exceed 255 characters");
            $("#reportErrorSpanDiv").show();

            setTimeout(function () {
                $("#reportGroup").removeClass("has-error");
                $("#reportErrorSpanDiv").hide();
            }, 3000);
            errorFlag = true;
        }
    }

    if (info.country == "" || info.country == null) {
        $("#countryGroup").addClass("has-error");
        $("#countryErrorSpan").html("Country is a required field");
        $("#countryErrorSpanDiv").show();

        setTimeout(function () {
            $("#countryGroup").removeClass("has-error");
            $("#countryErrorSpanDiv").hide();
        }, 3000);
        errorFlag = true;
    }
    if (info.phone == "") {
        $("#phoneGroup").addClass("has-error");
        $("#phoneErrorSpan").html("Phone is a required field");
        $("#phoneErrorSpanDiv").show();

        setTimeout(function () {
            $("#phoneGroup").removeClass("has-error");
            $("#phoneErrorSpanDiv").hide();
        }, 3000);
        errorFlag = true;
    }

    if (info.phone != "" && $("#next").data("step") == 1) {
        regexp = "^[0-9]{11}$";
        if (info.phone.match(regexp) == null) {
            $("#phoneGroup").addClass("has-error");
            $("#phoneErrorSpan").html("Phone must contain 11 digits");
            $("#phoneErrorSpanDiv").show();

            setTimeout(function () {
                $("#phoneGroup").removeClass("has-error");
                $("#phoneErrorSpanDiv").hide();
            }, 3000);
            errorFlag = true;
        }
    }

    if (info.mail == "") {
        $("#mailGroup").addClass("has-error");
        $("#mailErrorSpan").html("Email is a required field");
        $("#mailErrorSpanDiv").show();

        setTimeout(function () {
            $("#mailGroup").removeClass("has-error");
            $("#mailErrorSpanDiv").hide();
        }, 3000);
        errorFlag = true;
    }

    if (info.mail != "" && $("#next").data("step") == 1) {
        regexp = "^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$";
        if (info.mail.match(regexp) == null) {
            $("#mailGroup").addClass("has-error");
            $("#mailErrorSpan").html("Please put email in the following format: some@mail.com");
            $("#mailErrorSpanDiv").show();

            setTimeout(function () {
                $("#mailGroup").removeClass("has-error");
                $("#mailErrorSpanDiv").hide();
            }, 3000);
            errorFlag = true;
        }
    }

    if (info.company != "" && $("#next").data("step") == 2) {
        regexp = "^[\\D\\d\\s]{0,255}$";
        if (info.company.match(regexp) == null) {
            $("#companyGroup").addClass("has-error");
            $("#companyErrorSpan").html("Company name cannot exceed 255 characters");
            $("#companyErrorSpanDiv").show();

            setTimeout(function () {
                $("#companyGroup").removeClass("has-error");
                $("#companyErrorSpanDiv").hide();
            }, 3000);
            errorFlag = true;
        }
    }

    if (info.position != "" && $("#next").data("step") == 2) {
        regexp = "^[\\D\\d\\s]{0,255}$";
        if (info.position.match(regexp) == null) {
            $("#positionGroup").addClass("has-error");
            $("#positionErrorSpan").html("Position cannot exceed 255 characters");
            $("#positionErrorSpanDiv").show();

            setTimeout(function () {
                $("#positionGroup").removeClass("has-error");
                $("#positionErrorSpanDiv").hide();
            }, 3000);
            errorFlag = true;
        }
    }
    if (info.about != "" && $("#next").data("step") == 2) {
        regexp = "^[\\D\\d\\s]{0,255}$";
        if (info.about.match(regexp) == null) {
            $("#aboutGroup").addClass("has-error");
            $("#aboutErrorSpan").html("About cannot exceed 255 characters");
            $("#aboutErrorSpanDiv").show();

            setTimeout(function () {
                $("#aboutGroup").removeClass("has-error");
                $("#aboutErrorSpanDiv").hide();
            }, 3000);
            errorFlag = true;
        }
    }
    if ($("#next").data("step") == 1 && errorFlag != true) {

        var update = 0;
        if (localStorage) {
            update = localStorage.getItem('update');

        } else {
            update = sessionStorage.getItem('update');
        }

        var data = new FormData();
        data.append('name', info.name);
        data.append('surname', info.surname);
        data.append('birthdate', info.birthdate);
        data.append('report', info.report);
        data.append('country', info.country);
        data.append('phone', info.phone);
        data.append('mail', info.mail);
        data.append('created_at', info.created_at);
        data.append('update', update);


        $.ajax({
            url: window.location.href + "?controller=ajax&action=sendData",
            method: "POST",
            dataType: "text",
            data: data,
            processData: false,
            contentType: false,
            success: function (result) {
                var response = JSON.parse(result);
                $(".loaderBackground").css("display", "none");
                x.className = "show";
                x.innerHTML = response.database;
                setTimeout(function () {
                    x.className = x.className.replace("show", "");
                }, 3000);
                if (response.database === "Data has been successfully saved") {

                    $.ajax({
                        url: window.location.href + "?controller=ajax&action=getAllNum",
                        method: "POST",
                        success: function (result) {
                            document.getElementsByClassName("allMembers")[0].innerHTML = "All members (" + result + ")";
                            document.getElementsByClassName("allMembers")[1].innerHTML = "All members (" + result + ")";

                        }
                    });

                    if (localStorage) {
                        localStorage.setItem('id', response.id);
                    } else {
                        sessionStorage.setItem('id', response.id);
                    }

                    $("#next").data("step", "2");
                    $("#partOne").hide();
                    $("#prevDiv").show();
                    $("#prevDiv").css('display', 'inline-block');
                    $("#partTwo").show();
                }
            },
            error: function (result) {
                $(".loaderBackground").css("display", "none");
                x.className = "show";
                x.innerHTML = result;
                setTimeout(function () {
                    x.className = x.className.replace("show", "");
                }, 3000);
            }
        });
        return;
    } else if ($("#next").data("step") == 2 && errorFlag != true) {

        var photo;
        $(".loaderBackground").css("display", "block");
        if (document.getElementById("photo").files[0] != "undefined") {
            photo = document.getElementById("photo").files[0];
        } else {
            photo = "";
        }

        var data = new FormData();
        data.append('company', info.company);
        data.append('position', info.position);
        data.append('about', info.about);
        data.append('photo', photo);
        data.append('created_at', info.created_at);
        data.append('id', localStorage.getItem('id'));

        $.ajax({
            url: window.location.href + "?controller=ajax&action=addData",
            method: "POST",
            dataType: "text",
            data: data,
            processData: false,
            contentType: false,
            success: function (result) {

                var response = JSON.parse(result);
                $(".loaderBackground").css("display", "none");
                x.className = "show";
                x.innerHTML = response.database;
                if(response.file) x.innerHTML +=  "<br>" + response.file;
                setTimeout(function () {
                    x.className = x.className.replace("show", "");
                }, 3000);
                if (response.database == "Data has been successfully added") {

                    $.ajax({
                        url: window.location.href + "?controller=ajax&action=getAllNum",
                        method: "POST",
                        success: function (result) {
                            document.getElementsByClassName("allMembers")[0].innerHTML = "All members (" + result + ")";
                            document.getElementsByClassName("allMembers")[1].innerHTML = "All members (" + result + ")";
                        }
                    });

                    $("#partTwo").hide();
                    $("#formOneHead").hide();
                    $("#next").data("step", "3");
                    $(".buttons").hide();
                    $("#shareDiv").show();
                } else {

                }
            },
            error: function (result) {
                $(".loaderBackground").css("display", "none");
                x.className = "show";
                x.innerHTML = result;
                setTimeout(function () {
                    x.className = x.className.replace("show", "");
                }, 3000);
            }
        });
    }
}

function stepOne() {
    $("#next").data("step", "1");

    if (localStorage) {
        localStorage.setItem('step', $("#next").data("step"));

    } else {
        sessionStorage.setItem('step', $("#next").data("step"));
    }
}

function prevForm(e) {
    e.preventDefault();
    $("#partTwo").hide();
    $("#prevDiv").css('display', 'none');
    $("#next").data("step", "1");

    if (window.location.href.indexOf("?controller=pages&action=table") == -1) {
        if (localStorage) {
            localStorage.setItem('step', $("#next").data("step"));
            localStorage.setItem('update', 1);

        } else {
            sessionStorage.setItem('step', $("#next").data("step"));
            sessionStorage.setItem('update', 1);
        }
        $('#phone').trigger(jQuery.Event('keypress', {keycode: 32}));
    }

    $("#partOne").show();

}

function registerAgain(e) {
    e.preventDefault();
    $("#shareDiv").hide();
    $("#next").data("step", "1");

    if (window.location.href.indexOf("?controller=pages&action=table") == -1) {
        if (localStorage) {
            localStorage.setItem('step', $("#next").data("step"));
            localStorage.setItem('update', 0);

        } else {
            sessionStorage.setItem('step', $("#next").data("step"));
            sessionStorage.setItem('update', 0);
        }
        $('#phone').trigger(jQuery.Event('keypress', {keycode: 32}));
    }

    $("#partOne").show();
    $("#formOneHead").show();
    $(".buttons").show();
}

(function (jQuery, window, undefined) {
    "use strict";

    var matched, browser;

    jQuery.uaMatch = function (ua) {
        ua = ua.toLowerCase();

        var match = /(opr)[\/]([\w.]+)/.exec(ua) ||
            /(chrome)[ \/]([\w.]+)/.exec(ua) ||
            /(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(ua) ||
            /(webkit)[ \/]([\w.]+)/.exec(ua) ||
            /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
            /(msie) ([\w.]+)/.exec(ua) ||
            ua.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec(ua) ||
            ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
            [];

        var platform_match = /(ipad)/.exec(ua) ||
            /(iphone)/.exec(ua) ||
            /(android)/.exec(ua) ||
            /(windows phone)/.exec(ua) ||
            /(win)/.exec(ua) ||
            /(mac)/.exec(ua) ||
            /(linux)/.exec(ua) ||
            /(cros)/i.exec(ua) ||
            [];

        return {
            browser: match[3] || match[1] || "",
            version: match[2] || "0",
            platform: platform_match[0] || ""
        };
    };

    matched = jQuery.uaMatch(window.navigator.userAgent);
    browser = {};

    if (matched.browser) {
        browser[matched.browser] = true;
        browser.version = matched.version;
        browser.versionNumber = parseInt(matched.version);
    }

    if (matched.platform) {
        browser[matched.platform] = true;
    }

    // These are all considered mobile platforms, meaning they run a mobile browser
    if (browser.android || browser.ipad || browser.iphone || browser["windows phone"]) {
        browser.mobile = true;
    }

    // These are all considered desktop platforms, meaning they run a desktop browser
    if (browser.cros || browser.mac || browser.linux || browser.win) {
        browser.desktop = true;
    }

    // Chrome, Opera 15+ and Safari are webkit based browsers
    if (browser.chrome || browser.opr || browser.safari) {
        browser.webkit = true;
    }

    // IE11 has a new token so we will assign it msie to avoid breaking changes
    if (browser.rv) {
        var ie = "msie";

        matched.browser = ie;
        browser[ie] = true;
    }

    // Opera 15+ are identified as opr
    if (browser.opr) {
        var opera = "opera";

        matched.browser = opera;
        browser[opera] = true;
    }

    // Stock Android browsers are marked as Safari on Android.
    if (browser.safari && browser.android) {
        var android = "android";

        matched.browser = android;
        browser[android] = true;
    }

    // Assign the name and platform variable
    browser.name = matched.browser;
    browser.platform = matched.platform;


    jQuery.browser = browser;
})(jQuery, window);

/*
	Masked Input plugin for jQuery
	Copyright (c) 2007-2011 Josh Bush (digitalbush.com)
	Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
	Version: 1.3
  https://cloud.github.com/downloads/digitalBush/jquery.maskedinput/jquery.maskedinput-1.3.min.js
*/
(function (a) {
    var b = (a.browser.msie ? "paste" : "input") + ".mask", c = window.orientation != undefined;
    a.mask = {
        definitions: {9: "[0-9]", a: "[A-Za-z]", "*": "[A-Za-z0-9]"},
        dataName: "rawMaskFn"
    }, a.fn.extend({
        caret: function (a, b) {
            if (this.length != 0) {
                if (typeof a == "number") {
                    b = typeof b == "number" ? b : a;
                    return this.each(function () {
                        if (this.setSelectionRange) this.setSelectionRange(a, b); else if (this.createTextRange) {
                            var c = this.createTextRange();
                            c.collapse(!0), c.moveEnd("character", b), c.moveStart("character", a), c.select()
                        }
                    })
                }
                if (this[0].setSelectionRange) a = this[0].selectionStart, b = this[0].selectionEnd; else if (document.selection && document.selection.createRange) {
                    var c = document.selection.createRange();
                    a = 0 - c.duplicate().moveStart("character", -1e5), b = a + c.text.length
                }
                return {begin: a, end: b}
            }
        }, unmask: function () {
            return this.trigger("unmask")
        }, mask: function (d, e) {
            if (!d && this.length > 0) {
                var f = a(this[0]);
                return f.data(a.mask.dataName)()
            }
            e = a.extend({placeholder: "_", completed: null}, e);
            var g = a.mask.definitions, h = [], i = d.length, j = null, k = d.length;
            a.each(d.split(""), function (a, b) {
                b == "?" ? (k--, i = a) : g[b] ? (h.push(new RegExp(g[b])), j == null && (j = h.length - 1)) : h.push(null)
            });
            return this.trigger("unmask").each(function () {
                function v(a) {
                    var b = f.val(), c = -1;
                    for (var d = 0, g = 0; d < k; d++) if (h[d]) {
                        l[d] = e.placeholder;
                        while (g++ < b.length) {
                            var m = b.charAt(g - 1);
                            if (h[d].test(m)) {
                                l[d] = m, c = d;
                                break
                            }
                        }
                        if (g > b.length) break
                    } else l[d] == b.charAt(g) && d != i && (g++, c = d);
                    if (a || c + 1 >= i) u(), a || f.val(f.val().substring(0, c + 1));
                    return i ? d : j
                }

                function u() {
                    return f.val(l.join("")).val()
                }

                function t(a, b) {
                    for (var c = a; c < b && c < k; c++) h[c] && (l[c] = e.placeholder)
                }

                function s(a) {
                    var b = a.which, c = f.caret();
                    if (a.ctrlKey || a.altKey || a.metaKey || b < 32) return !0;
                    if (b) {
                        c.end - c.begin != 0 && (t(c.begin, c.end), p(c.begin, c.end - 1));
                        var d = n(c.begin - 1);
                        if (d < k) {
                            var g = String.fromCharCode(b);
                            if (h[d].test(g)) {
                                q(d), l[d] = g, u();
                                var i = n(d);
                                f.caret(i), e.completed && i >= k && e.completed.call(f)
                            }
                        }
                        return !1
                    }
                }

                function r(a) {
                    var b = a.which;
                    if (b == 8 || b == 46 || c && b == 127) {
                        var d = f.caret(), e = d.begin, g = d.end;
                        g - e == 0 && (e = b != 46 ? o(e) : g = n(e - 1), g = b == 46 ? n(g) : g), t(e, g), p(e, g - 1);
                        return !1
                    }
                    if (b == 27) {
                        f.val(m), f.caret(0, v());
                        return !1
                    }
                }

                function q(a) {
                    for (var b = a, c = e.placeholder; b < k; b++) if (h[b]) {
                        var d = n(b), f = l[b];
                        l[b] = c;
                        if (d < k && h[d].test(f)) c = f; else break
                    }
                }

                function p(a, b) {
                    if (!(a < 0)) {
                        for (var c = a, d = n(b); c < k; c++) if (h[c]) {
                            if (d < k && h[c].test(l[d])) l[c] = l[d], l[d] = e.placeholder; else break;
                            d = n(d)
                        }
                        u(), f.caret(Math.max(j, a))
                    }
                }

                function o(a) {
                    while (--a >= 0 && !h[a]) ;
                    return a
                }

                function n(a) {
                    while (++a <= k && !h[a]) ;
                    return a
                }

                var f = a(this), l = a.map(d.split(""), function (a, b) {
                    if (a != "?") return g[a] ? e.placeholder : a
                }), m = f.val();
                f.data(a.mask.dataName, function () {
                    return a.map(l, function (a, b) {
                        return h[b] && a != e.placeholder ? a : null
                    }).join("")
                }), f.attr("readonly") || f.one("unmask", function () {
                    f.unbind(".mask").removeData(a.mask.dataName)
                }).bind("focus.mask", function () {
                    m = f.val();
                    var b = v();
                    u();
                    var c = function () {
                        b == d.length ? f.caret(0, b) : f.caret(b)
                    };
                    (a.browser.msie ? c : function () {
                        setTimeout(c, 0)
                    })()
                }).bind("blur.mask", function () {
                    v(), f.val() != m && f.change()
                }).bind("keydown.mask", r).bind("keypress.mask", s).bind(b, function () {
                    setTimeout(function () {
                        f.caret(v(!0))
                    }, 0)
                }), v()
            })
        }
    })
})(jQuery);

$('document').ready(function () {
    $("#phone").mask("+9 (999) 999-9999", {autoclear: false});
});