
var time = 1 * 60000 * 10; // 10 min
setInterval(function(){
	$.ajax( {
		type 		: "POST"
		,async		: true
		,url 		: "com.kme.edds.common.EDDSSessionChecker"
		,data 		: {}
		,dataType	: "json"
		,complete	: function(data) {
			//console.log(data);
		}
	})
}, time);
