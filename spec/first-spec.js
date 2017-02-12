var docgen = require('../src')
var _ = require('underscore')

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
					method1: function(){},
					sudo: {password: function(){}}
				}
			},
			self: require('fs')
			// globalFn : function(a,b,c){}
		}
		var config = {
			target: context,
			outputImplementation: 'shortjsdoc',
			excludeNames: ['sudo.password']
		}
		var buffer = docgen.main(config)
		var s = buffer.join('\n')
		expect(s.indexOf('@class first.anObject')!==-1).toBe(true)
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
})