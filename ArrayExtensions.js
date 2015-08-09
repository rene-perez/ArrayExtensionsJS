'use strict';

Array.prototype.each = function(callback){
	for(var i =0,length = this.length; i< length; i++){
		callback.call(this, this[i], i);
	}
};

Array.prototype.where = function(predicate){
	var newArray = [];
	this.each(function(element){
		if(predicate.call(this, element)){
			newArray.push(element);
		}
	});
	
	return newArray;
};