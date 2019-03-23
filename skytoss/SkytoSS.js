/**
 * Author: Zeta Ret, Ivo Yankulovski
 * Zeta Ret SkytoSS
 * ProtoSS GPU Acceleration and Web Workers
 * Requires: protoss.all.js
 * Version: 1.06
 * Date: 2018 - Today
 **/
window.internal(
function SkytoSS() {
	var o = this,
		a = arguments;
	o.skytossName = 'skytoss';
	o.mainPrefix = 'RTYPE FNAME(ARGS){';
	o.propDefault = '/* No Properties */';
	o.mainDefault = '/* SkytoSS GPU Compiler */';
	o.mainSuffix = '}';
	o.joinLine = '\n';
	o.attributeName = 'attribute';
	o.workerIds = {};
	o.gpuIds = {};
	o.defaultWorkerType = 'normal';
	o.glContextIds = ['webgl2', 'webgl', 'experimental-webgl'];
	o.expressionMap = new WeakMap();
	o.templates = {};
	o.debugGPU = false;
	o.gpuShaderLogHandler = null;
	o.autoDrawGPU = false;
	o.graviton = {};
	o.definitions = {};
	o.super(a);
	var m = {};
	m.getTemplate = function(id) {
		return o.templates[id] ? o.templates[id] : null;
	};
	m.setTemplate = function(id, handler) {
		o.templates[id] = handler;
		return o;
	};
	m.iterateTemplate = function(s1, s2, s3, expression) {
		var src = 'for(' + s1 + ';' + s2 + ';' + s3 + '){' + expression + '}';
		return src;
	};
	m.ifElseTemplate = function(conditions, elsebody) {
		var src = '',
			l = conditions.length,
			i;
		src += 'if(' + conditions[0][0] + '){' + conditions[0][1] + '}';
		for (i = 1; i < l; i++)
			src += 'else if(' + conditions[i][0] + '){' + conditions[i][1] + '}';
		if (elsebody) src += 'else {' + elsebody + '}';
		return src;
	};
	m.argsTemplate = function(args) {
		var obj = {},
			i, l = args.length,
			v, vspl;
		for (i = 0; i < l; i++) {
			v = args[i];
			vspl = v.split(' ');
			if (vspl.length > 1) obj[vspl[1]] = vspl[0];
			else obj[vspl[0]] = '';
		}
		return obj;
	};
	m.functionTemplate = function(name, returnType, args, props, main, prefix, suffix) {
		var src, k, v, propArr = [],
			jl = o.joinLine,
			fh;
		if (props) {
			for (k in props) {
				v = props[k];
				propArr.push((v.type ? v.type + ' ' : '') + k + (v.value !== undefined ? ' = ' + o.evalExpression(v.value) : '') + ';');
			}
		}
		fh = (prefix || o.mainPrefix).replace('RTYPE', returnType || 'void').replace('FNAME', name || 'main').replace('ARGS', args ? args.join(',') : '');
		src = [fh];
		if (propArr.length > 0) src.push(propArr.join(jl));
		else if (o.propDefault) src.push(o.propDefault);
		if (main) {
			if (main.constructor === String) src.push(main);
			else if (main.constructor === Array) src = src.concat(main);
		} else if (o.mainDefault) src.push(o.mainDefault);
		src.push(suffix || o.mainSuffix);
		return src.join(jl);
	};
	m.setExpressionMap = function(type, handler) {
		o.expressionMap[type] = handler;
		return o;
	};
	m.evalExpression = function(exp) {
		var t = exp.constructor;
		if (o.expressionMap[t]) return o.expressionMap[t](exp);
		return exp;
	};
	m.sourceTemplate = function(attr, mprops, main, functions, prepend, append) {
		var src = [],
			k, attrArr = [],
			v, jl = o.joinLine;
		if (prepend) src = src.concat(prepend);
		if (attr) {
			for (k in attr) {
				v = attr[k];
				attrArr.push((v.noattrname ? '' : (v.attrname || o.attributeName) + ' ') + v.type + ' ' + k + (v.value !== undefined ? ' = ' + o.evalExpression(v.value) : '') + ';');
			}
		}
		if (attrArr.length > 0) src.push(attrArr.join(jl));
		if (main || mprops) src.push(o.functionTemplate(null, null, null, mprops, main));
		if (functions) {
			for (k in functions) {
				v = functions[k];
				src.push(o.functionTemplate(k, v.rtype, v.args, v.props, v.main, v.prefix, v.suffix));
			}
		}
		if (append) src = src.concat(append);
		return src.join(jl);
	};
	m.seedTemplate = function(seed) {
		var s = {};
		s.SEED_CONST = 2147483647;
		s.TIME_CONST = 1034.256;
		s.NUMBER_SEED_CONST = 16807;
		s.OVERFLOW_CONST = 0;
		s.REAL_TIME = (new Date()).getTime();
		s.Seed = seed || 0;
		s.rCount = 0;
		s.rGetTime = ['floor(REAL_TIME / TIME_CONST)'];
		s.rGetInt = ['rCount+=1.0',
			'highp float left = Seed * NUMBER_SEED_CONST + OVERFLOW_CONST',
			'highp float right = SEED_CONST',
			'Seed = left - floor(left / right) * right',
			'Seed'
		];
		s.rGetNumber = ['rGetInt() / SEED_CONST'];
		s.rGetRange = ['rMin + (rMax - rMin) * rGetNumber()'];
		s.rGetMethod = ['rMethod(rGetRange(rMin, rMax))'];
		return s;
	};
	m.lineWrapper = function(line, noreturn, props) {
		var b = line.concat(),
			l = b.length - 1,
			k, w;
		if (!noreturn) b[l] = 'return ' + b[l];
		w = b.join(';\n') + ';';
		if (props) {
			for (k in props) w = w.split(k).join(props[k]);
		}
		return w;
	};
	m.gpuWrapRandomizer = function(seeder) {
		var a = {},
			f = {},
			m = [];
		a.Seed = {
			type: 'highp float',
			avalue: seeder.Seed.toFixed(1),
			attrname: 'varying'
		};
		a.rCount = {
			type: 'highp float',
			avalue: seeder.rCount.toFixed(1),
			attrname: 'varying'
		};
		a.SEED_CONST = {
			type: 'highp float',
			value: seeder.SEED_CONST.toFixed(1),
			attrname: 'const'
		};
		a.TIME_CONST = {
			type: 'highp float',
			value: seeder.TIME_CONST / 1000,
			attrname: 'const'
		};
		a.NUMBER_SEED_CONST = {
			type: 'highp float',
			value: seeder.NUMBER_SEED_CONST.toFixed(1),
			attrname: 'const'
		};
		a.OVERFLOW_CONST = {
			type: 'highp float',
			value: seeder.OVERFLOW_CONST.toFixed(1),
			attrname: 'const'
		};
		a.REAL_TIME = {
			type: 'highp float',
			value: seeder.REAL_TIME / 1000,
			attrname: 'const'
		};
		f.rGetTime = {
			rtype: 'highp float',
			main: o.lineWrapper(seeder.rGetTime)
		};
		f.rGetInt = {
			rtype: 'highp float',
			main: o.lineWrapper(seeder.rGetInt)
		};
		f.rGetNumber = {
			rtype: 'highp float',
			main: o.lineWrapper(seeder.rGetNumber)
		};
		f.rGetRange = {
			rtype: 'highp float',
			main: o.lineWrapper(seeder.rGetRange),
			args: ['float rMin', 'float rMax']
		};
		f.rGetFloor = {
			rtype: 'highp float',
			main: o.lineWrapper(seeder.rGetMethod, false, {
				'rMethod': 'floor'
			}),
			args: ['float rMin', 'float rMax']
		};
		f.rGetCeil = {
			rtype: 'highp float',
			main: o.lineWrapper(seeder.rGetMethod, false, {
				'rMethod': 'ceil'
			}),
			args: ['float rMin', 'float rMax']
		};
		m.push('Seed=' + seeder.Seed.toFixed(1) + ';');
		m.push('rCount=' + seeder.rCount.toFixed(1) + ';');
		return {
			attr: a,
			code: o.sourceTemplate(a, null, null, f),
			main: m
		};
	};
	m.gpuShader = function(gpu, source, type) {
		var shader = gpu.createShader(type);
		gpu.shaderSource(shader, source);
		gpu.compileShader(shader);
		if (o.debugGPU) console.log(gpu, source, type, shader);
		if (!gpu.getShaderParameter(shader, gpu.COMPILE_STATUS)) {
			if (o.gpuShaderLogHandler) o.gpuShaderLogHandler(gpu.getShaderInfoLog(shader), shader, o);
			shader = null;
		}
		return shader;
	};
	m.gpuBuffer = function(gpu, bufferdata, target, type, usage) {
		var buffer = bufferdata.buffer || gpu.createBuffer(),
			bft;
		if (!target) target = gpu.ARRAY_BUFFER;
		if (!type) type = Float32Array;
		if (!usage) usage = gpu.STATIC_DRAW;
		gpu.bindBuffer(target, buffer);
		bft = bufferdata.typed || new type(bufferdata);
		if (!bufferdata.nocache) {
			bufferdata.typed = bft;
			bufferdata.buffer = buffer;
		}
		gpu.bufferData(target, bft, usage);
		return buffer;
	};
	m.gpuPreProgrammer = function(gpu, gpuData, id, settings, bufferData) {
		var k, loc, bvk, bfd, v;
		if (bufferData) {
			for (k in bufferData) {
				bfd = bufferData[k];
				bfd.buffer = o.gpuBuffer(gpu, bfd.data, bfd.target, bfd.type, bfd.usage);
				if (!bfd.noloc && !bfd.loc) {
					loc = gpu.getAttribLocation(gpuData.program, k);
					bfd.loc = loc;
					gpu.vertexAttribPointer(loc, bfd.size, bfd.dataType || gpu.FLOAT, bfd.normalized || false, bfd.stride || 0, bfd.offset || 0);
					if (bvk = bfd.vector)
						gpu["vertexAttrib" + bvk.length + "fv"](loc, bvk);
					gpu.enableVertexAttribArray(loc);
				}
				if (o.debugGPU) console.log('buf', k, bfd, gpu, gpuData, id, settings);
			}
		}
		if (settings && settings.attributes) {
			for (k in settings.attributes) {
				v = settings.attributes[k];
				loc = v.loc || gpu.getAttribLocation(gpuData.program, k);
				v.loc = loc;
				if (v.avalue.constructor === Number) gpu.vertexAttrib1f(loc, v.avalue);
				else gpu["vertexAttrib" + v.avalue.length + "fv"](loc, v.avalue);
				if (o.debugGPU) console.log('attr', k, v, gpu, gpuData, id, settings);
			}
		}
	};
	m.gpuPreProgrammer._p = 1;
	m.gpuProgrammer = function(gpu, gpuData, id, settings) {
		var k, loc, v, method = settings.drawMethod || 'drawArrays',
			drawArgs = settings.drawArgs || [gpu.POINTS, 0, settings.drawCount || (0xff * 0xff)];
		if (settings && settings.uniform) {
			if (!settings.uniformLoc) settings.uniformLoc = {};
			for (k in settings.uniform) {
				v = settings.uniform[k];
				loc = settings.uniformLoc[k] || gpu.getUniformLocation(gpuData.program, k);
				settings.uniformLoc[k] = loc;
				if (v.matrix) gpu["uniformMatrix" + v.num + "fv"](loc, v.transpose, v.value);
				else if (v.int) {
					if (v.value.constructor === Number) gpu["uniform1i"](loc, v.value);
					else gpu["uniform" + v.value.length + "iv"](loc, v.value);
				} else if (v.float) {
					if (v.value.constructor === Number) gpu["uniform1f"](loc, v.value);
					else gpu["uniform" + v.value.length + "fv"](loc, v.value);
				}
				if (o.debugGPU) console.log('uni', k, v, gpu, gpuData, id, settings);
			}
		}
		gpu[method].apply(gpu, drawArgs);
	};
	m.gpuProgrammer._p = 1;
	m.newGPU = function(sourcev, sourcef, id, options, width, height) {
		var gpu, i, canvas;
		canvas = document.createElement('canvas');
		canvas.width = width || 0xff;
		canvas.height = height || 0xff;
		for (i = 0; i < o.glContextIds.length; i++) {
			gpu = canvas.getContext(o.glContextIds[i], options);
			if (gpu) {
				gpu.contextType = o.glContextIds[i];
				break;
			}
		}
		return o.addGPU(gpu, sourcev, sourcef, id);
	};
	m.addGPU = function(gpu, sourcev, sourcef, id) {
		var gpuData = {},
			program;
		if (!id) id = o.rndstr(17);
		if (gpu) {
			gpuData.shaderv = o.gpuShader(gpu, sourcev, gpu.VERTEX_SHADER);
			gpuData.shaderf = o.gpuShader(gpu, sourcef, gpu.FRAGMENT_SHADER);
			program = gpu.createProgram();
			if (gpuData.shaderv) gpu.attachShader(program, gpuData.shaderv);
			if (gpuData.shaderf) gpu.attachShader(program, gpuData.shaderf);
			gpu.linkProgram(program);
		}
		gpuData.id = id;
		gpuData.gpu = gpu;
		gpuData.program = program;
		o.gpuIds[id] = gpuData;
		return id;
	};
	m.getGPU = function(id) {
		return o.gpuIds[id];
	};
	m.useGPU = function(id, handler, settings, bufferData, readBufferType, glPreProgrammer, glProgrammer, glClear) {
		var gpuData = o.gpuIds[id];
		if (gpuData) {
			if (gpuData.gpu && gpuData.program) {
				var p, gl = gpuData.gpu,
					s = settings || {};
				if (glClear) glClear(gl, gpuData, id, s);
				else if (o.autoDrawGPU) gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
				gpuData.bufferData = bufferData;
				if (glPreProgrammer) glPreProgrammer(gl, gpuData, id, s, bufferData);
				else if (o.autoDrawGPU) gl.enableVertexAttribArray(0);
				gl.useProgram(gpuData.program);
				if (glProgrammer) glProgrammer(gl, gpuData, id, s);
				else if (o.autoDrawGPU) gl.drawArrays(gl.POINTS, 0, 1);
				if (!readBufferType) readBufferType = Uint8Array;
				if (handler) {
					p = new readBufferType(gl.drawingBufferWidth * gl.drawingBufferHeight * (s.bufferCellSize || 4));
					gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, s.readFormat || gl.RGBA, s.readType || gl.UNSIGNED_BYTE, p);
					handler(p, gpuData, id);
				}
			}
			return true;
		}
		return false;
	};
	m.clearGPUBuffer = function(id) {
		var gpuData = o.gpuIds[id],
			bfd, k;
		if (gpuData && (bfd = gpuData.bufferData)) {
			for (k in bfd) {
				if (bfd[k].buffer) {
					try {
						gpuData.gpu.deleteBuffer(bfd[k].buffer);
					} catch (e) {}
				}
			}
			return true;
		}
		return false;
	};
	m.deleteGPU = function(id) {
		var gpuData = o.gpuIds[id];
		if (gpuData) {
			delete o.gpuIds[id];
			try {
				gpuData.gpu.detachShader(gpuData.program, gpuData.shaderv);
			} catch (e) {}
			try {
				gpuData.gpu.deleteShader(gpuData.shaderv);
			} catch (e) {}
			try {
				gpuData.gpu.detachShader(gpuData.program, gpuData.shaderf);
			} catch (e) {}
			try {
				gpuData.gpu.deleteShader(gpuData.shaderf);
			} catch (e) {}
			try {
				gpuData.gpu.deleteProgram(gpuData.program);
			} catch (e) {}
			return true;
		}
		return false;
	};
	m.gpuProperty = function(value, type) {
		var p = {
			value: value
		};
		if (type !== undefined) p.type = type;
		return p;
	};
	m.gpuAttribute = function(type, value, attrname, noattrname, loc) {
		var a = {
			type: type
		};
		if (value !== undefined) a.value = value;
		if (attrname !== undefined) a.attrname = attrname;
		if (noattrname !== undefined) a.noattrname = noattrname;
		if (loc !== undefined) a.loc = loc;
		return a;
	};
	m.gpuFunction = function(rtype, args, props, main, prefix, suffix) {
		var f = {};
		if (rtype !== undefined) f.rtype = rtype;
		if (args !== undefined) f.rtype = args;
		if (props !== undefined) f.rtype = props;
		if (main !== undefined) f.rtype = main;
		if (prefix !== undefined) f.rtype = prefix;
		if (suffix !== undefined) f.rtype = suffix;
		return f;
	};
	m.gpuUniform = function(value, int) {
		var u = {
			value: value
		};
		if (int) u.int = true;
		else u.float = true;
		return u;
	};
	m.gpuUniformMatrix = function(value, num, transpose) {
		var u = {
			value: value,
			matrix: true,
			num: num,
			transpose: transpose || false
		};
		return u;
	};
	m.gpuBufferData = function(data, size, target, type, usage, dataType, vector, buffer, noloc, loc, normalized, stride, offset) {
		var bfd = {
			data: data,
			size: size
		};
		if (target !== undefined) bfd.target = target;
		if (type !== undefined) bfd.type = type;
		if (usage !== undefined) bfd.usage = usage;
		if (dataType !== undefined) bfd.dataType = dataType;
		if (vector !== undefined) bfd.vector = vector;
		if (buffer !== undefined) bfd.buffer = buffer;
		if (noloc !== undefined) bfd.noloc = noloc;
		if (loc !== undefined) bfd.loc = loc;
		if (normalized !== undefined) bfd.normalized = normalized;
		if (stride !== undefined) bfd.stride = stride;
		if (offset !== undefined) bfd.offset = offset;
		return bfd;
	};
	m.gpuSettings = function(uniform, drawMethod, drawArgs, drawCount, bufferCellSize, readFormat, readType) {
		var s = {};
		if (uniform !== undefined) {
			s.uniform = uniform;
			s.uniformLoc = {};
		}
		if (bufferCellSize !== undefined) s.bufferCellSize = bufferCellSize;
		if (readFormat !== undefined) s.readFormat = readFormat;
		if (readType !== undefined) s.readType = readType;
		if (drawMethod !== undefined) s.drawMethod = drawMethod;
		if (drawArgs !== undefined) s.drawArgs = drawArgs;
		if (drawCount !== undefined) s.drawCount = drawCount;
		return s;
	};
	m.newWorker = function(src, id, type, options, srcurl) {
		var w, b, u;
		if (!id) id = o.rndstr(17);
		if (!type) type = o.defaultWorkerType;
		if (!srcurl) {
			b = new Blob([src], {
				type: 'application/javascript'
			});
			u = URL.createObjectURL(b);
		} else {
			u = src;
		}
		if (type === SkytoSS.WORKERS.SHARED) {
			w = new SharedWorker(u, options);
			w.port.start();
		} else {
			w = new Worker(u, options);
		}
		o.workerIds[id] = w;
		return id;
	};
	m.getWorker = function(id) {
		return o.workerIds[id];
	};
	m.commandWorker = function(id, command, data, transfer) {
		var w = o.workerIds[id];
		if (w) {
			var pm = {
				command: command,
				target: o.skytossName,
				data: data
			};
			if (w.constructor === Worker) w.postMessage(pm, transfer);
			else if (w.constructor === SharedWorker) w.port.post(pm, transfer);
			return true;
		}
		return false;
	};
	m.deleteWorker = function(id) {
		var w = o.workerIds[id];
		if (w) {
			delete o.workerIds[id];
			try {
				var pm = {
					command: 'terminate',
					target: o.skytossName
				};
				if (w.constructor === Worker) {
					w.postMessage(pm);
					w.terminate();
				} else if (w.constructor === SharedWorker) {
					w.port.postMessage(pm);
					w.port.close();
				}
			} catch (e) {}
			return true;
		}
		return false;
	};
	o.superize(a, m, true, true);
	return o;
});
SkytoSS.TEMPLATES = {
	ITERATE: 'iterate',
	IF_ELSE: 'ifElse',
	ARGS: 'args',
	FUNCTION: 'function',
	SOURCE: 'source',
	LINE: 'line',
	SEED: 'seed'
};
SkytoSS.WORKERS = {
	SHARED: 'shared',
	NORMAL: 'normal'
};
SkytoSS.__InitSkytoSSPrototypes = false;
SkytoSS.InitSkytoSSPrototypes = function(override) {
	if (!override && SkytoSS.__InitSkytoSSPrototypes) return SkytoSS;
	SkytoSS.__InitSkytoSSPrototypes = true;
	var oprot = Object.prototype,
		odef = Object.defineProperty,
		ef = {
			enumerable: false
		};
	oprot.const = function(key, value) {
		Object.defineProperty(this, key, {
			enumerable: false,
			get: function() {
				return value;
			},
			set: function(v) {
				throw new TypeError('Assignment to constant variable.');
			}
		});
		return value;
	};
	odef(oprot, 'const', ef);
	oprot.constMap = function(value) {
		var k, o = this;
		for (k in value) {
			(function(k) {
				Object.defineProperty(o, k, {
					enumerable: false,
					get: function() {
						return value[k];
					},
					set: function(v) {
						throw new TypeError('Assignment to constant variable.');
					}
				});
			})(k);
		}
		return value;
	};
	odef(oprot, 'constMap', ef);
	oprot.shell = function(keys) {
		var l = keys.length,
			s = {},
			i, t = this,
			k;
		for (i = 0; i < l; i++) {
			k = keys[i];
			s[k] = t[k].constructor;
		}
		return s;
	};
	odef(oprot, 'shell', ef);
	oprot.ys = function(shell, dome) {
		if (!dome) dome = this;
		var s = dome.shell,
			h = dome.holes,
			k, sk, sc;
		for (k in h)
			if (shell[k] !== undefined) return false;
		for (k in s) {
			sc = s[k];
			sk = shell[k];
			if (sk === undefined || sk === null || (sk.constructor !== sc && !(sk instanceof sc) && !sk.is(sc))) return false;
		}
		return true;
	};
	odef(oprot, 'ys', ef);
	oprot.skydome = function(name, id, shell, holes, scope) {
		if (!scope) scope = this;
		scope = scope.package(name);
		var dome = {
			name: id || 'Skydome',
			type: 'skytoss_shell',
			shell: shell || {},
			holes: holes || {}
		};
		scope.internal(dome);
		return dome;
	};
	odef(oprot, 'skydome', ef);
	oprot.deepsky = function(keyreg, depth, shell, scope, toppack) {
		var q = [],
			k, v, vc;
		if (!scope) scope = this;
		if (!toppack) toppack = window;
		for (k in scope) {
			v = scope[k];
			try {
				vc = v.constructor;
			} catch (e) {
				continue;
			}
			if (vc === Object) {
				if (v.__name && toppack.package(v.__name) === v) {
					if (depth > 0) q = q.concat(v.deepsky(keyreg, depth - 1, shell, v, toppack));
					else continue;
				} else if (keyreg.test(k) && (!shell || shell.ys(v))) q.push(v);
			} else if (typeof v === 'object') {
				if (keyreg.test(k) && (!shell || shell.ys(v))) q.push(v);
			}
		}
		return q;
	};
	odef(oprot, 'deepsky', ef);
	return SkytoSS;
};