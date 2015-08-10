'use strict';

Array.prototype.evaluateSpec = function(element, spec){
	if(spec instanceof Function){
		return spec.call(this, element);
	}else{
		return element == spec;
	}	
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
	var element = this.take(1, spec)[0];
	if(element === undefined){
			return null;
	}
	
	return element;
};

Array.prototype.last = function(spec){
	var element;
	if(spec){
		var filtered = this.where(spec);
		element = filtered[filtered.length - 1];
	}else{
		element = this[this.length - 1];
	}
	
	if(element === undefined){
		return null;
	}
	
	return element;
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
	var sum = null;
	for(var i = 0, length = this.length; i < length; i++){
		if(i === 0){			
			if(spec){
				sum = spec.call(this, this[i]);
			}else{
				sum = this[i];
			}
			continue;
		}
		
		if(spec){
			sum += spec.call(this, this[i]);
		}else{
			sum += this[i];
		}
	}
	
	return sum;
};

Array.prototype.max = function(comparer){
	comparer = comparer || function(a, b){return a - b};
	return this.sort(comparer)[this.length -1];
};

Array.prototype.min = function(comparer){
	comparer = comparer || function(a, b){return a - b};
	return this.sort(comparer)[0];	
};

Array.prototype.flatten = function(){
	var newArray = [];
	this.each(function(element, index){
		if(Array.isArray(element)){
			addArrayElement(newArray, element);
		}else{
			newArray.push(element);
		}
	});
	
	function addArrayElement(newArray, originalArray){
		originalArray.each(function(element, index){
			if(Array.isArray(element)){
				addArrayElement(newArray, element);
			}else{
				newArray.push(element);
			}
		});
	};
	
	return newArray;
};