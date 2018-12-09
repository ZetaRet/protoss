/**
 * Zeta Ret XeltoSS Examples
 * ProtoSS mode of inline.morph.XeltoSS.js
 *
 * Requires: protoss.all
 **/
(function() {
	var reference = {};

	(function(reference) {
		var protectedScope = {};

		class ProtectB {
			constructor() {

			}
			createProtection() {
				var o = this;
				var iid = o.constructor.packagename + '::' + o.constructor.name + '#' + o.rndstr(13);
				o.instanceId = iid;
				protectedScope[iid] = {
					scope: o,
					data: {}
				};
			}
			destroyProtection() {
				var o = this;
				if (protectedScope[o.instanceId].scope !== o) return false;
				return delete protectedScope[o.instanceId];
			}
			getProtectedVar(name) {
				var o = this;
				return protectedScope[o.instanceId].data[name];
			}
			setProtectedVar(name, value) {
				var o = this;
				protectedScope[o.instanceId].data[name] = value;
			}
		}
		if (reference) reference.internal(ProtectB);

		window.package('classes.set').internal(
			class B {
				constructor() {
					ProtectB.prototype.createProtection.call(this);
					this.init();
				}
				init() {
					ProtectB.prototype.setProtectedVar.call(this, 'myvar', 3);
				}
				destroy() {
					ProtectB.prototype.destroyProtection.call(this);
				}
			}
		);

		window.package('classes.set.depth').internal(
			class A extends classes.set.B {
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
		);
	})(reference);

	(function(ProtectB) {
		window.package('classes.set.intersect').internal(
			class C extends classes.set.B {
				constructor() {
					super();
				}
				calculateWithSecret(multiplier) {
					return multiplier * ProtectB.prototype.getProtectedVar.call(this, 'myvar') + 1;
				}
			}
		);
	})(reference.ProtectB);
})();

var instA = new classes.set.depth.A();
console.log(instA.calculateWithSecret(6));
var instC = new classes.set.intersect.C();
console.log(instC.calculateWithSecret(8));
