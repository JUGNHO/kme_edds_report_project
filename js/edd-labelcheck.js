// edds_label data exist check
if($.sessionStorage.get('edds_labels') === null){
	
	var companyCode = $.sessionStorage.get("COMPANY_CODE");
	
	//	store language to client localStorage
	var lang = $.sessionStorage.get("LANGUAGE");
	$.sessionStorage.set("LANGUAGE",lang);
	
	if(lang == null || lang == undefined){
		 
		if ($.sessionStorage.get("USER_INFO") && $.sessionStorage.get("USER_INFO")["ZLANGUAGE"]) {
			lang =  $.sessionStorage.get("USER_INFO")["ZLANGUAGE"]; // when user first logon the edds.
			setEDDSLabelData(companyCode, lang);
			$.sessionStorage.set("LANGUAGE",lang);
		}
		else {
			lang = "en"; // when user first logon the edds.

			$.ajax({
				url: 'com.kme.edds.common.EDDSSessionChecker',
				data: {},
				cache: false,
				type: "post",
				//async: false,
				dataType: 'json',
				success: function(data) {
					
					// console.log(data);
					
					if (data && data["ZLANGUAGE"]) {
						// fisrt logon server side language key to store to sessionStorage
						lang = data["ZLANGUAGE"].toLowerCase();
						setEDDSLabelData(companyCode, lang);
						$.sessionStorage.set("LANGUAGE",lang);
					}
				}
			});
			
		}
		
	}
	else {
		setEDDSLabelData(companyCode, lang)
		$.sessionStorage.set("LANGUAGE",lang);
	}
	
}

// EDDS-698 System doesn't save previous language
function setEDDSLabelData(companyCode, lang){
	// store server session language key 
	$.ajax({
		url: 'com.kme.edds.common.EDDSUserInfo?prtmode=getUserLanguage',
		data: {
			companyCode: companyCode,
			lang: lang
		},
		cache: false,
		type: "post",
		//async: false,
		dataType: 'json',
		success: function(data) {
			
			console.log(data);
			
			$.sessionStorage.set('edds_labels' , data);			 
			document.location.reload();
		}
	});
	
}

