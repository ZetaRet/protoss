> __Author: Zeta Ret__  
> __Zeta Ret SkytoSS__  
# SkytoSS Accelerator, ProtoSS GPU Acceleration and Web Workers  
> *Requires: protoss.all.js*  
> *Version: 1.7.0*  
> *Date: 2018 - Today*  

__required*__

## SkytoSS  
> Interfaces: ISkytoSS  

### *Properties*  

#  
__skytossName__ String  
default 'skytoss', name identifier of SkytoSS instance  

#  
__mainPrefix__ String  
default 'RTYPE FNAME(ARGS){', prefix template of main function  

#  
__propDefault__ String  
default comment, function properties string template in the event of no properties applied  

#  
__mainDefault__ String  
default comment, main function body template in the event of no source  

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
default ['webgl2', 'webgl', 'experimental-webgl'], GL get context types  

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
__SkytoSS() : *void*__  
  
> *return __void__*  

##  
__getTemplate(*String* id) : *Function*__  
  
- __id*__ - __*String*__, id of template in the map  
> *return __Function__, template function handler*  

##  
__setTemplate(*String* id, *Function* handler) : *SkytoSS*__  
  
- __id*__ - __*String*__, id of template handler in the map  
- __handler*__ - __*Function*__, function mapped to template id  
> *return __SkytoSS__, self*  

##  
__iterateTemplate(*String* s1, *String* s2, *String* s3, *String* expression) : *String*__  
  
- __s1*__ - __*String*__, statement 1 of the for iterator, initialization  
- __s2*__ - __*String*__, statement 2 of the for iterator, precondition  
- __s3*__ - __*String*__, statement 3 of the for iterator, counter  
- __expression*__ - __*String*__, iterator expression source, loop body  
> *return __String__, for iterator source template*  

##  
__ifElseTemplate(*Array* conditions, *String* elsebody) : *String*__  
  
- __conditions*__ - __*Array*__, array of [condition, body], 'if' on index 0, 'else if' for any consequential index  
- elsebody - __*String*__, 'else' body  
> *return __String__, [if, else if, else] source template*  

##  
__argsTemplate(*Array* args) : *String*__  
  
- __args*__ - __*Array*__, array of strings in 2 templates, [1] 'Type key' or [2] 'key'  
> *return __String__, map of key type*  

##  
__functionTemplate(*String* name, *String* returnType, *Array* args, *Object* props, *String|Array* main, *String* prefix, *String* suffix) : *String*__  
  
- name - __*String*__, name of function or 'main'  
- returnType - __*String*__, type of return or 'void'  
- args - __*Array*__, array of arguments  
- props - __*Object*__, map of properties  
- main - __*String|Array*__, body source  
- prefix - __*String*__, prefix function source or 'mainPrefix'  
- suffix - __*String*__, suffix function source or 'mainSuffix'  
> *return __String__, function with arguments, return type and body source template*  

##  
__setExpressionMap(*Function* type, *Function* handler) : *SkytoSS*__  
  
- __type*__ - __*Function*__, constructor function to evaluate value by type  
- __handler*__ - __*Function*__, type function handler by value  
> *return __SkytoSS__, self*  

##  
__evalExpression(*Object* exp) : *Object*__  
  
- __exp*__ - __*Object*__, expression to evaluate using 'expressionMap'  
> *return __Object__, type evaluation by map or exp*  

##  
__sourceTemplate(*Object* attr, *Object* mprops, *String|Array* main, *Object* functions, *String|Array* prepend, *String|Array* append) : *String*__  
  
- attr - __*Object*__, map of attributes  
- mprops - __*Object*__, map of properties  
- main - __*String|Array*__, main body source  
- functions - __*Object*__, map of functions  
- prepend - __*String|Array*__, prepend source to final output  
- append - __*String|Array*__, append source to final output  
> *return __String__, gpu source program*  

##  
__seedTemplate(*Number* seed) : *Object*__  
  
