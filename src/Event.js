/**
 *
 *
 * @author Danny Patterson
 */

define([], function() {

	var Event = function(type) {
		this.type = type;
	};

	Event.RESULT = "result";
	Event.ERROR = "error";

	return Event;

});