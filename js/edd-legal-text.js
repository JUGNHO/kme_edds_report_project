var _SYSTEM_INDEX = "PPE";
var _appendix_flag = '';

function showPolicy(){
	$('#policy').fadeToggle();
}

function closePolicy(){
	$('#policy').fadeOut();
}

function showAppendix(flag){
	$('div[data-appendix]').fadeOut();
	
	if(_appendix_flag != flag){
		$('div[data-appendix='+flag+']').fadeIn();	
	}
	
	_appendix_flag = flag;
}

function acceptPrivacyPolicy(){

	if(document.getElementById('accept_cookies').checked){
	
		$._CSRF.generationCSRFToken( "acceptUseCookies_" + $(this).attr('id') );
		
		$.ajax({
			url: "com.kme.edds.common.EDDSTermsofCondition",
			cache: false,
			type: "post",
			data:{ 
				prtmode: 'acceptTermsofCondition',
				flag: "", 
				dp_dtsg: $._CSRF.data.dp_dtsg,
				job_name: $._CSRF.data.job_name
			},
			//async: true,
			dataType: 'json',
			success: function(response) {
				if(response["TYPE"] == "S"){
					showDisclaimer("cookie");
				}else{
					swal(i18n_master.getText('MSG_FAILED'), i18n_master.getText('MSG_FAILED') + response["MESSAGE"], "error");
				}
			},
			error: function(xhr, status, error){
				if(xhr.getResponseHeader('content-type').startsWith("text/html")){	
					// alert(i18n_master.getText('MSG_FAILED') + " " + "Session Expired, please log on again.");
					// sessionExpiredLogout();
				}else{
					swal(i18n_master.getText('MSG_FAILED'), i18n_master.getText('MSG_FAILED_STATUS_CODE') + status + ", " + error , "error");
					hideLoading();
					console.log("acceptUseCookies()");
				}
			}
		});
		
	}else{
		
		$("#tick").show();
		
		/*
		//make logoffform append to body
		if ($('#logoffform').length == 0) {
			var h = [];
			h.push('<form name="logoffform" id="logoffform" style="display:none;position:absolute;top:-5000;left:-5000" method="POST">');
			h.push('<input type="hidden" name="logout_submit" value="true">');
			h.push('</form>');

			$(document.body).append(h.join(""));
		}
		swal({
			title: 'Logout message',
			text: 'Reject warning message in here for logout',
			type: "warning",
			showCancelButton: false,
			showLoaderOnConfirm: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: 'Yes', // "Yes, save it!"
			cancelButtonText: 'No', // "No, cancel!"
			closeOnConfirm: true,
			closeOnCancel: true
		},function(isConfirm) {
			if(isConfirm){
				try {
					if (opener) {
						opener.top.logoff();
						window.close();
					}else {
						submitLogout("/irj/servlet/prt/portal/prtroot/com.sap.portal.navigation.masthead.LogOutComponent");
					}
				} catch (e) {
					submitLogout("/irj/servlet/prt/portal/prtroot/com.sap.portal.navigation.masthead.LogOutComponent");
				}
			}else{
				loadTermsofCondition("default");
			}
		});
		*/
	}
}

