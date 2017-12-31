/**
 * Author: Zeta Ret, Ivo Yankulovski
 * Zeta Ret XeltoSS
 * ProtoSS Transformator to JS Class
 * Requires: protoss.all.js v1.02c
 * Version: 1.03j 
 * Date: 2017 
**/
window.internal(
function XeltoSS(){
	var o=this,a=arguments;
	o.scriptContainer=null;
	o.protossPrefix="protoss__";
	o.xeltossPrefix="xeltoss__";
	o.statisAsStatic=false;
	o.embedMaps={};
	o.augmentKeyMap={};
	o.noKeyIdentificationChain={};
	o.toppack=null;
	o.scopeMap={};
	o.preserveScope=true;
	o.fractalizedScope=true;
	o.obscureTimers=false;
	o.setInterval=null;
	o.setTimeout=null;
	o.tokens=null;
	o.keywords=null;
	o.operators=null;
	o.methodJoin="";
	o.bodyJoin="";
	o.overextendHandler=null;
	o.classHandler=null;
	o.tossIgnore=false;
	o.deflatInterfaces=true;
	o.deflatAbstracts=true;
	o.deflatConstructs=true;
	o.deflatInheritance=true;
	o.objectStringify=null;
	o.arrayStringify=null;
	o.allowSetters=true;
	o.allowGetters=true;
	o.allowAsync=false;
	o.AsyncFunction=null;
	o.allowGenerator=false;
	o.GeneratorFunction=null;
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
		o.AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
		return o;
	};
	m.initGenerator=function(){
		o.allowGenerator=true;
		o.GeneratorFunction=Object.getPrototypeOf(function*(){}).constructor;
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
			fn=f.name,
			bodyo='{',
			fs=f.toString(),
			bodyoi=fs.indexOf(bodyo),
			header=fs.substr(0,bodyoi),
			body=fs.substr(bodyoi),
			hspl=header.split(')')[0].split('('),
			hdata=hspl[0];
		hdata=hdata.replace('function','').replace(/ /gi,'');
		if (hdata)fn=hdata;
		fa[0]=fn;
		fa[1]=hspl[1].replace(/ /gi,'').split(',');
		if(!fa[1][0])fa[1]=[];
		fa[2]=body;
		fa[3]=o.hashString(body);
		return fa;
	};
	m.deflatCls=function(obj,maps,interfaces,abstracts,constructs,inheritance){
		/*create separated classes according to inheritance tree*/
		/*extends base functionality required, i.e. recursive calls toCls with clssuper*/
		return o;
	};
	m.getConstructorArgs=function(clsconstructor, obj, key){
		/*requires static map of every constructor according to key and object holder*/
		/*parsing value from original function class is an option*/
		return "";
	};
	m.buildInstructions=function(fbody){
		var fbl=fbody.length,ch,instr=[];
		/*parse function body into keywords, calls, variables, if, for, while, etc. instructions*/
		return instr;
	};
	m.buildASTObject=function(cls){
		/*call external AbstractSyntaxTree Builder in VM*/
		/*parse fbody using buildInstructions*/
		var ast=new cls();
		return ast;
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
					kv+=(kv?"||":"")+"new "+(ok.constructor.packagename?ok.constructor.packagename+".":"")+ok.constructor.name+"()";
				} else if (defval==="word"&&ok&&ok.constructor){
					kv+=(kv?"||":"")+"new "+(ok.constructor.packagename?ok.constructor.packagename+".":"")+ok.constructor.name+"("+o.getConstructorArgs(ok.constructor,ok,k)+")";
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
			return val.packagename+'.'+(val.name||val.aname);
		} else if (val.constructor===String){
			return '"'+val+'"';
		} else if (val.constructor===Object){
			if(val.__name && o.toppack.package(val.__name)===val){
				return val.__name;
			} else if (val.packobj){
				return (val.packagename?val.packagename+'.':'')+(val.name||val.aname);
			}
			return o.objectStringify?o.objectStringify(val):JSON.stringify(val);
		} else if (val.constructor===Array){
			return o.arrayStringify?o.arrayStringify(val):JSON.stringify(val);
		}
		return val.toString();
	};
	m.toCls=function(obj, clsname, clssuper, deflat, polymaps, reservedwordsmap, emptify){
		if(!clsname)clsname=obj.constructor.name;
		if(!reservedwordsmap)reservedwordsmap={};
		var cls='',clsArgs='',superArgs='',clsf=[],clsb=[],
			em=o.embedMaps,emv,rwm=reservedwordsmap,prfx="",sffx="",
			clsh=o.classHandler,oeh=o.overextendHandler,
			alset=o.allowSetters,alget=o.allowGetters,alac=o.allowAsync,algen=o.allowGenerator;
		var decomp=o.decomposeFunction(obj.constructor),
			ofdecomp,ovart=(rwm.v||'var')+' '+(rwm.o||'o')+'='+(rwm.t||'this')+';';
		clsArgs=decomp[1].join(',');
		var mapsupers=[obj.constructor].concat(obj.getSupers()),
			mapnames=[],sname=obj.getSuperName2(),tp=o.toppack,
			keyedoutmaps=[],iamethods=[],i,k,ok;
		if(polymaps){
			polymaps.iamethods=iamethods;
			polymaps.keyedoutmaps=keyedoutmaps;
			polymaps.mapnames=mapnames;
		}
		for(i=0;i<mapsupers.length;i++)mapnames[i]='__'+mapsupers[i].name+'_super__';
		for(k in obj){
			ok=undefined;
			ofdecomp=undefined;
			if (alget){
				ok=obj.__lookupGetter__(k);
				if(ok){
					ofdecomp=o.decomposeFunction(ok);
					clsf.push((rwm.gt||"get")+" "+k+"("+ofdecomp[1].join(',')+")"+ofdecomp[2].replace('{','{'+ovart));
				}
			}
			if (alset){
				ok=obj.__lookupSetter__(k);
				if(ok){
					ofdecomp=o.decomposeFunction(ok);
					clsf.push((rwm.st||"set")+" "+k+"("+ofdecomp[1].join(',')+")"+ofdecomp[2].replace('{','{'+ovart));
				}
			}
			if(!ok)ok=obj[k];
			else continue;
			if (em[sname]&&em[sname].hasOwnProperty(k)){
				emv=em[sname][k](obj,k,decomp,sname);
				if(emv!==undefined)clsb.push((rwm.t||'this')+'.'+k+'='+emv+';');
			} else if (ok===obj){
				clsb.push((rwm.t||'this')+'.'+k+'='+(rwm.t||'this')+';');
			} else if (typeof ok === 'function'){
				if (!ok.packobj)ofdecomp=o.decomposeFunction(ok);
				if (ok.packobj){
					clsb.push((rwm.t||'this')+'.'+k+'='+(ok.packagename?ok.packagename+'.':'')+(ok.name||ok.aname)+';');
				} else if(ok._s){
					if(alac&&ok.constructor===o.AsyncFunction){
						clsf.push((o.statisAsStatic?(rwm.sttc||"static")+" ":"")+(rwm.asc||"async")+" "+k+"("+ofdecomp[1].join(',')+")"+ofdecomp[2]);
					} else if(algen&&ok.constructor===o.GeneratorFunction){
						clsf.push((o.statisAsStatic?(rwm.sttc||"static")+" ":"")+(rwm.ga||"*")+k+"("+ofdecomp[1].join(',')+")"+ofdecomp[2]);
					} else 
						clsf.push((o.statisAsStatic?(rwm.sttc||"static")+" ":"")+k+"("+ofdecomp[1].join(',')+")"+ofdecomp[2]);
				} else if(ok._i||ok._a){
					iamethods.push(k);
				} else if(alac&&ok.constructor===o.AsyncFunction){
					clsf.push((rwm.asc||"async")+" "+k+"("+ofdecomp[1].join(',')+")"+ofdecomp[2].replace('{','{'+ovart));
				} else if(algen&&ok.constructor===o.GeneratorFunction){
					clsf.push((rwm.ga||"*")+k+"("+ofdecomp[1].join(',')+")"+ofdecomp[2].replace('{','{'+ovart));
				} else 
					clsf.push(k+"("+ofdecomp[1].join(',')+")"+ofdecomp[2].replace('{','{'+ovart));
			} else if(ok===null || ok===undefined || ok.constructor===Number || ok.constructor===Boolean){
				clsb.push((rwm.t||'this')+'.'+k+'='+ok+';');
			} else if (ok.constructor===String){
				clsb.push((rwm.t||'this')+'.'+k+'="'+ok+'";');
			} else if (mapnames.indexOf(k)>=0){
				keyedoutmaps.push(k);
			} else if (ok.constructor===Object){
				if(ok.__name && tp.package(ok.__name)===ok){
					clsb.push((rwm.t||'this')+'.'+k+'='+ok.__name+';');
				} else if (ok.packobj){
					clsb.push((rwm.t||'this')+'.'+k+'='+(ok.packagename?ok.packagename+'.':'')+(ok.name||ok.aname)+';');
				} else if(emptify)clsb.push((rwm.t||'this')+'.'+k+'={};');
				else clsb.push((rwm.t||'this')+'.'+k+'='+(o.objectStringify?o.objectStringify(ok):JSON.stringify(ok))+';');
			} else if (ok.constructor===Array){
				if(emptify)clsb.push((rwm.t||'this')+'.'+k+'=[];');
				else clsb.push((rwm.t||'this')+'.'+k+'='+(o.arrayStringify?o.arrayStringify(ok):JSON.stringify(ok))+';');
			} else if (typeof ok === 'object'){
				if(ok.__name && tp.package(ok.__name)===ok){
					clsb.push((rwm.t||'this')+'.'+k+'='+ok.__name+';');
				} else if (ok.packobj){
					clsb.push((rwm.t||'this')+'.'+k+'='+(ok.packagename?ok.packagename+'.':'')+(ok.name||ok.aname)+';');
				} else if (emptify)clsb+=(rwm.t||'this')+'.'+k+'='+(rwm.n||'null')+';';
				else clsb.push((rwm.t||'this')+'.'+k+'='+(rwm.nw||'new')+' '+(ok.constructor.packagename?ok.constructor.packagename+".":"")+ok.constructor.name+'('+o.getConstructorArgs(ok.constructor, obj, k)+');');
			} else if (oeh){
				clsb.push(oeh(o,obj,k,rwm));
			} else {
				clsb.push((rwm.t||'this')+'.'+k+'='+(rwm.n||'null')+';');
			}
		}
		if(deflat)o.deflatCls(obj,polymaps,o.deflatInterfaces,o.deflatAbstracts,o.deflatConstructs,o.deflatInheritance);
		if(clsh){
			cls=clsh(o,clsname,clssuper,clsArgs,superArgs,clsb,clsf,polymaps,rwm);
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
		(o.scriptContainer||document.body).append(s);
		return s;
	};
	m.toClsScript=function(clss, prefix, suffix){
		if(!prefix)prefix="";
		if(!suffix)suffix="";
		var scr=prefix+clss+suffix,
			s=document.createElement("script");
		s.innerText=scr;
		(o.scriptContainer||document.body).append(s);
		return s;
	};
	m.reconstruct=function(cls, clsname, clssuper, deflat, polymaps, reservedwordsmap, emptify, useclsfactory){
		var n=cls.name,po=cls.packobj||window,obj,newcls,clss;
		obj=o.buildASTObject(cls);
		if(!useclsfactory){
			clss=o.toCls(obj, clsname, clssuper, deflat, polymaps, reservedwordsmap, emptify);
			o.toClsScript(clss, po===window?"window[\""+n+"\"]=":po.__name+"."+n+"=", ";");
			newcls=po[n];
		} else {
			newcls=o.toClsFactory(obj, clsname, clssuper, deflat, polymaps, reservedwordsmap, emptify)();
		}
		var promap=obj["__"+cls.name+"_super__"],k,i,ss,xs,sn,
			clsproto=cls.prototype,
			newclsproto=newcls.prototype,
			promapcls={constructor:newcls},
			supers=obj.getSupers(),supers2=obj.getSupers2();
		newclsproto["__"+cls.name+"_super__"]=promapcls;
		for(k in cls)newcls[k]=cls[k];
		for(k in promap){
			promapcls[k]=newclsproto[k];
			if(k!=="constructor")clsproto[k]=newclsproto[k];
		}
		if(!o.tossIgnore && supers.length>0){
			for(i=0;i<supers.length;i++){
				ss=supers[i];
				if(ss.packobj){
					sn=ss.name;
					xs=ss.packobj[o.xeltossPrefix+ss.name];
					if(xs)newclsproto["__"+sn+"_super__"]=xs.prototype["__"+sn+"_super__"];
				}
			}
			if(supers2.length>1)newclsproto.__constructor_list=supers2;
			else newclsproto.__constructor=supers2[0];
		}
		cls.__xeltoss=newcls;
		newcls.__protoss=cls;
		po[o.protossPrefix+n]=cls;
		po[o.xeltossPrefix+n]=newcls;
		return newcls;
	};
	m.xeltoss=function(cls, clsname, clssuper, deflat, polymaps, reservedwordsmap, emptify, useclsfactory){
		var n=cls.name,po=cls.packobj||window,newcls;
		if(!po[o.xeltossPrefix+n]){
			newcls=o.reconstruct(cls, clsname, clssuper, deflat, polymaps, reservedwordsmap, emptify, useclsfactory);
		} else {
			newcls=po[o.xeltossPrefix+n];
		}
		po[n]=newcls;
		return newcls;
	};
	m.protoss=function(cls){
		var n=cls.name,po=cls.packobj||window,protosscls=po[o.protossPrefix+n];
		po[n]=protosscls;
		return protosscls;
	};
	o.superize(a,m,true,true);
	return o;
}
);