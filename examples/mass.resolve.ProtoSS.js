/*
 * Zeta Ret ProtoSS Examples
 * Mass Resolve Headers/Classes/Interfaces, Generate Interfaces
 * 
 * Requires: ProtoSS, protoss.all
 * 
 */
var protoss=new ProtoSS();

/*declare interface description package*/
window.package("zetaret.global.packages.examples.interfaces").IEvents={
	IAudioEvent:{getSamples:[Number,Number],getFrequency:[],getBitrate:[],getTime:[],getLength:[],isPlaying:[]},
	IClipboardEvent:{getText:[],getHTML:[],getClipboardData:[String],setClipboardData:[String,String],clearClipboard:[]},
	IEvent:{preventBubble:[],preventDefault:[],preventCapture:[],stopPropagation:[],stopImmediatePropagation:[],setEventPhase:[String],setEventType:[String],setEventTarget:["/IEventTarget"],setEventCurrentTarget:["/IEventTarget"],addToTargetMap:["/IEventTarget"],setNativeEvent:[Event],clone:[]},
	IEventData:{getData:[]},
	IEventDispatcher:{setEventTarget:["/IEventDispatcher"],addEventListener:[String,Function],removeEventListener:[String,Function],hasEvent:[String],dispatch:[String,"/IEventData"],dispatchEvent:["/IEvent","/IEventData"]},
	IEventTarget:{},
	IMouseEvent:{getX:[],getY:[],getLocalX:[],getLocalY:[],getOffsetX:[],getOffsetY:[],getKeys:[],getXY:[]}
};

/* MouseEvent will be set as subclass of Event later, but it is loaded before Event */
window.package("zetaret.global.packages.examples.events").internal(
function MouseEvent(type, target) {
	var o = this,a=arguments;
	o.x=0;
	o.y=0;
	o.ox=0;
	o.oy=0;
	o.lx=0;
	o.ly=0;
	o.keys=null;
	o.super(a,true);
	var m = {};
	m.getX=function(){
		return o.x;
	};
	m.getY=function(){
		return o.y;
	};
	m.getLocalX=function(){
		return o.lx;
	};
	m.getLocalY=function(){
		return o.ly;
	};
	m.getOffsetX=function(){
		return o.ox;
	};
	m.getOffsetY=function(){
		return o.oy;
	};
	m.getKeys=function(){
		return o.keys;
	};
	m.getXY=function(){
		return [o.x,o.y,o.lx,o.ly,o.ox,o.oy];
	};
	m.setNativeEvent=function(e){
		o.nativeEvent=e;
		o.x=e.clientX;
		o.y=e.clientY;
		o.ox=e.offsetX;
		o.oy=e.offsetY;
		o.lx=e.pageX;
		o.ly=e.pageY;
		return o;
	};
	o.superize(a, m, true, true);
	return o;
}
);
ProtoSS.eventProps(zetaret.global.packages.examples.events.MouseEvent,["x","y","ox","oy","lx","ly","keys"]);

/*Top level Event is loaded after one if its subclasses MouseEvent, headers set inheritance on resolve*/
window.package("zetaret.global.packages.examples.events").internal(
function Event(type, target) {
	var o = this,a=arguments;
	o.super(a,true);
	var m = {};
	o.superize(a, m, true, true);
	return o;
}
);

function ZetaRet_Event(type, target){
	var o = this,a=arguments;
	o.type=type;
	o.bubbles=false;
	o.cancelBubble=false;
	o.cancelable=false;
	o.currentTarget=null;
	o.target=target;
	o.defaultPrevented=false;
	o.targetMap=null;
	o.eventPhase=null;
	o.time=0;
	o.creator=null;
	o.nativeEvent=null;
	o.super(a);
	o.cloneprops=o.constructor.eventprops;
	var m = {};
	m.preventBubble=function(){
		o.bubbles=false;
		return o;
	};
	m.preventDefault=function(){
		o.defaultPrevented=true;
		return o;
	};
	m.preventCapture=function(){
		o.setEventPhase(ZetaRet_Event.BUBBLE_PHASE);
		return o;
	};
	m.stopPropagation=function(){
		o.setEventPhase(ZetaRet_Event.NO_PHASE);
		return o;
	};
	m.stopImmediatePropagation=function(){
		o.setEventPhase(ZetaRet_Event.NULL_PHASE);
		return o;
	};
	m.setEventPhase=function(phase){
		o.eventPhase=phase;
		return o;
	};
	m.setEventType=function(type){
		o.type=type;
		return o;
	};
	m.setEventTarget=function(target){
		o.target=target;
		return o;
	};
	m.setEventCurrentTarget=function(target){
		o.currentTarget=target;
		return o;
	};
	m.addToTargetMap=function(target){
		o.targetMap=o.targetMap||[];
		o.targetMap[o.targetMap.length]=target;
		return o;
	};
	m.setNativeEvent=function(e){
		o.nativeEvent=e;
		return o;
	};
	m.clone=function(){
		var c=new o.constructor(o.type);
		c.bubbles=o.bubbles;
		c.cancelBubble=o.cancelBubble;
		c.cancelable=o.cancelable;
		c.currentTarget=o.currentTarget;
		c.target=o.target;
		c.defaultPrevented=o.defaultPrevented;
		c.targetMap=o.targetMap;
		c.eventPhase=o.eventPhase;
		c.time=o.time;
		c.creator=o.creator;
		c.nativeEvent=o.nativeEvent;
		if (o.cloneprops){
			var cl=o.cloneprops.length;
			for(var i=0;i<cl;i++){
				var ck=o.cloneprops[i];
				c[ck]=o[ck];
			}
		}
		return c;
	};
	o.superize(a, m, true, true);
	return o;
}
ZetaRet_Event.BUBBLE_PHASE="bubblePhase";
ZetaRet_Event.CAPTURE_PHASE="capturePhase";
ZetaRet_Event.NO_PHASE="noPhase";
ZetaRet_Event.NULL_PHASE="nullPhase";

/*Headers are always loaded after declaration of ProtoSS classes, usually separated in different files and packages*/
ProtoSS.headerSuper.push([zetaret.global.packages.examples.events.Event,"ZetaRet_Event"]);/*single super outside package*/
ProtoSS.headerImplement.push([ZetaRet_Event, "zetaret.global.packages.examples.events.interfaces::IEvent"]);/*add interface as string supername, resolve later, IEvent is not present yet*/
ProtoSS.headerSuperList2.push([zetaret.global.packages.examples.events.MouseEvent,["zetaret.global.packages.examples.events::Event","zetaret.global.packages.examples.events.interfaces::IMouseEvent"]]);/*MouseEvent extends Event and IMouseEvent, will resolve later*/

protoss.toInterface(zetaret.global.packages.examples.interfaces.IEvents,window.package("zetaret.global.packages.examples.events.interfaces"));/*creates batch interface*/
protoss.resolveCls(zetaret.global.packages.examples.interfaces.IEvents, window,"zetaret.global.packages.examples.events.interfaces");/*resolves all string classes*/
protoss.resolveHeaders(window);/*resolves all headers from static props*/
