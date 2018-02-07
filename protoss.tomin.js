function ZetaRet_Prototypes(){
	var dcname="__constructor",
	prfx="__",
	sffx="_super__",
	lsffx="_list",
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
		if (!args.callee.prototype[name])return;
		if (cargs==true)cargs=args;
		return args.callee.prototype[name].apply(this, cargs);
	};
	odef(oprot,'super',ef);
	oprot.superize=function(args,map,setname,setown,defname){
		var _super={};
		if (!map)map=this;
		var cname=args.callee.name;
		for(var k in map){
			this[k]=map[k];
			if (typeof map[k] == 'function'){
				_super[k]=map[k];
				var sk=_super[k];
				if (setname){
					sk.aname=k;
					if (setown)sk.oname=cname;
					if (defname)odef(sk,"name",{value:k+(setown ? '#'+cname : '')});
				}
			}
		}
		_super.constructor=args.callee;
		this[prfx+args.callee.name+sffx]=_super;
		return _super;
	};
	odef(oprot,'superize',ef);
	oprot.setSuper=function(superfn,fn,name){
		if (!fn)fn=this;
		if (!name)name=dcname;
		var p=fn.prototype;
		p[name]=superfn;
		odef(p,name,ef);
		return superfn;
	};
	odef(oprot,'setSuper',ef);
	oprot.setSubclass=function(fn,superfn,name){
		if (!superfn)superfn=this;
		if (!name)name=dcname;
		var p=fn.prototype;
		p[name]=superfn;
		odef(p,name,ef);
		return superfn;
	};
	odef(oprot,'setSubclass',ef);
	oprot.callSuper=function(name,args,cname){
		if (!cname)cname=dcname;
		if (!this.constructor.prototype[cname])return;
		var f=this.getNextSuper(name,cname);
		if (f)return f.apply(this, args);
		return null;
	};
	odef(oprot,'callSuper',ef);
	oprot.callSuper2=function(name,args,cname){
		if (!cname)cname=dcname;
		var cp=this.constructor.prototype,cpc=cp[cname];
		if (!cpc)return;
		return this[prfx+cpc.name+sffx][name].apply(this, args);
	};
	odef(oprot,'callSuper2',ef);
	oprot.getNextSuper=function(name,cname){
		var _s=this.getSupers(null,cname);
		var tf=this[name];
		for(var i=0;i<_s.length;i++){
			var si=_s[i];
			var m=this[prfx+si.name+sffx];
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
		var cp=this.constructor.prototype,cpc=cp[cname];
		if (!cpc)return;
		return this[prfx+cpc.name+sffx];
	};
	odef(oprot,'getSuper',ef);
	oprot.getThis=function(){
		var c=this.constructor;
		if (!c)return;
		return this[prfx+c.name+sffx];
	};
	odef(oprot,'getThis',ef);
	oprot.callProto=function(proto,name,args){
		return this[prfx+proto.name+sffx][name].apply(this, args);
	};
	odef(oprot,'callProto',ef);
	oprot.callProto2=function(proto,name,args){
		var pc=proto.constructor;
		if (!pc)return;
		return this[prfx+pc.name+sffx][name].apply(this, args);
	};
	odef(oprot,'callProto2',ef);
	oprot.superList=function(list,fn,name){
		if (!fn)fn=this;
		if (!name)name=dcname;
		var fnlist=function(){
			for(var i=0;i<list.length;i++){
				list[i].apply(this,arguments[i]);
			}
			this.superize(arguments);
			return this;
		};
		odef(fnlist, "name", {value:"ZetaRet_SuperList_"+Object.rndstr(13)});
		fn.setSuper(fnlist,fn,name);
		fnlist.prototype[name+lsffx]=list;
		odef(fnlist, name+lsffx, ef);
		return fn;
	};
	odef(oprot,'superList',ef);
	oprot.getSupers=function(fn, name){
		if (!name)name=dcname;
		if (!fn)fn=typeof this == 'function' ? this : this.constructor;
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
	odef(oprot,'getSupers',ef);
	oprot.getSupers2=function(fn, name){
		if (!name)name=dcname;
		if (!fn)fn=typeof this == 'function' ? this : this.constructor;
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
	odef(oprot,'getSupers2',ef);
	oprot.hasSuper=function(sfn,fn, name){
		var _s=this.getSupers(fn,name);
		if (_s.indexOf(sfn)==-1)return false;
		return true;
	};
	odef(oprot,'hasSuper',ef);
	oprot.is=function(sfn,fn, name){
		var ffn=fn || (typeof this == 'function' ? this : this.constructor);
		if (ffn==sfn)return true;
		var _s=this.getSupers(fn,name);
		if (_s.indexOf(sfn)==-1)return false;
		return true;
	};
	odef(oprot,'is',ef);
}