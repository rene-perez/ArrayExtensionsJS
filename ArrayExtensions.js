'use strict';

Array.prototype.each = function(callback){
	for(var i =0,length = this.length; i< length; i++){
		callback.call(this, this[i], i);
	}
};