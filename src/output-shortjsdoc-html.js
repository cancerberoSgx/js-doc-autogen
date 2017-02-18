var shell = require('shelljs')
var ShortJsDoc = require('short-jsdoc')
var fs = require('fs')
var path = require('path')
var docgen = require('.')

module.exports = {
	generate: function(config)
	{
		var config2 = {
			target: config.target,
			outputImplementation: 'shortjsdoc',
			excludeNames: ['sudo.password']	
		}
		var buffer = docgen.main(config2)
		var s = '/*\n'+buffer.join('\n')+'\n*/'
		var outputFolder = config.outputFolder || 'tmp'
		shell.rm('-rf', outputFolder)
		shell.mkdir(outputFolder)
		var file = path.join(outputFolder, 'jsdocinput.js')
		fs.writeFileSync(file, s)
		var config3 = {
			input: [file],
			output: outputFolder,
			projectMetadata: config.shortjsdocProjectMetadata || {},
			vendor: config.shortjsdocVendor  || []
		}
		ShortJsDoc.make(config3)
	}
}


