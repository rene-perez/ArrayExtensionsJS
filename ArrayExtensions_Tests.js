/// <reference path="vendor/chai.js" />
/// <reference path="vendor/mocha.js" />

var expect = chai.expect;

describe("Array Extensions", function(){
	var people = [ 
			    {name: 'pedro', age: 29, skills: ['C#', 'Asp.Net', 'OOP'] },
			    {name: 'juan', age: 23, skills: ['PHP', 'Drink tea']  },
			    {name: 'pablo', age: 26, skills: ['RoR', 'HTML/CSS'] }
			    ];
	// each function test section
	describe("each", function(){
		it("executes the callback for each element", function(){
			var testArr = [1,2,3];
			var counter = 0;
			var callback = function(element, index){
				++counter;
			};
			testArr.each(callback);
			expect(counter).to.equal(3);
		});
		
		it("passes the element to the callback function", function(){
			var testArr = [1,3,5];
			var currentElementArray = [];
			testArr.each(function(element, index){
				currentElementArray.push(element);
			})
			
			expect(currentElementArray).to.deep.equal(testArr);
		});
		
		it("passes the index to the callback function", function(){
			var testArr = [1,2];
			var expectedIndexes = [0,1];
			var currentIndexes = [];
			testArr.each(function(element, index){
				currentIndexes.push(index);
			})
			
			expect(currentIndexes).to.deep.equal(expectedIndexes);
		});
		
		it("binds correctly the current array as this", function(){
			var testArr = [1,2];
			var length;
			var callback = function(element, index){
				length = this.length;
			}
			testArr.each(callback);
			
			expect(length).to.equal(2);
			
		});
	});
	
	// where function test section
	describe("where", function(){
		it("only elements that matches with predicate are returned", function(){
			var array = [
				{firstName: 'Rene', lastName: 'Perez', age: 29},
				{firstName: 'Victor', lastName: 'Perez', age: 28}
			];
			
			var expectedArray = [
				{firstName: 'Rene', lastName: 'Perez', age: 29}
			];
			
			var filteredArray = array.where(function(person){
				return person.age === 29;
			});
			
			expect(filteredArray).to.deep.equal(expectedArray);
		});
		
		it("binds correctly the current array as this", function(){
			var testArr = [1,2];
			var length;
			var callback = function(element){
				length = this.length;
				return true;
			}
			testArr.where(callback);
			
			expect(length).to.equal(2);
			
		});
		
		it("Exercise test", function(){
			var messages = [],
				expectedMessages = [
					"1.- pedro is 29 years old",
					"2.- pablo is 26 years old"
				],
			    logPerson = function(x, i){
				  messages.push((i + 1) + '.- ' + x.name + ' is ' + x.age + ' years old');  
				};

			people.where(function(dev){
			    var skills = dev.skills.where(function(skill) { return skill == 'PHP'; });
			
			    return skills.length == 0;
			})
			.each(logPerson)
			
			expect(messages).to.deep.equal(expectedMessages);			
		});
	});
	
	// any function tests
	describe("any", function(){
		it("Exercise test with spec function", function(){
			var messages = [],
				expectedMessages = [
					"1.- pedro is 29 years old",
					"2.- pablo is 26 years old"
				],
				logPerson = function(x, i){
				  messages.push((i + 1) + '.- ' + x.name + ' is ' + x.age + ' years old');  
				};
			people.where(function(dev){
			    return !dev.skills.any(function(skill) { return skill == 'PHP' });
			})
			.each(logPerson);
			
			expect(messages).to.deep.equal(expectedMessages);	
		});
		
		it("Exercise test with spec object", function(){
			var messages = [],
				expectedMessages = [
					"1.- pedro is 29 years old",
					"2.- pablo is 26 years old"
				],
				logPerson = function(x, i){
				  messages.push((i + 1) + '.- ' + x.name + ' is ' + x.age + ' years old');  
				};
			people.where(function(dev){
			    return !dev.skills.any('PHP');
			})
			.each(logPerson);
			
			expect(messages).to.deep.equal(expectedMessages);	
		});
	});
	// select function tests
	describe("select", function(){
		it("Exercise test", function(){
			var messages = [],
				expectedMessages = [
					"pedro",
					"pablo"
				];
			people
			    .where(function(dev){
			        return !dev.skills.any('PHP');
			    })
			    .select(function(dev) {
			        return dev.name;
			    })
			    .each(function(x){
			        messages.push(x);
			    });
			expect(messages).to.deep.equal(expectedMessages);
		});
		
		it("Returns complex object", function(){
			var objects = [],
				expectedObjects = [
					{name: 'pedro', age: 29 },
			    	{name: 'juan', age: 23 },
			    	{name: 'pablo', age: 26 }
				];
			
			people.select(function(dev){
				return {
					name: dev.name,
					age: dev.age
				};
			}).each(function(dev){
				objects.push(dev);
			});
			
			expect(objects).to.deep.equal(expectedObjects);
		});
		
		it("binds correctly the current array as this", function(){
			var length = 0;
			
			people.select(function(dev){
				length = this.length;
				return dev;
			});
			
			expect(length).to.equal(people.length);
		});
	});
	// take function tests
	describe("take", function(){
		var children = [
			    {name: 'ana', sex: 'f'},
			    {name: 'fosto', sex: 'm'},
			    {name: 'jane', sex: 'f'},
			    {name: 'yadi', sex: 'f'},
			    {name: 'lili', sex: 'f'},
			    {name: 'bany', sex: 'm'},
			    {name: 'rod', sex: null},
			    {name: 'auro', sex: 'f'},
			    {name: 'martin', sex: 'm'}
			];
		
		it("Excersice test", function(){
			var names = [],
			expectedNames = ['ana','jane','yadi'];
			
			children
			    .take(3, function(x){ return x.sex == 'f';})
			    .each(function(x){ names.push(x.name); });
				
			expect(names).to.deep.equal(expectedNames);
		});
		
		it("With no spec function defined, returns the initial elements", function(){
			var names = [],
			expectedNames = ['ana','fosto','jane'];
			
			children
			    .take(3)
			    .each(function(x){ names.push(x.name); });
				
			expect(names).to.deep.equal(expectedNames);
		});
		
		it("With more elements that the array length", function(){
			var names = [],
			expectedNames = ['ana','fosto','jane', 'yadi','lili','bany','rod','auro','martin'];
			
			children
			    .take(10)
			    .each(function(x){ names.push(x.name); });
				
			expect(names).to.deep.equal(expectedNames);
		});
		
		it("binds correctly the current array as this", function(){
			var length = 0;
			
			children
			    .take(3, function(x){
					length = this.length; 
					return x;
				});
				
			expect(length).to.deep.equal(children.length);
		});
	});
	// skip function tests
	describe("skip", function(){
		var children = [
			    {name: 'ana', sex: 'f'},
			    {name: 'fosto', sex: 'm'},
			    {name: 'jane', sex: 'f'},
			    {name: 'yadi', sex: 'f'},
			    {name: 'lili', sex: 'f'},
			    {name: 'bany', sex: 'm'},
			    {name: 'rod', sex: null},
			    {name: 'auro', sex: 'f'},
			    {name: 'martin', sex: 'm'}
			];
		it("Exercise test", function(){
			var names = [],
				expectedNames = ['yadi','lili','bany','rod','auro','martin'];
			children
			    .skip(3)
			    .each(function(x){ names.push(x.name); });
				
			expect(names).to.deep.equal(expectedNames);
		});
	});
	
	// first function tests
	describe("first", function(){
		var children = [
			    {name: 'ana', sex: 'f'},
			    {name: 'fosto', sex: 'm'},
			    {name: 'jane', sex: 'f'},
			    {name: 'yadi', sex: 'f'},
			    {name: 'lili', sex: 'f'},
			    {name: 'bany', sex: 'm'},
			    {name: 'rod', sex: null},
			    {name: 'auro', sex: 'f'},
			    {name: 'martin', sex: 'm'}
			];
		it("Exercise test 1", function(){
			var actual = children.first().name;
			
			expect(actual).to.equal('ana');
		});
		
		it("Exercise test 2", function(){
			var actual = children.first(function(x){ return x.sex == 'm';}).name;
			
			expect(actual).to.equal('fosto');
		});
		
		it("When no elements for spec", function(){
			var actual = children.first(function(x){ return x.sex == 'x';});
			
			expect(actual).to.equal(null);
		});
	});
	
	// last function tests
	describe("last", function(){
		var children = [
			    {name: 'ana', sex: 'f'},
			    {name: 'fosto', sex: 'm'},
			    {name: 'jane', sex: 'f'},
			    {name: 'yadi', sex: 'f'},
			    {name: 'lili', sex: 'f'},
			    {name: 'bany', sex: 'm'},
			    {name: 'rod', sex: null},
			    {name: 'auro', sex: 'f'},
			    {name: 'martin', sex: 'm'}
			];
		it("Exercise test 1", function(){
			var actual = children.last().name;
			
			expect(actual).to.equal('martin');
		});
		
		it("Exercise test 2", function(){
			var actual = children.last(function(x){ return x.sex == 'f';}).name;
			
			expect(actual).to.equal('auro');
		});
		
		it("When no elements for spec", function(){
			var actual = children.last(function(x){ return x.sex == 'x';});
			
			expect(actual).to.equal(null);
		});
	});
	
	// count function tests
	describe("count", function(){
		var children = [
			    {name: 'ana', sex: 'f'},
			    {name: 'fosto', sex: 'm'},
			    {name: 'jane', sex: 'f'},
			    {name: 'yadi', sex: 'f'},
			    {name: 'lili', sex: 'f'},
			    {name: 'bany', sex: 'm'},
			    {name: 'rod', sex: null},
			    {name: 'auro', sex: 'f'},
			    {name: 'martin', sex: 'm'}
			];
		it("Exercise test 1", function(){
			var actual = children.count();
			
			expect(actual).to.equal(9);
		});
		
		it("Exercise test 2", function(){
			var actual = children.count(function(x){ return x.sex === 'f';});
			
			expect(actual).to.equal(5);
		});
	});
	
	// index function tests
	describe("index", function(){
		var children = [
			    {name: 'ana', sex: 'f'},
			    {name: 'fosto', sex: 'm'},
			    {name: 'jane', sex: 'f'},
			    {name: 'yadi', sex: 'f'},
			    {name: 'lili', sex: 'f'},
			    {name: 'bany', sex: 'm'},
			    {name: 'rod', sex: null},
			    {name: 'auro', sex: 'f'},
			    {name: 'martin', sex: 'm'}
			];
		it("Exercise test 1", function(){
			var actual = children.index(function(x){ return x.name == 'bany';});
			
			expect(actual).to.equal(5);
		});
		
		it("Exercise test 2", function(){
			var actual = children.index(function(x){ return x.name == 'mark';});
			
			expect(actual).to.equal(-1);
		});
		
		it("Exercise test 3", function(){
			var actual =[1, 3, 5, 7, 9, 11].index(7);
			
			expect(actual).to.equal(3);
		});
	});
	
	// pluck function tests
	describe("pluck", function(){
		it("Get the name property correctly.", function(){
			var children = [
			    {name: 'ana', sex: 'f'},
			    {name: 'fosto', sex: 'm'}
			];
			
			var expected = ['ana', 'fosto'];
			var actual = children.pluck('name');
			
			expect(actual).to.deep.equal(expected);
		});
	});
	
	// sum function tests
	describe("sum", function(){
		it("Sums with no spec", function(){
			var actual = [1, 3, 5, 7, 9, 11].sum();
			
			expect(actual).to.deep.equal(36);
		});
		
		it("Sums with spec", function(){
			var actual = [1, 3, 5, 7, 9, 11].sum(function(x) { return x * 2; });
			
			expect(actual).to.deep.equal(72);
		});
		
		it("Sums with not numbers", function(){
			var children = [
			    {name: 'ana', sex: 'f'},
			    {name: 'fosto', sex: 'm'}
			];
			var actual = children.sum();
			
			expect(actual).to.deep.equal('[object Object][object Object]');
		});
		
		it("Sums with empty array", function(){
			var children = [];
			var actual = children.sum();			
			expect(actual).to.deep.equal(null);
		});
	});
	
	// max function tests
	describe("max", function(){
		var children = [
			    {name: 'ana', sex: 'f'},
			    {name: 'fosto', sex: 'm'},
			    {name: 'jane', sex: 'f'},
			    {name: 'yadi', sex: 'f'},
			    {name: 'lili', sex: 'f'},
			    {name: 'bany', sex: 'm'},
			    {name: 'rod', sex: null},
			    {name: 'auro', sex: 'f'},
			    {name: 'martin', sex: 'm'}
			];
			
		it("Numbers", function(){
			var actual = [1, 3, 5, 7, 9, 11, 2, 4, 6].max();
			
			expect(actual).to.equal(11);
		});
		
		it("Children name", function(){
			var actual = children.max(function(a, b){ return a.name.length - b.name.length }).name
			
			expect(actual).to.equal('martin');
		});
		
		it("Person age", function(){
			var actual = people.max(function(a, b){ return a.age - b.age; }).name;
			
			expect(actual).to.equal('pedro');
		});
	});
	
	// min function tests
	describe("min", function(){
		var children = [
			    {name: 'ana', sex: 'f'},
			    {name: 'fosto', sex: 'm'},
			    {name: 'jane', sex: 'f'},
			    {name: 'yadi', sex: 'f'},
			    {name: 'lili', sex: 'f'},
			    {name: 'bany', sex: 'm'},
			    {name: 'rod', sex: null},
			    {name: 'auro', sex: 'f'},
			    {name: 'martin', sex: 'm'}
			];
		it("Numbers", function(){
			var actual = [1, 3, 5, 7, 9, 11, 2, 4, 6].min();
			
			expect(actual).to.equal(1);
		});
		
		it("Children name", function(){
			var actual = children.min(function(a, b){ return a.name.length - b.name.length }).name
			
			expect(actual).to.equal('ana');
		});
		
		it("Person age", function(){
			var actual = people.min(function(a, b){ return a.age - b.age; }).name;
			
			expect(actual).to.equal('juan');
		});
	});
	
	// min function tests
	describe("flatten", function(){
		
		it("flattening ", function(){
			var actual = [1,2,3,[4,5,[6, 7, 8], 9, 10, 11, 12, 13, 14], 15, 16].flatten();
			var expected = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];
			
			expect(actual).to.deep.equal(expected);
		
		});
	});
});