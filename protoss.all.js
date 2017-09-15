/**
 * Author: Zeta Ret, Ivo Yankulovski
 * ProtoSS - Prototype Supers-Subclass Library 
 * Version: 1.02a
 * Date: 2017 
**/
function ZetaRet_Prototypes(){
	var prn="prototype",
	cnx="constructor",
	dcname="__constructor",
	prfx="__",
	sffx="_super__",
	lsffx="_list",
	pname="packagename",
	piname="__name",
	nsprfx="__ns_",
	pref="packobj",
	oprot=Object.prototype,
	odef=Object.defineProperty,
	ef={enumerable:false};
	oprot.rndstr=function(l){
		var ch="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		var str='',i=l;
		while(i--)str+=ch.charAt(Math.round(Math.random()*(ch.length-1)));
		return str;
	};
	odef(oprot,'rndstr',ef);
	oprot.super=function(args,cargs,name){
		if (!name)name=dcname;
		var c=args.callee;
		if(!c.aname)c.aname=c.name;
		var p=c[prn];
		if (!p[name])return;
		if (cargs===true)cargs=args;
		return p[name].apply(this, cargs);
	};
	odef(oprot,'super',ef);
	oprot.superize=function(args,map,setname,setown,defname){
		var _super={};
		if (!map)map=this;
		var callee=args.callee;
		var aname=callee.aname||callee.name;
		var cname=defname ? callee.name : aname;
		for(var k in map){
			this[k]=map[k];
			if (typeof map[k] === 'function'){
				_super[k]=map[k];
				var sk=_super[k];
				if (setname){
					sk.aname=k;
					if (setown)sk.oname=cname;
					if (defname)odef(sk,"name",{value:k+(setown ? '#'+cname : '')});
				}
			}
		}
		_super[cnx]=callee;
		this[prfx+(callee.aname||callee.name)+sffx]=_super;
		return _super;
	};
	odef(oprot,'superize',ef);
	oprot.setSuper=function(superfn,fn,name){
		if (!fn)fn=this;
		if (!name)name=dcname;
		var p=fn[prn];
		p[name]=superfn;
		odef(p,name,ef);
		return superfn;
	};
	odef(oprot,'setSuper',ef);
	oprot.setSubclass=function(fn,superfn,name){
		if (!superfn)superfn=this;
		if (!name)name=dcname;
		var p=fn[prn];
		p[name]=superfn;
		odef(p,name,ef);
		return superfn;
	};
	odef(oprot,'setSubclass',ef);
	oprot.callSuper=function(name,args,cname){
		if (!cname)cname=dcname;
		if (!this[cnx][prn][cname])return;
		var f=this.getNextSuper(name,cname);
		if (f)return f.apply(this, args);
		return null;
	};
	odef(oprot,'callSuper',ef);
	oprot.callSuper2=function(name,args,cname){
		if (!cname)cname=dcname;
		var cp=this[cnx][prn],cpc=cp[cname];
		if (!cpc)return;
		return this[prfx+(cpc.aname||cpc.name)+sffx][name].apply(this, args);
	};
	odef(oprot,'callSuper2',ef);
	oprot.getNextSuper=function(name,cname){
		var _s=this.getSupers(null,cname);
		var l=_s.length,tf=this[name];
		for(var i=0;i<l;i++){
			var si=_s[i];
			var m=this[prfx+(si.aname||si.name)+sffx];
			var f=m[name];
			if (f && f!=tf){
				return f;
			}
		}
		return null;
	};
	odef(oprot,'getNextSuper',ef);
	oprot.getSuper=function(cname){
		if (!cname)cname=dcname;
		var cp=this[cnx][prn],cpc=cp[cname];
		if (!cpc)return;
		return this[prfx+(cpc.aname||cpc.name)+sffx];
	};
	odef(oprot,'getSuper',ef);
	oprot.getThis=function(){
		var c=this[cnx];
		if (!c)return;
		return this[prfx+(c.aname||c.name)+sffx];
	};
	odef(oprot,'getThis',ef);
	oprot.callProto=function(proto,name,args){
		return this[prfx+(proto.aname||proto.name)+sffx][name].apply(this, args);
	};
	odef(oprot,'callProto',ef);
	oprot.callProto2=function(proto,name,args){
		var pc=proto[cnx];
		if (!pc)return;
		return this[prfx+(pc.aname||pc.name)+sffx][name].apply(this, args);
	};
	odef(oprot,'callProto2',ef);
	oprot.superList=function(list,fn,name){
		if (!fn)fn=this;
		if (!name)name=dcname;
		var fnlist=function(){
			var o=this,l=list.length,a=arguments;
			for(var i=0;i<l;i++){
				var sl=list[i];
				sl.apply(o,a[i]);
			}
			o.superize(a);
			return o;
		};
		odef(fnlist, "name", {value:"ZetaRet_SuperList_"+Object.rndstr(13)});
		fn.setSuper(fnlist,fn,name);
		fnlist[prn][name+lsffx]=list;
		odef(fnlist, name+lsffx, ef);
		return fn;
	};
	odef(oprot,'superList',ef);
	oprot.superList2=function(list,fn,name){
		if (!fn)fn=this;
		if (!name)name=dcname;
		var fnlist=function(){
			var o=this,l=list.length,a=arguments;
			for(var i=0;i<l;i++){
				var sl=list[i];
				sl.apply(o,a);
			}
			o.superize(a);
			return o;
		};
		odef(fnlist, "name", {value:"ZetaRet_SuperList_"+Object.rndstr(13)});
		fn.setSuper(fnlist,fn,name);
		fnlist[prn][name+lsffx]=list;
		odef(fnlist, name+lsffx, ef);
		return fn;
	};
	odef(oprot,'superList2',ef);
	oprot.getSupers=function(fn, name){
		if (!name)name=dcname;
		if (!fn)fn=typeof this === 'function' ? this : this[cnx];
		var ffn=fn;
		var supers=[];
		while(fn[prn][name]){
			fn=fn[prn][name];
			supers.push(fn);
		}
		var list=fn[prn][name+lsffx];
		if (list){
			var l=list.length,i=0;
			for(;i<l;i++){
				supers.push(list[i]);
				supers=supers.concat(list[i].getSupers(list[i],name));
			}
		}
		return supers;
	};
	odef(oprot,'getSupers',ef);
	oprot.getSupers2=function(fn, name){
		if (!name)name=dcname;
		if (!fn)fn=typeof this === 'function' ? this : this[cnx];
		var supers=[];
		while(fn[prn][name]){
			fn=fn[prn][name];
			supers.push(fn);
			break;
		}
		var list=fn[prn][name+lsffx];
		if (list){
			supers=[];
			var l=list.length,i=0;
			for(;i<l;i++){
				supers.push(list[i]);
			}
		}
		return supers;
	};
	odef(oprot,'getSupers2',ef);
	oprot.hasSuper=function(sfn,fn, name){
		var _s=this.getSupers(fn,name);
		if (_s.indexOf(sfn)==-1)return false;
		return true;
	};
	odef(oprot,'hasSuper',ef);
	oprot.is=function(sfn,fn, name){
		var ffn=fn || (typeof this === 'function' ? this : this[cnx]);
		if (ffn==sfn)return true;
		var _s=this.getSupers(fn,name);
		if (_s.indexOf(sfn)==-1)return false;
		return true;
	};
	odef(oprot,'is',ef);
	oprot.abstract=function(name, amap){
		if (!amap)amap=this;
		if (!name)name="ZetaRet_Abstract_"+Object.rndstr(13);
		function ream(amap, akey){
			var am=function(){
				var argt=amap[akey];
				if (!argt)throw(new Error("Illegal call ["+akey+"] at Abstract class: "+name));
				return argt;
			};
			am._a=1;
			return am;
		}
		var statis=function(s){
			for(var k in amap)s[k]=ream(amap, k);
		};
		var afn=function(){
			var o=this,a=arguments;
			o.super(a,true);
			var m={};
			var s=o.superize(a,m,true);
			o.statis(a,statis,s,true);
			if (o[cnx]==afn)throw(new Error("Illegal instance of Abstract class: "+name));
			return o;
		};
		afn._a=1;
		odef(afn, "name", {value:name});
		return afn;
	};
	odef(oprot,'abstract',ef);
	oprot.implement=function(superfn,fn,name){
		return this.setSuper(superfn,fn,name);
	};
	odef(oprot,'implement',ef);
	oprot.interface=function(name, imap){
		if (!imap)imap=this;
		if (!name)name="ZetaRet_Interface_"+Object.rndstr(13);
		function reim(imap, ikey){
			var im=function(){
				var a=arguments,argt=imap[ikey],l=argt.length;
				for(var i=0;i<l;i++){
					var cls=argt[i];
					try{
						if (!a[i].is(cls))return false;
					} catch(Object){
						return false;
					}
				}
				return true;
			};
			im._i=1;
			return im;
		}
		var statis=function(s){
			for(var k in imap)s[k]=reim(imap, k);
		};
		var ifn=function(){
			var o=this,a=arguments;
			o.super(a,true);
			var m={};
			var s=o.superize(a,m,true);
			o.statis(a,statis,s,true);
			return o;
		};
		ifn._i=1;
		odef(ifn, "name", {value:name});
		return ifn;
	};
	odef(oprot,'interface',ef);
	oprot.final=function(args){
		var ac=args.callee;
		if (this[cnx]!=ac)throw(new Error("Illegal instance of Final class: "+(ac.aname||ac.name)));
		return this;
	};
	odef(oprot,'final',ef);
	oprot.statis=function(args,statis,_super,setname,setown,defname){
		var callee=args.callee,aname=callee.aname||calle.name,k,ssk;
		if(!_super)_super=this[prfx+aname+sffx];
		var cname=defname ? callee.name : aname;
		var _statis=_super[cnx][piname+sffx];
		if(!_statis && statis){
			_statis={};
			statis(_statis,callee);
			for(k in _statis){
				ssk=_statis[k];
				if (typeof ssk === 'function'){
					ssk._s=1;
					if (setname){
						ssk.aname=k;
						if (setown)ssk.oname=cname;
						if (defname)odef(ssk,"name",{value:k+(setown ? '#'+cname : '')});
					}
				}
			}
			_super[cnx][piname+sffx]=_statis;
		}
		if(_statis){
			for(k in _statis){
				this[k]=_statis[k];
				_super[k]=_statis[k];
			}
		}
		return _super;
	};
	odef(oprot,"statis",ef);
	oprot.getSuperName=function(){
		var c=this[cnx];
		return c.packagename+"::"+(c.aname||c.name);
	};
	odef(oprot,"getSuperName",ef);
	oprot.namespace=function(ns, cls, pack){
		if(!pack)pack=this;
		var nsp=pack.package(nsprfx+ns);
		nsp.internal(cls);
		return nsp;
	};
	odef(oprot,"namespace",ef);
	oprot.usens=function(ns, pack){
		if(!pack)pack=this;
		var nsp=pack.package(nsprfx+ns);
		return nsp;
	};
	odef(oprot,"usens",ef);
	oprot.internal=function(cls, pack){
		if(!pack)pack=this;
		pack[cls.name]=cls;
		cls[pname]=pack[piname];
		cls[pref]=pack;
		return pack;
	};
	odef(oprot,"internal",ef);
	oprot.package=function(name, scope){
		if (!scope)scope=this;
		var ns=name.split('.'),nss=scope[piname] || "";
		for(var i=0;i<ns.length;i++){
			var n=ns[i];
			if (!scope[n] || (typeof scope[n] == "function"))scope[n]={};
			scope=scope[n];
			nss=nss ? nss+"."+n : n;
			scope[piname]=nss;
		}
		return scope;
	};
	odef(oprot,"package",ef);
}
new ZetaRet_Prototypes();