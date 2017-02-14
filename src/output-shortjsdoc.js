//output plugin for jsdoc
var _ = require('underscore')

var generateASTMetadata = require('./metadata').generateASTMetadata
var generateJsDoc = function(config)
{
	var metadata = config.metadata
	var bigName = config.bigName
	var moduleName = config.module
	var buffer = config.buffer
	// if(_.isFunction(metadata))
	// {
	// 	buffer.push('@module '+mainModule)
	// 	buffer.push('@function '+globalProperty)
	// 	// var metadata = extractObjectMetadatas(metadata, 'LoginRegister', true)
	// 	// console.log('global function ', globalProperty )
	// // 	//TODO
	// }

	// else 
	if(_.isObject(metadata))
	{
		var classes = generateASTMetadata(metadata, bigName)
		buffer.push('@module '+moduleName)
		_.each(classes, function(c)
		{
			buffer.push('@class '+c.absoluteName)
			_.each(c.properties, function(m)
			{
				buffer.push('@property ' + m.name)
			})
			_.each(c.methods, function(m)
			{
				buffer.push('@method ' + m.name)
			})
		})
	}


	
}


module.exports = {
	generate: generateJsDoc
}



