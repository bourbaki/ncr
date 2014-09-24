var modulo  = 142857;
var factorization = [27, 11, 13, 37];

function baseRepresentation(n, base) {
	var rprs = [];
	while (n > 0){
		rprs.push(n % base);
		n = Math.floor(n / base);
	}
	return rprs;
}

function chooseCRT(n, k, fctrz) {
	return fctrz.map(function (e) { return chooseLucas(n, k, e);})
}

function chooseLucas(n, k, modulo) {
	console.log("chooseLucas " + n + " " + k + " " + modulo); 
	if (k > n) return 0;
	if (k == 0 || k == n) return 1;
	if (n == 0) return 0;
	
	var k_m = baseRepresentation(k, modulo),
		n_m = baseRepresentation(n, modulo);
	
	console.log("\t" + n_m);
	console.log("\t" + k_m);
		
	if (k_m.length > n_m.length) return 0;
	if (k_m.length < n_m.length) n_m = n_m.slice(0, k_m.length);
	
	// zip representations
	arr = [];
	var i;
	for(i = 0; i < k_m.length; i += 1) {
		arr.push({n: n_m[i], k: k_m[i]});
	}
	console.log(arr);
	if(!arr.every(function (e) {return e.n >= e.k;})) return 0;
	
	arr = arr.map(function(e) {return choose(e.n, e.k, modulo);});
	console.log(arr);
	return arr.reduce(function (prev, curr) {return prev * curr;}, 1) % modulo;
}

function choose(n, k, modulo) {
	if( k == 0 ) return 1;
	if( n == 0 ) return 0;
	if( k > n ) return 0;
	
	return (choose(n - 1, k, modulo) + choose(n - 1, k - 1, modulo)) % modulo;
}

function solveCRT(congs) {
	var N = congs.reduce(function (prev, curr) { prev * curr.modulo }, 1 );
	
}

function extEuclid(a, b) {
	//Return {gcd, s, t} where a*s + b*t = d and gcd = gcd(a,b)
	var Element = function (x0, x1) {
		this.old = x0;
		this.current = x1;
	}
	
	var step = function (q) {
		return function(e) {
			var tmp = e.current;
			e.current = e.old - q * e.current;
			e.old  = tmp;
		};
	}
	var data = [ new Element(a, b), new Element(1, 0), new Element(0, 1)];
	
	while(data[0].current !== 0) {
		var q = div(data[0].old, data[0].current); 
		data.map(step(q));
	}
	
	return {gcd: data[0].old, s: data[1].old, t: data[2].old};
}

function div(a, b) {
	return Math.floor(a / b);
}
exports.baseRepresentation = baseRepresentation;
exports.chooseLucas = chooseLucas;
exports.choose = choose;
exports.chooseCRT = chooseCRT;
exports.factorization = factorization;