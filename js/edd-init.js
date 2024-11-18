/*
 *
 *   INSPINIA - Responsive Admin Theme
 *   version 2.4
 *
 */

// Minimalize menu when screen is less than 768px
$(window).on("resize", function () {
    if ($(this).width() < 769) {
        $('body').addClass('body-small')
    } else {
        $('body').removeClass('body-small')
    }
});

// Local Storage functions
// Set proper body class and plugins based on user configuration
$(document).ready(function () {
    if (localStorageSupport) {

        var collapse = localStorage.getItem("collapse_menu");
        var fixedsidebar = localStorage.getItem("fixedsidebar");
        var fixednavbar = localStorage.getItem("fixednavbar");
        var boxedlayout = localStorage.getItem("boxedlayout");
        var fixedfooter = localStorage.getItem("fixedfooter");

        var body = $('body');

        if (fixedsidebar == 'on') {
            body.addClass('fixed-sidebar');
            $('.sidebar-collapse').slimScroll({
                height: '100%',
                railOpacity: 0.9
            });
        }

        if (collapse == 'on') {
            if (body.hasClass('fixed-sidebar')) {
                if (!body.hasClass('body-small')) {
                    body.addClass('mini-navbar');
                }
            } else {
                if (!body.hasClass('body-small')) {
                    body.addClass('mini-navbar');
                }

            }
        }

        if (fixednavbar == 'on') {
            $(".navbar-static-top").removeClass('navbar-static-top').addClass('navbar-fixed-top');
            body.addClass('fixed-nav');
        }

        if (boxedlayout == 'on') {
            body.addClass('boxed-layout');
        }

        if (fixedfooter == 'on') {
            $(".footer").addClass('fixed');
        }
    }
});

// check if browser support HTML5 local storage
function localStorageSupport() {
    return (('localStorage' in window) && window['localStorage'] !== null)
}

// For demo purpose - animation css script
function animationHover(element, animation) {
    element = $(element);
    element.hover(
        function () {
            element.addClass('animated ' + animation);
        },
        function () {
            //wait for animation to finish before removing classes
            window.setTimeout(function () {
                element.removeClass('animated ' + animation);
            }, 2000);
        });
}

function SmoothlyMenu() {
    if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
        // Hide menu in order to smoothly turn on when maximize menu
        $('#side-menu').hide();
        // For smoothly turn on menu
        setTimeout(
            function () {
                $('#side-menu').fadeIn(400);
            }, 200);
    } else if ($('body').hasClass('fixed-sidebar')) {
        $('#side-menu').hide();
        setTimeout(
            function () {
                $('#side-menu').fadeIn(400);
            }, 100);
    } else {
        // Remove all inline style from jquery fadeIn function to reset menu state
        $('#side-menu').removeAttr('style');
    }
}

// Dragable panels
function WinMove() {
    var element = "[class*=col]";
    var handle = ".ibox-title";
    var connect = "[class*=col]";
    $(element).sortable({
        handle: handle,
        connectWith: connect,
        tolerance: 'pointer',
        forcePlaceholderSize: true,
        opacity: 0.8
    }).disableSelection();
}

if(!$._isMobile()){
	if($(top.document).find('iframe[id^="ivuFrm_page"]').length > 0) {
		
		var iframId = $(top.document).find('iframe[id^="ivuFrm_page"]').attr('id');
		
		$(top.window).resize(function(){
			setTimeout(function(){
				top.document.getElementById(iframId).onload = "";
				top.document.getElementById(iframId).style.height = (top.window.innerHeight) + 'px';
			},300);
		
		});
	
		$(document).ready(function(){
			top.document.getElementById(iframId).onload = "";
			top.document.getElementById(iframId).style.height = (top.window.innerHeight) + 'px';
		});	
	}
}

$(document).ready(function(){
    $('.fullscreen').on('click',function () {
        $('body').toggleClass('fullscreen-ibox-mode');
        $('#div_full_screen').toggleClass("fullscreen-mode");
        $('.fullscreen > i').toggleClass("fa-expand");
        $('.fullscreen > i').toggleClass("fa-compress");
        $('.navbar-default').toggleClass('hide');
        $('.footer').toggleClass('hide');
        $('#page-header').toggleClass('hide');
    });
   
    // EDDS-223 Change Website Icon from SAP to Kia
	var changeWebSiteIcon = function(){
	
    	var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    	link.type = 'image/x-icon';
    	link.rel = 'shortcut icon';
    	link.href = '/com.kme.edds.resources/img/kia_favicon_new.ico';
    	top.document.getElementsByTagName('head')[0].appendChild(link);
    
    	top.document.title = "EDDS";
    
	}();
    
});


