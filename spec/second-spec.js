var docgen = require('../src')
var _ = require('underscore')
var shell = require('shelljs')
var path = require('path')

// var global = this
describe('first ones', ()=>
{

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

	


})



