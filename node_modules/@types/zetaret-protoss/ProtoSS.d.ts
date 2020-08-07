interface ProtoSSCTOR {
	new(): ProtoSS
}
interface ProtoSS {
	autoImplement: boolean;
	autoSuper: boolean;
	autoSuperList: boolean;
	autoSuperList2: boolean;
	errorData: object;
	debug: Function;

	toInterface(i: object, pack?: object): object
	stringPattern(pat: string, str: string, pos?: number): Array<object>
	getSuperCls(sname: string, toppack: object, path?: string): Function
	resolveCls(s: object, toppack?: object, path?: string): ProtoSS
	resolveHeaders(toppack?: object, path?: string): ProtoSS
}
interface ProtoSSStatic {
	headerImplement: Array<object>;
	headerSuper: Array<object>;
	headerSuperList: Array<object>;
	headerSuperList2: Array<object>;
	stringmap: object;

	eventProps(event: object, props: Array<object>): object
	staticProps(stat: object, props: object): object
	getDefinitionByName(sname: string, toppack?: object): Function
}