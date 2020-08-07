interface SkytoSSCTOR {
	new(): SkytoSS
}
interface SkytoSS {
	skytossName: string;
	mainPrefix: string;
	propDefault: string;
	mainDefault: string;
	mainSuffix: string;
	joinLine: string;
	attributeName: string;
	workerIds: object;
	gpuIds: object;
	defaultWorkerType: string;
	glContextIds: Array<object>;
	expressionMap: WeakMap<object, object>;
	templates: object;
	debugGPU: boolean;
	gpuShaderLogHandler: Function;
	autoDrawGPU: boolean;
	graviton: object;
	definitions: object;

	getTemplate(id: string): Function
	setTemplate(id: string, handler: Function): SkytoSS
	iterateTemplate(s1: string, s2: string, s3: string, expression: string): string
	ifElseTemplate(conditions: Array<object>, elsebody?: string): string
	argsTemplate(args: Array<object>): string
	functionTemplate(name?: string, returnType?: string, args?: Array<object>, props?: object, main?: string | Array<object>, prefix?: string, suffix?: string): string
	setExpressionMap(type: Function, handler: Function): SkytoSS
	evalExpression(exp: object): object
	sourceTemplate(attr?: object, mprops?: object, main?: string | Array<object>, functions?: object, prepend?: string | Array<object>, append?: string | Array<object>): string
	seedTemplate(seed?: number): object
	lineWrapper(line: Array<object>, noreturn?: boolean, props?: object): string
	gpuWrapRandomizer(seeder: object): object
	gpuShader(gpu: WebGLRenderingContext, source: string, type: number): WebGLShader
	gpuBuffer(gpu: WebGLRenderingContext, bufferdata: Array<object>, target?: number, type?: ArrayBufferView, usage?: number): WebGLBuffer
	gpuPreProgrammer(gpu: WebGLRenderingContext, gpuData: object, id: string, settings: object, bufferData: object): void
	gpuProgrammer(gpu: WebGLRenderingContext, gpuData: object, id: string, settings: object): void
	newGPU(sourcev: string, sourcef: string, id?: string, options?: object, width?: number, height?: number): string
	addGPU(gpu: WebGLRenderingContext, sourcev: string, sourcef: string, id?: string): string
	getGPU(id: string): object
	useGPU(id: string, handler?: Function, settings?: object, bufferData?: object, readBufferType?: ArrayBufferView, glPreProgrammer?: Function, glProgrammer?: Function, glClear?: Function): boolean
	clearGPUBuffer(id: string): boolean
	deleteGPU(id: string): boolean
	gpuProperty(value: string, type?: string): object
	gpuAttribute(type: string, value?: string, attrname?: string, noattrname?: boolean, loc?: object): object
	gpuFunction(rtype?: string, args?: Array<object>, props?: object, main?: string | Array<object>, prefix?: string, suffix?: string): object
	gpuUniform(value: string, int?: boolean): object
	gpuUniformMatrix(value: string, num: number, transpose?: boolean): object
	gpuBufferData(data: Array<object>, size: number, target?: number, type?: ArrayBufferView, usage?: number, dataType?: number, vector?: ArrayBufferView, buffer?: WebGLBuffer, noloc?: boolean, loc?: object, normalized?: boolean, stride?: number, offset?: number): object
	gpuSettings(uniform?: object, drawMethod?: Function, drawArgs?: Array<object>, drawCount?: number, bufferCellSize?: number, readFormat?: number, readType?: number): object
	newWorker(src: string, id?: string, type?: string, options?: object, srcurl?: boolean): string
	getWorker(id: string): Worker
	commandWorker(id: string, command: string, data?: object, transfer?: Array<object>): boolean
	deleteWorker(id: string): boolean
}
interface SkytoSSStatic {
	TEMPLATES: object;
	WORKERS: object;
	__InitSkytoSSPrototypes: boolean;

	InitSkytoSSPrototypes(override?: boolean): SkytoSS
}
interface SkytoSSObject {
	const(key: string, value: object): object
	constMap(value: object): object
	shell(keys: Array<object>): object
	ys(shell: object, dome: object): boolean
	skydome(name: string, id: string, shell?: object, holes?: object, scope?: object): object
	deepsky(keyreg: RegExp, depth?: number, shell?: object, scope?: object, toppack?: object): Array<object>
}