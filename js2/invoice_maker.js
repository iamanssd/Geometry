//# sourceURL=invoice_maker.js 
function invoiceMaker(){
	var defaults = {flattern: 1};

	var fee_counter = 1;

	var addFee = function(fee_obj,fee_name,fee_val){
		fee_obj['FeeName'+fee_counter] = fee_name;
		fee_obj['Fee'+fee_counter++] = fee_val;
	};

	var sortObjInArray = function(a,b){
		if (a.weight < b.weight)
			return -1;
		if (a.weight > b.weight)
			return 1;
		return 0;
	};

	var toFloat = function(x){
		if(typeof x === 'string') x = x.replace(/[^0-9\.]+/g,"");
		if(typeof x === 'undefined' || isNaN(x)) x = 0;
		return parseFloat(x);
	};

	var toCurrency = function(x){
		if(typeof x === 'undefined' || isNaN(x)) x = 0;
		if(typeof x === 'string') x = parseFloat(x);
		return '$'+x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	var callServer = function(pdf_data,pdf_name,callBack,flatten){
		$.ajax({
				url:'../base/ajCalls/dbCalls.php',
				type: "post",
				async:false,
				data:{
					'method':'ccQ',
					'options':{
						'pdf_name':pdf_name,
						'pdf_data': pdf_data,
						'flatten': flatten
					}
				},
				dataType: 'json',
				success: function(data) 
				{	
					ajCalls.trackAction({'action_name': 'invoice','tool_name':'Stand_LES'});
					callBack(data.file_url);
				}
			});
	};

	this.clientMod = function(pdf_data){

	};

	this.invoiceGenerate = function(pdf_name,fee_weight,callBack,options){
			$.extend(defaults,options);
			var pol_type = $('#transaction option:selected').text().indexOf('Enhanced') > -1?'Enhanced Rate': 'Standard Rate';
			var state = $('#state').val();
			var county = $('#county').val();
			var label1 =  $('#transaction option:selected').text().indexOf('Purchase') > -1?'Purchase Price:': 'Loan Amount:';
			var label2 =  $('#transaction option:selected').text().indexOf('Purchase') > -1?'Loan Amount:': 'Existing Debt:';
			var today = new Date();
			var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
			var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
			var dateTime = date+' '+time;

			var pdf_data = {
				Label1: label1,
				Label2: label2,
				TransactionType: $('#transaction option:selected').text(),
				State: state,
				County: county,
				PurchasePrice: $('#purchase_price').val(),
				LoanAmount: $('#loan_amount').val(),
				DateTime: dateTime
			};
			totals = {
				TotalTotal: 0,
				TotalBuyer: 0,
				TotalSeller: 0,
				TotalLender: 0
			};

			pdf_data.LoanPolTotal = toCurrency($('.disclosure_result_row .col-sm-9:contains("Lender\'s Title Policy")').siblings('.les_val').attr('data-base-text'));
			pdf_data.OwnersPolTotal = toCurrency($('.disclosure_result_row .col-sm-9:contains("Owner\'s Title Policy(optional)")').siblings('.les_val').attr('data-base-text'));
			/*if(ajCalls.last_raw.purchase == '1'){
				addFee(pdf_data,'Title - Policy Premium',toCurrency(ajCalls.last_raw.ownerspol_full));
				if(toFloat($('#loan_amount').val()) > 0)addFee(pdf_data,'Title - Simultaneous Issue',toCurrency(ajCalls.last_raw.simissue));
			}
			else addFee(pdf_data,'Title - Lender\'s Title Policy',toCurrency(ajCalls.last_raw.LoanPol));*/
			var fee_order = {};
			if(fee_weight === undefined) fee_weight = {};

			$.each(ajCalls.last_raw.line1101BreakDown,function(index,value){
				var flag = false;
				$.each(fee_weight,function(weight_key,weight_value){
					if(value.VariableName.indexOf(weight_key) > -1){
						value.weight = weight_value;
						flag = true;
						return false;
					}
				});
				if(!flag) value.weight = 999999999;
			});

			var sorted_array = ajCalls.last_raw.line1101BreakDown.sort(sortObjInArray);

			$.each(sorted_array,function(key,value){
				if(value.Amount > 0) addFee(pdf_data,value.VariableName,toCurrency(value.Amount));
			});

			var ownerspol_calc = toFloat(ajCalls.last_raw.simissue) > 0 && ajCalls.last_raw.ownerspol === 0 ? toFloat(ajCalls.last_raw.simissue):ajCalls.last_raw.ownerspol;
			pdf_data.Total = toCurrency(ajCalls.last_raw.Line1101 + ownerspol_calc);
			this.clientMod(pdf_data);
			callServer(pdf_data,pdf_name,callBack,defaults.flatten);
	};
}