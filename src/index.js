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
		result = {type: 'Function', value: fstr}
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








//main 

var main = function(config)
{
	var mainModule = config.mainModule || 'main-module'

	var outputImplementation = config.outputImplementation
	if(!outputImplementation)
	{
		throw Error('Aborting, please provide an outputImplementation. Some possible values: shortjsdoc')
	}
	var generateOutput = require('./output-'+outputImplementation).generate

	// var excludeGlobals = ['requestHandler', 'eventHandler', 'process']

	globalThis = config.targetObjects

	excludeNames_ = config.excludeNames

	var buffer = []

	config.target = _.isArray(config.target) ? config.target : [config.target]

	_.each(config.target, function(globalContext)
	{
		for(var globalProperty in globalContext)
		{
			if(_.contains(config.excludeGlobals, globalProperty))
			{
				continue
			}

			var target = globalContext[globalProperty]

			// console.log(globalProperty)	
			var metadata
			try
			{
				metadata = extractObjectMetadatas(target, globalProperty, true)
			}
			catch(ex)
			{
				// this could be caused by a "Maximum call stack size exceeded"
				console.log('ERROR. WARNING. If the exception is "Maximum call stack size exceeded" then is your failt. '+
					'\nPlease give us an object with no cycles!')
				throw ex
			}
			var module = mainModule+'.'+globalProperty
			generateOutput(metadata, globalProperty, module, buffer)

			
		}
	})
	
	return buffer
}


module.exports = {
	main: main,
	visitObjectMetadata: visitObjectMetadata
}