var ajCalls = {
	ajPath: "", 
	client_id: 1,
	agent_id: 1,
	county: "",
	trans:[],
	ucd:'',
	br_tip_shown:false,
	client_info: {},
	isLoggedIn : function(data){
		if(typeof data === 'string' && data.search('status') > 0) data = $.parseJSON(data);
		if($.isPlainObject(data) && 'status' in data && data.status === 'failed'){
			alert(data.message);
			window.location = 'logout.php?'+ window.location.href.split("?")[1];
		}
	},
	loadStates : function(){
		var self = this;
		return $.ajax({
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
        	self.isLoggedIn(data);
        }});
	},
	getCounties: function(state){
		var self = this;
		return $.ajax({
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
			}});
	},
	getTownships: function(state,county){
		var self = this;
		return $.ajax({
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
			}});
	},
	getTransactions: function(){
		var self = this;
		return $.ajax({
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
			}});
	},
	postForm: function(post_data,track_data){
		var self = this;
		return $.ajax({
			url:this.ajPath,
			type: "post",
			async:false,
			dataType:'json',
			data:{
				'method':'callEngine',
				'options':post_data	
			},
			success: function(resultSections) 
			{
				self.isLoggedIn(resultSections);	
				if(track_data !== undefined) self.trackAction(track_data);
				if(!self.br_tip_shown){
					self.br_tip_shown = true;}
			},
			error: function (header, status, error) {
                console.log('ajax answer post returned error ' + header + ' ' + status + ' ' + error);
            }
		});
	},
	trackAction: function(track_data){
		var self = this;
		return $.ajax({
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
	email: function(email_to,subject,email_body,attachment){
		var self = this;
		return $.ajax({
			url:this.ajPath,
			type: "post",
			async:true,
			data:{
				'method':'emailLoanEstimate',
				'options': {
					'to_name': email_to,
					'subject':subject,
					'email_body':email_body,
					'attachment': attachment
				}	
			},
			success: function(emailMessage) 
			{
				self.isLoggedIn(data);	
				alert(emailMessage);
			}
		});
	}};

var clientInfoPrint = function (client_info){
    	var output = $('<div class="">');
    	output.append($('<div class="row" style="margin-bottom:0px;"/>'))
    	.append($('<div class="col-xs-4" style="margin-bottom:0px;"/>').append($('.logo').clone()))
    	.append($('<div class="col-xs-4 print_title" style="font-size:20px;font-weight:bold;vertical-align:bottom;text-align: center;margin-bottom:0px;"/>').text(client_info.Name));
    	output.append($('<div class="row" ></div>'))
    	.append($('<div class="col-xs-4 header_bot" style="text-align: center;margin-bottom:15px;border"/>').text('Email: '+client_info.Email))
    	.append($('<div class="col-xs-4 header_bot" style="text-align: center;margin-bottom:15px;"/>').text('Phone Number: '+client_info.Phone))
    	.append($('<div class="col-xs-4 header_bot" style="text-align: center;margin-bottom:15px;"/>').text('Website: '+client_info.Website));
    	return output;
    };

$.fn.changeVal = function (v) {
    return $(this).val(v).trigger("change");
};

