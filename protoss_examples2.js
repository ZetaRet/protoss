new ZetaRet_Prototypes();

function ZetaRet_EventDispatcher(target){
	var o=this,a=arguments;
	o.super(a);
	o.eventTarget=target || o;
	o.events={};
	var m={};
	m.setEventTarget=function(target){
		o.eventTarget=target;
		return o;
	};
	m.addEventListener=function(event,callback){
		o.events[event] = o.events[event] || [];
		if ( o.events[event] ){	o.events[event].push(callback);	}
		return o;
	};
	m.removeEventListener=function(event,callback){
		if ( o.events[event] ) {
			var listeners = o.events[event];
			if (!callback){ delete o.events[event]; }
			else {
				for ( var i = listeners.length-1; i>=0; --i ){
					if ( listeners[i] === callback ) {	listeners.splice( i, 1 );	return true; }
				}
			}
		}
		return false;
	};
	m.hasEvent=function(type){
		if (o.events[type])return true;
		return false;
	};
	m.dispatch=function(event,data){
		if ( o.events[event] ) {
			var listeners = o.events[event], len = listeners.length;
			var list=listeners.concat();
			for(var i=0;i<len;i++){
				var r=list[i](o.eventTarget, data);
				if (r)break;
			}
		}
		return o;
	};
	o.superize(a,m,true,true,true);
	return o;
}

function ZetaRet_MetaData(){
	var o=this,a=arguments;
	var m={};
	
	o.metadata={};
	m.setMetaData=function(key, value){
		o.metadata[key]=value;
		return o;
	};
	m.getMetaData=function(){
		return o.metadata;
	};
	
	o.superize(a,m,true,true,true);
	
	return o;
}

function GameAtom(name){
	var o=this,a=arguments;
	o.name=name;
	o.super(a,null);
	var m={};
	m.addToProperty=function(key,valuetarget){
		if (o[key]!==undefined)o[key]+=valuetarget[key];
		return o;
	};
    o.superize(a,m,true,true,true);
    return o;
}
GameAtom.superList([ZetaRet_EventDispatcher, ZetaRet_MetaData]);

function BaseVehicle(name){
    var o=this,a=arguments;
	o.life=1;
	o.speed=0;
	o.armor=0;
	o.super(a,true);
	var m={};
    m.getName=function(){return o.name;};
    o.superize(a,m,true,true,true);
    return o;
}
BaseVehicle.setSuper(GameAtom);

function BaseBuilder(name){
	var o=this,a=arguments;
	o.buildingsList={};
	o.super(a,true);
	var m={};
	m.addToBuildingsList=function(id, cls){
		o.buildingsList[id]=cls;
		return o;
	};
	m.build=function(id){
		var cls=o.buildingsList[id];
		var inst=new cls();
		inst.name=id+"#"+o.name;
		return inst;
	};
    o.superize(a,m,true,true,true);
    return o;
}
BaseBuilder.setSuper(BaseVehicle);

function Probe(name){
	var o=this,a=arguments;
	o.super(a,true);
	o.life=40;
	o.speed=3;
	o.addToBuildingsList("nexus",Nexus);
	o.addToBuildingsList("pylon",Pylon);
	o.addToBuildingsList("forge",Forge);
	var m={};
	o.superize(a,m,true,true,true);
	return o;
}
Probe.setSuper(BaseBuilder);

function BaseBuilding(name){
	var o=this,a=arguments;
	o.life=1;
	o.armor=1;
	o.factory={};
	o.super(a,true);
	var m={};
	m.addToFactory=function(type, fcls){
		o.factory[type]=fcls;
		return o;
	};
	m.train=function(type){
		var cls=o.factory[type];
		var inst=new cls();
		inst.name=type+"#"+o.name;
		return inst;
	};
    o.superize(a,m,true,true,true);
    return o;
}
BaseBuilding.setSuper(GameAtom);

function Nexus(name){
	var o=this,a=arguments;
	o.psi=10;
	o.super(a,true);
	o.life=1000;
	o.addToFactory("worker",Probe);
	var m={};
	
	o.superize(a,m,true,true,true);
	return o;
}
Nexus.setSuper(BaseBuilding);

function Forge(name){
	var o=this,a=arguments;
	o.super(a,true);
	o.life=600;
	o.addToFactory("shields", Shields);
	var m={};
	o.superize(a,m,true,true,true);
	return o;
}
Forge.setSuper(BaseBuilding);

function Pylon(name){
	var o=this,a=arguments;
	o.psi=8;
	o.energy=40;
	o.maxenergy=40;
	o.super(a,true);
	o.life=200;
	o.addToFactory("photon", Photon);
	o.setMetaData("photon_cost",30);
	var m={};
	m.photonOvercharge=function(){
		var c=o.metadata.photon_cost;
		if (o.energy-c>=0){
			o.energy-=c;
			var cls=o.factory.photon;
			var inst=new cls();
			inst.name="photon#"+o.name;
			return inst;
		}
		return null;
	};
	o.superize(a,m,true,true,true);
	return o;
}
Pylon.setSuper(BaseBuilding);

