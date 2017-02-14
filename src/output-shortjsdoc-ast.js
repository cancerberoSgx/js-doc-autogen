
var generateASTMetadata = require('./metadata').generateASTMetadata

module.exports = {
	generate: function(config)
	{		
		var metadata = config.metadata
		var bigName = config.bigName
		var module = config.module
		var buffer = config.buffer
		var generateJsDocMetadata = require('./output-shortjsdoc').generateJsDocMetadata
		var classes = generateASTMetadata(metadata, bigName)
		buffer.length=0 //empty array
		var ast = {
			classes: classes
		}
		buffer.push(JSON.stringify(ast))
	}
}
