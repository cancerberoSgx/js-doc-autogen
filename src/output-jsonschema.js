//output plugin for jsdoc
var _ = require('underscore')

var visitObjectMetadata = require('./metadata').visitObjectMetadata

var generateJsonSchema = function(config)
{
	var metadata = config.metadata
	var bigName = config.bigName
	var moduleName = config.module
	var buffer = config.buffer

	if(_.isObject(metadata) && metadata.type=='Object')
	{
		var schemaNode = {
			title: bigName, 
			type: 'object'
		}
		doJsonSchemaObject(metadata, schemaNode, 0)

		buffer.push(JSON.stringify(schemaNode))
	}
}

var doJsonSchemaObject = function(metadata, schemaNode, level)
{
	if(metadata.type=='Object')
	{
		schemaNode.type = 'object'
		_.each(metadata.objectMetadata, (p, pname)=>
		{
			var jsprop = {}
			doJsonSchemaObject(p, jsprop, level+1)
			schemaNode.properties = schemaNode.properties || {}
			schemaNode.properties[pname] = jsprop
		})
	}
	else if(metadata.type=='Array') //TODO: items!
	{

	}
	else if(metadata.type=='Function') //TODO: items!
	{

	}
	else
	{
		schemaNode.type = metadata.type.toLowerCase()
	}
	
}

module.exports = {
	generate: generateJsonSchema
}