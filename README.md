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