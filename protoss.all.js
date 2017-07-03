/**
 * Author: Zeta Ret, Ivo Yankulovski
 * ProtoSS - Prototype Supers-Subclass Library 
 * Version: 1.01
 * Date: 2017 
**/
function ZetaRet_Prototypes(){
	//a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z
	var dcname="__constructor";
	var prfx="__";
	var sffx="_super__";
	var lsffx="_list";
	var pname="packagename";
	var piname="__name";
	var nsprfx="__ns_";
	var oprot=Object.prototype;
	var odef=Object.defineProperty;
	oprot.rndstr=function(l){
		var ch="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		var str='';
		for(var i=0;i<l;i++){
			str+=ch.charAt(Math.round(Math.random()*(ch.length-1)));
		}
		return str;
	};
	odef(oprot,'rndstr',{enumerable:false});
	oprot.super=function(args,cargs,name){
		if (!name)name=dcname;
		if (!args.callee.prototype[name])return;
		if (cargs===true)cargs=args;
		return args.callee.prototype[name].apply(this, cargs);
	};
	odef(oprot,'super',{enumerable:false});
	oprot.superize=function(args,map,setname,setown){
		var _super={};
		if (!map)map=this;
		for(var k in map){
			this[k]=map[k];
			if (typeof map[k] === 'function'){
				_super[k]=map[k];
				if (setname)odef(_super[k],"name",{value:k+(setown ? '#'+args.callee.name : '')});
			}
		}
		_super.constructor=args.callee;
		this[prfx+_super.constructor.name+sffx]=_super;
		return _super;
	};
	odef(oprot,'superize',{enumerable:false});
	oprot.setSuper=function(superfn,fn,name){
		if (!fn)fn=this;
		if (!name)name=dcname;
		fn.prototype[name]=superfn;
		odef(fn.prototype,name,{enumerable:false});
		return superfn;
	};
	odef(oprot,'setSuper',{enumerable:false});
	oprot.setSubclass=function(fn,superfn,name){
		if (!superfn)superfn=this;
		if (!name)name=dcname;
		fn.prototype[name]=superfn;
		odef(fn.prototype,name,{enumerable:false});
		return superfn;
	};
	odef(oprot,'setSubclass',{enumerable:false});
	oprot.callSuper=function(name,args,cname){
		if (!cname)cname=dcname;
		if (!this.constructor.prototype[cname])return;
		var f=this.getNextSuper(name,cname);
		if (f)return f.apply(this, args);
		return null;
	};
	odef(oprot,'callSuper',{enumerable:false});
	oprot.callSuper2=function(name,args,cname){
		if (!cname)cname=dcname;
		if (!this.constructor.prototype[cname])return;
		return this[prfx+this.constructor.prototype[cname].name+sffx][name].apply(this, args);
	};
	odef(oprot,'callSuper2',{enumerable:false});
	oprot.getNextSuper=function(name,cname){
		var _s=this.getSupers(null,cname);
		var l=_s.length;
		var tf=this[name];
		for(var i=0;i<l;i++){
			var m=this[prfx+_s[i].name+sffx];
			var f=m[name];
			if (f && f!=tf){
				return f;
			}
		}
		return null;
	};
	odef(oprot,'getNextSuper',{enumerable:false});
	oprot.getSuper=function(cname){
		if (!cname)cname=dcname;
		if (!this.constructor.prototype[cname])return;
		return this[prfx+this.constructor.prototype[cname].name+sffx];
	};
	odef(oprot,'getSuper',{enumerable:false});
	oprot.getThis=function(){
		if (!this.constructor)return;
		return this[prfx+this.constructor.name+sffx];
	};
	odef(oprot,'getThis',{enumerable:false});
	oprot.callProto=function(proto,name,args){
		return this[prfx+proto.name+sffx][name].apply(this, args);
	};
	odef(oprot,'callProto',{enumerable:false});
	oprot.callProto2=function(proto,name,args){
		if (!proto.constructor)return;
		return this[prfx+proto.constructor.name+sffx][name].apply(this, args);
	};
	odef(oprot,'callProto2',{enumerable:false});
	oprot.superList=function(list,fn,name){
		if (!fn)fn=this;
		if (!name)name=dcname;
		var fnlist=function(){
			var o=this;
			for(var i=0;i<list.length;i++){
				var sl=list[i];
				sl.apply(o,arguments[i]);
			}
			o.superize(arguments);
			return o;
		};
		odef(fnlist, "name", {value:"ZetaRet_SuperList_"+Object.rndstr(13)});
		fn.setSuper(fnlist,fn,name);
		fnlist.prototype[name+lsffx]=list;
		odef(fnlist, name+lsffx, {enumerable:false});
		return fn;
	};
	odef(oprot,'superList',{enumerable:false});
	oprot.getSupers=function(fn, name){
		if (!name)name=dcname;
		if (!fn)fn=typeof this === 'function' ? this : this.constructor;
		var ffn=fn;
		var supers=[];
		while(fn.prototype[name]){
			fn=fn.prototype[name];
			supers.push(fn);
		}
		var list=fn.prototype[name+lsffx];
		if (list){
			for(var i=0;i<list.length;i++){
				supers.push(list[i]);
				supers=supers.concat(list[i].getSupers(list[i],name));
			}
		}
		return supers;
	};
	odef(oprot,'getSupers',{enumerable:false});
	oprot.getSupers2=function(fn, name){
		if (!name)name=dcname;
		if (!fn)fn=typeof this === 'function' ? this : this.constructor;
		var supers=[];
		while(fn.prototype[name]){
			fn=fn.prototype[name];
			supers.push(fn);
			break;
		}
		var list=fn.prototype[name+lsffx];
		if (list){
			supers=[];
			for(var i=0;i<list.length;i++){
				supers.push(list[i]);
			}
		}
		return supers;
	};
	odef(oprot,'getSupers2',{enumerable:false});
	oprot.hasSuper=function(sfn,fn, name){
		var _s=this.getSupers(fn,name);
		if (_s.indexOf(sfn)==-1)return false;
		return true;
	};
	odef(oprot,'hasSuper',{enumerable:false});
	oprot.is=function(sfn,fn, name){
		var ffn=fn || (typeof this === 'function' ? this : this.constructor);
		if (ffn==sfn)return true;
		var _s=this.getSupers(fn,name);
		if (_s.indexOf(sfn)==-1)return false;
		return true;
	};
	odef(oprot,'is',{enumerable:false});
	oprot.abstract=function(name, amap){
		if (!amap)amap=this;
		if (!name)name="ZetaRet_Abstract_"+Object.rndstr(13);
		var afn=function(){
			var o=this;
			o.super(arguments,true);
			var m={};
			for(var key in amap){
				m[key]=function(){
					var akey=arguments.callee.name;
					var argt=amap[akey];
					if (!argt)throw(new Error("Illegal call ["+akey+"] at Abstract class: "+name));
					return argt;
				};
			}
			o.superize(arguments,m,true);
			if (o.constructor==afn)throw(new Error("Illegal instance of Abstract class: "+name));
			return o;
		};
		odef(afn, "name", {value:name});
		return afn;
	};
	odef(oprot,'abstract',{enumerable:false});
	oprot.implement=function(superfn,fn,name){
		return this.setSuper(superfn,fn,name);
	};
	odef(oprot,'implement',{enumerable:false});
	oprot.interface=function(name, imap){
		if (!imap)imap=this;
		if (!name)name="ZetaRet_Interface_"+Object.rndstr(13);
		var ifn=function(){
			var o=this;
			o.super(arguments,true);
			var m={};
			for(var key in imap){
				m[key]=function(){
					var ikey=arguments.callee.name;
					var argt=imap[ikey];
					var l=argt.length;
					for(var i=0;i<l;i++){
						var cls=argt[i];
						try{
							if (!arguments[i].is(cls))return false;
						} catch(Object){
							return false;
						}
					}
					return true;
				};
			}
			o.superize(arguments,m,true);
			return o;
		};
		odef(ifn, "name", {value:name});
		return ifn;
	};
	odef(oprot,'interface',{enumerable:false});
	oprot.final=function(args){
		if (this.constructor!=args.callee)throw(new Error("Illegal instance of Final class: "+args.callee.name));
		return this;
	};
	odef(oprot,'final',{enumerable:false});
	oprot.getSuperName=function(){
		return this.constructor.packagename+"::"+this.constructor.name;
	};
	odef(oprot,"getSuperName",{enumerable:false});
	oprot.namespace=function(ns, cls, pack){
		if(!pack)pack=this;
		var nsp=pack.package(nsprfx+ns);
		nsp.internal(cls);
		return nsp;
	};
	odef(oprot,"namespace",{enumerable:false});
	oprot.usens=function(ns, pack){
		if(!pack)pack=this;
		var nsp=pack.package(nsprfx+ns);
		return nsp;
	};
	odef(oprot,"usens",{enumerable:false});
	oprot.internal=function(cls, pack){
		if(!pack)pack=this;
		pack[cls.name]=cls;
		cls[pname]=pack[piname];
		return pack;
	};
	odef(oprot,"internal",{enumerable:false});
	oprot.package=function(name, scope){
		if (!scope)scope=this;
		var ns=name.split('.');
		var nss=scope[piname] || "";
		for(var i=0;i<ns.length;i++){
			var n=ns[i];
			if (!scope[n] || (typeof scope[n] == "function"))scope[n]={};
			scope=scope[n];
			nss=nss ? nss+"."+n : n;
			scope[piname]=nss;
		}
		return scope;
	};
	odef(oprot,"package",{enumerable:false});
}
new ZetaRet_Prototypes();