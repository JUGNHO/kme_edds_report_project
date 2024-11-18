
$.fn.outerHTML = function() {
  return jQuery('<div />').append(this.eq(0).clone()).html();
};

var i18n_master = {
	set : function(mLabels){
		var storage = $.sessionStorage;
		storage.set('edds_labels', mLabels);
	},
	get : function(){
		var storage = $.sessionStorage;
		return storage.get('edds_labels');
	},
	getText : function(key){
		var storage = $.sessionStorage;
		var text = "";
		var storageText = storage.get('edds_labels.' + key);
		if(!$.isEmptyObject(storageText)){
			text = storageText;
		}else{
			console.log("i18n_master.getText("+key+") empty ");
			text = key;
		}
		return text;
	},
	load : function(sAttr){
	
		var _i18n = i18n_master.get();
		
		var attr = "rv-i18n";
		if (sAttr != undefined && sAttr != "") attr = sAttr;
		var f = $("[" + attr + "]");
		var len = f.length;
		for (var i = 0; i < len; i++) {
			// init value
			var text = "";
			if(_i18n[$(f[i]).attr(attr)] != null && _i18n[$(f[i]).attr(attr)] != undefined){
				text = _i18n[$(f[i]).attr(attr)];
			}else{
				
				// it doesn't exist case (rv-i18n key doesn't exist)
				console.log(
					"rv-i18n key : " + $(f[i]).attr(attr) + "\n" 
					+ " text : " + text + "\n"
				);
				// rv-i18n key Mapping
				text = $(f[i]).attr(attr);
			}
			
			
			if(text != "" && text != null && text != undefined){
			
				if ( $(f[i]).hasAttr('rv-i18n-prepend') ) {
					$(f[i]).html(text + " " + $(f[i]).html().trim().replace( $(f[i]).text().trim() ,""));
    
				} else if ( $(f[i]).hasAttr('rv-i18n-append') ) {
					$(f[i]).html( $(f[i]).html().trim().replace( $(f[i]).text().trim() ,"")  + " " + text);
    
				} else if( $(f[i]).hasAttr('rv-i18n-placeholder')){
					$(f[i]).attr('placeholder', text );

				}  else if( $(f[i]).hasAttr('rv-i18n-popover') == true ){

					$(f[i]).popover({
				        content: text
				    }).attr('data-content', text );
				    
				}else if($(f[i]).children().length == 0){
					$(f[i]).text(text);
					
				}
			}
		}
	}
};