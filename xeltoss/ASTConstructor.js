/**
 * Author: Zeta Ret, Ivo Yankulovski
 * Zeta Ret XeltoSS ASTConstructor
 * Generates ASTConstructorInstance of type Function
 * Version: 1.01
 * Date: 2018 - Today
 **/
function ASTConstructor(key, data, datahandler) {
	var ASTConstructorInstance = function ASTConstructorInstance(cast) {
		ASTConstructorInstance.data = cast;
		return ASTConstructorInstance.toString();
	};
	ASTConstructorInstance.constructor = arguments.callee;
	ASTConstructorInstance.key = key;
	ASTConstructorInstance.data = data;
	ASTConstructorInstance.datahandler = datahandler;
	ASTConstructorInstance.toString = function toString() {
		return this.datahandler ? this.datahandler(this.key, this.data) : this.data.toString()
	};
	return ASTConstructorInstance;
}