- seed - __*Number*__, initial seed or 0  
> *return __Object__, randomizer seed object*  

##  
__lineWrapper(*Array* line, *Boolean* noreturn, *Object* props) : *String*__  
  
- __line*__ - __*Array*__, array of source lines  
- noreturn - __*Boolean*__, mark last line as return  
- props - __*Object*__, replace properties in line string by key value  
> *return __String__, source of lines*  

##  
__gpuWrapRandomizer(*Object* seeder) : *Object*__  
  
- __seeder*__ - __*Object*__, randomizer seed object  
> *return __Object__, GPU wrapper object {attr, code, main}*  

##  
__gpuShader(*WebGLRenderingContext* gpu, *String* source, *Number* type) : *WebGLShader*__  
  
- __gpu*__ - __*WebGLRenderingContext*__, compile shader source in context  
- __source*__ - __*String*__, shader source code in GL format  
- __type*__ - __*Number*__, vertex or fragment  
> *return __WebGLShader__, compiled shader in context in case of no error*  

##  
__gpuBuffer(*WebGLRenderingContext* gpu, *Array* bufferdata, *Number* target, *ArrayBufferView* type, *Number* usage) : *WebGLBuffer*__  
  
- __gpu*__ - __*WebGLRenderingContext*__, create and bind buffer in context  
- __bufferdata*__ - __*Array*__, data of the buffer  
- target - __*Number*__, target of the buffer [array, elements, etc.]  
- type - __*ArrayBufferView*__, type of buffer data, default Float32Array  
- usage - __*Number*__, usage of the buffer in context  
> *return __WebGLBuffer__, configured context buffer*  

##  
__gpuPreProgrammer(*WebGLRenderingContext* gpu, *Object* gpuData, *String* id, *Object* settings, *Object* bufferData) : *void*__  
  
- __gpu*__ - __*WebGLRenderingContext*__,   
- __gpuData*__ - __*Object*__,   
- __id*__ - __*String*__,   
- __settings*__ - __*Object*__,   
- __bufferData*__ - __*Object*__,   
> *return __void__*  

##  
__gpuProgrammer(*WebGLRenderingContext* gpu, *Object* gpuData, *String* id, *Object* settings) : *void*__  
  
- __gpu*__ - __*WebGLRenderingContext*__,   
- __gpuData*__ - __*Object*__,   
- __id*__ - __*String*__,   
- __settings*__ - __*Object*__,   
> *return __void__*  

##  
__newGPU(*String* sourcev, *String* sourcef, *String* id, *Object* options, *Number* width, *Number* height) : *String*__  
  
- __sourcev*__ - __*String*__, vertex shader GL source  
- __sourcef*__ - __*String*__, fragment shader GL source  
- id - __*String*__, id of the gpu in gpuIds  
- options - __*Object*__, options of the context instance  
- width - __*Number*__, width of context or 0xff  
- height - __*Number*__, height of context or 0xff  
> *return __String__, id of gpu in gpuIds*  

##  
__addGPU(*WebGLRenderingContext* gpu, *String* sourcev, *String* sourcef, *String* id) : *String*__  
  
- __gpu*__ - __*WebGLRenderingContext*__, link program to context  
- __sourcev*__ - __*String*__, create vertex shader from GL source  
- __sourcef*__ - __*String*__, create fragment shader from GL source  
- id - __*String*__, id of gpu in gpuIds or auto generated  
> *return __String__, id of gpu in gpuIds*  

##  
__getGPU(*String* id) : *Object*__  
  
- __id*__ - __*String*__, id in gpuIds  
> *return __Object__, gpu data with shaders, buffer, program*  

##  
__useGPU(*String* id, *Function* handler, *Object* settings, *Object* bufferData, *ArrayBufferView* readBufferType, *Function* glPreProgrammer, *Function* glProgrammer, *Function* glClear) : *Boolean*__  
  
