var docgen = require('../src')
var _ = require('underscore')
var shell = require('shelljs')
var path = require('path')


describe('output-typescript', ()=>
{
	it('should generate typescript documentation as interfaces', ()=>
	{

		var context = {
			first: {
				hello: 'world', fn: function(eventName, options){return ''}, 
				anObject: {
					foo: '0who',
					method1: function(){},
					sudo: {password: function(){}}
				}
			}
		}

		var config = {
			target: context,
			outputImplementation: 'typescript',
			levelMax: 8
		}
		var buffer = docgen.main(config)
		var s = buffer.join('\n')
		expect(s).toContain('declare interface first.anObject')

		expect(s).toContain('fn: (eventName: any, options: any) => any')
		expect(s).toContain('foo: string')
		
		// console.log(s)
	})

})



