'use strict';

Array.prototype.each = function(callback){
	for(var i =0,length = this.length; i< length; i++){
		callback.call(this, this[i], i);
	}
};

Array.prototype.where = function(spec){
	var filteredArray = [];
	this.each(function(element, index){
		if(spec.call(this, element)){
			filteredArray.push(element);
		}
	});
	
	return filteredArray;
};

Array.prototype.any = function(spec){
	var isSpecAFunction = spec instanceof Function;
	var element;
	for(var i =0,length = this.length; i< length; i++){
		element = this[i];
		if(isSpecAFunction){
			if(spec.call(this, element)){
				return true;
			}
		}else{
			if(element == spec){
				return true;
			}
		}
	};
	
	return false;
};