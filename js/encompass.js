//# sourceURL=encompass.js

var encompass = (function(){

	var defaults = {
		"privFunctions":['getExportAgent','getExportRecording','getExport1101','getExportTax','getExportString','getServiceProvider'],
		"getServiceProviderArgs" : {},
		"include_service_provider_fee_value" : true,
		"include_service_provider_fee_name" : true,
		"service_provider_excluded_B" : false,
		"service_provider_excluded_owners" : false,
		"service_provider_excluded_loanpol" : false,
		"clear":{
			"line1101": false
		},
		"lenders_shopped":false,
		"seller_tax_obligated": true,
		"service_provider_index": '07'
	};

	var privateFuncs = {
		getExportAgent: function(){
			var export_string = '';
			var agent_count = $.map(ajCalls.agent_multi_info, function(n, i) { return i; }).length;
			$.each(ajCalls.agent_multi_info,function(client_id,value){
				var agent_name = value.name.replace(/_/g, ' ').replace(/\\/g, "-").replace(/\//g, "-");
				export_string += '&' + e +'202=' + agent_name;
				if(agent_count === 1 || client_id.toString() === ajCalls.last_raw.client_id.toString()){
					export_string += '&' + e +'204=' + agent_name + '&' + e +'205=' + agent_name;
				}
			});
			return export_string;
		},
		getServiceProvider: function(){
			var pref = 'SP';
			var agent_count = $.map(ajCalls.agent_multi_info, function(n, i) { return i; }).length;
			index_prefix = (defaults.service_provider_index === undefined)?'07':defaults.service_provider_index;
			var return_str = '';
			var self = this;
			$.each(ajCalls.agent_multi_info,function(client_id,agent_info){
				var options = {
				'category' : 'Title Insurance',
				'type' : 'Title - Settlement and Closing',
				'name' : agent_info.name.replace(/_/g, ' ').replace(/\\/g, "-").replace(/\//g, "-")
				};

				ser_obj = {};
				ser_obj[index_prefix+'01'] = options.category;
				ser_obj[index_prefix+'02'] = options.name;
				ser_obj[index_prefix+'07'] = agent_info.phone;
				ser_obj[index_prefix+'14'] = agent_info.contact_name.replace(/_/g, ' ').replace(/\\/g, "-").replace(/\//g, "-");
				ser_obj[index_prefix+'15'] = agent_info.email;
				ser_obj[index_prefix+'10'] = options.type;
				ser_obj[index_prefix+'12'] = encodeURIComponent(agent_info.website);
				ser_obj[index_prefix+'03'] = agent_info.address;
				ser_obj[index_prefix+'04'] = agent_info.city;
				ser_obj[index_prefix+'05'] = agent_info.state;
				ser_obj[index_prefix+'06'] = agent_info.zip;
				var index = 17;
				var fee_arr = ajCalls.last_raw.line1101BreakDown.slice();
				var client_id_sub_array = client_id;
				if(agent_count === 1 || client_id.toString() === ajCalls.last_raw.client_id.toString()){
					fee_arr.push({VariableName:"Lender's Title Insurance",Amount:ajCalls.last_raw.LoanPol});
					fee_arr.push({VariableName:"Owner's Title Insurance (optional)",Amount:ajCalls.last_raw.ownerspol});
				}
				fee_arr.sort(sort1101);
				$.each(fee_arr,function(key,val){
					if(client_id_sub_array == val.ClientID || (val.VariableName === "Lender's Title Insurance" && defaults.service_provider_excluded_loanpol === false) || (val.VariableName === "Owner's Title Insurance (optional)" && defaults.service_provider_excluded_owners === false)){
						if(val.sec_category === "B" && defaults.service_provider_excluded_B) return true;
						var fee_val = val.Amount;
						if(fee_val == '0') return true;
						var fee_name = "Title - " + val.VariableName.replace(/\//g, "-");
						if(defaults.include_service_provider_fee_name)ser_obj[index_prefix+index++] = fee_name;
						if(defaults.include_service_provider_fee_value)ser_obj[index_prefix+index] = fee_val;
						index++;
						if(index>35) return false;
					}
				});
				return_str += self._createExportString(ser_obj,pref);
				index_prefix = (parseInt(index_prefix) + 1).toString();
				if(index_prefix.length < 2) index_prefix = "0" + index_prefix;
			});

			return return_str;

			function sort1101(a,b) {
				if (a.VariableName < b.VariableName)
					return -1;
				if (a.VariableName > b.VariableName)
					return 1;
				return 0;
			}
		},

		_createExportString: function(ass_obj,pre_fix){
			if(pre_fix === undefined) pre_fix = '';
			var export_string = '';
			$.each(ass_obj,function(key,value){
				export_string += '&'+pre_fix+key+'='+value;
			});
			return export_string;
		},

		getExportRecording: function(){
			var export_string = '';
			var fee_block_buyer = ajCalls.last_raw.line1201BreakDown;
			var totals = {deed:0,mort:0,release:0,other:0};
			$(fee_block_buyer).each(function(index,val){
				var fee_name = val.type;
				var fee_val = val.amount;
				if(fee_name.indexOf('Deed') >= 0){
					totals.deed += parseFloat(fee_val);
				}
				else if(fee_name.indexOf('Mort') >= 0){
					totals.mort += parseFloat(fee_val);
				}
				else if(fee_name.indexOf('Release') >= 0){
					totals.release += parseFloat(fee_val);
				}
				else{
					totals.other += parseFloat(fee_val);
				}		
			});
			if(totals.other > 0) totals.deed += totals.other;
			export_string += '&1636=' + encompass_fee_total.replace('x',totals.deed.formatMoney()).replace('y',totals.mort.formatMoney()).replace('z',totals.release.formatMoney());
			return export_string;
		},

		getExport1101: function(){
			var export_string = '';
			$.each(ajCalls.last_raw.line1101BreakDown,function(index,val){
				var fee_val = val.Amount;
				if(fee_val == '0') return true;
				var fee_name = 'Title - ' + val.VariableName.replace(/\//g, "-");
				var fee_apr = val.FinanceCharge?val.FinanceCharge:'';
				var paid_to = (val.paid_to)?val.paid_to:'Other';
				var shopped = val.sec_category === 'B'?'N':'Y';
				if(val.client_encompass_full === 1 && val.client_encompass_fields){
					$.each(val.client_encompass_fields,function(client_key,value){
						export_string += '&'+ client_key + '=' + value;
					});	
				}
				else{
					var encompass_field = encompassLine1101.shift();
					var encompass_field_name = encompassLine1101_name.shift();
					var encompass_field_apr = encompassLine1101_apr.shift();
					var encompass_field_paid = encompassLine1101_paid_to.shift();
					var encompass_shopped = encompassLine1101_shopped.shift();
					export_string += '&'+ encompass_field_name + '=' + fee_name + '&' + encompass_field + '=' + fee_val + '&' + encompass_field_paid + '=' + paid_to +  '&' + encompass_shopped + '=' + shopped;
					if(fee_apr.toLowerCase() === 'y') export_string += '&' + encompass_field_apr + '=Y';
					if(val.client_encompass_full === 0 && val.client_encompass_fields){
						$.each(val.client_encompass_fields,function(client_key,value){
							export_string += '&'+ client_key + '=' + value;
						});	
					}
				}
			});
			var paid_to = ajCalls.last_raw.title_paid_to?ajCalls.last_raw.title_paid_to:'Other';
			encompass_field = encompass_names['Lender\'s Title Policy'];
			fee_val = ajCalls.last_raw.LoanPol;
			export_string += '&'+ encompass_field + '=' + fee_val + '&NEWHUD.X805=' + paid_to;
			if(defaults.lenders_shopped) export_string += '&NEWHUD2.X3361=Y';
			encompass_field = encompass_names['Title - Owner\'s Title Policy(optional)'];
			fee_val = ajCalls.last_raw.ownerspol;
			export_string += '&'+ encompass_field + '=' + fee_val + '&NEWHUD.X804=' + paid_to;
			if(defaults.clear && defaults.clear.line1101){
				export_string += '&NEWHUD.X203= &NEWHUD2.X11= ';
				$.each(encompassLine1101,function(index,field){
					var encompass_field = field;
					var encompass_field_name = encompassLine1101_name.shift();
					var encompass_field_paid = encompassLine1101_paid_to.shift();
					export_string += '&'+ encompass_field_name + '= &' + encompass_field + '= ';
					if(encompass_field_paid) export_string += '&' + encompass_field_paid + '=' + paid_to;
				});
			}
			return export_string;
		},

		getExportTax: function(){
			var export_string = '';
			var fee_block_buyer = ajCalls.last_raw.line1203BreakDown.CFPB2015;
			var fee_block_seller = ajCalls.last_raw.line1203_sellerBreakDown.CFPB2015;
			var totals = {state:{deed:0,mort:0,buyer:0,total:0,seller:0},county:{deed:0,mort:0,buyer:0,total:0,seller:0},misc:{deed:0,mort:0,buyer:0,total:0,seller:0}};
			$(fee_block_buyer).each(function(index,val){
				var fee_name = val.jur + ' ' + val.type;
				var fee_val = val.amount;
				if(fee_name.indexOf('DeedRecordation') >= 0){
					totals.misc.total += parseFloat(fee_val);
					totals.misc.buyer += parseFloat(fee_val);
					totals.misc.deed += parseFloat(fee_val);
				}
				else if(fee_name.indexOf('State') >= 0){
					totals.state.total += parseFloat(fee_val);
					totals.state.buyer += parseFloat(fee_val);
					if(fee_name.indexOf('Deed') >= 0 || fee_name.indexOf('Grantee') >= 0 || fee_name.indexOf('Grantor') >= 0){
						totals.state.deed += parseFloat(fee_val);
					}
					else{
						totals.state.mort += parseFloat(fee_val);
					}	
				}
				else{
					totals.county.total += parseFloat(fee_val);
					totals.county.buyer += parseFloat(fee_val);
					if(fee_name.indexOf('Deed') >= 0 || fee_name.indexOf('Grantee') >= 0 || fee_name.indexOf('Grantor') >= 0){
						totals.county.deed += parseFloat(fee_val);
					}
					else{
						totals.county.mort += parseFloat(fee_val);
					}
				}
			});
			export_string += '&648=' + totals.state.buyer + '&647=' + totals.county.buyer + '&NEWHUD.X731=' + totals.misc.buyer;
			$(fee_block_seller).each(function(index,val){
				var fee_name = val.jur + ' ' + val.type;
				var fee_val = val.amount;
				if(fee_name.indexOf('DeedRecordation') >= 0){
					totals.misc.total += parseFloat(fee_val);
					totals.misc.seller += parseFloat(fee_val);
					totals.misc.deed += parseFloat(fee_val);
				}
				else if(fee_name.indexOf('State') >= 0){
					totals.state.total += parseFloat(fee_val);
					totals.state.seller += parseFloat(fee_val);
					if(fee_name.indexOf('Deed') >= 0 || fee_name.indexOf('Grantee') >= 0 || fee_name.indexOf('Grantor') >= 0){
						totals.state.deed += parseFloat(fee_val);
					}
					else{
						totals.state.mort += parseFloat(fee_val);
					}	
				}
				else{
					totals.county.total += parseFloat(fee_val);
					totals.county.seller += parseFloat(fee_val);
					if(fee_name.indexOf('Deed') >= 0 || fee_name.indexOf('Grantee') >= 0 || fee_name.indexOf('Grantor') >= 0){
						totals.county.deed += parseFloat(fee_val);
					}
					else{
						totals.county.mort += parseFloat(fee_val);
					}	
				}
			});
			export_string += '&2405=' + totals.county.deed + '&2406=' + totals.county.mort + '&NEWHUD.X787=' + totals.misc.seller;
			export_string += '&593=' + totals.county.seller.formatMoney() + '&594=' + totals.state.seller.formatMoney();
			if(defaults.seller_tax_obligated) export_string += '&NEWHUD2.X3727=Y&NEWHUD2.X3760=Y&NEWHUD2.X3694=Y';
			export_string += '&1637=' + tax_total.replace('x',totals.county.deed.formatMoney()).replace('y',totals.county.mort.formatMoney());
			export_string += '&1638=' + tax_total.replace('x',totals.state.deed.formatMoney()).replace('y',totals.state.mort.formatMoney());
			export_string += '&NEWHUD.X947=' + tax_total.replace('x',totals.misc.deed.formatMoney()).replace('y',totals.misc.mort.formatMoney());
			return export_string;
		},

		getExportString: function (fee_block,name_prepend){
			if(typeof name_prepend === 'undefined') name_prepend = '';
			var export_string = '';
			$(fee_block).each(function(index,val){
				if(index === 0) return;
				var rows = $(val).children();
				if($(rows[0]).text() === 'Total: ') return;
				var fee_name = typeof encompass_names[name_prepend + $(rows[0]).text()] !=='undefined'? encompass_names[name_prepend + $(rows[0]).text()]: name_prepend + $(rows[0]).text().substring(8,$(rows[0]).text().length);
				var fee_val = $(rows[1]).attr('data-base-text');
				export_string += '&'+fee_name+'='+fee_val;
			});
			return export_string;
		},
		getExportClientSpecific: function(){

		}
	};

	var e = "NewHUD.X";
	var e2 = "NewHUD2.X";

	var encompass_names = {
		"Title - Owner's Title Policy(optional)": e+"572",
		"Lender's Title Policy" : e+"639",
		"Recording Total" : "1636",
		"Recording Buyer" : "390",
		"Recording Seller" : "587",
		"City Tax Total" : "1637",
		"City Tax Buyer" : "647",
		"City Tax Seller" : "593",
		"State Tax Total" : "1638",
		"State Tax Buyer" : "648",
		"State Tax Seller" : "594"
	};
 
	var encompass_fee_total = "Deed $x;Mortgage $y;Releases $z";
	var tax_total = "Deed $x;Mortgage $y";
	var encompassLine1101 = [];
	var encompassLine1101_seller = [];
	var encompassLine1101_paid_to = [];
	var encompassLine1101_apr = [];
	var encompassLine1101_name = [];
	var encompassLine1101_shopped = [];

	function _populate1101Arrays(){
		encompassLine1101 = [];
		encompassLine1101_seller = [];
		encompassLine1101_name = [];
		encompassLine1101_apr = [];
		encompassLine1101_paid_to = [];
		encompassLine1101_shopped = [];
		var shopped_number = 2866;
		for (var i = 952; i <= 997; i+= 9) {
			var a = i+1;
			var b = i-1;
			var c = i+6;
			var d = i+7;
			encompassLine1101_name.push(e+b);
			encompassLine1101_seller.push(e+a);
			encompassLine1101_apr.push(e+c);
			encompassLine1101_paid_to.push(e+d);
			encompassLine1101_shopped.push(e2+shopped_number);
			encompassLine1101.push(e+i);
			shopped_number += 33;
		}
		shopped_number = 3460;
		for (i = 1763; i <= 1778; i+= 5) {
			var a = i+1;
			var b = i-1;
			var c = i+6;
			encompassLine1101_name.push(b);
			encompassLine1101_seller.push(a);
			encompassLine1101.push(i);
			encompassLine1101_shopped.push(e2+shopped_number);
			shopped_number += 33;
		}
		for (i = 348; i<= 354; i+=2){
			encompassLine1101_paid_to.push('SYS.X'+i);
		}
		shopped_number = 3163;
		for (i = 809; i <= 817; i+= 2) {
			var a = i;
			var b = i+1;
			var c = i-707;
			var d = i-706;
			if(i !== 809){
				c++;
				d++;	
			} 
			encompassLine1101_name.push(e+a);
			encompassLine1101.push(e+b);
			encompassLine1101_paid_to.push(e+c+1);
			if(shopped_number <= 3559) encompassLine1101_shopped.push(e2+shopped_number);
			shopped_number += 33;
		}
		encompassLine1101_apr = encompassLine1101_apr.concat(['SYS.X217','SYS.X219','SYS.X221','SYS.X223']);
		encompassLine1101.push(e+"215");
		encompassLine1101.push(e+"216");
		encompassLine1101.push(e+"1604");
		encompassLine1101.push(e+"1612");
		encompassLine1101_seller.push(e+"1605");
		encompassLine1101_seller.push(e+"1613");
		encompassLine1101_seller.push(e2+"18");
		encompassLine1101_seller.push(e2+"19");
		encompassLine1101_name.push(e+"208");
		encompassLine1101_name.push(e+"209");
		encompassLine1101_name.push(e+"1602");
		encompassLine1101_name.push(e+"1610");
	}

	return{
		setOptions: function(options){
			$.extend(defaults,options);
		},
		createExport: function(){
			export_string = '';
			_populate1101Arrays();
			var ser_prov_index = query_params.service_provider_start?query_params.service_provider_start:undefined;
			$.each(defaults.privFunctions, function(index,value){
				if(value === 'getServiceProvider'){
						export_string += privateFuncs[value]();
						ser_prov_index++;
					}
				else export_string += privateFuncs[value]();
			});
			if(defaults.addedFunctions !== undefined){
				$.each(defaults.addedFunctions, function(index,value){
					export_string += addedFunctions[value]();
				});
			}
			export_string = export_string.substring(1,export_string.length);
			return export_string;
		},
		getExportPDF: function(pdf_path){
			var export_string = '';
			export_string += 'PDF=' + pdf_path;
			return export_string;
		},
		trans_types:{
			"Purchase":"11",
			"Cash-Out Refinance":"00",
			"No Cash-Out Refinance":"00",
			"default":"11"
		}
	};
})();