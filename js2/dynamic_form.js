var ds_helper = {};

(function(){
	//function privateFunction() { ... }
	ds_helper.emailQuote = function(event){
		var email_to = prompt("Please Enter Who To Email The Quote To",ajCalls.last_raw.Username);
		if(email_to === null) return;
		var subject = event.data && event.data.sub?event.data.sub:'Closing Cost Estimate Quote';
		var result_clone = $('.main-row').clone();
		ajCalls.getClientInfo().done(function(){
			var client_info = ds_helper.clientInfoPrint(ajCalls.client_info);
			if(client_info.find('img').length > 0)client_info.find('img').attr('src',client_info.find('img')[0].src);
			result_clone.prepend(client_info);
			result_clone.append(ds_helper.getjQueryObject('.client_print,#disclosure_form,.doc_type_pr'));
			var head_clone = $('<head></head>').append($('head').html());
			head_clone.append('<link rel="stylesheet" type="text/css" href="../base/css/newlesforms_new.css" />'+
				'<link rel="stylesheet" type="text/css" href="../base/css/pdf.css" />');
			head_clone.cssAbsURL();
			var email_body = event.data && event.data.bod?event.data.bod:'Closing Cost Estimate Quote.';
			var email_from = event.data && event.data.from?event.data.from:null;
			var attachment = { type: 'application/pdf',
			name: 'closing_cost_estimate.pdf',
			html: '<!DOCTYPE html><html>'+head_clone.html()+"<body>"+result_clone.html()+"</body></html>"
		};
		ajCalls.email(email_to,subject,email_body,attachment,email_from);
		});
	};

	ds_helper.resultHTML = function(){
    	var result_clone = $('.main-row').clone();
    	result_clone.append(ds_helper.getjQueryObject('.client_print,#disclosure_form,.doc_type_pr'));
    	var head_clone = $('<head></head>').append($('head').html());
    	head_clone.append('<link rel="stylesheet" type="text/css" href="css/newlesforms_new.css" />'+
	'<link rel="stylesheet" type="text/css" href="css/pdf.css" />');
    	head_clone.cssAbsURL();
    	var final_html = '<!DOCTYPE html><html>'+head_clone.html()+"<body>"+result_clone.html()+"</body></html>";
    	return final_html;
    };

    ds_helper.clientInfoPrint = function (client_info){
    	var output = $('<div class="">');
    	output.append($('<div class="row" style="margin-bottom:0px;"/>'))
    	.append($('<div class="col-xs-4" style="margin-bottom:0px;"/>').append($('.logo').clone()))
    	.append($('<div class="col-xs-4 print_title" style="font-size:20px;font-weight:bold;vertical-align:bottom;text-align: center;margin-bottom:0px;"/>').text(client_info.Name));
    	output.append($('<div class="row" ></div>'))
    	.append($('<div class="col-xs-4" style="text-align: center;margin-bottom:15px;"/>').text('Email: '+client_info.Email))
    	.append($('<div class="col-xs-4" style="text-align: center;margin-bottom:15px;"/>').text('Phone Number: '+client_info.Phone))
    	.append($('<div class="col-xs-4" style="text-align: center;margin-bottom:15px;"/>').text('Website: '+client_info.Website));
    	return output;
    };
						
    ds_helper.getjQueryObject = function(string) {
        // Make string a vaild jQuery thing
        var jqObj = $("");
        try {
            jqObj = $(string)
                .clone();
            var selects = jqObj.find("select");
            $(selects).each(function(i) {
                $(string).find('select');
                var ori_val = $(string).find("select").eq(i).val();
                $(this).find('option[selected=""]').prop('defaultSelected',null);
                $(this).find('option[selected=""]').removeAttr('selected');
                $(this).find('option[value="'+ori_val+'"]').attr("selected", "");
            });
            var input_text = jqObj.find('input[type="text"]');
            $(input_text).each(function(i) {
            	$(this).attr('value',$(this).val());
            });
            var input_check = jqObj.find('input[type="checkbox"]');
             $(input_check).each(function(i) {
            	if($(this).prop('checked')) $(this).attr('checked','chcecked');
            });
        } catch (e) {
            jqObj = $("<span />")
                .html(string);
        }
        return jqObj;
    };
})();

//connector between rule_engine and element_creator
var re_to_ec = {
	rE:"",
	rE_doc_type:"",
	rE_tit_ov:"",
	init: function(){
		this.rE = new Rule_Engine();
		this.rE_doc_type = new Rule_Engine();
		this.rE_tit_ov =  new Rule_Engine();

		//temp code DS
		/*LS.df_tool_name = ['DisclosureTool_FirstAm'];
		FormSerializer.postEncode = function postEncode(pair){
			if($('[name="' + pair.name + '"]').hasClass('currency')) return pair.value.replace(/,/g , "");
			else return pair.value;
		};*/

		this.rE.set_ajPath("../base/ajCalls/ruleCalls.php")
		.set_tool(LS.df_tool_name)
		.set_exactMatch(true)
		.set_procType(1);

		this.rE_doc_type.set_ajPath("../base/ajCalls/ruleCalls.php")
		.set_tool(LS.dd_tool_name)
		.set_exactMatch(true)
		.set_procType(1);
	},
	update: function($ele){
		var resultArr = this.rE.compute_rules($ele.id);
		var doc_resultArr = this.rE_doc_type.compute_rules($ele.id);
		var self = this;

		if(this.rE.enabledResults && this.rE.enabledResults[$ele.id]){
			var undoArr = this.rE.enabledResults[$ele.id];
			$.each(undoArr, function(index,resultVal){
				var options = JSON.parse(resultVal.result_options);
				$("#formContainer").dynamicform("Undo"+resultVal.result_method,options);
				var removed_eles =  $("#formContainer").data('removed_eles');
				$.each(removed_eles, function(index,ele){
					self.update(ele);
				});
			});
		}
			//standard doc removal of special elements
			if(this.rE_doc_type.enabledResults && this.rE_doc_type.enabledResults[$ele.id]){
				var undoArrD = this.rE_doc_type.enabledResults[$ele.id];
				$.each(undoArrD, function(index,resultVal){
					var options = JSON.parse(resultVal.result_options);
					var form_id = (typeof options.div_id === undefined? 'doc_type_container_std' : options.div_id);
					if(resultVal.result_method !== 'CreateForm'){
						$('#'+form_id).dynamicform("Undo"+resultVal.result_method,options);
					}
					else{
						$('#'+form_id).dynamicform("Destroy");
					}
				});
			}

			$.each(resultArr, function(index,resultVal){
				var options = JSON.parse(resultVal.result_options);
				$("#formContainer").dynamicform(resultVal.result_method,options);
			});
			this.rE.set_enabledResults(resultArr,$ele.id);

			$.each(doc_resultArr, function(index,resultVal){
				var options = JSON.parse(resultVal.result_options);
				var form_id = (typeof options.div_id === 'undefined'? 'doc_type_container_std' : options.div_id);
				if(typeof options.div_id !== 'undefined' && $('#'+form_id).length === 0){
					$('#doc_type_container_var').append('<div id="'+form_id+'" class="doc_type row formContainer top-inputs"></div>');
					$('#'+form_id).dynamicform(options);
					$(".doc_type_switch").bootstrapSwitch();
					ls_helper.switchFunction();
				}
				else {
					$('#'+form_id).dynamicform(resultVal.result_method,options);
					if($('#'+form_id+" .row:nth-child(2)").css('display') === 'block') $('#'+form_id).find('.row').show();
				}
			});
			this.rE_doc_type.set_enabledResults(doc_resultArr,$ele.id);
		},
		updateProcedural: function(resultArr,$ele){
			/*var self = this;
			if(this.rE.enabledResults && this.rE.enabledResults[$ele.id]){
				var undoArr = this.rE.enabledResults[$ele.id];
				$.each(undoArr, function(index,resultVal){
					var options = JSON.parse(resultVal.result_options);
					$("#formContainer").dynamicform("Undo"+resultVal.result_method,options);
					var removed_eles =  $("#formContainer").data('removed_eles');
					$.each(removed_eles, function(index,ele){
						self.update(ele);
					});
				});
			}

			$.each(resultArr, function(index,resultVal){
				var options = JSON.parse(resultVal.result_options);
				$("#formContainer").dynamicform(resultVal.result_method,options);
			});
			this.rE.set_enabledResults(resultArr,$ele.id);*/
		}
};

