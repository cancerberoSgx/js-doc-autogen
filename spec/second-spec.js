// var docgen = require('../src')
// var _ = require('underscore')
// var shell = require('shelljs')
// var path = require('path')

// // var global = this
// describe('first ones', ()=>
// {

	
// 	it('output-short-jsdoc', ()=>
// 	{
// 		var Class = function(){}
// 		_.extend(Class.prototype,{coolMethod: function(){}})

// 		var context = {
// 			first: {
// 				hello: 'world', fn: function(){}, 
// 				anObject: {
// 					foo: '0who',
// 					method1: function(averygoodparameter){},
// 					sudo: {password: function(){}}
// 				}
// 			},
// 			instance: new Class()
// 			// self: require('fs')
// 		}
// 		var config = {
// 			target: context,
// 			outputImplementation: 'shortjsdoc',
// 			excludeNames: ['first.anObject.sudo.password'],
// 			levelMax: 1
// 		}
// 		var buffer = docgen.main(config)
// 		var s = buffer.join('\n')
// 		expect(s.indexOf('@class first.anObject')!==-1).toBe(true)
// 		expect(s.indexOf('@method method1')!==-1).toBe(true)
// 		expect(s.indexOf('@param averygoodparameter')!==-1).toBe(true)
// 		expect(s.indexOf('@method coolMethod')!==-1).toBe(true)
// 		expect(s.indexOf('@method password')==-1).toBe(true)
// 		// console.log(s)
// 	})


	


// })



