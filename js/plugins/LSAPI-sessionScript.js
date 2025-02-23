var isLogoffFinalAllowed = true;
LSAPI.sessionPlugin = function() {
    var j = 0;
    var a = null;
    var g = null;
    var e = '/irj/portal';
    var k = (new Date).getTime();
    var l = function(p, o, n) {
        a = p;
        g = o;
        e = n
    };
    var f = function(n) {
        if (n && (n > 0)) {
            j = n
        }
    };
    var i = function() {
        EPCM.raiseEvent("urn:com.sapportals.portal:user", "logoff", "");
        k = new Date().getTime();
        window.setTimeout(LSAPI.sessionPlugin._private.logoffDelay, 50)
    };
    var h = function() {
        var n = ((new Date).getTime() - k) > (60 * 1000);
        if (isLogoffFinalAllowed || n) {
            if (typeof (CloseAllObj) !== "undefined" && CloseAllObj !== null) {
                CloseAllObj.logoutFromThisWindow = true;
                CloseAllObj.setFlagValue(CloseAllObj.OUT)
            }
            window.setTimeout(d, j)
        } else {
            window.setTimeout(LSAPI.sessionPlugin._private.logoffDelay, 50)
        }
    };
    var d = function() {
        c();
        if (typeof (CloseAllObj) !== "undefined" && CloseAllObj !== null) {
            CloseAllObj.logout_from_this_window = true;
            CloseAllObj.setFlagValue(CloseAllObj.OUT)
        }
        EPCM.getSAPTop().disableWorkProtectCheck = true;
        m()
    };
    var m = function() {
         
        var n = document.createElement("input");
        n.type = "hidden";
        n.name = "logout_submit";
        n.value = "true";
        var o = document.createElement("form");
        o.method = "post";
        o.style.display = "none";
        o.appendChild(n);
        o.action = e;
        o.target = "_top";
        document.body.appendChild(o);
        o.submit()
        
    };
    var c = function() {
        //if (!JSUtils.isEmpty(a)) {
    	if (true) {
            var o = a;
            if (g === "true") {
                var n = document.getElementById("externalLogOffIframe");
                if (n == null) {
                    n = document.createElement("IFRAME");
                    n.style.visibility = "hidden";
                    n.width = 0;
                    n.height = 0;
                    n.id = "externalLogOffIframe";
                    n.src = o;
                    document.body.appendChild(n)
                } else {
                    n.src = "about:blank";
                    n.src = o
                }
            }
        }
    };
    var b = function() {
        var n = window.open("", "_self", "");
        n.close()
    };
    return {
        logoff: i,
        closeSession: b,
        _private: {
            init: l,
            logoffDelay: h,
            setLogoffDelayTimer: f
        }
    }
}();
