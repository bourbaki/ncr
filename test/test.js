var assert = require("assert")
var ncr = require("../ncr.js")

describe('ncr', function() {
	var answer = 64269;
	var factorization = [{prime: 3, power: 3}, 11, 13, 37];
	
	describe('compose', function () {
		var _f = function (x) { return x * 2; }
		var _g = function (a, b) { return a + b; }
		
		it('should return correct value', function () {
				var _w = ncr.compose(_f, _g);
				var result = _w(1, 1);
				assert.equal(4, result);
		})
	})
	
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
		
		
		var n = 84, k = 66;
		var _flatten = function (x) {return typeof x === 'object' ? Math.pow(x.prime, x.power) : x;}
		var expected = factorization.map(ncr.compose(function (x) {return answer % x;}, _flatten));
		it('should return correct remainders', function () {
			var actual = factorization.map(function (e) {return ncr.chooseLucas(n, k, e);})
			assert.deepEqual(expected, actual);
		})
	});
	
	describe('chooseCRT', function() {
		it('should return correct value', function () {
			var result = ncr.chooseCRT(84, 66, factorization);
			assert.equal(answer, result);
		})
	})
	
	describe('generalizedLucas', function () {
		var modulo = factorization[0];
		it('should exist', function() {
			assert.equal(true, ncr.hasOwnProperty('generalizedLucas'));
		});
		it('should return correct value', function() {
			assert.equal(9, ncr.generalizedLucas(84, 66, modulo.prime, modulo.power));
		});
	})
	
	describe('modularInverse', function () {
		var modulo = 27, x = 5;
		it('should exist', function () {
			assert.equal(true, ncr.hasOwnProperty('modularInverse'));
		});
		it('should return correct value', function () {
			assert.equal(11, ncr.modularInverse(5, 27));
			assert.equal(4, ncr.modularInverse(3, 11));
		});
	})
})