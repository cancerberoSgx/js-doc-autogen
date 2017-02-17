var shell = require('shelljs')
var ShortJsDoc = require('short-jsdoc')
var fs = require('fs')
var path = require('path')

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
	outputImplementation: 'ast',
	excludeNames: ['sudo.password']	
}
var buffer = docgen.main(config)
var s = '/*\n'+buffer.join('\n')+'\n*/'
var file = path.join('tmp', 'jsdocinput.js')
fs.writeFileSync(file, s)


ShortJsDoc.make({
    inputDirs: [file]
,   output: 'tmp/output-jsdocs'
,   projectMetadata: './package.json'
,   vendor: []
,	dontMinifyOutput: true
})