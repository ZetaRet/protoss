> __Author: Zeta Ret, Ivo Yankulovski__  
> __Zeta Ret XeltoSS__  
# ProtoSS Transformator to JS Class  
> *Requires: protoss.all.js v1.02c*  
> *Version: 1.04*  
> *Date: 2017*  

__required*__

## XeltoSS  

### *Properties*  

#
__scriptContainer__ HTMLElement  
default null, container to append new script tags  
#
__scriptContainerAppendMethod__ String  
default "appendChild", method name to call at __scriptContainer__  
#
__protossPrefix__ String  
default "protoss__" prefix in package  
#
__xeltossPrefix__ String  
default "xeltoss__", prefix in package  
#
__xeltossMethodSuffix__ String  
default "X", x scoped method suffix after transpile (add "\_x" in function definition to preserve scope, lookup 
Function.prototype.xcoped)  
#
__statisAsStatic__ Boolean  
default false, methods added using "statis" will be converted to static of the class  
#
__embedMaps__ Object  
default {}, used in "addEmbedMap" and "toCls", matches object supername and key in order to build custom body properties defined externally  
#
__augmentKeyMap__ Object  
default {}, used in "augmentKey" and "argumentKeyMatch", identify alternative keys based on augmenting object supername  
#
__noKeyIdentificationChain__ Object  
default {}, used in "argumentKeyMatch" and "identifyKeyChain" to identify missing key values, misconfiguration might result 
"void"  
#
__toppack__ Object  
default null, top package you should set "window" in most cases, used everywhere inside code to obtain classes by supername  
#
__scopeMap__ Object  
default {}, scope cache map used in external or proxy builders (usually will refer to it through XeltoSS this object as shared memory 
mechanism)  
#
__preserveScope__ Boolean  
default false, protected methods using "\_p" will generate scoped method and replace original (lookup Function.prototype.xcoped)  
#
__fractalizedScope__ Boolean  
default false, used in external and proxy AST/instruction builders to successfully identify stacks of scope (usually achieved by 
defining functions inside each other and refering to scope outside its own), this concept is not implemented in the majority of source code parsers but in Virtual 
Machines  
#
__obscureTimers__ Boolean  
default false, remove setInterval and setTimeout during hybridization process  
#
__setInterval__ Function  
default null, reference to original setInterval function  
#
__setTimeout__ Function  
default null, reference to original setTimeout function  
#
__tokens__ Object  
default null, map of string tokens  
#
__keywords__ Object  
default null, map of string keywords  
#
__operators__ Object  
default null, map of string operators  
#
__autoget__ Boolean  
default true, allow automatic convertion of marked methods as getters  
#
__autoGetPrefix__ String  
default "get_", method name prefix mark  
#
__autoset__ Boolean  
default true, allow automatic convertion of marked methods as setters  
#
__autoSetPrefix__ String  
default "set_", method name prefix mark  
#
__methodJoin__ String  
default "", used string in joining method array  
#
__bodyJoin__ String  
default "", used string in joining body logic array  
#
__overextendHandler__ Function  
default null, define custom extraction of body properties  
#
__classHandler__ Function  
default null, define custom construction of class output string  
#
__tossIgnore__ Boolean  
default false, disable ProtoSS transfer of prototypes, method maps and method transfer  
#
__deflatInterfaces__ Boolean  
default true, used in assembly process if deflat allowed  
#
__deflatAbstracts__ Boolean  
default true, used in assembly process if deflat allowed  
#
__deflatConstructs__ Boolean  
default true, used in assembly process if deflat allowed  
#
__deflatInheritance__ Boolean  
default true, used in assembly process if deflat allowed  
#
__deflatStruct__ Object  
default {}, used through "deflatCls"  
#
__objectStringify__ Function  
default null, custom stringification of objects, lookup JSON.stringify  
#
__arrayStringify__ Function  
default null, custom stringification of arrays, lookup JSON.stringify  
#
__methodTransfer__ Boolean  
default false, inherited methods will not be added to class definition, can be transfered from super prototype  
#
__autoConstructor__ Boolean  
default true, constructor method key must be equal to class name to initiate default constructor policy, lookup "constructorKeys"  
#
__constructorKeys__ Array  
default ["construct","_construct","_constructor"], add constructor body to class body  
#
__mergeConstructors__ Boolean  
default true, allow all constructors including inherited to be merged in class constructor  
#
__constructorMap__ Object  
default {}, inherited cache of constructors, used in "mergeConstructors" process  
#
__autoDestructor__ Boolean  
default true, allow XeltoSS to auto destroy upon xeltoss hybridization  
#
__destructorKeys__ Array  
default ["destruct","_destruct","_destructor"], invoke destructor upon end of xeltoss hybridization  
#
__allowSetters__ Boolean  
default true, extract and verify defined setters into new class  
#
__allowGetters__ Boolean  
default true, extract and verify defined getters into new class  
#
__allowAsync__ Boolean  
default false, extract and verify defined async methods into new class  
#
__AsyncFunction__ Function  
default null, AsyncFunction Primitive definition  
#
__allowGenerator__ Boolean  
default false, extract and verify defined generator methods into new class  
#
__GeneratorFunction__ Function 
default null, GeneratorFunction Primitive definition  
#
__ASTConstructor__ Function  
default null, Abstract Syntax Tree Primitive definition, lookup "xeltoss/ASTConstructor.js"  
#
__bodyAssembler__ Function  
default null, invoke upon every body property addition during class construction process  
#
__methodAssembler__ Function  
default null, invoke upon every method addition during class construction process  
#
__argsLookup__ Function  
default null, used in "getConstructorArgs"  
#
__aststruct__ Object  
default null, defined in "buildASTObject" after calling "buildInstructions"  
#
__proxyASTBuilder__ Function  
default null, used in "buildASTObject" as external Abstract Syntax Tree Object builder (usually Virtual Machine or source code parser)  
#
__proxyInstructions__ Function  
default null, used in "buildInstructions"  
#
__deflat__ Function  
default null, extract any additional information regarding instance according to deflat properties  
#
__chmod__ Number  
default 0, used in "buildInstructions" (usually defines mode of character reading throughout source code)  

