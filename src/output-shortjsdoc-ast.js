module.exports = {
	generate: function(metadata, bigName, moduleName, buffer)
	{
		var generateJsDocMetadata = require('./output-shortjsdoc').generateJsDocMetadata
		var classes = generateJsDocMetadata(metadata, bigName)
		buffer.length=0 //empty array
		var ast = {
			classes: classes
		}
		buffer.push(JSON.stringify(ast))
	}
}
