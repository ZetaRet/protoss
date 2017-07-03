function ZetaRet_PrototypesZ(){
	new ZetaRet_Prototypes();
	var pname="packagename";
	var piname="__name";
	var nsprfx="__ns_";
	
	Object.prototype.getSuperName=function(){
		return this.constructor.packagename+"::"+this.constructor.name;
	};
	Object.defineProperty(Object.prototype,"getSuperName",{enumerable:false});
	Object.prototype.namespace=function(ns, cls, pack){
		if(!pack)pack=this;
		var nsp=pack.package(nsprfx+ns);
		nsp.internal(cls);
		return nsp;
	};
	Object.defineProperty(Object.prototype,"namespace",{enumerable:false});
	Object.prototype.usens=function(ns, pack){
		if(!pack)pack=this;
		var nsp=pack.package(nsprfx+ns);
		return nsp;
	};
	Object.defineProperty(Object.prototype,"usens",{enumerable:false});
	Object.prototype.internal=function(cls, pack){
		if(!pack)pack=this;
		pack[cls.name]=cls;
		cls[pname]=pack[piname];
		return pack;
	};
	Object.defineProperty(Object.prototype,"internal",{enumerable:false});
	Object.prototype.package=function(name, scope){
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
	Object.defineProperty(Object.prototype,"package",{enumerable:false});
}

new ZetaRet_PrototypesZ();

window.package("mypack.is.really.big").internal(//you may use any object different than window, first object from package will attach to it, i.e. window.mypack or just mypack
function InternalClass(){
	var o=this;
	var m={};
	o.super(arguments);
	m.checkMe=function(){
		return "Cool!";
	};
	o.superize(arguments,m,true,true);
	return o;
});

var into=new mypack.is.really.big.InternalClass();
into.checkMe();//return Cool!
into.getSuperName();//return mypack.is.really.big::InternalClass
window.package(mypack.is.really.big.InternalClass.packagename);//return package object from static property attached to every class object defined in a package

window.package("mypack.is.really.big").namespace("superprivatens_8721ZXC", 
function NSClass(){
	var o=this;
	var m={};
	o.super(arguments);
	m.checkMe=function(){
		return "Cool Namespace!";
	};
	o.superize(arguments,m,true,true);
	return o;
});
var nstouse=window.package("mypack.is.really.big").usens("superprivatens_8721ZXC");//returns namespace in a package by providing namespace id
var clsfromns=new nstouse.NSClass();
clsfromns.checkMe();//return Cool Namespace!