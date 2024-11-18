/**
 * Recent clicked Dealer List store object, it use in the DealerList PortalComponent 
 * */
var _recent_cliecked = {
	store_key: 'recent_clicked_dealer',
	data_maximum: 10,
	// this function use Dealer List component for recent clicked dealer list
	storeClickedDealerInfo: function(params){
		// init sessionStorage Object
		var storage = $.localStorage;
		//define clicked Dealer Array		
		var recentDealerArr = [];
		// object key define
		var objectKeyName = _recent_cliecked.store_key;
		// check undefined 
		if(storage.get(objectKeyName) != undefined){
			// allocation stored data
			recentDealerArr = storage.get(objectKeyName);
		}
		if(recentDealerArr.length == _recent_cliecked.data_maximum){
			// delete first data
			recentDealerArr.shift();
		}
		recentDealerArr.push(params); 
		storage.set(objectKeyName, recentDealerArr);
	},
	timeSince: function(date) {
	
		var seconds = Math.floor((new Date() - date) / 1000);
		var interval = Math.floor(seconds / 31536000);
	
		if (interval > 1) {
			return interval + " " + i18n_master.getText('LBL_YEARS');
		}
		interval = Math.floor(seconds / 2592000);
		if (interval > 1) {
			return interval + " " + i18n_master.getText('LBL_MONTHS');
		}
		interval = Math.floor(seconds / 86400);
		if (interval > 1) {
			return interval + " " + i18n_master.getText('LBL_DAYS');
		}
		interval = Math.floor(seconds / 3600);
		if (interval > 1) {
			return interval + " " + i18n_master.getText('LBL_HOURS');
		}
		interval = Math.floor(seconds / 60);
		if (interval > 1) {
			return interval + " " + i18n_master.getText('LBL_MINUTES');
		}
		return Math.floor(seconds) + " " + i18n_master.getText('LBL_SECONDS');
	}
}

function rfcInfo(){
	window.open("com.kme.edds.common.PCRFCValuesNew",'page','width=750,height=450,scrollbars=yes,status=no,toolbar=no,resizable=yes,menubar=no,location=no,directories=no,titlebar=no');
}

function showUserManual(pdfFlag){
	
	var pdfName = "test_32748.pdf";
	
	/*
	if(pdfFlag == 1){
		pdfName = "EDDS_User_Manual_Final_190520.pdf";
		pdfName = "EDDS_User_Manual_Final_211117.pdf";
	}else if(pdfFlag == 2){
		pdfName = "EDDS_NSC_Admin_User_Manual_bme_v2_TEST.pdf";
	}else if(pdfFlag == 3){
		// pdfName = "EDDS_Dealer_Admin_User_Manual_DRAFT_v2.pdf";
		pdfName = 'EDDS Dealer Admin User Manual.pdf';
	}
	*/
	
	pdfName = 'EDDS Dealer Admin User Manual.pdf';
	
	var url = "/com.kme.edds.pdf/pdfjs/web/viewer.html";
	var params = "?file=" + pdfName;
	// params += "&locale=" + $.sessionStorage.get("LANGUAGE");
	var options = "width=750,height=450,scrollbars=yes,status=no,toolbar=no,resizable=yes,menubar=no,location=no,directories=no,titlebar=no";

	window.open( url + params ,'page',options);

}

