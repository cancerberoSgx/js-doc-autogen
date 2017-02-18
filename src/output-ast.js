//output plugin for jsdoc
var _ = require('underscore')

var generateJsDoc = function(config)
{
	var metadata = config.metadata
	config.astOutput = config.astOutput || {properties: {}}
	if(_.isObject(metadata))
	{
		var data = {}
		data[config.bigName] = metadata
		_.extend(config.astOutput.properties, data)
	}
}


module.exports = {
	generate: generateJsDoc
}



