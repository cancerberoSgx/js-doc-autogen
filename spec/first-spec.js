var docgen = require('../src')

describe('1', ()=>
{
	it('should', ()=>
	{
		expect(1).toBe(1)

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
		var config = {
			target: context,
			excludeNames: ['sudo.password']
		}
		var buffer = docgen.main(config)
		var s = buffer.join('\n')
		expect(s.indexOf('@class first.anObject')!==-1).toBe(true)
		console.log(s)
	})
})