//This is a JSON which will store the tooltips that will be used on the front end
//Each frontend(gfe,cema,sllernet) has a corresponding sub array.
//Inside of each frontend array ids for all input should be entered created
var tooltipArray = {
	gfeArray: {	

	},
	sellNetArray: { 
		/*misc_costs:{
			content: $('<span>This is what this thing means</span>'),
			theme: 'tooltipster-default',
			trigger: 'hover',
			delay: 200,
			position: 'right'
		}*/
	},
	afordArray: {

	},
	cemaArray: {

	}
};

//This function will bind tooltipster to the different element called out in the tooltipArray
var getToolTips = function (toolName){
	//Loop through the array function
	$.each(tooltipArray[toolName], function(key,value){
		var ele = '#'+key;
		$(ele).tooltipster(value);
	});
}

var dynamicTool = function(){
	//this will control the the dynamic tool tip changes
	
};
