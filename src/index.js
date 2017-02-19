var _ = require('underscore')

var extractObjectMetadatas = require('./metadata').extractObjectMetadatas

var main = function(config)
{
	var mainModule = config.mainModule || 'mainModule'

	var outputImplementation = config.outputImplementation
	if(!outputImplementation)
	{
		throw Error('Aborting, please provide an outputImplementation. Some possible values: shortjsdoc, jsonschema')
	}
	var generateOutput = require('./output-'+outputImplementation).generate

	// var excludeGlobals = ['requestHandler', 'eventHandler', 'process']

	globalThis = config.targetObjects

	excludeNames_ = config.excludeNames
	_visitMaxCount = config.visitMaxCount || 0
	_visitCount = 0

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

			var metadata
			// try
			// {

				var config2 = {
					sourceObject: target, sourceObjectName: globalProperty, recurse: true, handleCycles: config.handleCycles
				}
	// 

				metadata = extractObjectMetadatas(config2)
			// }
			// catch(ex)
			// {
				// this could be caused by a "Maximum call stack size exceeded"
				// console.log('ERROR. WARNING. If the exception is "Maximum call stack size exceeded" then is your failt. '+
				// 	'\nPlease give us an object with no cycles!')
			// 	throw ex
			// }
			var module = mainModule//+'.'+globalProperty

			var generatorConfig = {
				metadata: metadata,
				bigName: globalProperty,
				module: module,
				buffer: buffer
			}
			_.extend(config, generatorConfig)
			// _.extend(generatorConfig, config)
			generateOutput(config)

			
		}
	})
	
	return buffer
}

module.exports = {
	main: main
}