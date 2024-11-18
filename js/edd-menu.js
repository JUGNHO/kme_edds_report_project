
function getChildMenu(menuList, menuID){
	return menuList.filter(function(item){ return (item['ZMENU'] == menuID && item['ZREAD'] == "X" ) });
}

// var _smallMenuList = [];
function loadNavigation() {
	$.ajax({
		url: "com.kme.edds.admin.GetMenuByUserRole",
		//url: "com.kme.edds.common.EDDSUserInfo?prtmode=getUserInfo",
		cache: false,
		type: "post",
		//async: false,
		dataType: 'json',
		//contentType: "application/x-www-form-urlencoded;charset=utf-8",
		success: function(response) {
			// console.log(response);
			// define sessionStorage Object
			var storage = $.sessionStorage;
			// 
			var menuInfo = response.MENU_INFO;
			var userInfo = response.USER_INFO;
			storage.set('USER_INFO', (userInfo));
			//storage.set('USER_INFO', userInfo);
			var portalId = userInfo.ZPOTALID;
			var userName = userInfo.ZUFNAME + ' ' + userInfo.ZULNAME;
			var managerTypeDesc = userInfo.ZMANAGER_T;
			var imgPath	= '';
			if(userInfo.ZFILEN == '') imgPath = '/com.kme.edds.resources/img/noimg_person.png';
			else imgPath = userInfo.ZPHOTPATH + '/'+ userInfo.ZFILEN;
		
			/**********************************************************************************************************************
			 * EDDS Menu Creation
			 * li menus
			 * ********************************************************************************************************************/
			var menuList = response.T_LIST;
			var buttonList = response.T_ICON;
			
			// set Menu Object for Permission of EDDS Notifications
			storage.set('OMENU', menuList);
			storage.set('OBUTTON', buttonList);
			storage.set('SAPSYSTEMNAME', response.SAPSYSTEMNAME);
			
			//console.log(menuList);
			var isAssignMenu = false;
			var length = menuList.length;
			var liNav = [];
			var menuText = "";
			var menuID = "";
			var menuObj = {};
			var portalUrl = "";
			var className = "";
			var smallMenuStyle = "float:left";
			var first_menus = menuList.filter(function(item){return (item['ZMENULV'] == '01' && item['ZREAD'] == 'X')});
			
			// EDDS-3 Dealer Map
			// if menu sort is not defined then > 99
			$(first_menus).each(function(idx,obj){
				if(obj['ZSORT'] == '' || obj['ZSORT'] == null){
					obj['ZSORT'] = '99';
				}
			});
			
			// sort
			first_menus = _.sortBy( first_menus,'ZSORT');
			
			$(first_menus).each(function(idx, item){
				
				//console.log("idx : " + idx);
				//console.log(item);
				
				menuID = $.trim(item["ZMENU"]);
				menuText = $.trim(item["ZMENUT"]).toUpperCase();
				menuObj = menuInfo[menuID];
				
				// EDDS-694
				if(menuID == 'MENU118'){
					return;
				}
				
				portalUrl = "#";
				className = "";
				if (typeof menuObj !== "undefined"){
				
					// menu diaply skip
					if(menuObj["MENU_DISPLAY_FLAG"] == "N"){
						return;
					}
				
					portalUrl = menuObj["COMPONENT_URL"];
					
					// get Url of the first Node, this is Home url.
					if(idx == 0){
						storage.set('MAIN_URL', portalUrl);
					}
					
					className = menuObj["ICON_CLASS_NAME"];
					menuText = i18n_master.getText(menuObj["I18N_KEY"]).toUpperCase();
				}else{
					console.log( menuText+ " Menu["+menuID+"] must define in the system of EDDSMenuAuth");	
				}
				
				//if("X".equals(readMenu)){
				var second_menus = getChildMenu(menuList, menuID);
				
				if(second_menus.length == 1){
					liNav.push('<li node-level="1" id="'+menuID+'" component-url="'+portalUrl+'"><a href="'+portalUrl+'"><i class="fa '+className+'"></i> <span class="nav-label">'+menuText+'</span></a></li>');
					
					// for Small Menu #show-dropdown-menu
					// _smallMenuList.push('<li node-level="1" id="'+menuID+'" component-url="'+portalUrl+'" style="'+smallMenuStyle+'"><a href="'+portalUrl+'"><i class="fa '+className+'"></i> <span class="nav-label">'+menuText+'</span></a></li>');
				}else{
					
					// except dealer user case
					if(second_menus.length == 2){
						var checkMenuObj = second_menus[1];
						// "USER ADMINISTRATION" && ""EMPLOYEE WORKFLOW" case skip
						if(checkMenuObj['ZMENU'] == "MENU004" && checkMenuObj['ZMENUH'] == "MENU020"){
							return;
						}
					}
					
					liNav.push('  <li node-level="1">');
					//liNav.push('      <a href="#'+menuID+'" data-parent="#side-menu" data-toggle="collapse" ><i class="fa '+className+'"></i> <span class="fa arrow"></span> <span class="nav-label"> '+menuText+' </span></a>');
					//liNav.push('      <ul class="nav nav-second-level collapse" id="'+menuID+'">');

					liNav.push('      <a href="#"><i class="fa '+className+'"></i> <span class="fa arrow"></span> <span class="nav-label"> '+menuText+' </span></a>');
					liNav.push('      <ul class="nav nav-second-level">');
					
					$(second_menus).each(function(idx2, item2){

						menuID = $.trim(item2["ZMENUH"]);

						if(menuID != ""){
							menuText = $.trim(item2["ZMENUHT"]);
							menuObj = menuInfo[menuID];
							
							portalUrl = "#";
							if (typeof menuObj !== "undefined"){
							
								// menu diaply skip
								if(menuObj["MENU_DISPLAY_FLAG"] == "N"){
									return;
								}
							
								portalUrl = menuObj["COMPONENT_URL"];
								menuText = i18n_master.getText(menuObj["I18N_KEY"]).toUpperCase();
							}else{
								console.log( menuText+ " Menu["+menuID+"] must define in the system of EDDSMenuAuth");	
							}
							
							// className = menuObj["ICON_CLASS_NAME"];

							var third_menus = getChildMenu(menuList, menuID);
							if(third_menus.length == 0){
								liNav.push('<li node-level="2" id="'+menuID+'" component-url="'+portalUrl+'"><a href="'+portalUrl+'"> '+menuText+' </a></li>');
								
								// for Small Menu #show-dropdown-menu
								// _smallMenuList.push('<li node-level="2" id="'+menuID+'" component-url="'+portalUrl+'" style="'+smallMenuStyle+'"><a href="'+portalUrl+'"> '+menuText+' </a></li>');
								
							}else{
								liNav.push('          <li node-level="2" id="'+menuID+'"><a href="#">'+menuText+' <span class="fa arrow"></span> </a>');
								liNav.push('              <ul class="nav nav-third-level">');

								$(third_menus).each(function(idx3, item3){
									if($.trim(item3["ZMENUH"]) != ""){
										menuID = $.trim(item3["ZMENUH"]);
										menuText = $.trim(item3["ZMENUHT"]);
										menuObj = menuInfo[menuID];
										
										
										
										portalUrl = "#";
										if (typeof menuObj !== "undefined"){
										
											// menu diaply skip
											if(menuObj["MENU_DISPLAY_FLAG"] == "N"){
												return;
											}
										
											portalUrl = menuObj["COMPONENT_URL"];
											menuText = i18n_master.getText(menuObj["I18N_KEY"]).toUpperCase();
											
										}else{
											console.log( menuText+ " Menu["+menuID+"] must define in the system of EDDSMenuAuth");	
										}
										// className = menuObj["ICON_CLASS_NAME"];	
										liNav.push('           <li node-level="3" id="'+menuID+'" component-url="'+portalUrl+'"><a href="'+portalUrl+'"> '+menuText+' </a></li>');	
										
										// for Small Menu #show-dropdown-menu
										// _smallMenuList.push('           <li node-level="3" id="'+menuID+'" component-url="'+portalUrl+'" style="'+smallMenuStyle+'"><a href="'+portalUrl+'"> '+menuText+' </a></li>');	
										
									}
								});

								liNav.push('              </ul>');
								liNav.push('          </li>');
							}
						}

					});
					liNav.push('      </ul>');
					liNav.push('  </li>');
				}
				
				// Menu Auth assign
				isAssignMenu = true;
				//}		
			});
			
			if(!isOperationSystem()){
				// Exception Case
				if(portalId == "KME_AESE2"){
					liNav.push('  <li node-level="1" id="dashboard"><a href="com.kme.edds.mastermanagement.ProfileMasterManagement"><i class="fa fa-th-large"></i> <span class="nav-label">ProfileManagement</span></a></li>');
				}
				// Exception Case
				if(portalId == "KME_AESE2" || portalId == "KEU30038"){
					liNav.push('  <li>');
				    liNav.push('      <a href="#FIELD_FORCE_MENU" data-toggle="collapse" aria-expanded="true" class="dropdown-toggle" ><i class="fa fa-building"></i> <span class="nav-label">Field Force (Mockup) </span></a>');
				    liNav.push('      <ul class="nav nav-second-level collapse" id="FIELD_FORCE_MENU">');
				    liNav.push('          <li node-level="2" id="field_force_category_management"><a href="com.kme.edds.fieldforce.CategoryList">Category Management</a></li>');
				    liNav.push('          <li node-level="2" id="field_force_task_management"><a href="com.kme.edds.fieldforce.TaskList">Task Management</a></li>');
				    liNav.push('          <li node-level="2" id="field_force_task_configuration_per_dealer"><a href="com.kme.edds.fieldforce.TaskConfiguration">Task Configuration</a></li>');
				    // liNav.push('          <li node-level="2" id="field_force_staff_assignment"><a href="com.kme.edds.fieldforce.FieldForceDashboard">FF Assignment</a></li>');
				    liNav.push('          <li node-level="2" id="field_force_field_staff_dashboard"><a href="com.kme.edds.fieldforce.FieldForcePerformance">Field Staff Dashboard</a></li>');
				    liNav.push('          <li node-level="2" id="field_force_dealer_list"><a href="com.kme.edds.fieldforce.VisitReportList">Visit Report</a></li>');
				    liNav.push('          <li node-level="2" id="field_force_performance"><a href="com.kme.edds.fieldforce.FieldForcePerformance">Field Force Performance</a></li>');
				    liNav.push('          <li node-level="2" id="field_force_evaluation_task"><a href="com.kme.edds.fieldforce.EvaluationTask">Evaluation Tasks</a></li>');
				    liNav.push('          <li node-level="2" id="field_force_weekly_visit_plan"><a href="com.kme.edds.fieldforce.WeeklyVisitPlan">Weekly Visit Plan</a></li>');
				    // liNav.push('          <li node-level="2" id="field_force_visit_plan"><a href="com.kme.edds.fieldforce.">Dealer Visiting Plan</a></li>');
				    liNav.push('      </ul>');
				    liNav.push('  </li>');
				}
			}
			
			/**********************************************************************************************************************
			 * End of
			 * EDDS Menu Creation
			 * li menus
			 * ********************************************************************************************************************/
			
			/**********************************************************************************************************************
			 * EDDS Side Menu Structure creation
			 * ********************************************************************************************************************/
			var nav = [];
			nav.push('<!-- Header Profile #-->');
			nav.push('<li class="nav-header">');
			nav.push('  <!-- gnb profile -->');
			nav.push('  <div class="ibox collapsed  profile-element" style="margin-bottom:6px;">');
			nav.push('    <div class="common_profile">');
			nav.push('      <!-- name +  my ddealer -->');
			nav.push('      <h5>');
			nav.push('        <strong class="font-bold">' + userName + '</strong>');
			//nav.push('        <a class="dropdown-toggle" data-toggle="dropdown" href="#">');
			//nav.push('          <i class="fa fa-star" aria-hidden="true" ></i><span class="my_dealer_num">(2)</span>');
			//nav.push('        </a>');
			nav.push('        <!-- my dealer contact-->');
			nav.push('        <ul class="dropdown-menu dropdown-user my_dealer animated fadeInDown">');
			nav.push('          <!-- dealer profile -->');
			nav.push('          <li>');
			nav.push('            <a href="#">');
			nav.push('              <div class="col-sm-3">');
			nav.push('                <img alt="image" class="img-circle m-t-xs img-responsive" src="/com.kme.edds.resources/img/a2.jpg">');
			nav.push('              </div>');
			nav.push('              <div class="col-sm-9">');
			nav.push('                <h6>john smith</h6>');
			nav.push('                <i class="fa fa-envelope" aria-hidden="true"></i> <span>abcde@abcmotors.de</span><br>');
			nav.push('                <i class="fa fa-phone" aria-hidden="true"></i><span> (123) 456-7890</span>');
			nav.push('              </div>');
			nav.push('            </a>');
			nav.push('          </li>');
			nav.push('          <!-- /.dealer profile -->');
			nav.push('          <!-- dealer profile -->');
			nav.push('          <li>');
			nav.push('            <a href="#">');
			nav.push('              <div class="col-sm-3">');
			nav.push('                <img alt="image" class="img-circle m-t-xs img-responsive" src="/com.kme.edds.resources/img/a2.jpg">');
			nav.push('              </div>');
			nav.push('              <div class="col-sm-9">');
			nav.push('                <h6>john smith</h6>');
			nav.push('                <i class="fa fa-envelope" aria-hidden="true"></i> <span>abcde@abcmotors.deabcde@abcmotors.</span><br>');
			nav.push('                <i class="fa fa-phone" aria-hidden="true"></i><span> (123) 456-7890</span>');
			nav.push('              </div>');
			nav.push('            </a>');
			nav.push('          </li>');
			nav.push('          <!-- /.dealer profile -->');
			nav.push('        </ul>');
			nav.push('      <!-- /.my dealer contact-->');
			nav.push('      </h5>');
			nav.push('      <!-- /.name +  my ddealer -->');
			nav.push('      <!-- my role -->');
//			nav.push('      <span class="text-muted text-xs block">' + managerTypeDesc);
//			nav.push('        <a class="collapse-link">');
//			nav.push('          <i class="fa fa-chevron-up"></i>');
//			nav.push('        </a>');
//			nav.push('      </span>');
			nav.push('      <!-- /.my role -->');
			nav.push('    </div>');
			nav.push('    <!-- profile img -->');
			nav.push('    <div class="ibox-content profile_image">');
			//nav.push('        <span class="profile_name"><img class="img-circle" src="' + imgPath + '" onerror="this.onerror=null;this.src=\'/com.kme.edds.resources/img/noimg_person.png\';" /></span>');
			nav.push('    </div>');
			nav.push('    <!-- /.profile img -->');
			nav.push('  </div>');
			nav.push('  <!-- /.gnb profile -->');
			nav.push('<div class="logo-element">');
			nav.push('  EDD');
			nav.push('</div>');
			nav.push('</li>');
			nav.push('<!-- Side Menu -->');
			nav.push('<!-- /.Side Menu -->');
			/**********************************************************************************************************************
			 * End of EDDS Side Menu Structure creation
			 * ********************************************************************************************************************/
			//
			$("#side-menu").html(nav.join("")).append(liNav.join(""));
		
			/**
			 * Find Current li node info
			 * and node info input to sessionStorage Object  
			 * */
			var url = document.location.href;
			var componentUrl = url.substr(url.lastIndexOf('/')+1);
			// a tag selector
			//$("li[id]>a")
			$("li[id]").find('a')
				.each(function(idx, obj){
					var aDOM = $(this);
					if(componentUrl == aDOM.attr('href')){
						var liDOM = $(this).parent();
						setNodeInfo(liDOM);
						return;
					}
				});
		
			/**
			 * Active Current Node Object 
			 * */
			var currentNode = "";
			var currentNodeLevel = "";
			if (storage != undefined) {
				currentNodeId = storage.get('ND_ID');
				currentNodeLevel = storage.get('ND_IDX');
			}
			
			if (currentNodeId != undefined) {
				$('#' + currentNodeId).addClass('active');
				if ($('#' + currentNodeId).attr('node-level') != undefined && $('#' + currentNodeId).attr('node-level') != "") {
					var lvl = parseInt(currentNodeLevel, 10);
					if (lvl > 1) {
						var o = $('#' + currentNodeId);
						for (var i = 2; i <= lvl; i++) {
							o = o.parent().parent();
							o.addClass('active');
						}
						
					}
				}
			}else{
				$('#MENU001').addClass('active');
			}
		
			/**
			 * Auth Check
			 */
			if(isAssignMenu == false){
				var systemName = response.LANDSCAPE_NAME;
				 // make logoffform append to body
//				 if($('#logoffform').length == 0){
//					 var h = [];
//					 h.push('<form name="logoffform" id="logoffform" style="display:none;position:absolute;top:-5000;left:-5000" method="POST">');
//					 h.push('<input type="hidden" name="logout_submit" value="true">');
//					 h.push('</form>');
//
//					 $(document.body).append(h.join(""));
//				 }
				 swal({
					 title: i18n_master.getText('MSG_FAILED'),
					 text: i18n_master.getText('MSG_PLEASE_ASSIGN_MENU'),
					 type: "error",
					 allowEscapeKey: false
				 }, function() {
					 try{
						 if(opener){
							 opener.top.logoff();
							 window.close();
						 }else{
							 LSAPI.getSessionPlugin().logoff();
							 //submitLogout("/irj/servlet/prt/portal/prtroot/com.sap.portal.navigation.masthead.LogOutComponent");
						 }
					 }catch(e){
						 LSAPI.getSessionPlugin().logoff();
						 //submitLogout("/irj/servlet/prt/portal/prtroot/com.sap.portal.navigation.masthead.LogOutComponent");
					 }
				 });
			}
			/**
			 * end of Auth Check
			 */
			
			if($('.logout_mobile').length > 0){
				$('.logout_mobile').html('<a href="javascript:logout();"><i class="fa fa-sign-out"></i> ' + i18n_master.getText('LBL_LOG_OUT') + '</a>');
			}else{
				
				$('.navbar-static-side').append('<div class="hidden-lg hidden-md logout_mobile"><a href="javascript:logout();"><i class="fa fa-sign-out"></i> ' + i18n_master.getText('LBL_LOG_OUT') + '</a></div>');
				
			}
		
			setEDDSInit();
			
			// EDDS-694 
			if($.sessionStorage.get('SAPSYSTEMNAME') == "PDE"){
				loadButtonControl();
			}else{
				$('button[data-button-control]').show();
			}
			
		},
		error: function(xhr, status, error){
			if(xhr.getResponseHeader('content-type').startsWith("text/html")){	
				// alert(i18n_master.getText('MSG_FAILED') + " " + "Session Expired, please log on again.");
				// sessionExpiredLogout();
			}else{
				swal(i18n_master.getText('MSG_FAILED'), i18n_master.getText('MSG_FAILED_STATUS_CODE') + status + ", " + error , "error");
				hideLoading();
				console.log("loadNavigation()");
			}
		}
	});
}

