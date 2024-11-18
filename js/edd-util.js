
$(document).ready(function () {
	// Set idle time
	// 1000 ms = 1 second.
	$( document ).idleTimer( 1000 * 60 * 10 );  // 10 minutes
	// for logout process
	logoutIdleTimer();
});

$( document ).on( "idle.idleTimer", function(event, elem, obj){

	toastr.options = {
		"positionClass": "toast-top-right",
		"timeOut": 1000 * 60 * 20 // 20 minutes
	}
	
	// 
	toastr.warning('You have been idle for 10 minutes and you will be automatically logged out after 30 minutes of inactivity','Idle time checker');
	$('.custom-alert').fadeIn();
	$('.custom-alert-active').fadeOut();

});

$( document ).on( "active.idleTimer", function(event, elem, obj, triggerevent){

	// function you want to fire when the user becomes active again
	toastr.clear();
	$('.custom-alert').fadeOut();
	
	toastr.options = {
	  "closeButton": true,
	  "debug": false,
	  "progressBar": true,
	  "preventDuplicates": false,
	  "positionClass": "toast-top-right",
	  "onclick": null,
	  "showDuration": "400",
	  "hideDuration": "1000",
	  "timeOut": "7000",
	  "extendedTimeOut": "1000",
	  "showEasing": "swing",
	  "hideEasing": "linear",
	  "showMethod": "fadeIn",
	  "hideMethod": "fadeOut"
	}
	
	toastr.success('Idle time clock reset','Welcome back. '); // grey

});

var _idleTime = 0;
function logoutIdleTimer(){

	// console.log("bind new idle timer");

	//Increment the idle time counter every minute.
	var idleInterval = setInterval(function(){

		_idleTime++;
		// console.log("_idleTime : " + _idleTime);
		if (_idleTime > 29) { // 30 minutes
		
			// destroy idleTimer
			$( document ).idleTimer('destroy');			
			
			//alert("logout process");
			
			// log out 
//			if($('#logoffform').length == 0){
//				var h = [];
//				h.push('<form name="logoffform" id="logoffform" style="display:none;position:absolute;top:-5000;left:-5000" method="POST">');
//				h.push('	<input type="hidden" name="logout_submit" value="true">');
//				h.push('</form>');
//		    
//				$(document.body).append(h.join(""));
//			}
			//LSAPI.getSessionPlugin().logoff();
			
			logout();
			
			//submitLogout("/irj/servlet/prt/portal/prtroot/com.sap.portal.navigation.masthead.LogOutComponent");
		}
		
	}, 1000 * 60); // 1sec * 60 times = 1min // every 1 min check idleTime for logout

	//Zero the idle timer on mouse movement.
	$(document).on('mousemove',function (e) {
		// console.log("clear logout idle timer by mousemove");
		_idleTime = 0;
	});
	$(document).on('keypress',function (e) {
		// console.log("clear logout idle timer by keypress");
		_idleTime = 0;
	});
}


/*
$( document ).on( "idle.idleTimer", function(event, elem, obj){
	
	//console.log("response : " + response);
	if ($("#lock_screen").length == 0) {
		// define sessionStorage Object
		var storage = $.sessionStorage;
		
		var userInfo = storage.get('USER_INFO');
		var userName = userInfo.ZUFNAME + ' ' + userInfo.ZULNAME;
		var managerTypeDesc = userInfo.ZMANAGER_T;
		var imgPath	= '';
		if(userInfo.ZFILEN == '') imgPath = '/com.kme.edds.resources/img/noimg_person.png';
		else imgPath = userInfo.ZPHOTPATH + '/'+ userInfo.ZFILEN;

		var l = [];
		l.push('<div class="gray-bg modal fade" id="lock_screen" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false">');
		l.push('	<div class="lock-word animated fadeInDown">');
		l.push('		<span class="first-word">LOCKED</span><span>SCREEN</span>');
		l.push('	</div>');
		l.push('	<div class="middle-box text-center lockscreen animated fadeInDown">');
		l.push('		<div>');
		l.push('			<div class="m-b-md">');
		l.push('				<img alt="image" class="img-circle circle-border" style="width:130px;" src="' + imgPath + '">');
		l.push('			</div>');
		l.push('			<h3>' + userName + '</h3>');
		l.push('			<p>Your are in lock screen.</p>');
		l.push('			<div class="form-group">');
		//l.push('				<input type="password" class="form-control" placeholder="******" required="">');
		l.push('			</div>');
		l.push('			<button type="submit" onclick="doUnlockScreen();" class="btn btn-primary block full-width">Unlock</button>');
		l.push('		</div>');
		l.push('	</div>');
		l.push(' </div>');

		$(document.body).append(l.join(""));
				
	}
	$("#lock_screen").modal("show");
});
*/

function doUnlockScreen(){
	document.location.reload();
	//document.location.href = "com.kme.edds.dashboard.Dashboard";
}

/*
$( document ).on( "active.idleTimer", function(event, elem, obj, triggerevent){
	
	$('body').removeClass('gray-bg');
});
*/

function showLoading() {
    if ($("#loadingbar").length == 0) {
        var l = [];
        l.push('<div class="modal fade" id="loadingbar" tabindex="-1" role="dialog" aria-hidden="true"  data-backdrop="static" data-keyboard="false" style="z-index: 10000 !important;" onclick="hideLoading();" >');
        l.push('   <div style="margin-top:20%;">');
        l.push('      <div class="sk-spinner-rotating-plane sk-spinner" >');
        l.push('         <div class="sk-rect1"><img class="image" src="/com.kme.edds.resources/css/patterns/edds_logo_spinner.png" width="80" height="80" alt=""></div>');
        //l.push('         <div class="sk-rect2"></div>');
        //l.push('         <div class="sk-rect3"></div>');
        //l.push('         <div class="sk-rect4"></div>');
        //l.push('         <div class="sk-rect5"></div>');
        l.push('      </div>');
        l.push('    </div>');
        l.push(' </div>');

        $(document.body).append(l.join(""));
        
    }
     
    $("#loadingbar").modal("show");

    // modal of modal backdrop calculation
	// ex) search funtion of some modal
    if($(".modal-backdrop").length > 1){
    	// last-backdrop-zindex css is additional 
		$(".modal-backdrop").last().addClass("last-backdrop-zindex");
    }
    
}

function hideLoading() {
    $("#loadingbar").modal("hide");

	// firefox bug    
    if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
		
		setTimeout(function() {
			//console.log("hideLoading()!");
			//console.log($(".modal-backdrop.fade.in").length);
			//modified from 1 to 0 by AEUE0288, EDDS-170 , 06.03.2020
			if($(".modal-backdrop.fade.in").length > 0){
				// $(".modal-backdrop.fade.in").remove();
				$(".modal-backdrop.fade.in").each(function(idx, obj){
					$(this).remove();
				});
			}
			
		}, 1000);
	}
}

/**
 * Generic array sorting
 *
 * @param property
 * @returns {Function}
 */
var _sortByProperty = function (property) {
	return function (x, y) {
		return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
	};
};


