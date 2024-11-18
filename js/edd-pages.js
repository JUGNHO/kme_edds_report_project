function loadPageHeader() {

    var h = [];

	$.ajax({
		url: 'com.kme.edds.common.EDDSUserInfo?prtmode=getUserInfo'
		,cache: false
		,type: "post"
		//,async: false
		,dataType: 'json'
		,success: function(data) {	
			
			// define sessionStorage Object
			var storage = $.sessionStorage;
			
			//console.log(data);
			var roleGroup = data["USER_GROUP"];

			h.push('<nav class="navbar navbar-static-top" role="navigation" style="height:67px;">');
			
			// only for TEST SYSTEM
			if($.sessionStorage.get('SAPSYSTEMNAME') == "PDE"){
				h.push('<span class="" style="font-weight: bold;font-size: 40px;padding-left: 10px;float: left !important;font-style: italic;color: red;"> TEST</span>');
			}
//			h.push('	<div class="navbar-header">');
//			h.push('		<div role="search" class="navbar-form-custom" action="#" style="width:10px;">');
//			h.push('			<div class="form-group">');
//			h.push('				<input type="text" placeholder="Search " class="form-control" name="top-search" id="top-search">');
//			h.push('			</div>');
//			h.push('		</div>');
//			h.push('	</div>');

			h.push('	<ul class="nav navbar-top-links navbar-right hidden-xs" >');
			
			
			var menuPermissions = storage.get('OMENU');
			
			// console.log(menuPermissions);
			
			/**********************************************************************
			*"MENU014":{"COMPONENT_URL":"com.kme.edds.admin.Workflow"
			*"I18N_KEY":"MN_WORKFLOW"
			*"ICON_CLASS_NAME":""}
			*
			*"MENU020":{"COMPONENT_URL":"com.kme.edds.admin.WorkflowEmployee"
			*"I18N_KEY":"MN_EMPLOYEE_WORKFLOW"
			*"ICON_CLASS_NAME":""}
			*
			*"MENU021":{"COMPONENT_URL":"com.kme.edds.mastermanagement.GDPRWorkflow"
			*"I18N_KEY":"MN_GDPR_WORKFLOW"
			*"ICON_CLASS_NAME":""}
			**********************************************************************/			
			
			// T_LIST
			var filterdMenu = menuPermissions.filter(function(item){
				return (
					(item['ZMENUH'] == 'MENU014' && item['ZREAD'] == 'X')
					|| (item['ZMENUH'] == 'MENU020' && item['ZREAD'] == 'X')
					|| (item['ZMENUH'] == 'MENU021' && item['ZREAD'] == 'X')
				)
			});
			
			// if(data.LANDSCAPE_NAME.indexOf("DEV") > -1 || data.LANDSCAPE_NAME.indexOf("QA") > -1){
			
			if($(filterdMenu).length > 0){
				h.push('	<li class="dropdown">');
				h.push('		<a href="javascript:showNotificationsModal();">');
				h.push('			<i class="fa fa-bell-o"></i> <span class="hidden-xs hidden-sm hidden-md" rv-i18n="LBL_WORKFLOW_NOTIFICATIONS"> Workflow Notifications</span> <span class="label label-warning" id="notifications-log-count"></span>');
				h.push('		</a>');
				h.push('	</li>');
			}
			
			//}
			
			// KME, NSC
			//if(roleGroup == "RGROUP01" || roleGroup == "RGROUP02"){
				/*
				h.push('	<li class="dropdown">');
				h.push('		<a class="dropdown-toggle count-info" data-toggle="dropdown" href="#">');
				h.push('			<i class="fa fa-check-square-o"></i> <span class="hidden-xs hidden-sm hidden-md">' + i18n_master.getText('LBL_HISTORY_LOG') + '</span> <span class="label label-warning" id="history-log-count"></span>');
				h.push('		</a>');
				h.push('		<ul class="dropdown-menu dropdown-alerts animated fadeIn" id="history-log" style="right:-150px;"></ul>');
				h.push('	</li>');
				*/		
			h.push('		<li class="dropdown" data-button-control="M118B01">');
			h.push('			<a class="dropdown-toggle count-info" data-toggle="dropdown" href="#"  >');
			h.push('				<i class="fa fa-undo"></i>  <span class="hidden-xs hidden-sm hidden-md">' + i18n_master.getText('LBL_RECENT_DEALER') + '</span>  <span class="label label-warning" id="view-master-list-count"></span>');
			h.push('			</a>');
			h.push('			<ul class="dropdown-menu dropdown-alerts animated fadeIn" id="view-master-list" style="right:-150px;"></ul>');
			h.push('		</li>');
			//}
			h.push('		<li style="margin-right:0px;" data-button-control="M118B02">');
			h.push('			<a href="javascript:showDisclaimer(\'policy\');">');
			h.push('              <i class="fa fa-gavel"></i> <span class="hidden-xs hidden-sm hidden-md">' + i18n_master.getText('LBL_PRIVACY_POLICY') + '</span>');
			h.push('			</a>');
			h.push('		</li>');
			h.push('		<li style="margin-right:0px;" data-button-control="M118B03">');
			h.push('			<a href="javascript:showDisclaimer(\'cookie\');">');
			h.push('              <i class="fa fa-info-circle"></i> <span class="hidden-xs hidden-sm hidden-md">' + i18n_master.getText('LBL_COOKIES_VIEW') + '</span>');
			h.push('			</a>');
			h.push('		</li>');
			h.push('	    <li style="margin-right:0px;" data-button-control="M118B04">');
			h.push('			<a href="javascript:showEDDSUserInfo();"><i class="fa fa-id-card fa-lg"></i><span class="hidden-xs hidden-sm hidden-md">' + i18n_master.getText('LBL_USER_INFO') + '</span></a>');
			h.push('	    </li>');	
			h.push('		<li style="margin-right:0px;" data-button-control="M118B06">');
			h.push('			<a href="javascript:changeLanguage();"><i class="fa fa-language"></i><span class="hidden-xs hidden-sm hidden-md">' + i18n_master.getText('LBL_LANGUAGE') + '</span></a>');
			h.push('		</li>');
			
			h.push('	    <li id="rfc_info" style="margin-right:0px;">');
			h.push('			<a href="javascript:rfcInfo();"><i class="fa fa-user-secret"></i></a>');
			h.push('	    </li>');
			
			h.push('		<li class="dropdown" data-button-control="M118B07">');
			h.push('			<a class="dropdown-toggle count-info" data-toggle="dropdown" href="#"  >');
			h.push('				<i class="fa fa-question-circle-o"></i>  <span class="hidden-xs hidden-sm hidden-md">' + i18n_master.getText('LBL_HELP') + '</span>');
			h.push('			</a>');
			h.push('			<ul class="dropdown-menu dropdown-alerts animated fadeIn" id="view-help">');

			// KME
			// EDDS-381: Remove KME & NSC User Manuals & User Video Sections
			// EDDS-1045 User manual pop-up reopen this section 14/04/2022
			
			//if($.sessionStorage.get('SAPSYSTEMNAME') == "PDE"){
			
				if(roleGroup == "RGROUP01"){
					h.push('				<li style="float:none !important;">');
					h.push('					<a href="javascript:showUserManual(1);">');
					h.push('						<i class="fa fa-map-o fa-lg"></i> ' + i18n_master.getText('LBL_USER_MANUAL') + ' (KME)');
					h.push('					</a>');
					h.push('				</li>');
				}
				// NSC
				if(/*roleGroup == "RGROUP01" ||*/ roleGroup == "RGROUP02"){
					h.push('				<li style="float:none !important;">');
					h.push('					<a href="javascript:showUserManual(2);">');
					h.push('						<i class="fa fa-map-o fa-lg"></i> ' + i18n_master.getText('LBL_USER_MANUAL') + ' (NSC)');
					h.push('					</a>');
					h.push('				</li>');
				}
				// KME, NSC, Dealer
				if(/*roleGroup == "RGROUP01" || roleGroup == "RGROUP02" ||*/ roleGroup == "RGROUP03"){			
					h.push('				<li style="float:none !important;">');
					h.push('					<a href="javascript:showUserManual(3);">');
					h.push('						<i class="fa fa-map-o fa-lg"></i> ' + i18n_master.getText('LBL_USER_MANUAL') + ' (DEALER)');
					h.push('					</a>');
					h.push('				</li>');
				}
				h.push('				<li style="float:none !important;">');
				h.push('					<a href="javascript:acceptUseCookies(\'openModal\');">');
				h.push('						<i class="fa fa-download fa-lg"></i> USER MANUAL DOWNLOAD');
				h.push('					</a>');
				h.push('				</li>');
				
			/*	
			}else{
				// KME, NSC, Dealer
				if(roleGroup == "RGROUP01" || roleGroup == "RGROUP02" || roleGroup == "RGROUP03"){			
					h.push('				<li style="float:none !important;">');
					h.push('					<a href="javascript:showUserManual(3);">');
					h.push('						<i class="fa fa-map-o fa-lg"></i> ' + i18n_master.getText('LBL_USER_MANUAL') + '');
					h.push('					</a>');
					h.push('				</li>');
				}
			}
			*/
			
			
//			if(roleGroup == "RGROUP01"){
//				h.push('				<li style="float:none !important;">');
//				h.push('					<a href="javascript:showUserManual(1);">');
//				h.push('						<i class="fa fa-map-o fa-lg"></i> ' + i18n_master.getText('LBL_USER_MANUAL') + ' (KME)');
//				h.push('					</a>');
//				h.push('				</li>');
//			}
//			// KME, NSC
//			if(roleGroup == "RGROUP01" || roleGroup == "RGROUP02"){
//				h.push('				<li style="float:none !important;">');
//				h.push('					<a href="javascript:showUserManual(2);">');
//				h.push('						<i class="fa fa-map-o fa-lg"></i> ' + i18n_master.getText('LBL_USER_MANUAL') + ' (NSC)');
//				h.push('					</a>');
//				h.push('				</li>');
//			}
			
			
			
//			h.push('				<li class="divider" style="float:none !important;"></li>');
//			h.push('				<li style="float:none !important;">');
//			h.push('					<a href="javascript:showVideoModal();">');
//			h.push('						<i class="fa fa-file-video-o fa-lg"></i> ' + i18n_master.getText('LBL_USER_VIDEO'));
//			h.push('					</a>');
//			h.push('				</li>');
			h.push('			</ul>');
			h.push('		</li>');
			
			
			h.push('		<li style="margin-right:40px;">');
			h.push('			<a href="javascript:logout();"><i class="fa fa-sign-out"></i> <span class="hidden-xs hidden-sm hidden-md">' + i18n_master.getText('LBL_LOG_OUT') + '</span></a>');
			h.push('		</li>');
			h.push('    </ul>');

			/*
				// Small Menu Dropdown Area
				h.push('	<ul class="nav navbar-top-links navbar-right hidden-sm hidden-md hidden-lg " >');
				h.push('            <div class="dropdown">');
				h.push('                <button id="show-dropdown-menu" class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown"><i class="fa fa-bars"></i> Menu</button>');
				h.push('                    <ul class="dropdown-menu fadeInRight animated" style="left: auto;right: 1px;max-height: 350px;overflow-y: auto;">');
				h.push(							_smallMenuList.toString().replaceAll("\,",""));
				h.push('                    </ul>');
				h.push('            </div>');
				h.push('        </li>');
				h.push('    </ul>');
			*/
			
			
			h.push('	<ul class="nav navbar-top-links navbar-right hidden-sm hidden-md hidden-lg" >');
			h.push('        <li style="margin-top:15px;">');
			h.push('            <div class="dropdown">');
			h.push('                <button id="show-dropdown-funtion" class="btn btn-warning dropdown-toggle" type="button" data-toggle="dropdown"><i class="fa fa-folder-o"></i></button>');
			h.push('                    <ul class="dropdown-menu fadeInRight animated" style="left: auto;right: 1px;">');
			
			// if(data.LANDSCAPE_NAME.indexOf("DEV") > -1 || data.LANDSCAPE_NAME.indexOf("QA") > -1){
			if($(filterdMenu).length > 0){
				h.push('					<li style="float:none !important;"><a href="javascript:showNotificationsModal();" class="count-info" href="#"><i class="fa fa-bell-o fa-lg"></i> ' + i18n_master.getText('LBL_WORKFLOW_NOTIFICATIONS') + ' <span class="label label-warning" id="notifications-log-count"></span></a></li>');
				h.push('					<li class="divider" style="float:none !important;"></li>');
			}
			//}
			
			// KME, NSC
			if(roleGroup == "RGROUP01" || roleGroup == "RGROUP02"){			
				h.push('					<li style="float:none !important;"><a id="li-history-log" class="count-info" href="#"><i class="fa fa-check-square-o fa-lg"></i> ' + i18n_master.getText('LBL_HISTORY_LOG') + ' <span class="label label-warning" id="history-log-count"></span></a></li>');
				h.push('					<li class="divider" style="float:none !important;"></li>');
				
				h.push('					<li style="float:none !important;"><a id="li-view-master-list" class="count-info" href="#"><i class="fa fa-undo fa-lg"></i> ' + i18n_master.getText('LBL_RECENT_DEALER') + ' <span class="label label-warning" id="view-master-list-count"></span></a></li>');
				h.push('					<li class="divider" style="float:none !important;"></li>');
			}
			
			h.push('                        <li style="float:none !important;"><a href="javascript:showDisclaimer(\'policy\');"><i class="fa fa-gavel fa-lg"></i> ' + i18n_master.getText('LBL_PRIVACY_POLICY') + '</a></li>');
			h.push('						<li class="divider" style="float:none !important;"></li>');
			
			h.push('                        <li style="float:none !important;"><a href="javascript:showDisclaimer(\'cookie\');"><i class="fa fa-info-circle fa-lg"></i> ' + i18n_master.getText('LBL_COOKIES_VIEW') + '</a></li>');
			h.push('						<li class="divider" style="float:none !important;"></li>');	
			
			h.push('                        <li style="float:none !important;"><a href="javascript:showEDDSUserInfo();"><i class="fa fa-id-card fa-lg"></i> ' + i18n_master.getText('LBL_USER_INFO') + '</a></li>');
			h.push('						<li class="divider" style="float:none !important;"></li>');

			h.push('                        <li style="float:none !important;"><a href="javascript:changeLanguage();"><i class="fa fa-language fa-lg"></i> ' + i18n_master.getText('LBL_LANGUAGE') + '</a></li>');
			h.push('						<li class="divider" style="float:none !important;"></li>');

			h.push('                        <li id="rfc_info" style="float:none !important;"><a href="javascript:rfcInfo();"><i class="fa fa-user-secret fa-lg"></i> ' + i18n_master.getText('LBL_RFC_INFO') + '</a></li>');
			h.push('						<li class="divider" style="float:none !important;"></li>');
			
//			h.push('                        <li style="float:none !important;"><a href="javascript:showUserManual();"><i class="fa fa-map-o fa-lg"></i> ' + i18n_master.getText('LBL_HELP') + '</a></li>');
//			h.push('						<li class="divider" style="float:none !important;"></li>');
			
			h.push('                        <li style="float:none !important;padding-bottom:10px;"><a href="javascript:logout();"><i class="fa fa-sign-out fa-lg"></i> ' + i18n_master.getText('LBL_LOG_OUT') + '</a></li>');
			h.push('                    </ul>');
			//
			
			h.push('					<ul class="dropdown-menu dropdown-alerts animated fadeInRight" id="sm-notifications-log" style="display:none;left: auto;right: 1px;"></ul>');
			h.push('					<ul class="dropdown-menu dropdown-alerts animated fadeInRight" id="sm-history-log" style="display:none;left: auto;right: 1px;"></ul>');
			h.push('					<ul class="dropdown-menu dropdown-alerts animated fadeInRight" id="sm-view-master-list" style="display:none;left: auto;right: 1px;"></ul>');
			
			h.push('            </div>');
			h.push('        </li>');

			// Small Menu Area
			h.push('        <li>');
			h.push('			<button class="navbar-minimalize minimalize-styl-2 btn btn-primary" style="height:35px;"><i class="fa fa-bars"></i></button>');
			h.push('        </li>');
			
			h.push('    </ul>');
			
			h.push('</nav>');
			
			$("#page-header").html(h.join(""));
			
			if(data["RFC_INFO"] == "false"){
				$('#rfc_info').hide();
			}else{
				$('#rfc_info').show();
			}
			
			$("#li-notifications-log").on("click",function(e){
				setTimeout(function(){
					$("#sm-notifications-log").show();
				},100);
			});
			
			$("#li-history-log").on("click",function(e){
				setTimeout(function(){
					$("#sm-history-log").show();
				},100);
			});

			$("#li-view-master-list").on("click",function(e){
				setTimeout(function(){
					$("#sm-view-master-list").show();
				},100);
			});
			
			$("#show-dropdown-funtion").on("click",function(e){
				$("#sm-notifications-log").hide();
				$("#sm-history-log").hide();
				$("#sm-view-master-list").hide();
				
				// bind click event for hidden
				$(document).on('click', function () {
					$("#sm-notifications-log").hide();
					$("#sm-history-log").hide();
					$("#sm-view-master-list").hide();
				});
			});
			
			// load data
			getNotificationsData();
			getViewMasterList();
			getHistoryLog();

/*
			h.push('<nav class="navbar navbar-static-top" role="navigation">');
			h.push('	<div class="navbar-header">');
			h.push('		<div role="search" class="navbar-form-custom" action="#">');
			h.push('			<div class="form-group hide">');
			h.push('				<input type="text" placeholder="Search " class="form-control" name="top-search" id="top-search">');
			h.push('			</div>');
			h.push('		</div>');
			h.push('	</div>');
			
			h.push('</nav>');
			
			$("#page-header").html(h.join(""));
			
			if(data["RFC_INFO"] == "false"){
				$('#rfc_info').hide();
				$('#rfc_info').next().hide();
			}else{
				$('#rfc_info').show();
			}
*/

		},error: function(xhr, status, error){
			if(xhr.getResponseHeader('content-type').startsWith("text/html")){	
				// alert(i18n_master.getText('MSG_FAILED') + " " + "Session Expired, please log on again.");
				// sessionExpiredLogout();
			}else{
				swal(i18n_master.getText('MSG_FAILED'), i18n_master.getText('MSG_FAILED_STATUS_CODE') + status + ", " + error , "error");
				hideLoading();
				console.log("loadPageHeader()");
			}
		}
	});   
}

