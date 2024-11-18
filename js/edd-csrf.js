(function($) {
	// "use strict";
	
	$._CSRF = {
		data:{
			dp_dtsg: '',
			job_name: ''
		},
		
		generationCSRFToken: function(objectId){
			$.ajax({
				type: "POST",
				url: "com.kme.edds.common.GetCSRFToken",
				data: {object_id: objectId},
				cache: false,
				async: false,
				dataType: 'json',
				success: function(data) {
					$._CSRF.data.dp_dtsg = data.csrfKey;
					$._CSRF.data.job_name = data.jobName;
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
		
		generationCSRFTokenNew: function(objectId, callbackFunction){

			$.ajax({
				type: "POST",
				url: "com.kme.edds.common.GetCSRFToken",
				data: {object_id: objectId},
				cache: false,
				async: true,
				dataType: 'json',
				success: function(data) {
					$._CSRF.data.dp_dtsg = data.csrfKey;
					$._CSRF.data.job_name = data.jobName;
					
					if (typeof callbackFunction == 'function'){
						callbackFunction();
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
			
			/*
			console.log('generationCSRFToken 1' );
			async function createCSRFToken(objectId) {
			    try {
			    	console.log('async test 2-2');
			    	var res = await $._CSRF.getCSRFToken(objectId);
			    	
			    	$._CSRF.data.dp_dtsg = res.csrfKey;
					$._CSRF.data.job_name = res.jobName;
			    	
			    	console.log(res);
			    } catch(err) {
			    	console.log(err);
			    }
			}
			
			
			console.log('async test 2-1');
			createCSRFToken(objectId);
			*/
			
		},
		getCSRFToken: function(objectId){
			
			console.log('getCSRFToken 3');
			
			return $.ajax({
				type: "POST",
				url: "com.kme.edds.common.GetCSRFToken",
				data: {object_id: objectId},
				cache: false,
				async: true,
				dataType: 'json',
				success: function(data) {
					$._CSRF.data.dp_dtsg = data.csrfKey;
					$._CSRF.data.job_name = data.jobName;
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
		
	}
	
})(jQuery);