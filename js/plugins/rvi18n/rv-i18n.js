function rvi18n() {
    this._i18n_json = {};
    this._lang = "en";
};

rvi18n.prototype.init = function(mJson, sLanguage) {
    this._i18n_json = mJson;

    if (sLanguage == undefined || sLanguage == "") this._lang = null;
    else this._lang = sLanguage;
};

rvi18n.prototype.load = function(sAttr) {
    var attr = "rv-i18n";
    if (sAttr != undefined && sAttr != "") attr = sAttr;
    var f = $("[" + attr + "]");
    var len = f.length;
    for (var i = 0; i < len; i++) {
        if ($(f[i]).children().length == 0) $(f[i]).text(this.get($(f[i]).attr(attr)));
        else {
            if ($(f[i]).attr(attr + "-prepend") == "true") {
                $(f[i]).html(this.get($(f[i]).attr(attr)) + $(f[i]).html());
            } else if ($(f[i]).attr(attr + "-append") == "true") {
                $(f[i]).html($(f[i]).html() + this.get($(f[i]).attr(attr)));
            }
        }
    }
};

rvi18n.prototype.get = function(sKey) {
    if (this._lang == null) return this._i18n_json[sKey];
    else return this._i18n_json[this._lang][sKey];
};

rvi18n.prototype.set = function(sKey, sValue) {
    if (this._lang == null) this._i18n_json[sKey] = sValue;
    else this._i18n_json[this._lang][sKey] = sValue;
};

rvi18n.prototype.add = function(sKey, sValue) {
    this.set(sKey, sValue);
};

rvi18n.prototype.getJson = function() {
    return this._i18n_json;
};

rvi18n.prototype.setJson = function(mJson) {
    this._i18n_json = mJson;
};

rvi18n.prototype.text = function(sKey, jqObj) {
    jqObj.text(this.get(sKey));
};
