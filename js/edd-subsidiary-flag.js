// global Object 
var subsidiaryFlag = {
	originalFlag: "",
	originalFlagCode: "",
	removeFlags: function(obj, event){
		var originalFlag = $('.subsidiary_div').attr("data-original-flag");

		$(".subsidiary_div li").each(function() {
			$(this).removeClass("active");
		});
	},
	chooseFlag: function(obj){
		$(obj).parent().addClass('active');
	},
	chooseOriginalFlag: function(){
		var originalFlag = $('.subsidiary_div').attr("data-original-flag");

		$("img[name='flag_img']").each(function() {
			var src = $(this).attr('src');

			if (originalFlag == $(this).attr("data-subsidiary")) {
				src = src.replace('32', '64');
			} else {
				src = src.replace('64', '32');
			}
			$(this).attr('src', src);
		});
	},
	loadSubsidiaryFlags: function(_companyCode){

		$.ajax({
			type: "POST",
			url: "/com.kme.edds.script/json/subsidiary_flag.model.json",
			async: true ,
			cache: false ,
			dataType: 'json',
			success: function(data) {
			
				var fHtml = [];
				fHtml.push('<!-- flag list mobile support -->');
				fHtml.push('<nav class="navbar navbar-default ">');
				fHtml.push('	<div class="container-fluid">');
				fHtml.push('		<div class="navbar-header">');
				fHtml.push('			<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#flag_list" aria-expanded="false" rv-i18n="LBL_SELECT_COUNTRY">Select Country</button>');
				fHtml.push('		</div>');
				fHtml.push('		<!-- flag_list_area -->');
				fHtml.push('		<div class="collapse navbar-collapse" id="flag_list">');
				fHtml.push('			<div class="nav navbar-nav" id="subsidiary-flags-row">');
				fHtml.push('				<!-- Subsidiary Flags Row -->');
				fHtml.push('			</div>');
				fHtml.push('			<!-- /.flag_list_area -->');
				fHtml.push('		</div>');
				fHtml.push('		<!-- /.navbar-collapse -->');
				fHtml.push('	</div>');
				fHtml.push('	<!-- /.container-fluid -->');
				fHtml.push('</nav>');
				fHtml.push('<!--/. flag list mobile support -->');
				$('.navbar_flag').html(fHtml.join(''));
				//
				if(_companyCode != "KB01"){
					$('.navbar_flag').addClass('hide');
				}
			
			
				var d = [];
			
				var dataOriginalFlag = "Kia EU";
				var dataFlagCode = "KB01";
			
				
				var flagData = data.flags;
				if(_companyCode == "KB01"){
					var h = { "KM NSC":[], "EU West":[],"EU East":[],"Other":[]};
					var hRegion = ["KM NSC", "EU West","EU East","Other"];
					var hRegionText = {"KM NSC":"NSC", "EU West":i18n_master.getText('LBL_DISTRIBUTOR_WESTERN'),"EU East":i18n_master.getText('LBL_DISTRIBUTOR_EASTERN'),"Other":"Other"};

					
					$(flagData).each(function(i, v) {
						var flagName = v.flagName;
						var flagTitle = v.flagTitle;
						var companyCode = v.companyCode;
						var regionInEu = v.stype;

						if (companyCode == "KB01") {flagActive = "active";}
						else {flagActive = "";}

						if(h[regionInEu].length == 0){
							if (regionInEu == "KM NSC") {
								h[regionInEu].push('<ul class="nav navbar-nav float-e-margins tooltip-demofloat-e-margins tooltip-demo subsidiary_div"    style="width:auto;"> ');
							}
							else {
								h[regionInEu].push('<div style="clear:both"></div>');
								h[regionInEu].push('<div class="panel-heading" style="padding-left:0px;">');
								h[regionInEu].push('	<h5 class="panel-title">');
								h[regionInEu].push('		<a data-toggle="collapse" data-parent="#accordion" href="#collapse-'+ regionInEu.replace(" ","_") + '" aria-expanded="false">'+ hRegionText[regionInEu] + '</a>');								
								h[regionInEu].push('	</h5>');
								h[regionInEu].push('</div>');
								
								h[regionInEu].push('<div id="collapse-'+ regionInEu.replace(" ","_") + '" class="panel-collapse collapse">');
	                        	h[regionInEu].push('<div class="panel-body">');								
								h[regionInEu].push('<ul class="nav navbar-nav float-e-margins tooltip-demofloat-e-margins tooltip-demo subsidiary_div"    style="width:auto;"> ');
							}
						}
												
						h[regionInEu].push('  <li class="'+flagActive+'"><button flags-btn class="btn btn-default dim" type="button" data-toggle="tooltip" data-placement="top" title="' + flagName + '"><img name="flag_img" src="/com.kme.edds.resources/img/flags/32/' + flagName + '.png" data-subsidiary="' + flagTitle + '" data-subsidiary-code="' + companyCode+ '" ><span class="flag_name visible-xs-block visible-md-block visible-lg-block">' + flagTitle + '</span></button></li>');
					});
					for (var index=0;index<hRegion.length;index++) {					 
					 
						if (h[hRegion[index]].length>0) {
							h[hRegion[index]].push('</ul>');	
							if (hRegion[index] == "KM NSC") {
							}
							else {	
								h[hRegion[index]].push('</div>');	
								h[hRegion[index]].push('</div>');
							}
						}																

						for (var index2=0;index2<h[hRegion[index]].length;index2++) {
							d.push(h[hRegion[index]][index2] );
						}
					}	
				}
				else {
					d.push('<ul class="nav navbar-nav float-e-margins tooltip-demofloat-e-margins tooltip-demo subsidiary_div"    style="width:auto;"> ');
					$(flagData).each(function(i, v) {	
						var flagName = v.flagName;
						var flagTitle = v.flagTitle;
						var companyCode = v.companyCode;			
					
						if(companyCode == _companyCode){
							dataOriginalFlag = flagTitle;
							dataFlagCode = _companyCode;
							// console.log("dataOriginalFlag : " + dataOriginalFlag + " dataFlagCode : " + dataFlagCode);
							d.push('  <li class="active"><button flags-btn class="btn btn-default dim" type="button" data-toggle="tooltip" data-placement="top" title="' + flagName + '"><img name="flag_img" src="/com.kme.edds.resources/img/flags/32/' + flagName + '.png" data-subsidiary="' + flagTitle + '" data-subsidiary-code="' + companyCode+ '" ><span class="flag_name visible-xs-block visible-md-block visible-lg-block">' + flagTitle + '</span></button></li>');
						}
					});					
					d.push('</ul>');
				}
				

				// data Append & bind tooltip 
				$("#subsidiary-flags-row").append(d.join("")).tooltip({
					selector: '[data-toggle="tooltip"]'
				});
			
				//$(".subsidiary_div").attr('data-original-flag', dataOriginalFlag);
				//$(".subsidiary_div").attr('data-original-flag-code', dataFlagCode);
			
				subsidiaryFlag.originalFlag = dataOriginalFlag;
				subsidiaryFlag.originalFlagCode = dataFlagCode;
			
				$(".subsidiary_div button").on({
					/*
					"mouseover": function() {
						removeFlags(this, event);
						chooseFlag(this);
					},
					"mouseout": function() {
						chooseOriginalFlag();
					},
					*/
					"click": function() {
						subsidiaryFlag.removeFlags(this, event);
						subsidiaryFlag.chooseFlag(this);
					
						//$('.subsidiary_div')
						//	.attr("data-original-flag", $(this).children().attr('data-subsidiary'))
						//	.attr("data-original-flag-code", $(this).children().attr('data-subsidiary-code'));
						
						subsidiaryFlag.originalFlag = $(this).children().attr('data-subsidiary');
						subsidiaryFlag.originalFlagCode = $(this).children().attr('data-subsidiary-code');
					}
				});
			},
			error: function() {
				alert('error');
			}
		});
	},
	setSubsidiaryFlag: function(companyCode){
		subsidiaryFlag.removeFlags(this, event);
		$('img[data-subsidiary-code='+companyCode+']').closest('li').addClass('active');
		// set Subsidiary Flag for some action
		subsidiaryFlag.originalFlag = $('img[data-subsidiary-code='+companyCode+']').attr('data-subsidiary');
		subsidiaryFlag.originalFlagCode = companyCode;
		
	}
}