function acceptUseCookies(isFlag){
	
	var language = $.sessionStorage.get("LANGUAGE");
	
	$._CSRF.generationCSRFToken( "acceptUseCookies_" + $(this).attr('id') );
	
	$.ajax({
		url: "com.kme.edds.common.EDDSTermsofCondition",
		cache: false,
		type: "post",
		data:{ 
			prtmode: 'acceptTermsofCondition',
			flag: "X", 
			selected_company_code: LEGAL["COMPANY_CODE"],
			selected_language: language,
			dp_dtsg: $._CSRF.data.dp_dtsg,
			job_name: $._CSRF.data.job_name
		},
		async: true,
		dataType: 'json',
		success: function(response) {

			console.log(response);
			
			if(response["TYPE"] == "S"){
				
				// user data
				var userObject = response["USER_INFO"];
				var userType = userObject.ZDEALFLAG;
				
				var moveToDetailPage = function(){
		
					// parameter object
					var params = {
						company_code: userObject["BUKRS"],
						person_code: userObject["ZPRSNN"],
						partner_code: userObject["ZPTNR"],
						user_type: userObject["ZDEALFLAG"],
						sap_dealer_code: userObject["ZDEALERN"],
						partner_type: userObject["ZPTNRTP"],
						return_url: ""
					}
		
					var url = "com.kme.edds.admin.UserControl";
					if(userType == "D"){
						params.return_url = "com.kme.edds.dealer.employee.DealerEmployeeList"
					}else{
						params.return_url = "com.kme.edds.admin.UserManagement"								
					}
		
					Form.submit(url , params);
					
				}
				
				// EDDS-1045 User manual pop-up
				
					
				$('#modal_termsofcondition').modal('hide');
				$('.modal-backdrop').remove();
				
				var storage = $.sessionStorage;
				// get Data for first time check
				var disclaimerFlag = storage.get('DISCLAIMER');
				// store to storage disclaimer flag
				storage.set('DISCLAIMER', 'X');

				// first logon
				if(disclaimerFlag == "" || isFlag == "true" || isFlag == "openModal"){
					
					var selRoleGroup = 'RGROUP03';
					var selCompanyCode = 'KB01';
					if($.sessionStorage.get('USER_INFO') != null && $.sessionStorage.get('USER_INFO') != undefined){
						selRoleGroup = $.sessionStorage.get('USER_INFO').ROLE.M0001.ZROLEGRP;
						selCompanyCode = $.sessionStorage.get('USER_INFO').BUKRS;
					}
					
					swal({
	                    title: i18n_master.getText('LBL_WOULD_YOU_LIKE_TO_DOWNLOAD'),
	                    text: i18n_master.getText('LBL_PLEASE_NOTE_THAT_THE_USER_') + '<br><br> '
	                    	+ '<div class="form-group" id="available_language_area_usermanual"></div>'
	                    	,
	                    type: "info",
	                    confirmButtonText: 'Download User manual',
	                    confirmButtonColor: "#05141f",
	                    showCancelButton: true,
	                    cancelButtonText: '',
						closeOnConfirm: true,
						closeOnCancel: true,
						html: true
	                },
	                function(isConfirm) {
	                	
	                    if (isConfirm) {
	                    	
	                    	var selectedLang = $('#userinfo_lang_usermanual').attr('data-language');
	                    	console.log('selectedLang : '  + selectedLang);
	                    	
	                    	var componentUrl = '/com.kme.edds.pdf/pdfjs/web';
	                    	// download default permission (Dealer)
	                    	var fielName = 'EDDS Dealer Admin User Manual.pdf';
	                    	
	                    	var url = componentUrl + '/' + fielName;
	                    	
	                    	/*
	                    	if(selRoleGroup == "RGROUP01"){
		                    	//fielName = 'EDDS_User_Manual_Final_211117.pdf';
	                    		fielName = 'EDDS Dealer Admin User Manual.pdf';
		                    	url = componentUrl + '/' + fielName;
	        				}else if(selRoleGroup == "RGROUP02"){
	        					//fielName = 'EDDS_NSC_Admin_User_Manual_bme_v2_TEST.pdf';
	        					fielName = 'EDDS Dealer Admin User Manual.pdf';
		                    	url = componentUrl + '/' + fielName;
	        				}else if(selRoleGroup == "RGROUP03"){
	        					
	        					
	        					// fielName = 'EDDS_Dealer_Admin_User_Manual_DRAFT_v2.pdf';
	        					fielName = 'EDDS Dealer Admin User Manual.pdf';
	        					
	        					/*
	        					// alert('companyCode : ' + companyCode);
	        					// KDE case
	        					if(selCompanyCode == 'KB03'){
	        						if(selectedLang == "de"){
		        						fielName = 'EDDS Dealer Admin KDE.pdf';
		        					}	
	        					}
	        					// KBL case
	        					if(selCompanyCode == 'KB06'){
	        						if(selectedLang == "de"){
		        						fielName = 'EDDS Dealer Admin KDE.pdf';
		        					}	
	        					}
	        					// KPL case
	        					if(selectedLang == "pl"){
	        						fielName = 'EDDS Dealer Admin KPL.pdf';
	        					}
	        					* /
	        					
		                    	
	        				}
	                    	*/
	                    	
	                    	downloadUserManualFile(url, fielName);
	                    	
	                    	if(isFlag != 'openModal'){
	                    		moveToDetailPage();	
	                    	}
	                    	
	                    }else{
	                    	if(isFlag != 'openModal'){
	                    		moveToDetailPage();	
	                    	}
	                    }
	                });

					var selectedAvailLanguage = response["AVAIL_LANGUAGE"];
					var company = response["COMPANY"];
					
					// re rendering selectedCompany's language
					$('#available_language_area_usermanual').html(getAvailLanguagesDOMUserManual(selectedAvailLanguage));
					
					// 
					bindAvailLanguagesEventUserManual();
					
					
					if(selRoleGroup == "RGROUP01"){
						
    				}else if(selRoleGroup == "RGROUP02"){
    					
    				}else if(selRoleGroup == "RGROUP03"){
    					
    					// KDE case default Language
    					if(company == "KB03"){
    						setDefaultLanguageUserManual("de", selectedAvailLanguage["de"]);
    					}
    					// KBL case default Language
    					if(company == "KB06"){
    						setDefaultLanguageUserManual("de", selectedAvailLanguage["de"]);
    					}
    					// KPL case default Language
    					if(company == "KA02"){
    						setDefaultLanguageUserManual("pl", selectedAvailLanguage["pl"]);
    					}
    					
    				}
					
				}else{
					// document.location.reload();
				}
				 // end EDDS-1045 
				
			}else{
				swal(i18n_master.getText('MSG_FAILED'), i18n_master.getText('MSG_FAILED') + response["MESSAGE"], "error");
			}
		},
		error: function(xhr, status, error){
			if(xhr.getResponseHeader('content-type').startsWith("text/html")){	
				// alert(i18n_master.getText('MSG_FAILED') + " " + "Session Expired, please log on again.");
				// sessionExpiredLogout();
			}else{
				swal(i18n_master.getText('MSG_FAILED'), i18n_master.getText('MSG_FAILED_STATUS_CODE') + status + ", " + error , "error");
				hideLoading();
				console.log("acceptUseCookies()");
			}
		}
	});
	
}

function bindAvailLanguagesEventUserManual(){
	
	/*
	$('#available_language_area_usermanual .dropdown-toggle').on('click', function(){
	    $(this).addClass('hide');
	});
	*/
	
	$('#multilanguage_flags_usermanual li').each(function(idx, item){
		
		var $li = $(this);
	
		if( $li.attr("class") == "active" ){
			var imgSrc = $li.children().find('img').attr('src');
			var alt = $li.children().find('img').attr('alt');
			var dataLang = $li.children().find('img').attr('data-language');

			$('#userinfo_lang_usermanual').attr('src' , imgSrc).attr('alt' , alt).attr('data-language', dataLang);
			$('#header_lang_span_usermanual').text(alt);
			
			return;
		}
	});

	$('#multilanguage_flags_usermanual li').on('click', function(){
		
		// $('#available_language_area_usermanual .dropdown-toggle').removeClass('hide')
		
		// showLoading();
		// 
		$('#multilanguage_flags_usermanual li').removeClass('active');
		var $li = $(this)
		$li.addClass('active');
		var imgSrc = $li.children().find('img').attr('src');
		var alt = $li.children().find('img').attr('alt');
		var dataLang = $li.children().find('img').attr('data-language');

		$('#userinfo_lang_usermanual').attr('src' , imgSrc).attr('alt' , alt).attr('data-language', dataLang);
		$('#header_lang_span_usermanual').text(alt);
		
		// hideLoading();
	});
	
}