- __id*__ - __*String*__, id of gpu in gpuIds  
- handler - __*Function*__, function resolver of context pixel output  
- settings - __*Object*__, settings used in this drawing and programming of context  
- bufferData - __*Object*__, buffers used in this drawing  
- readBufferType - __*ArrayBufferView*__, read pixels of context, default Uint8Array  
- glPreProgrammer - __*Function*__, gpu function to preprogram the context, buffers and attributes, or autoDrawGPU  
- glProgrammer - __*Function*__, gpu function to program the context, uniforms and draw, or autoDrawGPU  
- glClear - __*Function*__, clear function (gpu, gpuData, id, settings) or autoDrawGPU  
> *return __Boolean__, gpu data status*  

##  
__clearGPUBuffer(*String* id) : *Boolean*__  
  
- __id*__ - __*String*__, id of gpu in gpuIds  
> *return __Boolean__, gpu data buffer status*  

##  
__deleteGPU(*String* id) : *Boolean*__  
  
- __id*__ - __*String*__, id of gpu in gpuIds  
> *return __Boolean__, gpu data status*  

##  
__gpuProperty(*String* value, *String* type) : *Object*__  
  
- __value*__ - __*String*__,   
- type - __*String*__,   
> *return __Object__, property object*  

##  
__gpuAttribute(*String* type, *String* value, *String* attrname, *Boolean* noattrname, *Object* loc) : *Object*__  
  
- __type*__ - __*String*__,   
- value - __*String*__,   
- attrname - __*String*__,   
- noattrname - __*Boolean*__,   
- loc - __*Object*__,   
> *return __Object__, attribute object*  

##  
__gpuFunction(*String* rtype, *Array* args, *Object* props, *String|Array* main, *String* prefix, *String* suffix) : *Object*__  
  
- rtype - __*String*__,   
- args - __*Array*__,   
- props - __*Object*__,   
- main - __*String|Array*__,   
- prefix - __*String*__,   
- suffix - __*String*__,   
> *return __Object__, function template object*  

##  
__gpuUniform(*String* value, *Boolean* int) : *Object*__  
  
- __value*__ - __*String*__,   
- int - __*Boolean*__,   
> *return __Object__, uniform object*  

##  
__gpuUniformMatrix(*String* value, *Number* num, *Boolean* transpose) : *Object*__  
  
- __value*__ - __*String*__,   
- __num*__ - __*Number*__,   
- transpose - __*Boolean*__,   
> *return __Object__, uniform matrix object*  

##  
__gpuBufferData(*Array* data, *Number* size, *Number* target, *ArrayBufferView* type, *Number* usage, *Number* dataType, *ArrayBufferView* vector, *WebGLBuffer* buffer, *Boolean* noloc, *Object* loc, *Boolean* normalized, *Number* stride, *Number* offset) : *Object*__  
  
- __data*__ - __*Array*__,   
- __size*__ - __*Number*__,   
- target - __*Number*__,   
- type - __*ArrayBufferView*__,   
- usage - __*Number*__,   
- dataType - __*Number*__,   
- vector - __*ArrayBufferView*__,   
- buffer - __*WebGLBuffer*__,   
- noloc - __*Boolean*__,   
- loc - __*Object*__,   
- normalized - __*Boolean*__,   
- stride - __*Number*__,   
- offset - __*Number*__,   
> *return __Object__, buffer data object*  

##  
__gpuSettings(*Object* uniform, *Function* drawMethod, *Array* drawArgs, *Number* drawCount, *Number* bufferCellSize, *Number* readFormat, *Number* readType) : *Object*__  
  
- uniform - __*Object*__,   
- drawMethod - __*Function*__,   
- drawArgs - __*Array*__,   
- drawCount - __*Number*__,   
- bufferCellSize - __*Number*__,   
- readFormat - __*Number*__,   
- readType - __*Number*__,   
> *return __Object__, gpu settings object*  

##  
__newWorker(*String* src, *String* id, *String* type, *Object* options, *Boolean* srcurl) : *String*__  
  
