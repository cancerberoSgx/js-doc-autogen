automatic object discovery and documentation - research project

The idea of this tool is to explire a live js environment at some point, and from the properties discovered build some documentation  in the form of object oriented programming - json-schema

Requirement: output is pluggable - now we have shortjsdoc impl but it couold also be json-schema (examine in editor)

Requirement: it can run anywhere thanks to browserify: we can run it in node, browser, rhino, etc

#TODO

 * parse method.toString() to get parameter / signature
 * ouptut in json schema
 * output in typescript definitions