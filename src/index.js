var _ = require('underscore')


//heads up ! we are making sure we require all implementations so browserify bundle won't fail when running bundle in other engines
require('./output-shortjsdoc')
require('./output-typescript')
require('./output-ast')


var metadataModule = require('./metadata')
var extractObjectMetadatas = metadataModule.extractObjectMetadatas

var main = function(config)
{
	var mainModule = config.mainModule || 'mainModule'

	var outputImplementation = config.outputImplementation
	if(!outputImplementation)
	{
		throw Error('Aborting, please provide an outputImplementation. Some possible values: shortjsdoc, jsonschema')
	}
	var generateOutput = _.isFunction(outputImplementation) ? outputImplementation : require('./output-'+outputImplementation).generate

	globalThis = config.targetObjects

	excludeNames_ = config.excludeNames
	_visitMaxCount = config.visitMaxCount || 0
	_visitCount = 0

	var buffer = []

	config.target = _.isArray(config.target) ? config.target : [config.target]

	var iterateObjectProperties = metadataModule.getObjectPropertiesIterator()

	_.each(config.target, function(globalContext)
	{
		iterateObjectProperties(globalContext, function(globalProperty, target)
		{
			if(_.contains(config.excludeGlobals, globalProperty))
			{
				return
			}

			var metadata
			// try
			// {
			var config2 = {
				sourceObject: target, 
				sourceObjectName: globalProperty, 
				recurse: true, 
				handleCycles: config.handleCycles
			}
				var config3 = _.extend(_.clone(config), config2)
			// console.log(config3)
			metadata = extractObjectMetadatas(config3)	
			// }
			// catch(ex)
			// {
				// this could be caused by a "Maximum call stack size exceeded"
				// console.log('ERROR. WARNING. If the exception is "Maximum call stack size exceeded" then is your failt. '+
				// 	'\nPlease give us an object with no cycles!')
			// 	throw ex
			// }

			var generatorConfig = {
				metadata: metadata,
				bigName: globalProperty,
				module: mainModule,
				buffer: buffer
			}
			_.extend(config, generatorConfig)
			generateOutput(config)
		})
	})
	
	return buffer
}

module.exports = {
	main: main,
	metadata: metadataModule
	// ,
	// setObjectPropertiesIterator: metadataModule.setObjectPropertiesIterator
}