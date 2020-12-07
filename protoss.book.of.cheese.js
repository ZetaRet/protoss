if (!(function testfunctionnamegetter() {}).name) {
	Object.defineProperty(Function.prototype, 'name', {
		get: function() {
			if (!this.aname) {
				var name = (this.toString().match(/^function\s*([^\s(]+)/) || [])[1];
				Object.defineProperty(this, 'name', {
					value: name
				});
				this.aname = name;
			}
			return this.aname;
		}
	});
}

if (!Function.prototype.apply) {
	Function.prototype.apply = function(scope, args, f) {
		if (!f) f = this;
		if (!args) return f.call(scope);
		switch (args.length) {
			case 0:
				return f.call(scope);
			case 1:
				return f.call(scope, args[0]);
			case 2:
				return f.call(scope, args[0], args[1]);
			case 3:
				return f.call(scope, args[0], args[1], args[2]);
			case 4:
				return f.call(scope, args[0], args[1], args[2], args[3]);
			case 5:
				return f.call(scope, args[0], args[1], args[2], args[3], args[4]);
			case 6:
				return f.call(scope, args[0], args[1], args[2], args[3], args[4], args[5]);
			case 7:
				return f.call(scope, args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
			case 8:
				return f.call(scope, args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7]);
			case 9:
				return f.call(scope, args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8]);
			case 10:
				return f.call(scope, args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9]);
			case 11:
				return f.call(scope, args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10]);
			case 12:
				return f.call(scope, args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10], args[11]);
			case 13:
				return f.call(scope, args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10], args[11], args[12]);
			case 14:
				return f.call(scope, args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10], args[11], args[12], args[13]);
		}
	};
}

if (!Array.prototype.unique) {
	if (Array.from && window['Set'] && Set && Set.prototype.entries && Set.prototype.values) {
		Array.prototype.unique = function() {
			return Array.from(new Set(this));
		};
	} else {
		Array.prototype.unique = function() {
			var u = [],
				l = this.length,
				i;
			for (i = 0; i < l; i++) {
				if (u.indexOf(this[i]) === -1) {
					u.push(this[i]);
				}
			}
			return u;
		};
	}
}

if (!String.prototype.padStart) {
	String.prototype.padStart = function(targetLength, padString) {
		var s = "",
			l = this.length,
			dif = targetLength - l;
		if (dif <= 0) return String(this);
		if (!padString) padString = ' ';
		while (s.length < dif) s += padString;
		return s.slice(0, dif) + String(this);
	};
}
if (!String.prototype.padEnd) {
	String.prototype.padEnd = function(targetLength, padString) {
		var s = "",
			l = this.length,
			dif = targetLength - l;
		if (dif <= 0) return String(this);
		if (!padString) padString = ' ';
		while (s.length < dif) s += padString;
		return String(this) + s.slice(0, dif);
	};
}
if (!String.prototype.substr) {
	String.prototype.substr = function(start, length) {
		return this.substring(start, start + length);
	};
}