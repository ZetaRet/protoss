/**
 * Zeta Ret XeltoSS Examples
 * Inline design for true protected scope using XeltoSS printed Classes inside capsule
 * Theory implemented demonstrates encapsulation per scope.
 * Protected variables and methods require 1 level of encapsulation.
 * Complex inheritance will require this design template to be printed recursively inside of itself.
 * ProtectB is never disclosed, its reference is accessible from any class instance inside the capsule.
 **/
var classes = (function() {
	var protectedScope = {},
		classes = {},
		instances = 0;

	class ProtectB {
		constructor() {

		}
		getProtectedVar(name) {
			return protectedScope[this.instanceId].data[name];
		}
		setProtectedVar(name, value) {
			protectedScope[this.instanceId].data[name] = value;
		}
	}

	/**
	 * Printing of classes in chain begins
	 */
	classes.B = class B {
		constructor() {
			instances++;
			var iid = 'class#instance#' + instances;
			this.instanceId = iid;
			protectedScope[iid] = {
				scope: this,
				data: {}
			};
			this.init();
		}
		init() {
			ProtectB.prototype.setProtectedVar.call(this, 'myvar', 3);
		}
	}

	classes.A = class A extends classes.B {
		constructor() {
			super();
		}
		init() {
			super.init();
			ProtectB.prototype.setProtectedVar.call(this, 'myvar', 5);
		}
		calculateWithSecret(multiplier) {
			return multiplier * ProtectB.prototype.getProtectedVar.call(this, 'myvar');
		}
	}

	/**
	 * return package object and decorate accordingly
	 */
	return classes;
})();

var instA = new classes.A();
console.log(instA.calculateWithSecret(6));