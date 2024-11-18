
var showEDDSUserInfo = function(){

	$.ajax({
		url: 'com.kme.edds.common.EDDSUserInfo?prtmode=getUserInfo'
		,cache: false
		,type: "post"
		,dataType: 'json'
		,success: function(data) {
			//console.log(data);
			renderUserInfo(data)			
		},error: function(xhr, status, error){
			if(xhr.getResponseHeader('content-type').startsWith("text/html")){	
				// alert(i18n_master.getText('MSG_FAILED') + " " + "Session Expired, please log on again.");
				// sessionExpiredLogout();
			}else{
				swal(i18n_master.getText('MSG_FAILED'), i18n_master.getText('MSG_FAILED_STATUS_CODE') + status + ", " + error , "error");
				hideLoading();
				
			}
		}
	});
	
}

/**
 * Render User Info
 * */
function renderUserInfo(data){
	
	//console.log(data);
	
	if($("#modal_user_info").length == 0){
		
/********************************************************************
****		ZPRSNN                         1000000270
****		ZDEALERN                       00516
****		BUKRS                          KA02
****		ZPTNR                          1000000130
****		ZPOTALID                       KMP051601
****		ZPERSONTYPE                    TP001
****		ZGEND                          M
****		ZPTITLE                        TT008
****		ZUFNAME                        CARSERWIS
****		ZUMNAME                        M
****		ZULNAME                        ŚRODULA
****		ZUANAME                        CARSERWIS, M, ŚRODULA
****		ZBEMAIL                        b@b.com
****		ZPEMAIL                        p@p.com
****		ZTELLAND                       49
****		ZTELNUMBER                     1500
****		ZBTELLAND                      49
****		ZBTELNUMBER                    2500
****		ZPTELLAND                      49
****		ZPTELNUMBER                    3500
****		ZBIRTH                         01.09.2016
****		ZPID                           01-40
****		DATAB                          07.09.2016
****		DATBI                          14.09.2016
****		ZCERTI                         SZPOT SP.
****		ZLANGUAGE                      PL
****		ZMCONTACT                      Y
****		ZOWNERPER                       0,00
****		ZPHOTPATH                      /common_edds
****		ZFILEN                         KMP051601_1473777462103_employee_1.jpeg
****		ZDEALFLAG                      D
****		ZUSTATUS                       A
****		ZMANAGER
****		BUKRS_T                        KMP
****		ZPTNR_T                        INTERBIS S.J. EWA I ADAM KROPISZ
****		ZPERSONTYPE_T                  Employee
****		ZGEND_T                        Male
****		ZPTITLE_T                      Dr. h.c.
****		ZLANGUAGE_T                    Polish
****		ZDEALFLAG_T                    Dealer's Employee
****		ZUSTATUS_T                     Active
****		ZMANAGER_T
****		ZPTNRTP_T                      Main Dealer
****		ERDAT                          13.09.2016
****		ERZET                          16:37:42
****		ERNAM                          KPL00104
****		EPRSNN                         1000000250
****		AEDAT                          14.09.2016
****		AEZET                          18:28:20
****		AENAM                          KMP051601
****		APRSNN                         1000000270	
*********************************************************************/
	
		var storage = $.sessionStorage;
		var availLanguageObj = data["AVAIL_LANGUAGE"];
		var language = data["ZLANGUAGE"]; 
	
		if(language != undefined){
			var userinfoTemp =  data["USER_INFO"];
			if ( userinfoTemp && userinfoTemp["ZLANGUAGE"]) {
				storage.set("LANGUAGE" ,userinfoTemp["ZLANGUAGE"].toLowerCase());
			}
			else {
				// default language set
				storage.set("LANGUAGE" , "en");
			}
			if(availLanguageObj[language.toLowerCase()] != undefined){
				storage.set("LANGUAGE" , language.toLowerCase());
			}else{
				// default language set
				storage.set("LANGUAGE" , "en");
			}
		}
		
		var userAuth = data["USER_AUTH"];
		var userGroup = data["USER_GROUP"];
		
		var rfcSystemInfo = data["RFC_INFO"];
		var systemInfo = data["LANDSCAPE_NAME"];
		var userFullName = data["ZUANAME"];
		var dealerFlag = data["ZDEALFLAG"];
		var companyCode = data["BUKRS"];	
		var companyText = data["BUKRS_T"];
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
		h.push('<div class="modal fade " id="modal_user_info" tabindex="-1" role="dialog" aria-hidden="true">');
		h.push('    <div class="modal-dialog">');
		h.push('        <div class="modal-content animated fadeIn">');
		h.push('            <div class="modal-header">');
		h.push('                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>');
		h.push('                <h4 class="modal-title"> '+i18n_master.getText('LBL_USER_INFO')+' </h4>');
		h.push('            </div>');
		h.push('            <div class="modal-body">');
		h.push('                <div class="panel panel-default">');
		h.push('                    <div class="panel-body">');

		h.push('                        <ul class="nav nav-tabs">');
		h.push('                        	<li class="active"><a data-toggle="tab" href="#tab-user-info" id="navtab-user-info"> '+i18n_master.getText('LBL_USER_INFO')+' </a></li>');
		// KME , NSC
		if(userGroup == "RGROUP01" || userGroup == "RGROUP02"){
			h.push('                        <li data-button-control="M118B05"><a data-toggle="tab" href="#tab-user-role" id="navtab-user-role">EDDS Role Switch</a></li>');
		}
		
		/*
		if(portalId == "KME_AESE2"){
			h.push('                        <li><a data-toggle="tab" href="#tab-user-configuration" id="navtab-user-configuration">EDDS User Configuration</a></li>');
		}
		*/
		
		h.push('                        </ul>');

		h.push('                        <div class="tab-content">');
		h.push('                        	<div id="tab-user-info" class="tab-pane fade in active">');
		h.push('                        		<div class="form-horizontal">');
		h.push('                            		<br>');
		h.push('                            		<div class="form-group">');
		h.push('                                		<label class="col-sm-4 control-label"> '+i18n_master.getText('LBL_USER_NAME')+' </label>');
		h.push('                                		<div class="col-sm-8">');
		h.push('											<div class="input-group">');
		h.push('	                                    		<p class="form-control-static"> ' + userFullName + '</p>');
		h.push('                                			</div>');
		h.push('                                		</div>');
		h.push('                            		</div>');
		h.push('                            		<div class="form-group">');
		h.push('                             			<label class="col-sm-4 control-label"> '+i18n_master.getText('LBL_NSC')+' </label>');
		h.push('                           		    	<div class="col-sm-8">');
		h.push('											<div class="input-group">');
		h.push('	                     		            	<p class="form-control-static"> ' + companyText + ' (' + companyCode + ')</p>');
		h.push('                    		            	</div>');
		h.push('                   		            	</div>');
		h.push('                   		         	</div>');
		h.push('                   		        	<div class="form-group">');
		h.push('                   		            	<label class="col-sm-4 control-label"> '+i18n_master.getText('LBL_PORTAL_ID')+' </label>');
		h.push('                    		        	<div class="col-sm-8">');
		h.push('											<div class="input-group">');
		h.push('	                 		               		<p class="form-control-static">' + portalId + '</p>');
		h.push('                   		             		</div>');
		h.push('                                		</div>');
		h.push('                            		</div>');
		if(dealerFlag == "D"){
			h.push('                            	<div class="form-group">');
			h.push('                                	<label class="col-sm-4 control-label"> '+i18n_master.getText('LBL_SAP_DEALER_CODE')+' </label>');
			h.push('                                	<div class="col-sm-8">');
			h.push('										<div class="input-group">');
			h.push('	                                    	<p class="form-control-static">' + sapDealerCode + '</p>');
			h.push('                                		</div>');
			h.push('                                	</div>');
			h.push('                            	</div>');	
			
			h.push('                            	<div class="form-group">');
			h.push('                                	<label class="col-sm-4 control-label"> '+i18n_master.getText('LBL_EDDS_CODE')+' </label>');
			h.push('                                	<div class="col-sm-8">');
			h.push('										<div class="input-group">');
			h.push('	                                    	<p class="form-control-static">' + eddsCode + '</p>');
			h.push('                                		</div>');
			h.push('                                	</div>');
			h.push('                            	</div>');
			
			h.push('                            	<div class="form-group">');
			h.push('                               		<label class="col-sm-4 control-label"> '+i18n_master.getText('LBL_PARTNER_TYPE')+' </label>');
			h.push('                                	<div class="col-sm-8">');
			h.push('										<div class="input-group">');
			h.push('	                                    	<p class="form-control-static">' + eddsPartnerType + '</p>');
			h.push('                                		</div>');
			h.push('                                	</div>');
			h.push('                            	</div>');
		}
		h.push('                            		<div class="form-group">');
		h.push('                                		<label class="col-sm-4 control-label"> '+i18n_master.getText('LBL_EDDS_PERSON_NO')+' </label>');
		h.push('                                		<div class="col-sm-8">');
		h.push('											<div class="input-group">');
		h.push('	                                    		<p class="form-control-static">' + eddsPersonCode + '</p>');
		h.push('                                			</div>');
		h.push('                                		</div>');
		h.push('                            		</div>');	
			
		h.push('                            		<div class="form-group">');
		h.push('                                		<label class="col-sm-4 control-label"> '+i18n_master.getText('LBL_EDDS_ROLE')+' </label>');
		h.push('                                		<div class="col-sm-8">');
		h.push('											<div class="input-group">');
		
		var eddsUserRoleIsAdmin = false;
		$(roleObj["ALL_ROLES"]).each(function(idx, item){
			var eddsRoleCode = item["ZROLE"];
			var eddsRoleText = item["ZROLET"];
			var eddsRoleGroup = item["ZROLEGRP"];
			h.push('	                                    	<p class="form-control-static" title="'+eddsRoleGroup+':'+eddsRoleCode+'"> ' + eddsRoleText + ' </p>');	
			
			if (item["ZRTYPE"] == "A") {
				eddsUserRoleIsAdmin =  true;
			}else if(userGroup == "RGROUP01"){
				// KME USER case!!
				eddsUserRoleIsAdmin =  true;
			}
		})
	
		h.push('                                			</div>');
		h.push('                                		</div>');
		h.push('                            		</div>');
		
		 
		if(data["RFC_INFO"] == "true"){
			h.push('                            	<div class="form-group">');
			h.push('                                	<label class="col-sm-4 control-label"> '+i18n_master.getText('LBL_SYSTEM_INFO')+' </label>');
			h.push('                                	<div class="col-sm-8">');
			h.push('										<div class="input-group">');
			h.push('	                                    	<p class="form-control-static">' + systemInfo + '</p>');
			h.push('                                		</div>');
			h.push('                                	</div>');
			h.push('                            	</div>');	
		}
		h.push('                        		</div>');
		h.push('                        	</div>'); // END tab-user-info
		
		
		h.push('                        	<div id="tab-user-role" class="tab-pane fade">');
		h.push('                            <br>');
		var availableRoleInfo = data["AVAIL_ROLE_INFO"];
		var storedEDDSUserRole = $.localStorage.get("EDDS_ROLE_INFO");
		
		//console.log(availableRoleInfo);
		//console.log(storedEDDSUserRole);
		
		var userRole = {};
		if(storedEDDSUserRole != null){
			if(storedEDDSUserRole[portalId] != undefined){
				userRole = storedEDDSUserRole[portalId];
			}
		}
		
		Object.keys(availableRoleInfo).sort().map(function(key) {
			var roleInfo = availableRoleInfo[key];
			var companyCode = roleInfo["companyCode"];
			var companyText = roleInfo["companyText"];
			var countryName = roleInfo["countryName"];
			var sType = roleInfo["stype"];

			console.log('#######');
			console.log(roleInfo);
			console.log(countryName);
			console.log(companyText);
				
			h.push('                           	<div class="form-group row">');
			h.push('                            	<label class="col-sm-4 control-label">' + companyCode + ' ' + (countryName=='' || countryName == undefined?companyText:countryName) + '</label>');
			h.push('                       			<div class="col-sm-8">');
			h.push('									<div class="input-group">');
			h.push('										<select name="company_role_info" data-company-code="'+companyCode+'" class="input-sm form-control input-s-sm inline" >');
			
			var currentOptgroup = "";
            var nextOptgroup = "";
            var headOptgroup = true;                    
			
            //console.log(roleInfo["roleList"]);
            
			$(roleInfo["roleList"]).each(function(idx, item){
				
				currentOptgroup = item["ZROLEGRP"];
                nextOptgroup = "";
                if (roleInfo["roleList"][idx + 1] != undefined) {
                    nextOptgroup = roleInfo["roleList"][idx + 1]["ZROLEGRP"];
                }
                //
                if (headOptgroup == true) {
                    h.push('<optgroup label="' + item["ZROLEGRPT"] + '">');
                    headOptgroup = false;
                }
                
				/**
					BUKRS:"KA02"
					ZCONF:""
					ZEDDMD:"M0001"
					ZEDDMDT:"Basic"
					ZMENU:"X"
					ZROLE:"ROLE021"
					ZROLEGRP:"RGROUP02"
					ZROLEGRPT:"Subsidary"
					ZROLET:"NSC Administrator"
					ZRTYPE:"A"
					ZRTYPET:"Admin"
				*/
				
				var eddsRoleCode = item["ZROLE"];
				var eddsRoleText = item["ZROLET"];
				var eddsRoleGroup = item["ZROLEGRP"];
				var eddsRoleAuth = item["ZRTYPE"];
				
				
				var selected = "";
				var storedSubsidiaryRole = userRole[key];
	
				if(storedSubsidiaryRole != undefined){
					if(storedSubsidiaryRole == eddsRoleCode){
						selected = "selected=true";
					}
				}
				
				if (eddsRoleAuth == "A" && !eddsUserRoleIsAdmin) {
				
					// console.log('case1');
					
				}else if (eddsRoleAuth == "A" && eddsUserRoleIsAdmin) {
					// console.log('case2');					
					h.push('										<option value="' + eddsRoleCode + '" '+selected+'>' + eddsRoleText  + ' (' + eddsRoleCode+ ')</option>');				
				}else{
					
					// console.log('case3');
					
					$(roleObj["ALL_ROLES"]).each(function(idxR, itemR){
						var eddsRoleCode_temp = itemR["ZROLE"];
						var eddsRoleText_temp = itemR["ZROLET"];
						var eddsRoleGroup = itemR["ZROLEGRP"];
						var isBasuc = itemR["ZEDDMD"]; //: "basic auit"   //two field can be shown,  when audit role and basic role are included.
						
						if ( ((eddsRoleCode == eddsRoleCode_temp) && isBasuc=='M0001') || ( eddsUserRoleIsAdmin && isBasuc=='M0001') )  {
							h.push('								<option value="' + eddsRoleCode + '" '+selected+'>' + eddsRoleText  + ' (' + eddsRoleCode+ ')</option>');
						}
					});
				}
				
				if (headOptgroup == false && currentOptgroup != nextOptgroup) {
                    h.push('</optgroup>');
                    headOptgroup = true;
                }
				
			});
			h.push('                           				</select>');		
			h.push('                           			</div>');
			h.push('                            	</div>');
			h.push('                            </div>');
		});
		
		h.push('                            </div>'); // end tab-user-role
		
		h.push('                        	<div id="tab-user-configuration" class="tab-pane fade hide">');
		h.push('                        		<div class="form-horizontal">');
		h.push('                            		<br>');
		h.push('                            		<div class="form-group">');
		h.push('                                		<label class="col-sm-4 control-label">OPEN NEW TAB for DETAIL PAGE</label>');
		h.push('                                		<div class="col-sm-8">');
		h.push('											<div class="input-group">');
		h.push('	                                    		<p class="form-control-static"><input type="checkbox" class="js-switch" checked title="OPEN NEW TAB" /></p>');
		h.push('                                			</div>');
		h.push('                                		</div>');
		h.push('                            		</div>');
		h.push('                        		</div>');
		h.push('                        	</div>'); // END tab-user-info
		
		h.push('                        </div>');
		h.push('                    </div>');
		h.push('                </div>');
		h.push('            </div>');
		
		h.push('            <div class="modal-footer">');
		h.push('                <button type="button" class="btn btn-white" data-dismiss="modal"><i class="fa fa-times"></i> '+i18n_master.getText('BTN_CLOSE')+'</button>');
		h.push('	            <button type="button" class="btn btn-primary btn-sm" id="go_to_user_profile"><i class="fa fa-user"></i> Go to User Profile</button>');
		
		// KME , NSC
		if(userGroup == "RGROUP01" || userGroup == "RGROUP02"){
			h.push('	        <button type="button" class="btn btn-primary btn-sm hide" data-dismiss="modal" id="user_role_info_save"><i class="fa fa-save"></i> Role Save</button>');
		}

		h.push('            </div>');
		h.push('        </div>');
		h.push('    </div>');
		h.push('</div>');
				
		$(document.body).append(h.join(""));
		
		// Set selected user language info
		$('#userinfo_lang').attr('src' , '/com.kme.edds.resources/img/flags/' + selectedFlagKey + '.png').attr('alt' , selectedFlagName).attr('data-language', selectedFlagKey);
		$('#header_lang_span').text(selectedFlagName);
		
		$("#navtab-user-info").on("click",function(){
			$("#user_role_info_save").addClass("hide");
		});
		
		$("#navtab-user-role").on("click",function(){
			$("#user_role_info_save").removeClass("hide");
		});
		
		$("#navtab-user-configuration").on("click",function(){
			/*
			$.ajax({
				url: url,
				dataType: "script",
				success: success
			});
			*/
		
			/*
			if(!$("#tab-user-configuration .js-switch").attr("data-switchery")){
				var elem = document.querySelector('#tab-user-configuration .js-switch');
			    var switchery = new Switchery(elem, { color: '#9EA1A2', size: 'small' });
			    
           		if($.isEmptyObject( $.localStorage.get("EDDS_USER_CONFIG") )){
           			var userConfigObj = {};
		    		userConfigObj["OPEN_NEW_TAB"] = true;
		    		$.localStorage.set("EDDS_USER_CONFIG", userConfigObj);
           		}
           		
			    elem.onchange = function(obj) {
			    	var userConfigObj = $.localStorage.get("EDDS_USER_CONFIG");
			    	if($(obj.currentTarget).is(':checked')){
			    		userConfigObj["OPEN_NEW_TAB"] = true;
			    		$.localStorage.set("EDDS_USER_CONFIG", userConfigObj);
			    	}else{
			    		userConfigObj["OPEN_NEW_TAB"] = false;
			    		$.localStorage.set("EDDS_USER_CONFIG", userConfigObj);			    	
			    	}
				}
			}
			*/
		});
		
		// KME , NSC
		if(userGroup == "RGROUP01" || userGroup == "RGROUP02"){
			$("#user_role_info_save").on("click", function(){
				
				var userInfo = $.sessionStorage.get("USER_INFO");
				var userID = userInfo.ZPOTALID;
				var roleInfo = {};

				$("select[name=company_role_info] :selected").each(function(){
					var _selectCompanyCode = $(this).closest('select').attr("data-company-code");
					var _selectedCompanyCode = $(this).val();
					roleInfo[ _selectCompanyCode ] = _selectedCompanyCode;
				});
		
				if( $.localStorage.get("EDDS_ROLE_INFO") == null){
					// init
					$.localStorage.set("EDDS_ROLE_INFO", {});
				}

				var storedData = $.localStorage.get("EDDS_ROLE_INFO");

				storedData[userID] = roleInfo;
				// replace role Info
				$.localStorage.set("EDDS_ROLE_INFO", JSON.stringify(storedData));

				toastr.success(i18n_master.getText('MSG_SUCCESS'));

				/*
				// swal(i18n_master.getText('MSG_SAVE_SUCCESS'), "", "success");
				swal({
					title: i18n_master.getText('MSG_SUCCESS'), // "Saved Successfully!"
					text: "", 
					type: "success"
				}, function() {
					// $('#modal_assign_manager').modal('hide');
					document.location.reload();
				});
				*/

			});
			
			$("select[name=company_role_info]").selectpicker('refresh');
		}
		
	
	/*********************************************************************************************************
	****	$('#multilanguage_flags li').on('click', function(){
	****		$('#multilanguage_flags li').removeClass('active');
	****		var $li = $(this)
	****		$li.addClass('active');
	****		var imgSrc = $li.children().find('img').attr('src');
	****		var alt = $li.children().find('img').attr('alt');
	****		var dataLang = $li.children().find('img').attr('data-language');
	****	        
	****		$('#userinfo_lang').attr('src' , imgSrc).attr('alt' , alt).attr('data-language', dataLang);
	****		$('#header_lang_span').text(alt);
	****	    
	**** 	});
	*********************************************************************************************************/	
		
		$('#go_to_user_profile').on('click', function(){
			
			try{
				showLoading();
				var eddsRoleCode = "";
				var eddsRoleGroup = "";
				
				$(roleObj["ALL_ROLES"]).each(function(idx, item){
					if(item["ZEDDMD"] == "M0001"){
						eddsRoleCode = item["ZROLE"];
						eddsRoleGroup = item["ZROLEGRP"];
						return;
					}
				});
				
		    	Form.submit('com.kme.edds.admin.UserControl', { 
					company_code: data["BUKRS"],
					person_code: data["ZPRSNN"],
					user_type: data["ZDEALFLAG"],
					partner_code: data["ZPTNR"],
					partner_type: data["ZPTNRTP"],
					sap_dealer_code: data["ZDEALERN"],
					workflow_status: data["ZWSTATUS"],
					role_type: eddsRoleCode,
					return_url: ""
				});
				
			}catch(e){
				hideLoading();
			}
	
		});
	}
	
	$('#modal_user_info').modal('show');
	
}