(function($) {
	"use strict";
	$.fn.googleMapforCounty = function(language, postCode, countryCode){
		
		// console.log("$.fn.googleMapforCounty");		
		
		try{
			var _obj = this;
			var _prefix = _obj.attr("rv-addr-prefix");
			//alert(" language : " + language + " postCode : " + postCode + " countryCode : " + countryCode);
			var address = postCode + " , " + countryCode;
			var lang = "en";
			if (language != undefined && language != "") lang = language;
					
			$.ajax({
				url: "https://maps.googleapis.com/maps/api/geocode/json?sensor=false&language=" + lang + "&address=" + encodeURIComponent(address),
				dataType: 'json',
				success: function(result) {
					
					//console.log(result);
					//console.log(_obj);
					
					if (result["results"].length > 0) {
						var clearFlag = false;
						var place = result["results"][0];
						for (var i = 0; i < place.address_components.length; i++) {
							var addressType = place.address_components[i].types[0];
							
							if(addressType == "country"){
								if(place.address_components[i]['short_name'] != countryCode){
									swal(i18n_master.getText('MSG_FAILED'), "Wrong Post Code!", "error")
									$.setAddressClear(_prefix);
									return;
								}
							}
							
							if(addressType == "street_number"){
								var val = place.address_components[i]['short_name'];
								$('#'+_prefix+'_street_number').val(val);
							}else if(addressType == "route"){
								var val = place.address_components[i]['long_name'];
								$('#'+_prefix+'_street').val(val);
							}else if(addressType == "locality"){
								var val = place.address_components[i]['long_name'];
								$('#'+_prefix+'_city').val(val);
							}else if(addressType == "administrative_area_level_1"){ // county
								var text = place.address_components[i]['long_name'];
								var code = place.address_components[i]['short_name'];
								if($('#'+_prefix+'_county').prop("tagName") == "INPUT"){
									$('#'+_prefix+'_county').val(text);
									$('#'+_prefix+'_county_code').val(code);
								}
								// code
							}else if(addressType == "country"){
								var val = place.address_components[i]['long_name'];
								$('#'+_prefix+'_country').val(val);
								$('#'+_prefix+'_country_code').val(place.address_components[i]['short_name'].toUpperCase());
							}else if(addressType == "postal_code"){
								//var val = place.address_components[i]['short_name'];
								//$('#'+_prefix+'_postcode').val(val);
							}
						}
						
						if(!clearFlag){
							var geometry = place.geometry.location;
							var lat = place.geometry.location['lat'];
							var lng = place.geometry.location['lng'];						
						}
						
						if($('#'+_prefix+'_lat').length > 0) $('#'+_prefix+'_lat').val(lat);
						if($('#'+_prefix+'_lng').length > 0) $('#'+_prefix+'_lng').val(lng);
						
					} else {
						swal(i18n_master.getText('MSG_FAILED'), "Wrong Post Code!", "error")
						$.setAddressClear(_prefix);
					}
				}
			});
		}catch(e){
            console.log("$.fn.googleMapforCounty is not Ready()");
        }
		
		
	}
	
    $.fn.googleMap = function(address, language, lat, lng) {

		//console.log("$.fn.googleMap");

        try{
            
            var _divGoogleMap = this;
	        var _lat = 0;
	        var _lng = 0;
	        var lang = "en";
	        if (language != undefined && language != "") lang = language;
	
			if(lat != "" && lat != undefined && lng != "" && lng != undefined){
				
				var mapOptions1 = {
					zoom: 17,
					center: new google.maps.LatLng(parseFloat(lat), parseFloat(lng)),
					// Style for Google Maps
					styles: [{ "featureType": "water", "stylers": [{ "saturation": 43 }, { "lightness": -11 }, { "hue": "#0088ff" }] }, { "featureType": "road", "elementType": "geometry.fill", "stylers": [{ "hue": "#ff0000" }, { "saturation": -100 }, { "lightness": 99 }] }, { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "color": "#808080" }, { "lightness": 54 }] }, { "featureType": "landscape.man_made", "elementType": "geometry.fill", "stylers": [{ "color": "#ece2d9" }] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [{ "color": "#ccdca1" }] }, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#767676" }] }, { "featureType": "road", "elementType": "labels.text.stroke", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "poi", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape.natural", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#b8cb93" }] }, { "featureType": "poi.park", "stylers": [{ "visibility": "on" }] }, { "featureType": "poi.sports_complex", "stylers": [{ "visibility": "on" }] }, { "featureType": "poi.medical", "stylers": [{ "visibility": "on" }] }, { "featureType": "poi.business", "stylers": [{ "visibility": "simplified" }] }]
				};
	
				// Create the Google Map using elements
				var map1 = new google.maps.Map(document.getElementById(_divGoogleMap.attr("id")), mapOptions1);
	
				var marker = new google.maps.Marker({
					position: { lat: parseFloat(lat), lng: parseFloat(lng)},
					map: map1,
					animation: google.maps.Animation.DROP,
					icon: "/com.kme.edds.resources/img/map-marker.png"
				});
				
			}else if(address != "" && address != undefined){
				$.ajax({
					url: "https://maps.googleapis.com/maps/api/geocode/json?sensor=false&language=" + lang + "&address=" + encodeURIComponent(address),
					dataType: 'json',
					success: function(result) {
						if (result["results"].length > 0) {
							_lat = result["results"][0].geometry.location.lat;
							_lng = result["results"][0].geometry.location.lng;
						} else {
		
						}
						
						// function call();
						var mapOptions1 = {
							zoom: 17,
							center: new google.maps.LatLng(lat, lng),
							// Style for Google Maps
							styles: [{ "featureType": "water", "stylers": [{ "saturation": 43 }, { "lightness": -11 }, { "hue": "#0088ff" }] }, { "featureType": "road", "elementType": "geometry.fill", "stylers": [{ "hue": "#ff0000" }, { "saturation": -100 }, { "lightness": 99 }] }, { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "color": "#808080" }, { "lightness": 54 }] }, { "featureType": "landscape.man_made", "elementType": "geometry.fill", "stylers": [{ "color": "#ece2d9" }] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [{ "color": "#ccdca1" }] }, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#767676" }] }, { "featureType": "road", "elementType": "labels.text.stroke", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "poi", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape.natural", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#b8cb93" }] }, { "featureType": "poi.park", "stylers": [{ "visibility": "on" }] }, { "featureType": "poi.sports_complex", "stylers": [{ "visibility": "on" }] }, { "featureType": "poi.medical", "stylers": [{ "visibility": "on" }] }, { "featureType": "poi.business", "stylers": [{ "visibility": "simplified" }] }]
						};
			
						// Create the Google Map using elements
						var map1 = new google.maps.Map(document.getElementById(_divGoogleMap.attr("id")), mapOptions1);
			
						var marker = new google.maps.Marker({
							position: { lat: lat, lng: lng },
							map: map1,
							animation: google.maps.Animation.DROP,
							icon: "/com.kme.edds.resources/img/map-marker.png"
						});
					}
				});
			}
        }catch(e){
            console.log("$.fn.googleMap is not Ready()");
        }

        
    };
    
})(jQuery);