var LEGAL = {
	COMPANY_CODE : ""
}
function loadTermsofCondition(actionFlag){
	$.ajax({
		url: "com.kme.edds.common.EDDSTermsofCondition",
		cache: false,
		type: "post",
		//async: false,
		dataType: 'json',
		success: function(data) {
		
			LEGAL["COMPANY_CODE"] = $.sessionStorage.get("COMPANY_CODE");
			// for NSC
			if($.isEmptyObject(LEGAL["COMPANY_CODE"]) || LEGAL["COMPANY_CODE"] == ""){
				
				LEGAL["COMPANY_CODE"] = data["COMPANY"]; 	
				// console.log(LEGAL["COMPANY_CODE"]);
			}

			var storage = $.sessionStorage;
			// clear DISCLAIMER
			storage.set('DISCLAIMER', '');
			
			var disclaimerValue = data["DISCLAIMER"];
			if(disclaimerValue != undefined && disclaimerValue != null){
			
				if(disclaimerValue == ""){
				
					var language = $.sessionStorage.get("LANGUAGE");
					
					// load for Flags
					$.ajax({
						type: "POST",
						url: "/com.kme.edds.script/json/subsidiary_flag.model.json",
						async: false ,
						cache: false ,
						dataType: 'json',
						success: function(flags) {
							var flagData = flags.flags;
							renderTermsofCondition(data, actionFlag, language, flagData);
						},
						error: function() {
							alert('error');
						}
					});
				
				}else{
					if(disclaimerValue == "X"){
						storage.set('DISCLAIMER', disclaimerValue);
					}else{
						storage.set('DISCLAIMER', '');
					}
				}
			}
		},
		error: function(xhr, status, error){
			if(xhr.getResponseHeader('content-type').startsWith("text/html")){	
				// alert(i18n_master.getText('MSG_FAILED') + " " + "Session Expired, please log on again.");
				// sessionExpiredLogout();
			}else{
				swal(i18n_master.getText('MSG_FAILED'), i18n_master.getText('MSG_FAILED_STATUS_CODE') + status + ", " + error , "error");
				hideLoading();
				console.log("loadTermsofCondition()");
			}
		}
	});
}

// flag 1 policy , 2 cookies
function showDisclaimer(actionFlag){

	// console.log(data);
	var language = $.sessionStorage.get("LANGUAGE");

	$.ajax({
		url: "com.kme.edds.common.EDDSTermsofCondition",
		data:{
			prtmode: "getTermsofCondition",
			selected_company_code: LEGAL["COMPANY_CODE"],
			selected_language: language
		},
		cache: false,
		type: "post",
		// async: false,
		dataType: 'json',
		success: function(data) {
		
			// console.log(data);
			// console.log("disclaimer Language : " + language);
			
			// load for Flags
			$.ajax({
				type: "POST",
				url: "/com.kme.edds.script/json/subsidiary_flag.model.json",
				async: false ,
				cache: false ,
				dataType: 'json',
				success: function(flags) {
					var flagData = flags.flags;
					renderTermsofCondition(data, actionFlag, language, flagData);
					//console.log(selectedCompanyCode);
					if( LEGAL["COMPANY_CODE"] == "KB03" ) { //&& ( _SYSTEM_INDEX == "PDE" || _SYSTEM_INDEX == "PQE") ) {
						$('#available_language_area').hide();
					}
					else {
						$('#available_language_area').show();
					}
				},
				error: function() {
					alert('error');
				}
			});
			
		},
		error: function(xhr, status, error){
			if(xhr.getResponseHeader('content-type').startsWith("text/html")){	
				// alert(i18n_master.getText('MSG_FAILED') + " " + "Session Expired, please log on again.");
				// sessionExpiredLogout();
			}else{
				swal(i18n_master.getText('MSG_FAILED'), i18n_master.getText('MSG_FAILED_STATUS_CODE') + status + ", " + error , "error");
				hideLoading();
				console.log("showDisclaimer()");
			}
		}
	});
}

