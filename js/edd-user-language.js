
function changeLanguage(){
	
	var flagData = "";
	// load for Flags
	$.ajax({
		type: "POST",
		url: "/com.kme.edds.script/json/subsidiary_flag.model.json",
		async: false ,
		cache: false ,
		dataType: 'json',
		success: function(flags) {
			flagData = flags.flags;
		},
		error: function() {
			alert('error');
		}
	});


	var selectedCompanyCode = $.sessionStorage.get("COMPANY_CODE");

	$.ajax({
		url: 'com.kme.edds.common.EDDSUserInfo'
		,data:{
			"prtmode":"getUserInfo",
			"selected_company_code": selectedCompanyCode
		}
		,cache: false
		,type: "post"
		,dataType: 'json'
		,success: function(data) {
			renderLanguageInfo(data, flagData, selectedCompanyCode);
		},error: function(xhr, status, error){
			if(xhr.getResponseHeader('content-type').startsWith("text/html")){
				// alert(i18n_master.getText('MSG_FAILED') + " " + "Session Expired, please log on again.");
				// sessionExpiredLogout();
			}else{
				swal(i18n_master.getText('MSG_FAILED'), i18n_master.getText('MSG_FAILED_STATUS_CODE') + status + ", " + error , "error");
				hideLoading();
				console.log("userInfo()");
			}
		}
	});
}