(function($) {
	"use strict";
    $._photoPickerModal = {
    	isLoaded: false, // fisrt loaded event bind flag
        create: function(oPhotoOrigin) {
            if ($("#modal-photopicker").length == 0) {
				var img_src = oPhotoOrigin.find('img').attr('src');
				
                var h = [];
                h.push('<div class="modal inmodal" id="modal-photopicker" tabindex="-1" role="dialog" aria-hidden="true">');
                h.push('    <div class="modal-dialog modal-lg">');
                h.push('        <div class="modal-content animated bounceInRight">');
                h.push('            <div class="modal-header">');
                h.push('                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">'+i18n_master.getText('BTN_CLOSE')+'</span></button>');
                h.push('                <h4 class="modal-title">'+i18n_master.getText('LBL_PHOTO')+'</h4>');
                h.push('            </div>');
                h.push('            <div class="modal-body back-change">');
                h.push('                <div class="row">');
                h.push('                    <div class="col-md-6 photo_snap">');
                h.push('                        <div id="div-photopicker-image-crop" class="image-crop img-container">');
                h.push('                            <img src="' + img_src + '">');
                h.push('                        </div>');
                h.push('                        <div id="div-photopicker-camera" style="display:none">');
                h.push('                            <video id="photopicker-video" width="300px" height="250px" autoplay></video>');
                h.push('                            <canvas id="photopicker-canvas" width="300px" height="250px" style="display:none;"></canvas>');
                h.push('                        </div>');
                h.push('                        <div class="text-center m-t-sm">');

                if(!$._isMobile()){
                    h.push('                            <label title="Upload image file" for="btn-photopicker-upload" class="btn btn-primary">');
                    h.push('                                <input type="file" accept="image/*" name="file" id="btn-photopicker-upload" class="hide"><i class="fa fa-upload" aria-hidden="true"></i> '+i18n_master.getText('BTN_UPLOAD')+'');
                    h.push('                            </label>');
                    //h.push('                            <button class="btn btn-primary" id="btn-photopicker-camera" type="button"><i class="fa fa-camera" aria-hidden="true"></i> '+i18n_master.getText('BTN_CAMERA')+'</button>');
                    //h.push('                            <button class="btn btn-warning" id="btn-photopicker-snap" type="button" style="display:none;">'+i18n_master.getText('LBL_SNAP_PHOTO')+'</button>');
                }else{
                    h.push('                            <label title="Upload image file" for="btn-photopicker-upload" class="btn btn-primary">');
                    h.push('                                <input type="file" accept="image/*" name="file" id="btn-photopicker-upload" class="hide"><i class="fa fa-upload" aria-hidden="true"></i> '+i18n_master.getText('BTN_CAMERA')+'');
                    h.push('                            </label>');
                }

                h.push('                        </div>');
                h.push('                    </div>');
                h.push('                    <div class="col-md-6  photo_preview">');
                h.push('                        <h4>' + i18n_master.getText('LBL_PREVIEW_IMAGE') + '</h4>');
                h.push('                        <div class="img-preview img-preview-sm" style="width:210px;height:150px;"></div>');
                h.push('                        <br>');
                h.push('                        <div class="btn-group text-center">');
                h.push('                            <button class="btn btn-white" id="btn-photopicker-zoomIn" type="button"><i class="fa fa-search-plus" aria-hidden="true"></i></button>');
                h.push('                            <button class="btn btn-white" id="btn-photopicker-zoomOut" type="button"><i class="fa fa-search-minus" aria-hidden="true"></i></button>');
                h.push('                            <button class="btn btn-white" id="btn-photopicker-rotateLeft" type="button"><i class="fa fa-undo" aria-hidden="true"></i></button>');
                h.push('                            <button class="btn btn-white" id="btn-photopicker-rotateRight" type="button"><i class="fa fa-repeat" aria-hidden="true"></i></button>');
                h.push('                            <button class="btn btn-warning" id="btn-photopicker-setDrag" type="button">' + i18n_master.getText('LBL_PREVIEW_IMAGE') + '</button>');
                h.push('                        </div>');
                h.push('                    </div>');
                h.push('                </div>');
                h.push('            </div>');
                h.push('            <div class="modal-footer">');
                h.push('                <button type="button" class="btn btn-white" id="btn-photopicker-cancel" data-dismiss="modal"><i class="fa fa-times"></i> '+i18n_master.getText('BTN_CANCEL')+'</button>');
                h.push('                <button type="button" class="btn btn-primary" id="btn-photopicker-ok"><i class="fa fa-check"></i> '+i18n_master.getText('BTN_OK')+'</button>');
                h.push('            </div>');
                h.push('        </div>');
                h.push('    </div>');
                h.push('</div>');

                $(document.body).append(h.join(""));
            }
        },

        _getDataURL: function(sDataUrl){
            var dataurl = sDataUrl;
            return dataurl;
        },

        loadCropImage: function(oPhotoOrigin) {
			
        	// console.log("loadCropImage");
        	
            var $image = $(".image-crop > img");
            $($image).cropper({
                aspectRatio: 1.4,
                preview: ".img-preview",
                done: function(data) {
                    // Output the result data for cropping image.
                }
            });

            var $uploadImage = $("#btn-photopicker-upload");
            var blobURL;
            var fileName;

            if (window.URL) {
                $uploadImage.on('change',function(event) {
                    var files = this.files,
                        file;

                    if (files && files.length) {
                      file = files[0];
                      
                      if (/^image\/\w+$/.test(file.type)) {
                        if (blobURL) {
                          URL.revokeObjectURL(blobURL); // Revoke the old one
                        }

                        blobURL = URL.createObjectURL(file);
                        
                        //console.log("file.name : " + file.name);
                        
                        if(file.name != undefined){
							fileName = file.name;
                        }
						
                        $image.cropper("reset", true).cropper("replace", blobURL);
                        $uploadImage.val("");
                        
                      } else {
                        showMessage("Please choose an image file.");
                      }
                    }
                });
            } else {
                $uploadImage.addClass("hide");
                $uploadImage.parent().remove();
            }
			
			if(!$._photoPickerModal.isLoaded){
				$("#btn-photopicker-ok").on('click',function() {
	
					// console.log("btn-photopicker-ok");
					$image.cropper("btn-photopicker-setDragMode", "crop");
    
					oPhotoOrigin.html('');
    
					var dataURL = $image.cropper("getDataURL");
					// console.log(dataURL);
					// console.log(fileName);
    
					var strHtml = '<img src="' + dataURL + '" name="' + fileName + '" class="image-responsive" style="width:100%;max-width:100%;height:auto;">';

					oPhotoOrigin.html(strHtml);

					$("#modal-photopicker").modal("hide");
					/*
					var fnInetervalPhoto = setInterval(function(){
						if(oPhotoOrigin.html() != ''){
						$("#modal-photopicker").remove();
						oPhotoOrigin.photopicker();		
						}
					},300);
					*/
    
				});

				$("#btn-photopicker-download").on('click',function() {
					window.open($image.cropper("getDataURL"));
				});

				$("#btn-photopicker-zoomIn").on('click',function() {
					$image.cropper("zoom", 0.1);
				});

				$("#btn-photopicker-zoomOut").on('click',function() {
					$image.cropper("zoom", -0.1);
				});

				$("#btn-photopicker-rotateLeft").on('click',function() {
					$image.cropper("rotate", 90);
				});

				$("#btn-photopicker-rotateRight").on('click',function() {
					$image.cropper("rotate", -90);
				});

				$("#btn-photopicker-setDrag").on('click',function() {
					$image.cropper("btn-photopicker-setDragMode", "crop");
				});

				$("#btn-photopicker-cancel").on('click',function(){
					//$("#btn-photopicker-upload").parent.remove();
				});
				
				$._photoPickerModal.isLoaded = true;
			}
        },

        loadCamera: function(oPhotoOrigin) {
            var contextSmall;

            // Grab elements, create settings, etc.
            var canvas = document.getElementById("photopicker-canvas");
            var context = canvas.getContext("2d");

            var video = document.getElementById("photopicker-video");

            var videoObj = {
                "video": true
            };

            var errBack = function(error) {
                console.log("Video capture error: ", error.code);
            };
            
            //console.log("navigator : " + navigator);
			
			/*
			 * getUserMedia/Stream API - WD
			 * IE : Not supported this api
			 * http://caniuse.com/#search=getusermedia
			 * 
			 * */ 
            // Put video listeners into place
            if (navigator.getUserMedia) { // Standard
                navigator.getUserMedia(videoObj,
				function(stream) {
					// video.src = stream;
					video.src = window.URL.createObjectURL(stream);
					video.play();
				}, errBack);
            } else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
                navigator.webkitGetUserMedia(videoObj, function(stream) {
                    video.src = window.URL.createObjectURL(stream);
                    video.play();
                }, errBack);
            } else if (navigator.mozGetUserMedia) { // Firefox-prefixed
                navigator.mozGetUserMedia(videoObj, function(stream) {
                    video.src = window.URL.createObjectURL(stream);
                    video.play();
                }, errBack);
            } else{
            	// this case, it doesn't support getUserMedia API
            	//$('#btn-photopicker-camera').remove();	
            	
            }

            // Trigger photo take
            $("#btn-photopicker-snap").on('click',function() {
                context.drawImage(video, 0, 0, 400, 300);

                if (canvas != null) {
                    var dataURL = canvas.toDataURL();
                    
                    //console.log(dataURL);
                    
                    var strHtml = '<img src="' + dataURL + '">';

                    $("#div-photopicker-image-crop").html(strHtml);

                    $("#div-photopicker-image-crop").show();
                    $("#div-photopicker-camera").hide();
                    $("#btn-photopicker-camera").show();
                    $("#btn-photopicker-snap").hide();

                    $._photoPickerModal.loadCropImage(oPhotoOrigin);
                }
            });
        }
    };

    $._isMobile = function(){
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
          	return true;
        }else{
        	return false;
        }
    };

    $.fn.photopicker = function() {
        var _oPhotoOrigin = this;
        $(_oPhotoOrigin).on('click',function() {
            $._photoPickerModal.create(_oPhotoOrigin);
            $("#modal-photopicker").modal("show");
            $._photoPickerModal.loadCropImage(_oPhotoOrigin);

            //if(!$._isMobile()){
                //$._photoPickerModal.loadCamera(_oPhotoOrigin);

                $("#btn-photopicker-camera").on('click',function() {
                    $("#div-photopicker-image-crop").hide();
                    $("#div-photopicker-camera").show();
                    $("#btn-photopicker-camera").hide();
                    $("#btn-photopicker-snap").show();

                    // $._photoPickerModal.loadCamera(_oPhotoOrigin);
                });
            //}
            
            $("#btn-photopicker-upload").on('click',function() {
                $("#div-photopicker-image-crop").show();
                $("#div-photopicker-camera").hide();
                $("#btn-photopicker-camera").show();
                $("#btn-photopicker-snap").hide();

                // $._photoPickerModal.loadCropImage(_oPhotoOrigin);
            });
        });
    };

})(jQuery);

