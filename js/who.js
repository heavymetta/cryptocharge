var AcNo = '';
var LH = 0;

function ProcessWhoIsEvents() {
    if (whoparam) {
        for (var i = 0; i < whoparam.length; i++) {
            var func = whoparam[i];
            switch (func[0]) {
                case 'AcNo':
                    AcNo = func[1];
                    break;
                case 'SendHit':
                    waitforbodyandsend();
                    break;
                default:
            }
        }
    }
}
function waitforbodyandsend() {
    if (document.body != null) {
        SendHit();
        return;
    };
    window.setTimeout(function () {
        waitforbodyandsend();
    }, 100);
}
function SendHit() {
    try {
        if (AcNo != '') {
            var r = encodeURIComponent(document.referrer.replace(/<\/?[^>]+(>|$)/g, ""));
            var w = screen.width;
            var h = screen.height;
            var i = document.createElement("img");
            var u = window.location.href;
            var p = u.split('/')[0];
            i.src = p + "//dashboard.whoisvisiting.com/who.ashx?Type=Hit&Data=" + w + "|" + h + "|" + r + "|" + AcNo + "|" + encodeURIComponent(u.replace(/<\/?[^>]+(>|$)/g, ""));
            i.style.display = 'none';
            document.body.appendChild(i);
            AcNo = '';
            whoparam = new Array();
        }
    } catch (e) {
    }
}
ProcessWhoIsEvents();
