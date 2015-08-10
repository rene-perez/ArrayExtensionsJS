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
});