function getEDDSUserRole(companyCode){

	var isShowModal = false;
	var userRole = "";

	var userInfo = $.sessionStorage.get("USER_INFO");
	var userID = userInfo.ZPOTALID;

	var eddsRoleObj = $.localStorage.get("EDDS_ROLE_INFO");
	if( eddsRoleObj == null){
		isShowModal = true;
	}else{
		if(eddsRoleObj[userID] == undefined ){
			isShowModal = true;
		}else if ( eddsRoleObj[userID][companyCode] == undefined || eddsRoleObj[userID][companyCode] == "") {
			isShowModal = true;
		}

	}
	
	
	console.log('getEDDSUserRole : ' + companyCode);

	var tempUserInfoData = null;
	var tempUserRols = userInfo["ROLE"];
	var tempUserRoleCount = tempUserRols["ALL_ROLES"].length;
	var tempIsUser = true; // user=U, admin=A
	tempIsUser = false; 
	$( tempUserRols["ALL_ROLES"]).each(function(idx, item){
		if (item["ZRTYPE"] == "A") { tempIsUser = false;}		
	});
	
	console.log('tempIsUser: ' + tempIsUser);
	console.log('isShowModal: ' + isShowModal);
	
	// when the user is UserType(U) (don't have admin type), check if he has only one role or not before modal
	if (tempIsUser && isShowModal)  {
		$.ajax({
			url: 'com.kme.edds.common.EDDSUserInfo?prtmode=getUserInfo'
			,cache: false
			,type: "post"
			,dataType: 'json'
			,success: function(data) {
				//console.log(data);
				//renderUserInfo(data)			
				tempUserInfoData = data;		
				var availableRoleInfo = tempUserInfoData["AVAIL_ROLE_INFO"];
				var _roleObj = tempUserInfoData["ROLE"];
				var intAvailableRoleCount = 0;
				var _selectCompanyCode = '';
				var _selectedRoldCode = '';
				Object.keys(availableRoleInfo).sort().map(function(key) { // because here no country variables
					var roleInfo = availableRoleInfo[key];
					//var companyCode = roleInfo["companyCode"];
					//var companyText = roleInfo["companyText"];
					$(roleInfo["roleList"]).each(function(idx, item){
						var eddsRoleCode = item["ZROLE"];
						var eddsRoleText = item["ZROLET"];
						var eddsRoleGroup = item["ZROLEGRP"];
						var eddsRoleAuth = item["ZRTYPE"];				
						
						var selected = "";
						var storedSubsidiaryRole = userRole[key];
					
						if (eddsRoleAuth != "A" ){		

							$(_roleObj["ALL_ROLES"]).each(function(idxR, itemR){
								var eddsRoleCode_temp = itemR["ZROLE"];
								var eddsRoleText_temp = itemR["ZROLET"];
								var eddsRoleGroup 	  = itemR["ZROLEGRP"];
								if ( eddsRoleCode == eddsRoleCode_temp ) {
									_selectCompanyCode = key;
									_selectedRoldCode = eddsRoleCode;
									intAvailableRoleCount++;
								}
							});
						}		
					});

				});

				if (intAvailableRoleCount >= 1 ) {
					 
					isShowModal = false;

					// ref: $("#user_role_info_save").on("click", function(){		 			 
					var roleInfo = {};				
					roleInfo[ _selectCompanyCode ] = _selectedRoldCode;
							
					if( $.localStorage.get("EDDS_ROLE_INFO") == null){
						// init
						$.localStorage.set("EDDS_ROLE_INFO", {});
					}		
			
					var storedData = $.localStorage.get("EDDS_ROLE_INFO");
					storedData[userID] = roleInfo;
					 
					// replace role Info
					$.localStorage.set("EDDS_ROLE_INFO", JSON.stringify(storedData));
			
					//swal(i18n_master.getText('MSG_SAVE_SUCCESS'), "", "success");
				}

				return _selectedRoldCode;	
			}
			,error: function(xhr, status, error) {
				if(xhr.getResponseHeader('content-type').startsWith("text/html")){	
					 
				}else{
					swal(i18n_master.getText('MSG_FAILED'), i18n_master.getText('MSG_FAILED_STATUS_CODE') + status + ", " + error , "error");
					hideLoading();
					 
					isShowModal = true;
				}

				return '';	
			}
		});

		
	}else {
		if(isShowModal){
	
			swal({
				title: "Set up Roles" , 
				text: "Please set up the EDDS Susidiaries Role. ", 
				type: "warning"
			}, function() {
				// show popup
				showEDDSUserInfo();
				
				setTimeout(function() {
					// DOM loaded and call function
					$("#navtab-user-role").trigger("click").tab('show');
				}, 1000);
				


			});
			
		}else{
			if (tempIsUser && tempUserInfoData!=null) {
					renderUserInfo(tempUserInfoData);
			}
			else {
				userRole = eddsRoleObj[userID][companyCode];
				
			}
		}

		// alert("companyCode : " + companyCode + " userRole : " +userRole);

		return userRole;
	}
}

