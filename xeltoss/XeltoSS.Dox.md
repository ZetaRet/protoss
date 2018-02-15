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
default {}, used in "argumentKeyMatch" and "identifyKeyChain" to identify missing key values, misconfiguration might result "void"  
#
__toppack__ Object  
default null, top package you should set "window" in most cases, used everywhere inside code to obtain classes by supername  
#
__scopeMap__ Object  
default {}, scope cache map used in external or proxy builders (usually will refer to it through XeltoSS this object as shared memory mechanism)  
#
__preserveScope__ Boolean  
default false, protected methods using "\_p" will generate scoped method and replace original (lookup Function.prototype.xcoped)  
#
__fractalizedScope__ Boolean  
default false, used in external and proxy AST/instruction builders to successfully identify stacks of scope (usually achieved by defining functions inside each other and refering to scope outside its own), this concept is not implemented in the majority of source code parsers but in Virtual Machines  
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

__initTokens() : *Object*__  
constructs "tokens" object  
> *return __XeltoSS Object__, self*  

##
__initKeywords() : *Object*__  
constructs "keywords" object  
> *return __XeltoSS Object__, self*  

##
__initOperators() : *Object*__  
constructs "operator" object  
> *return __XeltoSS Object__, self*  

##
__initAsync() : *Object*__  
constructs "AsyncFunction" and allows async  
> *return __XeltoSS Object__, self*  

##
__initGenerator() : *Object*__  
constructs "GeneratorFunction" and allows generator  
> *return __XeltoSS Object__, self*  

##
__updateTimers(*Boolean* obscure) : *Object*__  
- obscure - __*Boolean*__, if true will remove setInterval/setTimeout otherwise will revert  
> *return __XeltoSS Object__, self*  

##
__hashString(*String* str) : *String*__  
- __str*__ - __*String*__, bitshifted version will be generated  
> *return __String__, hash version of input str*  

##
__decomposeFunction(*Function* f) : *Array*__  
- __f*__ - __*Function*__, any function  
> *return __Array__, 0-name:__String__, 1-arguments keyname:__Array__, 2-function body:__String__, 3-hash of f body:__String__, 4-function header:__String__*  

##
__deflatCls(*Object* obj, *Object* maps, *Boolean* interfaces, *Boolean* abstracts, *Boolean* constructs, *Boolean* inheritance) : *Object*__  
- __obj*__ - __*Object*__, object in reconstruction, instance of ProtoSS constructor or custom format  
- maps - __*Object*__, extracted polymorphic maps from "obj"  
- interfaces - __*Boolean*__, modify interfaces  
- abstracts - __*Boolean*__, modify abstract classes  
- constructs - __*Boolean*__, modify constructors  
- inheritance - __*Boolean*__, modify hierachy and its constructors  
```
if(o.deflat){  
	o.deflat.call(o,obj,maps,interfaces,abstracts,constructs,inheritance);  
}
```
> *return __XeltoSS Object__, self*  

##
__getConstructorArgs(*Function* clsconstructor, *Object* obj, *String* key, *Object* data) : *String*__  
- __clsconstructor*__ - __*Function*__, corresponding constructor in "obj" key-value  
- __obj*__ - __*Object*__, host object  
- __key*__ - __*String*__, key on host object  
- data - __*Object*__, additional data for "argsLookup", usually polymorphic maps  
```
if(o.argsLookup){  
	return o.argsLookup.call(o,clsconstructor,obj,key,data);  
}
```
> *return __String__, arguments string representation ready for function construction*  

##
__buildInstructions(*String* fbody, *Function* cls) : *Array*__  
- __fbody*__ - __*String*__, class source in string format  
- __cls*__ - __*Function*__, function reference to fbody string  
```
var fbl=fbody.length,ch=o.chmod,instr=[];  
if(fbl>0 && o.proxyInstructions){  
	return o.proxyInstructions.call(o,fbody,cls,ch,instr);  
}  
return instr;  
```
> *return __Array__, code instructions representing source*  

##
__buildASTObject(*Function* cls) : *Object*__  
- __cls*__ - __*Function*__, uses "proxyASTBuilder" or "new" instance as default behaviour in JS VM and "buildInstructions" aststruct extraction
```
if(!o.proxyASTBuilder){  
	var ast=new cls();  
	o.aststruct=o.buildInstructions(cls.toString(),cls);  
	return ast;  
}  
return o.proxyASTBuilder.call(o,cls);  
```
> *return __Object__, default is cls instance as it is generated by JS VM*  

##
__identifyKeyChain(*Object* obj, *Function* identifyKeyHandler) : *Object*__  
- __obj*__ - __*Object*__, host object, obtains supername string   
- __identifyKeyHandler*__ - __*Function*__, function "nkic(obj,k,d,s)" mapped by supername  
> *return __XeltoSS Object__, self*  

