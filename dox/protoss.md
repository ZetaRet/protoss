__required*__

#  
__*rndstr(int length) : String*__  
- __length*__ - (l) integer, generates random string with length of characters  
>*return random string as String*  

#  
__*super(function_arguments|Array arguments, Array|Boolean call_arguments, String name) : Object*__  
- __arguments*__ - (args) function arguments object if supported, or manually created Array [] with assigned "callee" reference to the function class object  
- __call_arguments*__ - (cargs) Array used to call "apply" of the super constructor function, Boolean true will use arguments as call arguments (cargs=args)  
- name - String used to define the name of the constructor in the prototype, default __constructor  
>*return constructor function result*  

#  
__*superize(function_arguments|Array args, Object map, Boolean setname, Boolean setown, Boolean defname) : Object*__  
- __arguments*__ - (args) function arguments object if supported, or manually created Array [] with assigned "callee" reference to the function class object  
- map - Object, if null will use "this" object to enumerate all assigned functions, used for member methods, functions in map will be assigned to "this"  
- setname - Boolean, changes name of iterated function according to key, function.aname  
- setown - Boolean, adds constructor name to function name, requires setname, i.e. "myfunction#myclass", function.oname  
- defname - Boolean, adds setname and setown to function.name property  
>*return Object, with all functions assigned to this function class in particular*  

#  
__*setSuper(Function superfn, Function fn, String name) : Function*__  
- __superfn*__ - Function, the super function of fn or this  
- fn - Function, if null will use this function, fn extends superfn in effect, fn is subclass of superfn  
- name - String, if null will use default __constructor  
>*return Function, superfn will be returned for chain calls*  

#  
__*setSubclass(Function fn, Function superfn, String name) : Function*__  
- __fn*__ - Function, fn extends superfn in effect, fn is subclass of superfn  
- superfn - Function, if null will use this function, the super function of fn  
- name - String, if null will use default __constructor  
>*return Function, superfn will be returned for chain calls*  

#  
__*callSuper(String name, Array args, String cname) : Object*__  
- __name*__ - String, name of super function  
- args - Array, array of arguments to apply  
- cname - String, constructor name, if null will use __constructor  
>*return Object, result of next super function different than this[name] function*  

#  
__*callSuper2(String name, Array args, String cname) : Object*__  
- __name*__ - String, name of super function  
- args - Array, array of arguments to apply  
- cname - String, constructor name, if null will use __constructor  
>*return Object, result of super function, may call the same function object as this[name] function*  

#  
__*getNextSuper(String name, String cname) : Function*__  
- __name*__ - String, search super function by name in super map created by superize  
- cname - String, constructor name, if null will use __constructor  
>*return Function, next function in super maps after calling getSupers()*  

#  
__*getSuper() : Object*__  
>*return Object, super object map of next super class as it was created by superize*  

#  
__*getThis() : Object*__  
>*return Object, super object map of this object as it was created by superize*  

#  
__*callProto(Function proto, String name, Array args) : Object*__  
- __proto*__ - Function, prototype constructor function of any of the supers, it will use super object map by proto.name  
- __name*__ - String, name of the function to call on the super object map  
- args - Array, array of arguments to apply  
>*return Object, result of the super prototype function as it is defined in its function scope*  

#  
__*callProto2(Object proto, String name, Array args) : Object*__  
- __proto*__ - Object, super object map obtained from the same object, may simulate by using an Object with assigned "constructor" from the supers  
- __name*__ - String, name of the function to call on the super object map  
- args - Array, array of arguments to apply  
>*return Object, result of the super prototype function as it is defined in its function scope*  

#  
__*superList(Array list, Function fn, String name, Boolean defname) : Function*__  
- __list*__ - Array, list of constructor functions used as supers  
- fn - Function, if null will use this, fn extends aggregate function which calls the list with constructors, the aggregate function uses __constructor_list instead of __constructor  
- name - String, name of constructor, if null will use __constructor  
- defname - Boolean, adds function.name property, aname is always added now  
>*return Function, fn for chain calls*  

#  
__*getSupers(Function fn, String name) : Array*__  
- fn - Function, if null will use this  
- name - String, if null will use __constructor  
>*return Array, of all super constructor functions, allows caching inside function object*  

#  
__*getSupers2(Function fn, String name) : Array*__  
- fn - Function, if null will use this  
- name - String, if null will use __constructor  
>*return Array, of super constructor function or functions (if super is aggregate will use __constructor_list)*  

#  
__*hasSuper(Function sfn, Function fn, String name) : Boolean*__  
- __sfn*__ - Function, super function to check against  
- fn - Function, if null will use this, to obtain all supers  
- name - String, if null will use __constructor  
>*return Boolean, true - if it exists in the inheritance tree, otherwise false*  

#  
__*is(Function sfn, Function fn, String name) : Boolean*__  
- __sfn*__ - Function, super function to check against  
- fn - Function, if null will use this, to obtain all supers  
- name - String, if null will use __constructor  
>*return Boolean, true - if it exists in the inheritance tree or equals this constructor, otherwise false*  
