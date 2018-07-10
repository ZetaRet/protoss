# protoss
:alien: Zeta Ret ProtoSS Library - Prototype Supers-Subclass

[![Zeta Ret ProtoSS Logo](https://zetaret.com/images/protoss_logo_name.png)](https://protoss.xyz/)

# ProtoSS
## Zeta Ret ProtoSS Library - Prototype Supers-Subclass

[![Zeta Ret ProtoSS Cover](https://zetaret.com/images/protoss_cover.jpg)](https://zetaret.com/projects/protoss/)

Canvas Live Demo based on OOP ProtoSS in ES6 Class Standard [ProtoSS + XeltoSS]:  
Zeta Ret Clockwork website: https://zetaret.com/projects/clockwork/  
Zeta Ret Clockwork demo: http://clockwork.lovesvn.com/demo/  

Tern.js-compliant Prototypes Framework with Polymorphism

This library leverages the use of Tern.js server in Eclipse allowing the developer to view inheritances in the outline. In addition adds several features on top of regular prototyping:

allows super() calls safely from any instance of the inheritance tree  
setSuper() adds quickly new super/parent function class, supports chain calls  
setSubclass() adds quickly new subclass/child function class, supports chain calls  
getSupers() returns list of all super class functions  
getSupers2() returns list of the first meaningful super class function in the list, respectively constructor lists of more than one super class  
superList() adds several functions to the super tree (extend more than one class), it creates a dummy class in between to manage multiple constructors  
getThis() returns the constructor map of the current object, without any methods from super classes  
getSuper() returns the constructor map of the super object, without any methods from upper supers or current object  
callSuper() executes function call on super method map, use for overloaded functions, searches for next super function in the inheritance tree  
callSuper2() executes function call on super method map, use for overloaded functions, may call the same function  
callProto() executes function call on any of the subclass/supers inheritance tree object maps, uses function object as input  
callProto2() executes function call on any of the subclass/supers inheritance tree object maps, uses class object map as input  
superize() generates function class object map, saves methods and adds names to anonymous prototype functions, may add class name to the function for better identification  
hasSuper() checks whether this object/class inherits another class  
is() checks whether this object/class inherits or equals another class  
getNextSuper() returns next super function different than this.function  
rndstr() generates random string, used for dummy function name  

Minimized ProtoSS, ~1kb in gzip transfer

Examples included:  
a) Example with function overloads and 2 super classes. Usage of properties and methods.  
https://jsfiddle.net/zetaret/cj5yy4qu/  
b) Game Example with Builders, Buildings, Upgrades, Units.  
https://jsfiddle.net/zetaret/asusm0uz/  
c) Extended Prototypes framework with abstract, interface, implement, final.  
https://jsfiddle.net/zetaret/8h0ugxym/  
d) Extended Prototypes framework with getSuperName, namespace, usens, internal, package.  
https://jsfiddle.net/zetaret/sw0j28qj/  

Some JavaScript versions or JS servers do not support arguments, it must be recreated manually (or by your compiler/interpreter/texttemplate) in the beginning of the function as an array with the same behaviour including a reference to the class function in callee parameter.

Note: This library may be used directly for OOP in JavaScript, still, a cross-compiler/code analysis/texttemplate tool is required to take advantage of all features like real method overloading according to arguments length and type. Your interpreter tool must be able to detect types and arguments length before compilation of output js file in order to add the correct function call in the release code. Overloading is a purely syntactic way of using the same name for different semantic objects, the compiler can resolve the ambiguity at compile time, and then proceed as usual.

ProtoSS Website: https://protoss.xyz/  
Author: Zeta Ret, Ivo Yankulovski, 2017 https://zetaret.com/

---
![ProtoSS Splash](http://moheban-ahlebeit.com/images/Protoss-Wallpaper/Protoss-Wallpaper-23.jpg)
