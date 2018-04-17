[![Build Status](https://travis-ci.org/cancerberoSgx/short-jsdoc.png?branch=master)](https://travis-ci.org/cancerberoSgx/js-doc-autogen)

# What?

* This is a Research project *

Automatic documentation / descriptions of live javascript objects in several formats

The idea of this tool is to explore and describe the structure of given unknown javascript object

t can run anywhere thanks to browserify: we can run it in node, browser, rhino, nashhorn, etc

output implementation are plugins - there are now several different type of outputs (jsdoc, jsonschema, typescript descriptions ) but others can be implemented as funcions

# Sceniarios 

 * you are using an undocumented library or a library poorly documented in a readme. But you areprograming in a intellisence editor and you wnat autocomplete to work faster - so you use this tool against the library's root object.

 * you are for some reason programming in a new javascript environment like rhino and don't know nothing about its globals or what's available. Run the tool agains the global context (this) to explore it

# install 

```sh
npm install --save js-doc-autogen
```

# Using it in node.js

```js
var docgen = require('js-doc-autogen')
var context = {
    someCoolLibraryWithoutFormalDocumentation: require('cool-foo')
}
var config = {
    target: context,
    outputImplementation: 'jsonschema',
    excludeNames: ['something.very.private'],
    levelMax:6
}
var buffer = docgen.main(config)
var s = buffer.join('\n')
```

# Using it in the browser to examine DOM

(but you could examine any object of a n on documented library)

```html
<script src="../dist/bundle.js"></script>
<script>
var docgen = require('js-doc-autogen')
var context = {
    document: document,
    window: window,
    foo: {p: 9}
}
var config = {
    target: context,
    mainModule: 'html',
    outputImplementation: 'shortjsdoc',
    excludeNames: ['document.doctype']
    ,levelMax: 4
}
var buffer = docgen.main(config)
var jsdoc = buffer.join('\n')
var jsdoc = '/*\n'+jsdoc+'\n*/'
window.jsdoc = jsdoc
console.log(jsdoc)
// copy(s)
console.log('jsdoc available in variable jsdoc. Execute copy(jsdoc) in the console to copy jsdoc to clipboard. ')
</script>
```

# Configuration properties

 * target: the target object to document. It will be examine ant if it contains circular dependencies probably it could fail. Also the object coul dbe unusable / contaminated after using the tool
 * mainModule: a name to put to the root output object that contains everything
 * outputImplementation: could be any of: shortjsdoc, jsonschema


# jsdoc output example

The following is documentation automatically generated from globals of different js implementations like node, browser, rhino, nashorn, etc

[DEMO](https://cancerberosgx.github.io/js-doc-autogen/examples/other-engines-examples/jsdoc-output/)




# generate bundle and run it in browser

    browserify -r .:js-doc-autogen -r ./src/output-shortjsdoc.js:./output-shortjsdoc -r underscore -d > dist/bundle.js
    
    firefox example/browser-example.html

You will see a jsdoc fragment in the console. 

# Other files

 * [TODO](https://github.com/cancerberoSgx/js-doc-autogen/blob/master/TODO.md)
 * [Changelist](https://github.com/cancerberoSgx/js-doc-autogen/blob/master/Changelist.md)
