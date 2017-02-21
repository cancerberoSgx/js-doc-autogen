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
			params: _.map(params, function(p){return p.name})
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
	config.level = config.level || 0


	if(config.levelMax && config.level > config.levelMax-2)
	{
		return 
	}
	// console.log(config.sourceObjectName, config.level, config.levelMax)

	var sourceObject = config.sourceObject

	_visitCount++
	if(_visitMaxCount && _visitCount > _visitMaxCount)
	{
		return
	}
	var result = {}
	var myMetadata = getJsObjectMetadata(sourceObject)
	if(config.handleCycles)
	{
		if(sourceObject[veryStrangePropertyNameForCycles])
		{
			return //heads up! we stop recursing
		}
		else
		{
			sourceObject[veryStrangePropertyNameForCycles]=config.sourceObjectName
		}
	}

	//heads up ! using _.each for iterating object properties won't visit inherited properties. Concretely, browser's document
	
	getObjectPropertiesIterator()(sourceObject, function(key, value)
	{
		if(config.handleCycles && key == veryStrangePropertyNameForCycles)
		{
			return
		}
		var metadata = getJsObjectMetadata(value)
		result[key] = metadata

		var config2 = {
			sourceObjectName: key, 
			recurse: config.recurse, 
			handleCycles: config.handleCycles,
			level: config.level + 1,
			levelMax: config.levelMax
		}

		// console.log('getObjectPropertiesIterator key '+key + ' - ' + metadata.type)
		if(config.recurse && metadata.type == 'Object') 
		{
			config2.sourceObject = value
			_.extend(result[key], extractObjectMetadatas(config2))
		}
		else if(config.recurse && metadata.type=='Array' && value && value.length)
		{
			config2.sourceObject = value[0]
			_.extend(result[key], {arrayItemMetadata: extractObjectMetadatas(config2)})
		}
	})
	myMetadata.objectMetadata = result
	return myMetadata
}

// @function iterateObjectProperties implementation used for visiting all object properties  (for var i in sourceObject)
var iterateObjectProperties = function(sourceObject, fn)
{
	// console.log('here12122')
	for(var key in sourceObject)
	{
		var value = sourceObject[key]
		fn(key, value)
	}
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

var _objectPropertiesIterator = iterateObjectProperties
var getObjectPropertiesIterator = function(){return _objectPropertiesIterator}
var setObjectPropertiesIterator = function(iterator){_objectPropertiesIterator = iterator}

module.exports = {
	visitObjectMetadata: visitObjectMetadata,
	getJsObjectMetadata: getJsObjectMetadata,
	extractObjectMetadatas: extractObjectMetadatas,
	veryStrangePropertyNameForCycles: veryStrangePropertyNameForCycles,
	iterateObjectProperties: iterateObjectProperties,
	getObjectPropertiesIterator: getObjectPropertiesIterator,
	setObjectPropertiesIterator: setObjectPropertiesIterator
}