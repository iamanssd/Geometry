(function( $ ) {
    $.fn.cssAbsURL = function(options) {
        var settings = $.extend({
            // These are the defaults.
            selector: "link",
            link_attr: "href"
        }, options );

        var links = $(this).find(settings.selector);
        $.each(links,function(index,value){
        	link = $(value).prop(settings.link_attr);
        	if(link.substring(0,3) !== 'http'){
        		$(value).attr(settings.link_attr, link);
        	}
        });

        return this; 
    };
}( jQuery ));