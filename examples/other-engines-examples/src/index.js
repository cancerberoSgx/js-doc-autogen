var docgen = require('../../..')
// require('../../../src/output-shortjsdoc')

var _ = require('underscore')
console.log(JSON.stringify(_.keys(java)))

var context = {
	foo: {p: 9},
	java: java
}

var config = {
	target: context,
	mainModule: 'thino',
	outputImplementation: 'shortjsdoc',
	// excludeNames: ['document.doctype']
	// ,visitMaxCount: 1000
	// ,levelMax: 4
}

docgen.setObjectPropertiesIterator(function(object, fn)
{
	// console.log('here12122')

	// console.log('here? '+ _.keys(object).join(','))
	// var arr = ['a','b']
	// _.each( arr, function(key) 
	// {
	// 	var value = 2//object[key]
	// 	fn(key, value)
	// })
	_.each( _.keys(object), function(key) 
	{
		var value = object[key]
		fn(key, value)
	})
})

var buffer = docgen.main(config)
var jsdoc = buffer.join('\n')
jsdoc = '/*\n'+jsdoc+'\n*/'
console.log(jsdoc)