##
__addEmbedMap(*Object* obj, *Object* keyHandlerMap) : *Object*__  
- __obj*__ - __*Object*__, host object, obtains supername string   
- __keyHandlerMap*__ - __*Object*__, key-function object map, "em[sname][k](obj,k,decomp,sname)", functions can be generated with "argumentKeyMatch"  
> *return __XeltoSS Object__, self*  

##
__augmentKey(*Object* obj, *Object* akeyMap) : *Object*__  
- __obj*__ - __*Object*__, host object, obtains supername string  
- __akeyMap*__ - __*Object*__, key-array object map, must be generated "augmentKeyMap[sname][key]=[]" using lower case keys, used in "argumentKeyMatch"  
> *return __XeltoSS Object__, self*  

##
__argumentKeyMatch(*Number* orshift, *Object* defval, *Function* formatter) : *Function*__  
- orshift - __*Number*__, configure argument index shift upon matching it with "augmentKeyMap" by supername "s"  
- defval - __*Object*__, default value, return using "valToString" and special keyword implementations (self, this, byte, word, void), lookup "noKeyIdentificationChain"  
- formatter - __*Function*__, format upon return "formatter(kv,fkv,defval,obj,k,d,s)"  
> *return __Function__, function(obj,k,d,s) used in "addEmbedMap"*  

##
__valToString(*Object* val) : *String*__  
- __val*__ - __*Object*__, uses standard methods of convertion, objects and arrays may be converted using "objectStringufy" and "arrayStringify"  
> *return __String__, parsed val into String, acceptable by VM as a property, i.e. class constructor property*  

##
__findMethodInMaps(*Object* obj, *String* key, *Function* method, *Array* maps) : *Object*__  
- __obj*__ - __*Object*__, obtains maps by map key  
- __key*__ - __*String*__, method key  
- __method*__ - __*Function*__, method reference  
- __maps*__ - __*Array*__, map keys in supers order  
> *return __Object__, super method map owner of the method*  

##
__toCls(*Object* obj, *String* clsname, *String* clssuper, *Boolean* deflat, *Object* polymaps, *Object* reservedwordsmap, *Boolean* emptify) : *String*__  
- __obj*__ - __*Object*__, ProtoSS instance or ASTObject used to construct class string  
- clsname - __*String*__, JS Class name or cls name  
- clssuper - __*String*__, JS Super class name (extends property) or none  
- deflat - __*Boolean*__, will call external deflatter to finalize property and method extraction during reconstruction phase  
- polymaps - __*Object*__, initial polymorphic references  
- reservedwordsmap - __*Object*__, default key names  
- emptify - __*Boolean*__, empty Object/Array or null values in properties  
> *return __String__, class representation in String format*  

##
__ClsFactoryFromStringCls(*String* clss) : *Function*__  
- __clss*__ - __*String*__, class representation in String format, will be wrapped in Function return body  
> *return __Function__, factory/generator of XeltoSS class, a call is required to return class reference*  

##
__toClsFactory(*Object* obj, *String* clsname, *String* clssuper, *Boolean* deflat, *Object* polymaps, *Object* reservedwordsmap, *Boolean* emptify) : *Function*__  
- __cls*__ - __*Function*__, ProtoSS class, exchange in package default to XeltoSS  
- clsname - __*String*__, JS Class name or cls name  
- clssuper - __*String*__, JS Super class name (extends property) or none  
- deflat - __*Boolean*__, will call external deflatter to finalize property and method extraction during reconstruction phase  
- polymaps - __*Object*__, initial polymorphic references  
- reservedwordsmap - __*Object*__, default key names  
- emptify - __*Boolean*__, empty Object/Array or null values in properties  
> *return __Function__, factory/generator of XeltoSS class, a call is required to return class reference*  

##
__toClsBlobScript(*String* clss, *String* prefix, *String* suffix) : *HTMLElement*__  
- __clss*__ - __*String*__, script body converted to blob file with url  
- prefix - __*String*__, surround prefix of script body  
- suffix - __*String*__, surround suffix of script body  
> *return __HTMLElement__, script tag with blob url to js file*  

##
__*toClsScript(String clss, String prefix, String suffix) : HTMLElement*__  
- __clss*__ - __*String*__, script body imported in tag directly  
- prefix - __*String*__, surround prefix of script body  
- suffix - __*String*__, surround suffix of script body  
> *return __HTMLElement__, script tag with js body*  