function setEDDSInit(){
	
	//console.log('init!!');
	
    // Add body-small class if window less than 768px
    if ($(this).width() < 769) {
        $('body').addClass('body-small')
    } else {
        $('body').removeClass('body-small')
    }

    // MetsiMenu
    $('#side-menu').metisMenu();

    // Collapse ibox function
    $('.collapse-link').on('click',function () {
        var ibox = $(this).closest('div.ibox');
        var button = $(this).find('i');
        var content = ibox.find('div.ibox-content');
        content.slideToggle(200);
        button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
        ibox.toggleClass('').toggleClass('border-bottom');
        setTimeout(function () {
            ibox.resize();
            ibox.find('[id^=map-]').resize();
        }, 50);
    });

    // Close ibox function
    $('.close-link').on('click',function () {
        var content = $(this).closest('div.ibox');
        content.remove();
    });

    // Fullscreen ibox function
    $('.fullscreen-link').on('click',function () {
        var ibox = $(this).closest('div.ibox');
        var button = $(this).find('i');
        $('body').toggleClass('fullscreen-ibox-mode');
        button.toggleClass('fa-expand').toggleClass('fa-compress');
        ibox.toggleClass('fullscreen');
        setTimeout(function () {
            $(window).trigger('resize');
        }, 100);
    });

    // Close menu in canvas mode
    $('.close-canvas-menu').on('click',function () {
        $("body").toggleClass("mini-navbar");
        SmoothlyMenu();
    });

    // Run menu of canvas
    $('body.canvas-menu .sidebar-collapse').slimScroll({
        height: '100%',
        railOpacity: 0.9
    });
	
    // Open close right sidebar
    $('.right-sidebar-toggle').on('click',function () {
        $('#right-sidebar').toggleClass('sidebar-open');
    });

    // Initialize slimscroll for right sidebar
    $('.sidebar-container').slimScroll({
        height: '100%',
        railOpacity: 0.4,
        wheelStep: 10
    });

    // Open close small chat
    $('.open-small-chat').on('click',function () {
        $(this).children().toggleClass('fa-navicon').toggleClass('fa-remove');
        $('.small-chat-box').toggleClass('active');
    });

    // Initialize slimscroll for small chat
    $('.small-chat-box .content').slimScroll({
        height: '234px',
        railOpacity: 0.4
    });

    // Small todo handler
    $('.check-link').on('click',function () {
        var button = $(this).find('i');
        var label = $(this).next('span');
        button.toggleClass('fa-check-square').toggleClass('fa-square-o');
        label.toggleClass('todo-completed');
        return false;
    });

    // Append config box / Only for demo purpose
    // Uncomment on server mode to enable XHR calls
    //$.get("skin-config.html", function (data) {
    //    if (!$('body').hasClass('no-skin-config'))
    //        $('body').append(data);
    //});

    // Minimalize menu
    $('.navbar-minimalize').on('click',function () {
        $("body").toggleClass("mini-navbar");
        SmoothlyMenu();

    });

    // Tooltips demo
    $('.tooltip-demo').tooltip({
        selector: "[data-toggle=tooltip]",
        container: "body"
    });

    // Move modal to body
    // Fix Bootstrap backdrop issu with animation.css
    $('.modal').appendTo("body");

    
//    var _iframeHeight = 100;
	var _callCount = 0;
    // Full height of sidebar
    function fix_height() {
		
		var heightWithoutNavbar = $("body > #wrapper").height() - 61;
		$(".sidebard-panel").css("min-height", heightWithoutNavbar + "px");

		var navbarHeigh = $('nav.navbar-default').height();
		var wrapperHeigh = $('#page-wrapper').height();

		if (navbarHeigh > wrapperHeigh) {
			$('#page-wrapper').css("min-height", navbarHeigh + "px");
		}

		if (navbarHeigh < wrapperHeigh) {
			$('#page-wrapper').css("min-height", $(window).height() + "px");
		}

		if ($('body').hasClass('fixed-nav')) {
			if (navbarHeigh > wrapperHeigh) {
				$('#page-wrapper').css("min-height", navbarHeigh - 60 + "px");
			} else {
				$('#page-wrapper').css("min-height", $(window).height() - 60 + "px");
			}
		}
		
    }

    fix_height();

    // Fixed Sidebar
    $(window).on("load", function () {
        if ($("body").hasClass('fixed-sidebar')) {
            $('.sidebar-collapse').slimScroll({
                height: '100%',
                railOpacity: 0.9
            });
        }
    });

    // Move right sidebar top after scroll
    $(window).on('scroll',function () {
        if ($(window).scrollTop() > 0 && !$('body').hasClass('fixed-nav')) {
            $('#right-sidebar').addClass('sidebar-top');
        } else {
            $('#right-sidebar').removeClass('sidebar-top');
        }
    });
		
	$(window).on("load resize scroll", function () {
		if (!$("body").hasClass('body-small')){
			fix_height();
		}
	});

	$("[data-toggle=popover]").on({
		  click: function() {
			// Do something on click
			$(this).popover("show");
		  },
		  mouseenter: function() {
			// Do something on mouseenter
			$(this).popover("show");
		  },
		  mouseleave: function() {
			// Do something on mouseleave
			$(this).popover("hide");
		  }
	});

    // Add slimscroll to element
    $('.full-height-scroll').slimscroll({
        height: '100%'
    })
    
	var mn = $(".depth3_nav");

	$('.summernote').each(function(idx,item){
		var h = 100;
		if($(item).attr('data-height')) h = $(item).attr('data-height');
		
		$(item).summernote({
			height: h,
			toolbar: [
				// [groupName, [list of button]]
				['style', ['bold', 'italic', 'underline', 'clear']],
				['font', ['strikethrough', 'superscript', 'subscript']],
				['fontsize', ['fontsize']],
				['color', ['color']],
				['para', ['ul', 'ol', 'paragraph']],
				['height', ['height']]
			],
			disableDragAndDrop : true
		});
	});
	
	// only text get!!!!!!!!!!!!!!!!!!!!!!!!!!
	// $($('#email_content').summernote('code').replace(/<\/p>/g,'</p>\n').replace(/<br>/,'<br>\n').replace(/<\/div>/g,'</div>\n').replace(/<\/li>/g,'</li>\n')).text() 
	
	$('body').addClass('no-padding');
	
	
	
}

