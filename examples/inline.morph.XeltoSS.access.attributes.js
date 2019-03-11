/**
 * Zeta Ret XeltoSS Examples
 * ProtoSS mode of inline.morph.XeltoSS.js
 * Access attributes: Public, Private, Protected, Internal, Namespace, etc.
 * Extended design template, CRUD-compliant AccessAttribute class in namespace
 * Requires: protoss.all
 **/

/**
 * AccessAttribute Prototype
 */
Object.prototype.getAccessAttribute = function(namespace, accessor, methods, iidLength) {
	var reference = this,
		scope = {},
		nsa = namespace + '.' + accessor,
		AccessAttribute, m, method;
	if (!iidLength) iidLength = 13;

	reference.namespace(
		nsa,
		class AccessAttribute {
			static access(target, method, args) {
				var iid = target.instanceId;
				if (!scope[iid]) throw Error('Unauthorized access of scope.');
				else if (scope[iid].scope !== target) throw Error('Illegal access of foreign scope.');
				return AccessAttribute.prototype[method].apply(target, args);
			}
			static verify(target) {
				var iid = target.instanceId;
				if (!scope[iid] || scope[iid].scope !== target) return false;
				return true;
			}
			constructor() {
				throw Error('[Access Attribute] can not be an instance.');
			}
			create() {
				var o = this;
				var iid = o.instanceId;
				if (!iid) {
					iid = o.constructor.packagename + '::' + o.constructor.name + '#' + o.rndstr(iidLength);
					if (scope[iid]) throw Error('Unauthorized override of scope.');
					o.instanceId = iid;
				} else if (scope[iid] && scope[iid].scope !== o) throw Error('Illegal access of foreign scope.');
				scope[iid] = {
					scope: o,
					data: {}
				};
			}
			read(name) {
				var o = this,
					iid = o.instanceId;
				if (!scope[iid]) throw Error('Unauthorized read of scope.');
				else if (scope[iid].scope !== o) throw Error('Illegal access of foreign scope.');
				return scope[iid].data[name];
			}
			update(name, value) {
				var o = this,
					iid = o.instanceId;
				if (!scope[iid]) throw Error('Unauthorized update of scope.');
				else if (scope[iid].scope !== o) throw Error('Illegal access of foreign scope.');
				scope[iid].data[name] = value;
			}
			destroy() {
				var o = this,
					iid = o.instanceId;
				if (!scope[iid]) throw Error('Unauthorized destroy of scope.');
				else if (scope[iid].scope !== o) return false;
				return delete scope[iid];
			}
		}
	);
	AccessAttribute = reference.usens(nsa).AccessAttribute;
	AccessAttribute.accessor = accessor;
	delete AccessAttribute.packagename;
	delete AccessAttribute.packobj;
	if (methods) {
		for (m in methods) {
			method = methods[m];
			if (method && method.constructor === Function) {
				method.AccessAttribute = AccessAttribute;
				AccessAttribute.prototype[m] = method;
				Object.defineProperty(AccessAttribute.prototype, m, {
					enumerable: false
				});
			}
		}
	}

	return AccessAttribute;
};
Object.defineProperty(Object.prototype, 'getAccessAttribute', {
	enumerable: false
});

/**
 * Program package design
 * IDE defines names of access attribute variable, i.e. [ProtectB, Internal, CustomNS].
 * Compilator computes random names on each compilation.
 */
(function() {
	var reference = {};

	(function(reference) {
		var ProtectB = reference.getAccessAttribute('B', 'protected'),
			PrivateB = reference.getAccessAttribute('B', 'private'),
			CustomNS = reference.getAccessAttribute('https://zetaret.com/projects/protoss/', 'custom_ns', {
				outputMessage: function() {
					return arguments.callee.AccessAttribute.prototype.read.call(this, 'message');
				}
			});
		reference = null;
		window.package('classes.set').internal(
			class B {
				constructor() {
					ProtectB.prototype.create.call(this);
					PrivateB.prototype.create.call(this);
					ProtectB.prototype.update.call(this, 'myvar', 3);
					PrivateB.prototype.update.call(this, 'privatevar', 1);
				}
				calculateWithSecret(multiplier) {
					return multiplier * PrivateB.prototype.read.call(this, 'privatevar');
				}
				destroy() {
					ProtectB.prototype.destroy.call(this);
					PrivateB.prototype.destroy.call(this);
				}
			}
		);
	})(reference);

	(function(reference) {
		var ProtectB = reference.usens('B.protected').AccessAttribute;
		reference = null;
		window.package('classes.set.depth').internal(
			class A extends classes.set.B {
				constructor() {
					super();
					ProtectB.prototype.update.call(this, 'myvar', 5);
				}
				calculateWithSecret(multiplier) {
					return multiplier * ProtectB.prototype.read.call(this, 'myvar');
				}
			}
		);
	})(reference);

	(function(reference) {
		var ProtectB = reference.usens('B.protected').AccessAttribute,
			Internal = reference.getAccessAttribute('classes.set.intersect', 'internal');
		reference = null;
		window.package('classes.set.intersect').internal(
			class C extends classes.set.B {
				constructor() {
					super();
					Internal.prototype.create.call(this);
					Internal.prototype.update.call(this, 'intercept', 0);
				}
				calculateWithSecret(multiplier) {
					return multiplier * ProtectB.prototype.read.call(this, 'myvar') + 1 + Internal.prototype.read.call(this, 'intercept');
				}
				destroy() {
					super.destroy();
					Internal.prototype.destroy.call(this);
				}
			}
		);
	})(reference);

	(function(reference) {
		var ProtectB = reference.usens('B.protected').AccessAttribute,
			Internal = reference.usens('classes.set.intersect.internal').AccessAttribute,
			CustomNS = reference.usens('https://zetaret.com/projects/protoss/.custom_ns').AccessAttribute;
		reference = null;
		window.package('classes.set.intersect').internal(
			class D extends classes.set.B {
				constructor() {
					super();
					Internal.prototype.create.call(this);
					Internal.prototype.update.call(this, 'intercept', 11);
					CustomNS.prototype.create.call(this);
					CustomNS.prototype.update.call(this, 'message', 'Hello Earth.');
				}
				calculateWithSecret(multiplier) {
					return multiplier * ProtectB.prototype.read.call(this, 'myvar') + Internal.prototype.read.call(this, 'intercept');
				}
				outputFromCustomNS() {
					return CustomNS.access(this, 'outputMessage');
				}
				destroy() {
					super.destroy();
					Internal.prototype.destroy.call(this);
					CustomNS.prototype.destroy.call(this);
				}
			}
		);
	})(reference);

	reference = null;
})();

/**
 * Instance and Console
 */
var instA = new classes.set.depth.A();
console.log(instA.calculateWithSecret(6));
instA.destroy();
var instB = new classes.set.B();
console.log(instB.calculateWithSecret(7));
instB.destroy();
var instC = new classes.set.intersect.C();
console.log(instC.calculateWithSecret(8));
instC.destroy();
var instD = new classes.set.intersect.D();
console.log(instD.calculateWithSecret(8));
console.log(instD.outputFromCustomNS());
instD.destroy();