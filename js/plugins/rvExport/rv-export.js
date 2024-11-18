
String.prototype.replaceAll = function (find, replace) {
	var str = this;
	return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
};

var rvExport = {
    isMobile : function() {
        var a = navigator.userAgent||navigator.vendor||window.opera;
        return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4));
    },

    downloadExcel : function(title, data, columns){
        if(rvExport.isMobile()){
            alert('Not supported on Mobile Device');
            return;
        }

        var h = rvExport.getExportTitle(title) + rvExport.getExportHtml("", data, columns);
        rvExport.excel(h, title);
    },

    printPreview : function(title, data, columns){
        if(rvExport.isMobile()){
            alert('Not supported on Mobile Device');
            return;
        }
        
        var h = rvExport.getExportTitle(title) + rvExport.getExportHtml("", data, columns);
        rvExport.print(h);
    },

    excel : function(printHTML, fileName, urlBlankPage){
        printHTML = printHTML.replace(/Ą/g, '&#x104;');
        printHTML = printHTML.replace(/ą/g, '&#x105;');
        printHTML = printHTML.replace(/Ę/g, '&#x118;');
        printHTML = printHTML.replace(/ę/g, '&#x119;');
        printHTML = printHTML.replace(/Ó/g, '&#xd3;');
        printHTML = printHTML.replace(/ó/g, '&#xf3;');
        printHTML = printHTML.replace(/Ć/g, '&#x106;');
        printHTML = printHTML.replace(/ć/g, '&#x107;');
        printHTML = printHTML.replace(/Ł/g, '&#x141;');
        printHTML = printHTML.replace(/ł/g, '&#x142;');
        printHTML = printHTML.replace(/Ń/g, '&#x143;');
        printHTML = printHTML.replace(/ń/g, '&#x144;');
        printHTML = printHTML.replace(/Ś/g, '&#x15a;');
        printHTML = printHTML.replace(/ś/g, '&#x15b;');
        printHTML = printHTML.replace(/Ź/g, '&#x179;');
        printHTML = printHTML.replace(/ź/g, '&#x17a;');
        printHTML = printHTML.replace(/Ż/g, '&#x17b;');
        printHTML = printHTML.replace(/ż/g, '&#x17c;');

        // 2019.11.21 Tschechische 
        printHTML = printHTML.replace(/¿/g, '&#191;');
        printHTML = printHTML.replace(/¡/g, '&#161;');
        printHTML = printHTML.replace(/ª/g, '&#170;');
        printHTML = printHTML.replace(/Á/g, '&#193;');
        printHTML = printHTML.replace(/á/g, '&#225;');
        printHTML = printHTML.replace(/Â/g, '&#194;');
        printHTML = printHTML.replace(/â/g, '&#226;');
        printHTML = printHTML.replace(/Ă/g, '&#258;');
        printHTML = printHTML.replace(/ă/g, '&#259;');
        printHTML = printHTML.replace(/Å/g, '&#197;');
        printHTML = printHTML.replace(/å/g, '&#229;');
        printHTML = printHTML.replace(/Ą/g, '&#260;');
        printHTML = printHTML.replace(/ą/g, '&#261;');
        printHTML = printHTML.replace(/Ć/g, '&#262;');
        printHTML = printHTML.replace(/ć/g, '&#263;');
        printHTML = printHTML.replace(/Ċ/g, '&#266;');
        printHTML = printHTML.replace(/ċ/g, '&#267;');
        printHTML = printHTML.replace(/Č/g, '&#268;');
        printHTML = printHTML.replace(/č/g, '&#269;');
        printHTML = printHTML.replace(/Ç/g, '&#199;');
        printHTML = printHTML.replace(/ç/g, '&#231;');
        printHTML = printHTML.replace(/Ď/g, '&#270;');
        printHTML = printHTML.replace(/ď/g, '&#271;');
        printHTML = printHTML.replace(/É/g, '&#201;');
        printHTML = printHTML.replace(/é/g, '&#233;');
        printHTML = printHTML.replace(/Ě/g, '&#282;');
        printHTML = printHTML.replace(/ě/g, '&#283;');
        printHTML = printHTML.replace(/Ę/g, '&#280;');
        printHTML = printHTML.replace(/ę/g, '&#281;');
        printHTML = printHTML.replace(/Ğ/g, '&#286;');
        printHTML = printHTML.replace(/ğ/g, '&#287;');
        printHTML = printHTML.replace(/ı/g, '&#305;');
        printHTML = printHTML.replace(/Í/g, '&#205;');
        printHTML = printHTML.replace(/í/g, '&#237;');
        printHTML = printHTML.replace(/İ/g, '&#304;');
        printHTML = printHTML.replace(/Î/g, '&#206;');
        printHTML = printHTML.replace(/î/g, '&#238;');
        printHTML = printHTML.replace(/Ł/g, '&#321;');
        printHTML = printHTML.replace(/ł/g, '&#322;');
        printHTML = printHTML.replace(/Ń/g, '&#323;');
        printHTML = printHTML.replace(/ń/g, '&#324;');
        printHTML = printHTML.replace(/Ň/g, '&#327;');
        printHTML = printHTML.replace(/ň/g, '&#328;');
        printHTML = printHTML.replace(/Ñ/g, '&#209;');
        printHTML = printHTML.replace(/ñ/g, '&#241;');
        printHTML = printHTML.replace(/º/g, '&#186;');
        printHTML = printHTML.replace(/Ó/g, '&#211;');
        printHTML = printHTML.replace(/ó/g, '&#243;');
        printHTML = printHTML.replace(/Ř/g, '&#344;');
        printHTML = printHTML.replace(/ř/g, '&#345;');
        printHTML = printHTML.replace(/Ś/g, '&#346;');
        printHTML = printHTML.replace(/ś/g, '&#347;');
        printHTML = printHTML.replace(/Š/g, '&#352;');
        printHTML = printHTML.replace(/š/g, '&#353;');
        printHTML = printHTML.replace(/Ş/g, '&#350;');
        printHTML = printHTML.replace(/ş/g, '&#351;');
        printHTML = printHTML.replace(/Ș/g, '&#536;');
        printHTML = printHTML.replace(/ș/g, '&#537;');
        printHTML = printHTML.replace(/Ť/g, '&#356;');
        printHTML = printHTML.replace(/ť/g, '&#357;');
        printHTML = printHTML.replace(/Ț/g, '&#538;');
        printHTML = printHTML.replace(/ț/g, '&#539;');
        printHTML = printHTML.replace(/Ú/g, '&#218;');
        printHTML = printHTML.replace(/ú/g, '&#250;');
        printHTML = printHTML.replace(/Û/g, '&#219;');
        printHTML = printHTML.replace(/û/g, '&#251;');
        printHTML = printHTML.replace(/Ů/g, '&#366;');
        printHTML = printHTML.replace(/ů/g, '&#367;');
        printHTML = printHTML.replace(/Ý/g, '&#221;');
        printHTML = printHTML.replace(/ý/g, '&#253;');
        printHTML = printHTML.replace(/Ź/g, '&#377;');
        printHTML = printHTML.replace(/ź/g, '&#378;');
        printHTML = printHTML.replace(/Ż/g, '&#379;');
        printHTML = printHTML.replace(/ż/g, '&#380;');
        printHTML = printHTML.replace(/Ž/g, '&#381;');
        printHTML = printHTML.replace(/ž/g, '&#382;');
        printHTML = printHTML.replace(/Α/g, '&#913;');
        printHTML = printHTML.replace(/α/g, '&#945;');
        printHTML = printHTML.replace(/ά/g, '&#940;');
        printHTML = printHTML.replace(/Β/g, '&#914;');
        printHTML = printHTML.replace(/β/g, '&#946;');
        printHTML = printHTML.replace(/Γ/g, '&#915;');
        printHTML = printHTML.replace(/γ/g, '&#947;');
        printHTML = printHTML.replace(/Δ/g, '&#916;');
        printHTML = printHTML.replace(/δ/g, '&#948;');
        printHTML = printHTML.replace(/Ε/g, '&#917;');
        printHTML = printHTML.replace(/ε/g, '&#949;');
        printHTML = printHTML.replace(/έ/g, '&#941;');
        printHTML = printHTML.replace(/Ζ/g, '&#918;');
        printHTML = printHTML.replace(/ζ/g, '&#950;');
        printHTML = printHTML.replace(/Η/g, '&#919;');
        printHTML = printHTML.replace(/η/g, '&#951;');
        printHTML = printHTML.replace(/ή/g, '&#942;');
        printHTML = printHTML.replace(/Θ/g, '&#920;');
        printHTML = printHTML.replace(/θ/g, '&#952;');
        printHTML = printHTML.replace(/Ι/g, '&#921;');
        printHTML = printHTML.replace(/ι/g, '&#953;');
        printHTML = printHTML.replace(/Ί/g, '&#906;');
        printHTML = printHTML.replace(/ί/g, '&#943;');
        printHTML = printHTML.replace(/Ϊ/g, '&#938;');
        printHTML = printHTML.replace(/ϊ/g, '&#970;');
        printHTML = printHTML.replace(/Κ/g, '&#922;');
        printHTML = printHTML.replace(/κ/g, '&#954;');
        printHTML = printHTML.replace(/Λ/g, '&#923;');
        printHTML = printHTML.replace(/Μ/g, '&#924;');
        printHTML = printHTML.replace(/μ/g, '&#956;');
        printHTML = printHTML.replace(/Ν/g, '&#925;');
        printHTML = printHTML.replace(/ν/g, '&#957;');
        printHTML = printHTML.replace(/Ξ/g, '&#926;');
        printHTML = printHTML.replace(/ξ/g, '&#958;');
        printHTML = printHTML.replace(/Ό/g, '&#908;');
        printHTML = printHTML.replace(/ό/g, '&#972;');
        printHTML = printHTML.replace(/Π/g, '&#928;');
        printHTML = printHTML.replace(/π/g, '&#960;');
        printHTML = printHTML.replace(/ρ/g, '&#961;');
        printHTML = printHTML.replace(/Σ/g, '&#931;');
        printHTML = printHTML.replace(/ς/g, '&#962;');
        printHTML = printHTML.replace(/σ/g, '&#963;');
        printHTML = printHTML.replace(/τ/g, '&#964;');
        printHTML = printHTML.replace(/Υ/g, '&#933;');
        printHTML = printHTML.replace(/υ/g, '&#965;');
        printHTML = printHTML.replace(/Ύ/g, '&#910;');
        printHTML = printHTML.replace(/ύ/g, '&#973;');
        printHTML = printHTML.replace(/Ϋ/g, '&#939;');
        printHTML = printHTML.replace(/ϋ/g, '&#971;');
        printHTML = printHTML.replace(/ΰ/g, '&#944;');
        printHTML = printHTML.replace(/Φ/g, '&#934;');
        printHTML = printHTML.replace(/φ/g, '&#966;');
        printHTML = printHTML.replace(/Χ/g, '&#935;');
        printHTML = printHTML.replace(/χ/g, '&#967;');
        printHTML = printHTML.replace(/Ψ/g, '&#936;');
        printHTML = printHTML.replace(/ψ/g, '&#968;');
        printHTML = printHTML.replace(/Ω/g, '&#937;');
        printHTML = printHTML.replace(/ω/g, '&#969;');
        printHTML = printHTML.replace(/Ώ/g, '&#911;');
        printHTML = printHTML.replace(/ώ/g, '&#974;');
        printHTML = printHTML.replace(/А/g, '&#1040;');
        printHTML = printHTML.replace(/а/g, '&#1072;');
        printHTML = printHTML.replace(/Б/g, '&#1041;');
        printHTML = printHTML.replace(/б/g, '&#1073;');
        printHTML = printHTML.replace(/В/g, '&#1042;');
        printHTML = printHTML.replace(/в/g, '&#1074;');
        printHTML = printHTML.replace(/Г/g, '&#1043;');
        printHTML = printHTML.replace(/г/g, '&#1075;');
        printHTML = printHTML.replace(/Ґ/g, '&#1168;');
        printHTML = printHTML.replace(/ґ/g, '&#1169;');
        printHTML = printHTML.replace(/Д/g, '&#1044;');
        printHTML = printHTML.replace(/д/g, '&#1076;');
        printHTML = printHTML.replace(/Е/g, '&#1045;');
        printHTML = printHTML.replace(/е/g, '&#1077;');
        printHTML = printHTML.replace(/Є/g, '&#1028;');
        printHTML = printHTML.replace(/є/g, '&#1108;');
        printHTML = printHTML.replace(/Ж/g, '&#1046;');
        printHTML = printHTML.replace(/ж/g, '&#1078;');
        printHTML = printHTML.replace(/З/g, '&#1047;');
        printHTML = printHTML.replace(/з/g, '&#1079;');
        printHTML = printHTML.replace(/И/g, '&#1048;');
        printHTML = printHTML.replace(/и/g, '&#1080;');
        printHTML = printHTML.replace(/Й/g, '&#1049;');
        printHTML = printHTML.replace(/й/g, '&#1081;');
        printHTML = printHTML.replace(/І/g, '&#1030;');
        printHTML = printHTML.replace(/і/g, '&#1110;');
        printHTML = printHTML.replace(/Ї/g, '&#1031;');
        printHTML = printHTML.replace(/ї/g, '&#1111;');
        printHTML = printHTML.replace(/К/g, '&#1050;');
        printHTML = printHTML.replace(/к/g, '&#1082;');
        printHTML = printHTML.replace(/Л/g, '&#1051;');
        printHTML = printHTML.replace(/л/g, '&#1083;');
        printHTML = printHTML.replace(/М/g, '&#1052;');
        printHTML = printHTML.replace(/м/g, '&#1084;');
        printHTML = printHTML.replace(/Н/g, '&#1053;');
        printHTML = printHTML.replace(/н/g, '&#1085;');
        printHTML = printHTML.replace(/О/g, '&#1054;');
        printHTML = printHTML.replace(/о/g, '&#1086;');
        printHTML = printHTML.replace(/П/g, '&#1055;');
        printHTML = printHTML.replace(/п/g, '&#1087;');
        printHTML = printHTML.replace(/Р/g, '&#1056;');
        printHTML = printHTML.replace(/р/g, '&#1088;');
        printHTML = printHTML.replace(/С/g, '&#1057;');
        printHTML = printHTML.replace(/с/g, '&#1089;');
        printHTML = printHTML.replace(/Т/g, '&#1058;');
        printHTML = printHTML.replace(/т/g, '&#1090;');
        printHTML = printHTML.replace(/У/g, '&#1059;');
        printHTML = printHTML.replace(/у/g, '&#1091;');
        printHTML = printHTML.replace(/Ф/g, '&#1060;');
        printHTML = printHTML.replace(/ф/g, '&#1092;');
        printHTML = printHTML.replace(/Х/g, '&#1061;');
        printHTML = printHTML.replace(/х/g, '&#1093;');
        printHTML = printHTML.replace(/Ц/g, '&#1062;');
        printHTML = printHTML.replace(/ц/g, '&#1094;');
        printHTML = printHTML.replace(/Ч/g, '&#1063;');
        printHTML = printHTML.replace(/ч/g, '&#1095;');
        printHTML = printHTML.replace(/Ш/g, '&#1064;');
        printHTML = printHTML.replace(/ш/g, '&#1096;');
        printHTML = printHTML.replace(/Щ/g, '&#1065;');
        printHTML = printHTML.replace(/щ/g, '&#1097;');
        printHTML = printHTML.replace(/Ь/g, '&#1068;');
        printHTML = printHTML.replace(/ь/g, '&#1100;');
        printHTML = printHTML.replace(/Ю/g, '&#1070;');
        printHTML = printHTML.replace(/ю/g, '&#1102;');
        printHTML = printHTML.replace(/Я/g, '&#1071;');
        printHTML = printHTML.replace(/я/g, '&#1103;');

        // 05.06.2020 
        printHTML = printHTML.replace(/ë/g, '&#235;');
        printHTML = printHTML.replace(/њ/g, '&#1114;');
        printHTML = printHTML.replace(/Ј/g, '&#1032;');
        printHTML = printHTML.replace(/ј/g, '&#1112;');
        printHTML = printHTML.replace(/ћ/g, '&#1115;');
        
        var hPrint = [];
        hPrint.push('<!DOCTYPE HTML>');
        hPrint.push('<html>');
        hPrint.push(' <head>');
        hPrint.push('  <title> </title>');
        hPrint.push('<style>');
        hPrint.push(' .container {background:white;display:block;margin:0.5cm auto;box-shadow:0 0 0.5cm rgb(0,0,0,0.5)}');
        hPrint.push(' .title {padding:10px 20px;font-size:20px;font-weight:bold;font-family:Verdana, Geneva, sans-serif;color:#4a4a4a;} ');
        hPrint.push(' .title2 {padding-left:10px;margin-top:40px;font-size:12px;font-weight:bold;font-family:Verdana, Geneva, sans-serif;color:#4a4a4a;border-left:5px solid #ddd;background-color:#f1f1f1;line-height:30px;}');
        hPrint.push(' table {display:table;border-spacing:0;border-collapse:collapse;width:100%;border:thin solid #888888 !important;}');
        hPrint.push(" th {border:thin solid #888888 !important;font-weight:bold;}");
        hPrint.push(" td {border:thin solid #888888 !important;}");
        hPrint.push(" .tr {text-align:right}");
        hPrint.push(" .tc {text-align:center}");
        hPrint.push(" .tl {text-align:left}");
        hPrint.push(' .header {padding-left:20px;padding-right:20px;padding-bottom:20px;font-family:Verdana, Geneva, sans-serif;color:#4a4a4a;font-size:10px;}');
        hPrint.push(' .header_tb {width:100%;border-spacing:0;border-collapse:collapse;font-family:Verdana, Geneva, sans-serif;color:#4a4a4a;font-size:10px;}');
        hPrint.push(' .header_tb th {display:table-cell;padding:8px;line-height:1.42857;white-space:norwap;text-align:left;border:1px solid #ddd;background-color:#ececec;font-size:10px;}');
        hPrint.push(' .header_tb td {display:table-cell;padding:8px 50px 8px 8px;line-height:1.42857;white-space:norwap;border:1px solid #ddd;font-size:10px;}');
        hPrint.push(' .list {padding-left:20px;padding-right:20px;font-family:Verdana, Geneva, sans-serif;color:#4a4a4a;font-size:10px;}');
        hPrint.push(' .table {display:table;border-spacing:0;border-collapse:collapse;width:100%;max-width:100%;border:thin solid #888888 !important;}');
        hPrint.push(' .table > thead > tr > th {display:table-cell;border:thin solid #888888 !important;padding:8px;line-height:1.42857;white-space:norwap;text-align:left;}');
        hPrint.push(' .table tr {display:table-row;vertical-align:inherit;border-color:inherit;}');
        hPrint.push(' .table > tbody > tr > td {display:table-cell;border:thin solid #888888 !important;padding:8px;line-height:1.42857;white-space:norwap;}');
        hPrint.push(' .table tbody {display:table-row-group;vertical-align:middle;border-color:inherit;}');
        hPrint.push(' .table > tfoot > tr > td {display:table-cell;border:thin solid #888888 !important;padding:8px;line-height:1.42857;white-space:norwap;background-color:#f9f9f9;font-weight:bold;}');
        hPrint.push(' .table tfoot {display:table-row-group;vertical-align:middle;border-color:inherit;}');
        hPrint.push('</style>');
        
        hPrint.push('</head>');
        hPrint.push('<body>');
        hPrint.push('<div id="container" class="container">');
        hPrint.push(printHTML);
        hPrint.push(' </div>');
        hPrint.push(' </body>');
        hPrint.push('</html>');
        
        var getArrayBuffer = function(data) {
            var len = data.length,
                ab = new ArrayBuffer(len), u8 = new Uint8Array(ab);

            while(len--) u8[len] = data.charCodeAt(len);
            return ab;
        };

        var saveData = (function () {
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            return function (data, fileName) {
                var blob = new Blob([getArrayBuffer(data)], {type: "application/vnd.ms-excel"}),
                    url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = fileName;
                a.click();
                window.URL.revokeObjectURL(url);
            };
        }());

        if(window.navigator.userAgent.indexOf("MSIE") > -1 || window.navigator.userAgent.indexOf("Trident") > -1){
            var excelWindow = window.open('');
            if(!excelWindow.opener) excelWindow.opener = self;

            if((window.navigator.userAgent.indexOf("MSIE 7") > -1) || (window.navigator.userAgent.indexOf("MSIE 8") > -1) || (window.navigator.userAgent.indexOf("MSIE 9") > -1)){
                // excelWindow.location = urlBlankPage; //explorer 에서 security 보안 이슈로 안되면 urlBlankPage에 jsp와 연결이 안되어 있는 비어있는 portal component을 하나 생성해서 연결하면 됨.

                setTimeout(function(){
                    excelWindow = excelWindow.document;
                    excelWindow.write(hPrint.join(""));
                    excelWindow.close();    
                    excelWindow.execCommand("SaveAs",true,fileName+".xls");
                },100);
            }else{
                excelWindow = excelWindow.document;
                excelWindow.write(hPrint.join(""));
                excelWindow.close();    
                excelWindow.execCommand("SaveAs",true,fileName+".xls");
            }

        }else{
            saveData(hPrint.join(""), fileName+".xls");
            // var excelWindow = window.open('');
            // if(!excelWindow.opener) excelWindow.opener = self;
            // excelWindow = excelWindow.document;
            //     excelWindow.write(hPrint.join(""));
            //     excelWindow.close();    
            //     excelWindow.execCommand("SaveAs",true,fileName+".xls");
        }
    },

    getExportTitle : function(title, header){
        var hPrint = [];
        hPrint.push('   <div class="title">' + title + '</div>');

        if(header != undefined && header.length > 0){
            hPrint.push('   <div class="header">');
            hPrint.push('       <table class="header_tb">');
        
            for(var i=0 ; i<header.length ; i++){
                if((i+1)%3==1) hPrint.push('        <tr>');
                hPrint.push('       <th>' + header[i]["title"] + '</th><td>' + header[i]["value"] + '</td>');
                if((i+1)%3==0) hPrint.push('        </tr>');
            }
            if(header.length%3 != 0) hPrint.push('      </tr>');

            hPrint.push('       </table>');
            hPrint.push('   </div>');
        }

        return hPrint.join("");
    },

    getExportHtml : function(title, data, columns){
        var hPrint = [];

        hPrint.push('   <div class="list">');
        hPrint.push('       <div class="title2">' + title + '</div>');
        hPrint.push('       <table class="table">');
        hPrint.push('           <thead>');
        hPrint.push('               <tr>');

        var colLength = columns.length;
        for(var j=0 ; j<colLength ; j++){
            hPrint.push('                   <th>' + columns[j]['title'] + '</th>');
        }
        hPrint.push('               </tr>');
        hPrint.push('           </thead>');
        hPrint.push('           <tbody>');

        var rowLength = data.length;
        for(var i=0 ; i<rowLength ; i++){
            var row = data[i];
            hPrint.push('               <tr>');
            for(var j=0 ; j<colLength ; j++){
                if(columns[j]['format']){
                    hPrint.push('                   <td>' + rvExport.getFormatValue(row[columns[j]['key']], columns[j]['format']) + '</td>');
                }else if(columns[j]['formatter']){
                    hPrint.push('                   <td>' + columns[j]['formatter'](row) + '</td>');
                }else{
                    hPrint.push('                   <td>' + row[columns[j]['key']] + '</td>');
                }
            }
            hPrint.push('               </tr>');
        }
        
        hPrint.push('           </tbody>');
        hPrint.push('       </table>');
        hPrint.push('   </div>');
        

        return hPrint.join("");
    },

    print : function(printHTML, urlBlankPage){
        var hPrint = [];
        hPrint.push('<!DOCTYPE HTML>');
        hPrint.push('<html>');
        hPrint.push(' <head>');
        hPrint.push('  <title> New Document </title>');
        hPrint.push('<style>');
        hPrint.push('body{background:rgb(204,204,204);}');
        hPrint.push('');
        hPrint.push(' .container {background:white;display:block;margin:0.5cm auto;box-shadow:0 0 0.5cm rgb(0,0,0,0.5)}');
        hPrint.push(' .A4_PORTRAIT {width:210mm;min-height:297mm;height:auto;}');
        hPrint.push(' .A4_LANDSCAPE {width:297mm;min-height:210mm;height:auto;}');
        hPrint.push(' .A3_PORTRAIT {width:297mm;min-height:420mm;height:auto;}');
        hPrint.push(' .A3_LANDSCAPE {width:420mm;min-height:297mm;height:auto;}');
        hPrint.push(' .B4_PORTRAIT {width:257mm;min-height:364mm;height:auto;}');
        hPrint.push(' .B4_LANDSCAPE {width:364mm;min-height:257mm;height:auto;}');
        hPrint.push(' .LETTER_PORTRAIT {width:21.59cm;min-height:27.94cm;height:auto;}');
        hPrint.push(' .LETTER_LANDSCAPE {width:27.94cm;min-height:21.59cm;height:auto;}');
        hPrint.push(' .LEGAL_PORTRAIT {width:21.59cm;min-height:35.56cm;height:auto;}');
        hPrint.push(' .LEGAL_LANDSCAPE {width:35.56cm;min-height:21.59cm;height:auto;}');
        hPrint.push(' .title {padding:10px 20px;font-size:20px;font-weight:bold;font-family:Verdana, Geneva, sans-serif;color:#4a4a4a;} ');
        hPrint.push(' .title2 {padding-left:10px;margin-top:40px;font-size:12px;font-weight:bold;font-family:Verdana, Geneva, sans-serif;color:#4a4a4a;border-left:5px solid #ddd;background-color:#f1f1f1;line-height:30px;}');
        hPrint.push(' .header {padding-left:20px;padding-right:20px;padding-bottom:20px;font-family:Verdana, Geneva, sans-serif;color:#4a4a4a;font-size:10px;}');
        hPrint.push(' .header_tb {width:100%;border-spacing:0;border-collapse:collapse;;}');
        hPrint.push(' .header_tb th {display:table-cell;padding:8px;line-height:1.42857;white-space:norwap;text-align:left;border:1px solid #ddd;background-color:#ececec;}');
        hPrint.push(' .header_tb td {display:table-cell;padding:8px 50px 8px 8px;line-height:1.42857;white-space:norwap;border:1px solid #ddd;background-color:#ececec;}');
        hPrint.push(' .list {padding-left:20px;padding-right:20px;font-family:Verdana, Geneva, sans-serif;color:#4a4a4a;font-size:10px;}');
        hPrint.push(' .table {display:table;border-spacing:0;border-collapse:collapse;width:100%;max-width:100%;}');
        hPrint.push(' .table > thead > tr > th {display:table-cell;border-bottom:2px solid #8e8e8e;padding:8px;line-height:1.42857;white-space:norwap;text-align:left;}');
        hPrint.push(' .table tr {display:table-row;vertical-align:inherit;border-color:inherit;}');
        hPrint.push(' .table > tbody > tr > td {display:table-cell;border-bottom:1px solid #ddd;padding:8px;line-height:1.42857;white-space:norwap;}');
        hPrint.push(' .table tbody {display:table-row-group;vertical-align:middle;border-color:inherit;}');
        hPrint.push(' .table > tfoot > tr > td {display:table-cell;border-bottom:1px solid #ddd;padding:8px;line-height:1.42857;white-space:norwap;background-color:#f9f9f9;font-weight:bold;}');
        hPrint.push(' .table tfoot {display:table-row-group;vertical-align:middle;border-color:inherit;}');
        hPrint.push(' .btn_print {position:absolute;right:20px;top:30px;height:20px;font-size:12px;font-family:Verdana, Geneva, sans-serif;cursor:pointer;}');
        hPrint.push('');
        hPrint.push('@media print {');
        hPrint.push('body{background:white;}');
        hPrint.push(' .container {background:white;display:block;margin:0;}');
        hPrint.push(' .A4_PORTRAIT {width:100%;height:auto;}');
        hPrint.push(' .A4_LANDSCAPE {width:100%;height:auto;}');
        hPrint.push(' .A3_PORTRAIT {width:100%;height:auto;}');
        hPrint.push(' .A3_LANDSCAPE {width:100%;height:auto;}');
        hPrint.push(' .B4_PORTRAIT {width:100%;height:auto;}');
        hPrint.push(' .B4_LANDSCAPE {width:100%;height:auto;}');
        hPrint.push(' .LETTER_PORTRAIT {width:100%;height:auto;}');
        hPrint.push(' .LETTER_LANDSCAPE {width:100%;height:auto;}');
        hPrint.push(' .LEGAL_PORTRAIT {width:100%;height:auto;}');
        hPrint.push(' .LEGAL_LANDSCAPE {width:100%;height:auto;}');
        
        hPrint.push(' .title {page-break-after:avoid;padding:0px 0px 20px 0px;font-size:18px;font-weight:bold;font-family:Verdana, Geneva, sans-serif;color:#000000;}   ');
        hPrint.push(' .title2 {page-break-after:avoid;padding-left:10px;margin-top:40px;font-size:12px;font-weight:bold;font-family:Verdana, Geneva, sans-serif;color:#4a4a4a;border-left:5px solid #ddd;background-color:#f1f1f1;line-height:30px;}');
        hPrint.push(' .header {page-break-after:avoid;padding-left:0px;padding-right:0px;padding-bottom:20px;font-family:Verdana, Geneva, sans-serif;color:#4a4a4a;font-size:10px;}');
        
        hPrint.push(' .header_tb {width:100%;border-spacing:0;border-collapse:collapse;;}');
        hPrint.push(' .header_tb th {display:table-cell;padding:8px;line-height:1.42857;white-space:norwap;text-align:left;border:1px solid #ddd;background-color:#ececec;}');
        hPrint.push(' .header_tb td {display:table-cell;padding:8px 50px 8px 8px;line-height:1.42857;white-space:norwap;border:1px solid #ddd;background-color:#ececec;}');
        hPrint.push(' .list {padding-left:0px;padding-right:0px;font-family:Verdana, Geneva, sans-serif;color:#000000;font-size:9px;}');
        hPrint.push(' .table {display:table;border-spacing:0;border-collapse:collapse;width:100%;max-width:100%;}');
        
        hPrint.push(' .table > thead {page-break-before:always;}');

        hPrint.push(' .table > thead > tr > th {display:table-cell;border-bottom:2px solid #8e8e8e;padding:8px;line-height:1.42857;white-space:norwap;text-align:left;}');
        hPrint.push(' .table tr {display:table-row;vertical-align:inherit;border-color:inherit;}');
        hPrint.push(' .table > tbody > tr > td {display:table-cell;border-bottom:1px solid #ddd;padding:8px;line-height:1.42857;white-space:norwap;}');
        hPrint.push(' .table tbody {display:table-row-group;vertical-align:middle;border-color:inherit;}');
        hPrint.push(' .table > tfoot > tr > td {display:table-cell;border-bottom:1px solid #ddd;padding:8px;line-height:1.42857;white-space:norwap;background-color:#f9f9f9;font-weight:bold;}');
        hPrint.push(' .table tfoot {display:table-row-group;vertical-align:middle;border-color:inherit;}');
        hPrint.push(' .btn_print {display:none;}');
        hPrint.push('}');
        hPrint.push('');
        hPrint.push('</style>');

        hPrint.push('<script>');
        hPrint.push('function changePageSize(){');
        hPrint.push('   var size = document.getElementById("size").value;');
        hPrint.push('   var orientation = document.getElementById("landscape").checked?"LANDSCAPE":"PORTRAIT";');
        hPrint.push('   document.getElementById("container").className = "container " + (size+"_"+orientation);');
        hPrint.push('}');
        hPrint.push('<\/script>');
        
        
        hPrint.push('</head>');
        hPrint.push('<body>');
        hPrint.push('<div class="btn_print">');
        hPrint.push('<div style="margin-bottom:10px;"><select id="size" onchange="changePageSize();"><option value="LETTER">Letter</option><option value="LEGAL">Legal</option><option value="A4">A4</option><option value="A3">A3</option><option value="B4">B4</option></select></div>');
        hPrint.push('<div style="margin-bottom:10px;"><input type="radio" name="orientation" id="landscape" value="LANDSCAPE" onclick="changePageSize();" checked><label for="landscape">Landscape</label><input type="radio" name="orientation" id="portrait" value="PORTRAIT" onclick="changePageSize();"><label for="portrait">Portrait</label></div>');
        hPrint.push('<div><input type="button" value="Print" onclick="javascript:alert(\'Before printing,You neet to set up doucment size and orientation.\');window.print();"></div>');
        hPrint.push('</div>');
        hPrint.push('<div id="container" class="container LETTER_LANDSCAPE">');
        hPrint.push(printHTML);
        hPrint.push(' </div>');
        hPrint.push(' </body>');
        hPrint.push('</html>');

        
        var printWindow = window.open();
        if(!printWindow.opener) printWindow.opener = self;

        printDocument = printWindow.document;
        printDocument.write(hPrint.join(""));
        printDocument.close();  
    },

    getFormatValue : function(value, format){
        if(value == "") return value;
    
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
                v = String(parseFloat(value).toFixed(maxFractionDigits));

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
                    
                    var date_format = format.toLowerCase();
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
    }
};
