> __Author: Zeta Ret, Ivo Yankulovski__  
> __Zeta Ret SkytoSS__  
# SkytoSS Accelerator, ProtoSS GPU Acceleration and Web Workers  
> *Requires: protoss.all.js v1.04b*  
> *Version: 1.05*  
> *Date: 2018 - Today*  

__required*__

## SkytoSS  

### *Properties*  

#  
__skytossName__ String  
default 'skytoss', name identifier of SkytoSS instance  
#  
__mainPrefix__ String  
default 'RTYPE FNAME(ARGS){', prefix template of main function  
#  
__propDefault__ String  
default '/\* No Properties \*/', function properties string template in the event of no properties applied  
#  
__mainDefault__ String  
default '/\* SkytoSS GPU Compiler \*/', main function body template in the event of no source  
#  
__mainSuffix__ String  
default '}', suffix template of main function  
#  
__joinLine__ String  
default '\n', line joiner string used in source array join statement  
#  
__attributeName__ String  
default 'attribute', default vertex shader property prefix  
#  
__workerIds__ Object  
default {}, map of Workers by id  
#  
__gpuIds__ Object  
default {}, map of GPU Data by id  
#  
__defaultWorkerType__ String  
default 'normal', Worker or SharedWorker based on type  
#  
__glContextIds__ Array  
default ['webgl2','webgl','experimental-webgl'], GL get context types  
#  
__expressionMap__ WeakMap  
default new, map of constructor types used in 'evalExpression'  
#  
__templates__ Object  
default {}, map of template function used in source print  
#  
__debugGPU__ Boolean  
default false, use console features on GPU activity  
#  
__gpuShaderLogHandler__ Function  
default null, output shader log status  
#  
__autoDrawGPU__ Boolean  
default false, activate auto GPU functionality in 'useGPU'  
#  
__graviton__ Object  
default {}, accelerator meta data by custom id, used in buffers/particles/randomizer  
#  
__definitions__ Object  
default {}, definitions by id used in workers, ProtoSS synthesis instructions  

##  
### *Methods*  
##  

__getTemplate(*String* id) : *Function*__  
- id - __String*__, id of template in the map  
> *return __Function__, template function handler*  

##  
__setTemplate(*String* id, *Function* handler) : *SkytoSS*__  
- id - __String*__, id of template handler in the map  
- handler - __Function*__, function mapped to template id  
> *return __SkytoSS__, self*  

##  
__iterateTemplate(*String* s1, *String* s2, *String* s3, *String* expression) : *String*__  
- s1 - __String*__, statement 1 of the for iterator, initialization  
- s2 - __String*__, statement 2 of the for iterator, precondition  
- s3 - __String*__, statement 3 of the for iterator, counter  
- expression - __String*__, iterator expression source, loop body  
> *return __String__, for iterator source template*  

##  
__ifElseTemplate(*Array* conditions, *String* elsebody) : *String*__  
- conditions - __Array*__, array of [condition, body], 'if' on index 0, 'else if' for any consequential index  
- elsebody - __String__, 'else' body  
> *return __String__, [if, else if, else] source template*  

##  
__argsTemplate(*Array* args) : *String*__  
- args - __Array*__, array of strings in 2 templates, [1] 'Type key' or [2] 'key'  
> *return __Object__, map of key type*  

##  
__functionTemplate(*String* name, *String* returnType, *Array* args, *Object* props, *String|Array* main, *String* prefix, *String* suffix) : *String*__  
- name - __String__, name of function or 'main'  
- returnType - __String__, type of return or 'void'  
- args - __Array__, array of arguments  
- props - __Object__, map of properties  
- main - __String|Array__, body source  
- prefix - __String__, prefix function source or 'mainPrefix'  
- suffix - __String__, suffix function source or 'mainSuffix'  
> *return __String__, function with arguments, return type and body source template*  

##  
__setExpressionMap(*Function* type, *Function* handler) : *SkytoSS*__  
- type - __Function*__, constructor function to evaluate value by type  
- handler - __Function*__, type function handler by value  
> *return __SkytoSS__, self*  

##  
__evalExpression(*Object* exp) : *Object*__  
- exp - __Object*__, expression to evaluate using 'expressionMap'  
> *return __Object__, type evaluation by map or exp*  

##  
__sourceTemplate(*Object* attr, *Object* mprops, *String|Array* main, *Object* functions, *String|Array* prepend, *String|Array* append) : *String*__  
- attr - __Object__, map of attributes  
- mprops - __Object__, map of properties  
- main - __String|Array__, main body source  
- functions - __Object__, map of functions  
- prepend - __String|Array__, prepend source to final output  
- append - __String|Array__, append source to final output  
> *return __String__, gpu source program*  

##  
__seedTemplate(*Number* seed) : *Object*__  
- seed - __Number__, initial seed or 0  
> *return __Object__, randomizer seed object*  

##  
__lineWrapper(*Array* line, *Boolean* noreturn, *Object* props) : *String*__  
- line - __Array*__, array of source lines  
- noreturn - __Boolean__, mark last line as return  
- props - __Object__, replace properties in line string by key value  
> *return __String__, source of lines*  

