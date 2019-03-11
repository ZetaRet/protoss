> __Author: Zeta Ret, Ivo Yankulovski__  
> __Object prototypes for OOP__  
# ProtoSS - Prototype Supers-Subclass  
> *Version: 1.05*  
> *Date: 2017 - Today*  

__required*__

## ZetaRet_Prototypes  
>All ProtoSS functionality, instance is generated immediately  


##  
### *Methods*  

##  
__ZetaRet_Prototypes() : *void*__  

> *return __void__*  

##  
__rndstr(*Number* l) : *String*__  

- __l*__ - __*Number*__, generates random string with length of characters  
> *return __String__, random string*  

##  
__super(*function_arguments|Array* args, *Array|Boolean* cargs, *String* name) : *Object*__  

- __args*__ - __*function_arguments|Array*__, function arguments object if supported, or manually created Array [] with assigned 'callee' reference to the function class object  
- __cargs*__ - __*Array|Boolean*__, Array used to call 'apply' of the super constructor function, Boolean true will use arguments as call arguments (cargs=args)  
- name - __*String*__, String used to define the name of the constructor in the prototype, default __constructor  
> *return __Object__, constructor function result*  

##  
__superize(*function_arguments|Array* args, *Object* map, *Boolean* setname, *Boolean* setown, *Boolean* defname) : *Object*__  

- __args*__ - __*function_arguments|Array*__, function arguments object if supported, or manually created Array [] with assigned 'callee' reference to the function class object  
- map - __*Object*__, if null will use 'this' object to enumerate all assigned functions, used for member methods, functions in map will be assigned to 'this'  
- setname - __*Boolean*__, changes name of iterated function according to key, function.aname  
- setown - __*Boolean*__, adds constructor name to function name, requires setname, i.e. 'myfunction#myclass', function.oname  
- defname - __*Boolean*__, adds setname and setown to function.name property  
> *return __Object__, with all functions assigned to this function class in particular*  

##  
__setSuper(*Function* superfn, *Function* fn, *String* name) : *Function*__  

- __superfn*__ - __*Function*__, the super function of fn or this  
- fn - __*Function*__, if null will use this function, fn extends superfn in effect, fn is subclass of superfn  
- name - __*String*__, if null will use default __constructor  
> *return __Function__, superfn will be returned for chain calls*  

##  
__setSubclass(*Function* fn, *Function* superfn, *String* name) : *Function*__  

- __fn*__ - __*Function*__, fn extends superfn in effect, fn is subclass of superfn  
- superfn - __*Function*__, if null will use this function, the super function of fn  
- name - __*String*__, if null will use default __constructor  
> *return __Function__, superfn will be returned for chain calls*  

##  
__callSuper(*String* name, *Array* args, *String* cname) : *Object*__  

- __name*__ - __*String*__, name of super function  
- args - __*Array*__, array of arguments to apply  
- cname - __*String*__, constructor name, if null will use __constructor  
> *return __Object__, result of next super function different than this[name] function*  

##  
__callSuper2(*String* name, *Array* args, *String* cname) : *Object*__  

- __name*__ - __*String*__, name of super function  
- args - __*Array*__, array of arguments to apply  
- cname - __*String*__, constructor name, if null will use __constructor  
> *return __Object__, result of super function, may call the same function object as this[name] function*  

##  
__callSuperX(*String* name, *Array* args, *String* cname, *Function* thiscls) : *Object*__  

- __name*__ - __*String*__, name of super function  
- args - __*Array*__, array of arguments to apply  
- cname - __*String*__, constructor name, if null will use __constructor  
- thiscls - __*Function*__, accepts current constructor class scope for continues upwards super calls, uses getNextSuperX, works with super constructor lists, compatible with XeltoSS (ProtoSS JS Class)  
> *return __Object__, result of next super function different than thiscls.prototype.map[name] function or this.map[name] function*  

##  
__getNextSuper(*String* name, *String* cname) : *Function*__  

- __name*__ - __*String*__, search super function by name in super map created by superize  
- cname - __*String*__, constructor name, if null will use __constructor  
> *return __Function__, next function in super maps after calling getSupers()*  

##  
__getNextSuperX(*String* name, *String* cname, *Function* thiscls) : *Function*__  

