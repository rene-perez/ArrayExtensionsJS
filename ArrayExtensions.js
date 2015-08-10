'use strict';

Array.prototype.evaluateSpec = function(element, spec){
	if(spec instanceof Function){
		return spec.call(this, element);
	}else{
		return element == spec;
	}	
};

Array.prototype.isEmpty = function(){
	return !this.length;	
};

Array.prototype.each = function(callback){
	for(var i =0,length = this.length; i< length; i++){
		callback.call(this, this[i], i);
	}
};

Array.prototype.where = function(spec){
	if(spec === undefined){
		return this;
	}
	var filteredArray = [];
	this.each(function(element, index){
		if(spec.call(this, element)){
			filteredArray.push(element);
		}
	});
	
	return filteredArray;
};

Array.prototype.any = function(spec){
	for(var i =0,length = this.length; i < length; i++){
		if(this.evaluateSpec(this[i], spec)){
			return true;
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
	var result = this.where(spec);
	return result.isEmpty() ? null : result[0];
};

Array.prototype.last = function(spec){
	var results = this.where(spec);
	return results.isEmpty() ? null : results[results.length - 1];
};

Array.prototype.count = function(spec){
	return this.where(spec).length;
};

Array.prototype.index = function(spec){
	for(var i=0, length = this.length; i < length; i++){
		if(this.evaluateSpec(this[i], spec)){
			return i;
		}
	}	
	return -1;
};

Array.prototype.pluck = function(property){
	var properties = [];
	this.each(function(element, index){
		properties.push(element[property]);
	});
	return properties;
};

Array.prototype.sum = function(spec){
	if(this.isEmpty()){
		return null;
	}
	var sum = spec ? spec.call(this, this[0]) : this[0];
	for(var i = 1, length = this.length; i < length; i++){
		sum +=  spec ? spec.call(this, this[i]) : this[i];
	}	
	return sum;
};

Array.prototype.max = function(comparer){
	if(this.isEmpty()){
		return null;
	}
	comparer = comparer || function(a, b){return a - b};
	return this.sort(comparer)[this.length -1];
};

Array.prototype.min = function(comparer){
	if(this.isEmpty()){
		return null;
	}
	comparer = comparer || function(a, b){return a - b};
	return this.sort(comparer)[0];	
};

Array.prototype.flatten = function(){
	function addArrayElement(newArray, element){
		if(Array.isArray(element)){
			element.each(function(el, idx){
				addArrayElement(newArray, el);
			})
		}else{
			newArray.push(element);
		}
	};
	
	var newArray = [];
	addArrayElement(newArray, this);
	
	return newArray.isEmpty() ? null : newArray;
};