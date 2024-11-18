
function loadButtonControl() {
	
	var isActive = false;
	// console.log("isActive : " + isActive);
	if(isActive
		//|| $.sessionStorage.get('USER_INFO').BUKRS == 'KB01'  
		//|| $.sessionStorage.get('USER_INFO').BUKRS == 'KB03'
	){
	
		//console.log("loadButtonControl");
		var currentMenu = $.sessionStorage.get('ND_ID');
		var buttonList = $.sessionStorage.get('OBUTTON');
		
		var currentPageButtonList = buttonList.filter(function(item){
			
			// 'MENU118' is top Menu level
			return (currentMenu == item.ZMENU || 'MENU118' == item.ZMENU);
		});
		
		//console.log("currentPageButtonList");
		//console.log(currentPageButtonList);
		
		var titleText = 'Not Assigned this button permission\r\nControled by Kia EU';
		
		$(currentPageButtonList).each(function(idx, item){
			// console.log(item);
			
			var buttonId = item.ZBUTT;
			
			if(item['ACTIVE'] == 'X'){
				$('button[data-button-control='+buttonId+']').show();
			}else{
				
				if(buttonId.indexOf('M118') > -1){
					$('li[data-button-control='+buttonId+']').hide();
				}else{
					$('button[data-button-control='+buttonId+']')
					.attr('disabled', true)
					.popover({
						trigger: "hover",
				        content: titleText
				    }).attr('data-content', titleText)
				    .attr('title', titleText );
				}
			}
			
		});
		
	}else{
		$('button[data-button-control]').show();
	}
	
}