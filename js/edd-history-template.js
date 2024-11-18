// Template Object 	
var templateObject = {
	compareKeyNames: [
		"T_XSITESERVICE","T_XRETAILF","T_XSTOCKF","T_XSIEXT",
		"T_XSIGEN","T_XSINXT","T_XSALES","T_XFACEXT","T_XFACINT",
		"T_XFACSHROOM","T_XOPRLABOUR","T_XCOURTVEH","T_XDMS","T_XNETINFO",
		"T_XSYSRIGHT","T_XMDCODE","T_XBANKDETAIL","T_XAGREEMENT","T_XSITEINFO",
		"T_XAWARDS","T_XADDRESS",
		"T_XEXCLULEGAL",
		"T_XEXCLUSALES",
		"T_XEXCLUSHOW",
		"T_XEXCLUWORK",
		"T_XEXCLUSALESNV",
		"T_XEXCLUWORKSH",
		"T_XJOBTITLE","T_XREPORT","T_XROLE","T_XSSO" ,
		"T_XEXTERNAL","T_XHOLIDAY","T_XAUTH","T_XMANAGER",
		"T_XDDMS","T_XASS","T_XMEDIA","T_XDIGITAL", "T_XDEALMK", 
		"T_XHEADEROF", 
		"T_XKSGEN",
		"T_XPTNRTYPE",
		"T_XPARTS"
	],
	templateObject:{
		T_XSITESERVICE: [
				{key:"ZSVCAVL", thName:"Service Available Code"},
				{key:"ZSVCAVL_T", thName:"Service Available"},
				{key:"FLAG", thName:"Data Flag"},
			],
		T_XRETAILF: [
				{key:"ZCAPITAL_T", thName:"Capital Company"}
			],
		T_XSTOCKF: [
				{key:"ZCAPITAL_T", thName:"Capital Company"}
			],
		T_XSIEXT: [
				{key:"ZFURTYPE_T", thName:"Category"}
			],
		T_XSIGEN: [
				{key:"ZFURTYPE_T", thName:"Category"},
				{key:"ZSIDATE", thName:"Date", dataType:"date"}
			],
		T_XSINXT: [
				{key:"ZFURTYPE_T", thName:"Category"}
			],
		T_XSALES: [
				{key:"ZOWNER1_T", thName:"Site/Land Ownership"},
				{key:"ZOWNER2_T", thName:"Ownership Type"}
			],
		T_XFACEXT: [
				{key:"ZFAGRCODE_T", thName:"Category"},
				{key:"ZFACVALUE", thName:"Facility & Grounds Value"}
			],
		T_XFACINT: [
				{key:"ZFAGRCODE_T", thName:"Category"},
				{key:"ZFACVALUE", thName:"Facility & Grounds Value"}
			],
		T_XFACSHROOM: [
				{key:"ZFAGRCODE_T", thName:"Category"},
				{key:"ZFACVALUE", thName:"Facility & Grounds Value"}
			],
		T_XOPRLABOUR: [
				{key:"ZOPRKPICODE_T", thName:"Category"},
				{key:"ZFACKPIVALUE", thName:"Facility & Grounds Value"}
			],
		T_XCOURTVEH: [
				{key:"VHVIN", thName:"VIN No."},
				{key:"MODEL", thName:"Model"},
				{key:"ZREDDT", thName:"Retail Date", dataType:"date"},
				{key:"ZENDDT", thName:"Planned End Usage Date", dataType:"date"},
				{key:"BEZEI", thName:"Long Text"},
				{key:"ZFREEOBJ", thName:"Free of Personal Object"},
				{key:"ZORDERED", thName:"Ordered From"}
			],
		T_XDMS: [
				{key:"ZDMSSUP", thName:"DMS Supplier"},
				{key:"ZDMSPRD", thName:"DMS Product"},
				{key:"ZDMSVERS", thName:"DMS product Version"},
			],
		T_XASS : [
				{key:"ZASSSUP", thName:"System Supplier"},
				{key:"ZASSPRD", thName:"System Product"},
				{key:"ZASSVERS", thName:"System product Version"},
				{key:"ZASSDESC", thName:"System product Version"}
			],
		T_XNETINFO: [
				{key:"ZNETBAND", thName:"Bandwidth"},
				{key:"ZNETPROV", thName:"Provider"}
				//,{key:"ZNETDOMAIN", thName:"Domain Name"}
			],
		T_XSYSRIGHT: [
				{key:"ZITSYSACC_T", thName:"Category"}
			],
		T_XMDCODE: [
				{key:"ZMDCODE", thName:"Main Dealer Code(System)"},
				{key:"ZSYSCODE", thName:"System Code"}
			],
		T_XBANKDETAIL: [
				{key:"BANKA", thName:"Bank Number"},
				{key:"ZBANKN", thName:"Bank number"},
				{key:"KOINH", thName:"Account Holder"},
				{key:"ORT01", thName:"City"},
				{key:"BANKS", thName:"Bank country key"},
				{key:"IBAN", thName:"IBAN"},
				{key:"BBIC", thName:"Bank BIC"},
				{key:"WAERS", thName:"Currency Key"}
			],
		T_XAGREEMENT: [
				{key:"ZAGREN", thName:"Agreement No"},
				{key:"ZAGREWDRN", thName:"Contract withdrawal of Termination no"},
				{key:"ZAGRETP_T", thName:"Agreement Contract Type"},
				{key:"ZAGRECOMM", thName:"Commence Date", dataType:"date"},
				{key:"ZAGRETER", thName:"Issue of Termination Date" , dataType:"date"},
				{key:"ZAGRESIGN", thName:"Sigining Date", dataType:"date"},
				{key:"ZAGRECOMM_S", thName:"Commence Date", dataType:"date"},
				{key:"ZAGREISUT", thName:"Issue of Termination Date", dataType:"date"},
				{key:"ZAGRETDUR_T", thName:"Termination Duration"},
				{key:"ZAGRETER_F", thName:"Issue of Termination Date", dataType:"date"},
				{key:"ZAGRERSN_T", thName:"Reson for Termination"},
				{key:"ZTMTYPE_T", thName:"Termination Plan Type"},
				{key:"ZAGRECTG_T", thName:"Category"},
				{key:"ZWDRTRM", thName:"Withdrawal of termination"},
				{key:"ZWDRTRMDT", thName:"Withdrawal of Termination date", dataType:"date"},
				{key:"ZFLAG", thName:"Flag"}
			],
		T_XSITEINFO: [
				{key:"ZSITEN", thName:"Site No"},
				{key:"WEEKDAY_T", thName:"Weekday"},
				{key:"ZSITETYPE_T", thName:"Site Address Type"},
				{key:"ZADDR", thName:"Address"},
				{key:"ZTELLAND", thName:"Tel. Country"},
				{key:"ZTELNUMBER", thName:"Tel No."},
				{key:"ZFAXLAND", thName:"Fax. Country"},
				{key:"ZFAXNUMBER", thName:"Fax No."},
				{key:"EMAIL", thName:"Main E-mail"},
				{key:"SUBEMAIL", thName:"Sub E-mails"},
				{key:"ZSITELOCTYP_T", thName:"Site Location Type"},
				{key:"ZNEWTARGET", thName:"New Car Sales Annual Target"},
				{key:"ZCHECK", thName:"Checkbox"},
				{key:"ZOPENTIME_M", thName:"Open Time AM"},
				{key:"ZCLOSETIME_M", thName:"Close Time AM"},
				{key:"ZOPENTIME_F", thName:"Open Time PM"},
				{key:"ZCLOSETIME_F", thName:"Close Time PM"},
				{key:"ZFLAG", thName:"Flag"},
				{key:"ZLATITNA", thName:"Navigational Latitude"},
				{key:"ZLONGITNA", thName:"Navigational Longitude"}
			],
		T_XAWARDS: [
				{key:"ZAWARDGP_T", thName:"Award Group"},
				{key:"ZAWARDN_T", thName:"Award Name"},
				{key:"ZAWARD_T", thName:"Award"},
				{key:"ZAWARDDT", thName:"Award Date" , dataType:"date"},
				{key:"ZAWARDEXP", thName:"Award Expiration Date" , dataType:"date"}
			],
		T_XEXCLULEGAL: [{key:"ZEXCTYPE_T", thName:"Exclusivity Type"}, {key:"ZNOTES_EX", thName: "Note"}],
		T_XEXCLUSALES: [{key:"ZEXCTYPE_T", thName:"Exclusivity Type"}, {key:"ZNOTES_EX", thName: "Note"}],
		T_XEXCLUSHOW: [{key:"ZEXCTYPE_T", thName:"Exclusivity Type"}, {key:"ZNOTES_EX", thName: "Note"}],
		T_XEXCLUWORK: [{key:"ZEXCTYPE_T", thName:"Exclusivity Type"}, {key:"ZNOTES_EX", thName: "Note"}],
		T_XEXCLUSALESNV: [{key:"ZEXCTYPE_T", thName:"Exclusivity Type"}, {key:"ZNOTES_EX", thName: "Note"}],
		T_XEXCLUWORKSH: [{key:"ZEXCTYPE_T", thName:"Exclusivity Type"}, {key:"ZNOTES_EX", thName: "Note"}],
		T_XADDRESS:[
				{key:"ZADDR", thName:"Address"},
				{key:"ZSTREETNO", thName:"Street No."},
				{key:"ZSTREET", thName:"Street"},
				{key:"CITY", thName:"City"},
				{key:"COUNTY", thName:"County"},
				{key:"POST", thName:"Postal code"},
				{key:"ZPOSTBOX", thName:"Postal Box"},
				{key:"COUNTRY", thName:"Country Key"},
				{key:"COUNTRYNA", thName:"Country Key ISO3"},
				{key:"ZSTATE", thName:"State"},
				{key:"ZDIST", thName:"District"},
				{key:"ZLATIT", thName:"Latitude"},
				{key:"ZLONGIT", thName:"Longitude"},
				{key:"ZLATITNA", thName:"Navigational Latitude"},
				{key:"ZLONGITNA", thName:"Navigational Longitude"}
			],
		T_XJOBTITLE:[
			{key:"ZDEPT", thName:"Department"},
			{key:"ZDEPT_T", thName:"Department Name"},
			{key:"ZJOBTITL_T", thName:"Job Title Name"},
			{key:"ZJOBTITL", thName:"Job Title"},
			{key:"ZMAINJOBFLAG", thName:"Main Job Title flag"},
			{key:"ZFUNCPER", thName:"Percentage in function"}
		],
		T_XREPORT:[
			{key:"ZPTNR", thName:"EDD Code"},
			{key:"ZPRSNN", thName:"Person No"},
			{key:"ZPRSNNL", thName:"Report Line Person No"}
		],
		T_XROLE:[
			//{key:"ZPOTALID", thName:"User ID (Portal ID)"},
			{key:"ZROLE", thName:"Role"},
			{key:"ZROLE_T", thName:"Role Name"},
			{key:"ZEDDMD", thName:"EDDS Module"},
			{key:"ZEDDMD_T", thName:"EDDS Module Name"},
		],
		T_XSSO:[
			{key:"ZSSOSYS", thName:"SSO System Code"},
			{key:"ZGRPNM", thName:"Group Name"},
			{key:"ZSGRPNM", thName:"Sub Group Name"},
			{key:"ZSSOUID", thName:"SSO System User ID"},
			{key:"ZSSOETC", thName:"SSO ETC field"},
			{key:"ZCHKBOX", thName:"Checkbox"}
		],
		T_XEXTERNAL:[
			{ DCSI : [
				{key:"ZACTIVE", 	thName:"DCSI"},
				//{key:"ZSURVEY",   	thName:"Sales/Service"},
				{key:"ZREZION_T", 	thName:"Region"},
			//	{key:"ZREZION", 	thName:"Region Code"},
				{key:"ZDIST_T", 	thName:"District"},
			//	{key:"ZDIST", 		thName:"District Code"},			
				{key:"EMAIL", 		thName:"Main Email"},
				//{key:"MEMAIL",   	thName:"Emails"},
			]
			}
		],
		T_XHOLIDAY:[
			{key:"ZHODA", 	thName:"Holiday Date" , dataType:"date"},
			{key:"FRTIM", 	thName:"From Time"},
			{key:"TOTIM", 	thName:"To Time"},
			{key:"NAME", 	thName:"Holiday Name"},
			{key:"RECUR", 	thName:"District Code"},			
		],
		T_XAUTH:[
			{key:"ZDEPT", thName:"Department"},
			{key:"ZDEPT_T", thName:"Department Name"},
			{key:"ZKDAAUTH", thName:"Authorization"},
			{key:"ZKDAAUTH_T", thName:"Authorization Name"},
		],
		T_XMANAGER:[

			{key:"ZPRSNN", thName:"[EDD] Person No"},
			{key:"ZMANTY", thName:"Manager Type"},
			{key:"ZMANTY_T", thName:"Manager Type Name"}
		 
		],
		T_XDDMS:[
			{key:"ZDDMS", thName:"DDMS"},
			{key:"ZDDMS_T", thName:"DDMS Text"},
			{key:"ZKDA", thName:"KDA"},
			{key:"ZKDCS", thName:"KDCS"},
			{key:"ZCINET", thName:"CINET"},
			{key:"ZGWMS", thName:"GWMS"},
			{key:"ZGSW", thName:"GSW"},
			{key:"ZGQIS", thName:"GQIS"},
			{key:"ZWPC", thName:"WPC"},
			{key:"ZOCDT", thName:"OCDT"},
			{key:"ZISMIS", thName:"ISMIS"},
		],
		T_XMEDIA:[
			{key:"FACEB", thName:"Facebook URL"},
			{key:"INSTA", thName:"Instagram URL"},
			{key:"TWITT", thName:"Twitter URL"},
			{key:"LINKD", thName:"Linked URL"},
			{key:"YTUBE", thName:"Youtube URL"}
		],
		T_XDIGITAL:[
			{key:"CARWOW", thName:"CarWow URL"},
			{key:"AUTO24", thName:"Auto24 URL"},
			{key:"REVOO", thName:"Revoo URL"},
			{key:"MOBIL", thName:"Mobile URL"}
		],
		T_XDEALMK:[
			{key:"ZDEALMK", thName:"Dealer Marketing"},
			{key:"ZDEALMK_T", thName:"Dealer Marketing Text"},
		],
		T_XHEADEROF:[
			{key:"ZVAT", thName:"VAT CODE"},
			{key:"ZREADDR", thName:"Registered office"},
			{key:"ZCEMAIL", thName:"Certified E-mail"},
			{key:"ZLENAME", thName:"Legal representative"},
			{key:"ZCOMPID", thName:"Company ID"},
		],
		T_XKSGEN:[
			{key:"ZKSTYPE", thName:"KIA Store Category"},
			{key:"ZKSDATE", thName:"KIA Store Date"},
			{key:"ZKSTYPE_T", thName:"KIA Store Category Text"}
		],
		T_XPTNRTYPE:[
			{key:"ZPTNRTP", thName:"Partner Type code"},
			{key:"ZPTNRTP_T", thName:"Partner Type Text"},
			{key:"ZDEALERTYPE", thName:"Dealer Type"},
			{key:"ZDEALERTYPE_T", thName:"Dealer Type Text"},
			{key:"ZSITETYPE", thName:"Site Type"},
			{key:"ZPTNRTPDATE", thName:"Partner Type Change Effective Date", dataType:"date"}
		],
		T_XPARTS:[
			{key:"ZCERTIFI2", thName:"Employee Certifications"},
			{key:"ZCERTIFI2_T", thName:"Employee Certifications Text"},
		]

	}
};