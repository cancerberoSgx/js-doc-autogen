//output plugin for jsdoc
var _ = require('underscore')

var generateASTMetadata = require('./metadata').generateASTMetadata
var generateJsDoc = function(config)
{
	var metadata = config.metadata
	var bigName = config.bigName
	if(_.isObject(metadata))
	{
		var classes = generateASTMetadata(metadata, bigName)
		config.buffer.push(JSON.stringify({classes: classes}))
		// return classes
	}
}


module.exports = {
	generate: generateJsDoc
}