##
### *Methods*  
##

__*initTokens() : Object*__  
constructs "tokens" object  
> *return XeltoSS Object, self*  

##
__*initKeywords() : Object*__  
constructs "keywords" object  
> *return XeltoSS Object, self*  

##
__*initOperators() : Object*__  
constructs "operator" object  
> *return XeltoSS Object, self*  

##
__*initAsync() : Object*__  
constructs "AsyncFunction" and allows async  
> *return XeltoSS Object, self*  

##
__*initGenerator() : Object*__  
constructs "GeneratorFunction" and allows generator  
> *return XeltoSS Object, self*  

##
__*updateTimers(Boolean obscure) : Object*__  
- obscure - Boolean, if true will remove setInterval/setTimeout otherwise will revert  
> *return XeltoSS Object, self*  

##
__*hashString(String str) : String*__  
- __str*__ - String, bitshifted version will be generated  
> *return String, hash version of input str*  

##
__*decomposeFunction(Function f) : Array*__  
- __f*__ - Function, any function  
> *return Array, 0-name:String,1-arguments keyname:Array,2-function body:String,3-hash of f body:String,4-function header:String*  

##
__*deflatCls(Object obj, Object maps, Boolean interfaces, Boolean abstracts, Boolean constructs, Boolean inheritance) : Object*__  
- __obj*__ - Object, object in reconstruction, instance of ProtoSS constructor or custom format  
- maps - Object, extracted polymorphic maps from "obj"  
- interfaces - Boolean, modify interfaces  
- abstracts - Boolean, modify abstract classes  
- constructs - Boolean, modify constructors  
- inheritance - Boolean, modify hierachy and its constructors  
```
if(o.deflat){  
	o.deflat.call(o,obj,maps,interfaces,abstracts,constructs,inheritance);  
}
```
> *return XeltoSS Object, self*  

##
__*getConstructorArgs(Function clsconstructor, Object obj, String key, Object data) : String*__  
- __clsconstructor*__ - Function, corresponding constructor in "obj" key-value  
- __obj*__ - Object, host object  
- __key*__ - String, key on host object  
- data - Object, additional data for "argsLookup", usually polymorphic maps  
```
if(o.argsLookup){  
	return o.argsLookup.call(o,clsconstructor,obj,key,data);  
}
```
> *return String, arguments string representation ready for function construction*  

##
__*buildInstructions(String fbody, Function cls) : Array*__  
- __fbody*__ - String, class source in string format  
- __cls*__ - Function, function reference to fbody string  
```
var fbl=fbody.length,ch=o.chmod,instr=[];  
if(fbl>0 && o.proxyInstructions){  
	return o.proxyInstructions.call(o,fbody,cls,ch,instr);  
}  
return instr;  
```
> *return Array, code instructions representing source*  