##  
__gpuWrapRandomizer(*Object* seeder) : *Object*__  
- seeder - __Object*__, randomizer seed object  
> *return __Object__, GPU wrapper object {attr, code, main}*  

##  
__gpuShader(*WebGLRenderingContext* gpu, *String* source, *Number* type) : *WebGLShader*__  
- gpu - __WebGLRenderingContext*__, compile shader source in context  
- source - __String*__, shader source code in GL format  
- type - __Number*__, vertex or fragment  
> *return __WebGLShader__, compiled shader in context in case of no error*  

##  
__gpuBuffer(*WebGLRenderingContext* gpu, *Array* bufferdata, *Number* target, *ArrayBufferView* type, *Number* usage) : *WebGLBuffer*__  
- gpu - __WebGLRenderingContext*__, create and bind buffer in context  
- bufferdata - __Array*__, data of the buffer  
- target - __Number__, target of the buffer [array, elements, etc.]  
- type - __ArrayBufferView__, type of buffer data, default Float32Array  
- usage - __Number__, usage of the buffer in context  
> *return __WebGLBuffer__, configured context buffer*  

##  
__gpuPreProgrammer(*WebGLRenderingContext* gpu, *Object* gpuData, *String* id, *Object* settings, *Object* bufferData) : *void*__  
- gpu - __WebGLRenderingContext*__   
- gpuData - __Object*__   
- id - __String*__   
- settings - __Object*__   
- bufferData - __Object*__   
> *return __void__*  

##  
__gpuProgrammer(*WebGLRenderingContext* gpu, *Object* gpuData, *String* id, *Object* settings) : *void*__  
- gpu - __WebGLRenderingContext*__   
- gpuData - __Object*__   
- id - __String*__   
- settings - __Object*__   
> *return __void__*  

##  
__newGPU(*String* sourcev, *String* sourcef, *String* id, *Object* options, *Number* width, *Number* height) : *String*__  
- sourcev - __String*__, vertex shader GL source  
- sourcef - __String*__, fragment shader GL source  
- id - __String__, id of the gpu in gpuIds  
- options - __Object__, options of the context instance  
- width - __Number__, width of context or 0xff  
- height - __Number__, height of context or 0xff  
> *return __String__, id of gpu in gpuIds*  

##  
__addGPU(*WebGLRenderingContext* gpu, *String* sourcev, *String* sourcef, *String* id) : *String*__  
- gpu - __WebGLRenderingContext*__, link program to context  
- sourcev - __String*__, create vertex shader from GL source  
- sourcef - __String*__, create fragment shader from GL source  
- id - __String__, id of gpu in gpuIds or auto generated  
> *return __String__, id of gpu in gpuIds*  

##  
__getGPU(*String* id) : *Object*__  
- id - __String*__, id in gpuIds  
> *return __Object__, gpu data with shaders, buffer, program*  

##  
__useGPU(*String* id, *Function* handler, *Object* settings, *Object* bufferData, *ArrayBufferView* readBufferType, *Function* glPreProgrammer, *Function* glProgrammer, *Function* glClear) : *Boolean*__  
- id - __String*__, id of gpu in gpuIds  
- handler - __Function__, function resolver of context pixel output  
- settings - __Object__, settings used in this drawing and programming of context  
- bufferData - __Object__, buffers used in this drawing  
- readBufferType - __ArrayBufferView__, read pixels of context, default Uint8Array  
- glPreProgrammer - __Function__, gpu function to preprogram the context, buffers and attributes, or autoDrawGPU  
- glProgrammer - __Function__, gpu function to program the context, uniforms and draw, or autoDrawGPU  
- glClear - __Function__, clear function (gpu, gpuData, id, settings) or autoDrawGPU  
> *return __Boolean__*  

##  
__clearGPUBuffer(*String* id) : *Boolean*__  
- id - __String*__, id of gpu in gpuIds  
> *return __Boolean__*  

##  
__deleteGPU(*String* id) : *Boolean*__  
- id - __String*__, id of gpu in gpuIds  
> *return __Boolean__*  

##  
__gpuProperty(*String* value, *String* type) : *Object*__  
- value - __String*__   
- type - __String__   
> *return __Object__, property object*  

##  
__gpuAttribute(*String* type, *String* value, *String* attrname, *Boolean* noattrname, *Object* loc) : *Object*__  
- type - __String*__   
- value - __String__   
- attrname - __String__   
- noattrname - __Boolean__   
- loc - __Object__   
> *return __Object__, attribute object*  

##  
__gpuFunction(*String* rtype, *Array* args, *Object* props, *String|Array* main, *String* prefix, *String* suffix) : *Object*__  
- rtype - __String__   
- args - __Array__   
- props - __Object__   
- main - __String|Array__   
- prefix - __String__   
- suffix - __String__   
> *return __Object__, function template object*  

##  
__gpuUniform(*String* value, *Boolean* int) : *Object*__  
- value - __String*__   
- int - __Boolean__   
> *return __Object__, uniform object*  

