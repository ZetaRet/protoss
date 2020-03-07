> __Author: Zeta Ret, Ivo Yankulovski__  
> __Object prototypes for OOP__  
# ProtoSS - Prototype Supers-Subclass  
> *Version: 1.7.0*  
> *Date: 2017 - Today*  

__required*__

## ZetaRet_Prototypes  
>Basic ProtoSS functionality, no instance is generated  


##  
### *Methods*  

##  
__ZetaRet\_Prototypes() : *void*__  
  
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
__getNextSuper(*String* name, *String* cname) : *Function*__  
  
- __name*__ - __*String*__, search super function by name in super map created by superize  
- cname - __*String*__, constructor name, if null will use __constructor  
> *return __Function__, next function in super maps after calling getSupers()*  

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
__superList(*Array* list, *Function* fn, *String* name, *Boolean* defname) : *Function*__  
  
- __list*__ - __*Array*__, list of constructor functions used as supers  
- fn - __*Function*__, if null will use this, fn extends aggregate function which calls the list with constructors, the aggregate function uses __constructor_list instead of __constructor  
- name - __*String*__, name of constructor, if null will use __constructor  
- defname - __*Boolean*__, adds function.name property, aname is always added now  
> *return __Function__, fn for chain calls*  

##  
__getSupers(*Function* fn, *String* name) : *Array*__  
  
- fn - __*Function*__, if null will use this  
- name - __*String*__, if null will use __constructor  
> *return __Array__, all super constructor functions*  

##  
__getSupers2(*Function* fn, *String* name) : *Array*__  
  
- fn - __*Function*__, if null will use this  
- name - __*String*__, if null will use __constructor  
> *return __Array__, super constructor function or functions (if super is aggregate will use __constructor_list*  

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

---  
### MarkDown - JsonDox 1.02 - Zeta Ret Zetadmin Documentation Generator