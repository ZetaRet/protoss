[![Zeta Ret ProtoSS Logo](https://zetaret.com/images/protoss_logo_name.png)](https://protoss.zetaret.com/)  

## Zeta Ret ProtoSS Library - Prototype Supers-Subclass  

[![Zeta Ret ProtoSS Cover](https://zetaret.com/images/protoss_cover.jpg)](https://zetaret.com/projects/protoss/)  

## Summary  

Features on top of regular prototyping: super, superize, setSuper, setSubclass, getSupers, getSupers2, getReversedSupers, superList, superList2, getThis, getSuper, callSuper, callSuper2, callSuperX, callProto, callProto2, callProtoX, hasSuper, is, getNextSuper, getNextSuperX, abstract, implement, interface, final, statis, getSuperName, getSuperName2, namespace, usens, internal, package, rndstr

Minimized ProtoSS, ~1kb in gzip transfer  

## Documentation  
[protoss.all.js](https://github.com/ZetaRet/protoss/blob/master/dox/protoss.all.md)  
[Install and Repository](https://github.com/ZetaRet/protoss/blob/master/install.md)  
[ProtoSS Extension](https://github.com/ZetaRet/protoss/blob/master/protoss/ProtoSS.md)  
[XeltoSS Extension](https://github.com/ZetaRet/protoss/blob/master/xeltoss/XeltoSS.md)  
[SkytoSS Extension](https://github.com/ZetaRet/protoss/blob/master/skytoss/SkytoSS.md)  

## Atom IDE  
[![Zeta Ret ProtoSS Atom IDE](https://raw.githubusercontent.com/ZetaRet/atom.io-packages/master/images/atom-ide-protoss-bar-br.png)](https://atom.io/packages/ide-protoss)  
[ProtoSS package for Atom IDE](https://atom.io/packages/ide-protoss)  

## Demos  
Canvas Live Demo based on OOP ProtoSS in ES6 Class Standard [ProtoSS + XeltoSS]:  
[Zeta Ret Clockwork website](https://zetaret.com/projects/clockwork/)  
[Zeta Ret Clockwork demo](https://clockwork.zetaret.com/demo/)  

## Examples:  
- https://github.com/ZetaRet/protoss/tree/master/examples  

- Example with function overloads and 2 super classes. Usage of properties and methods.  
https://jsfiddle.net/zetaret/cj5yy4qu/  
- Game Example with Builders, Buildings, Upgrades, Units.  
https://jsfiddle.net/zetaret/asusm0uz/  
- Extended Prototypes framework with abstract, interface, implement, final.  
https://jsfiddle.net/zetaret/8h0ugxym/  
- Extended Prototypes framework with getSuperName, namespace, usens, internal, package.  
https://jsfiddle.net/zetaret/sw0j28qj/  

## Note  
Some JavaScript versions or JS servers do not support arguments, it must be recreated manually (or by your compiler/interpreter/texttemplate) in the beginning of the function as an array with the same behaviour including a reference to the class function in callee parameter.  

This library may be used directly for OOP in JavaScript, still, a cross-compiler/code analysis/texttemplate tool is required to take advantage of all features like real method overloading according to arguments length and type. Your interpreter tool must be able to detect types and arguments length before compilation of output js file in order to add the correct function call in the release code. Overloading is a purely syntactic way of using the same name for different semantic objects, the compiler can resolve the ambiguity at compile time, and then proceed as usual.  

[Polymorphism Source of Theory](http://lucacardelli.name/indexPapers.html)    

## Author  
[ProtoSS Website](https://protoss.zetaret.com/)  

[Zeta Ret](https://zetaret.com/)  
