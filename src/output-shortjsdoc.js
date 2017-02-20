//output plugin for jsdoc
var _ = require('underscore')

var visitObjectMetadata = require('./metadata').visitObjectMetadata

//@function generateOopAst - generate a class-ast like object very suitable for shortjsdoc - this method could be useful by it self by implenting output-shortjsdoc-ast
var generateOopAst = function(metadata, bigName)
{
	var classes = {}
	visitObjectMetadata(metadata, bigName, '', 0, function(md)
	{
		if(md.type == 'Object')
		{
			classes[md.absoluteName] = md
		}
	})
	visitObjectMetadata(metadata, bigName, '', 0, function(md)
	{
		var methodNameSplitted = md.absoluteName.split('.')
		methodNameSplitted.pop()
		var className = methodNameSplitted.join('.')
		if(!className || !classes[className])
		{
			return
		}
		if(md.type == 'Function')
		{
			classes[className].methods = classes[className].methods || []
			classes[className].methods.push(md)
		}
		else if(md.type !== 'Object')
		{
			classes[className].properties = classes[className].properties || []
			classes[className].properties.push(md)
		}
		delete classes[className].objectMetadata
	})
	return classes
}


var generateJsDoc = function(config)
{
	var metadata = config.metadata
	var bigName = config.bigName
	var moduleName = config.module
	var buffer = config.buffer

	if(_.isObject(metadata)) //heads up ! we are not visiting first level - non object values !
	{
		var classes = generateOopAst(metadata, bigName)
		buffer.push('@module '+moduleName)
		_.each(classes, function(c)
		{
			buffer.push('@class '+c.absoluteName)
			_.each(c.properties, function(p)
			{
				buffer.push('@property ' + p.name)
			})
			_.each(c.methods, function(m)
			{
				buffer.push('@method ' + m.name)
				// console.log(m)
				_.each(m.signature.params, function(p)
				{
					buffer.push('@param ' + p)
				})
			})
		})
	}


	
}


module.exports = {
	generate: generateJsDoc,
	generateOopAst: generateOopAst
}



