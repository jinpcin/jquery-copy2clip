function copy2clip(target, options) {
    options = options || {};

    var event = (options.hasOwnProperty('event')) ? options.event : ['click','dblclick','longclick'];
    
    if ($.inArray('longtouch',event)) {
        var pressTimer;
        var delay = (options.hasOwnProperty('delay')) ? options.delay : 1000;
        
    	$(target).mouseup(function(){
    		clearTimeout(pressTimer);
    	}).mousedown(function(){
    		pressTimer = window.setTimeout(function() { 
    			setClipboard(target);
    		},delay);
    	});
    }
    
    for (var k in event) {
        var e = event[k];
        if (e === 'longclick') continue;
        $(target).on(e, function() {
            setClipboard(target);
        }); 
    }
    
    function setClipboard(target) {

		// deselecting
		if (window.getSelection) {
			if (window.getSelection().empty) {  // Chrome
				window.getSelection().empty();
			} else if (window.getSelection().removeAllRanges) {  // Firefox
				window.getSelection().removeAllRanges();
			}
		} else if (document.selection) { // IE
			document.selection.empty();
		}

		var ele = document.querySelector(target);
		var range = document.createRange();
		var selection = document.getSelection();
		range.selectNode(ele);
		selection.addRange(range);	
		var successful = document.execCommand('copy');

		if (selection) {
			if (typeof selection.removeRange === 'function') {
				selection.removeRange(range);
			} else {
				selection.removeAllRanges();
			}
		}
	}
}