var checkUserRole = function(){
	
	var storage = $.sessionStorage;
	var userInfo = storage.get("USER_INFO");
	
	if( !$.isEmptyObject( userInfo ) ){
		
		var portalId = userInfo['ZPOTALID'];
		var companyCode = userInfo['BUKRS'];
	
		var storedEDDSUserRole = $.localStorage.get("EDDS_ROLE_INFO");
		var userRole = {};
		if(storedEDDSUserRole != null){
			if(storedEDDSUserRole[portalId] != undefined){
				userRole = storedEDDSUserRole[portalId];
			}
		}
	
		var params = { 
			company_code: companyCode,
			role_type: userRole[companyCode]
		}
		
		$.ajax({
			url: 'com.kme.edds.common.EDDSUserInfo?prtmode=checkUserRole'
			,data : params
			,cache: false
			,type: "post"
			,dataType: 'json'
			,success: function(data) {	
				
				if( $.isEmptyObject( data ) ){
					swal({
						title: "Set up Roles" , 
						text: "Please set up the EDDS Susidiaries Role. ", 
						type: "warning"
					}, function() {
					
						// show popup
						showEDDSUserInfo();
						
						setTimeout(function() {
							// DOM loaded and call function
							$("#navtab-user-role").trigger("click").tab('show');
						}, 1000);
		
					});
				}
					
			},error: function(xhr, status, error){
				if(xhr.getResponseHeader('content-type').startsWith("text/html")){	
					// alert(i18n_master.getText('MSG_FAILED') + " " + "Session Expired, please log on again.");
					// sessionExpiredLogout();
				}else{
					swal(i18n_master.getText('MSG_FAILED'), i18n_master.getText('MSG_FAILED_STATUS_CODE') + status + ", " + error , "error");
					hideLoading();
					
				}
			}
		});	
	}
	
	
}();
 
 
