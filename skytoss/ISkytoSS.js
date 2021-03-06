window.package("zetaret.global.packages.protoss.skytoss").ISkytoSS = {
	getTemplate: [String],
	setTemplate: [String, Function],
	iterateTemplate: [String, String, String, String],
	ifElseTemplate: [Array, String],
	argsTemplate: [Array],
	functionTemplate: [String, String, Array, Object, [String, Array], String, String],
	setExpressionMap: [Function, Function],
	evalExpression: [Object],
	sourceTemplate: [Object, Object, [String, Array], Object, [String, Array],
		[String, Array]
	],
	seedTemplate: [Number],
	lineWrapper: [Array, Boolean, Object],
	gpuWrapRandomizer: [Object],
	gpuShader: [WebGLRenderingContext, String, Number],
	gpuBuffer: [WebGLRenderingContext, Array, Number, ArrayBufferView, Number],
	gpuPreProgrammer: [WebGLRenderingContext, Object, String, Object, Object],
	gpuProgrammer: [WebGLRenderingContext, Object, String, Object],
	newGPU: [String, String, String, Object, Number, Number],
	addGPU: [WebGLRenderingContext, String, String, String],
	getGPU: [String],
	useGPU: [String, Function, Object, Object, ArrayBufferView, Function, Function, Function],
	clearGPUBuffer: [String],
	deleteGPU: [String],
	gpuProperty: [String, String],
	gpuAttribute: [String, String, String, Boolean, Object],
	gpuFunction: [String, Array, Object, String | Array, String, String],
	gpuUniform: [String, Boolean],
	gpuUniformMatrix: [String, Number, Boolean],
	gpuBufferData: [Array, Number, Number, ArrayBufferView, Number, Number, ArrayBufferView, WebGLBuffer, Boolean, Object, Boolean, Number, Number],
	gpuSettings: [Object, Function, Array, Number, Number, Number, Number],
	newWorker: [String, String, String, Object, Boolean],
	getWorker: [String],
	commandWorker: [String, String, Object, Array],
	deleteWorker: [String]
};