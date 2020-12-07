if (!window) {
	var window = {};
	global.window = window;
	window.internal = function(cls, pack) {
		if (!pack) {
			global[cls.aname || cls.name] = cls;
		}
		return Object.internal.call(window, cls, pack);
	};
	window.package = function(name, scope) {
		var scoper = Object.package.call(window, name, scope);
		if (!scope) {
			var ns = name.split('.'),
				nsf = ns[0];
			if (nsf) global[nsf] = window[nsf];
		}
		return scoper;
	};
}
if (!document) {
	var document = {};
	global.document = document;
}
if (!window.Set) {
	window.Set = Set;
}
if (!window.HTMLElement) {
	window.HTMLElement = class HTMLElement {
		constructor(type) {
			this.type = type;
			this.children = [];
		}
		appendChild(child) {
			this.children.push(child);
		}
	}
}
if (!document.createElement) {
	document.createElement = function(type) {
		return new window.HTMLElement(type);
	};
}