//output plugin for jsdoc
var _ = require('underscore')
var visitObjectMetadata = require('./metadata').visitObjectMetadata

//jsdocs
//this method could be useful by it self by implenting output-shortjsdoc-ast
var generateJsDocMetadata = function(metadata, bigName)
{
	var lastClass
	var classes = {}
	visitObjectMetadata(metadata, bigName, '', 0, function(md)
	{
		if(md.metadata.type == 'Object')
		{
			classes[md.absoluteName] = md
		}
	})
	visitObjectMetadata(metadata, bigName, '', 0, function(md)
	{
		var methodNameSplitted = md.absoluteName.split('.')
		var methodName = methodNameSplitted.pop()
		var className = methodNameSplitted.join('.')
	 	if(md.metadata.type == 'Function')
		{
			classes[className].methods = classes[className].methods || []
			classes[className].methods.push(md)
			md.metadata.value = 'function(){}'
		}
		else if(md.metadata.type !== 'Object')
		{
			classes[className].properties = classes[className].properties || []
			classes[className].properties.push(md)
		}
	})
	return classes
}

var generateJsDoc = function(config)
{
	var metadata = config.metadata
	var bigName = config.bigName
	var moduleName = config.module
	var buffer = config.buffer

	if(_.isObject(metadata))
	{
		var classes = generateJsDocMetadata(metadata, bigName)
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
	generate: generateJsDoc,
	generateJsDocMetadata: generateJsDocMetadata
}



