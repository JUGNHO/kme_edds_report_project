/*
	KA02	KMP
	KA03	KMSS
	KA05	KMCZ
	KA06	KMH
	KB01	KME
	KB02	KMUK
	KB03	KMD
	KB04	KMIB
	KB05	KMF
	KB06	KMBL
	KB07	KMAS
	KB08	KMIT
	KB09	KMSW
	KB10	KMNL
	KB11	KMIE
*/

var regexp = {
	validationFlag: true,
    vat: {
        "KB03":/^(DE)?\d{9}$/,
        "KB04":/^(ES)?[A-Z]{1}\d{8}$|^ES\d{8}[A-Z]{1}|^ES[A-Z]{1}\d{7}[A-Z]{1}$|^ES\d{9}$/,
        "KB07":/^(AT)?U\d{8}$/,
        "KB08":/^(IT)?\d{11}$/,
        "KB02":/^GB\d{3}\s{1}\d{4}\s{1}\d{2}$/,
        "KB05":/^(FR)?[0-9A-Z]{2}\d{9}$/,
        "KB06":/^(BE)?0\d{9}|^(BE)?1\d{9}$/,
        "KB10":/^(NL)?\d{9}B\d{2}$/,
        "KB09":/^(SE)?\d{12}$/,
        "KB11":/^(IE)?\d{7}[A-Z]{1}$/,
        "KA05":/^(CZ)?\d{8-10}$/,
        "KA02":/^(PL)?\d{10}$/,
        "KA03":/^(SK)?\d{10}$/,
        "KA06":/^(HU)?\d{8}$/
    },

    postalcode: {
        "KB03":/[0-9A-Z]{5}$/,
        "KB04":/[0-9A-Z]{5}$/,
        "KB07":/[0-9A-Z]{4}$/,
        "KB08":/[0-9A-Z]{5}$/,
        // "KB02":/[0-9A-Z]{5}$/,
        // "KB05":/[0-9A-Z]{5}$/,
        "KB06":/[0-9A-Z]{4}$/,
        // "KB10":/[0-9A-Z]{5}$/,
        "KB09":/[0-9A-Z]{5}$/,
        // "KB11":/[0-9A-Z]{5}$/,
        "KA05":/[0-9A-Z]{5}$/,
        "KA02":/[0-9A-Z]{5}$/,
        "KA03":/[0-9A-Z]{5}$/,
        "KA06":/[0-9A-Z]{4}$/
    },

    iban: {
        "KB03":/^DE[0-9A-Z]{20}$/,
        "KB04":/^ES[0-9A-Z]{22}$/,
        "KB07":/^AT[0-9A-Z]{18}$/,
        "KB08":/^IT[0-9A-Z]{25}$/,
        "KB02":/^GB[0-9A-Z]{20}$/,
        "KB05":/^FR[0-9A-Z]{25}$/,
        "KB06":/^BE[0-9A-Z]{14}$/,
        "KB10":/^NL[0-9A-Z]{16}$/,
        "KB09":/^SE[0-9A-Z]{22}$/,
        "KB11":/^IE[0-9A-Z]{20}$/,
        "KA05":/^CZ[0-9A-Z]{22}$/,
        "KA02":/^PL[0-9A-Z]{26}$/,
        "KA03":/^SK[0-9A-Z]{22}$/,
        "KA06":/^HU[0-9A-Z]{26}$/
    },

    email:/^([a-zA-Z0-9_\-\.\+]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
    url:/^(http:\/\/|https:\/\/)(www\.)?[a-zA-Z0-9-_\.]+/,
    character:/^[A-Za-z]+$/,
    alphanumeric:/^[A-Za-z0-9]+$/,
    numeric: /^\s*[+-]?(\d+|\.\d+|\d+\.\d+|\d+\.)(e[+-]?\d+)?\s*$/,
    //number:/^[0-9]+$/
    number:/^[0-9]*$/
};

(function($) {
	"use strict";
    $.fn.setValidator = function(regExp, errorMsg) {
        var _obj = this;
        _obj.on('blur', function(){
        	
        	try{
        		
        		
        		var obj = $(this);
                var span_feedback = $('#'+obj.attr("id")+'-span-feedback');
                if(span_feedback.length > 0){
                    span_feedback.removeClass('glyphicon-ok');
                    span_feedback.removeClass('glyphicon-remove');
                }

                var form_group = obj;
                while(!form_group.hasClass('form-group')){
                    form_group = form_group.parent();
                }

                form_group.removeClass('has-success');
                form_group.removeClass('has-error');
                form_group.removeClass('has-feedback');

                if(obj.val().length == 0) {
                    if(span_feedback.length > 0){
                        span_feedback.remove();
                    }
                    obj.tooltip('hide');
                    obj.tooltip('destroy');
    				regexp.validationFlag = true;
                    return;
                }

                //EDDS-920 URL maker
                if(regExp === regexp.url){
                	
                	if(obj.val() != '' && (!obj.val().match('http://') && !obj.val().match('https://'))){
    	    			
                		var objId = obj.attr('id');
    	    			$('#'+objId).val($('#'+objId+'_urlprefix').val() + obj.val());
    	    		}
                }
                
                if(regExp.test(obj.val())){
                    if(span_feedback.length == 0){
                    	// $(obj).next().attr('class') == 'error'
                    	var style = "";
    					if($(obj).next().hasClass('error')) style = "margin-top:-25px;"
                        obj.parent().append('<span id="' + obj.attr("id")+'-span-feedback' + '" class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true" style="'+style+'"></span>');
                    }else{
                        span_feedback.addClass('glyphicon-ok');
                    }
                    
                    form_group.addClass('has-success has-feedback');

                    obj.tooltip('hide');
                    obj.tooltip('destroy');
                    
                    // for Dealer Save and Update
    				regexp.validationFlag = true;
                    
    				
                }else{
                    if(span_feedback.length == 0){
                        $(obj).parent().append('<span id="' + obj.attr("id")+'-span-feedback' + '" class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>');
                    }else{
                        span_feedback.addClass('glyphicon-remove');
                    }

                    form_group.addClass('has-error has-feedback');

                    obj.tooltip({
                        // 'title':'Validation Check',
                        'title':errorMsg,
                        'placement':'top',
                        'trigger':'manual',
                        // 'template':'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner" style="width:' + obj.width() + 'px;"></div></div>'
                    });
                    obj.tooltip('show');
                    obj.focus();
                    
    				// for Dealer Save and Update
    				regexp.validationFlag = false;
    							 
                }
        		
        	}catch(e){
        		
        	}
            
        });
        
        if(regExp === regexp.url){
        	_obj.on('keypress', function(e){
    		    if(e.which == 13) {
    		        $(_obj).trigger('blur');
    		    }
        	});
        	
        }
        
        
    };

})($);

(function($) {
	"use strict";
    $.fn.number = function() {
        var _input = this;
        
        // TEST EDDS-841 phone number regexpression : open to LIVE 29/06/2021
        //if($.sessionStorage.get('SAPSYSTEMNAME') == "PDE" || $.sessionStorage.get('SAPSYSTEMNAME') == "PQE"){
        	 _input.on('keyup', function(e){
             	if (!(e.keyCode >=37 && e.keyCode<=40)) {
                     var inputVal = $(this).val();
                     $(this).val(inputVal.replace(/[^0-9]/gi,''));
                 }
             });
        	
        //} // LIVE
//        else{
//        	 _input.on('keyup', function(e){
//                 var key=(window.event)?event.keyCode:e.which;
//                 var ctrlkey = (window.event)?event.ctrlKey:e.ctrlKey;
//                 var shiftkey = (window.event)?event.shiftKey:e.shiftKey;
//                 if(shiftkey){
//                     if(window.event){
//                         if(event.preventDefault) event.preventDefault();
//                         else event.returnValue = false;
//                     }else e.preventDefault();
//                 }else if((key >= 48 && key <= 57) || (key >= 96 && key <= 105) || key==9 || key==8 || key==13 || key==37 || key==39 || key==46 || key==109 || key==189){
//                     return true;
//                 }else if(ctrlkey && key==86){
//                     return true;
//                 }else if(ctrlkey && key==67){
//                     return true;
//                 }else {
//                     if(window.event){
//                         if(event.preventDefault) event.preventDefault();
//                         else event.returnValue = false;
//                     }else e.preventDefault();
//                 }
//             	
//             });
//        }
//        
//        _input.on('keyup', function(e){
//        	/*
//            var key=(window.event)?event.keyCode:e.which;
//            var ctrlkey = (window.event)?event.ctrlKey:e.ctrlKey;
//            var shiftkey = (window.event)?event.shiftKey:e.shiftKey;
//            if(shiftkey){
//                if(window.event){
//                    if(event.preventDefault) event.preventDefault();
//                    else event.returnValue = false;
//                }else e.preventDefault();
//            }else if((key >= 48 && key <= 57) || (key >= 96 && key <= 105) || key==9 || key==8 || key==13 || key==37 || key==39 || key==46 || key==109 || key==189){
//                return true;
//            }else if(ctrlkey && key==86){
//                return true;
//            }else if(ctrlkey && key==67){
//                return true;
//            }else {
//                if(window.event){
//                    if(event.preventDefault) event.preventDefault();
//                    else event.returnValue = false;
//                }else e.preventDefault();
//            }
//            */
//        	
//        	if (!(e.keyCode >=37 && e.keyCode<=40)) {
//                var inputVal = $(this).val();
//                $(this).val(inputVal.replace(/[^0-9]/gi,''));
//            }
//        	
//        });
    };

    $.fn.numeric = function() {
        var _input = this;
        _input.on('keydown', function(e){
            var key=(window.event)?event.keyCode:e.which;
            var ctrlkey = (window.event)?event.ctrlKey:e.ctrlKey;
            var shiftkey = (window.event)?event.shiftKey:e.shiftKey;

            if(shiftkey){
                if(window.event){
                    if(event.preventDefault) event.preventDefault();
                    else event.returnValue = false;
                }else e.preventDefault();
            }else if((key >= 48 && key <= 57) || (key >= 96 && key <= 105) || key==9 || key==8 || key==13 || key==37 || key==39 || key==46 || key==110 || key==190 || key==109 || key==189){
                return true;
            }else if(ctrlkey && key==86){
                return true;
            }else if(ctrlkey && key==67){
                return true;
            }else if(shiftkey && key==53){
                return true;
            }else {
                if(window.event){
                    if(event.preventDefault) event.preventDefault();
                    else event.returnValue = false;
                }else e.preventDefault();
            }
        });
    };
     
    $.fn.percent = function() {
        var _input = this;
        _input.on('keydown', function(e){
            var key=(window.event)?event.keyCode:e.which;
            var ctrlkey = (window.event)?event.ctrlKey:e.ctrlKey;
            var shiftkey = (window.event)?event.shiftKey:e.shiftKey;

            if(shiftkey && key != 53){
                if(window.event){
                    if(event.preventDefault) event.preventDefault();
                    else event.returnValue = false;
                }else e.preventDefault();
            }else if((key >= 48 && key <= 57) || (key >= 96 && key <= 105) || key==9 || key==8 || key==13 || key==37 || key==39 || key==46 || key==110 || key==190 || key==109 || key==189){
                return true;
            }else if(ctrlkey && key==86){
                return true;
            }else if(ctrlkey && key==67){
                return true;
            }else {
                if(window.event){
                    if(event.preventDefault) event.preventDefault();
                    else event.returnValue = false;
                }else e.preventDefault();
            }
        });
    };
})(jQuery);

/*********************************************************************
*	table and checkbox required valid
*	type [ trTable, checkboxList, single-icheck , ulTable, multiValues]
*	if you add the other object, then please ref dealerCreate_Script.jsp same object.
*********************************************************************/
var validator = {
	messages: '',
	additionalRequired: [], // variable for additional valid
	checkRequiredValid: function(formId){
//
		this.messages = '';
		var isRequired = true;
		
		// EDDS-1347 Site Address Logic
		//$('label.error').remove();
		//$('span.error').remove();
		
		$(this.additionalRequired).each(function(idx, obj) {

			var type = obj["type"];
			var required = obj["required"];
			
			// EDDS-955 Main Dealer Code
			if(typeof required === 'function'){
				required = required();
			}
			var objName = obj["name"];
			var target =  obj["target"];
			var message = obj["message"];

			//console.log('objName ' + objName);
			//console.log('message ' + message);
			//console.log('required ' + required);
			
			// var depends = obj["depends"];
        
			var labelHTML = '<span id="' + objName + '-error" class="error" style="display: inline-block;">This field is required.</span>';

			if (required == true) {
				// 
				if (type == "trTableFunction") {
					
					var divObj = $('#' + objName).parent().parent();
					
					if (!required) {
						
						//console.log('test 1');
						
						$('#' + objName + '-error').remove();
						divObj.removeClass('div-error');
						if(message != undefined ){
							if(validator.messages.match(message)){
								validator.messages = validator.messages.replace('<br>' + message,'');
							}
						}
						
					} else {
						isRequired = false;
						
						//console.log('test 2');
						
						//if (!divObj.hasClass('div-error')) {
							divObj.addClass('div-error').append(labelHTML);
							if(message != undefined){
								$('#' + objName + '-error').show().text(message);
								if(!validator.messages.match(message)){
									validator.messages = validator.messages + '<br>' + message; 
								}else{
									// exist message replace to empty 
									validator.messages = validator.messages.replace('<br>' + message,'');
								}
							}
							// check table data modified
							$('#' + objName).on("DOMSubtreeModified", function() {
								$('#' + objName + '-error').remove();
								divObj.removeClass('div-error');
							});
						//}
					}
					
					
				}else if (type == "trTable") {
					var divObj = $('#' + objName).parent().parent();
				
					if ($('#' + objName).find('tr').length > 0) {
						
						//console.log('test 1');
						
						$('#' + objName + '-error').remove();
						divObj.removeClass('div-error');
						if(message != undefined ){
							if(validator.messages.match(message)){
								validator.messages = validator.messages.replace('<br>' + message,'');
							}
						}
						
					} else {
						isRequired = false;
						
						//console.log('test 2');
						
						//if (!divObj.hasClass('div-error')) {
							divObj.addClass('div-error').append(labelHTML);
							if(message != undefined){
								$('#' + objName + '-error').show().text(message);
								if(!validator.messages.match(message)){
									validator.messages = validator.messages + '<br>' + message; 
								}else{
									// exist message replace to empty 
									validator.messages = validator.messages.replace('<br>' + message,'');
								}
							}
							// check table data modified
							$('#' + objName).on("DOMSubtreeModified", function() {
								$('#' + objName + '-error').remove();
								divObj.removeClass('div-error');
							});
						//}
					}
				} else if (type == "ulTable") {
            
					var divObj = $('#' + target);
					if ($('#' + objName + ' li').length > 0) {
						$('#' + objName + '-error').remove();
						divObj.removeClass('div-error');
					} else {
						isRequired = false;
						if (!divObj.hasClass('div-error')) {
							divObj.addClass('div-error').append(labelHTML);
							
							if(message != undefined){
								$('#' + objName + '-error').show().text(message);
								if(!validator.messages.match(message)){
									validator.messages = validator.messages + '<br>' + message; 
								}
							}
							// check table data modified
							$('#' + objName).on("DOMSubtreeModified", function() {
								$('#' + objName + '-error').remove();
								divObj.removeClass('div-error');
							});
						}
					}
				} else if (type == "checkboxList") {
					var divObj = $('#' + obj["target"]);
                
					var checkObj = $('input[name*=' + objName + ']:checked');                    
					if (checkObj.length > 0) {
						$('#' + objName + '-error').remove();
						divObj.removeClass('div-error');
					} else {
						isRequired = false;
						if (!divObj.hasClass('div-error')) {
							divObj.addClass('div-error').append(labelHTML);
							
							if(message != undefined){
								$('#' + objName + '-error').show().text(message);
								if(!validator.messages.match(message)){
									validator.messages = validator.messages + '<br>' + message; 
								}
							}
							
							// div (class, label) remove event bind
							$('input[name*=' + objName + ']').on('ifChecked', function() {
								$('#' + objName + '-error').remove();
								divObj.removeClass('div-error');
							});
						}
					}
				} else if (type == "single-icheck") {

					var $divObj = $('#' + objName).parent().parent();

					if ($('#' + objName).val() == "X") {
						// do Something
					
					} else {
						isRequired = false;
						if (!$divObj.hasClass('div-error')) {
							$divObj.addClass('div-error').append(labelHTML);
							
							if(message != undefined){
								$('#' + objName + '-error').show().text(message);
								if(!validator.messages.match(message)){
									validator.messages = validator.messages + '<br>' + message; 
								}
							}
							
							// div (class, label) remove event bind
							$('input[name*=' + objName + ']').on('ifChecked', function() {
								$('#' + objName + '-error').remove();
								$divObj.removeClass('div-error');
							});
						}
					}
				} else if (type == "multiValues") {
				
					var multiObjs = $('input[name*=' + objName + ']');
				
					$(multiObjs).each(function(idx, obj){
						var $inputObj = $(this);
					
						if($.trim( $inputObj.val() ) == ""){
							isRequired = false;

							if (!$inputObj.hasClass('div-error')) {
								$inputObj.addClass('div-error');							
								$inputObj.parent().append(labelHTML);
							}
						
							// div (class, label) remove event bind
							$inputObj.on('change', function(){
								if($.trim( $(this).val() ) != ""){
									$(this).removeClass('div-error');
									$(this).next().remove(); // label remove
								}else{
									$(this).addClass('div-error');							
									$(this).parent().append(labelHTML);
								}
							});
						}else{
							$inputObj.removeClass('div-error');
							$inputObj.next().remove(); // label remove
						}
					});
				
				} else if("" == ""){
					// add Some custom valid here
	
				}
			}
		});
		
		// this is jQuery valid lib
		var isFormValid = $("#"+formId).valid();

		var isReturn = false;
		if(isRequired && isFormValid){
			isReturn = true;
		} 

		return isReturn;
		
	}
}

function compareTime(id1, id2){
	
	if ( $("#"+id2).val() >=  $("#"+id1).val()){
	    // swal("Before Time is later than After time");
	    $("#"+id1).removeClass("div-error");
	    $("#"+id2).removeClass("div-error");
	    return true;
	}else{
		swal("Check Time","Before Time is later than After time","warning");
	    $("#"+id1).addClass("div-error");
	    $("#"+id2).addClass("div-error");
	    return false;
	}

}