- __name*__ - __*String*__, search super function by name in super map created by superize  
- cname - __*String*__, constructor name, if null will use __constructor  
- thiscls - __*Function*__, accepts current constructor class scope for interpolating next super properly, detects prototype method maps, compatible with XeltoSS (ProtoSS JS Class)  
> *return __Function__, next function in super maps after calling getSupers() on thiscls or this*  

##  
__getSuper() : *Object*__  

> *return __Object__, super object map of next super class as it was created by superize*  

##  
__getThis() : *Object*__  

> *return __Object__, super object map of this object as it was created by superize*  

##  
__callProto(*Function* proto, *String* name, *Array* args) : *Object*__  

- __proto*__ - __*Function*__, prototype constructor function of any of the supers, it will use super object map by proto.name  
- __name*__ - __*String*__, name of the function to call on the super object map  
- args - __*Array*__, array of arguments to apply  
> *return __Object__, result of the super prototype function as it is defined in its function scope*  

##  
__callProto2(*Object* proto, *String* name, *Array* args) : *Object*__  

- __proto*__ - __*Object*__, super object map obtained from the same object, may simulate by using an Object with assigned 'constructor' from the supers  
- __name*__ - __*String*__, name of the function to call on the super object map  
- args - __*Array*__, array of arguments to apply  
> *return __Object__, result of the super prototype function as it is defined in its function scope*  

##  
__callProtoX(*Object* proto, *String* name, *Array* args) : *Object*__  

- __proto*__ - __*Object*__, prototype constructor function of any of the supers, it will use super object map by proto.name or prototype of the function  
- __name*__ - __*String*__, name of the function to call on the super object map or prototype of the function  
- args - __*Array*__, array of arguments to apply  
> *return __Object__, result of the super prototype function as it is defined in its function scope, support of XeltoSS (ProtoSS JS Class) prototype chain*  

##  
__superList(*Array* list, *Function* fn, *String* name, *Boolean* defname) : *Function*__  

- __list*__ - __*Array*__, list of constructor functions used as supers  
- fn - __*Function*__, if null will use this, fn extends aggregate function which calls the list with constructors, the aggregate function uses __constructor_list instead of __constructor  
- name - __*String*__, name of constructor, if null will use __constructor  
- defname - __*Boolean*__, adds function.name property, aname is always added now  
> *return __Function__, fn for chain calls*  

##  
__superList2(*Array* list, *Function* fn, *String* name, *Boolean* defname) : *Function*__  

- __list*__ - __*Array*__, list of constructor functions used as supers  
- fn - __*Function*__, if null will use this, fn extends aggregate function which calls the list with constructors (uses same arguments for all supers, superList requires an array of arguments, each index exactly matching the super index), the aggregate function uses __constructor_list instead of __constructor  
- name - __*String*__, name of constructor, if null will use __constructor  
- defname - __*Boolean*__, adds function.name property, aname is always added now  
> *return __Function__, fn for chain calls*  

##  
__getSupers(*Function* fn, *String* name) : *Array*__  

- fn - __*Function*__, if null will use this  
- name - __*String*__, if null will use __constructor  
> *return __Array__, all super constructor functions, allows caching inside function object*  

##  
__getSupers2(*Function* fn, *String* name) : *Array*__  

