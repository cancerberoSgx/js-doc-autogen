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
		return {}
	}
	return val
}

var veryStrangePropertyNameForCycles = '___should_neverneverhappen12322'
var extractObjectMetadatas = function(config)
{

	var sourceObject = config.sourceObject, 
		sourceObjectName = config.sourceObjectName, 
		recurse = config.recurse, 
		handleCycles = config.handleCycles


	_visitCount++
	if(_visitMaxCount && _visitCount > _visitMaxCount)
	{
		return
	}
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

	//heads up ! using _.each for iterating object properties won't visit inherited properties. Concretely, browser's document

	// _.each(sourceObject, function(value, key)
	// {
	// 	if(handleCycles && key == veryStrangePropertyNameForCycles)
	// 	{
	// 		return
	// 	}
	// 	// console.log(key)
	// 	var metadata = getJsObjectMetadata(value)
	// 	result[key] = metadata
	// 	if(recurse && metadata.type == 'Object') 
	// 	{
	// 		_.extend(result[key], extractObjectMetadatas(value, key, true, handleCycles))
	// 	}
	// 	else if(recurse && metadata.type=='Array' && value && value.length)
	// 	{
	// 		_.extend(result[key], {arrayItemMetadata: extractObjectMetadatas(value[0], key, true, handleCycles)})
	// 	}
	// })

	var config2

	for(var key2 in sourceObject)
	{
		var value2 = sourceObject[key2]; //heads up - semicolon mandatory here !! 

		(function(key, value)
		{
			if(handleCycles && key == veryStrangePropertyNameForCycles)
			{
				return
			}
			// console.log(key)
			var metadata = getJsObjectMetadata(value)
			result[key] = metadata
			if(recurse && metadata.type == 'Object') 
			{
				config2 = {
					sourceObject: value, sourceObjectName: key, recurse: true, handleCycles: handleCycles
				}

				_.extend(result[key], extractObjectMetadatas(config2))
			}
			else if(recurse && metadata.type=='Array' && value && value.length)
			{
				config2 = {
					sourceObject: value[0], sourceObjectName: key, recurse: true, handleCycles: handleCycles
				}
				_.extend(result[key], {arrayItemMetadata: extractObjectMetadatas(config2)})
			}

		})(key2, value2)
	}

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
		absoluteName: absoluteName
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
	veryStrangePropertyNameForCycles: veryStrangePropertyNameForCycles
}