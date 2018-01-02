/**
 * Author: Zeta Ret, Ivo Yankulovski 
 * Zeta Ret XeltoSS ASTConstructor 
 * Generates ASTConstructorInstance of type function 
 * Version: 1.00 
 * Date: 2018 
**/
function ASTConstructor(key,data,datahandler){
	var ASTConstructorInstance=function ASTConstructorInstance(){};
	ASTConstructorInstance.constructor=arguments.callee;
	ASTConstructorInstance.key=key;
	ASTConstructorInstance.data=data;
	ASTConstructorInstance.datahandler=datahandler;
	ASTConstructorInstance.toString=function toString(){return this.datahandler?this.datahandler(this.key,this.data):this.data.toString()};
	return ASTConstructorInstance;
}
