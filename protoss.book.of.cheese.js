/**
 * Author: Zeta Ret, Ivo Yankulovski
 * Load the book before protoss.*.js to cheese up the browser
 * Provides backwards compatibility in old browsers 
 * Version: 1.00
 * Date: 2018 
**/

/*adds name getter to Function prototype, cache to aname as it is used in protoss*/
if (!(function testfunctionnamegetter(){}).name){
	Object.defineProperty(Function.prototype, 'name', {
		get: function(){
			if(!this.aname){
				var name = (this.toString().match(/^function\s*([^\s(]+)/)||[])[1];
				Object.defineProperty(this, 'name', {value:name});
				this.aname=name;
			}
			return this.aname;
		}
	});
}
