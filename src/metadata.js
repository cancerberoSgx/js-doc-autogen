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
		// debugger;
		result = {type: 'Array'}
	}
	else if(_.isFunction(o))
	{
		var fstr = o.toString()+''
		result = {
			type: 'Function', 
			// value: fstr,
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
	var val
	try
	{
		var esprima = require('esprima')
		// console.log('var a = '+s)
		var ast = esprima.parse('var a = '+s)
		var params = ast.body[0].declarations[0].init.params
		val = {
			params: _.map(params, (p)=>{return p.name})
		}
	}
	catch(ex)
	{
		//parsing fail - sometimes could be native code ? 
		return undefined
	}
	return val
	
	// console.log('seba', s, JSON.stringify(node,0,2))
	// md.metadata.value = 'function(){}' // clear the actual alue sine it can be huge
}

var veryStrangePropertyNameForCycles = '___should_neverneverhappen12322'
var extractObjectMetadatas = function(sourceObject, sourceObjectName, recurse, handleCycles)
{
	var result = {}
	var myMetadata = getJsObjectMetadata(sourceObject)
	if(handleCycles)
	{
		if(sourceObject[veryStrangePropertyNameForCycles])
		{
			return //heads up! we stop recursing
		}
		else
		{
			sourceObject[veryStrangePropertyNameForCycles]=sourceObjectName
		}
	}
	_.each(sourceObject, function(value, key)
	{
		if(handleCycles && key == veryStrangePropertyNameForCycles)
		{
			return
		}
		var metadata = getJsObjectMetadata(value)
		result[key] = metadata
		if(recurse && metadata.type == 'Object') 
		{
			_.extend(result[key], extractObjectMetadatas(value, key, true, handleCycles))
		}
		else if(recurse && metadata.type=='Array' && value && value.length)
		{
			_.extend(result[key], {arrayItemMetadata: extractObjectMetadatas(value[0], key, true, handleCycles)})
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
		// metadata: metadata, 
		absoluteName: absoluteName
		// ,
		// level: level
	}
	_.extend(visitable, metadata)
	visitor(visitable)
	_.each(metadata.objectMetadata, function(childMeta, childName)
	{
		visitObjectMetadata(childMeta, childName, absoluteName, level+1, visitor)
	})
}



module.exports = {
	visitObjectMetadata: visitObjectMetadata,
	extractObjectMetadatas: extractObjectMetadatas,
	// generateASTMetadata: generateASTMetadata,
	veryStrangePropertyNameForCycles: veryStrangePropertyNameForCycles
}