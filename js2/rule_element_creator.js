/*! 
 * jQuery dynamicForm  v1.1.0 - 03/10/2015
 */
 ;(function ($, window, undefined)
 {
 	"use strict";

 	var namespace = ".jquery.dynamicform";

 	var old = $.fn.dynamicform;
 	$.fn.dynamicform = function (option)
 	{
 		var args = Array.prototype.slice.call(arguments, 1);

 		return this.each(function ()
 		{
 			var $this = $(this),
 			instance = $this.data(namespace),
 			options = typeof option === "object" && option;
 			if (!instance && option === "destroy")
 			{
 				return;
 			}
 			if (!instance)
 			{
 				$this.data(namespace, (instance = new FormStructure(this,option)));
 				init.call(instance);
 			}
 			if (typeof option === "string")
 			{	
 				if(option === 'UndoAddFormElements') return $this.data('removed_eles',instance[option].apply(instance, args));
 				if(args.length > 0)	return instance[option].apply(instance, args);
 				else return instance[option].apply(instance);
 			}
 		});
 	};

 	$.fn.dynamicform.Constructor = FormStructure;

 	var FormStructure = function(element,option)
 	{
 		this.element = $(element);
 		this.form = null;
 		this.attribute = option.attribute;
 		this.submitBtn = option.submitButton;
 		this.title = option.title;
 		this.print_title = option.print_title;
 		this.formElements = option.elements;
 		this.css = (typeof option.css !== 'undefined'? option.css : FormStructure.defaults.css);
 		this.templates =  (typeof option.templates !== 'undefined'? option.templates : FormStructure.defaults.templates);
 		this.cachedParams = {
 			lbl: option.labels,
 			css: option.css,
 			ctx: {}
 		};

 		this.createElement = function (element_type){
 			var node = document.createElement(element_type);
 			return node;
 		};

 		this.rowTypeSelector = function(element,force_row,prev_ele_id,spec_loc){
 			return $(this.templates.row);
 		};

 		if(typeof option.rowTypeSelector !== 'undefined'){
 			this.rowTypeSelector = option.rowTypeSelector;
 		}

 		this.applySTYLE = function(element,style){
 			$(element).css(style);
 		};

		//Insert text value
		this.applyTEXT = function(element,text){
            if($(element).children('div[class*="col-"]')) {
                var text2 = document.createTextNode(text);      // Create a text node
                $(element).append(text2);
            }
            else{
                $(element).append(text);
            }
		};


		//Insert value
		this.applyVALUE = function(element,value){		
			$(element).val(value);
		};
	
		//Creating options for select element 
		this.applyOPTION = function (element,options){
			var default_flag = false;
			$.each(options, function( index, value ) {
				if(index === 'default' && value !== 'false'){
					var default_opt = new Option(value,index,true,true);
					$(default_opt).html(value);
					default_opt.disabled = true;
					default_flag = true;
					element.appendChild(default_opt);
				}
				else if(index === 'default' && value === 'false'){
					default_flag = true;
				}
				else{
					var opt = new Option(value,index);
					$(opt).html(value);
					element.appendChild(opt);
				} 				
			});
			if(default_flag === false){
				var default_opt = new Option("Select Option","",true,true);
				$(default_opt).html("Select Option");
				default_opt.disabled = true;
				element.appendChild(default_opt);
			}
	};
	
		this.applyEVENT = function(element,event){
			var event_type = event.eventType;
			var func = event.functionCall;
			if (typeof(func) !== "function") {
				func = function(){eval(event.functionCall)};
			}
			$(document).on(event_type+'.ls_ele_creator', '#'+element.id, func);
		};

		this.ElementInit = function(init){
			if(typeof(init) === "function") init();
			if (typeof(init) === "string") eval(init);
		};
	
		this.applyCLASS = function(element,class_name){
			$(element).addClass(class_name);
		};
	
		this.removeCLASS = function(element,value){
			$(element).removeClass(class_name);
		};

	//move col elements to previous row if there is space
	this._moveCol = function(curr_row){
		var next_row = curr_row.next('.row');
		if(next_row.length !== 0){
			var move_col_size = 0;
			
			var next_row_children = next_row.children('div[class*="col-"]');
			var move_col = next_row_children.slice(0,1);

			//label columns cannot change rows by themselves. Check to see if its a label column
			if(move_col.hasClass('top-label')){
				move_col = next_row_children.slice(0,2);
			}
			if(this._rowHasSpace(curr_row,move_col) >= 0){
				curr_row.append(move_col);
			}
		}
		else return;
		this._moveCol(next_row);
	};

	//push col elements into rows until all rows are at or below max row space
	this._pushCol = function(curr_row){
		if(this._rowFullness(curr_row,12) < 0){
			var next_row = curr_row.next('.row');
			if(next_row.length === 0){
				next_row = $(this.templates.row);
				curr_row.after(next_row);
			}
			var move_col = curr_row.children('div[class*="col-"]:last');
			move_col.remove();
			while(this._rowFullness(curr_row,12) < 0){
				var add_ele = curr_row.children('div[class*="col-"]:last');
				move_col = move_col.add(add_ele);
				add_ele.remove();
			}
			if(curr_row.children('div[class*="col-"]:last').hasClass('top-label')) move_col = move_col.add(curr_row.children('div[class*="col-"]:last'));
			next_row.prepend(move_col);
			this._pushCol(next_row);
		}
		else return;
	};

	this._rowFullness = function(row,row_max){
		var row_fullness = 0;
		$.each(row.children('div[class*="col-"]'),function(){	
			row_fullness += $(this).getcolWidth(true);
		});
		return row_max - row_fullness;
	};

	this._rowHasSpace = function(row,element){
		var row_space = this._rowFullness(row,12); 
		var element_size = 0;
		$.each(element,function(){	
			element_size += $(this).getcolWidth(true);
		});
		return row_space - element_size;
	};
};

	//Default form structure parameters 
	FormStructure.defaults = {
		css: {
			button: "btn btn-block btn-lg btn-info", 
			center: "text-center",            
			left: "text-left",
			right: "text-right",
			inputText: "form-control"
		},
		templates: {
			button: "<div class=\"col-md-3 les-input\">{{ctx:elementString}}</div>",
			actionDropDownCheckboxItem: "<li><label class=\"{{css.dropDownItem}}\"><input name=\"{{ctx.name}}\" type=\"checkbox\" value=\"1\" class=\"{{css.dropDownItemCheckbox}}\" {{ctx.checked}} /> {{ctx.label}}</label></li>",
			actions: "<div class=\"{{css.actions}}\"></div>", 
			col2: "<div class=\"col-md-2\"></div>",  
			col25: "<div class=\"col-md-3\"></div>",            
			icon: "<span class=\"{{css.icon}} {{ctx.iconCss}}\"></span>",
			label:"<div class=\"col-md-3 top-label\"> </div>",
			row: "<div class=\"row\"></div>",
			inputcheckbox :"<div class=\"col-md-3 les-input\">{{ctx:elementString}} <span> {{ctx.label}}</span></div>",
			inputradio:"<div class=\"col-md-3 les-input\">{{ctx:elementString}} <span> {{ctx.label}}</span></div>",
			inputtext:"<div class=\"col-md-3 top-label\">{{ctx.label}}</div><div class=\"col-md-3 les-input\">{{ctx.elementString}}</div>",
			print_title:"<div class=\"col-md-12 print-title\" style=\"text-align: center\">{{ctx.print_title}}</div>",
			inputpassword:"<div class=\"col-md-3 top-label\">{{ctx.label}}</div><div class=\"col-md-3 les-input\">{{ctx.elementString}}</div>",
			title:"<div class=\"fs-title col-md-12\" style=\"text-align: center\">{{ctx.title}}</div>",
			submitButton:"<div class=\"calcBtn no-print\"><button class='btn btn-block btn-lg btn-info no-print'>{{ctx.text}}</button></div>"
		},
		draggable: false
	};

	//Calculation where to place Newly created element on the form 888
	FormStructure.prototype.ElementRowPlacement = function(element,force_row,prev_ele_id,spec_loc)
	{	
		//Allows to define the previous element 
		if(prev_ele_id){
			var prev_ele = $('#'+prev_ele_id).closest('div[class*="col-"]');
			prev_ele.after(element);
			this._pushCol(prev_ele.closest('.row'));
		}
		else{
			var last_row = $(this.form.find(".row").last());

			if(this._rowHasSpace(last_row,element) >= 0 && last_row.length !== 0 && !force_row)
			{
				last_row.append(element);
				return;
			}
			var new_row = this.rowTypeSelector(element,force_row,prev_ele_id,spec_loc);
			new_row.append(element);
			if(last_row.length === 0) this.form.append(new_row);
			else last_row.after(new_row);
		}
	};
	
	FormStructure.prototype.AddSubmitButton = function (formBtn)
	{
		var self = this;
		if(typeof formBtn === 'undefined'){
			formBtn = this.submitBtn;
		}
		//else{
		//	formBtn = this.submitBtn;
		//}
		
		var btn = $(this.templates.submitButton.resolve(getParams.call(this, { text: formBtn.text })));
		this.AddAttribute(btn.find('button'),formBtn.attribute);

		$.each(btn.find('button'),function(index,value){
			self.applyEVENT(value,formBtn.event);
		});	
		this.form.append(btn);
	};
	//Function to initially create the Form. Not necessary to call.
	FormStructure.prototype.CreateForm = function(formElement){
		this.AddFormElements(formElement);
	};

	//Function to add form elementString
	FormStructure.prototype.AddFormElements = function(formElement)
	{
		if(formElement !== undefined){
			
			formElement = formElement.elements;
		}
		else{
			
			formElement = this.formElements;
			
		}
		var self = this;
		if(typeof formElement === 'object'){
			$.each(formElement, function( index, value ) {

				var element_type = value.type;
				var element_label = value.label;
				var element_template_col = (typeof value.template_col !== 'undefined' ? value.template_col : self.templates.col25);
                var default_temp_flag = (typeof value.template_col === 'undefined' ? true : false);
                var element_force_row = (typeof value.force_row !== 'undefined' && value.force_row ==='true' ? true:false);
                var element_prev_ele = (typeof value.prev_ele !== 'undefined'? value.prev_ele:false);
				var element = (value.type === "text"? $(element_template_col) : self.createElement(value.type));
				var element_init = (value.init !== "undefined"? value.init : null);
				var field_type = null;
				if(value.attribute !== undefined){
					
					field_type = value.attribute.type;
				}
				var colElement;
				self.AddAttribute(element,value.attribute);
				delete value.type;
				delete value.attribute;
				delete value.label;
				delete value.template_col;
				delete value.init;
				delete value.force_row;
				delete value.prev_ele;
				for (var key in value) {

					var func_name = "apply"+key.toUpperCase();
					self[func_name](element,value[key]);
				}
				if(element_type == "input" && typeof element_label !== 'undefined'){
					if(typeof self.templates[element_type+field_type] !== 'undefined' && default_temp_flag === true )
       					colElement = $(self.templates[element_type+field_type].resolve(getParams.call(this, { label: element_label,elementString: $(element).prop('outerHTML') })));
  					else
                    	colElement = $(element_template_col.resolve(getParams.call(this, { label: element_label,elementString: $(element).prop('outerHTML') })));					
				}
				else if(element_type == "input"){
					if(typeof self.templates[element_type+field_type] !== 'undefined' && default_temp_flag === true )
       					colElement = $(self.templates[element_type+field_type].resolve(getParams.call(this, {elementString: $(element).prop('outerHTML') })));
  					else
                    	colElement = $(element_template_col.resolve(getParams.call(this, {elementString: $(element).prop('outerHTML') })));
				}
				else if(element_type == "button"){
                    if(typeof self.templates[element_type] !== 'undefined' && default_temp_flag === true)
                        colElement = $(self.templates[element_type].resolve(getParams.call(this,{elementString: $(element).prop('outerHTML')})));
                    else
                        colElement = $(element_template_col.resolve(getParams.call(this,{elementString: $(element).prop('outerHTML')})));
				}
				else if(element_type === "text"){
					colElement = element;
				}
				else if(element_type === "hidden"){

				}
				else if(typeof element_label !== 'undefined'){
					var colLabel = $(self.templates.label).append(element_label).prop('outerHTML');
					colElement = $(colLabel+$(element_template_col).append(element).prop('outerHTML'));
				}
				else{
					colElement = $($(element_template_col).append(element).prop('outerHTML'));
				}
				
				self.ElementRowPlacement(colElement,element_force_row,element_prev_ele);
				self.ElementInit(element_init);
				$('#'+element.id).trigger('ls:add-complete');
			});		
		}	
	};

	//remove previously added elements
	FormStructure.prototype.UndoAddFormElements = function(formElement)
	{
		if(formElement !== undefined){
		 	formElement = formElement.elements;
		}
		else{
			formElement = this.formElements;
		} 
		var removed_eles = []; 
		var self = this;
		if(typeof formElement === 'object'){
			$.each(formElement, function( index, value ) {
				removed_eles.push(value.attribute);
				self.UndoElementRowPlacement($('#'+value.attribute.id));
			});
		}
		return removed_eles;	
	};

	//remove already placed elment. Also check to see if other elements
	//need to be moved up to replace old elements.
	FormStructure.prototype.UndoElementRowPlacement = function(element)
	{
		var curr_row = element.closest('.row');
		var row_element_content_width = 0;
		var last_row = $(this.form.find(".row").last());
		var ele_id = element.attr('id');

		if(element.parent().prev().hasClass('top-label')){
			var ele_prev_id = element.prev().attr('id');
			$(document).off('.ls_ele_creator', '#'+ele_prev_id);
			element.parent().prev().off();
			element.parent().prev().children().off();
			element.parent().prev().remove();
		}
		$(document).off('.ls_ele_creator','#'+ele_id);
		element.parent().off();
		element.parent().children().off();
		element.parent().remove();

		curr_row.children().each(function () {
			row_element_content_width += $(this).outerWidth();
		});
		
		this._moveCol(curr_row);
		
		if(last_row.children().length === 0) last_row.remove();
	};

FormStructure.prototype.Update = function(){

};

FormStructure.prototype.Clone = function()
{
	
};

	//Remove element and formstructure
	FormStructure.prototype.Destroy = function()
	{
		$(window).off(namespace);
		this.element.remove();
		return this;
	};

	//Empty out form 
	FormStructure.prototype.Empty = function(keep_title)
	{
		keep_title = (typeof keep_title === 'undefined' || keep_title === false || typeof this.title === 'undefined' ? false:true);
		if(keep_title === true) this.form.children().not(':first-child').remove();
		else this.form.empty();
		return this;
	};
	
	function getParams(context)
	{
		/*jshint validthis: true */
		return (context) ? $.extend({}, this.cachedParams, { ctx: context }) : this.cachedParams;
	}
	
	function init()
	{
		/*jshint validthis: true */
		this.element.trigger("initialize" + namespace);
		this.form = $(document.createElement("form"));
		if(this.title !== undefined){

			var title_row = this.rowTypeSelector();
			var title = this.templates.title.resolve(getParams.call(this, { title: this.title }));
			title_row.append(title);
			this.form.append(title_row);
			
		}
		if(this.print_title !== undefined){

			var print_title_row = $(this.templates.row);
			var print_title = this.templates.print_title.resolve(getParams.call(this, { print_title: this.print_title }));
			print_title_row.append(print_title);
			this.form.append(print_title_row);
			
		}
		this.element.append(this.form);
		this.AddAttribute(this.form, this.attribute);
		this.AddFormElements();
		if(typeof this.submitBtn !== 'undefined' && typeof this.submitBtn.text !== 'undefined'){
			this.AddSubmitButton(this.submitBtn);
		}
		else if(typeof this.submitBtn !== 'undefined'){
			this.AddSubmitButton();
		}
		this.element.trigger("initialized" + namespace);
	}
	
	//Add Attribute 
	FormStructure.prototype.AddAttribute = function(element , attribute){

		if(typeof attribute === 'object'){
			$.each(attribute, function( index, value ) {
				$(element).attr(index,value);
			});

		}	

	};

	if (!String.prototype.resolve)
	{
		var formatter = {
			"checked": function(value)
			{
				if (typeof value === "boolean")
				{
					return (value) ? "checked=\"checked\"" : "";
				}
				return value;
			}
		};

		String.prototype.resolve = function (substitutes, prefixes)
		{
			var result = this;
			$.each(substitutes, function (key, value)
			{
				if (value !== null && typeof value !== "function")
				{
					if (typeof value === "object")
					{
						var keys = (prefixes) ? $.extend([], prefixes) : [];
						keys.push(key);
						result = result.resolve(value, keys) + "";
					}
					else
					{
						if (formatter && formatter[key] && typeof formatter[key] === "function")
						{
							value = formatter[key](value);
						}
						key = (prefixes) ? prefixes.join(".") + "." + key : key;
						var pattern = new RegExp("\\{\\{" + key + "\\}\\}", "gm");
						result = result.replace(pattern, (value.replace) ? value.replace(/\$/gi, "&#36;") : value);
					}
				}
			});
			return result;
		};
	}

	//$("[data-toggle=\"dynamicform\"]").dynamicform();
})(jQuery, window);	

//helper function to get width class of columns
//Example: <div class='col-md-6 other_class'></div> would return 6
(function($) {
$.fn.getcolWidth = function(include_offset) {
    var $item = this;
    var widthClassNumber = ((this.attr("class").match(/col-[a-zA-Z]+-([0-9]+)/)||[]).length > 0 ? Number(this.attr("class").match(/col-[a-zA-Z]+-([0-9]+)/)[1]) : 0);
    var widthOffset = (include_offset === true && (this.attr("class").match(/col-\w+-offset-([0-9]+)/)||[]).length > 0 ? Number(this.attr("class").match(/col-\w+-offset-([0-9]+)/)[1]) : 0);    
    return widthClassNumber + widthOffset;
};
}(jQuery));

//@ sourceURL=rule_element_creator.js