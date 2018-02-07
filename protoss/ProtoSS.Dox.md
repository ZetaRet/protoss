__Author: Zeta Ret, Ivo Yankulovski__  
__Zeta Ret ProtoSS__  
## ProtoSS Class/Interface/Header Manager  
*Requires: protoss.all.js v1.02c*  
*Version: 1.04c*  
*Date: 2017*  

__required*__

### ProtoSS  

*Properties*  

__autoImplement__ default true, resolveHeaders automatically implements interfaces using static __headerImplement__  
__autoSuper__ default true, resolveHeaders automatically adds setSuper using static __headerSuper__  
__autoSuperList__ default true, resolveHeaders automatically adds superList using static __headerSuperList__  
__autoSuperList2__ default true, resolveHeaders automatically adds superList2 using static __headerSuperList2__  
__errorData__ default null, resolveHeaders outputs error data upon throwing an error  
__debug__ default null, resolveHeaders calls debug("error", "resolveHeaders", o, o.errorData), where o=this  

*Methods*  

__*toInterface(Object i, Object pack) : Object*__  
__i*__ - Object, key-value map of interface definitions  
pack - Object, pack obj to *internal* the interface  
*return Object, interface map* 

__*stringPattern(String pat, String str, Number pos) : Array*__  
__pat*__ - String, pattern to search in str string  
__str*__ - String, string to search in for patterns  
pos - Number, initial position to start the search  
*return Array, 0 - number of patterns found; 1 - str without found patterns*

__*getSuperCls(String sname, Object toppack, String path) : Function*__  
__sname*__ - String, super name split in pipes | to allow multiple super check  
__toppack*__ - Object, package object to search in  
path - String, path used to append to found patterns of parent search /  
*return Function, *

__*resolveCls(Object s, Object toppack, String path) : ProtoSS*__  
__s*__ - Object, map of string classes to convert using *getSuperCls*  
toppack - Object, pass var to *getSuperCls*  
path - String, pass var to *getSuperCls*  
*return ProtoSS, current scope object*

__*resolveHeaders(Object toppack, String path) : ProtoSS*__  
toppack - Object, pass var to *getSuperCls*  
path - String, pass var to *getSuperCls*  
*return ProtoSS, current scope object, resolves all headers from static properties*


### Static  

*Properties*  

__*headerImplement*__ - __Array__, define *implement* inheritance using an [ProtoSS Class|classsupername string, super in strings/class] template   
__*headerSuper*__ - __Array__, define *setSuper* inheritance using an [ProtoSS Class|classsupername string, super in strings/class] template  
__*headerSuperList*__ - __Array__, define *superList* inheritance using an [ProtoSS Clas|classsupername strings, Array of supers in strings/class] template   
__*headerSuperList2*__ - __Array__, define *superList2* inheritance using an [ProtoSS Class|classsupername string, Array of supers in strings/class] template  
__*stringmap*__ - __Object__, add dynamic string key-value pairs  

*Methods*  

__*eventProps(Object event, Array props) : Object*__   
__event*__ - Object, function object  
__props*__ - Array, string properties  
*return event, props attached as uppercase keys including _CHANGE property*

__*staticProps(Object stat, Object props) : Object*__  
__stat*__ - Object, function object  
__props*__ - Object, key-value pairs attached to stat object  
*return stat, props attached as is*

__*getDefinitionByName(String sname, Object toppack) : Function*__  
__sname*__ - String, class super name  
toppack - Object, default is window  