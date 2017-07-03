new ZetaRet_Prototypes();

function superlistdummy0(a1,a2){
    var o=this;
	o.val=0;
	var m={};
    o.super(arguments,true);//required for every subclass
    m.customf=function(){return o;};//always use o instead of this
	m.customf1=function(){return o.val;};//refer to o instead of this
	m.setval=function(v){
		o.val=v;//set to o instead of this
		return o;//optional - return same object on setters for chain calls
	};
    o.superize(arguments,m,true,true);//required
    return o;
}

function superlistdummy1(a){
    var o=this;
	o.a=a;//set properties to o
	o.super(arguments);//required for every subclass
	var m={};//set methods to m (member map), also to o if you want to tern them
	m.customf1=function(){return o.val+1;};
    m.customf2=function(){return o.a;};
	m.basef=function(){return 0;};
    o.superize(arguments,m,true,true);//required
    return o;
}

function superlistdummy2(a){
    var o=this;
	o.a=a;
	var m={};
    //super call not required for top super
	m.customf2=function(){return o.a;};//overloads customf2#superlistdummy1
    o.superize(arguments,m,true,true);//required
    return o;
}

function level1(){
	var o=this;
	var m={};
	
	o.super(arguments);
	
	m.myf=function(){
		return o;
	};

	o.superize(arguments,m,true,true);
	return o;
}
function level2(){
	var o=this;
	var m={};
	
	o.super(arguments);
	
	m.basef=function(){
		return 1;
	};
	m.myf2=function(){
		return o;
	};

	o.superize(arguments,m,true,true);
	return o;
}
function level3(){
	var o=this;
	var m={};
	
	o.super(arguments);
	
	m.basef=function(){
		return 2;
	};
	m.myf3=function(){
		return o;
	};

	o.superize(arguments,m,true,true);
	return o;
}
function level4(){
	var o=this;
	var m={};
	
	o.super(arguments);//calling super on top super is safe
	
	m.basef=function(){
		return 3;
	};
	m.myf4=function(){
		return o;
	};

	o.superize(arguments,m,true,true);
	return o;
}


superlistdummy1.setSuper(level1).setSuper(level2).setSuper(level3).setSuper(level4);

superlistdummy0.superList([superlistdummy1, superlistdummy2]);
var s=new superlistdummy0(["1"],["2"]);
var ss=new superlistdummy0(["3"],["4"]);

s.setval(1);//return s
ss.setval(2);//return ss
s.customf2();//return 2, customf2#superlistdummy2
s.callProto(superlistdummy1,'customf2');//return 1, customf2#superlistdummy1
ss.getSupers();//return [ZetaRet_SuperList_XXX13XXX, superlistdummy1, level1, level2, level3, level4, superlistdummy2]
ss.getSupers2();//return [superlistdummy1, superlistdummy2]
s.customf1();//return 1 from customf1#superlistdummy0
s.callSuper('customf1');//return 2 from super customf1#superlistdummy1
s.callSuper2('customf1');//return 2 from super customf1#superlistdummy1 attached to ZetaRet_List_XXX13XXX
s.callProto(superlistdummy1,'customf1');//return 2 from customf1#superlistdummy1
s.basef();//return 0 from basef#superlistdummy1 attached to superlistdummy0
s.callSuper('basef');//return 1 from basef#level2
s.callSuper2('basef');//return 0 from basef#superlistdummy1 attached to ZetaRet_List_XXX13XXX
s.callProto(level2,'basef');//return 1 from basef@level2
s.callProto(level3,'basef');//return 2 from basef@level3
s.callProto(level4,'basef');//return 3 from basef@level4