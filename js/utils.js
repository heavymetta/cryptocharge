function initDatePicker() {

    var optionSet1 = {
        //startDate: moment().subtract('days', 29),
        startDate: moment().startOf('month'),
        endDate: moment(),
        minDate: '01/01/2014',
        maxDate: moment().add('days', 1),
        //dateLimit: { days: 60 },
        showDropdowns: true,
        showWeekNumbers: true,
        timePicker: false,
        timePickerIncrement: 1,
        timePicker12Hour: true,
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
            'Last 7 Days': [moment().subtract('days', 6), moment()],
            'Last 30 Days': [moment().subtract('days', 29), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
        },
        opens: 'right',
        buttonClasses: ['btn btn-default'],
        applyClass: 'btn-small btn-primary',
        cancelClass: 'btn-small',
        format: 'MM/DD/YYYY',
        separator: ' to ',
        locale: {
            applyLabel: 'Submit',
            cancelLabel: 'Clear',
            fromLabel: 'From',
            toLabel: 'To',
            customRangeLabel: 'Custom',
            daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            firstDay: 1
        }
    };

    /*******/
    $('#reportrange2 span').html(moment().startOf('month').format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));

    $('#reportrange2').daterangepicker(optionSet1, function(start, end) {
        $('#reportrange2 span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    });
}

function formatMoney(yValue) {
    yValue += '';
    x = yValue.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

/*
 Get query parameter from location URL
 */
function getParam(name) {
    name = name.replace(/[\[]/, "\\\\[").replace(/[\]]/, "\\\\]");
    var r = new RegExp("[\\?&#]" + name + "=([^&#]*)");
    var results = r.exec(window.location.href);
    if (results === null) {
        return "";
    } else {
        return decodeURIComponent(results[1].replace(/\+/g, " "));
    }
}

function getCurrentPage() {
    return location.pathname.replace(/^.*[\\\/]/, '');
}

function initNotifications() {
    // set cookie when notification closed
    $('.close').on('click', function() {

        var id = $(this).data('cmpid');
        var prefix = $(this).data('cookie');
        var date = $(this).data('status-changed');

        document.cookie = prefix + "Notification" + id + "=" + date;

    });
}


/*
 Make readable error list from JSON
 */
function resultToResponse(response, newValue) {
    var result;

    result = JSON.parse(response);

    if (result.errors) {
        var errors = result.errors;
        var text = "";
        for (var item in errors) {
            if (errors.hasOwnProperty(item)) {
                text += String(errors[item]) + "\n";
            }
        }
        return text;
    }

}

function truncateString(value, cutOffNum) {
    return value.length > cutOffNum ? value.substring(0, cutOffNum - 3) + '...' : value;
}

function isValidUrl(url) {
    if (/^(http|https|ftp):\/\/[a-z0-9]+((\-{1,}|\.{1})[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test(url)) {
        return 1;
    } else {
        return -1;
    }
}

function number_format(number, decimals, dec_point, thousands_sep) {
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '')

    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function(n, prec) {
            var k = Math.pow(10, prec)
            return '' + (Math.round(n * k) / k).toFixed(prec)
        }
        // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || ''
        s[1] += new Array(prec - s[1].length + 1).join('0')
    }
    return s.join(dec)
}

function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
}

function getCents(value) {
    var cents = 100 * value;
    return cents % 1 != 0 ? parseFloat(cents.toFixed(2)) : cents;
}

function refreshProfile() {
    $.get("ajax/refresh-advertiser-profile-session.php");
}

function camelize(str) {
    var split = str.split(' ');

    //iterate through each of the "words" and capitalize them
    for (var i = 0, len = split.length; i < len; i++) {
        split[i] = split[i].charAt(0).toUpperCase() + split[i].slice(1);
    }

    return split.join(' ');
}

function removeExclamationMarks(str) {
    return str.replace(/!$/, '').replace(/[!]/g, '.');
}

$(document).ready(function() {

    $("#campaignDropdown").change(function() {
        var cmpID = $(this).val();

        if (cmpID !== '') {
            window.location = 'campaign-inventory.php?id=' + cmpID + '&sort=updated';
        }
    });

    $("#blacklistWhitelistUpload").on("hide.bs.modal", function() {
        var blacklistUploadSrc = "blacklist-whitelist-upload-general.php";

        $("#blacklistWhitelistUploadFrame").attr("src", blacklistUploadSrc + "?id=" + nativeAdsCampaignId);

        var secondsish = new Date().getTime() / 800;

        var _theblacklistCurrentFrame = document.getElementById("blacklistCurrentFrame");
        _theblacklistCurrentFrame.contentWindow.location.href = _theblacklistCurrentFrame.src + '&_=' + secondsish;

        var _thewhitelistCurrentFrame = document.getElementById("whitelistCurrentFrame");
        _thewhitelistCurrentFrame.contentWindow.location.href = _thewhitelistCurrentFrame.src + '&_=' + secondsish;
    });

    $("#blacklistCurrent").on("hide.bs.modal", function() {
        $("#blacklistCurrentFrame").attr("src", "blacklist-current.php?id=" + nativeAdsCampaignId);
    });

    $("#whitelistCurrent").on("hide.bs.modal", function() {
        $("#whitelistCurrentFrame").attr("src", "whitelist-current.php?id=" + nativeAdsCampaignId);
    });

    $(".switchToBlacklistWhitelistUpload").on("click", function() {
        $("#blacklistCurrent").modal('hide');
        $("#whitelistCurrent").modal('hide');
        $("#blacklistWhitelistUpload").modal('show');
    });

    window.addEventListener("message", receiveMessageBW, false);

    function receiveMessageBW(event) {
        //if (event.origin == nativeAdsBaseUrl) {
        if (event.data == "cancelBlacklistUpload") {
            $("#blacklistWhitelistUpload").modal('hide');
        }
        if (event.data == "cancelBlacklistCurrent") {
            $("#blacklistCurrent").modal('hide');
        }
        if (event.data == "cancelWhitelistUpload") {
            $("#whitelistUpload").modal('hide');
        }
        if (event.data == "cancelWhitelistCurrent") {
            $("#whitelistCurrent").modal('hide');
        }

        if (event.data == "switchToBlacklistCurrent") {
            $("#blacklistWhitelistUpload").modal('hide');
            $("#blacklistCurrent").modal('show');
        }
        if (event.data == "switchToWhitelistCurrent") {
            $("#blacklistWhitelistUpload").modal('hide');
            $("#whitelistCurrent").modal('show');
        }
        if (event.data == "switchToBlacklistWhitelistUpload") {
            $("#blacklistCurrent").modal('hide');
            $("#whitelistCurrent").modal('hide');
            $("#blacklistWhitelistUpload").modal('show');
        }
        //}
    }

    /*
     Notifications
     */
    $('.closeit').on('click', function() {
        var nid = $(this).data("nid");
        var forever = $(this).data("forever");

        $.ajax({
            type: "POST",
            url: "ajax/notification-update.php",
            data: {
                "nid": nid,
                "forever": forever
            },
            success: function(msg) {
                if (msg.success === false) {} else {}
            }
        });
    });

    /*
     Begin Notifications Lightbox Initialization
     */
    if (typeof Notif_count === 'undefined') {} else {
        for (Notif_modal = 1; Notif_modal <= Notif_count; Notif_modal++) {
            $('#notificationModal' + Notif_modal).modal('show');
        }

        /*
     end Notifications Lightbox Initialization
    */
    }

    // SUSPENDED ACCOUNT LIMITATIONS BEGIN \\
    $(".new-cmp-link, #campaign-optimization-btn, #showiframe, .cloneInv, #createAds, #invSubmit").on("click", function(e) {
        if (accountSuspended) {
            e.preventDefault();
            e.stopPropagation();

            $("#suspendedAccountModal").modal('show');
        }
    });
    // SUSPENDED ACCOUNT LIMITATIONS END \\
});

// Create Base64 Object
var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(e) {
        var t = "";
        var n, r, i, s, o, u, a;
        var f = 0;
        e = Base64._utf8_encode(e);
        while (f < e.length) {
            n = e.charCodeAt(f++);
            r = e.charCodeAt(f++);
            i = e.charCodeAt(f++);
            s = n >> 2;
            o = (n & 3) << 4 | r >> 4;
            u = (r & 15) << 2 | i >> 6;
            a = i & 63;
            if (isNaN(r)) {
                u = a = 64;
            } else if (isNaN(i)) {
                a = 64;
            }
            t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a);
        }
        return t;
    },
    decode: function(e) {
        var t = "";
        var n, r, i;
        var s, o, u, a;
        var f = 0;
        e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (f < e.length) {
            s = this._keyStr.indexOf(e.charAt(f++));
            o = this._keyStr.indexOf(e.charAt(f++));
            u = this._keyStr.indexOf(e.charAt(f++));
            a = this._keyStr.indexOf(e.charAt(f++));
            n = s << 2 | o >> 4;
            r = (o & 15) << 4 | u >> 2;
            i = (u & 3) << 6 | a;
            t = t + String.fromCharCode(n);
            if (u !== 64) {
                t = t + String.fromCharCode(r);
            }
            if (a !== 64) {
                t = t + String.fromCharCode(i);
            }
        }
        t = Base64._utf8_decode(t);
        return t;
    },
    _utf8_encode: function(e) {
        e = e.replace(/\r\n/g, "\n");
        var t = "";
        for (var n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r);
            } else if (r > 127 && r < 2048) {
                t += String.fromCharCode(r >> 6 | 192);
                t += String.fromCharCode(r & 63 | 128);
            } else {
                t += String.fromCharCode(r >> 12 | 224);
                t += String.fromCharCode(r >> 6 & 63 | 128);
                t += String.fromCharCode(r & 63 | 128);
            }
        }
        return t;
    },
    _utf8_decode: function(e) {
        var t = "";
        var n = 0;
        var r = c1 = c2 = 0;
        while (n < e.length) {
            r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r);
                n++;
            } else if (r > 191 && r < 224) {
                c2 = e.charCodeAt(n + 1);
                t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                n += 2;
            } else {
                c2 = e.charCodeAt(n + 1);
                c3 = e.charCodeAt(n + 2);
                t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                n += 3;
            }
        }
        return t;
    }
};
