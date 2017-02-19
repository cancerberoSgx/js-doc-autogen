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
			// extractMethodSignature(md)
		}
		else if(md.type !== 'Object')
		{
			// console.log(className)
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
		var classes = generateOopAst(metadata, bigName)
		buffer.push('@module '+moduleName)
		_.each(classes, (c)=>
		{
			buffer.push('@class '+c.absoluteName)
			_.each(c.properties, (m)=>
			{
				buffer.push('@property ' + m.name)
			})
			_.each(c.methods, (m)=>
			{
				buffer.push('@method ' + m.name)
				// console.log(m)
				_.each(m.signature.params, (p)=>
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



