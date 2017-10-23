/**
 * Author: Zeta Ret, Ivo Yankulovski
 * Zeta Ret XeltoSS
 * ProtoSS Transformator to JS Class
 * Requires: protoss.all.js v1.02c
 * Version: 1.03a Beta
 * Date: 2017 
**/
function XeltoSS(){
	var o=this,a=arguments;
	o.scriptContainer=null;
	o.protossPrefix="protoss__";
	o.xeltossPrefix="xeltoss__";
	o.super(a);
	var m={};
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
		var fa=[];
		var fn=f.name;
		var bodyo='{';
		var fs=f.toString();
		var bodyoi=fs.indexOf(bodyo);
		var header=fs.substr(0,bodyoi);
		var body=fs.substr(bodyoi);
		var hspl=header.split(')')[0].split('(');
		var hdata=hspl[0];
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
	};
	m.getConstructorArgs=function(clsconstructor, obj, key){
		/*requires static map of every constructor according to key and object holder*/
		/*parsing value from original function class is an option*/
		return "";
	};
	m.toCls=function(obj, clsname, clssuper, deflat, polymaps, reservedwordsmap, emptify){
		if(!clsname)clsname=obj.constructor.name;
		if(!reservedwordsmap)reservedwordsmap={};
		var clsArgs='',superArgs='',clsf='',clsb='';
		var decomp=o.decomposeFunction(obj.constructor);
		clsArgs=decomp[1].join(',');
		var mapsupers=[obj.constructor].concat(obj.getSupers());
		var mapnames=[];
		for(var i=0;i<mapsupers.length;i++)mapnames[i]='__'+mapsupers[i].name+'_super__';
		for(var k in obj){
			if (obj[k]===obj){
				clsb+='this.'+k+'=this;';
			} else if (typeof obj[k] === 'function'){
				/*add support of class/function ref*/
				if(obj[k]._s)clsf+=k+obj[k].toString().replace('function','');
				else clsf+=k+obj[k].toString().replace('{','{var '+(reservedwordsmap.o || 'o')+'=this;').replace('function','');
			} else if(obj[k]===null || obj[k]===undefined || obj[k].constructor===Number || obj[k].constructor===Boolean){
				clsb+='this.'+k+'='+obj[k]+';';
			} else if (obj[k].constructor===String){
				clsb+='this.'+k+'="'+obj[k]+'";';
			} else if (mapnames.indexOf(k)>=0){
				/*filter out key of method maps*/
			} else if (obj[k].constructor===Object){
				if(emptify)clsb+='this.'+k+'={};';
				else clsb+='this.'+k+'='+JSON.stringify(obj[k])+';';
			} else if (obj[k].constructor===Array){
				if(emptify)clsb+='this.'+k+'=[];';
				else clsb+='this.'+k+'='+JSON.stringify(obj[k])+';';
			} else if (typeof obj[k] === 'object'){
				/*support namespace*/
				if (emptify)clsb+='this.'+k+'=null;';
				else clsb+='this.'+k+'=new '+(obj[k].constructor.packagename?obj[k].constructor.packagename+".":"")+obj[k].constructor.name+'('+o.getConstructorArgs(obj[k].constructor, obj, k)+');';
			}else {
				clsb+='this.'+k+'=null;';
			}
		}
		var cls='class '+clsname+(clssuper ? " extends "+clssuper : "")+' {';
		cls+='constructor('+clsArgs+'){'+(clssuper ? 'super('+superArgs+');' : '');
		cls+=clsb;
		cls+='}';
		cls+=clsf;
		cls+='}';
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
		var scr=prefix+clss+suffix;
		var s=document.createElement("script");
		s.innerText=scr;
		(o.scriptContainer||document.body).append(s);
		return s;
	};
	m.xeltoss=function(cls, clsname, clssuper, deflat, polymaps, reservedwordsmap, emptify, useclsfactory){
		var n=cls.name,po=cls.packobj||window,obj,newcls,clss;
		if(!po[o.xeltossPrefix+n]){
			obj=new cls();
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
			if(supers.length>0){
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