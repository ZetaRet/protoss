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
}