// extension $ function
$.fn.hasAttr = function(name) {  
   return this.attr(name) !== undefined;
};

var tooltip_master = {
    set : function(mLabels){
        var storage = $.sessionStorage;

        storage.set('edds_tooltip', mLabels);
    },
    get : function(){
        var storage = $.sessionStorage;
        return storage.get('edds_tooltip');
    },
    getText : function(key){
        var storage = $.sessionStorage;
        return storage.get('edds_tooltip.' + key);
    },
    load : function(sAttr){
        var _tooltop = tooltip_master.get();

        var attr = "rv-tooltip";
        if (sAttr != undefined && sAttr != "") attr = sAttr;
        var f = $("[" + attr + "]");
        var len = f.length;
        
        // // console.log(len);
        
        var defaultWidth = "width:300px;max-width:300px;";
        for (var i = 0; i < len; i++) {
        	
			// // console.log($(f[i]));
        	// console.log(i + " : " + $(f[i]).attr(attr));
        	// console.log(i + " : " + _tooltop[$(f[i]).attr(attr)]);
        	// console.log(tooltipText);
			var tooltipText = window.decodeURIComponent( _tooltop[$(f[i]).attr(attr)] );
			tooltipText = tooltipText.trim();
			if(tooltipText == undefined || tooltipText == "undefined"){
				continue;
			}
			
			
			
            var tooltipWidth = $(f[i]).attr("rv-tooltip-width");
            if(tooltipWidth == undefined || tooltipWidth == "") tooltipWidth = defaultWidth;
            else tooltipWidth = ("width:" + tooltipWidth + ";max-width:" + tooltipWidth + ";");
            // $(f[i]).attr("data-toggle", "tooltip");
            $(f[i]).attr("data-placement", "right");
            $(f[i]).attr("title", tooltipText);
            $(f[i]).tooltip({template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner" style="' + tooltipWidth + '"></div></div>'})
			$(f[i]).removeClass("pointer").css("cursor","help");
			
			if(tooltipText == ""){
				$(f[i]).removeClass("fa-question-circle").addClass("fa-question-circle-o");
				$(f[i]).css("font-size", "13px");
			}else{
				//$(f[i]).addClass("fa-lg");
			}
            
        }
        
		$('[data-toggle=tooltip]').tooltip();
		
    },
	decodeEntities : function(encodedString) {
		var textArea = document.createElement('textarea');
		textArea.innerHTML = encodedString;
		return textArea.value;
	}

};

function logout(){
	
	if (window.parent != null
			&& window.parent.opener != null && !isEmpty(window.parent.opener)
			&& window.parent.opener.top != null && window.parent.opener.top != undefined) {
			window.parent.opener.top.performLogOff();
		}

		if (opener) {
			// console.log("opener");
		}
		else {
			// console.log("no opener");

			
		}

		//console.log(window.parent);
		//console.log(window.parent.opener);
		//console.log(window.parent.opener.top);
	 
		var isOpenerClose = false;
		 
		if (window.parent != null) {				
			if (window.parent != null && window.parent.opener != null && !isEmpty(window.parent.opener)) {					
				if (  window.parent.opener.top != null && window.parent.opener.top != undefined) { 						
					window.parent.opener.top.performLogOff();						
					isOpenerClose = true;
				}
				else {						
					window.parent.opener.performLogOff();
					isOpenerClose = true;
				}
			}
			else if (window.parent != null &&  ( window.parent.opener == null || isEmpty(window.parent.opener) )) {
				isOpenerClose = false;					
			}
		}
		else {
			if (window.opener != null && !isEmpty(window.parent.opener)  ) {
				if (  window.opener.top != null && window.opener.top != undefined) { 						
					window.opener.top.performLogOff();						
					isOpenerClose = true;
				}
				else {						
					window.opener.performLogOff();
					isOpenerClose = true;
				}
			}
			else {
				isOpenerClose = false;				
			}				
		}

		if (isOpenerClose) {
			
		}
		else {
			//EPCM.raiseEvent("urn:com.sapportals.portal:user", "logoff", "");
			//	submitLogout("/irj/servlet/prt/portal/prtroot/com.sap.portal.navigation.masthead.LogOutComponent");

			// EPCM.getSAPTop().LSAPI.getSessionPlugin()._private.init('_new','true','/irj/servlet/prt/portal/prtroot/com.sap.portal.navigation.masthead.LogOutComponent');
			// EPCM.getSAPTop().LSAPI.getSessionPlugin()._private.setLogoffDelayTimer('0');
			 
			//LSAPI.getSessionPlugin().logoff();
			//LSAPI.getSessionPlugin().closeSession();
			EPCM.getSAPTop().LSAPI.getSessionPlugin()._private.init('_new','true','/irj/servlet/prt/portal/prtroot/com.sap.portal.navigation.masthead.LogOutComponent');
			EPCM.getSAPTop().LSAPI.getSessionPlugin()._private.setLogoffDelayTimer('0');
		
			LSAPI.getSessionPlugin().logoff();
		    isOpenerClose = true;
		}
		
		setTimeout (function() {
			if (window.parent != null) {
				window.parent.close();
			}
			if (isOpenerClose) {
				window.close();
			}
		}, 1500 );
	
}

function submitLogout(url){
    EPCM.raiseEvent("urn:com.sapportals.portal:user", "logoff", "");
    $('#logoffform').attr("url",url);
    $('#logoffform').submit();
    window.close();
}


(function($) {
	"use strict";
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
    var _company_phone_countrycode = {
        "KB03":"49","KB04":"34","KB07":"43","KB08":"39","KB02":"44","KB05":"33","KB06":"32","KB10":"31","KB09":"46","KB11":"353","KA05":"420","KA02":"48","KA03":"421","KA06":"36",
        "LU01":"352", // Country Template LU	Luxembourg	EUR
        "KC22":"355",
		"KC30":"381",
		"KC36":"994",
		"KC41":"380",
		"KC52":"389",
		"KC46":"995",
		"KC47":"373",
		"KC53":"387",
		"KC55":"382",
		"KD26":"90",
		"KC45":"372",
		"KC44":"371",
		"KC43":"370",
		"KC23":"359",
		"KC33":"385",
		"KD22":"357",
		"KC04":"45",
		"KC05":"358",
		"KC31":"350",
		"KD27":"30",
		"KC09":"354",
		"KC13":"356",
		"KC15":"47",
		"KC16":"351",
		"KC28":"40",
		"KC32":"386",
		"KC19":"41"
    };

    var _company_currencycode = {
       "KA02":"PLN"
		,"KA03":"EUR"
		,"KA05":"CZK"
		,"KA06":"HUF"
		,"KB02":"GBP"
		,"KB03":"EUR"
		,"KB04":"EUR"
		,"KB05":"EUR"
		,"KB06":"EUR"
		,"KB07":"EUR"
		,"KB08":"EUR"
		,"KB09":"SEK"
		,"KB10":"EUR"
		,"KB11":"EUR"
		,"KC22":"ALL"
		,"KC30":"RSD"
		,"KC36":"AZN"
		,"KC41":"UAH"
		,"KC52":"MKD"
		,"KC46":"GEL"
		,"KC47":"MDL"
		,"KC53":"BAM"
		,"KC55":"EUR"
		,"KD26":"TRY"
		,"KC45":"EUR"
		,"KC44":"EUR"
		,"KC43":"EUR"
		,"KC23":"BGN"
		,"KC33":"HRK"
		,"KD22":"EUR"
		,"KC04":"DKK"
		,"KC05":"EUR"
		,"KC31":"GIP"
		,"KD27":"EUR"
		,"KC09":"ISK"
		,"KC13":"EUR"
		,"KC15":"NOK"
		,"KC16":"EUR"
		,"KC28":"RON"
		,"KC32":"EUR"
		,"KC19":"CHF"        
    };



    var _country_code = {
        "KB01":"DE","KB03":"DE","KB04":"ES","KB07":"AT","KB08":"IT","KB02":"GB","KB05":"FR","KB06":"BE","KB10":"NL","KB09":"SE","KB11":"IE","KA05":"CZ","KA02":"PL","KA03":"SK","KA06":"HU",
		"LU01":"LU" // Country Template LU	Luxembourg	EUR
		,"KC22":"AL"
		,"KC30":"RS"
		,"KC36":"AZ"
		,"KC41":"UA"
		,"KC52":"MK"
		,"KC46":"GE"
		,"KC47":"MD"
		,"KC53":"BA"
		,"KC55":"ME"
		,"KD26":"TR"
		,"KC45":"EE"
		,"KC44":"LV"
		,"KC43":"LT"
		,"KC23":"BG"
		,"KC33":"HR"
		,"KD22":"CY"
		,"KC04":"DK"
		,"KC05":"FI"
		,"KC31":"GI"
		,"KD27":"GR"
		,"KC09":"IS"
		,"KC13":"MT"
		,"KC15":"NO"
		,"KC16":"PT"
		,"KC28":"RO"
		,"KC32":"SI"
		,"KC19":"CH"

    };
    
    $._country_code_isodata = {"BD": "BGD", "BE": "BEL", "BF": "BFA", "BG": "BGR", "BA": "BIH", "BB": "BRB", "WF": "WLF", "BL": "BLM", "BM": "BMU", "BN": "BRN", "BO": "BOL", "BH": "BHR", "BI": "BDI", "BJ": "BEN", "BT": "BTN", "JM": "JAM", "BV": "BVT", "BW": "BWA", "WS": "WSM", "BQ": "BES", "BR": "BRA", "BS": "BHS", "JE": "JEY", "BY": "BLR", "BZ": "BLZ", "RU": "RUS", "RW": "RWA", "RS": "SRB", "TL": "TLS", "RE": "REU", "TM": "TKM", "TJ": "TJK", "RO": "ROU", "TK": "TKL", "GW": "GNB", "GU": "GUM", "GT": "GTM", "GS": "SGS", "GR": "GRC", "GQ": "GNQ", "GP": "GLP", "JP": "JPN", "GY": "GUY", "GG": "GGY", "GF": "GUF", "GE": "GEO", "GD": "GRD", "GB": "GBR", "GA": "GAB", "SV": "SLV", "GN": "GIN", "GM": "GMB", "GL": "GRL", "GI": "GIB", "GH": "GHA", "OM": "OMN", "TN": "TUN", "JO": "JOR", "HR": "HRV", "HT": "HTI", "HU": "HUN", "HK": "HKG", "HN": "HND", "HM": "HMD", "VE": "VEN", "PR": "PRI", "PS": "PSE", "PW": "PLW", "PT": "PRT", "SJ": "SJM", "PY": "PRY", "IQ": "IRQ", "PA": "PAN", "PF": "PYF", "PG": "PNG", "PE": "PER", "PK": "PAK", "PH": "PHL", "PN": "PCN", "PL": "POL", "PM": "SPM", "ZM": "ZMB", "EH": "ESH", "EE": "EST", "EG": "EGY", "ZA": "ZAF", "EC": "ECU", "IT": "ITA", "VN": "VNM", "SB": "SLB", "ET": "ETH", "SO": "SOM", "ZW": "ZWE", "SA": "SAU", "ES": "ESP", "ER": "ERI", "ME": "MNE", "MD": "MDA", "MG": "MDG", "MF": "MAF", "MA": "MAR", "MC": "MCO", "UZ": "UZB", "MM": "MMR", "ML": "MLI", "MO": "MAC", "MN": "MNG", "MH": "MHL", "MK": "MKD", "MU": "MUS", "MT": "MLT", "MW": "MWI", "MV": "MDV", "MQ": "MTQ", "MP": "MNP", "MS": "MSR", "MR": "MRT", "IM": "IMN", "UG": "UGA", "TZ": "TZA", "MY": "MYS", "MX": "MEX", "IL": "ISR", "FR": "FRA", "IO": "IOT", "SH": "SHN", "FI": "FIN", "FJ": "FJI", "FK": "FLK", "FM": "FSM", "FO": "FRO", "NI": "NIC", "NL": "NLD", "NO": "NOR", "NA": "NAM", "VU": "VUT", "NC": "NCL", "NE": "NER", "NF": "NFK", "NG": "NGA", "NZ": "NZL", "NP": "NPL", "NR": "NRU", "NU": "NIU", "CK": "COK", "XK": "XKX", "CI": "CIV", "CH": "CHE", "CO": "COL", "CN": "CHN", "CM": "CMR", "CL": "CHL", "CC": "CCK", "CA": "CAN", "CG": "COG", "CF": "CAF", "CD": "COD", "CZ": "CZE", "CY": "CYP", "CX": "CXR", "CR": "CRI", "CW": "CUW", "CV": "CPV", "CU": "CUB", "SZ": "SWZ", "SY": "SYR", "SX": "SXM", "KG": "KGZ", "KE": "KEN", "SS": "SSD", "SR": "SUR", "KI": "KIR", "KH": "KHM", "KN": "KNA", "KM": "COM", "ST": "STP", "SK": "SVK", "KR": "KOR", "SI": "SVN", "KP": "PRK", "KW": "KWT", "SN": "SEN", "SM": "SMR", "SL": "SLE", "SC": "SYC", "KZ": "KAZ", "KY": "CYM", "SG": "SGP", "SE": "SWE", "SD": "SDN", "DO": "DOM", "DM": "DMA", "DJ": "DJI", "DK": "DNK", "VG": "VGB", "DE": "DEU", "YE": "YEM", "DZ": "DZA", "US": "USA", "UY": "URY", "YT": "MYT", "UM": "UMI", "LB": "LBN", "LC": "LCA", "LA": "LAO", "TV": "TUV", "TW": "TWN", "TT": "TTO", "TR": "TUR", "LK": "LKA", "LI": "LIE", "LV": "LVA", "TO": "TON", "LT": "LTU", "LU": "LUX", "LR": "LBR", "LS": "LSO", "TH": "THA", "TF": "ATF", "TG": "TGO", "TD": "TCD", "TC": "TCA", "LY": "LBY", "VA": "VAT", "VC": "VCT", "AE": "ARE", "AD": "AND", "AG": "ATG", "AF": "AFG", "AI": "AIA", "VI": "VIR", "IS": "ISL", "IR": "IRN", "AM": "ARM", "AL": "ALB", "AO": "AGO", "AQ": "ATA", "AS": "ASM", "AR": "ARG", "AU": "AUS", "AT": "AUT", "AW": "ABW", "IN": "IND", "AX": "ALA", "AZ": "AZE", "IE": "IRL", "ID": "IDN", "UA": "UKR", "QA": "QAT", "MZ": "MOZ"};

    $._getCountryCode = function(company_code) {
        for(var key in _company_phone_countrycode){
            if(key == company_code){
            	return _country_code[key];
            }
        }
    };
    
    $.fn.setCountryPhoneCode = function(company_code) {
        var _input = this;
        var h = [];

        if(company_code != "KB01"){
            h.push('<option value="' + _company_phone_countrycode[company_code] + '">' + '+'  + _company_phone_countrycode[company_code] + ' (' + _country_code[company_code]  + ')</option>');
            if(company_code == 'KB04'){
        		h.push('<option value="376">' + '+376' + ' (AD)</option>');
        	}
        }

        for(var key in _company_phone_countrycode){
            if(key != company_code) h.push('<option value="' + _company_phone_countrycode[key] + '">' + '+' +_company_phone_countrycode[key] + ' (' + _country_code[key] + ')</option>');
        }

        _input.html(h.join(""));
        
        _input.selectpicker('refresh');
    };

    $.fn.sel_currency = function(company_code) {	
        var _input = this;
        var h = [];

        if(company_code != "KB01"){
            h.push('<option value="' + _company_currencycode[company_code] + '">' + _company_currencycode[company_code] + '</option>');
        }

        for(key in _company_currencycode){
            if(key != company_code) h.push('<option value="' + _company_currencycode[key] + '">' + _company_currencycode[key] + '</option>');
        }

        _input.html(h.join(""));
    };

	$.fn.getCountryCodebySubsidiary = function(company_code) {
		return _country_code[company_code];
	};

    // $.fn.setCountryPhoneCode(company_code){
    //     var _input = this;
    //     var h = [];

    //     if(company_code != "KB01"){
    //         h.push('<option value="' + _company_phone_countrycode[company_code] + '">' + '+'  + _company_phone_countrycode[company_code] + ' (' + _country_code[company_code]  + ')</option>');
    //     }

    //     for(key in _company_phone_countrycode){
    //         if(key != company_code) h.push('<option value="' + _company_phone_countrycode[key] + '">' + '+' +_company_phone_countrycode[key] + ' (' + _country_code[key] + ')</option>');
    //     }

    //     _input.html(h.join(""));
    // };
    

    
})(jQuery);

function smoothScrollTo(objId){
    $('html, body').animate({
        scrollTop: $('#'+objId).offset().top
        }, 900, function(){
    });
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}


var contry_code = {};
contry_code["AT"] = "";
contry_code["BE"] = "";
contry_code["CZ"] = "";
contry_code["DE"] = "";
contry_code["ES"] = "";
contry_code["FR"] = "";
contry_code["GB"] = "";
contry_code["HU"] = "";
contry_code["IE"] = "";
contry_code["IT"] = "";
contry_code["NL"] = "";
contry_code["PL"] = "";
contry_code["SE"] = "";
contry_code["SK"] = "";

(function($) {
	"use strict";
    $.fn.setAutocompleteAddress = function() {
        var clearFlag = false;
        
        var _obj = this;
        var _prefix = _obj.attr("rv-addr-prefix");
        var input = (document.getElementById(_obj.attr('id')) );
        var options = {
        	types: ['geocode'],
        	//componentRestrictions: {country: "us"}
        }
        
		var autocomplete = new google.maps.places.Autocomplete( input, options);
		
		autocomplete.addListener('place_changed', function(){
			var place = autocomplete.getPlace();

			$.setAddressClear(_prefix);

			if($('#'+_prefix+'_lat').length > 0) $('#'+_prefix+'_lat').val('');
			if($('#'+_prefix+'_lng').length > 0) $('#'+_prefix+'_lng').val('');

			var country_index;
			var country_code;

			var county_index =[] ;
			var county_code =[] ;
			
			
			for (var i = 0; i < place.address_components.length; i++) {
				var addressType = place.address_components[i].types[0];
				
				// console.log(place.address_components[i]);
				
				if(addressType == "street_number"){
					var val = place.address_components[i]['short_name'];
					$('#'+_prefix+'_street_number').val(val);
				}else if(addressType == "route"){
					var val = place.address_components[i]['long_name'];
					$('#'+_prefix+'_street').val(val);
				}else if(addressType == "locality"){
					var val = place.address_components[i]['long_name'];
					$('#'+_prefix+'_city').val(val);
				}else if(addressType == "administrative_area_level_1"){ // county
					var text = place.address_components[i]['long_name'];
					var code = place.address_components[i]['short_name'];
					if($('#'+_prefix+'_county').prop("tagName") == "INPUT"){
						$('#'+_prefix+'_county').val(text);
						$('#'+_prefix+'_county_code').val(code);
					}
					county_index.push(i);
					county_code.push(code);
					// code
				}else if(addressType == "administrative_area_level_2"){ // county
					county_index.push(i);
					county_code.push( place.address_components[i]['short_name'] );
				}else if(addressType == "administrative_area_level_3"){ // county
					county_index.push(i);
					county_code.push( place.address_components[i]['short_name'] );	
				}else if(addressType == "country"){
					var val = place.address_components[i]['long_name'];
					$('#'+_prefix+'_country').val(val);
					$('#'+_prefix+'_country_code').val(place.address_components[i]['short_name']);

					country_index = i;
					country_code = place.address_components[i]['short_name'];	
					/*
					if(contry_code[place.address_components[i]['short_name']] == undefined || contry_code[place.address_components[i]['short_name']] == null){
						clearFlag = true;
						break;
					}
					*/
				}else if(addressType == "postal_code"){
					var val = place.address_components[i]['short_name'];
					$('#'+_prefix+'_postcode').val(val);
				}
			}

			if($('#'+_prefix+'_county').prop("tagName") == "SELECT"){
				if (country_code == "IT") {
					for (var i = 0; i < county_code.length; i++) {
						var county_option_value = ""+country_code+""+county_code[i];
						//console.log(county_option_value);
						if ($("#"+_prefix+"_county option[value='"+county_option_value+"']").length > 0) {
							//console.log(county_code[i]);
							$('#'+_prefix+'_county').val(county_option_value);
						}					
					}
				}		
			}

			

			var geometry = place.geometry.location;
			var lat = place.geometry.location['lat'];
			var lng = place.geometry.location['lng'];

			if($('#'+_prefix+'_lat').length > 0) $('#'+_prefix+'_lat').val(lat);
			if($('#'+_prefix+'_lng').length > 0) $('#'+_prefix+'_lng').val(lng);

			if(lat != undefined && lng != undefined && $('#'+_prefix+'_map').length > 0){
			//     var mapProp = {
			//         center:new google.maps.LatLng(lat, lng),
			//         zoom:5,
			//         mapTypeId:google.maps.MapTypeId.ROADMAP
			//     };
			//     var map = new google.maps.Map(document.getElementById(_prefix + "-map"), mapProp);
			//     google.maps.event.addDomListener(window, 'load');

				$('#'+_prefix+'-map').googleMap($('#'+_prefix+'-address').val(), "en");
			}
			// address set
			$('#'+_prefix+'_address').val(place.formatted_address);

			if(clearFlag){
				$('#'+_prefix+'_address').val('');
				$.setAddressClear(_prefix);
				// swal(i18n_master.getText('MSG_FAILED'), "Please input collect address.", "error");
			}

			/*
			if($('#'+_prefix+'_street_number').val() == ""){
				swal(i18n_master.getText('MSG_FAILED'), i18n_master.getText('MSG_PLS_INPUT_CLCT_STRT_NO'), "error");	
				$('#'+_prefix+'_address').focus();
			}else if($('#'+_prefix+'_street').val() == ""){
				swal(i18n_master.getText('MSG_FAILED'), i18n_master.getText('MSG_PLS_INPUT_CLCT_STRT'), "error");
				$('#'+_prefix+'_address').focus();
			}else if($('#'+_prefix+'_city').val() == ""){
				swal(i18n_master.getText('MSG_FAILED'), i18n_master.getText('MSG_PLS_INPUT_CLCT_CITY'), "error");
				$('#'+_prefix+'_address').focus();
			}else if($('#'+_prefix+'_postcode').val() == ""){
				swal(i18n_master.getText('MSG_FAILED'), i18n_master.getText('MSG_PLS_INPUT_CLCT_POST_CODE'), "error");
				$('#'+_prefix+'_address').focus();
			}
			*/

		});
		
		// $(".pac-container:last").attr("id", "pac-" + _obj.attr('id'));
		
    };
    
	$.fn.removeAutocompleteAddress = function() {
		
		var _obj = this;
		var autocomplete = new google.maps.places.Autocomplete( (document.getElementById(_obj.attr('id')) ) , {types: ['geocode']});
		var autocompleteListener = google.maps.event.addListener(autocomplete, 'place_changed', function() {});

		if (autocomplete !== undefined) {
			google.maps.event.removeListener(autocompleteListener);
			google.maps.event.clearInstanceListeners(autocomplete);
			$(".pac-container").remove();
		}
		
	}

	$.setAddressClear = function(_prefix) {
		$('#'+_prefix+'_street_number').val('');
		$('#'+_prefix+'_street').val('');
		$('#'+_prefix+'_city').val('');
		if($('#'+_prefix+'_county').prop("tagName") == "INPUT"){
			$('#'+_prefix+'_county').val('');
		}
		$('#'+_prefix+'_county_code').val('');
		$('#'+_prefix+'_postcode').val('');
		$('#'+_prefix+'_country').val('');
		$('#'+_prefix+'_country_code').val('');
		$('#'+_prefix+'_lat').val('');
		$('#'+_prefix+'_lng').val('');
	};
})(jQuery);

var formatter = {
	getData : function(arr, keyFormat){
		var data = [];
    	var len = arr.length;
    	
    	for(var i=0 ; i<len ; i++){
    		var item = arr[i];
    		for(var key in item){
    			if(keyFormat[key]){
    				item[key] = formatter.getFormatValue(item[key], keyFormat[key]);
    			}
    		}
    		
    		data.push(item);
    	}
    	
    	return data;
	},
	
	getFormatValue : function(value, format){
		if(value == "") return value;
		if(value == undefined || value == null || value == "00000000") return "";
	
	    if(format){
	        if(format.indexOf("#") > -1){
	            var groupingSeparator = ",";
	            var maxFractionDigits = 0;
	            var decimalSeparator = ".";
	            if(format.indexOf(".") == -1){
	                groupingSeparator = ",";
	            }else{
	                if(format.indexOf(",") < format.indexOf(".")){
	                    groupingSeparator = ",";
	                    decimalSeparator = ".";
	                    maxFractionDigits = format.length - format.indexOf(".") - 1;
	                }else{
	                    groupingSeparator = ".";
	                    decimalSeparator = ",";
	                    maxFractionDigits = format.length - format.indexOf(",") - 1;
	                }
	            }
	
	            var prefix = "";
	            var d = "";
	            var v = String(parseFloat(value).toFixed(maxFractionDigits));
	
	            if(v.indexOf("-") > -1) {
	                prefix = "-";
	                v = v.substring(1);
	            }
	
	            if(maxFractionDigits > 0) {
	                d = v.substring(v.indexOf(decimalSeparator));
	                v = v.substring(0,v.indexOf(decimalSeparator));
	            }
	            var regExp=/\D/g;
	            v = v.replace(regExp,"");
	            var r = /(\d+)(\d{3})/;
	            while (r.test(v)) {
	                v = v.replace(r, '$1' + groupingSeparator + '$2');
	            }
	            
	            return prefix+v+d;
	        }else if(format.indexOf("yy") > -1){
	            if (value) {
	            	var regExp=/\D/g;
	            	value = value.replace(regExp,"");
	            	if(value == "00000000") return "";
	                
	                var date_format = format;
	                date_format = date_format.replace("yyyy",value.substring(0,4));
	                date_format = date_format.replace("MM",value.substring(4,6));
	                date_format = date_format.replace("dd",value.substring(6));
	
	                return date_format; 
	            } else {
	                return value;
	            }
	        }else if(format.indexOf("%") > -1){
	            if(value){
	                return String(parseFloat(value).toFixed(2)) + "%";
	            }else{
	                return value;
	            }
	        }
	    }else{
	        return value;
	    }
	},
	
	getUnformatDate : function(value, format){
		if(value == "" || value == undefined) return "";
		
		if(format){
        	if(format.indexOf("yy") > -1){
        		format = format.toLowerCase();
        		var year = value.substring(format.indexOf("yyyy"), format.indexOf("yyyy")+4);
            	var month = value.substring(format.indexOf("mm"), format.indexOf("mm")+2);
            	var day = value.substring(format.indexOf("dd"), format.indexOf("dd")+2);
            	
            	return (String(year) + String(month) + String(day));
        	}
        }else {
        	return value;
        }
	},
	
	getUnformatDate2 : function(value, format){
		if(value == "" || value == undefined) return "";
		
		if(format){
        	if(format.indexOf("yy") > -1){
        		format = format.toLowerCase();
        		var year = value.substring(format.indexOf("yyyy"), format.indexOf("yyyy")+4);
            	var month = value.substring(format.indexOf("mm"), format.indexOf("mm")+2);
            	var day = value.substring(format.indexOf("dd"), format.indexOf("dd")+2);
            	
            	return (String(year) + '-' + String(month) + '-' + String(day));
        	}
        }else {
        	return value;
        }
	},

	getDateYYYYMMDDformat : function(date) {
		var year = date.getFullYear();
		var month = date.getMonth();
		var day = date.getDate();

		return ''+ year + ((month+1 >= 10)? ''+ (month+1): '0'+ (month+1) ) + ''+ ((day>10?''+day:'0'+day));
		 
	}
	
};

var dateCal = {
	addDate : function (oriDate, dateInt) {

	},
	addMonths : function (oriDate, monthInt) {

		//var date = new Date('20200223');
		var year =  oriDate.substring(0, 4);
		var month = oriDate.substring(4, 6);
		var day =   oriDate.substring(6, 8);
		
		var date = new Date(year, month-1, day);

		console.log(date);
		
		var newDate = new Date(date.setMonth(date.getMonth()+monthInt));

		
		return formatter.getDateYYYYMMDDformat(newDate);
	},
	addDays : function (oriDate, dayInt) {

		//var date = new Date('20200223');
		var year =  oriDate.substring(0, 4);
		var month = oriDate.substring(4, 6);
		var day =   oriDate.substring(6, 8);
		
		var date = new Date(year, month-1, day);

		console.log(date);
		console.log(year);
		console.log(month);
		console.log(day);
		
		var newDate = new Date(date.setDate(date.getDate() + parseInt(dayInt)));
		
		return formatter.getDateYYYYMMDDformat(newDate);
	}
}

String.prototype.replaceAll = function (find, replace) {
	var str = this;
	return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
};

String.prototype.toProperCase = function () {
	//var a = this.replace(/\w\S*/g, function(txt){return (txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())   ;}); 
	var a = this.replace(/\S*/g, function(txt){return (txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())   ;}); 
	return a.replace(/\-\S/g, function(txt2,n){return "-"+a.charAt(n+1).toUpperCase();});
};

var Form = {
	submit: function(path, params, method){
		
		showLoading();
		try {
			method = method || "post";

			var form = document.createElement("form");
			form.setAttribute("method", method);
			form.setAttribute("action", path);
			
			if (typeof params === 'string' || params instanceof String){
				// String params convert to json Object with decodeURI
				params = JSON.parse('{"' + decodeURI(params.replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}');
			}else{
				// something to do	
			}
			
			for(var key in params) {
				if(params.hasOwnProperty(key)) {
					var hiddenField = document.createElement("input");
					hiddenField.setAttribute("type", "hidden");
					hiddenField.setAttribute("name", key);
					hiddenField.setAttribute("value", params[key]);
	
					form.appendChild(hiddenField);
				 }
			}
	
			document.body.appendChild(form);
			form.submit();
		}
		catch(exception){
			hideLoading();
		}
		
	}
};

var Locale = {
	userLocaleCode: function(){
		
		var language = "en";
		var storedUserInfo = $.sessionStorage.get("USER_INFO");
		if(storedUserInfo != null && storedUserInfo != undefined){
			language = storedUserInfo["ZLANGUAGE"].toLowerCase();
		}
		
		var locale = "en_US";
		if(language == "en"){
			locale = "en_US";
		}else if(language == "de"){
			locale = "de_DE";
		}else if(language == "sk"){
			locale = "sk_SK";
		}else if(language == "cs" || language == "cz"){
			locale = "cz_CZ";
		}else if(language == "hu"){
			locale = "hu_HU";
		}else if(language == "es"){
			locale = "es_ES";
		}else if(language == "fr"){
			locale = "fr_FR";
		}else if(language == "nl"){
			locale = "nl_NL";
		}else if(language == "sv"){
			locale = "sv_SE";
		}else if(language == "pl"){
			locale = "pl_PL";
		}
		
		return locale;
	}
}

function isOperationSystem(){

	var returnFlag = false;

	try{
		
		if($.sessionStorage.get('USER_INFO') != null){
			var systemName = $.sessionStorage.get('USER_INFO').LANDSCAPE_NAME;
			if(systemName.indexOf("DEV") > -1 || systemName.indexOf("QA") > -1){
				returnFlag = false;
			}else{
				returnFlag = true;
			}
		}else{
			var host = document.location.host;
			if(host.indexOf('test') > -1 || host.indexOf('qas') > -1){
				returnFlag = false;
			}else{
				returnFlag = true;
			}

		}
		
	}catch(e){
		returnFlag = false;
	}
	
	return returnFlag;
	
}