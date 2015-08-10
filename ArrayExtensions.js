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
	var isSpecAFunction = spec instanceof Function,
		element;
	for(var i =0,length = this.length; i < length; i++){
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

Array.prototype.select = function(spec){
	var selectArray = [];
	this.each(function(element, index){
		selectArray.push(spec.call(this, element));
	});	
	return selectArray;
};

Array.prototype.take = function(howMany, spec){
	if(spec){
		return this.where(spec).slice(0,howMany);
	}else{
		return this.slice(0, howMany);
	}
};

Array.prototype.skip = function(howMany){
	return this.slice(howMany);
};

Array.prototype.first = function(spec){
	return this.take(1, spec)[0];
};