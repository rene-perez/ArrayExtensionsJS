/// <reference path="vendor/chai.js" />
/// <reference path="vendor/mocha.js" />

var expect = chai.expect;

describe("Array Extensions", function(){
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
	});
});