/**
 * Zeta Ret ProtoSS Examples
 * Transform ProtoSS Class to XeltoSS Class 
 * XeltoSS Class supports JavaScript Native Class definition and regular ProtoSS inheritance  
 * Hybrid XeltoSS includes native extends and ProtoSS inheritance tree in symbiotic coalescence  
 * ProtoSS "is" supports backwards compatibility of Native JS Class 
 * 
 * Requires: ProtoSS, XeltoSS, protoss.all
 * 
 **/
var protoss = new ProtoSS();
var xeltoss = new XeltoSS();

XeltoSS.InitXeltoSSPrototypes();

window.package("zetaret.global.packages.examples.xeltoss").internal(
function ClassAllBase(){
	var o=this,a=arguments;
	o.superx(a,true);
	var m={};
	m._constructor=function(){
		console.log("internal construct ClassAllBase", o);
	};
	o.superize(a,m,true,true);
	m._constructor.call(o);
	return o;
}
);
window.package("zetaret.global.packages.examples.xeltoss").internal(
function ClassBase(){
	var o=this,a=arguments;
	o.a=1;
	o.b="type";
	o.c=[];
	o.superx(a,true);
	var m={};
	m.baseM=function(){console.log("");};
	m.behaviorA=function(){return o.a;};
	m.behaviorAA=function(){return o.a*o.a;};
	m.behaviorB=function(){return o.b;};
	m._constructor=function(){
		console.log("internal construct ClassBase", o);
	};
	o.superize(a,m,true,true);
	m._constructor.call(o);
	return o;
}
);
window.package("zetaret.global.packages.examples.xeltoss").internal(
function ClassA(){
	var o=this,a=arguments;
	o.superx(a,true);
	var m={};
	m.behaviorA=function(){};
	m.behaviorAA=function(){};
	m._constructor=function(){
		console.log("internal construct ClassA", o);
	};
	o.superize(a,m,true,true);
	m._constructor.call(o);
	return o;
}
);
window.package("zetaret.global.packages.examples.xeltoss").internal(
function ClassB(){
	var o=this,a=arguments;
	o.superx(a,true);
	var m={};
	m.behaviorB=function(){};
	m._constructor=function(){
		console.log("internal construct ClassB", o);
	};
	o.superize(a,m,true,true);
	m._constructor.call(o);
	return o;
}
);
window.package("zetaret.global.packages.examples.xeltoss").internal(
function ClassC(){
	var o=this,a=arguments;
	o.superx(a,true);
	var m={};
	m.behaviorC=function(){};
	m._constructor=function(){
		console.log("internal construct ClassC", o);
	};
	o.superize(a,m,true,true);
	m._constructor.call(o);
	return o;
}
);
window.package("zetaret.global.packages.examples.xeltoss").internal(
function ClassD(){
	var o=this,a=arguments;
	o.d=2;
	o.dd=10;
	o.superx(a,true);
	var m={};
	m.behaviorAA=function(){return o.a*o.a*o.d+o.dd;};
	m.behaviorD=function(){return o.dd*o.d;};
	m._constructor=function(){
		console.log("internal construct ClassD", o);
	};
	o.superize(a,m,true,true);
	m._constructor.call(o);
	return o;
}
);

//diamond case mass resolve in ProtoSS format
ProtoSS.headerSuper.push([zetaret.global.packages.examples.xeltoss.ClassBase,"zetaret.global.packages.examples.xeltoss::ClassAllBase"]);
ProtoSS.headerSuper.push([zetaret.global.packages.examples.xeltoss.ClassA,"zetaret.global.packages.examples.xeltoss::ClassBase"]);
ProtoSS.headerSuper.push([zetaret.global.packages.examples.xeltoss.ClassB,"zetaret.global.packages.examples.xeltoss::ClassBase"]);
ProtoSS.headerSuper.push([zetaret.global.packages.examples.xeltoss.ClassC,"zetaret.global.packages.examples.xeltoss::ClassAllBase"]);
ProtoSS.headerSuperList2.push([zetaret.global.packages.examples.xeltoss.ClassD,["zetaret.global.packages.examples.xeltoss::ClassA","zetaret.global.packages.examples.xeltoss::ClassB","zetaret.global.packages.examples.xeltoss::ClassC"]]);
protoss.resolveHeaders(window);
console.log(zetaret.global.packages.examples.xeltoss.ClassD.getSupers(),zetaret.global.packages.examples.xeltoss.ClassD.getReversedSupers());
//set default top package
xeltoss.toppack=window;
//enumerate in order ProtoSS classes for XeltoSS transformation, separated script may be implemented to track and output an array of exact hierarchy, note: XeltoSS hybrids will transfer by default the prototypes in their own super mask inside prototype of ES6 Class thus allowing view and call of overriden/overloaded methods as usual, depending on case different implementation should be used, callSuperX/callProtoX are most known
var xcls = [
	zetaret.global.packages.examples.xeltoss.ClassAllBase,
	zetaret.global.packages.examples.xeltoss.ClassBase,
	zetaret.global.packages.examples.xeltoss.ClassA,
	zetaret.global.packages.examples.xeltoss.ClassB,
	zetaret.global.packages.examples.xeltoss.ClassC,
	zetaret.global.packages.examples.xeltoss.ClassD
];
//transform ProtoSS to XeltoSS
for(var i=0;i<xcls.length;i++){
	xeltoss.xeltoss(xcls[i]);
	console.log("*");
}
console.log("==");
//create instance of ClassD in ES6 standard
//'_constructor' are merged in inversed order from top to bottom
var d=new zetaret.global.packages.examples.xeltoss.ClassD();
console.log(d);
