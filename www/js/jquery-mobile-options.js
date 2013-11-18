// Custom jQuery Mobile options.
$(document).bind("mobileinit", function(){
	$.extend($.mobile, {
		defaultPageTransition: "none",
		transitionFallbacks.slideout: "none"
	});
});