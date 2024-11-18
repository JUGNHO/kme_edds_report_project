
//function FileUtil(obj){
//	Object.keys(obj).forEach(function(item){		
//	});
//}

function FileUtil(divId, bMultiple, varName, fileTypes){
    this.attachment = [];
    this.divId = divId;
    this.bMultiple = bMultiple;
    this.varName = varName;
    this.fileTypes = null;
    var that = this;
    if(fileTypes != undefined) {
        this.fileTypes = {};
        $(fileTypes).each(function(idx,item){
            that.fileTypes[item.toLowerCase()] = item.toLowerCase();
        });
    }
};



FileUtil.prototype = {
	
	blueimp:{
		setFiles: function(attachmentData){
			var that = this;
			this.attachment = [];

			$(attachmentData).each(function(idx, fileItem){

				var html = '<span class="m-l-md"><a href="javascript:renderBlueimpGallery("' + fileItem['ZQCODE'] + '");">' + fileItem.ZFORNAM + '</a><i class="fa fa-times" style="cursor:pointer;" onclick="' + that.varName + '.deleteFile(this,\''+fileItem.ZFORNAM+'\');"></i></span>';

				if(that.bMultiple){
					that.attachment.push({
						"file_flag" : "M",
						"file_changed_name" : fileItem.ZFILEN,
						"file_name" : fileItem.	ZFORNAM
					});
	           
					$('#'+that.divId).append(html);
				}else{
					that.attachment = [{
						"file_flag" : "M",
						"file_changed_name" : fileItem.ZFILEN,
						"file_name" : fileItem.ZFORNAM
						}];
   
						$('#'+that.divId).html(html);
				}

			});
		},
		renderBlueimpGallery: function(){
			var galleryData = [];
	
			$(attachmentList).each(function(idx, item){
				galleryData.push({
					data: {urls: ['/web_' + item["ZFILEN"]]}
				});
			});
	
			// console.log(galleryData);
	
			blueimp.Gallery(galleryData,{urlProperty: 'data.urls[0]'});
			
		}
	},
	setFiles: function(attachmentData){
		var that = this;
		this.attachment = [];

		$(attachmentData).each(function(idx, fileItem){
			
			var html = '<span class="m-l-md"><a href="javascript:' + that.varName + '.downloadFile(\''+fileItem.ZFILEN+'\',\''+fileItem.ZFORNAM+'\');">' + fileItem.ZFORNAM + '</a><i class="fa fa-times" style="cursor:pointer;" onclick="' + that.varName + '.deleteFile(this,\''+fileItem.ZFORNAM+'\');"></i></span>';;

			if(that.bMultiple){
				that.attachment.push({
					"file_flag" : "M",
					"file_changed_name" : fileItem.ZFILEN,
					"file_name" : fileItem.	ZFORNAM
				});
				           
				$('#'+that.divId).append(html);
			}else{
				that.attachment = [{
					"file_flag" : "M",
					"file_changed_name" : fileItem.ZFILEN,
					"file_name" : fileItem.ZFORNAM
				}];
           
				$('#'+that.divId).html(html);
			}
    
		});
	},
	getFiles: function(){
		return this.attachment;
	},
	deleteFile: function(obj, fileName){
		var attachment = this.attachment;
		var new_attachment = [];

		$(attachment).each(function(idx, item) {
			if (item['file_name'] != fileName) {
				new_attachment.push(item);
			}
    
			if(item['file_name'] == fileName &&  item['file_flag'] && item['file_flag'] == "M"){
				item["file_flag"] = "D";
				new_attachment.push(item);
			}
    
		});

		this.attachment = new_attachment;

		$(obj).closest('span').remove();
	},
	downloadFile: function(serverFileName, ogirinalFileName){
		
		if($._isMobile()){
			//alert("window open");
			var param = "?serverFileName=" + serverFileName + "&originalFileName=" + ogirinalFileName;
			window.open("com.kme.edds.common.EDDSFiledown" + param,'_blank');
		}else{
			
			if($('#file_frame').length == 0){
				$('body')
					.append('<form id="file_form" method="post"></form>')
					.append('<iframe id="file_frame" src="" target="_self" width="0" height="0" ></iframe>');
			}

			$('#file_form').html('<input type="hidden" id="serverFileName" name="serverFileName" value="'+serverFileName+'" /><input type="hidden" id="originalFileName" name="originalFileName" value="'+ogirinalFileName+'" />');
			$('#file_form').attr('action','com.kme.edds.common.EDDSFiledown').attr("target", "file_frame").submit();	
		}
		
	},
	readFiles: function(obj){
		if(obj.value == '') return;
    
		var that = this;
		var files = obj.files;
		var counter = -1, file;
		var len =files.length;
		for(var i=0 ; i<len ; i++){
			var file = files[i];
			var reader = new FileReader();

			reader.onload = (function(file){
				return function(e){
					var binaryString = e.target.result;
					var extension = file.name.split('.')[1].toLowerCase()
					if(that.fileTypes == null || that.fileTypes[extension] != undefined){
						if(that.bMultiple){
						   that.attachment.push({
							   "file_name" : file.name,
							   "file_type" : file.type,
							   "file_size" : file.size,
							   "file_data" : that.arrayBufferToBase64(binaryString)
							});
                        
							$('#'+that.divId).append('<span class="m-l-md">' + file.name + ' <i class="fa fa-times" style="cursor:pointer;" onclick="' + that.varName + '.deleteFile(this,\''+file.name+'\');"></i></span>'); 
						}else{
							that.attachment = [{
							   "file_name" : file.name,
							   "file_type" : file.type,
							   "file_size" : file.size,
							   "file_data" : that.arrayBufferToBase64(binaryString)
							}];
                    
							$('#'+that.divId).html('<span class="m-l-md">' + file.name + ' <i class="fa fa-times" style="cursor:pointer;" onclick="' + that.varName + '.deleteFile(this,\''+file.name+'\');"></i></span>');
						}
					}
				}
            
			})(file);
        
			reader.readAsArrayBuffer( file );
		}

		obj.value = '';
	},
	arrayBufferToBase64: function(buffer){
		var binary = '';
		var bytes = new Uint8Array(buffer);
		var len = bytes.byteLength;
		for (var i = 0; i < len; i++) {
			binary += String.fromCharCode(bytes[i]);
		}
		return window.btoa(binary);
	},
	clear: function(){
		this.attachment = [];
		$('#'+this.divId).html('');
	}
};