function Unit(name){
	var o=this,a=arguments;
	o.damagetype="normal";
	o.damage=1;
	o.range=1;
	o.super(a,true);
	var m={};
	o.superize(a,m,true,true,true);
	return o;
}
Unit.setSuper(BaseVehicle);

function Photon(name){
	var o=this,a=arguments;
	o.super(a,true);
	o.damagetype="splash";
	o.damage=10;
	o.range=6;
	var m={};
	o.superize(a,m,true,true,true);
	return o;
}
Photon.setSuper(Unit);

function Upgrade(name){
	var o=this,a=arguments;
	o.units=false;
	o.workers=false;
	o.buildings=false;
	o.damage=0;
	o.range=0;
	o.life=0;
	o.armor=0;
	o.energy=0;
	o.super(a,true);
	var m={};
	o.superize(a,m,true,true,true);
	return o;
}
Upgrade.setSuper(GameAtom);

function Shields(name){
	var o=this,a=arguments;
	o.super(a,true);
	o.armor=1;
	o.units=true;
	o.workers=true;
	o.buildings=true;
	var m={};
	o.superize(a,m,true,true,true);
	return o;
}
Shields.setSuper(Upgrade);

function InitGame(){
	var o=this,a=arguments;
	o.getTotalPsi=function(){
		var psi=0;
		for(var i=0;i<o.buildings.length;i++){
			if (o.buildings[i].psi)psi+=o.buildings[i].psi;
		}
		return psi;
	};
	o.applyUpgrade=function(upg, units, buildings, workers){
		var i;
		if (upg.units){
			for(i=0;i<units.length;i++){
				units[i].addToProperty("life",upg);
				units[i].addToProperty("armor",upg);
				units[i].addToProperty("damage",upg);
				units[i].addToProperty("range",upg);
				units[i].addToProperty("energy",upg);
			}
		}
		if (upg.buildings){
			for(i=0;i<buildings.length;i++){
				buildings[i].addToProperty("life",upg);
				buildings[i].addToProperty("armor",upg);
				buildings[i].addToProperty("damage",upg);
				buildings[i].addToProperty("range",upg);
				buildings[i].addToProperty("energy",upg);
			}
		}
		if (upg.workers){
			for(i=0;i<workers.length;i++){
				workers[i].addToProperty("life",upg);
				workers[i].addToProperty("armor",upg);
				workers[i].addToProperty("damage",upg);
				workers[i].addToProperty("range",upg);
				workers[i].addToProperty("energy",upg);
			}
		}
	};
	o.getBuildingByType=function(type){
		for(var i=0;i<o.buildings.length;i++){
			if (o.buildings[i].is(type))return o.buildings[i];
		}
		return null;
	};
	
	o.nexus=new Nexus("nexus");
	o.workers=[];
	o.buildings=[];
	o.units=[];
	o.upgrades=[];
	
	o.nexus.addEventListener("newupgrade", function(t,u){
		o.applyUpgrade(u,o.units,o.buildings,o.workers);
	});
	o.nexus.addEventListener("newbuilding", function(t,b){
		for(var i=0;i<o.upgrades.length;i++)o.applyUpgrade(o.upgrades[i],[],[b],[]);
	});
	o.nexus.addEventListener("newworker", function(t,w){
		for(var i=0;i<o.upgrades.length;i++)o.applyUpgrade(o.upgrades[i],[],[],[w]);
	});
	o.nexus.addEventListener("newunit", function(t,u){
		for(var i=0;i<o.upgrades.length;i++)o.applyUpgrade(o.upgrades[i],[u],[],[]);
	});
	
	o.buildings.push(o.nexus);
	
	var worker=o.nexus.train("worker");
	o.workers.push(worker);
	o.nexus.dispatch("newworker",worker);
	
	var pylon=worker.build("pylon");
	o.buildings.push(pylon);
	o.nexus.dispatch("newbuilding",pylon);
	var forge=worker.build("forge");
	o.buildings.push(forge);
	o.nexus.dispatch("newbuilding",forge);
	
	var charge=pylon.photonOvercharge();
	o.units.push(charge);
	o.nexus.dispatch("newunit",charge);
	var shields=forge.train("shields");
	o.upgrades.push(shields);
	o.nexus.dispatch("newupgrade",shields);
	
	return o;
}

var game=new InitGame();

var j;
var createnewworkers=game.getTotalPsi()-game.workers.length;
for(j=0;j<createnewworkers;j++){
	var w=game.nexus.train("worker");
	game.workers.push(w);
	game.nexus.dispatch("newworker", w);
}

for(j=0;j<2;j++){
	var f=game.getBuildingByType(Forge);
	var u=f.train("shields");
	game.upgrades.push(u);
	game.nexus.dispatch("newupgrade", u);
}