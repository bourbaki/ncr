var assert = require("assert")
var ncr = require("../ncr.js")

describe('ncr', function() {
	var answer = 64269;
	describe('extendedEuclid', function() {
		var a = 46, b = 240;
		var result = ncr.extendedEuclid(a, b);
		it('should return gcd of a and b in result.gcd', function(){
			assert.equal(2, result.gcd);
		});
		it('should return Bezout coefficents in s and t', function() {
			assert.equal(result.gcd, result.s * a + result.t * b);
		});
	})
	describe('solveCRT', function() {
		it('should exist', function() {
			assert.equal(true, ncr.hasOwnProperty('solveCRT'));
		});
		it('should return right result', function() {
			var ns = [3, 4, 5],
				as = [2, 3, 1];
			
			var result = ncr.solveCRT(ns, as);
			assert.equal(11, result);
		})
	});
	describe('chooseLucas', function() {
		var factorization = [27, 11, 13, 37];
		
		var n = 84, k = 66;
		var expected = factorization.map(function (x) {return answer % x;})
		it('should return correct remainders', function () {
			var actual = factorization.map(function (e) {return ncr.chooseLucas(n, k, e);})
			assert.deepEqual(expected, actual);
		})
	});
	describe('chooseCRT', function() {
		var factorization = [27, 11, 13, 37];
		it('should return correct value', function () {
			var result = ncr.chooseCRT(84, 66, factorization);
			assert.equal(63687, result);
		})
	})
	describe('generalizedLucas', function () {
		var modulo = 27;
		it('should exist', function() {
			assert.equal(true, ncr.hasOwnProperty('generalizedLucas'));
		});
		it('should return correct value', function() {
			assert.equal(9, ncr.generalizedLucas(84, 66, modulo));
		});
	})
})