var ls_helper = {
	switchFunction: function(){
		$('.doc_type_switch').off('switchChange.bootstrapSwitch');
    	$('.doc_type_switch').on('switchChange.bootstrapSwitch',function(){
    		if($(this).prop('checked')){
    			$(this).parents('.doc_type_row').siblings('div').slideDown('slow');
    			$(this).parents('.doc_type').addClass('doc_type_pr');
    		}
    		else{
    			$(this).parents('.doc_type_row').siblings('div').slideUp('slow');
    			$(this).parents('.doc_type').removeClass('doc_type_pr');
    		}
    	});
    }
};

//load in supported states for Title Agent
var ajCalls = {
	ajPath: "",
	search_type: "",
	client_id: 1,
	agent_id: 1,
	county: "",
	trans:[],
	ucd:'',
	br_tip_shown:false,
	client_info: {},
	getFirstAmQs : function(formData){
		$.ajax({url:this.ajPath,
        type: "post",
        async:false,
        data:{
            'method':'getFirstAmAll',
            'options': formData
        },
        dataType: 'json',
        success: function(data) 
        {
        	//re_to_ec.updateProcedural([data],$('#transaction')[0]);
        }});
	},
	isLoggedIn : function(data){
		if(typeof data === 'string' && data.search('status') > 0) data = $.parseJSON(data);
		if($.isPlainObject(data) && 'status' in data && data.status === 'failed'){
			alert(data.message);
			$("#main").load('../base/logout.php?'+ window.location.href.split("?")[1]);
		}
	},
	loadStates : function(){
		var resultVal = {};
		var self = this;
		$.ajax({
        url:this.ajPath,
        type: "post",
        async:false,
        data:{
            'method':'getSupportedStates',
            'options':{
            	'client_id':this.client_id,
            	'agent_id':this.agent_id
            }
        },
		dataType: 'json',
        success: function(data) 
        {	
        	$.each(data,function(index,value){
        		resultVal[value] = value;
        	});
        	var queryParam = get_query_params();
        	if(queryParam.order_only !== undefined){
        		$("#ov_card").flip(true);
        		$('#mask').show();
        		$('#fee_br').hide();
        		$('#pol_br').hide();
        		$('#tit_or').show();
        	}
        	$('#state').trigger('ls:get-complete');
        }});
    return resultVal; 
	},
	getCounties: function(state){
		var self = this;
		$.ajax({
			url:this.ajPath,
			type: "post",
			async:true,
			data:{
				'method':'getCounties',
				'options':{
					'state':state,
					'client_id':self.client_id,
            		'agent_id':self.agent_id
				}	
			},
			success: function(data) 
			{
				self.isLoggedIn(data);
				$("#county").html(data);
				self.county = $('#county').val();
				self.getTownships(state,self.county,self.client_id,self.agent_id);
				$(".visuallyhidden").removeClass('visuallyhidden');
				$('#county').trigger('ls:get-complete');
			}});
	},
	getTownships: function(state,county){
		var self = this;
		$.ajax({
			url:this.ajPath,
			type: "post",
			async:true,
			data:{
				'method':'getTownships',
				'options':{
					'state':state,
					'county':county,
					'client_id':self.client_id,
            		'agent_id':self.agent_id
				}	
			},
			success: function(data) 
			{
				self.isLoggedIn(data);
				$("#township").html(data);
				if($('#township > option').length > 1) $('#township')[0].selectedIndex = -1;
				$('#township').trigger('ls:get-complete');
			}});
	},
	getTransactions: function(){
		var self = this;
		$.ajax({
			url:this.ajPath,
			type: "post",
			dataType:'json',
			async:true,
			data:{
				'method':'getTransactions',
				'options':{
				}	
			},
			success: function(data) 
			{
				self.isLoggedIn(data);
				self.trans = data;
				$('#transaction').trigger('ls:get-complete');
			}});
	},
	getEndorsements: function(client_id,agent_id,state,county,trans_id,underwriter_id){
		var self = this;
		return $.ajax({
			url:this.ajPath,
			type: "post",
			dataType:'json',
			async:true,
			data:{
				'method':'getEndorsements',
				'options':{
					'state':state,
					'county':county,
					'client_id':client_id,
            		'agent_id':agent_id,
            		'trans_id':trans_id,
            		'underwriter_id':underwriter_id
				}	
			},
			success: function(data) 
			{
				self.endos = data;
			}});
	},
	postForm: function(post_data,track_data){
		var self = this;
		if($('#service_provider').length > 0){
			var agent_info = $('#service_provider option:selected').val().split("_");
			post_data.client_id = agent_info[0];
			post_data.agent_id = agent_info[1];
			post_data.relation_id = $('#service_provider option:selected').attr('data-relation_id');
		}
		if($('.additional_service_provider').length>0 && $('.additional_service_provider').val() !== null){
			post_data.additional_services = [];
			$('.additional_service_provider').each(function(index,value){
				var additional_provider_info = $(value).val().split("_");
				post_data.additional_services[index] = {};
				post_data.additional_services[index].client_id = additional_provider_info[0];
				post_data.additional_services[index].agent_id = additional_provider_info[1];
				post_data.additional_services[index].relation_id = $(value).attr('data-relation_id');
			});
		}
		post_data.search_type = this.search_type;
		$.ajax({
			url:this.ajPath,
			type: "post",
			async:false,
			dataType:'json',
			data:{
				'method':'genDynamicJSON',
				'options':post_data	
			},
			success: function(resultSections) 
			{
				self.isLoggedIn(resultSections);	
				if(track_data !== undefined) self.trackAction(track_data);
				$('#mask, #ov_card').show();
				$.each(resultSections, function(index,sectionJSON){
					if(index === 'search_id'){
						ajCalls.last_search_id = sectionJSON;
						return;
					}
					if(index === 'raw'){
						ajCalls.last_raw = sectionJSON;
						return;
					} 
					var div_id = sectionJSON.attribute.div_id;
					delete sectionJSON.attribute.div_id;
					if(sectionJSON.title === null){
						delete sectionJSON.title;
					}
					if(typeof $('#'+div_id).data('.jquery.dynamicform') !== 'undefined'){
						$('#'+div_id).dynamicform("Empty",true);
						$('#'+div_id).dynamicform('AddFormElements',sectionJSON);
					}
					/* DRAGGABLE  */
					if(typeof sectionJSON.attribute.class !== 'undefined' && sectionJSON.attribute.class.indexOf('tax_draggable') >= 0){
						sectionJSON.rowTypeSelector = function(element,force_row,prev_ele_id,spec_loc){
							if($(this.form.find(".row")).length < 2){
								return $(this.templates.row_no_draggable);
							}
							return $(this.templates.row);
						};
					}
					$('#'+div_id).dynamicform(sectionJSON);
				});

				/* TAX DRAGGABLE  */
				$("form.tax_draggable").sortable({connectWith:'form.tax_draggable',
					cursor: "move",
					items:'.row:not(.no_draggable)',
					forcePlaceholderSize: true,
					placeholder: "placeholder",
					receive:function(event,ui){
						var row_object_data = $(ui.item[0]).data().smartGridRow.getRowObjectData();
						var inserted_row = $(this).smartgrid('insertRow',ui.item.index(),ui.item[0]);
						inserted_row.setOptions({rowObjectData:row_object_data});
						var tax_br_type = 'line1203BreakDown';
						if($(this).attr('id') === 'fee_br_sel_form') tax_br_type = 'line1203_sellerBreakDown';
						ajCalls.last_raw[tax_br_type].CFPB2015 = [];
						$.each($(this).smartgrid('getAllRows'),function(index,smart_grid_row){
							if(!$.isEmptyObject(smart_grid_row.getRowObjectData()))ajCalls.last_raw[tax_br_type].CFPB2015.push(smart_grid_row.getRowObjectData());
						});
					}, 
					remove:function(event,ui){
						$(this).smartgrid('removeRow',$(ui.item[0]).data().smartGridRow.getRowIndex());
						var tax_br_type = 'line1203BreakDown';
						if($(this).attr('id') === 'fee_br_sel_form') tax_br_type = 'line1203_sellerBreakDown';
						ajCalls.last_raw[tax_br_type].CFPB2015 = [];
						$.each($(this).smartgrid('getAllRows'),function(index,smart_grid_row){
							if(!$.isEmptyObject(smart_grid_row.getRowObjectData()))ajCalls.last_raw[tax_br_type].CFPB2015.push(smart_grid_row.getRowObjectData());
						});
					}
				});

				$('#fee_br_sel_form,#fee_br_by_form').smartgrid({
					cellChange:function(){
					if($('#rnd_switch').prop('checked')) $('.les_val').formatCurrency({'roundToDecimalPlace':0});
					else $('.les_val').formatCurrency({'roundToDecimalPlace':2});
    				},
    				row_selector: '.row:not(:first)',
    				rowAddComplete:function(event,data){
    					smart_grid_row = data.smart_grid_row;
	    				if(smart_grid_row.getRowIndex() === 0) return true;
	    				var tax_br_type = 'line1203BreakDown';
	    				if($(smart_grid_row.getElement()).parent('form').attr('id') === 'fee_br_sel_form') tax_br_type = 'line1203_sellerBreakDown';
	    				$.each(ajCalls.last_raw[tax_br_type].CFPB2015,function(index,ajCalls_val){
	    					if(smart_grid_row.getCell(0).getValue() === ajCalls_val.jur + ' - ' + ajCalls_val.type && smart_grid_row.getCell(1).getValue() === parseFloat(ajCalls_val.amount)){
	    						smart_grid_row.setOptions({rowObjectData:ajCalls_val});
	    						return false;
	    					}
	    				});
    				}
    			});

    			$('#fee_br_sel_form,#fee_br_by_form').each(function(index,form){
    				$(form).smartgrid('getCell',0,1).setOptions({
    					type:'formula',
    					processFormula:function(parent_smart_cell,plugin){
    					var cell_arr = plugin.getColumn(1);
    					var cell_value = 0;
    					$.each(cell_arr,function(index,smart_cell){
    						if(smart_cell !== undefined && smart_cell.getRowIndex() !== parent_smart_cell.getRowIndex()){
    							cell_value += smart_cell.getValue();
    						}
    					});
    					parent_smart_cell.setOptions({value:cell_value});
    					if(plugin.element.attr('id') === 'fee_br_by_form'){
    						$('#E_fee_value_6').text(cell_value);
    						$('#E_fee_value_2').text(cell_value+ajCalls.last_raw.Line1201);
    					} 
    					}
    				});
    			});
				/* TAX DRAGGABLE  */

				/* RESULT SECTIONS SmartGrid */
				$('.main-row form').smartgrid({
					cellChange:function(){
						if($('#rnd_switch').prop('checked')) $('.les_val').formatCurrency({'roundToDecimalPlace':0});
						else $('.les_val').formatCurrency({'roundToDecimalPlace':2});
					}
				}).smartgrid('getCell',0,1).setOptions({
					type:'formula',
					processFormula:function(parent_smart_cell,plugin){
						var cell_arr = plugin.getColumn(1);
						var cell_value = 0;
						$.each(cell_arr,function(index,smart_cell){
							if(smart_cell !== undefined && smart_cell.getRowIndex() !== parent_smart_cell.getRowIndex()){
								cell_value += smart_cell.getValue();
							}
						});
						parent_smart_cell.setOptions({value:cell_value});
					}
				});

				if(!$('#rnd_switch').prop('checked')) $('#rnd_switch').bootstrapSwitch('state',true);
				$('#rnd_switch').trigger('switchChange.bootstrapSwitch');
				if(!self.br_tip_shown){
					$('#loan_costs_E').tooltipster('show');
					$('#loan_costs_H').tooltipster('show');
					self.br_tip_shown = true;}
				$('.back').hide();
			},
			error: function (header, status, error) {
                console.log('ajax answer post returned error ' + header + ' ' + status + ' ' + error);
            }
		});
	},
	trackAction: function(track_data){
		var self = this;
		$.ajax({
			url:this.ajPath,
			type: "post",
			async:true,
			dataType:'json',
			data:{
				'method':'trackAction',
				'options':{
					'action_name' : track_data.action_name,
					'tool_name' : track_data.tool_name
				}	
			}
		});
	},
	getClientInfo:function(){
		var self = this;
		if($.isEmptyObject(this.client_info)){
			return $.ajax({
				url:this.ajPath,
				type: "post",
				async:true,
				dataType:'json',
				data:{
					'method':'getClientInfo',
					'options':{
					}	
				}
			}).done(function(data){self.client_info=data;});
		}
		else return $.Deferred().resolve();
	},
	getAgentInfo:function(client_id, agent_id){
		//gets information for one agent used in quote
		self.agent_multi_info = {};
		var self = this;
		return $.ajax({
				url:this.ajPath,
				type: "post",
				async:true,
				dataType:'json',
				data:{
					'method':'getAgentInfo',
					'options':{
						'client_id':client_id,
						'agent_id': agent_id
					}	
				}
			}).done(function(data){self.agent_info=data;});
	},
	getMultiAgentInfo:function(agent_info_arr){
		//gets information for all agents used in quote
		this.agent_multi_info = {};
		var self = this;
		return $.ajax({
				url:this.ajPath,
				type: "post",
				async:true,
				dataType:'json',
				data:{
					'method':'getMultiAgentInfo',
					'options':{
						'agent_info_arr':agent_info_arr
					}	
				}
			}).done(function(data){
				$.each(data,function(index,val){
					self.agent_multi_info[agent_info_arr[index].client_id] = val;
				});
			});
	},
	getAgents: function(state,county,trans_id){
		var self = this;
		return $.ajax({
			url:this.ajPath,
			type: "post",
			dataType:'json',
			async:true,
			data:{
				'method':'getAgents',
				'options':{
					'state':state,
					'county':county,
					'trans_id':trans_id
				}	
			}});
	},
	getMultiAgents: function(state,county,trans_id,relation_id_arr){
		var self = this;
		return $.ajax({
			url:this.ajPath,
			type: "post",
			dataType:'json',
			async:true,
			data:{
				'method':'getAgents2',
				'options':{
					'state':state,
					'county':county,
					'trans_id':trans_id,
					'relation_id_arr':relation_id_arr
				}	
			}});
	},
	getRelatedClient: function(state,county,trans_id,relation_id){
		var self = this;
		return $.ajax({
			url:this.ajPath,
			type: "post",
			dataType:'json',
			async:true,
			data:{
				'method':'getRelatedClient',
				'options':{
					'state':state,
					'county':county,
					'trans_id':trans_id,
					'relation_id':relation_id
				}	
			}});
	},
	getThirdPartyQs: function(form_request,doc_types,engine){
		var self = this;
		return $.ajax({
			url:this.ajPath,
			type: "post",
			dataType:'json',
			async:true,
			data:{
				'method':'getThirdPartyQs',
				'options':{
					'state':state,
					'county':county,
					'trans_id':trans_id,
					'relation_id':relation_id
				}	
			}});
	},
	email: function(email_to,subject,email_body,attachment,email_from){
		var self = this;
		$.ajax({
			url:this.ajPath,
			type: "post",
			async:true,
			data:{
				'method':'emailLoanEstimate',
				'options': {
					'to_name': email_to,
					'subject':subject,
					'email_body':email_body,
					'attachment': attachment,
					'from_name': email_from
				}	
			},
			success: function(emailMessage) 
			{
				self.isLoggedIn(emailMessage);	
				alert(emailMessage);
			}
		});
	}};

