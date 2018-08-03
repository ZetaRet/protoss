/**
 * Author: Zeta Ret, Ivo Yankulovski
 * Zeta Ret XeltoSS
 * ProtoSS Transformator to JS Class
 * Requires: protoss.all.js v1.02c
 * Version: 1.04 
 * Date: 2017 - Today
**/
window.internal(
function XeltoSS(){
	var o=this,a=arguments;
	o.scriptContainer=null;
	o.scriptContainerAppendMethod="appendChild";
	o.protossPrefix="protoss__";
	o.xeltossPrefix="xeltoss__";
	o.xeltossMethodSuffix="X";
	o.statisAsStatic=false;
	o.embedMaps={};
	o.augmentKeyMap={};
	o.noKeyIdentificationChain={};
	o.toppack=null;
	o.scopeMap={};
	o.preserveScope=false;
	o.fractalizedScope=false;
	o.obscureTimers=false;
	o.setInterval=null;
	o.setTimeout=null;
	o.tokens=null;
	o.keywords=null;
	o.operators=null;
	o.autoget=true;
	o.autoGetPrefix="get_";
	o.autoset=true;
	o.autoSetPrefix="set_";
	o.methodJoin="";
	o.bodyJoin="";
	o.overextendHandler=null;
	o.classHandler=null;
	o.tossIgnore=false;
	o.deflatInterfaces=true;
	o.deflatAbstracts=true;
	o.deflatConstructs=true;
	o.deflatInheritance=true;
	o.deflatStruct={};
	o.objectStringify=null;
	o.arrayStringify=null;
	o.methodTransfer=false;
	o.autoConstructor=true;
	o.constructorKeys=["construct","_construct","_constructor"];
	o.mergeConstructors=true;
	o.constructorMap={};
	o.autoDestructor=true;
	o.destructorKeys=["destruct","_destruct","_destructor"];
	o.allowSetters=true;
	o.allowGetters=true;
	o.allowAsync=false;
	o.AsyncFunction=null;
	o.allowGenerator=false;
	o.GeneratorFunction=null;
	o.ASTConstructor=null;
	o.bodyAssembler=null;
	o.methodAssembler=null;
	o.argsLookup=null;
	o.aststruct=null;
	o.proxyASTBuilder=null;
	o.proxyInstructions=null;
	o.deflat=null;
	o.chmod=0;
	o.super(a);
	var m={};
	m.initTokens=function(){
		var t=o.tokens||{};
		t.white_space=' ';
		t.white_newline='\n';
		t.white_return='\r';
		t.white_tab='\t';
		t.separator=',';
		t.accessor=".";
		t.string1="'";
		t.string2='"';
		t.colon=":";
		t.semicolon=";";
		t.array_left="[";
		t.array_right="]";
		t.object_left="{";
		t.object_right="}";
		t.group_left="(";
		t.group_right=")";
		t.tag_left="<";
		t.tag_right=">";
		t.gen_affix="*";
		o.tokens=t;
		return o;
	};
	m.initKeywords=function(){
		var k=o.keywords||{};
		k.forloop="for";
		k.forinloop=["for","in"];
		k.forofloop=["for","of"];
		k.whileloop="while";
		k.doloop=["do","while"];
		k.ifclause="if";
		k.elseclause="else";
		k.elseifclause=["else","if"];
		k.vardef="var";
		k.constdef="const";
		k.letdef="let";
		k.breakloop="break";
		k.continueloop="continue";
		k.switchcase=["switch","case","default"];
		k.trycatch=["try","catch","finally"];
		k.returnf="return";
		k.newinstance="new";
		k.deletekey="delete";
		k.typeofv="typeof";
		k.instanceofcls="instanceof";
		k.functionw="function";
		k.functiongw="function*";
		k.constructorw="constructor";
		k.classw="class";
		k.superw="super";
		k.thisw="this";
		k.extendsw="extends";
		k.nullw="null";
		k.undefinedw="undefined";
		k.truew="true";
		k.falsew="false";
		k.nanw="NaN";
		k.asyncw="async";
		k.awaitw="await";
		k.yieldw="yield";
		k.setterw="set";
		k.getterw="get";
		k.staticw="static";
		o.keywords=k;
		return o;
	};
	m.initOperators=function(){
		var p=o.operators||{};
		p.operator_add="+";
		p.operator_min="-";
		p.operator_mul="*";
		p.operator_div="/";
		p.operator_bitl="<<";
		p.operator_bitr=">>";
		p.operator_bitll="<<<";
		p.operator_bitrr=">>>";
		p.operator_mod="%";
		p.operator_inc="++";
		p.operator_dec="--";
		p.operator_eq="=";
		p.operator_eq2="==";
		p.operator_eq3="===";
		p.operator_neq="!=";
		p.operator_neq2="!==";
		p.operator_great=">";
		p.operator_less="<";
		p.operator_greateq=">=";
		p.operator_lesseq="<=";
		p.operator_eq_add="+=";
		p.operator_eq_min="-=";
		p.operator_eq_mul="*=";
		p.operator_eq_div="/=";
		p.operator_eq_mod="%=";
		p.operator_bit_and="&";
		p.operator_bit_or="|";
		p.operator_bit_not="~";
		p.operator_bit_xor="^";
		p.operator_and="&&";
		p.operator_or="||";
		p.operator_not="!";
		o.operators=p;
		return o;
	};
	m.initAsync=function(){
		o.allowAsync=true;
		var cnvrt=Function,
			expc="Object.getPrototypeOf(async function(){}).constructor";
		o.AsyncFunction=cnvrt("return "+expc)();
		return o;
	};
	m.initGenerator=function(){
		o.allowGenerator=true;
		var cnvrt=Function,
			expc="Object.getPrototypeOf(function*(){}).constructor";
		o.GeneratorFunction=cnvrt("return "+expc)();
		return o;
	};
	m.updateTimers=function(obscure){
		if(o.obscureTimers!=obscure){
			o.obscureTimers=obscure;
			if(obscure){
				o.setInterval=window.setInterval;
				o.setTimeout=window.setTimeout;
				window.setInterval=function(){};
				window.setTimeout=function(){};
			} else {
				window.setInterval=o.setInterval;
				window.setTimeout=o.setTimeout;
			}
		}
		return o;
	};
	m.hashString=function(str){
		var hash=0,l=str.length,i,char;
		if(l===0)return hash;
		for(i=0;i<l;i++){
			char=str.charCodeAt(i);
			hash=((hash<<5)-hash)+char;
			hash|=0;
		}
		return hash.toString(36);
	};
	m.decomposeFunction=function(f){
		var fa=[],
			fn=f.aname||f.name,
			bodyo='{',
			fs=f.toString(),
			bodyoi=fs.indexOf(bodyo),
			header=fs.substr(0,bodyoi),
			body=fs.substr(bodyoi),
			hspl=header.split(')')[0].split('('),
			hdata=hspl[0];
		hdata=hdata.replace('function','').replace(/ /gi,'');
		fa[0]=fn||hdata;
		fa[1]=hspl[1].replace(/ /gi,'').split(',');
		if(!fa[1][0])fa[1]=[];
		fa[2]=body;
		fa[3]=o.hashString(body);
		fa[4]=hspl[0];
		return fa;
	};
	m.deflatCls=function(obj,maps,interfaces,abstracts,constructs,inheritance){
		if(o.deflat){
			o.deflat.call(o,obj,maps,interfaces,abstracts,constructs,inheritance);
		}
		return o;
	};
	m.getConstructorArgs=function(clsconstructor,obj,key,data){
		if(o.argsLookup){
			return o.argsLookup.call(o,clsconstructor,obj,key,data);
		}
		return "";
	};
	m.buildInstructions=function(fbody,cls){
		var fbl=fbody.length,ch=o.chmod,instr=[];
		if(fbl>0 && o.proxyInstructions){
			return o.proxyInstructions.call(o,fbody,cls,ch,instr);
		}
		return instr;
	};
	m.buildASTObject=function(cls){
		if(!o.proxyASTBuilder){
			var ast=new cls();
			o.aststruct=o.buildInstructions(cls.toString(),cls);
			return ast;
		} 
		return o.proxyASTBuilder.call(o,cls);
	};
	m.identifyKeyChain=function(obj,identifyKeyHandler){
		var sname=obj.getSuperName2();
		o.noKeyIdentificationChain[sname]=identifyKeyHandler;
		return o;
	};
	m.addEmbedMap=function(obj,keyHandlerMap){
		var sname=obj.getSuperName2(),key;
		if(!o.embedMaps[sname])o.embedMaps[sname]={};
		for(key in keyHandlerMap)
			o.embedMaps[sname][key]=keyHandlerMap[key];
		return o;
	};
	m.augmentKey=function(obj,akeyMap){
		var sname=obj.getSuperName2(),l,i,ak,akeyv,key;
		if(!o.augmentKeyMap[sname])o.augmentKeyMap[sname]={};
		for(key in akeyMap){
			akeyv=akeyMap[key];
			key=key.toLowerCase();
			l=akeyv.length;
			if(!o.augmentKeyMap[sname][key])o.augmentKeyMap[sname][key]=[];
			for(i=0;i<l;i++){
				ak=akeyv[i].toLowerCase();
				if(o.augmentKeyMap[sname][key].indexOf(ak)<0)
					o.augmentKeyMap[sname][key].push(ak);
			}
		}
		return o;
	};
	m.argumentKeyMatch=function(orshift,defval,formatter){
		var f=function(obj,k,d,s){
			var kv="",fkv="",ok=obj[k],ak=d[1],akl=ak.length,lk=k.toLowerCase(),
				i,aki,augo=o.augmentKeyMap[s],nkic=o.noKeyIdentificationChain[s];
			if(augo)augo=augo[lk];
			for(i=0;i<akl;i++){
				aki=ak[i];
				if(lk===aki.toLowerCase()||(augo&&augo.indexOf(aki)>=0)){
					kv=aki;
					fkv=kv;
					break;
				}
			}
			if(nkic&&(akl===0||!fkv)){
				kv=nkic(obj,k,d,s);
				fkv=kv;
				if(!fkv){
					orshift=0;
					defval="void";
				}
			}
			if(kv && orshift)kv+="||"+ak[i-orshift];
			if(defval!==undefined){
				if(defval==="self"){
					if(ok===obj)kv+=(kv?"||":"")+"this";
					else kv+=(kv?"||":"")+o.valToString(ok);
				} else if (defval==="this"){
					kv+=(kv?"||":"")+"this";
				} else if (defval==="byte"&&ok&&ok.constructor){
					kv+=(kv?"||":"")+"new "+(ok.constructor.packagename?ok.constructor.packagename+".":"")+(ok.constructor.aname||ok.constructor.name)+"()";
				} else if (defval==="word"&&ok&&ok.constructor){
					kv+=(kv?"||":"")+"new "+(ok.constructor.packagename?ok.constructor.packagename+".":"")+(ok.constructor.aname||ok.constructor.name)+"("+o.getConstructorArgs(ok.constructor,ok,k)+")";
				} else if (defval==="void"){
					return undefined;
				} else kv+=(kv?"||":"")+o.valToString(defval);
			}
			if(formatter)kv=formatter(kv,fkv,defval,obj,k,d,s);
			return kv||null;
		};
		return f;
	};
	m.valToString=function(val){
		if(val===null || val===undefined || val.constructor===Number || val.constructor===Boolean){
			return ""+val;
		} else if (typeof val === 'function'){
			return val.packagename+'.'+(val.aname||val.name);
		} else if (val.constructor===String){
			return '"'+val+'"';
		} else if (val.constructor===Object){
			if(val.__name && o.toppack.package(val.__name)===val){
				return val.__name;
			} else if (val.packobj){
				return (val.packagename?val.packagename+'.':'')+(val.aname||val.name);
			}
			return o.objectStringify?o.objectStringify(val):JSON.stringify(val);
		} else if (val.constructor===Array){
			return o.arrayStringify?o.arrayStringify(val):JSON.stringify(val);
		}
		return val.toString();
	};
	m.findMethodInMaps=function(obj, key, method, maps){
		var ml=maps.length,i,mn,map;
		for(i=0;i<ml;i++){
			mn=maps[i];
			map=obj[mn];
			if(map[key]===method)return map;
		}
		return null;
	};
	m.toCls=function(obj, clsname, clssuper, deflat, polymaps, reservedwordsmap, emptify){
		if(!clsname)clsname=obj.constructor.aname||obj.constructor.name;
		if(!reservedwordsmap)reservedwordsmap={};
		var cls='',clsArgs='',superArgs='',clsf=[],clsb=[],pmethods=[],str,stri=-1,
			em=o.embedMaps,emv,rwm=reservedwordsmap,
			clsh=o.classHandler,oeh=o.overextendHandler,
			alset=o.allowSetters,alget=o.allowGetters,alac=o.allowAsync,algen=o.allowGenerator,
			ba=o.bodyAssembler,ma=o.methodAssembler,ckeys=o.constructorKeys;
		var decomp=o.decomposeFunction(obj.constructor),
			ofdecomp,ovart=(rwm.v||'var')+' '+(rwm.o||'o')+'='+(rwm.t||'this')+';',ovartset=false;
		clsArgs=decomp[1].join(',');
		var supers=obj.getSupers(),mapsupers=[obj.constructor].concat(supers),
			mapnames=[],mymethods=obj['__'+clsname+'_super__'],
			sname=obj.getSuperName2(),_sname,tp=o.toppack,
			keyedoutmaps=[],iamethods=[],inherited=[],
			i,k,ok,docontinue=false;
		if(polymaps){
			polymaps.iamethods=iamethods;
			polymaps.protectedmethods=pmethods;
			polymaps.keyedoutmaps=keyedoutmaps;
			polymaps.mapnames=mapnames;
			polymaps.inherited=inherited;
		}
		for(i=0;i<mapsupers.length;i++)mapnames[i]='__'+(mapsupers[i].aname||mapsupers[i].name)+'_super__';
		superArgs=o.getConstructorArgs(obj.constructor,obj,rwm.s||'super',polymaps);
		for(k in obj){
			ok=undefined;
			ofdecomp=undefined;
			docontinue=false;
			if (alget){
				ok=obj.__lookupGetter__(k);
				if(!ok && (typeof obj[k] === 'function') && k.indexOf(o.autoGetPrefix)==0){
					ok=obj[k];
					k=k.substr(o.autoGetPrefix.length,k.length);
					docontinue=true;
				}
				if(ok){
					if(o.findMethodInMaps(obj, k, ok, mapnames)!==mymethods){
						inherited.push(k);
						if(o.methodTransfer)continue;
					}
					ofdecomp=o.decomposeFunction(ok);
					if(ok._s)clsf.push((o.statisAsStatic?(rwm.sttc||"static")+" ":"")+(rwm.gt||"get")+" "+k+"()"+ofdecomp[2]);
					else clsf.push((rwm.gt||"get")+" "+k+"()"+ofdecomp[2].replace('{','{'+ovart));
					if(ma)ma.call(obj,k,ok,o,clsname,clssuper,clsArgs,superArgs,clsb,clsf,polymaps,rwm);
				}
				if(docontinue)continue;
			}
			if (alset){
				ok=obj.__lookupSetter__(k);
				if(!ok && (typeof obj[k] === 'function') && k.indexOf(o.autoSetPrefix)==0){
					ok=obj[k];
					k=k.substr(o.autoSetPrefix.length,k.length);
					docontinue=true;
				}
				if(ok){
					if(o.findMethodInMaps(obj, k, ok, mapnames)!==mymethods){
						inherited.push(k);
						if(o.methodTransfer)continue;
					}
					ofdecomp=o.decomposeFunction(ok);
					if(ok._s)clsf.push((o.statisAsStatic?(rwm.sttc||"static")+" ":"")+(rwm.gt||"set")+" "+k+"("+ofdecomp[1].join(',')+")"+ofdecomp[2]);
					else clsf.push((rwm.st||"set")+" "+k+"("+ofdecomp[1].join(',')+")"+ofdecomp[2].replace('{','{'+ovart));
					if(ma)ma.call(obj,k,ok,o,clsname,clssuper,clsArgs,superArgs,clsb,clsf,polymaps,rwm);
				}
				if(docontinue)continue;
			}
			if(!ok)ok=obj[k];
			else continue;
			if (em[sname]&&em[sname].hasOwnProperty(k)){
				emv=em[sname][k](obj,k,decomp,sname);
				if(emv!==undefined){
					clsb.push((rwm.t||'this')+'.'+k+'='+emv+';');
					if(ba)ba.call(obj,k,ok,o,clsname,clssuper,clsArgs,superArgs,clsb,clsf,polymaps,rwm);
				}
			} else if (ok===obj){
				clsb.push((rwm.t||'this')+'.'+k+'='+(rwm.t||'this')+';');
				if(ba)ba.call(obj,k,ok,o,clsname,clssuper,clsArgs,superArgs,clsb,clsf,polymaps,rwm);
			} else if (typeof ok === 'function'){
				if (!ok.packobj){
					ofdecomp=o.decomposeFunction(ok);
				}
				if (ok.packobj){
					clsb.push((rwm.t||'this')+'.'+k+'='+(ok.packagename?ok.packagename+'.':'')+(ok.aname||ok.name)+';');
					if(ba)ba.call(obj,k,ok,o,clsname,clssuper,clsArgs,superArgs,clsb,clsf,polymaps,rwm);
				} else if(ok._s){
					if(o.findMethodInMaps(obj, k, ok, mapnames)!==mymethods){
						inherited.push(k);
						if(o.methodTransfer)continue;
					}
					if(alac&&ok.constructor===o.AsyncFunction){
						clsf.push((o.statisAsStatic?(rwm.sttc||"static")+" ":"")+(rwm.asc||"async")+" "+k+"("+ofdecomp[1].join(',')+")"+ofdecomp[2]);
					} else if(algen&&ok.constructor===o.GeneratorFunction){
						clsf.push((o.statisAsStatic?(rwm.sttc||"static")+" ":"")+(rwm.ga||"*")+k+"("+ofdecomp[1].join(',')+")"+ofdecomp[2]);
					} else {
						clsf.push((o.statisAsStatic?(rwm.sttc||"static")+" ":"")+k+"("+ofdecomp[1].join(',')+")"+ofdecomp[2]);
					}
					if(ma)ma.call(obj,k,ok,o,clsname,clssuper,clsArgs,superArgs,clsb,clsf,polymaps,rwm);
				} else if(ok._i||ok._a){
					iamethods.push(k);
					if(o.findMethodInMaps(obj, k, ok, mapnames)!==mymethods){
						inherited.push(k);
						if(o.methodTransfer)continue;
					}
					if(ma)ma.call(obj,k,ok,o,clsname,clssuper,clsArgs,superArgs,clsb,clsf,polymaps,rwm);
				} else if(alac&&ok.constructor===o.AsyncFunction){
					if(o.findMethodInMaps(obj, k, ok, mapnames)!==mymethods){
						inherited.push(k);
						if(o.methodTransfer)continue;
					}
					clsf.push((rwm.asc||"async")+" "+k+"("+ofdecomp[1].join(',')+")"+ofdecomp[2].replace('{','{'+ovart));
					if(ma)ma.call(obj,k,ok,o,clsname,clssuper,clsArgs,superArgs,clsb,clsf,polymaps,rwm);
				} else if(algen&&ok.constructor===o.GeneratorFunction){
					if(o.findMethodInMaps(obj, k, ok, mapnames)!==mymethods){
						inherited.push(k);
						if(o.methodTransfer)continue;
					}
					clsf.push((rwm.ga||"*")+k+"("+ofdecomp[1].join(',')+")"+ofdecomp[2].replace('{','{'+ovart));
					if(ma)ma.call(obj,k,ok,o,clsname,clssuper,clsArgs,superArgs,clsb,clsf,polymaps,rwm);
				} else if(ok.constructor===o.ASTConstructor){
					clsb.push(ok.toString());
					if(ba)ba.call(obj,k,ok,o,clsname,clssuper,clsArgs,superArgs,clsb,clsf,polymaps,rwm);
				} else if(ckeys.indexOf(k)>=0 || (o.autoConstructor && k===clsname)){
					if(!ovartset){
						ovartset=true;
						clsb.push(ovart);
					}
					if(o.mergeConstructors){
						for(i=supers.length-1;i>=0;i--){
							_sname=supers[i].getSuperName2();
							if(o.constructorMap[_sname]){
								clsb.push(o.constructorMap[_sname].join(o.bodyJoin));
							}
						}
					}
					str=ofdecomp[2].replace('{','');
					stri=str.lastIndexOf("}");
					str=str.substring(0, stri);
					if(!o.constructorMap[sname])o.constructorMap[sname]=[];
					o.constructorMap[sname].push(str);
					clsb.push(str);
					if(ba)ba.call(obj,k,ok,o,clsname,clssuper,clsArgs,superArgs,clsb,clsf,polymaps,rwm);
				} else {
					if(o.findMethodInMaps(obj, k, ok, mapnames)!==mymethods){
						inherited.push(k);
						if(o.methodTransfer)continue;
					}
					clsf.push(k+"("+ofdecomp[1].join(',')+")"+ofdecomp[2].replace('{','{'+ovart));
					if(ok._x){
						clsb.push((rwm.t||'this')+'.'+k+o.xeltossMethodSuffix+'='+(rwm.t||'this')+'.'+k+'.xcoped('+(rwm.t||'this')+')'+';');
						pmethods.push(k+o.xeltossMethodSuffix);
					}
					if(o.preserveScope||ok._p){
						clsb.push((rwm.t||'this')+'.'+k+'='+(rwm.t||'this')+'.'+k+'.xcoped('+(rwm.t||'this')+')'+';');
						pmethods.push(k);
					}
					if(ma)ma.call(obj,k,ok,o,clsname,clssuper,clsArgs,superArgs,clsb,clsf,polymaps,rwm);
				}
			} else if(ok===null || ok===undefined || ok.constructor===Number || ok.constructor===Boolean){
				clsb.push((rwm.t||'this')+'.'+k+'='+ok+';');
				if(ba)ba.call(obj,k,ok,o,clsname,clssuper,clsArgs,superArgs,clsb,clsf,polymaps,rwm);
			} else if (ok.constructor===String){
				clsb.push((rwm.t||'this')+'.'+k+'="'+ok+'";');
				if(ba)ba.call(obj,k,ok,o,clsname,clssuper,clsArgs,superArgs,clsb,clsf,polymaps,rwm);
			} else if (mapnames.indexOf(k)>=0){
				keyedoutmaps.push(k);
				if(ba)ba.call(obj,k,ok,o,clsname,clssuper,clsArgs,superArgs,clsb,clsf,polymaps,rwm);
			} else if (ok.constructor===Object){
				if(ok.__name && tp.package(ok.__name)===ok){
					clsb.push((rwm.t||'this')+'.'+k+'='+ok.__name+';');
				} else if (ok.packobj){
					clsb.push((rwm.t||'this')+'.'+k+'='+(ok.packagename?ok.packagename+'.':'')+(ok.aname||ok.name)+';');
				} else if(emptify)clsb.push((rwm.t||'this')+'.'+k+'={};');
				else clsb.push((rwm.t||'this')+'.'+k+'='+(o.objectStringify?o.objectStringify(ok):JSON.stringify(ok))+';');
				if(ba)ba.call(obj,k,ok,o,clsname,clssuper,clsArgs,superArgs,clsb,clsf,polymaps,rwm);
			} else if (ok.constructor===Array){
				if(emptify)clsb.push((rwm.t||'this')+'.'+k+'=[];');
				else clsb.push((rwm.t||'this')+'.'+k+'='+(o.arrayStringify?o.arrayStringify(ok):JSON.stringify(ok))+';');
				if(ba)ba.call(obj,k,ok,o,clsname,clssuper,clsArgs,superArgs,clsb,clsf,polymaps,rwm);
			} else if (typeof ok === 'object'){
				if(ok.__name && tp.package(ok.__name)===ok){
					clsb.push((rwm.t||'this')+'.'+k+'='+ok.__name+';');
				} else if (ok.packobj){
					clsb.push((rwm.t||'this')+'.'+k+'='+(ok.packagename?ok.packagename+'.':'')+(ok.aname||ok.name)+';');
				} else if (emptify)clsb+=(rwm.t||'this')+'.'+k+'='+(rwm.n||'null')+';';
				else clsb.push((rwm.t||'this')+'.'+k+'='+(rwm.nw||'new')+' '+(ok.constructor.packagename?ok.constructor.packagename+".":"")+(ok.constructor.aname||ok.constructor.name)+'('+o.getConstructorArgs(ok.constructor, obj, k)+');');
				if(ba)ba.call(obj,k,ok,o,clsname,clssuper,clsArgs,superArgs,clsb,clsf,polymaps,rwm);
			} else if (oeh){
				clsb.push(oeh.call(obj,o,obj,k,rwm));
				if(ba)ba.call(obj,k,ok,o,clsname,clssuper,clsArgs,superArgs,clsb,clsf,polymaps,rwm);
			} else {
				clsb.push((rwm.t||'this')+'.'+k+'='+(rwm.n||'null')+';');
				if(ba)ba.call(obj,k,ok,o,clsname,clssuper,clsArgs,superArgs,clsb,clsf,polymaps,rwm);
			}
		}
		if(deflat)o.deflatCls(obj,polymaps,o.deflatInterfaces,o.deflatAbstracts,o.deflatConstructs,o.deflatInheritance);
		if(clsh){
			cls=clsh.call(obj,o,clsname,clssuper,clsArgs,superArgs,clsb,clsf,polymaps,rwm);
		} else {
			cls=(rwm.cls||'class')+' '+clsname+(clssuper ? ' '+(rwm.e||'extends')+' '+clssuper : '')+' {';
			cls+=(rwm.c||'constructor')+'('+clsArgs+'){'+(clssuper ? (rwm.s||'super')+'('+superArgs+');' : '');
			cls+=clsb.join(o.bodyJoin);
			cls+='}';
			cls+=clsf.join(o.methodJoin);
			cls+='}';
		}
		return cls;
	};
	m.ClsFactoryFromStringCls=function(clss){
		var clscnvrt=Function;
		var gen=clscnvrt("return "+clss);
		return gen;
	};
	m.toClsFactory=function(obj, clsname, clssuper, deflat, polymaps, reservedwordsmap, emptify){
		var clss=o.toCls(obj, clsname, clssuper, deflat, polymaps, reservedwordsmap, emptify);
		return o.ClsFactoryFromStringCls(clss);
	};
	m.toClsBlobScript=function(clss, prefix, suffix){
		if(!prefix)prefix="";
		if(!suffix)suffix="";
		var b=new Blob([prefix+clss+suffix],{type:"application/javascript"});
		var url = URL.createObjectURL(b);
		var s=document.createElement("script");
		s.src=url;
		(o.scriptContainer||document.body)[o.scriptContainerAppendMethod](s);
		return s;
	};
	m.toClsScript=function(clss, prefix, suffix){
		if(!prefix)prefix="";
		if(!suffix)suffix="";
		var scr=prefix+clss+suffix,
			s=document.createElement("script");
		s.innerText=scr;
		(o.scriptContainer||document.body)[o.scriptContainerAppendMethod](s);
		return s;
	};
	m.reconstruct=function(cls, clsname, clssuper, deflat, polymaps, reservedwordsmap, emptify, useclsfactory){
		var n=cls.aname||cls.name,po=cls.packobj||window,obj,newcls,clss;
		obj=o.buildASTObject(cls);
		if(!polymaps)polymaps={};
		if(!useclsfactory){
			clss=o.toCls(obj, clsname, clssuper, deflat, polymaps, reservedwordsmap, emptify);
			o.toClsScript(clss, po===window?"window[\""+n+"\"]=":po.__name+"."+n+"=", ";");
			newcls=po[n];
		} else {
			newcls=o.toClsFactory(obj, clsname, clssuper, deflat, polymaps, reservedwordsmap, emptify)();
		}
		o.hybrid(newcls, cls, obj, false, polymaps);
		o.autodestroy(obj);
		return newcls;
	};
	m.autodestroy=function(obj){
		var k;
		if(o.autoDestructor){
			for(k=0;k<o.destructorKeys.length;k++){
				if(obj[o.destructorKeys[k]]){
					obj[o.destructorKeys[k]]();
					return true;
				}
			}
		}
		return false;
	};
	m.hybrid=function(escls, protcls, obj, swap, polymaps){
		var n=protcls.aname||protcls.name,po=protcls.packobj||window,
			promap=obj["__"+n+"_super__"],k,i,ss,xs,sn,
			clsproto=protcls.prototype,
			newclsproto=escls.prototype,
			promapcls={constructor:escls},
			supers=obj.getSupers(),supers2=obj.getSupers2();
		
		if(swap)po[n]=escls;
		newclsproto["__"+n+"_super__"]=promapcls;
		for(k in protcls)escls[k]=protcls[k];
		for(k in promap){
			if(!newclsproto[k])continue;
			promapcls[k]=newclsproto[k];
			if(k!=="constructor")clsproto[k]=newclsproto[k];
		}
		if(!o.tossIgnore && supers.length>0){
			for(i=0;i<supers.length;i++){
				ss=supers[i];
				if(ss.packobj){
					sn=ss.aname||ss.name;
					xs=ss.packobj[o.xeltossPrefix+sn];
					if(xs){
						promap=xs.prototype["__"+sn+"_super__"];
						newclsproto["__"+sn+"_super__"]=promap;
						if(o.methodTransfer){
							for(k in promap){
								if(k!=="constructor" && !newclsproto[k])newclsproto[k]=promap[k];
							}
						}
					}
				}
			}
			if(supers2.length>1)newclsproto.__constructor_list=supers2;
			else newclsproto.__constructor=supers2[0];
		}
		protcls.__xeltoss=escls;
		escls.__protoss=protcls;
		po[o.protossPrefix+n]=protcls;
		po[o.xeltossPrefix+n]=escls;
		return o;
	};
	m.xeltoss=function(cls, clsname, clssuper, deflat, polymaps, reservedwordsmap, emptify, useclsfactory){
		var n=cls.aname||cls.name,po=cls.packobj||window,newcls;
		if(!po[o.xeltossPrefix+n]){
			newcls=o.reconstruct(cls, clsname, clssuper, deflat, polymaps, reservedwordsmap, emptify, useclsfactory);
		} else {
			newcls=po[o.xeltossPrefix+n];
		}
		po[n]=newcls;
		return newcls;
	};
	m.protoss=function(cls){
		var n=cls.aname||cls.name,po=cls.packobj||window,protosscls=po[o.protossPrefix+n];
		po[n]=protosscls;
		return protosscls;
	};
	m._constructor=function(){
		if(!o.constructor.Instance)o.constructor.Instance=o;
	};
	m._destructor=function(){
		if(XeltoSS.Instance===o)XeltoSS.Instance=null;
		if(o.constructor.Instance===o)o.constructor.Instance=null;
	};
	o.superize(a,m,true,true);
	m._constructor.call(o);
	return o;
}
);
XeltoSS.__InitXeltoSSPrototypes=false;
XeltoSS.InitXeltoSSPrototypes=function(override){
	if(!override&&XeltoSS.__InitXeltoSSPrototypes)return XeltoSS;
	XeltoSS.__InitXeltoSSPrototypes=true;
	var prn="prototype",
		cnx="constructor",
		dcname="__constructor",
		prfx="__",
		sffx="_super__",
		lsffx="_list",
		oprot=Object.prototype,
		odef=Object.defineProperty,
		ef={enumerable:false};
	
	oprot.superx=function(args,cargs,name){
		if (!name)name=dcname;
		var c=args.callee;
		if(!c.aname)c.aname=c.name;
		var p=c[prn];
		if (!p[name]||this[prfx+(p[name].aname||p[name].name)+sffx])return;
		if (cargs===true)cargs=args;
		return p[name].apply(this, cargs);
	};
	odef(oprot,'superx',ef);
	oprot.getSuperx=function(fn, name){
		if (!name)name=dcname;
		if (!fn)fn=typeof this === 'function' ? this : this[cnx];
		var supers=[];
		while(fn[prn][name]){
			fn=fn[prn][name];
			supers.push(fn.__xeltoss||fn);
		}
		var list=fn[prn][name+lsffx];
		if (list){
			var l=list.length,i=0,xl;
			for(;i<l;i++){
				xl=list[i];
				supers.push(xl.__xeltoss||xl);
				supers=supers.concat(xl.getSuperx(xl,name));
			}
		}
		return supers;
	};
	odef(oprot,'getSuperx',ef);
	oprot.ix=function(sfn,fn, name){
		var ffn=fn || (typeof this === 'function' ? this : this[cnx]);
		if(!sfn)return false;
		if (ffn==sfn||ffn.__xeltoss==sfn||ffn==sfn.__xeltoss)return true;
		var _s=this.getSuperx(fn,name);
		if (_s.indexOf(sfn.__xeltoss||sfn)==-1)return false;
		return true;
	};
	odef(oprot,'ix',ef);
	Function.prototype.xcoped=function(scope){
		var superf=this;
		var scopedf=function scopedf(){return superf.apply(scope,arguments);};
		scopedf.xf=superf;
		scopedf.xcope=scope;
		scopedf.aname=superf.aname||superf.name;
		return scopedf;
	};
	odef(Function.prototype, 'xcoped', ef);
	return XeltoSS;
};