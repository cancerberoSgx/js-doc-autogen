var docgen = require('../src')
var _ = require('underscore')
var shell = require('shelljs')

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
			},
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
		// console.log(buffer.join(''))
		var ast = JSON.parse(buffer.join(''))

		expect(_.keys(ast.classes.self).length>0).toBe(true)
	})

	// it('output-short-jsdoc-html', (cb)=>
	// {
	// 	var context = {
	// 		first: {
	// 			hello: 'world', fn: function(){}, 
	// 			anObject: {
	// 				foo: '0who',
	// 				method1: function(){},
	// 				sudo: {password: function(){}}
	// 			}
	// 		},
	// 		fs: require('fs')
	// 	}
	// 	var config = {
	// 		target: context,
	// 		outputImplementation: 'shortjsdoc-html',
	// 		excludeNames: ['sudo.password'],
	// 		outputFolder: 'tmp'
	// 	}
	// 	docgen.main(config)

	// 	// var jsdoc = shell.cat('tmp/output-jsdocs/data.json').toString()
	// 	// jsdoc = jsdoc.substring('window.__shortjsdoc_data = '.length, jsdoc.length)
	// 	// console.log(jsdoc)
	// 	// jsdoc = JSON.parse(jsdoc)
	// 	// expect(_.keys(ast.classes.self).length>0).toBe(true)
	// 	cb()

			
	// 	// setTimeout(function()
	// 	// {
	// 	// 	var jsdoc = shell.cat('tmp/output-jsdocs/data.json').toString()
	// 	// 	// jsdoc = jsdoc.substring('window.__shortjsdoc_data = '.length, jsdoc.length)
	// 	// 	console.log(jsdoc)
	// 	// 	// jsdoc = JSON.parse(jsdoc)
	// 	// 	// expect(_.keys(ast.classes.self).length>0).toBe(true)
	// 	// 	cb()
	// 	// }, 20)
		
	// })



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
			// ,
			// fs: require('fs')
		}
		var config = {
			target: context,
			outputImplementation: 'ast',
			excludeNames: ['sudo.password']	
		}
		docgen.main(config)
		var ast = config.astOutput
		// console.log(JSON.stringify(ast,0,2))
		expect(ast.classes.first.metadata.objectMetadata.anObject.objectMetadata.method1.signature.params[0]).toBe('averygoodparameter')
		
	})

})



