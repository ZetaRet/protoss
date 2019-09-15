/**
 * Author: Zeta Ret, Ivo Yankulovski
 * ProtoSS Node.js cheese. Simple polyfill for the ProtoSS library.
 * Version: 1.00
 * Date: 2019 - Today
 **/

if (!window) {
	var window = {};
	global.window = window;
	window.internal = function(cls, pack) {
		global[cls.aname || cls.name] = cls;
		return Object.internal.call(window, cls, pack);
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