function renderLanguageInfo(data, flags, selectedCompanyCode){

	try{
	
		// console.log(data);
		// console.log(flags);
		
		var storage = $.sessionStorage;
		// set selected Company code for language change to Local storage
		var selectedCompanyCode = storage.get("COMPANY_CODE");

		// 
		var companyCode = data["BUKRS"];	
		var companyText = data["BUKRS_T"];
		if(selectedCompanyCode == undefined || selectedCompanyCode == null){
			storage.remove("COMPANY_CODE");
			storage.set("COMPANY_CODE" , companyCode);
			selectedCompanyCode =  $.sessionStorage.get("COMPANY_CODE");
		}else{
			//$('#multilanguage_country_flags li').trigger('click');
		}
		
		var availLanguageObj = data["AVAIL_LANGUAGE"];
		
		var language = data["ZLANGUAGE"];
		if(language != undefined){
			// default language set
			storage.set("LANGUAGE" , "en");
			if(availLanguageObj[language.toLowerCase()] != undefined){
				storage.set("LANGUAGE" , language.toLowerCase());
			}else{
				// default language set
				storage.set("LANGUAGE" , "en");
			}
		}

		var userGroup = data["USER_GROUP"];
		var rfcSystemInfo = data["RFC_INFO"];
		var systemInfo = data["LANDSCAPE_NAME"];
		var userFullName = data["ZUANAME"];
		var dealerFlag = data["ZDEALFLAG"];
		var bEmail = data["ZBEMAIL"];
		var sapDealerCode = data["ZDEALERN"];
		var eddsPersonCode = data["ZPRSNN"];
		var eddsCode = data["ZPTNR"];
		var eddsPartnerType = data["ZPTNRTP_T"];
		var roleObj = data["ROLE"];
		
		var firstName = data["ZUFNAME"];
		var lastName = data["ZULNAME"];
		var middleName = data["ZUFNAME"];	
		var portalId = data["ZPOTALID"];
		
		var selectedFlagKey = "";
		var selectedFlagName = "";

		var h = [];
		h.push('<div class="modal fade " id="modal_language_info" tabindex="-1" role="dialog" aria-hidden="true">');
		h.push('    <div class="modal-dialog">');
		h.push('        <div class="modal-content animated fadeIn">');
		h.push('            <div class="modal-header">');
		h.push('                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>');
		h.push('                <h4 class="modal-title">'+i18n_master.getText('LBL_LANGUAGE')+'</h4>');
		h.push('            </div>');
		h.push('            <div class="modal-body">');
		h.push('                <div class="panel panel-default">');
		h.push('                    <div class="panel-body">');
		h.push('                        <div class="form-horizontal">');
	
		if(companyCode == "KB01"){
		
			h.push('                        <div class="form-group hide">');
			h.push('                            <label class="col-sm-4 control-label"> <i class="fa fa-flag"></i> '+i18n_master.getText('LBL_COUNTRY')+' </label>');
			h.push('                            <div class="col-sm-8" >');
			
			h.push('        						<div class="dropdown ">');
			h.push('            						<a href="#" class="dropdown-toggle" data-toggle="dropdown"> <img id="language_country_selected_img" alt="Kia EU" src="/com.kme.edds.resources/img/flags/32/KIA_LOGO.png" data-company-code="KB01" data-flag-name="Kia EU" data-flag-title="Kia EU"> <span id="country_header_lang_span"> Kia EU </span></a>');
			h.push('            						<ul id="multilanguage_country_flags" class="dropdown-menu">');
			
			$(flags).each(function(idx, item) {
				var flagName = item.flagName;
				var flagTitle = item.flagTitle;
				var companyCode = item.companyCode;
				var flagActive = "";
				if(selectedCompanyCode == "" || selectedCompanyCode == "KB01"){
					if (companyCode == "KB01") {
						flagActive = "active"
					}
				}else{
					if (companyCode == selectedCompanyCode) {
						flagActive = "active"
					}
				}
				h.push('                					<li role="presentation" class="'+flagActive+'" data-company-code="'+companyCode+'" data-flag-name="'+flagName+'" data-flag-title="'+flagTitle+'"><a href="javascript:void(0);"><img src="/com.kme.edds.resources/img/flags/32/'+flagName+'.png"  alt="'+flagTitle+'"> '+flagTitle+'</a></li>');
			});
	
			h.push('           							</ul>');
			h.push('        						</div>');
			h.push('                            </div>');
			h.push('                        </div>');
		}
		
		// Available Language Set Area
		h.push('                            <div class="form-group" id="available_language_area2">');
		h.push(									getAvailLanguagesForLanguageDOM(availLanguageObj));
		h.push('                            </div>');
		// end of Available Language Set Area
		
		h.push('                        </div>');
		h.push('                    </div>');
		h.push('                </div>');
		h.push('            </div>');
		h.push('            <div class="modal-footer">');
		h.push('                <button type="button" class="btn btn-white" data-dismiss="modal"><i class="fa fa-times"></i> '+i18n_master.getText('BTN_CLOSE')+'</button>');
		h.push('                <button type="button" class="btn btn-primary" data-dismiss="modal" id="userinfo_save"><i class="fa fa-save"></i> '+i18n_master.getText('BTN_SAVE')+'</button>');
		if(userGroup == "RGROUP01"){
		h.push('                <button type="button" class="btn btn-primary" data-dismiss="modal" id="userlanguage_refresh"><i class="fa fa-refresh"></i> '+i18n_master.getText('BTN_REFRESH_LANGUAGE')+'</button>');
		}
		h.push('            </div>');
		h.push('        </div>');
		h.push('    </div>');
		h.push('</div>');
				
		$(document.body).append(h.join(""));
		
		$('#modal_language_info').modal('show');
		
		$('#userinfo_save').on('click' , function(){

			// remove Labels to sessionStorage
			$.sessionStorage.remove('edds_labels');

			// store language to client localStorage
			var selectedCompanyCode = $("#language_country_selected_img").attr("data-company-code");
			// for NSC
			if(selectedCompanyCode == undefined){
				selectedCompanyCode = companyCode;
			}
			var selectedLang = $('#userinfo_lang').attr('data-language');
			storage.remove("COMPANY_CODE");
			storage.set("COMPANY_CODE", selectedCompanyCode);
			storage.set("LANGUAGE" , selectedLang);

			$._CSRF.generationCSRFToken( "SetUserLanguage" + $(this).attr('id') );
			
			// store server session language key 
			$.ajax({
				url: 'com.kme.edds.common.EDDSUserInfo'
				,data:{ 
					prtmode: 'setUserLanguage',
					selected_company_code: selectedCompanyCode,
					lang: selectedLang,
					dp_dtsg: $._CSRF.data.dp_dtsg,
					job_name: $._CSRF.data.job_name
				}
				,cache: false
				,type: "post"
				,async: false
				,dataType: 'json'
				,success: function(data) {	
					
					console.log('userinfo_save');
					
					$.sessionStorage.set('edds_labels', data);
					document.location.reload();
				},error: function(xhr, status, error){
					if(xhr.getResponseHeader('content-type').startsWith("text/html")){	
						// alert(i18n_master.getText('MSG_FAILED') + " " + "Session Expired, please log on again.");
						// sessionExpiredLogout();
					}else{
						swal(i18n_master.getText('MSG_FAILED'), i18n_master.getText('MSG_FAILED_STATUS_CODE') + status + ", " + error , "error");
						hideLoading();
						console.log("userinfo_save()");
					}
				}
			});
		});
		
		$('#userlanguage_refresh').on('click', function(){
			
			var successTitle = i18n_master.getText('MSG_SAVE_SUCCESS');
			var failTitle = i18n_master.getText('MSG_FAILED');
			
			var isDeleted = $.sessionStorage.remove('edds_labels');
			if(isDeleted){
				document.location.reload();
			}else{
				swal(failTitle, "", "error");
			}
		});
	
	
		// when browser refresh and then 
		$('#multilanguage_country_flags li').each(function(idx, item){
			var $li = $(this);
		
			if( $li.attr("class") == "active" ){
				
				var imgSrc = $li.children().find('img').attr('src');
				var alt = $li.children().find('img').attr('alt');
	
				var flagTitle = $li.attr('data-flag-title');
				var flagName = $li.attr('data-flag-name');
				var selectedCompanyCode = $li.attr('data-company-code');
	
				//
				$('#country_header_lang_span').text(flagTitle);
				// change select country info
				$('#language_country_selected_img')
					.attr('src', imgSrc)
					.attr('alt', alt)
					.attr('data-flag-title', flagTitle)
					.attr('data-flag-name', flagName)
					.attr('data-company-code', selectedCompanyCode);
	
				return;
			}
		});
	
		$('#multilanguage_country_flags li').on('click', function(){
			
			//showLoading();
			
			// inactive all li dom
			$('#multilanguage_country_flags li').removeClass('active');
			
			var $li = $(this);
			$li.addClass('active');
			var imgSrc = $li.children().find('img').attr('src');
			var alt = $li.children().find('img').attr('alt');
	
			var flagTitle = $li.attr('data-flag-title');
			var flagName = $li.attr('data-flag-name');
			var selectedCompanyCode = $li.attr('data-company-code');
			
			//
			$('#country_header_lang_span').text(flagTitle);
			// change select country info
			$('#language_country_selected_img')
				.attr('src', imgSrc)
				.attr('alt', alt)
				.attr('data-flag-title', flagTitle)
				.attr('data-flag-name', flagName)
				.attr('data-company-code', selectedCompanyCode);
		    
		    
		    // console.log("selectedCompanyCode : " + selectedCompanyCode);
		    
		    // store server session language key 
			$.ajax({
				url: 'com.kme.edds.common.EDDSTermsofCondition'
				,data:{ 
					prtmode: 'getAvailLanguageByCompany',
					selected_company_code: selectedCompanyCode
				}
				,cache: false
				,type: "post"
				,async: false
				,dataType: 'json'
				,success: function(data) {	
	
					var selectedAvailLanguage = data["AVAIL_LANGUAGE"];
					
					// re rendering selectedCompany's language
					$('#available_language_area2').html(getAvailLanguagesForLanguageDOM(selectedAvailLanguage));
					
					// 
					bindAvailLanguagesEvent2();
	
					//
					if( $("#multilanguage_flags li").length == 1 ){
						$('#multilanguage_flags li').trigger('click');
					}
					//
					hideLoading();
					
				},error: function(xhr, status, error){
					if(xhr.getResponseHeader('content-type').startsWith("text/html")){	
						// alert(i18n_master.getText('MSG_FAILED') + " " + "Session Expired, please log on again.");
						// sessionExpiredLogout();
					}else{
						swal(i18n_master.getText('MSG_FAILED'), i18n_master.getText('MSG_FAILED_STATUS_CODE') + status + ", " + error , "error");
						hideLoading();
						console.log("userinfo_save()");
					}
				}
			});
		    
		});
		
		bindAvailLanguagesEvent2();
		
	}catch(e){
		console.log(e);
	}
}

