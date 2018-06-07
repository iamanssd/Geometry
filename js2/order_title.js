var re_to_ec = {
	rE:"",
	rE_doc_type:"",
	rE_tit_ov:"",
	init: function(){
		this.rE = new Rule_Engine();
		this.rE_doc_type = new Rule_Engine();
		this.rE_tit_ov =  new Rule_Engine();

		this.rE.set_ajPath(LS.base_path+"ajCalls/ruleCalls.php")
		.set_tool(LS.df_tool_name)
		.set_exactMatch(true)
		.set_procType(1);

		this.rE_doc_type.set_ajPath(LS.base_path+"ajCalls/ruleCalls.php")
		.set_tool(LS.dd_tool_name)
		.set_exactMatch(true)
		.set_procType(1);
	},
	update: function($ele){
		var resultArr = this.rE.compute_rules($ele.id);
		var doc_resultArr = this.rE_doc_type.compute_rules($ele.id);

		if(this.rE.enabledResults && this.rE.enabledResults[$ele.id]){
			var undoArr = this.rE.enabledResults[$ele.id];
			$.each(undoArr, function(index,resultVal){
				var options = JSON.parse(resultVal.result_options);
				$("#formContainer").dynamicform("Undo"+resultVal.result_method,options);
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
		}
};

$.fn.changeVal = function (v) {
    return $(this).val(v).trigger("change");
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
		up_url = up_url.slice(0,up_url.lastIndexOf('/')+1) + LS.base_path+'int/int_upload_handler.php';
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
	ajCalls.ajPath = LS.base_path+"ajCalls/dbCalls.php";
	re_to_ec.init();

	var rE_tit_ov = new Rule_Engine();

	rE_tit_ov.set_ajPath(LS.base_path+"ajCalls/ruleCalls.php")
		.set_tool(LS.so_tool_name)
		.set_exactMatch(true)
		.set_procType(1);

	var titCalls = {
		ajPath: "../base/int/int_handler.php", 
		postTitle: function(body_message,meta_data,method){
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
				success: function(sendData){
					alert('Your order has been sent! You should be receiving a response shortly.');
				}
			});
		}
	};
	//initialize the ov_tit form
	var tit_ov_init = rE_tit_ov.compute_rules('init');
	if(typeof tit_ov_init !== 'undefined'){
		$.each(tit_ov_init, function(index,resultVal){
			var options = JSON.parse(resultVal.result_options);
			$('#tit_overlay_form').dynamicform(options,resultVal.result_method);
		});
		rE_tit_ov.set_enabledResults(tit_ov_init,'init');
		//hack around to add event to the upload
		up_frm = new uploadControl();
		up_frm.init('tit_up','files','tit_overlay');
    }

	$('#print_quote').click(function(){
		 $(".main-row").print({
            globalStyles: true,
            mediaPrint: false,
            stylesheet: null,
            noPrintSelector: ".no-print",
            iframe: true,
            append: '.client_print,#disclosure_form,.doc_type_pr',
            prepend: null,
            manuallyCopyFormValues: true,
            deferred: $.Deferred()
    	});
	});

	$('#email_quote').click(function(){
		 var email_to = prompt("email address","test@lodestarss.com");
		 if(email_to === null) return;
		 var subject = 'Loan Estimate Quote';
		 var result_clone = $('.main-row').clone();
		 result_clone.append(getjQueryObject('.client_print,#disclosure_form,.doc_type_pr'));
		 var head_clone = $('<head></head>').append($('head').html());
		 head_clone.append('<link rel="stylesheet" type="text/css" href="css/pdf.css"/>');
		 head_clone.cssAbsURL();
		 var email_body = 'This is a loan estimate email';
		 var attachment = { type: 'application/pdf',
		 	name: 'loan estimate.pdf',
		 	html: '<!DOCTYPE html><html>'+head_clone.html()+"<body>"+result_clone.html()+"</body></html>"
		 };
		 ajCalls.email(email_to,subject,email_body,attachment);
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
    	var meta_data = {
    		'state': $('#state').val(),
            'transaction': $('#transaction option:selected').text(),
    		'file_names': file_names
    	};

    	if(query_params.no_login !== undefined){
    		meta_data.user_email = prompt('Please Enter The Email Address You Would Like To Use For This Order','sample@lodestarss.com');
    		if(meta_data.user_email === null) return;
    	}

    	$.extend(meta_data,$('form').serializeObject());
    	var message = '';
    	$('form input,form select:not(#tit_port)').each(function(index,value){
    		var label = $(value).parent().prev('.top-label').text();
			if($(value).attr('id') === 'transaction') message += label + ': ' + $(value).find('option:selected').text() + "\r\n";
    		else message += label + ': ' + $(value).val() + "\r\n";
    	});
    	message += 'Specific Instructions: ' + $('#message_txt_area').val();
    	titCalls.postTitle(message,meta_data,tit_meth);
    });

    var resultHTML = function(){
    	var result_clone = $('.main-row').clone();
    	var head_clone = $('<head></head>').append($('head').html());
    	head_clone.append('<link rel="stylesheet" type="text/css" href="css/pdf.css"/>');
    	head_clone.cssAbsURL();
    	var final_html = '<!DOCTYPE html><html>'+head_clone.html()+"<body>"+result_clone.html()+"</body></html>";
    	return final_html;
    };
						
    var getjQueryObject = function(string) {
        // Make string a vaild jQuery thing
        var jqObj = $("");
        try {
            jqObj = $(string)
                .clone();
            var selects = jqObj.find("select");
            $(selects).each(function(i) {
                $(string).find('select');
                var ori_val = $(string).find("select").eq(i).val();
                $(this).find('option[selected=""]').removeAttr('selected');
                $(this).find('option[value="'+ori_val+'"]').attr("selected", "");
            });
            var input_text = jqObj.find('input[type="text"]');
            $(input_text).each(function(i) {
            	$(this).attr('value',$(this).val());
            });
        } catch (e) {
            jqObj = $("<span />")
                .html(string);
        }
        return jqObj;
    };
    $(".container").mCustomScrollbar({
    	theme:"minimal-dark"
    });

});
//@ sourceURL=order_title.js