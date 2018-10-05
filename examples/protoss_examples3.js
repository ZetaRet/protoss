function ZetaRet_PrototypesX(){
	new ZetaRet_Prototypes();
	
	var cnx="constructor",
	prfx="__",
	sffx="_super__",
	piname="__name",
	oprot=Object.prototype,
	odef=Object.defineProperty,
	ef={enumerable:false};
	
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
		var callee=args.callee,aname=callee.aname||callee.name,k,ssk;
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
}

new ZetaRet_PrototypesX();

var IVehicle={moveTo:[Number, Number], setName:[String]}.interface("IVehicle");

function testOver(){
	var o=this,a=arguments;
	o.name="";
	o.x=0;
	o.y=0;
	o.super(a,true);
	
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
	o.superize(a,m,true,true,true);
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
	var o=this,a=arguments;
	o.name="";
	o.x=0;
	o.y=0;
	o.super(a,true);
	
	var m={};
	m.moveTo=function(x,y){
		o.x=x;
		o.y=y;
		return o;
	};
	o.superize(a,m,true,true,true);
	o.final(a);//final class, all subclasses will throw error
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
	var o=this,a=arguments;
	o.super(a,true);
	var m={};
	o.superize(a,m,true,true,true);
	return o;
}
testOver3.setSuper(testOver2);
var ttt3;
try{
	ttt3=new testOver3();
}catch(e){
	console.log(e);//Error: Illegal instance of Final class: testOver2
}