function bindAvailLanguagesEvent2(){

	$('#multilanguage_flags li').each(function(idx, item){
	
		var $li = $(this);
	
		if( $li.attr("class") == "active" ){
			var imgSrc = $li.children().find('img').attr('src');
			var alt = $li.children().find('img').attr('alt');
			var dataLang = $li.children().find('img').attr('data-language');

			$('#userinfo_lang').attr('src' , imgSrc).attr('alt' , alt).attr('data-language', dataLang);
			$('#header_lang_span').text(alt);
			
			return;
		}
	});

	$('#multilanguage_flags li').on('click', function(){
	
		// showLoading();
		
		// 
		$('#multilanguage_flags li').removeClass('active');
		var $li = $(this)
		$li.addClass('active');
		var imgSrc = $li.children().find('img').attr('src');
		var alt = $li.children().find('img').attr('alt');
		var dataLang = $li.children().find('img').attr('data-language');

		$('#userinfo_lang').attr('src' , imgSrc).attr('alt' , alt).attr('data-language', dataLang);
		$('#header_lang_span').text(alt);
		
		
		// hideLoading();
		
	});
	
}

function getAvailLanguagesForLanguageDOM(availLanguageObj){

	var selectedCompanyCode = $("#language_country_selected_img").attr("data-company-code");
	if(selectedCompanyCode == undefined){
		selectedCompanyCode = $.sessionStorage.get("COMPANY_CODE");
	}
	
	LEGAL["COMPANY_CODE"] = selectedCompanyCode; // for edds-legal-text.js
	
	var h = "";
	h += '                            	<label class="col-sm-4 control-label"> <i class="fa fa-language"></i> '+i18n_master.getText('LBL_LANGUAGE')+' </label>';
	h += '                                <div class="col-sm-8" style="padding-top: 7px;">';
	h += '        							<div class="dropdown ">';
	h += '            							<a href="#" class="dropdown-toggle" data-toggle="dropdown"> <img id="userinfo_lang" src="/com.kme.edds.resources/img/flags/en.png" data-language="" alt="United-Kingdom"> <span id="header_lang_span"> English</span> <i class="fa fa-angle-down"></i> </a>';
	h += '            							<ul id="multilanguage_flags" class="dropdown-menu">';
	if(!$.isEmptyObject(availLanguageObj)){
		Object.keys(availLanguageObj).map(function(key) {

			var activeClass = "";					
			if(key == $.sessionStorage.get("LANGUAGE") ) {
				activeClass = "active";
				selectedFlagKey = key;
				selectedFlagName = availLanguageObj[key];
			}
			
			var convertFlagName = getConvertFlagName(key);
			
			// console.log($.sessionStorage.get("LANGUAGE"));
			// console.log(key);
			// console.log("companyCode : " + selectedCompanyCode + " convertFlagName : " + convertFlagName);

/*
			if(
				selectedCompanyCode != "" 
				&& selectedCompanyCode != "KB01" // KME
				&& selectedCompanyCode != "KB02" // KMUK
				&& selectedCompanyCode != "KB11" // KMIE
			){
				if(key == "en"){
					return true; //continue;
				}
			}
*/			

			h += '                					<li role="presentation" class="'+activeClass+'"><a href="javascript:void(0);"><img src="/com.kme.edds.resources/img/flags/'+convertFlagName+'.png" data-language="'+key+'" alt="'+availLanguageObj[key]+'"> '+availLanguageObj[key]+'</a></li>';
		});
	}
	h += '           								</ul>';
	h += '        							</div>';
	h += '                                </div>';
	
	return h;
}