##
__reconstruct(*Function* cls, *String* clsname, *String* clssuper, *Boolean* deflat, *Object* polymaps, *Object* reservedwordsmap, *Boolean* emptify, *Boolean* useclsfactory) : *Function*__  
- __cls*__ - __*Function*__, ProtoSS class, exchange in package default to XeltoSS  
- clsname - __*String*__, JS Class name or cls name  
- clssuper - __*String*__, JS Super class name (extends property) or none  
- deflat - __*Boolean*__, will call external deflatter to finalize property and method extraction during reconstruction phase  
- polymaps - __*Object*__, initial polymorphic references  
- reservedwordsmap - __*Object*__, default key names  
- emptify - __*Boolean*__, empty Object/Array or null values in properties  
- useclsfactory - __*Boolean*__, use "toClsFactory" instead of "toClsScript"   
> *return __Function__, XeltoSS class*  

##
__autodestroy(*Object* obj) : *Boolean*__  
- __obj*__ - __*Object, if "autoDestructor" will try "destructorKeys" on obj to call destructor method  
> *return __Boolean__, true=successful destroy*  

##
__hybrid(*Function* escls, *Function* protcls, *Object* obj, *Boolean* swap, *Object* polymaps) : *Object*__  
- __escls*__ - __*Function*__, JS Class, any class can be converted to XeltoSS Hybrid  
- __protcls*__ - __*Function*__, ProtoSS Class, any class can be converted to prototype class of the XeltoSS Hybrid  
- __obj*__ - __*Object*__, ProtoSS or JS Class instance, extracts super hierarchy  
- swap - __*Boolean*__, exchange in package to XeltoSS Hybrid (JS+ProtoSS class)  
- polymaps - __*Object*__, polymorphic references as usually constructed by "toCls"  
> *return __XeltoSS Object__, self*  

##
__xeltoss(*Function* cls, *String* clsname, *String* clssuper, *Boolean* deflat, *Object* polymaps, *Object* reservedwordsmap, *Boolean* emptify, *Boolean* useclsfactory) : *Function*__  
- __cls*__ - __*Function*__, ProtoSS class, exchange in package default to XeltoSS  
- clsname - __*String*__, JS Class name or cls name  
- clssuper - __*String*__, JS Super class name (extends property) or none  
- deflat - __*Boolean*__, will call external deflatter to finalize property and method extraction during reconstruction phase  
- polymaps - __*Object*__, initial polymorphic references  
- reservedwordsmap - __*Object*__, default key names  
- emptify - __*Boolean*__, empty Object/Array or null values in properties  
- useclsfactory - __*Boolean*__, use "toClsFactory" instead of "toClsScript"   
> *return __Function__, XeltoSS class*  

##
__protoss(*Function* cls) : *Function*__  
- __cls*__ - __*Function*__, XeltoSS class, exchange in package default to ProtoSS  
> *return __Function__, ProtoSS class*  

##
__\_constructor() : *void*__  
> *return __void__, creates static instance*  

##
__\_destructor() : *void*__  
> *return __void__, cleans static instances*  


## Static  

### *Properties*  
##

**__InitXeltoSSPrototypes** Boolean  
default false, flag state of InitXeltoSSPrototypes  

##
### *Methods*  
##

__InitXeltoSSPrototypes(*Boolean* override) : *XeltoSS*__  
- override - __*Boolean*__, mark XeltoSS Prototype for overriding, will reinstall prototypes in effect  
> *return __Function__, self XeltoSS class*  

##
### *Object Prototype*  
##

__superx(*function_arguments|Array* arguments, *Array|Boolean* call_arguments, *String* name) : *Object*__  
- __arguments*__ - (args) function arguments object if supported, or manually created Array [] with assigned "callee" reference to the function class object  
- __call_arguments*__ - (cargs) Array used to call "apply" of the super constructor function, Boolean true will use arguments as call arguments (cargs=args)  
- name - __*String*__ used to define the name of the constructor in the prototype, default __constructor  
> *return constructor function result or "undefined" for duplicated super constructor (or no constructor)*  

##
__getSuperx(*Function* fn, *String* name) : *Array*__  
- fn - __*Function*__, if null will use this  
- name - __*String*__, if null will use __constructor  
> *return __Array__, of super constructor function or functions in XeltoSS mode (if super is aggregate will use __constructor_list)*  

##
__ix(*Function* sfn, *Function* fn, *String* name) : *Boolean*__  
- __sfn*__ - __*Function*__, super XeltoSS function to check against  
- fn - __*Function*__, if null will use this, to obtain all supers  
- name - __*String*__, if null will use __constructor  
> *return __Boolean__, true - if it exists in the inheritance tree or equals this constructor in XeltoSS mode, otherwise false*

##
### *Function Prototype*  
##

__xcoped(*Object* scope) : *Function*__  
- __scope*__ - __*Object*__, usually "this" in classes or original function owner  
> *return __Function__, new function wrapper calling original using scope*  
