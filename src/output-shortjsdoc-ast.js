
var generateOopAst = require('./output-shortjsdoc').generateOopAst

module.exports = {
	generate: function(config)
	{		
		var metadata = config.metadata
		var bigName = config.bigName
		// var module = config.module
		var buffer = config.buffer
		// var generateJsDocMetadata = require('./output-shortjsdoc').generateJsDocMetadata
		var classes = generateOopAst(metadata, bigName)
		buffer.length=0 //empty array
		var ast = {
			classes: classes
		}
		buffer.push(JSON.stringify(ast))
	}
}