##
__*buildASTObject(Function cls) : Object*__  
- __cls*__ - Function, uses "proxyASTBuilder" or "new" instance as default behaviour in JS VM and "buildInstructions" aststruct extraction
```
if(!o.proxyASTBuilder){  
	var ast=new cls();  
	o.aststruct=o.buildInstructions(cls.toString(),cls);  
	return ast;  
}  
return o.proxyASTBuilder.call(o,cls);  
```
> *return Object, default is cls instance as it is generated by JS VM*  

##
__*identifyKeyChain(Object obj, Function identifyKeyHandler) : Object*__  
- __obj*__ - Object, host object, obtains supername string   
- __identifyKeyHandler*__ - Function, function "nkic(obj,k,d,s)" mapped by supername  
> *return XeltoSS Object, self*  

##
__*addEmbedMap(Object obj, Object keyHandlerMap) : Object*__  
- __obj*__ - Object, host object, obtains supername string   
- __keyHandlerMap*__ - Object, key-function object map, "em[sname][k](obj,k,decomp,sname)", functions can be generated with "argumentKeyMatch"  
> *return XeltoSS Object, self*  

##
__*augmentKey(Object obj, Object akeyMap) : Object*__  
- __obj*__ - Object, host object, obtains supername string  
- __akeyMap*__ - Object, key-array object map, must be generated "augmentKeyMap[sname][key]=[]" using lower case keys, used in "argumentKeyMatch"  
> *return XeltoSS Object, self*  

##
__*argumentKeyMatch(Number orshift, Object defval, Function formatter) : Function*__  
- orshift - Number, configure argument index shift upon matching it with "augmentKeyMap" by supername "s"  
- defval - Object, default value, return using "valToString" and special keyword implementations (self, this, byte, word, void), lookup "noKeyIdentificationChain"  
- formatter - Function, format upon return "formatter(kv,fkv,defval,obj,k,d,s)"  
> *return Function, function(obj,k,d,s) used in "addEmbedMap"*  

##
__*valToString(Object val) : String*__  
- __val*__ - Object, uses standard methods of convertion, objects and arrays may be converted using "objectStringufy" and "arrayStringify"  
> *return String, parsed val into String, acceptable by VM as a property, i.e. class constructor property*  

##
__*findMethodInMaps(Object obj, String key, Function method, Array maps) : Object*__  
- __obj*__ - Object, obtains maps by map key  
- __key*__ - String, method key  
- __method*__ - Function, method reference  
- __maps*__ - Array, map keys in supers order  
> *return Object, super method map owner of the method*  

##
__*toCls(Object obj, String clsname, String clssuper, Boolean deflat, Object polymaps, Object reservedwordsmap, Boolean emptify) : String*__  
- __obj*__ - Object, ProtoSS instance or ASTObject used to construct class string  
- clsname - String, JS Class name or cls name  
- clssuper - String, JS Super class name (extends property) or none  
- deflat - Boolean, will call external deflatter to finalize property and method extraction during reconstruction phase  
- polymaps - Object, initial polymorphic references  
- reservedwordsmap - Object, default key names  
- emptify - Boolean, empty Object/Array or null values in properties  
> *return String, class representation in String format*  

##
__*ClsFactoryFromStringCls(String clss) : Function*__  
- __clss*__ - String, class representation in String format, will be wrapped in Function return body  
> *return Function, factory/generator of XeltoSS class, a call is required to return class reference*  

##
__*toClsFactory(Object obj, String clsname, String clssuper, Boolean deflat, Object polymaps, Object reservedwordsmap, Boolean emptify) : Function*__  
- __cls*__ - Function, ProtoSS class, exchange in package default to XeltoSS  
- clsname - String, JS Class name or cls name  
- clssuper - String, JS Super class name (extends property) or none  
- deflat - Boolean, will call external deflatter to finalize property and method extraction during reconstruction phase  
- polymaps - Object, initial polymorphic references  
- reservedwordsmap - Object, default key names  
- emptify - Boolean, empty Object/Array or null values in properties  
> *return Function, factory/generator of XeltoSS class, a call is required to return class reference*  

##
__*toClsBlobScript(String clss, String prefix, String suffix) : HTMLElement*__  
- __clss*__ - String, script body converted to blob file with url  
- prefix - String, surround prefix of script body  
- suffix - String, surround suffix of script body  
> *return HTMLElement, script tag with blob url to js file*  

##
__*toClsScript(String clss, String prefix, String suffix) : HTMLElement*__  
- __clss*__ - String, script body imported in tag directly  
- prefix - String, surround prefix of script body  
- suffix - String, surround suffix of script body  
> *return HTMLElement, script tag with js body*  

