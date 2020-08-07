interface XeltoSSCTOR {
	new(): XeltoSS
}
interface XeltoSS {
	scriptContainer: HTMLElement;
	scriptContainerAppendMethod: string;
	protossPrefix: string;
	xeltossPrefix: string;
	xeltossMethodSuffix: string;
	statisAsStatic: boolean;
	embedMaps: object;
	augmentKeyMap: object;
	noKeyIdentificationChain: object;
	toppack: object;
	scopeMap: object;
	preserveScope: boolean;
	fractalizedScope: boolean;
	obscureTimers: boolean;
	setInterval: Function;
	setTimeout: Function;
	tokens: object;
	keywords: object;
	operators: object;
	autoget: boolean;
	autoGetPrefix: string;
	autoset: boolean;
	autoSetPrefix: string;
	methodJoin: string;
	bodyJoin: string;
	overextendHandler: Function;
	classHandler: Function;
	tossIgnore: boolean;
	deflatInterfaces: boolean;
	deflatAbstracts: boolean;
	deflatConstructs: boolean;
	deflatInheritance: boolean;
	deflatStruct: object;
	objectStringify: Function;
	arrayStringify: Function;
	methodTransfer: boolean;
	autoConstructor: boolean;
	constructorKeys: Array<object>;
	mergeConstructors: boolean;
	inverseMergeConstructors: boolean;
	replicaConstructors: boolean;
	constructorMap: object;
	autoDestructor: boolean;
	destructorKeys: Array<object>;
	allowSetters: boolean;
	allowGetters: boolean;
	allowAsync: boolean;
	AsyncFunction: Function;
	allowGenerator: boolean;
	GeneratorFunction: Function;
	ASTConstructor: Function;
	bodyAssembler: Function;
	methodAssembler: Function;
	argsLookup: Function;
	aststruct: object;
	proxyASTBuilder: Function;
	proxyInstructions: Function;
	deflat: Function;
	chmod: number;

	initTokens(): XeltoSS
	initKeywords(): XeltoSS
	initOperators(): XeltoSS
	initAsync(): XeltoSS
	initGenerator(): XeltoSS
	updateTimers(obscure?: boolean): XeltoSS
	hashString(str: string): string
	decomposeFunction(f: Function): Array<object>
	deflatCls(obj: object, maps?: object, interfaces?: boolean, abstracts?: boolean, constructs?: boolean, inheritance?: boolean): XeltoSS
	getConstructorArgs(clsconstructor: Function, obj: object, key: string, data?: object): string
	buildInstructions(fbody: string, cls: Function): Array<object>
	buildASTObject(cls: Function): object
	identifyKeyChain(obj: object, identifyKeyHandler: Function): XeltoSS
	addEmbedMap(obj: object, keyHandlerMap: object): XeltoSS
	augmentKey(obj: object, akeyMap: object): XeltoSS
	argumentKeyMatch(orshift?: number, defval?: object, formatter?: Function): Function
	valToString(val: object): string
	findMethodInMaps(obj: object, key: string, method: Function, maps: Array<object>): object
	toCls(obj: object, clsname?: string, clssuper?: string, deflat?: boolean, polymaps?: object, reservedwordsmap?: object, emptify?: boolean): string
	ClsFactoryFromStringCls(clss: string): Function
	toClsFactory(obj: object, clsname?: string, clssuper?: string, deflat?: boolean, polymaps?: object, reservedwordsmap?: object, emptify?: boolean): Function
	toClsBlobScript(clss: string, prefix?: string, suffix?: string): HTMLElement
	toClsScript(clss: string, prefix?: string, suffix?: string): HTMLElement
	reconstruct(cls: Function, clsname?: string, clssuper?: string, deflat?: boolean, polymaps?: object, reservedwordsmap?: object, emptify?: boolean, useclsfactory?: boolean): Function
	autodestroy(obj?: object): boolean
	hybrid(escls: Function, protcls: Function, obj: object, swap?: boolean, polymaps?: object): XeltoSS
	xeltoss(cls: Function, clsname?: string, clssuper?: string, deflat?: boolean, polymaps?: object, reservedwordsmap?: object, emptify?: boolean, useclsfactory?: boolean): Function
	protoss(cls: Function): Function
	_constructor(): void
	_destructor(): void
}
interface XeltoSSStatic {
	__InitXeltoSSPrototypes: boolean;

	InitXeltoSSPrototypes(override?: boolean): XeltoSS
}
interface XeltoSSObject {
	superx(args: ProtoSSArgs, cargs: Array<object> | boolean, name?: string): object
	getSuperx(fn?: Function, name?: string): Array<object>
	ix(sfn: Function, fn?: Function, name?: string): boolean
}
interface XeltoSSFunction {
	xcoped(scope: object): Function
}