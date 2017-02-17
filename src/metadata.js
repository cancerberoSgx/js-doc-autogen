var _ = require('underscore')

// metadata - TODO: move to metadata.js
// object exploration and types

var getJsObjectMetadata = function(o)
{
	//TODO: plugin container

	var result
	if(_.isString(o))
	{
		result = {type: 'String', value: o}
	}
	else if(_.isNumber(o))
	{
		result = {type: 'Number', value: o}
	}
	else if(_.isBoolean(o))
	{
		result = {type: 'Boolean', value: o}
	}
	else if(_.isArray(o))
	{
		result = {type: 'Array'}
	}
	else if(_.isFunction(o))
	{
		var fstr = o.toString()+''
		result = {
			type: 'Function', 
			value: fstr,
			signature: extractMethodSignature(fstr)
		}
	}
	else if(_.isObject(o))
	{
		result = {type: 'Object'}
	}
	else
	{
		result = {type: 'undefined'}
	}
	return result
}


function extractMethodSignature(s)
{
	try
	{
		var esprima = require('esprima')
		// console.log('var a = '+s)
		var ast = esprima.parse('var a = '+s)
		var params = ast.body[0].declarations[0].init.params
		return {params: _.map(params, (p)=>{return p.name})}
	}
	catch(ex)
	{
		//parsing fail - sometimes could be native code ? 
		return undefined
	}
	
	// console.log('seba', s, JSON.stringify(node,0,2))
	// md.metadata.value = 'function(){}' // clear the actual alue sine it can be huge
}


var extractObjectMetadatas = function(sourceObject, sourceObjectName, recurse)
{
	var result = {}
	var myMetadata = getJsObjectMetadata(sourceObject)
	_.each(sourceObject, function(value, key)
	{
		var metadata = getJsObjectMetadata(value)
		result[key] = metadata
		if(recurse && metadata.type=='Object') 
		{
			_.extend(result[key], extractObjectMetadatas(value, key, true))
		}
		else if(recurse && metadata.type=='Array' && value && value.length)
		{
			_.extend(result[key], extractObjectMetadatas(value[0], key, true))
		}
	})
	myMetadata.objectMetadata = result
	return myMetadata
}

var excludeNames = function(absoluteName)
{
	return _.find(excludeNames_, function(exc){return absoluteName.indexOf(exc)!==-1})
}

var visitObjectMetadata = function(metadata, name, parentName, level, visitor)
{
	level = level || 0
	parentName = parentName || ''
	var absoluteName =  parentName ? (parentName+'.'+name) : name
	if(excludeNames(absoluteName))
	{
		return
	}
	var visitable = {
		name: name, 
		metadata: metadata, 
		absoluteName: absoluteName,
		level: level
	}
	visitor(visitable)
	_.each(metadata.objectMetadata, function(childMeta, childName)
	{
		visitObjectMetadata(childMeta, childName, absoluteName, level+1, visitor)
	})
}




//@function generateASTMetadata - generate a class-ast like object very suitable for shortjsdoc - this method could be useful by it self by implenting output-shortjsdoc-ast
var generateASTMetadata = function(metadata, bigName)
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
		// if(!className || !classes[className])
		// {
		// 	console.log('className', className)
		// 	return
		// }
		if(!className || !classes[className])
		{
			return
		}
	 	if(md.metadata.type == 'Function')
		{
			classes[className].methods = classes[className].methods || []
			classes[className].methods.push(md)
			// extractMethodSignature(md)
		}
		else if(md.metadata.type !== 'Object')
		{
			// console.log(className)
			classes[className].properties = classes[className].properties || []
			classes[className].properties.push(md)
		}
	})
	return classes
}

module.exports = {
	visitObjectMetadata: visitObjectMetadata,
	extractObjectMetadatas: extractObjectMetadatas,
	generateASTMetadata: generateASTMetadata
}