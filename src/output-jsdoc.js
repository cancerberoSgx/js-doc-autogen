//output plugin for jsdoc
var _ = require('underscore')
var visitObjectMetadata = require('./index').visitObjectMetadata

//jsdocs
var generateJsDocMetadata = function(metadata, bigName)
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
	 	if(md.metadata.type == 'Function')
		{
			var methodNameSplitted = md.absoluteName.split('.')
			var methodName = methodNameSplitted.pop()
			var className = methodNameSplitted.join('.')
			classes[className].methods = classes[className].methods || []
			classes[className].methods.push(md)
		}
		// else if(md.metadata.type !== 'Object')
		// {
		// 	console.log('property', md.absoluteName)
		// }
	})
	return classes
}

var generateJsDoc = function(metadata, bigName, moduleName, buffer)
{
	var classes = generateJsDocMetadata(metadata, bigName)
	buffer.push('@module '+moduleName)
	_.each(classes, function(c)
	{
		buffer.push('@class '+c.absoluteName+ ' @public')
		_.each(c.methods, function(m)
		{
			buffer.push('@method ' + m.name + ' @public')
		})
	})
}


module.exports = generateJsDoc




// var writeJsdoc = function(buffer)
// {
// 	var str = buffer.join('\n')
// 	str = '/*\n'+str+'\n*/'
// 	var fs = require('fs')
// 	fs.writeFileSync('autojsdoc/autojsdoc.js', str)

// 	var ShortJsDoc = require('short-jsdoc')

// 	ShortJsDoc.make({
// 	    inputDirs: ['autojsdoc']
// 	,   output: 'automation-jsdocs'
// 	,   projectMetadata: './package.json'
// 	,   vendor: []
// 	})

// 	console.log('*** Automation documentation generated at automation-jsdocs/index.html ***')
// }
