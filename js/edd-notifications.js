var Notifications = {
	userInfo: $.sessionStorage.get("USER_INFO"),
	menuInfo: $.sessionStorage.get("OMENU"),
	data:{
		edd_code: "",
		partner_type: "",
		sap_dealer_code: "",
		sap_dealer_name: "",
		requested_id: "",
		company_code:"",
		status: "",
		selectedUser:{},
		employeeUserData: [],
		gdprUserGridData: [],
		gdprUserRoleData: []
	},
	dTable: null,
	eTable: null,
	gTable: null,
	gdprNSCTable: null,
	gdprTable: null,
	fieldName: '',
	load:{
		
		companyCode: function(){
			
			var params = { 
				prtmode: "getMasterCode", codeGroup: "COMPANY" 
			}
	    	
			$.getJSON("com.kme.edds.dealer.DealerMasterData", params , function(data) {


				//EDDS-535 Give Multiple Market Access to Key Distributor Users
				if (Notifications.userInfo.ZPOTALID == 'KSIU0001'
					|| Notifications.userInfo.ZPOTALID == 'KSIU0002'
					|| Notifications.userInfo.ZPOTALID == 'KSIU0003'
					|| Notifications.userInfo.ZPOTALID == 'KEEU0001'  
					|| Notifications.userInfo.ZPOTALID == 'KEEU0002'
					)
					{
						Notifications.userInfo.BUKRS = "KB01";
					}

				//EDDS-142 // var h = [];
				var h = { "KM NSC":[], "EU West":[],"EU East":[],"Other":[]};
				var hRegion = ["KM NSC", "EU West","EU East","Other"];
				var hRegionText = ["KM NSC", i18n_master.getText('LBL_DISTRIBUTOR_WESTERN'),i18n_master.getText('LBL_DISTRIBUTOR_EASTERN'),"Other"];
				$(data).each(function(idx, obj) {
				
					var optionText = "";
					if(obj["ZINFO1"] == ''){
						optionText = obj["CountryName"];
					}else{
						optionText = obj["CountryName"] + ' (' + obj["ZINFO1"] + ')';
					}
					
					//EDDS-142
					var selected = "";
					 
					if(Notifications.userInfo.BUKRS == "KB01") {
					
						if(idx == 0){
							if (Notifications.userInfo.ZPOTALID == 'KSIU0001'
							|| Notifications.userInfo.ZPOTALID == 'KSIU0002'
							|| Notifications.userInfo.ZPOTALID == 'KSIU0003'
							|| Notifications.userInfo.ZPOTALID == 'KEEU0001'  
							|| Notifications.userInfo.ZPOTALID == 'KEEU0002'
							)
							{
							//h["KM NSC"].push('<option value="">=== ' + i18n_master.getText('LBL_ALL_MARKETS') + '===</option>');
							}
							else {
								h["KM NSC"].push('<option value="">=== ' + i18n_master.getText('LBL_ALL_MARKETS') + '===</option>');
							}
						}

						var regionInEu = obj["ZINFO4"]==null||obj["ZINFO4"]==""?"Other":obj["ZINFO4"];
						regionInEu = (regionInEu != hRegion[1] && regionInEu != hRegion[2] && regionInEu != "Other")?hRegion[0]:regionInEu;
						h[regionInEu].push('<option value="' + obj["ZCODE"] + '" '+ selected +'>'+optionText+'</option>');

					
					}else{
						if(obj["ZCODE"] == Notifications.userInfo.BUKRS){
							h["KM NSC"].push('<option value="' + obj["ZCODE"] + '" '+ selected +'>'+optionText+'</option>');
						}
					}
					
					/*
	            	if(Notifications.userInfo.BUKRS == "KB01"){
		            	//if(idx == 0){
	            		//	h.push('<option value="">=== ' + i18n_master.getText('LBL_ALL_MARKETS') + '===</option>');
	            		//}
		        		h.push('<option value="' + obj["ZCODE"] + '">'+optionText+'</option>');
	            	}else{
	            		if(obj["ZCODE"] == Notifications.userInfo.BUKRS){
		            		h.push('<option value="' + obj["ZCODE"] + '">'+optionText+'</option>');
		            	}
					}
					*/
					
				});

				if(Notifications.userInfo.BUKRS == "KB01") {				 
					for (var index=0;index<hRegion.length;index++) {				 
						if (hRegion[index] == "KM NSC") {
						}
						else {
							if (h[hRegion[index]].length>0) {
								h["KM NSC"].push("<optgroup label='"+ hRegionText[index] + "'>");						
								for (var index2=0;index2<h[hRegion[index]].length;index2++) {
									h["KM NSC"].push(h[ hRegion[index]  ][index2]);
								}
								h["KM NSC"].push("</optgroup>");
							}
						}
					}
				}

				
				$('#dw_s_company_code').html(h["KM NSC"].join("")).selectpicker('refresh');
				if(Notifications.userInfo.BUKRS == "KB01"){
				//	$("#dw_s_company_code").prepend('<option value="" selected="selected">=== ' + i18n_master.getText('LBL_ALL_MARKETS') + '===</option>');
				}
				$('#de_s_company_code').html(h["KM NSC"].join("")).selectpicker('refresh');
				if(Notifications.userInfo.BUKRS == "KB01"){
				//	$("#de_s_company_code").prepend('<option value="" selected="selected">=== ' + i18n_master.getText('LBL_ALL_MARKETS') + '===</option>');
				}
				
				$("#gw_s_company_code").html(h["KM NSC"].join("")).selectpicker('refresh');
				if(Notifications.userInfo.BUKRS == "KB01"){
				//	$("#gw_s_company_code").prepend('<option value="" selected="selected">=== ' + i18n_master.getText('LBL_ALL_MARKETS') + '===</option>');
				}
				$('#gp_m_company_code').html(h["KM NSC"].join("")).selectpicker('refresh');
				 

				/*
				$("#dw_s_company_code").html(h.join(""));
				if(Notifications.userInfo.BUKRS == "KB01"){
					$("#dw_s_company_code").prepend('<option value="" selected="selected">=== ' + i18n_master.getText('LBL_ALL_MARKETS') + '===</option>');
				}
				$("#de_s_company_code").html(h.join(""));
				if(Notifications.userInfo.BUKRS == "KB01"){
					$("#de_s_company_code").prepend('<option value="" selected="selected">=== ' + i18n_master.getText('LBL_ALL_MARKETS') + '===</option>');
				}
				
				$("#gw_s_company_code").html(h.join(""))
				if(Notifications.userInfo.BUKRS == "KB01"){
					$("#gw_s_company_code").prepend('<option value="" selected="selected">=== ' + i18n_master.getText('LBL_ALL_MARKETS') + '===</option>');
				}
				$("#gp_m_company_code").html(h.join(""));
				*/
				// Notifications.load.loadPartnerType();
				
			});
		
			params = { 
				prtmode: "getEmployeeWorkflowCompanyCode" 
			}
		
		/*
			$.getJSON("com.kme.edds.admin.WorkflowEmployeeData", params , function(data) {
				var h = [];
				
				var companyList = _.sortBy(data, 'BUKRS_T');
				
				$(companyList).each(function(idx, obj) {
	            	if(Notifications.userInfo.BUKRS == "KB01"){
		        		h.push('<option value="' + obj["BUKRS"] + '">' + obj["BUKRS_T"] + ' (' + obj["BUKRS"] + ') </option>');
	            	}else{
	            		if(obj["ZCODE"] == Notifications.userInfo.BUKRS){
		            		h.push('<option value="' + obj["BUKRS"] + '">' + obj["BUKRS_T"] + ' (' + obj["BUKRS"] + ') </option>');
		            	}
	            	}
				});
				
				$("#de_s_company_code").html(h.join(""));
				
			});
		*/
		},
		getCompanyCode: function(obj){
			var companyCode = $(obj).val();
			if(Notifications.userInfo.BUKRS != 'KB01'){
				// Can't search all
				if($(obj).val() == ''){
					companyCode = Notifications.userInfo.BUKRS;
				}
			}
			return companyCode;
		},
		status: function(){
			var params = {
				prtmode: "getMasterCode", 
				codeGroup: "WSTATUS" 
			}
	    	
			$.getJSON("com.kme.edds.dealer.DealerMasterData", params , function(data) {
				var h = [];
				h.push('<option value="">===== '+i18n_master.getText('LBL_STATUS')+' =====</option>');
				$(data).each(function(idx, obj) {
	        		h.push('<option value="' + obj["ZCODE"] + '">' + obj["ZCODET"] + ' (' + obj["ZCODE"] + ') </option>');
				});
				$("#dw_s_status").html(h.join("")).selectpicker('refresh');
				$("#de_s_status").html(h.join("")).selectpicker('refresh');
			});
			
		},
		userType: function(){
			var params = { prtmode: "getMasterCode", codeGroup: "USERTYPE" }
	    	$.getJSON("com.kme.edds.dealer.DealerMasterData", params , function(data) {
				var s = [];
	            s.push('<option value="">=== User Type ===</option>');
	            $(data).each(function(idx, obj) {
	            	s.push('<option value="' + obj["ZCODE"] + '">' + obj["ZCODET"] + '</option>');												
	            });
				$("#gw_s_user_type").html(s.join("")).selectpicker('refresh');
	        });
		},
		userStatus: function(){
			$("#gw_s_user_status").attr("disabled", true);
	    	var params = { prtmode: "getMasterCode", codeGroup: "USETSTATUS" }
	    	$.getJSON("com.kme.edds.dealer.DealerMasterData", params , function(data) {
	            var h = [];
	            h.push('<option value="">=== ' + i18n_master.getText('LBL_USER_STATUS') + ' ===</option>');
	            $(data).each(function(idx, obj) {
	            	if(obj["ZCODE"] != "D"){
		            	h.push('<option value="' + obj["ZCODE"] + '">' + obj["ZCODET"] + '</option>');												
	            	}
	            });
	
				$("#gw_s_user_status").html(h.join(""));
				$("#gw_s_user_status").selectpicker('refresh');
				$("#gw_s_user_status").attr("disabled", false);
	        });
		},
		partnerCode: function(){
			showLoading();
			$.ajax({
				url: 'com.kme.edds.dealer.GetDealerList',
				data : { 
					company_code: Notifications.load.getCompanyCode($('#gw_s_company_code'))
				},
				cache: false,
				type: "post",
				dataType: 'json',
				success: function(data) {
					Notifications.render.partnerCode(data);
					hideLoading();
	            },
	            error: function(xhr, status, error){
					if(xhr.getResponseHeader('content-type').startsWith("text/html")){	
						// alert(i18n_master.getText('MSG_FAILED') + " " + "Session Expired, please log on again.");
						// sessionExpiredLogout();
					}else{
						swal(i18n_master.getText('MSG_FAILED'), i18n_master.getText('MSG_FAILED_STATUS_CODE') + status + ", " + error , "error");
						hideLoading();
					}
				}
			});
		},
		partnerType: function(){
		
			$("#dw_s_partner_type").attr('disabled',true);
			
			var params = {
				company_code: $('#dw_s_company_code').val(),
				language: $.sessionStorage.get("LANGUAGE")
			}
	    	
			$.getJSON("com.kme.edds.dealer.GetPartnerType", params , function(data) {
				var h = [];
	           
				$(data).each(function(idx, obj) {
					h.push('<option value="' + obj["ZPTNRTP"] + '">' + obj["ZPTNRTP_T"] + '  #</option>');
	            	
				});
		
				$("#dw_s_partner_type").html('<option value="">=== '+i18n_master.getText('LBL_PARTNER_TYPE')+' ===</option>' + h.join(""));
				$("#dw_s_partner_type").attr('disabled',false);
				
				//renderSubPartnerType(data, "ZPTNRTP", "ZPTNRTP_T");
			});
		},
		dealerWorkflowData: function(){
		
			showLoading();
			
			$.ajax({
				url: 'com.kme.edds.admin.WorkflowData?prtmode=search',
				data : {
					company_code: Notifications.load.getCompanyCode($('#dw_s_company_code')),
					partner_type: $('#dw_s_partner_type').val(),
					status: $('#dw_s_status').val(),
					dealer_name: $('#dw_s_dealer_name').val(),
					edd_code: $('#dw_s_s_edd_code').val()
				},
				cache: false,
				type: "post",
				dataType: 'json',
				success: function(res) {
					Notifications.render.dealerWorkflowTable(res, function(){
						setTimeout(function() {
							$("#modal_notifications").modal("show");
						
				            // rebuild recalc
				            setTimeout(function() {
					            $('#noti-dealerworkflow-grid-table').trigger("draw.dt");
				            },200);

				        }, 500);
			        });
					
					hideLoading();
				},
				error: function(xhr, status, error){
					if(xhr.getResponseHeader('content-type').startsWith("text/html")){	
						// alert(i18n_master.getText('MSG_FAILED') + " " + "Session Expired, please log on again.");
						// sessionExpiredLogout();
					}else{
						swal(i18n_master.getText('MSG_FAILED'), i18n_master.getText('MSG_FAILED_STATUS_CODE') + status + ", " + error , "error");
						hideLoading();
					}
				}
			});
			
			// set CompanyCode for confirmWorkflow
			Notifications.data.company_code = $('#dw_s_company_code').val();

		},
		
		getRequestDetail: function(companyCode, partnerCode, rowStatus, requestedId, eddsPersonNo, requestedDate, sapDealerCode, sapDealerName ){
			
			$("#modal_notifications").modal("hide");
		
			//
	    	showLoading();
	    	//
	    	var _data = {};
			_data["company_code"] = companyCode;
			_data["edd_code"] = partnerCode;
			_data["status"] = rowStatus;
			_data["requested_id"] = requestedId;
			_data["edds_person_no"] = eddsPersonNo;
			_data["requested_date"] = requestedDate;
			
			Notifications.data.company_code = companyCode,
			Notifications.data.requested_id = requestedId,
			Notifications.data.sap_dealer_code = sapDealerCode,
			Notifications.data.sap_dealer_name = sapDealerName,
			
	        $.ajax({
	        	url: 'com.kme.edds.admin.WorkflowData?prtmode=getWorkflowRequestList'
				,data : _data
				,cache: false
				,type: "post"
				,dataType: 'json'
				,success: function(res) {

					showRequestDealerListModal(function(){
						//
						if(rowStatus == "RQ" || rowStatus == "CR"){
							$('#dw-btn-approval, #dw-btn-reject, #dw_th_check_all').show();
							$('#dw_th_check_all').iCheck('uncheck');
						}else{
							$('#dw-btn-approval, #dw-btn-reject, #dw_th_check_all').hide();			
						}
					});
					Notifications.render.requestDealerTable(res);

					hideLoading();
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
			
			// set Global variable for Approval submit
			Notifications.data.edd_code = partnerCode;
			Notifications.data.status = rowStatus;
			
		},
		
		getRequestEmployeeDetail: function( companyCode, partnerCode, eddsPersonNo, rowStatus, requestedId, requestedEDDSPersonNo, requestedDate, portalId, approvedPersonNo){
		
			$("#modal_notifications").modal("hide");
		
			//
	    	showLoading();
	    	//
	    	var _data = {};
			_data["company_code"] = companyCode;
			_data["edd_code"] = partnerCode;
			_data["edd_person_no"] = eddsPersonNo;
			_data["status"] = rowStatus;
			_data["requested_id"] = requestedId;
			_data["requested_edds_person_no"] = requestedEDDSPersonNo;
			_data["requested_date"] = requestedDate;
			_data["approved_person_no"] = approvedPersonNo;
			
	        $.ajax({
	        	url: 'com.kme.edds.admin.WorkflowData?prtmode=getWorkflowRequestUserList'
				,data : _data
				,cache: false
				,type: "post"
				,dataType: 'json'
				,success: function(res) {

					//console.log(res);

					// set data for Approval, Reject //
					Notifications.data.selectedUser["ZPRSNN"] = eddsPersonNo;
					Notifications.data.selectedUser["BUKRS"] = companyCode;

					showRequestEmployeeListModal(function(){
						//
						if(rowStatus == "RQ" || rowStatus == "CR"){
							$('#de-btn-approval, #de-btn-reject, #de_th_check_all').show();
							$('#de_th_check_all').iCheck('uncheck');
						}else{
							$('#de-btn-approval, #de-btn-reject, #de_th_check_all').hide();			
						}
						
						// set Requested Title Names
						// $("#de_change_request_title").text("Change Request " + );
						
						/*
						var _storedData = Notifications.eTable.rows().tables().data();
						*/
						//var _filteredData = Notifications.data.gdprUserGridData.T_LIST.filter(function(item){
						var _filteredData = Notifications.data.employeeUserData.T_LIST.filter(function(item){
							return (
								item["BUKRS"] == companyCode
								&& item["ZPTNR"] == partnerCode
								&& item["ZPRSNN"] == eddsPersonNo
								&& item["ZWSTATUS"] == rowStatus
								&& item["RQENAME"] == requestedId
								&& item["RPRSNN"] == requestedEDDSPersonNo
								&& item["ZPOTALID"] == portalId
							);
						});
						
						// console.log(_filteredData);
						
						$(_filteredData).each(function(idx, item){
							if(idx == 0){
								// User Info
								var userId = item["ZUANAME"];
								if(userId != ""){
									userId += ", " + item["ZPOTALID"];
								}
								
								$("#de_status").text("STATUS: " + item["ZWSTATUST"]);
								$("#de_user_id").text(userId.replaceAll("\\",""));
								$("#de_dealer_code").text(item["ZSYSCODE"] + " " + item["ZPTNR"]);
								$("#de_dealer_name").text(item["ZLEGALNM"].replaceAll("\\",""));
								
								// Requested User Info
								var requestedUserId = item["ZRUANAME"];
								if(requestedUserId != ""){
									requestedUserId += ", " + item["RQENAME"];
								}
								$("#de_requsted_user_id").text(requestedUserId.replaceAll("\\",""));
								$("#de_requsted_date").text(formatter.getFormatValue(item["RQDATAB"] ,"dd/MM/yyyy"));
								$("#de_requsted_role").text(item["ZRROLET"]);
								
								// Approved User Info
								var approvedUserId = item["ZAUANAME"];
								if(approvedUserId != ""){
									approvedUserId += ", " + item["APENAME"];
								}
								$("#de_approved_user_id").text(approvedUserId.replaceAll("\\",""));
								$("#de_approved_date").text(formatter.getFormatValue(item["APDATAB"] ,"dd/MM/yyyy"));
								$("#de_approved_role").text(item["ZAROLET"]);
								return;
							}
						});
						
						var html = [];
						$(res["T_HISTORY"]).each(function(idx, item){
							/*
							HDATAB: "2018-10-25"
							HENAME: "KITU0009"
							HUEZET: "10:30:40"
							ZAROLE: "ROLE038"
							ZAROLET: "GDPR Process Test Role"
							ZARSNN: "P1000034770"
							ZAUANAME: "Alberto  Giacalone"
							ZRJREASON: ""
							ZWSTATUS: ""
							*/
//							if(item["ZWSTATUS"] == "CR" || item["ZWSTATUS"] == "RQ"){
								html.push('<tr>');
								html.push('	<td>' + item["ZWSTATUS_T"] + '</th>');
								html.push('	<td>' + item["HENAME"] + '</th>');
								html.push('	<td>' + item["ZAROLET"] + '</th>');
								html.push('	<td>' + item["ZAUANAME"] + '</th>');
								html.push('	<td>' + formatter.getFormatValue(item["HDATAB"] ,"dd/MM/yyyy") + ' ' + item["HUEZET"].replace("00:00:00", "") + '</th>');
								html.push('	<td>' + item["ZRJREASON"] + '</th>');
								html.push('</tr>');							
//							}
						});
						
						$("#de_table_tbody_prevrequestlist").html(html.join(""));
						
					});
					Notifications.render.requestEmployeeTable(res);

					hideLoading();
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
			
			// set Global variable for Approval submit
			Notifications.data.edd_code = partnerCode;
			Notifications.data.status = rowStatus;
			
		},
		
		dealerEmployeeData: function(){
		
			showLoading();
			//showLoadingMessage();
			
			var _data = {
				company_code: Notifications.load.getCompanyCode($('#de_s_company_code')),
				partner_type: $('#de_s_partner_type').val(),
				status: $('#de_s_status').val(),
				dealer_name: $('#de_s_dealer_name').val(),
				edd_code: $('#de_s_edd_code').val(),
				date_start: $('#startDate').val(),
				date_end: $('#endDate').val(),
				date_term: $('#date_term').val(), // not used
			};
			
			$.ajax({
				url: 'com.kme.edds.admin.WorkflowEmployeeData?prtmode=searchEmployeeWorkflow'
				,data : _data
				,cache: false
				,type: "post"
				,dataType: 'json'
				,success: function(res) {
					
					Notifications.render.dealerEmployeeTable(res, function(){
						setTimeout(function() {
							$("#modal_notifications").modal("show");
							//console.log("modal_notifications show");
				            // rebuild recalc
				            setTimeout(function() {
								//console.log("noti-employeeworkflow-grid-table draw");
					            $('#noti-employeeworkflow-grid-table').trigger("draw.dt");
					            $("#de_btn_approval,#de_btn_reject").attr("disabled", true).addClass("disabled");
				            },400);

				        }, 500);
			        });
					
					hideLoading();
					//hideLoadingMessage();
		        	
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
			
			// set CompanyCode for confirmWorkflow
			Notifications.data.company_code = $('#de_s_company_code').val();
		
		},
		gdprWorkflowData: function(){
			showLoading();
	        var data = {};
	        
	        data["company_code"] = Notifications.load.getCompanyCode($('#gw_s_company_code'));
	        data["user_type"] = $('#gw_s_user_type').val();
	        data["person_type"] = $('#gw_s_person_type').val();
	        if(data["user_type"] == "D"){
	        	data["partner_code"] = $('#gw_s_partner_code').val();
	        }
	        data["user_status"] = $('#gw_s_user_status').val();
	        data["user_name"] = $('#gw_s_search_name').val();
	            
	        $.ajax({
	        	url: 'com.kme.edds.mastermanagement.GDPRWorkflowData?prtmode=search'
				,data : data
				,cache: false
				,type: "post"
				,dataType: 'json'
				,success: function(res) {
					
					var personList = res["T_LIST"];
					var roleList = _.sortBy(res["T_ROLE"], 'ZEDDMD');
					
					_.forEach(personList, function(value, key){
						var roles = _.filter(roleList, {'ZPRSNN':value['ZPRSNN']});
											
						if(_.has(roles[0], 'ZROLET')) {
							value['ROLE_T'] = roles[0]['ZROLET'];
						}else {
							value['ROLE_T'] = '';
						}
						
						if(value["ZLOGONDAT"] != '0000-00-00'){
	                    	var now = value["ZLOGONDAT"] + 'T' + value["ZLOGONTIM"];
	                        value["ZLOGONDAT_PRT"] = _recent_cliecked.timeSince(new Date(now).getTime()) + ' (' + value["ZLOGONCNT"] + ')';
	                	}else{
	                		value["ZLOGONDAT_PRT"] =  '';
	                	}
					});
					
					Notifications.render.gdprWorkflowTable(personList, roleList, function(){
						setTimeout(function() {
							$("#modal_notifications").modal("show");
						
				            // rebuild recalc
				            setTimeout(function() {
					            $('#noti-gdprworkflow-grid-table').trigger("draw.dt");
				            },200);

				        }, 500);
			        });
					
					hideLoading();
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
		},
		gdprProcessEmployeeData: function(){
        
        	showLoading();
        	
        	$.ajax({
        		url: 'com.kme.edds.mastermanagement.GDPRWorkflowData?prtmode=getGDPRLogList',
				data : {
					company_code: Notifications.load.getCompanyCode($('#gp_m_company_code'))
				},
				cache: false,
				type: "post",
				dataType: 'json',
				success: function(res) {
					
					var personList = res["T_LIST"];
					var nscAdminList = res["T_MAIL"];
					
					Notifications.render.gdprNSCTable(nscAdminList, function(){
						setTimeout(function() {
							//$("#modal_notifications").modal("show");
						
				            // rebuild recalc
				            setTimeout(function() {
					            $('#gp_gdpr_nsc_table').trigger("draw.dt");
				            },200);

				        }, 500);
					});
					Notifications.render.gdprTable(personList, function(){
					
						setTimeout(function() {
							//$("#modal_notifications").modal("show");
						
				            // rebuild recalc
				            setTimeout(function() {
					            $('#gp_gdpr_table').trigger("draw.dt");
				            },200);

				        }, 500);
					
					});
					
					hideLoading();
					
					setTimeout(function() {
						$("#modal_notifications").modal("show");
			            //$("#modal_gdpr_log_list").modal("show");
			        }, 500);
					
	            },
	            error: function(xhr, status, error){
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
	},
	loadCodeMasterData: function(){
	
		Notifications.load.companyCode();
		Notifications.load.status();
		Notifications.load.userType();
		Notifications.load.userStatus();
		
	},
	eventBind: function(){
		// Event Bind
		$("#dw-btn-search").on("click", Notifications.load.dealerWorkflowData);

		$("#de-btn-search").on("click", function() {

			if ( $('#date_term').val() == "MANUAL" ) {

				var startDate = formatter.getUnformatDate($('#startDate').val(),"dd/MM/yyyy") ;
				var endDate = formatter.getUnformatDate($('#endDate').val(),"dd/MM/yyyy") ;

				//console.log(formatter.getUnformatDate( Notifications.util.getCurrentDate(),"dd/MM/yyyy"));
				//console.log(startDate);
				//console.log(endDate);

				if (startDate > endDate) {
					swal( {title:i18n_master.getText('MSG_WARNNING'), 
						   text:i18n_master.getText('MSG_DATE_ERROR_1'), 
						   type:"warning",
						   closeOnConfirm: true,
			               }
					, function(value) {
						$("#modal_notifications").modal("show");
						return;
					});
				}
				else {
					Notifications.load.dealerEmployeeData();
				}				
			}
			else {
				Notifications.load.dealerEmployeeData();
			}		
		} );
		
		/******************************************************************
		$('#de-btn-approval').on("click", function(){
        	Notifications.confirmDealerWorkflow();
        });
        $('#de-btn-reject').on("click", function(){
        	Notifications.rejectEmployeeWorkflow();
        });
		******************************************************************/
        
        $("#gw_s_company_code, #gw_s_user_type").on("change", function(){
        
        	if($("#gw_s_user_type").val() == "D"){
        		Notifications.load.partnerCode();
       			$("#gw_div_partner_code").removeClass("hide");
        	}else{
       			$("#gw_div_partner_code").addClass("hide");
        	}
        });
        
        $("#gw-btn-search").on("click", Notifications.load.gdprWorkflowData);
        
        $("#gp-btn-gdpr-list-search").on("click", Notifications.load.gdprProcessEmployeeData);
        
        // rebuild recal table size
        $("#modal_notifications a[data-toggle=tab]").on("click", function(obj){
        	if($(this).attr("href") == "#tab-1"){
        		setTimeout(function() {
	        		$('#noti-dealerworkflow-grid-table').trigger("draw.dt");
		        }, 200);
        	}else if($(this).attr("href") == "#tab-2"){
        		setTimeout(function() {
	    	    	$('#noti-employeeworkflow-grid-table').trigger("draw.dt");
		        }, 200);
        	}else{
        		setTimeout(function() {
		        	$('#noti-gdprworkflow-grid-table').trigger("draw.dt");
		        	$('#gp_gdpr_nsc_table').trigger("draw.dt");
		        }, 200);
        	}
        });
        
        // EDDS-198 Automatically Load Lists when Switching Pages or Countries
        $('#dw_s_company_code, #dw_s_status').on('change', function(){
        	$("#dw-btn-search").trigger("click");
        });

        // EDDS-198 Automatically Load Lists when Switching Pages or Countries
        $('#de_s_company_code, #de_s_status').on('change', function(){
        	$("#de-btn-search").trigger("click");
		});
		
		$('#date_term').on('change', function() {
			if ( $('#date_term').val() == "MANUAL" ) {
				$('.workflowEmployeeSearchDate').show();
			}
			else {

				var startDate = '';
				var endDate = Notifications.util.getCurrentDate() ;
				
				// 1 week (7days)
				if($('#date_term').val() == '7'){
					startDate = moment().subtract(7,'days').format('DD/MM/YYYY');
					
				}//1 month
				else if($('#date_term').val() == '30'){
					startDate = moment().subtract(1,'month').format('DD/MM/YYYY');
					
				}// 3 month 
				else if($('#date_term').val() == '90'){
					startDate = moment().subtract(3,'month').format('DD/MM/YYYY');
					
				}

				$('#startDate').val(startDate);
				$('#endDate').val(endDate);
				
				$('.workflowEmployeeSearchDate').hide();
				$("#de-btn-search").trigger("click");
				//$('.workflowEmployeeSearchDate').show();
			}
		});
	},
	template: {
		singHTMLTemplate: function(data, flag){
			var html = "";
			$(data["T_LIST"]).each(function(idx, rowObj){
				/*
					ZSUBCTG                        S_COM_0010
					ZSUBCTGT                       Dealer Contact Information
					ZTABNM                         ZCAEDDT3014
					ZFNAME                         XPARTNTERFAX
					DDTEXT                         [EDD] Company Information (Fax)
					RQDATAB                        22.09.2016
					RQUEZET                        14:31:19
					RQENAME                        KMP070100
					RPRSNN                         1000000310
					ZOLD_VA                        49  222
					ZNEW_VA                        49  444999
				*/
				var subCategory = rowObj["ZSUBCTG"];
				var subCategoryText = rowObj["ZSUBCTGT"];
				var table = rowObj["ZTABNM"];
				var fieldName = rowObj["ZFNAME"];
				var ddText = rowObj["DDTEXT"];
				var requestedDate = formatter.getFormatValue(rowObj["RQDATAB"] ,"dd/MM/yyyy");
				var requestedTime = rowObj["RQUEZET"];
				var requesteder = rowObj["RQENAME"];
				var requestederCode = rowObj["RPRSNN"];
				var oldValue = rowObj["ZOLD_VA"];
				var newValue = rowObj["ZNEW_VA"];
				var oldValueText = rowObj["ZOLD_VA_T"];
				var newValueText = rowObj["ZNEW_VA_T"];
				var confirmText = rowObj["ZNOTES"];
				
				//console.log(fieldName);
				
				// Date Field Formatting
				if(
					fieldName == "DATAB"
					|| fieldName == "DATBI"
					|| fieldName == "ZBIRTH"
				){
					oldValue = formatter.getFormatValue(oldValue ,"dd/MM/yyyy");
					newValue = formatter.getFormatValue(newValue ,"dd/MM/yyyy");
					oldValueText = formatter.getFormatValue(oldValueText ,"dd/MM/yyyy");
					newValueText = formatter.getFormatValue(newValueText ,"dd/MM/yyyy");
					
					//console.log(oldValue + " " + newValue);
					//console.log(oldValueText + " " + newValueText);
					
				}
				
				if(oldValueText != "") oldValue = oldValueText;
				if(newValueText != "") newValue = newValueText;
				
				html += '<tr>';
				if(Notifications.data.status == "RQ" && flag == "D"){
					html += ' <td><div class="i-checks"><input type="checkbox" '+
																	'ROWINDEX="' + idx + '" '+
																	'ZTABNM="' + table + '" '+
																  	'ZFNAME="' + fieldName + '" '+
																  	'RQDATAB="' + requestedDate + '" '+
																	'RQUEZET="' + requestedTime + '" '+
																	'RQENAME="' + requesteder + '" '+
																	'RPRSNN="' + requestederCode + '" '+
																	' name="confirm_checkbox" value="" > <i></i></div></td>';
				}
				
				html += '    <td '+
																	'ROWINDEX="' + idx + '" '+
																	'ZTABNM="' + table + '" '+
																  	'ZFNAME="' + fieldName + '" '+
																  	'RQDATAB="' + requestedDate + '" '+
																	'RQUEZET="' + requestedTime + '" '+
																	'RQENAME="' + requesteder + '" '+
																	'RPRSNN="' + requestederCode + '" '+
																	'OLD_VAL="' + oldValue + '" '+
																	'NEW_VAL="' + newValue + '" '+
																	' >'+subCategoryText+'</td>';
				html += '	 <td><a href="javascript:Notifications.render.showExtra(\'' + idx + '\' , \'' + flag + '\');" id="show_extra_W' + idx + '">'+ddText+'</a></td>';
				html += '	 <td>'+requesteder+'</td>';
				html += '	 <td>'+requestedDate+' '+requestedTime+'</td>';
				html += '</tr>';
				
				html += '<tr style="display: none;">';
				html += '    <td colspan="6">';
				html += '	       <div class="col-lg-6">';
				html += '	           <h5>'+i18n_master.getText('LBL_OLD')+'</h5>';
				html += '		       <div>' + oldValue.replaceAll("\\","") + '</div>';
				html += '		   </div>';
				html += '		   <div class="col-lg-6">';
				html += '			   <h5>'+i18n_master.getText('LBL_NEW')+'</h5>';
				html += '		       <div>' + newValue.replaceAll("\\","") + '</div>';
				html += '		   </div>';
				html += '	   </td>';
				html += '</tr>';
				
				if(flag == "D"){
				
				html += '<tr style="display: none;">';
				html += '    <td colspan="6">';
				html += '        <div class="form-group">';
				html += '		     <label for="comment">'+i18n_master.getText('LBL_COMMENT')+':</label>';
				if(Notifications.data.status == "RQ"){
					html += '		 <textarea class="form-control" rows="3" id="confirm_comment_' + idx + '"></textarea>';
				}else{
					html += '		 <textarea class="form-control" rows="3" readonly="readonly">' + confirmText + '</textarea>';
				}
	
				html += '		 </div>';
				html += '	 </td>';
				html += '</tr>';
				
				}
				
			});
			
			return html;
		},
		tableHTMLTemplate: function(data, flag){
			var html = '';
			
	    	$(templateObject.compareKeyNames).each(function(idx, objName){
	    	
				// check object empty 
	    		if($(data[objName]).length > 0){
					//
	    			var dataSet = data[objName];
	    			var temlateCellObject = templateObject.templateObject[objName];
					
	    			//console.log(dataSet);
	    			var sortName = temlateCellObject[0]; 

	    			//console.log(sortName);
	    			dataSet = _.sortBy(_.sortBy( _.sortBy( dataSet,'ZTYPE') ,'FLAG') , sortName);
	    			
					if (objName != "T_XEXTERNAL" ) {
						
						if(objName == 'T_XSITEINFO'){
							
							$(dataSet).each( function(dataIdx , rowObj){
								//
								var rowObj = dataSet[dataIdx];
								// console.log(rowObj);
								
								//
								var subCategory = rowObj["ZSUBCTG"]; // [EDD] Sub Info. Category
								var subCategoryText = rowObj["ZSUBCTGT"]; // [EDD] Partner info category Description
								var table = rowObj["ZTABNM"]; // Table Name
								var fieldName = rowObj["ZFNAME"]; // Field Name
								var ddText = rowObj["DDTEXT"]; // Short Description of Repository Objects
								var requestedDate = formatter.getFormatValue(rowObj["RQDATAB"] ,"dd/MM/yyyy"); // Valid-From Date
								var requestedTime = rowObj["RQUEZET"]; // Time last change was made
								var requesteder = rowObj["RQENAME"]; // Name of Person Who Changed Object
								var requestederCode = rowObj["RPRSNN"]; // [EDD] Person No
								var confirmText = rowObj["ZNOTES"];
								
								var domidx = 1000+idx;
								
								if(fieldName == "XSSO"){
									ddText = "Authorization";
								}
								
								html += '<tr>';
								if(Notifications.data.status == "RQ" && flag == "D"){
									html += '<td><div class="i-checks"><input type="checkbox" name="confirm_checkbox" '+
																								'ROWINDEX="' + domidx + '" '+
																								'ZTABNM="' + table + '" '+
																								'ZFNAME="' + fieldName + '" '+
																								'RQDATAB="' + requestedDate + '" '+
																								'RQUEZET="' + requestedTime + '" '+
																								'RQENAME="' + requesteder + '" '+
																								'RPRSNN="' + requestederCode + '" '+
																								' value=""> <i></i></div></td>';
								}
								
								html += '    <td>'+subCategoryText+'</td>';
								html += '	 <td><a href="javascript:Notifications.render.showExtra(\'' + domidx + '\' , \'' + flag + '\');" id="show_extra_W'+domidx+'">'+ddText+'</a></td>';
								html += '	 <td>'+requesteder+'</td>';
								html += '	 <td>'+requestedDate+' '+requestedTime+'</td>';
								html += '</tr>';
			
								//------------------ Extra detail part ------------------
							
								html += '<tr style="display: none;">';
								html += '	 <td>';
								html += '	     <div class="col-sm-12 ibox-content">';
								html += '		     <h5>'+i18n_master.getText('LBL_OLD')+' (' + objName + ')</h5>';
								html += '			 <table class="table table-striped">';
								html += '			     <thead>';
								html += '		             <tr>';
								for(var j=0; j < temlateCellObject.length; j++){
									if(j == 0){
										html += '	             <th>#</th>';
									}
									html += '	                 <th>' + temlateCellObject[j]["thName"] + '</th>';
								}
								html += '	                 	 <th>Change Date</th>';
								html += '		             </tr>';
								html += '				 </thead>';
								html += '				 <tbody>';
								
								// make td cells
								var rowIdx = 1;
								
								var oldDataSet = dataSet.filter(function(item){
									return (item["ZTYPE"] == "O") // Old data filter
								});
								
								$(oldDataSet).each(function(roofIdx, roofObj){
									var type = roofObj["ZTYPE"]; // N : New O : Old
									html += '		     <tr>';
									for(var j=0; j < temlateCellObject.length; j++){
										var tdKey = temlateCellObject[j]["key"]; 
										var dataType = temlateCellObject[j]["dataType"];
										var value = roofObj[tdKey];		
										
										if(tdKey == 'FLAG'){
											if(value == 'D'){
												value += '(Delete)';
											}else if(value == 'N'){
												value += '(New)';
											}else if(value == 'E'){
												value += '(Equal)';
											}
										}
										
										if(dataType != undefined){
											value = formatter.getFormatValue(value,"dd/MM/yyyy");
										}
										value = (value =="EP_DEALER_PARTNER"?i18n_master.getText('LBL_DEALER_PARTNERS'):value);
										
										if(j == 0){
											html += ' <td>'+rowIdx+'</td>';
										}
										
										if(value != undefined){
											value = value.replaceAll("\\","");
										}
										
										html += '		     <td class="text-center">' + value + '</td>';
									}
									html += '		     <td class="text-center">'+ formatter.getFormatValue(roofObj["RQDATAB"] ,"dd/MM/yyyy") + ' ' + roofObj["RQUEZET"] +'</td>';
									html += '			 </tr>';
									
									
									
									// 
									rowIdx++;
									
								});
								// first Row
								html += '				</tbody>';
								html += '			 </table>';
								html += '		 </div>';
								html += '	 </td>';
								html += '</tr>';
								
								html += '<tr style="display: none;">';
								html += '	 <td>';
								html += '	     <div class="col-sm-12 ibox-content">';
								html += '			 <h5>'+i18n_master.getText('LBL_NEW')+'</h5>';
								html += '			 <table class="table table-striped">';
								html += '				 <thead>';
								html += '		             <tr>';
								for(var j=0; j < temlateCellObject.length; j++){
									if(j == 0){
										html += '	         <th>#</th>';
									}
									html += '	                 <th>' + temlateCellObject[j]["thName"] + '</th>';
								}
								html += '	                 	 <th>Change Date</th>';
								html += '		             </tr>';
								html += '				 </thead>';
								html += '				 <tbody>';
							
								// make td cells
								var rowIdx = 1;
								
								var newDataSet = dataSet.filter(function(item){
									return (item["ZTYPE"] == "N") // Old data filter
								});

								$( newDataSet ).each(function(roofIdx, roofObj){
									var type = roofObj["ZTYPE"]; // N : New O : Old
									
									html += '		     <tr>';
									for(var j=0; j < temlateCellObject.length; j++){
										var tdKey = temlateCellObject[j]["key"]; 
										var dataType = temlateCellObject[j]["dataType"];
										var value = roofObj[tdKey];
										if (tdKey=="ZADDR" || tdKey=="ZSTATE" || tdKey=="ZSTREET") {
											value = tooltip_master.decodeEntities(value.replaceAll("\\",""));
										}
										if(dataType != undefined){
											value = formatter.getFormatValue(value,"dd/MM/yyyy");
										}
										
										if(tdKey == 'FLAG'){
											if(value == 'D'){
												value += '(Delete)';
											}else if(value == 'N'){
												value += '(New)';
											}else if(value == 'E'){
												value += '(Equal)';
											}
										}

										value = (value =="EP_DEALER_PARTNER"?i18n_master.getText('LBL_DEALER_PARTNERS'):value);

										if(j == 0) html += ' <td>'+rowIdx+'</td>';
										if(value != undefined){
											value = value.replaceAll("\\","");
										}
										html += '		     <td class="text-center">' + value + '</td>';
										
									}
									html += '		     <td class="text-center">'+ formatter.getFormatValue(roofObj["RQDATAB"] ,"dd/MM/yyyy") + ' ' + roofObj["RQUEZET"] +'</td>';
									html += '			 </tr>';
									//
									rowIdx++;
								});
							
								html += '				 </tbody>';
								html += '			 </table>';
								html += '		 </div>';
								html += '	 </div>';
								html += '	 </td>';
								html += '</tr>';

								if(flag == "D"){
								
								html += '<tr style="display: none;">';
								html += '    <td colspan="6">';
								html += '        <div class="form-group">';
								html += '		     <label for="comment">'+i18n_master.getText('LBL_COMMENT')+':</label>';
								if(Notifications.data.status == "RQ"){
									html += '		 <textarea class="form-control" rows="3" id="confirm_comment_' + domidx + '"></textarea>';
								}else{
									html += '		 <textarea class="form-control" rows="3" readonly="readonly">' + confirmText + '</textarea>';
								}
								html += '		 </div>';
								html += '	 </td>';
								html += '</tr>';
								
								}
								// if roof index == 0 ,then break roof.
								return false;

							});
							
							
							
						}else{
							
							$(dataSet).each( function(dataIdx , rowObj){
								//
								var rowObj = dataSet[dataIdx];
								// console.log(rowObj);
								
								//
								var subCategory = rowObj["ZSUBCTG"]; // [EDD] Sub Info. Category
								var subCategoryText = rowObj["ZSUBCTGT"]; // [EDD] Partner info category Description
								var table = rowObj["ZTABNM"]; // Table Name
								var fieldName = rowObj["ZFNAME"]; // Field Name
								var ddText = rowObj["DDTEXT"]; // Short Description of Repository Objects
								var requestedDate = formatter.getFormatValue(rowObj["RQDATAB"] ,"dd/MM/yyyy"); // Valid-From Date
								var requestedTime = rowObj["RQUEZET"]; // Time last change was made
								var requesteder = rowObj["RQENAME"]; // Name of Person Who Changed Object
								var requestederCode = rowObj["RPRSNN"]; // [EDD] Person No
								var confirmText = rowObj["ZNOTES"];
								
								var domidx = 1000+idx;
								
								if(fieldName == "XSSO"){
									ddText = "Authorization";
								}
								
								html += '<tr>';
								if(Notifications.data.status == "RQ" && flag == "D"){
									html += '<td><div class="i-checks"><input type="checkbox" name="confirm_checkbox" '+
																								'ROWINDEX="' + domidx + '" '+
																								'ZTABNM="' + table + '" '+
																								'ZFNAME="' + fieldName + '" '+
																								'RQDATAB="' + requestedDate + '" '+
																								'RQUEZET="' + requestedTime + '" '+
																								'RQENAME="' + requesteder + '" '+
																								'RPRSNN="' + requestederCode + '" '+
																								' value=""> <i></i></div></td>';
								}
								
								html += '    <td>'+subCategoryText+'</td>';
								html += '	 <td><a href="javascript:Notifications.render.showExtra(\'' + domidx + '\' , \'' + flag + '\');" id="show_extra_W'+domidx+'">'+ddText+'</a></td>';
								html += '	 <td>'+requesteder+'</td>';
								html += '	 <td>'+requestedDate+' '+requestedTime+'</td>';
								html += '</tr>';
			
								//------------------ Extra detail part ------------------
							
								html += '<tr style="display: none;">';
								html += '	 <td colspan="3">';
								html += '	     <div class="col-sm-12 ibox-content">';
								html += '		     <h5>'+i18n_master.getText('LBL_OLD')+' (' + objName + ')</h5>';
								html += '			 <table class="table table-striped">';
								html += '			     <thead>';
								html += '		             <tr>';
								for(var j=0; j < temlateCellObject.length; j++){
									if(j == 0){
										html += '	             <th>#</th>';
									}
									html += '	                 <th>' + temlateCellObject[j]["thName"] + '</th>';
								}
								html += '	                 	 <th>Change Date</th>';
								html += '		             </tr>';
								html += '				 </thead>';
								html += '				 <tbody>';
								
								// make td cells
								var rowIdx = 1;
								
								var oldDataSet = dataSet.filter(function(item){
									return (item["ZTYPE"] == "O") // Old data filter
								});
								
								$(oldDataSet).each(function(roofIdx, roofObj){
									var type = roofObj["ZTYPE"]; // N : New O : Old
									html += '		     <tr>';
									for(var j=0; j < temlateCellObject.length; j++){
										var tdKey = temlateCellObject[j]["key"]; 
										var dataType = temlateCellObject[j]["dataType"];
										var value = roofObj[tdKey];		
										
										if(tdKey == 'FLAG'){
											if(value == 'D'){
												value += '(Delete)';
											}else if(value == 'N'){
												value += '(New)';
											}else if(value == 'E'){
												value += '(Equal)';
											}
										}
										
										if(dataType != undefined){
											value = formatter.getFormatValue(value,"dd/MM/yyyy");
										}
										value = (value =="EP_DEALER_PARTNER"?i18n_master.getText('LBL_DEALER_PARTNERS'):value);
										
										if(j == 0) html += ' <td>'+rowIdx+'</td>';
										if(value != undefined){
											value = value.replaceAll("\\","");
										}
										html += '		     <td class="text-center">' + value + '</td>';
									}
									html += '		     <td class="text-center">'+ formatter.getFormatValue(roofObj["RQDATAB"] ,"dd/MM/yyyy") + ' ' + roofObj["RQUEZET"] +'</td>';
									html += '			 </tr>';
									
									
									
									// 
									rowIdx++;
									
								});
								// first Row
								html += '				</tbody>';
								html += '			 </table>';
								html += '		 </div>';
								html += '	 </td>';
								
								
								html += '	 <td colspan="3">';
								html += '	     <div class="col-sm-12 ibox-content">';
								html += '			 <h5>'+i18n_master.getText('LBL_NEW')+'</h5>';
								html += '			 <table class="table table-striped">';
								html += '				 <thead>';
								html += '		             <tr>';
								for(var j=0; j < temlateCellObject.length; j++){
									if(j == 0){
										html += '	         <th>#</th>';
									}
									html += '	                 <th>' + temlateCellObject[j]["thName"] + '</th>';
								}
								html += '	                 	 <th>Change Date</th>';
								html += '		             </tr>';
								html += '				 </thead>';
								html += '				 <tbody>';
							
								// make td cells
								var rowIdx = 1;
								
								var newDataSet = dataSet.filter(function(item){
									return (item["ZTYPE"] == "N") // Old data filter
								});

								$( newDataSet ).each(function(roofIdx, roofObj){
									var type = roofObj["ZTYPE"]; // N : New O : Old
									
									html += '		     <tr>';
									for(var j=0; j < temlateCellObject.length; j++){
										var tdKey = temlateCellObject[j]["key"]; 
										var dataType = temlateCellObject[j]["dataType"];
										var value = roofObj[tdKey];
										if (tdKey=="ZADDR" || tdKey=="ZSTATE" || tdKey=="ZSTREET") {
											value = tooltip_master.decodeEntities(value.replaceAll("\\",""));
										}
										if(dataType != undefined){
											value = formatter.getFormatValue(value,"dd/MM/yyyy");
										}
										
										if(tdKey == 'FLAG'){
											if(value == 'D'){
												value += '(Delete)';
											}else if(value == 'N'){
												value += '(New)';
											}else if(value == 'E'){
												value += '(Equal)';
											}
										}

										value = (value =="EP_DEALER_PARTNER"?i18n_master.getText('LBL_DEALER_PARTNERS'):value);

										if(j == 0) html += ' <td>'+rowIdx+'</td>';
										if(value != undefined){
											value = value.replaceAll("\\","");
										}
										html += '		     <td class="text-center">' + value + '</td>';
										
									}
									html += '		     <td class="text-center">'+ formatter.getFormatValue(roofObj["RQDATAB"] ,"dd/MM/yyyy") + ' ' + roofObj["RQUEZET"] +'</td>';
									html += '			 </tr>';
									//
									rowIdx++;
								});
							
								html += '				 </tbody>';
								html += '			 </table>';
								html += '		 </div>';
								html += '	 </div>';
								html += '	 </td>';
								html += '</tr>';

								if(flag == "D"){
								
								html += '<tr style="display: none;">';
								html += '    <td colspan="6">';
								html += '        <div class="form-group">';
								html += '		     <label for="comment">'+i18n_master.getText('LBL_COMMENT')+':</label>';
								if(Notifications.data.status == "RQ"){
									html += '		 <textarea class="form-control" rows="3" id="confirm_comment_' + domidx + '"></textarea>';
								}else{
									html += '		 <textarea class="form-control" rows="3" readonly="readonly">' + confirmText + '</textarea>';
								}
								html += '		 </div>';
								html += '	 </td>';
								html += '</tr>';
								
								}
								// if roof index == 0 ,then break roof.
								return false;

							});
						}
						
						
					}else {
						// system defilne
						var externalSystem = {
							XDCSI: {
								//common
								subCategory:"",subCategoryText:"",table:"",ddText:"",requestedDate:"",requestedTime:"",requesteder:"",requestederCode:"",confirmText:"",
								//Extra setting per system
								fieldName:"XDCSI",type:"RL"
								, DCSI_SALES_OLD:[], DCSI_SALES_NEW:[] 
								, DCSI_SERVICE_OLD:[], DCSI_SERVICE_NEW:[] 
							},
							XKDA: {
								//common
								subCategory:"",subCategoryText:"",table:"",ddText:"",requestedDate:"",requestedTime:"",requesteder:"",requestederCode:"",confirmText:"",
								fieldName:"KDA",type:"RL"
							},
							SYSTEMS:[],
							// please add system name and type (table, RL), and object array required
						};
						var domidx = 0;

						$(dataSet).each( function(dataIdx , rowObj){
							
							var fieldName = rowObj["ZFNAME"]; // Field Name
							var type = rowObj["ZTYPE"]; // N : New O : Old
							var domidx = 1000+dataIdx;

							if (!externalSystem[fieldName]) {
								return;
							}
							
							externalSystem[fieldName].subCategory = rowObj["ZSUBCTG"]; // [EDD] Sub Info. Category
							externalSystem[fieldName].subCategoryText = rowObj["ZSUBCTGT"]; // [EDD] Partner info category Description
							externalSystem[fieldName].table = rowObj["ZTABNM"]; // Table Name
							//externalSystem[fieldName].fieldName = rowObj["ZFNAME"]; // Field Name
							externalSystem[fieldName].ddText = rowObj["DDTEXT"]; // Short Description of Repository Objects
							externalSystem[fieldName].requestedDate = formatter.getFormatValue(rowObj["RQDATAB"] ,"dd/MM/yyyy"); // Valid-From Date
							externalSystem[fieldName].requestedTime = rowObj["RQUEZET"]; // Time last change was made
							externalSystem[fieldName].requesteder = rowObj["RQENAME"]; // Name of Person Who Changed Object
							externalSystem[fieldName].requestederCode = rowObj["RPRSNN"]; // [EDD] Person No
							//externalSystem[fieldName].confirmText = rowObj["ZNOTES"];

							if (fieldName == "XDCSI") {
								
								var ZSURVEY = rowObj["ZSURVEY"]?rowObj["ZSURVEY"]:"001";
								if(type == "O" ){
									if (ZSURVEY == "001") {
									 externalSystem["XDCSI"].DCSI_SALES_OLD.push(rowObj);
									}
									else {
									 externalSystem["XDCSI"].DCSI_SERVICE_OLD.push(rowObj);
									}
								}
								else if(type == "N" ) {
									if (ZSURVEY == "001") {
										externalSystem["XDCSI"].DCSI_SALES_NEW.push(rowObj);
									}
									else {
										externalSystem["XDCSI"].DCSI_SERVICE_NEW.push(rowObj);
									}
								}								
							}		
							
							var isExist = false;
							$(externalSystem["SYSTEMS"]).each( function(idx , arrObj){ 
								
								if (arrObj ==fieldName ) {
									isExist = true;
									return ;
								}
							});
							if (!isExist) {
								externalSystem["SYSTEMS"].push(fieldName);
							}
							
						});
						 
						$(externalSystem["SYSTEMS"]).each( function(key , value){
							 
							var rowObj = externalSystem[value];
							//console.log(key,value);
							//console.log(rowObj);
						 
							var subCategory = rowObj["subCategory"]; // [EDD] Sub Info. Category
							var subCategoryText = rowObj["subCategoryText"]; // [EDD] Partner info category Description
							var table = rowObj["table"]; // Table Name
							var fieldName = rowObj["fieldName"]; // Field Name
							var ddText = rowObj["ddText"]; // Short Description of Repository Objects
							var requestedDate = rowObj["requestedDate"]; // Valid-From Date
							var requestedTime = rowObj["requestedTime"]; // Time last change was made
							var requesteder = rowObj["requesteder"]; // Name of Person Who Changed Object
							var requestederCode = rowObj["requestederCode"]; // [EDD] Person No
							var confirmText = rowObj["confirmText"];
							
							var domidx = 1000+idx;
							
							//console.log("requestedDate : " + requestedDate);
							//console.log("requestedTime : " + requestedTime);
							
							if(fieldName == "XSSO"){
								ddText = "Authorization";
							}
							
							html += '<tr>';
							if(Notifications.data.status == "RQ" && flag == "D"){
								html += '<td><div class="i-checks"><input type="checkbox" name="confirm_checkbox" '+
																							'ROWINDEX="' + domidx + '" '+
																							'ZTABNM="' + table + '" '+
																							'ZFNAME="' + fieldName + '" '+
																							'RQDATAB="' + requestedDate + '" '+
																							'RQUEZET="' + requestedTime + '" '+
																							'RQENAME="' + requesteder + '" '+
																							'RPRSNN="' + requestederCode + '" '+
																							' value=""> <i></i></div></td>';
							}
							
							html += '    <td>'+subCategoryText+'</td>';
							html += '	 <td><a href="javascript:Notifications.render.showExtra(\'' + domidx + '\' , \'' + flag + '\');" id="show_extra_W'+domidx+'">'+ddText+'</a></td>';
							html += '	 <td>'+requesteder+'</td>';
							html += '	 <td>'+requestedDate+' '+requestedTime+'</td>';
							html += '</tr>';
						
								html += '<tr style="display: none;">';
								html += '	 <td colspan="5">';
								html += '	     <div class="col-lg-12" style="min-width:400px;">';


							if (fieldName == "XDCSI") {
								
								// 하루에 2번의 데이터 상신을 통해 승인된 데이터의 케이스는
								// 09:00:00 , 11:00:00 을 출력하게 되면 2건의 데이터가 생기는데 [0] 번째의 데이터만 출력하게 되어있기때문에
								// 행에 출력된 시간과 맞는 데이터를 출력하기 위해서 아래의 filter logic check
								externalSystem.XDCSI.DCSI_SALES_OLD = externalSystem.XDCSI.DCSI_SALES_OLD.filter(function(item){
									return (item['RQUEZET'] == requestedTime);
								});
								
								externalSystem.XDCSI.DCSI_SERVICE_OLD = externalSystem.XDCSI.DCSI_SERVICE_OLD.filter(function(item){
									return (item['RQUEZET'] == requestedTime);
								});

								externalSystem.XDCSI.DCSI_SALES_NEW = externalSystem.XDCSI.DCSI_SALES_NEW.filter(function(item){
									return (item['RQUEZET'] == requestedTime);
								});

								externalSystem.XDCSI.DCSI_SERVICE_NEW = externalSystem.XDCSI.DCSI_SERVICE_NEW.filter(function(item){
									return (item['RQUEZET'] == requestedTime);
								});
								
								var htmltemplate = "";
								htmltemplate += '	     <div class="col-lg-6 col-sm-6" style="float:left;">';
								htmltemplate += '	     	<h5>'+'%LBL_TEXT_TITLE1%'+' (' + '%TEXT_OBJNAME%' + ')</h5>';
								htmltemplate += '	     	<table class="table table-striped whitebackground">';
								htmltemplate += '	     		<tbody>';
								htmltemplate += '	             	<tr class="%DCSI_USE_CHANGED%"><td>' + '%TEXT_DCSI_USE%' + '</td><td>'+ '%VALUE_DCSI_USE%'  +'</td></tr>';
								htmltemplate += '		      		<tr class="%DCSI_REGION_CHANGED%"><td>' + i18n_master.getText('LBL_REGION')   + '</td><td>'+ '%VALUE_REGION%'    +'</td></tr>';
								htmltemplate += '		      		<tr class="%DCSI_DISTRICT_CHANGED%"><td>' + i18n_master.getText('LBL_DISTRICT') + '</td><td>'+ '%VALUE_DISTRICT%'  +'</td></tr>';
								htmltemplate += '		      		<tr class="%DCSI_EMAIL_CHANGED%"><td>' + i18n_master.getText('LBL_EMAIL')    + '</td><td>'+ '%VALUE_EMAIL%'  +'</td></tr>';
								htmltemplate += '			     </tbody>';						 
								htmltemplate += '			 </table>';					 
								
								htmltemplate += '			 <table class="table table-striped whitebackground">';
								htmltemplate += '			     <thead>';
								htmltemplate += '		             <tr>';
								htmltemplate += '	         			<th style="width:105px">#</th>';
								htmltemplate += '	                 	<th>'+i18n_master.getText('LBL_EMAIL')+'</th>';
								htmltemplate += '					 </tr>';
								htmltemplate += '				 </thead>';	
								htmltemplate += '				 <tbody>';						

								 
								//Sales Old  //email start
								var salesOldArea = "";
								
								//console.log(externalSystem.XDCSI.DCSI_SALES_OLD);
								
								if (externalSystem.XDCSI.DCSI_SALES_OLD[0]){									
									var salesOldArea = htmltemplate + "";
									salesOldArea = htmltemplate.replaceAll("%LBL_TEXT_TITLE1%",i18n_master.getText('LBL_SALES'));
									salesOldArea = salesOldArea.replaceAll("%TEXT_OBJNAME%",i18n_master.getText('LBL_OLD'));
									salesOldArea = salesOldArea.replaceAll("%TEXT_DCSI_USE%",'DCSI');
									salesOldArea = salesOldArea.replaceAll("%VALUE_DCSI_USE%", ( externalSystem.XDCSI.DCSI_SALES_OLD[0]["ZACTIVE"]=="X"?i18n_master.getText('LBL_ACTIVE'):i18n_master.getText('LBL_INACTIVE') ));
									salesOldArea = salesOldArea.replaceAll("%VALUE_REGION%",externalSystem.XDCSI.DCSI_SALES_OLD[0]["ZREZION_T"]);
									salesOldArea = salesOldArea.replaceAll("%VALUE_DISTRICT%",externalSystem.XDCSI.DCSI_SALES_OLD[0]["ZDIST_T"]);
									salesOldArea = salesOldArea.replaceAll("%VALUE_EMAIL%",externalSystem.XDCSI.DCSI_SALES_OLD[0]["EMAIL"]);

									var rowIdx = 1;
									$(externalSystem.XDCSI.DCSI_SALES_OLD).each(function(roofIdx, roofObj){
										if (roofObj["MEMAIL"]) {
											salesOldArea += '		     <tr>';
											salesOldArea += ' 				<td class="text_center">'+rowIdx+'</td>';
											salesOldArea += ' 				<td class="text-center">' + roofObj["MEMAIL"] + '</td>';
											salesOldArea += '			</tr>';							
											rowIdx++;				
										}			
									});
								
									salesOldArea += '				 </tbody>';
									salesOldArea += '			 </table>';									
									//salesOldArea += '		 </div>';
									//District email
										salesOldArea += '			 <table class="table table-striped whitebackground">';
										salesOldArea += '			     <thead>';
										salesOldArea += '		             <tr>';
										salesOldArea += '	         			<th style="width:105px">#</th>';
										salesOldArea += '	                 	<th> District'+i18n_master.getText('LBL_EMAIL')+'</th>';
										salesOldArea += '					 </tr>';
										salesOldArea += '				 </thead>';	
										salesOldArea += '				 <tbody>';
									if (externalSystem.XDCSI.DCSI_SALES_OLD[0]["DSEMAIL"]) {
										var oldDistrictSalesEmails = getArrayBySplit( externalSystem.XDCSI.DCSI_SALES_OLD[0]["DSEMAIL"], ";");
										rowIdx = 1;
										$(oldDistrictSalesEmails).each(function(roofIdx, roofObj){
										 
											salesOldArea += '		     <tr>';
											salesOldArea += ' 				<td class="text_center">'+rowIdx+'</td>';
											salesOldArea += ' 				<td class="text-center">' + roofObj + '</td>';
											salesOldArea += '			</tr>';							
											rowIdx++;				
										});			
									}
										salesOldArea += '				 </tbody>';
										salesOldArea += '			 </table>';		
										salesOldArea += '		 </div>';
									//District email
								}
								else {
									salesOldArea = htmltemplate + "";
									salesOldArea = salesOldArea.replaceAll("%LBL_TEXT_TITLE1%",	i18n_master.getText('LBL_SERVICE'));
									salesOldArea = salesOldArea.replaceAll("%TEXT_OBJNAME%",i18n_master.getText('LBL_OLD'));
									salesOldArea = salesOldArea.replaceAll("%TEXT_DCSI_USE%",'DCSI');
									salesOldArea = salesOldArea.replaceAll("%VALUE_DCSI_USE%", "&nbsp;");
									salesOldArea = salesOldArea.replaceAll("%VALUE_REGION%",	"&nbsp;");
									salesOldArea = salesOldArea.replaceAll("%VALUE_DISTRICT%","&nbsp;");
									salesOldArea = salesOldArea.replaceAll("%VALUE_EMAIL%",	"&nbsp;");												 
									salesOldArea += '				 </tbody>';
									salesOldArea += '			 </table>';
									salesOldArea += '		 </div>';			
								}								 
								//Sales Old  //email END

								//Sales New
								var salesNewArea = "";
								if (externalSystem.XDCSI.DCSI_SALES_NEW[0]){
									salesNewArea = htmltemplate + "";
									salesNewArea = salesNewArea.replaceAll("%LBL_TEXT_TITLE1%",i18n_master.getText('LBL_SALES'));
									salesNewArea = salesNewArea.replaceAll("%TEXT_OBJNAME%",i18n_master.getText('LBL_NEW'));
									salesNewArea = salesNewArea.replaceAll("%TEXT_DCSI_USE%",'DCSI');
									salesNewArea = salesNewArea.replaceAll("%VALUE_DCSI_USE%", ( externalSystem.XDCSI.DCSI_SALES_NEW[0]["ZACTIVE"]=="X"?i18n_master.getText('LBL_ACTIVE'):i18n_master.getText('LBL_INACTIVE') ));
									salesNewArea = salesNewArea.replaceAll("%VALUE_REGION%",	  externalSystem.XDCSI.DCSI_SALES_NEW[0]["ZREZION_T"]);
									salesNewArea = salesNewArea.replaceAll("%VALUE_DISTRICT%",	  externalSystem.XDCSI.DCSI_SALES_NEW[0]["ZDIST_T"]);
									salesNewArea = salesNewArea.replaceAll("%VALUE_EMAIL%",	  externalSystem.XDCSI.DCSI_SALES_NEW[0]["EMAIL"]);
									rowIdx = 1;

									if (salesOldArea !="") {
										if (!externalSystem.XDCSI.DCSI_SALES_OLD[0] || externalSystem.XDCSI.DCSI_SALES_OLD[0]["ZACTIVE"] == undefined) {

											if (externalSystem.XDCSI.DCSI_SALES_NEW[0]["ZACTIVE"]) {
												salesNewArea = salesNewArea.replaceAll("%DCSI_USE_CHANGED%","FIELD_CHANGED");											
											}
											if (externalSystem.XDCSI.DCSI_SALES_NEW[0]["ZREZION"]) {
												salesNewArea = salesNewArea.replaceAll("%DCSI_REGION_CHANGED%","FIELD_CHANGED");												
											}
											if (externalSystem.XDCSI.DCSI_SALES_NEW[0]["ZDIST"]) {
												salesNewArea = salesNewArea.replaceAll("%DCSI_DISTRICT_CHANGED%","FIELD_CHANGED");												
											}
											if (externalSystem.XDCSI.DCSI_SALES_NEW[0]["EMAIL"]) {
												salesNewArea = salesNewArea.replaceAll("%DCSI_EMAIL_CHANGED%","FIELD_CHANGED");												
											}
										}
										else {
											if (externalSystem.XDCSI.DCSI_SALES_OLD[0]["ZACTIVE"] !=  externalSystem.XDCSI.DCSI_SALES_NEW[0]["ZACTIVE"]) {
												//console.log(externalSystem.XDCSI.DCSI_SALES_OLD[0]["ZACTIVE"] );
												//console.log(externalSystem.XDCSI.DCSI_SALES_NEW[0]["ZACTIVE"] );
												salesNewArea = salesNewArea.replaceAll("%DCSI_USE_CHANGED%","FIELD_CHANGED");
												//salesOldArea = salesOldArea.replaceAll("%DCSI_USE_CHANGED%","FIELD_CHANGED");
											}
											if (externalSystem.XDCSI.DCSI_SALES_OLD[0]["ZREZION"] !=  externalSystem.XDCSI.DCSI_SALES_NEW[0]["ZREZION"]) {
												salesNewArea = salesNewArea.replaceAll("%DCSI_REGION_CHANGED%","FIELD_CHANGED");
												//salesOldArea = salesOldArea.replaceAll("%DCSI_REGION_CHANGED%","FIELD_CHANGED");
											}
											if (externalSystem.XDCSI.DCSI_SALES_OLD[0]["ZDIST"] !=  externalSystem.XDCSI.DCSI_SALES_NEW[0]["ZDIST"]) {
												salesNewArea = salesNewArea.replaceAll("%DCSI_DISTRICT_CHANGED%","FIELD_CHANGED");
												//salesOldArea = salesOldArea.replaceAll("%DCSI_DISTRICT_CHANGED%","FIELD_CHANGED");
											}
											if (externalSystem.XDCSI.DCSI_SALES_OLD[0]["EMAIL"] !=  externalSystem.XDCSI.DCSI_SALES_NEW[0]["EMAIL"]) {
												salesNewArea = salesNewArea.replaceAll("%DCSI_EMAIL_CHANGED%","FIELD_CHANGED");
												//salesOldArea = salesOldArea.replaceAll("%DCSI_EMAIL_CHANGED%","FIELD_CHANGED");
											}
										}
									}

									$(externalSystem.XDCSI.DCSI_SALES_NEW).each(function(roofIdx, roofObj){
										if (roofObj["MEMAIL"]) {
											salesNewArea += '		     <tr>';
											salesNewArea += ' 				<td class="text_center">'+rowIdx+'</td>';
											salesNewArea += ' 				<td class="text-center">' + roofObj["MEMAIL"] + '</td>';
											salesNewArea += '			</tr>';							
											rowIdx++;
										}			
									});
								
									salesNewArea += '				 </tbody>';
									salesNewArea += '			 </table>';
									//salesNewArea += '		 </div>';

										salesNewArea += '			 <table class="table table-striped whitebackground">';
										salesNewArea += '			     <thead>';
										salesNewArea += '		             <tr>';
										salesNewArea += '	         			<th style="width:105px">#</th>';
										salesNewArea += '	                 	<th> District'+i18n_master.getText('LBL_EMAIL')+'</th>';
										salesNewArea += '					 </tr>';
										salesNewArea += '				 </thead>';	
										salesNewArea += '				 <tbody>';
									if (externalSystem.XDCSI.DCSI_SALES_NEW[0]["DSEMAIL"]) {
										var oldDistrictSalesEmails = getArrayBySplit( externalSystem.XDCSI.DCSI_SALES_NEW[0]["DSEMAIL"], ";");
										rowIdx = 1;
										$(oldDistrictSalesEmails).each(function(roofIdx, roofObj){
										 
											salesNewArea += '		     <tr>';
											salesNewArea += ' 				<td class="text_center">'+rowIdx+'</td>';
											salesNewArea += ' 				<td class="text-center">' + roofObj + '</td>';
											salesNewArea += '			</tr>';							
											rowIdx++;				
										});			
									}
										salesNewArea += '				 </tbody>';
										salesNewArea += '			 </table>';												
										salesNewArea += '		 </div>';
								}
								else {
									salesOldArea = salesOldArea.replaceAll("%DCSI_USE_CHANGED%","");
									salesOldArea = salesOldArea.replaceAll("%DCSI_REGION_CHANGED%","");
									salesOldArea = salesOldArea.replaceAll("%DCSI_DISTRICT_CHANGED%","");
									salesOldArea = salesOldArea.replaceAll("%DCSI_EMAIL_CHANGED%","");

								}
					 
								//Service Old
								var serviceOldArea = "";
								if (externalSystem.XDCSI.DCSI_SERVICE_OLD[0]){
									serviceOldArea = htmltemplate + "";
									serviceOldArea = serviceOldArea.replaceAll("%LBL_TEXT_TITLE1%",	i18n_master.getText('LBL_SERVICE'));
									serviceOldArea = serviceOldArea.replaceAll("%TEXT_OBJNAME%",i18n_master.getText('LBL_OLD'));
									serviceOldArea = serviceOldArea.replaceAll("%TEXT_DCSI_USE%",'DCSI');
									serviceOldArea = serviceOldArea.replaceAll("%VALUE_DCSI_USE%", ( externalSystem.XDCSI.DCSI_SERVICE_OLD[0]["ZACTIVE"]=="X"?i18n_master.getText('LBL_ACTIVE'):i18n_master.getText('LBL_INACTIVE') ));
									serviceOldArea = serviceOldArea.replaceAll("%VALUE_REGION%",	  externalSystem.XDCSI.DCSI_SERVICE_OLD[0]["ZREZION_T"]);
									serviceOldArea = serviceOldArea.replaceAll("%VALUE_DISTRICT%",	  externalSystem.XDCSI.DCSI_SERVICE_OLD[0]["ZDIST_T"]);
									serviceOldArea = serviceOldArea.replaceAll("%VALUE_EMAIL%",	  externalSystem.XDCSI.DCSI_SERVICE_OLD[0]["EMAIL"]);						

									rowIdx = 1;
									$(externalSystem.XDCSI.DCSI_SERVICE_OLD).each(function(roofIdx, roofObj){
										if (roofObj["MEMAIL"]) {
											serviceOldArea += '		     <tr>';
											serviceOldArea += ' 				<td class="text_center">'+rowIdx+'</td>';
											serviceOldArea += ' 				<td class="text-center">' + roofObj["MEMAIL"] + '</td>';
											serviceOldArea += '			</tr>';							
											rowIdx++;
										}			
									});
								
									serviceOldArea += '				 </tbody>';
									serviceOldArea += '			 </table>';
									//serviceOldArea += '		 </div>';			


										serviceOldArea += '			 <table class="table table-striped whitebackground">';
										serviceOldArea += '			     <thead>';
										serviceOldArea += '		             <tr>';
										serviceOldArea += '	         			<th style="width:105px">#</th>';
										serviceOldArea += '	                 	<th> District'+i18n_master.getText('LBL_EMAIL')+'</th>';
										serviceOldArea += '					 </tr>';
										serviceOldArea += '				 </thead>';	
										serviceOldArea += '				 <tbody>';

									if (externalSystem.XDCSI.DCSI_SERVICE_OLD[0]["ADSEMAIL"]) {
										var oldDistrictSalesEmails = getArrayBySplit( externalSystem.XDCSI.DCSI_SERVICE_OLD[0]["ADSEMAIL"], ";");
										rowIdx = 1;
										$(oldDistrictSalesEmails).each(function(roofIdx, roofObj){
										 
											serviceOldArea += '		     <tr>';
											serviceOldArea += ' 				<td class="text_center">'+rowIdx+'</td>';
											serviceOldArea += ' 				<td class="text-center">' + roofObj + '</td>';
											serviceOldArea += '			</tr>';							
											rowIdx++;				
										});			
									}
										serviceOldArea += '				 </tbody>';
										serviceOldArea += '			 </table>';		
										serviceOldArea += '		 </div>';
									
								}
								else {									 
									serviceOldArea = htmltemplate + "";
									serviceOldArea = serviceOldArea.replaceAll("%LBL_TEXT_TITLE1%",	i18n_master.getText('LBL_SERVICE'));
									serviceOldArea = serviceOldArea.replaceAll("%TEXT_OBJNAME%",i18n_master.getText('LBL_OLD'));
									serviceOldArea = serviceOldArea.replaceAll("%TEXT_DCSI_USE%",'DCSI');
									serviceOldArea = serviceOldArea.replaceAll("%VALUE_DCSI_USE%", "&nbsp;");
									serviceOldArea = serviceOldArea.replaceAll("%VALUE_REGION%",	"&nbsp;");
									serviceOldArea = serviceOldArea.replaceAll("%VALUE_DISTRICT%","&nbsp;");
									serviceOldArea = serviceOldArea.replaceAll("%VALUE_EMAIL%",	"&nbsp;");						
								 
									serviceOldArea += '				 </tbody>';
									serviceOldArea += '			 </table>';
									serviceOldArea += '		 </div>';											 
								}

								//Service New
								var serviceNewArea = "";
								if (externalSystem.XDCSI.DCSI_SERVICE_NEW[0]){
									serviceNewArea = htmltemplate+"";
									serviceNewArea = serviceNewArea.replaceAll("%LBL_TEXT_TITLE1%",i18n_master.getText('LBL_SERVICE'));
									serviceNewArea = serviceNewArea.replaceAll("%TEXT_OBJNAME%",i18n_master.getText('LBL_NEW'));
									serviceNewArea = serviceNewArea.replaceAll("%TEXT_DCSI_USE%",'DCSI');
									serviceNewArea = serviceNewArea.replaceAll("%VALUE_DCSI_USE%", ( externalSystem.XDCSI.DCSI_SERVICE_NEW[0]["ZACTIVE"]=="X"?i18n_master.getText('LBL_ACTIVE'):i18n_master.getText('LBL_INACTIVE') ));
									serviceNewArea = serviceNewArea.replaceAll("%VALUE_REGION%",	  externalSystem.XDCSI.DCSI_SERVICE_NEW[0]["ZREZION_T"]);
									serviceNewArea = serviceNewArea.replaceAll("%VALUE_DISTRICT%",	  externalSystem.XDCSI.DCSI_SERVICE_NEW[0]["ZDIST_T"]);
									serviceNewArea = serviceNewArea.replaceAll("%VALUE_EMAIL%",	  externalSystem.XDCSI.DCSI_SERVICE_NEW[0]["EMAIL"]);						


									if (serviceNewArea !="") {
										if (!externalSystem.XDCSI.DCSI_SERVICE_OLD[0] || externalSystem.XDCSI.DCSI_SERVICE_OLD[0] ==undefined) {
											if ( externalSystem.XDCSI.DCSI_SERVICE_NEW[0]["ZACTIVE"] ) {
												serviceNewArea = serviceNewArea.replaceAll("%DCSI_USE_CHANGED%","FIELD_CHANGED");												
											}
											if (externalSystem.XDCSI.DCSI_SERVICE_NEW[0]["ZREZION"] ) {
												serviceNewArea = serviceNewArea.replaceAll("%DCSI_REGION_CHANGED%","FIELD_CHANGED");												
											}
											if (externalSystem.XDCSI.DCSI_SERVICE_NEW[0]["ZDIST"] ) {
												serviceNewArea = serviceNewArea.replaceAll("%DCSI_DISTRICT_CHANGED%","FIELD_CHANGED");												
											}
											if ( externalSystem.XDCSI.DCSI_SERVICE_NEW[0]["EMAIL"] ) {
												serviceNewArea = serviceNewArea.replaceAll("%DCSI_EMAIL_CHANGED%","FIELD_CHANGED");												
											}
										}
										else {
											if (externalSystem.XDCSI.DCSI_SERVICE_OLD[0]["ZACTIVE"] !=  externalSystem.XDCSI.DCSI_SERVICE_NEW[0]["ZACTIVE"]) {
												serviceNewArea = serviceNewArea.replaceAll("%DCSI_USE_CHANGED%","FIELD_CHANGED");
												//serviceOldArea = serviceOldArea.replaceAll("%DCSI_USE_CHANGED%","FIELD_CHANGED");
											}
											if (externalSystem.XDCSI.DCSI_SERVICE_OLD[0]["ZREZION"] !=  externalSystem.XDCSI.DCSI_SERVICE_NEW[0]["ZREZION"]) {
												serviceNewArea = serviceNewArea.replaceAll("%DCSI_REGION_CHANGED%","FIELD_CHANGED");
												//serviceOldArea = serviceOldArea.replaceAll("%DCSI_REGION_CHANGED%","FIELD_CHANGED");
											}
											if (externalSystem.XDCSI.DCSI_SERVICE_OLD[0]["ZDIST"] !=  externalSystem.XDCSI.DCSI_SERVICE_NEW[0]["ZDIST"]) {
												serviceNewArea = serviceNewArea.replaceAll("%DCSI_DISTRICT_CHANGED%","FIELD_CHANGED");
												//serviceOldArea = serviceOldArea.replaceAll("%DCSI_DISTRICT_CHANGED%","FIELD_CHANGED");
											}
											if (externalSystem.XDCSI.DCSI_SERVICE_OLD[0]["EMAIL"] !=  externalSystem.XDCSI.DCSI_SERVICE_NEW[0]["EMAIL"]) {
												serviceNewArea = serviceNewArea.replaceAll("%DCSI_EMAIL_CHANGED%","FIELD_CHANGED");
												//serviceOldArea = serviceOldArea.replaceAll("%DCSI_EMAIL_CHANGED%","FIELD_CHANGED");
											}
										}
									}

									rowIdx = 1;
									$(externalSystem.XDCSI.DCSI_SERVICE_NEW).each(function(roofIdx, roofObj){
										if (roofObj["MEMAIL"]) {
											serviceNewArea += '		     <tr>';
											serviceNewArea += ' 				<td class="text_center">'+rowIdx+'</td>';
											serviceNewArea += ' 				<td class="text-center">' + roofObj["MEMAIL"] + '</td>';
											serviceNewArea += '			</tr>';							
											rowIdx++;
										}			
									});
								
									serviceNewArea += '				 </tbody>';
									serviceNewArea += '			 </table>';
									//serviceNewArea += '		 </div>';
									//District email
										serviceNewArea += '			 <table class="table table-striped whitebackground">';
										serviceNewArea += '			     <thead>';
										serviceNewArea += '		             <tr>';
										serviceNewArea += '	         			<th style="width:105px">#</th>';
										serviceNewArea += '	                 	<th> District'+i18n_master.getText('LBL_EMAIL')+'</th>';
										serviceNewArea += '					 </tr>';
										serviceNewArea += '				 </thead>';	
										serviceNewArea += '				 <tbody>';

									if (externalSystem.XDCSI.DCSI_SERVICE_NEW[0]["ADSEMAIL"]) {
										var oldDistrictSalesEmails = getArrayBySplit( externalSystem.XDCSI.DCSI_SERVICE_NEW[0]["ADSEMAIL"], ";");
										rowIdx = 1;
										$(oldDistrictSalesEmails).each(function(roofIdx, roofObj){
										 
											serviceNewArea += '		     <tr>';
											serviceNewArea += ' 				<td class="text_center">'+rowIdx+'</td>';
											serviceNewArea += ' 				<td class="text-center">' + roofObj + '</td>';
											serviceNewArea += '			</tr>';							
											rowIdx++;				
										});			
										//serviceNewArea += '				 </tbody>';
										//serviceNewArea += '			 </table>';												
										//serviceNewArea += '		 </div>';
									}
										serviceNewArea += '				 </tbody>';
										serviceNewArea += '			 </table>';												
										serviceNewArea += '		 </div>';

									 
									//District email
								}
								else {
									serviceNewArea = serviceNewArea.replaceAll("%DCSI_USE_CHANGED%","");
									serviceNewArea = serviceNewArea.replaceAll("%DCSI_REGION_CHANGED%","");
									serviceNewArea = serviceNewArea.replaceAll("%DCSI_DISTRICT_CHANGED%","");
									serviceNewArea = serviceNewArea.replaceAll("%DCSI_EMAIL_CHANGED%","");

								}

								// template setting end

								//console.log( externalSystem.XDCSI.DCSI_SERVICE_NEW);

								html += salesOldArea;
								html += salesNewArea;
								html += '<div style="clear:both"></div>';
								html += serviceOldArea;
								html += serviceNewArea;
								html += '<div style="clear:both"></div>';


								html += '		 </div>';
								html += '	 </td>';
								html += '</tr>';	

								html = html.replaceAll("%DCSI_USE_CHANGED%","");
								html = html.replaceAll("%DCSI_REGION_CHANGED%","");
								html = html.replaceAll("%DCSI_DISTRICT_CHANGED%","");
								html = html.replaceAll("%DCSI_EMAIL_CHANGED%","");

								//console.log(html);
								
							}
							else {


								if(flag == "D"){
								
								html += '<tr style="display: none;">';
								html += '    <td colspan="6">';
								html += '        <div class="form-group">';
								html += '		     <label for="comment">'+i18n_master.getText('LBL_COMMENT')+':</label>';
								if(Notifications.data.status == "RQ"){
									html += '		 <textarea class="form-control" rows="3" id="confirm_comment_' + domidx + '"></textarea>';
								}else{
									html += '		 <textarea class="form-control" rows="3" readonly="readonly">' + confirmText + '</textarea>';
								}
								html += '		 </div>';
								html += '	 </td>';
								html += '</tr>';
							}
						
						}
						// if roof index == 0 ,then break roof.
						//	return false;							
							 
						});

					 
						//------------------ Extra detail part ------------------


						
					}// end if
				}
	    	});// end each
	    	
	    	return html
		}
	},
	render:{
		dealerWorkflowTable: function(data, callback){
		
			Notifications.dTable.clear();
       		Notifications.dTable.rows.add(data).draw();
       		
			$('#noti-dealerworkflow-grid-table').on('draw.dt', function() {
		        Notifications.dTable.responsive.rebuild();
		        Notifications.dTable.responsive.recalc();
	        });
	        
	        callback();
	        
		},
		requestDealerTable: function(data){
		
			// console.log(data);
			
		    $('#dw_table_tbody_requestlist').empty();
		    
		    var singleHTML = Notifications.template.singHTMLTemplate(data,"D");
			var tableHTML = Notifications.template.tableHTMLTemplate(data,"D");
			
		    $('#dw_table_tbody_requestlist').append(singleHTML);
		    $('#dw_table_tbody_requestlist').append(tableHTML);
			
			// bind iCheck     
			$('#dw_modal_request_list .i-checks').iCheck({
			    checkboxClass: 'icheckbox_square-green',
			    radioClass: 'iradio_square-green',
			});
	        
	        // bind Check All
	        $('#dw_check_all').on('ifChecked', function() {
	            $("#dw_table_tbody_requestlist input[name='confirm_checkbox']").iCheck('check'); // — change input's state to checked
	        }).on('ifUnchecked', function() {
	            $("#dw_table_tbody_requestlist input[name='confirm_checkbox']").iCheck('uncheck'); // — change input's state to checked
			});
					
			$('.whitebackground').find('td').css({'background-color':'#ffffff'});
			$('.whitebackground .FIELD_CHANGED').find('td').css({'background-color':'#ddd'});
		},
		requestEmployeeTable: function(data){
		
			// console.log(data);
			
		    $('#de_table_tbody_requestlist').empty();
		    
		    var singleHTML = Notifications.template.singHTMLTemplate(data,"E");
			var tableHTML = Notifications.template.tableHTMLTemplate(data,"E");
			
		    $('#de_table_tbody_requestlist').append(singleHTML);
		    $('#de_table_tbody_requestlist').append(tableHTML);
			
			// bind iCheck     
			$('#de_modal_request_list .i-checks').iCheck({
			    checkboxClass: 'icheckbox_square-green',
			    radioClass: 'iradio_square-green',
			});
	        
	        // bind Check All
	        $('#de_check_all').on('ifChecked', function() {
	            $("input[name='confirm_checkbox']").iCheck('check'); // — change input's state to checked
	        }).on('ifUnchecked', function() {
	            $("input[name='confirm_checkbox']").iCheck('uncheck'); // — change input's state to checked
			});
					
			
		},
		showExtra: function(idx, flag){
			
			var aDom = $('#show_extra_W' + $.trim(idx)); // checkbox
		
		    $(aDom).closest('tr').next().toggle('fade'); // value Tr
		    if(flag == "D"){
			    $(aDom).closest('tr').next().next().toggle('fade'); // comment Tr
		    }
		},
		dealerEmployeeTable: function(data, callback){
		
			var requestedList = data["T_LIST"];
	    	//var roleList = data["T_ROLE"];
			
			// set Object variable
			Notifications.data.employeeUserData = data;
			// Notifications.data.gdprUserGridData = data;
			// Notifications.data.gdprUserRoleData = roleList;
			
			Notifications.eTable.clear();
       		Notifications.eTable.rows.add(requestedList).draw();
			
			$('#noti-employeeworkflow-grid-table').on('draw.dt', function() {
			
	            //$('#noti-employeeworkflow-grid-table .i-checks').iCheck({
		        //    checkboxClass: 'icheckbox_square-green',
		        //    radioClass: 'iradio_square-green',
		        //});
				
		        // clear iCheck
		        //$('#noti-employeeworkflow-grid-table > tbody .i-checks').iCheck('uncheck');
		        
				//if(!$.isEmptyObject(Notifications.data.selectedUser)){
				//	$('#noti-employeeworkflow-grid-table > tbody .i-checks [type=radio][value=' + Notifications.data.selectedUser['ZPRSNN'] + ']').parent().iCheck('check');
		        //}
		        
		        //$('#noti-employeeworkflow-grid-table > tbody .i-checks').on('ifClicked', function(event){
		        //    Notifications.selectEmployeeUserId(event.target);
		        //});
		        
		        Notifications.eTable.responsive.rebuild();
		        Notifications.eTable.responsive.recalc();
		        
		        Notifications.render.userRole('ew_');
		        
		        
	        });	
	        
	        callback();
		},
		partnerCode: function(data){
			var h = [];
			if(data.length > 0){
		        h.push('<option value="">=== ' + i18n_master.getText('LBL_DEALER_CODE') + ' ===</option>');
		        
				$(_.sortBy(data, 'ZPTNR_T')).each(function(idx, obj){
				
					var sapDealerCode = _.escape(obj["ZSYSCODE"].replaceAll("\\",""));
					var eddsDealerText = _.escape(obj["ZPTNR_T"].replaceAll("\\",""));
					var option = "";
					if(sapDealerCode != ""){
						option = "[" + sapDealerCode + "] " + eddsDealerText;
					}else{
						option = eddsDealerText;
					}
				
		       		h.push('<option value="' + obj["ZPTNR"] + '" sap-dealer-code="' + obj["ZSYSCODE"] + '" edds-dealer-name="' + eddsDealerText + '" partner-type="' + obj["ZPTNRTP"] + '">' + option + '</option>');
				});
			}else{
	       		h.push('<option value="">' + i18n_master.getText('MSG_NO_DATA') + '</option>');		
			}
			$("#gw_s_partner_code").html(h.join(""));	
			
			$("#gw_s_partner_code").selectpicker('refresh');
		},
		gdprWorkflowTable: function(data, role, callback){
		
			// set Object variable
			Notifications.data.gdprUserGridData = data;
			Notifications.data.gdprUserRoleData = role;
		
			Notifications.gTable.clear();
       		Notifications.gTable.rows.add(data).draw();
       		
			$('#noti-gdprworkflow-grid-table').on('draw.dt', function() {

		        Notifications.dTable.responsive.rebuild();
		        Notifications.dTable.responsive.recalc();
				Notifications.render.userRole('gw_');
	        });
	        
	        callback();
		},
		userRole: function(divId){
		
			var _grid_data = Notifications.data.gdprUserGridData;
			var _role_data = Notifications.data.gdprUserRoleData;
		
			_.forEach(_grid_data, function(item, value){
        	
	        	// role Array
	        	var roles = _.filter(_role_data, {'ZPRSNN':item['ZPRSNN']});
	        	
				var size = _.size(roles);
				var role_p = '';
				
				if(size == 0 ){
					item['ROLE_T_PRT'] = role_p;
				}else if(size == 1){
					$('div#gw_' + item['ZPRSNN'] ).text(roles[0]['ZROLET']);
					if(roles[0]['ZROLET'] != undefined) role_p = roles[0]['ZROLET'];
					item['ROLE_T_PRT'] = role_p;
				}else if(size > 1){
					var role = '';
					item['ROLE_T_PRT'] = role_p;
					_.forEach(roles, function(item2, value2){
						role += '<option>' + item2['ZROLET'] + '</option>';
						
						if(value2 == 0){
							role_p = item2['ZROLET']
						}else{
							role_p += ' / ' + item2['ZROLET']
						}
						
					});
					role = '<select style="width: 100%;">' + role + '</select>';
					
					item['ROLE_T_PRT'] += role_p;
					
					$('div#' + divId + item['ZPRSNN']).empty().append(role);
				}
				
	        });  
		},
		gdprNSCTable: function(data, callback){
		
			Notifications.gdprNSCTable.clear();
	        Notifications.gdprNSCTable.rows.add(data).draw();
	        
			$('#gp_gdpr_nsc_table').on('draw.dt', function() {
		        Notifications.gdprNSCTable.responsive.rebuild();
		        Notifications.gdprNSCTable.responsive.recalc();
	        });
	        
	        callback();
		},
		
		gdprTable: function(data, callback){
			Notifications.gdprTable.clear();
	        Notifications.gdprTable.rows.add(data).draw();
	        
			$('#gp_gdpr_table').on('draw.dt', function() {
		        Notifications.gdprTable.responsive.rebuild();
		        Notifications.gdprTable.responsive.recalc();
	        });
	        
	        callback();
			
		}
		
	},
	initTable: function(){
		
		Notifications.dTable = $('#noti-dealerworkflow-grid-table').DataTable({
            "retrieve": true,
            "autoWidth": false,
            "data": [],
            "columns": [
            {
                "data": "ZSYSCODE",
                "className": "text-center"
            }, {
                "data": "ZLEGALNM",
                "className": "text-left"
            }, {
                "data": "COUNT",
                "className": "text-center"
            }, {
                "data": "ZWSTATUST",
                "className": "text-left"
            }, {
                "data": "RQENAME",
                "className": "text-left"
            }, {
                "data": "ZRROLET",
                "className": "text-left"
            }, {
                "data": "ZRUANAME",
                "className": "text-left"
            }, {
                "data": "RQDATAB",
                "className": "text-center"
            }, {
                "data": "APENAME",
                "className": "text-left"
            }, {
                "data": "ZAROLET",
                "className": "text-left"
            }, {
                "data": "ZAUANAME",
                "className": "text-left"
            }, {
                "data": "APDATAB",
                "className": "text-center"
            }],
            "columnDefs": [
            
                //0 Dealer Code |  ZSYSCODE
				//1 Organization (it's the name of the Dealer) | ZLEGALNM
				//2 No. of changed | COUNT
				//3 Status | ZWSTATUS / ZWSTATUST
				//4 Requested by user | RQENAME
				//5 Role of Requester User | ZRROLE / ZRROLET
				//6 Name of Requester User | ZRUANAME
				//7 Change Date | APDATAB
				//8 Approved by user ID | APENAME
				//9 Role of the Approver | ZAROLE / ZAROLET
				//10 Name of Approver User | ZAUANAME
				//11 Approval Date | APDATAB     
            
            	{
            		"targets": [1],
                    "data": "ZLEGALNM",
                    "render": function(data, type, row, meta) {
                        return _.escape(data.replaceAll("\\",""));
                    }
            	},{
            		"targets": [2],
                    "data": "COUNT",
                    "render": function(data, type, row, meta) {
                        return '<span class="hide">'+data+'</span>' + '<a href="javascript:Notifications.load.getRequestDetail( \'' + row["BUKRS"] + '\' , \'' + row["ZPTNR"] + '\' , \'' + row["ZWSTATUS"] + '\' , \'' + row["RQENAME"] + '\' , \'' + row["RPRSNN"] + '\', \'' + formatter.getFormatValue(row["RQDATAB"],"dd/MM/yyyy") + '\' , \'' + row["ZSYSCODE"] + '\' , \'' + encodeURIComponent( _.escape(row["ZLEGALNM"].replaceAll("\\",""))) + '\');">' + row["COUNT"] + '</a>';
                    }
            	},{
                    "targets": [7],
                    "render": function(data, type, row, meta) {
                    	return '<span class="hide">'+data+'</span>' + formatter.getFormatValue( data ,"dd/MM/yyyy");
                    }
                },{
                    "targets": [11],
                    "render": function(data, type, row, meta) {
                    	return '<span class="hide">'+data+'</span>' + formatter.getFormatValue( data ,"dd/MM/yyyy");
                    }
                }
                
            ],
   			order: [7, 'desc'],
			//"pageLength": 10,
			"pageLength" : (($.localStorage.get("grid-table_length") && $.localStorage.get("grid-table_length") != undefined)?$.localStorage.get("grid-table_length"):10),
			//"dom": "<'row'<'col-sm-12'tr>>" + "<'row paging-bar'<'col-sm-5'i><'col-sm-7'p>>"
			"initComplete": function(settings, json) {
				$('select[name=noti-dealerworkflow-grid-table_length]').on('change',function(){
					if ( !$.localStorage.get("grid-table_length")  || $.localStorage.get("grid-table_length") == undefined) {
						$.localStorage.set("grid-table_length",$('select[name=noti-dealerworkflow-grid-table_length]').val());
					}
					else {
						$.localStorage.set("grid-table_length",$('select[name=noti-dealerworkflow-grid-table_length]').val());
					}
				});
			},
            "language": {
                "url": "/com.kme.edds.resources/js/plugins/dataTables/locales/datatable_" + $.sessionStorage.get("LANGUAGE") + ".json"
            }
        });
        
       Notifications.eTable = $('#noti-employeeworkflow-grid-table').DataTable({
            "retrieve": true,
            "data": [],
            "autoWidth": false,
            "columns": [
            
            /*
			*	Dealer Code | ZDEALERN
			*	Organization | ZPTNR_T
			*	Portal ID | ZPOTALID
			*	Name | ZUANAME
			*	No. of Changed | COUNT
			*	Workflow | ZWSTATUST
			*	Requested by User | RQENAME
			*	Role of requester User | ZRROLE / ZRROLET
			*	Name of Requester User | ZRUANAME
			*	Change Date | APDATAB
			*	Approved by user ID | APENAME
			*	Role of the Approver | ZAROLE / ZAROLET
			*	Name of Approver User | HENAME
			*	Approval Date | APDATAB
			*/	
			/**
				BUKRS                          KB08
				ZPTNR                          1000039852
				ZSYSCODE                       C11VC07175
				ZLEGALNM                       AUTO AURELIA S.R.L.
				ZPOTALID                       KIT0717513
				ZUANAME                        Giacomo Piaggio
				COUNT                                  4
				ZWSTATUS                       RQ
				RQENAME                        KME_AESE
				RPRSNN                         P1000022070
				RQDATAB                        12.10.2018
				ZRROLE                         ROLE025
				ZRROLET                        Network Development
				ZRUANAME                       Giacomo Piaggio
				APENAME
				APPRSNN
				APDATAB
				ZAROLE
				ZAROLET
				ZAUANAME
				ZWSTATUST                      Requested
				BUKRS_T                        KMIT
				COUNTRY_T                      ITALY
			**/
            {
                "data": "ZSYSCODE"
            },{
                "data": "ZLEGALNM"
            },{
                "data": "ZPOTALID",
                "className": "text-center"
            },{
                "data": "ZUANAME",
                "className": "text-left"
            },{
                "data": "COUNT",
                "className": "text-center"
            },{
                "data": "ZWSTATUS"
            },{
                "data": "RQENAME"
            },{
                "data": "ZRROLET"
            },{
                "data": "ZRUANAME"
            },{
                "data": "RQDATAB"
            },{
                "data": "APENAME"
            },{
                "data": "ZAROLET"
            },{
                "data": "ZAUANAME"
            },{
                "data": "APDATAB"
            }],
            "columnDefs": [
            	{
                    "targets": [1],
                    "data": "ZLEGALNM",
                    "render": function(data, type, row, meta) {
                    	if(row['ZPTNR'] != ''){
                    		return row['ZLEGALNM'];
                    	}else{
                    		return row['ZORGANIZ_T'];
                    	}
                    }
                },{
            		"targets": [3],
                    "data": "ZUANAME",
                    "render": function(data, type, row, meta) {
						//return data; 
						return data.toProperCase();
						
						//var a = data.replace(/\w\S*/g, function(txt){return (txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())   ;}); 
						//return a.replace(/\-\S/g, function(txt2,n){return "-"+a.charAt(n+1).toUpperCase();});
	                 
                    }
            	},{
            		"targets": [4],
                    "data": "COUNT",
                    "render": function(data, type, row, meta) {
                        return '<span class="hide">'+data+'</span>' + '<a href="javascript:Notifications.load.getRequestEmployeeDetail(\'' + row["BUKRS"] + '\' , \'' + row["ZPTNR"] + '\' ,\'' + row["ZPRSNN"] + '\' , \'' + row["ZWSTATUS"] + '\' , \'' + row["RQENAME"] + '\' , \'' + row["RPRSNN"] + '\', \'' + formatter.getFormatValue(row["RQDATAB"],"dd/MM/yyyy") + '\' ,  \'' + row["ZPOTALID"] + '\' ,  \'' + row["APPRSNN"] + '\');">'+data+'</a>';
                    }
            	},{
            		"targets": [5],
                    "data": "ZWSTATUS",
                    "render": function(data, type, row, meta) {
                        return row["ZWSTATUST"];
                    }
            	},{
            		"targets": [9],
                    "data": "RQDATAB",
                    "render": function(data, type, row, meta) {
                       	return '<span class="hide">'+data+'</span>' + formatter.getFormatValue( data ,"dd/MM/yyyy");
                    }
                },{
            		"targets": [13],
                    "data": "APDATAB",
                    "render": function(data, type, row, meta) {
                       	return '<span class="hide">'+data+'</span>' + formatter.getFormatValue( data ,"dd/MM/yyyy");
                    }
                }
            ],
            order: [[9, 'desc'],[5, 'desc']], // 
            ordering: true,
			//"pageLength": 10,
			"pageLength" : (($.localStorage.get("grid-table_length") && $.localStorage.get("grid-table_length") != undefined)?$.localStorage.get("grid-table_length"):10),
            //"dom": "<'row'<'col-sm-12'tr>>" + "<'row paging-bar'<'col-sm-5'i><'col-sm-7'p>>",
            "initComplete": function(settings, json) {
				// bindIChecksButtons();
				$('select[name=noti-employeeworkflow-grid-table_length]').on('change',function(){
					if ( !$.localStorage.get("grid-table_length")  || $.localStorage.get("grid-table_length") == undefined) {
						$.localStorage.set("grid-table_length",$('select[name=noti-employeeworkflow-grid-table_length]').val());
					}
					else {
						$.localStorage.set("grid-table_length",$('select[name=noti-employeeworkflow-grid-table_length]').val());
					}
				});
            },
            "language": {
                "url": "/com.kme.edds.resources/js/plugins/dataTables/locales/datatable_" + $.sessionStorage.get("LANGUAGE") + ".json"
            },
        });
        
		Notifications.gTable = $('#noti-gdprworkflow-grid-table').DataTable({
            "retrieve": true,
            "data": [],
            "autoWidth": true,
            "columns": [
            {
                "data": "ZDEALERN",
                "className": "text-center"
            },{
                "data": "ZPTNR_T"
            },{
                "data": "ZUANAME"
            },{
                "data": "ZPOTALID"
            },{
                "data": "ZROLET"
            },{
                "data": "ZUSTATUS_T"
            },{
                "data": "ERDAT",
                "className": "text-center"
            },{
                "data": "DAYS",
                "className": "text-center"
            },{
                "data": "POCDAT",
                "className": "text-center"
            },{
                "data": "LOGDAT",
                "className": "text-center"
            }],
            
            /**************************************************************
			Dealer Code | ZDEALERN
			Organization (it's instead the name of the dealer) | ZPTNR_T
			User Name | ZUANAME
			Portal ID | ZPOTALID
			User Role | ROLE_T
			Status | ZUSTATUS_T
			Created Date | ERDAT
			Day Count | DAYS
			Privacy Policy | POCDAT POCTIM POCCHK
			Cookie Policy |  LOGDAT LOGTIM LOGCHK
	         **************************************************************/   
            
            "columnDefs": [
				{
                    "targets": [2],
                    "data": "ZUANAME",
                    "render": function(data, type, row, meta) {					 
						//return data;
						return data.toProperCase();
						//var a = data.replace(/\w\S*/g, function(txt){return (txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())   ;}); 
						//return a.replace(/\-\S/g, function(txt2,n){return "-"+a.charAt(n+1).toUpperCase();});
                    }
                },
            	{
                    "targets": [4],
                    "data": "ZROLET",
                    "render": function(data, type, row, meta) {
	                    return data;// '<span style="display:none;">'+data+'</span><div id="gw_'+row["ZPRSNN"]+'"></div>';
                    }
                },{
                    "targets": [6],
                    "data": "ERDAT",
                    "render": function(data, type, row, meta) {
                        return '<span class="hide">'+row["ERDAT"]+'</span>' + formatter.getFormatValue( row["ERDAT"] ,"dd/MM/yyyy");
                    }
                },{
                    "targets": [7],
                    "data": "DAYS",
                    "render": function(data, type, row, meta) {
                        return data.replaceAll("*","");
                    }
                },{
                    "targets": [8],
                    "data": "POCDAT",
                    "render": function(data, type, row, meta) {
                    	return '<span class="hide">'+row["POCDAT"]+''+row["POCTIM"]+'</span>' + formatter.getFormatValue( row["POCDAT"] ,"dd/MM/yyyy") + ' ' + row["POCTIM"].replace("00:00:00", "");
                    }
                },{
                    "targets": [9],
                    "data": "LOGDAT",
                    "render": function(data, type, row, meta) {
                    	return '<span class="hide">'+row["LOGDAT"]+''+row["LOGTIM"]+'</span>' + formatter.getFormatValue( row["LOGDAT"] ,"dd/MM/yyyy") + ' ' + row["LOGTIM"].replace("00:00:00", "");
                    }
                }
            ],
            order: [[8, 'desc'],[9, 'desc']],
			//"pageLength": 10,
			"pageLength" : (($.localStorage.get("grid-table_length") && $.localStorage.get("grid-table_length") != undefined)?$.localStorage.get("grid-table_length"):10),
            //"dom": "<'row'<'col-sm-12'tr>>" + "<'row paging-bar'<'col-sm-5'i><'col-sm-7'p>>",
            dom: '<"html5buttons"B>lTfgitp',
            buttons: [
                    { extend: 'copy'},
                    {extend: 'excel', title: "GDPR_WORKFLOW" + "_" + new Date().toJSON().slice(0,10),
                    	customize: function(){
                    		//console.log("excel down@");
                    	}
                    },
                ],
            "initComplete": function(settings, json) {
				// renderUserRole();
				$('select[name=noti-gdprworkflow-grid-table_length]').on('change',function(){
					if ( !$.localStorage.get("grid-table_length")  || $.localStorage.get("grid-table_length") == undefined) {
						$.localStorage.set("grid-table_length",$('select[name=noti-gdprworkflow-grid-table_length]').val());
					}
					else {
						$.localStorage.set("grid-table_length",$('select[name=noti-gdprworkflow-grid-table_length]').val());
					}
				});
            },
            "language": {
                "url": "/com.kme.edds.resources/js/plugins/dataTables/locales/datatable_" + $.sessionStorage.get("LANGUAGE") + ".json"
            },
        });
        
        Notifications.gdprNSCTable = $('#gp_gdpr_nsc_table').DataTable({
            "retrieve": true,
            "data": [],
            "autoWidth": true,
            "columns": [
			{
                "data": "ZROLET"
            }, {
                "data": "ZPOTALID",
                "className": "text-center"
            },{
                "data": "ZUANAME"
            },{
                "data": "ZBEMAIL"
            }],
            "columnDefs": [
            	{
                    "targets": [0],
                    "data": "ZROLET",
                    "render": function(data, type, row, meta) {
	                    return data;
                    }
                },{
                    "targets": [1],
                    "data": "ZPOTALID",
                    "render": function(data, type, row, meta) {
                        return data;
                    }
                },{
                    "targets": [2],
                    "data": "ZUANAME",
                    "render": function(data, type, row, meta) {
					   //return data;
					   return data.toProperCase();
					   //var a = data.replace(/\w\S*/g, function(txt){return (txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())   ;}); 
					   //return a.replace(/\-\S/g, function(txt2,n){return "-"+a.charAt(n+1).toUpperCase();});
                    }
                },{
                    "targets": [3],
                    "data": "ZBEMAIL",
                    "render": function(data, type, row, meta) {
                        return data;
                    }
                }
            ],
            // order: [[7, 'desc'],[8, 'desc']],
		   // "pageLength": 10,
		   "pageLength" : (($.localStorage.get("grid-table_length") && $.localStorage.get("grid-table_length") != undefined)?$.localStorage.get("grid-table_length"):10),
            
            //"dom": "<'row'<'col-sm-12'tr>>" + "<'row paging-bar'<'col-sm-5'i><'col-sm-7'p>>",
            "initComplete": function(settings, json) {
				//this.api().columns.adjust();
				$('select[name=gp_gdpr_nsc_table_length]').on('change',function(){
					if ( !$.localStorage.get("grid-table_length")  || $.localStorage.get("grid-table_length") == undefined) {
						$.localStorage.set("grid-table_length",$('select[name=gp_gdpr_nsc_table_length]').val());
					}
					else {
						$.localStorage.set("grid-table_length",$('select[name=gp_gdpr_nsc_table_length]').val());
					}
				});
            },
            "language": {
                "url": "/com.kme.edds.resources/js/plugins/dataTables/locales/datatable_" + $.sessionStorage.get("LANGUAGE") + ".json"
            },
        });
        
       Notifications.gdprTable = $('#gp_gdpr_table').DataTable({
            "retrieve": true,
            "data": [],
            "autoWidth": false,
            "columns": [
            {
                "data": "ZDEALERN"
            },{
                "data": "ZPTNR_T"
            },{
                "data": "ZROLET"
            },{
                "data": "ZPOTALID",
                "className": "text-center"
            },{
                "data": "ZPERSONTYPE_T"
            },{
                "data": "ZUANAME"
            },{
                "data": "ZUSTATUS"
            },{
                "data": "ERDAT"
            },{
                "data": "DAYS"
            }],
            "columnDefs": [
            	{
                    "targets": [0],
                    "data": "ZDEALERN",
                    "render": function(data, type, row, meta) {
                   		return data
                    }
                },{
                    "targets": [2],
                    "data": "ZUANAME",
                    "render": function(data, type, row, meta) {
						//return data;
						return data.toProperCase();
						//var a = data.replace(/\w\S*/g, function(txt){return (txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())   ;}); 
						//return a.replace(/\-\S/g, function(txt2,n){return "-"+a.charAt(n+1).toUpperCase();});
                    }
                },{
                    "targets": [3],
                    "data": "ZPOTALID",
                    "render": function(data, type, row, meta) {
                        return data;
                    }
                },{
                    "targets": [4],
                    "data": "ZPERSONTYPE_T",
                    "render": function(data, type, row, meta) {
                    	var text = "";
                    	if(row["ZDEALFLAG_T"] != ""){
                    		text += row["ZDEALFLAG_T"];
                    	}
                    	if(row["ZPERSONTYPE_T"] != ""){
                    		text += " (" + row["ZPERSONTYPE_T"] + ")";
                    	}
                        return text;
                    }
                },{
                    "targets": [5],
                    "data": "ZUANAME",
                    "render": function(data, type, row, meta) {
						//return data;
						return data.toProperCase();
						//var a = data.replace(/\w\S*/g, function(txt){return (txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())   ;}); 
						//return a.replace(/\-\S/g, function(txt2,n){return "-"+a.charAt(n+1).toUpperCase();});
                    }
                },{
                    "targets": [6],
                    "data": "ZUSTATUS",
                    "render": function(data, type, row, meta) {
                        return data;
                    }
                },{
                    "targets": [7],
                    "data": "ERDAT",
                    "render": function(data, type, row, meta) {
                        return formatter.getFormatValue( row["ERDAT"] ,"dd/MM/yyyy") + " " + row["ERZET"].replace("00:00:00", "");
                    }
                },{
                    "targets": [8],
                    "data": "DAYS",
                    "render": function(data, type, row, meta) {
                        return data.replaceAll("*","");
                    }
                }
            ],
            //order: [12, 'desc'],
			//"pageLength": 10,
			"pageLength" : (($.localStorage.get("grid-table_length") && $.localStorage.get("grid-table_length") != undefined)?$.localStorage.get("grid-table_length"):10),
            
            //"dom": "<'row'<'col-sm-12'tr>>" + "<'row paging-bar'<'col-sm-5'i><'col-sm-7'p>>",
            dom: '<"html5buttons"B>lTfgitp',
            buttons: [
                    { extend: 'copy'},
                    {extend: 'excel', title: "GDPRProcessEmployeeList" + "_" + new Date().toJSON().slice(0,10),
                    	customize: function(){
                    		//console.log("excel down@");
                    	}
                    },
                ],
            "initComplete": function(settings, json) {
	            //this.api().columns.adjust();
				// renderUserRole();
				$('select[name=gp_gdpr_table_length]').on('change',function(){
					if ( !$.localStorage.get("grid-table_length")  || $.localStorage.get("grid-table_length") == undefined) {
						$.localStorage.set("grid-table_length",$('select[name=gp_gdpr_table_length]').val());
					}
					else {
						$.localStorage.set("grid-table_length",$('select[name=gp_gdpr_table_length]').val());
					}
				});
            },
            "language": {
                "url": "/com.kme.edds.resources/js/plugins/dataTables/locales/datatable_" + $.sessionStorage.get("LANGUAGE") + ".json"
            },
        });
        
	},
	confirmDealerWorkflow: function(e, obj , status){
		
		// make submit LIST object
		//var checkedData = $("#dw_table_tbody_requestlist > .checked input[name=confirm_checkbox]");
		var checkedData = $("[id=dw_table_tbody_requestlist] .checked input[name=confirm_checkbox]");
		
		if(checkedData.length == 0){
			swal(i18n_master.getText('MSG_WARNNING'), 'Please select approval items', "warning");
			return;
		}

		$._CSRF.generationCSRFToken( "Workflow" + "|" + $(this).attr('id') );

		var workflowData = {
			BUKRS: Notifications.data.company_code,
			ZPTNR: Notifications.data.edd_code,
			ZWSTATUS: status,
			dp_dtsg: $._CSRF.data.dp_dtsg, // <%-- CSRF Keys --%>
			job_name: $._CSRF.data.job_name, // <%-- /CSRF Keys --%>
			LIST:[]
		}
		
		var _confirmComment = "";
		var _isChangeDealerGroupPartnerType = false;
		$(checkedData).each(function(idx){
			var rowIndex = $(this).attr('ROWINDEX');
			var confirmComment = $('#confirm_comment_' + $.trim(rowIndex)).val();
			
			var rowData = {
				ZTABNM: $(this).attr("ZTABNM"),
				ZFNAME: $(this).attr("ZFNAME"),
				RQDATAB: formatter.getUnformatDate( $(this).attr("RQDATAB"),"dd/MM/yyyy"),
				RQUEZET: $(this).attr("RQUEZET"),
				RQENAME: $(this).attr("RQENAME"),
				RPRSNN: $(this).attr("RPRSNN"),
				APDATAB: formatter.getUnformatDate( Notifications.util.getCurrentDate(),"dd/MM/yyyy"),
				APUEZET: Notifications.util.getCurrentTime(),
				APENAME: Notifications.userInfo.ZPOTALID,
				APPRSNN: Notifications.userInfo.ZPRSNN,
				ZNOTES: confirmComment
			}
			// console.log("rowData : " + rowData);
			
			// setData 
			workflowData.LIST.push(rowData);
			
			if(confirmComment != ""){
				_confirmComment += " " + confirmComment;
			}
			
			// EDDS-1269 Blank Opening Date
        	if($(this).attr("ZFNAME") == "XPTNRTYPE"){
        		 
                console.log(idx);
                console.log(rowData);
                console.log($('#dw_table_tbody_requestlist table').eq(idx));
        		
                var asisPartnerType = $('#dw_table_tbody_requestlist table').eq(idx).find('tr').eq(1).find('td').eq(1).text();
    	        var tobePartnerType = $('#dw_table_tbody_requestlist table').eq(idx+1).find('tr').eq(1).find('td').eq(1).text();
    	        
    	        // Dealer Group Partner Type
    	        if(asisPartnerType == 'PART000' && tobePartnerType != 'PART000'){
    	        	_isChangeDealerGroupPartnerType = true;
    	        	
    	        	Notifications.data.partner_type = tobePartnerType;
    	        }
                
        	}
			
		});

		//console.log(JSON.stringify(workflowData))
		
//		var l = undefined;
//		if (typeof showUpdateLoading === "function") {
//			l = showUpdateLoading(e , obj);	
//		}else{
//			showLoading();
//		}
		showLoading();
		
		$.ajax({
			url: 'com.kme.edds.admin.WorkflowData?prtmode=setWorkflowRequest'
			,data : {
				data :JSON.stringify(workflowData),
				partner_code: Notifications.data.edd_code,  // for email 
				sap_dealer_code: Notifications.data.sap_dealer_code, // for email 
				sap_dealer_name: Notifications.data.sap_dealer_name, // for email 
				comments: _confirmComment, // for email rejected comments,
				requested_id: Notifications.data.requested_id
			}
			,cache: false
			,type: "post"
			,dataType: 'json'
			,success: function(response) {
				
				var type = response["TYPE"];
				var message = tooltip_master.decodeEntities(response["MESSAGE"].replaceAll("\\",""));
				
				// EDDS-1269 Blank Opening Date
	        	if(type == "S"){
	        		
	        		if(_isChangeDealerGroupPartnerType && document.location.href.indexOf('com.kme.edds.dealer.DealerDetail') == -1 ){
		        		
		        		var fieldName = message + '<br><br>';
		        		fieldName += '<b>Please go to Dealer Profile page and set the following data as mandatory before allowing to save it </b><br><br>'; 
		        		fieldName += 'Dealer Legal Entiry Name <br>';
						fieldName += 'Dealer Language <br>';
						fieldName += 'Dealer Code(for NSCs: Main Dealer Code SAP for the rest Main Dealer Code) <br>';
						fieldName += 'Dealer Status <br>';
						fieldName += 'Opening Date <br>';
						fieldName += 'Dealer Type <br>';
						fieldName += '<b>Dealer Contract information</b> <br>';
						fieldName += '    Address, Street, City, Country, Lat, Long, Telephone<br>';
						fieldName += '<b>Site Address information</b> <br>';
						fieldName += '    Address, Street, City, Country, Lat, Long, Telephone<br>';
						
						swal({
			                title: i18n_master.getText('MSG_SUCCESS'),
			                text: fieldName,
			                type: "info",
			                html:true,
			                showCancelButton: false,
			                confirmButtonColor: "#05141f",
			                confirmButtonText: 'Go to Dealer Profile',
			                cancelButtonText: 'No, already saved.',
							closeOnConfirm: true,
							closeOnCancel: true
			            },function(_isConfirm) {
			            	
		            		// go to dealer profile page
		            		moveToDetail(false, 
	            				_.escape(Notifications.data.company_code),
	            				_.escape(Notifications.data.partner_type),
	            				_.escape(Notifications.data.edd_code),
	            				_.escape(Notifications.data.partner_type), // _selectedDealer["ZPTNRP"] 
	            				_.escape(Notifications.data.partner_type), // _selectedDealer["ZPTNRR"] 
	            				_.escape(Notifications.data.sap_dealer_code),
	            				_.escape(Notifications.data.sap_dealer_name)
	            			);
			                    	
			            });
						
	        		}else{
	        			swal({
							title: i18n_master.getText('MSG_SUCCESS'),
							text: message,
							type: "success"
						} , function() {
							
							
							/*
								$("#dw-btn-search").trigger("click");
								
								$('#dw_modal_request_list').modal('hide');
								
								// re-count 
								getNotificationsData();
								try { 
									showWorkflowIcon(); 
								} 
								catch(err){
								}
							*/
						});
						
	        		}
					
					// re-count 
					getNotificationsData();
					
		         	// check all un check
				    $("#dw_check_all").iCheck("uncheck");
				    
				    $("#dw-btn-search").trigger("click");
					
					$('#dw_modal_request_list').modal('hide');
					
					// re-count 
					getNotificationsData();
					try { 
						showWorkflowIcon(); 
					} 
					catch(err){
					}
					
					// EDDS-1100 
					if(document.location.href.indexOf('com.kme.edds.dealer.list.DealerList') > -1){
						doSearch();
					}
					
				    
				}else{
					swal(i18n_master.getText('MSG_WARNNING'), message, "warning");
				}
				
	        	// EDDS-1324 KCZ: Workflow approval issue for "NV Sales Site Exclusivity"
//	        	if (l != undefined) {
//	        		hideUpdateLoading(l);
//				}else{
//					hideLoading();
//				}
	        	hideLoading();
				
			},error: function(xhr, status, error){
				if(xhr.getResponseHeader('content-type').startsWith("text/html")){	
					// alert(i18n_master.getText('MSG_FAILED') + " " + "Session Expired, please log on again.");
					// sessionExpiredLogout();
				}else{
					swal(i18n_master.getText('MSG_FAILED'), i18n_master.getText('MSG_FAILED_STATUS_CODE') + status + ", " + error , "error");
					hideLoading();
					// hideUpdateLoading(l);
				}
				
			}
		});
		
	},
	confirmEmployeeWorkflow: function(){
	
    	//if(Notifications.data.selectedUser == undefined){
    	//	swal("Check Radio Button", "Please check a employee data." , "warning");
    	//	return false;
    	//}
    
    	swal({
			title: "Approval",
			text: "Do you want to approve?",
			type: "warning",
			showCancelButton: true,
			showLoaderOnConfirm: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Yes",
            cancelButtonText: "No",
			closeOnConfirm: true,
			closeOnCancel: true
		},
		function(isConfirm) {
			
			console.log('isConfirm : ' + isConfirm);
			
			if (isConfirm) {
				
				showLoading();
				
				// <%-- Generation CSRF Token for save--%>
				$._CSRF.generationCSRFToken( "AccountConfirmControl" + "|" + 'btn_confirm' );
				
				var params = {
					prtmode: "approval",
					person_no: Notifications.data.selectedUser["ZPRSNN"],
					company_code: Notifications.data.selectedUser["BUKRS"],
					dp_dtsg: $._CSRF.data.dp_dtsg, // <%-- CSRF Keys --%>
					job_name: $._CSRF.data.job_name  // <%-- CSRF Keys --%>
				}
				
				/*
				* 03/06/2019 JHOH
				* Dealer Change feature, Portal ID change.
				*/
				var changeInfoObj = {};
				var changedPortalId = false;
				if(
					$('#de_table_tbody_requestlist').find('td[ztabnm=ZCAEDDT3060][zfname=ZPTNR]').length > 0
				&&	$('#de_table_tbody_requestlist').find('td[ztabnm=ZCAEDDT3060][zfname=ZPOTALID]').length > 0
				){
					changedPortalId = true;
					changeInfoObj.asisPortalId = $('#de_table_tbody_requestlist').find('td[ztabnm=ZCAEDDT3060][zfname=ZPOTALID]').attr('OLD_VAL');
					changeInfoObj.asisDealerCode = $('#de_table_tbody_requestlist').find('td[ztabnm=ZCAEDDT3060][zfname=ZDEALERN]').attr('OLD_VAL');
					changeInfoObj.asisEDDSCode = $('#de_table_tbody_requestlist').find('td[ztabnm=ZCAEDDT3060][zfname=ZPTNR]').attr('OLD_VAL');
				}
				
				if(changedPortalId){
					params.asisDealerInfo = JSON.stringify(changeInfoObj);
				}

				$.ajax({
					type: "POST",
					url: "com.kme.edds.sso.AccountConfirmControl",
					data: params,
					cache: false,
					dataType: 'json',
					success: function(res) {
					
						var type = res["TYPE"];
						var message = tooltip_master.decodeEntities(res["MESSAGE"].replaceAll("\\",""));
						// console.log("confirmEmployeeWorkflow");
						// console.log(res);
						
			        	if (type == "S") {
			        		
							swal({
								title: i18n_master.getText('MSG_SUCCESS'),
								text:  message,
								type: "success"
							});
							
							$("#de-btn-search").trigger("click");
							// data clear
							Notifications.data.selectedUser = {};
							$("#de_modal_request_list").modal("hide");
							// doSearch("<%=XSSEncoder.encodeJavaScript(StringUtil.checkNull(companyCode))%>");
							// re-count 
							getNotificationsData();
							
						} else {
							swal(i18n_master.getText('MSG_WARNNING'), message, "warning");
							// $("#de-btn-search").trigger("click");
						}
					},
					error: function(xhr, status, error){
						if(xhr.getResponseHeader('content-type').startsWith("text/html")){	
							// alert(i18n_master.getText('MSG_FAILED') + " " + "Session Expired, please log on again.");
							// sessionExpiredLogout();
						}else{
							swal(i18n_master.getText('MSG_FAILED'), i18n_master.getText('MSG_FAILED_STATUS_CODE') + status + ", " + error , "error");
							hideLoading();
						}
					}
				});
			} else {
				
				// $('#de_modal_request_list').modal('show');
				
				$('#btn-employee-previous').trigger('click');
				
				// swal(i18n_master.getText('MSG_CANCELLED'), "", "error");
				
			}
		});
	},
	rejectEmployeeWorkflow: function(){
		
		//if(Notifications.data.selectedUser == undefined){
    	//	swal("Check Radio Button", "Please check a employee data." , "warning");
    	//	return false;
    	//}
    	
    	swal({
		    title: "Employee Reject!",
		    text: "Reject message here:",
		   	type: "input",
		   	//text: "<textarea id='text'></textarea><input id='reject_text' />",
		   	//html: true,
		    //content: "input",
		    showCancelButton: true,
		    closeOnConfirm: true,
		    //inputPlaceholder: "Reject message here"
		}, function(inputValue) {
		
		    if (inputValue === false) return false;
		    if (inputValue === "") {
		        swal.showInputError("Please need to write reject reason.");
		        return false
		    }
		    
		    showLoading();
		    
			$._CSRF.generationCSRFToken( "AccountConfirmControl" + "<%=CSRFConstants.SPLIT_KEY%>" + 'btn_reject' );
			var params = {
				prtmode: "reject",
				person_no: Notifications.data.selectedUser["ZPRSNN"],
				company_code: Notifications.data.selectedUser["BUKRS"],
				reject_comment: inputValue,
				dp_dtsg: $._CSRF.data.dp_dtsg,
				job_name: $._CSRF.data.job_name
			}
			
			$.ajax({
				type: "POST",
				url: "com.kme.edds.sso.AccountConfirmControl",
				data: params,
				cache: false,
				dataType: 'json',
				success: function(res) {
		        	if (res["TYPE"] == "S") {
						swal({
							title: i18n_master.getText('MSG_SUCCESS'),
							text: res["MESSAGE"],
							type: "success"
						}, function() {
							$("#de-btn-search").trigger("click");
							// data clear
							Notifications.data.selectedUser = {};
							
							$("#de_modal_request_list").modal("hide");
							
							// doSearch("<%=XSSEncoder.encodeJavaScript(StringUtil.checkNull(companyCode))%>");
							
							// re-count 
							getNotificationsData();
							
						});
		                
					} else {
						swal(i18n_master.getText('MSG_WARNNING'), i18n_master.getText('MSG_FAILED_STATUS_CODE') + res["MESSAGE"], "warning");
						// $("#de-btn-search").trigger("click");
					}
				},
				error: function(xhr, status, error){
					if(xhr.getResponseHeader('content-type').startsWith("text/html")){	
						// alert(i18n_master.getText('MSG_FAILED') + " " + "Session Expired, please log on again.");
						// sessionExpiredLogout();
					}else{
						swal(i18n_master.getText('MSG_FAILED'), i18n_master.getText('MSG_FAILED_STATUS_CODE') + status + ", " + error , "error");
						hideLoading();
					}
				}
			});			
		});
	},
	util:{
		getCurrentDate: function(){
			var date = new Date();
			var year = String(date.getFullYear());
			var month = String((date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1));
			var day = String(date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
			var today = day + "/" + month + "/" + year;
			return today;
		},
		getCurrentTime: function(){
			var time = new Date();
			return ("0" + time.getHours()).slice(-2) + ":" + ("0" + time.getMinutes()).slice(-2) + ":" + ("0" + time.getSeconds()).slice(-2);
		}

	},
	selectEmployeeUserId: function(obj){
		var tr = obj;
		while(tr.tagName != 'TR' && tr.tagName != null) tr = tr.parentNode;

		$(tr).removeClass('selected');
		Notifications.eTable.$('tr.selected').removeClass('selected');
		$(tr).addClass('selected');
		
		var data = Notifications.eTable.rows('.selected').data();
		if(!$.isEmptyObject(data)){
        	Notifications.data.selectedUser = data[0];
        	if(Notifications.data.selectedUser["ZWSTATUS"] == "RQ" || Notifications.data.selectedUser["ZWSTATUS"] == "CR"){
        		$("#de-btn-approval,#de-btn-reject").removeAttr("disabled").removeClass("disabled");
        	}else{
        		$("#de-btn-approval,#de-btn-reject").attr("disabled", true).addClass("disabled");
        	}
        }else{
        	Notifications.data.selectedUser = undefined;
        	$("#de-btn-approval,#de-btn-reject").attr("disabled", true).addClass("disabled");
        }
	},
	moveToDetail: function(companyCode, personCode , userType , partnerCode, partnerType, sapDealerCode, workflowStatus){
		showLoading();
		Form.submit('com.kme.edds.admin.UserControl',{
			company_code: companyCode,
			person_code: personCode,
			user_type: userType,
			partner_code: partnerCode,
			partner_type: partnerType,
			sap_dealer_code: sapDealerCode,
			workflow_status: workflowStatus,
			return_url: "com.kme.edds.admin.WorkflowEmployee" // MENU012 : User Management
		});
	}
}

function showNotificationsModal(){

	if(Notifications.userInfo == null){
		Notifications.userInfo = $.sessionStorage.get("USER_INFO");
		Notifications.menuInfo = $.sessionStorage.get("OMENU");
	}

	var startDate = moment().subtract(7,'days').format('DD/MM/YYYY'); 

	if($("#modal_notifications").length == 0 ){
		
		var h = [];
		h.push('<div class="modal fade " id="modal_notifications" tabindex="-1" role="dialog" aria-hidden="true">');
		h.push('    <div class="modal-dialog modal-lg full-width">');
		h.push('        <div class="modal-content animated fadeIn">');
		h.push('            <div class="modal-header">');
		h.push('                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>');
		h.push('                <h4 class="modal-title" rv-i18n="LBL_WORKFLOW_NOTIFICATIONS"></h4>');
		
		
		
		h.push('            </div>');
		h.push('            <div class="modal-body">');
		h.push('                <div class="panel panel-primary">');
		h.push('                    <div class="panel-body">');

		h.push('						<div class="wrapper wrapper-content animated fadeInUp">');
		h.push('							<div class="ibox">');
		h.push('								<div class="ibox-content">');
		
		h.push('									<div class="row hide">');
		h.push('										<div class="col-lg-12">');
		h.push('											<div class="m-b-md">');
		h.push('												<h2>Notifications </h2>');
		h.push('											</div>');
		h.push('										</div>');
		h.push('									</div>');

		h.push('									<div class="row m-t-sm">');
		h.push('										<div class="col-lg-12">');
		h.push('											<div class="panel blank-panel">');
		h.push('												<div class="panel-heading">');
		h.push('													<div class="panel-options">');
		h.push('														<ul class="nav nav-tabs">');
		h.push('															<li id="li-tab-1" class="active"><a href="#tab-1" data-toggle="tab">Dealer Workflow <span class="label label-warning" id="notifications-log-dw-count">0</span> </a></li>');
		h.push('															<li id="li-tab-2" class=""><a href="#tab-2" data-toggle="tab">Employee Workflow <span class="label label-warning" id="notifications-log-ew-count">0</span> </a></li>');
		h.push('															<li id="li-tab-3" class=""><a href="#tab-3" data-toggle="tab">GDPR Workflow <span class="label label-warning" id="notifications-log-gw-count">0</span> </a></li>');
		h.push('														</ul>');
		h.push('													</div>');
		h.push('												</div>');

		h.push('												<div class="panel-body">');
		h.push('													<div class="tab-content">');
		h.push('														<div class="tab-pane active" id="tab-1">');

		h.push('														    <div class="panel panel-primary ">');
		h.push('														        <div class="panel-heading">');
		h.push('														            <h4 class="panel-title" style="padding-bottom: 10px;">');
		h.push('														                <a data-toggle="collapse" data-parent="#gdpr-accordion" href="#dealer-workflow-collapse">');
		h.push('														                    <i class="fa fa-bars "></i> Dealer Workflow List</a>');
		h.push('														            </h4>');
		h.push('														        </div>');
		h.push('														        <div id="dealer-workflow-collapse" class="panel-collapse collapse in">');
		h.push('														            <div class="panel-body">');
		h.push('																		<!-- search -->');
		h.push('																		<div class="row page_commmon_top_second">');
		h.push('																			<div class="col-sm-3 m-b-xs">');
		h.push('																				<select id="dw_s_company_code" name="dw_s_company_code" class="input-sm form-control input-s-sm inline">');
		h.push('																				</select>');
		h.push('																			</div>');
		h.push('																			<div class="col-sm-3 m-b-xs hidden-xs">');
		h.push('																				<select id="dw_s_status" name="dw_s_status" class="input-sm form-control input-s-sm inline">');
		h.push('																				</select>');
		h.push('																			</div>');
		h.push('																			<div class="col-sm-2 m-b-xs hidden-xs">');
		h.push('																				<input type="text" id="dw_s_edd_code" name="dw_s_edd_code" class="input-sm form-control" placeholder="EDD Code" rv-i18n="LBL_EDD_CODE" rv-i18n-placeholder>');
		h.push('																			</div>');
		h.push('																			<div class="col-sm-2 m-b-xs hidden-xs">');
		h.push('																				<input type="text" id="dw_s_sap_code" name="dw_s_sap_code" class="input-sm form-control" placeholder="SAP Code" rv-i18n="LBL_SAP_CODE" rv-i18n-placeholder>');
		h.push('																			</div>');
		h.push('																			<div class="col-sm-2">');
		h.push('																				<input type="text" id="dw_s_dealer_name" name="dw_s_dealer_name" class="input-sm form-control" placeholder="Name" rv-i18n="LBL_NAME" rv-i18n-placeholder>');
		h.push('																			</div>');
		h.push('																		</div>');
		h.push('																		<!-- /.search -->');
		h.push('																		<!-- buttons -->');
		h.push('																		<div class="row pull-right form-control-static">');
		h.push('																			<div class="col-lg-12">');
		h.push('																				<button type="button" class="btn btn-sm btn-primary" data-style="expand-right" id="dw-btn-search" data-dismiss="modal"> <i class="fa fa-search"></i> <span class="hidden-xs" rv-i18n="BTN_SEARCH">Search</span></button>');
		h.push('																			</div>');
		h.push('																		</div>');
		h.push('																		<!-- /.buttons -->');
		h.push('																		<div class="ibox-content no-padding">');
		h.push('																			<div class="table-responsive">');
		h.push('																				<table id="noti-dealerworkflow-grid-table" class="table table-striped table-bordered dt-responsive nowrap table-hover" cellspacing="0" width="100%">');
		h.push('																					<thead>');
		h.push('																						<tr>');
		h.push('																							<th rv-i18n="LBL_DEALER_CODE">Dealer Code</th>'); // Dealer Code |  ZSYSCODE
		h.push('																							<th rv-i18n="LBL_ORGANIZATION">Organization</th>'); // Organization (it's the name of the Dealer) | ZLEGALNM
		h.push('																							<th rv-i18n="LBL_NO_OF_CHANGED">No. of Changed</th>'); // No. of changed | COUNT
		h.push('																							<th rv-i18n="LBL_STATUS">Status</th>'); // Status | ZWSTATUS / ZWSTATUST
		h.push('																							<th rv-i18n="LBL_REQUESTED_BY_USER"> Requested by user</th>'); // Requested by user | RQENAME
		h.push('																							<th rv-i18n="LBL_ROLE_OF_REQUESTER_USER"> Role of Requester User</th>'); // Role of Requester User | ZRROLE / ZRROLET
		h.push('																							<th rv-i18n="LBL_NAME_OF_REQUESTER_USER"> Name of Requester User</th>'); // Name of Requester User | ZRUANAME
		h.push('																							<th rv-i18n="LBL_CHANGE_DATE">Change Date</th>'); // Change Date | APDATAB
		h.push('																							<th rv-i18n="LBL_APPROVED_BY_USER_ID">Approved by user ID</th>'); // Approved by user ID | APENAME
		h.push('																							<th rv-i18n="LBL_ROLE_OF_THE_APPROVER">Role of the Approver</th>'); // Role of the Approver | ZAROLE / ZAROLET
		h.push('																							<th rv-i18n="LBL_NAME_OF_THE_APPROVER">Name of the Approver</th>'); // Name of Approver User | ZAUANAME
		h.push('																							<th rv-i18n="LBL_APPROVED_DATE">Approved Date</th>'); // Approval Date | APDATAB
		h.push('																						</tr>');
		h.push('																					</thead>');
		h.push('																					<tbody>');
		h.push('																					</tbody>');
		h.push('																				</table>');
		h.push('																			</div>');
		h.push('																		</div>');
		h.push('														        	</div>');
		h.push('														        </div>');
		h.push('														    </div>');
		
		h.push('														</div>');

		h.push('														<div class="tab-pane" id="tab-2">');

		h.push('														    <div class="panel panel-primary ">');
		h.push('														        <div class="panel-heading">');
		h.push('														            <h4 class="panel-title" style="padding-bottom: 10px;">');
		h.push('														                <a data-toggle="collapse" data-parent="#gdpr-accordion" href="#dealer-employee-workflow-collapse">');
		h.push('														                    <i class="fa fa-bars "></i> Employee Workflow</a>');
		h.push('														            </h4>');
		h.push('														        </div>');
		h.push('														        <div id="dealer-employee-workflow-collapse" class="panel-collapse collapse in">');
		h.push('														            <div class="panel-body">');

		h.push('																		<!-- search -->');
		h.push('																		<div class="row page_commmon_top_second">');
		h.push('																			<div class="col-sm-3 m-b-xs">');
		h.push('																				<select id="de_s_company_code" name="de_s_company_code" class="input-sm form-control input-s-sm inline" style="height:35px;">');
		h.push('																				</select>');
		h.push('																			</div>');
		h.push('																			<div class="col-sm-3 m-b-xs hidden-xs">');
		h.push('																				<select id="de_s_status" name="de_s_status" class="input-sm form-control input-s-sm inline" style="height:35px;">');
		h.push('																				</select>');
		h.push('																			</div>');
		
		h.push('																			<div class="col-sm-6 m-b-xs hidden-xs searchtermClass" id="workflowEmployeeSearchTerm">');
		h.push('																			   <div class="col-sm-3 m-b-s hidden-xs" style="padding-right:5px">' );				
		h.push('																					<select id="date_term" name="date_term" class="input-sm form-control input-s-sm inline" style="height:35px;">');
		h.push('																						<option value="7" selected>1 '+  i18n_master.getText("BTN_WEEK")  +'</option>');
		h.push('																						<option value="30">1 '+  i18n_master.getText("LBL_MONTH")  +'</option>');
		h.push('																						<option value="90">3 '+  i18n_master.getText("LBL_MONTH")  +'</option>');
		h.push('																						<option value="MANUAL">'+  i18n_master.getText("LBL_DIRECT_INPUT")  +'</option>');
		h.push('																					</select>');
		h.push('																				</div>');


		//h.push('																				<div class="col-sm-10 m-b-xs hidden-xs searchtermClass" id="workflowEmployeeSearchTerm">');
		
		h.push('																			   	<div class="col-sm-4 m-b-xs hidden-xs" style="padding-right:0px;padding-left:0px;">' );
		h.push('																			   		<div class="input-group workflowEmployeeSearchDate">' );
		h.push('																						<span class="input-group-addon"><i class="fa fa-calendar"></i></span>');
		h.push('																						<input type="text" id="startDate" name="startDate"  class="workflowDate form-control" placeholder="DD/MM/YYYY" value="'+startDate +'"  readonly>');
		h.push('																			   		</div>');
		h.push('																			   	</div>');
		h.push('																			   	<div class="col-sm-1 m-t-xs hidden-xs" style="padding-right:0px;padding-left:0px;text-align:center;width:20px"><span class="workflowEmployeeSearchDate">~</span></div>' );
		h.push('																			   	<div class="col-sm-4 m-b-xs hidden-xs" style="padding-right:0px;padding-left:0px;">' );
		h.push('																			   		<div class="input-group workflowEmployeeSearchDate">' );
		h.push('																						<span class="input-group-addon"><i class="fa fa-calendar"></i></span>');
		h.push('																						<input type="text" id="endDate" name="endDate"  class="workflowDate form-control" placeholder="DD/MM/YYYY" value="'+Notifications.util.getCurrentDate()+'"  readonly>');
		h.push('																			   		</div>');
		h.push('																			   	</div>');		
		h.push('																			</div>');



		h.push('																		</div>');
		h.push('																		<!-- /.search -->');
					
		h.push('																		<!-- buttons -->');
		h.push('																		<div class="row pull-right form-control-static">');
		h.push('																			<div class="col-lg-12">');
		h.push('																				<button type="button" class="btn btn-sm btn-primary" id="de-btn-search" data-style="expand-right" data-dismiss="modal"> <i class="fa fa-search"></i> <span class="hidden-xs" rv-i18n="BTN_SEARCH">Search</span></button>');

/*
		if(!$.isEmptyObject(Notifications.userInfo.ROLE.M0001)){
			var roleObj = Notifications.userInfo.ROLE.M0001;
			// KME Admin OR NSC Admin
			if((roleObj.ZROLEGRP == "RGROUP01" && roleObj.ZRTYPE == "A") || (roleObj.ZROLEGRP == "RGROUP02" && roleObj.ZRTYPE == "A") ){
				h.push('																		<button type="button" class="btn btn-sm btn-primary disabled" id="de-btn-approval" data-style="expand-right" disabled="disabled" data-dismiss="modal"> <i class="fa fa-check-square-o"></i> <span> Approval</span></button>');
				h.push('																		<button type="button" class="btn btn-sm btn-primary disabled" id="de-btn-reject" data-style="expand-right"  disabled="disabled" data-dismiss="modal"> <i class="fa fa-window-close"></i> <span>  Reject</span></button>');
			}
		}
*/
		h.push('																			</div>');
		h.push('																		</div>');
		h.push('																		<!-- /.buttons -->');
					
		h.push('																		<div class="ibox-content no-padding">');
		h.push('																			<div class="table-responsive">');
		h.push('																				<table id="noti-employeeworkflow-grid-table" class="table table-striped table-bordered dt-responsive nowrap table-hover" cellspacing="0" width="100%">');
		h.push('																					<thead>');
		h.push('																						<tr>');
		h.push('																							<th rv-i18n="LBL_DEALER_CODE">Dealer Code</th>'); // Dealer Code |  ZDEALERN
		h.push('																							<th rv-i18n="LBL_ORGANIZATION">Organization</th>'); // Organization (it's the name of the Dealer) | ZLEGALNM
		h.push('				                                        	 							    <th rv-i18n="LBL_PORTAL_ID">Portal ID</th>');
		h.push('				                                        								    <th rv-i18n="LBL_NAME">Name</th>');		
		h.push('																							<th rv-i18n="LBL_NO_OF_CHANGED">No. of Changed</th>'); // No. of changed | COUNT
		h.push('																							<th rv-i18n="LBL_STATUS">Status</th>'); // Status | ZWSTATUS / ZWSTATUST		
		h.push('																							<th rv-i18n="LBL_REQUESTED_BY_USER"> Requested by user</th>'); // Requested by user | RQENAME		
		h.push('																							<th rv-i18n="LBL_ROLE_OF_REQUESTER_USER"> Role of Requester User</th>'); // Role of Requester User | ZRROLE / ZRROLET
		h.push('																							<th rv-i18n="LBL_NAME_OF_REQUESTER_USER"> Name of Requester User</th>'); // Name of Requester User | ZRUANAME		
		h.push('																							<th rv-i18n="LBL_CHANGE_DATE">Change Date</th>'); // Change Date | APDATAB
		h.push('																							<th rv-i18n="LBL_APPROVED_BY_USER_ID">Approved by user ID</th>'); // Approved by user ID | APENAME
		h.push('																							<th rv-i18n="LBL_ROLE_OF_THE_APPROVER">Role of the Approver</th>'); // Role of the Approver | ZAROLE / ZAROLET
		h.push('																							<th rv-i18n="LBL_NAME_OF_THE_APPROVER">Name of the Approver</th>'); // Name of Approver User | ZAUANAME
		h.push('																							<th rv-i18n="LBL_APPROVED_DATE">Approved Date</th>'); // Approval Date | APDATAB

		h.push('																						</tr>');
		h.push('																					</thead>');
		h.push('																					<tbody>');
		h.push('																					</tbody>');
		h.push('																				</table>');
		h.push('																			</div>');
		h.push('																		</div>');

		h.push('														        	</div>');
		h.push('														        </div>');
		h.push('														    </div>');
		
		h.push('														</div>');

		h.push('														<div class="tab-pane" id="tab-3">');
		
		h.push('															<div class="panel-group" id="gdpr-accordion">');
		
		h.push('															    <div class="panel panel-primary ">');
		h.push('															        <div class="panel-heading">');
		h.push('															            <h4 class="panel-title" style="padding-bottom: 10px;">');
		h.push('															                <a data-toggle="collapse" data-parent="#gdpr-accordion" href="#gdpr-collapse2">');
		h.push('															                    <i class="fa fa-bars"></i> GDPR Process List</a>');
		h.push('															            </h4>');
		h.push('															        </div>');
		h.push('															        <div id="gdpr-collapse2" class="panel-collapse collapse in">');
		h.push('															            <div class="panel-body">');
		h.push('																			<!-- search -->');
		h.push('																			<div class="row page_commmon_top_second">');
		h.push('												                                <div class="col-sm-6 m-b-xs">');
		h.push('												                                    <select class="input-sm form-control input-s-sm inline" id="gp_m_company_code"></select>');
		h.push('												                                </div>');
		h.push('												                                <div class="col-sm-6 m-b-xs">&nbsp;');
		h.push('												                                </div>');
		h.push('																			</div>');
		h.push('																			<!-- /.search -->');
		
		h.push('																			<!-- buttons -->');
		h.push('																			<div class="row pull-right form-control-static">');
		h.push('																				<div class="col-lg-12">');
		h.push('																					<button type="button" class="btn btn-sm btn-primary" id="gp-btn-gdpr-list-search" data-style="expand-right" data-dismiss="modal"> <i class="fa fa-search"></i> <span class="hidden-xs" rv-i18n="BTN_SEARCH">Search</span></button>');
		h.push('																				</div>');
		h.push('																			</div>');
		h.push('																			<!-- /.buttons -->');
		
		h.push('																			<div class="ibox-content no-padding">');
			
		h.push('		            									                    	<div class="panel panel-primary">');
		h.push('		            																<div class="panel-heading">NSC Admin</div>');
		h.push('		            																<div class="panel-body">');

		h.push('		            																	<div class="ibox-content">');
		h.push('		            											                        	<table id="gp_gdpr_nsc_table" class="table table-striped table-bordered table-hover dt-responsive nowrap" cellspacing="0" width="100%">');
		h.push('		            											                                <thead>');
		h.push('		            											                                    <tr>');
		h.push('		            											                                        <th rv-i18n="LBL_ROLE">Role</th>');
		h.push('		            											                                        <th rv-i18n="LBL_PORTAL_ID">Portal ID</th>');
		h.push('		            											                                        <th rv-i18n="LBL_NAME">Name</th>');
		h.push('		            											                                        <th rv-i18n="LBL_BUSINESS_EMAIL">Business Email</th>');
		h.push('		            											                                    </tr>');
		h.push('		            											                                </thead>');
		h.push('		            											                                <tbody>');
		h.push('		            											                                </tbody>');
		h.push('		            											                            </table>');
		h.push('		            											                        </div>');
			
		h.push('		            																</div>');
		h.push('		            															</div>');
	
		h.push('		            									                    	<div class="panel panel-primary">');
		h.push('		            																<div class="panel-heading">GDPR Process Employee List</div>');
		h.push('		            																<div class="panel-body">');
		h.push('		            																	<div class="ibox-content">');
		h.push('		            											                        	<table id="gp_gdpr_table" class="table table-striped table-bordered table-hover dt-responsive nowrap" cellspacing="0" width="100%">');
		h.push('		            											                                <thead>');
		h.push('		            											                                    <tr>');
//		h.push('		            											                                        <th rv-i18n="LBL_COUNTRY">Country</th>');
		h.push('																										<th rv-i18n="LBL_DEALER_CODE">Dealer Code</th>'); // Dealer Code |  ZDEALERN
		h.push('		            											                                        <th rv-i18n="LBL_ORGANISATION">Organisation</th>');
		h.push('		            											                                        <th rv-i18n="LBL_ROLE">Role</th>');
		h.push('		            											                                        <th rv-i18n="LBL_PORTAL_ID">Portal ID</th>');
		h.push('		            											                                        <th rv-i18n="LBL_USER_TYPE">User Type</th>');
		h.push('		            											                                        <th rv-i18n="LBL_NAME">Name</th>');
		h.push('		            											                                        <th rv-i18n="LBL_STATUS">Status</th>');
		h.push('		            											                                        <th>Created Date</th>');
		h.push('		            											                                        <th>Day Count</th>');
		h.push('		            											                                    </tr>');
		h.push('		            											                                </thead>');
		h.push('		            											                                <tbody>');
		h.push('		            											                                </tbody>');
		h.push('		            											                            </table>');
		h.push('		            											                        </div>');
		h.push('		            																</div>');
		h.push('		            															</div>');
	
		h.push('																        	</div>');

		h.push('															        	</div>');
		h.push('															        </div>');
		h.push('															    </div>');
		
		h.push('															    <div class="panel panel-primary ">');
		h.push('															        <div class="panel-heading">');
		h.push('															            <h4 class="panel-title" style="padding-bottom: 10px;">');
		h.push('															                <a data-toggle="collapse" data-parent="#gdpr-accordion" href="#gdpr-collapse1">');
		h.push('															                    <i class="fa fa-bars "></i> GDPR Workflow Completion List</a>');
		h.push('															            </h4>');
		h.push('															        </div>');
		h.push('															        <div id="gdpr-collapse1" class="panel-collapse collapse">');
		h.push('															            <div class="panel-body">');
		h.push('																			<!-- search -->');
		h.push('																			<div class="row page_commmon_top_second">');

		h.push('												                                <div class="col-sm-2 m-b-xs">');
		h.push('												                                    <select class="input-sm form-control input-s-sm inline" id="gw_s_company_code"></select>');
		h.push('												                                </div>');
		h.push('												                                <div class="col-sm-2 m-b-xs ">');
		h.push('												                                    <select class="input-sm form-control input-s-sm inline" id="gw_s_user_type"></select>');
		h.push('												                                </div>');
		h.push('												                                <div class="col-sm-3 m-b-xs hide" id="gw_div_partner_code">');
		h.push('																					<select id="gw_s_partner_code" name="gw_s_partner_code" class="input-sm form-control" data-size="auto" data-live-search="true">');
		h.push('																					</select>');
		h.push('												                                </div>');
		h.push('												                                <div class="col-sm-2 m-b-xs hidden-xs">');
		h.push('												                                    <select class="input-sm form-control input-s-sm inline" id="gw_s_user_status"></select>');
		h.push('												                                </div>');
		h.push('												                                <div class="col-sm-3">');
		h.push('												                                    <div class="input-group">');
		h.push('												                                        <input type="text" id="gw_s_search_name" class="input-sm form-control"  placeholder="User Name" rv-i18n="LBL_USER_NAME" rv-i18n-placeholder>');
		h.push('												                                    </div>');
		h.push('												                                </div>');

		h.push('																			</div>');
		h.push('																			<!-- /.search -->');
		h.push('																			<!-- buttons -->');
		h.push('																			<div class="row pull-right form-control-static">');
		h.push('																				<div class="col-lg-12">');
		h.push('																					<button type="button" class="btn btn-sm btn-primary" id="gw-btn-search" data-style="expand-right" data-dismiss="modal"> <i class="fa fa-search"></i> <span class="hidden-xs" rv-i18n="BTN_SEARCH">Search</span></button>');
		h.push('																				</div>');
		h.push('																			</div>');
		h.push('																			<!-- /.buttons -->');
		
		h.push('																			<div class="ibox-content no-padding">');
		h.push('															            		<div class="table-responsive">');
		h.push('															            			<table id="noti-gdprworkflow-grid-table" class="table table-striped table-bordered dt-responsive nowrap table-hover" cellspacing="0" width="100%">');
		h.push('															            				<thead>');
		h.push('																							<tr>');
		h.push('																								<th rv-i18n="LBL_DEALER_CODE">Dealer Code</th>'); // Dealer Code |  ZSYSCODE
		h.push('																								<th rv-i18n="LBL_ORGANIZATION">Organization</th>'); // Organization (it's the name of the Dealer) | ZLEGALNM
		h.push('															            					    <th rv-i18n="LBL_USER_NAME">User Name</th>'); // User Name | ZUANAME
		h.push('															            					    <th rv-i18n="LBL_PORTAL_ID">Portal ID</th>'); // Portal ID | ZPOTALID
		h.push('															            					    <th rv-i18n="LBL_ROLE">Role</th>'); // User Role | ZROLET
		h.push('															            					    <th rv-i18n="LBL_STATUS">Status</th>'); // Status | ZUSTATUS_T
		h.push('		            											                                <th rv-i18n="LBL_CREATED_DATE">Created Date</th>');
		h.push('		            											                                <th rv-i18n="LBL_DAY_COUNT">Day Count</th>');
		h.push('															            					    <th rv-i18n="LBL_PRIVACY_POLICY">Privacy Policy</th>');
		h.push('															            					    <th rv-i18n="COOKIE_POLICY">Cookie Policy</th>');		
		h.push('															            					</tr>');
		h.push('															            				</thead>');
		h.push('															            				<tbody>');
		h.push('															            				</tbody>');
		h.push('															            			</table>');
		h.push('															            		</div>');
		h.push('															            	</div>');
		
		h.push('															             </div>');
		h.push('															        </div>');
		h.push('															    </div>');
		
		
		h.push('															</div>');


		h.push('														</div>');

		h.push('													</div>');
		h.push('												</div>');
		h.push('											</div>');
		h.push('										</div>');
		h.push('									</div>');
		h.push('								</div>');
		h.push('							</div>');
		h.push('						</div>');


		h.push('                    </div>');
		h.push('                </div>');
		h.push('            </div>');
		h.push('            <div class="modal-footer">');
		h.push('                <button type="button" class="btn btn-white" data-dismiss="modal"><i class="fa fa-times"></i> '+i18n_master.getText('BTN_CLOSE')+'</button>');
		h.push('            </div>');
		h.push('        </div>');
		h.push('    </div>');
		h.push('</div>');

		if ( $.fn.datepicker == null || $.fn.datepicker == undefined) {
			h.push('<script src="/com.kme.edds.resources/js/plugins/datapicker/bootstrap-datepicker.js"></script>');
			h.push('<link href="/com.kme.edds.resources/css/plugins/datapicker/datepicker3.css" rel="stylesheet">');
		}
				
		$(document.body).append(h.join(""));
		
		Notifications.loadCodeMasterData();
		
		Notifications.initTable();
		
		setTimeout(function() {
			$('#noti-dealerworkflow-grid-table').trigger("draw.dt");
	        $('#noti-employeeworkflow-grid-table').trigger("draw.dt");
	        $('#noti-gdprworkflow-grid-table').trigger("draw.dt");
			$('#gp_gdpr_nsc_table').trigger("draw.dt");
			
			
	        
	        // EDDS-198
			//if(!isOperationSystem()){
		        // EDDS-198 Automatically Load Lists when Switching Pages or Countries
	        /*
	         Here is a compromise solution that I would like to propose for the NSC User Management screen.
			 When you first load the page it should do nothing as is currently the case. If you click on any country other than "All Markets", it should then load that market automatically. Thus, if I click on KMD it should then load the market and if I then click on KMF it should load that market next without needing to click on the search button.
			 If an NSC user clicks on this page, it should load their market automatically of course.
			 Basically, everything should load automatically on this page except for the "All Markets" button which requires the user to click on the search button.
	         * */
		        setTimeout(function() {
		        	// If an NSC user clicks on this page, it should load their market automatically of course.
			        if(Notifications.userInfo.BUKRS != "KB01"){
						$("#dw-btn-search").trigger("click"); // Notifications.load.dealerWorkflowData
					    $("#de-btn-search").trigger("click"); // Notifications.load.dealerEmployeeData
					   // $("#gw-btn-search").trigger("click"); // Notifications.load.gdprWorkflowData
					}		        	
		        },100);
			
				if ( $.fn.datepicker != null || $.fn.datepicker != undefined) {
					$.fn.datepicker.defaults.format = "dd/mm/yyyy";
					$('.workflowDate').datepicker({
						todayBtn: "linked",
						keyboardNavigation: false,
						forceParse: false,
						calendarWeeks: true,
						autoclose: true,
						todayHighlight: true,
						endDate: '0d',
					});
				}

				$('.workflowEmployeeSearchDate').hide();
				$('#date_term').trigger('change');

				Notifications.eventBind();

		    //}
        }, 500);

	}
	
	
	var activeFlag = "";
	// li Menu Permission	
	$("#li-tab-1,#li-tab-2,#li-tab-3, #tab-1,#tab-2,#tab-3").addClass("hide");
	$(Notifications.menuInfo).each(function(idx, item){
		
		// Dealer Workflow
		if(item['ZMENUH'] == 'MENU014' && item['ZREAD'] == 'X'){
			$("#li-tab-1,#tab-1").removeClass("hide");
			
			activeFlag = "tab-1";
			
			// li a tag click event fire
			$("#li-tab-1>a").trigger("click");
			
		} // Employee Workflow
		else if(item['ZMENUH'] == 'MENU020' && item['ZREAD'] == 'X'){
			$("#li-tab-2,#tab-2").removeClass("hide");
			
			if(activeFlag == ""){
				activeFlag = "tab-2";
				
				// li a tag click event fire
				$("#li-tab-2>a").trigger("click");
				
			}
			
		} // GDPR Workflow
		else if(item['ZMENUH'] == 'MENU021' && item['ZREAD'] == 'X'){
			$("#li-tab-3,#tab-3").removeClass("hide");
			
			if(activeFlag == ""){
				activeFlag = "tab-3";
				
				// li a tag click event fire
				$("#li-tab-3>a").trigger("click");
			}
			
		}
		
	});

	getNotificationsData();

	$('#modal_notifications').modal('show');
	

}

function showRequestDealerListModal(callback){
	
	if($("#dw_modal_request_list").length == 0 ){
		var h = [];
		h.push('<!-- Request List -->');
		h.push('<div class="modal fade" id="dw_modal_request_list" role="dialog">');
		h.push('	<div class="modal-dialog modal-full">');
		h.push('		<!-- Modal content-->');
		h.push('		<div class="modal-content">');
		h.push('			<div class="modal-header">');
		h.push('				<div class="pull-right">');
		h.push('					<button type="button" class="btn btn-sm btn-primary" data-dismiss="modal"> <i class="fa fa-close"></i> </button>');
		h.push('				</div>');
		h.push('				<h2 class="modal-title" rv-i18n="LBL_CHANGE_DATE">Change Request</h2>');
		h.push('			</div>');
		h.push('			<div class="modal-body">');
		h.push('				<div class="row animated fadeInRight">');
		h.push('					<div class="col-lg-12 pre-scrollable" style="overflow-y:auto;max-height:550px;">');
		h.push('						<div class="ibox">');
		h.push('							<div class="ibox-content">');
		h.push('								<div class="table-responsive">');
		h.push('									<table class="table table-stripped">');
		h.push('										<thead>');
		h.push('											<tr>');
		h.push('												<th id="dw_th_check_all"><div class="i-checks"><input type="checkbox" id="dw_check_all" value=""> <i></i></div></th>');
		h.push('												<th rv-i18n="LBL_SUB_CATEGORY">Sub Category</th>');
		h.push('												<th rv-i18n="LBL_FIELD">Field</th>');
		h.push('												<th rv-i18n="LBL_REQUESTER">Requester</th>');
		h.push('												<th rv-i18n="LBL_CHANGE_DATE">Change Date</th>');
		h.push('											</tr>');
		h.push('										</thead>');
		h.push('										<tbody id="dw_table_tbody_requestlist">');
		h.push('										</tbody>');
		h.push('									</table>');
		h.push('								</div>');
		h.push('							</div>');
		h.push('						</div>');
		h.push('					</div>');
		h.push('				</div>');
		h.push('			</div>');
		
		h.push('			<div class="modal-footer">');
		h.push('				<div class="col-lg-6 text-left">');
		h.push('					<button type="button" id="btn-previous" class="btn btn-sm btn-primary" data-dismiss="modal" data-toggle="modal"  data-style="expand-right" > <i class="fa fa-undo"></i> <span class="hidden-xs" > Previous</span></button>');
		h.push('				</div>');
		h.push('				<div class="col-lg-6 pull-right">');
		h.push('					<button type="button" class="btn btn-white" data-dismiss="modal" rv-i18n="BTN_CLOSE">Close</button>');
		
		if(!$.isEmptyObject(Notifications.userInfo.ROLE.M0001)){
			var roleObj = Notifications.userInfo.ROLE.M0001;
			// KME Admin OR NSC Admin
			if((roleObj.ZROLEGRP == "RGROUP01" && roleObj.ZRTYPE == "A") || (roleObj.ZROLEGRP == "RGROUP02" && roleObj.ZRTYPE == "A") ){
				
				//h.push('			<button type="button" id="dw-btn-approval" class="btn btn-primary" rv-i18n="BTN_APPROVAL">Approval</button>');
				//h.push('			<button type="button" id="dw-btn-reject" class="btn btn-warning" rv-i18n="BTN_REJECT">Reject</button>');
				h.push('			<a class="ladda-button btn btn-primary" data-style="expand-right" id="dw-btn-approval">');
				h.push('			    <span class="ladda-label" rv-i18n="BTN_APPROVAL">Approval</span>');
				h.push('			    <span class="ladda-spinner"></span>');
				h.push('			    <div class="ladda-progress" style="width: 72px;"></div>');
				h.push('			</a>');
				h.push('			<a class="ladda-button btn btn-primary" data-style="expand-right" id="dw-btn-reject">');
				h.push('			    <span class="ladda-label" rv-i18n="BTN_REJECT">Reject</span>');
				h.push('			    <span class="ladda-spinner"></span>');
				h.push('			    <div class="ladda-progress" style="width: 72px;"></div>');
				h.push('			</a>');
			}
		}
		
		h.push('				</div>');
		h.push('			</div>');
		h.push('		</div>');
		h.push('	</div>');
		h.push('</div>');
		h.push('<!-- // Request List -->');	
		
		$(document.body).append(h.join(""));
		
		$('#dw-btn-approval').on("click", function(e){
			
			$('#dw_modal_request_list').modal('hide');
			
			setTimeout(function(){
				
				Notifications.confirmDealerWorkflow(e, this , 'AP');
				
			}, 100);
        	
        });
        
        $('#dw-btn-reject').on("click", function(e){
        	
        	$('#dw_modal_request_list').modal('hide');
			
			setTimeout(function(){
				
				Notifications.confirmDealerWorkflow(e, this , 'AR');
				
			}, 100);
        	
        	
        	
        });
		
		$("#btn-previous").on("click", function(){
		
			setTimeout(function() {
				$("#modal_notifications").modal("show");
			
	            // rebuild recalc
	            setTimeout(function() {
		            $('#noti-dealerworkflow-grid-table').trigger("draw.dt");
		            //$('#noti-employeeworkflow-grid-table').trigger("draw.dt");
	            },200);

	        }, 500);
		
		});
		
	}
	
	// display button, checkbox control
	callback();
	
	$('#dw_modal_request_list').modal('show');

}


function showRequestEmployeeListModal(callback){
	
	if($("#de_modal_request_list").length == 0 ){
		var h = [];
		h.push('<!-- Request List -->');
		h.push('<div class="modal fade" id="de_modal_request_list" role="dialog">');
		h.push('	<div class="modal-dialog modal-xl">');
		h.push('		<!-- Modal content-->');
		h.push('		<div class="modal-content">');
		h.push('			<div class="modal-header">');
		h.push('				<div class="pull-right">');
		h.push('					<button type="button" class="btn btn-sm btn-primary" data-dismiss="modal"> <i class="fa fa-close"></i> </button>');
		h.push('				</div>');
		h.push('				<h2 class="modal-title" rv-i18n="LBL_CHANGE_DATE" id="de_change_request_title">Change Request</h2>');
		h.push('			</div>');
		h.push('			<div class="modal-body">');
		h.push('				<h3 class="sub-title" style="border-left: 5px solid #05141f;padding-left: 5px;" id="de_status">Requested Status</h3>');		
		h.push('				<div class="col-sm-12">');
		h.push('				    <div class="row">');
		h.push('				        <div class="col-sm-12 col-md-4">');
		h.push('				    		<h3 class="sub-title">User Info</h3>');
		h.push('				            <p><i class="fa fa-user-o"></i> <span id="de_user_id"></span> </p>');
		h.push('				            <p><i class="fa fa-barcode"></i> <span id="de_dealer_code"></span></p>');
		h.push('				            <p><i class="fa fa-car"></i> <span id="de_dealer_name"></span> </p>');
		h.push('				        </div>');
		h.push('				        <div class="col-sm-12 col-md-4">');
		h.push('				    		<h3 class="sub-title">Requested User Info</h3>');
		h.push('				            <p><i class="fa fa-user-o"></i> <span id="de_requsted_user_id"></span> </p>');
		h.push('				            <p><i class="fa fa-calendar"></i> <span id="de_requsted_date"></span> </p>');
		h.push('				            <p><i class="fa fa-id-badge"></i> <span id="de_requsted_role"></span></p>');
		h.push('				        </div>');
		h.push('				        <div class="col-sm-12 col-md-4">');
		h.push('				    		<h3 class="sub-title">Approved User Info</h3>');
		h.push('				            <p><i class="fa fa-user-o"></i> <span id="de_approved_user_id"></span> </p>');
		h.push('				            <p><i class="fa fa-calendar"></i> <span id="de_approved_date"></span> </p>');
		h.push('				            <p><i class="fa fa-id-badge"></i> <span id="de_approved_role"></span></p>');
		h.push('				        </div>');
		h.push('				    </div>');
		h.push('				</div>');

		//if(document.location.href.indexOf("test") > -1 || document.location.href.indexOf("qa") > -1){

		h.push('				<div class="row">');
		h.push('					<div class="col-lg-12">');
		h.push('						<h3 class="sub-title" style="border-left: 5px solid #05141f;padding-left: 5px;">Record History</h3>');
		h.push('						<div class="ibox">');
		h.push('							<div class="ibox-content">');
		h.push('								<div class="table-responsive pre-scrollable" style="overflow-y:auto;max-height:200px;">');
		h.push('									<table class="table table-stripped">');
		h.push('										<thead>');
		h.push('											<tr>');
		h.push('												<th rv-i18n="LBL_STATUS">STATUS</th>');
		h.push('												<th rv-i18n="LBL_APPROVED_BY_USER_ID">Approved by user ID</th>'); // Approved by user ID | APENAME
		h.push('												<th rv-i18n="LBL_ROLE_OF_THE_APPROVER">Role of the Approver</th>'); // Role of the Approver | ZAROLE / ZAROLET
		h.push('												<th rv-i18n="LBL_NAME_OF_THE_APPROVER">Name of the Approver</th>'); // Name of Approver User | ZAUANAME
		h.push('												<th rv-i18n="LBL_APPROVED_DATE">Approved Date</th>'); // Approval Date | APDATAB
		h.push('												<th rv-i18n="LBL_REJECTED_MESSAGE">Rejected Message</th>'); // 
		h.push('											</tr>');
		h.push('										</thead>');
		h.push('										<tbody id="de_table_tbody_prevrequestlist">');
		h.push('										</tbody>');
		h.push('									</table>');
		h.push('								</div>');
		h.push('							</div>');
		h.push('						</div>');
		h.push('					</div>');
		h.push('				</div>');
		
		//}
		
		h.push('				<div class="row">');
		h.push('					<div class="col-lg-12 " >');
		h.push('						<h3 class="sub-title" style="border-left: 5px solid #05141f;padding-left: 5px;">Requested Data</h3>');
		h.push('						<div class="ibox">');
		h.push('							<div class="ibox-content">');
		h.push('								<div class="table-responsive pre-scrollable" style="overflow-y:auto;max-height:550px;">');
		h.push('									<table class="table table-stripped">');
		h.push('										<thead>');
		h.push('											<tr>');
//		h.push('												<th id="de_th_check_all"><div class="i-checks"><input type="checkbox" id="de_check_all" value=""> <i></i></div></th>');
		h.push('												<th rv-i18n="LBL_SUB_CATEGORY">Sub Category</th>');
		h.push('												<th rv-i18n="LBL_FIELD">Field</th>');
		h.push('												<th rv-i18n="LBL_REQUESTER">Requester</th>');
		h.push('												<th rv-i18n="LBL_CHANGE_DATE">Change Date</th>');
		h.push('											</tr>');
		h.push('										</thead>');
		h.push('										<tbody id="de_table_tbody_requestlist">');
		h.push('										</tbody>');
		h.push('									</table>');
		h.push('								</div>');
		h.push('							</div>');
		h.push('						</div>');
		h.push('					</div>');
		h.push('				</div>');
		h.push('			</div>');
		
		h.push('			<div class="modal-footer">');
		h.push('				<div class="col-lg-6 text-left">');
		h.push('					<button type="button" id="btn-employee-previous" class="btn btn-sm btn-primary" data-dismiss="modal" data-toggle="modal"  data-style="expand-right" > <i class="fa fa-undo"></i> <span class="hidden-xs" > Previous</span></button>');
		h.push('				</div>');
		h.push('				<div class="col-lg-6 pull-right">');
		h.push('					<button type="button" class="btn btn-white" data-dismiss="modal" rv-i18n="BTN_CLOSE">Close</button>');
		
		if(!$.isEmptyObject(Notifications.userInfo.ROLE.M0001)){
			var roleObj = Notifications.userInfo.ROLE.M0001;
			// KME Admin OR NSC Admin
			if((roleObj.ZROLEGRP == "RGROUP01" && roleObj.ZRTYPE == "A") || (roleObj.ZROLEGRP == "RGROUP02" && roleObj.ZRTYPE == "A") ){
				h.push('			<button type="button" id="de-btn-approval" class="btn btn-primary" rv-i18n="BTN_APPROVAL">Approval</button>');
				h.push('			<button type="button" id="de-btn-reject" class="btn btn-warning" rv-i18n="BTN_REJECT">Reject</button>');
			}
		}
		
		h.push('				</div>');
		h.push('			</div>');
		h.push('		</div>');
		h.push('	</div>');
		h.push('</div>');
		h.push('<!-- // Request List -->');	
		
		$(document.body).append(h.join(""));
		
		$('#de-btn-approval').on("click", function(){
			
			$('#de_modal_request_list').modal('hide');
			
			setTimeout(function(){
				
				$._CSRF.generationCSRFToken( "AccountConfirmControl" + "|" + $(this).attr('id') );
	        	Notifications.confirmEmployeeWorkflow();
				
			}, 100);
			
        	
        });
        
        $('#de-btn-reject').on("click", function(){
        	
        	$('#de_modal_request_list').modal('hide');
        	
        	setTimeout(function(){
				
        		$._CSRF.generationCSRFToken( "AccountConfirmControl" + "|" + $(this).attr('id') );
            	Notifications.rejectEmployeeWorkflow();
				
			}, 100);
        	
			
        });
		
		$("#btn-employee-previous").on("click", function(){
		
			setTimeout(function() {
				$("#modal_notifications").modal("show");
			
	            // rebuild recalc
	            setTimeout(function() {
		            $('#noti-dealerworkflow-grid-table').trigger("draw.dt");
		            $('#noti-employeeworkflow-grid-table').trigger("draw.dt");
	            },200);

	        }, 500);
		
		});
		
	}
	
	// display button, checkbox control
	callback();
	
	setTimeout(function() {
		$('#de_modal_request_list').modal('show');
    }, 500);

}

function getArrayBySplit( str1, split_key) {
	var returnArray = [];
	if (str1 && str1 != '') {
		if (str1.indexOf(split_key)>0) {
			var tempStrs = str1.split(split_key);											 				 
			for (var i=0;i<tempStrs.length;i++) {
				if (tempStrs[i] && tempStrs[i].trim() != '') {
					returnArray.push(tempStrs[i])
				}
			}
		}
		else if (str1 && str1 !="") {
			returnArray.push(str1);
		}
	}

	return returnArray;
}

function getNotificationsData(){
	//AEUE0288 11.03.2020 System Performance  email from Antonio on 10.03.2020 AW:  Weekly report and JIRA priorities case 1
	$('#notifications-log-gw-count').hide();

	/**
		T_LIST
			- GUBUN : D : Dealer WF, P : Employee WF, G : GDPR
			- ZDEALERN : Dealer Code
			- ZLEGALNM : Dealer Name
			- ZPRSNN : Person No
			- ZUANAME : Person full name
			- ZWSTATUS : Workflow Status
			- ZCODET : Workflow Status Text
			- DAYS : GDPR 날짜
			- POC : Policy 미등록시 ‘X’
			- LOG : Cookie 미등로기 ‘X’
		
			GUBUN                          G
			ZDEALERN                       C11VC01007
			ZLEGALNM                       ERCOLANI AUTO S.R.L.
			ZPRSNN                         P1000027300
			ZUANAME                        Michele  Calussi
			ZWSTATUS                       AP
			ZCODET                         Approved
			DAYS                           21
			POC                            X
			LOG                            X
	 **/
	var userInfo = {};
	$.ajax({
		url: 'com.kme.edds.common.EDDSNotifications'
		,data: {
			company_code: $("#noti_company_code").val()
		}
		,cache: false
		,type: "post"
		,dataType: 'json'
		,success: function(data) {
			
			var countList = data["T_CNT"];
			
			if(Notifications.userInfo == null){
				Notifications.userInfo = $.sessionStorage.get("USER_INFO");
				Notifications.menuInfo = $.sessionStorage.get("OMENU");
			}
			
           	if(Notifications.userInfo.BUKRS == "KB01"){
				countList = data["T_TOTAL"];
           	}
			
			var totalCount = 0;
			var dealerWFCount = 0;
			var emploeeWFCount = 0;
			var gdprWFCount = 0;
				
			$(countList).each(function(idx, item){
				var workflowStatus = item["ZWSTATUS"];
				if(workflowStatus == "RQ" || workflowStatus == "CR" ){
					dealerWFCount = dealerWFCount + parseInt(item["DEAL_WF"]);
					emploeeWFCount = emploeeWFCount + parseInt(item["EMPL_WF"]);
				}
				if(workflowStatus == "AP"){
					gdprWFCount = gdprWFCount + parseInt(item["GDPR_WF"]);
				}

				Notifications.data.company_code = item["BUKRS"]?item["BUKRS"]:Notifications.data.company_code;
			});
			
			 //console.log("dealerWFCount : " + dealerWFCount);
			 //console.log("emploeeWFCount : " + emploeeWFCount);
			 //console.log("gdprWFCount : " + gdprWFCount);

			 //console.log("noti_company_code : " + Notifications.data.company_code);
			 //console.log("noti_company_code : " + 	$("#noti_company_code").val());  
			 //console.log("dw_s_company_code : " + 	$("#dw_s_company_code").val());
			 //console.log("de_s_company_code : " + 	$("#de_s_company_code").val());
			 //console.log("gw_s_company_code : " + 	$("#gw_s_company_code").val());
			 //console.log("gp_m_company_code : " + 	$("#gp_m_company_code").val());
			
			totalCount = dealerWFCount + emploeeWFCount + ( (Notifications.data.company_code == "KA02" || Notifications.data.company_code == "KB08")?0:gdprWFCount);
			
			$("#notifications-log-count").html(totalCount);
			$("#notifications-log-dw-count").html(dealerWFCount);
			$("#notifications-log-ew-count").html(emploeeWFCount);
			//AEUE0288 11.03.2020 System Performance  email from Antonio on 10.03.2020 AW:  Weekly report and JIRA priorities case 1
			//$("#notifications-log-gw-count").html(gdprWFCount);
			 
			
		},error: function(xhr, status, error){
			if(xhr.getResponseHeader('content-type').startsWith("text/html")){	
				// alert(i18n_master.getText('MSG_FAILED') + " " + "Session Expired, please log on again.");
				// sessionExpiredLogout();
			}else{
				swal(i18n_master.getText('MSG_FAILED'), i18n_master.getText('MSG_FAILED_STATUS_CODE') + status + ", " + error , "error");
				hideLoading();
				//console.log("getHistoryLog()");
			}
		}
	});
}

/*
console.log("showUpdateLoading check");
console.log(showUpdateLoading);

if (typeof showUpdateLoading === "undefined") { 
    // safe to use the function
	try{
		function showUpdateLoading(evt , obj){
			showLoading();
			// button ladd loading
			evt.preventDefault();
			var l = Ladda.create(obj);
			l.start();
			return l;
		}
	    
		function hideUpdateLoading(l){
			l.stop();
			hideLoading();
		}
	}catch(){
		
	}
} 
*/