var titCalls = {
	ajPath: "../base/int/int_handler.php", 
	postTitle: function(body_message,meta_data,method){
		var self = this;
		$.ajax({
			url:this.ajPath,
			type: "post",
			async: true,
			data: {
				'method':method,
				'options':{
					message:{
						body: body_message
					},
					login:{},
					'meta_data': meta_data
				}
			},
			success: self.postReply
		});
	},
	postReply: function(response){
		alert('Your order has been sent! You should be receiving a response shortly.');
	}
};

$.fn.changeVal = function (v) {
    return $(this).val(v).change().focusout();
};

var switchFunction = function(){
	$('.doc_type_switch').on('switchChange.bootstrapSwitch',function(){
		if($(this).prop('checked')){
			$(this).parents('.doc_type_row').siblings('div').slideDown('slow');
			$(this).parents('.doc_type').addClass('doc_type_pr');
		}
		else{
			$(this).parents('.doc_type_row').siblings('div').slideUp('slow');
			$(this).parents('.doc_type').removeClass('doc_type_pr');
		}
	});
};

var uploadControl = function(){
	uploadControl.prototype.init =  function(upload_id,file_loc_id,drop_zone_id){
		//$(document).bind('drop dragover', function (e){e.preventDefault();});
		upload_button = $('<button/>')
		.addClass('btn btn-primary')
		.prop('disabled', true)
		.text('Processing...')
		.on('click', function (e){
			e.preventDefault();
			var $this = $(this),
			data = $this.data();
			$this
			.off('click')
			.text('Abort')
			.on('click', function () 	{
				$this.remove();
				data.abort();
			});
			data.submit().always(function () {
				$this.remove();
			});
		});
		up_url = window.location.toString();
		up_url = up_url.slice(0,up_url.lastIndexOf('/')+1) + '../base/int/int_upload_handler.php';
		$('#'+upload_id).fileupload({
			url: up_url,
			type: 'POST',
			//possibly not needed will have to seeforceIframeTransport: true,
			autoUpload: false,
			maxFileSize: 9990000,
			acceptFileTypes: /(\.|\/)(pdf|doc|docx)$/i,
			//dropZone: $('#tit_overlay'),
			dataType: 'json',
			done: function ( e, data ) {
				var result = $( 'pre', data.result ).text();
    			//if( result != null && $.trim( result ) != '' )
    		},
    		progressall: function (e, data) {
    			var progress = parseInt(data.loaded / data.total * 100, 10);
    			$('#progress .progress-bar').css('width',progress + '%');
    		}
    	}).on('fileuploadprocessalways', function (e, data) {
    		var index = data.index,
        	file = data.files[index],
        	node = $(data.context.children()[index]);
        	if (index + 1 === data.files.length) {
            data.context.find('button')
            .text('Upload')
            .prop('disabled', !!data.files.error);
       		}
       	}).on('fileuploadadd', function (e, data) {
    		$.each(data.files, function (index, file) {
    			if(!index){
    				data.context = $('<div class="col-md-3 upload-file-names"></div>').appendTo('#'+file_loc_id);
    				data.context.data(data);
    				remove_cross = $('<span class="file-close-cross">X</span>');
    				data.context.append(remove_cross);
    				remove_cross.data(data);
    				remove_cross.click(function(){
    					$(this).data().abort();
    					$(this).parent().remove();
    				});
    				data.context.append(file.name);
    				data.context.append(upload_button.clone(true).data(data));
    			}
    		});
    	}).on('fileuploaddone', function (e, data) {
       		$.each(data.result.files, function (index, file) {
       			if (file.url) {
       				$(data.context[index]).addClass('file_uploaded')
       					.attr('data-upload-name',file.name);
       			} else if (file.error) {
       				var error = $('<span class="text-danger"/>').text(file.error);
       				$(data.context.children()[index])
       				.append('<br>')
       				.append(error);
       			}
       		});
       	}).prop('disabled', !$.support.fileInput)
    	.parent().addClass($.support.fileInput ? undefined : 'disabled');
	};
};

