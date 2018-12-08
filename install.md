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
__examples/transform.ProtoSS.XeltoSS.js__ transform ProtoSS Class to XeltoSS Class in ES6 standard  

# Documentation  
__protoss.all.js__ uses __dox/protoss.all.md__  
__protoss.js__ uses __dox/protoss.md__  
__protoss.min.js__ uses __dox/protoss.md__  
__protoss.tomin.js__ uses __dox/protoss.md__  
__dox/examples3_dox.txt__ documents __protoss_examples3.js__  
__dox/examples4_dox.txt__ documents __protoss_examples4.js__  
__dox/hints.txt__ exposes end case scenarios in OOP js concept  
__eclipse_templates/eclipse_protoss_templates.xml__ can be imported in __Eclipse__ suggestion templates, uses "protoss" keyword in javascript context  
__atom_snippets/snippets.cson__ can be imported in __Atom__ IDE Snippets (access from File->Snippets and copy-paste), uses "protoss" keyword in javascript context  

# Extensions  
__ProtoSS.js__ can be found in __protoss/ProtoSS.js__ including documentation, header and interface  
__XeltoSS.js__ can be found in __xeltoss/XeltoSS.js__ including documentation, header and interface  

# Headers & Load Order
Classes are loaded always before Headers in HTML. Each Header requires a hard reference to ProtoSS Class definition, any other reference-to inside the Header Array, present or super class(es), can be soft string literal which is resolved later. Backend may pack JS code in either way of <script src="file.js"> method or output it directly into the script tag.

# Commit  
Plus (+) stands for added content  
Minus (-) stands for removed content  
Asterix (*) stands for modified content  

It is recommended to add version static property in each branch class, and also in main comment section on top of the class file. Also provide information of the current version in commit title/description.  