function renderTermsofCondition(data, actionFlag, language, flags){

	//console.log("renderTermsofCondition");
	//console.log(data);
	//console.log(actionFlag);
	//console.log(language);
	//console.log(flags);

	try{
		//
		var availLanguageObj = data["AVAIL_LANGUAGE"];
		var notes = [];
		var h = [];

		h.push('<div class="modal fade " id="modal_termsofcondition" tabindex="-1" role="dialog"  data-backdrop="static" data-keyboard="false">');
		h.push('    <div class="modal-dialog modal-lg full-width">');
		h.push('        <div class="modal-content animated fadeIn">');
		h.push('            <div class="modal-header">');
		// actionFlag 1(Privacy Policy), actionFlag 2(Cookie), 
		h.push('                <h4 class="modal-title"></h4>');
		
		h.push('            </div>');
		h.push('            <div class="modal-body">');
		h.push('                <div class="panel panel-default">');
		h.push('                    <div class="panel-body">');
		h.push('                        <div class="form-horizontal">');

		if(data.COMPANY == "KB01"){
			
			h.push('                            <div class="form-group">');
			h.push('                                <label class="col-sm-6 control-label"> <i class="fa fa-flag"></i> '+i18n_master.getText('LBL_COUNTRY')+' </label>');
			h.push('                                <div class="col-sm-6" >');
			h.push('        							<div class="dropdown ">');
			h.push('            							<a href="#" class="dropdown-toggle" data-toggle="dropdown"> <img id="country_selected_img" alt="Kia EU" src="/com.kme.edds.resources/img/flags/32/KIA_LOGO.png" data-company-code="KB01" data-flag-name="Kia EU" data-flag-title="Kia EU"> <span id="country_header_lang_span_legalwaiver"> Kia EU </span></a>');
			h.push('            							<ul id="country_legalwaiver" class="dropdown-menu" style="overflow-y: auto;max-height: 400px;">');
			
			$(flags).each(function(idx, item) {
				var flagName = item.flagName;
				var flagTitle = item.flagTitle;
				var companyCode = item.companyCode;
				var flagActive = "";
				if(LEGAL["COMPANY_CODE"] == "" || LEGAL["COMPANY_CODE"] == "KB01"){
					if (companyCode == "KB01") {
						flagActive = "active"
					}
				}else{
					if (companyCode == LEGAL["COMPANY_CODE"]) {
						flagActive = "active"
					}
				}
				h.push('                						<li role="presentation" class="'+flagActive+'" data-company-code="'+companyCode+'" data-flag-name="'+flagName+'" data-flag-title="'+flagTitle+'"><a href="javascript:void(0);"><img src="/com.kme.edds.resources/img/flags/32/'+flagName+'.png"  alt="'+flagTitle+'"> '+flagTitle+'</a></li>');
			});

			h.push('           								</ul>');
			h.push('        							</div>');
			h.push('                                </div>');
			h.push('                            </div>');

		}
		
		// Available Language Set Area
//		if( LEGAL["COMPANY_CODE"] == "KB03") {  
//		}
//		else {
//			
//		}
		
		h.push('                            <div class="form-group" id="available_language_area">');
		h.push(									getAvailLanguagesDOM(availLanguageObj));
		h.push('                            </div>');
		
		// end of Available Language Set Area
	 
		h.push('<div id="content" style="display: block; visibility: visible">');
		h.push('    <div id="contentInfo">');
		if( LEGAL["COMPANY_CODE"] == "KB03") {
		//h.push('        <div style="position: relative;max-height: 550px;border: #ffdfdf;border-style: solid;border-width: 1px; padding-left:5px;padding-right:5px;">');
		h.push('        <div style="position: relative;max-height: 455px;border: #ffdfdf;border-style: solid;border-width: 1px; padding-left:5px;padding-right:5px;">');
		}else {
		h.push('        <div style="position: relative;max-height: 300px;border: #ffdfdf;border-style: solid;border-width: 1px; padding-left:5px;padding-right:5px;">');
		}
		//console.log(LEGAL["COMPANY_CODE"]);
		//console.log(_SYSTEM_INDEX);
		if( LEGAL["COMPANY_CODE"] == "KB03") { 
			if($.sessionStorage.get('SAPSYSTEMNAME') == "PDE" || $.sessionStorage.get('SAPSYSTEMNAME') == "PQE"){
				h.push('	<iframe name="privacyNoticeIframe" width="100%"  id="ifmPrivacyNoticeIframe" src="/irj/servlet/prt/portal/prtroot/com.hkm.common.privacy.PCPrivacyNoticePreview" frameborder="0" scrolling="no" style="padding: 5px 0px 0px 5px; -ms-overflow-x: hidden; -ms-overflow-y: hidden;min-height:290px;height:450px;"></iframe> ');
			}else{
				h.push('	<iframe name="privacyNoticeIframe" width="100%"  id="ifmPrivacyNoticeIframe" src="/irj/servlet/prt/portal/prtroot/com.hkm.common.privacy.PCPrivacyNoticeKMD" frameborder="0" scrolling="no" style="padding: 5px 0px 0px 5px; -ms-overflow-x: hidden; -ms-overflow-y: hidden;min-height:290px;height:450px;"></iframe> ');		
			}
		}
		else {
		h.push(data["LEGAL_PRIVATE_NOTICE"]);
		}
		
		h.push('        </div>');
		h.push('        <div class="i-checks" style="padding:20px;">');
		h.push('            <label>');
		h.push('                <input type="radio" id="accept_cookies" name="accept_cookies" checked="true"> <i></i> &nbsp; I confirm to have read this information </label> <br>'); // I agree to the above privacy policy.
		// KMIT,KMD except
		
		/* 
		 * EDDS-601 
		 * 12.06.2020 BY Rodriguez Martiza
		if(LEGAL["COMPANY_CODE"] != "KB08" && LEGAL["COMPANY_CODE"] != "KB03"){
			h.push('        <label>');
			h.push('            <input type="radio" id="reject_cookies" name="accept_cookies"> <i></i> &nbsp; ' + i18n_master.getText('LBL_I_DISAGREE_WITH_THE_ABOVE_') + ' </label>'); // I disagree with the above privacy policy and understand that I will now be logged out of the system.
		}
		*/
		h.push('        </div>');
		
		// KMIT except DOWNLOADLINK
		if(LEGAL["COMPANY_CODE"] == "KB08"){
			h.push('    <div>');
			h.push('       	<ul>');
			//h.push('       		<li><a href="/com.kme.edds.common/files/INFORMATIVA_PRIVACY_DIPENDENTI_CONCESSIONARIE.pdf" target="_blank"> PRIVACY POLICY DOWNLOAD</a></li>');
			//EDDS-231
			//
			//if($.sessionStorage.get('SAPSYSTEMNAME') == "PDE" || $.sessionStorage.get('SAPSYSTEMNAME') == "PQE"){
				h.push('       		<li><a href="/com.kme.edds.common/files/privacy_2021_C.I._ver3.pdf" target="_blank">'+ i18n_master.getText('LBL_PRIVACY_POLICY_DEALERS_EMP') +'</a></li>');
			//}else{
			//	h.push('       		<li><a href="/com.kme.edds.common/files/INFORMATIVA_UNICA_042019.pdf" target="_blank">'+ i18n_master.getText('LBL_PRIVACY_POLICY_DEALERS_EMP') +'</a></li>');	
			//}
			
			h.push('       	</ul>');
			h.push('    </div>');
		}
		
		// KMIT except
		if(LEGAL["COMPANY_CODE"] != "KB08" && LEGAL["COMPANY_CODE"] != "KB03"){
			h.push('    <div>');
			h.push('       	<ul>');
			//h.push('       		<li><a onclick="showEDDSPolicy();" href="#"> ' + i18n_master.getText('LBL_APPENDIX_EDDS_DEALER') + ' </a></li>');
			h.push('       		<li><a onclick="showAppendix(\'EDDS\');" href="#"> ' + i18n_master.getText('LBL_APPENDIX_EDDS') + ' </a></li>');
			h.push('       		<li><a onclick="showAppendix(\'KDA\');" href="#"> ' + i18n_master.getText('LBL_APPENDIX_KDA_DEALER') + ' </a></li>');
			h.push('       		<li><a onclick="showAppendix(\'MYSERVICE\');" href="#"> ' + i18n_master.getText('LBL_APPENDIX_MYSERVICE') + ' </a></li>');
			h.push('       		<li><a onclick="showAppendix(\'HEREMAP\');" href="#"> ' + i18n_master.getText('LBL_APPENDIX_HERERMAP') + ' </a></li>');
			h.push('       		<li><a onclick="showAppendix(\'DDMS_GWMS\');" href="#"> ' + i18n_master.getText('LBL_APPENDIX_DDMS_GWMS') + ' </a></li>');
			h.push('       	</ul>');
			h.push('    </div>');
		}
	
		// EDDS Policy Here!!!
		h.push('    <div data-appendix="EDDS" style="display: none;">');
		h.push(			data["EDDS_POLICY_TEXT"]);
		h.push('    </div>');
		// KDA Policy Here!!!
		h.push('    <div data-appendix="KDA" style="display: none;">');
		h.push(			data["KDA_POLICY_TEXT"]);
		h.push('    </div>');
		// MYSERVICE Policy Here!!!
		h.push('    <div data-appendix="MYSERVICE" style="display: none;">');
		h.push(			data["MYSERVICE_POLICY_TEXT"]);
		h.push('    </div>');
		// HERERMAP Policy Here!!!
		h.push('    <div data-appendix="HEREMAP" style="display: none;">');
		h.push(			data["HERERMAP_POLICY_TEXT"]);
		h.push('    </div>');
		// HERERMAP Policy Here!!!
		h.push('    <div data-appendix="DDMS_GWMS" style="display: none;">');
		h.push(			data["DDMS_GWMS_POLICY_TEXT"]);
		h.push('    </div>');
		
		// EDDS Policy Table Here!!!
		h.push('    <div>');
		h.push('	<br>');
		h.push('	<p>Contact Details</p>');
		h.push('	<table class=\"table table-bordered table-hover\">');
		h.push('    	<tbody>');
		h.push('        	<tr>');
		h.push('            	<th style=\"background: #05141F;color: #fff;\" width=\"20%\">Contact Details</th>');
		h.push('            	<th style=\"background: #05141F;color: #fff;\" width=\"20%\">Email</th>');
		h.push('            	<th style=\"background: #05141F;color: #fff;\" width=\"30%\">Postal Address</th>');
		h.push('        	</tr>');
		
		var nscList = data["EDDS_POLICY_TABLE_INFO"].ZNSC;
		
		$(nscList).each(function(idx, item){
			if(LEGAL["COMPANY_CODE"] == item['BUKRS']){
				h.push('        	<tr>');
				h.push('            	<td>NSC</td>');
				h.push('            	<td>'+item['ZCODET']+'</td>');
				h.push('            	<td>'+item['ZINFO1']+''+item['ZINFO2']+'</td>');
				h.push('        	</tr>');			
			}
			
		});
		
		var dpoList = data["EDDS_POLICY_TABLE_INFO"].ZDPO;
		
		$(dpoList).each(function(idx, item){
			if(LEGAL["COMPANY_CODE"] == item['BUKRS']){
				h.push('        	<tr>');
				h.push('            	<td>DPO</td>');
				h.push('            	<td>'+item['ZCODET']+'</td>');
				h.push('            	<td>'+item['ZINFO1']+''+item['ZINFO2']+'</td>');
				h.push('        	</tr>');
			}
		});

		h.push('    	</tbody>');
		h.push('	</table>');
		h.push('	<p></p>');
		
		
		//h.push(			data["EDDS_POLICY_TABLE_TEXT"]);
		h.push('    </div>');

		h.push('        <div id="tick" style="display: none;">');
		h.push('            <h3 style="font-style: italic;"></h3>');
		h.push(				i18n_master.getText('LBL_YOU_MUST_CHECK_THE_I_AGREE')); // You must check the 'I agree to the above privacy policy.' box to accept.
		h.push('        </div>&nbsp;');
		h.push('    </div>');
		
		// Cookies Here!!!
		h.push('   <div id="cookies" style="display: none;">');
		h.push(			data["COOKIES_TEXT"]);
		h.push('   </div>');
		h.push('</div>');
	
		h.push('                        </div>');
		h.push('                    </div>');
		h.push('                </div>');
		h.push('            </div>');
		
		h.push('            <div class="modal-footer">');
		h.push('                <button type="button" class="btn btn-primary hide" onclick="acceptPrivacyPolicy();" id="modal_btn_accept_privacy_policy"><i class="fa fa-check-square-o"></i> ' + i18n_master.getText('LBL_CONTINUE') + '</button>'); // Accept
		h.push('                <button type="button" class="btn btn-primary hide" data-dismiss="modal" onclick="acceptUseCookies();" id="modal_btn_accept_cookie"><i class="fa fa-check-square-o"></i> ' + i18n_master.getText('LBL_CONTINUE') + '</button>'); // Accept
		
		// EDDS-1045
		if(_SYSTEM_INDEX == 'PDE'){
		h.push('                <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="acceptUseCookies(\'true\');" id="test_manual_btn" ><i class="fa fa-check-square-o"></i> TEST USER MANUAL PROCESS</button>'); // Accept
		}
		h.push('            </div>');
		h.push('        </div>');
		h.push('    </div>');
		h.push('</div>');
		
		if($('#modal_termsofcondition') && $('#modal_termsofcondition').length >= 1 ){
			$('#modal_termsofcondition').remove();
		}
		$(document.body).append(h.join(""));
		
		$($("#contentInfo").find("div")[0]).slimscroll({
			height: '100%',
			railOpacity: 0.9
		});
	
		//console.log("actionFlag : " + actionFlag);
		//if (typeof callbackFunction == 'function'){
		//	callbackFunction();
		//}
		
		setTimeout(function(){
			$('#modal_termsofcondition').modal("show");
			// buttons hide
			$("#modal_termsofcondition").find("button").addClass("hide");
			
			// EDDS-1045
			//if(_SYSTEM_INDEX == 'PDE'){
			$('#test_manual_btn').removeClass('hide');
			//}
			
			if(actionFlag == "default"){
				$("#contentInfo").show();
				$("#cookies").hide();
				$("#modal_termsofcondition").find("h4").text(i18n_master.getText('LBL_PRIVACY_POLICY')); // LBL_PRIVACY_POLICY
				$("#modal_btn_accept_privacy_policy").removeClass("hide");
				
			}else if(actionFlag == "cookie"){
				
				// show hide area
				$("#cookies").show();
				$("#contentInfo").hide();
				// set Text 
				$("#modal_termsofcondition").find("h4").text(i18n_master.getText('LBL_COOKIES_VIEW'));
				// remove Class
				$("#modal_btn_accept_privacy_policy").addClass("hide");
				$("#modal_btn_accept_cookie").removeClass("hide");
				
			}else if(actionFlag == "policy"){
				// show hide area
				$("#contentInfo").show();
				$("#cookies").hide();
				
				$("#modal_termsofcondition").find("h4").text(i18n_master.getText('LBL_PRIVACY_POLICY'));
				$("#modal_btn_accept_cookie").addClass("hide");
				$("#modal_btn_accept_privacy_policy").removeClass("hide");
			}

			if( LEGAL["COMPANY_CODE"] == "KB03") {				 
				
				$("#ifmPrivacyNoticeIframe").contents().find(".modal-header").hide();
				$("#ifmPrivacyNoticeIframe").contents().find(".modal-footer").hide();
				$("#ifmPrivacyNoticeIframe").contents().find(".modal-body").css({"padding-top":"0px"});
				$("#ifmPrivacyNoticeIframe").contents().find("#pre-scrollable").css({"height":"584px"});

				$("#ifmPrivacyNoticeIframe").contents().find(".text-warning").hide();
				$("#ifmPrivacyNoticeIframe").contents().find("#contentInfo").find("div").css({'max-height':'550px'});
				//
				$("#ifmPrivacyNoticeIframe").contents().find("#pdf_frame").css({'height':'445px'});
				$("#ifmPrivacyNoticeIframe").contents().find(".modal-body").find("table").css({'height':'450px'});

				$('#modal_termsofcondition .modal-body').css({"padding-bottom":"0px"});
				$('#modal_termsofcondition .panel-body').css({"padding-bottom":"0px"});
				
			}
			
			
			
			
		}, 3000);
		
		
		$('.i-checks').iCheck({
			checkboxClass: 'icheckbox_square-green',
			radioClass: 'iradio_square-green',
		});
		
		// when browser refresh and then 
		$('#country_legalwaiver li').each(function(idx, item){
			var $li = $(this);
		
			if( $li.attr("class") == "active" ){
				
				var imgSrc = $li.children().find('img').attr('src');
				var alt = $li.children().find('img').attr('alt');
	
				var flagTitle = $li.attr('data-flag-title');
				var flagName = $li.attr('data-flag-name');
				var selectedCompanyCode = $li.attr('data-company-code');
				
				//
				$('#country_header_lang_span_legalwaiver').text(flagTitle);
				// change select country info
				$('#country_selected_img')
					.attr('src', imgSrc)
					.attr('alt', alt)
					.attr('data-flag-title', flagTitle)
					.attr('data-flag-name', flagName)
					.attr('data-company-code', selectedCompanyCode);
				
				return;
			}
		});

		$('#country_legalwaiver li').on('click', function(){
			
			//showLoading();
			
			// inactive all li dom
			$('#country_legalwaiver li').removeClass('active');
			
			var $li = $(this);
			$li.addClass('active');
			var imgSrc = $li.children().find('img').attr('src');
			var alt = $li.children().find('img').attr('alt');

			var flagTitle = $li.attr('data-flag-title');
			var flagName = $li.attr('data-flag-name');
			var selectedCompanyCode = $li.attr('data-company-code');
			
			//
			$('#country_header_lang_span_legalwaiver').text(flagTitle);
			// change select country info
			$('#country_selected_img')
				.attr('src', imgSrc)
				.attr('alt', alt)
				.attr('data-flag-title', flagTitle)
				.attr('data-flag-name', flagName)
				.attr('data-company-code', selectedCompanyCode);
		    
		    // stored global variable
		    LEGAL["COMPANY_CODE"] = selectedCompanyCode;
		    
		    console.log(LEGAL["COMPANY_CODE"]);
		    
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
					
					$('#available_language_area').html(getAvailLanguagesDOM(selectedAvailLanguage));
					// event re bind 
					bindAvailLanguagesEvent(actionFlag);
					
					//
					if(selectedCompanyCode == 'KB01'){
						
						// set default when user click the KME to English
						// EDDS-601 Exceptional Case
						$('#multilanguage_flags_legalwaiver li').removeClass('active');
						$('#multilanguage_flags_legalwaiver li').find('[data-language=en]').closest('li').addClass('active');
			    		
			    		$('#userinfo_lang_legalwaiver')
				    		.attr('src' , '/com.kme.edds.resources/img/flags/en.png')
				    		.attr('alt' , 'English')
				    		.attr('data-language', 'en');
						$('#header_lang_span_legalwaiver').text('English');
					    
					    // store language to client localStorage
						var selectedLang = $('#userinfo_lang_legalwaiver').attr('data-language');
						$.sessionStorage.set("LANGUAGE" , selectedLang);
						
						setUserLanguage(selectedLang,actionFlag);
						return;
						
						/*
				    	if($('#header_lang_span_legalwaiver').text() != 'English'){
				    	
				    		
				    	}else{
				    		$('#multilanguage_flags_legalwaiver li').trigger('click');
				    	}
				    	*/
						
					}else if($("#multilanguage_flags_legalwaiver li").length > 0){
						$('#multilanguage_flags_legalwaiver li').trigger('click');
					}else if($("#multilanguage_flags_legalwaiver li").length == 0){
						showDisclaimer(actionFlag);
					}else 
					//
					hideLoading();

					// console.log(selectedCompanyCode);
					if( selectedCompanyCode == "KB03") { // && ( _SYSTEM_INDEX == "PDE" || _SYSTEM_INDEX == "PQE") ) {
						$('#available_language_area').hide();
					}
					else {
						$('#available_language_area').show();
					}
					
				},error: function(xhr, status, error){
					if(xhr.getResponseHeader('content-type').startsWith("text/html")){	
						// alert(i18n_master.getText('MSG_FAILED') + " " + "Session Expired, please log on again.");
						// sessionExpiredLogout();
					}else{
						swal(i18n_master.getText('MSG_FAILED'), i18n_master.getText('MSG_FAILED_STATUS_CODE') + status + ", " + error , "error");
						hideLoading();
						console.log("country_legalwaiver li click");
					}
				}
			});
		    
		});
		
		bindAvailLanguagesEvent(actionFlag);
		
	}catch(e){
		console.log(e);
	}
	
}