function showVideoModal(){

	if($("#modal_user_video").length == 0 ){
	
		var h = [];
		h.push('<div class="modal fade " id="modal_user_video" tabindex="-1" role="dialog" aria-hidden="true">');
		h.push('    <div class="modal-dialog modal-lg full-width">');
		h.push('        <div class="modal-content animated fadeIn">');
		h.push('            <div class="modal-header">');
		h.push('                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>');
		h.push('                <h4 class="modal-title">'+i18n_master.getText('LBL_USER_VIDEO')+'</h4>');
		h.push('            </div>');
		h.push('            <div class="modal-body">');
		h.push('                <div class="panel panel-default">');
		h.push('                    <div class="panel-body">');
	
		h.push('                    <div class="row">');
		h.push('                    	<div class="col-lg-8">');
		h.push('                    		<div class="ibox float-e-margins">');
		h.push('                    			<div class="ibox-title">');
		h.push('                    				<h5>Video window</h5>');
		h.push('                    			</div>');
		h.push('                    			<div class="ibox-content">');
		h.push('                    				<figure>');
		h.push('                    					<iframe width="100%" height="415" src="https://www.youtube.com/embed/Y96--vZWLSk" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
		h.push('                    				</figure>');
		h.push('                    			</div>');
		h.push('                    		</div>');
		h.push('                    	</div>');
		
		h.push('                    	<div class="col-lg-4">');
		h.push('                    		<div class="ibox float-e-margins">');
		h.push('                    			<div class="ibox-title">');
		h.push('                    				<h5>Video description</h5>');
		h.push('                    			</div>');
		h.push('                    			<div class="ibox-content profile-content">');
		h.push('                    				<h4><strong>Kia Motors Worldwide</strong></h4>');
	//	h.push('                    				<p><i class="fa fa-clock-o"></i> Uploaded on February 8, 2018</p>');
		h.push('                    				<h5>'); 
	//	h.push('                    					Science and Technology');
		h.push('                    				</h5>');
		h.push('                    				<p>');
		h.push('                    					Ready to break your limits? Stay undefeated with our invincible #Kia SUVs. ');
														
		h.push('                    					Subscribe to <a href="javascript:windowOpen(\'https://www.youtube.com/channel/UCptyYDiGZ9hs1pH0AaoBTxA?sub_confirmation=1\');">Kia’s official Worldwide YouTube channel</a>');
		h.push('                    					<br/>');													
		h.push('                    					Find out more about Kia: ');
		h.push('                    					<br/>');
		h.push('                    					Kia Worldwide Website: <a href="javascript:windowOpen(\'http://www.kia.com/worldwide/main.do\');">http://www.kia.com/worldwide/main.do</a>');
		h.push('                    					<br/>');
		h.push('                    					Kia Worldwide Blog: <a href="javascript:windowOpen(\'http://www.kia-buzz.com/\');">http://www.kia-buzz.com/</a>');
		h.push('                    					<br/>');
		h.push('                    					Kia Worldwide Facebook: <a href="javascript:windowOpen(\'https://www.facebook.com/Kiamotorsworldwide/\');">https://www.facebook.com/Kiamotorsworldwide</a>');
		h.push('                    					<br/>');
		h.push('                    					Kia Worldwide Instagram: <a href="javascript:windowOpen(\'https://www.instagram.com/kiamotorsworldwide/\');">http://instagram.com/kiamotorsworldwide</a>');
		h.push('                    					<br/>');
		h.push('                    					Kia Worldwide Twitter: <a href="javascript:windowOpen(\'https://twitter.com/Kia_Motors\');">https://twitter.com/Kia_Motors</a>');
		h.push('                    					<br/>');
		h.push('                    					Kia Worldwide Google+: <a href="javascript:windowOpen(\'https://plus.google.com/+KiaMotorsWorldwide\');">https://plus.google.com/+KiaMotorsWorldwide</a>');
		h.push('                    					<br/>');
		h.push('                    					Kia Worldwide Flickr: <a href="javascript:windowOpen(\'https://www.flickr.com/photos/kiamotorsworldwide\');">https://www.flickr.com/photos/kiamotorsworldwide</a>');
		h.push('                    					<br/>');
	
	//	h.push('                    				<div class="row m-t-md">');
	//	h.push('                    					<div class="col-md-3">');
	//	h.push('                    						<h5><strong>169</strong> Likes</h5>');
	//	h.push('                    					</div>');
	//	h.push('                    					<div class="col-md-9">');
	//	h.push('                    						<h5><strong>28</strong> Comments</h5>');
	//	h.push('                    					</div>');
	//	h.push('                    				</div>');
		h.push('                    			</div>');
		h.push('                    		</div>');
		h.push('                    	</div>');
		h.push('                    </div>');
	
	
		h.push('                    </div>');
		h.push('                </div>');
		h.push('            </div>');
		h.push('            <div class="modal-footer">');
		h.push('                <button type="button" class="btn btn-white" data-dismiss="modal"><i class="fa fa-times"></i> '+i18n_master.getText('BTN_CLOSE')+'</button>');
		h.push('            </div>');
		h.push('        </div>');
		h.push('    </div>');
		h.push('</div>');
	
				
		$(document.body).append(h.join(""));
	
	}
	
	
	$('#modal_user_video').modal('show');

}

function windowOpen(url){
	window.open(url);
}

function goToMain(){
	
	var storage = $.sessionStorage;
	var url = storage.get('MAIN_URL');

	$("li[id]").each(function(idx, obj){
		if(idx == 0){
			var liDOM = $(this);
			setNodeInfo(liDOM);
			document.location.replace(url);
			return;
		}
	});
}

function loadQuickView() {
	var ul = $('#page-header > nav > ul');

	var h = [];
	h.push('<li class="dropdown hidden-xs hidden-sm">');
	h.push('	<a class="dropdown-toggle count-info" data-toggle="dropdown" href="#">');
	h.push('		<i class="fa fa-check-square-o"></i>  <span class="label label-warning" id="history-log-count"></span>');
	h.push('	</a>');
	h.push('	<ul class="dropdown-menu dropdown-alerts animated fadeIn" id="history-log" style="right:-100px;"></ul>');
	h.push('</li>');
	h.push('<li class="dropdown hidden-xs hidden-sm">');
	h.push('	<a class="dropdown-toggle count-info" data-toggle="dropdown" href="#"  >');
	h.push('		<i class="fa fa-undo"></i>  <span class="label label-warning" id="view-master-list-count"></span>');
	h.push('	</a>');
	h.push('	<ul class="dropdown-menu dropdown-alerts animated fadeIn" id="view-master-list" style="right:-100px;"></ul>');
	h.push('</li>');
		
	ul.prepend(h.join(''));

	getViewMasterList();
	getHistoryLog();
	
}

function getViewMasterList() {
	var storedDealerData = $.localStorage.get(_recent_cliecked.store_key);
	var view_data = storedDealerData;
	
	//
	var d = [];
	var length = 0;
	
	if(!$.isEmptyObject(view_data)){
		// Reverse the order of the elements in an array 
		view_data.reverse();

		length = view_data.length;
		
		for (var i = 0; i < length; i++) {
	
			var dealerName = view_data[i]["partnerName"];
			if(view_data[i]["sapDealerCode"] != ""){
				dealerName += ' (' + view_data[i]["sapDealerCode"] + ')'  
			}
			var clickedTime = _recent_cliecked.timeSince( view_data[i]["timestamp"] );
			var url = "com.kme.edds.dealer.DealerDetail";
			var param = _.escape($.param(view_data[i]["params"]).replaceAll("'","").replaceAll("\"",""));
			// console.log(param);
			//var url = "com.kme.edds.dealer.DealerDetail?" + $.param(view_data[i]["params"]);
			d.push('              <li style="float:none !important;">');
			d.push('                  <a href="javascript:goToUrl(\''+url+'\', \'' + param + '\');">');
			d.push('                      <div>');
			d.push('                          <i class="fa fa-building fa-fw"></i> ' + dealerName + '');
			d.push('                          <span class="pull-right text-muted small">' + clickedTime + ' ' + i18n_master.getText('LBL_AGO') +' </span>');
			d.push('                      </div>');
			d.push('                  </a>');
			d.push('              </li>');
			if (i < (length - 1)) d.push(' <li class="divider" style="float:none !important;"></li>');
		}

		$("#view-master-list-count").html(length);
		$("#view-master-list").html(d.join(""));
		$("#sm-view-master-list").html(d.join(""));
	}
	
}

function getHistoryLog() {
	/*
	"today":[
			{"datetime":"16/07/2016 12:23:11","text":"Change Dealer Address : ABC Motors"},
			{"datetime":"16/07/2016 12:23:11","text":"Change Dealer Address : ABC Motors"},
			{"datetime":"16/07/2016 12:23:11","text":"Change Dealer Address : ABC Motors"},
			{"datetime":"16/07/2016 12:23:11","text":"Change Dealer Address : ABC Motors"},
			{"datetime":"16/07/2016 12:23:11","text":"Change Dealer Address : ABC Motors"}
		]
	*/
	
	/*
		STATUS                         CR
		ZPRSNN                         P1000000010
		ZDATUM                         14.11.2016
		ZUZEIT                         16:28:38
		ZFNAME                         ZGEND
		ZUANAME                        KME ADMIN, Middle, Last
		DDTEXT                         Gender
		STATUS_T                       Create
		BUKRS                          KB11
		ZPTNR                          1000000010
		ZLEGALNM                       Dealer Legal Entity Name
	 * */
	var userInfo = {};
	$.ajax({
		url: 'com.kme.edds.common.EDDSHistoryLog'
		,cache: false
		,type: "post"
		,dataType: 'json'
		,success: function(data) {
	
			var today_log = data;
			var d = [];
			var length = today_log.length;
			for (var i = 0; i < length; i++) {
				
				var dateTime = formatter.getFormatValue( today_log[i]["ZDATUM"] ,"dd/MM/yyyy") + " " + today_log[i]["ZUZEIT"];
				var description = today_log[i]["STATUS_T"] + " " + today_log[i]["DDTEXT"] + " " + today_log[i]["ZUANAME"];
 				d.push('              <li style="float:none !important;">');
				d.push('                  <a href="javascript:void(0);" style="cursor: auto;>');
				d.push('                      <div>');
				d.push('                          <i class="fa fa-edit fa-fw"></i>' + description );
				d.push('                          <span class="pull-right text-muted small">' + dateTime + '</span>');
				d.push('                      </div>');
				d.push('                  </a>');
				d.push('              </li>');
				d.push('              <li class="divider" style="float:none !important;"></li>');
			}
					
			var url = "com.kme.edds.admin.HistoryLog";
					
			d.push('<li>');
			d.push('    <div class="text-center link-block">');
			d.push('        <a href="javascript:goToUrl(\''+url+'\', \'\');">');
			d.push('            <strong style="color:#337ab7">See All Alerts</strong>');
			d.push('            <i class="fa fa-angle-right" style="color:#337ab7"></i>');
			d.push('        </a>');
			d.push('    </div>');
			d.push('</li>');
			
			$("#history-log-count").html(length);
			$("#history-log").html(d.join(""));	
			$("#sm-history-log").html(d.join(""));	
			
			
		},error: function(xhr, status, error){
			if(xhr.getResponseHeader('content-type').startsWith("text/html")){	
				// alert(i18n_master.getText('MSG_FAILED') + " " + "Session Expired, please log on again.");
				// sessionExpiredLogout();
			}else{
				swal(i18n_master.getText('MSG_FAILED'), i18n_master.getText('MSG_FAILED_STATUS_CODE') + status + ", " + error , "error");
				hideLoading();
				console.log("getHistoryLog()");
			}
		}
	});

}

function goToUrl(url, queryString){
	/**
	 * set DealerList node
	 * 
	 * ND_ID		MENU002	
	 * ND_IDX		1	
	 * ND_NM			
	 * ND_URL			
	 * PRT_ND_NM		
	 * PRT_ND_URL
	 * */ 
		
	var storage = $.sessionStorage;
	
	storage.set('ND_IDX', 1);
	storage.set('PRT_ND_NM', 'DEALER LIST');
	storage.set('PRT_ND_URL', '');
	storage.set('ND_ID', 'MENU002');
	storage.set('ND_NM', '');
	storage.set('ND_URL', '');
	
	// console.log(queryString);
	var params = {};
	if(queryString != ""){
		params = JSON.parse('{"' + decodeURI(queryString.replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}')
	}
	
	// move to clicked url
	Form.submit(url, params);
}

function loadDefaultPageDom() {
	
	//
	$(document.body).removeClass('prtlBody urFontBaseFam urScrl');
	
	//loadNavigation(); // edd-menu.js
	loadPageHeader(); // edds-pages.js
	//loadPageTitle(); // edds-pages.js
    loadPageTop(); // edds-pages.js
	//loadQuickView();
	//loadTermsofCondition("default"); // edd-legal-text.js
	//loadNotificationsView();
	
	// init
	if($.sessionStorage.get("LANGUAGE") == null){
		// default language set
		$.sessionStorage.get("LANGUAGE" , "en");
	}

	// NOT OPEN YET! 
	if(!isOperationSystem()){
		
		try{
			
			var _setEDDSUserDefaultRole = function(companyCode){
				
				var userInfoObj = $.sessionStorage.get("USER_INFO");
				var userId = userInfoObj['ZPOTALID'];

				var userAuth = userInfoObj["USER_AUTH"];
				var userGroup = userInfoObj["USER_GROUP"];
				
				var availableRoleInfo = userInfoObj["AVAIL_ROLE_INFO"];
				
				var roleInfo = {};
				
				if(userGroup == 'RGROUP01' || userGroup == 'RGROUP02'){
					
					if(userAuth == 'SUB_USER'){
						console.log('22################################');
						roleInfo[ companyCode ] = $.sessionStorage.get("USER_INFO").ROLE.M0001.ZROLE;
						
					}else{
						Object.keys(availableRoleInfo).sort().map(function(key) {
							var roleObj = availableRoleInfo[key];
							
							$(roleObj["roleList"]).each(function(idx, item){
								
								var eddsCompanyCode = item['BUKRS'];
								var eddsRoleCode = item['ZROLE'];
								var eddsRoleText = item['ZROLET'];
								var eddsRoleGroup = item['ZROLEGRP'];
								var eddsRoleAuth = item['ZRTYPE'];
							
								if(idx == 0){
									console.log('11################################');
									console.log('11eddsRoleCode :' + eddsRoleCode);
									console.log('11eddsRoleText :' + eddsRoleText);
									console.log('11eddsRoleGroup :' + eddsRoleGroup);
									console.log('11eddsRoleAuth :' + eddsRoleAuth);
									
									roleInfo[ eddsCompanyCode ] = eddsRoleCode;
								}
									
							});
							
						});
					}
					
					
				}else{
					//console.log('33################################');
					//roleInfo[ companyCode ] = $.sessionStorage.get("USER_INFO").ROLE.M0001.ZROLE;
				}

				console.log(roleInfo);

				if( $.localStorage.get("EDDS_ROLE_INFO") == null){
					// init
					$.localStorage.set("EDDS_ROLE_INFO", {});
				}

				var storedData = $.localStorage.get("EDDS_ROLE_INFO");
				storedData[userId] = roleInfo;

				console.log(storedData);

				$.localStorage.set("EDDS_ROLE_INFO", JSON.stringify(storedData));

			}
			var eddsRoleInfoObj = $.localStorage.get("EDDS_ROLE_INFO");
			var userInfoObj = $.sessionStorage.get("USER_INFO");
			
			if(userInfoObj != null && userInfoObj['ZPOTALID'] != null){
				
				var userId = userInfoObj['ZPOTALID'];
				var companyCode = userInfoObj['BUKRS'];
				var userGroup = userInfoObj['USER_GROUP'];
				
				if(userGroup != null){
					if(userGroup == "RGROUP01" || userGroup == "RGROUP02"){
						if(eddsRoleInfoObj == null){
							console.log('setDefaultRole!!! 01');
							_setEDDSUserDefaultRole(companyCode);
						}else{
							if(eddsRoleInfoObj[userId] == null){
								console.log('setDefaultRole!!! 02');	
								_setEDDSUserDefaultRole(companyCode);
							}
						}
					}	
				}
				
			}
				
			
			
		}catch(e){
		
			console.log(e);
		}
		
	}
	
}