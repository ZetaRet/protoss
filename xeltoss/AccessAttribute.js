/**
 * Author: Zeta Ret
 * AccessAttribute Prototype
 * Version: 1.7.0
 * Date: 2020 - Today
 **/
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