var IVehicle = {
	moveTo: [Number, Number],
	setName: [String]
}.interface("IVehicle");

function testOver() {
	var o = this,
		a = arguments;
	o.name = "";
	o.x = 0;
	o.y = 0;
	o.super(a, true);

	var m = {};
	m.moveTo = function(x, y) {
		o.x = x;
		o.y = y;
		return o.callSuper('moveTo', arguments); //returns interface verification of input
	};
	m.setName = function(name) {
		if (o.callProto(IVehicle, "setName", arguments)) { //check whether the arguments input is valid according to interface
			o.name = name;
		} else { //provide fallback
			o.name = name.toString();
		}
	};
	o.superize(a, m, true, true, true);
	return o;
}
testOver.implement(IVehicle); //the same as setSuper

var tt = new testOver();
tt.setName("test");
tt.setName(33);
tt.moveTo(3, 4);

var ABaseVehicle = {
	moveTo: 0,
	setName: 0
}.abstract("ABaseVehicle");
var abv;
try {
	abv = new ABaseVehicle();
} catch (e) {
	console.log(e); //Error: Illegal instance of Abstract class: ABaseVehicle
	//abv is undefined
}

function testOver2() {
	var o = this,
		a = arguments;
	o.name = "";
	o.x = 0;
	o.y = 0;
	o.super(a, true);

	var m = {};
	m.moveTo = function(x, y) {
		o.x = x;
		o.y = y;
		return o;
	};
	o.superize(a, m, true, true, true);
	o.final(a); //final class, all subclasses will throw error
	return o;
}
testOver2.setSuper(ABaseVehicle);

var tt2 = new testOver2(); //no abstract error, bottom constructor is different
tt2.moveTo(3, 3); //allowed move
try {
	tt2.setName("test2"); //will throw error, it must be implemented
} catch (e) {
	console.log(e); //Error: Illegal call [setName] at Abstract class: ABaseVehicle
}

function testOver3() {
	var o = this,
		a = arguments;
	o.super(a, true);
	var m = {};
	o.superize(a, m, true, true, true);
	return o;
}
testOver3.setSuper(testOver2);
var ttt3;
try {
	ttt3 = new testOver3();
} catch (e) {
	console.log(e); //Error: Illegal instance of Final class: testOver2
}