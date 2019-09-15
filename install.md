# Files  
__ProtoSS__ base is loaded and initiated using "new ZetaRet_Prototypes()". There are several bases you might choose to use:  
__protoss.all.js__  - All ProtoSS functionality, no minimization applied, instance is generated immediately, __recommended__ use  
__protoss.js__  - Standard ProtoSS functionality, no minimization applied, no instance  
__min/protoss.all.min.js__  - All ProtoSS functionality, minimization applied, instance is generated immediately  
__min/protoss.min.js__  - Standard ProtoSS functionality, minimization applied, no instance, __smallest__  

# Additional Files  
__protoss.book.of.cheese.js__ must be preloaded before any other ProtoSS code, it adds polyfill implementation on base prototype primitives, usually not supported on mobile devices or old browsers  
__protoss.node.cheese.js__  must be preloaded before any ProtoSS file in Node.js server  
__protoss.node.module.js__  simple ProtoSS module loading external JS files and setting scope  
__min/protoss.all.min.js.gz__ contains __protoss.all.min.js__  
__min/protoss.min.js.gz__ contains __protoss.min.js__  
__README.md__ ProtoSS home screen  

# Examples  
__examples/protoss_examples.js__ supports basic inheritance example cases  
__examples/protoss_examples2.js__ builds basic game model example  
__examples/protoss_examples3.js__ demonstrates interfaces, abstracts and finalization of classes  
__examples/protoss_examples4.js__ supports packaging and super name concept  
__examples/mass.resolve.ProtoSS.js__ builds mass resolve example based on __protoss/ProtoSS.js__ manager  
__examples/transform.ProtoSS.XeltoSS.js__ transform ProtoSS Class to XeltoSS Class in ES6 standard  
__examples/inline.morph.XeltoSS.js__ design template of protected scope using printed XeltoSS classes  
__examples/inline.morph.XeltoSS.intersect.js__ design template of protected scope using printed XeltoSS classes and protoss.all.js infrastructure  
__examples/inline.morph.XeltoSS.access.attributes.js__ design template of protected/private/internal/namespace scope using printed XeltoSS classes, protoss.all.js infrastructure and CRUD-compliant AccessAttribute class prototype  
__examples/node_example.js__ ProtoSS module example using __require__ and consoles ProtoSS Objects  

# Documentation  
__protoss.all.js__ uses __dox/protoss.all.md__  
__protoss.js__ uses __dox/protoss.md__  
__min/protoss.all.min.js__ uses __dox/protoss.all.md__  
__min/protoss.min.js__ uses __dox/protoss.md__  
__dox/hints.txt__ exposes end case scenarios in OOP js concept  
__dox/packager_guide.txt__ naming concept in packaging namespaces  
__dox/jsondox_template.json__ structured template for PHP bundler and __Atom__ IDE using [ide-protoss](https://github.com/ZetaRet/ide-protoss)  
__dox/protossdox.json__ structured project template for __Atom__ IDE using [ide-protoss](https://github.com/ZetaRet/ide-protoss)  
__eclipse_templates/eclipse_protoss_templates.xml__ can be imported in __Eclipse__ suggestion templates, uses "protoss" keyword in JavaScript context  
__atom_snippets/snippets.cson__ can be imported in __Atom__ IDE Snippets (access from File->Snippets and copy-paste), uses "protoss" keyword in JavaScript context  
__vscode_snippets/javascript.json__ can be imported in __Visual Studio Code__ User Snippets (access from File->Preferences->User Snippets and copy-paste), uses "protoss" keyword in JavaScript context  

# Extensions  
__ProtoSS.js__ can be found in __protoss/ProtoSS.js__ including documentation, header and interface  
__XeltoSS.js__ can be found in __xeltoss/XeltoSS.js__ including documentation, header and interface  
__SkytoSS.js__ can be found in __skytoss/SkytoSS.js__ including documentation, header and interface  

# Headers & Load Order
Classes are loaded always before Headers in HTML. Each Header requires a hard reference to ProtoSS Class definition, all other references inside the Header Array, present or super class(es), can be soft string literals resolved later. Backend may pack JS code in either way of <script src="file.js"\> method or output it directly into the script tag.
