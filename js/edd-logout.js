$(document).ready(function () {
    $('#logout').on('click',function () {
    	LSAPI.getSessionPlugin().logoff();
    });

});