/// <reference path="vendor/chai.js" />
/// <reference path="vendor/mocha.js" />

var expect = chai.expect;

describe("Array Extensions", function(){
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
		
		it("Excercise test",function(){
			var people = [ 
			    {name: 'pedro', age: 29, skills: ['C#', 'Asp.Net', 'OOP'] },
			    {name: 'juan', age: 23, skills: ['PHP', 'Drink tea']  },
			    {name: 'pablo', age: 26, skills: ['RoR', 'HTML/CSS'] }
			    ],
				messages = [],
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
});