var modulo  = 142857;
var factorization = [27, 11, 13, 37];

// FP functions
function zip(xs, ys) {
  var i, length = Math.min(xs.length, ys.length), arr = [];
  for (i = 0; i < length; i += 1) {
    arr.push([xs[i], ys[i]]);
  }
  return arr;
}

function baseRepresentation(n, base, digits) {
	var rprs = [];
	while (n > 0){
		rprs.push(n % base);
		n = Math.floor(n / base);
	}
	console.log(digits); console.log(rprs.length);
	if (digits !== undefined && digits > rprs.length) {
    rprs = rprs.concat(zeros(digits - rprs.length));
	}
	return rprs;
}

function chooseCRT(n, k, fctrz) {
	return solveCRT(fctrz, fctrz.map(function (e) { return chooseLucas(n, k, e);}));
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
	var arr = [];
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
	if( k === 0 ) return 1;
	if( n === 0 ) return 0;
	if( k > n ) return 0;
	
	return (choose(n - 1, k, modulo) + choose(n - 1, k - 1, modulo)) % modulo;
}


function extendedEuclid(a, b) {
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

function mod(a, b) {
  if(a >= 0) return a % b;
  return (a % b) + b;
}

function logWithBase(x, base) {
  return Math.log(x) / Math.log(base);
}

function meaningfullDigitsInBase(n, base) {
  return Math.floor(logWithBase(n, base)) + 1;
}

function zeros(n) {
  var i, arr = [];
  for(i = 0; i < n; i += 1) {
    arr.push(0);
  }
  return arr;
}

function range(n) {
  var i, arr = [];
  for (i = 0; i < n; i += 1) {
    arr.push(i);
  }
  return arr;
}
function solveCRT(ns, as) {
  var N = ns.reduce(function(prev, curr) { return prev * curr; }, 1);
  var es = ns.map(function(a) {
    var b = div(N, a);
    return (extendedEuclid(a,b).t * b) % N;
  });
  var x = as.reduce(function(prev, curr, i) {
    return prev + curr * es[i];
  }, 0);
  return mod(x, N);
}

function factorialPrime(n, p) {
  var i;
  var result = 1;
  for (i = 0; i <= n; i += 1) {
    if(i % p !== 0) result *= i;
  }
  return result;
}
function generalizedLucas(n, k, p, q) {
  var r = n - k;
  var pq = Math.pow(p, q);
  var digits = meaningfullDigitsInBase(n, p);
  function _generate(x) {
    return range(digits).map(function (pw) { return Math.pow(p, pw);})
    .map(function (pj) { return Math.floor( x / pj ) % pq});
  }
  var _fp = function (e) {
    return factorialPrime(e, p);
  }
  
  var Ns = _generate(n);
  var Ks = _generate(k);
  var Rs = _generate(r);
  
  
  
  var i, prs = [];
  
  for (i = 0; i < digits; i += 1) {
    prs.push(Ns[i] / (Ks[i] * Rs[i]));
  } 
  
  var res = prs.reduce(function (prev, curr) {return prev * curr;}, 1);
  
  
  
  //var arr = [n, k, r].map(_generate);
  
  var k_p = baseRepresentation(k, p, digits),
      n_p = baseRepresentation(n, p, digits);
  
  console.log(n_p); console.log(k_p);
  
  function _computeE(j) {
    return zip(n_p, k_p).slice(j).reduce(function (sum, x) { return sum + (x[0] < x[1]);}, 0);
  }
  
  var es = [];
  es[0] = _computeE(0);
  es[q-1] = _computeE(q-1);
  
  return Math.pow(-1, es[q - 1]) * res * Math.pow(p, es[0]);
  
  
 }
exports.baseRepresentation = baseRepresentation;
exports.chooseLucas = chooseLucas;
exports.choose = choose;
exports.chooseCRT = chooseCRT;
exports.factorization = factorization;
exports.extendedEuclid = extendedEuclid;
exports.solveCRT = solveCRT;
exports.generalizedLucas = generalizedLucas;