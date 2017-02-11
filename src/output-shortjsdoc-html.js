var shell = require('shelljs')
var ShortJsDoc = require('short-jsdoc')

module.exports = {
	generate: function(metadata, bigName, moduleName, buffer)
	{
		var generate = require('./output-shortjsdoc').generate
		generate.apply(this, arguments)
		var str = buffer.join('\n')
		str = '/*\n'+str+'\n*/'
		shell.rm('-rf', 'tmp')
		shell.mkdir('tmp')
		fs.writeFileSync('tmp/autojsdoc.js', str)

		ShortJsDoc.make({
		    inputDirs: ['tmp']
		,   output: 'tmp/automation-jsdocs'
		,   projectMetadata: './package.json'
		,   vendor: []
		})

	}
}



// var writeJsdoc = function(buffer)
// {
// 	var str = buffer.join('\n')
// 	str = '/*\n'+str+'\n*/'
// 	var fs = require('fs')
// 	fs.writeFileSync('autojsdoc/autojsdoc.js', str)

// 	var ShortJsDoc = require('short-jsdoc')

// 	ShortJsDoc.make({
// 	    inputDirs: ['autojsdoc']
// 	,   output: 'automation-jsdocs'
// 	,   projectMetadata: './package.json'
// 	,   vendor: []
// 	})
// }