function loadPageTitle() {

	var storage = $.sessionStorage;
	
	var currentNodeIndex = storage.get('ND_IDX');
	var pageTitle = "";
	var depth1 = "";
	var depth1Url = "";
	var depth1ClassActive = "";

	var depth2 = "";
	var depth2Url = "";
	var depth2ClassActive = "";

	if (currentNodeIndex == 1) {
		pageTitle = storage.get('PRT_ND_NM');
		depth1 = storage.get('PRT_ND_NM');
		depth1Url = ( storage.get('PRT_ND_URL') == "" ) ? "#" : storage.get('PRT_ND_URL');

		depth1ClassActive = "active";

	} else if (currentNodeIndex == 2) {
		pageTitle = storage.get('ND_NM');
		depth1 = storage.get('PRT_ND_NM');
		depth1Url = storage.get('PRT_ND_URL');
		
		depth2 = storage.get('ND_NM');
		depth2Url = storage.get('ND_URL');

		depth2ClassActive = "active";
	}

	var title = [];

	title.push('<!-- page title -->');
	title.push('<div class="col-lg-7 col-md-5">');
	title.push('    <h2>' + pageTitle.trim() + '</h2>');
	title.push('</div>');
	title.push('<!-- /.page title -->');
	title.push('<!-- breadclumb -->');
	title.push('<div class="col-lg-5 col-md-7 text-right">');
	title.push('    <ol class="breadcrumb">');
	title.push('        <li>');
	title.push('            <a href="javascript:goToMain();">'+i18n_master.getText('LBL_HOME')+'</a>');
	title.push('        </li>');

	title.push('        <li class="'+depth1ClassActive+'">');
	title.push('            <a href="' + depth1Url + '">' + depth1 + '</a>');
	title.push('        </li>');

	if(currentNodeIndex == 2){
		title.push('    <li class="'+depth2ClassActive+'">');
		title.push('        <strong>' + depth2 + '</strong>');
		title.push('    </li>');    
	}
    
	title.push('    </ol>');
	title.push('</div>');
	title.push('<!-- /.breadclumb -->');

	$("#page-title").html(title.join(""));

}

function loadPageTop() {
    var h = [];
    h.push('<div class="bn_tpp" id="btn_edds_top" style="display:none;">');
    h.push('    <a href="#" class="bn_pagetop">');
    h.push('        <i class="fa fa-chevron-up"></i>');
    h.push('    </a>');
    h.push('</div>');

    if ($("#btn_edds_top").length == 0) $(document.body).append(h.join(""));

    pageTop();
}

function pageTop() {
    //Check to see if the window is top if not then display button
	$(window).on('scroll',function () {
        if ($(this).scrollTop() > 100) {
            $('#btn_edds_top').fadeIn();
        } else {
            $('#btn_edds_top').fadeOut();
        }
    });

    //Click event to scroll to top
    $('#btn_edds_top').on('click',function() {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });
}