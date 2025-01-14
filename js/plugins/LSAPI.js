LSAPI = function() {
    var b = "1.2";
    var a = {
        SCREENMODE_NORMAL: 0,
        SCREENMODE_FULL: 1,
        screenModeChangeNotificationFunctions: [],
        titleSuffix: null,
        init: function(f) {
            this.titleSuffix = f
        },
        setCanvasTitle: function(f) {
            if (typeof (headerless) != "undefined" && headerless) {
                if (this.titleSuffix != null) {
                    f += " - " + this.titleSuffix
                }
                document.title = f
            }
        },
        setScreenMode: function(m) {
            if (typeof (_screenMode) == "undefined") {
                _screenMode = this.SCREENMODE_NORMAL
            }
            if (m == this.SCREENMODE_NORMAL) {
                _screenMode = m;
                var k = document.getElementsByTagName("TABLE");
                var h = k.length;
                var l;
                for (var g = 0; g < h; g++) {
                    l = k[g];
                    if (l.className.indexOf("fullScreenHiddenContainer") > -1) {
                        l.style.display = "block"
                    }
                }
            }
            if (m == this.SCREENMODE_FULL) {
                _screenMode = m;
                var k = document.getElementsByTagName("TABLE");
                var h = k.length;
                var l;
                for (var g = 0; g < h; g++) {
                    l = k[g];
                    if (l.className.indexOf("fullScreenHiddenContainer") > -1) {
                        l.style.display = "none"
                    }
                }
            }
            for (var f = 0; f < this.screenModeChangeNotificationFunctions.length; f++) {
                this.screenModeChangeNotificationFunctions[f](m)
            }
            AFPLayoutAPI.notifyOnPanelSizeChanged()
        },
        registerScreenModeChangeNotification: function(g) {
            this.screenModeChangeNotificationFunctions[this.screenModeChangeNotificationFunctions.length] = g
        },
        getScreenMode: function(f) {
            if (typeof (_screenMode) == "undefined") {
                _screenMode = this.SCREENMODE_NORMAL
            }
            return _screenMode
        },
        toggleFullScreen: function() {
            if (this.getScreenMode() == this.SCREENMODE_NORMAL) {
                this.setScreenMode(this.SCREENMODE_FULL);
                return true
            } else {
                this.setScreenMode(this.SCREENMODE_NORMAL);
                return false
            }
        }
    };
    var d = {
        model: null,
        controller: null,
        configuration: null
    };
    var c = {
        screenCaptureMode: null,
        screenCaptureToolLocation: null,
        init: function(g, f) {
            this.screenCaptureMode = g;
            this.screenCaptureToolLocation = f
        },
        isScreenCapturingEnabled: function() {
            var f = false;
            if (this.screenCaptureMode != null) {
                if (this.screenCaptureMode === "Snapshot") {
                    f = true
                } else {
                    if (this.screenCaptureMode === "None") {
                        f = false
                    }
                }
            } else {}
            return f
        },
        captureScreen: function(h) {
            var i = false;
            i = this.isScreenCapturingEnabled();
            if (i) {
                var k = false;
                if (typeof h != "undefined" && h != null && h == true) {
                    k = true
                }
                var f = window.screenLeft;
                var m = window.screenTop;
                var l = 0;
                var g = 0;
                if (typeof (window.innerWidth) == "number") {
                    l = window.innerWidth;
                    g = window.innerHeight
                } else {
                    if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
                        l = document.documentElement.clientWidth;
                        g = document.documentElement.clientHeight
                    } else {
                        if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
                            l = document.body.clientWidth;
                            g = document.body.clientHeight
                        }
                    }
                }
                var j = "Screencapture";
                if (this.screenCaptureToolLocation != null) {
                    if (this.screenCaptureToolLocation == "") {
                        window.alert("Screen capture tool URL is empty!")
                    } else {
                        fullScreenCaptureToolUri = this.screenCaptureToolLocation + "?prefix=" + j + "&x=" + f + "&y=" + m + "&w=" + l + "&h=" + g + "&silent=" + k;
                        window.open(document.location.protocol + "//" + document.location.host + "/" + fullScreenCaptureToolUri)
                    }
                } else {}
            } else {}
        }
    };
    var e = {
        AFPPlugin: d,
        getVersion: function() {
            return b
        },
        getVisualPlugin: function() {
            return a
        },
        getScreenCapturingPlugin: function() {
            return c
        },
        getSidePanelPlugin: function() {
            return LSAPI.sidePanelPlugin
        },
        getHelpCenterPlugin: function() {
            return LSAPI.helpCenterPlugin
        },
        getSessionPlugin: function() {
            return LSAPI.sessionPlugin
        },
        getSearchProviderPlugin: function() {
            return LSAPI.searchProviderPlugin
        },
        getSuggestionPlugin: function() {
            return LSAPI.suggestionPlugin
        },
        getCollectionsPlugin: function() {
            return LSAPI.Collections
        },
        getHistoryPlugin: function() {
            return LSAPI.historyPlugin
        },
        getTabsetPlugin: function() {
            return LSAPI.tabsetPlugin
        },
        getModalWindowPlugin: function() {
            return LSAPI.modalWindowPlugin
        },
        getFavoritesPlugin: function() {
            return LSAPI.favoritesPlugin
        }
    };
    return e
}();
