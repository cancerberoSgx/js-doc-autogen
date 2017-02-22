/*
#HOW TO RUN

	rm output.js; browserify -t engify src/rhino1.js > output.js; rhino output.js 
	
*/

var docgen = require('../../..')
var _ = require('underscore')


var rhino = {}

//heads up - for some reason we have to exclude the global 'Script' and others
var keys = Object.getOwnPropertyNames(_GLOBAL)
keys = _.difference(keys, ['Script', '_GLOBAL', 'window'])

_.each(keys, function(k){rhino[k]=_GLOBAL[k]})
var context = {
	rhino: rhino
}

var config = {
	target: context,
	mainModule: 'thino',
	outputImplementation: 'shortjsdoc',
	handleCycles: true
}


var rhinoObjectPropertyIterator = function(object, fn)
{
	var keys = Object.getOwnPropertyNames(object)
	// console.log(keys.join('", "'))
	_.each(keys, function(key) 
	{
		var value = object[key]
		fn(key, value)
	})
}
docgen.metadata.setObjectPropertiesIterator(rhinoObjectPropertyIterator)

docgen.main(config)
var jsdoc = config.buffer.join('\n')
jsdoc = '/*\n'+jsdoc+'\n*/'
console.log(jsdoc)

// var keys = [
// 	'Function', 'Object', 'Error', 'CallSite', 'decodeURI', 'decodeURIComponent', 'encodeURI',

// 	'encodeURIComponent', 'escape', 'eval', 'isFinite', 'isNaN', 'isXMLName', 'parseFloat', 'parseInt', 'unescape', 
// 	'uneval', 'NaN', 'Infinity', 'undefined', 'EvalError', 'RangeError', 'ReferenceError', 'SyntaxError', 'TypeError', 
// 	'URIError', 'InternalError', 'JavaException', 'Array', 'String', 'Boolean', 'Number', 'Date', 'Math', 'JSON', 'With', 
// 	'Call', 
// 	// 'Script', 
// 	'Iterator', 'StopIteration', 'RegExp', 
// 	'Continuation', 'XML', 'XMLList', 'Namespace', 'QName', 
// 	'ArrayBuffer', 'Int8Array', 'Uint8Array', 'Uint8ClampedArray', 'Int16Array', 'Uint16Array', 'Int32Array', 'Uint32Array', 
// 	'Float32Array', 'Float64Array', 'DataView', 'Packages', 'getClass', 'JavaAdapter', 'JavaImporter', 'java', 'javax', 
// 	'org', 'com', 'edu', 'net', 
// 	'global', 
// 	'defineClass', 'deserialize', 'doctest', 'gc', 'help', 'load', 'loadClass', 
// 	'print', 'quit', 'readline', 'readFile', 'readUrl', 'runCommand', 'seal', 'serialize', 'spawn', 'sync', 'toint32', 
// 	'version', 'write', 'Environment', 'environment', 'history', 'arguments', 'tool',
// 	// '_GLOBAL', 
// 	// 'window', 
// 	'engifyTool', 
// 	'console', 'globalThis', 'excludeNames_', '_visitMaxCount', '_visitCount', 

// 	'importClass', 'importPackage'
// ]

// _.each(_.without(_.keys(_GLOBAL), 'Script'), function(k){rhino[k]=_GLOBAL[k]})