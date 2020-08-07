interface ProtoSSPackage {
	__name?: string;
}
interface ProtoSSMap {
	constructor?: ProtoSSFunction;
}
interface ProtoSSFunction extends Function {
	name: string;
	prototype: object;
	aname?: string;
	oname?: string;
	_i?: boolean | number;
	_s?: boolean | number;
	__constructor?: ProtoSSFunction;
	packagename?: string;
	packobj?: ProtoSSPackage;
	supers?: Array<ProtoSSFunction>;
	_csupers?: boolean;
}
interface ProtoSSArgs extends Array<object> {
	callee: ProtoSSFunction;
}
interface ProtoSSObject {
	rndstr(l: number): string
	super(args: ProtoSSArgs, cargs?: Boolean | ProtoSSArgs, name?: string): object
	superize(args: ProtoSSArgs, map?: object, setname?: boolean, setown?: boolean, defname?: boolean): ProtoSSMap
	setSuper(superfn: ProtoSSFunction, fn?: ProtoSSFunction, name?: string): ProtoSSFunction
	setSubclass(fn: ProtoSSFunction, superfn?: ProtoSSFunction, name?: string): ProtoSSFunction
	callSuper(name: string, args?: ProtoSSArgs, cname?: string): any
	callSuper2(name: string, args?: ProtoSSArgs, cname?: string): any
	callSuperX(name: string, args?: ProtoSSArgs, cname?: string, thiscls?: ProtoSSFunction): any
	getNextSuper(name: string, cname?: string): ProtoSSFunction
	getNextSuperX(name: string, cname?: string, thiscls?: ProtoSSFunction): ProtoSSFunction
	getSuper(cname?: string): ProtoSSMap
	getThis(): ProtoSSMap
	callProto(proto: ProtoSSFunction, name: string, args?: ProtoSSArgs): any
	callProto2(proto: ProtoSSFunction, name: string, args?: ProtoSSArgs): any
	callProtoX(proto: ProtoSSFunction, name: string, args?: ProtoSSArgs): any
	superList(list: Array<ProtoSSFunction>, fn?: ProtoSSFunction, name?: string, defname?: boolean): ProtoSSFunction
	superList2(list: Array<ProtoSSFunction>, fn?: ProtoSSFunction, name?: string, defname?: boolean): ProtoSSFunction
	getSupers(fn?: ProtoSSFunction, name?: string): Array<ProtoSSFunction>
	getSupers2(fn?: ProtoSSFunction, name?: string): Array<ProtoSSFunction>
	getReversedSupers(fn?: ProtoSSFunction, name?: string): Array<ProtoSSFunction>
	hasSuper(sfn: ProtoSSFunction, fn?: ProtoSSFunction, name?: string): boolean
	is(sfn: ProtoSSFunction, fn?: ProtoSSFunction, name?: string): boolean
	abstract(name?: string, amap?: object, defname?: boolean): ProtoSSFunction
	implement(superfn: ProtoSSFunction, fn?: ProtoSSFunction, name?: string): ProtoSSFunction
	interface(name?: string, imap?: object, defname?: boolean): ProtoSSFunction
	final(args: ProtoSSArgs): object | never
	statis(args: ProtoSSArgs, statis: Function, _super?: ProtoSSMap, setname?: boolean, setown?: boolean, defname?: boolean): ProtoSSMap
	getSuperName(): string
	getSuperName2(): string
	namespace(ns: string, cls: ProtoSSFunction, pack?: ProtoSSPackage): ProtoSSPackage
	usens(ns: string, pack?: ProtoSSPackage): ProtoSSPackage
	internal(cls: ProtoSSFunction, pack?: ProtoSSPackage): ProtoSSPackage
	package(name: string, scope?: ProtoSSPackage): ProtoSSPackage
}