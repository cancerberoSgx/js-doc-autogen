var shell = require('shelljs')
var ShortJsDoc = require('short-jsdoc')
var fs = require('fs')
var path = require('path')
var docgen = require('../src')

shell.rm('-rf', 'tmp')
shell.mkdir('tmp')
var context = {
	first: {
		hello: 'world', fn: function(){}, 
		anObject: {
			foo: '0who',
			method1: function(averygoodparameter){},
			sudo: {password: function(){}}
		}
	},
	fs: require('fs')
}
var config = {
	target: context,
	outputImplementation: 'shortjsdoc',
	excludeNames: ['sudo.password']	
}
var buffer = docgen.main(config)
var s = '/*\n'+buffer.join('\n')+'\n*/'
var file = path.join('tmp', 'jsdocinput.js')
fs.writeFileSync(file, s)



shell.rm('-rf', 'tmp/output-jsdocs')
// ShortJsDoc.make({
//     input: [file]
// ,   output: 'tmp/output-jsdocs'
// ,   projectMetadata: './package.json'
// ,   vendor: []
// ,	dontMinifyOutput: true
// })


// var ShortJsDoc = require('../..')
var config = {
	input: [file],
	output: 'test_tmp_output',
	projectMetadata: {},
	vendor: []
	// ,
	// dontMinifyOutput: true
}
ShortJsDoc.make(config)
		// var error = false

		// try 
		// {
			
		// }
		// catch(ex)
		// {
		// 	error = true
		// }