[![Build Status](https://travis-ci.org/cancerberoSgx/short-jsdoc.png?branch=master)](https://travis-ci.org/cancerberoSgx/js-doc-autogen)

#automatic object discovery and documentation

* This is a Research project *

The idea of this tool is to explire a live js environment at some point, and from the properties discovered build some documentation  in the form of object oriented programming - json-schema

Requirement: output is pluggable - now we have shortjsdoc impl but it couold also be json-schema (examine in editor)

Requirement: it can run anywhere thanks to browserify: we can run it in node, browser, rhino, etc

#generate bundle and run it in browser

    browserify -r .:js-doc-autogen -r ./src/output-shortjsdoc.js:./output-shortjsdoc -r underscore -d > dist/bundle.js
    
    firefox example/browser-example.html

You will see a jsdoc fragment in the console. 

#Other files

 * [TODO](https://github.com/cancerberoSgx/js-doc-autogen/blob/master/TODO.md)
 * [Changelist](https://github.com/cancerberoSgx/js-doc-autogen/blob/master/Changelist.md)

#using it in the browser to examine DOM

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
        // ,visitMaxCount: 1000
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
