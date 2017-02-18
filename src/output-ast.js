//output plugin for jsdoc
var _ = require('underscore')

// var generateASTMetadata = require('./output-shortjsdoc').generateASTMetadata
var generateJsDoc = function(config)
{
	var metadata = config.metadata
	// var bigName = config.bigName
	config.astOutput = config.astOutput || {properties: {}}
	if(_.isObject(metadata))
	{
	// 	var classes = generateASTMetadata(metadata, bigName)
		var data = {}
		data[config.bigName] = metadata
		_.extend(config.astOutput.properties, data)
	}
	// 	// config.buffer.push(JSON.stringify({classes: classes}))
	// 	// return classes
	// }
}


module.exports = {
	generate: generateJsDoc
}



