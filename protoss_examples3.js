function ZetaRet_PrototypesX(){
	new ZetaRet_Prototypes();
	
	var oprot=Object.prototype;
	var odef=Object.defineProperty;
	
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
}

new ZetaRet_PrototypesX();

var IVehicle={moveTo:[Number, Number], setName:[String]}.interface("IVehicle");

function testOver(){
	var o=this;
	o.name="";
	o.x=0;
	o.y=0;
	o.super(arguments,true);
	
	var m={};
	m.moveTo=function(x,y){
		o.x=x;
		o.y=y;
		return o.callSuper('moveTo',arguments);//returns interface verification of input
	};
	m.setName=function(name){
		if (o.callProto(IVehicle,"setName",arguments)){//check whether the arguments input is valid according to interface
			o.name=name;
		} else {//provide fallback 
			o.name=name.toString();
		}
	};
	o.superize(arguments,m,true,true);
	return o;
}
testOver.implement(IVehicle);//the same as setSuper

var tt=new testOver();
tt.setName("test");
tt.setName(33);
tt.moveTo(3,4);

var ABaseVehicle={moveTo:0,setName:0}.abstract("ABaseVehicle");
var abv;
try{
	abv=new ABaseVehicle();
}catch(e){
	console.log(e);//Error: Illegal instance of Abstract class: ABaseVehicle
	//abv is undefined
}

function testOver2(){
	var o=this;
	o.name="";
	o.x=0;
	o.y=0;
	o.super(arguments,true);
	
	var m={};
	m.moveTo=function(x,y){
		o.x=x;
		o.y=y;
		return o;
	};
	o.superize(arguments,m,true,true);
	o.final(arguments);//final class, all subclasses will throw error
	return o;
}
testOver2.setSuper(ABaseVehicle);

var tt2=new testOver2();//no abstract error, bottom constructor is different
tt2.moveTo(3,3);//allowed move
try{
	tt2.setName("test2");//will throw error, it must be implemented
}catch(e){
	console.log(e);//Error: Illegal call [setName] at Abstract class: ABaseVehicle
}

function testOver3(){
	var o=this;
	o.super(arguments,true);
	var m={};
	o.superize(arguments,m,true,true);
	return o;
}
testOver3.setSuper(testOver2);
var ttt3;
try{
	ttt3=new testOver3();
}catch(e){
	console.log(e);//Error: Illegal instance of Final class: testOver2
}