function getAvailLanguagesDOM(availLanguageObj){
	var h = "";
	h += '                            	<label class="col-sm-6 control-label"> <i class="fa fa-language"></i> '+i18n_master.getText('LBL_LANGUAGE')+' </label>';
	h += '                                <div class="col-sm-6" style="padding-top: 7px;">';
	h += '        							<div class="dropdown ">';
	h += '            							<a href="#" class="dropdown-toggle" data-toggle="dropdown"> <img id="userinfo_lang_legalwaiver" src="/com.kme.edds.resources/img/flags/en.png" data-language="" alt="United-Kingdom"> <span id="header_lang_span_legalwaiver"> English</span> <i class="fa fa-angle-down"></i> </a>';
	h += '            							<ul id="multilanguage_flags_legalwaiver" class="dropdown-menu">';
	if(!$.isEmptyObject(availLanguageObj)){
		Object.keys(availLanguageObj).map(function(key) {

			var activeClass = "";					
			if(key == $.sessionStorage.get("LANGUAGE") ) {
				activeClass = "active";
				selectedFlagKey = key;
				selectedFlagName = availLanguageObj[key];
			}
			
			var convertFlagName = getConvertFlagName(key);
			
			// console.log("companyCode : " + LEGAL["COMPANY_CODE"] + " convertFlagName : " + convertFlagName);

			if(
				LEGAL["COMPANY_CODE"] != "" 
				&& LEGAL["COMPANY_CODE"] != "KB01" // KME
				&& LEGAL["COMPANY_CODE"] != "KB02" // KMUK
				&& LEGAL["COMPANY_CODE"] != "KB11" // KMIE
			){
				if(key == "en"){
					return true; //continue;
				}
			}

			h += '                					<li role="presentation" class="'+activeClass+'"><a href="javascript:void(0);"><img src="/com.kme.edds.resources/img/flags/'+convertFlagName+'.png" data-language="'+key+'" alt="'+availLanguageObj[key]+'"> '+availLanguageObj[key]+'</a></li>';
		});
	}
	h += '           								</ul>';
	h += '        							</div>';
	h += '                                </div>';
	
	return h;
}

