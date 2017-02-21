/*
#HOW TO RUN

	browserify -t engify src/ > output.js; rhino output.js
*/

var docgen = require('../../..')
// require('../../../src/output-shortjsdoc')

var _ = require('underscore')
// console.log(JSON.stringify(_.keys(java)))


var myGlobal = {}

//heads up - for some reason we have to exclude the global 'Script'
var keys = [
	'Function', 'Object', 'Error', 'CallSite', 'decodeURI', 'decodeURIComponent', 'encodeURI',

	'encodeURIComponent', 'escape', 'eval', 'isFinite', 'isNaN', 'isXMLName', 'parseFloat', 'parseInt', 'unescape', 
	'uneval', 'NaN', 'Infinity', 'undefined', 'EvalError', 'RangeError', 'ReferenceError', 'SyntaxError', 'TypeError', 
	'URIError', 'InternalError', 'JavaException', 'Array', 'String', 'Boolean', 'Number', 'Date', 'Math', 'JSON', 'With', 
	'Call', 
	'Script', 
	'Iterator', 'StopIteration', 'RegExp', 
	'Continuation', 'XML', 'XMLList', 'Namespace', 'QName', 
	'ArrayBuffer', 'Int8Array', 'Uint8Array', 'Uint8ClampedArray', 'Int16Array', 'Uint16Array', 'Int32Array', 'Uint32Array', 
	'Float32Array', 'Float64Array', 'DataView', 'Packages', 'getClass', 'JavaAdapter', 'JavaImporter', 'java', 'javax', 
	'org', 'com', 'edu', 'net', 
	'global', 
	'defineClass', 'deserialize', 'doctest', 'gc', 'help', 'load', 'loadClass', 
	'print', 'quit', 'readline', 'readFile', 'readUrl', 'runCommand', 'seal', 'serialize', 'spawn', 'sync', 'toint32', 
	'version', 'write', 'Environment', 'environment', 'history', 'arguments', 'tool',
	 // '_GLOBAL', 'window', 'engifyTool', 
	// 'console', 'globalThis', 'excludeNames_', '_visitMaxCount', '_visitCount', 

	'importClass', 'importPackage'
]
_.each(keys, function(k){myGlobal[k]=_GLOBAL[k]})

// _.each(_.without(_.keys(_GLOBAL), 'Script'), function(k){myGlobal[k]=_GLOBAL[k]})
var context = {
	// foo: {p: 9},
	// java: java
	// ,
	// rhino: _GLOBAL
	rhino: myGlobal
}

var config = {
	target: context,
	mainModule: 'thino',
	outputImplementation: 'shortjsdoc',
	// excludeNames: ['document.doctype']
	// ,visitMaxCount: 1000
	// ,levelMax: 4
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


// console.log(Object.getOwnPropertyNames(_GLOBAL).join(', ')+'0000')




// console.log(typeof(java.lang), typeof(java.lang.String))//JSON.stringify(docgen.metadata.getJsObjectMetadata(java.lang.String)))

// console.log(
// docgen.metadata.getJsObjectMetadata(java.lang.String).type
// + ' - ' + 
// docgen.metadata.getJsObjectMetadata(java.lang).type
// )


// var config2 = _.extend(_.clone(config), {outputImplementation: 'ast'})
// docgen.main(config2)
// var ast = config2.astOutput
// console.log(JSON.stringify(ast, 0, 2))

// var o = java.lang.String
// console.log(_.map(_.keys(o), function(k){return k + ' - ' + typeof(o[k])}).join(', '))



// var keysWithCustomIterator = function(object)
// {
// 	var keys = []
// 	rhinoObjectPropertyIterator(object, function(key)
// 	{
// 		keys.push(key)
// 	})
// 	return keys
// }

// console.log(JSON.stringify(keysWithCustomIterator(java.lang)))

 // console.log(JSON.stringify(_.keys(java.lang)))



 // var rhinoObjectPropertyIterator = function(object, fn)
// {
// 	var keys

// 	try
// 	{
// 		keys = Object.getOwnPropertyNames(object)  //  _.keys(object)
// 	}
// 	catch(ex)
// 	{
// 		console.log('Error extracting keys')
// 	}
// 	// console.log((keys||[]).join(', '))
// 	_.each(keys, function(key) 
// 	{
// 		var value
// 		try
// 		{
// 			value = object[key]
// 		}
// 		catch(ex)
// 		{
// 			console.log('Error accessing value')
// 		}
// 		try
// 		{
// 			fn(key, value)
// 		}
// 		catch(ex)
// 		{
// 			console.log('Error calling callback: '+ex)
// 		}
// 	})
// }