##
__*reconstruct(Function cls, String clsname, String clssuper, Boolean deflat, Object polymaps, Object reservedwordsmap, Boolean emptify, Boolean useclsfactory) : Function*__  
- __cls*__ - Function, ProtoSS class, exchange in package default to XeltoSS  
- clsname - String, JS Class name or cls name  
- clssuper - String, JS Super class name (extends property) or none  
- deflat - Boolean, will call external deflatter to finalize property and method extraction during reconstruction phase  
- polymaps - Object, initial polymorphic references  
- reservedwordsmap - Object, default key names  
- emptify - Boolean, empty Object/Array or null values in properties  
- useclsfactory - Boolean, use "toClsFactory" instead of "toClsScript"   
> *return Function, XeltoSS class*  

##
__*autodestroy(Object obj) : Boolean*__  
- __obj*__ - Object, if "autoDestructor" will try "destructorKeys" on obj to call destructor method  
> *return Boolean, true=successful destroy*  

##
__*hybrid(Function escls, Function protcls, Object obj, Boolean swap, Object polymaps) : Object*__  
- __escls*__ - Function, JS Class, any class can be converted to XeltoSS Hybrid  
- __protcls*__ - Function, ProtoSS Class, any class can be converted to prototype class of the XeltoSS Hybrid  
- __obj*__ - Object, ProtoSS or JS Class instance, extracts super hierarchy  
- swap - Boolean, exchange in package to XeltoSS Hybrid (JS+ProtoSS class)  
- polymaps - Object, polymorphic references as usually constructed by "toCls"  
> *return XeltoSS Object, self*  

##
__*xeltoss(Function cls, String clsname, String clssuper, Boolean deflat, Object polymaps, Object reservedwordsmap, Boolean emptify, Boolean useclsfactory) : Function*__  
- __cls*__ - Function, ProtoSS class, exchange in package default to XeltoSS  
- clsname - String, JS Class name or cls name  
- clssuper - String, JS Super class name (extends property) or none  
- deflat - Boolean, will call external deflatter to finalize property and method extraction during reconstruction phase  
- polymaps - Object, initial polymorphic references  
- reservedwordsmap - Object, default key names  
- emptify - Boolean, empty Object/Array or null values in properties  
- useclsfactory - Boolean, use "toClsFactory" instead of "toClsScript"   
> *return Function, XeltoSS class*  

##
__*protoss(Function cls) : Function*__  
- __cls*__ - Function, XeltoSS class, exchange in package default to ProtoSS  
> *return Function, ProtoSS class*  

##
__*_constructor() : void*__  
> *return void, creates static instance*  

##
__*_destructor() : void*__  
> *return void, cleans static instances*  


## Static  

### *Properties*  
##

**__InitXeltoSSPrototypes** Boolean  
default false, flag state of InitXeltoSSPrototypes  

##
### *Methods*  
##

__*InitXeltoSSPrototypes(Boolean override) : XeltoSS*__  
- override - Boolean, mark XeltoSS Prototype for overriding, will reinstall prototypes in effect  
> *return Function, self XeltoSS class*  

##
### *Object Prototype*  
##

__*superx(function_arguments|Array arguments, Array|Boolean call_arguments, String name) : Object*__  
- __arguments*__ - (args) function arguments object if supported, or manually created Array [] with assigned "callee" reference to the function class object  
- __call_arguments*__ - (cargs) Array used to call "apply" of the super constructor function, Boolean true will use arguments as call arguments (cargs=args)  
- name - String used to define the name of the constructor in the prototype, default __constructor  
> *return constructor function result or "undefined" for duplicated super constructor (or no constructor)*  

##
__*getSuperx(Function fn, String name) : Array*__  
- fn - Function, if null will use this  
- name - String, if null will use __constructor  
> *return Array, of super constructor function or functions in XeltoSS mode (if super is aggregate will use __constructor_list)*  

##
__*ix(Function sfn, Function fn, String name) : Boolean*__  
- __sfn*__ - Function, super XeltoSS function to check against  
- fn - Function, if null will use this, to obtain all supers  
- name - String, if null will use __constructor  
> *return Boolean, true - if it exists in the inheritance tree or equals this constructor in XeltoSS mode, otherwise false*

##
### *Function Prototype*  
##

__*xcoped(Object scope) : Function*__  
- __scope*__ - Object, usually "this" in classes or original function owner  
> *return Function, new function wrapper calling original using scope*  