function setDefaultLanguageUserManual(languageKey,languageText){
	
	$('#userinfo_lang_usermanual')
		.attr('src' , '/com.kme.edds.resources/img/flags/'+languageKey+'.png')
		.attr('alt' , languageText)
		.attr('data-language', languageKey);
	$('#header_lang_span_usermanual').text(languageText);
	
}

function getAvailLanguagesDOMUserManual(availLanguageObj){
	
	var roleGroup = 'RGROUP03';
	if($.sessionStorage.get('USER_INFO') != null && $.sessionStorage.get('USER_INFO') != undefined){
		roleGroup = $.sessionStorage.get('USER_INFO').ROLE.M0001.ZROLEGRP;
	}
	
	var selectedCompanyCode = $("#language_country_selected_img").attr("data-company-code");
	if(selectedCompanyCode == undefined){
		selectedCompanyCode = $.sessionStorage.get('USER_INFO').BUKRS;
	}
	
	LEGAL["COMPANY_CODE"] = selectedCompanyCode; // for edds-legal-text.js
	
	var h = "";
	h += '                            	<label class="col-sm-6 control-label"> <i class="fa fa-language"></i> '+i18n_master.getText('LBL_LANGUAGE')+' </label>';
	h += '                                <div class="col-sm-6" style="padding-top: 7px;">';
	h += '        							<div class="dropdown ">';
	h += '            							<a href="#" class="dropdown-toggle" data-toggle="dropdown"> <img id="userinfo_lang_usermanual" src="/com.kme.edds.resources/img/flags/en.png" data-language="" alt="United-Kingdom"> <span id="header_lang_span_usermanual"> English</span> <i class="fa fa-angle-down"></i> </a>';
	h += '            							<ul id="multilanguage_flags_usermanual" class="dropdown-menu" style="position: relative;">';
	h += '                							<li role="presentation" ><a href="javascript:void(0);"><img src="/com.kme.edds.resources/img/flags/en.png" data-language="en" alt="English"> English</a></li>';
	if(!$.isEmptyObject(availLanguageObj)){
		Object.keys(availLanguageObj).map(function(key) {
			
			console.log('selectedCompanyCode : ' + selectedCompanyCode + ' key : ' + key);
			
			if(roleGroup == "RGROUP01"){
				//if( !(key == "en") ){
					return;
				//}
			}else if(roleGroup == "RGROUP02"){
				//if( !(key == "en") ){
					return;
				//}
			}else if(roleGroup == "RGROUP03"){
				if( 
					!(
						(key == "de" && selectedCompanyCode == 'KB03')
						|| (key == "de" && selectedCompanyCode == 'KB06')
						|| key == "pl"
					) 
				){
					return;
				}
			}
			
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

function getConvertFlagName(languageKey){
	var flagName = languageKey;
	// Irenland
	if("KB11" == LEGAL["COMPANY_CODE"]){
		if("en" == languageKey){
			flagName = "16/Ireland";
		}
	}
	// Austria
	else if("KB07" == LEGAL["COMPANY_CODE"]){
		if("de" == languageKey){
			flagName = "16/Austria";
		}
	}
	// Belgium
	else if("KB06" == LEGAL["COMPANY_CODE"]){
		if("nl" == languageKey || "fr" == languageKey){
			flagName = "16/Belgium";
		}
	}
	
	return flagName;

}

function bindAvailLanguagesEvent(actionFlag){

	// console.log('actionFlag : ' + actionFlag);
	
	$('#multilanguage_flags_legalwaiver li').each(function(idx, item){
	
		var $li = $(this);
	
		if( $li.attr("class") == "active" ){
			var imgSrc = $li.children().find('img').attr('src');
			var alt = $li.children().find('img').attr('alt');
			var dataLang = $li.children().find('img').attr('data-language');
		        
			$('#userinfo_lang_legalwaiver').attr('src' , imgSrc).attr('alt' , alt).attr('data-language', dataLang);
			$('#header_lang_span_legalwaiver').text(alt);
			
			return;
		}
	});

	$('#multilanguage_flags_legalwaiver li').on('click', function(){
	
		//showLoading();
		
		// 
		$('#multilanguage_flags_legalwaiver li').removeClass('active');
		var $li = $(this)
		$li.addClass('active');
		var imgSrc = $li.children().find('img').attr('src');
		var alt = $li.children().find('img').attr('alt');
		var dataLang = $li.children().find('img').attr('data-language');
	        
		$('#userinfo_lang_legalwaiver').attr('src' , imgSrc).attr('alt' , alt).attr('data-language', dataLang);
		$('#header_lang_span_legalwaiver').text(alt);
	    
	    // store language to client localStorage
		var selectedLang = $('#userinfo_lang_legalwaiver').attr('data-language');
		$.sessionStorage.set("LANGUAGE" , selectedLang);
		
		console.log("LEGAL[\"COMPANY_CODE\"] : " + LEGAL["COMPANY_CODE"] + 'selectedLang :' + selectedLang);
		
		setUserLanguage(selectedLang,actionFlag);
	});
	
}

function setUserLanguage(selectedLang,actionFlag){

	$._CSRF.generationCSRFToken( "SetUserLanguage" + $(this).attr('id') );
	
	// store server session language key
	$.ajax({
		url: 'com.kme.edds.common.EDDSUserInfo'
		,data:{ 
			prtmode: 'setUserLanguage',
			selected_company_code: LEGAL["COMPANY_CODE"],
			lang: selectedLang,
			dp_dtsg: $._CSRF.data.dp_dtsg,
			job_name: $._CSRF.data.job_name
		}
		,cache: false
		,type: "post"
		,async: false
		,dataType: 'json'
		,success: function(data) {
			
			console.log('setUserLanguage');
			
			//
			$.sessionStorage.set('edds_labels', data);

			$('#modal_termsofcondition').remove();
			$('.modal-backdrop').remove();
			$('body').removeClass("modal-open");
			
			showDisclaimer(actionFlag);
			
		},error: function(xhr, status, error){
			if(xhr.getResponseHeader('content-type').startsWith("text/html")){	
				// alert(i18n_master.getText('MSG_FAILED') + " " + "Session Expired, please log on again.");
				// sessionExpiredLogout();
			}else{
				swal(i18n_master.getText('MSG_FAILED'), i18n_master.getText('MSG_FAILED_STATUS_CODE') + status + ", " + error , "error");
				hideLoading();
				console.log("multilanguage_flags_legalwaiver li click");
			}
		}
	});
}

/* Helper function */
function downloadUserManualFile(fileURL, fileName) {
	// for non-IE
	if (!window.ActiveXObject) {
	    var save = document.createElement('a');
	    save.href = fileURL;
	    save.target = '_blank';
	    var filename = fileURL.substring(fileURL.lastIndexOf('/')+1);
	    save.download = fileName || filename;
	       if ( navigator.userAgent.toLowerCase().match(/(ipad|iphone|safari)/) && navigator.userAgent.search("Chrome") < 0) {
	            document.location = save.href; 
	// window event not working here
	        }else{
	            var evt = new MouseEvent('click', {
	                'view': window,
	                'bubbles': true,
	                'cancelable': false
	            });
	            save.dispatchEvent(evt);
	            (window.URL || window.webkitURL).revokeObjectURL(save.href);
	        }   
	}
	
	// for IE < 11
	else if ( !! window.ActiveXObject && document.execCommand)     {
	    var _window = window.open(fileURL, '_blank');
	    _window.document.close();
	    _window.document.execCommand('SaveAs', true, fileName || fileURL)
	    _window.close();
	}
}