$(document).ready(function(){
	ajCalls.ajPath = "../base/ajCalls/dbCalls.php";
	ajCalls.getTransactions();
	ajCalls.client_id = 1;
	ajCalls.agent_id = 1;
	ajCalls.search_type = "CFPB"; 
	var states = ajCalls.loadStates();
	re_to_ec.init();

	var rE_tit_ov = new Rule_Engine();

	rE_tit_ov.set_ajPath("../base/ajCalls/ruleCalls.php")
		.set_tool(LS.do_tool_name)
		.set_exactMatch(true)
		.set_procType(1);

	var defaultForm_temp = {
			actionButton: "<button class=\"btn btn-default no-print\" type=\"button\" title=\"{{ctx.text}} no-print\">{{ctx.content}}</button>",
			actionDropDownCheckboxItem: "<li><label class=\"{{css.dropDownItem}}\"><input name=\"{{ctx.name}}\" type=\"checkbox\" value=\"1\" class=\"{{css.dropDownItemCheckbox}}\" {{ctx.checked}} /> {{ctx.label}}</label></li>",
			actions: "<div class=\"{{css.actions}}\"></div>", 
			col2: "<div class=\"col-sm-2\"></div>",  
			col25: "<div class=\"col-sm-3\"></div>",            
			icon: "<span class=\"{{css.icon}} {{ctx.iconCss}}\"></span>",
			label:"<div class=\"col-sm-3 top-label\"> </div>",
			row: "<div class=\"row\"></div>",
			inputcheckbox :"<div class=\"col-sm-3 les-input\">{{ctx:elementString}} <span> {{ctx.label}}</span></div>",
			inputradio:"<div class=\"col-sm-3 les-input\">{{ctx:elementString}} <span> {{ctx.label}}</span></div>",
			inputtext:"<div class=\"col-sm-3 top-label\">{{ctx.label}}</div><div class=\"col-sm-3 les-input\">{{ctx.elementString}}</div>",
			print_title:"<div class=\"col-sm-12 print-title\" style=\"text-align: center\">{{ctx.print_title}}</div>",
			inputpassword:"<div class=\"col-sm-3 top-label\">{{ctx.label}}</div><div class=\"col-sm-3 les-input\">{{ctx.elementString}}</div>",
			title:"<div class=\"fs-title col-sm-12\" style=\"text-align: center\">{{ctx.title}}</div>",
			submitButton:"<div class=\"calcBtn no-print\"><button class='btn btn-block btn-lg btn-info no-print'>{{ctx.text}}</button></div>"
	};
	
	var defaultForm = {
		"templates": defaultForm_temp,
		"title":"Closing Cost Estimate Calculator",
		"print_title":"Calculation Inputs",
		"attribute":{
			"id":"disclosure_form"
		},
		"submitButton":{
			"text":"Calculate",
			"attribute":{
				"id":"submit_disclosure_btn"
			},
			"event":{
				"eventType":"click",
				'functionCall':function(event){
					event.preventDefault();
					var rs = false;
					$('.les-required:visible').each(function(index){
						if($(this).val() === null || $(this).val() === ""){
						alert($(this).attr('data-req-mess'));
						rs = true;
					}});
					if(rs) return false;
					var formData = $('#disclosure_form,#endorsement_form').serializeObject();
					var doc_obj = {doc_type:{}};
					formData.sections = ['a','b','c','d','e','f','g','h','e_br_by','e_br_sel','e_br_len','e_br_rec','owner_br','loan_br','sim_br'];
					if(typeof formData.qst === 'undefined') formData.qst = {};
					if(typeof formData.v_qst === 'undefined') formData.v_qst = {};
					$.each($('.doc_type form'),function(){
						if($(this).find(' .doc_type_switch').bootstrapSwitch('state') === true){
							var doc_id = (($(this).parent('div').attr('id').match(/doc_type_([a-zA-Z]+)/)||[]).length > 0 ? $(this).parent('div').attr('id').match(/doc_type_([a-zA-Z]+)/)[1] :'');
							var doc_body = $(this).serializeObject();
							doc_obj.doc_type[doc_id] = doc_body;
							if(typeof doc_body.qst !== 'undefined') $.extend(formData.qst,doc_body.qst);
							if(typeof doc_body.v_qst !== 'undefined') $.extend(formData.v_qst,doc_body.v_qst);
							$.extend(formData, doc_obj);
						}
					}); 
					ajCalls.postForm(formData);
					$('#loan_costs_E_form').click(function(){
						flipBack($('#fee_br'));
					});
					$('#loan_costs_H_form').click(function(){
						flipBack($('#pol_br'));
					});

					//Make result sections editable
					var editable_sections = ['#loan_costs_F_form','#loan_costs_G_form','#loan_costs_A_form'];
					if(editable_sections.length > 0) $.getScript(LS.base_path + 'js/jquery-ui.combobox.js');
					$.each(editable_sections,function(index,section_id){
						$(section_id).click({selector:section_id},flipSection).css('cursor','pointer');
					});
					/* RESULT SECTIONS SmartGrid */

					var his_obj = new hisStateObj({start_obj:'#submit_disclosure_btn',
						show_obj:'#mask,#ov_card,#ov_card .tooltipstered,.card',
						showFunc: 'show',
						hide_obj:'.back',
						hideFunc:'hide'
					});

					//History.pushState(his_obj,'','#results');
					$(this).trigger('ls:done');
					}
			}
		},
		"elements":{
			"item1":{
				"class":"select-block",
				"type":"select",
				"label":"State",
				"attribute":{
					"id" : "state",
					"name": "state",
					"data-placeholder":"Select State"
				},
				"option":states,
				"event":{
					"eventType":"change",
					"functionCall":function(){
						$('#state').change(function(){$('#disclosure_form input,select').not('#state').changeVal('');});
						var st_sel = $('#state option:selected').val(); 
						var trans_type = (typeof ajCalls.trans[st_sel] === 'undefined'? ajCalls.trans['default']: ajCalls.trans[st_sel]);
						$('#transaction option').not('option:contains("Select Option")').remove();
						$.each(trans_type,function(key,name){
							$('#transaction')
							.append($("<option></option>")
								.attr("value",key)
								.text(name)); 
						});
						$('#transaction option:contains("Select Option")').prop('selected',true);
						return ajCalls.getCounties($(this).val());
					}
				}
			},
			"item2":{
				"class":"select-block",
				"type":"select",
				"label":"County",
				"attribute":{
					"id" : "county",
					"name": "county",
					"data-placeholder":"Select County"
				},
				"event":{
					"eventType":"change",
					"functionCall":function(){$('#county').change(function(){$('#disclosure_form input,select').not('#state,#county').changeVal('');}); return ajCalls.getTownships($('#state').val(),$(this).val());}
				}
			},
			"item3":{
				"class":"select-block les-required",
				"type":"select",
				"label":"Township",
				"attribute":{
					"id" : "township",
					"name": "township",
					"placeholder":"Select Town",
					"data-req-mess" : "Please Select A Township"
				}
			},
			"item5":{
				"class":"select-block les-required",
				"type":"select",
				"label":"Transaction",
				"attribute":{
					"id" : "transaction",
					"name": "purpose",
					"data-placeholder":"Please Select Transaction Type"
				},
				"option":{			
				},
				"event":{
					"eventType":"change",
					"functionCall":function(){
						/* ENDORSEMENT  */
						var client_id = null;
						var agent_id = null;
						var trans_id = $(this).val().substr(1);
						if($('#service_provider').length > 0){
							var agent_info = $('#service_provider option:selected').val().split("_");
							post_data.client_id = agent_info[0];
							post_data.agent_id = agent_info[1];
						}
						ajCalls.getEndorsements(client_id,agent_id,$('#state').val(),$('#county').val(),trans_id,null).done(function(){
							var endo_temp = {            
								icon: "<span class=\"{{css.icon}} {{ctx.iconCss}}\"></span>",
								label:"<div class=\"col-sm-3 top-label\"> </div>",
								row: "<div class=\"row\"></div>",
								inputcheckbox :"<div class=\"col-sm-4 les-input\">{{ctx:elementString}} <span> {{ctx.label}}</span></div>",
								inputtext:"<div class=\"col-sm-3 top-label\">{{ctx.label}}</div><div class=\"col-sm-3 les-input\">{{ctx.elementString}}</div>",
								print_title:"<div class=\"col-sm-12 print-title\" style=\"text-align: center\">{{ctx.print_title}}</div>",
								title:'<div class=\"fs-title col-sm-12\" style=\"text-align: center\">{{ctx.title}}</div>',
								submitButton:"<div class=\"calcBtn\"><button class='btn btn-block btn-lg btn-info'>{{ctx.text}}</button></div>"
							};
							var endo_dynamic_fields = {
								"templates": endo_temp,
								"title":"Endorsements",
								"print_title":"Endorsements Selected",
								"attribute":{
									"id":"endorsement_form"
								},"elements": {}};
								var endo_counter = 0;

								$.each(ajCalls.endos,function(id,vals){
									var item = {
										"type": "input",
										"style": {
											"fontSize": "12px"
										},
										"label": vals.name,
										"attribute": {
											"type": "checkbox",
											"name": "endos["+id+"]",
											"value": "1",
											"id": "endo_"+id
										}
									};
									if(vals.checked === "1") item.attribute.checked = "checked";
									endo_dynamic_fields.elements["item"+endo_counter++] = item;
								});

								$('#loan_endos').dynamicform(endo_dynamic_fields);
							});
						/* ENDORSEMENT  */
					}
				}
			}
		}
	};

	var result_template = {
			actionButton: "<button class=\"btn btn-default\" type=\"button\" title=\"{{ctx.text}}\">{{ctx.content}}</button>",
			actionDropDownCheckboxItem: "<li><label class=\"{{css.dropDownItem}}\"><input name=\"{{ctx.name}}\" type=\"checkbox\" value=\"1\" class=\"{{css.dropDownItemCheckbox}}\" {{ctx.checked}} /> {{ctx.label}}</label></li>",
			actions: "<div class=\"{{css.actions}}\"></div>", 
			col2: "<div class=\"col-sm-2\"></div>",  
			col25: "<div class=\"col-sm-6 col-xs-6\" ></div>",            
			icon: "<span class=\"{{css.icon}} {{ctx.iconCss}}\"></span>",
			label:"<div class=\"col-sm-3 top-label\"> </div>",
			row: "<div class='row disclosure_result_row'></div>",
			inputcheckbox :"<div class=\"col-sm-3 les-input\">{{ctx:elementString}} <span> {{ctx.label}}</span></div>",
			inputradio:"<div class=\"col-sm-3 les-input\">{{ctx:elementString}} <span> {{ctx.label}}</span></div>",
			inputtext:"<div class=\"col-sm-3 top-label\">{{ctx.label}}</div><div class=\"col-sm-3 les-input\">{{ctx.elementString}}</div>",
			title:"<div class=\"col-sm-12 no-padding-col\"><div class='section_header_tab disclosure_result_row'>{{ctx.title}}</div></div>",
			submitButton:"<div class=\"calcBtn\"><button class='btn btn-block btn-lg btn-info'>{{ctx.text}}</button></div>"
		};

	var defaultLoanCosts = {
		"title":"Loan Costs",
		"attribute":{
			"id":"loan_costs_form"
		},
		templates: result_template,
		"elements":{
			"item1":{
				"class":"section_header",
				"type":"text",
				"text":"A. Origination Charges",
				"attribute":{
					"id": "origination_charges"
				}
			},
			"item2":{
				"class":"section_header text-right",
				"type":"text",
				"text":"$0",
				"attribute":{
					"id" : "origination_charges_val"
				}
			}
		}
	};

	var doc_type_temp = {
			actionButton: "<button class=\"btn btn-default no-print\" type=\"button\" title=\"{{ctx.text}} no-print\">{{ctx.content}}</button>",
			actionDropDownCheckboxItem: "<li><label class=\"{{css.dropDownItem}}\"><input name=\"{{ctx.name}}\" type=\"checkbox\" value=\"1\" class=\"{{css.dropDownItemCheckbox}}\" {{ctx.checked}} /> {{ctx.label}}</label></li>",
			actions: "<div class=\"{{css.actions}}\"></div>", 
			col2: "<div class=\"col-sm-2\"></div>",  
			col25: "<div class=\"col-sm-3\"></div>",            
			icon: "<span class=\"{{css.icon}} {{ctx.iconCss}}\"></span>",
			label:"<div class=\"col-sm-3 top-label\"> </div>",
			row: "<div class=\"row doc_type_row\"></div>",
			inputcheckbox :"<div class=\"col-sm-3 les-input\">{{ctx:elementString}} <span> {{ctx.label}}</span></div>",
			inputradio:"<div class=\"col-sm-3 les-input\">{{ctx:elementString}} <span> {{ctx.label}}</span></div>",
			inputtext:"<div class=\"col-sm-3 top-label\">{{ctx.label}}</div><div class=\"col-sm-3 les-input\">{{ctx.elementString}}</div>",
			print_title:"<div class=\"col-sm-12 print-title\" style=\"text-align: center\">{{ctx.print_title}}</div>",
			title:'<div class="col-sm-6 col-xs-6 top-label" for="doc_type_switch_{{ctx.title}}">'+
			'{{ctx.title}}</div><div class="col-sm-3 col-sm-offset-3 col-xs-3 col-xs-offset-3 text-right no-print"><input type="checkbox" data-on-text="YES" data-off-text="NO" name="custom-square-switch-icons" data-on-color="info" id="doc_type_switch_{{ctx.title}}" class="doc_type_switch" /></div>',
			submitButton:"<div class=\"calcBtn\"><button class='btn btn-block btn-lg btn-info'>{{ctx.text}}</button></div>"
		};
	var doc_type_arr = {};
	doc_type_arr.deed = {
		"div_id": "doc_type_deed",
		"title": "Deed",
		"attribute":{
			"id":"doc_type_deed_form"
		},
		templates: doc_type_temp,
		"elements":{
			"item1":{
				"class":"form-control",
				"label":"Page Count",
				"type": "input",
				"attribute":{
					"id" : "deed_page_count",
					"name": "page_count",
					"value": 3,
					"type": "text"
				}
			}
		}
	};

	doc_type_arr.mort = {
		"div_id": "doc_type_mort",
		"title": "Mortgage/Deed of Trust",
		"attribute":{
			"id":"doc_type_mort_form"
		},
		templates: doc_type_temp,
		"elements":{
			"item1":{
				"class":"form-control",
				"label":"Page Count",
				"type": "input",
				"attribute":{
					"id" : "mort_page_count",
					"name": "page_count",
					"value": 25,
					"type": "text"
				}
			}
		}
	};

	doc_type_arr.release = {
		"div_id": "doc_type_release",
		"title": "Release of Real Estate Lien",
		"attribute":{
			"id":"doc_type_release_form"
		},
		templates: doc_type_temp,
		"elements":{
			"item1":{
				"class":"form-control",
				"label":"Page Count",
				"type": "input",
				"attribute":{
					"id" : "release_page_count",
					"name": "page_count",
					"value": 3,
					"type": "text"
				}
			},
			"item2":{
				"class":"form-control",
				"label":"Number Of Releases Being Filed",
				"type": "input",
				"attribute":{
					"id" : "release_num_count",
					"name": "num_count",
					"value": 1,
					"type": "text"
				}
			}
		}
	};

	doc_type_arr.ass = {
		"div_id": "doc_type_assign",
		"title": "Assignment",
		"attribute":{
			"id":"doc_type_assign_form"
		},
		templates: doc_type_temp,
		"elements":{
			"item1":{
				"class":"form-control",
				"label":"Page Count",
				"type": "input",
				"attribute":{
					"id" : "assign_page_count",
					"name": "page_count",
					"value": 3,
					"type": "text"
				}
			},
			"item2":{
				"class":"form-control",
				"label":"Number Of Assignments Being Filed",
				"type": "input",
				"attribute":{
					"id" : "assign_num_count",
					"name": "num_count",
					"value": 1,
					"type": "text"
				}
			}
		}
	};

	doc_type_arr.mod = {
		"div_id": "doc_type_mod",
		"title": "Modification",
		"attribute":{
			"id":"doc_type_mod_form"
		},
		templates: doc_type_temp,
		"elements":{
			"item1":{
				"class":"form-control",
				"label":"Page Count",
				"type": "input",
				"attribute":{
					"id" : "mod_page_count",
					"name": "page_count",
					"value": 3,
					"type": "text"
				}
			}
		}
	};

	doc_type_arr.att = {
		"div_id": "doc_type_att",
		"title": "Power of Attorney",
		"attribute":{
			"id":"doc_type_att_form"
		},
		templates: doc_type_temp,
		"elements":{
			"item1":{
				"class":"form-control",
				"label":"Page Count",
				"type": "input",
				"attribute":{
					"id" : "att_page_count",
					"name": "page_count",
					"value": 3,
					"type": "text"
				}
			}
		}
	};

	doc_type_arr.sub = {
		"div_id": "doc_type_sub",
		"title": "Subordination",
		"attribute":{
			"id":"doc_type_sub_form"
		},
		templates: doc_type_temp,
		"elements":{
			"item1":{
				"class":"form-control",
				"label":"Page Count",
				"type": "input",
				"attribute":{
					"id" : "sub_page_count",
					"name": "page_count",
					"value": 3,
					"type": "text"
				}
			},
			"item2":{
				"class":"form-control",
				"label":"Number of Subordination(s)",
				"type": "input",
				"attribute":{
					"id" : "sub_num_count",
					"name": "num_count",
					"value": 1,
					"type": "text"
				}
			}
		}
	};

	doc_type_arr.heloc = {
		"div_id": "doc_type_heloc",
		"title": "Simultaneous HELOC",
		"attribute":{
			"id":"doc_type_heloc_form"
		},
		templates: doc_type_temp,
		"elements":{
			"item1":{
				"class":"form-control",
				"label":"Page Count",
				"type": "input",
				"attribute":{
					"id" : "heloc_page_count",
					"name": "page_count",
					"value": 15,
					"type": "text"
				}
			},
			"item2":{
				"class":"form-control currency",
				"label":"HELOC Amount",
				"type": "input",
				"attribute":{
					"id" : "heloc_amount",
					"name": "amount",
					"value": 0,
					"type": "text"
				}
			}
		}
	};

	//Load in standard dynamic forms
	$("#formContainer").dynamicform(defaultForm);
	$.each(doc_type_arr,function(){
		container_div = this.div_id;
		delete this.div_id;
		$('#'+container_div).dynamicform(this);
	});
	$('#doc_type_deed').dynamicform(doc_type_deed);

	$('#email_quote').click(ds_helper.emailQuote);

	re_to_ec.update($('#init')[0]);
	//Add triggers to dynamic form so that rule engine can be used
	$('#disclosure_form').on('change','select',function(){
			re_to_ec.update(this);
	});

	$('#disclosure_form').on('focusout','input',function(){
			re_to_ec.update(this);
	});
	/*$('#disclosure_form').on('change focusout','select',function(){
			re_to_ec.update(this);
	});

	$('#transaction').on('change',function(){
		re_to_ec.update(this);
	});*/

	/*$('#disclosure_form').on('change','#loan_amount,#purchase_price',function(){
		var formData = $('#disclosure_form').serializeObject();
		if(!('loan_amount' in formData)) formData.loan_amount = 200000;
		if(!('purchase_price' in formData)) formData.purchase_price = 300000;
		var doc_obj = {doc_type:{}};
		if(typeof formData.qst === 'undefined') formData.qst = {};
		if(typeof formData.v_qst === 'undefined') formData.v_qst = {};
		$.each($('.doc_type form'),function(){
			if($(this).find(' .doc_type_switch').bootstrapSwitch('state') === true){
				var doc_id = (($(this).parent('div').attr('id').match(/doc_type_([a-zA-Z]+)/)||[]).length > 0 ? $(this).parent('div').attr('id').match(/doc_type_([a-zA-Z]+)/)[1] :'');
				var doc_body = $(this).serializeObject();
				doc_obj.doc_type[doc_id] = doc_body;
				if(typeof doc_body.qst !== 'undefined') $.extend(formData.qst,doc_body.qst);
				if(typeof doc_body.v_qst !== 'undefined') $.extend(formData.v_qst,doc_body.v_qst);
				$.extend(formData, doc_obj);
			}
		});
		ajCalls.getFirstAmQs(formData);
	});*/

	//initialize the ov_tit form
	var tit_ov_init = rE_tit_ov.compute_rules('init');
	if(typeof tit_ov_init !== 'undefined'){
		$.each(tit_ov_init, function(index,resultVal){
			var options = JSON.parse(resultVal.result_options);
			$('#tit_overlay_form').dynamicform(resultVal.result_method,options);
		});
		rE_tit_ov.set_enabledResults(tit_ov_init,'init');
		//hack around to add event to the upload
		up_frm = new uploadControl();
		up_frm.init('tit_up','files','tit_overlay');
    }

	//Clicking grey mask hides children
	$('#mask, #overlay_close').click(function(){
		$('#mask').hide();
		$('#cancel_section').click();
		$('#ov_card').flip(false);
		$('#overlay').find('.tooltipstered').tooltipster('hide');
		$(window).trigger('popstate');
	}).children().click(function(e) {
		e.stopPropagation();
	});

	$('#print_quote').click(function(){
		ajCalls.getClientInfo().done(function(){
			var client_info = ds_helper.clientInfoPrint(ajCalls.client_info);
			$(".main-row").print({
				globalStyles: true,
				mediaPrint: true,
				stylesheet: null,
				noPrintSelector: ".no-print",
				iframe: true,
				append: '.client_print,#disclosure_form,.doc_type_pr',
				prepend: client_info,
				manuallyCopyFormValues: true,
				deferred: $.Deferred()
			});
		});
	});

	$('.print_card').click(function(){
		var self = this;
		ajCalls.getClientInfo().done(function(){
			var client_info = ds_helper.clientInfoPrint(ajCalls.client_info);
			$(self).parents(':eq(1)').next('.brk_row').print({
				globalStyles: true,
				mediaPrint: true,
				stylesheet: null,
				noPrintSelector: ".no-print",
				append: '.brk_row:visible:not(:first),.client_print,#disclosure_form,.doc_type_pr',
				iframe: true,
				prepend: client_info,
				manuallyCopyFormValues: true,
				deferred: $.Deferred()
			});
		});
	});

	$(".doc_type_switch").bootstrapSwitch();
	ls_helper.switchFunction();

	//iniate the overlay card to flip
	$("#ov_card").flip({
        axis: "y",
        reverse: true,
        trigger: "none",
        speed:1000
    });

	//flip to order title attachement when order title button clicked.
    $('#order_tit_btn').click(function(){
    	flipBack($('#tit_or'));
    });

    //flip back to normal when clicked
    $('.cancel_back').click(function(){
    	flipFront($('#tit_or'));
    });

    $('#cancel_section').click(function(){
    	$('#section_br_cnt form .row:not(:first,:has(div.section_header))').find('div:first').toggleClass('col-sm-6 col-sm-9');
    	$('#section_br_cnt form .row:not(:first,:has(div.section_header))').find('div:not(:first)').toggleClass('col-sm-2 col-sm-3').removeClass('col-sm-offset-1');
    	$('#section_br_cnt form').css("cursor","pointer");
    	$('#section_br_cnt form div').css("font-size","");
    	$('#section_br_cnt form .row').css('margin-bottom','0px');
		$('#section_br_cnt .glyphicon').remove();
    	$('#section_br_cnt form .les_name').each(function(){
    		if($(this).data('lodestarCombobox'))$(this).combobox('destroy');
    	});
    	var result_section_id = $('#section_br_cnt form').attr('id');
    	$('#section_br_cnt form').click({selector:'#'+result_section_id},flipSection).css('cursor','pointer');
    	result_section_id = result_section_id.substring(0,result_section_id.lastIndexOf("_"));
    	$('#'+result_section_id).append($('#section_br_cnt form'));
    	if(result_section_id === 'loan_costs_A'){
    		$('#loan_costs_start').append($('#section_br_cnt form'));
    	}
    });

    var flipSection = function(event){
    	var selector = event.data.selector;
    	$('#section_br_cnt').append($(selector));
    	$(selector).css('cursor','auto');
    	$('#section_br_cnt form .row:not(:first,:has(div.section_header))').find('div:first').toggleClass('col-sm-9 col-sm-6');
    	$('#section_br_cnt form .row:not(:first,:has(div.section_header))').find('div:not(:first)').toggleClass('col-sm-3 col-sm-2').addClass('col-sm-offset-1');
    	$('#section_br_cnt form .row:not(:first,:has(div.section_header))').find('div:first').after('<div class="col-sm-1 glyphicon btn fui-trash section-trash-btn text-center"></div><div class="col-sm-1 col-sm-offset-1 glyphicon btn fui-new section-edit-btn text-center"></div>');
    	$('#section_br_cnt form div').css('font-size','20px');
    	$('#section_br_cnt form btn').css('font-size','18px');
    	$('#section_br_cnt form .row').css('margin-bottom','1px');
    	$(this).off('click');
    	$('#section_br_cnt form .section-trash-btn').click(function(){
    		$(this).parent('.row').remove();			
    	});
    	$('#section_br_cnt form').on('click','.section-edit-btn',function(){
    		var source_data = $(this).parents('form').data('lodestarComboBoxDataHolder')?$(this).parents('form').data('lodestarComboBoxDataHolder').source:{};
    		$(this).siblings('.les_name').combobox({
    			source:source_data,
    			changeComplete:function(event,ui){
    				$(this).parents('.les_name').siblings('les_val').text(ui.item.value).each(function(){
    					if($('#rnd_switch').prop('checked')) $(this).formatCurrency({'roundToDecimalPlace':0});
						else $(this).formatCurrency({'roundToDecimalPlace':2});
					});
    			}
    		});
    		$(this).removeClass('section-edit-btn fui-new').addClass('fui-lock section-save-btn');
    	});
    	$('#section_br_cnt form').on('click','.section-save-btn',function(){
    		$(this).siblings('.les_name').combobox('destroy');
    		$(this).removeClass('fui-lock section-save-btn').addClass('section-edit-btn fui-new');
    	});
    	flipBack($('#section_br'));
    };

    var flipFront = function(){
    	$('.card_back').hide();
    	$("#ov_card").flip(false);
    	$('.back').hide();
    };

    //function to flip to the back of a card
    var flipBack = function($ele){
    	$('.card_back').not($ele).hide();
    	$('.back').show();
    	$ele.show();
    	$("#ov_card").flip(true);
    	$('#overlay').find('.tooltipstered').tooltipster('hide');
    };

    //section break Down add rows

    $('#dl_los').click(function(e){
    	e.preventDefault();
    	var postData = {'method':'downloadUCD'};
    	$("body").append('<form style="display:none;" id="invisible_form" action="../base/ajCalls/file_downloads.php" method="post" target="_blank">' +
    		'<input name="method" type="hidden" value="downloadUCD"> </form>');
    	$('#invisible_form').submit();
    	$('#invisible_form').remove();

    });

    //when submit order button is clicked
    $('#submit_order').click(function(e){
    	e.preventDefault();
    	if($('#tit_port option:selected').val() === 'default'){
    		alert('Please select which portal you would like to use');
    		return;
    	}

    	var file_names = [];
    	$('.file_uploaded').each(function(){
    		file_names.push($(this).attr('data-upload-name'));
    	});

    	var tit_meth = $('#tit_port option:selected').val();
    	var html_attachment = {html:ds_helper.resultHTML()};
    	var meta_data = {
    		'state': $('#state').val(),
            'transaction': $('#transaction option:selected').text(),
    		'file_names': file_names,
    		'html_attachment': html_attachment
    	};

    	if(query_params.no_login !== undefined){
    		meta_data.user_email = prompt('Please Enter The Email Address You Would Like To Use For This Order','sample@lodestarss.com');
    		if(meta_data.user_email === null) return;
    	}

    	var message = '';
    	$('#tit_overlay_form input').each(function(index,value){
    		var label = $(value).parent().prev('.top-label').text();
    		message += label + ': ' + $(value).val() + "\r\n";
    	});
    	message += 'Specific Instructions: ' + $('#message_txt_area').val();

    	$.extend(meta_data,$('#disclosure_form').serializeObject());
    	titCalls.postTitle(message,meta_data,tit_meth);
    });

    $(".container").mCustomScrollbar({
    	theme:"minimal-dark"
    });

    $('#loan_costs_E').tooltipster({
    	animation: 'fade',
    	delay: 0,
    	theme: 'tooltipster-default no-print tip_clickable',
    	position:'top',
    	touchDevices: false,
    	trigger: 'custom',
    	content:$('<img src="../base/Images/close.png" class="closeBtn tip_close" id="br_tip_close" alt="Close" title="Click To Close" style="z-index: 10000;height: 15px;top: -10px;right: -7px;"><div>Click This Section To See Itemized Breakdown And Move Taxes By Dragging.</div>'),
    	functionReady: function(origin, tooltip){ 
        	$(tooltip).on('click','.tip_close',function(){
            	origin.tooltipster('hide');
        });
    }});
    $('#loan_costs_H').tooltipster({
    	animation: 'fade',
    	delay: 0,
    	theme: 'tooltipster-default no-print tip_clickable',
    	position:'bottom',
    	touchDevices: false,
    	trigger: 'custom',
    	content:$('<img src="../base/Images/close.png" class="closeBtn tip_close" id="pol_tip_close" alt="Close" title="Click To Close" style="z-index: 10000;height: 15px;top: -10px;right: -7px;"><div>Click This Section To See Title Premiums Break Down.</div>'),
    	functionReady: function(origin, tooltip){ 
        	$(tooltip).on('click','.tip_close',function(){
            	origin.tooltipster('hide');
        });
    }});

    $('#submit_disclosure_btn').on('ls:done',function(){
    	//make sure transaction is suppose to have policy if not sending alert
    	if(ajCalls.last_raw.transaction_tags.indexOf("3") < 0){
    	if((ajCalls.last_raw.LoanPol == 0 && $('#loan_amount').cleanVal() > 0) || ($('#purchase_price').length > 0 && $('#purchase_price').cleanVal() > 0 && $('#loan_amount').cleanVal() === 0 &&  ajCalls.last_raw.ownerspol == 0) ||
    		($('#purchase_price').length > 0 && $('#purchase_price').cleanVal() > 0 && $('#loan_amount').cleanVal() > 0 &&  ajCalls.last_raw.ownerspol == 0 && ajCalls.last_raw.LoanPol == 0)){
    		var p_n = (typeof LS.mortconnect_contact_number !== 'undefined'?'at '+LS.mortconnect_contact_number:'');
    		alert('Please contact us for an accurate quote on this transaction ' +p_n);}}
    });

    $('#rnd_switch').bootstrapSwitch();
    $('#rnd_switch').on('switchChange.bootstrapSwitch',function(){
    	if($(this).prop('checked')) $('.les_val').formatCurrency({'roundToDecimalPlace':0});
    	else{
    		$('.les_val').each(function(){
    			$(this).text($(this).attr('data-base-text'));
    		});
    		$('.les_val').formatCurrency({'roundToDecimalPlace':2});
    	}
    });

    var queryParam = get_query_params();
    if(queryParam.order_only !== undefined){
    	$("#ov_card").flip(true);
    	$('#mask').show();
    	$('#fee_br').hide();
    	$('#tit_or').show();
    }

    var his_obj = new hisStateObj({start_obj:'#submit_disclosure_btn',
    	show_obj:'#mask,#ov_card,#ov_card .tooltipstered,.card',
    	showFunc: 'show',
    	hide_obj:'.back',
    	hideFunc:'hide'
    });

    /*History.pushState(his_obj,'','#start');
     History.Adapter.bind(window,'statechange',function(){
     	var his_state = History.getState;
		if (typeof his_state !== undefined && his_state !== null){
			var state_vals = his_state.settings;
			if(state_vals.start_obj === '#submit_disclosure_btn'){
				$('#overlay').find('.tooltipstered').tooltipster('hide');
			}
		}
	});*/

	/* TAB  */
	$("div.tab-menu>div.list-group>a").click(function(e) {
		e.preventDefault();
		$(this).siblings('a.active').removeClass("active");
		$(this).addClass("active");
		var index = $(this).index();
		$("div.tab>div.tab-content").removeClass("active");
		$("div.tab>div.tab-content").eq(index).addClass("active");
	});
	/* TAB  */
	
});
//@ sourceURL=dynamic_form.js