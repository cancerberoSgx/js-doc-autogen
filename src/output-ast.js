//output plugin for jsdoc
var _ = require('underscore')

var generateJsDoc = function(config)
{
	var metadata = config.metadata
	config.astOutput = config.astOutput || {objectMetadata: {}}
	if(_.isObject(metadata))
	{
		var data = {}
		data[config.bigName] = metadata
		_.extend(config.astOutput.objectMetadata, data)
	}
}


module.exports = {
	generate: generateJsDoc
}



