
//TODO: use the same property iterator as in rhino - we are missing some globals!!!

/*
#HOW TO RUN

	browserify -t engify src/nashorn1.js > output.js; jjs output.js
*/

// dump globals doc gen for nashorn

var docgen = require('../../..')

var _ = require('underscore')

var nashorn = {}

var keys = Object.getOwnPropertyNames(_GLOBAL)
_.each(keys, function(k){nashorn[k]=_GLOBAL[k]})

var context = {
	nashorn: nashorn,
	foo:{bar: 'string'}
}

var config = {
	target: context,
	mainModule: 'thino',
	outputImplementation: 'shortjsdoc',
	handleCycles: true
}


docgen.main(config)
var jsdoc = config.buffer.join('\n')
jsdoc = '/*\n'+jsdoc+'\n*/'
console.log(jsdoc)





// console.log(Object.getOwnPropertyNames(_GLOBAL).join('\', \''))


// var docgen = require('../../..')
// var _ = require('underscore')


// var rhino = {}

// //heads up - for some reason we have to exclude the global 'Script' and others
// var keys = Object.getOwnPropertyNames(_GLOBAL)
// keys = _.difference(keys, ['Script', '_GLOBAL', 'window'])

// _.each(keys, function(k){rhino[k]=_GLOBAL[k]})
// var context = {
// 	rhino: rhino
// }

// var config = {
// 	target: context,
// 	mainModule: 'thino',
// 	outputImplementation: 'shortjsdoc',
// 	handleCycles: true
// }


// var rhinoObjectPropertyIterator = function(object, fn)
// {
// 	var keys = Object.getOwnPropertyNames(object)
// 	// console.log(keys.join('", "'))
// 	_.each(keys, function(key) 
// 	{
// 		var value = object[key]
// 		fn(key, value)
// 	})
// }


// docgen.metadata.setObjectPropertiesIterator(rhinoObjectPropertyIterator)

// docgen.main(config)
// var jsdoc = config.buffer.join('\n')
// jsdoc = '/*\n'+jsdoc+'\n*/'
// console.log(jsdoc)


