/**
 * Author: Zeta Ret
 * ProtoSS Node Module.
 * Version: 1.00
 * Date: 2019 - Today
 **/

var fs = require('fs'),
	vm = require('vm');

var protossXFiles = [
	'protoss/protoss.node.cheese.js',
	'protoss/protoss.book.of.cheese.js',
	'protoss/protoss.all.js',
	'protoss/protoss/ProtoSS.js',
	'protoss/xeltoss/XeltoSS.js',
	'protoss/skytoss/SkytoSS.js',
];

function loadExternals(jsfiles) {
	var i, c;
	for (i = 0; i < jsfiles.length; i++) {
		c = fs.readFileSync(jsfiles[i]);
		vm.runInThisContext(c);
	}
}

function protossDefaultInit() {
	loadExternals(protossXFiles);
}

module.exports.vm = vm;
module.exports.protossXFiles = protossXFiles;
module.exports.loadExternals = loadExternals;
module.exports.protossDefaultInit = protossDefaultInit;
