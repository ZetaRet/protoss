> __Author: Zeta Ret, Ivo Yankulovski__  
> __Zeta Ret ProtoSS__  
# ProtoSS Class/Interface/Header Manager  
> *Requires: protoss.all.js*  
> *Version: 1.06*  
> *Date: 2017 - Today*  

__required*__

## ProtoSS  
> Interfaces: IProtoSS  

### *Properties*  

#  
__autoImplement__ Boolean  
default true, resolveHeaders automatically implements interfaces using static __headerImplement__  

#  
__autoSuper__ Boolean  
default true, resolveHeaders automatically adds setSuper using static __headerSuper__  

#  
__autoSuperList__ Boolean  
default true, resolveHeaders automatically adds superList using static __headerSuperList__  

#  
__autoSuperList2__ Boolean  
default true, resolveHeaders automatically adds superList2 using static __headerSuperList2__  

#  
__errorData__ Object  
default null, resolveHeaders outputs error data upon throwing an error  

#  
__debug__ Function  
default null, resolveHeaders calls debug("error", "resolveHeaders", o, o.errorData), where o=this  


##  
### *Methods*  

##  
__ProtoSS() : *void*__  
  
> *return __void__*  

##  
__toInterface(*Object* i, *Object* pack) : *Object*__  
  
- __i*__ - __*Object*__, key-value map of interface definitions  
- pack - __*Object*__, pack obj to *internal* the interface  
> *return __Object__, interface map*  

##  
__stringPattern(*String* pat, *String* str, *Number* pos) : *Array*__  
  
- __pat*__ - __*String*__, pattern to search in str string  
- __str*__ - __*String*__, string to search in for patterns  
- pos - __*Number*__, initial position to start the search  
> *return __Array__, 0 - number of patterns found; 1 - str without found patterns*  

##  
__getSuperCls(*String* sname, *Object* toppack, *String* path) : *Function*__  
  
- __sname*__ - __*String*__, super name split in pipes | to allow multiple super check  
- __toppack*__ - __*Object*__, package object to search in  
- path - __*String*__, path used to append to found patterns of parent search /  
> *return __Function__, first found reading left to right*  

##  
__resolveCls(*Object* s, *Object* toppack, *String* path) : *ProtoSS*__  
  
- __s*__ - __*Object*__, map of string classes to convert using *getSuperCls*  
- toppack - __*Object*__, pass var to *getSuperCls*  
- path - __*String*__, pass var to *getSuperCls*  
> *return __ProtoSS__, current scope object*  

##  
__resolveHeaders(*Object* toppack, *String* path) : *ProtoSS*__  
  
- toppack - __*Object*__, pass var to *getSuperCls*  
- path - __*String*__, pass var to *getSuperCls*  
> *return __ProtoSS__, current scope object, resolves all headers from static properties*  

##  
### *Static Properties*  

#  
__headerImplement__ Array  
default [], define *implement* inheritance using an [ProtoSS Class|classsupername string, super in strings/class] template  

#  
__headerSuper__ Array  
default [], define *setSuper* inheritance using an [ProtoSS Class|classsupername string, super in strings/class] template  

#  
__headerSuperList__ Array  
default [], define *superList* inheritance using an [ProtoSS Clas|classsupername strings, Array of supers in strings/class] template  

#  
__headerSuperList2__ Array  
default [], define *superList2* inheritance using an [ProtoSS Class|classsupername string, Array of supers in strings/class] template  

#  
__stringmap__ Object  
default {}, add dynamic string key-value pairs  

##  
### *Static Methods*  

##  
__eventProps(*Object* event, *Array* props) : *Object*__  
  
- __event*__ - __*Object*__, function object  
- __props*__ - __*Array*__, string properties  
> *return __Object__, event, props attached as uppercase keys including _CHANGE property*  

##  
__staticProps(*Object* stat, *Object* props) : *Object*__  
  
- __stat*__ - __*Object*__, function object  
- __props*__ - __*Object*__, key-value pairs attached to stat object  
> *return __Object__, stat, props attached as is*  

##  
__getDefinitionByName(*String* sname, *Object* toppack) : *Function*__  
  
- __sname*__ - __*String*__, class super name  
- toppack - __*Object*__, default is window  
> *return __Function__*  

---  
### MarkDown - JsonDox 1.02 - Zeta Ret Zetadmin Documentation Generator