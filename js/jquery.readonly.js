/*
 Method for setting fields to read only.
*/
//# sourceURL=jquery.readOnly.js

(function( $ ){
	$.fn.readOnly = function(on_off){
		this.each(function(){
			$this = $(this);
			var field_type = $this.prop('nodeName');
			var type_type = $this.prop('type')?$this.prop('type'):'';
			var select_id = $this.prop('id');
			var select_name = $this.prop('name');
			var select_val = $this.val();
			if(field_type === 'INPUT' && type_type.toLowerCase() !== 'checkbox'){
				$this.prop('readonly','readonly');
			}
			else if(field_type === 'SELECT' || (field_type === 'INPUT' && type_type.toLowerCase() === 'checkbox')){
				var hidden_id = 'readonly_input_'+select_id;
				if(on_off === false || !$this.prop('disabled')){
					var hidden_input = $('<input>').attr({
						type: 'hidden',
						id: hidden_id,
						name: select_name,
						value: select_val
					});
					$this.prop('disabled','disabled').data('readonly',hidden_id).after(hidden_input);
				}
				else{
					$('#'+$this.data('readonly')).remove();
					$this.prop('disabled',false);
				}
			}    
		});
		return this;
	}; 
})( jQuery );