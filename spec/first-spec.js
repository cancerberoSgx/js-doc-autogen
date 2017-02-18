var docgen = require('../src')
var _ = require('underscore')
var shell = require('shelljs')
var path = require('path')

// var global = this
describe('first ones', ()=>
{
	it('output-short-jsdoc', ()=>
	{
		var context = {
			first: {
				hello: 'world', fn: function(){}, 
				anObject: {
					foo: '0who',
					method1: function(averygoodparameter){},
					sudo: {password: function(){}}
				}
			},
			// self: require('fs')
		}
		var config = {
			target: context,
			outputImplementation: 'shortjsdoc',
			excludeNames: ['sudo.password']	
		}
		var buffer = docgen.main(config)
		var s = buffer.join('\n')
		expect(s.indexOf('@class first.anObject')!==-1).toBe(true)
		expect(s.indexOf('@method method1')!==-1).toBe(true)
		expect(s.indexOf('@param averygoodparameter')!==-1).toBe(true)
		// expect(s.indexOf('@function globalFn')!==-1).toBe(true)
		// console.log(s)
	})


	it('output-short-jsdoc-ast', ()=>
	{
		var context = {
			first: {
				hello: 'world', fn: function(){}, 
				anObject: {
					foo: '0who',
					method1: function(){},
					sudo: {password: function(){}}
				}
			}
			,
			self: require('fs')
			// ,
			// globalFn : function(a,b,c){}
		}
		var config = {
			target: context,
			outputImplementation: 'shortjsdoc-ast',
			excludeNames: ['sudo.password']
		}
		var buffer = docgen.main(config)
		// console.log(JSON.stringify(JSON.parse(buffer.join('')),0,2))
		var ast = JSON.parse(buffer.join(''))

		expect(_.keys(ast.classes.self).length>0).toBe(true)
	})

	it('output-short-jsdoc-html', (cb)=>
	{
		var context = {
			first: {
				hello: 'world', fn: function(){}, 
				anObject: {
					foo: '0who',
					method1: function(){},
					sudo: {password: function(){}}
				}
			}
		}

		var outputFolder = 'tmp'
		var config = {
			target: context,
			outputImplementation: 'shortjsdoc-html',
			excludeNames: ['sudo.password'],
			outputFolder: outputFolder
		}
		docgen.main(config)

		var f = path.join(outputFolder, 'data.json')
		var jsdoc = shell.cat(f).toString()
		jsdoc = jsdoc.substring('window.__shortjsdoc_data = '.length, jsdoc.length)
		jsdoc = JSON.parse(jsdoc)
		// console.log(jsdoc)
		expect(_.keys(jsdoc.classes).length>0).toBe(true)
		shell.rm('-rf', outputFolder)
		cb()
	})



	it('output-jsonschema', ()=>
	{
		var context = {
			// first: {fn1: function(a, b ,c){return a+b*c}}
			first: {
				hello: 'world', fn: function(){}, 
				anObject: {
					foo: '0who',
					method1: function(){},
					sudo: {password: function(){}},
					anidado: {another: {finalProp: 'hey!'}}
				}
			},
			self: require('fs'),
			globalFn : function(a,b,c){}
		}
		var config = {
			target: context,
			outputImplementation: 'jsonschema',
			excludeNames: ['sudo.password']
		}
		var buffer = docgen.main(config)
		var s = '[' + buffer.join(', ') + ']'

		var schema = JSON.parse(s)
		// console.log(schema)

		expect(_.find(schema, (s)=>{return s.title=='first'}).properties.hello.type).toBe('string')

	})


	it('output-ast', ()=>
	{
		var context = {
			first: {
				hello: 'world', fn: function(){}, 
				anObject: {
					foo: '0who',
					method1: function(averygoodparameter){},
					sudo: {password: function(){}}
				}
			}
			,
			second: {foo: 'bar'}
		}
		var config = {
			target: context,
			outputImplementation: 'ast',
			excludeNames: ['sudo.password']	
		}
		docgen.main(config)
		var ast = config.astOutput
		// console.log(JSON.stringify(ast,0,2))
		expect(ast.properties.first.objectMetadata.anObject.objectMetadata.method1.signature.params[0]).toBe('averygoodparameter')
	})



	it('if source cycles it fails by default', ()=>
	{
		var o1 = {m: function(a){}, p2: 'hello'}
		o1.cycle1 = {o1: o1}
		var context = {
			o1: o1
		}
		var config = {
			target: context,
			outputImplementation: 'ast',
			excludeNames: ['sudo.password']
		}
		var error
		try
		{
			docgen.main(config)
		}
		catch(ex)
		{
			error=true
		}
		expect(error).toBe(true)
		// var ast = config.astOutput
		// console.log(ast)
	})

	it('if cycles and handleCycles wont fail', ()=>
	{
		var o1 = {m: function(a){}, p2: 'hello'}
		o1.cycle1 = {o1: o1}
		var context = {
			o1: o1
		}
		var config = {
			target: context,
			outputImplementation: 'ast',
			excludeNames: ['sudo.password'],
			handleCycles: true
		}
		docgen.main(config)
		var ast = config.astOutput
		var s = JSON.stringify(ast, 0, 2)

		//wont print the special property created for marking  cycles
		expect(s.indexOf(require('../src/metadata').veryStrangePropertyNameForCycles)==-1).toBe(true)
		// expect(s.indexOf('o1.cycle1.o1')!=-1).toBe(true)
		// console.log(s)

		expect(ast.properties.o1.objectMetadata.cycle1.objectMetadata.o1.type).toBe('Object')
	

		expect(ast.properties.o1.objectMetadata.cycle1.objectMetadata.o1.type).toBe('Object')
	})

	

	// it('output-ast-arrays', ()=>
	// {
	// 	var context = {
	// 		first: {
	// 			arrayProperty: [{insideArrayProp1: true, arrayPropertyFn: function(c) {}}]
	// 		}
	// 	}
	// 	var config = {
	// 		target: context,
	// 		outputImplementation: 'ast'
	// 	}
	// 	docgen.main(config)
	// 	var ast = config.astOutput
	// 	console.log(JSON.stringify(ast,0,2))
	// 	// expect(ast.classes.first.objectMetadata.anObject.objectMetadata.method1.signature.params[0]).toBe('averygoodparameter')
	// })


})



