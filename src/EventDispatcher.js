/**
 *
 *
 * @author Danny Patterson
 */

define([], function() {

	var EventDispatcher = function() {
		this.registeredListeners = new Object();
	};

	EventDispatcher.prototype.addEventListener = function(type, handler) {
		if(this.registeredListeners[type] == null) {
			this.registeredListeners[type] = new Array();
		}
		this.registeredListeners[type].push(handler);
	};

	EventDispatcher.prototype.removeEventListener = function(type, handler) {
		if(this.hasEventListener(type)) {
			var listenersForEvent = this.registeredListeners[type];
			for(var i = (listenersForEvent.length - 1); i >= 0; i--) {
				if(listenersForEvent[i] == handler) {
					listenersForEvent.splice(i, 1);
					if(listenersForEvent.length == 0)  {
						this.registeredListeners[type] = null;
						delete this.registeredListeners[type];
						return true;
					}
				}
			}
		}
		return false;
	};

	EventDispatcher.prototype.removeAllEventListeners = function(type) {
		if(this.hasEventListener(type)) {
			var listenersForEvent = this.registeredListeners[type];
			for(var i = (listenersForEvent.length - 1); i >= 0; i--) {
				listenersForEvent.splice(i, 1);
				if(listenersForEvent.length == 0)  {
					this.registeredListeners[type] = null;
					delete this.registeredListeners[type];
					break;
				}
			}
		}
	};

	EventDispatcher.prototype.dispatchEvent = function(event) {
		if(this.hasEventListener(event.type)) {
			var listenersForEvent = this.registeredListeners[event.type].slice();
			for(var i = 0; i < listenersForEvent.length; i++) {
				listenersForEvent[i](event);
			}
		}
	};

	EventDispatcher.prototype.hasEventListener = function(type) {
		return this.registeredListeners.hasOwnProperty(type) && this.registeredListeners[type].length > 0;
	};

	return EventDispatcher;

});