/**
 * mapped li node attribute data put the sessionStorageObject for li node activation
 * 
 * ND_IDX : current clicked node index
 * PRT_ND_NM : clicked parent Node name
 * PRT_ND_URL : clicked parent Node ID
 * ND_ID : Node ID
 * ND_NM : Node name
 * ND_URL : clicked node url of a tag
 * */
function setNodeInfo(liDOM){
	
	// sessionStorage
	var storage = $.sessionStorage;
	
	var nodeIndex = $(liDOM).attr("node-level");
	var clickedUrl = "";
	var parentNodeName = "";
	var parentNodeUrl = "";
	var childNodeName = "";
	var childNameUrl = "";
	var clickedNodeId = "";
	
	// Node Level 1
	if (nodeIndex == 1) {
		var parentNodeli = $(liDOM).children();
		//var childNodeli = "";

		parentNodeName = $(parentNodeli).text();
		//parentNodeUrl = "";
		clickedNodeId = $(liDOM).attr('id');
		//childNodeName = "";
		//childNameUrl = "";
	}else{// Node Level 2, 3
		var aTagDOM = $(liDOM).parent().parent().first().children().first(); // a tag selector
		var childNodeli = $(liDOM);
		parentNodeName = $(aTagDOM).text();
		parentNodeUrl = $(aTagDOM).attr("href");
		clickedNodeId =  $(childNodeli).attr('id');
		childNodeName = $(childNodeli).text();
		childNameUrl = $(childNodeli).children().first().attr("href");

	}

	//alert(" parentNodeName : " + parentNodeName	+ "\n parentNodeUrl : " + parentNodeUrl	+ "\n childNodeName : " + childNodeName	+ "\n childNameUrl : " + childNameUrl	+ "\n clickedNodeId : " + clickedNodeId);
	if(parentNodeUrl != undefined){
		storage.set('ND_IDX', nodeIndex);
		storage.set('PRT_ND_NM', parentNodeName);
		storage.set('PRT_ND_URL', parentNodeUrl);
		storage.set('ND_ID', clickedNodeId);
		storage.set('ND_NM', childNodeName);
		storage.set('ND_URL', childNameUrl);
	}
	
	loadPageTitle();
	
}
