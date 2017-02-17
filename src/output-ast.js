//output plugin for jsdoc
var _ = require('underscore')

var generateASTMetadata = require('./metadata').generateASTMetadata
var generateJsDoc = function(config)
{
	var metadata = config.metadata
	var bigName = config.bigName
	config.astOutput = config.astOutput || {classes: {}}
	if(_.isObject(metadata))
	{
		var classes = generateASTMetadata(metadata, bigName)
		_.extend(config.astOutput.classes, classes)
		// config.buffer.push(JSON.stringify({classes: classes}))
		// return classes
	}
}


module.exports = {
	generate: generateJsDoc
}



