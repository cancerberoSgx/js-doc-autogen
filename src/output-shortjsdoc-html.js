// var shell = require('shelljs')
// var ShortJsDoc = require('short-jsdoc')
// var fs = require('fs')
// var path = require('path')
// module.exports = {
// 	generate: function(config)
// 	{
// 		console.log('seba, generate html')
// 		// var metadata = config.metadata
// 		// var bigName = config.bigName
// 		// var module = config.module
// 		var outputFolder = config.outputFolder
// 		if(!outputFolder)
// 		{
// 			console.log('Aborting. Please provide outputFolder')
// 			process.exit(1)
// 		}
// 		var generate = require('./output-shortjsdoc').generate
// 		generate.apply(this, arguments)
// 		var str = config.buffer.join('\n')
// 		str = '/*\n'+str+'\n*/'
// 		shell.rm('-rf', outputFolder)
// 		shell.mkdir(outputFolder)
// 		shell.mkdir(path.join(outputFolder, 'inputsrc'))

// 		var file = path.join(outputFolder, 'inputsrc', 'autojsdoc.js')
// 		fs.writeFileSync(file, str)
// 		// console.log('sebaaaa', shell.cat(file).toString(), 'sebaaa')

// 		ShortJsDoc.make({
// 		    inputDirs: [file]
// 		,   output: 'tmp/output-jsdocs'
// 		,   projectMetadata: './package.json'
// 		,   vendor: []
// 		,	dontMinifyOutput: true
// 		})

// 	}
// }



// // var writeJsdoc = function(buffer)
// // {
// // 	var str = buffer.join('\n')
// // 	str = '/*\n'+str+'\n*/'
// // 	var fs = require('fs')
// // 	fs.writeFileSync('autojsdoc/autojsdoc.js', str)

// // 	var ShortJsDoc = require('short-jsdoc')

// // 	ShortJsDoc.make({
// // 	    inputDirs: ['autojsdoc']
// // 	,   output: 'automation-jsdocs'
// // 	,   projectMetadata: './package.json'
// // 	,   vendor: []
// // 	})
// // }
