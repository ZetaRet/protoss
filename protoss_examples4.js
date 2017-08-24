function ZetaRet_PrototypesZ(){
	new ZetaRet_Prototypes();
	
	var cnx="constructor",
	pname="packagename",
	piname="__name",
	nsprfx="__ns_",
	pref="packobj",
	oprot=Object.prototype,
	odef=Object.defineProperty,
	ef={enumerable:false};
	
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

new ZetaRet_PrototypesZ();

window.package("mypack.is.really.big").internal(//you may use any object different than window, first object from package will attach to it, i.e. window.mypack or just mypack
function InternalClass(){
	var o=this,a=arguments;
	var m={};
	o.super(a);
	m.checkMe=function(){
		return "Cool!";
	};
	o.superize(a,m,true,true,true);
	return o;
});

var into=new mypack.is.really.big.InternalClass();
into.checkMe();//return Cool!
into.getSuperName();//return mypack.is.really.big::InternalClass
window.package(mypack.is.really.big.InternalClass.packagename);//return package object from static property attached to every class object defined in a package

window.package("mypack.is.really.big").namespace("superprivatens_8721ZXC", 
function NSClass(){
	var o=this,a=arguments;
	var m={};
	o.super(a);
	m.checkMe=function(){
		return "Cool Namespace!";
	};
	o.superize(a,m,true,true,true);
	return o;
});
var nstouse=window.package("mypack.is.really.big").usens("superprivatens_8721ZXC");//returns namespace in a package by providing namespace id
var clsfromns=new nstouse.NSClass();
clsfromns.checkMe();//return Cool Namespace!