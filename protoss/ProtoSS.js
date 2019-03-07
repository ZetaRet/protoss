/**
 * Author: Zeta Ret, Ivo Yankulovski
 * Zeta Ret ProtoSS
 * ProtoSS Class/Interface/Header Manager
 * Requires: protoss.all.js v1.04a
 * Version: 1.04c
 * Date: 2017 - Today
 **/
window.internal(
function ProtoSS() {
	var o = this,
		a = arguments;
	o.autoImplement = true;
	o.autoSuper = true;
	o.autoSuperList = true;
	o.autoSuperList2 = true;
	o.errorData = null;
	o.debug = null;
	o.super(a);
	var m = {};
	m.toInterface = function(i, pack) {
		var imap = {},
			key;
		for (key in i) {
			if (key == "__name") continue;
			imap[key] = i[key].interface(key);
			if (pack) pack.internal(imap[key]);
		}
		return imap;
	};
	m.stringPattern = function(pat, str, pos) {
		if (!pos) pos = 0;
		var num = 0;
		while (str.indexOf(pat, pos) == pos) {
			num++;
			str = str.substr(0, pos) + str.substr(pos + pat.length, str.length);
		}
		return [num, str];
	};
	m.getSuperCls = function(sname, toppack, path) {
		var many = sname.split("|"),
			cls = null,
			i, sn, tp, sp, pathsplit, s;
		for (i = 0; i < many.length; i++) {
			sn = many[i];
			tp = toppack;
			sp = o.stringPattern("/", sn);
			if (path && sp[0] > 0) {
				pathsplit = path.split(".");
				tp = tp.package(pathsplit.slice(0, pathsplit.length - sp[0] + 1).join("."));
			}
			s = sp[1].split("::");
			if (s.length == 1) {
				cls = tp[s[0]];
				if (cls) return cls;
			}
			cls = tp.package(s[0])[s[1]];
			if (cls) return cls;
		}
		return cls;
	};
	m.resolveCls = function(s, toppack, path) {
		var k, sk, kk, skk, i;
		for (k in s) {
			if (k == "__name") continue;
			sk = s[k];
			for (kk in sk) {
				skk = sk[kk];
				for (i = 0; i < skk.length; i++) {
					if (skk[i].constructor == String) {
						skk[i] = o.getSuperCls(skk[i], toppack, path);
					}
				}
			}
		}
		return o;
	};
	m.resolveHeaders = function(toppack, path, protoss) {
		var i, j, v, vl, c1, c2, sla, ia, sl, sa, ta;
		try {
			if (o.autoImplement) {
				ia = [];
				ta = ProtoSS.headerImplement;
				for (i = 0; i < ta.length; i++) {
					v = ta[i];
					c1 = v[0];
					if (c1.constructor === String) c1 = o.getSuperCls(c1, toppack, path);
					c2 = o.getSuperCls(v[1], toppack, path);
					if (c2) c1.implement(protoss ? c2.__protoss || c2 : c2);
					else ia.push(v);
				}
				ProtoSS.headerImplement = ia;
			}
			if (o.autoSuper) {
				sa = [];
				ta = ProtoSS.headerSuper;
				for (i = 0; i < ta.length; i++) {
					v = ta[i];
					c1 = v[0];
					if (c1.constructor === String) c1 = o.getSuperCls(c1, toppack, path);
					c2 = o.getSuperCls(v[1], toppack, path);
					if (c2) c1.setSuper(protoss ? c2.__protoss || c2 : c2);
					else sa.push(v);
				}
				ProtoSS.headerSuper = sa;
			}
			if (o.autoSuperList) {
				sla = [];
				ta = ProtoSS.headerSuperList;
				for (i = 0; i < ta.length; i++) {
					v = ta[i];
					c1 = v[0];
					if (c1.constructor === String) c1 = o.getSuperCls(c1, toppack, path);
					vl = v[1];
					sl = [];
					for (j = 0; j < vl.length; j++) {
						c2 = o.getSuperCls(vl[j], toppack, path);
						if (c2) sl.push(protoss ? c2.__protoss || c2 : c2);
						else {
							sla.push(v);
							break;
						}
					}
					if (sl.length == vl.length) {
						c1.superList(sl);
					}
				}
				ProtoSS.headerSuperList = sla;
			}
			if (o.autoSuperList2) {
				sla = [];
				ta = ProtoSS.headerSuperList2;
				for (i = 0; i < ta.length; i++) {
					v = ta[i];
					c1 = v[0];
					if (c1.constructor === String) c1 = o.getSuperCls(c1, toppack, path);
					vl = v[1];
					sl = [];
					for (j = 0; j < vl.length; j++) {
						c2 = o.getSuperCls(vl[j], toppack, path);
						if (c2) sl.push(protoss ? c2.__protoss || c2 : c2);
						else {
							sla.push(v);
							break;
						}
					}
					if (sl.length == vl.length) {
						c1.superList2(sl);
					}
				}
				ProtoSS.headerSuperList2 = sla;
			}
		} catch (e) {
			o.errorData = [ta, ta[i - 1], i, j, v, vl, c1, c2, sla, ia, sl, sa];
			if (o.debug) o.debug("error", "resolveHeaders", o, o.errorData);
			throw (e);
		}

		return o;
	};
	o.superize(a, m, true, true);
	return o;
});
ProtoSS.headerImplement = [];
ProtoSS.headerSuper = [];
ProtoSS.headerSuperList = [];
ProtoSS.headerSuperList2 = [];
ProtoSS.stringmap = {};
ProtoSS.eventProps = function(event, props) {
	var l = props.length,
		i, p, pu;
	event.eventprops = props;
	for (i = 0; i < l; i++) {
		p = props[i];
		pu = p.toUpperCase();
		event[pu] = p;
		event[pu + "_CHANGE"] = p + "Change";
	}
	return event;
};
ProtoSS.staticProps = function(stat, props) {
	var k;
	for (k in props) stat[k] = props[k];
	return stat;
};
ProtoSS.getDefinitionByName = function(sname, toppack) {
	if (!toppack) toppack = window;
	var many = sname.split("|"),
		cls = null,
		i, sn, tp, s;
	for (i = 0; i < many.length; i++) {
		sn = many[i];
		tp = toppack;
		s = sn.split("::");
		if (s.length == 1) {
			cls = tp[s[0]];
			if (cls) return cls;
		}
		cls = tp.package(s[0])[s[1]];
		if (cls) return cls;
	}
	return cls;
};