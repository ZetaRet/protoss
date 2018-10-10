# Files  
__ProtoSS__ base is loaded and initiated using "new ZetaRet_Prototypes()". There are several bases you might choose to use:  
__protoss.all.js__  - All ProtoSS functionality, no minimization applied, instance is generated immediately, __recommended__ use  
__protoss.js__  - Standard ProtoSS functionality, no minimization applied, no instance  
__protoss.min.js__  - Standard ProtoSS functionality, minimization applied, no instance, __smallest__  
__protoss.tomin.js__  - Standard ProtoSS functionality, prepared for minimization, no instance  

# Additional Files  
__protoss.book.of.cheese.js__ must be preloaded before any other ProtoSS code, it adds polyfill implementation on base prototype primitives, usually not supported on mobile devices or old browsers  
__protoss.min.js.gz__ contains __protoss.min.js__  
__README.md__ present ProtoSS home screen  

# Examples  
__examples/protoss_examples.js__ supports basic inheritance example cases  
__examples/protoss_examples2.js__ builds basic game model example  
__examples/protoss_examples3.js__ demonstrates interfaces, abstracts and finalization of classes  
__examples/protoss_examples4.js__ supports packaging and super name concept  
__examples/mass.resolve.ProtoSS.js__ builds mass resolve example based on __protoss/ProtoSS.js__ manager  

# Documentation  
__protoss.all.js__ uses __dox/protoss.all.dox.md__  
__protoss.js__ uses __dox/protoss.dox.md__  
__protoss.min.js__ uses __dox/protoss.dox.md__  
__protoss.tomin.js__ uses __dox/protoss.dox.md__  
__dox/examples3_dox.txt__ documents __protoss_examples3.js__  
__dox/examples4_dox.txt__ documents __protoss_examples4.js__  
__dox/hints.txt__ exposes end case scenarios in OOP js concept  
__eclipse_templates/eclipse_protoss_templates.xml__ can be imported in __Eclipse__ suggestion templates, uses "protoss" keyword in javascript context  

# Extensions  
__ProtoSS.js__ can be found in __protoss/ProtoSS.js__ including documentation, header and interface  
__XeltoSS.js__ can be found in __xeltoss/XeltoSS.js__ including documentation, header and interface  

# Eclipse  
It is recommended to install tern.js server and leverage Tern Outline along standard Outline, which according to your tern configuration and implementation structure will allow inheritances in ProtoSS hierarchy to be displayed in standard outline, if not part of member structure. Viewing inheritances in standard outline is actually a hack in tern.js which is not supported by default, you will need to provide explicitly a wrapped instance of every ProtoSS class you want to outline as inheritance (this one is not deployed in releases), since tern.js server runs your javascript code and will extract the object structure and report it back to Eclipse outline, this case does not support super lists, it only works with a single super in the hierachy for now and your properties/methods must be declared on "o/this" scope instead of "m" member map in order to be publicly visible in the tern environment.  

# Commit  
Plus (+) stands for added content  
Minus (-) stands for removed content  
Asterix (*) stands for modified content  

It is recommended to add version static property in each branch class, and also in main comment section on top of the class file. Also provide information of the current version in commit title/description.  