- fn - __*Function*__, if null will use this  
- name - __*String*__, if null will use __constructor  
> *return __Array__, super constructor function or functions (if super is aggregate will use __constructor_list*  

##  
__getReversedSupers(*Function* fn, *String* name) : *Array*__  

- fn - __*Function*__, if null will use this  
- name - __*String*__, if null will use __constructor  
> *return __Array__, all super constructor functions, reversed order*  

##  
__hasSuper(*Function* sfn, *Function* fn, *String* name) : *Boolean*__  

- __sfn*__ - __*Function*__, super function to check against  
- fn - __*Function*__, if null will use this, to obtain all supers  
- name - __*String*__, if null will use __constructor  
> *return __Boolean__, true - if it exists in the inheritance tree, otherwise false*  

##  
__is(*Function* sfn, *Function* fn, *String* name) : *Boolean*__  

- __sfn*__ - __*Function*__, super function to check against  
- fn - __*Function*__, if null will use this, to obtain all supers  
- name - __*String*__, if null will use __constructor  
> *return __Boolean__, true - if it exists in the inheritance tree or equals this constructor, otherwise false*  

##  
__abstract(*String* name, *Object* amap, *Boolean* defname) : *Function*__  

- name - __*String*__, if null will use ZetaRet_Abstract_XXX13XXX  
- amap - __*Object*__, if null will use this, i.e. {term:0,date:0,record:3}.abstract()  
- defname - __*Boolean*__, adds function.name property, aname is always added now  
> *return __Function__, afn is aggregate function which generates methods according to map (uses statis), if key-value pair is [0,false,null,undefined,''] will throw abstract error, otherwise will return the value from the object map (i.e. .record() returns 3), abstract class throws error on instance, must be subclassed*  

##  
__implement(*Function* superfn, *Function* fn, *String* name) : *Function*__  

- __superfn*__ - __*Function*__, the super function of fn or this  
- fn - __*Function*__, if null will use this function, fn extends superfn in effect, fn is subclass of superfn  
- name - __*String*__, if null will use default __constructor  
> *return __Function__, superfn will be returned for chain calls, [implement calls setSuper]*  

##  
__interface(*String* name, *Object* imap, *Boolean* defname) : *Function*__  

- name - __*String*__, if null will use ZetaRet_Interface_XXX13XXX  
- imap - __*Object*__, if null will use this, i.e. {term:[String, Number],date:[Date],record:[CustomRecordClass, IRecordData]}.interface()  
- defname - __*Boolean*__, adds function.name property, aname is always added now  
> *return __Function__, ifn is aggregate function which generates methods according to map (uses statis), methods will test arguments against map value input types, each method returns true or false, depending on matched types*  

##  
__final(*function_arguments|Array* args) : *Object*__  

- __args*__ - __*function_arguments|Array*__, compares this.constructor and args.callee, will throw error if not equal, a class with final call must not be a super  
> *return __Object__, this*  

##  
__statis(*function_arguments|Array* args, *Function* statis, *Object* \_super, *Boolean* setname, *Boolean* setown, *Boolean* defname) : *Object*__  

- __args*__ - __*function_arguments|Array*__, function arguments object if supported, or manually created Array [] with assigned 'callee' reference to the function class object  
- statis - __*Function*__, static function assign to object, these functions act like prototype functions and as such are not generated per new instance (superize), statis(Object s, Function constructor){s.myf=function(){};}  
- _super - __*Object*__, if null will use callee[prfx+callee.name+sffx] object to enumerate all assigned functions, used for member methods, functions in map will be assigned to 'this'  
- setname - __*Boolean*__, changes name of iterated function according to key, function.aname  
- setown - __*Boolean*__, adds constructor name to function name, requires setname, i.e. 'myfunction#myclass', function.oname  
- defname - __*Boolean*__, adds setname and setown to function.name property  
> *return __Object__, all functions assigned to this function class*  

##  
__getSuperName() : *String*__  

> *return __String__, package+::+name, works only on instances using constructor static properties*  

##  
__getSuperName2() : *String*__  

> *return __String__, package+::+name, works on instances and classes using constructor static properties*  

##  
__namespace(*String* ns, *Function* cls, *Object* pack) : *Object*__  

- __ns*__ - __*String*__, id of namespace, will create new package in effect with prefix  
- __cls*__ - __*Function*__, function to import into package, uses internal call  
- pack - __*Object*__, if null uses this  
> *return __Object__, package object defining new namespace*  

##  
__usens(*String* ns, *Object* pack) : *Object*__  

- __ns*__ - __*String*__, id of namespace  
- pack - __*Object*__, if null uses this  
> *return __Object__, resolved package object using namespace prefix*  

##  
__internal(*Function* cls, *Object* pack) : *Object*__  

- __cls*__ - __*Function*__, class function, must provide name  
- pack - __*Object*__, if null uses this  
> *return __Object__, last package object*  

##  
__package(*String* name, *Object* scope) : *Object*__  

- __name*__ - __*String*__, name of package, use .(dot) for delimiter  
- scope - __*Object*__, if null uses this, scope for attaching/reading package, use window in most of the time or globally accessible object  
> *return __Object__, last package object*  

---  
### MarkDown - JsonDox 1.02 - Zeta Ret Zetadmin Documentation Generator