- __src*__ - __*String*__, JavaScript source code, url to .js file or Blob url  
- id - __*String*__, id of worker in the map or auto generated  
- type - __*String*__, type of worker [normal, shared]  
- options - __*Object*__, options of worker instance  
- srcurl - __*Boolean*__, use src as url  
> *return __String__, id of worker*  

##  
__getWorker(*String* id) : *Worker|SharedWorker*__  
  
- __id*__ - __*String*__, id of worker in workerIds  
> *return __Worker|SharedWorker__, worker from map 'workerIds'*  

##  
__commandWorker(*String* id, *String* command, *Object* data, *Array* transfer) : *Boolean*__  
  
- __id*__ - __*String*__, id of worker in workerIds  
- __command*__ - __*String*__, sent command  
- data - __*Object*__, command data [Object, Array]  
- transfer - __*Array*__, array of Transferable objects [ArrayBuffer, MessagePort, ImageBitmap]  
> *return __Boolean__, worker status*  

##  
__deleteWorker(*String* id) : *Boolean*__  
  
- __id*__ - __*String*__, select worker by id, and terminate externally by posting a message  
> *return __Boolean__, worker status*  

##  
### *Static Properties*  

#  
__TEMPLATES__ Object  
default init, object enumerating template string ids  

#  
__WORKERS__ Object  
default init, object enumerating worker string types  

#  
__\_\_InitSkytoSSPrototypes__ Boolean  
default false, flag state of InitSkytoSSPrototypes  

##  
### *Static Methods*  

##  
__InitSkytoSSPrototypes(*Boolean* override) : *SkytoSS*__  
  
- override - __*Boolean*__, mark SkytoSS Prototype for overriding, will reinstall prototypes in effect  
> *return __SkytoSS__, self SkytoSS class*  

##  
__const(*String* key, *Object* value) : *Object*__  
Object Prototype  
- __key*__ - __*String*__, key of constant  
- __value*__ - __*Object*__, value of constant  
> *return __Object__, argument value, dynamically defined constant to scope*  

##  
__constMap(*Object* value) : *Object*__  
Object Prototype  
- __value*__ - __*Object*__, map of key-value to create constants  
> *return __Object__, argument value, dynamically defined constants to scope*  

##  
__shell(*Array* keys) : *Object*__  
Object Prototype  
- __keys*__ - __*Array*__, keys to extract from scope  
> *return __Object__, object with key-types based on constructor of value from scope*  

##  
__ys(*Object* shell, *Object* dome) : *Boolean*__  
Object Prototype  
- __shell*__ - __*Object*__, object to test type interface in the dome  
- __dome*__ - __*Object*__, dome definition in package or scope  
> *return __Boolean__, shell keys must not be in dome holes, must be defined and value of the key must pass test of the type [constructor, instanceOf, ProtoSS.is]*  

##  
__skydome(*String* name, *String* id, *Object* shell, *Object* holes, *Object* scope) : *Object*__  
Object Prototype  
- __name*__ - __*String*__, name of created new package in scope  
- __id*__ - __*String*__, id of the SkyDome in the created package  
- shell - __*Object*__, shell with key-types to test interface  
- holes - __*Object*__, keys of the holes to forbid shell interface  
- scope - __*Object*__, scope to create package in or this  
> *return __Object__, SkyDome object definition {name, type, shell, holes}*  

##  
__deepsky(*RegExp* keyreg, *Number* depth, *Object* shell, *Object* scope, *Object* toppack) : *Array*__  
Object Prototype  
- __keyreg*__ - __*RegExp*__, keys of objects inside packaging system must pass test  
- depth - __*Number*__, depth to test packaging system  
- shell - __*Object*__, shell to test objects using SkytoSS.ys  
- scope - __*Object*__, object/package in packaging system or this  
- toppack - __*Object*__, top package or window  
> *return __Array__, found objects in the entire packaging system passing the test of keyreg and shell*  

