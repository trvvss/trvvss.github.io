/////////////////
// Library of OMI calls. New or additional calls may be added in the same format. Their contents will immediately be added to the page. The 'returned' key arrays display unique values as checkbox items
//'returnedDetail' arrays display unique values as a drop-down selectable on-page element
// Made by Travis Nelson - travis.nelson@zonarsystems.com in 2019
/////////////////

const omiCallsLibrary = {
	// sampleCall: {
	// 	name: "Sample Call Name",
	// 	description: "This is a description of this sample OMI call.",
	// 	link: "https://support.zonarsystems.net/hc/en-us/categories/360000020371",
	// 	required: {
	// 		SampleAction: "example action value",
	// 		SampleOperation: "example operation value", 
	// 		SampleFormats: "xml"
	// 	},
	// 	optional: {
	// 		optionalParameter1: "eg - 3.2",
	// 		optionalParameter2: "eg - desc"
	// 	},
	// 	returned: ['Sample 1', 'Sample 2', 'Sample 3'],
	// 	returnedDetail: ['Sample 1 - Full details and description', 'Sample 2 - Full details and description', 'Sample 3 - Full details and description']
	// },	
	adminassetsAdd: {
		name: "Add an Asset",
		description: "This call is used to add an asset to a GTC account",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360000926812-Add-an-Asset",
		required: {
			action: "adminassets",
			operation: "add", 	
			format: "xml",
			fleet: "(20 char max)",
			exsid: "(40 char max)",
			location: "(valid GTC location)",
			type: "(standard, trailer ...)"
		},
		optional: {
			name: "(license tag; 20 char max)",
			logvers: "(1 or 2)",
			vin: "(40 char max)",
			inservice: "(epoch timestamp)",
			tagid: "(asset tag number)",
			mfg: "(manufacturer)",
			mileoffset: "(number)",
			engine_hour_offset: "(number)",
			radioaddress:"(deprecated)",
			subtype:"(text)",
			status:"(1-active, 2-inactive)",
			homeloi:"(zone name)",
			odometer_offset:"(Requires start date parameter)",
			start:"(The date odometer_offset is applied to)"
		},
		returned: ["Add", "Assets", "Admin"],
		returnedDetail: ["Success or Error Message"]
	},	
	showopenInsp: {
		name: "Get New Inspections",
		description: "This call is used to return EVIR inspections.",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018406331-Get-New-Inspections",
		required: {
			action: "showopen",
			operation: "insp", 
			format: "xml",
			status: "(red, yellow, green, all, bad)"
		},
		optional: {
			logvers: "The API call version.",
			timestamp: "(deprecated. use 'start' instead)",
			location: "(valid GTC location)",
			repair: "(yes, no, both)",
			tstype: "(insp, load)",
			config: "(EVIR config name)",
			start: "(epoch timestamp)",
			end: "(epoch timestamp)"
		},
		returned: ['EVIR'],
		returnedDetail: ['count', 'timestamp', 'stat', 'fleet', 'operator', 'optag', 'repair', 'loadlocation', 'starttime', 'endtime', 'extractor', 'config', 'manual', 'verified', 'assetid', 'opid', 'defect', 'assetvalue', 'cfglabel', 'loadtime', 'sn', 'asset_exsid', 'operator_exsid', 'vin', 'insp - EVIR id']
	},
	showopenShowinsp: {
		name: "Get Inspection Details",
		description: "This call is used to return details of an individual EVIR inspection.",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018406471-Get-Inspection-Details",		
		required: {
			action: "showopen",
			operation: "showinsp",
			target: "(EVIR id)", 
			format: "xml",
			version: "2"
		},
		optional: {
		},
		returned: ['EVIR'],
		returnedDetail: ['inspid', 'date', 'storetime','fleet','stat','mileage','operator','loadlocation','source ','sn','firmware','config','sigstate','zone', 'component (defect)','condition (defect)','ffd (defect) - Fitness For Duty','defectid (defect)','agent (repair) - The mechanic', 'date (repair)', 'repid - The internal id number for the repair','orderno (repair)', 'note (repair)', 'date (pending)', 'aux', 'tag (aux)', 'unit (aux)', 'timestamp (aux)', 'auxtype (aux)', 'valuelabel (aux)', 'value (aux)']
	},
	addrepair: {
		name: "Add Repair",
		description: "You can use this call to make a repair to an open defect.",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018412431-Add-Repair",
		required: {
			action: "addrepair",
			mechanic: "(GTC username)",
			repair_date: "(epoch timestamp)",
			inspid: "(EVIR id)",
			defectid: "(use Get Inspection Details)",
			comment: "(text, no character limit)",
			format: "xml"
		},
		optional: {
			sonumber: "(work order number)",
			norepair: "(flag to specify if no repair required)",
			true: "(see documentation)"
		},
		returned: ["EVIR"],
		returnedDetail: ["Success or Error Message"]
	},
	addpending: {
		name: "Add Pending",
		description: "You can use this call to add a pending status to an open defect.",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018412431-Add-Repair",		
		required: {
			action: "addrepair",
			operation: "pending",
			inspid: "(EVIR id)",
			defectid: "(use Get Inspection Details)",
			pending_date: "(epoch timestamp)",
			expected_date: "(epoch timestamp)",
			comment: "(text description)",
			format: "xml"
		},
		optional: {
		},
		returned: ["EVIR"],
		returnedDetail: ["Success or Error Message"]
	},
	showopenaux: {
		name: "Get Aux Item(s)",
		description: "Aux items represent some kind of minor (auxiliary) equipment to be inspected.",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360016150692-Get-Aux-Items",
		required: {
			action: "showopen",
			operation: "aux",
			format: "xml"
		},
		optional: {
			auxtype: "(see documentation)",
			target: "(see documentation)",
			location: "(GTC location)",
			logvers: "2"
		},
		returned: ["Aux Info"],
		returnedDetail: ["tag","id", "unit", "auxtype", "valuelabel", "value", "location", "timestamp"]
	},
	extgetrepairusers: {
		name: "Get Mechanics",
		description: "Returns a list of users who can perform repairs for use with the addrepair action.",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018034212-Get-Mechanics",		
		required: {
			action: "extgetrepairusers"
		},
		optional: {
			location: "Location to filter with. Text. If provided only users assigned to that location will be returned. If location is not supplied or an empty location is specified, users from all locations will be returned.",
			logvers: "2"
		},
		returned: ['EVIR'],
		returnedDetail: ["dbid", "logname", "fname", "lname", "location", "active"]
	},
	showopenLocation: {
		name: "Get Locations",
		description: "Returns a list of locations in the system",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018362472-Get-Location-",
		required: {
			action: "showopen",
			operation: "location",
			format: "xml"
		},
		optional: {
			logvers: "2",
			showinactive: "(true or false)"
		},
		returned: ["GTC Location", "List", "Admin"],
		returnedDetail: ["locationlist", "location"]
	},		
	showopenShowassets: {
		name: "Get Assets",
		description: "Returns a list of assets in an account.",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360016149712-Get-Assets",
		required: {
			action: "showopen",
			operation: "showassets",
			format: "xml"
		},
		optional: {
			logvers: "3",
			location: "(gtc location)",
			modifytime: "(epoch timestamp)",
			status: "(1 for active, 2 for inactive)",
			yardstat: "(in, out, unknown)",
			opstatus: "(good, unsat, crit, defect)",
			target: "(see documentation)",
			reqtype: "(tag, exsid, vin, dbid, fleet)",
			type: "(Standard or TRAILER)"
		},
		returned: ["Assets", "List"],
		returnedDetail: ["dbid", "name - License Plate", "tag", "vin", "fleet", "type", "subtype", "exsid", "mileage", "location", "mileoffset", "radioaddress", "mfg", "inservice", "inspdate", "id (inspdate)", "type (inspdate)", "status", "opstatus", "timestamp (opstatus)", "gps", "homeloi", "customdata"]
	},
	showstatsMileage: {
		name: "EVIR Mileage Reporting",
		description: "Use this call to obtain a report of the elapsed EVIR-reported mileage for assets in the system or a specific asset for a specified time range",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360000926872-Mileage-Reporting",
		required: {
			action: "showstats",
			operation: "mileage",
			format: "xml",
			startyear: "(see documentation)",
			startmonth: "(see documentation)",
			startday: "(see documentation)",
			endyear: "(see documentation)",
			endmonth: "(see documentation)",
			endday: "(see documentation)"
		},
		optional: {
			logvers: "2",
			start: "(epoch timestamp)",
			end: "(epoch timestamp)",
			location: "(gtc location)",
			showactiveonly: "(true or false)",
			target: "(see documentation)",
			reqtype:"(tag, exsid, vin, dbid, fleet)",
			type: "(if using tag or fleet to target)"
		},
		returned: ["EVIR", "Assets", "GTC Reports"],
		returnedDetail: ['assetmileagelist', 'name','tag','vin','fleet','exsid','mileage','location','elapsed']
	},
	showexpireOperator: {
		name: "Expired Operators Report",
		description: "Returns a report of operator expiry information",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018299631-Expired-Operators-Report",
		required: {
			action: "showexpire",
			operation: "operator", 
			format: "xml",
			rpttype: "(date or operator)"
		},
		optional: {
			location: "(gtc location)",
			threshold: "Threshold to include expiry information in the report. A number of days. Expirations that will occur within the specified number of days are included. If not specified a threshold of 0 will be used.",
			target: "(Single driver to target. Must specify reqtype)",
			reqtype: "(dbid, cdl, empnum, tag)"
		},
		returned: ['Drivers/Operators', 'Expiry', 'GTC Reports'],
		returnedDetail: ["dbid", "fname", "lname", "cdl", "empnum", "location", "tag", "label", "expdate", "remainingdays"]
	},
	showexpireAsset: {
		name: "Expired Assets Report",
		description: "Use this request to create a report of assets with expirys that have or are about to expire.",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360016364731-Expired-Assets-Report",
		required: {
			action: "showexpire",
			operator: "asset",
			format: "xml",
			rpttype: "(date, value, assetdate, assetvalue)"
		},
		optional: {
			location: "(gtc location)",
			threshold: "(see documentation)",
			target: "(see documentation)",
			reqtype: "(tag, exsid, vin, dbid, fleet)",
			type: "(see documentation)",
			expdatetype: "(see documentation)"
		},
		returned: ["Assets", "Expiry", "GTC Reports"],
		returnedDetail: ["name", "vin", "fleet", "location", "tag", "label", "exp", "remaining", "expire"]
	},
	showexpireAux: {
		name: "Expired Aux Items Report",
		description: "Use this request to create reports of expiry information for the aux items in the system.",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360016152532-Expired-Aux-Items-Report",
		required: {
			action: "showexpire",
			operation: "aux",
			format: "xml",
			rpttype: "(see documentation)"
		},
		optional: {
			location: "(gtc location)",
			threshold: "(see documentation)",
			target: "(see documentation)",
			reqtype: "(see documentation)"
		},
		returned: ["Aux Info", "Expiry"],
		returnedDetail: ['dbid','label', 'tag', 'unit', 'auxtype', 'location', 'exp', 'currval', 'remaining']
	},
	showexpireExptypes: {
		name: "Get Expiry Types",
		description: "Use this request to get a list of the expiry types in the system",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360016153412-Get-Expiry-Types",
		required: {
			action: "showexpire",
			operation: "exptypes",
			format: "xml"
		},
		optional: {},
		returned: ["Expiry"],
		returnedDetail: ['exptype', 'dbid']
	},
	showopenShowoperators: {
		name: "Get Operators",
		description: "Returns a list of operators in the system",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018305331-Get-Operators",
		required: {
			action: "showopen",
			operation: "showoperators",
			format: "xml"
		},
		optional: {
			target: "Single operator to target. Must specify reqtype",
			reqtype: "(cdl, tagid, exsid, empnum)",
			location: "(gtc location)",
			status: "(active, revoked, all)",
			logvers: "(1,2,3,4,5)"
		},
		returned: ['Drivers/Operators', "Admin"],
		returnedDetail: ['fname', 'lname', 'id', 'email', 'location', 'tag', 'cdl', 'empnum', 'status','location', 'exsid', 'pin','cdlstate','customdata']
	},
	showopenInspconfig: {
		name: "Get Inspection Configs",
		description: "Use this call to retrieve a list of inspection configurations (types) from the account",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018134492-Get-Inspection-Configs",
		required: {
			action: "showopen",
			operation: "inspconfig",
			format: "xml"
		},
		optional: {},
		returned: ["EVIR"],
		returnedDetail: ['config', 'id', 'name', 'version', 'label']
	},
	showopenDefects: {
		name: "Get Defect Information",
		description: "Use this call to get information on defects. Defect information returned may be filtered on asset, repaired or unrepaired, severity of the defect and asset location.",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018135912-Get-Defect-Information",
		required: {
			action: "showopen",
			operation: "defects",
			format: "xml"
		},
		optional: {
			logvers: "2",
			reqtype: "(dbid, tagid, exsid, vin, fleet)",
			target: "(Single asset to target. Must specify reqtype",
			location: "(gtc location)",
			repair: "(yes, no, both)",
			critical: "(yes, no, both)",
			pending: "(yes, no, both)",
			start: "(epoch timestamp)",
			end: "(epoch timestamp)",
			tstype: "(insp, load, repair, pending)"

		},
		returned: ["EVIR"],
		returnedDetail: ['count', 'defect id', 'asset', 'asset id','exsid', 'zone', 'component','condition','ffd','inspid','timestamp','mileage','operator fname', 'operator lname', 'repair id','repair agent', 'repair date', 'repair orderno', 'repair note', 'pending date', 'vin' ]
	},		
	showopenAssettype: {
		name: "Asset Types",
		description: "Returns a list of asset types and subtypes in the system. All assets have a 'type' attribute. This attribute is encoded in the RFID asset tag and is used to control the inspection device behavior.",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360016412611-Asset-Types",
		required: {
			action: "showopen",
			operation: "assettype",
			format: "xml"
		},
		optional: {},
		returned: ["Assets", "Admin"],
		returnedDetail: ['assettypelist', 'type id', 'subtype id']
	},
	showstatsInsp: {
		name: "Inspection Statistics",
		description: "Use this call to return inspection statistics information from the system. Counts of inspections, defects and asset operational status is included.",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018411511-Inspection-Statistics",
		required: {
			action: "showstats",
			operation: "insp",
			format: "xml"
		},
		optional: {
			start: "(epoch timestamp)",
			end: "(epoch timestamp)",
			location: "(gtc location)",
			config: "(inspection configuration name)"
		},
		returned: ["EVIR"],
		returnedDetail: ['insp', 'assets', 'defects', 'assetdefects']
	},
	adminassetsEdit: {
		name: "Edit an Asset",
		description: "Modify an existing asset object. New values for any asset attributes may be assigned to the asset.",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360016196312-Edit-an-Asset",
		required: {
			action: "adminassets",
			operation: "edit",
			format: "xml",
			target: "(The asset to modify. A reqtype must be specified)",
			reqtype: "(tag, exsid, vin, dbid, fleet)",
			type: "(Required if using reqtype=tag or fleet)",
			fleet: "(Asset No in GTC)",
			newtype: "",
			location: ""
		},
		optional: {
			name: "(License plate number)",
			vin: "(see documentation)",
			exsid: "(see documentation)",
			inservice: "(see documentation)",
			tagid: "(see documentation)",
			mfg: "(see documentation)",
			mileoffset: "(see documentation)",
			engine_hour_offest: "(see documentation)",
			status: "(see documentation)",
			radioaddress: "(see documentation)",
			subtype: "(see documentation)",
			homeloi: "(see documentation)",
			odometer_offset: "(see documentation)",
			start: "(see documentation)"
		},
		returned: ["Assets", "Edit", "Admin"],
		returnedDetail: ['Success or Error Message']
	},
	showpositionMileage: {
		name: "GPS Mileage Report",
		description: "This call returns a list of distances traveled by assets that meet the given filter restrictions. ",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360000926772-GPS-Mileage-Report",
		required: {
			action: "showposition",
			operation: "mileage",
			format: "xml",
			fromdate: "(epoch timestamp)",
			todate: "(epoch timestamp)"
		},
		optional: {
			target: "(Single asset to target. Must specify reqtype)",
			reqtype: "(tag, exsid, vin, dbid, fleet)",
			type: "(see documentation)",
			LOI_location: "(see documentation)",
			LOI_category: "(see documentation)"
		},
		returned: ["Assets", "GTC Reports"],
		returnedDetail: ['version', 'count', 'total', 'start', 'end', 'unit', 'tag', 'fleet', 'type','asset id', 'from', 'to', 'name', 'distance']
	},
	showpositionIdleStopTotals: {
		name: "GPS Total Stop Report",
		description: "This call returns a list of idle/stop times for assets that meet the given filter restrictions. ",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360016418051-GPS-Idle-Stop-Report",
		required: {
			action: "showposition",
			operation: "idlestoptotals",
			format: "xml",
			fromdate: "(epoch timestamp)",
			todate: "(epoch timestamp)"
		},
		optional: {
			target: "(Single asset to target. Must specify reqtype)",
			reqtype: "(see documentation)",
			type: "(see documentation)",
			loiinclude: "(see documentation)",
			loilocation: "(see documentation)",
			idletimecomp: "(see documentation)",
			idletime: "(see documentation)",
			tstype: "(see documentation)"
		},
		returned: ['Assets', 'GTC Reports', 'Idle'],
		returnedDetail: ['version', 'count', 'start', 'end', 'tag', 'fleet', 'type', 'asset id', 'asset exsid', 'idlecount' ,'time' ,'longlat', 'totalidle', 'stopcount', 'time', 'latlong', 'totalstop']
	},
	showpositionIdleStopAllIdle: {
		name: "GPS All Idle Report",
		description: "This call returns a list of idle times for assets that meet the given filter restrictions. ",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360016418051-GPS-Idle-Stop-Report",
		required: {
			action: "showposition",
			operation: "idlestopallidle",
			format: "xml",
			fromdate: "(epoch timestamp)",
			todate: "(epoch timestamp)"
		},
		optional: {
			target: "(Single asset to target. Must specify reqtype)",
			reqtype: "(see documentation)",
			type: "(see documentation)",
			loiinclude: "(see documentation)",
			loilocation: "(see documentation)",
			idletimecomp: "(see documentation)",
			idletime: "(see documentation)",
			tstype: "(see documentation)"
		},
		returned: ['Assets', 'GTC Reports', 'Idle'],
		returnedDetail: ['version', 'count', 'start', 'end', 'tag', 'fleet', 'type', 'asset id', 'asset exsid', 'idlecount' ,'time' ,'longlat', 'totalidle', 'stopcount', 'time', 'latlong', 'totalstop']
	},
	showpositionIdleStopAllStop: {
		name: "GPS All Stop Report",
		description: "This call returns a list of all stop time for assets that meet the given filter restrictions. ",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360016418051-GPS-Idle-Stop-Report",
		required: {
			action: "showposition",
			operation: "idlestopallstop",
			format: "xml",
			fromdate: "(epoch timestamp)",
			todate: "(epoch timestamp)"
		},
		optional: {
			target: "(Single asset to target. Must specify reqtype)",
			reqtype: "(see documentation)",
			type: "(see documentation)",
			loiinclude: "(see documentation)",
			loilocation: "(see documentation)",
			idletimecomp: "(see documentation)",
			idletime: "(see documentation)",
			tstype: "(see documentation)"
		},
		returned: ['Assets', 'GTC Reports'],
		returnedDetail: ['version', 'count', 'start', 'end', 'tag', 'fleet', 'type', 'asset id', 'asset exsid', 'idlecount' ,'time' ,'longlat', 'totalidle', 'stopcount', 'time', 'latlong', 'totalstop']
	},
	exportPath: {
		name: "Export Path",
		description: "Use this call to export a GPS path object for a specified target. Data is returned as either standard KML log file or binary GPS log file.",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360016205232-Export-a-Path",
		required: {
			action: "showposition",
			operation: "path",
			format: "(xml, json, csv, kml, binary)",
			version: "2",
			logvers: "3-3.8 (see documentation)",
			starttime: "(epoch timestamp)",
			endtime: "(epoch timestamp)"
		},
		optional: {
			target: "(Single asset to target. Must specify reqtype)",
			reqtype: "(tag, exsid, vin, dbid, fleet)",
			type: "(see documentation)",
			tstype: "(log, load)",
			tsformat: "(iso8601, epoch)",
			revgeocode: "(true or false)",
			location: "(gtc location)",
			bbox: "(see documentation)",
			standard: "(0,1)",
			sc1: "(0,1)",
			sc2: "(0,1)",
			sc3: "(0,1)",
			sc4: "(0,1)",
			sc5: "(0,1)",
			motionstart: "(0,1)",
			motionstop: "(0,1)",
			panic: "(0,1)",
			fence: "(0,1)",
			coldstart: "(0,1)",
			poweron: "(0,1)",
			poweroff: "(0,1)"
		},
		returned: ["Assets", "Path", "GTC Reports"],
		returnedDetail: ['id', 'lat', 'long', 'time', 'speed', 'heading', 'reasons', 'distance_traveled', 'odometer', 'loadts', 'accel', 'status', 'fuel_counter', 'fuel_units', 'address', 'source']
	},
	currentLocation: {
		name: "Current Location",
		description: "Use this call to export the last location of one or more assets",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018366892-Current-Location",
		required: {
			action: "showposition",
			operation: "current",
			format: "(xml, kml, binary)",
			version: "2",
			logvers: "2-3.7 (see documentation)"
		},
		optional: {
			target: "(Single asset to target. Must specify reqtype)",
			reqtype: "(tag, exsid, vin, dbid, fleet)",
			type: "(see documentation)",
			count: "(see documentation)",
			sortfield: "(fleet, lasttime, speed, poweron)",
			sortdir: "(asc, desc)",
			startrow: "(see documentation)",
			power: "on",
			loilocation: "(see documentation)",
			loifilter: "(see documentation)",
			loicatfilter: "(see documentation)",
			include_loi: "(see documentation)",
			locname: "(see documentation)",
			ztrak: "(see documentation)"

		},
		returned: ["Assets", "GTC Reports"],
		returnedDetail: ["tagid","fleet", "type", "long", "lat", "time", "heading", "speed", "unit(speed)", "power", "loi_distance", "name(loi_distance)", "unit(loi_distance", "inside(loi_distance", "odometer", "odo_offset", "address", "source", "fuel_counter", "unit(fuel_counter)", "fuel_level_pct", "avg_rpm"]
	},
	speedReport: {
		name: "Speed Report",
		description: "Returns a list of the maximum speeds for asset(s) within a specified time range and optionally a specific location of interest. A single asset may be specified or information may be retrieved for all assets.",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018656051-Speed-Report",
		required: {
			action: "showposition",
			operation: "speed",
			format: "(xml, json)",
			fromdate: "(epoch timestamp)",
			todate: "(epoch timestamp)",

		},
		optional: {
			logvers: "(1, 2)",
			target: "(asset to target. must include reqtype)",
			reqtype: "(tag, exsid, vin, dbid, fleet)",
			type: "(required if using 'tag' or 'fleet' reqtype)",
			loilocation: "(see documentation)",
			getfive: "(see documentation)"

		},
		returned: ["Assets", "GTC Reports"],
		returnedDetail: ["version","count", "start", "end", "maxts", "assetevents", "fleet", "id(asset)", "lat", "long", "heading", "unit", "dt", "speed", "power"]
	},
	inspectionData: {
		name: "Inspection Data",
		description: "Use this to retrieve a list of the inspection data values from inspections within specified parameters.",
		link: "https://support.zonarsystems.com/api-manual-documents/28-1-request-data",
		required: {
			action: "showopen",
			operation: "inspdata",
			format: "xml"
		},
		optional: {
			logvers: "(1, 2, 3)",
			location: "(gtc location)",
			start: "(epoch timestamp)",
			end: "(epoch timestamp)",
			tstype: "(insp, load)"
		},
		returned: ["EVIR"],
		returnedDetail: ["version","count","start", "end", "id", "timestamp", "stat", "fleet", "operator", "optag", "loadlocation", "extractor", "assetid", "opid", "assetvalue", "cfglabel", "loadtime", "sn", "name", "type", "insp_zone_name"]
	},
	assetActivity: {
		name: "Asset Activity",
		description: "Use this to get information on assets that have moved within a specified time period. For example to find assets that have been used over a weekend",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018371852-Asset-Activity",
		required: {
			action: "showposition",
			operation: "assetactivity",
			format: "xml",
			start: "(epoch timestamp)",
			end: "(epoch timestamp)"
		},
		optional: {
			target: "(Single asset to target. must include reqtype)",
			reqtype: "(tag, exsid, vin, dbid, fleet)",
			type: "(see documentation)"
		},
		returned: ["Assets", "GTC Reports"],
		returnedDetail: ["version","count", "start", "end", "tag", "fleet", "type", "assetid", "unit", "actstart", "actend", "distance"]
	},
	addZone: {
		name: "Add a Zone",
		description: "Use this call to add a zone.",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360017982452-Add-a-Location-of-Interest-LOI-GPS-Zone",
		required: {
			action: "editposition",
			operation: "add",
			format: "xml"
		},
		optional: {
			category: "(see documentation)",
			address: "(see documentation)",
			lat: "(see documentation)",
			long: "(see documentation)",
			radius: "(see documentation)",
			geometry: "(see documentation)",
			logvers: "(1, 2)"
		},
		returned: ["Zones", "Add", "Admin"],
		returnedDetail: ["Success or Error Message"]
	},
	editZone: {
		name: "Edit a Zone",
		description: "Use this call to edit an existing zone.",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360017983312-Edit-a-Location-of-Interest-GPS-Zone",
		required: {
			action: "editposition",
			operation: "edit",
			target: "(zone name)",
			format: "xml",
			name: "(intended name change)"
		},
		optional: {
			logvers: "(1, 2)",
			reqtype: "(name, dbid)",
			category: "(see documentation)",
			lat: "(see documentation)",
			long: "(see documentation)",
			radius: "(see documentation)",
			geometry: "(see documentation)"
		},
		returned: ["Zones", "Edit", "Admin"],
		returnedDetail: ["Success or Error Message"]
	},
	deleteZone: {
		name: "Delete a Zone",
		description: "Use this call to delete a zone from the account.",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360017986332-Delete-a-Location-of-Interest-GPS-Zone",
		required: {
			action: "editposition",
			operation: "delete",
			target: "(name of the zone)",
			format: "xml"
		},
		optional: {},
		returned: ["Zones", "Delete", "Admin"],
		returnedDetail: ["Success or Error Message"]
	},
	listZones: {
		name: "List Zones",
		description: "List all the zones in an account.",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018260131-List-Location-of-Interest-GPS-Zone",
		required: {
			action: "editposition",
			operation: "list",
			format: "(xml or csv)"
		},
		optional: {
			target: "(see documentation)",
			category: "(see documentation)",
		},
		returned: ["Zones", "List", "Admin"],
		returnedDetail: ["loilist","loi", "name", "category", "geometry"]
	},
	addOperator: {
		name: "Add a Driver (Operator)",
		description: "Add a new driver to an account.",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018032392-Add-an-Operator-Driver-",
		required: {
			action: "adminoperators",
			operation: "add",
			format: "xml",
			fname: "(first name)",
			lname: "(last name)",
			location: "(GTC location)",
			pin: "(4 digits)"
		},
		optional: {
			logvers: "2",
			tag: "(operator's tag id)",
			empnum: "(employee number)",
			cdl: "(CDL number)",
			exsid: "(external system identifier)"
		},
		returned: ["Drivers/Operators", "Add", "Admin"],
		returnedDetail: ["Success or Error Message"]
	},
	editOperator: {
		name: "Edit a Driver (Operator)",
		description: "Edit an existing driver in an account.",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018306211-Edit-an-Existing-Operator-Driver-",
		required: {
			action: "adminoperators",
			operation: "edit",
			format: "xml", 
			target: "(driver to edit. must specify reqtype)",
			reqtype: "(tag or exsid)",
			fname: "(first name)",
			lname: "(last name)",
			location: "(GTC location)",
			pin: "(4 digits)"
		},
		optional: {
			empnum: "(employee number)",
			cdl: "(cdl number)",
			exsid: "(external system identifier)",
			tag: "(operator tag id)"
		},
		returned: ["Drivers/Operators", "Edit", "Admin"],
		returnedDetail: ["Success or Error Message"]
	},
	scheduleReport: {
		name: "Schedule Report",
		description: "Returns a schedule report of what locations of interest have been intersected by assets. Data is returned in either CSV or XML format.",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018372852-GPS-Schedule-Report",
		required: {
			action: "showposition",
			operation: "schedule",
			format: "(xml, csv)",
			starttime: "(epoch timestamp)",
			endtime: "(epoch timestamp)",
			reporttype: "(1, 2)",
			target: "(see documentation)",
			reqtype: "(tag, exsid, vin, dbid, fleet, name)",
			type: "(see documentation)"

		},
		optional: {
			logvers: "(see documentation)"
		},
		returned: ["Assets", "GTC Reports"],
		returnedDetail: ["schedulelist","loiintersect", "loi", "asset", "in", "out", "schedulelist", "exsid", "tagid"]
	},
	reverseGeocode: {
		name: "Reverse Geocode",
		description: "Use this to find the address from lat/long coordinates.",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018382112-Find-Nearest-Address-Reverse-Geocode-",
		required: {
			action: "showposition",
			operation: "revgeocode",
			format: "xml",
			long: "(longitude)",
			lat: "(latitude)"
		},
		optional: {},
		returned: ["Geocode"],
		returnedDetail: ["long","lat", "distance", "distance_unit", "road", "number", "zip", "country", "state", "county"]
	},
	editOperatorStatus: {
		name: "Edit Driver (Operator) Status",
		description: "Use this to change a driver from active to inactive, or vice versa.",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018033472-Edit-Operator-Status",
		required: {
			action: "adminoperators",
			operation: "edistatus",
			format: "xml",
			target: "(driver to target)",
			reqtype: "(tag, exsid)",
			status: "(1, 2)",
			comment: "(see documentation)"
		},
		optional: {},
		returned: ["Drivers/Operators", "Edit", "Admin"],
		returnedDetail: ["Success or Error Message"]
	},
	addZoneCategory: {
		name: "Add a Zone Category",
		description: "Use this call to add a new zone category to an account.",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018260251-Manage-LOI-Categories",
		required: {
			action: "editposition",
			operation: "add",
			format: "xml",
			name: "(name for new category)",
			isvisible: "(true or false)"
		},
		optional: {},
		returned: ["Zones", "Add", "Admin"],
		returnedDetail: ["Success or Error Message"]
	},
	deleteZoneCategory: {
		name: "Delete a Zone Category",
		description: "Use this call to delete a zone category from an account.",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018260251-Manage-LOI-Categories",
		required: {
			action: "editposition",
			operation: "deleteloicategories",
			format: "xml",
			target: "(name of zone category to target)"
		},
		optional: {},
		returned: ["Zones", "Delete", "Admin"],
		returnedDetail: ["Success or Error Message"]
	},
	editZoneCategory: {
		name: "Edit a Zone Category",
		description: "Use this call to edit an existing zone category.",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018260251-Manage-LOI-Categories",
		required: {
			action: "editposition",
			operation: "editloicategories",
			format: "xml",
			target: "(name of the zone category to target)",
			name: "(new name to give)",
			isvisible: "(true or false)"
		},
		optional: {},
		returned: ["Zones", "Edit", "Admin"],
		returnedDetail: ["Success or Error Message"]
	},
	listZoneCategories: {
		name: "List Zone Categories",
		description: "Use this call to list all the zone categories in an account. ",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018260251-Manage-LOI-Categories",
		required: {
			action: "editposition",
			operation: "loicategories",
			format: "xml"
		},
		optional: {},
		returned: ["Zones", "List", "Admin"],
		returnedDetail: ["Zones"]
	},
	auditReport: {
		name: "Export Audit Report",
		description: "",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018372912-Export-Audit-Report",
		required: {
			action: "showposition",
			operation: "audit",
			format: "xml",
			starttime: "(epoch timestamp)",
			endtime: "(epoch timestamp)",
			target: "(asset to query)",
			reqtype: "(tag, exsid, vin, dbid, fleet)"
		},
		optional: {
			filter: "(over or under, use with filtertime)",
			filtertime: "(number of seconds)",
			loilocations: "(zone locations to filter against)"
		},
		returned: ["Assets", "GTC Reports", "Idle"],
		returnedDetail: ["tagid","fleet", "id", "type", "date", "zone", "distance", "unit", "idle", "stop", "travel", "average_speed", "unit", "max_speed", "unit", "duration", "elapsed", "odometer", "unit"]
	},
	listZPassEvents: {
		name: "List Z Pass Events",
		description: "Use this call to see all the student, rider, personnel zpass events.",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360017980912-List-Personnel-Z-Pass-Ridership-Events",
		required: {
			action: "showevents",
			operation: "list",
			format: "xml",
			version: "2"
		},
		optional: {
			cardtype: "(student, driver, or both)",
			location: "(gtc location)",
			start: "(epoch timestamp)",
			end: "(epoch timestamp)",
			target: "(Single asset to target. Must specify reqtype)",
			reqtype: "(tag, exsid, vin, dbid, fleet)",
			type: "(see documentation)",
			perstarget: "(see documentation)",
			tstype: "(log, load)",
			logvers: "(1, 2, 3)"
		},
		returned: ["Z Pass", "List", "GTC Reports"],
		returnedDetail: ["version","count", "timestamp", "sn", "type", "latlong", "loiname", "Asset", "fleet", "assettag", "exsid", "assettype", "tagid", "ptype", "fname", "lname", "exsid"]
	},
	genData: {
		name: "GenData",
		description: "This call can return generic data (gendata) from the GPS device.",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018255551-Generic-Data",
		required: {
			action: "showopen",
			operation: "gendata",
			format: "xml",
			version: "2"
		},
		optional: {
			location: "(gtc locaton)",
			start: "(epoch timestamp)",
			end: "(epoch timestamp)",
			tstype: "(see documentation)",
			label: "(see documentation)",
			target: "(Single asset to target. Must specify reqtype)",
			reqtype:"(tag, exsid, vin, dbid, fleet)",
		},
		returned: ["GenData", "Assets"],
		returnedDetail: ["version","count", "ctimestamp", "ltimestamp", "fleet", "assettag", "exsid", "assettype", "assetid", "sn", "label", "type"]
	},
	editAssetStatus: {
		name: "Edit Asset Status",
		description: "Use this to change the status of an asset. Active assets may be set to an inactive or revoked status, or inactive assets may be returned to an active status.",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360016410891-Edit-Asset-Status",
		required: {
			action: "adminassets",
			operation: "editstatus",
			format: "xml",
			target: "(Single asset to target. Must specify reqtype)",
			reqtype: "(exsid, tag)",
			status: "(1, 2)"
		},
		optional: {},
		returned: ["Assets", "Edit", "Admin"],
		returnedDetail: ["Success or Error Message"]
	},
	editAssetGPS: {
		name: "Edit Asset GPS Units",
		description: "Use this to add, edit or delete the GPS Unit of an asset.",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360016197232-Edit-Asset-GPS-Units",
		required: {
			action: "adminassets",
			operation: "editgps",
			format: "xml",
			target: "(Single asset to target. Must specify reqtype)",
			reqtype: "(exsid, tag)",
			gpsunit: "(See documentation)"
		},
		optional: {},
		returned: ["Assets", "Edit", "GPS", "Admin"],
		returnedDetail: ["Success or Error Message"]
	},
	getGPSunits: {
		name: "Get GPS Units",
		description: "Returns a list of GPS units in the system.",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360016197712-Get-GPS-Units",
		required: {
			action: "showopen",
			operation: "showgps",
			format: "xml"
		},
		optional: {
			target: "(Single gps unit to target. Must specify reqtype)",
			reqtype: "(id, gpssn)",
			filter: "(1, 2, 3)"
		},
		returned: ["List", "GPS", "GTC Reports"],
		returnedDetail: ["gps","id", "lastinsdate", "sn", "asset", "id", "exsid", "tag", "lastpositiondate", "firmware", "scid", "lastcallhome"]
	},
	getGPSphoneHome: {
		name: "Get GPS Phone Homes",
		description: "Returns packet messages from gps units",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018661751-Get-GPS-Phone-Home",
		required: {
			action: "showopen",
			operation: "getphonehome",
			format: "xml",
			startdate: "(epoch timestamp)",
			enddate: "(epoch timestamp)"
		},
		optional: {
			target: "(Single asset to target. Must specify reqtype and type)",
			reqtype: "(tag, exsid, vin, dbid, fleet)",
			type: "(see documentation)"
		},
		returned: ["Assets", "GPS", "List", "GTC Reports"],
		returnedDetail: ["tagid","fleet", "id", "exsid", "type", "scid", "fwver", "uploc", "logvers", "gpssn", "timestamp"]
	},
	getResourceAttributes: {
		name: "Get Resource Attributes",
		description: "Returns a list of Resource Attributes",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018138172-Get-Resource-Attributes",
		required: {
			action: "adminattributes",
			operation: "list",
			format: "(xml or json)"
		},
		optional: {},
		returned: ["Attributes", "List", "Admin"],
		returnedDetail: ["attributelist","attribute", "attribute id", "attribute name"]
	},
	addReourceAttributes: {
		name: "Add Attributes",
		description: "Used to add resource attributes.",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018414551-Add-Resource-Attributes",
		required: {
			action: "adminattributes",
			operation: "add",
			format: "(xml or json)",
			aname: "(attribute name to use)"
		},
		optional: {
			pid: "(see documentation)",
			logvers: "(1, 2)",
		},
		returned: ["Attributes", "Add", "Admin"],
		returnedDetail: ["Success or Error Message"]
	},
	editResourceAttributes: {
		name: "Edit Attributes",
		description: "Used to edit resource attributes.",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018502411-Edit-Resource-Attributes",
		required: {
			action: "adminattributes",
			operation: "edit",
			format: "(xml or json)",
			target: "(resource attribute id)",
			aname: "(attribute name to use)"
		},
		optional: {
			pid: "(see documentation)"
		},
		returned: ["Attributes", "Edit", "Admin"],
		returnedDetail: ["Success or Error Message"]
	},
	deleteResourceAttributes: {
		name: "Delete Attributes",
		description: "Used to delete resource attributes.",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018232452-Delete-Resource-Attributes",
		required: {
			action: "adminattributes",
			operation: "delete",
			format: "(xml or json)",
			target: "(resource attribute id)"
		},
		optional: {
			force: "(see documentation)"
		},
		returned: ["Attributes", "Delete", "Admin"],
		returnedDetail: ["Success or Error Message"]
	},
	adminListResourceAttributeAssignments: {
		name: "List Attribute Assignments",
		description: "Returns a list of Resource Attribute Assignments.",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018232932-Admin-List-Resource-Attribute-Assignments",
		required: {
			action: "adminattributeassign",
			operation: "list",
			format: "(xml or json)"
		},
		optional: {
			target: "(see documentation)",
			type: "(see documentation)",
		},
		returned: ["Attributes", "List", "Admin"],
		returnedDetail: ["attributeassignlist","assignment", "rtypeid", "aid", "rid", "endpoint"]
	},
	adminAddResourceAttributeAssignments: {
		name: "Add Attribute Assignments",
		description: "Used to assign attributes.",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018233152-Admin-Add-Resource-Attributes-Assignments",
		required: {
			action: "adminattributeassign",
			operation: "add",
			format: "(xml or json)",
			rtypeid: "(see documentation)",
			aid: "(see documentation)",
			rid: "(see documentation)"
		},
		optional: {},
		returned: ["Attributes", "Add", "Admin"],
		returnedDetail: ["Success or Error Message"]
	},
	adminDeleteResourceAttributeAssignments: {
		name: "Delete  Attribute Assignments",
		description: "Used to delete resource attributes assignments",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018503271-Admin-Delete-Resource-Attribute-Assignments",
		required: {
			action: "adminattributeassign",
			operation: "delete",
			format: "(xml or json)",
			target: "(see documentation)"
		},
		optional: {},
		returned: ["Attributes", "Delete", "Admin"],
		returnedDetail: ["Success or Error Message"]
	},
	getAttributeFilters: {
		name: "Get Attributes Filters",
		description: "Returns a list of Attribute Filters",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018233572-Get-Attribute-Filters",
		required: {
			action: "attributefilters",
			operation: "list",
			format: "(xml or json)"
		},
		optional: {},
		returned: ["List", "Attributes", "Admin"],
		returnedDetail: ["attributefilterlist","attributefilter id", "id", "filtername", "userid", "rtypes", "rtype id", "attributes", "attribute id", "pubcheck"]
	},
	addAttributeFilters: {
		name: "Add Attributes Filters",
		description: "Used to add resource attribute filters",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018233672-Add-Attribute-Filters",
		required: {
			action: "attributefilters",
			operation: "add",
			format: "(xml or json)",
			aid: "(see documentation)",
			name: "(see documentation)"
		},
		optional: {
			rid: "(see documentation)",
			pub: "(see documentation)",
		},
		returned: ["Add", "Attributes", "Admin"],
		returnedDetail: ["Success or Error Message"]
	},
	editAttributeFilters: {
		name: "Edit Attribute Filters",
		description: "Used to edit resource attribute filters.",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018233732-Edit-Attribute-Filters",
		required: {
			action: "attributefilters",
			operation: "edit",
			format: "(xml or json)",
			target: "(attribute filter id)",
			aid: "(see documentation)",
			name: "(see documentation)"
		},
		optional: {
			rid: "(see documentation)",
			pub: "(see documentation)",
		},
		returned: ["Edit", "Attributes", "Admin"],
		returnedDetail: ["Success or Error Message"]
	},
	deleteAttributeFilters: {
		name: "Delete Attribute Filters",
		description: "Used to delete resource attribute filters",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018504371-Delete-Attribute-Filters",
		required: {
			action: "attributefilters",
			operation: "delete",
			format: "(xml or json)",
			target: "(attribute filter id)"
		},
		optional: {},
		returned: ["Delete", "Attributes", "Admin"],
		returnedDetail: ["Success or Error Message"]
	},
	pathSummary: {
		name: "Path Summary",
		description: "Use this to get path summary information for assets that have moved within a specified time period. For example to find assets that have been used over a weekend",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018670491-Path-Summary",
		required: {
			action: "showposition",
			operation: "pathsummary",
			format: "(xml or json)",
			starttime: "(epoch timestamp)",
			endtime: "(epoch timestamp)"
		},
		optional: {
			target: "(Single asset to target. Must specify reqtype)",
			reqtype: "(tag, exsid, vin, dbid, fleet)",
		},
		returned: ["Assets", "Path", "GTC Reports", "Idle"],
		returnedDetail: ["version","id", "fleet", "exsid", "lat", "lon", "zone", "start", "end", "odometer", "min", "max", "max_speed", "max_idle", "max_stop"]
	},
	addLocation: {
		name: "Add a Location",
		description: "This function is used to add location objects to the system",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018234432-Add-Location",
		required: {
			action: "adminlocations",
			operation: "add",
			format: "xml",
			name: "(location name)"
		},
		optional: {
			active: "(true or false)"
		},
		returned: ["GTC Location", "Add", "Admin"],
		returnedDetail: ["Success or Error Message"]
	},
	editLocation: {
		name: "Edit a Location",
		description: "Modify an existing location object.",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018362252-Edit-Location",
		required: {
			action: "adminlocations",
			operation: "edit",
			format: "xml",
			target: "(Single location name to target)",
			name: "(new name of location)"
		},
		optional: {
			active: "(true or false)"
		},
		returned: ["GTC Location", "Edit", "Admin"],
		returnedDetail: ["Success or Error Message"]
	},
	forwardGeocode: {
		name: "Forward Geocode",
		description: "Returns the nearest point to a given address of interest (specified as address, locality, district, zipcode). This call may be broken. ",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018382392-Find-Nearest-Point-Forward-Geocode-",
		required: {
			action: "showposition",
			operation: "forwardgeocode",
			format: "(xml or json)",
			address: "(street name)",
			locality: "(city)",
			district: "(state)",
			zipcode: "(zipcode)"
		},
		optional: {
			external_id: "(see documentation)"
		},
		returned: ["Geocode"],
		returnedDetail: ["exernal_id","latitude","longitude", "altitude", "confidence"]
	},
	jbusTripReport: {
		name: "JBus Trip Report",
		description: "Returns JBus trip report data and accumulated totals over a given period of time",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018381912-Jbus-Trip-Report",
		required: {
			action: "showopen",
			operation: "jbustrip",
			format: "xml",
			start: "(epoch timestamp)",
			end: "(epoch timestamp)"
		},
		optional: {
			target: "(Single asset to target. Must include reqtype)",
			reqtype: "(tag, exsid, vin, dbid, fleet)",
			type: "(see documentation)",
			logvers: "(1, 2)"
		},
		returned: ["Assets", "JBUS", "GTC Reports", "Idle"],
		returnedDetail: ["count","ver", "trip id", "asset id", "asset fleet", "asset exsid", "start", "end", "fuel", "pto_fuel", "idle_fuel", "miles", "mpg", "engine_hours", "pto_hours", "fuel_total", "idle_fuel_total", "pto_fuel_total", "odometer", "odometer_unit", "engine_hours_total", "pto_hours_total"]
	},
	inspectionTimecard: {
		name: "Inspection Timecard",
		description: "This call is used to return inspection information for a specified inspection that occur within a specified time period. You can filter results based on inspection status and location",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018134972-Inspection-Timecard",
		required: {
			action: "showopen",
			operation: "insptimecard",
			format: "xml",
			start: "(epoch timestamp)",
			end: "(epoch timestamp)",
			cfg: "(see documentation)",
			version: "2",
			tstype: "(insp or load)",
			status: "(red, yellow, green, all, bad)"
		},
		optional: {
			location: "(gtc location)"
		},
		returned: ["EVIR"],
		returnedDetail: ["insplist","id", "timestamp", "stat", "fleet", "operator", "optag", "repair", "loadlocation", "starttime", "endtime", "extractor", "config", "manual", "verified", "assetid", "opid", "defect", "assetvalue", "cfglabel", "loadtime", "sn", "asset_exsid", "operator_exsid"]
	},
	addUser: {
		name: "Add a User",
		description: "This API call is used to add a user to an account",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018034432-Add-User",
		required: {
			action: "adminusers",
			operation: "add",
			format: "xml",
			uname: "(username)",
			fname: "(first name)",
			lname: "(last name)",
			role: "(gtc role)",
			upassword: "(user password)",
			location: "(user gtc location)",
			isactive: "(true or false)",
			timezone: "(see documentation)",
			displaycount: "(gtc display count)"
		},
		optional: {
			email: "(user email address)",
			attrfilter: "(gtc attribute filter)",
		},
		returned: ["GTC Users", "Add", "Admin"],
		returnedDetail: ["Success or Error Message"]
	},
	editUser: {
		name: "Edit User",
		description: "This API call is used to edit a user in an account",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018362772-Edit-User",
		required: {
			action: "adminusers",
			operation: "edit",
			format: "xml",
			edituserid: "(user db id)"
		},
		optional: {
			uname: "(username)",
			fname: "(first name)",
			lname: "(last name)",
			role: "(gtc role)",
			upassword: "(user password)",
			location: "(gtc location)",
			isactive: "(boolean)",
			timezone: "(see documentation)",
			displaycount: "(gtc display count)",
			email: "(user email address)",
			attrfilter: "(gtc attribute filter)"
		},
		returned: ["GTC Users", "Edit", "Admin"],
		returnedDetail: ["Success or Error Message"]
	},
	deleteUser: {
		name: "Delete User",
		description: "This API call is used to deactivate a user for an account",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018362912-Delete-User",
		required: {
			action: "adminusers",
			operation: "delete",
			format: "xml",
			duserid: "(see documentation)"
		},
		optional: {},
		returned: ["GTC Users", "Delete", "Admin"],
		returnedDetail: ["Success or Error Message"]
	},
	listUsers: {
		name: "List Users",
		description: "This API call is used to list all users in an account filtered by location and active status",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018650831-List-User",
		required: {
			action: "adminusers",
			operation: "list",
			format: "xml"
		},
		optional: {
			locationid: "(see documentation)",
			showinactive: "(see documentation)",
		},
		returned: ["GTC Users", "List", "Admin"],
		returnedDetail: ["id","username", "fname", "lname", "role", "active", "location id", "location", "email"]
	},
	getUserRoles: {
		name: "Get User Roles",
		description: "This API call is used to return all user roles with name and id for an account.",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018363072-Get-User-Roles",
		required: {
			action: "adminusers",
			operation: "getroles",
			format: "xml"
		},
		optional: {},
		returned: ["GTC Users", "List", "Admin"],
		returnedDetail: ["id","role"]
	},
	getInspectionZones: {
		name: "Get Inspection Zones",
		description: "Returns a list of inspection zones.",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018412171-Get-Inspection-Zones",
		required: {
			action: "showopen",
			operation: "inspzones",
			format: "xml"
		},
		optional: {},
		returned: ["EVIR","List"],
		returnedDetail: ["inspzones","zone"]
	},
	getInspectionComponents: {
		name: "Get Inspection Components",
		description: "Returns a list of inspecton components.",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018412291-Get-Inspection-Components",
		required: {
			action: "showopen",
			operation: "inspcomponents",
			format: "xml"
		},
		optional: {},
		returned: ["EVIR", "List"],
		returnedDetail: ["inspcomponents","components"]
	},
	getInspectionConditions: {
		name: "Get Inspection Conditions",
		description: "Returns a list of inspecton conditions.",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018412371-Get-Inspection-Conditions",
		required: {
			action: "showopen",
			operation: "inspconditions",
			format: "xml"
		},
		optional: {},
		returned: ["EVIR", "List"],
		returnedDetail: ["inspconditions","conditions"]
	},
	hosEditedLogs: {
		name: "Hours of Service (HOS) Edited Logs",
		description: "This API call is used to retrieve edited logs for a single driver for a time period up to 7 days",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360016211152-HOS-Edited-Logs",
		required: {
			action: "adminhos",
			operation: "edits",
			format: "xml",
			version: "2",
			target: "(Single driver to target. Must specify reqtype)",
			reqtype: "(dbid, tag, exsid)",
			start: "(epoch timestamp)",
			end: "(epoch timestamp)"
		},
		optional: {},
		returned: ["Hours of Service (HOS)", "GTC Reports"],
		returnedDetail: ["edits","entry", "asset", "driver", "log", "id", "start", "status"]
	},
	hosLogViolations: {
		name: "Hours of Service (HOS) Log Violations",
		description: "This API call is used to retrieve HOS Log Violations for a given driver over a timeframe of up to one week",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018354892-HOS-Log-Violations",
		required: {
			action: "adminhos",
			operation: "logviolations",
			format: "xml",
			version: "2",
			target: "(Single drive to target. Must specify reqtype)",
			reqtype: "(dbid, tag, exsid)",
			start: "(epoch timestamp)",
			end: "(epoch timestamp)"
		},
		optional: {},
		returned: ["Hours of Service (HOS)", "GTC Reports"],
		returnedDetail: ["violations","entry", "duration", "start", "type"]
	},
	hosUnassignedDrivingTime: {
		name: "Hours of Service (HOS) Unassigned Driving Time",
		description: "This API call is used to retrieve unassigned driving time over a timeframe of up to one week",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360016424591-HOS-Unassigned-Driving-Time",
		required: {
			action: "adminhos",
			operation: "unassigned",
			format: "xml",
			version: "2",
			start: "(epoch timestamp)",
			end: "(epoch timestamp)"
		},
		optional: {},
		returned: ["Hours of Service (HOS)", "GTC Reports"],
		returnedDetail: ["unassigned","entry", "asset", "duration", "start"]
	},
	hosUnconfirmedLogs: {
		name: "Hours of Service (HOS) Unconfirmed Logs",
		description: "This API call is used to retrieve unconfirmed logs for a single driver for a time period up to 7 days",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018641491-HOS-Unconfirmed-Logs",
		required: {
			action: "adminhos",
			operation: "unconfirmed",
			format: "xml",
			version: "2",
			target: "(Single driver to target. Must specify reqtype)",
			reqtype: "(dbid, tag, exsid)"
		},
		optional: {},
		returned: ["Hours of Service (HOS)", "GTC Reports"],
		returnedDetail: ["unconfirmed","entry", "driver", "status", "timestamp"]
	},
	getVHOSlogs: {
		name: "Get VHOS Logs",
		description: "This API call is used to get VHOS logs.",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018641531-Get-VHOS-Logs",
		required: {
			action: "showopen",
			operation: "vhoslogs",
			format: "xml",
			start: "(epoch timestamp)",
			end: "(epoch timestamp)",
			count: "(number of records to return)"
		},
		optional: {},
		returned: ["Hours of Service (HOS)", "GTC Reports"],
		returnedDetail: ["VHOSlogs","LogDetail", "DriverId", "TractorNumber", "DriverExternalSystemId", "EventTimestamp", "EventStatusCode", "ExemptionCode", "PreviousEpoch", "Longitude", "Latitude", "Odometer"]
	},
	getVHOSpositions: {
		name: "Get VHOS Positions",
		description: "This API call is used to get VHOS positions.",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018361752-Get-VHOS-Positions",
		required: {
			action: "showopen",
			operation: "vhospositions",
			format: "xml"
		},
		optional: {},
		returned: ["Hours of Service (HOS)", "GTC Reports"],
		returnedDetail: ["VHOSPositions","PositionDetail", "PositionTimestamp", "TractorNumber", "Longitude", "Latitude", "Odometer", "Speed", "IgnitionStatus"]
	},
	ackVHOSlogs: {
		name: "Ack VHOS Logs",
		description: "This API call is used to Ack VHOS logs",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018650191-Ack-VHOS-Logs",
		required: {
			action: "showopen",
			operation: "vhoslogs",
			format: "xml",
			messageids: "(see documentation)"
		},
		optional: {},
		returned: ["Hours of Service (HOS)"],
		returnedDetail: ["success","action"]
	},
	sendMessage: {
		name: "Send FBM Message",
		description: "This call is used to send a message to a tablet device.",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360016211572-Send-Message",
		required: {
			action: "twentytwenty",
			operation: "sendmessage",
			format: "xml",
			version: "2",
			target: "(Single asset to target. Must specify a reqtype)",
			reqtype: "(tag, exsid, dbid)",
			type: "(see documentation)",
			form: "(see documentation)",
			data: "(see documentation)",
			provider: "(see documentation)",
			messagei: "(see documentation)"
		},
		optional: {
			timestamp: "(see documentation)",
			dataformat: "(see documentation)",
		},
		returned: ["FBM", "Tablet"],
		returnedDetail: ["Success or Error Message"]
	},
	getFormDefinitions: {
		name: "Get FBM Form Definitions",
		description: "Get definitions of form templates used for Form-Based-Messaging. The returned data of field names only includes HTML fields for some element types, which includes fields of types “input” and “textarea.”",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360016211772-Get-Form-Definitions",
		required: {
			action: "twentytwenty",
			operation: "getformdefinitions",
			sourcename: "(fbm provider)",
			direction: "(dispatcher, driver)"
		},
		optional: {
			extids: "(see documentation)"
		},
		returned: ["FBM", "Tablet"],
		returnedDetail: ["extid","name", "description", "field_names"]
	},
	getFormData: {
		name: "Get FBM Form Data",
		description: "Get the data sent in a Form-Based-Message from a driver.",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360016211852-Get-Form-Data",
		required: {
			action: "twentytwenty",
			operation: "getformdata",
			sourcename: "(see documentation)",
			extid: "(external id of form)",
			startepoch: "(epoch timestamp)",
			endepoch: "(epoch timestamp)"
		},
		optional: {},
		returned: ["FBM", "Tablet"],
		returnedDetail: ["mailbox_id","ts", "driver_id", "form_data"]
	},
	assetUsageData: {
		name: "Asset Usage Data",
		description: "Provides the last PTO, engine hours and odometer reading for a given asset for a given time range",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360019786292-Asset-Usage-Data",
		required: {
			action: "showopen",
			operation: "showusage",
			format: "xml",
			target: "(Single asset to target. Must specify reqtype)",
			reqtype: "(tag, exsid, vin, dbid, fleet)",
			starttime: "(epoch timestamp)",
			endtime: "(epoch timestamp)"
		},
		optional: {
			type: "(see documentation)",
			enginehoursversion: "2",
		},
		returned: ["Assets", "JBUS"],
		returnedDetail: ["showusage","asset", "id", "fleet", "odometer", "pto", "lastts", "enginehours", "accruedhours", "totalhours"]
	},
	hosSummaryELD: {
		name: "ELD Hours of Service (HOS) Summary",
		description: "This API call is used to return a summary of driver logs and the time left on each clock",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018835252-HOS-Summary-ELD",
		required: {
			action: "adminhos",
			operation: "eldhossummary",
			format: "xml",
			version: "2",
			target: "(Single driver to target. Must specify reqtype)",
			reqtype: "dbid"
		},
		optional: {},
		returned: ["ELD", "Hours of Service (HOS)"],
		returnedDetail: ["hossummary","driver", "entry", "start_epoch", "end_epoch", "cycle_available", "driving_available", "last_update", "miles", "on_duty_available", "off_duty_hours", "on_duty_driving_used", "on_duty_not_driving_used", "sleeper"]
	},
	getVHOSlogsELD: {
		name: "Get ELD VHOS Logs",
		description: "This API call is used to get all events (ELD and Zonar) for all drivers in the given account between the start time and end time.",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018839212-Get-VHOS-Logs-ELD",
		required: {
			action: "showopen",
			operation: "geteldlogs",
			format: "xml",
			start: "(epoch timestamp)",
			end: "(epoch timestamp)"
		},
		optional: {
			eventtypes: "(see documentation)",
			eventrecordorigins: "(see documentation)",
		},
		returned: ["ELD", "Hours of Service (HOS)"],
		returnedDetail: ["geteldlogs","Event", "DriverId", "TractorNumber", "DriverExternalSystemId", "EventID", "EventType", "Longitude", "Latitude", "TotalVehicleMiles", "TotalEngineHours", "AccumulatedVehicleMiles", "ElapsedEngineHours", "Records", "Record", "EventEpoch", "RecordID", "EventEditEpoch", "EventEditPersonID", "EventRecordOrigin", "EventRecordStatus", "EventCode", "DiagCode", "MalCode", "Location", "OdometerIsManual", "LocationIsManual", "ManualOdometer", "ManualLocation", "Notes"]
	},
	hosLogViolations3: {
		name: "Hours of Service (HOS) Log Violations",
		description: "This API call is used to retrieve HOS Log Violations for all drivers for the previous hour",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360018839312-HOS-Log-Violations-Version-3-",
		required: {
			action: "adminhos",
			operation: "logviolations",
			format: "xml",
			version: "3",
			start: "(see documentation)",
			end: "(see documentation)",
			duration: "(see documentation)"
		},
		optional: {
			target: "Single driver to target. Must specify reqtype)",
			reqtype: "dbid"
		},
		returned: ["ELD", "Hours of Service (HOS)"],
		returnedDetail: ["violations","entry", "name", "tagid", "exsid", "code", "start", "duration", "type", "asset"]
	},
	getOperatorELDdisplay: {
		name: "Get Operator ELD Display",
		description: "This API call is used to get the ELD operator’s daily summary",
		link: "https://support.zonarsystems.net/hc/en-us/articles/360019143871-Get-Operator-ELD-Display",
		required: {
			action: "adminhos",
			operation: "eldgetoperatordailysummary",
			format: "xml",
			daysrange: "(1-8)",
			version: "2"
		},
		optional: {},
		returned: ["ELD", "Hours of Service (HOS)"],
		returnedDetail: ["ELDOperatorDailySummary","entry", "driverID", "day", "rulesets", "assets", "asset", "powerUnitNumber", "tractorNumber", "coDrivers", "coDriver", "externalSystemId", "tagid", "loads", "load", "shippingDocumentNumber", "trailers", "trailer", "trailerNumber"]
	},
	getZPassPerson: {
		name: "Get ZPass Person",
		description: "This API provides the ability to query persons from the ZPass system",
		link: "#",
		required: {
			action: "adminzpass",
			operation: "getpersons",
			format: "xml",
			persontypeid: "(1 - Rider, 3 - Aid, 4 - Guardian"
		},
		optional: {
			includecustomtypes: "(true, false)",
		},
		returned: ["Z Pass", "List"],
		returnedDetail: ["persons","person", "typeid", "firstname", "lastname", "exsid", "cardnumber", "active", "group", "name", "customtype", "customtypes"]
	},
	aempFormat: {
		name: "AEMP Formatted Fleet Status Request",
		description: "This call is used to return the AEMP formatted fleet status for an account",
		link: "#",
		required: {
			action: "showposition",
			operation: "aemp",
			format: "xml",
			version: "2"
		},
		optional: {	
		},
		returned: ["AEMP", "List", "Assets"],
		returnedDetail: ["UnitInstallDateTime","Make", "Model", "EquipmentID", "SerialNumber", "Location", "Latitude", "Longitude", "Altitude", "CumulativeOperatingHours", "FuelUsed", "FuelUnits", "Distance", "Odometer", "OdometerUnits"]
	},
	gendataLabels: {
		name: "GenData Labels",
		description: "Use this to fetch a list of the generic data labels in the system.",
		link: "#",
		required: {
			action: "showopen",
			operation: "gendatalabels",
			format: "xml",
			version: "2"
		},
		optional: {
		},
		returned: ["GenData", "GPS"],
		returnedDetail: ["label","id"]
	},
	jbusEvents: {
		name: "JBus Events",
		description: "This OMI call is used to return information for JBus events.",
		link: "#",
		required: {
			action: "showopen",
			operation: "jbusevents",
			format: "xml",
			start: "(epoch timestamp)",
			end: "(epoch timestamp)",
			logvers: "3"
		},
		optional: {
			target: "(Single asset to target. Must specify reqtype",
			reqtype: "(tag, exsid, vin, dbid, fleet)",
			engine_only: "(true, false)",
			mil: "(1 - only mil, 0)",
			activeonly: "(1- only active faults, 0)",
			chkeng: "(1 - only include check engine events, 0)",
			stpeng: "(1 - only include stop engine events, 0)"

		},
		returned: ["JBUS", "Assets", "GTC Reports"],
		returnedDetail: ["assetid","fleet", "vin", "code", "subcode", "subcodetype", "desc", "fmi", "fmidesc", "status", "occurrence", "protocol", "lat", "long"]
	},
	postedSpeed: {
		name: "Posted Speed Summary Report",
		description: "Returns a list of the posted speed activity for asset(s) or asset/driver combinations within a specified time range and optionally a specific location of interest",
		link: "#",
		required: {
			action: "positionpostedspeed",
			operation: "postedspeed",
			format: "(xml, json)",
			from: "(epoch timestamp)",
			to: "(epoch timestamp)",
			version: "2"	
		},
		optional: {
			location: "(gtc location)",
			targetasset: "(asset dbid)",
			targetdriver: "(driver dbid)",
			showdetails: "(t - returns extra details)",
			threshold: "(minimum speed required over posted)",
			tstype: "(log, load)",
			usemetric: "(t - values in metric)",
			loicatid: "(zone category id - requires showdetails=t)",
			loiid: "(zone id - requires showdetails=1)"
		},
		returned: ["Assets", "GTC Reports"],
		returnedDetail: ["version","count", "start", "end", "loadtime", "unit", "isdetail", "assetid", "fleet", "driverid", "driver", "maxover", "maxoverts", "maxoverlat", "maxoverlon", "date", "drivetime", "speedtime", "speedpercent", "eventcount", "eventstart", "eventend", "duration", "max"]
	},			
	getManifest: {
		name: "Get Tablet Manifest",
		description: "This call is used to get the manifest of a tablet device",
		link: "#",
		required: {
			action: "twentytwenty",
			operation: "getmanifest",
			gpssn: "(single gps to target)",
			mobiledevicetypeid: "(1 - 2020, 2 - Connect)",
			format: "json"
		},
		optional: {
		},
		returned: ["Manifest", "Tablet"],
		returnedDetail: ["packageManifest","organization", "assetInfo", "deviceSettings"]
	},
	send2WayMessage: {
		name: "Send 2-Way Message",
		description: "Sends a messages through the 2-way message system",
		link: "#",
		required: {
			action: "adminmessage",
			operation: "createmessage",
			format: "xml",
			destappid: "20",
			type: "ascii",
			destgpsid: "(gpssn to target)",
			message: "(1:FFTB:1: - Force First Time Boot, 1:MANI:1: - Send Manifest, 1:CLRDC:1: - Clear Download Cache, 3:CLRFT:1: - Clear Forms Templates)"
		},
		optional: {
		},
		returned: ["Tablet", "2-Way"],
		returnedDetail: ["Success or Error Message"]
	},
	hosSummary: {
		name: "HOS Summary",
		description: "This call is used to retrieve HOS summary data for the current day as well as the previous 7 days.",
		link: "#",
		required: {
			action: "adminhos",
			operation: "hossummary",
			format: "xml",
			version: "2",
			target: "(specific driver to target. corresponds to reqtype value)",
			reqtype: "(dbid, tagid, exsid)"
		},
		optional: {
		},
		returned: ["Tablet", "Hours of Service (HOS)"],
		returnedDetail: ["hossummary", "driver", "empnum", "exsid", "id", "tagid", "cycle_available_today", "drive_hours_available", "end", "last_update", "miles", "off_duty_hours", "on_duty_hours", "on_duty_driving", "on_duty_not_driving", "sleeper", "start", "reset", "date"]
	},
	zPassAddStagedPerson: {
		name: "ZPass - Add Staged Person",
		description: "This API call stages ZPass persons into the ZPass system. This is the first step in the process of importing ZPass persons into the ZPass system",
		link: "#",
		required: {
			action: "adminzpass",
			operation: "addstagedpersons",
			format: "xml",
			fupload: "(CSV file that contains the person's data. You must use a POST request for this field.)",
			persontypeid: "(1-Rider, 3-Aide, 4-Guardian)"
		},
		optional: {
		},
		returned: ["Z Pass", "Add"],
		returnedDetail: ["Success or Error Message"]
	},
	zPassCommitStagedPerson: {
		name: "ZPass - Commit Staged Person",
		description: "This API call will commit (merge) ZPass persons into the ZPass system.",
		link: "#",
		required: {
			action: "adminzpass",
			operation: "commitstagedpersons",
			format: "xml",
			persontypeid: "(1-Rider, 3-Aide, 4-Guardian)"
		},
		optional: {
		},
		returned: ["Z Pass"],
		returnedDetail: ["Success or Error Message"]
	},
	zPassGetPersons: {
		name: "ZPass - Get Persons",
		description: "This API provides the ability to query persons from the ZPass system.",
		link: "#",
		required: {
			action: "adminzpass",
			operation: "getpersons",
			format: "xml",
			persontypeid: "(1-Rider, 3-Aide, 4-Guardian)"
		},
		optional: {
			includecustomtypes: "(boolean)"
		},
		returned: ["Z Pass"],
		returnedDetail: ["persons", "typeid", "firstname", "lastname", "exsid", "cardnumber", "id", "name", "customtypes"]
	},
	zPassGetStagedPersons: {
		name: "ZPass - Get Staged Persons",
		description: "This API will query all staged persons that were previously imported with the ZPass — Add Staged Persons OMI call.",
		link: "#",
		required: {
			action: "adminzpass",
			operation: "getstagedpersons",
			format: "xml"
		},
		optional: {
			stagingtypeid: "(1 - Query all persons that will be inserted 2 - Query all persons that will be modified 3 - Query all persons that have no change)"
		},
		returned: ["Z Pass"],
		returnedDetail: ["stagedpersons", "staged", "person", "typeid", "firstname", "lastname", "exsid", "cardnumber"]
	},
	zPurgeStagedPersons: {
		name: "ZPass - Purge Staged Persons",
		description: "This API call will purge (delete) all ZPass staged persons.",
		link: "#",
		required: {
			action: "adminzpass",
			operation: "purgestagedpersons",
			format: "xml"
		},
		optional: {
		},
		returned: ["Z Pass"],
		returnedDetail: ["Success or Error Message"]
	},
	get2WayMessages: {
		name: "Get 2-Way Message(s)",
		description: "This API call will return a list of messages sent through the 2-way message system.",
		link: "#",
		required: {
			action: "adminmessage",
			operation: "getmessages",
			format: "xml"
		},
		optional: {
			messageid: "(this must correspond with a 2-way message)",
			appid: "(1 - Zonar Servers, 2 - GPS, 3 - App, 4 - 2010)",
			gpsid: "(gpssn)",
			status: "(new, sent, received, delivered, undeliverable, cancelled)",
			start: "(epoch timestamp)",
			end: "(epoch timestamp)",
			tstype: "(create, insert)",
			origin: "server, mobile",
			type: "(ascii, binary)"
		},
		returned: ["Tablet", "2-Way"],
		returnedDetail: ["id", "priority", "target_gps_sn", "target_address", "last_successful_connection", "last_failed_connection", "status_code", "status_name", "destination_app_id", "owner_app_id", "source_gps_sn", "message_insert_time", "message_first_access_time","message_last_access_time", "destination_app_id", "delivery_status", "message_created", "message_type", "lat", "long", "message_sent"]
	},									
getEngineHoursSummary: {
		name: "Get GPS Engine Hours Summary",
		description: "Use this function to get GPS Engine hours summary information.",
		link: "#",
		required: {
			action: "showstats",
			operation: "enginehourssummary",
			format: "xml",
			version: "2"
		},
		optional: {
			start: "(epoch timestamp)",
			end: "(epoch timestamp)",
			zone_category: "(numeric value for the zone category to report on)",
			zone_target: "(numeric value for the zone to report on)",
			target: "(specific asset to target. requires reqtype parameter)",
			reqtype: "(exsid, fleet, tag, vin, dbid)",
			type: "(if using tag or fleet reqtype, this must be specified)"
		},
		returned: ["GPS", "Assets", "GTC Reports"],
		returnedDetail: ["assetid", "fleet", "first_ts", "last_ts", "accrued_trip_hours", "total_engine_hours", "zone"]
	},
getEngineHoursDetail: {
		name: "Get GPS Engine Hours Details",
		description: "Use this function to get GPS Engine hours detail information.",
		link: "#",
		required: {
			action: "showstats",
			operation: "enginehoursdetails",
			format: "xml",
			version: "2"
		},
		optional: {
			start: "(epoch timestamp)",
			end: "(epoch timestamp)",
			zone_category: "(numeric value for the zone category to report on)",
			zone_target: "(numeric value for the zone to report on)",
			target: "(specific asset to target. requires reqtype parameter)",
			reqtype: "(exsid, fleet, tag, vin, dbid)",
			type: "(if using tag or fleet reqtype, this must be specified)"
		},
		returned: ["GPS", "Assets", "GTC Reports"],
		returnedDetail: ["assetid", "fleet", "date","accrued_trip_hours", "total_engine_hours", "zone"]
	},
getFBMmessage: {
		name: "Get FBM Messages",
		description: "This call is used to return outbound messages after a certain timestamp",
		link: "#",
		required: {
			action: "twentytwenty",
			operation: "getmessages",
			format: "xml",
			version: "2",
			start: "epoch timestamp",
			provider: "FBM Provider (see AC FBM Manager)"
		},
		optional: {

		},
		returned: ["Tablet", "FBM"],
		returnedDetail: ["messages", "timestamp", "version", "id", "fleet", "exsid", "form", "gpssn", "form", "payload", "operator", "first", "last", "tagid", "exsid"]
	},
getMessageAcks: {
		name: "Get FBM Message Acks", 
		description: "This call is used to return inbound message acks after a certain timestamp", 
		link: "#",
		required: {
			action: "twentytwenty",
			operation: "getacks", 
			format: "xml",
			version: "2",
			start: "epoch timestamp", 
			provider: "FBM Provider (see AC FBM Manager)"
		},
		optional: {

		},
		returned: ["Tablet" ,"FBM"],
		returnedDetail: ["acks", "id", "status", "timestamp", "messageid"]
	}				
};