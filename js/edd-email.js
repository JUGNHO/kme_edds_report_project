var EddsEmail= {
	send: {
		
		// Audit이 Active 되면, 이메일을 발송한다.
		auditActive: function(company_code, audit_code){
			EddsEmail.sendEmail({
				prtmode : "auditActive",
				company_code: company_code,
				audit_code: audit_code
			});
		},
		
		// Action 하나가 Open 되면, 이메일을 발송한다.
		actionOpen: function(company_code, audit_code, question_code, edds_code){
			EddsEmail.sendEmail({
				prtmode: "actionOpen",
				company_code: company_code,
				audit_code: audit_code,
				question_code: question_code,
				edds_code: edds_code
			});
		},
		
		// Action 하나가 done 되면, 이메일을 발송한다.
		actionDone: function(company_code, audit_code, question_code, edds_code){
			EddsEmail.sendEmail({
				prtmode: "actionDone",
				company_code: company_code,
				audit_code: audit_code,
				question_code: question_code,
				edds_code: edds_code
			});
		},
		
		// Action 하나가 Verified 되면, 이메일을 발송한다.
		actionVerified: function(company_code, audit_code, question_code, edds_code){
			EddsEmail.sendEmail({
				prtmode: "actionVerified",
				company_code: company_code,
				audit_code: audit_code,
				question_code: question_code,
				edds_code: edds_code
			});
		}
		
	},
	validator: function(param){
		Object.keys(param).map(function(key){
			var value = param[key];
			if(value == null || value == undefined || value == ""){
				
				return key;
			}
		});
		
		return true;
		
	},
	
	sendEmail: function(param){
		var returnFlag = EddsEmail.validator(param);
		if(returnFlag){
			$.ajax({
				type: "POST",
				url: "com.kme.edds.mailer.Mail",
				data: param,
				cache: false,
				dataType: 'json',
				success: function(res) {
					hideLoading();  
				},
				error: function(xhr, status, error){
					if(xhr.getResponseHeader('content-type').startsWith("text/html")){  
		
					}else{
						// swal(i18n_master.getText('MSG_FAILED'), i18n_master.getText('MSG_FAILED_STATUS_CODE') + status + ", " + error , "error");
					}
					hideLoading();
				}
			});
		}else{
			swal(i18n_master.getText('MSG_FAILED'), returnFlag + " is a Mandatory!", "error");
		}
	}
}