##  
__gpuUniformMatrix(*String* value, *Number* num, *Boolean* transpose) : *Object*__  
- value - __String*__   
- num - __Number*__   
- transpose - __Boolean__   
> *return __Object__, uniform matrix object*  

##  
__gpuBufferData(*Array* data, *Number* size, *Number* target, *ArrayBufferView* type, *Number* usage,  *Number* dataType, *ArrayBufferView* vector, *WebGLBuffer* buffer, *Boolean* noloc, *Object* loc, *Boolean* normalized, *Number* stride, *Number* offset) : *Object*__  
- data - __Array*__   
- size - __Number*__   
- target - __Number__   
- type - __ArrayBufferView__   
- usage - __Number__   
- dataType - __Number__   
- vector - __ArrayBufferView__   
- buffer - __WebGLBuffer__   
- noloc - __Boolean__   
- loc - __Object__   
- normalized - __Boolean__   
- stride - __Number__   
- offset - __Number__   
> *return __Object__, buffer data object*  

##  
__gpuSettings(*Object* uniform, *Function* drawMethod, *Array* drawArgs, *Number* drawCount, *Number* bufferCellSize, *Number* readFormat, *Number* readType) : *Object*__  
- uniform - __Object__   
- drawMethod - __Function__   
- drawArgs - __Array__   
- drawCount - __Number__   
- bufferCellSize - __Number__   
- readFormat - __Number__   
- readType - __Number__   
> *return __Object__, gpu settings object*  

##  
__newWorker(*String* src, *String* id, *String* type, *Object* options, *Boolean* srcurl) : *String*__  
- src - __String*__, JavaScript source code, url to .js file or Blob url  
- id - __String__, id of worker in the map or auto generated  
- type - __String__, type of worker [normal, shared]  
- options - __Object__, options of worker instance  
- srcurl - __Boolean__, use src as url  
> *return __String__, id of worker*  

##  
__getWorker(*String* id) : *Worker|SharedWorker*__  
- id - __String*__, id of worker in workerIds  
> *return __Worker|SharedWorker__, worker from map 'workerIds'*  

##  
__commandWorker(*String* id, *String* command, *Object* data, *Array* transfer) : *Boolean*__  
- id - __String*__, id of worker in workerIds  
- command - __String*__, sent command  
- data - __Object__, command data [Object, Array]  
- transfer - __Array__, array of Transferable objects [ArrayBuffer, MessagePort, ImageBitmap]  
> *return __Boolean__*  

##  
__deleteWorker(*String* id) : *Boolean*__  
- id - __String*__, select worker by id, and terminate externally by posting a message  
> *return __Boolean__*  

## Static  

### *Properties*  
##  

**TEMPLATES** Object  
object enumerating template string ids  
#  
**WORKERS** Object  
object enumerating worker string types  
#  
**__InitSkytoSSPrototypes** Boolean  
default false, flag state of InitSkytoSSPrototypes  

##  
### *Methods*  
##  

__InitSkytoSSPrototypes(*Boolean* override) : *SkytoSS*__  
- override - __Boolean*__, mark SkytoSS Prototype for overriding, will reinstall prototypes in effect  
> *return __Function__, self SkytoSS class*  

##  
### *Object Prototype*  
##  

__const(*String* key, *Object* value) : *Object*__  
- key - __String*__ - key of constant  
- value - __value*__ - value of constant  
> *return __Object__, argument value, dynamically defined constant to scope*  

##  
__constMap(*Object* value) : *Object*__  
- value - __Object*__, map of key-value to create constants  
> *return __Object__, argument value, dynamically defined constants to scope*  

##  
__shell(*Array* keys) : *Object*__  
- keys - __Array*__, keys to extract from scope  
> *return __Object__, object with key-types based on constructor of value from scope*  

##  
__ys(*Object* shell, *Object* dome) : *Boolean*__  
- shell - __Object*__, object to test type interface in the dome  
- dome - __Object*__, dome definition in package or scope  
> *return __Boolean__, shell keys must not be in dome holes, must be defined and value of the key must pass test of the type [constructor, instanceOf, ProtoSS.is]*  

##  
__skydome(*String* name, *String* id, *Object* shell, *Object* holes, *Object* scope) : *Object*__  
- name - __String*__, name of created new package in scope  
- id - __String*__, id of the SkyDome in the created package  
- shell - __Object__, shell with key-types to test interface  
- holes - __Object__, keys of the holes to forbid shell interface  
- scope - __Object__, scope to create package in or this  
> *return __Object__, SkyDome object definition {name, type, shell, holes}*  

##  
__deepsky(*RegExp* keyreg, *Number* depth, *Object* shell, *Object* scope, *Object* toppack) : *Array*__  
- keyreg - __RegExp*__, keys of objects inside packaging system must pass test  
- depth - __Number__, depth to test packaging system  
- shell - __Object__, shell to test objects using SkytoSS.ys  
- scope - __Object__, object/package in packaging system or this  
- toppack - __Object__, top package or window  
> *return __Array__, found objects in the entire packaging system passing the test of keyreg and shell*  
