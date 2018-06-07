//Class to control all dynamic history events
var hisStateObj = function(options){
	var defaults = {start_obj:$(),
					show_obj:$(),
					showFunc:'show',
					hide_obj:$(),
					hideFunc:'hide'}; 

	this.settings = $.extend({}, defaults, (options || {}));
};