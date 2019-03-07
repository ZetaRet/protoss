window.package("mypack.is.really.big").internal( //you may use any object different than window, first object from package will attach to it, i.e. window.mypack or just mypack
	function InternalClass() {
		var o = this,
			a = arguments;
		var m = {};
		o.super(a);
		m.checkMe = function() {
			return "Cool!";
		};
		o.superize(a, m, true, true, true);
		return o;
	});

var into = new mypack.is.really.big.InternalClass();
into.checkMe(); //return Cool!
into.getSuperName(); //return mypack.is.really.big::InternalClass
window.package(mypack.is.really.big.InternalClass.packagename); //return package object from static property attached to every class object defined in a package
console.log(into);
window.package("mypack.is.really.big").namespace("superprivatens_8721ZXC",
	function NSClass() {
		var o = this,
			a = arguments;
		var m = {};
		o.super(a);
		m.checkMe = function() {
			return "Cool Namespace!";
		};
		o.superize(a, m, true, true, true);
		return o;
	});
var nstouse = window.package("mypack.is.really.big").usens("superprivatens_8721ZXC"); //returns namespace in a package by providing namespace id
console.log(nstouse);
var clsfromns = new nstouse.NSClass();
clsfromns.checkMe(); //return Cool Namespace!
console.log(clsfromns);

console.log(mypack);