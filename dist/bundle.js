require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./output-shortjsdoc":[function(require,module,exports){
//output plugin for jsdoc
var _ = require('underscore')

var visitObjectMetadata = require('./metadata').visitObjectMetadata

//@function generateOopAst - generate a class-ast like object very suitable for shortjsdoc - this method could be useful by it self by implenting output-shortjsdoc-ast
var generateOopAst = function(metadata, bigName)
{
	var classes = {}
	visitObjectMetadata(metadata, bigName, '', 0, function(md)
	{
		if(md.type == 'Object')
		{
			classes[md.absoluteName] = md
		}
	})
	visitObjectMetadata(metadata, bigName, '', 0, function(md)
	{
		var methodNameSplitted = md.absoluteName.split('.')
		methodNameSplitted.pop()
		var className = methodNameSplitted.join('.')
		if(!className || !classes[className])
		{
			return
		}
		if(md.type == 'Function')
		{
			classes[className].methods = classes[className].methods || []
			classes[className].methods.push(md)
			// extractMethodSignature(md)
		}
		else if(md.type !== 'Object')
		{
			// console.log(className)
			classes[className].properties = classes[className].properties || []
			classes[className].properties.push(md)
		}
		delete classes[className].objectMetadata
	})
	return classes
}


var generateJsDoc = function(config)
{
	var metadata = config.metadata
	var bigName = config.bigName
	var moduleName = config.module
	var buffer = config.buffer
	// if(_.isFunction(metadata))
	// {
	// 	buffer.push('@module '+mainModule)
	// 	buffer.push('@function '+globalProperty)
	// 	// var metadata = extractObjectMetadatas(metadata, 'LoginRegister', true)
	// 	// console.log('global function ', globalProperty )
	// // 	//TODO
	// }

	// else 
	if(_.isObject(metadata))
	{
		var classes = generateOopAst(metadata, bigName)
		buffer.push('@module '+moduleName)
		_.each(classes, (c)=>
		{
			buffer.push('@class '+c.absoluteName)
			_.each(c.properties, (m)=>
			{
				buffer.push('@property ' + m.name)
			})
			_.each(c.methods, (m)=>
			{
				buffer.push('@method ' + m.name)
				// console.log(m)
				_.each(m.signature.params, (p)=>
				{
					buffer.push('@param ' + p)
				})
			})
		})
	}


	
}


module.exports = {
	generate: generateJsDoc,
	generateOopAst: generateOopAst
}




},{"./metadata":2,"underscore":"underscore"}],1:[function(require,module,exports){
(function webpackUniversalModuleDefinition(root, factory) {
/* istanbul ignore next */
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
/* istanbul ignore next */
	else if(typeof exports === 'object')
		exports["esprima"] = factory();
	else
		root["esprima"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/* istanbul ignore if */
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*
	  Copyright JS Foundation and other contributors, https://js.foundation/

	  Redistribution and use in source and binary forms, with or without
	  modification, are permitted provided that the following conditions are met:

	    * Redistributions of source code must retain the above copyright
	      notice, this list of conditions and the following disclaimer.
	    * Redistributions in binary form must reproduce the above copyright
	      notice, this list of conditions and the following disclaimer in the
	      documentation and/or other materials provided with the distribution.

	  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
	  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
	  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
	  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
	  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
	  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
	  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
	  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
	  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/
	"use strict";
	var comment_handler_1 = __webpack_require__(1);
	var parser_1 = __webpack_require__(3);
	var jsx_parser_1 = __webpack_require__(11);
	var tokenizer_1 = __webpack_require__(15);
	function parse(code, options, delegate) {
	    var commentHandler = null;
	    var proxyDelegate = function (node, metadata) {
	        if (delegate) {
	            delegate(node, metadata);
	        }
	        if (commentHandler) {
	            commentHandler.visit(node, metadata);
	        }
	    };
	    var parserDelegate = (typeof delegate === 'function') ? proxyDelegate : null;
	    var collectComment = false;
	    if (options) {
	        collectComment = (typeof options.comment === 'boolean' && options.comment);
	        var attachComment = (typeof options.attachComment === 'boolean' && options.attachComment);
	        if (collectComment || attachComment) {
	            commentHandler = new comment_handler_1.CommentHandler();
	            commentHandler.attach = attachComment;
	            options.comment = true;
	            parserDelegate = proxyDelegate;
	        }
	    }
	    var parser;
	    if (options && typeof options.jsx === 'boolean' && options.jsx) {
	        parser = new jsx_parser_1.JSXParser(code, options, parserDelegate);
	    }
	    else {
	        parser = new parser_1.Parser(code, options, parserDelegate);
	    }
	    var ast = (parser.parseProgram());
	    if (collectComment) {
	        ast.comments = commentHandler.comments;
	    }
	    if (parser.config.tokens) {
	        ast.tokens = parser.tokens;
	    }
	    if (parser.config.tolerant) {
	        ast.errors = parser.errorHandler.errors;
	    }
	    return ast;
	}
	exports.parse = parse;
	function tokenize(code, options, delegate) {
	    var tokenizer = new tokenizer_1.Tokenizer(code, options);
	    var tokens;
	    tokens = [];
	    try {
	        while (true) {
	            var token = tokenizer.getNextToken();
	            if (!token) {
	                break;
	            }
	            if (delegate) {
	                token = delegate(token);
	            }
	            tokens.push(token);
	        }
	    }
	    catch (e) {
	        tokenizer.errorHandler.tolerate(e);
	    }
	    if (tokenizer.errorHandler.tolerant) {
	        tokens.errors = tokenizer.errors();
	    }
	    return tokens;
	}
	exports.tokenize = tokenize;
	var syntax_1 = __webpack_require__(2);
	exports.Syntax = syntax_1.Syntax;
	// Sync with *.json manifests.
	exports.version = '3.1.3';


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var syntax_1 = __webpack_require__(2);
	var CommentHandler = (function () {
	    function CommentHandler() {
	        this.attach = false;
	        this.comments = [];
	        this.stack = [];
	        this.leading = [];
	        this.trailing = [];
	    }
	    CommentHandler.prototype.insertInnerComments = function (node, metadata) {
	        //  innnerComments for properties empty block
	        //  `function a() {/** comments **\/}`
	        if (node.type === syntax_1.Syntax.BlockStatement && node.body.length === 0) {
	            var innerComments = [];
	            for (var i = this.leading.length - 1; i >= 0; --i) {
	                var entry = this.leading[i];
	                if (metadata.end.offset >= entry.start) {
	                    innerComments.unshift(entry.comment);
	                    this.leading.splice(i, 1);
	                    this.trailing.splice(i, 1);
	                }
	            }
	            if (innerComments.length) {
	                node.innerComments = innerComments;
	            }
	        }
	    };
	    CommentHandler.prototype.findTrailingComments = function (node, metadata) {
	        var trailingComments = [];
	        if (this.trailing.length > 0) {
	            for (var i = this.trailing.length - 1; i >= 0; --i) {
	                var entry_1 = this.trailing[i];
	                if (entry_1.start >= metadata.end.offset) {
	                    trailingComments.unshift(entry_1.comment);
	                }
	            }
	            this.trailing.length = 0;
	            return trailingComments;
	        }
	        var entry = this.stack[this.stack.length - 1];
	        if (entry && entry.node.trailingComments) {
	            var firstComment = entry.node.trailingComments[0];
	            if (firstComment && firstComment.range[0] >= metadata.end.offset) {
	                trailingComments = entry.node.trailingComments;
	                delete entry.node.trailingComments;
	            }
	        }
	        return trailingComments;
	    };
	    CommentHandler.prototype.findLeadingComments = function (node, metadata) {
	        var leadingComments = [];
	        var target;
	        while (this.stack.length > 0) {
	            var entry = this.stack[this.stack.length - 1];
	            if (entry && entry.start >= metadata.start.offset) {
	                target = this.stack.pop().node;
	            }
	            else {
	                break;
	            }
	        }
	        if (target) {
	            var count = target.leadingComments ? target.leadingComments.length : 0;
	            for (var i = count - 1; i >= 0; --i) {
	                var comment = target.leadingComments[i];
	                if (comment.range[1] <= metadata.start.offset) {
	                    leadingComments.unshift(comment);
	                    target.leadingComments.splice(i, 1);
	                }
	            }
	            if (target.leadingComments && target.leadingComments.length === 0) {
	                delete target.leadingComments;
	            }
	            return leadingComments;
	        }
	        for (var i = this.leading.length - 1; i >= 0; --i) {
	            var entry = this.leading[i];
	            if (entry.start <= metadata.start.offset) {
	                leadingComments.unshift(entry.comment);
	                this.leading.splice(i, 1);
	            }
	        }
	        return leadingComments;
	    };
	    CommentHandler.prototype.visitNode = function (node, metadata) {
	        if (node.type === syntax_1.Syntax.Program && node.body.length > 0) {
	            return;
	        }
	        this.insertInnerComments(node, metadata);
	        var trailingComments = this.findTrailingComments(node, metadata);
	        var leadingComments = this.findLeadingComments(node, metadata);
	        if (leadingComments.length > 0) {
	            node.leadingComments = leadingComments;
	        }
	        if (trailingComments.length > 0) {
	            node.trailingComments = trailingComments;
	        }
	        this.stack.push({
	            node: node,
	            start: metadata.start.offset
	        });
	    };
	    CommentHandler.prototype.visitComment = function (node, metadata) {
	        var type = (node.type[0] === 'L') ? 'Line' : 'Block';
	        var comment = {
	            type: type,
	            value: node.value
	        };
	        if (node.range) {
	            comment.range = node.range;
	        }
	        if (node.loc) {
	            comment.loc = node.loc;
	        }
	        this.comments.push(comment);
	        if (this.attach) {
	            var entry = {
	                comment: {
	                    type: type,
	                    value: node.value,
	                    range: [metadata.start.offset, metadata.end.offset]
	                },
	                start: metadata.start.offset
	            };
	            if (node.loc) {
	                entry.comment.loc = node.loc;
	            }
	            node.type = type;
	            this.leading.push(entry);
	            this.trailing.push(entry);
	        }
	    };
	    CommentHandler.prototype.visit = function (node, metadata) {
	        if (node.type === 'LineComment') {
	            this.visitComment(node, metadata);
	        }
	        else if (node.type === 'BlockComment') {
	            this.visitComment(node, metadata);
	        }
	        else if (this.attach) {
	            this.visitNode(node, metadata);
	        }
	    };
	    return CommentHandler;
	}());
	exports.CommentHandler = CommentHandler;


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	exports.Syntax = {
	    AssignmentExpression: 'AssignmentExpression',
	    AssignmentPattern: 'AssignmentPattern',
	    ArrayExpression: 'ArrayExpression',
	    ArrayPattern: 'ArrayPattern',
	    ArrowFunctionExpression: 'ArrowFunctionExpression',
	    BlockStatement: 'BlockStatement',
	    BinaryExpression: 'BinaryExpression',
	    BreakStatement: 'BreakStatement',
	    CallExpression: 'CallExpression',
	    CatchClause: 'CatchClause',
	    ClassBody: 'ClassBody',
	    ClassDeclaration: 'ClassDeclaration',
	    ClassExpression: 'ClassExpression',
	    ConditionalExpression: 'ConditionalExpression',
	    ContinueStatement: 'ContinueStatement',
	    DoWhileStatement: 'DoWhileStatement',
	    DebuggerStatement: 'DebuggerStatement',
	    EmptyStatement: 'EmptyStatement',
	    ExportAllDeclaration: 'ExportAllDeclaration',
	    ExportDefaultDeclaration: 'ExportDefaultDeclaration',
	    ExportNamedDeclaration: 'ExportNamedDeclaration',
	    ExportSpecifier: 'ExportSpecifier',
	    ExpressionStatement: 'ExpressionStatement',
	    ForStatement: 'ForStatement',
	    ForOfStatement: 'ForOfStatement',
	    ForInStatement: 'ForInStatement',
	    FunctionDeclaration: 'FunctionDeclaration',
	    FunctionExpression: 'FunctionExpression',
	    Identifier: 'Identifier',
	    IfStatement: 'IfStatement',
	    ImportDeclaration: 'ImportDeclaration',
	    ImportDefaultSpecifier: 'ImportDefaultSpecifier',
	    ImportNamespaceSpecifier: 'ImportNamespaceSpecifier',
	    ImportSpecifier: 'ImportSpecifier',
	    Literal: 'Literal',
	    LabeledStatement: 'LabeledStatement',
	    LogicalExpression: 'LogicalExpression',
	    MemberExpression: 'MemberExpression',
	    MetaProperty: 'MetaProperty',
	    MethodDefinition: 'MethodDefinition',
	    NewExpression: 'NewExpression',
	    ObjectExpression: 'ObjectExpression',
	    ObjectPattern: 'ObjectPattern',
	    Program: 'Program',
	    Property: 'Property',
	    RestElement: 'RestElement',
	    ReturnStatement: 'ReturnStatement',
	    SequenceExpression: 'SequenceExpression',
	    SpreadElement: 'SpreadElement',
	    Super: 'Super',
	    SwitchCase: 'SwitchCase',
	    SwitchStatement: 'SwitchStatement',
	    TaggedTemplateExpression: 'TaggedTemplateExpression',
	    TemplateElement: 'TemplateElement',
	    TemplateLiteral: 'TemplateLiteral',
	    ThisExpression: 'ThisExpression',
	    ThrowStatement: 'ThrowStatement',
	    TryStatement: 'TryStatement',
	    UnaryExpression: 'UnaryExpression',
	    UpdateExpression: 'UpdateExpression',
	    VariableDeclaration: 'VariableDeclaration',
	    VariableDeclarator: 'VariableDeclarator',
	    WhileStatement: 'WhileStatement',
	    WithStatement: 'WithStatement',
	    YieldExpression: 'YieldExpression'
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var assert_1 = __webpack_require__(4);
	var messages_1 = __webpack_require__(5);
	var error_handler_1 = __webpack_require__(6);
	var token_1 = __webpack_require__(7);
	var scanner_1 = __webpack_require__(8);
	var syntax_1 = __webpack_require__(2);
	var Node = __webpack_require__(10);
	var ArrowParameterPlaceHolder = 'ArrowParameterPlaceHolder';
	var Parser = (function () {
	    function Parser(code, options, delegate) {
	        if (options === void 0) { options = {}; }
	        this.config = {
	            range: (typeof options.range === 'boolean') && options.range,
	            loc: (typeof options.loc === 'boolean') && options.loc,
	            source: null,
	            tokens: (typeof options.tokens === 'boolean') && options.tokens,
	            comment: (typeof options.comment === 'boolean') && options.comment,
	            tolerant: (typeof options.tolerant === 'boolean') && options.tolerant
	        };
	        if (this.config.loc && options.source && options.source !== null) {
	            this.config.source = String(options.source);
	        }
	        this.delegate = delegate;
	        this.errorHandler = new error_handler_1.ErrorHandler();
	        this.errorHandler.tolerant = this.config.tolerant;
	        this.scanner = new scanner_1.Scanner(code, this.errorHandler);
	        this.scanner.trackComment = this.config.comment;
	        this.operatorPrecedence = {
	            ')': 0,
	            ';': 0,
	            ',': 0,
	            '=': 0,
	            ']': 0,
	            '||': 1,
	            '&&': 2,
	            '|': 3,
	            '^': 4,
	            '&': 5,
	            '==': 6,
	            '!=': 6,
	            '===': 6,
	            '!==': 6,
	            '<': 7,
	            '>': 7,
	            '<=': 7,
	            '>=': 7,
	            '<<': 8,
	            '>>': 8,
	            '>>>': 8,
	            '+': 9,
	            '-': 9,
	            '*': 11,
	            '/': 11,
	            '%': 11
	        };
	        this.sourceType = (options && options.sourceType === 'module') ? 'module' : 'script';
	        this.lookahead = null;
	        this.hasLineTerminator = false;
	        this.context = {
	            allowIn: true,
	            allowYield: true,
	            firstCoverInitializedNameError: null,
	            isAssignmentTarget: false,
	            isBindingElement: false,
	            inFunctionBody: false,
	            inIteration: false,
	            inSwitch: false,
	            labelSet: {},
	            strict: (this.sourceType === 'module')
	        };
	        this.tokens = [];
	        this.startMarker = {
	            index: 0,
	            lineNumber: this.scanner.lineNumber,
	            lineStart: 0
	        };
	        this.lastMarker = {
	            index: 0,
	            lineNumber: this.scanner.lineNumber,
	            lineStart: 0
	        };
	        this.nextToken();
	        this.lastMarker = {
	            index: this.scanner.index,
	            lineNumber: this.scanner.lineNumber,
	            lineStart: this.scanner.lineStart
	        };
	    }
	    Parser.prototype.throwError = function (messageFormat) {
	        var values = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            values[_i - 1] = arguments[_i];
	        }
	        var args = Array.prototype.slice.call(arguments, 1);
	        var msg = messageFormat.replace(/%(\d)/g, function (whole, idx) {
	            assert_1.assert(idx < args.length, 'Message reference must be in range');
	            return args[idx];
	        });
	        var index = this.lastMarker.index;
	        var line = this.lastMarker.lineNumber;
	        var column = this.lastMarker.index - this.lastMarker.lineStart + 1;
	        throw this.errorHandler.createError(index, line, column, msg);
	    };
	    Parser.prototype.tolerateError = function (messageFormat) {
	        var values = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            values[_i - 1] = arguments[_i];
	        }
	        var args = Array.prototype.slice.call(arguments, 1);
	        var msg = messageFormat.replace(/%(\d)/g, function (whole, idx) {
	            assert_1.assert(idx < args.length, 'Message reference must be in range');
	            return args[idx];
	        });
	        var index = this.lastMarker.index;
	        var line = this.scanner.lineNumber;
	        var column = this.lastMarker.index - this.lastMarker.lineStart + 1;
	        this.errorHandler.tolerateError(index, line, column, msg);
	    };
	    // Throw an exception because of the token.
	    Parser.prototype.unexpectedTokenError = function (token, message) {
	        var msg = message || messages_1.Messages.UnexpectedToken;
	        var value;
	        if (token) {
	            if (!message) {
	                msg = (token.type === token_1.Token.EOF) ? messages_1.Messages.UnexpectedEOS :
	                    (token.type === token_1.Token.Identifier) ? messages_1.Messages.UnexpectedIdentifier :
	                        (token.type === token_1.Token.NumericLiteral) ? messages_1.Messages.UnexpectedNumber :
	                            (token.type === token_1.Token.StringLiteral) ? messages_1.Messages.UnexpectedString :
	                                (token.type === token_1.Token.Template) ? messages_1.Messages.UnexpectedTemplate :
	                                    messages_1.Messages.UnexpectedToken;
	                if (token.type === token_1.Token.Keyword) {
	                    if (this.scanner.isFutureReservedWord(token.value)) {
	                        msg = messages_1.Messages.UnexpectedReserved;
	                    }
	                    else if (this.context.strict && this.scanner.isStrictModeReservedWord(token.value)) {
	                        msg = messages_1.Messages.StrictReservedWord;
	                    }
	                }
	            }
	            value = (token.type === token_1.Token.Template) ? token.value.raw : token.value;
	        }
	        else {
	            value = 'ILLEGAL';
	        }
	        msg = msg.replace('%0', value);
	        if (token && typeof token.lineNumber === 'number') {
	            var index = token.start;
	            var line = token.lineNumber;
	            var column = token.start - this.lastMarker.lineStart + 1;
	            return this.errorHandler.createError(index, line, column, msg);
	        }
	        else {
	            var index = this.lastMarker.index;
	            var line = this.lastMarker.lineNumber;
	            var column = index - this.lastMarker.lineStart + 1;
	            return this.errorHandler.createError(index, line, column, msg);
	        }
	    };
	    Parser.prototype.throwUnexpectedToken = function (token, message) {
	        throw this.unexpectedTokenError(token, message);
	    };
	    Parser.prototype.tolerateUnexpectedToken = function (token, message) {
	        this.errorHandler.tolerate(this.unexpectedTokenError(token, message));
	    };
	    Parser.prototype.collectComments = function () {
	        if (!this.config.comment) {
	            this.scanner.scanComments();
	        }
	        else {
	            var comments = this.scanner.scanComments();
	            if (comments.length > 0 && this.delegate) {
	                for (var i = 0; i < comments.length; ++i) {
	                    var e = comments[i];
	                    var node = void 0;
	                    node = {
	                        type: e.multiLine ? 'BlockComment' : 'LineComment',
	                        value: this.scanner.source.slice(e.slice[0], e.slice[1])
	                    };
	                    if (this.config.range) {
	                        node.range = e.range;
	                    }
	                    if (this.config.loc) {
	                        node.loc = e.loc;
	                    }
	                    var metadata = {
	                        start: {
	                            line: e.loc.start.line,
	                            column: e.loc.start.column,
	                            offset: e.range[0]
	                        },
	                        end: {
	                            line: e.loc.end.line,
	                            column: e.loc.end.column,
	                            offset: e.range[1]
	                        }
	                    };
	                    this.delegate(node, metadata);
	                }
	            }
	        }
	    };
	    // From internal representation to an external structure
	    Parser.prototype.getTokenRaw = function (token) {
	        return this.scanner.source.slice(token.start, token.end);
	    };
	    Parser.prototype.convertToken = function (token) {
	        var t;
	        t = {
	            type: token_1.TokenName[token.type],
	            value: this.getTokenRaw(token)
	        };
	        if (this.config.range) {
	            t.range = [token.start, token.end];
	        }
	        if (this.config.loc) {
	            t.loc = {
	                start: {
	                    line: this.startMarker.lineNumber,
	                    column: this.startMarker.index - this.startMarker.lineStart
	                },
	                end: {
	                    line: this.scanner.lineNumber,
	                    column: this.scanner.index - this.scanner.lineStart
	                }
	            };
	        }
	        if (token.regex) {
	            t.regex = token.regex;
	        }
	        return t;
	    };
	    Parser.prototype.nextToken = function () {
	        var token = this.lookahead;
	        this.lastMarker.index = this.scanner.index;
	        this.lastMarker.lineNumber = this.scanner.lineNumber;
	        this.lastMarker.lineStart = this.scanner.lineStart;
	        this.collectComments();
	        this.startMarker.index = this.scanner.index;
	        this.startMarker.lineNumber = this.scanner.lineNumber;
	        this.startMarker.lineStart = this.scanner.lineStart;
	        var next;
	        next = this.scanner.lex();
	        this.hasLineTerminator = (token && next) ? (token.lineNumber !== next.lineNumber) : false;
	        if (next && this.context.strict && next.type === token_1.Token.Identifier) {
	            if (this.scanner.isStrictModeReservedWord(next.value)) {
	                next.type = token_1.Token.Keyword;
	            }
	        }
	        this.lookahead = next;
	        if (this.config.tokens && next.type !== token_1.Token.EOF) {
	            this.tokens.push(this.convertToken(next));
	        }
	        return token;
	    };
	    Parser.prototype.nextRegexToken = function () {
	        this.collectComments();
	        var token = this.scanner.scanRegExp();
	        if (this.config.tokens) {
	            // Pop the previous token, '/' or '/='
	            // This is added from the lookahead token.
	            this.tokens.pop();
	            this.tokens.push(this.convertToken(token));
	        }
	        // Prime the next lookahead.
	        this.lookahead = token;
	        this.nextToken();
	        return token;
	    };
	    Parser.prototype.createNode = function () {
	        return {
	            index: this.startMarker.index,
	            line: this.startMarker.lineNumber,
	            column: this.startMarker.index - this.startMarker.lineStart
	        };
	    };
	    Parser.prototype.startNode = function (token) {
	        return {
	            index: token.start,
	            line: token.lineNumber,
	            column: token.start - token.lineStart
	        };
	    };
	    Parser.prototype.finalize = function (meta, node) {
	        if (this.config.range) {
	            node.range = [meta.index, this.lastMarker.index];
	        }
	        if (this.config.loc) {
	            node.loc = {
	                start: {
	                    line: meta.line,
	                    column: meta.column
	                },
	                end: {
	                    line: this.lastMarker.lineNumber,
	                    column: this.lastMarker.index - this.lastMarker.lineStart
	                }
	            };
	            if (this.config.source) {
	                node.loc.source = this.config.source;
	            }
	        }
	        if (this.delegate) {
	            var metadata = {
	                start: {
	                    line: meta.line,
	                    column: meta.column,
	                    offset: meta.index
	                },
	                end: {
	                    line: this.lastMarker.lineNumber,
	                    column: this.lastMarker.index - this.lastMarker.lineStart,
	                    offset: this.lastMarker.index
	                }
	            };
	            this.delegate(node, metadata);
	        }
	        return node;
	    };
	    // Expect the next token to match the specified punctuator.
	    // If not, an exception will be thrown.
	    Parser.prototype.expect = function (value) {
	        var token = this.nextToken();
	        if (token.type !== token_1.Token.Punctuator || token.value !== value) {
	            this.throwUnexpectedToken(token);
	        }
	    };
	    // Quietly expect a comma when in tolerant mode, otherwise delegates to expect().
	    Parser.prototype.expectCommaSeparator = function () {
	        if (this.config.tolerant) {
	            var token = this.lookahead;
	            if (token.type === token_1.Token.Punctuator && token.value === ',') {
	                this.nextToken();
	            }
	            else if (token.type === token_1.Token.Punctuator && token.value === ';') {
	                this.nextToken();
	                this.tolerateUnexpectedToken(token);
	            }
	            else {
	                this.tolerateUnexpectedToken(token, messages_1.Messages.UnexpectedToken);
	            }
	        }
	        else {
	            this.expect(',');
	        }
	    };
	    // Expect the next token to match the specified keyword.
	    // If not, an exception will be thrown.
	    Parser.prototype.expectKeyword = function (keyword) {
	        var token = this.nextToken();
	        if (token.type !== token_1.Token.Keyword || token.value !== keyword) {
	            this.throwUnexpectedToken(token);
	        }
	    };
	    // Return true if the next token matches the specified punctuator.
	    Parser.prototype.match = function (value) {
	        return this.lookahead.type === token_1.Token.Punctuator && this.lookahead.value === value;
	    };
	    // Return true if the next token matches the specified keyword
	    Parser.prototype.matchKeyword = function (keyword) {
	        return this.lookahead.type === token_1.Token.Keyword && this.lookahead.value === keyword;
	    };
	    // Return true if the next token matches the specified contextual keyword
	    // (where an identifier is sometimes a keyword depending on the context)
	    Parser.prototype.matchContextualKeyword = function (keyword) {
	        return this.lookahead.type === token_1.Token.Identifier && this.lookahead.value === keyword;
	    };
	    // Return true if the next token is an assignment operator
	    Parser.prototype.matchAssign = function () {
	        if (this.lookahead.type !== token_1.Token.Punctuator) {
	            return false;
	        }
	        var op = this.lookahead.value;
	        return op === '=' ||
	            op === '*=' ||
	            op === '**=' ||
	            op === '/=' ||
	            op === '%=' ||
	            op === '+=' ||
	            op === '-=' ||
	            op === '<<=' ||
	            op === '>>=' ||
	            op === '>>>=' ||
	            op === '&=' ||
	            op === '^=' ||
	            op === '|=';
	    };
	    // Cover grammar support.
	    //
	    // When an assignment expression position starts with an left parenthesis, the determination of the type
	    // of the syntax is to be deferred arbitrarily long until the end of the parentheses pair (plus a lookahead)
	    // or the first comma. This situation also defers the determination of all the expressions nested in the pair.
	    //
	    // There are three productions that can be parsed in a parentheses pair that needs to be determined
	    // after the outermost pair is closed. They are:
	    //
	    //   1. AssignmentExpression
	    //   2. BindingElements
	    //   3. AssignmentTargets
	    //
	    // In order to avoid exponential backtracking, we use two flags to denote if the production can be
	    // binding element or assignment target.
	    //
	    // The three productions have the relationship:
	    //
	    //   BindingElements ⊆ AssignmentTargets ⊆ AssignmentExpression
	    //
	    // with a single exception that CoverInitializedName when used directly in an Expression, generates
	    // an early error. Therefore, we need the third state, firstCoverInitializedNameError, to track the
	    // first usage of CoverInitializedName and report it when we reached the end of the parentheses pair.
	    //
	    // isolateCoverGrammar function runs the given parser function with a new cover grammar context, and it does not
	    // effect the current flags. This means the production the parser parses is only used as an expression. Therefore
	    // the CoverInitializedName check is conducted.
	    //
	    // inheritCoverGrammar function runs the given parse function with a new cover grammar context, and it propagates
	    // the flags outside of the parser. This means the production the parser parses is used as a part of a potential
	    // pattern. The CoverInitializedName check is deferred.
	    Parser.prototype.isolateCoverGrammar = function (parseFunction) {
	        var previousIsBindingElement = this.context.isBindingElement;
	        var previousIsAssignmentTarget = this.context.isAssignmentTarget;
	        var previousFirstCoverInitializedNameError = this.context.firstCoverInitializedNameError;
	        this.context.isBindingElement = true;
	        this.context.isAssignmentTarget = true;
	        this.context.firstCoverInitializedNameError = null;
	        var result = parseFunction.call(this);
	        if (this.context.firstCoverInitializedNameError !== null) {
	            this.throwUnexpectedToken(this.context.firstCoverInitializedNameError);
	        }
	        this.context.isBindingElement = previousIsBindingElement;
	        this.context.isAssignmentTarget = previousIsAssignmentTarget;
	        this.context.firstCoverInitializedNameError = previousFirstCoverInitializedNameError;
	        return result;
	    };
	    Parser.prototype.inheritCoverGrammar = function (parseFunction) {
	        var previousIsBindingElement = this.context.isBindingElement;
	        var previousIsAssignmentTarget = this.context.isAssignmentTarget;
	        var previousFirstCoverInitializedNameError = this.context.firstCoverInitializedNameError;
	        this.context.isBindingElement = true;
	        this.context.isAssignmentTarget = true;
	        this.context.firstCoverInitializedNameError = null;
	        var result = parseFunction.call(this);
	        this.context.isBindingElement = this.context.isBindingElement && previousIsBindingElement;
	        this.context.isAssignmentTarget = this.context.isAssignmentTarget && previousIsAssignmentTarget;
	        this.context.firstCoverInitializedNameError = previousFirstCoverInitializedNameError || this.context.firstCoverInitializedNameError;
	        return result;
	    };
	    Parser.prototype.consumeSemicolon = function () {
	        if (this.match(';')) {
	            this.nextToken();
	        }
	        else if (!this.hasLineTerminator) {
	            if (this.lookahead.type !== token_1.Token.EOF && !this.match('}')) {
	                this.throwUnexpectedToken(this.lookahead);
	            }
	            this.lastMarker.index = this.startMarker.index;
	            this.lastMarker.lineNumber = this.startMarker.lineNumber;
	            this.lastMarker.lineStart = this.startMarker.lineStart;
	        }
	    };
	    // ECMA-262 12.2 Primary Expressions
	    Parser.prototype.parsePrimaryExpression = function () {
	        var node = this.createNode();
	        var expr;
	        var value, token, raw;
	        switch (this.lookahead.type) {
	            case token_1.Token.Identifier:
	                if (this.sourceType === 'module' && this.lookahead.value === 'await') {
	                    this.tolerateUnexpectedToken(this.lookahead);
	                }
	                expr = this.finalize(node, new Node.Identifier(this.nextToken().value));
	                break;
	            case token_1.Token.NumericLiteral:
	            case token_1.Token.StringLiteral:
	                if (this.context.strict && this.lookahead.octal) {
	                    this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.StrictOctalLiteral);
	                }
	                this.context.isAssignmentTarget = false;
	                this.context.isBindingElement = false;
	                token = this.nextToken();
	                raw = this.getTokenRaw(token);
	                expr = this.finalize(node, new Node.Literal(token.value, raw));
	                break;
	            case token_1.Token.BooleanLiteral:
	                this.context.isAssignmentTarget = false;
	                this.context.isBindingElement = false;
	                token = this.nextToken();
	                token.value = (token.value === 'true');
	                raw = this.getTokenRaw(token);
	                expr = this.finalize(node, new Node.Literal(token.value, raw));
	                break;
	            case token_1.Token.NullLiteral:
	                this.context.isAssignmentTarget = false;
	                this.context.isBindingElement = false;
	                token = this.nextToken();
	                token.value = null;
	                raw = this.getTokenRaw(token);
	                expr = this.finalize(node, new Node.Literal(token.value, raw));
	                break;
	            case token_1.Token.Template:
	                expr = this.parseTemplateLiteral();
	                break;
	            case token_1.Token.Punctuator:
	                value = this.lookahead.value;
	                switch (value) {
	                    case '(':
	                        this.context.isBindingElement = false;
	                        expr = this.inheritCoverGrammar(this.parseGroupExpression);
	                        break;
	                    case '[':
	                        expr = this.inheritCoverGrammar(this.parseArrayInitializer);
	                        break;
	                    case '{':
	                        expr = this.inheritCoverGrammar(this.parseObjectInitializer);
	                        break;
	                    case '/':
	                    case '/=':
	                        this.context.isAssignmentTarget = false;
	                        this.context.isBindingElement = false;
	                        this.scanner.index = this.startMarker.index;
	                        token = this.nextRegexToken();
	                        raw = this.getTokenRaw(token);
	                        expr = this.finalize(node, new Node.RegexLiteral(token.value, raw, token.regex));
	                        break;
	                    default:
	                        this.throwUnexpectedToken(this.nextToken());
	                }
	                break;
	            case token_1.Token.Keyword:
	                if (!this.context.strict && this.context.allowYield && this.matchKeyword('yield')) {
	                    expr = this.parseIdentifierName();
	                }
	                else if (!this.context.strict && this.matchKeyword('let')) {
	                    expr = this.finalize(node, new Node.Identifier(this.nextToken().value));
	                }
	                else {
	                    this.context.isAssignmentTarget = false;
	                    this.context.isBindingElement = false;
	                    if (this.matchKeyword('function')) {
	                        expr = this.parseFunctionExpression();
	                    }
	                    else if (this.matchKeyword('this')) {
	                        this.nextToken();
	                        expr = this.finalize(node, new Node.ThisExpression());
	                    }
	                    else if (this.matchKeyword('class')) {
	                        expr = this.parseClassExpression();
	                    }
	                    else {
	                        this.throwUnexpectedToken(this.nextToken());
	                    }
	                }
	                break;
	            default:
	                this.throwUnexpectedToken(this.nextToken());
	        }
	        return expr;
	    };
	    // ECMA-262 12.2.5 Array Initializer
	    Parser.prototype.parseSpreadElement = function () {
	        var node = this.createNode();
	        this.expect('...');
	        var arg = this.inheritCoverGrammar(this.parseAssignmentExpression);
	        return this.finalize(node, new Node.SpreadElement(arg));
	    };
	    Parser.prototype.parseArrayInitializer = function () {
	        var node = this.createNode();
	        var elements = [];
	        this.expect('[');
	        while (!this.match(']')) {
	            if (this.match(',')) {
	                this.nextToken();
	                elements.push(null);
	            }
	            else if (this.match('...')) {
	                var element = this.parseSpreadElement();
	                if (!this.match(']')) {
	                    this.context.isAssignmentTarget = false;
	                    this.context.isBindingElement = false;
	                    this.expect(',');
	                }
	                elements.push(element);
	            }
	            else {
	                elements.push(this.inheritCoverGrammar(this.parseAssignmentExpression));
	                if (!this.match(']')) {
	                    this.expect(',');
	                }
	            }
	        }
	        this.expect(']');
	        return this.finalize(node, new Node.ArrayExpression(elements));
	    };
	    // ECMA-262 12.2.6 Object Initializer
	    Parser.prototype.parsePropertyMethod = function (params) {
	        this.context.isAssignmentTarget = false;
	        this.context.isBindingElement = false;
	        var previousStrict = this.context.strict;
	        var body = this.isolateCoverGrammar(this.parseFunctionSourceElements);
	        if (this.context.strict && params.firstRestricted) {
	            this.tolerateUnexpectedToken(params.firstRestricted, params.message);
	        }
	        if (this.context.strict && params.stricted) {
	            this.tolerateUnexpectedToken(params.stricted, params.message);
	        }
	        this.context.strict = previousStrict;
	        return body;
	    };
	    Parser.prototype.parsePropertyMethodFunction = function () {
	        var isGenerator = false;
	        var node = this.createNode();
	        var previousAllowYield = this.context.allowYield;
	        this.context.allowYield = false;
	        var params = this.parseFormalParameters();
	        var method = this.parsePropertyMethod(params);
	        this.context.allowYield = previousAllowYield;
	        return this.finalize(node, new Node.FunctionExpression(null, params.params, method, isGenerator));
	    };
	    Parser.prototype.parseObjectPropertyKey = function () {
	        var node = this.createNode();
	        var token = this.nextToken();
	        var key = null;
	        switch (token.type) {
	            case token_1.Token.StringLiteral:
	            case token_1.Token.NumericLiteral:
	                if (this.context.strict && token.octal) {
	                    this.tolerateUnexpectedToken(token, messages_1.Messages.StrictOctalLiteral);
	                }
	                var raw = this.getTokenRaw(token);
	                key = this.finalize(node, new Node.Literal(token.value, raw));
	                break;
	            case token_1.Token.Identifier:
	            case token_1.Token.BooleanLiteral:
	            case token_1.Token.NullLiteral:
	            case token_1.Token.Keyword:
	                key = this.finalize(node, new Node.Identifier(token.value));
	                break;
	            case token_1.Token.Punctuator:
	                if (token.value === '[') {
	                    key = this.isolateCoverGrammar(this.parseAssignmentExpression);
	                    this.expect(']');
	                }
	                else {
	                    this.throwUnexpectedToken(token);
	                }
	                break;
	            default:
	                this.throwUnexpectedToken(token);
	        }
	        return key;
	    };
	    Parser.prototype.isPropertyKey = function (key, value) {
	        return (key.type === syntax_1.Syntax.Identifier && key.name === value) ||
	            (key.type === syntax_1.Syntax.Literal && key.value === value);
	    };
	    Parser.prototype.parseObjectProperty = function (hasProto) {
	        var node = this.createNode();
	        var token = this.lookahead;
	        var kind;
	        var key;
	        var value;
	        var computed = false;
	        var method = false;
	        var shorthand = false;
	        if (token.type === token_1.Token.Identifier) {
	            this.nextToken();
	            key = this.finalize(node, new Node.Identifier(token.value));
	        }
	        else if (this.match('*')) {
	            this.nextToken();
	        }
	        else {
	            computed = this.match('[');
	            key = this.parseObjectPropertyKey();
	        }
	        var lookaheadPropertyKey = this.qualifiedPropertyName(this.lookahead);
	        if (token.type === token_1.Token.Identifier && token.value === 'get' && lookaheadPropertyKey) {
	            kind = 'get';
	            computed = this.match('[');
	            key = this.parseObjectPropertyKey();
	            this.context.allowYield = false;
	            value = this.parseGetterMethod();
	        }
	        else if (token.type === token_1.Token.Identifier && token.value === 'set' && lookaheadPropertyKey) {
	            kind = 'set';
	            computed = this.match('[');
	            key = this.parseObjectPropertyKey();
	            value = this.parseSetterMethod();
	        }
	        else if (token.type === token_1.Token.Punctuator && token.value === '*' && lookaheadPropertyKey) {
	            kind = 'init';
	            computed = this.match('[');
	            key = this.parseObjectPropertyKey();
	            value = this.parseGeneratorMethod();
	            method = true;
	        }
	        else {
	            if (!key) {
	                this.throwUnexpectedToken(this.lookahead);
	            }
	            kind = 'init';
	            if (this.match(':')) {
	                if (!computed && this.isPropertyKey(key, '__proto__')) {
	                    if (hasProto.value) {
	                        this.tolerateError(messages_1.Messages.DuplicateProtoProperty);
	                    }
	                    hasProto.value = true;
	                }
	                this.nextToken();
	                value = this.inheritCoverGrammar(this.parseAssignmentExpression);
	            }
	            else if (this.match('(')) {
	                value = this.parsePropertyMethodFunction();
	                method = true;
	            }
	            else if (token.type === token_1.Token.Identifier) {
	                var id = this.finalize(node, new Node.Identifier(token.value));
	                if (this.match('=')) {
	                    this.context.firstCoverInitializedNameError = this.lookahead;
	                    this.nextToken();
	                    shorthand = true;
	                    var init = this.isolateCoverGrammar(this.parseAssignmentExpression);
	                    value = this.finalize(node, new Node.AssignmentPattern(id, init));
	                }
	                else {
	                    shorthand = true;
	                    value = id;
	                }
	            }
	            else {
	                this.throwUnexpectedToken(this.nextToken());
	            }
	        }
	        return this.finalize(node, new Node.Property(kind, key, computed, value, method, shorthand));
	    };
	    Parser.prototype.parseObjectInitializer = function () {
	        var node = this.createNode();
	        this.expect('{');
	        var properties = [];
	        var hasProto = { value: false };
	        while (!this.match('}')) {
	            properties.push(this.parseObjectProperty(hasProto));
	            if (!this.match('}')) {
	                this.expectCommaSeparator();
	            }
	        }
	        this.expect('}');
	        return this.finalize(node, new Node.ObjectExpression(properties));
	    };
	    // ECMA-262 12.2.9 Template Literals
	    Parser.prototype.parseTemplateHead = function () {
	        assert_1.assert(this.lookahead.head, 'Template literal must start with a template head');
	        var node = this.createNode();
	        var token = this.nextToken();
	        var value = {
	            raw: token.value.raw,
	            cooked: token.value.cooked
	        };
	        return this.finalize(node, new Node.TemplateElement(value, token.tail));
	    };
	    Parser.prototype.parseTemplateElement = function () {
	        if (this.lookahead.type !== token_1.Token.Template) {
	            this.throwUnexpectedToken();
	        }
	        var node = this.createNode();
	        var token = this.nextToken();
	        var value = {
	            raw: token.value.raw,
	            cooked: token.value.cooked
	        };
	        return this.finalize(node, new Node.TemplateElement(value, token.tail));
	    };
	    Parser.prototype.parseTemplateLiteral = function () {
	        var node = this.createNode();
	        var expressions = [];
	        var quasis = [];
	        var quasi = this.parseTemplateHead();
	        quasis.push(quasi);
	        while (!quasi.tail) {
	            expressions.push(this.parseExpression());
	            quasi = this.parseTemplateElement();
	            quasis.push(quasi);
	        }
	        return this.finalize(node, new Node.TemplateLiteral(quasis, expressions));
	    };
	    // ECMA-262 12.2.10 The Grouping Operator
	    Parser.prototype.reinterpretExpressionAsPattern = function (expr) {
	        switch (expr.type) {
	            case syntax_1.Syntax.Identifier:
	            case syntax_1.Syntax.MemberExpression:
	            case syntax_1.Syntax.RestElement:
	            case syntax_1.Syntax.AssignmentPattern:
	                break;
	            case syntax_1.Syntax.SpreadElement:
	                expr.type = syntax_1.Syntax.RestElement;
	                this.reinterpretExpressionAsPattern(expr.argument);
	                break;
	            case syntax_1.Syntax.ArrayExpression:
	                expr.type = syntax_1.Syntax.ArrayPattern;
	                for (var i = 0; i < expr.elements.length; i++) {
	                    if (expr.elements[i] !== null) {
	                        this.reinterpretExpressionAsPattern(expr.elements[i]);
	                    }
	                }
	                break;
	            case syntax_1.Syntax.ObjectExpression:
	                expr.type = syntax_1.Syntax.ObjectPattern;
	                for (var i = 0; i < expr.properties.length; i++) {
	                    this.reinterpretExpressionAsPattern(expr.properties[i].value);
	                }
	                break;
	            case syntax_1.Syntax.AssignmentExpression:
	                expr.type = syntax_1.Syntax.AssignmentPattern;
	                delete expr.operator;
	                this.reinterpretExpressionAsPattern(expr.left);
	                break;
	            default:
	                // Allow other node type for tolerant parsing.
	                break;
	        }
	    };
	    Parser.prototype.parseGroupExpression = function () {
	        var expr;
	        this.expect('(');
	        if (this.match(')')) {
	            this.nextToken();
	            if (!this.match('=>')) {
	                this.expect('=>');
	            }
	            expr = {
	                type: ArrowParameterPlaceHolder,
	                params: []
	            };
	        }
	        else {
	            var startToken = this.lookahead;
	            var params = [];
	            if (this.match('...')) {
	                expr = this.parseRestElement(params);
	                this.expect(')');
	                if (!this.match('=>')) {
	                    this.expect('=>');
	                }
	                expr = {
	                    type: ArrowParameterPlaceHolder,
	                    params: [expr]
	                };
	            }
	            else {
	                var arrow = false;
	                this.context.isBindingElement = true;
	                expr = this.inheritCoverGrammar(this.parseAssignmentExpression);
	                if (this.match(',')) {
	                    var expressions = [];
	                    this.context.isAssignmentTarget = false;
	                    expressions.push(expr);
	                    while (this.startMarker.index < this.scanner.length) {
	                        if (!this.match(',')) {
	                            break;
	                        }
	                        this.nextToken();
	                        if (this.match('...')) {
	                            if (!this.context.isBindingElement) {
	                                this.throwUnexpectedToken(this.lookahead);
	                            }
	                            expressions.push(this.parseRestElement(params));
	                            this.expect(')');
	                            if (!this.match('=>')) {
	                                this.expect('=>');
	                            }
	                            this.context.isBindingElement = false;
	                            for (var i = 0; i < expressions.length; i++) {
	                                this.reinterpretExpressionAsPattern(expressions[i]);
	                            }
	                            arrow = true;
	                            expr = {
	                                type: ArrowParameterPlaceHolder,
	                                params: expressions
	                            };
	                        }
	                        else {
	                            expressions.push(this.inheritCoverGrammar(this.parseAssignmentExpression));
	                        }
	                        if (arrow) {
	                            break;
	                        }
	                    }
	                    if (!arrow) {
	                        expr = this.finalize(this.startNode(startToken), new Node.SequenceExpression(expressions));
	                    }
	                }
	                if (!arrow) {
	                    this.expect(')');
	                    if (this.match('=>')) {
	                        if (expr.type === syntax_1.Syntax.Identifier && expr.name === 'yield') {
	                            arrow = true;
	                            expr = {
	                                type: ArrowParameterPlaceHolder,
	                                params: [expr]
	                            };
	                        }
	                        if (!arrow) {
	                            if (!this.context.isBindingElement) {
	                                this.throwUnexpectedToken(this.lookahead);
	                            }
	                            if (expr.type === syntax_1.Syntax.SequenceExpression) {
	                                for (var i = 0; i < expr.expressions.length; i++) {
	                                    this.reinterpretExpressionAsPattern(expr.expressions[i]);
	                                }
	                            }
	                            else {
	                                this.reinterpretExpressionAsPattern(expr);
	                            }
	                            var params_1 = (expr.type === syntax_1.Syntax.SequenceExpression ? expr.expressions : [expr]);
	                            expr = {
	                                type: ArrowParameterPlaceHolder,
	                                params: params_1
	                            };
	                        }
	                    }
	                    this.context.isBindingElement = false;
	                }
	            }
	        }
	        return expr;
	    };
	    // ECMA-262 12.3 Left-Hand-Side Expressions
	    Parser.prototype.parseArguments = function () {
	        this.expect('(');
	        var args = [];
	        if (!this.match(')')) {
	            while (true) {
	                var expr = this.match('...') ? this.parseSpreadElement() :
	                    this.isolateCoverGrammar(this.parseAssignmentExpression);
	                args.push(expr);
	                if (this.match(')')) {
	                    break;
	                }
	                this.expectCommaSeparator();
	            }
	        }
	        this.expect(')');
	        return args;
	    };
	    Parser.prototype.isIdentifierName = function (token) {
	        return token.type === token_1.Token.Identifier ||
	            token.type === token_1.Token.Keyword ||
	            token.type === token_1.Token.BooleanLiteral ||
	            token.type === token_1.Token.NullLiteral;
	    };
	    Parser.prototype.parseIdentifierName = function () {
	        var node = this.createNode();
	        var token = this.nextToken();
	        if (!this.isIdentifierName(token)) {
	            this.throwUnexpectedToken(token);
	        }
	        return this.finalize(node, new Node.Identifier(token.value));
	    };
	    Parser.prototype.parseNewExpression = function () {
	        var node = this.createNode();
	        var id = this.parseIdentifierName();
	        assert_1.assert(id.name === 'new', 'New expression must start with `new`');
	        var expr;
	        if (this.match('.')) {
	            this.nextToken();
	            if (this.lookahead.type === token_1.Token.Identifier && this.context.inFunctionBody && this.lookahead.value === 'target') {
	                var property = this.parseIdentifierName();
	                expr = new Node.MetaProperty(id, property);
	            }
	            else {
	                this.throwUnexpectedToken(this.lookahead);
	            }
	        }
	        else {
	            var callee = this.isolateCoverGrammar(this.parseLeftHandSideExpression);
	            var args = this.match('(') ? this.parseArguments() : [];
	            expr = new Node.NewExpression(callee, args);
	            this.context.isAssignmentTarget = false;
	            this.context.isBindingElement = false;
	        }
	        return this.finalize(node, expr);
	    };
	    Parser.prototype.parseLeftHandSideExpressionAllowCall = function () {
	        var startToken = this.lookahead;
	        var previousAllowIn = this.context.allowIn;
	        this.context.allowIn = true;
	        var expr;
	        if (this.matchKeyword('super') && this.context.inFunctionBody) {
	            expr = this.createNode();
	            this.nextToken();
	            expr = this.finalize(expr, new Node.Super());
	            if (!this.match('(') && !this.match('.') && !this.match('[')) {
	                this.throwUnexpectedToken(this.lookahead);
	            }
	        }
	        else {
	            expr = this.inheritCoverGrammar(this.matchKeyword('new') ? this.parseNewExpression : this.parsePrimaryExpression);
	        }
	        while (true) {
	            if (this.match('.')) {
	                this.context.isBindingElement = false;
	                this.context.isAssignmentTarget = true;
	                this.expect('.');
	                var property = this.parseIdentifierName();
	                expr = this.finalize(this.startNode(startToken), new Node.StaticMemberExpression(expr, property));
	            }
	            else if (this.match('(')) {
	                this.context.isBindingElement = false;
	                this.context.isAssignmentTarget = false;
	                var args = this.parseArguments();
	                expr = this.finalize(this.startNode(startToken), new Node.CallExpression(expr, args));
	            }
	            else if (this.match('[')) {
	                this.context.isBindingElement = false;
	                this.context.isAssignmentTarget = true;
	                this.expect('[');
	                var property = this.isolateCoverGrammar(this.parseExpression);
	                this.expect(']');
	                expr = this.finalize(this.startNode(startToken), new Node.ComputedMemberExpression(expr, property));
	            }
	            else if (this.lookahead.type === token_1.Token.Template && this.lookahead.head) {
	                var quasi = this.parseTemplateLiteral();
	                expr = this.finalize(this.startNode(startToken), new Node.TaggedTemplateExpression(expr, quasi));
	            }
	            else {
	                break;
	            }
	        }
	        this.context.allowIn = previousAllowIn;
	        return expr;
	    };
	    Parser.prototype.parseSuper = function () {
	        var node = this.createNode();
	        this.expectKeyword('super');
	        if (!this.match('[') && !this.match('.')) {
	            this.throwUnexpectedToken(this.lookahead);
	        }
	        return this.finalize(node, new Node.Super());
	    };
	    Parser.prototype.parseLeftHandSideExpression = function () {
	        assert_1.assert(this.context.allowIn, 'callee of new expression always allow in keyword.');
	        var node = this.startNode(this.lookahead);
	        var expr = (this.matchKeyword('super') && this.context.inFunctionBody) ? this.parseSuper() :
	            this.inheritCoverGrammar(this.matchKeyword('new') ? this.parseNewExpression : this.parsePrimaryExpression);
	        while (true) {
	            if (this.match('[')) {
	                this.context.isBindingElement = false;
	                this.context.isAssignmentTarget = true;
	                this.expect('[');
	                var property = this.isolateCoverGrammar(this.parseExpression);
	                this.expect(']');
	                expr = this.finalize(node, new Node.ComputedMemberExpression(expr, property));
	            }
	            else if (this.match('.')) {
	                this.context.isBindingElement = false;
	                this.context.isAssignmentTarget = true;
	                this.expect('.');
	                var property = this.parseIdentifierName();
	                expr = this.finalize(node, new Node.StaticMemberExpression(expr, property));
	            }
	            else if (this.lookahead.type === token_1.Token.Template && this.lookahead.head) {
	                var quasi = this.parseTemplateLiteral();
	                expr = this.finalize(node, new Node.TaggedTemplateExpression(expr, quasi));
	            }
	            else {
	                break;
	            }
	        }
	        return expr;
	    };
	    // ECMA-262 12.4 Update Expressions
	    Parser.prototype.parseUpdateExpression = function () {
	        var expr;
	        var startToken = this.lookahead;
	        if (this.match('++') || this.match('--')) {
	            var node = this.startNode(startToken);
	            var token = this.nextToken();
	            expr = this.inheritCoverGrammar(this.parseUnaryExpression);
	            if (this.context.strict && expr.type === syntax_1.Syntax.Identifier && this.scanner.isRestrictedWord(expr.name)) {
	                this.tolerateError(messages_1.Messages.StrictLHSPrefix);
	            }
	            if (!this.context.isAssignmentTarget) {
	                this.tolerateError(messages_1.Messages.InvalidLHSInAssignment);
	            }
	            var prefix = true;
	            expr = this.finalize(node, new Node.UpdateExpression(token.value, expr, prefix));
	            this.context.isAssignmentTarget = false;
	            this.context.isBindingElement = false;
	        }
	        else {
	            expr = this.inheritCoverGrammar(this.parseLeftHandSideExpressionAllowCall);
	            if (!this.hasLineTerminator && this.lookahead.type === token_1.Token.Punctuator) {
	                if (this.match('++') || this.match('--')) {
	                    if (this.context.strict && expr.type === syntax_1.Syntax.Identifier && this.scanner.isRestrictedWord(expr.name)) {
	                        this.tolerateError(messages_1.Messages.StrictLHSPostfix);
	                    }
	                    if (!this.context.isAssignmentTarget) {
	                        this.tolerateError(messages_1.Messages.InvalidLHSInAssignment);
	                    }
	                    this.context.isAssignmentTarget = false;
	                    this.context.isBindingElement = false;
	                    var operator = this.nextToken().value;
	                    var prefix = false;
	                    expr = this.finalize(this.startNode(startToken), new Node.UpdateExpression(operator, expr, prefix));
	                }
	            }
	        }
	        return expr;
	    };
	    // ECMA-262 12.5 Unary Operators
	    Parser.prototype.parseUnaryExpression = function () {
	        var expr;
	        if (this.match('+') || this.match('-') || this.match('~') || this.match('!') ||
	            this.matchKeyword('delete') || this.matchKeyword('void') || this.matchKeyword('typeof')) {
	            var node = this.startNode(this.lookahead);
	            var token = this.nextToken();
	            expr = this.inheritCoverGrammar(this.parseUnaryExpression);
	            expr = this.finalize(node, new Node.UnaryExpression(token.value, expr));
	            if (this.context.strict && expr.operator === 'delete' && expr.argument.type === syntax_1.Syntax.Identifier) {
	                this.tolerateError(messages_1.Messages.StrictDelete);
	            }
	            this.context.isAssignmentTarget = false;
	            this.context.isBindingElement = false;
	        }
	        else {
	            expr = this.parseUpdateExpression();
	        }
	        return expr;
	    };
	    Parser.prototype.parseExponentiationExpression = function () {
	        var startToken = this.lookahead;
	        var expr = this.inheritCoverGrammar(this.parseUnaryExpression);
	        if (expr.type !== syntax_1.Syntax.UnaryExpression && this.match('**')) {
	            this.nextToken();
	            this.context.isAssignmentTarget = false;
	            this.context.isBindingElement = false;
	            var left = expr;
	            var right = this.isolateCoverGrammar(this.parseExponentiationExpression);
	            expr = this.finalize(this.startNode(startToken), new Node.BinaryExpression('**', left, right));
	        }
	        return expr;
	    };
	    // ECMA-262 12.6 Exponentiation Operators
	    // ECMA-262 12.7 Multiplicative Operators
	    // ECMA-262 12.8 Additive Operators
	    // ECMA-262 12.9 Bitwise Shift Operators
	    // ECMA-262 12.10 Relational Operators
	    // ECMA-262 12.11 Equality Operators
	    // ECMA-262 12.12 Binary Bitwise Operators
	    // ECMA-262 12.13 Binary Logical Operators
	    Parser.prototype.binaryPrecedence = function (token) {
	        var op = token.value;
	        var precedence;
	        if (token.type === token_1.Token.Punctuator) {
	            precedence = this.operatorPrecedence[op] || 0;
	        }
	        else if (token.type === token_1.Token.Keyword) {
	            precedence = (op === 'instanceof' || (this.context.allowIn && op === 'in')) ? 7 : 0;
	        }
	        else {
	            precedence = 0;
	        }
	        return precedence;
	    };
	    Parser.prototype.parseBinaryExpression = function () {
	        var startToken = this.lookahead;
	        var expr = this.inheritCoverGrammar(this.parseExponentiationExpression);
	        var token = this.lookahead;
	        var prec = this.binaryPrecedence(token);
	        if (prec > 0) {
	            this.nextToken();
	            token.prec = prec;
	            this.context.isAssignmentTarget = false;
	            this.context.isBindingElement = false;
	            var markers = [startToken, this.lookahead];
	            var left = expr;
	            var right = this.isolateCoverGrammar(this.parseExponentiationExpression);
	            var stack = [left, token, right];
	            while (true) {
	                prec = this.binaryPrecedence(this.lookahead);
	                if (prec <= 0) {
	                    break;
	                }
	                // Reduce: make a binary expression from the three topmost entries.
	                while ((stack.length > 2) && (prec <= stack[stack.length - 2].prec)) {
	                    right = stack.pop();
	                    var operator = stack.pop().value;
	                    left = stack.pop();
	                    markers.pop();
	                    var node = this.startNode(markers[markers.length - 1]);
	                    stack.push(this.finalize(node, new Node.BinaryExpression(operator, left, right)));
	                }
	                // Shift.
	                token = this.nextToken();
	                token.prec = prec;
	                stack.push(token);
	                markers.push(this.lookahead);
	                stack.push(this.isolateCoverGrammar(this.parseExponentiationExpression));
	            }
	            // Final reduce to clean-up the stack.
	            var i = stack.length - 1;
	            expr = stack[i];
	            markers.pop();
	            while (i > 1) {
	                var node = this.startNode(markers.pop());
	                expr = this.finalize(node, new Node.BinaryExpression(stack[i - 1].value, stack[i - 2], expr));
	                i -= 2;
	            }
	        }
	        return expr;
	    };
	    // ECMA-262 12.14 Conditional Operator
	    Parser.prototype.parseConditionalExpression = function () {
	        var startToken = this.lookahead;
	        var expr = this.inheritCoverGrammar(this.parseBinaryExpression);
	        if (this.match('?')) {
	            this.nextToken();
	            var previousAllowIn = this.context.allowIn;
	            this.context.allowIn = true;
	            var consequent = this.isolateCoverGrammar(this.parseAssignmentExpression);
	            this.context.allowIn = previousAllowIn;
	            this.expect(':');
	            var alternate = this.isolateCoverGrammar(this.parseAssignmentExpression);
	            expr = this.finalize(this.startNode(startToken), new Node.ConditionalExpression(expr, consequent, alternate));
	            this.context.isAssignmentTarget = false;
	            this.context.isBindingElement = false;
	        }
	        return expr;
	    };
	    // ECMA-262 12.15 Assignment Operators
	    Parser.prototype.checkPatternParam = function (options, param) {
	        switch (param.type) {
	            case syntax_1.Syntax.Identifier:
	                this.validateParam(options, param, param.name);
	                break;
	            case syntax_1.Syntax.RestElement:
	                this.checkPatternParam(options, param.argument);
	                break;
	            case syntax_1.Syntax.AssignmentPattern:
	                this.checkPatternParam(options, param.left);
	                break;
	            case syntax_1.Syntax.ArrayPattern:
	                for (var i = 0; i < param.elements.length; i++) {
	                    if (param.elements[i] !== null) {
	                        this.checkPatternParam(options, param.elements[i]);
	                    }
	                }
	                break;
	            case syntax_1.Syntax.YieldExpression:
	                break;
	            default:
	                assert_1.assert(param.type === syntax_1.Syntax.ObjectPattern, 'Invalid type');
	                for (var i = 0; i < param.properties.length; i++) {
	                    this.checkPatternParam(options, param.properties[i].value);
	                }
	                break;
	        }
	    };
	    Parser.prototype.reinterpretAsCoverFormalsList = function (expr) {
	        var params = [expr];
	        var options;
	        switch (expr.type) {
	            case syntax_1.Syntax.Identifier:
	                break;
	            case ArrowParameterPlaceHolder:
	                params = expr.params;
	                break;
	            default:
	                return null;
	        }
	        options = {
	            paramSet: {}
	        };
	        for (var i = 0; i < params.length; ++i) {
	            var param = params[i];
	            if (param.type === syntax_1.Syntax.AssignmentPattern) {
	                if (param.right.type === syntax_1.Syntax.YieldExpression) {
	                    if (param.right.argument) {
	                        this.throwUnexpectedToken(this.lookahead);
	                    }
	                    param.right.type = syntax_1.Syntax.Identifier;
	                    param.right.name = 'yield';
	                    delete param.right.argument;
	                    delete param.right.delegate;
	                }
	            }
	            this.checkPatternParam(options, param);
	            params[i] = param;
	        }
	        if (this.context.strict || !this.context.allowYield) {
	            for (var i = 0; i < params.length; ++i) {
	                var param = params[i];
	                if (param.type === syntax_1.Syntax.YieldExpression) {
	                    this.throwUnexpectedToken(this.lookahead);
	                }
	            }
	        }
	        if (options.message === messages_1.Messages.StrictParamDupe) {
	            var token = this.context.strict ? options.stricted : options.firstRestricted;
	            this.throwUnexpectedToken(token, options.message);
	        }
	        return {
	            params: params,
	            stricted: options.stricted,
	            firstRestricted: options.firstRestricted,
	            message: options.message
	        };
	    };
	    Parser.prototype.parseAssignmentExpression = function () {
	        var expr;
	        if (!this.context.allowYield && this.matchKeyword('yield')) {
	            expr = this.parseYieldExpression();
	        }
	        else {
	            var startToken = this.lookahead;
	            var token = startToken;
	            expr = this.parseConditionalExpression();
	            if (expr.type === ArrowParameterPlaceHolder || this.match('=>')) {
	                // ECMA-262 14.2 Arrow Function Definitions
	                this.context.isAssignmentTarget = false;
	                this.context.isBindingElement = false;
	                var list = this.reinterpretAsCoverFormalsList(expr);
	                if (list) {
	                    if (this.hasLineTerminator) {
	                        this.tolerateUnexpectedToken(this.lookahead);
	                    }
	                    this.context.firstCoverInitializedNameError = null;
	                    var previousStrict = this.context.strict;
	                    var previousAllowYield = this.context.allowYield;
	                    this.context.allowYield = true;
	                    var node = this.startNode(startToken);
	                    this.expect('=>');
	                    var body = this.match('{') ? this.parseFunctionSourceElements() :
	                        this.isolateCoverGrammar(this.parseAssignmentExpression);
	                    var expression = body.type !== syntax_1.Syntax.BlockStatement;
	                    if (this.context.strict && list.firstRestricted) {
	                        this.throwUnexpectedToken(list.firstRestricted, list.message);
	                    }
	                    if (this.context.strict && list.stricted) {
	                        this.tolerateUnexpectedToken(list.stricted, list.message);
	                    }
	                    expr = this.finalize(node, new Node.ArrowFunctionExpression(list.params, body, expression));
	                    this.context.strict = previousStrict;
	                    this.context.allowYield = previousAllowYield;
	                }
	            }
	            else {
	                if (this.matchAssign()) {
	                    if (!this.context.isAssignmentTarget) {
	                        this.tolerateError(messages_1.Messages.InvalidLHSInAssignment);
	                    }
	                    if (this.context.strict && expr.type === syntax_1.Syntax.Identifier) {
	                        var id = (expr);
	                        if (this.scanner.isRestrictedWord(id.name)) {
	                            this.tolerateUnexpectedToken(token, messages_1.Messages.StrictLHSAssignment);
	                        }
	                        if (this.scanner.isStrictModeReservedWord(id.name)) {
	                            this.tolerateUnexpectedToken(token, messages_1.Messages.StrictReservedWord);
	                        }
	                    }
	                    if (!this.match('=')) {
	                        this.context.isAssignmentTarget = false;
	                        this.context.isBindingElement = false;
	                    }
	                    else {
	                        this.reinterpretExpressionAsPattern(expr);
	                    }
	                    token = this.nextToken();
	                    var right = this.isolateCoverGrammar(this.parseAssignmentExpression);
	                    expr = this.finalize(this.startNode(startToken), new Node.AssignmentExpression(token.value, expr, right));
	                    this.context.firstCoverInitializedNameError = null;
	                }
	            }
	        }
	        return expr;
	    };
	    // ECMA-262 12.16 Comma Operator
	    Parser.prototype.parseExpression = function () {
	        var startToken = this.lookahead;
	        var expr = this.isolateCoverGrammar(this.parseAssignmentExpression);
	        if (this.match(',')) {
	            var expressions = [];
	            expressions.push(expr);
	            while (this.startMarker.index < this.scanner.length) {
	                if (!this.match(',')) {
	                    break;
	                }
	                this.nextToken();
	                expressions.push(this.isolateCoverGrammar(this.parseAssignmentExpression));
	            }
	            expr = this.finalize(this.startNode(startToken), new Node.SequenceExpression(expressions));
	        }
	        return expr;
	    };
	    // ECMA-262 13.2 Block
	    Parser.prototype.parseStatementListItem = function () {
	        var statement = null;
	        this.context.isAssignmentTarget = true;
	        this.context.isBindingElement = true;
	        if (this.lookahead.type === token_1.Token.Keyword) {
	            switch (this.lookahead.value) {
	                case 'export':
	                    if (this.sourceType !== 'module') {
	                        this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.IllegalExportDeclaration);
	                    }
	                    statement = this.parseExportDeclaration();
	                    break;
	                case 'import':
	                    if (this.sourceType !== 'module') {
	                        this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.IllegalImportDeclaration);
	                    }
	                    statement = this.parseImportDeclaration();
	                    break;
	                case 'const':
	                    statement = this.parseLexicalDeclaration({ inFor: false });
	                    break;
	                case 'function':
	                    statement = this.parseFunctionDeclaration();
	                    break;
	                case 'class':
	                    statement = this.parseClassDeclaration();
	                    break;
	                case 'let':
	                    statement = this.isLexicalDeclaration() ? this.parseLexicalDeclaration({ inFor: false }) : this.parseStatement();
	                    break;
	                default:
	                    statement = this.parseStatement();
	                    break;
	            }
	        }
	        else {
	            statement = this.parseStatement();
	        }
	        return statement;
	    };
	    Parser.prototype.parseBlock = function () {
	        var node = this.createNode();
	        this.expect('{');
	        var block = [];
	        while (true) {
	            if (this.match('}')) {
	                break;
	            }
	            block.push(this.parseStatementListItem());
	        }
	        this.expect('}');
	        return this.finalize(node, new Node.BlockStatement(block));
	    };
	    // ECMA-262 13.3.1 Let and Const Declarations
	    Parser.prototype.parseLexicalBinding = function (kind, options) {
	        var node = this.createNode();
	        var params = [];
	        var id = this.parsePattern(params, kind);
	        // ECMA-262 12.2.1
	        if (this.context.strict && id.type === syntax_1.Syntax.Identifier) {
	            if (this.scanner.isRestrictedWord((id).name)) {
	                this.tolerateError(messages_1.Messages.StrictVarName);
	            }
	        }
	        var init = null;
	        if (kind === 'const') {
	            if (!this.matchKeyword('in') && !this.matchContextualKeyword('of')) {
	                this.expect('=');
	                init = this.isolateCoverGrammar(this.parseAssignmentExpression);
	            }
	        }
	        else if ((!options.inFor && id.type !== syntax_1.Syntax.Identifier) || this.match('=')) {
	            this.expect('=');
	            init = this.isolateCoverGrammar(this.parseAssignmentExpression);
	        }
	        return this.finalize(node, new Node.VariableDeclarator(id, init));
	    };
	    Parser.prototype.parseBindingList = function (kind, options) {
	        var list = [this.parseLexicalBinding(kind, options)];
	        while (this.match(',')) {
	            this.nextToken();
	            list.push(this.parseLexicalBinding(kind, options));
	        }
	        return list;
	    };
	    Parser.prototype.isLexicalDeclaration = function () {
	        var previousIndex = this.scanner.index;
	        var previousLineNumber = this.scanner.lineNumber;
	        var previousLineStart = this.scanner.lineStart;
	        this.collectComments();
	        var next = this.scanner.lex();
	        this.scanner.index = previousIndex;
	        this.scanner.lineNumber = previousLineNumber;
	        this.scanner.lineStart = previousLineStart;
	        return (next.type === token_1.Token.Identifier) ||
	            (next.type === token_1.Token.Punctuator && next.value === '[') ||
	            (next.type === token_1.Token.Punctuator && next.value === '{') ||
	            (next.type === token_1.Token.Keyword && next.value === 'let') ||
	            (next.type === token_1.Token.Keyword && next.value === 'yield');
	    };
	    Parser.prototype.parseLexicalDeclaration = function (options) {
	        var node = this.createNode();
	        var kind = this.nextToken().value;
	        assert_1.assert(kind === 'let' || kind === 'const', 'Lexical declaration must be either let or const');
	        var declarations = this.parseBindingList(kind, options);
	        this.consumeSemicolon();
	        return this.finalize(node, new Node.VariableDeclaration(declarations, kind));
	    };
	    // ECMA-262 13.3.3 Destructuring Binding Patterns
	    Parser.prototype.parseBindingRestElement = function (params, kind) {
	        var node = this.createNode();
	        this.expect('...');
	        var arg = this.parsePattern(params, kind);
	        return this.finalize(node, new Node.RestElement(arg));
	    };
	    Parser.prototype.parseArrayPattern = function (params, kind) {
	        var node = this.createNode();
	        this.expect('[');
	        var elements = [];
	        while (!this.match(']')) {
	            if (this.match(',')) {
	                this.nextToken();
	                elements.push(null);
	            }
	            else {
	                if (this.match('...')) {
	                    elements.push(this.parseBindingRestElement(params, kind));
	                    break;
	                }
	                else {
	                    elements.push(this.parsePatternWithDefault(params, kind));
	                }
	                if (!this.match(']')) {
	                    this.expect(',');
	                }
	            }
	        }
	        this.expect(']');
	        return this.finalize(node, new Node.ArrayPattern(elements));
	    };
	    Parser.prototype.parsePropertyPattern = function (params, kind) {
	        var node = this.createNode();
	        var computed = false;
	        var shorthand = false;
	        var method = false;
	        var key;
	        var value;
	        if (this.lookahead.type === token_1.Token.Identifier) {
	            var keyToken = this.lookahead;
	            key = this.parseVariableIdentifier();
	            var init = this.finalize(node, new Node.Identifier(keyToken.value));
	            if (this.match('=')) {
	                params.push(keyToken);
	                shorthand = true;
	                this.nextToken();
	                var expr = this.parseAssignmentExpression();
	                value = this.finalize(this.startNode(keyToken), new Node.AssignmentPattern(init, expr));
	            }
	            else if (!this.match(':')) {
	                params.push(keyToken);
	                shorthand = true;
	                value = init;
	            }
	            else {
	                this.expect(':');
	                value = this.parsePatternWithDefault(params, kind);
	            }
	        }
	        else {
	            computed = this.match('[');
	            key = this.parseObjectPropertyKey();
	            this.expect(':');
	            value = this.parsePatternWithDefault(params, kind);
	        }
	        return this.finalize(node, new Node.Property('init', key, computed, value, method, shorthand));
	    };
	    Parser.prototype.parseObjectPattern = function (params, kind) {
	        var node = this.createNode();
	        var properties = [];
	        this.expect('{');
	        while (!this.match('}')) {
	            properties.push(this.parsePropertyPattern(params, kind));
	            if (!this.match('}')) {
	                this.expect(',');
	            }
	        }
	        this.expect('}');
	        return this.finalize(node, new Node.ObjectPattern(properties));
	    };
	    Parser.prototype.parsePattern = function (params, kind) {
	        var pattern;
	        if (this.match('[')) {
	            pattern = this.parseArrayPattern(params, kind);
	        }
	        else if (this.match('{')) {
	            pattern = this.parseObjectPattern(params, kind);
	        }
	        else {
	            if (this.matchKeyword('let') && (kind === 'const' || kind === 'let')) {
	                this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.UnexpectedToken);
	            }
	            params.push(this.lookahead);
	            pattern = this.parseVariableIdentifier(kind);
	        }
	        return pattern;
	    };
	    Parser.prototype.parsePatternWithDefault = function (params, kind) {
	        var startToken = this.lookahead;
	        var pattern = this.parsePattern(params, kind);
	        if (this.match('=')) {
	            this.nextToken();
	            var previousAllowYield = this.context.allowYield;
	            this.context.allowYield = true;
	            var right = this.isolateCoverGrammar(this.parseAssignmentExpression);
	            this.context.allowYield = previousAllowYield;
	            pattern = this.finalize(this.startNode(startToken), new Node.AssignmentPattern(pattern, right));
	        }
	        return pattern;
	    };
	    // ECMA-262 13.3.2 Variable Statement
	    Parser.prototype.parseVariableIdentifier = function (kind) {
	        var node = this.createNode();
	        var token = this.nextToken();
	        if (token.type === token_1.Token.Keyword && token.value === 'yield') {
	            if (this.context.strict) {
	                this.tolerateUnexpectedToken(token, messages_1.Messages.StrictReservedWord);
	            }
	            if (!this.context.allowYield) {
	                this.throwUnexpectedToken(token);
	            }
	        }
	        else if (token.type !== token_1.Token.Identifier) {
	            if (this.context.strict && token.type === token_1.Token.Keyword && this.scanner.isStrictModeReservedWord(token.value)) {
	                this.tolerateUnexpectedToken(token, messages_1.Messages.StrictReservedWord);
	            }
	            else {
	                if (this.context.strict || token.value !== 'let' || kind !== 'var') {
	                    this.throwUnexpectedToken(token);
	                }
	            }
	        }
	        else if (this.sourceType === 'module' && token.type === token_1.Token.Identifier && token.value === 'await') {
	            this.tolerateUnexpectedToken(token);
	        }
	        return this.finalize(node, new Node.Identifier(token.value));
	    };
	    Parser.prototype.parseVariableDeclaration = function (options) {
	        var node = this.createNode();
	        var params = [];
	        var id = this.parsePattern(params, 'var');
	        // ECMA-262 12.2.1
	        if (this.context.strict && id.type === syntax_1.Syntax.Identifier) {
	            if (this.scanner.isRestrictedWord((id).name)) {
	                this.tolerateError(messages_1.Messages.StrictVarName);
	            }
	        }
	        var init = null;
	        if (this.match('=')) {
	            this.nextToken();
	            init = this.isolateCoverGrammar(this.parseAssignmentExpression);
	        }
	        else if (id.type !== syntax_1.Syntax.Identifier && !options.inFor) {
	            this.expect('=');
	        }
	        return this.finalize(node, new Node.VariableDeclarator(id, init));
	    };
	    Parser.prototype.parseVariableDeclarationList = function (options) {
	        var opt = { inFor: options.inFor };
	        var list = [];
	        list.push(this.parseVariableDeclaration(opt));
	        while (this.match(',')) {
	            this.nextToken();
	            list.push(this.parseVariableDeclaration(opt));
	        }
	        return list;
	    };
	    Parser.prototype.parseVariableStatement = function () {
	        var node = this.createNode();
	        this.expectKeyword('var');
	        var declarations = this.parseVariableDeclarationList({ inFor: false });
	        this.consumeSemicolon();
	        return this.finalize(node, new Node.VariableDeclaration(declarations, 'var'));
	    };
	    // ECMA-262 13.4 Empty Statement
	    Parser.prototype.parseEmptyStatement = function () {
	        var node = this.createNode();
	        this.expect(';');
	        return this.finalize(node, new Node.EmptyStatement());
	    };
	    // ECMA-262 13.5 Expression Statement
	    Parser.prototype.parseExpressionStatement = function () {
	        var node = this.createNode();
	        var expr = this.parseExpression();
	        this.consumeSemicolon();
	        return this.finalize(node, new Node.ExpressionStatement(expr));
	    };
	    // ECMA-262 13.6 If statement
	    Parser.prototype.parseIfStatement = function () {
	        var node = this.createNode();
	        var consequent;
	        var alternate = null;
	        this.expectKeyword('if');
	        this.expect('(');
	        var test = this.parseExpression();
	        if (!this.match(')') && this.config.tolerant) {
	            this.tolerateUnexpectedToken(this.nextToken());
	            consequent = this.finalize(this.createNode(), new Node.EmptyStatement());
	        }
	        else {
	            this.expect(')');
	            consequent = this.parseStatement();
	            if (this.matchKeyword('else')) {
	                this.nextToken();
	                alternate = this.parseStatement();
	            }
	        }
	        return this.finalize(node, new Node.IfStatement(test, consequent, alternate));
	    };
	    // ECMA-262 13.7.2 The do-while Statement
	    Parser.prototype.parseDoWhileStatement = function () {
	        var node = this.createNode();
	        this.expectKeyword('do');
	        var previousInIteration = this.context.inIteration;
	        this.context.inIteration = true;
	        var body = this.parseStatement();
	        this.context.inIteration = previousInIteration;
	        this.expectKeyword('while');
	        this.expect('(');
	        var test = this.parseExpression();
	        this.expect(')');
	        if (this.match(';')) {
	            this.nextToken();
	        }
	        return this.finalize(node, new Node.DoWhileStatement(body, test));
	    };
	    // ECMA-262 13.7.3 The while Statement
	    Parser.prototype.parseWhileStatement = function () {
	        var node = this.createNode();
	        var body;
	        this.expectKeyword('while');
	        this.expect('(');
	        var test = this.parseExpression();
	        if (!this.match(')') && this.config.tolerant) {
	            this.tolerateUnexpectedToken(this.nextToken());
	            body = this.finalize(this.createNode(), new Node.EmptyStatement());
	        }
	        else {
	            this.expect(')');
	            var previousInIteration = this.context.inIteration;
	            this.context.inIteration = true;
	            body = this.parseStatement();
	            this.context.inIteration = previousInIteration;
	        }
	        return this.finalize(node, new Node.WhileStatement(test, body));
	    };
	    // ECMA-262 13.7.4 The for Statement
	    // ECMA-262 13.7.5 The for-in and for-of Statements
	    Parser.prototype.parseForStatement = function () {
	        var init = null;
	        var test = null;
	        var update = null;
	        var forIn = true;
	        var left, right;
	        var node = this.createNode();
	        this.expectKeyword('for');
	        this.expect('(');
	        if (this.match(';')) {
	            this.nextToken();
	        }
	        else {
	            if (this.matchKeyword('var')) {
	                init = this.createNode();
	                this.nextToken();
	                var previousAllowIn = this.context.allowIn;
	                this.context.allowIn = false;
	                var declarations = this.parseVariableDeclarationList({ inFor: true });
	                this.context.allowIn = previousAllowIn;
	                if (declarations.length === 1 && this.matchKeyword('in')) {
	                    var decl = declarations[0];
	                    if (decl.init && (decl.id.type === syntax_1.Syntax.ArrayPattern || decl.id.type === syntax_1.Syntax.ObjectPattern || this.context.strict)) {
	                        this.tolerateError(messages_1.Messages.ForInOfLoopInitializer, 'for-in');
	                    }
	                    init = this.finalize(init, new Node.VariableDeclaration(declarations, 'var'));
	                    this.nextToken();
	                    left = init;
	                    right = this.parseExpression();
	                    init = null;
	                }
	                else if (declarations.length === 1 && declarations[0].init === null && this.matchContextualKeyword('of')) {
	                    init = this.finalize(init, new Node.VariableDeclaration(declarations, 'var'));
	                    this.nextToken();
	                    left = init;
	                    right = this.parseAssignmentExpression();
	                    init = null;
	                    forIn = false;
	                }
	                else {
	                    init = this.finalize(init, new Node.VariableDeclaration(declarations, 'var'));
	                    this.expect(';');
	                }
	            }
	            else if (this.matchKeyword('const') || this.matchKeyword('let')) {
	                init = this.createNode();
	                var kind = this.nextToken().value;
	                if (!this.context.strict && this.lookahead.value === 'in') {
	                    init = this.finalize(init, new Node.Identifier(kind));
	                    this.nextToken();
	                    left = init;
	                    right = this.parseExpression();
	                    init = null;
	                }
	                else {
	                    var previousAllowIn = this.context.allowIn;
	                    this.context.allowIn = false;
	                    var declarations = this.parseBindingList(kind, { inFor: true });
	                    this.context.allowIn = previousAllowIn;
	                    if (declarations.length === 1 && declarations[0].init === null && this.matchKeyword('in')) {
	                        init = this.finalize(init, new Node.VariableDeclaration(declarations, kind));
	                        this.nextToken();
	                        left = init;
	                        right = this.parseExpression();
	                        init = null;
	                    }
	                    else if (declarations.length === 1 && declarations[0].init === null && this.matchContextualKeyword('of')) {
	                        init = this.finalize(init, new Node.VariableDeclaration(declarations, kind));
	                        this.nextToken();
	                        left = init;
	                        right = this.parseAssignmentExpression();
	                        init = null;
	                        forIn = false;
	                    }
	                    else {
	                        this.consumeSemicolon();
	                        init = this.finalize(init, new Node.VariableDeclaration(declarations, kind));
	                    }
	                }
	            }
	            else {
	                var initStartToken = this.lookahead;
	                var previousAllowIn = this.context.allowIn;
	                this.context.allowIn = false;
	                init = this.inheritCoverGrammar(this.parseAssignmentExpression);
	                this.context.allowIn = previousAllowIn;
	                if (this.matchKeyword('in')) {
	                    if (!this.context.isAssignmentTarget || init.type === syntax_1.Syntax.AssignmentExpression) {
	                        this.tolerateError(messages_1.Messages.InvalidLHSInForIn);
	                    }
	                    this.nextToken();
	                    this.reinterpretExpressionAsPattern(init);
	                    left = init;
	                    right = this.parseExpression();
	                    init = null;
	                }
	                else if (this.matchContextualKeyword('of')) {
	                    if (!this.context.isAssignmentTarget || init.type === syntax_1.Syntax.AssignmentExpression) {
	                        this.tolerateError(messages_1.Messages.InvalidLHSInForLoop);
	                    }
	                    this.nextToken();
	                    this.reinterpretExpressionAsPattern(init);
	                    left = init;
	                    right = this.parseAssignmentExpression();
	                    init = null;
	                    forIn = false;
	                }
	                else {
	                    if (this.match(',')) {
	                        var initSeq = [init];
	                        while (this.match(',')) {
	                            this.nextToken();
	                            initSeq.push(this.isolateCoverGrammar(this.parseAssignmentExpression));
	                        }
	                        init = this.finalize(this.startNode(initStartToken), new Node.SequenceExpression(initSeq));
	                    }
	                    this.expect(';');
	                }
	            }
	        }
	        if (typeof left === 'undefined') {
	            if (!this.match(';')) {
	                test = this.parseExpression();
	            }
	            this.expect(';');
	            if (!this.match(')')) {
	                update = this.parseExpression();
	            }
	        }
	        var body;
	        if (!this.match(')') && this.config.tolerant) {
	            this.tolerateUnexpectedToken(this.nextToken());
	            body = this.finalize(this.createNode(), new Node.EmptyStatement());
	        }
	        else {
	            this.expect(')');
	            var previousInIteration = this.context.inIteration;
	            this.context.inIteration = true;
	            body = this.isolateCoverGrammar(this.parseStatement);
	            this.context.inIteration = previousInIteration;
	        }
	        return (typeof left === 'undefined') ?
	            this.finalize(node, new Node.ForStatement(init, test, update, body)) :
	            forIn ? this.finalize(node, new Node.ForInStatement(left, right, body)) :
	                this.finalize(node, new Node.ForOfStatement(left, right, body));
	    };
	    // ECMA-262 13.8 The continue statement
	    Parser.prototype.parseContinueStatement = function () {
	        var node = this.createNode();
	        this.expectKeyword('continue');
	        var label = null;
	        if (this.lookahead.type === token_1.Token.Identifier && !this.hasLineTerminator) {
	            label = this.parseVariableIdentifier();
	            var key = '$' + label.name;
	            if (!Object.prototype.hasOwnProperty.call(this.context.labelSet, key)) {
	                this.throwError(messages_1.Messages.UnknownLabel, label.name);
	            }
	        }
	        this.consumeSemicolon();
	        if (label === null && !this.context.inIteration) {
	            this.throwError(messages_1.Messages.IllegalContinue);
	        }
	        return this.finalize(node, new Node.ContinueStatement(label));
	    };
	    // ECMA-262 13.9 The break statement
	    Parser.prototype.parseBreakStatement = function () {
	        var node = this.createNode();
	        this.expectKeyword('break');
	        var label = null;
	        if (this.lookahead.type === token_1.Token.Identifier && !this.hasLineTerminator) {
	            label = this.parseVariableIdentifier();
	            var key = '$' + label.name;
	            if (!Object.prototype.hasOwnProperty.call(this.context.labelSet, key)) {
	                this.throwError(messages_1.Messages.UnknownLabel, label.name);
	            }
	        }
	        this.consumeSemicolon();
	        if (label === null && !this.context.inIteration && !this.context.inSwitch) {
	            this.throwError(messages_1.Messages.IllegalBreak);
	        }
	        return this.finalize(node, new Node.BreakStatement(label));
	    };
	    // ECMA-262 13.10 The return statement
	    Parser.prototype.parseReturnStatement = function () {
	        if (!this.context.inFunctionBody) {
	            this.tolerateError(messages_1.Messages.IllegalReturn);
	        }
	        var node = this.createNode();
	        this.expectKeyword('return');
	        var hasArgument = !this.match(';') && !this.match('}') &&
	            !this.hasLineTerminator && this.lookahead.type !== token_1.Token.EOF;
	        var argument = hasArgument ? this.parseExpression() : null;
	        this.consumeSemicolon();
	        return this.finalize(node, new Node.ReturnStatement(argument));
	    };
	    // ECMA-262 13.11 The with statement
	    Parser.prototype.parseWithStatement = function () {
	        if (this.context.strict) {
	            this.tolerateError(messages_1.Messages.StrictModeWith);
	        }
	        var node = this.createNode();
	        this.expectKeyword('with');
	        this.expect('(');
	        var object = this.parseExpression();
	        this.expect(')');
	        var body = this.parseStatement();
	        return this.finalize(node, new Node.WithStatement(object, body));
	    };
	    // ECMA-262 13.12 The switch statement
	    Parser.prototype.parseSwitchCase = function () {
	        var node = this.createNode();
	        var test;
	        if (this.matchKeyword('default')) {
	            this.nextToken();
	            test = null;
	        }
	        else {
	            this.expectKeyword('case');
	            test = this.parseExpression();
	        }
	        this.expect(':');
	        var consequent = [];
	        while (true) {
	            if (this.match('}') || this.matchKeyword('default') || this.matchKeyword('case')) {
	                break;
	            }
	            consequent.push(this.parseStatementListItem());
	        }
	        return this.finalize(node, new Node.SwitchCase(test, consequent));
	    };
	    Parser.prototype.parseSwitchStatement = function () {
	        var node = this.createNode();
	        this.expectKeyword('switch');
	        this.expect('(');
	        var discriminant = this.parseExpression();
	        this.expect(')');
	        var previousInSwitch = this.context.inSwitch;
	        this.context.inSwitch = true;
	        var cases = [];
	        var defaultFound = false;
	        this.expect('{');
	        while (true) {
	            if (this.match('}')) {
	                break;
	            }
	            var clause = this.parseSwitchCase();
	            if (clause.test === null) {
	                if (defaultFound) {
	                    this.throwError(messages_1.Messages.MultipleDefaultsInSwitch);
	                }
	                defaultFound = true;
	            }
	            cases.push(clause);
	        }
	        this.expect('}');
	        this.context.inSwitch = previousInSwitch;
	        return this.finalize(node, new Node.SwitchStatement(discriminant, cases));
	    };
	    // ECMA-262 13.13 Labelled Statements
	    Parser.prototype.parseLabelledStatement = function () {
	        var node = this.createNode();
	        var expr = this.parseExpression();
	        var statement;
	        if ((expr.type === syntax_1.Syntax.Identifier) && this.match(':')) {
	            this.nextToken();
	            var id = (expr);
	            var key = '$' + id.name;
	            if (Object.prototype.hasOwnProperty.call(this.context.labelSet, key)) {
	                this.throwError(messages_1.Messages.Redeclaration, 'Label', id.name);
	            }
	            this.context.labelSet[key] = true;
	            var labeledBody = this.parseStatement();
	            delete this.context.labelSet[key];
	            statement = new Node.LabeledStatement(id, labeledBody);
	        }
	        else {
	            this.consumeSemicolon();
	            statement = new Node.ExpressionStatement(expr);
	        }
	        return this.finalize(node, statement);
	    };
	    // ECMA-262 13.14 The throw statement
	    Parser.prototype.parseThrowStatement = function () {
	        var node = this.createNode();
	        this.expectKeyword('throw');
	        if (this.hasLineTerminator) {
	            this.throwError(messages_1.Messages.NewlineAfterThrow);
	        }
	        var argument = this.parseExpression();
	        this.consumeSemicolon();
	        return this.finalize(node, new Node.ThrowStatement(argument));
	    };
	    // ECMA-262 13.15 The try statement
	    Parser.prototype.parseCatchClause = function () {
	        var node = this.createNode();
	        this.expectKeyword('catch');
	        this.expect('(');
	        if (this.match(')')) {
	            this.throwUnexpectedToken(this.lookahead);
	        }
	        var params = [];
	        var param = this.parsePattern(params);
	        var paramMap = {};
	        for (var i = 0; i < params.length; i++) {
	            var key = '$' + params[i].value;
	            if (Object.prototype.hasOwnProperty.call(paramMap, key)) {
	                this.tolerateError(messages_1.Messages.DuplicateBinding, params[i].value);
	            }
	            paramMap[key] = true;
	        }
	        if (this.context.strict && param.type === syntax_1.Syntax.Identifier) {
	            if (this.scanner.isRestrictedWord((param).name)) {
	                this.tolerateError(messages_1.Messages.StrictCatchVariable);
	            }
	        }
	        this.expect(')');
	        var body = this.parseBlock();
	        return this.finalize(node, new Node.CatchClause(param, body));
	    };
	    Parser.prototype.parseFinallyClause = function () {
	        this.expectKeyword('finally');
	        return this.parseBlock();
	    };
	    Parser.prototype.parseTryStatement = function () {
	        var node = this.createNode();
	        this.expectKeyword('try');
	        var block = this.parseBlock();
	        var handler = this.matchKeyword('catch') ? this.parseCatchClause() : null;
	        var finalizer = this.matchKeyword('finally') ? this.parseFinallyClause() : null;
	        if (!handler && !finalizer) {
	            this.throwError(messages_1.Messages.NoCatchOrFinally);
	        }
	        return this.finalize(node, new Node.TryStatement(block, handler, finalizer));
	    };
	    // ECMA-262 13.16 The debugger statement
	    Parser.prototype.parseDebuggerStatement = function () {
	        var node = this.createNode();
	        this.expectKeyword('debugger');
	        this.consumeSemicolon();
	        return this.finalize(node, new Node.DebuggerStatement());
	    };
	    // ECMA-262 13 Statements
	    Parser.prototype.parseStatement = function () {
	        var statement = null;
	        switch (this.lookahead.type) {
	            case token_1.Token.BooleanLiteral:
	            case token_1.Token.NullLiteral:
	            case token_1.Token.NumericLiteral:
	            case token_1.Token.StringLiteral:
	            case token_1.Token.Template:
	            case token_1.Token.RegularExpression:
	                statement = this.parseExpressionStatement();
	                break;
	            case token_1.Token.Punctuator:
	                var value = this.lookahead.value;
	                if (value === '{') {
	                    statement = this.parseBlock();
	                }
	                else if (value === '(') {
	                    statement = this.parseExpressionStatement();
	                }
	                else if (value === ';') {
	                    statement = this.parseEmptyStatement();
	                }
	                else {
	                    statement = this.parseExpressionStatement();
	                }
	                break;
	            case token_1.Token.Identifier:
	                statement = this.parseLabelledStatement();
	                break;
	            case token_1.Token.Keyword:
	                switch (this.lookahead.value) {
	                    case 'break':
	                        statement = this.parseBreakStatement();
	                        break;
	                    case 'continue':
	                        statement = this.parseContinueStatement();
	                        break;
	                    case 'debugger':
	                        statement = this.parseDebuggerStatement();
	                        break;
	                    case 'do':
	                        statement = this.parseDoWhileStatement();
	                        break;
	                    case 'for':
	                        statement = this.parseForStatement();
	                        break;
	                    case 'function':
	                        statement = this.parseFunctionDeclaration();
	                        break;
	                    case 'if':
	                        statement = this.parseIfStatement();
	                        break;
	                    case 'return':
	                        statement = this.parseReturnStatement();
	                        break;
	                    case 'switch':
	                        statement = this.parseSwitchStatement();
	                        break;
	                    case 'throw':
	                        statement = this.parseThrowStatement();
	                        break;
	                    case 'try':
	                        statement = this.parseTryStatement();
	                        break;
	                    case 'var':
	                        statement = this.parseVariableStatement();
	                        break;
	                    case 'while':
	                        statement = this.parseWhileStatement();
	                        break;
	                    case 'with':
	                        statement = this.parseWithStatement();
	                        break;
	                    default:
	                        statement = this.parseExpressionStatement();
	                        break;
	                }
	                break;
	            default:
	                this.throwUnexpectedToken(this.lookahead);
	        }
	        return statement;
	    };
	    // ECMA-262 14.1 Function Definition
	    Parser.prototype.parseFunctionSourceElements = function () {
	        var node = this.createNode();
	        this.expect('{');
	        var body = this.parseDirectivePrologues();
	        var previousLabelSet = this.context.labelSet;
	        var previousInIteration = this.context.inIteration;
	        var previousInSwitch = this.context.inSwitch;
	        var previousInFunctionBody = this.context.inFunctionBody;
	        this.context.labelSet = {};
	        this.context.inIteration = false;
	        this.context.inSwitch = false;
	        this.context.inFunctionBody = true;
	        while (this.startMarker.index < this.scanner.length) {
	            if (this.match('}')) {
	                break;
	            }
	            body.push(this.parseStatementListItem());
	        }
	        this.expect('}');
	        this.context.labelSet = previousLabelSet;
	        this.context.inIteration = previousInIteration;
	        this.context.inSwitch = previousInSwitch;
	        this.context.inFunctionBody = previousInFunctionBody;
	        return this.finalize(node, new Node.BlockStatement(body));
	    };
	    Parser.prototype.validateParam = function (options, param, name) {
	        var key = '$' + name;
	        if (this.context.strict) {
	            if (this.scanner.isRestrictedWord(name)) {
	                options.stricted = param;
	                options.message = messages_1.Messages.StrictParamName;
	            }
	            if (Object.prototype.hasOwnProperty.call(options.paramSet, key)) {
	                options.stricted = param;
	                options.message = messages_1.Messages.StrictParamDupe;
	            }
	        }
	        else if (!options.firstRestricted) {
	            if (this.scanner.isRestrictedWord(name)) {
	                options.firstRestricted = param;
	                options.message = messages_1.Messages.StrictParamName;
	            }
	            else if (this.scanner.isStrictModeReservedWord(name)) {
	                options.firstRestricted = param;
	                options.message = messages_1.Messages.StrictReservedWord;
	            }
	            else if (Object.prototype.hasOwnProperty.call(options.paramSet, key)) {
	                options.stricted = param;
	                options.message = messages_1.Messages.StrictParamDupe;
	            }
	        }
	        /* istanbul ignore next */
	        if (typeof Object.defineProperty === 'function') {
	            Object.defineProperty(options.paramSet, key, { value: true, enumerable: true, writable: true, configurable: true });
	        }
	        else {
	            options.paramSet[key] = true;
	        }
	    };
	    Parser.prototype.parseRestElement = function (params) {
	        var node = this.createNode();
	        this.expect('...');
	        var arg = this.parsePattern(params);
	        if (this.match('=')) {
	            this.throwError(messages_1.Messages.DefaultRestParameter);
	        }
	        if (!this.match(')')) {
	            this.throwError(messages_1.Messages.ParameterAfterRestParameter);
	        }
	        return this.finalize(node, new Node.RestElement(arg));
	    };
	    Parser.prototype.parseFormalParameter = function (options) {
	        var params = [];
	        var param = this.match('...') ? this.parseRestElement(params) : this.parsePatternWithDefault(params);
	        for (var i = 0; i < params.length; i++) {
	            this.validateParam(options, params[i], params[i].value);
	        }
	        options.params.push(param);
	        return !this.match(')');
	    };
	    Parser.prototype.parseFormalParameters = function (firstRestricted) {
	        var options;
	        options = {
	            params: [],
	            firstRestricted: firstRestricted
	        };
	        this.expect('(');
	        if (!this.match(')')) {
	            options.paramSet = {};
	            while (this.startMarker.index < this.scanner.length) {
	                if (!this.parseFormalParameter(options)) {
	                    break;
	                }
	                this.expect(',');
	            }
	        }
	        this.expect(')');
	        return {
	            params: options.params,
	            stricted: options.stricted,
	            firstRestricted: options.firstRestricted,
	            message: options.message
	        };
	    };
	    Parser.prototype.parseFunctionDeclaration = function (identifierIsOptional) {
	        var node = this.createNode();
	        this.expectKeyword('function');
	        var isGenerator = this.match('*');
	        if (isGenerator) {
	            this.nextToken();
	        }
	        var message;
	        var id = null;
	        var firstRestricted = null;
	        if (!identifierIsOptional || !this.match('(')) {
	            var token = this.lookahead;
	            id = this.parseVariableIdentifier();
	            if (this.context.strict) {
	                if (this.scanner.isRestrictedWord(token.value)) {
	                    this.tolerateUnexpectedToken(token, messages_1.Messages.StrictFunctionName);
	                }
	            }
	            else {
	                if (this.scanner.isRestrictedWord(token.value)) {
	                    firstRestricted = token;
	                    message = messages_1.Messages.StrictFunctionName;
	                }
	                else if (this.scanner.isStrictModeReservedWord(token.value)) {
	                    firstRestricted = token;
	                    message = messages_1.Messages.StrictReservedWord;
	                }
	            }
	        }
	        var previousAllowYield = this.context.allowYield;
	        this.context.allowYield = !isGenerator;
	        var formalParameters = this.parseFormalParameters(firstRestricted);
	        var params = formalParameters.params;
	        var stricted = formalParameters.stricted;
	        firstRestricted = formalParameters.firstRestricted;
	        if (formalParameters.message) {
	            message = formalParameters.message;
	        }
	        var previousStrict = this.context.strict;
	        var body = this.parseFunctionSourceElements();
	        if (this.context.strict && firstRestricted) {
	            this.throwUnexpectedToken(firstRestricted, message);
	        }
	        if (this.context.strict && stricted) {
	            this.tolerateUnexpectedToken(stricted, message);
	        }
	        this.context.strict = previousStrict;
	        this.context.allowYield = previousAllowYield;
	        return this.finalize(node, new Node.FunctionDeclaration(id, params, body, isGenerator));
	    };
	    Parser.prototype.parseFunctionExpression = function () {
	        var node = this.createNode();
	        this.expectKeyword('function');
	        var isGenerator = this.match('*');
	        if (isGenerator) {
	            this.nextToken();
	        }
	        var message;
	        var id = null;
	        var firstRestricted;
	        var previousAllowYield = this.context.allowYield;
	        this.context.allowYield = !isGenerator;
	        if (!this.match('(')) {
	            var token = this.lookahead;
	            id = (!this.context.strict && !isGenerator && this.matchKeyword('yield')) ? this.parseIdentifierName() : this.parseVariableIdentifier();
	            if (this.context.strict) {
	                if (this.scanner.isRestrictedWord(token.value)) {
	                    this.tolerateUnexpectedToken(token, messages_1.Messages.StrictFunctionName);
	                }
	            }
	            else {
	                if (this.scanner.isRestrictedWord(token.value)) {
	                    firstRestricted = token;
	                    message = messages_1.Messages.StrictFunctionName;
	                }
	                else if (this.scanner.isStrictModeReservedWord(token.value)) {
	                    firstRestricted = token;
	                    message = messages_1.Messages.StrictReservedWord;
	                }
	            }
	        }
	        var formalParameters = this.parseFormalParameters(firstRestricted);
	        var params = formalParameters.params;
	        var stricted = formalParameters.stricted;
	        firstRestricted = formalParameters.firstRestricted;
	        if (formalParameters.message) {
	            message = formalParameters.message;
	        }
	        var previousStrict = this.context.strict;
	        var body = this.parseFunctionSourceElements();
	        if (this.context.strict && firstRestricted) {
	            this.throwUnexpectedToken(firstRestricted, message);
	        }
	        if (this.context.strict && stricted) {
	            this.tolerateUnexpectedToken(stricted, message);
	        }
	        this.context.strict = previousStrict;
	        this.context.allowYield = previousAllowYield;
	        return this.finalize(node, new Node.FunctionExpression(id, params, body, isGenerator));
	    };
	    // ECMA-262 14.1.1 Directive Prologues
	    Parser.prototype.parseDirective = function () {
	        var token = this.lookahead;
	        var directive = null;
	        var node = this.createNode();
	        var expr = this.parseExpression();
	        if (expr.type === syntax_1.Syntax.Literal) {
	            directive = this.getTokenRaw(token).slice(1, -1);
	        }
	        this.consumeSemicolon();
	        return this.finalize(node, directive ? new Node.Directive(expr, directive) :
	            new Node.ExpressionStatement(expr));
	    };
	    Parser.prototype.parseDirectivePrologues = function () {
	        var firstRestricted = null;
	        var body = [];
	        while (true) {
	            var token = this.lookahead;
	            if (token.type !== token_1.Token.StringLiteral) {
	                break;
	            }
	            var statement = this.parseDirective();
	            body.push(statement);
	            var directive = statement.directive;
	            if (typeof directive !== 'string') {
	                break;
	            }
	            if (directive === 'use strict') {
	                this.context.strict = true;
	                if (firstRestricted) {
	                    this.tolerateUnexpectedToken(firstRestricted, messages_1.Messages.StrictOctalLiteral);
	                }
	            }
	            else {
	                if (!firstRestricted && token.octal) {
	                    firstRestricted = token;
	                }
	            }
	        }
	        return body;
	    };
	    // ECMA-262 14.3 Method Definitions
	    Parser.prototype.qualifiedPropertyName = function (token) {
	        switch (token.type) {
	            case token_1.Token.Identifier:
	            case token_1.Token.StringLiteral:
	            case token_1.Token.BooleanLiteral:
	            case token_1.Token.NullLiteral:
	            case token_1.Token.NumericLiteral:
	            case token_1.Token.Keyword:
	                return true;
	            case token_1.Token.Punctuator:
	                return token.value === '[';
	        }
	        return false;
	    };
	    Parser.prototype.parseGetterMethod = function () {
	        var node = this.createNode();
	        this.expect('(');
	        this.expect(')');
	        var isGenerator = false;
	        var params = {
	            params: [],
	            stricted: null,
	            firstRestricted: null,
	            message: null
	        };
	        var previousAllowYield = this.context.allowYield;
	        this.context.allowYield = false;
	        var method = this.parsePropertyMethod(params);
	        this.context.allowYield = previousAllowYield;
	        return this.finalize(node, new Node.FunctionExpression(null, params.params, method, isGenerator));
	    };
	    Parser.prototype.parseSetterMethod = function () {
	        var node = this.createNode();
	        var options = {
	            params: [],
	            firstRestricted: null,
	            paramSet: {}
	        };
	        var isGenerator = false;
	        var previousAllowYield = this.context.allowYield;
	        this.context.allowYield = false;
	        this.expect('(');
	        if (this.match(')')) {
	            this.tolerateUnexpectedToken(this.lookahead);
	        }
	        else {
	            this.parseFormalParameter(options);
	        }
	        this.expect(')');
	        var method = this.parsePropertyMethod(options);
	        this.context.allowYield = previousAllowYield;
	        return this.finalize(node, new Node.FunctionExpression(null, options.params, method, isGenerator));
	    };
	    Parser.prototype.parseGeneratorMethod = function () {
	        var node = this.createNode();
	        var isGenerator = true;
	        var previousAllowYield = this.context.allowYield;
	        this.context.allowYield = true;
	        var params = this.parseFormalParameters();
	        this.context.allowYield = false;
	        var method = this.parsePropertyMethod(params);
	        this.context.allowYield = previousAllowYield;
	        return this.finalize(node, new Node.FunctionExpression(null, params.params, method, isGenerator));
	    };
	    // ECMA-262 14.4 Generator Function Definitions
	    Parser.prototype.isStartOfExpression = function () {
	        var start = true;
	        var value = this.lookahead.value;
	        switch (this.lookahead.type) {
	            case token_1.Token.Punctuator:
	                start = (value === '[') || (value === '(') || (value === '{') ||
	                    (value === '+') || (value === '-') ||
	                    (value === '!') || (value === '~') ||
	                    (value === '++') || (value === '--') ||
	                    (value === '/') || (value === '/='); // regular expression literal
	                break;
	            case token_1.Token.Keyword:
	                start = (value === 'class') || (value === 'delete') ||
	                    (value === 'function') || (value === 'let') || (value === 'new') ||
	                    (value === 'super') || (value === 'this') || (value === 'typeof') ||
	                    (value === 'void') || (value === 'yield');
	                break;
	            default:
	                break;
	        }
	        return start;
	    };
	    Parser.prototype.parseYieldExpression = function () {
	        var node = this.createNode();
	        this.expectKeyword('yield');
	        var argument = null;
	        var delegate = false;
	        if (!this.hasLineTerminator) {
	            var previousAllowYield = this.context.allowYield;
	            this.context.allowYield = false;
	            delegate = this.match('*');
	            if (delegate) {
	                this.nextToken();
	                argument = this.parseAssignmentExpression();
	            }
	            else if (this.isStartOfExpression()) {
	                argument = this.parseAssignmentExpression();
	            }
	            this.context.allowYield = previousAllowYield;
	        }
	        return this.finalize(node, new Node.YieldExpression(argument, delegate));
	    };
	    // ECMA-262 14.5 Class Definitions
	    Parser.prototype.parseClassElement = function (hasConstructor) {
	        var token = this.lookahead;
	        var node = this.createNode();
	        var kind;
	        var key;
	        var value;
	        var computed = false;
	        var method = false;
	        var isStatic = false;
	        if (this.match('*')) {
	            this.nextToken();
	        }
	        else {
	            computed = this.match('[');
	            key = this.parseObjectPropertyKey();
	            var id = key;
	            if (id.name === 'static' && (this.qualifiedPropertyName(this.lookahead) || this.match('*'))) {
	                token = this.lookahead;
	                isStatic = true;
	                computed = this.match('[');
	                if (this.match('*')) {
	                    this.nextToken();
	                }
	                else {
	                    key = this.parseObjectPropertyKey();
	                }
	            }
	        }
	        var lookaheadPropertyKey = this.qualifiedPropertyName(this.lookahead);
	        if (token.type === token_1.Token.Identifier) {
	            if (token.value === 'get' && lookaheadPropertyKey) {
	                kind = 'get';
	                computed = this.match('[');
	                key = this.parseObjectPropertyKey();
	                this.context.allowYield = false;
	                value = this.parseGetterMethod();
	            }
	            else if (token.value === 'set' && lookaheadPropertyKey) {
	                kind = 'set';
	                computed = this.match('[');
	                key = this.parseObjectPropertyKey();
	                value = this.parseSetterMethod();
	            }
	        }
	        else if (token.type === token_1.Token.Punctuator && token.value === '*' && lookaheadPropertyKey) {
	            kind = 'init';
	            computed = this.match('[');
	            key = this.parseObjectPropertyKey();
	            value = this.parseGeneratorMethod();
	            method = true;
	        }
	        if (!kind && key && this.match('(')) {
	            kind = 'init';
	            value = this.parsePropertyMethodFunction();
	            method = true;
	        }
	        if (!kind) {
	            this.throwUnexpectedToken(this.lookahead);
	        }
	        if (kind === 'init') {
	            kind = 'method';
	        }
	        if (!computed) {
	            if (isStatic && this.isPropertyKey(key, 'prototype')) {
	                this.throwUnexpectedToken(token, messages_1.Messages.StaticPrototype);
	            }
	            if (!isStatic && this.isPropertyKey(key, 'constructor')) {
	                if (kind !== 'method' || !method || value.generator) {
	                    this.throwUnexpectedToken(token, messages_1.Messages.ConstructorSpecialMethod);
	                }
	                if (hasConstructor.value) {
	                    this.throwUnexpectedToken(token, messages_1.Messages.DuplicateConstructor);
	                }
	                else {
	                    hasConstructor.value = true;
	                }
	                kind = 'constructor';
	            }
	        }
	        return this.finalize(node, new Node.MethodDefinition(key, computed, value, kind, isStatic));
	    };
	    Parser.prototype.parseClassElementList = function () {
	        var body = [];
	        var hasConstructor = { value: false };
	        this.expect('{');
	        while (!this.match('}')) {
	            if (this.match(';')) {
	                this.nextToken();
	            }
	            else {
	                body.push(this.parseClassElement(hasConstructor));
	            }
	        }
	        this.expect('}');
	        return body;
	    };
	    Parser.prototype.parseClassBody = function () {
	        var node = this.createNode();
	        var elementList = this.parseClassElementList();
	        return this.finalize(node, new Node.ClassBody(elementList));
	    };
	    Parser.prototype.parseClassDeclaration = function (identifierIsOptional) {
	        var node = this.createNode();
	        var previousStrict = this.context.strict;
	        this.context.strict = true;
	        this.expectKeyword('class');
	        var id = (identifierIsOptional && (this.lookahead.type !== token_1.Token.Identifier)) ? null : this.parseVariableIdentifier();
	        var superClass = null;
	        if (this.matchKeyword('extends')) {
	            this.nextToken();
	            superClass = this.isolateCoverGrammar(this.parseLeftHandSideExpressionAllowCall);
	        }
	        var classBody = this.parseClassBody();
	        this.context.strict = previousStrict;
	        return this.finalize(node, new Node.ClassDeclaration(id, superClass, classBody));
	    };
	    Parser.prototype.parseClassExpression = function () {
	        var node = this.createNode();
	        var previousStrict = this.context.strict;
	        this.context.strict = true;
	        this.expectKeyword('class');
	        var id = (this.lookahead.type === token_1.Token.Identifier) ? this.parseVariableIdentifier() : null;
	        var superClass = null;
	        if (this.matchKeyword('extends')) {
	            this.nextToken();
	            superClass = this.isolateCoverGrammar(this.parseLeftHandSideExpressionAllowCall);
	        }
	        var classBody = this.parseClassBody();
	        this.context.strict = previousStrict;
	        return this.finalize(node, new Node.ClassExpression(id, superClass, classBody));
	    };
	    // ECMA-262 15.1 Scripts
	    // ECMA-262 15.2 Modules
	    Parser.prototype.parseProgram = function () {
	        var node = this.createNode();
	        var body = this.parseDirectivePrologues();
	        while (this.startMarker.index < this.scanner.length) {
	            body.push(this.parseStatementListItem());
	        }
	        return this.finalize(node, new Node.Program(body, this.sourceType));
	    };
	    // ECMA-262 15.2.2 Imports
	    Parser.prototype.parseModuleSpecifier = function () {
	        var node = this.createNode();
	        if (this.lookahead.type !== token_1.Token.StringLiteral) {
	            this.throwError(messages_1.Messages.InvalidModuleSpecifier);
	        }
	        var token = this.nextToken();
	        var raw = this.getTokenRaw(token);
	        return this.finalize(node, new Node.Literal(token.value, raw));
	    };
	    // import {<foo as bar>} ...;
	    Parser.prototype.parseImportSpecifier = function () {
	        var node = this.createNode();
	        var imported;
	        var local;
	        if (this.lookahead.type === token_1.Token.Identifier) {
	            imported = this.parseVariableIdentifier();
	            local = imported;
	            if (this.matchContextualKeyword('as')) {
	                this.nextToken();
	                local = this.parseVariableIdentifier();
	            }
	        }
	        else {
	            imported = this.parseIdentifierName();
	            local = imported;
	            if (this.matchContextualKeyword('as')) {
	                this.nextToken();
	                local = this.parseVariableIdentifier();
	            }
	            else {
	                this.throwUnexpectedToken(this.nextToken());
	            }
	        }
	        return this.finalize(node, new Node.ImportSpecifier(local, imported));
	    };
	    // {foo, bar as bas}
	    Parser.prototype.parseNamedImports = function () {
	        this.expect('{');
	        var specifiers = [];
	        while (!this.match('}')) {
	            specifiers.push(this.parseImportSpecifier());
	            if (!this.match('}')) {
	                this.expect(',');
	            }
	        }
	        this.expect('}');
	        return specifiers;
	    };
	    // import <foo> ...;
	    Parser.prototype.parseImportDefaultSpecifier = function () {
	        var node = this.createNode();
	        var local = this.parseIdentifierName();
	        return this.finalize(node, new Node.ImportDefaultSpecifier(local));
	    };
	    // import <* as foo> ...;
	    Parser.prototype.parseImportNamespaceSpecifier = function () {
	        var node = this.createNode();
	        this.expect('*');
	        if (!this.matchContextualKeyword('as')) {
	            this.throwError(messages_1.Messages.NoAsAfterImportNamespace);
	        }
	        this.nextToken();
	        var local = this.parseIdentifierName();
	        return this.finalize(node, new Node.ImportNamespaceSpecifier(local));
	    };
	    Parser.prototype.parseImportDeclaration = function () {
	        if (this.context.inFunctionBody) {
	            this.throwError(messages_1.Messages.IllegalImportDeclaration);
	        }
	        var node = this.createNode();
	        this.expectKeyword('import');
	        var src;
	        var specifiers = [];
	        if (this.lookahead.type === token_1.Token.StringLiteral) {
	            // import 'foo';
	            src = this.parseModuleSpecifier();
	        }
	        else {
	            if (this.match('{')) {
	                // import {bar}
	                specifiers = specifiers.concat(this.parseNamedImports());
	            }
	            else if (this.match('*')) {
	                // import * as foo
	                specifiers.push(this.parseImportNamespaceSpecifier());
	            }
	            else if (this.isIdentifierName(this.lookahead) && !this.matchKeyword('default')) {
	                // import foo
	                specifiers.push(this.parseImportDefaultSpecifier());
	                if (this.match(',')) {
	                    this.nextToken();
	                    if (this.match('*')) {
	                        // import foo, * as foo
	                        specifiers.push(this.parseImportNamespaceSpecifier());
	                    }
	                    else if (this.match('{')) {
	                        // import foo, {bar}
	                        specifiers = specifiers.concat(this.parseNamedImports());
	                    }
	                    else {
	                        this.throwUnexpectedToken(this.lookahead);
	                    }
	                }
	            }
	            else {
	                this.throwUnexpectedToken(this.nextToken());
	            }
	            if (!this.matchContextualKeyword('from')) {
	                var message = this.lookahead.value ? messages_1.Messages.UnexpectedToken : messages_1.Messages.MissingFromClause;
	                this.throwError(message, this.lookahead.value);
	            }
	            this.nextToken();
	            src = this.parseModuleSpecifier();
	        }
	        this.consumeSemicolon();
	        return this.finalize(node, new Node.ImportDeclaration(specifiers, src));
	    };
	    // ECMA-262 15.2.3 Exports
	    Parser.prototype.parseExportSpecifier = function () {
	        var node = this.createNode();
	        var local = this.parseIdentifierName();
	        var exported = local;
	        if (this.matchContextualKeyword('as')) {
	            this.nextToken();
	            exported = this.parseIdentifierName();
	        }
	        return this.finalize(node, new Node.ExportSpecifier(local, exported));
	    };
	    Parser.prototype.parseExportDeclaration = function () {
	        if (this.context.inFunctionBody) {
	            this.throwError(messages_1.Messages.IllegalExportDeclaration);
	        }
	        var node = this.createNode();
	        this.expectKeyword('export');
	        var exportDeclaration;
	        if (this.matchKeyword('default')) {
	            // export default ...
	            this.nextToken();
	            if (this.matchKeyword('function')) {
	                // export default function foo () {}
	                // export default function () {}
	                var declaration = this.parseFunctionDeclaration(true);
	                exportDeclaration = this.finalize(node, new Node.ExportDefaultDeclaration(declaration));
	            }
	            else if (this.matchKeyword('class')) {
	                // export default class foo {}
	                var declaration = this.parseClassDeclaration(true);
	                exportDeclaration = this.finalize(node, new Node.ExportDefaultDeclaration(declaration));
	            }
	            else {
	                if (this.matchContextualKeyword('from')) {
	                    this.throwError(messages_1.Messages.UnexpectedToken, this.lookahead.value);
	                }
	                // export default {};
	                // export default [];
	                // export default (1 + 2);
	                var declaration = this.match('{') ? this.parseObjectInitializer() :
	                    this.match('[') ? this.parseArrayInitializer() : this.parseAssignmentExpression();
	                this.consumeSemicolon();
	                exportDeclaration = this.finalize(node, new Node.ExportDefaultDeclaration(declaration));
	            }
	        }
	        else if (this.match('*')) {
	            // export * from 'foo';
	            this.nextToken();
	            if (!this.matchContextualKeyword('from')) {
	                var message = this.lookahead.value ? messages_1.Messages.UnexpectedToken : messages_1.Messages.MissingFromClause;
	                this.throwError(message, this.lookahead.value);
	            }
	            this.nextToken();
	            var src = this.parseModuleSpecifier();
	            this.consumeSemicolon();
	            exportDeclaration = this.finalize(node, new Node.ExportAllDeclaration(src));
	        }
	        else if (this.lookahead.type === token_1.Token.Keyword) {
	            // export var f = 1;
	            var declaration = void 0;
	            switch (this.lookahead.value) {
	                case 'let':
	                case 'const':
	                    declaration = this.parseLexicalDeclaration({ inFor: false });
	                    break;
	                case 'var':
	                case 'class':
	                case 'function':
	                    declaration = this.parseStatementListItem();
	                    break;
	                default:
	                    this.throwUnexpectedToken(this.lookahead);
	            }
	            exportDeclaration = this.finalize(node, new Node.ExportNamedDeclaration(declaration, [], null));
	        }
	        else {
	            var specifiers = [];
	            var source = null;
	            var isExportFromIdentifier = false;
	            this.expect('{');
	            while (!this.match('}')) {
	                isExportFromIdentifier = isExportFromIdentifier || this.matchKeyword('default');
	                specifiers.push(this.parseExportSpecifier());
	                if (!this.match('}')) {
	                    this.expect(',');
	                }
	            }
	            this.expect('}');
	            if (this.matchContextualKeyword('from')) {
	                // export {default} from 'foo';
	                // export {foo} from 'foo';
	                this.nextToken();
	                source = this.parseModuleSpecifier();
	                this.consumeSemicolon();
	            }
	            else if (isExportFromIdentifier) {
	                // export {default}; // missing fromClause
	                var message = this.lookahead.value ? messages_1.Messages.UnexpectedToken : messages_1.Messages.MissingFromClause;
	                this.throwError(message, this.lookahead.value);
	            }
	            else {
	                // export {foo};
	                this.consumeSemicolon();
	            }
	            exportDeclaration = this.finalize(node, new Node.ExportNamedDeclaration(null, specifiers, source));
	        }
	        return exportDeclaration;
	    };
	    return Parser;
	}());
	exports.Parser = Parser;


/***/ },
/* 4 */
/***/ function(module, exports) {

	// Ensure the condition is true, otherwise throw an error.
	// This is only to have a better contract semantic, i.e. another safety net
	// to catch a logic error. The condition shall be fulfilled in normal case.
	// Do NOT use this to enforce a certain condition on any user input.
	"use strict";
	function assert(condition, message) {
	    /* istanbul ignore if */
	    if (!condition) {
	        throw new Error('ASSERT: ' + message);
	    }
	}
	exports.assert = assert;


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	// Error messages should be identical to V8.
	exports.Messages = {
	    UnexpectedToken: 'Unexpected token %0',
	    UnexpectedTokenIllegal: 'Unexpected token ILLEGAL',
	    UnexpectedNumber: 'Unexpected number',
	    UnexpectedString: 'Unexpected string',
	    UnexpectedIdentifier: 'Unexpected identifier',
	    UnexpectedReserved: 'Unexpected reserved word',
	    UnexpectedTemplate: 'Unexpected quasi %0',
	    UnexpectedEOS: 'Unexpected end of input',
	    NewlineAfterThrow: 'Illegal newline after throw',
	    InvalidRegExp: 'Invalid regular expression',
	    UnterminatedRegExp: 'Invalid regular expression: missing /',
	    InvalidLHSInAssignment: 'Invalid left-hand side in assignment',
	    InvalidLHSInForIn: 'Invalid left-hand side in for-in',
	    InvalidLHSInForLoop: 'Invalid left-hand side in for-loop',
	    MultipleDefaultsInSwitch: 'More than one default clause in switch statement',
	    NoCatchOrFinally: 'Missing catch or finally after try',
	    UnknownLabel: 'Undefined label \'%0\'',
	    Redeclaration: '%0 \'%1\' has already been declared',
	    IllegalContinue: 'Illegal continue statement',
	    IllegalBreak: 'Illegal break statement',
	    IllegalReturn: 'Illegal return statement',
	    StrictModeWith: 'Strict mode code may not include a with statement',
	    StrictCatchVariable: 'Catch variable may not be eval or arguments in strict mode',
	    StrictVarName: 'Variable name may not be eval or arguments in strict mode',
	    StrictParamName: 'Parameter name eval or arguments is not allowed in strict mode',
	    StrictParamDupe: 'Strict mode function may not have duplicate parameter names',
	    StrictFunctionName: 'Function name may not be eval or arguments in strict mode',
	    StrictOctalLiteral: 'Octal literals are not allowed in strict mode.',
	    StrictDelete: 'Delete of an unqualified identifier in strict mode.',
	    StrictLHSAssignment: 'Assignment to eval or arguments is not allowed in strict mode',
	    StrictLHSPostfix: 'Postfix increment/decrement may not have eval or arguments operand in strict mode',
	    StrictLHSPrefix: 'Prefix increment/decrement may not have eval or arguments operand in strict mode',
	    StrictReservedWord: 'Use of future reserved word in strict mode',
	    TemplateOctalLiteral: 'Octal literals are not allowed in template strings.',
	    ParameterAfterRestParameter: 'Rest parameter must be last formal parameter',
	    DefaultRestParameter: 'Unexpected token =',
	    DuplicateProtoProperty: 'Duplicate __proto__ fields are not allowed in object literals',
	    ConstructorSpecialMethod: 'Class constructor may not be an accessor',
	    DuplicateConstructor: 'A class may only have one constructor',
	    StaticPrototype: 'Classes may not have static property named prototype',
	    MissingFromClause: 'Unexpected token',
	    NoAsAfterImportNamespace: 'Unexpected token',
	    InvalidModuleSpecifier: 'Unexpected token',
	    IllegalImportDeclaration: 'Unexpected token',
	    IllegalExportDeclaration: 'Unexpected token',
	    DuplicateBinding: 'Duplicate binding %0',
	    ForInOfLoopInitializer: '%0 loop variable declaration may not have an initializer'
	};


/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	var ErrorHandler = (function () {
	    function ErrorHandler() {
	        this.errors = [];
	        this.tolerant = false;
	    }
	    ;
	    ErrorHandler.prototype.recordError = function (error) {
	        this.errors.push(error);
	    };
	    ;
	    ErrorHandler.prototype.tolerate = function (error) {
	        if (this.tolerant) {
	            this.recordError(error);
	        }
	        else {
	            throw error;
	        }
	    };
	    ;
	    ErrorHandler.prototype.constructError = function (msg, column) {
	        var error = new Error(msg);
	        try {
	            throw error;
	        }
	        catch (base) {
	            /* istanbul ignore else */
	            if (Object.create && Object.defineProperty) {
	                error = Object.create(base);
	                Object.defineProperty(error, 'column', { value: column });
	            }
	        }
	        finally {
	            return error;
	        }
	    };
	    ;
	    ErrorHandler.prototype.createError = function (index, line, col, description) {
	        var msg = 'Line ' + line + ': ' + description;
	        var error = this.constructError(msg, col);
	        error.index = index;
	        error.lineNumber = line;
	        error.description = description;
	        return error;
	    };
	    ;
	    ErrorHandler.prototype.throwError = function (index, line, col, description) {
	        throw this.createError(index, line, col, description);
	    };
	    ;
	    ErrorHandler.prototype.tolerateError = function (index, line, col, description) {
	        var error = this.createError(index, line, col, description);
	        if (this.tolerant) {
	            this.recordError(error);
	        }
	        else {
	            throw error;
	        }
	    };
	    ;
	    return ErrorHandler;
	}());
	exports.ErrorHandler = ErrorHandler;


/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	(function (Token) {
	    Token[Token["BooleanLiteral"] = 1] = "BooleanLiteral";
	    Token[Token["EOF"] = 2] = "EOF";
	    Token[Token["Identifier"] = 3] = "Identifier";
	    Token[Token["Keyword"] = 4] = "Keyword";
	    Token[Token["NullLiteral"] = 5] = "NullLiteral";
	    Token[Token["NumericLiteral"] = 6] = "NumericLiteral";
	    Token[Token["Punctuator"] = 7] = "Punctuator";
	    Token[Token["StringLiteral"] = 8] = "StringLiteral";
	    Token[Token["RegularExpression"] = 9] = "RegularExpression";
	    Token[Token["Template"] = 10] = "Template";
	})(exports.Token || (exports.Token = {}));
	var Token = exports.Token;
	;
	exports.TokenName = {};
	exports.TokenName[Token.BooleanLiteral] = 'Boolean';
	exports.TokenName[Token.EOF] = '<end>';
	exports.TokenName[Token.Identifier] = 'Identifier';
	exports.TokenName[Token.Keyword] = 'Keyword';
	exports.TokenName[Token.NullLiteral] = 'Null';
	exports.TokenName[Token.NumericLiteral] = 'Numeric';
	exports.TokenName[Token.Punctuator] = 'Punctuator';
	exports.TokenName[Token.StringLiteral] = 'String';
	exports.TokenName[Token.RegularExpression] = 'RegularExpression';
	exports.TokenName[Token.Template] = 'Template';


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var assert_1 = __webpack_require__(4);
	var messages_1 = __webpack_require__(5);
	var character_1 = __webpack_require__(9);
	var token_1 = __webpack_require__(7);
	function hexValue(ch) {
	    return '0123456789abcdef'.indexOf(ch.toLowerCase());
	}
	function octalValue(ch) {
	    return '01234567'.indexOf(ch);
	}
	var Scanner = (function () {
	    function Scanner(code, handler) {
	        this.source = code;
	        this.errorHandler = handler;
	        this.trackComment = false;
	        this.length = code.length;
	        this.index = 0;
	        this.lineNumber = (code.length > 0) ? 1 : 0;
	        this.lineStart = 0;
	        this.curlyStack = [];
	    }
	    ;
	    Scanner.prototype.eof = function () {
	        return this.index >= this.length;
	    };
	    ;
	    Scanner.prototype.throwUnexpectedToken = function (message) {
	        if (message === void 0) { message = messages_1.Messages.UnexpectedTokenIllegal; }
	        this.errorHandler.throwError(this.index, this.lineNumber, this.index - this.lineStart + 1, message);
	    };
	    ;
	    Scanner.prototype.tolerateUnexpectedToken = function () {
	        this.errorHandler.tolerateError(this.index, this.lineNumber, this.index - this.lineStart + 1, messages_1.Messages.UnexpectedTokenIllegal);
	    };
	    ;
	    // ECMA-262 11.4 Comments
	    Scanner.prototype.skipSingleLineComment = function (offset) {
	        var comments;
	        var start, loc;
	        if (this.trackComment) {
	            comments = [];
	            start = this.index - offset;
	            loc = {
	                start: {
	                    line: this.lineNumber,
	                    column: this.index - this.lineStart - offset
	                },
	                end: {}
	            };
	        }
	        while (!this.eof()) {
	            var ch = this.source.charCodeAt(this.index);
	            ++this.index;
	            if (character_1.Character.isLineTerminator(ch)) {
	                if (this.trackComment) {
	                    loc.end = {
	                        line: this.lineNumber,
	                        column: this.index - this.lineStart - 1
	                    };
	                    var entry = {
	                        multiLine: false,
	                        slice: [start + offset, this.index - 1],
	                        range: [start, this.index - 1],
	                        loc: loc
	                    };
	                    comments.push(entry);
	                }
	                if (ch === 13 && this.source.charCodeAt(this.index) === 10) {
	                    ++this.index;
	                }
	                ++this.lineNumber;
	                this.lineStart = this.index;
	                return comments;
	            }
	        }
	        if (this.trackComment) {
	            loc.end = {
	                line: this.lineNumber,
	                column: this.index - this.lineStart
	            };
	            var entry = {
	                multiLine: false,
	                slice: [start + offset, this.index],
	                range: [start, this.index],
	                loc: loc
	            };
	            comments.push(entry);
	        }
	        return comments;
	    };
	    ;
	    Scanner.prototype.skipMultiLineComment = function () {
	        var comments;
	        var start, loc;
	        if (this.trackComment) {
	            comments = [];
	            start = this.index - 2;
	            loc = {
	                start: {
	                    line: this.lineNumber,
	                    column: this.index - this.lineStart - 2
	                },
	                end: {}
	            };
	        }
	        while (!this.eof()) {
	            var ch = this.source.charCodeAt(this.index);
	            if (character_1.Character.isLineTerminator(ch)) {
	                if (ch === 0x0D && this.source.charCodeAt(this.index + 1) === 0x0A) {
	                    ++this.index;
	                }
	                ++this.lineNumber;
	                ++this.index;
	                this.lineStart = this.index;
	            }
	            else if (ch === 0x2A) {
	                // Block comment ends with '*/'.
	                if (this.source.charCodeAt(this.index + 1) === 0x2F) {
	                    this.index += 2;
	                    if (this.trackComment) {
	                        loc.end = {
	                            line: this.lineNumber,
	                            column: this.index - this.lineStart
	                        };
	                        var entry = {
	                            multiLine: true,
	                            slice: [start + 2, this.index - 2],
	                            range: [start, this.index],
	                            loc: loc
	                        };
	                        comments.push(entry);
	                    }
	                    return comments;
	                }
	                ++this.index;
	            }
	            else {
	                ++this.index;
	            }
	        }
	        // Ran off the end of the file - the whole thing is a comment
	        if (this.trackComment) {
	            loc.end = {
	                line: this.lineNumber,
	                column: this.index - this.lineStart
	            };
	            var entry = {
	                multiLine: true,
	                slice: [start + 2, this.index],
	                range: [start, this.index],
	                loc: loc
	            };
	            comments.push(entry);
	        }
	        this.tolerateUnexpectedToken();
	        return comments;
	    };
	    ;
	    Scanner.prototype.scanComments = function () {
	        var comments;
	        if (this.trackComment) {
	            comments = [];
	        }
	        var start = (this.index === 0);
	        while (!this.eof()) {
	            var ch = this.source.charCodeAt(this.index);
	            if (character_1.Character.isWhiteSpace(ch)) {
	                ++this.index;
	            }
	            else if (character_1.Character.isLineTerminator(ch)) {
	                ++this.index;
	                if (ch === 0x0D && this.source.charCodeAt(this.index) === 0x0A) {
	                    ++this.index;
	                }
	                ++this.lineNumber;
	                this.lineStart = this.index;
	                start = true;
	            }
	            else if (ch === 0x2F) {
	                ch = this.source.charCodeAt(this.index + 1);
	                if (ch === 0x2F) {
	                    this.index += 2;
	                    var comment = this.skipSingleLineComment(2);
	                    if (this.trackComment) {
	                        comments = comments.concat(comment);
	                    }
	                    start = true;
	                }
	                else if (ch === 0x2A) {
	                    this.index += 2;
	                    var comment = this.skipMultiLineComment();
	                    if (this.trackComment) {
	                        comments = comments.concat(comment);
	                    }
	                }
	                else {
	                    break;
	                }
	            }
	            else if (start && ch === 0x2D) {
	                // U+003E is '>'
	                if ((this.source.charCodeAt(this.index + 1) === 0x2D) && (this.source.charCodeAt(this.index + 2) === 0x3E)) {
	                    // '-->' is a single-line comment
	                    this.index += 3;
	                    var comment = this.skipSingleLineComment(3);
	                    if (this.trackComment) {
	                        comments = comments.concat(comment);
	                    }
	                }
	                else {
	                    break;
	                }
	            }
	            else if (ch === 0x3C) {
	                if (this.source.slice(this.index + 1, this.index + 4) === '!--') {
	                    this.index += 4; // `<!--`
	                    var comment = this.skipSingleLineComment(4);
	                    if (this.trackComment) {
	                        comments = comments.concat(comment);
	                    }
	                }
	                else {
	                    break;
	                }
	            }
	            else {
	                break;
	            }
	        }
	        return comments;
	    };
	    ;
	    // ECMA-262 11.6.2.2 Future Reserved Words
	    Scanner.prototype.isFutureReservedWord = function (id) {
	        switch (id) {
	            case 'enum':
	            case 'export':
	            case 'import':
	            case 'super':
	                return true;
	            default:
	                return false;
	        }
	    };
	    ;
	    Scanner.prototype.isStrictModeReservedWord = function (id) {
	        switch (id) {
	            case 'implements':
	            case 'interface':
	            case 'package':
	            case 'private':
	            case 'protected':
	            case 'public':
	            case 'static':
	            case 'yield':
	            case 'let':
	                return true;
	            default:
	                return false;
	        }
	    };
	    ;
	    Scanner.prototype.isRestrictedWord = function (id) {
	        return id === 'eval' || id === 'arguments';
	    };
	    ;
	    // ECMA-262 11.6.2.1 Keywords
	    Scanner.prototype.isKeyword = function (id) {
	        switch (id.length) {
	            case 2:
	                return (id === 'if') || (id === 'in') || (id === 'do');
	            case 3:
	                return (id === 'var') || (id === 'for') || (id === 'new') ||
	                    (id === 'try') || (id === 'let');
	            case 4:
	                return (id === 'this') || (id === 'else') || (id === 'case') ||
	                    (id === 'void') || (id === 'with') || (id === 'enum');
	            case 5:
	                return (id === 'while') || (id === 'break') || (id === 'catch') ||
	                    (id === 'throw') || (id === 'const') || (id === 'yield') ||
	                    (id === 'class') || (id === 'super');
	            case 6:
	                return (id === 'return') || (id === 'typeof') || (id === 'delete') ||
	                    (id === 'switch') || (id === 'export') || (id === 'import');
	            case 7:
	                return (id === 'default') || (id === 'finally') || (id === 'extends');
	            case 8:
	                return (id === 'function') || (id === 'continue') || (id === 'debugger');
	            case 10:
	                return (id === 'instanceof');
	            default:
	                return false;
	        }
	    };
	    ;
	    Scanner.prototype.codePointAt = function (i) {
	        var cp = this.source.charCodeAt(i);
	        if (cp >= 0xD800 && cp <= 0xDBFF) {
	            var second = this.source.charCodeAt(i + 1);
	            if (second >= 0xDC00 && second <= 0xDFFF) {
	                var first = cp;
	                cp = (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
	            }
	        }
	        return cp;
	    };
	    ;
	    Scanner.prototype.scanHexEscape = function (prefix) {
	        var len = (prefix === 'u') ? 4 : 2;
	        var code = 0;
	        for (var i = 0; i < len; ++i) {
	            if (!this.eof() && character_1.Character.isHexDigit(this.source.charCodeAt(this.index))) {
	                code = code * 16 + hexValue(this.source[this.index++]);
	            }
	            else {
	                return '';
	            }
	        }
	        return String.fromCharCode(code);
	    };
	    ;
	    Scanner.prototype.scanUnicodeCodePointEscape = function () {
	        var ch = this.source[this.index];
	        var code = 0;
	        // At least, one hex digit is required.
	        if (ch === '}') {
	            this.throwUnexpectedToken();
	        }
	        while (!this.eof()) {
	            ch = this.source[this.index++];
	            if (!character_1.Character.isHexDigit(ch.charCodeAt(0))) {
	                break;
	            }
	            code = code * 16 + hexValue(ch);
	        }
	        if (code > 0x10FFFF || ch !== '}') {
	            this.throwUnexpectedToken();
	        }
	        return character_1.Character.fromCodePoint(code);
	    };
	    ;
	    Scanner.prototype.getIdentifier = function () {
	        var start = this.index++;
	        while (!this.eof()) {
	            var ch = this.source.charCodeAt(this.index);
	            if (ch === 0x5C) {
	                // Blackslash (U+005C) marks Unicode escape sequence.
	                this.index = start;
	                return this.getComplexIdentifier();
	            }
	            else if (ch >= 0xD800 && ch < 0xDFFF) {
	                // Need to handle surrogate pairs.
	                this.index = start;
	                return this.getComplexIdentifier();
	            }
	            if (character_1.Character.isIdentifierPart(ch)) {
	                ++this.index;
	            }
	            else {
	                break;
	            }
	        }
	        return this.source.slice(start, this.index);
	    };
	    ;
	    Scanner.prototype.getComplexIdentifier = function () {
	        var cp = this.codePointAt(this.index);
	        var id = character_1.Character.fromCodePoint(cp);
	        this.index += id.length;
	        // '\u' (U+005C, U+0075) denotes an escaped character.
	        var ch;
	        if (cp === 0x5C) {
	            if (this.source.charCodeAt(this.index) !== 0x75) {
	                this.throwUnexpectedToken();
	            }
	            ++this.index;
	            if (this.source[this.index] === '{') {
	                ++this.index;
	                ch = this.scanUnicodeCodePointEscape();
	            }
	            else {
	                ch = this.scanHexEscape('u');
	                cp = ch.charCodeAt(0);
	                if (!ch || ch === '\\' || !character_1.Character.isIdentifierStart(cp)) {
	                    this.throwUnexpectedToken();
	                }
	            }
	            id = ch;
	        }
	        while (!this.eof()) {
	            cp = this.codePointAt(this.index);
	            if (!character_1.Character.isIdentifierPart(cp)) {
	                break;
	            }
	            ch = character_1.Character.fromCodePoint(cp);
	            id += ch;
	            this.index += ch.length;
	            // '\u' (U+005C, U+0075) denotes an escaped character.
	            if (cp === 0x5C) {
	                id = id.substr(0, id.length - 1);
	                if (this.source.charCodeAt(this.index) !== 0x75) {
	                    this.throwUnexpectedToken();
	                }
	                ++this.index;
	                if (this.source[this.index] === '{') {
	                    ++this.index;
	                    ch = this.scanUnicodeCodePointEscape();
	                }
	                else {
	                    ch = this.scanHexEscape('u');
	                    cp = ch.charCodeAt(0);
	                    if (!ch || ch === '\\' || !character_1.Character.isIdentifierPart(cp)) {
	                        this.throwUnexpectedToken();
	                    }
	                }
	                id += ch;
	            }
	        }
	        return id;
	    };
	    ;
	    Scanner.prototype.octalToDecimal = function (ch) {
	        // \0 is not octal escape sequence
	        var octal = (ch !== '0');
	        var code = octalValue(ch);
	        if (!this.eof() && character_1.Character.isOctalDigit(this.source.charCodeAt(this.index))) {
	            octal = true;
	            code = code * 8 + octalValue(this.source[this.index++]);
	            // 3 digits are only allowed when string starts
	            // with 0, 1, 2, 3
	            if ('0123'.indexOf(ch) >= 0 && !this.eof() && character_1.Character.isOctalDigit(this.source.charCodeAt(this.index))) {
	                code = code * 8 + octalValue(this.source[this.index++]);
	            }
	        }
	        return {
	            code: code,
	            octal: octal
	        };
	    };
	    ;
	    // ECMA-262 11.6 Names and Keywords
	    Scanner.prototype.scanIdentifier = function () {
	        var type;
	        var start = this.index;
	        // Backslash (U+005C) starts an escaped character.
	        var id = (this.source.charCodeAt(start) === 0x5C) ? this.getComplexIdentifier() : this.getIdentifier();
	        // There is no keyword or literal with only one character.
	        // Thus, it must be an identifier.
	        if (id.length === 1) {
	            type = token_1.Token.Identifier;
	        }
	        else if (this.isKeyword(id)) {
	            type = token_1.Token.Keyword;
	        }
	        else if (id === 'null') {
	            type = token_1.Token.NullLiteral;
	        }
	        else if (id === 'true' || id === 'false') {
	            type = token_1.Token.BooleanLiteral;
	        }
	        else {
	            type = token_1.Token.Identifier;
	        }
	        return {
	            type: type,
	            value: id,
	            lineNumber: this.lineNumber,
	            lineStart: this.lineStart,
	            start: start,
	            end: this.index
	        };
	    };
	    ;
	    // ECMA-262 11.7 Punctuators
	    Scanner.prototype.scanPunctuator = function () {
	        var token = {
	            type: token_1.Token.Punctuator,
	            value: '',
	            lineNumber: this.lineNumber,
	            lineStart: this.lineStart,
	            start: this.index,
	            end: this.index
	        };
	        // Check for most common single-character punctuators.
	        var str = this.source[this.index];
	        switch (str) {
	            case '(':
	            case '{':
	                if (str === '{') {
	                    this.curlyStack.push('{');
	                }
	                ++this.index;
	                break;
	            case '.':
	                ++this.index;
	                if (this.source[this.index] === '.' && this.source[this.index + 1] === '.') {
	                    // Spread operator: ...
	                    this.index += 2;
	                    str = '...';
	                }
	                break;
	            case '}':
	                ++this.index;
	                this.curlyStack.pop();
	                break;
	            case ')':
	            case ';':
	            case ',':
	            case '[':
	            case ']':
	            case ':':
	            case '?':
	            case '~':
	                ++this.index;
	                break;
	            default:
	                // 4-character punctuator.
	                str = this.source.substr(this.index, 4);
	                if (str === '>>>=') {
	                    this.index += 4;
	                }
	                else {
	                    // 3-character punctuators.
	                    str = str.substr(0, 3);
	                    if (str === '===' || str === '!==' || str === '>>>' ||
	                        str === '<<=' || str === '>>=' || str === '**=') {
	                        this.index += 3;
	                    }
	                    else {
	                        // 2-character punctuators.
	                        str = str.substr(0, 2);
	                        if (str === '&&' || str === '||' || str === '==' || str === '!=' ||
	                            str === '+=' || str === '-=' || str === '*=' || str === '/=' ||
	                            str === '++' || str === '--' || str === '<<' || str === '>>' ||
	                            str === '&=' || str === '|=' || str === '^=' || str === '%=' ||
	                            str === '<=' || str === '>=' || str === '=>' || str === '**') {
	                            this.index += 2;
	                        }
	                        else {
	                            // 1-character punctuators.
	                            str = this.source[this.index];
	                            if ('<>=!+-*%&|^/'.indexOf(str) >= 0) {
	                                ++this.index;
	                            }
	                        }
	                    }
	                }
	        }
	        if (this.index === token.start) {
	            this.throwUnexpectedToken();
	        }
	        token.end = this.index;
	        token.value = str;
	        return token;
	    };
	    ;
	    // ECMA-262 11.8.3 Numeric Literals
	    Scanner.prototype.scanHexLiteral = function (start) {
	        var number = '';
	        while (!this.eof()) {
	            if (!character_1.Character.isHexDigit(this.source.charCodeAt(this.index))) {
	                break;
	            }
	            number += this.source[this.index++];
	        }
	        if (number.length === 0) {
	            this.throwUnexpectedToken();
	        }
	        if (character_1.Character.isIdentifierStart(this.source.charCodeAt(this.index))) {
	            this.throwUnexpectedToken();
	        }
	        return {
	            type: token_1.Token.NumericLiteral,
	            value: parseInt('0x' + number, 16),
	            lineNumber: this.lineNumber,
	            lineStart: this.lineStart,
	            start: start,
	            end: this.index
	        };
	    };
	    ;
	    Scanner.prototype.scanBinaryLiteral = function (start) {
	        var number = '';
	        var ch;
	        while (!this.eof()) {
	            ch = this.source[this.index];
	            if (ch !== '0' && ch !== '1') {
	                break;
	            }
	            number += this.source[this.index++];
	        }
	        if (number.length === 0) {
	            // only 0b or 0B
	            this.throwUnexpectedToken();
	        }
	        if (!this.eof()) {
	            ch = this.source.charCodeAt(this.index);
	            /* istanbul ignore else */
	            if (character_1.Character.isIdentifierStart(ch) || character_1.Character.isDecimalDigit(ch)) {
	                this.throwUnexpectedToken();
	            }
	        }
	        return {
	            type: token_1.Token.NumericLiteral,
	            value: parseInt(number, 2),
	            lineNumber: this.lineNumber,
	            lineStart: this.lineStart,
	            start: start,
	            end: this.index
	        };
	    };
	    ;
	    Scanner.prototype.scanOctalLiteral = function (prefix, start) {
	        var number = '';
	        var octal = false;
	        if (character_1.Character.isOctalDigit(prefix.charCodeAt(0))) {
	            octal = true;
	            number = '0' + this.source[this.index++];
	        }
	        else {
	            ++this.index;
	        }
	        while (!this.eof()) {
	            if (!character_1.Character.isOctalDigit(this.source.charCodeAt(this.index))) {
	                break;
	            }
	            number += this.source[this.index++];
	        }
	        if (!octal && number.length === 0) {
	            // only 0o or 0O
	            this.throwUnexpectedToken();
	        }
	        if (character_1.Character.isIdentifierStart(this.source.charCodeAt(this.index)) || character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
	            this.throwUnexpectedToken();
	        }
	        return {
	            type: token_1.Token.NumericLiteral,
	            value: parseInt(number, 8),
	            octal: octal,
	            lineNumber: this.lineNumber,
	            lineStart: this.lineStart,
	            start: start,
	            end: this.index
	        };
	    };
	    ;
	    Scanner.prototype.isImplicitOctalLiteral = function () {
	        // Implicit octal, unless there is a non-octal digit.
	        // (Annex B.1.1 on Numeric Literals)
	        for (var i = this.index + 1; i < this.length; ++i) {
	            var ch = this.source[i];
	            if (ch === '8' || ch === '9') {
	                return false;
	            }
	            if (!character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
	                return true;
	            }
	        }
	        return true;
	    };
	    ;
	    Scanner.prototype.scanNumericLiteral = function () {
	        var start = this.index;
	        var ch = this.source[start];
	        assert_1.assert(character_1.Character.isDecimalDigit(ch.charCodeAt(0)) || (ch === '.'), 'Numeric literal must start with a decimal digit or a decimal point');
	        var number = '';
	        if (ch !== '.') {
	            number = this.source[this.index++];
	            ch = this.source[this.index];
	            // Hex number starts with '0x'.
	            // Octal number starts with '0'.
	            // Octal number in ES6 starts with '0o'.
	            // Binary number in ES6 starts with '0b'.
	            if (number === '0') {
	                if (ch === 'x' || ch === 'X') {
	                    ++this.index;
	                    return this.scanHexLiteral(start);
	                }
	                if (ch === 'b' || ch === 'B') {
	                    ++this.index;
	                    return this.scanBinaryLiteral(start);
	                }
	                if (ch === 'o' || ch === 'O') {
	                    return this.scanOctalLiteral(ch, start);
	                }
	                if (ch && character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
	                    if (this.isImplicitOctalLiteral()) {
	                        return this.scanOctalLiteral(ch, start);
	                    }
	                }
	            }
	            while (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
	                number += this.source[this.index++];
	            }
	            ch = this.source[this.index];
	        }
	        if (ch === '.') {
	            number += this.source[this.index++];
	            while (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
	                number += this.source[this.index++];
	            }
	            ch = this.source[this.index];
	        }
	        if (ch === 'e' || ch === 'E') {
	            number += this.source[this.index++];
	            ch = this.source[this.index];
	            if (ch === '+' || ch === '-') {
	                number += this.source[this.index++];
	            }
	            if (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
	                while (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
	                    number += this.source[this.index++];
	                }
	            }
	            else {
	                this.throwUnexpectedToken();
	            }
	        }
	        if (character_1.Character.isIdentifierStart(this.source.charCodeAt(this.index))) {
	            this.throwUnexpectedToken();
	        }
	        return {
	            type: token_1.Token.NumericLiteral,
	            value: parseFloat(number),
	            lineNumber: this.lineNumber,
	            lineStart: this.lineStart,
	            start: start,
	            end: this.index
	        };
	    };
	    ;
	    // ECMA-262 11.8.4 String Literals
	    Scanner.prototype.scanStringLiteral = function () {
	        var start = this.index;
	        var quote = this.source[start];
	        assert_1.assert((quote === '\'' || quote === '"'), 'String literal must starts with a quote');
	        ++this.index;
	        var octal = false;
	        var str = '';
	        while (!this.eof()) {
	            var ch = this.source[this.index++];
	            if (ch === quote) {
	                quote = '';
	                break;
	            }
	            else if (ch === '\\') {
	                ch = this.source[this.index++];
	                if (!ch || !character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
	                    switch (ch) {
	                        case 'u':
	                        case 'x':
	                            if (this.source[this.index] === '{') {
	                                ++this.index;
	                                str += this.scanUnicodeCodePointEscape();
	                            }
	                            else {
	                                var unescaped = this.scanHexEscape(ch);
	                                if (!unescaped) {
	                                    this.throwUnexpectedToken();
	                                }
	                                str += unescaped;
	                            }
	                            break;
	                        case 'n':
	                            str += '\n';
	                            break;
	                        case 'r':
	                            str += '\r';
	                            break;
	                        case 't':
	                            str += '\t';
	                            break;
	                        case 'b':
	                            str += '\b';
	                            break;
	                        case 'f':
	                            str += '\f';
	                            break;
	                        case 'v':
	                            str += '\x0B';
	                            break;
	                        case '8':
	                        case '9':
	                            str += ch;
	                            this.tolerateUnexpectedToken();
	                            break;
	                        default:
	                            if (ch && character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
	                                var octToDec = this.octalToDecimal(ch);
	                                octal = octToDec.octal || octal;
	                                str += String.fromCharCode(octToDec.code);
	                            }
	                            else {
	                                str += ch;
	                            }
	                            break;
	                    }
	                }
	                else {
	                    ++this.lineNumber;
	                    if (ch === '\r' && this.source[this.index] === '\n') {
	                        ++this.index;
	                    }
	                    this.lineStart = this.index;
	                }
	            }
	            else if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
	                break;
	            }
	            else {
	                str += ch;
	            }
	        }
	        if (quote !== '') {
	            this.index = start;
	            this.throwUnexpectedToken();
	        }
	        return {
	            type: token_1.Token.StringLiteral,
	            value: str,
	            octal: octal,
	            lineNumber: this.lineNumber,
	            lineStart: this.lineStart,
	            start: start,
	            end: this.index
	        };
	    };
	    ;
	    // ECMA-262 11.8.6 Template Literal Lexical Components
	    Scanner.prototype.scanTemplate = function () {
	        var cooked = '';
	        var terminated = false;
	        var start = this.index;
	        var head = (this.source[start] === '`');
	        var tail = false;
	        var rawOffset = 2;
	        ++this.index;
	        while (!this.eof()) {
	            var ch = this.source[this.index++];
	            if (ch === '`') {
	                rawOffset = 1;
	                tail = true;
	                terminated = true;
	                break;
	            }
	            else if (ch === '$') {
	                if (this.source[this.index] === '{') {
	                    this.curlyStack.push('${');
	                    ++this.index;
	                    terminated = true;
	                    break;
	                }
	                cooked += ch;
	            }
	            else if (ch === '\\') {
	                ch = this.source[this.index++];
	                if (!character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
	                    switch (ch) {
	                        case 'n':
	                            cooked += '\n';
	                            break;
	                        case 'r':
	                            cooked += '\r';
	                            break;
	                        case 't':
	                            cooked += '\t';
	                            break;
	                        case 'u':
	                        case 'x':
	                            if (this.source[this.index] === '{') {
	                                ++this.index;
	                                cooked += this.scanUnicodeCodePointEscape();
	                            }
	                            else {
	                                var restore = this.index;
	                                var unescaped = this.scanHexEscape(ch);
	                                if (unescaped) {
	                                    cooked += unescaped;
	                                }
	                                else {
	                                    this.index = restore;
	                                    cooked += ch;
	                                }
	                            }
	                            break;
	                        case 'b':
	                            cooked += '\b';
	                            break;
	                        case 'f':
	                            cooked += '\f';
	                            break;
	                        case 'v':
	                            cooked += '\v';
	                            break;
	                        default:
	                            if (ch === '0') {
	                                if (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
	                                    // Illegal: \01 \02 and so on
	                                    this.throwUnexpectedToken(messages_1.Messages.TemplateOctalLiteral);
	                                }
	                                cooked += '\0';
	                            }
	                            else if (character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
	                                // Illegal: \1 \2
	                                this.throwUnexpectedToken(messages_1.Messages.TemplateOctalLiteral);
	                            }
	                            else {
	                                cooked += ch;
	                            }
	                            break;
	                    }
	                }
	                else {
	                    ++this.lineNumber;
	                    if (ch === '\r' && this.source[this.index] === '\n') {
	                        ++this.index;
	                    }
	                    this.lineStart = this.index;
	                }
	            }
	            else if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
	                ++this.lineNumber;
	                if (ch === '\r' && this.source[this.index] === '\n') {
	                    ++this.index;
	                }
	                this.lineStart = this.index;
	                cooked += '\n';
	            }
	            else {
	                cooked += ch;
	            }
	        }
	        if (!terminated) {
	            this.throwUnexpectedToken();
	        }
	        if (!head) {
	            this.curlyStack.pop();
	        }
	        return {
	            type: token_1.Token.Template,
	            value: {
	                cooked: cooked,
	                raw: this.source.slice(start + 1, this.index - rawOffset)
	            },
	            head: head,
	            tail: tail,
	            lineNumber: this.lineNumber,
	            lineStart: this.lineStart,
	            start: start,
	            end: this.index
	        };
	    };
	    ;
	    // ECMA-262 11.8.5 Regular Expression Literals
	    Scanner.prototype.testRegExp = function (pattern, flags) {
	        // The BMP character to use as a replacement for astral symbols when
	        // translating an ES6 "u"-flagged pattern to an ES5-compatible
	        // approximation.
	        // Note: replacing with '\uFFFF' enables false positives in unlikely
	        // scenarios. For example, `[\u{1044f}-\u{10440}]` is an invalid
	        // pattern that would not be detected by this substitution.
	        var astralSubstitute = '\uFFFF';
	        var tmp = pattern;
	        var self = this;
	        if (flags.indexOf('u') >= 0) {
	            tmp = tmp
	                .replace(/\\u\{([0-9a-fA-F]+)\}|\\u([a-fA-F0-9]{4})/g, function ($0, $1, $2) {
	                var codePoint = parseInt($1 || $2, 16);
	                if (codePoint > 0x10FFFF) {
	                    self.throwUnexpectedToken(messages_1.Messages.InvalidRegExp);
	                }
	                if (codePoint <= 0xFFFF) {
	                    return String.fromCharCode(codePoint);
	                }
	                return astralSubstitute;
	            })
	                .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, astralSubstitute);
	        }
	        // First, detect invalid regular expressions.
	        try {
	            RegExp(tmp);
	        }
	        catch (e) {
	            this.throwUnexpectedToken(messages_1.Messages.InvalidRegExp);
	        }
	        // Return a regular expression object for this pattern-flag pair, or
	        // `null` in case the current environment doesn't support the flags it
	        // uses.
	        try {
	            return new RegExp(pattern, flags);
	        }
	        catch (exception) {
	            /* istanbul ignore next */
	            return null;
	        }
	    };
	    ;
	    Scanner.prototype.scanRegExpBody = function () {
	        var ch = this.source[this.index];
	        assert_1.assert(ch === '/', 'Regular expression literal must start with a slash');
	        var str = this.source[this.index++];
	        var classMarker = false;
	        var terminated = false;
	        while (!this.eof()) {
	            ch = this.source[this.index++];
	            str += ch;
	            if (ch === '\\') {
	                ch = this.source[this.index++];
	                // ECMA-262 7.8.5
	                if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
	                    this.throwUnexpectedToken(messages_1.Messages.UnterminatedRegExp);
	                }
	                str += ch;
	            }
	            else if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
	                this.throwUnexpectedToken(messages_1.Messages.UnterminatedRegExp);
	            }
	            else if (classMarker) {
	                if (ch === ']') {
	                    classMarker = false;
	                }
	            }
	            else {
	                if (ch === '/') {
	                    terminated = true;
	                    break;
	                }
	                else if (ch === '[') {
	                    classMarker = true;
	                }
	            }
	        }
	        if (!terminated) {
	            this.throwUnexpectedToken(messages_1.Messages.UnterminatedRegExp);
	        }
	        // Exclude leading and trailing slash.
	        var body = str.substr(1, str.length - 2);
	        return {
	            value: body,
	            literal: str
	        };
	    };
	    ;
	    Scanner.prototype.scanRegExpFlags = function () {
	        var str = '';
	        var flags = '';
	        while (!this.eof()) {
	            var ch = this.source[this.index];
	            if (!character_1.Character.isIdentifierPart(ch.charCodeAt(0))) {
	                break;
	            }
	            ++this.index;
	            if (ch === '\\' && !this.eof()) {
	                ch = this.source[this.index];
	                if (ch === 'u') {
	                    ++this.index;
	                    var restore = this.index;
	                    ch = this.scanHexEscape('u');
	                    if (ch) {
	                        flags += ch;
	                        for (str += '\\u'; restore < this.index; ++restore) {
	                            str += this.source[restore];
	                        }
	                    }
	                    else {
	                        this.index = restore;
	                        flags += 'u';
	                        str += '\\u';
	                    }
	                    this.tolerateUnexpectedToken();
	                }
	                else {
	                    str += '\\';
	                    this.tolerateUnexpectedToken();
	                }
	            }
	            else {
	                flags += ch;
	                str += ch;
	            }
	        }
	        return {
	            value: flags,
	            literal: str
	        };
	    };
	    ;
	    Scanner.prototype.scanRegExp = function () {
	        var start = this.index;
	        var body = this.scanRegExpBody();
	        var flags = this.scanRegExpFlags();
	        var value = this.testRegExp(body.value, flags.value);
	        return {
	            type: token_1.Token.RegularExpression,
	            value: value,
	            literal: body.literal + flags.literal,
	            regex: {
	                pattern: body.value,
	                flags: flags.value
	            },
	            lineNumber: this.lineNumber,
	            lineStart: this.lineStart,
	            start: start,
	            end: this.index
	        };
	    };
	    ;
	    Scanner.prototype.lex = function () {
	        if (this.eof()) {
	            return {
	                type: token_1.Token.EOF,
	                lineNumber: this.lineNumber,
	                lineStart: this.lineStart,
	                start: this.index,
	                end: this.index
	            };
	        }
	        var cp = this.source.charCodeAt(this.index);
	        if (character_1.Character.isIdentifierStart(cp)) {
	            return this.scanIdentifier();
	        }
	        // Very common: ( and ) and ;
	        if (cp === 0x28 || cp === 0x29 || cp === 0x3B) {
	            return this.scanPunctuator();
	        }
	        // String literal starts with single quote (U+0027) or double quote (U+0022).
	        if (cp === 0x27 || cp === 0x22) {
	            return this.scanStringLiteral();
	        }
	        // Dot (.) U+002E can also start a floating-point number, hence the need
	        // to check the next character.
	        if (cp === 0x2E) {
	            if (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index + 1))) {
	                return this.scanNumericLiteral();
	            }
	            return this.scanPunctuator();
	        }
	        if (character_1.Character.isDecimalDigit(cp)) {
	            return this.scanNumericLiteral();
	        }
	        // Template literals start with ` (U+0060) for template head
	        // or } (U+007D) for template middle or template tail.
	        if (cp === 0x60 || (cp === 0x7D && this.curlyStack[this.curlyStack.length - 1] === '${')) {
	            return this.scanTemplate();
	        }
	        // Possible identifier start in a surrogate pair.
	        if (cp >= 0xD800 && cp < 0xDFFF) {
	            if (character_1.Character.isIdentifierStart(this.codePointAt(this.index))) {
	                return this.scanIdentifier();
	            }
	        }
	        return this.scanPunctuator();
	    };
	    ;
	    return Scanner;
	}());
	exports.Scanner = Scanner;


/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	// See also tools/generate-unicode-regex.js.
	var Regex = {
	    // Unicode v8.0.0 NonAsciiIdentifierStart:
	    NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,
	    // Unicode v8.0.0 NonAsciiIdentifierPart:
	    NonAsciiIdentifierPart: /[\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/
	};
	exports.Character = {
	    fromCodePoint: function (cp) {
	        return (cp < 0x10000) ? String.fromCharCode(cp) :
	            String.fromCharCode(0xD800 + ((cp - 0x10000) >> 10)) +
	                String.fromCharCode(0xDC00 + ((cp - 0x10000) & 1023));
	    },
	    // ECMA-262 11.2 White Space
	    isWhiteSpace: function (cp) {
	        return (cp === 0x20) || (cp === 0x09) || (cp === 0x0B) || (cp === 0x0C) || (cp === 0xA0) ||
	            (cp >= 0x1680 && [0x1680, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200A, 0x202F, 0x205F, 0x3000, 0xFEFF].indexOf(cp) >= 0);
	    },
	    // ECMA-262 11.3 Line Terminators
	    isLineTerminator: function (cp) {
	        return (cp === 0x0A) || (cp === 0x0D) || (cp === 0x2028) || (cp === 0x2029);
	    },
	    // ECMA-262 11.6 Identifier Names and Identifiers
	    isIdentifierStart: function (cp) {
	        return (cp === 0x24) || (cp === 0x5F) ||
	            (cp >= 0x41 && cp <= 0x5A) ||
	            (cp >= 0x61 && cp <= 0x7A) ||
	            (cp === 0x5C) ||
	            ((cp >= 0x80) && Regex.NonAsciiIdentifierStart.test(exports.Character.fromCodePoint(cp)));
	    },
	    isIdentifierPart: function (cp) {
	        return (cp === 0x24) || (cp === 0x5F) ||
	            (cp >= 0x41 && cp <= 0x5A) ||
	            (cp >= 0x61 && cp <= 0x7A) ||
	            (cp >= 0x30 && cp <= 0x39) ||
	            (cp === 0x5C) ||
	            ((cp >= 0x80) && Regex.NonAsciiIdentifierPart.test(exports.Character.fromCodePoint(cp)));
	    },
	    // ECMA-262 11.8.3 Numeric Literals
	    isDecimalDigit: function (cp) {
	        return (cp >= 0x30 && cp <= 0x39); // 0..9
	    },
	    isHexDigit: function (cp) {
	        return (cp >= 0x30 && cp <= 0x39) ||
	            (cp >= 0x41 && cp <= 0x46) ||
	            (cp >= 0x61 && cp <= 0x66); // a..f
	    },
	    isOctalDigit: function (cp) {
	        return (cp >= 0x30 && cp <= 0x37); // 0..7
	    }
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var syntax_1 = __webpack_require__(2);
	var ArrayExpression = (function () {
	    function ArrayExpression(elements) {
	        this.type = syntax_1.Syntax.ArrayExpression;
	        this.elements = elements;
	    }
	    return ArrayExpression;
	}());
	exports.ArrayExpression = ArrayExpression;
	var ArrayPattern = (function () {
	    function ArrayPattern(elements) {
	        this.type = syntax_1.Syntax.ArrayPattern;
	        this.elements = elements;
	    }
	    return ArrayPattern;
	}());
	exports.ArrayPattern = ArrayPattern;
	var ArrowFunctionExpression = (function () {
	    function ArrowFunctionExpression(params, body, expression) {
	        this.type = syntax_1.Syntax.ArrowFunctionExpression;
	        this.id = null;
	        this.params = params;
	        this.body = body;
	        this.generator = false;
	        this.expression = expression;
	    }
	    return ArrowFunctionExpression;
	}());
	exports.ArrowFunctionExpression = ArrowFunctionExpression;
	var AssignmentExpression = (function () {
	    function AssignmentExpression(operator, left, right) {
	        this.type = syntax_1.Syntax.AssignmentExpression;
	        this.operator = operator;
	        this.left = left;
	        this.right = right;
	    }
	    return AssignmentExpression;
	}());
	exports.AssignmentExpression = AssignmentExpression;
	var AssignmentPattern = (function () {
	    function AssignmentPattern(left, right) {
	        this.type = syntax_1.Syntax.AssignmentPattern;
	        this.left = left;
	        this.right = right;
	    }
	    return AssignmentPattern;
	}());
	exports.AssignmentPattern = AssignmentPattern;
	var BinaryExpression = (function () {
	    function BinaryExpression(operator, left, right) {
	        var logical = (operator === '||' || operator === '&&');
	        this.type = logical ? syntax_1.Syntax.LogicalExpression : syntax_1.Syntax.BinaryExpression;
	        this.operator = operator;
	        this.left = left;
	        this.right = right;
	    }
	    return BinaryExpression;
	}());
	exports.BinaryExpression = BinaryExpression;
	var BlockStatement = (function () {
	    function BlockStatement(body) {
	        this.type = syntax_1.Syntax.BlockStatement;
	        this.body = body;
	    }
	    return BlockStatement;
	}());
	exports.BlockStatement = BlockStatement;
	var BreakStatement = (function () {
	    function BreakStatement(label) {
	        this.type = syntax_1.Syntax.BreakStatement;
	        this.label = label;
	    }
	    return BreakStatement;
	}());
	exports.BreakStatement = BreakStatement;
	var CallExpression = (function () {
	    function CallExpression(callee, args) {
	        this.type = syntax_1.Syntax.CallExpression;
	        this.callee = callee;
	        this.arguments = args;
	    }
	    return CallExpression;
	}());
	exports.CallExpression = CallExpression;
	var CatchClause = (function () {
	    function CatchClause(param, body) {
	        this.type = syntax_1.Syntax.CatchClause;
	        this.param = param;
	        this.body = body;
	    }
	    return CatchClause;
	}());
	exports.CatchClause = CatchClause;
	var ClassBody = (function () {
	    function ClassBody(body) {
	        this.type = syntax_1.Syntax.ClassBody;
	        this.body = body;
	    }
	    return ClassBody;
	}());
	exports.ClassBody = ClassBody;
	var ClassDeclaration = (function () {
	    function ClassDeclaration(id, superClass, body) {
	        this.type = syntax_1.Syntax.ClassDeclaration;
	        this.id = id;
	        this.superClass = superClass;
	        this.body = body;
	    }
	    return ClassDeclaration;
	}());
	exports.ClassDeclaration = ClassDeclaration;
	var ClassExpression = (function () {
	    function ClassExpression(id, superClass, body) {
	        this.type = syntax_1.Syntax.ClassExpression;
	        this.id = id;
	        this.superClass = superClass;
	        this.body = body;
	    }
	    return ClassExpression;
	}());
	exports.ClassExpression = ClassExpression;
	var ComputedMemberExpression = (function () {
	    function ComputedMemberExpression(object, property) {
	        this.type = syntax_1.Syntax.MemberExpression;
	        this.computed = true;
	        this.object = object;
	        this.property = property;
	    }
	    return ComputedMemberExpression;
	}());
	exports.ComputedMemberExpression = ComputedMemberExpression;
	var ConditionalExpression = (function () {
	    function ConditionalExpression(test, consequent, alternate) {
	        this.type = syntax_1.Syntax.ConditionalExpression;
	        this.test = test;
	        this.consequent = consequent;
	        this.alternate = alternate;
	    }
	    return ConditionalExpression;
	}());
	exports.ConditionalExpression = ConditionalExpression;
	var ContinueStatement = (function () {
	    function ContinueStatement(label) {
	        this.type = syntax_1.Syntax.ContinueStatement;
	        this.label = label;
	    }
	    return ContinueStatement;
	}());
	exports.ContinueStatement = ContinueStatement;
	var DebuggerStatement = (function () {
	    function DebuggerStatement() {
	        this.type = syntax_1.Syntax.DebuggerStatement;
	    }
	    return DebuggerStatement;
	}());
	exports.DebuggerStatement = DebuggerStatement;
	var Directive = (function () {
	    function Directive(expression, directive) {
	        this.type = syntax_1.Syntax.ExpressionStatement;
	        this.expression = expression;
	        this.directive = directive;
	    }
	    return Directive;
	}());
	exports.Directive = Directive;
	var DoWhileStatement = (function () {
	    function DoWhileStatement(body, test) {
	        this.type = syntax_1.Syntax.DoWhileStatement;
	        this.body = body;
	        this.test = test;
	    }
	    return DoWhileStatement;
	}());
	exports.DoWhileStatement = DoWhileStatement;
	var EmptyStatement = (function () {
	    function EmptyStatement() {
	        this.type = syntax_1.Syntax.EmptyStatement;
	    }
	    return EmptyStatement;
	}());
	exports.EmptyStatement = EmptyStatement;
	var ExportAllDeclaration = (function () {
	    function ExportAllDeclaration(source) {
	        this.type = syntax_1.Syntax.ExportAllDeclaration;
	        this.source = source;
	    }
	    return ExportAllDeclaration;
	}());
	exports.ExportAllDeclaration = ExportAllDeclaration;
	var ExportDefaultDeclaration = (function () {
	    function ExportDefaultDeclaration(declaration) {
	        this.type = syntax_1.Syntax.ExportDefaultDeclaration;
	        this.declaration = declaration;
	    }
	    return ExportDefaultDeclaration;
	}());
	exports.ExportDefaultDeclaration = ExportDefaultDeclaration;
	var ExportNamedDeclaration = (function () {
	    function ExportNamedDeclaration(declaration, specifiers, source) {
	        this.type = syntax_1.Syntax.ExportNamedDeclaration;
	        this.declaration = declaration;
	        this.specifiers = specifiers;
	        this.source = source;
	    }
	    return ExportNamedDeclaration;
	}());
	exports.ExportNamedDeclaration = ExportNamedDeclaration;
	var ExportSpecifier = (function () {
	    function ExportSpecifier(local, exported) {
	        this.type = syntax_1.Syntax.ExportSpecifier;
	        this.exported = exported;
	        this.local = local;
	    }
	    return ExportSpecifier;
	}());
	exports.ExportSpecifier = ExportSpecifier;
	var ExpressionStatement = (function () {
	    function ExpressionStatement(expression) {
	        this.type = syntax_1.Syntax.ExpressionStatement;
	        this.expression = expression;
	    }
	    return ExpressionStatement;
	}());
	exports.ExpressionStatement = ExpressionStatement;
	var ForInStatement = (function () {
	    function ForInStatement(left, right, body) {
	        this.type = syntax_1.Syntax.ForInStatement;
	        this.left = left;
	        this.right = right;
	        this.body = body;
	        this.each = false;
	    }
	    return ForInStatement;
	}());
	exports.ForInStatement = ForInStatement;
	var ForOfStatement = (function () {
	    function ForOfStatement(left, right, body) {
	        this.type = syntax_1.Syntax.ForOfStatement;
	        this.left = left;
	        this.right = right;
	        this.body = body;
	    }
	    return ForOfStatement;
	}());
	exports.ForOfStatement = ForOfStatement;
	var ForStatement = (function () {
	    function ForStatement(init, test, update, body) {
	        this.type = syntax_1.Syntax.ForStatement;
	        this.init = init;
	        this.test = test;
	        this.update = update;
	        this.body = body;
	    }
	    return ForStatement;
	}());
	exports.ForStatement = ForStatement;
	var FunctionDeclaration = (function () {
	    function FunctionDeclaration(id, params, body, generator) {
	        this.type = syntax_1.Syntax.FunctionDeclaration;
	        this.id = id;
	        this.params = params;
	        this.body = body;
	        this.generator = generator;
	        this.expression = false;
	    }
	    return FunctionDeclaration;
	}());
	exports.FunctionDeclaration = FunctionDeclaration;
	var FunctionExpression = (function () {
	    function FunctionExpression(id, params, body, generator) {
	        this.type = syntax_1.Syntax.FunctionExpression;
	        this.id = id;
	        this.params = params;
	        this.body = body;
	        this.generator = generator;
	        this.expression = false;
	    }
	    return FunctionExpression;
	}());
	exports.FunctionExpression = FunctionExpression;
	var Identifier = (function () {
	    function Identifier(name) {
	        this.type = syntax_1.Syntax.Identifier;
	        this.name = name;
	    }
	    return Identifier;
	}());
	exports.Identifier = Identifier;
	var IfStatement = (function () {
	    function IfStatement(test, consequent, alternate) {
	        this.type = syntax_1.Syntax.IfStatement;
	        this.test = test;
	        this.consequent = consequent;
	        this.alternate = alternate;
	    }
	    return IfStatement;
	}());
	exports.IfStatement = IfStatement;
	var ImportDeclaration = (function () {
	    function ImportDeclaration(specifiers, source) {
	        this.type = syntax_1.Syntax.ImportDeclaration;
	        this.specifiers = specifiers;
	        this.source = source;
	    }
	    return ImportDeclaration;
	}());
	exports.ImportDeclaration = ImportDeclaration;
	var ImportDefaultSpecifier = (function () {
	    function ImportDefaultSpecifier(local) {
	        this.type = syntax_1.Syntax.ImportDefaultSpecifier;
	        this.local = local;
	    }
	    return ImportDefaultSpecifier;
	}());
	exports.ImportDefaultSpecifier = ImportDefaultSpecifier;
	var ImportNamespaceSpecifier = (function () {
	    function ImportNamespaceSpecifier(local) {
	        this.type = syntax_1.Syntax.ImportNamespaceSpecifier;
	        this.local = local;
	    }
	    return ImportNamespaceSpecifier;
	}());
	exports.ImportNamespaceSpecifier = ImportNamespaceSpecifier;
	var ImportSpecifier = (function () {
	    function ImportSpecifier(local, imported) {
	        this.type = syntax_1.Syntax.ImportSpecifier;
	        this.local = local;
	        this.imported = imported;
	    }
	    return ImportSpecifier;
	}());
	exports.ImportSpecifier = ImportSpecifier;
	var LabeledStatement = (function () {
	    function LabeledStatement(label, body) {
	        this.type = syntax_1.Syntax.LabeledStatement;
	        this.label = label;
	        this.body = body;
	    }
	    return LabeledStatement;
	}());
	exports.LabeledStatement = LabeledStatement;
	var Literal = (function () {
	    function Literal(value, raw) {
	        this.type = syntax_1.Syntax.Literal;
	        this.value = value;
	        this.raw = raw;
	    }
	    return Literal;
	}());
	exports.Literal = Literal;
	var MetaProperty = (function () {
	    function MetaProperty(meta, property) {
	        this.type = syntax_1.Syntax.MetaProperty;
	        this.meta = meta;
	        this.property = property;
	    }
	    return MetaProperty;
	}());
	exports.MetaProperty = MetaProperty;
	var MethodDefinition = (function () {
	    function MethodDefinition(key, computed, value, kind, isStatic) {
	        this.type = syntax_1.Syntax.MethodDefinition;
	        this.key = key;
	        this.computed = computed;
	        this.value = value;
	        this.kind = kind;
	        this.static = isStatic;
	    }
	    return MethodDefinition;
	}());
	exports.MethodDefinition = MethodDefinition;
	var NewExpression = (function () {
	    function NewExpression(callee, args) {
	        this.type = syntax_1.Syntax.NewExpression;
	        this.callee = callee;
	        this.arguments = args;
	    }
	    return NewExpression;
	}());
	exports.NewExpression = NewExpression;
	var ObjectExpression = (function () {
	    function ObjectExpression(properties) {
	        this.type = syntax_1.Syntax.ObjectExpression;
	        this.properties = properties;
	    }
	    return ObjectExpression;
	}());
	exports.ObjectExpression = ObjectExpression;
	var ObjectPattern = (function () {
	    function ObjectPattern(properties) {
	        this.type = syntax_1.Syntax.ObjectPattern;
	        this.properties = properties;
	    }
	    return ObjectPattern;
	}());
	exports.ObjectPattern = ObjectPattern;
	var Program = (function () {
	    function Program(body, sourceType) {
	        this.type = syntax_1.Syntax.Program;
	        this.body = body;
	        this.sourceType = sourceType;
	    }
	    return Program;
	}());
	exports.Program = Program;
	var Property = (function () {
	    function Property(kind, key, computed, value, method, shorthand) {
	        this.type = syntax_1.Syntax.Property;
	        this.key = key;
	        this.computed = computed;
	        this.value = value;
	        this.kind = kind;
	        this.method = method;
	        this.shorthand = shorthand;
	    }
	    return Property;
	}());
	exports.Property = Property;
	var RegexLiteral = (function () {
	    function RegexLiteral(value, raw, regex) {
	        this.type = syntax_1.Syntax.Literal;
	        this.value = value;
	        this.raw = raw;
	        this.regex = regex;
	    }
	    return RegexLiteral;
	}());
	exports.RegexLiteral = RegexLiteral;
	var RestElement = (function () {
	    function RestElement(argument) {
	        this.type = syntax_1.Syntax.RestElement;
	        this.argument = argument;
	    }
	    return RestElement;
	}());
	exports.RestElement = RestElement;
	var ReturnStatement = (function () {
	    function ReturnStatement(argument) {
	        this.type = syntax_1.Syntax.ReturnStatement;
	        this.argument = argument;
	    }
	    return ReturnStatement;
	}());
	exports.ReturnStatement = ReturnStatement;
	var SequenceExpression = (function () {
	    function SequenceExpression(expressions) {
	        this.type = syntax_1.Syntax.SequenceExpression;
	        this.expressions = expressions;
	    }
	    return SequenceExpression;
	}());
	exports.SequenceExpression = SequenceExpression;
	var SpreadElement = (function () {
	    function SpreadElement(argument) {
	        this.type = syntax_1.Syntax.SpreadElement;
	        this.argument = argument;
	    }
	    return SpreadElement;
	}());
	exports.SpreadElement = SpreadElement;
	var StaticMemberExpression = (function () {
	    function StaticMemberExpression(object, property) {
	        this.type = syntax_1.Syntax.MemberExpression;
	        this.computed = false;
	        this.object = object;
	        this.property = property;
	    }
	    return StaticMemberExpression;
	}());
	exports.StaticMemberExpression = StaticMemberExpression;
	var Super = (function () {
	    function Super() {
	        this.type = syntax_1.Syntax.Super;
	    }
	    return Super;
	}());
	exports.Super = Super;
	var SwitchCase = (function () {
	    function SwitchCase(test, consequent) {
	        this.type = syntax_1.Syntax.SwitchCase;
	        this.test = test;
	        this.consequent = consequent;
	    }
	    return SwitchCase;
	}());
	exports.SwitchCase = SwitchCase;
	var SwitchStatement = (function () {
	    function SwitchStatement(discriminant, cases) {
	        this.type = syntax_1.Syntax.SwitchStatement;
	        this.discriminant = discriminant;
	        this.cases = cases;
	    }
	    return SwitchStatement;
	}());
	exports.SwitchStatement = SwitchStatement;
	var TaggedTemplateExpression = (function () {
	    function TaggedTemplateExpression(tag, quasi) {
	        this.type = syntax_1.Syntax.TaggedTemplateExpression;
	        this.tag = tag;
	        this.quasi = quasi;
	    }
	    return TaggedTemplateExpression;
	}());
	exports.TaggedTemplateExpression = TaggedTemplateExpression;
	var TemplateElement = (function () {
	    function TemplateElement(value, tail) {
	        this.type = syntax_1.Syntax.TemplateElement;
	        this.value = value;
	        this.tail = tail;
	    }
	    return TemplateElement;
	}());
	exports.TemplateElement = TemplateElement;
	var TemplateLiteral = (function () {
	    function TemplateLiteral(quasis, expressions) {
	        this.type = syntax_1.Syntax.TemplateLiteral;
	        this.quasis = quasis;
	        this.expressions = expressions;
	    }
	    return TemplateLiteral;
	}());
	exports.TemplateLiteral = TemplateLiteral;
	var ThisExpression = (function () {
	    function ThisExpression() {
	        this.type = syntax_1.Syntax.ThisExpression;
	    }
	    return ThisExpression;
	}());
	exports.ThisExpression = ThisExpression;
	var ThrowStatement = (function () {
	    function ThrowStatement(argument) {
	        this.type = syntax_1.Syntax.ThrowStatement;
	        this.argument = argument;
	    }
	    return ThrowStatement;
	}());
	exports.ThrowStatement = ThrowStatement;
	var TryStatement = (function () {
	    function TryStatement(block, handler, finalizer) {
	        this.type = syntax_1.Syntax.TryStatement;
	        this.block = block;
	        this.handler = handler;
	        this.finalizer = finalizer;
	    }
	    return TryStatement;
	}());
	exports.TryStatement = TryStatement;
	var UnaryExpression = (function () {
	    function UnaryExpression(operator, argument) {
	        this.type = syntax_1.Syntax.UnaryExpression;
	        this.operator = operator;
	        this.argument = argument;
	        this.prefix = true;
	    }
	    return UnaryExpression;
	}());
	exports.UnaryExpression = UnaryExpression;
	var UpdateExpression = (function () {
	    function UpdateExpression(operator, argument, prefix) {
	        this.type = syntax_1.Syntax.UpdateExpression;
	        this.operator = operator;
	        this.argument = argument;
	        this.prefix = prefix;
	    }
	    return UpdateExpression;
	}());
	exports.UpdateExpression = UpdateExpression;
	var VariableDeclaration = (function () {
	    function VariableDeclaration(declarations, kind) {
	        this.type = syntax_1.Syntax.VariableDeclaration;
	        this.declarations = declarations;
	        this.kind = kind;
	    }
	    return VariableDeclaration;
	}());
	exports.VariableDeclaration = VariableDeclaration;
	var VariableDeclarator = (function () {
	    function VariableDeclarator(id, init) {
	        this.type = syntax_1.Syntax.VariableDeclarator;
	        this.id = id;
	        this.init = init;
	    }
	    return VariableDeclarator;
	}());
	exports.VariableDeclarator = VariableDeclarator;
	var WhileStatement = (function () {
	    function WhileStatement(test, body) {
	        this.type = syntax_1.Syntax.WhileStatement;
	        this.test = test;
	        this.body = body;
	    }
	    return WhileStatement;
	}());
	exports.WhileStatement = WhileStatement;
	var WithStatement = (function () {
	    function WithStatement(object, body) {
	        this.type = syntax_1.Syntax.WithStatement;
	        this.object = object;
	        this.body = body;
	    }
	    return WithStatement;
	}());
	exports.WithStatement = WithStatement;
	var YieldExpression = (function () {
	    function YieldExpression(argument, delegate) {
	        this.type = syntax_1.Syntax.YieldExpression;
	        this.argument = argument;
	        this.delegate = delegate;
	    }
	    return YieldExpression;
	}());
	exports.YieldExpression = YieldExpression;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
/* istanbul ignore next */
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var character_1 = __webpack_require__(9);
	var token_1 = __webpack_require__(7);
	var parser_1 = __webpack_require__(3);
	var xhtml_entities_1 = __webpack_require__(12);
	var jsx_syntax_1 = __webpack_require__(13);
	var Node = __webpack_require__(10);
	var JSXNode = __webpack_require__(14);
	var JSXToken;
	(function (JSXToken) {
	    JSXToken[JSXToken["Identifier"] = 100] = "Identifier";
	    JSXToken[JSXToken["Text"] = 101] = "Text";
	})(JSXToken || (JSXToken = {}));
	token_1.TokenName[JSXToken.Identifier] = 'JSXIdentifier';
	token_1.TokenName[JSXToken.Text] = 'JSXText';
	// Fully qualified element name, e.g. <svg:path> returns "svg:path"
	function getQualifiedElementName(elementName) {
	    var qualifiedName;
	    switch (elementName.type) {
	        case jsx_syntax_1.JSXSyntax.JSXIdentifier:
	            var id = (elementName);
	            qualifiedName = id.name;
	            break;
	        case jsx_syntax_1.JSXSyntax.JSXNamespacedName:
	            var ns = (elementName);
	            qualifiedName = getQualifiedElementName(ns.namespace) + ':' +
	                getQualifiedElementName(ns.name);
	            break;
	        case jsx_syntax_1.JSXSyntax.JSXMemberExpression:
	            var expr = (elementName);
	            qualifiedName = getQualifiedElementName(expr.object) + '.' +
	                getQualifiedElementName(expr.property);
	            break;
	    }
	    return qualifiedName;
	}
	var JSXParser = (function (_super) {
	    __extends(JSXParser, _super);
	    function JSXParser(code, options, delegate) {
	        _super.call(this, code, options, delegate);
	    }
	    JSXParser.prototype.parsePrimaryExpression = function () {
	        return this.match('<') ? this.parseJSXRoot() : _super.prototype.parsePrimaryExpression.call(this);
	    };
	    JSXParser.prototype.startJSX = function () {
	        // Unwind the scanner before the lookahead token.
	        this.scanner.index = this.startMarker.index;
	        this.scanner.lineNumber = this.startMarker.lineNumber;
	        this.scanner.lineStart = this.startMarker.lineStart;
	    };
	    JSXParser.prototype.finishJSX = function () {
	        // Prime the next lookahead.
	        this.nextToken();
	    };
	    JSXParser.prototype.reenterJSX = function () {
	        this.startJSX();
	        this.expectJSX('}');
	        // Pop the closing '}' added from the lookahead.
	        if (this.config.tokens) {
	            this.tokens.pop();
	        }
	    };
	    JSXParser.prototype.createJSXNode = function () {
	        this.collectComments();
	        return {
	            index: this.scanner.index,
	            line: this.scanner.lineNumber,
	            column: this.scanner.index - this.scanner.lineStart
	        };
	    };
	    JSXParser.prototype.createJSXChildNode = function () {
	        return {
	            index: this.scanner.index,
	            line: this.scanner.lineNumber,
	            column: this.scanner.index - this.scanner.lineStart
	        };
	    };
	    JSXParser.prototype.scanXHTMLEntity = function (quote) {
	        var result = '&';
	        var valid = true;
	        var terminated = false;
	        var numeric = false;
	        var hex = false;
	        while (!this.scanner.eof() && valid && !terminated) {
	            var ch = this.scanner.source[this.scanner.index];
	            if (ch === quote) {
	                break;
	            }
	            terminated = (ch === ';');
	            result += ch;
	            ++this.scanner.index;
	            if (!terminated) {
	                switch (result.length) {
	                    case 2:
	                        // e.g. '&#123;'
	                        numeric = (ch === '#');
	                        break;
	                    case 3:
	                        if (numeric) {
	                            // e.g. '&#x41;'
	                            hex = (ch === 'x');
	                            valid = hex || character_1.Character.isDecimalDigit(ch.charCodeAt(0));
	                            numeric = numeric && !hex;
	                        }
	                        break;
	                    default:
	                        valid = valid && !(numeric && !character_1.Character.isDecimalDigit(ch.charCodeAt(0)));
	                        valid = valid && !(hex && !character_1.Character.isHexDigit(ch.charCodeAt(0)));
	                        break;
	                }
	            }
	        }
	        if (valid && terminated && result.length > 2) {
	            // e.g. '&#x41;' becomes just '#x41'
	            var str = result.substr(1, result.length - 2);
	            if (numeric && str.length > 1) {
	                result = String.fromCharCode(parseInt(str.substr(1), 10));
	            }
	            else if (hex && str.length > 2) {
	                result = String.fromCharCode(parseInt('0' + str.substr(1), 16));
	            }
	            else if (!numeric && !hex && xhtml_entities_1.XHTMLEntities[str]) {
	                result = xhtml_entities_1.XHTMLEntities[str];
	            }
	        }
	        return result;
	    };
	    // Scan the next JSX token. This replaces Scanner#lex when in JSX mode.
	    JSXParser.prototype.lexJSX = function () {
	        var cp = this.scanner.source.charCodeAt(this.scanner.index);
	        // < > / : = { }
	        if (cp === 60 || cp === 62 || cp === 47 || cp === 58 || cp === 61 || cp === 123 || cp === 125) {
	            var value = this.scanner.source[this.scanner.index++];
	            return {
	                type: token_1.Token.Punctuator,
	                value: value,
	                lineNumber: this.scanner.lineNumber,
	                lineStart: this.scanner.lineStart,
	                start: this.scanner.index - 1,
	                end: this.scanner.index
	            };
	        }
	        // " '
	        if (cp === 34 || cp === 39) {
	            var start = this.scanner.index;
	            var quote = this.scanner.source[this.scanner.index++];
	            var str = '';
	            while (!this.scanner.eof()) {
	                var ch = this.scanner.source[this.scanner.index++];
	                if (ch === quote) {
	                    break;
	                }
	                else if (ch === '&') {
	                    str += this.scanXHTMLEntity(quote);
	                }
	                else {
	                    str += ch;
	                }
	            }
	            return {
	                type: token_1.Token.StringLiteral,
	                value: str,
	                lineNumber: this.scanner.lineNumber,
	                lineStart: this.scanner.lineStart,
	                start: start,
	                end: this.scanner.index
	            };
	        }
	        // ... or .
	        if (cp === 46) {
	            var n1 = this.scanner.source.charCodeAt(this.scanner.index + 1);
	            var n2 = this.scanner.source.charCodeAt(this.scanner.index + 2);
	            var value = (n1 === 46 && n2 === 46) ? '...' : '.';
	            var start = this.scanner.index;
	            this.scanner.index += value.length;
	            return {
	                type: token_1.Token.Punctuator,
	                value: value,
	                lineNumber: this.scanner.lineNumber,
	                lineStart: this.scanner.lineStart,
	                start: start,
	                end: this.scanner.index
	            };
	        }
	        // `
	        if (cp === 96) {
	            // Only placeholder, since it will be rescanned as a real assignment expression.
	            return {
	                type: token_1.Token.Template,
	                lineNumber: this.scanner.lineNumber,
	                lineStart: this.scanner.lineStart,
	                start: this.scanner.index,
	                end: this.scanner.index
	            };
	        }
	        // Identifer can not contain backslash (char code 92).
	        if (character_1.Character.isIdentifierStart(cp) && (cp !== 92)) {
	            var start = this.scanner.index;
	            ++this.scanner.index;
	            while (!this.scanner.eof()) {
	                var ch = this.scanner.source.charCodeAt(this.scanner.index);
	                if (character_1.Character.isIdentifierPart(ch) && (ch !== 92)) {
	                    ++this.scanner.index;
	                }
	                else if (ch === 45) {
	                    // Hyphen (char code 45) can be part of an identifier.
	                    ++this.scanner.index;
	                }
	                else {
	                    break;
	                }
	            }
	            var id = this.scanner.source.slice(start, this.scanner.index);
	            return {
	                type: JSXToken.Identifier,
	                value: id,
	                lineNumber: this.scanner.lineNumber,
	                lineStart: this.scanner.lineStart,
	                start: start,
	                end: this.scanner.index
	            };
	        }
	        this.scanner.throwUnexpectedToken();
	    };
	    JSXParser.prototype.nextJSXToken = function () {
	        this.collectComments();
	        this.startMarker.index = this.scanner.index;
	        this.startMarker.lineNumber = this.scanner.lineNumber;
	        this.startMarker.lineStart = this.scanner.lineStart;
	        var token = this.lexJSX();
	        this.lastMarker.index = this.scanner.index;
	        this.lastMarker.lineNumber = this.scanner.lineNumber;
	        this.lastMarker.lineStart = this.scanner.lineStart;
	        if (this.config.tokens) {
	            this.tokens.push(this.convertToken(token));
	        }
	        return token;
	    };
	    JSXParser.prototype.nextJSXText = function () {
	        this.startMarker.index = this.scanner.index;
	        this.startMarker.lineNumber = this.scanner.lineNumber;
	        this.startMarker.lineStart = this.scanner.lineStart;
	        var start = this.scanner.index;
	        var text = '';
	        while (!this.scanner.eof()) {
	            var ch = this.scanner.source[this.scanner.index];
	            if (ch === '{' || ch === '<') {
	                break;
	            }
	            ++this.scanner.index;
	            text += ch;
	            if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
	                ++this.scanner.lineNumber;
	                if (ch === '\r' && this.scanner.source[this.scanner.index] === '\n') {
	                    ++this.scanner.index;
	                }
	                this.scanner.lineStart = this.scanner.index;
	            }
	        }
	        this.lastMarker.index = this.scanner.index;
	        this.lastMarker.lineNumber = this.scanner.lineNumber;
	        this.lastMarker.lineStart = this.scanner.lineStart;
	        var token = {
	            type: JSXToken.Text,
	            value: text,
	            lineNumber: this.scanner.lineNumber,
	            lineStart: this.scanner.lineStart,
	            start: start,
	            end: this.scanner.index
	        };
	        if ((text.length > 0) && this.config.tokens) {
	            this.tokens.push(this.convertToken(token));
	        }
	        return token;
	    };
	    JSXParser.prototype.peekJSXToken = function () {
	        var previousIndex = this.scanner.index;
	        var previousLineNumber = this.scanner.lineNumber;
	        var previousLineStart = this.scanner.lineStart;
	        this.scanner.scanComments();
	        var next = this.lexJSX();
	        this.scanner.index = previousIndex;
	        this.scanner.lineNumber = previousLineNumber;
	        this.scanner.lineStart = previousLineStart;
	        return next;
	    };
	    // Expect the next JSX token to match the specified punctuator.
	    // If not, an exception will be thrown.
	    JSXParser.prototype.expectJSX = function (value) {
	        var token = this.nextJSXToken();
	        if (token.type !== token_1.Token.Punctuator || token.value !== value) {
	            this.throwUnexpectedToken(token);
	        }
	    };
	    // Return true if the next JSX token matches the specified punctuator.
	    JSXParser.prototype.matchJSX = function (value) {
	        var next = this.peekJSXToken();
	        return next.type === token_1.Token.Punctuator && next.value === value;
	    };
	    JSXParser.prototype.parseJSXIdentifier = function () {
	        var node = this.createJSXNode();
	        var token = this.nextJSXToken();
	        if (token.type !== JSXToken.Identifier) {
	            this.throwUnexpectedToken(token);
	        }
	        return this.finalize(node, new JSXNode.JSXIdentifier(token.value));
	    };
	    JSXParser.prototype.parseJSXElementName = function () {
	        var node = this.createJSXNode();
	        var elementName = this.parseJSXIdentifier();
	        if (this.matchJSX(':')) {
	            var namespace = elementName;
	            this.expectJSX(':');
	            var name_1 = this.parseJSXIdentifier();
	            elementName = this.finalize(node, new JSXNode.JSXNamespacedName(namespace, name_1));
	        }
	        else if (this.matchJSX('.')) {
	            while (this.matchJSX('.')) {
	                var object = elementName;
	                this.expectJSX('.');
	                var property = this.parseJSXIdentifier();
	                elementName = this.finalize(node, new JSXNode.JSXMemberExpression(object, property));
	            }
	        }
	        return elementName;
	    };
	    JSXParser.prototype.parseJSXAttributeName = function () {
	        var node = this.createJSXNode();
	        var attributeName;
	        var identifier = this.parseJSXIdentifier();
	        if (this.matchJSX(':')) {
	            var namespace = identifier;
	            this.expectJSX(':');
	            var name_2 = this.parseJSXIdentifier();
	            attributeName = this.finalize(node, new JSXNode.JSXNamespacedName(namespace, name_2));
	        }
	        else {
	            attributeName = identifier;
	        }
	        return attributeName;
	    };
	    JSXParser.prototype.parseJSXStringLiteralAttribute = function () {
	        var node = this.createJSXNode();
	        var token = this.nextJSXToken();
	        if (token.type !== token_1.Token.StringLiteral) {
	            this.throwUnexpectedToken(token);
	        }
	        var raw = this.getTokenRaw(token);
	        return this.finalize(node, new Node.Literal(token.value, raw));
	    };
	    JSXParser.prototype.parseJSXExpressionAttribute = function () {
	        var node = this.createJSXNode();
	        this.expectJSX('{');
	        this.finishJSX();
	        if (this.match('}')) {
	            this.tolerateError('JSX attributes must only be assigned a non-empty expression');
	        }
	        var expression = this.parseAssignmentExpression();
	        this.reenterJSX();
	        return this.finalize(node, new JSXNode.JSXExpressionContainer(expression));
	    };
	    JSXParser.prototype.parseJSXAttributeValue = function () {
	        return this.matchJSX('{') ? this.parseJSXExpressionAttribute() :
	            this.matchJSX('<') ? this.parseJSXElement() : this.parseJSXStringLiteralAttribute();
	    };
	    JSXParser.prototype.parseJSXNameValueAttribute = function () {
	        var node = this.createJSXNode();
	        var name = this.parseJSXAttributeName();
	        var value = null;
	        if (this.matchJSX('=')) {
	            this.expectJSX('=');
	            value = this.parseJSXAttributeValue();
	        }
	        return this.finalize(node, new JSXNode.JSXAttribute(name, value));
	    };
	    JSXParser.prototype.parseJSXSpreadAttribute = function () {
	        var node = this.createJSXNode();
	        this.expectJSX('{');
	        this.expectJSX('...');
	        this.finishJSX();
	        var argument = this.parseAssignmentExpression();
	        this.reenterJSX();
	        return this.finalize(node, new JSXNode.JSXSpreadAttribute(argument));
	    };
	    JSXParser.prototype.parseJSXAttributes = function () {
	        var attributes = [];
	        while (!this.matchJSX('/') && !this.matchJSX('>')) {
	            var attribute = this.matchJSX('{') ? this.parseJSXSpreadAttribute() :
	                this.parseJSXNameValueAttribute();
	            attributes.push(attribute);
	        }
	        return attributes;
	    };
	    JSXParser.prototype.parseJSXOpeningElement = function () {
	        var node = this.createJSXNode();
	        this.expectJSX('<');
	        var name = this.parseJSXElementName();
	        var attributes = this.parseJSXAttributes();
	        var selfClosing = this.matchJSX('/');
	        if (selfClosing) {
	            this.expectJSX('/');
	        }
	        this.expectJSX('>');
	        return this.finalize(node, new JSXNode.JSXOpeningElement(name, selfClosing, attributes));
	    };
	    JSXParser.prototype.parseJSXBoundaryElement = function () {
	        var node = this.createJSXNode();
	        this.expectJSX('<');
	        if (this.matchJSX('/')) {
	            this.expectJSX('/');
	            var name_3 = this.parseJSXElementName();
	            this.expectJSX('>');
	            return this.finalize(node, new JSXNode.JSXClosingElement(name_3));
	        }
	        var name = this.parseJSXElementName();
	        var attributes = this.parseJSXAttributes();
	        var selfClosing = this.matchJSX('/');
	        if (selfClosing) {
	            this.expectJSX('/');
	        }
	        this.expectJSX('>');
	        return this.finalize(node, new JSXNode.JSXOpeningElement(name, selfClosing, attributes));
	    };
	    JSXParser.prototype.parseJSXEmptyExpression = function () {
	        var node = this.createJSXChildNode();
	        this.collectComments();
	        this.lastMarker.index = this.scanner.index;
	        this.lastMarker.lineNumber = this.scanner.lineNumber;
	        this.lastMarker.lineStart = this.scanner.lineStart;
	        return this.finalize(node, new JSXNode.JSXEmptyExpression());
	    };
	    JSXParser.prototype.parseJSXExpressionContainer = function () {
	        var node = this.createJSXNode();
	        this.expectJSX('{');
	        var expression;
	        if (this.matchJSX('}')) {
	            expression = this.parseJSXEmptyExpression();
	            this.expectJSX('}');
	        }
	        else {
	            this.finishJSX();
	            expression = this.parseAssignmentExpression();
	            this.reenterJSX();
	        }
	        return this.finalize(node, new JSXNode.JSXExpressionContainer(expression));
	    };
	    JSXParser.prototype.parseJSXChildren = function () {
	        var children = [];
	        while (!this.scanner.eof()) {
	            var node = this.createJSXChildNode();
	            var token = this.nextJSXText();
	            if (token.start < token.end) {
	                var raw = this.getTokenRaw(token);
	                var child = this.finalize(node, new JSXNode.JSXText(token.value, raw));
	                children.push(child);
	            }
	            if (this.scanner.source[this.scanner.index] === '{') {
	                var container = this.parseJSXExpressionContainer();
	                children.push(container);
	            }
	            else {
	                break;
	            }
	        }
	        return children;
	    };
	    JSXParser.prototype.parseComplexJSXElement = function (el) {
	        var stack = [];
	        while (!this.scanner.eof()) {
	            el.children = el.children.concat(this.parseJSXChildren());
	            var node = this.createJSXChildNode();
	            var element = this.parseJSXBoundaryElement();
	            if (element.type === jsx_syntax_1.JSXSyntax.JSXOpeningElement) {
	                var opening = (element);
	                if (opening.selfClosing) {
	                    var child = this.finalize(node, new JSXNode.JSXElement(opening, [], null));
	                    el.children.push(child);
	                }
	                else {
	                    stack.push(el);
	                    el = { node: node, opening: opening, closing: null, children: [] };
	                }
	            }
	            if (element.type === jsx_syntax_1.JSXSyntax.JSXClosingElement) {
	                el.closing = (element);
	                var open_1 = getQualifiedElementName(el.opening.name);
	                var close_1 = getQualifiedElementName(el.closing.name);
	                if (open_1 !== close_1) {
	                    this.tolerateError('Expected corresponding JSX closing tag for %0', open_1);
	                }
	                if (stack.length > 0) {
	                    var child = this.finalize(el.node, new JSXNode.JSXElement(el.opening, el.children, el.closing));
	                    el = stack.pop();
	                    el.children.push(child);
	                }
	                else {
	                    break;
	                }
	            }
	        }
	        return el;
	    };
	    JSXParser.prototype.parseJSXElement = function () {
	        var node = this.createJSXNode();
	        var opening = this.parseJSXOpeningElement();
	        var children = [];
	        var closing = null;
	        if (!opening.selfClosing) {
	            var el = this.parseComplexJSXElement({ node: node, opening: opening, closing: closing, children: children });
	            children = el.children;
	            closing = el.closing;
	        }
	        return this.finalize(node, new JSXNode.JSXElement(opening, children, closing));
	    };
	    JSXParser.prototype.parseJSXRoot = function () {
	        // Pop the opening '<' added from the lookahead.
	        if (this.config.tokens) {
	            this.tokens.pop();
	        }
	        this.startJSX();
	        var element = this.parseJSXElement();
	        this.finishJSX();
	        return element;
	    };
	    return JSXParser;
	}(parser_1.Parser));
	exports.JSXParser = JSXParser;


/***/ },
/* 12 */
/***/ function(module, exports) {

	// Generated by generate-xhtml-entities.js. DO NOT MODIFY!
	"use strict";
	exports.XHTMLEntities = {
	    quot: '\u0022',
	    amp: '\u0026',
	    apos: '\u0027',
	    gt: '\u003E',
	    nbsp: '\u00A0',
	    iexcl: '\u00A1',
	    cent: '\u00A2',
	    pound: '\u00A3',
	    curren: '\u00A4',
	    yen: '\u00A5',
	    brvbar: '\u00A6',
	    sect: '\u00A7',
	    uml: '\u00A8',
	    copy: '\u00A9',
	    ordf: '\u00AA',
	    laquo: '\u00AB',
	    not: '\u00AC',
	    shy: '\u00AD',
	    reg: '\u00AE',
	    macr: '\u00AF',
	    deg: '\u00B0',
	    plusmn: '\u00B1',
	    sup2: '\u00B2',
	    sup3: '\u00B3',
	    acute: '\u00B4',
	    micro: '\u00B5',
	    para: '\u00B6',
	    middot: '\u00B7',
	    cedil: '\u00B8',
	    sup1: '\u00B9',
	    ordm: '\u00BA',
	    raquo: '\u00BB',
	    frac14: '\u00BC',
	    frac12: '\u00BD',
	    frac34: '\u00BE',
	    iquest: '\u00BF',
	    Agrave: '\u00C0',
	    Aacute: '\u00C1',
	    Acirc: '\u00C2',
	    Atilde: '\u00C3',
	    Auml: '\u00C4',
	    Aring: '\u00C5',
	    AElig: '\u00C6',
	    Ccedil: '\u00C7',
	    Egrave: '\u00C8',
	    Eacute: '\u00C9',
	    Ecirc: '\u00CA',
	    Euml: '\u00CB',
	    Igrave: '\u00CC',
	    Iacute: '\u00CD',
	    Icirc: '\u00CE',
	    Iuml: '\u00CF',
	    ETH: '\u00D0',
	    Ntilde: '\u00D1',
	    Ograve: '\u00D2',
	    Oacute: '\u00D3',
	    Ocirc: '\u00D4',
	    Otilde: '\u00D5',
	    Ouml: '\u00D6',
	    times: '\u00D7',
	    Oslash: '\u00D8',
	    Ugrave: '\u00D9',
	    Uacute: '\u00DA',
	    Ucirc: '\u00DB',
	    Uuml: '\u00DC',
	    Yacute: '\u00DD',
	    THORN: '\u00DE',
	    szlig: '\u00DF',
	    agrave: '\u00E0',
	    aacute: '\u00E1',
	    acirc: '\u00E2',
	    atilde: '\u00E3',
	    auml: '\u00E4',
	    aring: '\u00E5',
	    aelig: '\u00E6',
	    ccedil: '\u00E7',
	    egrave: '\u00E8',
	    eacute: '\u00E9',
	    ecirc: '\u00EA',
	    euml: '\u00EB',
	    igrave: '\u00EC',
	    iacute: '\u00ED',
	    icirc: '\u00EE',
	    iuml: '\u00EF',
	    eth: '\u00F0',
	    ntilde: '\u00F1',
	    ograve: '\u00F2',
	    oacute: '\u00F3',
	    ocirc: '\u00F4',
	    otilde: '\u00F5',
	    ouml: '\u00F6',
	    divide: '\u00F7',
	    oslash: '\u00F8',
	    ugrave: '\u00F9',
	    uacute: '\u00FA',
	    ucirc: '\u00FB',
	    uuml: '\u00FC',
	    yacute: '\u00FD',
	    thorn: '\u00FE',
	    yuml: '\u00FF',
	    OElig: '\u0152',
	    oelig: '\u0153',
	    Scaron: '\u0160',
	    scaron: '\u0161',
	    Yuml: '\u0178',
	    fnof: '\u0192',
	    circ: '\u02C6',
	    tilde: '\u02DC',
	    Alpha: '\u0391',
	    Beta: '\u0392',
	    Gamma: '\u0393',
	    Delta: '\u0394',
	    Epsilon: '\u0395',
	    Zeta: '\u0396',
	    Eta: '\u0397',
	    Theta: '\u0398',
	    Iota: '\u0399',
	    Kappa: '\u039A',
	    Lambda: '\u039B',
	    Mu: '\u039C',
	    Nu: '\u039D',
	    Xi: '\u039E',
	    Omicron: '\u039F',
	    Pi: '\u03A0',
	    Rho: '\u03A1',
	    Sigma: '\u03A3',
	    Tau: '\u03A4',
	    Upsilon: '\u03A5',
	    Phi: '\u03A6',
	    Chi: '\u03A7',
	    Psi: '\u03A8',
	    Omega: '\u03A9',
	    alpha: '\u03B1',
	    beta: '\u03B2',
	    gamma: '\u03B3',
	    delta: '\u03B4',
	    epsilon: '\u03B5',
	    zeta: '\u03B6',
	    eta: '\u03B7',
	    theta: '\u03B8',
	    iota: '\u03B9',
	    kappa: '\u03BA',
	    lambda: '\u03BB',
	    mu: '\u03BC',
	    nu: '\u03BD',
	    xi: '\u03BE',
	    omicron: '\u03BF',
	    pi: '\u03C0',
	    rho: '\u03C1',
	    sigmaf: '\u03C2',
	    sigma: '\u03C3',
	    tau: '\u03C4',
	    upsilon: '\u03C5',
	    phi: '\u03C6',
	    chi: '\u03C7',
	    psi: '\u03C8',
	    omega: '\u03C9',
	    thetasym: '\u03D1',
	    upsih: '\u03D2',
	    piv: '\u03D6',
	    ensp: '\u2002',
	    emsp: '\u2003',
	    thinsp: '\u2009',
	    zwnj: '\u200C',
	    zwj: '\u200D',
	    lrm: '\u200E',
	    rlm: '\u200F',
	    ndash: '\u2013',
	    mdash: '\u2014',
	    lsquo: '\u2018',
	    rsquo: '\u2019',
	    sbquo: '\u201A',
	    ldquo: '\u201C',
	    rdquo: '\u201D',
	    bdquo: '\u201E',
	    dagger: '\u2020',
	    Dagger: '\u2021',
	    bull: '\u2022',
	    hellip: '\u2026',
	    permil: '\u2030',
	    prime: '\u2032',
	    Prime: '\u2033',
	    lsaquo: '\u2039',
	    rsaquo: '\u203A',
	    oline: '\u203E',
	    frasl: '\u2044',
	    euro: '\u20AC',
	    image: '\u2111',
	    weierp: '\u2118',
	    real: '\u211C',
	    trade: '\u2122',
	    alefsym: '\u2135',
	    larr: '\u2190',
	    uarr: '\u2191',
	    rarr: '\u2192',
	    darr: '\u2193',
	    harr: '\u2194',
	    crarr: '\u21B5',
	    lArr: '\u21D0',
	    uArr: '\u21D1',
	    rArr: '\u21D2',
	    dArr: '\u21D3',
	    hArr: '\u21D4',
	    forall: '\u2200',
	    part: '\u2202',
	    exist: '\u2203',
	    empty: '\u2205',
	    nabla: '\u2207',
	    isin: '\u2208',
	    notin: '\u2209',
	    ni: '\u220B',
	    prod: '\u220F',
	    sum: '\u2211',
	    minus: '\u2212',
	    lowast: '\u2217',
	    radic: '\u221A',
	    prop: '\u221D',
	    infin: '\u221E',
	    ang: '\u2220',
	    and: '\u2227',
	    or: '\u2228',
	    cap: '\u2229',
	    cup: '\u222A',
	    int: '\u222B',
	    there4: '\u2234',
	    sim: '\u223C',
	    cong: '\u2245',
	    asymp: '\u2248',
	    ne: '\u2260',
	    equiv: '\u2261',
	    le: '\u2264',
	    ge: '\u2265',
	    sub: '\u2282',
	    sup: '\u2283',
	    nsub: '\u2284',
	    sube: '\u2286',
	    supe: '\u2287',
	    oplus: '\u2295',
	    otimes: '\u2297',
	    perp: '\u22A5',
	    sdot: '\u22C5',
	    lceil: '\u2308',
	    rceil: '\u2309',
	    lfloor: '\u230A',
	    rfloor: '\u230B',
	    loz: '\u25CA',
	    spades: '\u2660',
	    clubs: '\u2663',
	    hearts: '\u2665',
	    diams: '\u2666',
	    lang: '\u27E8',
	    rang: '\u27E9'
	};


/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	exports.JSXSyntax = {
	    JSXAttribute: 'JSXAttribute',
	    JSXClosingElement: 'JSXClosingElement',
	    JSXElement: 'JSXElement',
	    JSXEmptyExpression: 'JSXEmptyExpression',
	    JSXExpressionContainer: 'JSXExpressionContainer',
	    JSXIdentifier: 'JSXIdentifier',
	    JSXMemberExpression: 'JSXMemberExpression',
	    JSXNamespacedName: 'JSXNamespacedName',
	    JSXOpeningElement: 'JSXOpeningElement',
	    JSXSpreadAttribute: 'JSXSpreadAttribute',
	    JSXText: 'JSXText'
	};


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var jsx_syntax_1 = __webpack_require__(13);
	var JSXClosingElement = (function () {
	    function JSXClosingElement(name) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXClosingElement;
	        this.name = name;
	    }
	    return JSXClosingElement;
	}());
	exports.JSXClosingElement = JSXClosingElement;
	var JSXElement = (function () {
	    function JSXElement(openingElement, children, closingElement) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXElement;
	        this.openingElement = openingElement;
	        this.children = children;
	        this.closingElement = closingElement;
	    }
	    return JSXElement;
	}());
	exports.JSXElement = JSXElement;
	var JSXEmptyExpression = (function () {
	    function JSXEmptyExpression() {
	        this.type = jsx_syntax_1.JSXSyntax.JSXEmptyExpression;
	    }
	    return JSXEmptyExpression;
	}());
	exports.JSXEmptyExpression = JSXEmptyExpression;
	var JSXExpressionContainer = (function () {
	    function JSXExpressionContainer(expression) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXExpressionContainer;
	        this.expression = expression;
	    }
	    return JSXExpressionContainer;
	}());
	exports.JSXExpressionContainer = JSXExpressionContainer;
	var JSXIdentifier = (function () {
	    function JSXIdentifier(name) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXIdentifier;
	        this.name = name;
	    }
	    return JSXIdentifier;
	}());
	exports.JSXIdentifier = JSXIdentifier;
	var JSXMemberExpression = (function () {
	    function JSXMemberExpression(object, property) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXMemberExpression;
	        this.object = object;
	        this.property = property;
	    }
	    return JSXMemberExpression;
	}());
	exports.JSXMemberExpression = JSXMemberExpression;
	var JSXAttribute = (function () {
	    function JSXAttribute(name, value) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXAttribute;
	        this.name = name;
	        this.value = value;
	    }
	    return JSXAttribute;
	}());
	exports.JSXAttribute = JSXAttribute;
	var JSXNamespacedName = (function () {
	    function JSXNamespacedName(namespace, name) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXNamespacedName;
	        this.namespace = namespace;
	        this.name = name;
	    }
	    return JSXNamespacedName;
	}());
	exports.JSXNamespacedName = JSXNamespacedName;
	var JSXOpeningElement = (function () {
	    function JSXOpeningElement(name, selfClosing, attributes) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXOpeningElement;
	        this.name = name;
	        this.selfClosing = selfClosing;
	        this.attributes = attributes;
	    }
	    return JSXOpeningElement;
	}());
	exports.JSXOpeningElement = JSXOpeningElement;
	var JSXSpreadAttribute = (function () {
	    function JSXSpreadAttribute(argument) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXSpreadAttribute;
	        this.argument = argument;
	    }
	    return JSXSpreadAttribute;
	}());
	exports.JSXSpreadAttribute = JSXSpreadAttribute;
	var JSXText = (function () {
	    function JSXText(value, raw) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXText;
	        this.value = value;
	        this.raw = raw;
	    }
	    return JSXText;
	}());
	exports.JSXText = JSXText;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var scanner_1 = __webpack_require__(8);
	var error_handler_1 = __webpack_require__(6);
	var token_1 = __webpack_require__(7);
	var Reader = (function () {
	    function Reader() {
	        this.values = [];
	        this.curly = this.paren = -1;
	    }
	    ;
	    // A function following one of those tokens is an expression.
	    Reader.prototype.beforeFunctionExpression = function (t) {
	        return ['(', '{', '[', 'in', 'typeof', 'instanceof', 'new',
	            'return', 'case', 'delete', 'throw', 'void',
	            // assignment operators
	            '=', '+=', '-=', '*=', '**=', '/=', '%=', '<<=', '>>=', '>>>=',
	            '&=', '|=', '^=', ',',
	            // binary/unary operators
	            '+', '-', '*', '**', '/', '%', '++', '--', '<<', '>>', '>>>', '&',
	            '|', '^', '!', '~', '&&', '||', '?', ':', '===', '==', '>=',
	            '<=', '<', '>', '!=', '!=='].indexOf(t) >= 0;
	    };
	    ;
	    // Determine if forward slash (/) is an operator or part of a regular expression
	    // https://github.com/mozilla/sweet.js/wiki/design
	    Reader.prototype.isRegexStart = function () {
	        var previous = this.values[this.values.length - 1];
	        var regex = (previous !== null);
	        switch (previous) {
	            case 'this':
	            case ']':
	                regex = false;
	                break;
	            case ')':
	                var check = this.values[this.paren - 1];
	                regex = (check === 'if' || check === 'while' || check === 'for' || check === 'with');
	                break;
	            case '}':
	                // Dividing a function by anything makes little sense,
	                // but we have to check for that.
	                regex = false;
	                if (this.values[this.curly - 3] === 'function') {
	                    // Anonymous function, e.g. function(){} /42
	                    var check_1 = this.values[this.curly - 4];
	                    regex = check_1 ? !this.beforeFunctionExpression(check_1) : false;
	                }
	                else if (this.values[this.curly - 4] === 'function') {
	                    // Named function, e.g. function f(){} /42/
	                    var check_2 = this.values[this.curly - 5];
	                    regex = check_2 ? !this.beforeFunctionExpression(check_2) : true;
	                }
	        }
	        return regex;
	    };
	    ;
	    Reader.prototype.push = function (token) {
	        if (token.type === token_1.Token.Punctuator || token.type === token_1.Token.Keyword) {
	            if (token.value === '{') {
	                this.curly = this.values.length;
	            }
	            else if (token.value === '(') {
	                this.paren = this.values.length;
	            }
	            this.values.push(token.value);
	        }
	        else {
	            this.values.push(null);
	        }
	    };
	    ;
	    return Reader;
	}());
	var Tokenizer = (function () {
	    function Tokenizer(code, config) {
	        this.errorHandler = new error_handler_1.ErrorHandler();
	        this.errorHandler.tolerant = config ? (typeof config.tolerant === 'boolean' && config.tolerant) : false;
	        this.scanner = new scanner_1.Scanner(code, this.errorHandler);
	        this.scanner.trackComment = config ? (typeof config.comment === 'boolean' && config.comment) : false;
	        this.trackRange = config ? (typeof config.range === 'boolean' && config.range) : false;
	        this.trackLoc = config ? (typeof config.loc === 'boolean' && config.loc) : false;
	        this.buffer = [];
	        this.reader = new Reader();
	    }
	    ;
	    Tokenizer.prototype.errors = function () {
	        return this.errorHandler.errors;
	    };
	    ;
	    Tokenizer.prototype.getNextToken = function () {
	        if (this.buffer.length === 0) {
	            var comments = this.scanner.scanComments();
	            if (this.scanner.trackComment) {
	                for (var i = 0; i < comments.length; ++i) {
	                    var e = comments[i];
	                    var comment = void 0;
	                    var value = this.scanner.source.slice(e.slice[0], e.slice[1]);
	                    comment = {
	                        type: e.multiLine ? 'BlockComment' : 'LineComment',
	                        value: value
	                    };
	                    if (this.trackRange) {
	                        comment.range = e.range;
	                    }
	                    if (this.trackLoc) {
	                        comment.loc = e.loc;
	                    }
	                    this.buffer.push(comment);
	                }
	            }
	            if (!this.scanner.eof()) {
	                var loc = void 0;
	                if (this.trackLoc) {
	                    loc = {
	                        start: {
	                            line: this.scanner.lineNumber,
	                            column: this.scanner.index - this.scanner.lineStart
	                        },
	                        end: {}
	                    };
	                }
	                var token = void 0;
	                if (this.scanner.source[this.scanner.index] === '/') {
	                    token = this.reader.isRegexStart() ? this.scanner.scanRegExp() : this.scanner.scanPunctuator();
	                }
	                else {
	                    token = this.scanner.lex();
	                }
	                this.reader.push(token);
	                var entry = void 0;
	                entry = {
	                    type: token_1.TokenName[token.type],
	                    value: this.scanner.source.slice(token.start, token.end)
	                };
	                if (this.trackRange) {
	                    entry.range = [token.start, token.end];
	                }
	                if (this.trackLoc) {
	                    loc.end = {
	                        line: this.scanner.lineNumber,
	                        column: this.scanner.index - this.scanner.lineStart
	                    };
	                    entry.loc = loc;
	                }
	                if (token.regex) {
	                    entry.regex = token.regex;
	                }
	                this.buffer.push(entry);
	            }
	        }
	        return this.buffer.shift();
	    };
	    ;
	    return Tokenizer;
	}());
	exports.Tokenizer = Tokenizer;


/***/ }
/******/ ])
});
;
},{}],2:[function(require,module,exports){
var _ = require('underscore')

// metadata - TODO: move to metadata.js
// object exploration and types

var getJsObjectMetadata = function(o)
{
	//TODO: plugin container

	var result
	if(_.isString(o))
	{
		result = {type: 'String', value: o}
	}
	else if(_.isNumber(o))
	{
		result = {type: 'Number', value: o}
	}
	else if(_.isBoolean(o))
	{
		result = {type: 'Boolean', value: o}
	}
	else if(_.isArray(o))
	{
		// debugger;
		result = {type: 'Array'}
	}
	else if(_.isFunction(o))
	{
		var fstr = o.toString()+''
		result = {
			type: 'Function', 
			// value: fstr,
			signature: extractMethodSignature(fstr)
		}
	}
	else if(_.isObject(o))
	{
		result = {type: 'Object'}
	}
	else
	{
		result = {type: 'undefined'}
	}
	return result
}


function extractMethodSignature(s)
{
	var val
	try
	{
		var esprima = require('esprima')
		// console.log('var a = '+s)
		var ast = esprima.parse('var a = '+s)
		var params = ast.body[0].declarations[0].init.params
		val = {
			params: _.map(params, (p)=>{return p.name})
		}
	}
	catch(ex)
	{
		//parsing fail - sometimes could be native code ? 
		return {}
	}
	return val
}

var veryStrangePropertyNameForCycles = '___should_neverneverhappen12322'
var extractObjectMetadatas = function(sourceObject, sourceObjectName, recurse, handleCycles)
{
	_visitCount++
	if(_visitMaxCount && _visitCount > _visitMaxCount)
	{
		return
	}
	var result = {}
	var myMetadata = getJsObjectMetadata(sourceObject)
	if(handleCycles)
	{
		if(sourceObject[veryStrangePropertyNameForCycles])
		{
			return //heads up! we stop recursing
		}
		else
		{
			sourceObject[veryStrangePropertyNameForCycles]=sourceObjectName
		}
	}

	//heads up ! using _.each for iterating object properties won't visit inherited properties. Concretely, browser's document

	// _.each(sourceObject, function(value, key)
	// {
	// 	if(handleCycles && key == veryStrangePropertyNameForCycles)
	// 	{
	// 		return
	// 	}
	// 	// console.log(key)
	// 	var metadata = getJsObjectMetadata(value)
	// 	result[key] = metadata
	// 	if(recurse && metadata.type == 'Object') 
	// 	{
	// 		_.extend(result[key], extractObjectMetadatas(value, key, true, handleCycles))
	// 	}
	// 	else if(recurse && metadata.type=='Array' && value && value.length)
	// 	{
	// 		_.extend(result[key], {arrayItemMetadata: extractObjectMetadatas(value[0], key, true, handleCycles)})
	// 	}
	// })

	for(var key2 in sourceObject)
	{
		var value2 = sourceObject[key2];

		(function(key, value)
		{
			if(handleCycles && key == veryStrangePropertyNameForCycles)
			{
				return
			}
			// console.log(key)
			var metadata = getJsObjectMetadata(value)
			result[key] = metadata
			if(recurse && metadata.type == 'Object') 
			{
				_.extend(result[key], extractObjectMetadatas(value, key, true, handleCycles))
			}
			else if(recurse && metadata.type=='Array' && value && value.length)
			{
				_.extend(result[key], {arrayItemMetadata: extractObjectMetadatas(value[0], key, true, handleCycles)})
			}

		})(key2, value2)
	}

	myMetadata.objectMetadata = result
	return myMetadata
}

var excludeNames = function(absoluteName)
{
	return _.find(excludeNames_, function(exc){return absoluteName.indexOf(exc)!==-1})
}

var visitObjectMetadata = function(metadata, name, parentName, level, visitor)
{
	level = level || 0
	parentName = parentName || ''
	var absoluteName =  parentName ? (parentName+'.'+name) : name
	if(excludeNames(absoluteName))
	{
		return
	}
	var visitable = {
		name: name, 
		absoluteName: absoluteName
	}
	_.extend(visitable, metadata)
	visitor(visitable)
	_.each(metadata.objectMetadata, function(childMeta, childName)
	{
		visitObjectMetadata(childMeta, childName, absoluteName, level+1, visitor)
	})
}



module.exports = {
	visitObjectMetadata: visitObjectMetadata,
	extractObjectMetadatas: extractObjectMetadatas,
	veryStrangePropertyNameForCycles: veryStrangePropertyNameForCycles
}
},{"esprima":1,"underscore":"underscore"}],"js-doc-autogen":[function(require,module,exports){
var _ = require('underscore')

var extractObjectMetadatas = require('./metadata').extractObjectMetadatas

var main = function(config)
{
	var mainModule = config.mainModule || 'mainModule'

	var outputImplementation = config.outputImplementation
	if(!outputImplementation)
	{
		throw Error('Aborting, please provide an outputImplementation. Some possible values: shortjsdoc, jsonschema')
	}
	var generateOutput = require('./output-'+outputImplementation).generate

	// var excludeGlobals = ['requestHandler', 'eventHandler', 'process']

	globalThis = config.targetObjects

	excludeNames_ = config.excludeNames
	_visitMaxCount = config.visitMaxCount || 0
	_visitCount = 0

	var buffer = []

	config.target = _.isArray(config.target) ? config.target : [config.target]

	_.each(config.target, function(globalContext)
	{
		for(var globalProperty in globalContext)
		{
			if(_.contains(config.excludeGlobals, globalProperty))
			{
				continue
			}

			var target = globalContext[globalProperty]

			// console.log(globalProperty)	
			var metadata
			// try
			// {
				metadata = extractObjectMetadatas(target, globalProperty, true, config.handleCycles)
			// }
			// catch(ex)
			// {
				// this could be caused by a "Maximum call stack size exceeded"
				// console.log('ERROR. WARNING. If the exception is "Maximum call stack size exceeded" then is your failt. '+
				// 	'\nPlease give us an object with no cycles!')
			// 	throw ex
			// }
			var module = mainModule//+'.'+globalProperty

			var generatorConfig = {
				metadata: metadata,
				bigName: globalProperty,
				module: module,
				buffer: buffer
			}
			_.extend(config, generatorConfig)
			// _.extend(generatorConfig, config)
			generateOutput(config)

			
		}
	})
	
	return buffer
}

module.exports = {
	main: main
}
},{"./metadata":2,"underscore":"underscore"}],"underscore":[function(require,module,exports){
//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind,
    nativeCreate       = Object.create;

  // Naked function reference for surrogate-prototype-swapping.
  var Ctor = function(){};

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.8.3';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value)) return _.matcher(value);
    return _.property(value);
  };
  _.iteratee = function(value, context) {
    return cb(value, context, Infinity);
  };

  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, undefinedOnly) {
    return function(obj) {
      var length = arguments.length;
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };

  // An internal function for creating a new object that inherits from another.
  var baseCreate = function(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  };

  var property = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = property('length');
  var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Create a reducing function iterating left or right.
  function createReduce(dir) {
    // Optimized iterator function as using arguments.length
    // in the main function will deoptimize the, see #1991.
    function iterator(obj, iteratee, memo, keys, index, length) {
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    }

    return function(obj, iteratee, memo, context) {
      iteratee = optimizeCb(iteratee, context, 4);
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      // Determine the initial value if none is provided.
      if (arguments.length < 3) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      return iterator(obj, iteratee, memo, keys, index, length);
    };
  }

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = createReduce(-1);

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var key;
    if (isArrayLike(obj)) {
      key = _.findIndex(obj, predicate, context);
    } else {
      key = _.findKey(obj, predicate, context);
    }
    if (key !== void 0 && key !== -1) return obj[key];
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given item (using `===`).
  // Aliased as `includes` and `include`.
  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return _.indexOf(obj, item, fromIndex) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      var func = isFunc ? method : value[method];
      return func == null ? func : func.apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = isArrayLike(obj) ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, startIndex) {
    var output = [], idx = 0;
    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        //flatten current level of array or arguments object
        if (!shallow) value = flatten(value, shallow, strict);
        var j = 0, len = value.length;
        output.length += len;
        while (j < len) {
          output[idx++] = value[j++];
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(arguments, true, true, 1);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    return _.unzip(arguments);
  };

  // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices
  _.unzip = function(array) {
    var length = array && _.max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Generator function to create the findIndex and findLastIndex functions
  function createPredicateIndexFinder(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  }

  // Returns the first index on an array-like that passes a predicate test
  _.findIndex = createPredicateIndexFinder(1);
  _.findLastIndex = createPredicateIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Generator function to create the indexOf and lastIndexOf functions
  function createIndexFinder(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      if (typeof idx == 'number') {
        if (dir > 0) {
            i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), _.isNaN);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  }

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments
  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  };

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var args = slice.call(arguments, 2);
    var bound = function() {
      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = _.partial(_.delay, _, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed on and after the Nth call.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed up to (but not including) the Nth call.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  function collectNonEnumProps(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  }

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve all the property names of an object.
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Returns the results of applying the iteratee to each element of the object
  // In contrast to _.map it returns an object
  _.mapObject = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys =  _.keys(obj),
          length = keys.length,
          results = {},
          currentKey;
      for (var index = 0; index < length; index++) {
        currentKey = keys[index];
        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
      }
      return results;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = createAssigner(_.allKeys);

  // Assigns a given object with all the own properties in the passed-in object(s)
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  _.extendOwn = _.assign = createAssigner(_.keys);

  // Returns the first key on an object that passes a predicate test
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj), key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(object, oiteratee, context) {
    var result = {}, obj = object, iteratee, keys;
    if (obj == null) return result;
    if (_.isFunction(oiteratee)) {
      keys = _.allKeys(obj);
      iteratee = optimizeCb(oiteratee, context);
    } else {
      keys = flatten(arguments, false, false, 1);
      iteratee = function(value, key, obj) { return key in obj; };
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(flatten(arguments, false, false, 1), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = createAssigner(_.allKeys, true);

  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  _.create = function(prototype, props) {
    var result = baseCreate(prototype);
    if (props) _.extendOwn(result, props);
    return result;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Returns whether an object has a given set of `key:value` pairs.
  _.isMatch = function(object, attrs) {
    var keys = _.keys(attrs), length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };


  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }

    var areArrays = className === '[object Array]';
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                               _.isFunction(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      length = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (_.keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), and in Safari 8 (#1929).
  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  // Predicate-generating functions. Often useful outside of Underscore.
  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = property;

  // Generates a function for a given object that returns a given property.
  _.propertyOf = function(obj) {
    return obj == null ? function(){} : function(key) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property, fallback) {
    var value = object == null ? void 0 : object[property];
    if (value === void 0) {
      value = fallback;
    }
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function() {
    return '' + this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}.call(this));

},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Vzci9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsInNyYy9vdXRwdXQtc2hvcnRqc2RvYy5qcyIsIm5vZGVfbW9kdWxlcy9lc3ByaW1hL2Rpc3QvZXNwcmltYS5qcyIsInNyYy9tZXRhZGF0YS5qcyIsInVuZGVyc2NvcmUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2h3TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0tBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vb3V0cHV0IHBsdWdpbiBmb3IganNkb2NcbnZhciBfID0gcmVxdWlyZSgndW5kZXJzY29yZScpXG5cbnZhciB2aXNpdE9iamVjdE1ldGFkYXRhID0gcmVxdWlyZSgnLi9tZXRhZGF0YScpLnZpc2l0T2JqZWN0TWV0YWRhdGFcblxuLy9AZnVuY3Rpb24gZ2VuZXJhdGVPb3BBc3QgLSBnZW5lcmF0ZSBhIGNsYXNzLWFzdCBsaWtlIG9iamVjdCB2ZXJ5IHN1aXRhYmxlIGZvciBzaG9ydGpzZG9jIC0gdGhpcyBtZXRob2QgY291bGQgYmUgdXNlZnVsIGJ5IGl0IHNlbGYgYnkgaW1wbGVudGluZyBvdXRwdXQtc2hvcnRqc2RvYy1hc3RcbnZhciBnZW5lcmF0ZU9vcEFzdCA9IGZ1bmN0aW9uKG1ldGFkYXRhLCBiaWdOYW1lKVxue1xuXHR2YXIgY2xhc3NlcyA9IHt9XG5cdHZpc2l0T2JqZWN0TWV0YWRhdGEobWV0YWRhdGEsIGJpZ05hbWUsICcnLCAwLCBmdW5jdGlvbihtZClcblx0e1xuXHRcdGlmKG1kLnR5cGUgPT0gJ09iamVjdCcpXG5cdFx0e1xuXHRcdFx0Y2xhc3Nlc1ttZC5hYnNvbHV0ZU5hbWVdID0gbWRcblx0XHR9XG5cdH0pXG5cdHZpc2l0T2JqZWN0TWV0YWRhdGEobWV0YWRhdGEsIGJpZ05hbWUsICcnLCAwLCBmdW5jdGlvbihtZClcblx0e1xuXHRcdHZhciBtZXRob2ROYW1lU3BsaXR0ZWQgPSBtZC5hYnNvbHV0ZU5hbWUuc3BsaXQoJy4nKVxuXHRcdG1ldGhvZE5hbWVTcGxpdHRlZC5wb3AoKVxuXHRcdHZhciBjbGFzc05hbWUgPSBtZXRob2ROYW1lU3BsaXR0ZWQuam9pbignLicpXG5cdFx0aWYoIWNsYXNzTmFtZSB8fCAhY2xhc3Nlc1tjbGFzc05hbWVdKVxuXHRcdHtcblx0XHRcdHJldHVyblxuXHRcdH1cblx0XHRpZihtZC50eXBlID09ICdGdW5jdGlvbicpXG5cdFx0e1xuXHRcdFx0Y2xhc3Nlc1tjbGFzc05hbWVdLm1ldGhvZHMgPSBjbGFzc2VzW2NsYXNzTmFtZV0ubWV0aG9kcyB8fCBbXVxuXHRcdFx0Y2xhc3Nlc1tjbGFzc05hbWVdLm1ldGhvZHMucHVzaChtZClcblx0XHRcdC8vIGV4dHJhY3RNZXRob2RTaWduYXR1cmUobWQpXG5cdFx0fVxuXHRcdGVsc2UgaWYobWQudHlwZSAhPT0gJ09iamVjdCcpXG5cdFx0e1xuXHRcdFx0Ly8gY29uc29sZS5sb2coY2xhc3NOYW1lKVxuXHRcdFx0Y2xhc3Nlc1tjbGFzc05hbWVdLnByb3BlcnRpZXMgPSBjbGFzc2VzW2NsYXNzTmFtZV0ucHJvcGVydGllcyB8fCBbXVxuXHRcdFx0Y2xhc3Nlc1tjbGFzc05hbWVdLnByb3BlcnRpZXMucHVzaChtZClcblx0XHR9XG5cdFx0ZGVsZXRlIGNsYXNzZXNbY2xhc3NOYW1lXS5vYmplY3RNZXRhZGF0YVxuXHR9KVxuXHRyZXR1cm4gY2xhc3Nlc1xufVxuXG5cbnZhciBnZW5lcmF0ZUpzRG9jID0gZnVuY3Rpb24oY29uZmlnKVxue1xuXHR2YXIgbWV0YWRhdGEgPSBjb25maWcubWV0YWRhdGFcblx0dmFyIGJpZ05hbWUgPSBjb25maWcuYmlnTmFtZVxuXHR2YXIgbW9kdWxlTmFtZSA9IGNvbmZpZy5tb2R1bGVcblx0dmFyIGJ1ZmZlciA9IGNvbmZpZy5idWZmZXJcblx0Ly8gaWYoXy5pc0Z1bmN0aW9uKG1ldGFkYXRhKSlcblx0Ly8ge1xuXHQvLyBcdGJ1ZmZlci5wdXNoKCdAbW9kdWxlICcrbWFpbk1vZHVsZSlcblx0Ly8gXHRidWZmZXIucHVzaCgnQGZ1bmN0aW9uICcrZ2xvYmFsUHJvcGVydHkpXG5cdC8vIFx0Ly8gdmFyIG1ldGFkYXRhID0gZXh0cmFjdE9iamVjdE1ldGFkYXRhcyhtZXRhZGF0YSwgJ0xvZ2luUmVnaXN0ZXInLCB0cnVlKVxuXHQvLyBcdC8vIGNvbnNvbGUubG9nKCdnbG9iYWwgZnVuY3Rpb24gJywgZ2xvYmFsUHJvcGVydHkgKVxuXHQvLyAvLyBcdC8vVE9ET1xuXHQvLyB9XG5cblx0Ly8gZWxzZSBcblx0aWYoXy5pc09iamVjdChtZXRhZGF0YSkpXG5cdHtcblx0XHR2YXIgY2xhc3NlcyA9IGdlbmVyYXRlT29wQXN0KG1ldGFkYXRhLCBiaWdOYW1lKVxuXHRcdGJ1ZmZlci5wdXNoKCdAbW9kdWxlICcrbW9kdWxlTmFtZSlcblx0XHRfLmVhY2goY2xhc3NlcywgKGMpPT5cblx0XHR7XG5cdFx0XHRidWZmZXIucHVzaCgnQGNsYXNzICcrYy5hYnNvbHV0ZU5hbWUpXG5cdFx0XHRfLmVhY2goYy5wcm9wZXJ0aWVzLCAobSk9PlxuXHRcdFx0e1xuXHRcdFx0XHRidWZmZXIucHVzaCgnQHByb3BlcnR5ICcgKyBtLm5hbWUpXG5cdFx0XHR9KVxuXHRcdFx0Xy5lYWNoKGMubWV0aG9kcywgKG0pPT5cblx0XHRcdHtcblx0XHRcdFx0YnVmZmVyLnB1c2goJ0BtZXRob2QgJyArIG0ubmFtZSlcblx0XHRcdFx0Ly8gY29uc29sZS5sb2cobSlcblx0XHRcdFx0Xy5lYWNoKG0uc2lnbmF0dXJlLnBhcmFtcywgKHApPT5cblx0XHRcdFx0e1xuXHRcdFx0XHRcdGJ1ZmZlci5wdXNoKCdAcGFyYW0gJyArIHApXG5cdFx0XHRcdH0pXG5cdFx0XHR9KVxuXHRcdH0pXG5cdH1cblxuXG5cdFxufVxuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRnZW5lcmF0ZTogZ2VuZXJhdGVKc0RvYyxcblx0Z2VuZXJhdGVPb3BBc3Q6IGdlbmVyYXRlT29wQXN0XG59XG5cblxuXG4iLCIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImVzcHJpbWFcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiZXNwcmltYVwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIC8qKioqKiovIChmdW5jdGlvbihtb2R1bGVzKSB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4vKioqKioqLyBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4vKioqKioqLyBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuLyoqKioqKi8gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4vKioqKioqLyBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuLyoqKioqKi8gXHRcdFx0ZXhwb3J0czoge30sXG4vKioqKioqLyBcdFx0XHRpZDogbW9kdWxlSWQsXG4vKioqKioqLyBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4vKioqKioqLyBcdFx0fTtcblxuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4vKioqKioqLyBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuLyoqKioqKi8gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4vKioqKioqLyBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbi8qKioqKiovIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdH1cblxuXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuLyoqKioqKi8gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4vKioqKioqLyBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLyoqKioqKi8gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcbi8qKioqKiovIH0pXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gKFtcbi8qIDAgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdC8qXG5cdCAgQ29weXJpZ2h0IEpTIEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9ycywgaHR0cHM6Ly9qcy5mb3VuZGF0aW9uL1xuXG5cdCAgUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0XG5cdCAgbW9kaWZpY2F0aW9uLCBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG5cblx0ICAgICogUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHRcblx0ICAgICAgbm90aWNlLCB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuXHQgICAgKiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodFxuXHQgICAgICBub3RpY2UsIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlXG5cdCAgICAgIGRvY3VtZW50YXRpb24gYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG5cblx0ICBUSElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTIFwiQVMgSVNcIlxuXHQgIEFORCBBTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEVcblx0ICBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRVxuXHQgIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCA8Q09QWVJJR0hUIEhPTERFUj4gQkUgTElBQkxFIEZPUiBBTllcblx0ICBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFU1xuXHQgIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUztcblx0ICBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkRcblx0ICBPTiBBTlkgVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVFxuXHQgIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRlxuXHQgIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG5cdCovXG5cdFwidXNlIHN0cmljdFwiO1xuXHR2YXIgY29tbWVudF9oYW5kbGVyXzEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXHR2YXIgcGFyc2VyXzEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXHR2YXIganN4X3BhcnNlcl8xID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMSk7XG5cdHZhciB0b2tlbml6ZXJfMSA9IF9fd2VicGFja19yZXF1aXJlX18oMTUpO1xuXHRmdW5jdGlvbiBwYXJzZShjb2RlLCBvcHRpb25zLCBkZWxlZ2F0ZSkge1xuXHQgICAgdmFyIGNvbW1lbnRIYW5kbGVyID0gbnVsbDtcblx0ICAgIHZhciBwcm94eURlbGVnYXRlID0gZnVuY3Rpb24gKG5vZGUsIG1ldGFkYXRhKSB7XG5cdCAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG5cdCAgICAgICAgICAgIGRlbGVnYXRlKG5vZGUsIG1ldGFkYXRhKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYgKGNvbW1lbnRIYW5kbGVyKSB7XG5cdCAgICAgICAgICAgIGNvbW1lbnRIYW5kbGVyLnZpc2l0KG5vZGUsIG1ldGFkYXRhKTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXHQgICAgdmFyIHBhcnNlckRlbGVnYXRlID0gKHR5cGVvZiBkZWxlZ2F0ZSA9PT0gJ2Z1bmN0aW9uJykgPyBwcm94eURlbGVnYXRlIDogbnVsbDtcblx0ICAgIHZhciBjb2xsZWN0Q29tbWVudCA9IGZhbHNlO1xuXHQgICAgaWYgKG9wdGlvbnMpIHtcblx0ICAgICAgICBjb2xsZWN0Q29tbWVudCA9ICh0eXBlb2Ygb3B0aW9ucy5jb21tZW50ID09PSAnYm9vbGVhbicgJiYgb3B0aW9ucy5jb21tZW50KTtcblx0ICAgICAgICB2YXIgYXR0YWNoQ29tbWVudCA9ICh0eXBlb2Ygb3B0aW9ucy5hdHRhY2hDb21tZW50ID09PSAnYm9vbGVhbicgJiYgb3B0aW9ucy5hdHRhY2hDb21tZW50KTtcblx0ICAgICAgICBpZiAoY29sbGVjdENvbW1lbnQgfHwgYXR0YWNoQ29tbWVudCkge1xuXHQgICAgICAgICAgICBjb21tZW50SGFuZGxlciA9IG5ldyBjb21tZW50X2hhbmRsZXJfMS5Db21tZW50SGFuZGxlcigpO1xuXHQgICAgICAgICAgICBjb21tZW50SGFuZGxlci5hdHRhY2ggPSBhdHRhY2hDb21tZW50O1xuXHQgICAgICAgICAgICBvcHRpb25zLmNvbW1lbnQgPSB0cnVlO1xuXHQgICAgICAgICAgICBwYXJzZXJEZWxlZ2F0ZSA9IHByb3h5RGVsZWdhdGU7XG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHQgICAgdmFyIHBhcnNlcjtcblx0ICAgIGlmIChvcHRpb25zICYmIHR5cGVvZiBvcHRpb25zLmpzeCA9PT0gJ2Jvb2xlYW4nICYmIG9wdGlvbnMuanN4KSB7XG5cdCAgICAgICAgcGFyc2VyID0gbmV3IGpzeF9wYXJzZXJfMS5KU1hQYXJzZXIoY29kZSwgb3B0aW9ucywgcGFyc2VyRGVsZWdhdGUpO1xuXHQgICAgfVxuXHQgICAgZWxzZSB7XG5cdCAgICAgICAgcGFyc2VyID0gbmV3IHBhcnNlcl8xLlBhcnNlcihjb2RlLCBvcHRpb25zLCBwYXJzZXJEZWxlZ2F0ZSk7XG5cdCAgICB9XG5cdCAgICB2YXIgYXN0ID0gKHBhcnNlci5wYXJzZVByb2dyYW0oKSk7XG5cdCAgICBpZiAoY29sbGVjdENvbW1lbnQpIHtcblx0ICAgICAgICBhc3QuY29tbWVudHMgPSBjb21tZW50SGFuZGxlci5jb21tZW50cztcblx0ICAgIH1cblx0ICAgIGlmIChwYXJzZXIuY29uZmlnLnRva2Vucykge1xuXHQgICAgICAgIGFzdC50b2tlbnMgPSBwYXJzZXIudG9rZW5zO1xuXHQgICAgfVxuXHQgICAgaWYgKHBhcnNlci5jb25maWcudG9sZXJhbnQpIHtcblx0ICAgICAgICBhc3QuZXJyb3JzID0gcGFyc2VyLmVycm9ySGFuZGxlci5lcnJvcnM7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gYXN0O1xuXHR9XG5cdGV4cG9ydHMucGFyc2UgPSBwYXJzZTtcblx0ZnVuY3Rpb24gdG9rZW5pemUoY29kZSwgb3B0aW9ucywgZGVsZWdhdGUpIHtcblx0ICAgIHZhciB0b2tlbml6ZXIgPSBuZXcgdG9rZW5pemVyXzEuVG9rZW5pemVyKGNvZGUsIG9wdGlvbnMpO1xuXHQgICAgdmFyIHRva2Vucztcblx0ICAgIHRva2VucyA9IFtdO1xuXHQgICAgdHJ5IHtcblx0ICAgICAgICB3aGlsZSAodHJ1ZSkge1xuXHQgICAgICAgICAgICB2YXIgdG9rZW4gPSB0b2tlbml6ZXIuZ2V0TmV4dFRva2VuKCk7XG5cdCAgICAgICAgICAgIGlmICghdG9rZW4pIHtcblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuXHQgICAgICAgICAgICAgICAgdG9rZW4gPSBkZWxlZ2F0ZSh0b2tlbik7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuXHQgICAgICAgIH1cblx0ICAgIH1cblx0ICAgIGNhdGNoIChlKSB7XG5cdCAgICAgICAgdG9rZW5pemVyLmVycm9ySGFuZGxlci50b2xlcmF0ZShlKTtcblx0ICAgIH1cblx0ICAgIGlmICh0b2tlbml6ZXIuZXJyb3JIYW5kbGVyLnRvbGVyYW50KSB7XG5cdCAgICAgICAgdG9rZW5zLmVycm9ycyA9IHRva2VuaXplci5lcnJvcnMoKTtcblx0ICAgIH1cblx0ICAgIHJldHVybiB0b2tlbnM7XG5cdH1cblx0ZXhwb3J0cy50b2tlbml6ZSA9IHRva2VuaXplO1xuXHR2YXIgc3ludGF4XzEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXHRleHBvcnRzLlN5bnRheCA9IHN5bnRheF8xLlN5bnRheDtcblx0Ly8gU3luYyB3aXRoICouanNvbiBtYW5pZmVzdHMuXG5cdGV4cG9ydHMudmVyc2lvbiA9ICczLjEuMyc7XG5cblxuLyoqKi8gfSxcbi8qIDEgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdFwidXNlIHN0cmljdFwiO1xuXHR2YXIgc3ludGF4XzEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXHR2YXIgQ29tbWVudEhhbmRsZXIgPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gQ29tbWVudEhhbmRsZXIoKSB7XG5cdCAgICAgICAgdGhpcy5hdHRhY2ggPSBmYWxzZTtcblx0ICAgICAgICB0aGlzLmNvbW1lbnRzID0gW107XG5cdCAgICAgICAgdGhpcy5zdGFjayA9IFtdO1xuXHQgICAgICAgIHRoaXMubGVhZGluZyA9IFtdO1xuXHQgICAgICAgIHRoaXMudHJhaWxpbmcgPSBbXTtcblx0ICAgIH1cblx0ICAgIENvbW1lbnRIYW5kbGVyLnByb3RvdHlwZS5pbnNlcnRJbm5lckNvbW1lbnRzID0gZnVuY3Rpb24gKG5vZGUsIG1ldGFkYXRhKSB7XG5cdCAgICAgICAgLy8gIGlubm5lckNvbW1lbnRzIGZvciBwcm9wZXJ0aWVzIGVtcHR5IGJsb2NrXG5cdCAgICAgICAgLy8gIGBmdW5jdGlvbiBhKCkgey8qKiBjb21tZW50cyAqKlxcL31gXG5cdCAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gc3ludGF4XzEuU3ludGF4LkJsb2NrU3RhdGVtZW50ICYmIG5vZGUuYm9keS5sZW5ndGggPT09IDApIHtcblx0ICAgICAgICAgICAgdmFyIGlubmVyQ29tbWVudHMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IHRoaXMubGVhZGluZy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuXHQgICAgICAgICAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy5sZWFkaW5nW2ldO1xuXHQgICAgICAgICAgICAgICAgaWYgKG1ldGFkYXRhLmVuZC5vZmZzZXQgPj0gZW50cnkuc3RhcnQpIHtcblx0ICAgICAgICAgICAgICAgICAgICBpbm5lckNvbW1lbnRzLnVuc2hpZnQoZW50cnkuY29tbWVudCk7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5sZWFkaW5nLnNwbGljZShpLCAxKTtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYWlsaW5nLnNwbGljZShpLCAxKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBpZiAoaW5uZXJDb21tZW50cy5sZW5ndGgpIHtcblx0ICAgICAgICAgICAgICAgIG5vZGUuaW5uZXJDb21tZW50cyA9IGlubmVyQ29tbWVudHM7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICB9O1xuXHQgICAgQ29tbWVudEhhbmRsZXIucHJvdG90eXBlLmZpbmRUcmFpbGluZ0NvbW1lbnRzID0gZnVuY3Rpb24gKG5vZGUsIG1ldGFkYXRhKSB7XG5cdCAgICAgICAgdmFyIHRyYWlsaW5nQ29tbWVudHMgPSBbXTtcblx0ICAgICAgICBpZiAodGhpcy50cmFpbGluZy5sZW5ndGggPiAwKSB7XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyYWlsaW5nLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgZW50cnlfMSA9IHRoaXMudHJhaWxpbmdbaV07XG5cdCAgICAgICAgICAgICAgICBpZiAoZW50cnlfMS5zdGFydCA+PSBtZXRhZGF0YS5lbmQub2Zmc2V0KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdHJhaWxpbmdDb21tZW50cy51bnNoaWZ0KGVudHJ5XzEuY29tbWVudCk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgdGhpcy50cmFpbGluZy5sZW5ndGggPSAwO1xuXHQgICAgICAgICAgICByZXR1cm4gdHJhaWxpbmdDb21tZW50cztcblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy5zdGFja1t0aGlzLnN0YWNrLmxlbmd0aCAtIDFdO1xuXHQgICAgICAgIGlmIChlbnRyeSAmJiBlbnRyeS5ub2RlLnRyYWlsaW5nQ29tbWVudHMpIHtcblx0ICAgICAgICAgICAgdmFyIGZpcnN0Q29tbWVudCA9IGVudHJ5Lm5vZGUudHJhaWxpbmdDb21tZW50c1swXTtcblx0ICAgICAgICAgICAgaWYgKGZpcnN0Q29tbWVudCAmJiBmaXJzdENvbW1lbnQucmFuZ2VbMF0gPj0gbWV0YWRhdGEuZW5kLm9mZnNldCkge1xuXHQgICAgICAgICAgICAgICAgdHJhaWxpbmdDb21tZW50cyA9IGVudHJ5Lm5vZGUudHJhaWxpbmdDb21tZW50cztcblx0ICAgICAgICAgICAgICAgIGRlbGV0ZSBlbnRyeS5ub2RlLnRyYWlsaW5nQ29tbWVudHM7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHRyYWlsaW5nQ29tbWVudHM7XG5cdCAgICB9O1xuXHQgICAgQ29tbWVudEhhbmRsZXIucHJvdG90eXBlLmZpbmRMZWFkaW5nQ29tbWVudHMgPSBmdW5jdGlvbiAobm9kZSwgbWV0YWRhdGEpIHtcblx0ICAgICAgICB2YXIgbGVhZGluZ0NvbW1lbnRzID0gW107XG5cdCAgICAgICAgdmFyIHRhcmdldDtcblx0ICAgICAgICB3aGlsZSAodGhpcy5zdGFjay5sZW5ndGggPiAwKSB7XG5cdCAgICAgICAgICAgIHZhciBlbnRyeSA9IHRoaXMuc3RhY2tbdGhpcy5zdGFjay5sZW5ndGggLSAxXTtcblx0ICAgICAgICAgICAgaWYgKGVudHJ5ICYmIGVudHJ5LnN0YXJ0ID49IG1ldGFkYXRhLnN0YXJ0Lm9mZnNldCkge1xuXHQgICAgICAgICAgICAgICAgdGFyZ2V0ID0gdGhpcy5zdGFjay5wb3AoKS5ub2RlO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYgKHRhcmdldCkge1xuXHQgICAgICAgICAgICB2YXIgY291bnQgPSB0YXJnZXQubGVhZGluZ0NvbW1lbnRzID8gdGFyZ2V0LmxlYWRpbmdDb21tZW50cy5sZW5ndGggOiAwO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gY291bnQgLSAxOyBpID49IDA7IC0taSkge1xuXHQgICAgICAgICAgICAgICAgdmFyIGNvbW1lbnQgPSB0YXJnZXQubGVhZGluZ0NvbW1lbnRzW2ldO1xuXHQgICAgICAgICAgICAgICAgaWYgKGNvbW1lbnQucmFuZ2VbMV0gPD0gbWV0YWRhdGEuc3RhcnQub2Zmc2V0KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgbGVhZGluZ0NvbW1lbnRzLnVuc2hpZnQoY29tbWVudCk7XG5cdCAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmxlYWRpbmdDb21tZW50cy5zcGxpY2UoaSwgMSk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgaWYgKHRhcmdldC5sZWFkaW5nQ29tbWVudHMgJiYgdGFyZ2V0LmxlYWRpbmdDb21tZW50cy5sZW5ndGggPT09IDApIHtcblx0ICAgICAgICAgICAgICAgIGRlbGV0ZSB0YXJnZXQubGVhZGluZ0NvbW1lbnRzO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHJldHVybiBsZWFkaW5nQ29tbWVudHM7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZvciAodmFyIGkgPSB0aGlzLmxlYWRpbmcubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcblx0ICAgICAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy5sZWFkaW5nW2ldO1xuXHQgICAgICAgICAgICBpZiAoZW50cnkuc3RhcnQgPD0gbWV0YWRhdGEuc3RhcnQub2Zmc2V0KSB7XG5cdCAgICAgICAgICAgICAgICBsZWFkaW5nQ29tbWVudHMudW5zaGlmdChlbnRyeS5jb21tZW50KTtcblx0ICAgICAgICAgICAgICAgIHRoaXMubGVhZGluZy5zcGxpY2UoaSwgMSk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIGxlYWRpbmdDb21tZW50cztcblx0ICAgIH07XG5cdCAgICBDb21tZW50SGFuZGxlci5wcm90b3R5cGUudmlzaXROb2RlID0gZnVuY3Rpb24gKG5vZGUsIG1ldGFkYXRhKSB7XG5cdCAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gc3ludGF4XzEuU3ludGF4LlByb2dyYW0gJiYgbm9kZS5ib2R5Lmxlbmd0aCA+IDApIHtcblx0ICAgICAgICAgICAgcmV0dXJuO1xuXHQgICAgICAgIH1cblx0ICAgICAgICB0aGlzLmluc2VydElubmVyQ29tbWVudHMobm9kZSwgbWV0YWRhdGEpO1xuXHQgICAgICAgIHZhciB0cmFpbGluZ0NvbW1lbnRzID0gdGhpcy5maW5kVHJhaWxpbmdDb21tZW50cyhub2RlLCBtZXRhZGF0YSk7XG5cdCAgICAgICAgdmFyIGxlYWRpbmdDb21tZW50cyA9IHRoaXMuZmluZExlYWRpbmdDb21tZW50cyhub2RlLCBtZXRhZGF0YSk7XG5cdCAgICAgICAgaWYgKGxlYWRpbmdDb21tZW50cy5sZW5ndGggPiAwKSB7XG5cdCAgICAgICAgICAgIG5vZGUubGVhZGluZ0NvbW1lbnRzID0gbGVhZGluZ0NvbW1lbnRzO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAodHJhaWxpbmdDb21tZW50cy5sZW5ndGggPiAwKSB7XG5cdCAgICAgICAgICAgIG5vZGUudHJhaWxpbmdDb21tZW50cyA9IHRyYWlsaW5nQ29tbWVudHM7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHRoaXMuc3RhY2sucHVzaCh7XG5cdCAgICAgICAgICAgIG5vZGU6IG5vZGUsXG5cdCAgICAgICAgICAgIHN0YXJ0OiBtZXRhZGF0YS5zdGFydC5vZmZzZXRcblx0ICAgICAgICB9KTtcblx0ICAgIH07XG5cdCAgICBDb21tZW50SGFuZGxlci5wcm90b3R5cGUudmlzaXRDb21tZW50ID0gZnVuY3Rpb24gKG5vZGUsIG1ldGFkYXRhKSB7XG5cdCAgICAgICAgdmFyIHR5cGUgPSAobm9kZS50eXBlWzBdID09PSAnTCcpID8gJ0xpbmUnIDogJ0Jsb2NrJztcblx0ICAgICAgICB2YXIgY29tbWVudCA9IHtcblx0ICAgICAgICAgICAgdHlwZTogdHlwZSxcblx0ICAgICAgICAgICAgdmFsdWU6IG5vZGUudmFsdWVcblx0ICAgICAgICB9O1xuXHQgICAgICAgIGlmIChub2RlLnJhbmdlKSB7XG5cdCAgICAgICAgICAgIGNvbW1lbnQucmFuZ2UgPSBub2RlLnJhbmdlO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAobm9kZS5sb2MpIHtcblx0ICAgICAgICAgICAgY29tbWVudC5sb2MgPSBub2RlLmxvYztcblx0ICAgICAgICB9XG5cdCAgICAgICAgdGhpcy5jb21tZW50cy5wdXNoKGNvbW1lbnQpO1xuXHQgICAgICAgIGlmICh0aGlzLmF0dGFjaCkge1xuXHQgICAgICAgICAgICB2YXIgZW50cnkgPSB7XG5cdCAgICAgICAgICAgICAgICBjb21tZW50OiB7XG5cdCAgICAgICAgICAgICAgICAgICAgdHlwZTogdHlwZSxcblx0ICAgICAgICAgICAgICAgICAgICB2YWx1ZTogbm9kZS52YWx1ZSxcblx0ICAgICAgICAgICAgICAgICAgICByYW5nZTogW21ldGFkYXRhLnN0YXJ0Lm9mZnNldCwgbWV0YWRhdGEuZW5kLm9mZnNldF1cblx0ICAgICAgICAgICAgICAgIH0sXG5cdCAgICAgICAgICAgICAgICBzdGFydDogbWV0YWRhdGEuc3RhcnQub2Zmc2V0XG5cdCAgICAgICAgICAgIH07XG5cdCAgICAgICAgICAgIGlmIChub2RlLmxvYykge1xuXHQgICAgICAgICAgICAgICAgZW50cnkuY29tbWVudC5sb2MgPSBub2RlLmxvYztcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBub2RlLnR5cGUgPSB0eXBlO1xuXHQgICAgICAgICAgICB0aGlzLmxlYWRpbmcucHVzaChlbnRyeSk7XG5cdCAgICAgICAgICAgIHRoaXMudHJhaWxpbmcucHVzaChlbnRyeSk7XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblx0ICAgIENvbW1lbnRIYW5kbGVyLnByb3RvdHlwZS52aXNpdCA9IGZ1bmN0aW9uIChub2RlLCBtZXRhZGF0YSkge1xuXHQgICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdMaW5lQ29tbWVudCcpIHtcblx0ICAgICAgICAgICAgdGhpcy52aXNpdENvbW1lbnQobm9kZSwgbWV0YWRhdGEpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIGlmIChub2RlLnR5cGUgPT09ICdCbG9ja0NvbW1lbnQnKSB7XG5cdCAgICAgICAgICAgIHRoaXMudmlzaXRDb21tZW50KG5vZGUsIG1ldGFkYXRhKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZWxzZSBpZiAodGhpcy5hdHRhY2gpIHtcblx0ICAgICAgICAgICAgdGhpcy52aXNpdE5vZGUobm9kZSwgbWV0YWRhdGEpO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cdCAgICByZXR1cm4gQ29tbWVudEhhbmRsZXI7XG5cdH0oKSk7XG5cdGV4cG9ydHMuQ29tbWVudEhhbmRsZXIgPSBDb21tZW50SGFuZGxlcjtcblxuXG4vKioqLyB9LFxuLyogMiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0XCJ1c2Ugc3RyaWN0XCI7XG5cdGV4cG9ydHMuU3ludGF4ID0ge1xuXHQgICAgQXNzaWdubWVudEV4cHJlc3Npb246ICdBc3NpZ25tZW50RXhwcmVzc2lvbicsXG5cdCAgICBBc3NpZ25tZW50UGF0dGVybjogJ0Fzc2lnbm1lbnRQYXR0ZXJuJyxcblx0ICAgIEFycmF5RXhwcmVzc2lvbjogJ0FycmF5RXhwcmVzc2lvbicsXG5cdCAgICBBcnJheVBhdHRlcm46ICdBcnJheVBhdHRlcm4nLFxuXHQgICAgQXJyb3dGdW5jdGlvbkV4cHJlc3Npb246ICdBcnJvd0Z1bmN0aW9uRXhwcmVzc2lvbicsXG5cdCAgICBCbG9ja1N0YXRlbWVudDogJ0Jsb2NrU3RhdGVtZW50Jyxcblx0ICAgIEJpbmFyeUV4cHJlc3Npb246ICdCaW5hcnlFeHByZXNzaW9uJyxcblx0ICAgIEJyZWFrU3RhdGVtZW50OiAnQnJlYWtTdGF0ZW1lbnQnLFxuXHQgICAgQ2FsbEV4cHJlc3Npb246ICdDYWxsRXhwcmVzc2lvbicsXG5cdCAgICBDYXRjaENsYXVzZTogJ0NhdGNoQ2xhdXNlJyxcblx0ICAgIENsYXNzQm9keTogJ0NsYXNzQm9keScsXG5cdCAgICBDbGFzc0RlY2xhcmF0aW9uOiAnQ2xhc3NEZWNsYXJhdGlvbicsXG5cdCAgICBDbGFzc0V4cHJlc3Npb246ICdDbGFzc0V4cHJlc3Npb24nLFxuXHQgICAgQ29uZGl0aW9uYWxFeHByZXNzaW9uOiAnQ29uZGl0aW9uYWxFeHByZXNzaW9uJyxcblx0ICAgIENvbnRpbnVlU3RhdGVtZW50OiAnQ29udGludWVTdGF0ZW1lbnQnLFxuXHQgICAgRG9XaGlsZVN0YXRlbWVudDogJ0RvV2hpbGVTdGF0ZW1lbnQnLFxuXHQgICAgRGVidWdnZXJTdGF0ZW1lbnQ6ICdEZWJ1Z2dlclN0YXRlbWVudCcsXG5cdCAgICBFbXB0eVN0YXRlbWVudDogJ0VtcHR5U3RhdGVtZW50Jyxcblx0ICAgIEV4cG9ydEFsbERlY2xhcmF0aW9uOiAnRXhwb3J0QWxsRGVjbGFyYXRpb24nLFxuXHQgICAgRXhwb3J0RGVmYXVsdERlY2xhcmF0aW9uOiAnRXhwb3J0RGVmYXVsdERlY2xhcmF0aW9uJyxcblx0ICAgIEV4cG9ydE5hbWVkRGVjbGFyYXRpb246ICdFeHBvcnROYW1lZERlY2xhcmF0aW9uJyxcblx0ICAgIEV4cG9ydFNwZWNpZmllcjogJ0V4cG9ydFNwZWNpZmllcicsXG5cdCAgICBFeHByZXNzaW9uU3RhdGVtZW50OiAnRXhwcmVzc2lvblN0YXRlbWVudCcsXG5cdCAgICBGb3JTdGF0ZW1lbnQ6ICdGb3JTdGF0ZW1lbnQnLFxuXHQgICAgRm9yT2ZTdGF0ZW1lbnQ6ICdGb3JPZlN0YXRlbWVudCcsXG5cdCAgICBGb3JJblN0YXRlbWVudDogJ0ZvckluU3RhdGVtZW50Jyxcblx0ICAgIEZ1bmN0aW9uRGVjbGFyYXRpb246ICdGdW5jdGlvbkRlY2xhcmF0aW9uJyxcblx0ICAgIEZ1bmN0aW9uRXhwcmVzc2lvbjogJ0Z1bmN0aW9uRXhwcmVzc2lvbicsXG5cdCAgICBJZGVudGlmaWVyOiAnSWRlbnRpZmllcicsXG5cdCAgICBJZlN0YXRlbWVudDogJ0lmU3RhdGVtZW50Jyxcblx0ICAgIEltcG9ydERlY2xhcmF0aW9uOiAnSW1wb3J0RGVjbGFyYXRpb24nLFxuXHQgICAgSW1wb3J0RGVmYXVsdFNwZWNpZmllcjogJ0ltcG9ydERlZmF1bHRTcGVjaWZpZXInLFxuXHQgICAgSW1wb3J0TmFtZXNwYWNlU3BlY2lmaWVyOiAnSW1wb3J0TmFtZXNwYWNlU3BlY2lmaWVyJyxcblx0ICAgIEltcG9ydFNwZWNpZmllcjogJ0ltcG9ydFNwZWNpZmllcicsXG5cdCAgICBMaXRlcmFsOiAnTGl0ZXJhbCcsXG5cdCAgICBMYWJlbGVkU3RhdGVtZW50OiAnTGFiZWxlZFN0YXRlbWVudCcsXG5cdCAgICBMb2dpY2FsRXhwcmVzc2lvbjogJ0xvZ2ljYWxFeHByZXNzaW9uJyxcblx0ICAgIE1lbWJlckV4cHJlc3Npb246ICdNZW1iZXJFeHByZXNzaW9uJyxcblx0ICAgIE1ldGFQcm9wZXJ0eTogJ01ldGFQcm9wZXJ0eScsXG5cdCAgICBNZXRob2REZWZpbml0aW9uOiAnTWV0aG9kRGVmaW5pdGlvbicsXG5cdCAgICBOZXdFeHByZXNzaW9uOiAnTmV3RXhwcmVzc2lvbicsXG5cdCAgICBPYmplY3RFeHByZXNzaW9uOiAnT2JqZWN0RXhwcmVzc2lvbicsXG5cdCAgICBPYmplY3RQYXR0ZXJuOiAnT2JqZWN0UGF0dGVybicsXG5cdCAgICBQcm9ncmFtOiAnUHJvZ3JhbScsXG5cdCAgICBQcm9wZXJ0eTogJ1Byb3BlcnR5Jyxcblx0ICAgIFJlc3RFbGVtZW50OiAnUmVzdEVsZW1lbnQnLFxuXHQgICAgUmV0dXJuU3RhdGVtZW50OiAnUmV0dXJuU3RhdGVtZW50Jyxcblx0ICAgIFNlcXVlbmNlRXhwcmVzc2lvbjogJ1NlcXVlbmNlRXhwcmVzc2lvbicsXG5cdCAgICBTcHJlYWRFbGVtZW50OiAnU3ByZWFkRWxlbWVudCcsXG5cdCAgICBTdXBlcjogJ1N1cGVyJyxcblx0ICAgIFN3aXRjaENhc2U6ICdTd2l0Y2hDYXNlJyxcblx0ICAgIFN3aXRjaFN0YXRlbWVudDogJ1N3aXRjaFN0YXRlbWVudCcsXG5cdCAgICBUYWdnZWRUZW1wbGF0ZUV4cHJlc3Npb246ICdUYWdnZWRUZW1wbGF0ZUV4cHJlc3Npb24nLFxuXHQgICAgVGVtcGxhdGVFbGVtZW50OiAnVGVtcGxhdGVFbGVtZW50Jyxcblx0ICAgIFRlbXBsYXRlTGl0ZXJhbDogJ1RlbXBsYXRlTGl0ZXJhbCcsXG5cdCAgICBUaGlzRXhwcmVzc2lvbjogJ1RoaXNFeHByZXNzaW9uJyxcblx0ICAgIFRocm93U3RhdGVtZW50OiAnVGhyb3dTdGF0ZW1lbnQnLFxuXHQgICAgVHJ5U3RhdGVtZW50OiAnVHJ5U3RhdGVtZW50Jyxcblx0ICAgIFVuYXJ5RXhwcmVzc2lvbjogJ1VuYXJ5RXhwcmVzc2lvbicsXG5cdCAgICBVcGRhdGVFeHByZXNzaW9uOiAnVXBkYXRlRXhwcmVzc2lvbicsXG5cdCAgICBWYXJpYWJsZURlY2xhcmF0aW9uOiAnVmFyaWFibGVEZWNsYXJhdGlvbicsXG5cdCAgICBWYXJpYWJsZURlY2xhcmF0b3I6ICdWYXJpYWJsZURlY2xhcmF0b3InLFxuXHQgICAgV2hpbGVTdGF0ZW1lbnQ6ICdXaGlsZVN0YXRlbWVudCcsXG5cdCAgICBXaXRoU3RhdGVtZW50OiAnV2l0aFN0YXRlbWVudCcsXG5cdCAgICBZaWVsZEV4cHJlc3Npb246ICdZaWVsZEV4cHJlc3Npb24nXG5cdH07XG5cblxuLyoqKi8gfSxcbi8qIDMgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdFwidXNlIHN0cmljdFwiO1xuXHR2YXIgYXNzZXJ0XzEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpO1xuXHR2YXIgbWVzc2FnZXNfMSA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XG5cdHZhciBlcnJvcl9oYW5kbGVyXzEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpO1xuXHR2YXIgdG9rZW5fMSA9IF9fd2VicGFja19yZXF1aXJlX18oNyk7XG5cdHZhciBzY2FubmVyXzEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgpO1xuXHR2YXIgc3ludGF4XzEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXHR2YXIgTm9kZSA9IF9fd2VicGFja19yZXF1aXJlX18oMTApO1xuXHR2YXIgQXJyb3dQYXJhbWV0ZXJQbGFjZUhvbGRlciA9ICdBcnJvd1BhcmFtZXRlclBsYWNlSG9sZGVyJztcblx0dmFyIFBhcnNlciA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBQYXJzZXIoY29kZSwgb3B0aW9ucywgZGVsZWdhdGUpIHtcblx0ICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuXHQgICAgICAgIHRoaXMuY29uZmlnID0ge1xuXHQgICAgICAgICAgICByYW5nZTogKHR5cGVvZiBvcHRpb25zLnJhbmdlID09PSAnYm9vbGVhbicpICYmIG9wdGlvbnMucmFuZ2UsXG5cdCAgICAgICAgICAgIGxvYzogKHR5cGVvZiBvcHRpb25zLmxvYyA9PT0gJ2Jvb2xlYW4nKSAmJiBvcHRpb25zLmxvYyxcblx0ICAgICAgICAgICAgc291cmNlOiBudWxsLFxuXHQgICAgICAgICAgICB0b2tlbnM6ICh0eXBlb2Ygb3B0aW9ucy50b2tlbnMgPT09ICdib29sZWFuJykgJiYgb3B0aW9ucy50b2tlbnMsXG5cdCAgICAgICAgICAgIGNvbW1lbnQ6ICh0eXBlb2Ygb3B0aW9ucy5jb21tZW50ID09PSAnYm9vbGVhbicpICYmIG9wdGlvbnMuY29tbWVudCxcblx0ICAgICAgICAgICAgdG9sZXJhbnQ6ICh0eXBlb2Ygb3B0aW9ucy50b2xlcmFudCA9PT0gJ2Jvb2xlYW4nKSAmJiBvcHRpb25zLnRvbGVyYW50XG5cdCAgICAgICAgfTtcblx0ICAgICAgICBpZiAodGhpcy5jb25maWcubG9jICYmIG9wdGlvbnMuc291cmNlICYmIG9wdGlvbnMuc291cmNlICE9PSBudWxsKSB7XG5cdCAgICAgICAgICAgIHRoaXMuY29uZmlnLnNvdXJjZSA9IFN0cmluZyhvcHRpb25zLnNvdXJjZSk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHRoaXMuZGVsZWdhdGUgPSBkZWxlZ2F0ZTtcblx0ICAgICAgICB0aGlzLmVycm9ySGFuZGxlciA9IG5ldyBlcnJvcl9oYW5kbGVyXzEuRXJyb3JIYW5kbGVyKCk7XG5cdCAgICAgICAgdGhpcy5lcnJvckhhbmRsZXIudG9sZXJhbnQgPSB0aGlzLmNvbmZpZy50b2xlcmFudDtcblx0ICAgICAgICB0aGlzLnNjYW5uZXIgPSBuZXcgc2Nhbm5lcl8xLlNjYW5uZXIoY29kZSwgdGhpcy5lcnJvckhhbmRsZXIpO1xuXHQgICAgICAgIHRoaXMuc2Nhbm5lci50cmFja0NvbW1lbnQgPSB0aGlzLmNvbmZpZy5jb21tZW50O1xuXHQgICAgICAgIHRoaXMub3BlcmF0b3JQcmVjZWRlbmNlID0ge1xuXHQgICAgICAgICAgICAnKSc6IDAsXG5cdCAgICAgICAgICAgICc7JzogMCxcblx0ICAgICAgICAgICAgJywnOiAwLFxuXHQgICAgICAgICAgICAnPSc6IDAsXG5cdCAgICAgICAgICAgICddJzogMCxcblx0ICAgICAgICAgICAgJ3x8JzogMSxcblx0ICAgICAgICAgICAgJyYmJzogMixcblx0ICAgICAgICAgICAgJ3wnOiAzLFxuXHQgICAgICAgICAgICAnXic6IDQsXG5cdCAgICAgICAgICAgICcmJzogNSxcblx0ICAgICAgICAgICAgJz09JzogNixcblx0ICAgICAgICAgICAgJyE9JzogNixcblx0ICAgICAgICAgICAgJz09PSc6IDYsXG5cdCAgICAgICAgICAgICchPT0nOiA2LFxuXHQgICAgICAgICAgICAnPCc6IDcsXG5cdCAgICAgICAgICAgICc+JzogNyxcblx0ICAgICAgICAgICAgJzw9JzogNyxcblx0ICAgICAgICAgICAgJz49JzogNyxcblx0ICAgICAgICAgICAgJzw8JzogOCxcblx0ICAgICAgICAgICAgJz4+JzogOCxcblx0ICAgICAgICAgICAgJz4+Pic6IDgsXG5cdCAgICAgICAgICAgICcrJzogOSxcblx0ICAgICAgICAgICAgJy0nOiA5LFxuXHQgICAgICAgICAgICAnKic6IDExLFxuXHQgICAgICAgICAgICAnLyc6IDExLFxuXHQgICAgICAgICAgICAnJSc6IDExXG5cdCAgICAgICAgfTtcblx0ICAgICAgICB0aGlzLnNvdXJjZVR5cGUgPSAob3B0aW9ucyAmJiBvcHRpb25zLnNvdXJjZVR5cGUgPT09ICdtb2R1bGUnKSA/ICdtb2R1bGUnIDogJ3NjcmlwdCc7XG5cdCAgICAgICAgdGhpcy5sb29rYWhlYWQgPSBudWxsO1xuXHQgICAgICAgIHRoaXMuaGFzTGluZVRlcm1pbmF0b3IgPSBmYWxzZTtcblx0ICAgICAgICB0aGlzLmNvbnRleHQgPSB7XG5cdCAgICAgICAgICAgIGFsbG93SW46IHRydWUsXG5cdCAgICAgICAgICAgIGFsbG93WWllbGQ6IHRydWUsXG5cdCAgICAgICAgICAgIGZpcnN0Q292ZXJJbml0aWFsaXplZE5hbWVFcnJvcjogbnVsbCxcblx0ICAgICAgICAgICAgaXNBc3NpZ25tZW50VGFyZ2V0OiBmYWxzZSxcblx0ICAgICAgICAgICAgaXNCaW5kaW5nRWxlbWVudDogZmFsc2UsXG5cdCAgICAgICAgICAgIGluRnVuY3Rpb25Cb2R5OiBmYWxzZSxcblx0ICAgICAgICAgICAgaW5JdGVyYXRpb246IGZhbHNlLFxuXHQgICAgICAgICAgICBpblN3aXRjaDogZmFsc2UsXG5cdCAgICAgICAgICAgIGxhYmVsU2V0OiB7fSxcblx0ICAgICAgICAgICAgc3RyaWN0OiAodGhpcy5zb3VyY2VUeXBlID09PSAnbW9kdWxlJylcblx0ICAgICAgICB9O1xuXHQgICAgICAgIHRoaXMudG9rZW5zID0gW107XG5cdCAgICAgICAgdGhpcy5zdGFydE1hcmtlciA9IHtcblx0ICAgICAgICAgICAgaW5kZXg6IDAsXG5cdCAgICAgICAgICAgIGxpbmVOdW1iZXI6IHRoaXMuc2Nhbm5lci5saW5lTnVtYmVyLFxuXHQgICAgICAgICAgICBsaW5lU3RhcnQ6IDBcblx0ICAgICAgICB9O1xuXHQgICAgICAgIHRoaXMubGFzdE1hcmtlciA9IHtcblx0ICAgICAgICAgICAgaW5kZXg6IDAsXG5cdCAgICAgICAgICAgIGxpbmVOdW1iZXI6IHRoaXMuc2Nhbm5lci5saW5lTnVtYmVyLFxuXHQgICAgICAgICAgICBsaW5lU3RhcnQ6IDBcblx0ICAgICAgICB9O1xuXHQgICAgICAgIHRoaXMubmV4dFRva2VuKCk7XG5cdCAgICAgICAgdGhpcy5sYXN0TWFya2VyID0ge1xuXHQgICAgICAgICAgICBpbmRleDogdGhpcy5zY2FubmVyLmluZGV4LFxuXHQgICAgICAgICAgICBsaW5lTnVtYmVyOiB0aGlzLnNjYW5uZXIubGluZU51bWJlcixcblx0ICAgICAgICAgICAgbGluZVN0YXJ0OiB0aGlzLnNjYW5uZXIubGluZVN0YXJ0XG5cdCAgICAgICAgfTtcblx0ICAgIH1cblx0ICAgIFBhcnNlci5wcm90b3R5cGUudGhyb3dFcnJvciA9IGZ1bmN0aW9uIChtZXNzYWdlRm9ybWF0KSB7XG5cdCAgICAgICAgdmFyIHZhbHVlcyA9IFtdO1xuXHQgICAgICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG5cdCAgICAgICAgICAgIHZhbHVlc1tfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuXHQgICAgICAgIHZhciBtc2cgPSBtZXNzYWdlRm9ybWF0LnJlcGxhY2UoLyUoXFxkKS9nLCBmdW5jdGlvbiAod2hvbGUsIGlkeCkge1xuXHQgICAgICAgICAgICBhc3NlcnRfMS5hc3NlcnQoaWR4IDwgYXJncy5sZW5ndGgsICdNZXNzYWdlIHJlZmVyZW5jZSBtdXN0IGJlIGluIHJhbmdlJyk7XG5cdCAgICAgICAgICAgIHJldHVybiBhcmdzW2lkeF07XG5cdCAgICAgICAgfSk7XG5cdCAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5sYXN0TWFya2VyLmluZGV4O1xuXHQgICAgICAgIHZhciBsaW5lID0gdGhpcy5sYXN0TWFya2VyLmxpbmVOdW1iZXI7XG5cdCAgICAgICAgdmFyIGNvbHVtbiA9IHRoaXMubGFzdE1hcmtlci5pbmRleCAtIHRoaXMubGFzdE1hcmtlci5saW5lU3RhcnQgKyAxO1xuXHQgICAgICAgIHRocm93IHRoaXMuZXJyb3JIYW5kbGVyLmNyZWF0ZUVycm9yKGluZGV4LCBsaW5lLCBjb2x1bW4sIG1zZyk7XG5cdCAgICB9O1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS50b2xlcmF0ZUVycm9yID0gZnVuY3Rpb24gKG1lc3NhZ2VGb3JtYXQpIHtcblx0ICAgICAgICB2YXIgdmFsdWVzID0gW107XG5cdCAgICAgICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcblx0ICAgICAgICAgICAgdmFsdWVzW19pIC0gMV0gPSBhcmd1bWVudHNbX2ldO1xuXHQgICAgICAgIH1cblx0ICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG5cdCAgICAgICAgdmFyIG1zZyA9IG1lc3NhZ2VGb3JtYXQucmVwbGFjZSgvJShcXGQpL2csIGZ1bmN0aW9uICh3aG9sZSwgaWR4KSB7XG5cdCAgICAgICAgICAgIGFzc2VydF8xLmFzc2VydChpZHggPCBhcmdzLmxlbmd0aCwgJ01lc3NhZ2UgcmVmZXJlbmNlIG11c3QgYmUgaW4gcmFuZ2UnKTtcblx0ICAgICAgICAgICAgcmV0dXJuIGFyZ3NbaWR4XTtcblx0ICAgICAgICB9KTtcblx0ICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmxhc3RNYXJrZXIuaW5kZXg7XG5cdCAgICAgICAgdmFyIGxpbmUgPSB0aGlzLnNjYW5uZXIubGluZU51bWJlcjtcblx0ICAgICAgICB2YXIgY29sdW1uID0gdGhpcy5sYXN0TWFya2VyLmluZGV4IC0gdGhpcy5sYXN0TWFya2VyLmxpbmVTdGFydCArIDE7XG5cdCAgICAgICAgdGhpcy5lcnJvckhhbmRsZXIudG9sZXJhdGVFcnJvcihpbmRleCwgbGluZSwgY29sdW1uLCBtc2cpO1xuXHQgICAgfTtcblx0ICAgIC8vIFRocm93IGFuIGV4Y2VwdGlvbiBiZWNhdXNlIG9mIHRoZSB0b2tlbi5cblx0ICAgIFBhcnNlci5wcm90b3R5cGUudW5leHBlY3RlZFRva2VuRXJyb3IgPSBmdW5jdGlvbiAodG9rZW4sIG1lc3NhZ2UpIHtcblx0ICAgICAgICB2YXIgbXNnID0gbWVzc2FnZSB8fCBtZXNzYWdlc18xLk1lc3NhZ2VzLlVuZXhwZWN0ZWRUb2tlbjtcblx0ICAgICAgICB2YXIgdmFsdWU7XG5cdCAgICAgICAgaWYgKHRva2VuKSB7XG5cdCAgICAgICAgICAgIGlmICghbWVzc2FnZSkge1xuXHQgICAgICAgICAgICAgICAgbXNnID0gKHRva2VuLnR5cGUgPT09IHRva2VuXzEuVG9rZW4uRU9GKSA/IG1lc3NhZ2VzXzEuTWVzc2FnZXMuVW5leHBlY3RlZEVPUyA6XG5cdCAgICAgICAgICAgICAgICAgICAgKHRva2VuLnR5cGUgPT09IHRva2VuXzEuVG9rZW4uSWRlbnRpZmllcikgPyBtZXNzYWdlc18xLk1lc3NhZ2VzLlVuZXhwZWN0ZWRJZGVudGlmaWVyIDpcblx0ICAgICAgICAgICAgICAgICAgICAgICAgKHRva2VuLnR5cGUgPT09IHRva2VuXzEuVG9rZW4uTnVtZXJpY0xpdGVyYWwpID8gbWVzc2FnZXNfMS5NZXNzYWdlcy5VbmV4cGVjdGVkTnVtYmVyIDpcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0b2tlbi50eXBlID09PSB0b2tlbl8xLlRva2VuLlN0cmluZ0xpdGVyYWwpID8gbWVzc2FnZXNfMS5NZXNzYWdlcy5VbmV4cGVjdGVkU3RyaW5nIDpcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodG9rZW4udHlwZSA9PT0gdG9rZW5fMS5Ub2tlbi5UZW1wbGF0ZSkgPyBtZXNzYWdlc18xLk1lc3NhZ2VzLlVuZXhwZWN0ZWRUZW1wbGF0ZSA6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VzXzEuTWVzc2FnZXMuVW5leHBlY3RlZFRva2VuO1xuXHQgICAgICAgICAgICAgICAgaWYgKHRva2VuLnR5cGUgPT09IHRva2VuXzEuVG9rZW4uS2V5d29yZCkge1xuXHQgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5uZXIuaXNGdXR1cmVSZXNlcnZlZFdvcmQodG9rZW4udmFsdWUpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIG1zZyA9IG1lc3NhZ2VzXzEuTWVzc2FnZXMuVW5leHBlY3RlZFJlc2VydmVkO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmNvbnRleHQuc3RyaWN0ICYmIHRoaXMuc2Nhbm5lci5pc1N0cmljdE1vZGVSZXNlcnZlZFdvcmQodG9rZW4udmFsdWUpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIG1zZyA9IG1lc3NhZ2VzXzEuTWVzc2FnZXMuU3RyaWN0UmVzZXJ2ZWRXb3JkO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB2YWx1ZSA9ICh0b2tlbi50eXBlID09PSB0b2tlbl8xLlRva2VuLlRlbXBsYXRlKSA/IHRva2VuLnZhbHVlLnJhdyA6IHRva2VuLnZhbHVlO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgdmFsdWUgPSAnSUxMRUdBTCc7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIG1zZyA9IG1zZy5yZXBsYWNlKCclMCcsIHZhbHVlKTtcblx0ICAgICAgICBpZiAodG9rZW4gJiYgdHlwZW9mIHRva2VuLmxpbmVOdW1iZXIgPT09ICdudW1iZXInKSB7XG5cdCAgICAgICAgICAgIHZhciBpbmRleCA9IHRva2VuLnN0YXJ0O1xuXHQgICAgICAgICAgICB2YXIgbGluZSA9IHRva2VuLmxpbmVOdW1iZXI7XG5cdCAgICAgICAgICAgIHZhciBjb2x1bW4gPSB0b2tlbi5zdGFydCAtIHRoaXMubGFzdE1hcmtlci5saW5lU3RhcnQgKyAxO1xuXHQgICAgICAgICAgICByZXR1cm4gdGhpcy5lcnJvckhhbmRsZXIuY3JlYXRlRXJyb3IoaW5kZXgsIGxpbmUsIGNvbHVtbiwgbXNnKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMubGFzdE1hcmtlci5pbmRleDtcblx0ICAgICAgICAgICAgdmFyIGxpbmUgPSB0aGlzLmxhc3RNYXJrZXIubGluZU51bWJlcjtcblx0ICAgICAgICAgICAgdmFyIGNvbHVtbiA9IGluZGV4IC0gdGhpcy5sYXN0TWFya2VyLmxpbmVTdGFydCArIDE7XG5cdCAgICAgICAgICAgIHJldHVybiB0aGlzLmVycm9ySGFuZGxlci5jcmVhdGVFcnJvcihpbmRleCwgbGluZSwgY29sdW1uLCBtc2cpO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnRocm93VW5leHBlY3RlZFRva2VuID0gZnVuY3Rpb24gKHRva2VuLCBtZXNzYWdlKSB7XG5cdCAgICAgICAgdGhyb3cgdGhpcy51bmV4cGVjdGVkVG9rZW5FcnJvcih0b2tlbiwgbWVzc2FnZSk7XG5cdCAgICB9O1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS50b2xlcmF0ZVVuZXhwZWN0ZWRUb2tlbiA9IGZ1bmN0aW9uICh0b2tlbiwgbWVzc2FnZSkge1xuXHQgICAgICAgIHRoaXMuZXJyb3JIYW5kbGVyLnRvbGVyYXRlKHRoaXMudW5leHBlY3RlZFRva2VuRXJyb3IodG9rZW4sIG1lc3NhZ2UpKTtcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLmNvbGxlY3RDb21tZW50cyA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBpZiAoIXRoaXMuY29uZmlnLmNvbW1lbnQpIHtcblx0ICAgICAgICAgICAgdGhpcy5zY2FubmVyLnNjYW5Db21tZW50cygpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgdmFyIGNvbW1lbnRzID0gdGhpcy5zY2FubmVyLnNjYW5Db21tZW50cygpO1xuXHQgICAgICAgICAgICBpZiAoY29tbWVudHMubGVuZ3RoID4gMCAmJiB0aGlzLmRlbGVnYXRlKSB7XG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbW1lbnRzLmxlbmd0aDsgKytpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGUgPSBjb21tZW50c1tpXTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IHZvaWQgMDtcblx0ICAgICAgICAgICAgICAgICAgICBub2RlID0ge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBlLm11bHRpTGluZSA/ICdCbG9ja0NvbW1lbnQnIDogJ0xpbmVDb21tZW50Jyxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc2Nhbm5lci5zb3VyY2Uuc2xpY2UoZS5zbGljZVswXSwgZS5zbGljZVsxXSlcblx0ICAgICAgICAgICAgICAgICAgICB9O1xuXHQgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5yYW5nZSkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBub2RlLnJhbmdlID0gZS5yYW5nZTtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnLmxvYykge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBub2RlLmxvYyA9IGUubG9jO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICB2YXIgbWV0YWRhdGEgPSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lOiBlLmxvYy5zdGFydC5saW5lLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uOiBlLmxvYy5zdGFydC5jb2x1bW4sXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQ6IGUucmFuZ2VbMF1cblx0ICAgICAgICAgICAgICAgICAgICAgICAgfSxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgZW5kOiB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lOiBlLmxvYy5lbmQubGluZSxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbjogZS5sb2MuZW5kLmNvbHVtbixcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldDogZS5yYW5nZVsxXVxuXHQgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgfTtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbGVnYXRlKG5vZGUsIG1ldGFkYXRhKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgIH07XG5cdCAgICAvLyBGcm9tIGludGVybmFsIHJlcHJlc2VudGF0aW9uIHRvIGFuIGV4dGVybmFsIHN0cnVjdHVyZVxuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5nZXRUb2tlblJhdyA9IGZ1bmN0aW9uICh0b2tlbikge1xuXHQgICAgICAgIHJldHVybiB0aGlzLnNjYW5uZXIuc291cmNlLnNsaWNlKHRva2VuLnN0YXJ0LCB0b2tlbi5lbmQpO1xuXHQgICAgfTtcblx0ICAgIFBhcnNlci5wcm90b3R5cGUuY29udmVydFRva2VuID0gZnVuY3Rpb24gKHRva2VuKSB7XG5cdCAgICAgICAgdmFyIHQ7XG5cdCAgICAgICAgdCA9IHtcblx0ICAgICAgICAgICAgdHlwZTogdG9rZW5fMS5Ub2tlbk5hbWVbdG9rZW4udHlwZV0sXG5cdCAgICAgICAgICAgIHZhbHVlOiB0aGlzLmdldFRva2VuUmF3KHRva2VuKVxuXHQgICAgICAgIH07XG5cdCAgICAgICAgaWYgKHRoaXMuY29uZmlnLnJhbmdlKSB7XG5cdCAgICAgICAgICAgIHQucmFuZ2UgPSBbdG9rZW4uc3RhcnQsIHRva2VuLmVuZF07XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmICh0aGlzLmNvbmZpZy5sb2MpIHtcblx0ICAgICAgICAgICAgdC5sb2MgPSB7XG5cdCAgICAgICAgICAgICAgICBzdGFydDoge1xuXHQgICAgICAgICAgICAgICAgICAgIGxpbmU6IHRoaXMuc3RhcnRNYXJrZXIubGluZU51bWJlcixcblx0ICAgICAgICAgICAgICAgICAgICBjb2x1bW46IHRoaXMuc3RhcnRNYXJrZXIuaW5kZXggLSB0aGlzLnN0YXJ0TWFya2VyLmxpbmVTdGFydFxuXHQgICAgICAgICAgICAgICAgfSxcblx0ICAgICAgICAgICAgICAgIGVuZDoge1xuXHQgICAgICAgICAgICAgICAgICAgIGxpbmU6IHRoaXMuc2Nhbm5lci5saW5lTnVtYmVyLFxuXHQgICAgICAgICAgICAgICAgICAgIGNvbHVtbjogdGhpcy5zY2FubmVyLmluZGV4IC0gdGhpcy5zY2FubmVyLmxpbmVTdGFydFxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9O1xuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAodG9rZW4ucmVnZXgpIHtcblx0ICAgICAgICAgICAgdC5yZWdleCA9IHRva2VuLnJlZ2V4O1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gdDtcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLm5leHRUb2tlbiA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgdG9rZW4gPSB0aGlzLmxvb2thaGVhZDtcblx0ICAgICAgICB0aGlzLmxhc3RNYXJrZXIuaW5kZXggPSB0aGlzLnNjYW5uZXIuaW5kZXg7XG5cdCAgICAgICAgdGhpcy5sYXN0TWFya2VyLmxpbmVOdW1iZXIgPSB0aGlzLnNjYW5uZXIubGluZU51bWJlcjtcblx0ICAgICAgICB0aGlzLmxhc3RNYXJrZXIubGluZVN0YXJ0ID0gdGhpcy5zY2FubmVyLmxpbmVTdGFydDtcblx0ICAgICAgICB0aGlzLmNvbGxlY3RDb21tZW50cygpO1xuXHQgICAgICAgIHRoaXMuc3RhcnRNYXJrZXIuaW5kZXggPSB0aGlzLnNjYW5uZXIuaW5kZXg7XG5cdCAgICAgICAgdGhpcy5zdGFydE1hcmtlci5saW5lTnVtYmVyID0gdGhpcy5zY2FubmVyLmxpbmVOdW1iZXI7XG5cdCAgICAgICAgdGhpcy5zdGFydE1hcmtlci5saW5lU3RhcnQgPSB0aGlzLnNjYW5uZXIubGluZVN0YXJ0O1xuXHQgICAgICAgIHZhciBuZXh0O1xuXHQgICAgICAgIG5leHQgPSB0aGlzLnNjYW5uZXIubGV4KCk7XG5cdCAgICAgICAgdGhpcy5oYXNMaW5lVGVybWluYXRvciA9ICh0b2tlbiAmJiBuZXh0KSA/ICh0b2tlbi5saW5lTnVtYmVyICE9PSBuZXh0LmxpbmVOdW1iZXIpIDogZmFsc2U7XG5cdCAgICAgICAgaWYgKG5leHQgJiYgdGhpcy5jb250ZXh0LnN0cmljdCAmJiBuZXh0LnR5cGUgPT09IHRva2VuXzEuVG9rZW4uSWRlbnRpZmllcikge1xuXHQgICAgICAgICAgICBpZiAodGhpcy5zY2FubmVyLmlzU3RyaWN0TW9kZVJlc2VydmVkV29yZChuZXh0LnZhbHVlKSkge1xuXHQgICAgICAgICAgICAgICAgbmV4dC50eXBlID0gdG9rZW5fMS5Ub2tlbi5LZXl3b3JkO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHRoaXMubG9va2FoZWFkID0gbmV4dDtcblx0ICAgICAgICBpZiAodGhpcy5jb25maWcudG9rZW5zICYmIG5leHQudHlwZSAhPT0gdG9rZW5fMS5Ub2tlbi5FT0YpIHtcblx0ICAgICAgICAgICAgdGhpcy50b2tlbnMucHVzaCh0aGlzLmNvbnZlcnRUb2tlbihuZXh0KSk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiB0b2tlbjtcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLm5leHRSZWdleFRva2VuID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHRoaXMuY29sbGVjdENvbW1lbnRzKCk7XG5cdCAgICAgICAgdmFyIHRva2VuID0gdGhpcy5zY2FubmVyLnNjYW5SZWdFeHAoKTtcblx0ICAgICAgICBpZiAodGhpcy5jb25maWcudG9rZW5zKSB7XG5cdCAgICAgICAgICAgIC8vIFBvcCB0aGUgcHJldmlvdXMgdG9rZW4sICcvJyBvciAnLz0nXG5cdCAgICAgICAgICAgIC8vIFRoaXMgaXMgYWRkZWQgZnJvbSB0aGUgbG9va2FoZWFkIHRva2VuLlxuXHQgICAgICAgICAgICB0aGlzLnRva2Vucy5wb3AoKTtcblx0ICAgICAgICAgICAgdGhpcy50b2tlbnMucHVzaCh0aGlzLmNvbnZlcnRUb2tlbih0b2tlbikpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICAvLyBQcmltZSB0aGUgbmV4dCBsb29rYWhlYWQuXG5cdCAgICAgICAgdGhpcy5sb29rYWhlYWQgPSB0b2tlbjtcblx0ICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgIHJldHVybiB0b2tlbjtcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLmNyZWF0ZU5vZGUgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgcmV0dXJuIHtcblx0ICAgICAgICAgICAgaW5kZXg6IHRoaXMuc3RhcnRNYXJrZXIuaW5kZXgsXG5cdCAgICAgICAgICAgIGxpbmU6IHRoaXMuc3RhcnRNYXJrZXIubGluZU51bWJlcixcblx0ICAgICAgICAgICAgY29sdW1uOiB0aGlzLnN0YXJ0TWFya2VyLmluZGV4IC0gdGhpcy5zdGFydE1hcmtlci5saW5lU3RhcnRcblx0ICAgICAgICB9O1xuXHQgICAgfTtcblx0ICAgIFBhcnNlci5wcm90b3R5cGUuc3RhcnROb2RlID0gZnVuY3Rpb24gKHRva2VuKSB7XG5cdCAgICAgICAgcmV0dXJuIHtcblx0ICAgICAgICAgICAgaW5kZXg6IHRva2VuLnN0YXJ0LFxuXHQgICAgICAgICAgICBsaW5lOiB0b2tlbi5saW5lTnVtYmVyLFxuXHQgICAgICAgICAgICBjb2x1bW46IHRva2VuLnN0YXJ0IC0gdG9rZW4ubGluZVN0YXJ0XG5cdCAgICAgICAgfTtcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLmZpbmFsaXplID0gZnVuY3Rpb24gKG1ldGEsIG5vZGUpIHtcblx0ICAgICAgICBpZiAodGhpcy5jb25maWcucmFuZ2UpIHtcblx0ICAgICAgICAgICAgbm9kZS5yYW5nZSA9IFttZXRhLmluZGV4LCB0aGlzLmxhc3RNYXJrZXIuaW5kZXhdO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAodGhpcy5jb25maWcubG9jKSB7XG5cdCAgICAgICAgICAgIG5vZGUubG9jID0ge1xuXHQgICAgICAgICAgICAgICAgc3RhcnQ6IHtcblx0ICAgICAgICAgICAgICAgICAgICBsaW5lOiBtZXRhLmxpbmUsXG5cdCAgICAgICAgICAgICAgICAgICAgY29sdW1uOiBtZXRhLmNvbHVtblxuXHQgICAgICAgICAgICAgICAgfSxcblx0ICAgICAgICAgICAgICAgIGVuZDoge1xuXHQgICAgICAgICAgICAgICAgICAgIGxpbmU6IHRoaXMubGFzdE1hcmtlci5saW5lTnVtYmVyLFxuXHQgICAgICAgICAgICAgICAgICAgIGNvbHVtbjogdGhpcy5sYXN0TWFya2VyLmluZGV4IC0gdGhpcy5sYXN0TWFya2VyLmxpbmVTdGFydFxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9O1xuXHQgICAgICAgICAgICBpZiAodGhpcy5jb25maWcuc291cmNlKSB7XG5cdCAgICAgICAgICAgICAgICBub2RlLmxvYy5zb3VyY2UgPSB0aGlzLmNvbmZpZy5zb3VyY2U7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYgKHRoaXMuZGVsZWdhdGUpIHtcblx0ICAgICAgICAgICAgdmFyIG1ldGFkYXRhID0ge1xuXHQgICAgICAgICAgICAgICAgc3RhcnQ6IHtcblx0ICAgICAgICAgICAgICAgICAgICBsaW5lOiBtZXRhLmxpbmUsXG5cdCAgICAgICAgICAgICAgICAgICAgY29sdW1uOiBtZXRhLmNvbHVtbixcblx0ICAgICAgICAgICAgICAgICAgICBvZmZzZXQ6IG1ldGEuaW5kZXhcblx0ICAgICAgICAgICAgICAgIH0sXG5cdCAgICAgICAgICAgICAgICBlbmQ6IHtcblx0ICAgICAgICAgICAgICAgICAgICBsaW5lOiB0aGlzLmxhc3RNYXJrZXIubGluZU51bWJlcixcblx0ICAgICAgICAgICAgICAgICAgICBjb2x1bW46IHRoaXMubGFzdE1hcmtlci5pbmRleCAtIHRoaXMubGFzdE1hcmtlci5saW5lU3RhcnQsXG5cdCAgICAgICAgICAgICAgICAgICAgb2Zmc2V0OiB0aGlzLmxhc3RNYXJrZXIuaW5kZXhcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfTtcblx0ICAgICAgICAgICAgdGhpcy5kZWxlZ2F0ZShub2RlLCBtZXRhZGF0YSk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiBub2RlO1xuXHQgICAgfTtcblx0ICAgIC8vIEV4cGVjdCB0aGUgbmV4dCB0b2tlbiB0byBtYXRjaCB0aGUgc3BlY2lmaWVkIHB1bmN0dWF0b3IuXG5cdCAgICAvLyBJZiBub3QsIGFuIGV4Y2VwdGlvbiB3aWxsIGJlIHRocm93bi5cblx0ICAgIFBhcnNlci5wcm90b3R5cGUuZXhwZWN0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdCAgICAgICAgdmFyIHRva2VuID0gdGhpcy5uZXh0VG9rZW4oKTtcblx0ICAgICAgICBpZiAodG9rZW4udHlwZSAhPT0gdG9rZW5fMS5Ub2tlbi5QdW5jdHVhdG9yIHx8IHRva2VuLnZhbHVlICE9PSB2YWx1ZSkge1xuXHQgICAgICAgICAgICB0aGlzLnRocm93VW5leHBlY3RlZFRva2VuKHRva2VuKTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXHQgICAgLy8gUXVpZXRseSBleHBlY3QgYSBjb21tYSB3aGVuIGluIHRvbGVyYW50IG1vZGUsIG90aGVyd2lzZSBkZWxlZ2F0ZXMgdG8gZXhwZWN0KCkuXG5cdCAgICBQYXJzZXIucHJvdG90eXBlLmV4cGVjdENvbW1hU2VwYXJhdG9yID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGlmICh0aGlzLmNvbmZpZy50b2xlcmFudCkge1xuXHQgICAgICAgICAgICB2YXIgdG9rZW4gPSB0aGlzLmxvb2thaGVhZDtcblx0ICAgICAgICAgICAgaWYgKHRva2VuLnR5cGUgPT09IHRva2VuXzEuVG9rZW4uUHVuY3R1YXRvciAmJiB0b2tlbi52YWx1ZSA9PT0gJywnKSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2UgaWYgKHRva2VuLnR5cGUgPT09IHRva2VuXzEuVG9rZW4uUHVuY3R1YXRvciAmJiB0b2tlbi52YWx1ZSA9PT0gJzsnKSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgICAgICAgICAgdGhpcy50b2xlcmF0ZVVuZXhwZWN0ZWRUb2tlbih0b2tlbik7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnRvbGVyYXRlVW5leHBlY3RlZFRva2VuKHRva2VuLCBtZXNzYWdlc18xLk1lc3NhZ2VzLlVuZXhwZWN0ZWRUb2tlbik7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgIHRoaXMuZXhwZWN0KCcsJyk7XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblx0ICAgIC8vIEV4cGVjdCB0aGUgbmV4dCB0b2tlbiB0byBtYXRjaCB0aGUgc3BlY2lmaWVkIGtleXdvcmQuXG5cdCAgICAvLyBJZiBub3QsIGFuIGV4Y2VwdGlvbiB3aWxsIGJlIHRocm93bi5cblx0ICAgIFBhcnNlci5wcm90b3R5cGUuZXhwZWN0S2V5d29yZCA9IGZ1bmN0aW9uIChrZXl3b3JkKSB7XG5cdCAgICAgICAgdmFyIHRva2VuID0gdGhpcy5uZXh0VG9rZW4oKTtcblx0ICAgICAgICBpZiAodG9rZW4udHlwZSAhPT0gdG9rZW5fMS5Ub2tlbi5LZXl3b3JkIHx8IHRva2VuLnZhbHVlICE9PSBrZXl3b3JkKSB7XG5cdCAgICAgICAgICAgIHRoaXMudGhyb3dVbmV4cGVjdGVkVG9rZW4odG9rZW4pO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cdCAgICAvLyBSZXR1cm4gdHJ1ZSBpZiB0aGUgbmV4dCB0b2tlbiBtYXRjaGVzIHRoZSBzcGVjaWZpZWQgcHVuY3R1YXRvci5cblx0ICAgIFBhcnNlci5wcm90b3R5cGUubWF0Y2ggPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0ICAgICAgICByZXR1cm4gdGhpcy5sb29rYWhlYWQudHlwZSA9PT0gdG9rZW5fMS5Ub2tlbi5QdW5jdHVhdG9yICYmIHRoaXMubG9va2FoZWFkLnZhbHVlID09PSB2YWx1ZTtcblx0ICAgIH07XG5cdCAgICAvLyBSZXR1cm4gdHJ1ZSBpZiB0aGUgbmV4dCB0b2tlbiBtYXRjaGVzIHRoZSBzcGVjaWZpZWQga2V5d29yZFxuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5tYXRjaEtleXdvcmQgPSBmdW5jdGlvbiAoa2V5d29yZCkge1xuXHQgICAgICAgIHJldHVybiB0aGlzLmxvb2thaGVhZC50eXBlID09PSB0b2tlbl8xLlRva2VuLktleXdvcmQgJiYgdGhpcy5sb29rYWhlYWQudmFsdWUgPT09IGtleXdvcmQ7XG5cdCAgICB9O1xuXHQgICAgLy8gUmV0dXJuIHRydWUgaWYgdGhlIG5leHQgdG9rZW4gbWF0Y2hlcyB0aGUgc3BlY2lmaWVkIGNvbnRleHR1YWwga2V5d29yZFxuXHQgICAgLy8gKHdoZXJlIGFuIGlkZW50aWZpZXIgaXMgc29tZXRpbWVzIGEga2V5d29yZCBkZXBlbmRpbmcgb24gdGhlIGNvbnRleHQpXG5cdCAgICBQYXJzZXIucHJvdG90eXBlLm1hdGNoQ29udGV4dHVhbEtleXdvcmQgPSBmdW5jdGlvbiAoa2V5d29yZCkge1xuXHQgICAgICAgIHJldHVybiB0aGlzLmxvb2thaGVhZC50eXBlID09PSB0b2tlbl8xLlRva2VuLklkZW50aWZpZXIgJiYgdGhpcy5sb29rYWhlYWQudmFsdWUgPT09IGtleXdvcmQ7XG5cdCAgICB9O1xuXHQgICAgLy8gUmV0dXJuIHRydWUgaWYgdGhlIG5leHQgdG9rZW4gaXMgYW4gYXNzaWdubWVudCBvcGVyYXRvclxuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5tYXRjaEFzc2lnbiA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBpZiAodGhpcy5sb29rYWhlYWQudHlwZSAhPT0gdG9rZW5fMS5Ub2tlbi5QdW5jdHVhdG9yKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIG9wID0gdGhpcy5sb29rYWhlYWQudmFsdWU7XG5cdCAgICAgICAgcmV0dXJuIG9wID09PSAnPScgfHxcblx0ICAgICAgICAgICAgb3AgPT09ICcqPScgfHxcblx0ICAgICAgICAgICAgb3AgPT09ICcqKj0nIHx8XG5cdCAgICAgICAgICAgIG9wID09PSAnLz0nIHx8XG5cdCAgICAgICAgICAgIG9wID09PSAnJT0nIHx8XG5cdCAgICAgICAgICAgIG9wID09PSAnKz0nIHx8XG5cdCAgICAgICAgICAgIG9wID09PSAnLT0nIHx8XG5cdCAgICAgICAgICAgIG9wID09PSAnPDw9JyB8fFxuXHQgICAgICAgICAgICBvcCA9PT0gJz4+PScgfHxcblx0ICAgICAgICAgICAgb3AgPT09ICc+Pj49JyB8fFxuXHQgICAgICAgICAgICBvcCA9PT0gJyY9JyB8fFxuXHQgICAgICAgICAgICBvcCA9PT0gJ149JyB8fFxuXHQgICAgICAgICAgICBvcCA9PT0gJ3w9Jztcblx0ICAgIH07XG5cdCAgICAvLyBDb3ZlciBncmFtbWFyIHN1cHBvcnQuXG5cdCAgICAvL1xuXHQgICAgLy8gV2hlbiBhbiBhc3NpZ25tZW50IGV4cHJlc3Npb24gcG9zaXRpb24gc3RhcnRzIHdpdGggYW4gbGVmdCBwYXJlbnRoZXNpcywgdGhlIGRldGVybWluYXRpb24gb2YgdGhlIHR5cGVcblx0ICAgIC8vIG9mIHRoZSBzeW50YXggaXMgdG8gYmUgZGVmZXJyZWQgYXJiaXRyYXJpbHkgbG9uZyB1bnRpbCB0aGUgZW5kIG9mIHRoZSBwYXJlbnRoZXNlcyBwYWlyIChwbHVzIGEgbG9va2FoZWFkKVxuXHQgICAgLy8gb3IgdGhlIGZpcnN0IGNvbW1hLiBUaGlzIHNpdHVhdGlvbiBhbHNvIGRlZmVycyB0aGUgZGV0ZXJtaW5hdGlvbiBvZiBhbGwgdGhlIGV4cHJlc3Npb25zIG5lc3RlZCBpbiB0aGUgcGFpci5cblx0ICAgIC8vXG5cdCAgICAvLyBUaGVyZSBhcmUgdGhyZWUgcHJvZHVjdGlvbnMgdGhhdCBjYW4gYmUgcGFyc2VkIGluIGEgcGFyZW50aGVzZXMgcGFpciB0aGF0IG5lZWRzIHRvIGJlIGRldGVybWluZWRcblx0ICAgIC8vIGFmdGVyIHRoZSBvdXRlcm1vc3QgcGFpciBpcyBjbG9zZWQuIFRoZXkgYXJlOlxuXHQgICAgLy9cblx0ICAgIC8vICAgMS4gQXNzaWdubWVudEV4cHJlc3Npb25cblx0ICAgIC8vICAgMi4gQmluZGluZ0VsZW1lbnRzXG5cdCAgICAvLyAgIDMuIEFzc2lnbm1lbnRUYXJnZXRzXG5cdCAgICAvL1xuXHQgICAgLy8gSW4gb3JkZXIgdG8gYXZvaWQgZXhwb25lbnRpYWwgYmFja3RyYWNraW5nLCB3ZSB1c2UgdHdvIGZsYWdzIHRvIGRlbm90ZSBpZiB0aGUgcHJvZHVjdGlvbiBjYW4gYmVcblx0ICAgIC8vIGJpbmRpbmcgZWxlbWVudCBvciBhc3NpZ25tZW50IHRhcmdldC5cblx0ICAgIC8vXG5cdCAgICAvLyBUaGUgdGhyZWUgcHJvZHVjdGlvbnMgaGF2ZSB0aGUgcmVsYXRpb25zaGlwOlxuXHQgICAgLy9cblx0ICAgIC8vICAgQmluZGluZ0VsZW1lbnRzIOKKhiBBc3NpZ25tZW50VGFyZ2V0cyDiioYgQXNzaWdubWVudEV4cHJlc3Npb25cblx0ICAgIC8vXG5cdCAgICAvLyB3aXRoIGEgc2luZ2xlIGV4Y2VwdGlvbiB0aGF0IENvdmVySW5pdGlhbGl6ZWROYW1lIHdoZW4gdXNlZCBkaXJlY3RseSBpbiBhbiBFeHByZXNzaW9uLCBnZW5lcmF0ZXNcblx0ICAgIC8vIGFuIGVhcmx5IGVycm9yLiBUaGVyZWZvcmUsIHdlIG5lZWQgdGhlIHRoaXJkIHN0YXRlLCBmaXJzdENvdmVySW5pdGlhbGl6ZWROYW1lRXJyb3IsIHRvIHRyYWNrIHRoZVxuXHQgICAgLy8gZmlyc3QgdXNhZ2Ugb2YgQ292ZXJJbml0aWFsaXplZE5hbWUgYW5kIHJlcG9ydCBpdCB3aGVuIHdlIHJlYWNoZWQgdGhlIGVuZCBvZiB0aGUgcGFyZW50aGVzZXMgcGFpci5cblx0ICAgIC8vXG5cdCAgICAvLyBpc29sYXRlQ292ZXJHcmFtbWFyIGZ1bmN0aW9uIHJ1bnMgdGhlIGdpdmVuIHBhcnNlciBmdW5jdGlvbiB3aXRoIGEgbmV3IGNvdmVyIGdyYW1tYXIgY29udGV4dCwgYW5kIGl0IGRvZXMgbm90XG5cdCAgICAvLyBlZmZlY3QgdGhlIGN1cnJlbnQgZmxhZ3MuIFRoaXMgbWVhbnMgdGhlIHByb2R1Y3Rpb24gdGhlIHBhcnNlciBwYXJzZXMgaXMgb25seSB1c2VkIGFzIGFuIGV4cHJlc3Npb24uIFRoZXJlZm9yZVxuXHQgICAgLy8gdGhlIENvdmVySW5pdGlhbGl6ZWROYW1lIGNoZWNrIGlzIGNvbmR1Y3RlZC5cblx0ICAgIC8vXG5cdCAgICAvLyBpbmhlcml0Q292ZXJHcmFtbWFyIGZ1bmN0aW9uIHJ1bnMgdGhlIGdpdmVuIHBhcnNlIGZ1bmN0aW9uIHdpdGggYSBuZXcgY292ZXIgZ3JhbW1hciBjb250ZXh0LCBhbmQgaXQgcHJvcGFnYXRlc1xuXHQgICAgLy8gdGhlIGZsYWdzIG91dHNpZGUgb2YgdGhlIHBhcnNlci4gVGhpcyBtZWFucyB0aGUgcHJvZHVjdGlvbiB0aGUgcGFyc2VyIHBhcnNlcyBpcyB1c2VkIGFzIGEgcGFydCBvZiBhIHBvdGVudGlhbFxuXHQgICAgLy8gcGF0dGVybi4gVGhlIENvdmVySW5pdGlhbGl6ZWROYW1lIGNoZWNrIGlzIGRlZmVycmVkLlxuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5pc29sYXRlQ292ZXJHcmFtbWFyID0gZnVuY3Rpb24gKHBhcnNlRnVuY3Rpb24pIHtcblx0ICAgICAgICB2YXIgcHJldmlvdXNJc0JpbmRpbmdFbGVtZW50ID0gdGhpcy5jb250ZXh0LmlzQmluZGluZ0VsZW1lbnQ7XG5cdCAgICAgICAgdmFyIHByZXZpb3VzSXNBc3NpZ25tZW50VGFyZ2V0ID0gdGhpcy5jb250ZXh0LmlzQXNzaWdubWVudFRhcmdldDtcblx0ICAgICAgICB2YXIgcHJldmlvdXNGaXJzdENvdmVySW5pdGlhbGl6ZWROYW1lRXJyb3IgPSB0aGlzLmNvbnRleHQuZmlyc3RDb3ZlckluaXRpYWxpemVkTmFtZUVycm9yO1xuXHQgICAgICAgIHRoaXMuY29udGV4dC5pc0JpbmRpbmdFbGVtZW50ID0gdHJ1ZTtcblx0ICAgICAgICB0aGlzLmNvbnRleHQuaXNBc3NpZ25tZW50VGFyZ2V0ID0gdHJ1ZTtcblx0ICAgICAgICB0aGlzLmNvbnRleHQuZmlyc3RDb3ZlckluaXRpYWxpemVkTmFtZUVycm9yID0gbnVsbDtcblx0ICAgICAgICB2YXIgcmVzdWx0ID0gcGFyc2VGdW5jdGlvbi5jYWxsKHRoaXMpO1xuXHQgICAgICAgIGlmICh0aGlzLmNvbnRleHQuZmlyc3RDb3ZlckluaXRpYWxpemVkTmFtZUVycm9yICE9PSBudWxsKSB7XG5cdCAgICAgICAgICAgIHRoaXMudGhyb3dVbmV4cGVjdGVkVG9rZW4odGhpcy5jb250ZXh0LmZpcnN0Q292ZXJJbml0aWFsaXplZE5hbWVFcnJvcik7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHRoaXMuY29udGV4dC5pc0JpbmRpbmdFbGVtZW50ID0gcHJldmlvdXNJc0JpbmRpbmdFbGVtZW50O1xuXHQgICAgICAgIHRoaXMuY29udGV4dC5pc0Fzc2lnbm1lbnRUYXJnZXQgPSBwcmV2aW91c0lzQXNzaWdubWVudFRhcmdldDtcblx0ICAgICAgICB0aGlzLmNvbnRleHQuZmlyc3RDb3ZlckluaXRpYWxpemVkTmFtZUVycm9yID0gcHJldmlvdXNGaXJzdENvdmVySW5pdGlhbGl6ZWROYW1lRXJyb3I7XG5cdCAgICAgICAgcmV0dXJuIHJlc3VsdDtcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLmluaGVyaXRDb3ZlckdyYW1tYXIgPSBmdW5jdGlvbiAocGFyc2VGdW5jdGlvbikge1xuXHQgICAgICAgIHZhciBwcmV2aW91c0lzQmluZGluZ0VsZW1lbnQgPSB0aGlzLmNvbnRleHQuaXNCaW5kaW5nRWxlbWVudDtcblx0ICAgICAgICB2YXIgcHJldmlvdXNJc0Fzc2lnbm1lbnRUYXJnZXQgPSB0aGlzLmNvbnRleHQuaXNBc3NpZ25tZW50VGFyZ2V0O1xuXHQgICAgICAgIHZhciBwcmV2aW91c0ZpcnN0Q292ZXJJbml0aWFsaXplZE5hbWVFcnJvciA9IHRoaXMuY29udGV4dC5maXJzdENvdmVySW5pdGlhbGl6ZWROYW1lRXJyb3I7XG5cdCAgICAgICAgdGhpcy5jb250ZXh0LmlzQmluZGluZ0VsZW1lbnQgPSB0cnVlO1xuXHQgICAgICAgIHRoaXMuY29udGV4dC5pc0Fzc2lnbm1lbnRUYXJnZXQgPSB0cnVlO1xuXHQgICAgICAgIHRoaXMuY29udGV4dC5maXJzdENvdmVySW5pdGlhbGl6ZWROYW1lRXJyb3IgPSBudWxsO1xuXHQgICAgICAgIHZhciByZXN1bHQgPSBwYXJzZUZ1bmN0aW9uLmNhbGwodGhpcyk7XG5cdCAgICAgICAgdGhpcy5jb250ZXh0LmlzQmluZGluZ0VsZW1lbnQgPSB0aGlzLmNvbnRleHQuaXNCaW5kaW5nRWxlbWVudCAmJiBwcmV2aW91c0lzQmluZGluZ0VsZW1lbnQ7XG5cdCAgICAgICAgdGhpcy5jb250ZXh0LmlzQXNzaWdubWVudFRhcmdldCA9IHRoaXMuY29udGV4dC5pc0Fzc2lnbm1lbnRUYXJnZXQgJiYgcHJldmlvdXNJc0Fzc2lnbm1lbnRUYXJnZXQ7XG5cdCAgICAgICAgdGhpcy5jb250ZXh0LmZpcnN0Q292ZXJJbml0aWFsaXplZE5hbWVFcnJvciA9IHByZXZpb3VzRmlyc3RDb3ZlckluaXRpYWxpemVkTmFtZUVycm9yIHx8IHRoaXMuY29udGV4dC5maXJzdENvdmVySW5pdGlhbGl6ZWROYW1lRXJyb3I7XG5cdCAgICAgICAgcmV0dXJuIHJlc3VsdDtcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLmNvbnN1bWVTZW1pY29sb24gPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgaWYgKHRoaXMubWF0Y2goJzsnKSkge1xuXHQgICAgICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIGlmICghdGhpcy5oYXNMaW5lVGVybWluYXRvcikge1xuXHQgICAgICAgICAgICBpZiAodGhpcy5sb29rYWhlYWQudHlwZSAhPT0gdG9rZW5fMS5Ub2tlbi5FT0YgJiYgIXRoaXMubWF0Y2goJ30nKSkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy50aHJvd1VuZXhwZWN0ZWRUb2tlbih0aGlzLmxvb2thaGVhZCk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgdGhpcy5sYXN0TWFya2VyLmluZGV4ID0gdGhpcy5zdGFydE1hcmtlci5pbmRleDtcblx0ICAgICAgICAgICAgdGhpcy5sYXN0TWFya2VyLmxpbmVOdW1iZXIgPSB0aGlzLnN0YXJ0TWFya2VyLmxpbmVOdW1iZXI7XG5cdCAgICAgICAgICAgIHRoaXMubGFzdE1hcmtlci5saW5lU3RhcnQgPSB0aGlzLnN0YXJ0TWFya2VyLmxpbmVTdGFydDtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXHQgICAgLy8gRUNNQS0yNjIgMTIuMiBQcmltYXJ5IEV4cHJlc3Npb25zXG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlUHJpbWFyeUV4cHJlc3Npb24gPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoKTtcblx0ICAgICAgICB2YXIgZXhwcjtcblx0ICAgICAgICB2YXIgdmFsdWUsIHRva2VuLCByYXc7XG5cdCAgICAgICAgc3dpdGNoICh0aGlzLmxvb2thaGVhZC50eXBlKSB7XG5cdCAgICAgICAgICAgIGNhc2UgdG9rZW5fMS5Ub2tlbi5JZGVudGlmaWVyOlxuXHQgICAgICAgICAgICAgICAgaWYgKHRoaXMuc291cmNlVHlwZSA9PT0gJ21vZHVsZScgJiYgdGhpcy5sb29rYWhlYWQudmFsdWUgPT09ICdhd2FpdCcpIHtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLnRvbGVyYXRlVW5leHBlY3RlZFRva2VuKHRoaXMubG9va2FoZWFkKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGV4cHIgPSB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBOb2RlLklkZW50aWZpZXIodGhpcy5uZXh0VG9rZW4oKS52YWx1ZSkpO1xuXHQgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgIGNhc2UgdG9rZW5fMS5Ub2tlbi5OdW1lcmljTGl0ZXJhbDpcblx0ICAgICAgICAgICAgY2FzZSB0b2tlbl8xLlRva2VuLlN0cmluZ0xpdGVyYWw6XG5cdCAgICAgICAgICAgICAgICBpZiAodGhpcy5jb250ZXh0LnN0cmljdCAmJiB0aGlzLmxvb2thaGVhZC5vY3RhbCkge1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMudG9sZXJhdGVVbmV4cGVjdGVkVG9rZW4odGhpcy5sb29rYWhlYWQsIG1lc3NhZ2VzXzEuTWVzc2FnZXMuU3RyaWN0T2N0YWxMaXRlcmFsKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5pc0Fzc2lnbm1lbnRUYXJnZXQgPSBmYWxzZTtcblx0ICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5pc0JpbmRpbmdFbGVtZW50ID0gZmFsc2U7XG5cdCAgICAgICAgICAgICAgICB0b2tlbiA9IHRoaXMubmV4dFRva2VuKCk7XG5cdCAgICAgICAgICAgICAgICByYXcgPSB0aGlzLmdldFRva2VuUmF3KHRva2VuKTtcblx0ICAgICAgICAgICAgICAgIGV4cHIgPSB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBOb2RlLkxpdGVyYWwodG9rZW4udmFsdWUsIHJhdykpO1xuXHQgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgIGNhc2UgdG9rZW5fMS5Ub2tlbi5Cb29sZWFuTGl0ZXJhbDpcblx0ICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5pc0Fzc2lnbm1lbnRUYXJnZXQgPSBmYWxzZTtcblx0ICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5pc0JpbmRpbmdFbGVtZW50ID0gZmFsc2U7XG5cdCAgICAgICAgICAgICAgICB0b2tlbiA9IHRoaXMubmV4dFRva2VuKCk7XG5cdCAgICAgICAgICAgICAgICB0b2tlbi52YWx1ZSA9ICh0b2tlbi52YWx1ZSA9PT0gJ3RydWUnKTtcblx0ICAgICAgICAgICAgICAgIHJhdyA9IHRoaXMuZ2V0VG9rZW5SYXcodG9rZW4pO1xuXHQgICAgICAgICAgICAgICAgZXhwciA9IHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuTGl0ZXJhbCh0b2tlbi52YWx1ZSwgcmF3KSk7XG5cdCAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgY2FzZSB0b2tlbl8xLlRva2VuLk51bGxMaXRlcmFsOlxuXHQgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmlzQXNzaWdubWVudFRhcmdldCA9IGZhbHNlO1xuXHQgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmlzQmluZGluZ0VsZW1lbnQgPSBmYWxzZTtcblx0ICAgICAgICAgICAgICAgIHRva2VuID0gdGhpcy5uZXh0VG9rZW4oKTtcblx0ICAgICAgICAgICAgICAgIHRva2VuLnZhbHVlID0gbnVsbDtcblx0ICAgICAgICAgICAgICAgIHJhdyA9IHRoaXMuZ2V0VG9rZW5SYXcodG9rZW4pO1xuXHQgICAgICAgICAgICAgICAgZXhwciA9IHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuTGl0ZXJhbCh0b2tlbi52YWx1ZSwgcmF3KSk7XG5cdCAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgY2FzZSB0b2tlbl8xLlRva2VuLlRlbXBsYXRlOlxuXHQgICAgICAgICAgICAgICAgZXhwciA9IHRoaXMucGFyc2VUZW1wbGF0ZUxpdGVyYWwoKTtcblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICBjYXNlIHRva2VuXzEuVG9rZW4uUHVuY3R1YXRvcjpcblx0ICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpcy5sb29rYWhlYWQudmFsdWU7XG5cdCAgICAgICAgICAgICAgICBzd2l0Y2ggKHZhbHVlKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgY2FzZSAnKCc6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5pc0JpbmRpbmdFbGVtZW50ID0gZmFsc2U7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGV4cHIgPSB0aGlzLmluaGVyaXRDb3ZlckdyYW1tYXIodGhpcy5wYXJzZUdyb3VwRXhwcmVzc2lvbik7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1snOlxuXHQgICAgICAgICAgICAgICAgICAgICAgICBleHByID0gdGhpcy5pbmhlcml0Q292ZXJHcmFtbWFyKHRoaXMucGFyc2VBcnJheUluaXRpYWxpemVyKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICAgICAgY2FzZSAneyc6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGV4cHIgPSB0aGlzLmluaGVyaXRDb3ZlckdyYW1tYXIodGhpcy5wYXJzZU9iamVjdEluaXRpYWxpemVyKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICAgICAgY2FzZSAnLyc6XG5cdCAgICAgICAgICAgICAgICAgICAgY2FzZSAnLz0nOlxuXHQgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuaXNBc3NpZ25tZW50VGFyZ2V0ID0gZmFsc2U7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5pc0JpbmRpbmdFbGVtZW50ID0gZmFsc2U7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nhbm5lci5pbmRleCA9IHRoaXMuc3RhcnRNYXJrZXIuaW5kZXg7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuID0gdGhpcy5uZXh0UmVnZXhUb2tlbigpO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICByYXcgPSB0aGlzLmdldFRva2VuUmF3KHRva2VuKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgZXhwciA9IHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuUmVnZXhMaXRlcmFsKHRva2VuLnZhbHVlLCByYXcsIHRva2VuLnJlZ2V4KSk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGhyb3dVbmV4cGVjdGVkVG9rZW4odGhpcy5uZXh0VG9rZW4oKSk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgY2FzZSB0b2tlbl8xLlRva2VuLktleXdvcmQ6XG5cdCAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY29udGV4dC5zdHJpY3QgJiYgdGhpcy5jb250ZXh0LmFsbG93WWllbGQgJiYgdGhpcy5tYXRjaEtleXdvcmQoJ3lpZWxkJykpIHtcblx0ICAgICAgICAgICAgICAgICAgICBleHByID0gdGhpcy5wYXJzZUlkZW50aWZpZXJOYW1lKCk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBlbHNlIGlmICghdGhpcy5jb250ZXh0LnN0cmljdCAmJiB0aGlzLm1hdGNoS2V5d29yZCgnbGV0JykpIHtcblx0ICAgICAgICAgICAgICAgICAgICBleHByID0gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5JZGVudGlmaWVyKHRoaXMubmV4dFRva2VuKCkudmFsdWUpKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5pc0Fzc2lnbm1lbnRUYXJnZXQgPSBmYWxzZTtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuaXNCaW5kaW5nRWxlbWVudCA9IGZhbHNlO1xuXHQgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1hdGNoS2V5d29yZCgnZnVuY3Rpb24nKSkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBleHByID0gdGhpcy5wYXJzZUZ1bmN0aW9uRXhwcmVzc2lvbigpO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLm1hdGNoS2V5d29yZCgndGhpcycpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dFRva2VuKCk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGV4cHIgPSB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBOb2RlLlRoaXNFeHByZXNzaW9uKCkpO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLm1hdGNoS2V5d29yZCgnY2xhc3MnKSkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBleHByID0gdGhpcy5wYXJzZUNsYXNzRXhwcmVzc2lvbigpO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50aHJvd1VuZXhwZWN0ZWRUb2tlbih0aGlzLm5leHRUb2tlbigpKTtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgZGVmYXVsdDpcblx0ICAgICAgICAgICAgICAgIHRoaXMudGhyb3dVbmV4cGVjdGVkVG9rZW4odGhpcy5uZXh0VG9rZW4oKSk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiBleHByO1xuXHQgICAgfTtcblx0ICAgIC8vIEVDTUEtMjYyIDEyLjIuNSBBcnJheSBJbml0aWFsaXplclxuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZVNwcmVhZEVsZW1lbnQgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoKTtcblx0ICAgICAgICB0aGlzLmV4cGVjdCgnLi4uJyk7XG5cdCAgICAgICAgdmFyIGFyZyA9IHRoaXMuaW5oZXJpdENvdmVyR3JhbW1hcih0aGlzLnBhcnNlQXNzaWdubWVudEV4cHJlc3Npb24pO1xuXHQgICAgICAgIHJldHVybiB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBOb2RlLlNwcmVhZEVsZW1lbnQoYXJnKSk7XG5cdCAgICB9O1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZUFycmF5SW5pdGlhbGl6ZXIgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoKTtcblx0ICAgICAgICB2YXIgZWxlbWVudHMgPSBbXTtcblx0ICAgICAgICB0aGlzLmV4cGVjdCgnWycpO1xuXHQgICAgICAgIHdoaWxlICghdGhpcy5tYXRjaCgnXScpKSB7XG5cdCAgICAgICAgICAgIGlmICh0aGlzLm1hdGNoKCcsJykpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMubmV4dFRva2VuKCk7XG5cdCAgICAgICAgICAgICAgICBlbGVtZW50cy5wdXNoKG51bGwpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMubWF0Y2goJy4uLicpKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IHRoaXMucGFyc2VTcHJlYWRFbGVtZW50KCk7XG5cdCAgICAgICAgICAgICAgICBpZiAoIXRoaXMubWF0Y2goJ10nKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5pc0Fzc2lnbm1lbnRUYXJnZXQgPSBmYWxzZTtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuaXNCaW5kaW5nRWxlbWVudCA9IGZhbHNlO1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuZXhwZWN0KCcsJyk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBlbGVtZW50cy5wdXNoKGVsZW1lbnQpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgZWxlbWVudHMucHVzaCh0aGlzLmluaGVyaXRDb3ZlckdyYW1tYXIodGhpcy5wYXJzZUFzc2lnbm1lbnRFeHByZXNzaW9uKSk7XG5cdCAgICAgICAgICAgICAgICBpZiAoIXRoaXMubWF0Y2goJ10nKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuZXhwZWN0KCcsJyk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgdGhpcy5leHBlY3QoJ10nKTtcblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5BcnJheUV4cHJlc3Npb24oZWxlbWVudHMpKTtcblx0ICAgIH07XG5cdCAgICAvLyBFQ01BLTI2MiAxMi4yLjYgT2JqZWN0IEluaXRpYWxpemVyXG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlUHJvcGVydHlNZXRob2QgPSBmdW5jdGlvbiAocGFyYW1zKSB7XG5cdCAgICAgICAgdGhpcy5jb250ZXh0LmlzQXNzaWdubWVudFRhcmdldCA9IGZhbHNlO1xuXHQgICAgICAgIHRoaXMuY29udGV4dC5pc0JpbmRpbmdFbGVtZW50ID0gZmFsc2U7XG5cdCAgICAgICAgdmFyIHByZXZpb3VzU3RyaWN0ID0gdGhpcy5jb250ZXh0LnN0cmljdDtcblx0ICAgICAgICB2YXIgYm9keSA9IHRoaXMuaXNvbGF0ZUNvdmVyR3JhbW1hcih0aGlzLnBhcnNlRnVuY3Rpb25Tb3VyY2VFbGVtZW50cyk7XG5cdCAgICAgICAgaWYgKHRoaXMuY29udGV4dC5zdHJpY3QgJiYgcGFyYW1zLmZpcnN0UmVzdHJpY3RlZCkge1xuXHQgICAgICAgICAgICB0aGlzLnRvbGVyYXRlVW5leHBlY3RlZFRva2VuKHBhcmFtcy5maXJzdFJlc3RyaWN0ZWQsIHBhcmFtcy5tZXNzYWdlKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYgKHRoaXMuY29udGV4dC5zdHJpY3QgJiYgcGFyYW1zLnN0cmljdGVkKSB7XG5cdCAgICAgICAgICAgIHRoaXMudG9sZXJhdGVVbmV4cGVjdGVkVG9rZW4ocGFyYW1zLnN0cmljdGVkLCBwYXJhbXMubWVzc2FnZSk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHRoaXMuY29udGV4dC5zdHJpY3QgPSBwcmV2aW91c1N0cmljdDtcblx0ICAgICAgICByZXR1cm4gYm9keTtcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlUHJvcGVydHlNZXRob2RGdW5jdGlvbiA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgaXNHZW5lcmF0b3IgPSBmYWxzZTtcblx0ICAgICAgICB2YXIgbm9kZSA9IHRoaXMuY3JlYXRlTm9kZSgpO1xuXHQgICAgICAgIHZhciBwcmV2aW91c0FsbG93WWllbGQgPSB0aGlzLmNvbnRleHQuYWxsb3dZaWVsZDtcblx0ICAgICAgICB0aGlzLmNvbnRleHQuYWxsb3dZaWVsZCA9IGZhbHNlO1xuXHQgICAgICAgIHZhciBwYXJhbXMgPSB0aGlzLnBhcnNlRm9ybWFsUGFyYW1ldGVycygpO1xuXHQgICAgICAgIHZhciBtZXRob2QgPSB0aGlzLnBhcnNlUHJvcGVydHlNZXRob2QocGFyYW1zKTtcblx0ICAgICAgICB0aGlzLmNvbnRleHQuYWxsb3dZaWVsZCA9IHByZXZpb3VzQWxsb3dZaWVsZDtcblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5GdW5jdGlvbkV4cHJlc3Npb24obnVsbCwgcGFyYW1zLnBhcmFtcywgbWV0aG9kLCBpc0dlbmVyYXRvcikpO1xuXHQgICAgfTtcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VPYmplY3RQcm9wZXJ0eUtleSA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgbm9kZSA9IHRoaXMuY3JlYXRlTm9kZSgpO1xuXHQgICAgICAgIHZhciB0b2tlbiA9IHRoaXMubmV4dFRva2VuKCk7XG5cdCAgICAgICAgdmFyIGtleSA9IG51bGw7XG5cdCAgICAgICAgc3dpdGNoICh0b2tlbi50eXBlKSB7XG5cdCAgICAgICAgICAgIGNhc2UgdG9rZW5fMS5Ub2tlbi5TdHJpbmdMaXRlcmFsOlxuXHQgICAgICAgICAgICBjYXNlIHRva2VuXzEuVG9rZW4uTnVtZXJpY0xpdGVyYWw6XG5cdCAgICAgICAgICAgICAgICBpZiAodGhpcy5jb250ZXh0LnN0cmljdCAmJiB0b2tlbi5vY3RhbCkge1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMudG9sZXJhdGVVbmV4cGVjdGVkVG9rZW4odG9rZW4sIG1lc3NhZ2VzXzEuTWVzc2FnZXMuU3RyaWN0T2N0YWxMaXRlcmFsKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIHZhciByYXcgPSB0aGlzLmdldFRva2VuUmF3KHRva2VuKTtcblx0ICAgICAgICAgICAgICAgIGtleSA9IHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuTGl0ZXJhbCh0b2tlbi52YWx1ZSwgcmF3KSk7XG5cdCAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgY2FzZSB0b2tlbl8xLlRva2VuLklkZW50aWZpZXI6XG5cdCAgICAgICAgICAgIGNhc2UgdG9rZW5fMS5Ub2tlbi5Cb29sZWFuTGl0ZXJhbDpcblx0ICAgICAgICAgICAgY2FzZSB0b2tlbl8xLlRva2VuLk51bGxMaXRlcmFsOlxuXHQgICAgICAgICAgICBjYXNlIHRva2VuXzEuVG9rZW4uS2V5d29yZDpcblx0ICAgICAgICAgICAgICAgIGtleSA9IHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuSWRlbnRpZmllcih0b2tlbi52YWx1ZSkpO1xuXHQgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgIGNhc2UgdG9rZW5fMS5Ub2tlbi5QdW5jdHVhdG9yOlxuXHQgICAgICAgICAgICAgICAgaWYgKHRva2VuLnZhbHVlID09PSAnWycpIHtcblx0ICAgICAgICAgICAgICAgICAgICBrZXkgPSB0aGlzLmlzb2xhdGVDb3ZlckdyYW1tYXIodGhpcy5wYXJzZUFzc2lnbm1lbnRFeHByZXNzaW9uKTtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLmV4cGVjdCgnXScpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy50aHJvd1VuZXhwZWN0ZWRUb2tlbih0b2tlbik7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgZGVmYXVsdDpcblx0ICAgICAgICAgICAgICAgIHRoaXMudGhyb3dVbmV4cGVjdGVkVG9rZW4odG9rZW4pO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4ga2V5O1xuXHQgICAgfTtcblx0ICAgIFBhcnNlci5wcm90b3R5cGUuaXNQcm9wZXJ0eUtleSA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG5cdCAgICAgICAgcmV0dXJuIChrZXkudHlwZSA9PT0gc3ludGF4XzEuU3ludGF4LklkZW50aWZpZXIgJiYga2V5Lm5hbWUgPT09IHZhbHVlKSB8fFxuXHQgICAgICAgICAgICAoa2V5LnR5cGUgPT09IHN5bnRheF8xLlN5bnRheC5MaXRlcmFsICYmIGtleS52YWx1ZSA9PT0gdmFsdWUpO1xuXHQgICAgfTtcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VPYmplY3RQcm9wZXJ0eSA9IGZ1bmN0aW9uIChoYXNQcm90bykge1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgdmFyIHRva2VuID0gdGhpcy5sb29rYWhlYWQ7XG5cdCAgICAgICAgdmFyIGtpbmQ7XG5cdCAgICAgICAgdmFyIGtleTtcblx0ICAgICAgICB2YXIgdmFsdWU7XG5cdCAgICAgICAgdmFyIGNvbXB1dGVkID0gZmFsc2U7XG5cdCAgICAgICAgdmFyIG1ldGhvZCA9IGZhbHNlO1xuXHQgICAgICAgIHZhciBzaG9ydGhhbmQgPSBmYWxzZTtcblx0ICAgICAgICBpZiAodG9rZW4udHlwZSA9PT0gdG9rZW5fMS5Ub2tlbi5JZGVudGlmaWVyKSB7XG5cdCAgICAgICAgICAgIHRoaXMubmV4dFRva2VuKCk7XG5cdCAgICAgICAgICAgIGtleSA9IHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuSWRlbnRpZmllcih0b2tlbi52YWx1ZSkpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIGlmICh0aGlzLm1hdGNoKCcqJykpIHtcblx0ICAgICAgICAgICAgdGhpcy5uZXh0VG9rZW4oKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgIGNvbXB1dGVkID0gdGhpcy5tYXRjaCgnWycpO1xuXHQgICAgICAgICAgICBrZXkgPSB0aGlzLnBhcnNlT2JqZWN0UHJvcGVydHlLZXkoKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIGxvb2thaGVhZFByb3BlcnR5S2V5ID0gdGhpcy5xdWFsaWZpZWRQcm9wZXJ0eU5hbWUodGhpcy5sb29rYWhlYWQpO1xuXHQgICAgICAgIGlmICh0b2tlbi50eXBlID09PSB0b2tlbl8xLlRva2VuLklkZW50aWZpZXIgJiYgdG9rZW4udmFsdWUgPT09ICdnZXQnICYmIGxvb2thaGVhZFByb3BlcnR5S2V5KSB7XG5cdCAgICAgICAgICAgIGtpbmQgPSAnZ2V0Jztcblx0ICAgICAgICAgICAgY29tcHV0ZWQgPSB0aGlzLm1hdGNoKCdbJyk7XG5cdCAgICAgICAgICAgIGtleSA9IHRoaXMucGFyc2VPYmplY3RQcm9wZXJ0eUtleSgpO1xuXHQgICAgICAgICAgICB0aGlzLmNvbnRleHQuYWxsb3dZaWVsZCA9IGZhbHNlO1xuXHQgICAgICAgICAgICB2YWx1ZSA9IHRoaXMucGFyc2VHZXR0ZXJNZXRob2QoKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gdG9rZW5fMS5Ub2tlbi5JZGVudGlmaWVyICYmIHRva2VuLnZhbHVlID09PSAnc2V0JyAmJiBsb29rYWhlYWRQcm9wZXJ0eUtleSkge1xuXHQgICAgICAgICAgICBraW5kID0gJ3NldCc7XG5cdCAgICAgICAgICAgIGNvbXB1dGVkID0gdGhpcy5tYXRjaCgnWycpO1xuXHQgICAgICAgICAgICBrZXkgPSB0aGlzLnBhcnNlT2JqZWN0UHJvcGVydHlLZXkoKTtcblx0ICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnBhcnNlU2V0dGVyTWV0aG9kKCk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGVsc2UgaWYgKHRva2VuLnR5cGUgPT09IHRva2VuXzEuVG9rZW4uUHVuY3R1YXRvciAmJiB0b2tlbi52YWx1ZSA9PT0gJyonICYmIGxvb2thaGVhZFByb3BlcnR5S2V5KSB7XG5cdCAgICAgICAgICAgIGtpbmQgPSAnaW5pdCc7XG5cdCAgICAgICAgICAgIGNvbXB1dGVkID0gdGhpcy5tYXRjaCgnWycpO1xuXHQgICAgICAgICAgICBrZXkgPSB0aGlzLnBhcnNlT2JqZWN0UHJvcGVydHlLZXkoKTtcblx0ICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnBhcnNlR2VuZXJhdG9yTWV0aG9kKCk7XG5cdCAgICAgICAgICAgIG1ldGhvZCA9IHRydWU7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICBpZiAoIWtleSkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy50aHJvd1VuZXhwZWN0ZWRUb2tlbih0aGlzLmxvb2thaGVhZCk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAga2luZCA9ICdpbml0Jztcblx0ICAgICAgICAgICAgaWYgKHRoaXMubWF0Y2goJzonKSkge1xuXHQgICAgICAgICAgICAgICAgaWYgKCFjb21wdXRlZCAmJiB0aGlzLmlzUHJvcGVydHlLZXkoa2V5LCAnX19wcm90b19fJykpIHtcblx0ICAgICAgICAgICAgICAgICAgICBpZiAoaGFzUHJvdG8udmFsdWUpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b2xlcmF0ZUVycm9yKG1lc3NhZ2VzXzEuTWVzc2FnZXMuRHVwbGljYXRlUHJvdG9Qcm9wZXJ0eSk7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgIGhhc1Byb3RvLnZhbHVlID0gdHJ1ZTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIHRoaXMubmV4dFRva2VuKCk7XG5cdCAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMuaW5oZXJpdENvdmVyR3JhbW1hcih0aGlzLnBhcnNlQXNzaWdubWVudEV4cHJlc3Npb24pO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMubWF0Y2goJygnKSkge1xuXHQgICAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnBhcnNlUHJvcGVydHlNZXRob2RGdW5jdGlvbigpO1xuXHQgICAgICAgICAgICAgICAgbWV0aG9kID0gdHJ1ZTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBlbHNlIGlmICh0b2tlbi50eXBlID09PSB0b2tlbl8xLlRva2VuLklkZW50aWZpZXIpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBpZCA9IHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuSWRlbnRpZmllcih0b2tlbi52YWx1ZSkpO1xuXHQgICAgICAgICAgICAgICAgaWYgKHRoaXMubWF0Y2goJz0nKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5maXJzdENvdmVySW5pdGlhbGl6ZWROYW1lRXJyb3IgPSB0aGlzLmxvb2thaGVhZDtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgICAgICAgICAgICAgIHNob3J0aGFuZCA9IHRydWU7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGluaXQgPSB0aGlzLmlzb2xhdGVDb3ZlckdyYW1tYXIodGhpcy5wYXJzZUFzc2lnbm1lbnRFeHByZXNzaW9uKTtcblx0ICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuQXNzaWdubWVudFBhdHRlcm4oaWQsIGluaXQpKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgIHNob3J0aGFuZCA9IHRydWU7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBpZDtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMudGhyb3dVbmV4cGVjdGVkVG9rZW4odGhpcy5uZXh0VG9rZW4oKSk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuUHJvcGVydHkoa2luZCwga2V5LCBjb21wdXRlZCwgdmFsdWUsIG1ldGhvZCwgc2hvcnRoYW5kKSk7XG5cdCAgICB9O1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZU9iamVjdEluaXRpYWxpemVyID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgdGhpcy5leHBlY3QoJ3snKTtcblx0ICAgICAgICB2YXIgcHJvcGVydGllcyA9IFtdO1xuXHQgICAgICAgIHZhciBoYXNQcm90byA9IHsgdmFsdWU6IGZhbHNlIH07XG5cdCAgICAgICAgd2hpbGUgKCF0aGlzLm1hdGNoKCd9JykpIHtcblx0ICAgICAgICAgICAgcHJvcGVydGllcy5wdXNoKHRoaXMucGFyc2VPYmplY3RQcm9wZXJ0eShoYXNQcm90bykpO1xuXHQgICAgICAgICAgICBpZiAoIXRoaXMubWF0Y2goJ30nKSkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy5leHBlY3RDb21tYVNlcGFyYXRvcigpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHRoaXMuZXhwZWN0KCd9Jyk7XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuT2JqZWN0RXhwcmVzc2lvbihwcm9wZXJ0aWVzKSk7XG5cdCAgICB9O1xuXHQgICAgLy8gRUNNQS0yNjIgMTIuMi45IFRlbXBsYXRlIExpdGVyYWxzXG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlVGVtcGxhdGVIZWFkID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGFzc2VydF8xLmFzc2VydCh0aGlzLmxvb2thaGVhZC5oZWFkLCAnVGVtcGxhdGUgbGl0ZXJhbCBtdXN0IHN0YXJ0IHdpdGggYSB0ZW1wbGF0ZSBoZWFkJyk7XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoKTtcblx0ICAgICAgICB2YXIgdG9rZW4gPSB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgIHZhciB2YWx1ZSA9IHtcblx0ICAgICAgICAgICAgcmF3OiB0b2tlbi52YWx1ZS5yYXcsXG5cdCAgICAgICAgICAgIGNvb2tlZDogdG9rZW4udmFsdWUuY29va2VkXG5cdCAgICAgICAgfTtcblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5UZW1wbGF0ZUVsZW1lbnQodmFsdWUsIHRva2VuLnRhaWwpKTtcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlVGVtcGxhdGVFbGVtZW50ID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGlmICh0aGlzLmxvb2thaGVhZC50eXBlICE9PSB0b2tlbl8xLlRva2VuLlRlbXBsYXRlKSB7XG5cdCAgICAgICAgICAgIHRoaXMudGhyb3dVbmV4cGVjdGVkVG9rZW4oKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoKTtcblx0ICAgICAgICB2YXIgdG9rZW4gPSB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgIHZhciB2YWx1ZSA9IHtcblx0ICAgICAgICAgICAgcmF3OiB0b2tlbi52YWx1ZS5yYXcsXG5cdCAgICAgICAgICAgIGNvb2tlZDogdG9rZW4udmFsdWUuY29va2VkXG5cdCAgICAgICAgfTtcblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5UZW1wbGF0ZUVsZW1lbnQodmFsdWUsIHRva2VuLnRhaWwpKTtcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlVGVtcGxhdGVMaXRlcmFsID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgdmFyIGV4cHJlc3Npb25zID0gW107XG5cdCAgICAgICAgdmFyIHF1YXNpcyA9IFtdO1xuXHQgICAgICAgIHZhciBxdWFzaSA9IHRoaXMucGFyc2VUZW1wbGF0ZUhlYWQoKTtcblx0ICAgICAgICBxdWFzaXMucHVzaChxdWFzaSk7XG5cdCAgICAgICAgd2hpbGUgKCFxdWFzaS50YWlsKSB7XG5cdCAgICAgICAgICAgIGV4cHJlc3Npb25zLnB1c2godGhpcy5wYXJzZUV4cHJlc3Npb24oKSk7XG5cdCAgICAgICAgICAgIHF1YXNpID0gdGhpcy5wYXJzZVRlbXBsYXRlRWxlbWVudCgpO1xuXHQgICAgICAgICAgICBxdWFzaXMucHVzaChxdWFzaSk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBOb2RlLlRlbXBsYXRlTGl0ZXJhbChxdWFzaXMsIGV4cHJlc3Npb25zKSk7XG5cdCAgICB9O1xuXHQgICAgLy8gRUNNQS0yNjIgMTIuMi4xMCBUaGUgR3JvdXBpbmcgT3BlcmF0b3Jcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucmVpbnRlcnByZXRFeHByZXNzaW9uQXNQYXR0ZXJuID0gZnVuY3Rpb24gKGV4cHIpIHtcblx0ICAgICAgICBzd2l0Y2ggKGV4cHIudHlwZSkge1xuXHQgICAgICAgICAgICBjYXNlIHN5bnRheF8xLlN5bnRheC5JZGVudGlmaWVyOlxuXHQgICAgICAgICAgICBjYXNlIHN5bnRheF8xLlN5bnRheC5NZW1iZXJFeHByZXNzaW9uOlxuXHQgICAgICAgICAgICBjYXNlIHN5bnRheF8xLlN5bnRheC5SZXN0RWxlbWVudDpcblx0ICAgICAgICAgICAgY2FzZSBzeW50YXhfMS5TeW50YXguQXNzaWdubWVudFBhdHRlcm46XG5cdCAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgY2FzZSBzeW50YXhfMS5TeW50YXguU3ByZWFkRWxlbWVudDpcblx0ICAgICAgICAgICAgICAgIGV4cHIudHlwZSA9IHN5bnRheF8xLlN5bnRheC5SZXN0RWxlbWVudDtcblx0ICAgICAgICAgICAgICAgIHRoaXMucmVpbnRlcnByZXRFeHByZXNzaW9uQXNQYXR0ZXJuKGV4cHIuYXJndW1lbnQpO1xuXHQgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgIGNhc2Ugc3ludGF4XzEuU3ludGF4LkFycmF5RXhwcmVzc2lvbjpcblx0ICAgICAgICAgICAgICAgIGV4cHIudHlwZSA9IHN5bnRheF8xLlN5bnRheC5BcnJheVBhdHRlcm47XG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV4cHIuZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgICAgICBpZiAoZXhwci5lbGVtZW50c1tpXSAhPT0gbnVsbCkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlaW50ZXJwcmV0RXhwcmVzc2lvbkFzUGF0dGVybihleHByLmVsZW1lbnRzW2ldKTtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgY2FzZSBzeW50YXhfMS5TeW50YXguT2JqZWN0RXhwcmVzc2lvbjpcblx0ICAgICAgICAgICAgICAgIGV4cHIudHlwZSA9IHN5bnRheF8xLlN5bnRheC5PYmplY3RQYXR0ZXJuO1xuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHByLnByb3BlcnRpZXMubGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLnJlaW50ZXJwcmV0RXhwcmVzc2lvbkFzUGF0dGVybihleHByLnByb3BlcnRpZXNbaV0udmFsdWUpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgIGNhc2Ugc3ludGF4XzEuU3ludGF4LkFzc2lnbm1lbnRFeHByZXNzaW9uOlxuXHQgICAgICAgICAgICAgICAgZXhwci50eXBlID0gc3ludGF4XzEuU3ludGF4LkFzc2lnbm1lbnRQYXR0ZXJuO1xuXHQgICAgICAgICAgICAgICAgZGVsZXRlIGV4cHIub3BlcmF0b3I7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnJlaW50ZXJwcmV0RXhwcmVzc2lvbkFzUGF0dGVybihleHByLmxlZnQpO1xuXHQgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgIGRlZmF1bHQ6XG5cdCAgICAgICAgICAgICAgICAvLyBBbGxvdyBvdGhlciBub2RlIHR5cGUgZm9yIHRvbGVyYW50IHBhcnNpbmcuXG5cdCAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZUdyb3VwRXhwcmVzc2lvbiA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgZXhwcjtcblx0ICAgICAgICB0aGlzLmV4cGVjdCgnKCcpO1xuXHQgICAgICAgIGlmICh0aGlzLm1hdGNoKCcpJykpIHtcblx0ICAgICAgICAgICAgdGhpcy5uZXh0VG9rZW4oKTtcblx0ICAgICAgICAgICAgaWYgKCF0aGlzLm1hdGNoKCc9PicpKSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLmV4cGVjdCgnPT4nKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBleHByID0ge1xuXHQgICAgICAgICAgICAgICAgdHlwZTogQXJyb3dQYXJhbWV0ZXJQbGFjZUhvbGRlcixcblx0ICAgICAgICAgICAgICAgIHBhcmFtczogW11cblx0ICAgICAgICAgICAgfTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgIHZhciBzdGFydFRva2VuID0gdGhpcy5sb29rYWhlYWQ7XG5cdCAgICAgICAgICAgIHZhciBwYXJhbXMgPSBbXTtcblx0ICAgICAgICAgICAgaWYgKHRoaXMubWF0Y2goJy4uLicpKSB7XG5cdCAgICAgICAgICAgICAgICBleHByID0gdGhpcy5wYXJzZVJlc3RFbGVtZW50KHBhcmFtcyk7XG5cdCAgICAgICAgICAgICAgICB0aGlzLmV4cGVjdCgnKScpO1xuXHQgICAgICAgICAgICAgICAgaWYgKCF0aGlzLm1hdGNoKCc9PicpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5leHBlY3QoJz0+Jyk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBleHByID0ge1xuXHQgICAgICAgICAgICAgICAgICAgIHR5cGU6IEFycm93UGFyYW1ldGVyUGxhY2VIb2xkZXIsXG5cdCAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiBbZXhwcl1cblx0ICAgICAgICAgICAgICAgIH07XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgYXJyb3cgPSBmYWxzZTtcblx0ICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5pc0JpbmRpbmdFbGVtZW50ID0gdHJ1ZTtcblx0ICAgICAgICAgICAgICAgIGV4cHIgPSB0aGlzLmluaGVyaXRDb3ZlckdyYW1tYXIodGhpcy5wYXJzZUFzc2lnbm1lbnRFeHByZXNzaW9uKTtcblx0ICAgICAgICAgICAgICAgIGlmICh0aGlzLm1hdGNoKCcsJykpIHtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZXhwcmVzc2lvbnMgPSBbXTtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuaXNBc3NpZ25tZW50VGFyZ2V0ID0gZmFsc2U7XG5cdCAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbnMucHVzaChleHByKTtcblx0ICAgICAgICAgICAgICAgICAgICB3aGlsZSAodGhpcy5zdGFydE1hcmtlci5pbmRleCA8IHRoaXMuc2Nhbm5lci5sZW5ndGgpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLm1hdGNoKCcsJykpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dFRva2VuKCk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1hdGNoKCcuLi4nKSkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNvbnRleHQuaXNCaW5kaW5nRWxlbWVudCkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGhyb3dVbmV4cGVjdGVkVG9rZW4odGhpcy5sb29rYWhlYWQpO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbnMucHVzaCh0aGlzLnBhcnNlUmVzdEVsZW1lbnQocGFyYW1zKSk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV4cGVjdCgnKScpO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLm1hdGNoKCc9PicpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5leHBlY3QoJz0+Jyk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuaXNCaW5kaW5nRWxlbWVudCA9IGZhbHNlO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHByZXNzaW9ucy5sZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVpbnRlcnByZXRFeHByZXNzaW9uQXNQYXR0ZXJuKGV4cHJlc3Npb25zW2ldKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycm93ID0gdHJ1ZTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cHIgPSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogQXJyb3dQYXJhbWV0ZXJQbGFjZUhvbGRlcixcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IGV4cHJlc3Npb25zXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbnMucHVzaCh0aGlzLmluaGVyaXRDb3ZlckdyYW1tYXIodGhpcy5wYXJzZUFzc2lnbm1lbnRFeHByZXNzaW9uKSk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFycm93KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICBpZiAoIWFycm93KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGV4cHIgPSB0aGlzLmZpbmFsaXplKHRoaXMuc3RhcnROb2RlKHN0YXJ0VG9rZW4pLCBuZXcgTm9kZS5TZXF1ZW5jZUV4cHJlc3Npb24oZXhwcmVzc2lvbnMpKTtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBpZiAoIWFycm93KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5leHBlY3QoJyknKTtcblx0ICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXRjaCgnPT4nKSkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXhwci50eXBlID09PSBzeW50YXhfMS5TeW50YXguSWRlbnRpZmllciAmJiBleHByLm5hbWUgPT09ICd5aWVsZCcpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycm93ID0gdHJ1ZTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cHIgPSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogQXJyb3dQYXJhbWV0ZXJQbGFjZUhvbGRlcixcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IFtleHByXVxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWFycm93KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY29udGV4dC5pc0JpbmRpbmdFbGVtZW50KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50aHJvd1VuZXhwZWN0ZWRUb2tlbih0aGlzLmxvb2thaGVhZCk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXhwci50eXBlID09PSBzeW50YXhfMS5TeW50YXguU2VxdWVuY2VFeHByZXNzaW9uKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHByLmV4cHJlc3Npb25zLmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVpbnRlcnByZXRFeHByZXNzaW9uQXNQYXR0ZXJuKGV4cHIuZXhwcmVzc2lvbnNbaV0pO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVpbnRlcnByZXRFeHByZXNzaW9uQXNQYXR0ZXJuKGV4cHIpO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmFtc18xID0gKGV4cHIudHlwZSA9PT0gc3ludGF4XzEuU3ludGF4LlNlcXVlbmNlRXhwcmVzc2lvbiA/IGV4cHIuZXhwcmVzc2lvbnMgOiBbZXhwcl0pO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwciA9IHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBBcnJvd1BhcmFtZXRlclBsYWNlSG9sZGVyLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtczogcGFyYW1zXzFcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmlzQmluZGluZ0VsZW1lbnQgPSBmYWxzZTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gZXhwcjtcblx0ICAgIH07XG5cdCAgICAvLyBFQ01BLTI2MiAxMi4zIExlZnQtSGFuZC1TaWRlIEV4cHJlc3Npb25zXG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlQXJndW1lbnRzID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHRoaXMuZXhwZWN0KCcoJyk7XG5cdCAgICAgICAgdmFyIGFyZ3MgPSBbXTtcblx0ICAgICAgICBpZiAoIXRoaXMubWF0Y2goJyknKSkge1xuXHQgICAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xuXHQgICAgICAgICAgICAgICAgdmFyIGV4cHIgPSB0aGlzLm1hdGNoKCcuLi4nKSA/IHRoaXMucGFyc2VTcHJlYWRFbGVtZW50KCkgOlxuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNvbGF0ZUNvdmVyR3JhbW1hcih0aGlzLnBhcnNlQXNzaWdubWVudEV4cHJlc3Npb24pO1xuXHQgICAgICAgICAgICAgICAgYXJncy5wdXNoKGV4cHIpO1xuXHQgICAgICAgICAgICAgICAgaWYgKHRoaXMubWF0Y2goJyknKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgdGhpcy5leHBlY3RDb21tYVNlcGFyYXRvcigpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHRoaXMuZXhwZWN0KCcpJyk7XG5cdCAgICAgICAgcmV0dXJuIGFyZ3M7XG5cdCAgICB9O1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5pc0lkZW50aWZpZXJOYW1lID0gZnVuY3Rpb24gKHRva2VuKSB7XG5cdCAgICAgICAgcmV0dXJuIHRva2VuLnR5cGUgPT09IHRva2VuXzEuVG9rZW4uSWRlbnRpZmllciB8fFxuXHQgICAgICAgICAgICB0b2tlbi50eXBlID09PSB0b2tlbl8xLlRva2VuLktleXdvcmQgfHxcblx0ICAgICAgICAgICAgdG9rZW4udHlwZSA9PT0gdG9rZW5fMS5Ub2tlbi5Cb29sZWFuTGl0ZXJhbCB8fFxuXHQgICAgICAgICAgICB0b2tlbi50eXBlID09PSB0b2tlbl8xLlRva2VuLk51bGxMaXRlcmFsO1xuXHQgICAgfTtcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VJZGVudGlmaWVyTmFtZSA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgbm9kZSA9IHRoaXMuY3JlYXRlTm9kZSgpO1xuXHQgICAgICAgIHZhciB0b2tlbiA9IHRoaXMubmV4dFRva2VuKCk7XG5cdCAgICAgICAgaWYgKCF0aGlzLmlzSWRlbnRpZmllck5hbWUodG9rZW4pKSB7XG5cdCAgICAgICAgICAgIHRoaXMudGhyb3dVbmV4cGVjdGVkVG9rZW4odG9rZW4pO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5JZGVudGlmaWVyKHRva2VuLnZhbHVlKSk7XG5cdCAgICB9O1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZU5ld0V4cHJlc3Npb24gPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoKTtcblx0ICAgICAgICB2YXIgaWQgPSB0aGlzLnBhcnNlSWRlbnRpZmllck5hbWUoKTtcblx0ICAgICAgICBhc3NlcnRfMS5hc3NlcnQoaWQubmFtZSA9PT0gJ25ldycsICdOZXcgZXhwcmVzc2lvbiBtdXN0IHN0YXJ0IHdpdGggYG5ld2AnKTtcblx0ICAgICAgICB2YXIgZXhwcjtcblx0ICAgICAgICBpZiAodGhpcy5tYXRjaCgnLicpKSB7XG5cdCAgICAgICAgICAgIHRoaXMubmV4dFRva2VuKCk7XG5cdCAgICAgICAgICAgIGlmICh0aGlzLmxvb2thaGVhZC50eXBlID09PSB0b2tlbl8xLlRva2VuLklkZW50aWZpZXIgJiYgdGhpcy5jb250ZXh0LmluRnVuY3Rpb25Cb2R5ICYmIHRoaXMubG9va2FoZWFkLnZhbHVlID09PSAndGFyZ2V0Jykge1xuXHQgICAgICAgICAgICAgICAgdmFyIHByb3BlcnR5ID0gdGhpcy5wYXJzZUlkZW50aWZpZXJOYW1lKCk7XG5cdCAgICAgICAgICAgICAgICBleHByID0gbmV3IE5vZGUuTWV0YVByb3BlcnR5KGlkLCBwcm9wZXJ0eSk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnRocm93VW5leHBlY3RlZFRva2VuKHRoaXMubG9va2FoZWFkKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgdmFyIGNhbGxlZSA9IHRoaXMuaXNvbGF0ZUNvdmVyR3JhbW1hcih0aGlzLnBhcnNlTGVmdEhhbmRTaWRlRXhwcmVzc2lvbik7XG5cdCAgICAgICAgICAgIHZhciBhcmdzID0gdGhpcy5tYXRjaCgnKCcpID8gdGhpcy5wYXJzZUFyZ3VtZW50cygpIDogW107XG5cdCAgICAgICAgICAgIGV4cHIgPSBuZXcgTm9kZS5OZXdFeHByZXNzaW9uKGNhbGxlZSwgYXJncyk7XG5cdCAgICAgICAgICAgIHRoaXMuY29udGV4dC5pc0Fzc2lnbm1lbnRUYXJnZXQgPSBmYWxzZTtcblx0ICAgICAgICAgICAgdGhpcy5jb250ZXh0LmlzQmluZGluZ0VsZW1lbnQgPSBmYWxzZTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuZmluYWxpemUobm9kZSwgZXhwcik7XG5cdCAgICB9O1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZUxlZnRIYW5kU2lkZUV4cHJlc3Npb25BbGxvd0NhbGwgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIHN0YXJ0VG9rZW4gPSB0aGlzLmxvb2thaGVhZDtcblx0ICAgICAgICB2YXIgcHJldmlvdXNBbGxvd0luID0gdGhpcy5jb250ZXh0LmFsbG93SW47XG5cdCAgICAgICAgdGhpcy5jb250ZXh0LmFsbG93SW4gPSB0cnVlO1xuXHQgICAgICAgIHZhciBleHByO1xuXHQgICAgICAgIGlmICh0aGlzLm1hdGNoS2V5d29yZCgnc3VwZXInKSAmJiB0aGlzLmNvbnRleHQuaW5GdW5jdGlvbkJvZHkpIHtcblx0ICAgICAgICAgICAgZXhwciA9IHRoaXMuY3JlYXRlTm9kZSgpO1xuXHQgICAgICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgICAgICBleHByID0gdGhpcy5maW5hbGl6ZShleHByLCBuZXcgTm9kZS5TdXBlcigpKTtcblx0ICAgICAgICAgICAgaWYgKCF0aGlzLm1hdGNoKCcoJykgJiYgIXRoaXMubWF0Y2goJy4nKSAmJiAhdGhpcy5tYXRjaCgnWycpKSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnRocm93VW5leHBlY3RlZFRva2VuKHRoaXMubG9va2FoZWFkKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgZXhwciA9IHRoaXMuaW5oZXJpdENvdmVyR3JhbW1hcih0aGlzLm1hdGNoS2V5d29yZCgnbmV3JykgPyB0aGlzLnBhcnNlTmV3RXhwcmVzc2lvbiA6IHRoaXMucGFyc2VQcmltYXJ5RXhwcmVzc2lvbik7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHdoaWxlICh0cnVlKSB7XG5cdCAgICAgICAgICAgIGlmICh0aGlzLm1hdGNoKCcuJykpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5pc0JpbmRpbmdFbGVtZW50ID0gZmFsc2U7XG5cdCAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuaXNBc3NpZ25tZW50VGFyZ2V0ID0gdHJ1ZTtcblx0ICAgICAgICAgICAgICAgIHRoaXMuZXhwZWN0KCcuJyk7XG5cdCAgICAgICAgICAgICAgICB2YXIgcHJvcGVydHkgPSB0aGlzLnBhcnNlSWRlbnRpZmllck5hbWUoKTtcblx0ICAgICAgICAgICAgICAgIGV4cHIgPSB0aGlzLmZpbmFsaXplKHRoaXMuc3RhcnROb2RlKHN0YXJ0VG9rZW4pLCBuZXcgTm9kZS5TdGF0aWNNZW1iZXJFeHByZXNzaW9uKGV4cHIsIHByb3BlcnR5KSk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5tYXRjaCgnKCcpKSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuaXNCaW5kaW5nRWxlbWVudCA9IGZhbHNlO1xuXHQgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmlzQXNzaWdubWVudFRhcmdldCA9IGZhbHNlO1xuXHQgICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSB0aGlzLnBhcnNlQXJndW1lbnRzKCk7XG5cdCAgICAgICAgICAgICAgICBleHByID0gdGhpcy5maW5hbGl6ZSh0aGlzLnN0YXJ0Tm9kZShzdGFydFRva2VuKSwgbmV3IE5vZGUuQ2FsbEV4cHJlc3Npb24oZXhwciwgYXJncykpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMubWF0Y2goJ1snKSkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmlzQmluZGluZ0VsZW1lbnQgPSBmYWxzZTtcblx0ICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5pc0Fzc2lnbm1lbnRUYXJnZXQgPSB0cnVlO1xuXHQgICAgICAgICAgICAgICAgdGhpcy5leHBlY3QoJ1snKTtcblx0ICAgICAgICAgICAgICAgIHZhciBwcm9wZXJ0eSA9IHRoaXMuaXNvbGF0ZUNvdmVyR3JhbW1hcih0aGlzLnBhcnNlRXhwcmVzc2lvbik7XG5cdCAgICAgICAgICAgICAgICB0aGlzLmV4cGVjdCgnXScpO1xuXHQgICAgICAgICAgICAgICAgZXhwciA9IHRoaXMuZmluYWxpemUodGhpcy5zdGFydE5vZGUoc3RhcnRUb2tlbiksIG5ldyBOb2RlLkNvbXB1dGVkTWVtYmVyRXhwcmVzc2lvbihleHByLCBwcm9wZXJ0eSkpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMubG9va2FoZWFkLnR5cGUgPT09IHRva2VuXzEuVG9rZW4uVGVtcGxhdGUgJiYgdGhpcy5sb29rYWhlYWQuaGVhZCkge1xuXHQgICAgICAgICAgICAgICAgdmFyIHF1YXNpID0gdGhpcy5wYXJzZVRlbXBsYXRlTGl0ZXJhbCgpO1xuXHQgICAgICAgICAgICAgICAgZXhwciA9IHRoaXMuZmluYWxpemUodGhpcy5zdGFydE5vZGUoc3RhcnRUb2tlbiksIG5ldyBOb2RlLlRhZ2dlZFRlbXBsYXRlRXhwcmVzc2lvbihleHByLCBxdWFzaSkpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgdGhpcy5jb250ZXh0LmFsbG93SW4gPSBwcmV2aW91c0FsbG93SW47XG5cdCAgICAgICAgcmV0dXJuIGV4cHI7XG5cdCAgICB9O1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZVN1cGVyID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgdGhpcy5leHBlY3RLZXl3b3JkKCdzdXBlcicpO1xuXHQgICAgICAgIGlmICghdGhpcy5tYXRjaCgnWycpICYmICF0aGlzLm1hdGNoKCcuJykpIHtcblx0ICAgICAgICAgICAgdGhpcy50aHJvd1VuZXhwZWN0ZWRUb2tlbih0aGlzLmxvb2thaGVhZCk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBOb2RlLlN1cGVyKCkpO1xuXHQgICAgfTtcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VMZWZ0SGFuZFNpZGVFeHByZXNzaW9uID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGFzc2VydF8xLmFzc2VydCh0aGlzLmNvbnRleHQuYWxsb3dJbiwgJ2NhbGxlZSBvZiBuZXcgZXhwcmVzc2lvbiBhbHdheXMgYWxsb3cgaW4ga2V5d29yZC4nKTtcblx0ICAgICAgICB2YXIgbm9kZSA9IHRoaXMuc3RhcnROb2RlKHRoaXMubG9va2FoZWFkKTtcblx0ICAgICAgICB2YXIgZXhwciA9ICh0aGlzLm1hdGNoS2V5d29yZCgnc3VwZXInKSAmJiB0aGlzLmNvbnRleHQuaW5GdW5jdGlvbkJvZHkpID8gdGhpcy5wYXJzZVN1cGVyKCkgOlxuXHQgICAgICAgICAgICB0aGlzLmluaGVyaXRDb3ZlckdyYW1tYXIodGhpcy5tYXRjaEtleXdvcmQoJ25ldycpID8gdGhpcy5wYXJzZU5ld0V4cHJlc3Npb24gOiB0aGlzLnBhcnNlUHJpbWFyeUV4cHJlc3Npb24pO1xuXHQgICAgICAgIHdoaWxlICh0cnVlKSB7XG5cdCAgICAgICAgICAgIGlmICh0aGlzLm1hdGNoKCdbJykpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5pc0JpbmRpbmdFbGVtZW50ID0gZmFsc2U7XG5cdCAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuaXNBc3NpZ25tZW50VGFyZ2V0ID0gdHJ1ZTtcblx0ICAgICAgICAgICAgICAgIHRoaXMuZXhwZWN0KCdbJyk7XG5cdCAgICAgICAgICAgICAgICB2YXIgcHJvcGVydHkgPSB0aGlzLmlzb2xhdGVDb3ZlckdyYW1tYXIodGhpcy5wYXJzZUV4cHJlc3Npb24pO1xuXHQgICAgICAgICAgICAgICAgdGhpcy5leHBlY3QoJ10nKTtcblx0ICAgICAgICAgICAgICAgIGV4cHIgPSB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBOb2RlLkNvbXB1dGVkTWVtYmVyRXhwcmVzc2lvbihleHByLCBwcm9wZXJ0eSkpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMubWF0Y2goJy4nKSkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmlzQmluZGluZ0VsZW1lbnQgPSBmYWxzZTtcblx0ICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5pc0Fzc2lnbm1lbnRUYXJnZXQgPSB0cnVlO1xuXHQgICAgICAgICAgICAgICAgdGhpcy5leHBlY3QoJy4nKTtcblx0ICAgICAgICAgICAgICAgIHZhciBwcm9wZXJ0eSA9IHRoaXMucGFyc2VJZGVudGlmaWVyTmFtZSgpO1xuXHQgICAgICAgICAgICAgICAgZXhwciA9IHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuU3RhdGljTWVtYmVyRXhwcmVzc2lvbihleHByLCBwcm9wZXJ0eSkpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMubG9va2FoZWFkLnR5cGUgPT09IHRva2VuXzEuVG9rZW4uVGVtcGxhdGUgJiYgdGhpcy5sb29rYWhlYWQuaGVhZCkge1xuXHQgICAgICAgICAgICAgICAgdmFyIHF1YXNpID0gdGhpcy5wYXJzZVRlbXBsYXRlTGl0ZXJhbCgpO1xuXHQgICAgICAgICAgICAgICAgZXhwciA9IHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuVGFnZ2VkVGVtcGxhdGVFeHByZXNzaW9uKGV4cHIsIHF1YXNpKSk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gZXhwcjtcblx0ICAgIH07XG5cdCAgICAvLyBFQ01BLTI2MiAxMi40IFVwZGF0ZSBFeHByZXNzaW9uc1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZVVwZGF0ZUV4cHJlc3Npb24gPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIGV4cHI7XG5cdCAgICAgICAgdmFyIHN0YXJ0VG9rZW4gPSB0aGlzLmxvb2thaGVhZDtcblx0ICAgICAgICBpZiAodGhpcy5tYXRjaCgnKysnKSB8fCB0aGlzLm1hdGNoKCctLScpKSB7XG5cdCAgICAgICAgICAgIHZhciBub2RlID0gdGhpcy5zdGFydE5vZGUoc3RhcnRUb2tlbik7XG5cdCAgICAgICAgICAgIHZhciB0b2tlbiA9IHRoaXMubmV4dFRva2VuKCk7XG5cdCAgICAgICAgICAgIGV4cHIgPSB0aGlzLmluaGVyaXRDb3ZlckdyYW1tYXIodGhpcy5wYXJzZVVuYXJ5RXhwcmVzc2lvbik7XG5cdCAgICAgICAgICAgIGlmICh0aGlzLmNvbnRleHQuc3RyaWN0ICYmIGV4cHIudHlwZSA9PT0gc3ludGF4XzEuU3ludGF4LklkZW50aWZpZXIgJiYgdGhpcy5zY2FubmVyLmlzUmVzdHJpY3RlZFdvcmQoZXhwci5uYW1lKSkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy50b2xlcmF0ZUVycm9yKG1lc3NhZ2VzXzEuTWVzc2FnZXMuU3RyaWN0TEhTUHJlZml4KTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBpZiAoIXRoaXMuY29udGV4dC5pc0Fzc2lnbm1lbnRUYXJnZXQpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMudG9sZXJhdGVFcnJvcihtZXNzYWdlc18xLk1lc3NhZ2VzLkludmFsaWRMSFNJbkFzc2lnbm1lbnQpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHZhciBwcmVmaXggPSB0cnVlO1xuXHQgICAgICAgICAgICBleHByID0gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5VcGRhdGVFeHByZXNzaW9uKHRva2VuLnZhbHVlLCBleHByLCBwcmVmaXgpKTtcblx0ICAgICAgICAgICAgdGhpcy5jb250ZXh0LmlzQXNzaWdubWVudFRhcmdldCA9IGZhbHNlO1xuXHQgICAgICAgICAgICB0aGlzLmNvbnRleHQuaXNCaW5kaW5nRWxlbWVudCA9IGZhbHNlO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgZXhwciA9IHRoaXMuaW5oZXJpdENvdmVyR3JhbW1hcih0aGlzLnBhcnNlTGVmdEhhbmRTaWRlRXhwcmVzc2lvbkFsbG93Q2FsbCk7XG5cdCAgICAgICAgICAgIGlmICghdGhpcy5oYXNMaW5lVGVybWluYXRvciAmJiB0aGlzLmxvb2thaGVhZC50eXBlID09PSB0b2tlbl8xLlRva2VuLlB1bmN0dWF0b3IpIHtcblx0ICAgICAgICAgICAgICAgIGlmICh0aGlzLm1hdGNoKCcrKycpIHx8IHRoaXMubWF0Y2goJy0tJykpIHtcblx0ICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb250ZXh0LnN0cmljdCAmJiBleHByLnR5cGUgPT09IHN5bnRheF8xLlN5bnRheC5JZGVudGlmaWVyICYmIHRoaXMuc2Nhbm5lci5pc1Jlc3RyaWN0ZWRXb3JkKGV4cHIubmFtZSkpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b2xlcmF0ZUVycm9yKG1lc3NhZ2VzXzEuTWVzc2FnZXMuU3RyaWN0TEhTUG9zdGZpeCk7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5jb250ZXh0LmlzQXNzaWdubWVudFRhcmdldCkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvbGVyYXRlRXJyb3IobWVzc2FnZXNfMS5NZXNzYWdlcy5JbnZhbGlkTEhTSW5Bc3NpZ25tZW50KTtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmlzQXNzaWdubWVudFRhcmdldCA9IGZhbHNlO1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5pc0JpbmRpbmdFbGVtZW50ID0gZmFsc2U7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIG9wZXJhdG9yID0gdGhpcy5uZXh0VG9rZW4oKS52YWx1ZTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgcHJlZml4ID0gZmFsc2U7XG5cdCAgICAgICAgICAgICAgICAgICAgZXhwciA9IHRoaXMuZmluYWxpemUodGhpcy5zdGFydE5vZGUoc3RhcnRUb2tlbiksIG5ldyBOb2RlLlVwZGF0ZUV4cHJlc3Npb24ob3BlcmF0b3IsIGV4cHIsIHByZWZpeCkpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiBleHByO1xuXHQgICAgfTtcblx0ICAgIC8vIEVDTUEtMjYyIDEyLjUgVW5hcnkgT3BlcmF0b3JzXG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlVW5hcnlFeHByZXNzaW9uID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBleHByO1xuXHQgICAgICAgIGlmICh0aGlzLm1hdGNoKCcrJykgfHwgdGhpcy5tYXRjaCgnLScpIHx8IHRoaXMubWF0Y2goJ34nKSB8fCB0aGlzLm1hdGNoKCchJykgfHxcblx0ICAgICAgICAgICAgdGhpcy5tYXRjaEtleXdvcmQoJ2RlbGV0ZScpIHx8IHRoaXMubWF0Y2hLZXl3b3JkKCd2b2lkJykgfHwgdGhpcy5tYXRjaEtleXdvcmQoJ3R5cGVvZicpKSB7XG5cdCAgICAgICAgICAgIHZhciBub2RlID0gdGhpcy5zdGFydE5vZGUodGhpcy5sb29rYWhlYWQpO1xuXHQgICAgICAgICAgICB2YXIgdG9rZW4gPSB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgICAgICBleHByID0gdGhpcy5pbmhlcml0Q292ZXJHcmFtbWFyKHRoaXMucGFyc2VVbmFyeUV4cHJlc3Npb24pO1xuXHQgICAgICAgICAgICBleHByID0gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5VbmFyeUV4cHJlc3Npb24odG9rZW4udmFsdWUsIGV4cHIpKTtcblx0ICAgICAgICAgICAgaWYgKHRoaXMuY29udGV4dC5zdHJpY3QgJiYgZXhwci5vcGVyYXRvciA9PT0gJ2RlbGV0ZScgJiYgZXhwci5hcmd1bWVudC50eXBlID09PSBzeW50YXhfMS5TeW50YXguSWRlbnRpZmllcikge1xuXHQgICAgICAgICAgICAgICAgdGhpcy50b2xlcmF0ZUVycm9yKG1lc3NhZ2VzXzEuTWVzc2FnZXMuU3RyaWN0RGVsZXRlKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB0aGlzLmNvbnRleHQuaXNBc3NpZ25tZW50VGFyZ2V0ID0gZmFsc2U7XG5cdCAgICAgICAgICAgIHRoaXMuY29udGV4dC5pc0JpbmRpbmdFbGVtZW50ID0gZmFsc2U7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICBleHByID0gdGhpcy5wYXJzZVVwZGF0ZUV4cHJlc3Npb24oKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIGV4cHI7XG5cdCAgICB9O1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZUV4cG9uZW50aWF0aW9uRXhwcmVzc2lvbiA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgc3RhcnRUb2tlbiA9IHRoaXMubG9va2FoZWFkO1xuXHQgICAgICAgIHZhciBleHByID0gdGhpcy5pbmhlcml0Q292ZXJHcmFtbWFyKHRoaXMucGFyc2VVbmFyeUV4cHJlc3Npb24pO1xuXHQgICAgICAgIGlmIChleHByLnR5cGUgIT09IHN5bnRheF8xLlN5bnRheC5VbmFyeUV4cHJlc3Npb24gJiYgdGhpcy5tYXRjaCgnKionKSkge1xuXHQgICAgICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgICAgICB0aGlzLmNvbnRleHQuaXNBc3NpZ25tZW50VGFyZ2V0ID0gZmFsc2U7XG5cdCAgICAgICAgICAgIHRoaXMuY29udGV4dC5pc0JpbmRpbmdFbGVtZW50ID0gZmFsc2U7XG5cdCAgICAgICAgICAgIHZhciBsZWZ0ID0gZXhwcjtcblx0ICAgICAgICAgICAgdmFyIHJpZ2h0ID0gdGhpcy5pc29sYXRlQ292ZXJHcmFtbWFyKHRoaXMucGFyc2VFeHBvbmVudGlhdGlvbkV4cHJlc3Npb24pO1xuXHQgICAgICAgICAgICBleHByID0gdGhpcy5maW5hbGl6ZSh0aGlzLnN0YXJ0Tm9kZShzdGFydFRva2VuKSwgbmV3IE5vZGUuQmluYXJ5RXhwcmVzc2lvbignKionLCBsZWZ0LCByaWdodCkpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gZXhwcjtcblx0ICAgIH07XG5cdCAgICAvLyBFQ01BLTI2MiAxMi42IEV4cG9uZW50aWF0aW9uIE9wZXJhdG9yc1xuXHQgICAgLy8gRUNNQS0yNjIgMTIuNyBNdWx0aXBsaWNhdGl2ZSBPcGVyYXRvcnNcblx0ICAgIC8vIEVDTUEtMjYyIDEyLjggQWRkaXRpdmUgT3BlcmF0b3JzXG5cdCAgICAvLyBFQ01BLTI2MiAxMi45IEJpdHdpc2UgU2hpZnQgT3BlcmF0b3JzXG5cdCAgICAvLyBFQ01BLTI2MiAxMi4xMCBSZWxhdGlvbmFsIE9wZXJhdG9yc1xuXHQgICAgLy8gRUNNQS0yNjIgMTIuMTEgRXF1YWxpdHkgT3BlcmF0b3JzXG5cdCAgICAvLyBFQ01BLTI2MiAxMi4xMiBCaW5hcnkgQml0d2lzZSBPcGVyYXRvcnNcblx0ICAgIC8vIEVDTUEtMjYyIDEyLjEzIEJpbmFyeSBMb2dpY2FsIE9wZXJhdG9yc1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5iaW5hcnlQcmVjZWRlbmNlID0gZnVuY3Rpb24gKHRva2VuKSB7XG5cdCAgICAgICAgdmFyIG9wID0gdG9rZW4udmFsdWU7XG5cdCAgICAgICAgdmFyIHByZWNlZGVuY2U7XG5cdCAgICAgICAgaWYgKHRva2VuLnR5cGUgPT09IHRva2VuXzEuVG9rZW4uUHVuY3R1YXRvcikge1xuXHQgICAgICAgICAgICBwcmVjZWRlbmNlID0gdGhpcy5vcGVyYXRvclByZWNlZGVuY2Vbb3BdIHx8IDA7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGVsc2UgaWYgKHRva2VuLnR5cGUgPT09IHRva2VuXzEuVG9rZW4uS2V5d29yZCkge1xuXHQgICAgICAgICAgICBwcmVjZWRlbmNlID0gKG9wID09PSAnaW5zdGFuY2VvZicgfHwgKHRoaXMuY29udGV4dC5hbGxvd0luICYmIG9wID09PSAnaW4nKSkgPyA3IDogMDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgIHByZWNlZGVuY2UgPSAwO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gcHJlY2VkZW5jZTtcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlQmluYXJ5RXhwcmVzc2lvbiA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgc3RhcnRUb2tlbiA9IHRoaXMubG9va2FoZWFkO1xuXHQgICAgICAgIHZhciBleHByID0gdGhpcy5pbmhlcml0Q292ZXJHcmFtbWFyKHRoaXMucGFyc2VFeHBvbmVudGlhdGlvbkV4cHJlc3Npb24pO1xuXHQgICAgICAgIHZhciB0b2tlbiA9IHRoaXMubG9va2FoZWFkO1xuXHQgICAgICAgIHZhciBwcmVjID0gdGhpcy5iaW5hcnlQcmVjZWRlbmNlKHRva2VuKTtcblx0ICAgICAgICBpZiAocHJlYyA+IDApIHtcblx0ICAgICAgICAgICAgdGhpcy5uZXh0VG9rZW4oKTtcblx0ICAgICAgICAgICAgdG9rZW4ucHJlYyA9IHByZWM7XG5cdCAgICAgICAgICAgIHRoaXMuY29udGV4dC5pc0Fzc2lnbm1lbnRUYXJnZXQgPSBmYWxzZTtcblx0ICAgICAgICAgICAgdGhpcy5jb250ZXh0LmlzQmluZGluZ0VsZW1lbnQgPSBmYWxzZTtcblx0ICAgICAgICAgICAgdmFyIG1hcmtlcnMgPSBbc3RhcnRUb2tlbiwgdGhpcy5sb29rYWhlYWRdO1xuXHQgICAgICAgICAgICB2YXIgbGVmdCA9IGV4cHI7XG5cdCAgICAgICAgICAgIHZhciByaWdodCA9IHRoaXMuaXNvbGF0ZUNvdmVyR3JhbW1hcih0aGlzLnBhcnNlRXhwb25lbnRpYXRpb25FeHByZXNzaW9uKTtcblx0ICAgICAgICAgICAgdmFyIHN0YWNrID0gW2xlZnQsIHRva2VuLCByaWdodF07XG5cdCAgICAgICAgICAgIHdoaWxlICh0cnVlKSB7XG5cdCAgICAgICAgICAgICAgICBwcmVjID0gdGhpcy5iaW5hcnlQcmVjZWRlbmNlKHRoaXMubG9va2FoZWFkKTtcblx0ICAgICAgICAgICAgICAgIGlmIChwcmVjIDw9IDApIHtcblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIC8vIFJlZHVjZTogbWFrZSBhIGJpbmFyeSBleHByZXNzaW9uIGZyb20gdGhlIHRocmVlIHRvcG1vc3QgZW50cmllcy5cblx0ICAgICAgICAgICAgICAgIHdoaWxlICgoc3RhY2subGVuZ3RoID4gMikgJiYgKHByZWMgPD0gc3RhY2tbc3RhY2subGVuZ3RoIC0gMl0ucHJlYykpIHtcblx0ICAgICAgICAgICAgICAgICAgICByaWdodCA9IHN0YWNrLnBvcCgpO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBvcGVyYXRvciA9IHN0YWNrLnBvcCgpLnZhbHVlO1xuXHQgICAgICAgICAgICAgICAgICAgIGxlZnQgPSBzdGFjay5wb3AoKTtcblx0ICAgICAgICAgICAgICAgICAgICBtYXJrZXJzLnBvcCgpO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBub2RlID0gdGhpcy5zdGFydE5vZGUobWFya2Vyc1ttYXJrZXJzLmxlbmd0aCAtIDFdKTtcblx0ICAgICAgICAgICAgICAgICAgICBzdGFjay5wdXNoKHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuQmluYXJ5RXhwcmVzc2lvbihvcGVyYXRvciwgbGVmdCwgcmlnaHQpKSk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAvLyBTaGlmdC5cblx0ICAgICAgICAgICAgICAgIHRva2VuID0gdGhpcy5uZXh0VG9rZW4oKTtcblx0ICAgICAgICAgICAgICAgIHRva2VuLnByZWMgPSBwcmVjO1xuXHQgICAgICAgICAgICAgICAgc3RhY2sucHVzaCh0b2tlbik7XG5cdCAgICAgICAgICAgICAgICBtYXJrZXJzLnB1c2godGhpcy5sb29rYWhlYWQpO1xuXHQgICAgICAgICAgICAgICAgc3RhY2sucHVzaCh0aGlzLmlzb2xhdGVDb3ZlckdyYW1tYXIodGhpcy5wYXJzZUV4cG9uZW50aWF0aW9uRXhwcmVzc2lvbikpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIC8vIEZpbmFsIHJlZHVjZSB0byBjbGVhbi11cCB0aGUgc3RhY2suXG5cdCAgICAgICAgICAgIHZhciBpID0gc3RhY2subGVuZ3RoIC0gMTtcblx0ICAgICAgICAgICAgZXhwciA9IHN0YWNrW2ldO1xuXHQgICAgICAgICAgICBtYXJrZXJzLnBvcCgpO1xuXHQgICAgICAgICAgICB3aGlsZSAoaSA+IDEpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBub2RlID0gdGhpcy5zdGFydE5vZGUobWFya2Vycy5wb3AoKSk7XG5cdCAgICAgICAgICAgICAgICBleHByID0gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5CaW5hcnlFeHByZXNzaW9uKHN0YWNrW2kgLSAxXS52YWx1ZSwgc3RhY2tbaSAtIDJdLCBleHByKSk7XG5cdCAgICAgICAgICAgICAgICBpIC09IDI7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIGV4cHI7XG5cdCAgICB9O1xuXHQgICAgLy8gRUNNQS0yNjIgMTIuMTQgQ29uZGl0aW9uYWwgT3BlcmF0b3Jcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VDb25kaXRpb25hbEV4cHJlc3Npb24gPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIHN0YXJ0VG9rZW4gPSB0aGlzLmxvb2thaGVhZDtcblx0ICAgICAgICB2YXIgZXhwciA9IHRoaXMuaW5oZXJpdENvdmVyR3JhbW1hcih0aGlzLnBhcnNlQmluYXJ5RXhwcmVzc2lvbik7XG5cdCAgICAgICAgaWYgKHRoaXMubWF0Y2goJz8nKSkge1xuXHQgICAgICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgICAgICB2YXIgcHJldmlvdXNBbGxvd0luID0gdGhpcy5jb250ZXh0LmFsbG93SW47XG5cdCAgICAgICAgICAgIHRoaXMuY29udGV4dC5hbGxvd0luID0gdHJ1ZTtcblx0ICAgICAgICAgICAgdmFyIGNvbnNlcXVlbnQgPSB0aGlzLmlzb2xhdGVDb3ZlckdyYW1tYXIodGhpcy5wYXJzZUFzc2lnbm1lbnRFeHByZXNzaW9uKTtcblx0ICAgICAgICAgICAgdGhpcy5jb250ZXh0LmFsbG93SW4gPSBwcmV2aW91c0FsbG93SW47XG5cdCAgICAgICAgICAgIHRoaXMuZXhwZWN0KCc6Jyk7XG5cdCAgICAgICAgICAgIHZhciBhbHRlcm5hdGUgPSB0aGlzLmlzb2xhdGVDb3ZlckdyYW1tYXIodGhpcy5wYXJzZUFzc2lnbm1lbnRFeHByZXNzaW9uKTtcblx0ICAgICAgICAgICAgZXhwciA9IHRoaXMuZmluYWxpemUodGhpcy5zdGFydE5vZGUoc3RhcnRUb2tlbiksIG5ldyBOb2RlLkNvbmRpdGlvbmFsRXhwcmVzc2lvbihleHByLCBjb25zZXF1ZW50LCBhbHRlcm5hdGUpKTtcblx0ICAgICAgICAgICAgdGhpcy5jb250ZXh0LmlzQXNzaWdubWVudFRhcmdldCA9IGZhbHNlO1xuXHQgICAgICAgICAgICB0aGlzLmNvbnRleHQuaXNCaW5kaW5nRWxlbWVudCA9IGZhbHNlO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gZXhwcjtcblx0ICAgIH07XG5cdCAgICAvLyBFQ01BLTI2MiAxMi4xNSBBc3NpZ25tZW50IE9wZXJhdG9yc1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5jaGVja1BhdHRlcm5QYXJhbSA9IGZ1bmN0aW9uIChvcHRpb25zLCBwYXJhbSkge1xuXHQgICAgICAgIHN3aXRjaCAocGFyYW0udHlwZSkge1xuXHQgICAgICAgICAgICBjYXNlIHN5bnRheF8xLlN5bnRheC5JZGVudGlmaWVyOlxuXHQgICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZVBhcmFtKG9wdGlvbnMsIHBhcmFtLCBwYXJhbS5uYW1lKTtcblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICBjYXNlIHN5bnRheF8xLlN5bnRheC5SZXN0RWxlbWVudDpcblx0ICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tQYXR0ZXJuUGFyYW0ob3B0aW9ucywgcGFyYW0uYXJndW1lbnQpO1xuXHQgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgIGNhc2Ugc3ludGF4XzEuU3ludGF4LkFzc2lnbm1lbnRQYXR0ZXJuOlxuXHQgICAgICAgICAgICAgICAgdGhpcy5jaGVja1BhdHRlcm5QYXJhbShvcHRpb25zLCBwYXJhbS5sZWZ0KTtcblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICBjYXNlIHN5bnRheF8xLlN5bnRheC5BcnJheVBhdHRlcm46XG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcmFtLmVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtLmVsZW1lbnRzW2ldICE9PSBudWxsKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tQYXR0ZXJuUGFyYW0ob3B0aW9ucywgcGFyYW0uZWxlbWVudHNbaV0pO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICBjYXNlIHN5bnRheF8xLlN5bnRheC5ZaWVsZEV4cHJlc3Npb246XG5cdCAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgZGVmYXVsdDpcblx0ICAgICAgICAgICAgICAgIGFzc2VydF8xLmFzc2VydChwYXJhbS50eXBlID09PSBzeW50YXhfMS5TeW50YXguT2JqZWN0UGF0dGVybiwgJ0ludmFsaWQgdHlwZScpO1xuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJhbS5wcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja1BhdHRlcm5QYXJhbShvcHRpb25zLCBwYXJhbS5wcm9wZXJ0aWVzW2ldLnZhbHVlKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnJlaW50ZXJwcmV0QXNDb3ZlckZvcm1hbHNMaXN0ID0gZnVuY3Rpb24gKGV4cHIpIHtcblx0ICAgICAgICB2YXIgcGFyYW1zID0gW2V4cHJdO1xuXHQgICAgICAgIHZhciBvcHRpb25zO1xuXHQgICAgICAgIHN3aXRjaCAoZXhwci50eXBlKSB7XG5cdCAgICAgICAgICAgIGNhc2Ugc3ludGF4XzEuU3ludGF4LklkZW50aWZpZXI6XG5cdCAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgY2FzZSBBcnJvd1BhcmFtZXRlclBsYWNlSG9sZGVyOlxuXHQgICAgICAgICAgICAgICAgcGFyYW1zID0gZXhwci5wYXJhbXM7XG5cdCAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgZGVmYXVsdDpcblx0ICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBvcHRpb25zID0ge1xuXHQgICAgICAgICAgICBwYXJhbVNldDoge31cblx0ICAgICAgICB9O1xuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFyYW1zLmxlbmd0aDsgKytpKSB7XG5cdCAgICAgICAgICAgIHZhciBwYXJhbSA9IHBhcmFtc1tpXTtcblx0ICAgICAgICAgICAgaWYgKHBhcmFtLnR5cGUgPT09IHN5bnRheF8xLlN5bnRheC5Bc3NpZ25tZW50UGF0dGVybikge1xuXHQgICAgICAgICAgICAgICAgaWYgKHBhcmFtLnJpZ2h0LnR5cGUgPT09IHN5bnRheF8xLlN5bnRheC5ZaWVsZEV4cHJlc3Npb24pIHtcblx0ICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW0ucmlnaHQuYXJndW1lbnQpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50aHJvd1VuZXhwZWN0ZWRUb2tlbih0aGlzLmxvb2thaGVhZCk7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgIHBhcmFtLnJpZ2h0LnR5cGUgPSBzeW50YXhfMS5TeW50YXguSWRlbnRpZmllcjtcblx0ICAgICAgICAgICAgICAgICAgICBwYXJhbS5yaWdodC5uYW1lID0gJ3lpZWxkJztcblx0ICAgICAgICAgICAgICAgICAgICBkZWxldGUgcGFyYW0ucmlnaHQuYXJndW1lbnQ7XG5cdCAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHBhcmFtLnJpZ2h0LmRlbGVnYXRlO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHRoaXMuY2hlY2tQYXR0ZXJuUGFyYW0ob3B0aW9ucywgcGFyYW0pO1xuXHQgICAgICAgICAgICBwYXJhbXNbaV0gPSBwYXJhbTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYgKHRoaXMuY29udGV4dC5zdHJpY3QgfHwgIXRoaXMuY29udGV4dC5hbGxvd1lpZWxkKSB7XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFyYW1zLmxlbmd0aDsgKytpKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgcGFyYW0gPSBwYXJhbXNbaV07XG5cdCAgICAgICAgICAgICAgICBpZiAocGFyYW0udHlwZSA9PT0gc3ludGF4XzEuU3ludGF4LllpZWxkRXhwcmVzc2lvbikge1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMudGhyb3dVbmV4cGVjdGVkVG9rZW4odGhpcy5sb29rYWhlYWQpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmIChvcHRpb25zLm1lc3NhZ2UgPT09IG1lc3NhZ2VzXzEuTWVzc2FnZXMuU3RyaWN0UGFyYW1EdXBlKSB7XG5cdCAgICAgICAgICAgIHZhciB0b2tlbiA9IHRoaXMuY29udGV4dC5zdHJpY3QgPyBvcHRpb25zLnN0cmljdGVkIDogb3B0aW9ucy5maXJzdFJlc3RyaWN0ZWQ7XG5cdCAgICAgICAgICAgIHRoaXMudGhyb3dVbmV4cGVjdGVkVG9rZW4odG9rZW4sIG9wdGlvbnMubWVzc2FnZSk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiB7XG5cdCAgICAgICAgICAgIHBhcmFtczogcGFyYW1zLFxuXHQgICAgICAgICAgICBzdHJpY3RlZDogb3B0aW9ucy5zdHJpY3RlZCxcblx0ICAgICAgICAgICAgZmlyc3RSZXN0cmljdGVkOiBvcHRpb25zLmZpcnN0UmVzdHJpY3RlZCxcblx0ICAgICAgICAgICAgbWVzc2FnZTogb3B0aW9ucy5tZXNzYWdlXG5cdCAgICAgICAgfTtcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlQXNzaWdubWVudEV4cHJlc3Npb24gPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIGV4cHI7XG5cdCAgICAgICAgaWYgKCF0aGlzLmNvbnRleHQuYWxsb3dZaWVsZCAmJiB0aGlzLm1hdGNoS2V5d29yZCgneWllbGQnKSkge1xuXHQgICAgICAgICAgICBleHByID0gdGhpcy5wYXJzZVlpZWxkRXhwcmVzc2lvbigpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgdmFyIHN0YXJ0VG9rZW4gPSB0aGlzLmxvb2thaGVhZDtcblx0ICAgICAgICAgICAgdmFyIHRva2VuID0gc3RhcnRUb2tlbjtcblx0ICAgICAgICAgICAgZXhwciA9IHRoaXMucGFyc2VDb25kaXRpb25hbEV4cHJlc3Npb24oKTtcblx0ICAgICAgICAgICAgaWYgKGV4cHIudHlwZSA9PT0gQXJyb3dQYXJhbWV0ZXJQbGFjZUhvbGRlciB8fCB0aGlzLm1hdGNoKCc9PicpKSB7XG5cdCAgICAgICAgICAgICAgICAvLyBFQ01BLTI2MiAxNC4yIEFycm93IEZ1bmN0aW9uIERlZmluaXRpb25zXG5cdCAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuaXNBc3NpZ25tZW50VGFyZ2V0ID0gZmFsc2U7XG5cdCAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuaXNCaW5kaW5nRWxlbWVudCA9IGZhbHNlO1xuXHQgICAgICAgICAgICAgICAgdmFyIGxpc3QgPSB0aGlzLnJlaW50ZXJwcmV0QXNDb3ZlckZvcm1hbHNMaXN0KGV4cHIpO1xuXHQgICAgICAgICAgICAgICAgaWYgKGxpc3QpIHtcblx0ICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5oYXNMaW5lVGVybWluYXRvcikge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvbGVyYXRlVW5leHBlY3RlZFRva2VuKHRoaXMubG9va2FoZWFkKTtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZpcnN0Q292ZXJJbml0aWFsaXplZE5hbWVFcnJvciA9IG51bGw7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIHByZXZpb3VzU3RyaWN0ID0gdGhpcy5jb250ZXh0LnN0cmljdDtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgcHJldmlvdXNBbGxvd1lpZWxkID0gdGhpcy5jb250ZXh0LmFsbG93WWllbGQ7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmFsbG93WWllbGQgPSB0cnVlO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBub2RlID0gdGhpcy5zdGFydE5vZGUoc3RhcnRUb2tlbik7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5leHBlY3QoJz0+Jyk7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGJvZHkgPSB0aGlzLm1hdGNoKCd7JykgPyB0aGlzLnBhcnNlRnVuY3Rpb25Tb3VyY2VFbGVtZW50cygpIDpcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc29sYXRlQ292ZXJHcmFtbWFyKHRoaXMucGFyc2VBc3NpZ25tZW50RXhwcmVzc2lvbik7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGV4cHJlc3Npb24gPSBib2R5LnR5cGUgIT09IHN5bnRheF8xLlN5bnRheC5CbG9ja1N0YXRlbWVudDtcblx0ICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb250ZXh0LnN0cmljdCAmJiBsaXN0LmZpcnN0UmVzdHJpY3RlZCkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRocm93VW5leHBlY3RlZFRva2VuKGxpc3QuZmlyc3RSZXN0cmljdGVkLCBsaXN0Lm1lc3NhZ2UpO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb250ZXh0LnN0cmljdCAmJiBsaXN0LnN0cmljdGVkKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG9sZXJhdGVVbmV4cGVjdGVkVG9rZW4obGlzdC5zdHJpY3RlZCwgbGlzdC5tZXNzYWdlKTtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgZXhwciA9IHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuQXJyb3dGdW5jdGlvbkV4cHJlc3Npb24obGlzdC5wYXJhbXMsIGJvZHksIGV4cHJlc3Npb24pKTtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuc3RyaWN0ID0gcHJldmlvdXNTdHJpY3Q7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmFsbG93WWllbGQgPSBwcmV2aW91c0FsbG93WWllbGQ7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXRjaEFzc2lnbigpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNvbnRleHQuaXNBc3NpZ25tZW50VGFyZ2V0KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG9sZXJhdGVFcnJvcihtZXNzYWdlc18xLk1lc3NhZ2VzLkludmFsaWRMSFNJbkFzc2lnbm1lbnQpO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb250ZXh0LnN0cmljdCAmJiBleHByLnR5cGUgPT09IHN5bnRheF8xLlN5bnRheC5JZGVudGlmaWVyKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpZCA9IChleHByKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2Nhbm5lci5pc1Jlc3RyaWN0ZWRXb3JkKGlkLm5hbWUpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvbGVyYXRlVW5leHBlY3RlZFRva2VuKHRva2VuLCBtZXNzYWdlc18xLk1lc3NhZ2VzLlN0cmljdExIU0Fzc2lnbm1lbnQpO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5uZXIuaXNTdHJpY3RNb2RlUmVzZXJ2ZWRXb3JkKGlkLm5hbWUpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvbGVyYXRlVW5leHBlY3RlZFRva2VuKHRva2VuLCBtZXNzYWdlc18xLk1lc3NhZ2VzLlN0cmljdFJlc2VydmVkV29yZCk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLm1hdGNoKCc9JykpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmlzQXNzaWdubWVudFRhcmdldCA9IGZhbHNlO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuaXNCaW5kaW5nRWxlbWVudCA9IGZhbHNlO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWludGVycHJldEV4cHJlc3Npb25Bc1BhdHRlcm4oZXhwcik7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgIHRva2VuID0gdGhpcy5uZXh0VG9rZW4oKTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgcmlnaHQgPSB0aGlzLmlzb2xhdGVDb3ZlckdyYW1tYXIodGhpcy5wYXJzZUFzc2lnbm1lbnRFeHByZXNzaW9uKTtcblx0ICAgICAgICAgICAgICAgICAgICBleHByID0gdGhpcy5maW5hbGl6ZSh0aGlzLnN0YXJ0Tm9kZShzdGFydFRva2VuKSwgbmV3IE5vZGUuQXNzaWdubWVudEV4cHJlc3Npb24odG9rZW4udmFsdWUsIGV4cHIsIHJpZ2h0KSk7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZpcnN0Q292ZXJJbml0aWFsaXplZE5hbWVFcnJvciA9IG51bGw7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIGV4cHI7XG5cdCAgICB9O1xuXHQgICAgLy8gRUNNQS0yNjIgMTIuMTYgQ29tbWEgT3BlcmF0b3Jcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VFeHByZXNzaW9uID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBzdGFydFRva2VuID0gdGhpcy5sb29rYWhlYWQ7XG5cdCAgICAgICAgdmFyIGV4cHIgPSB0aGlzLmlzb2xhdGVDb3ZlckdyYW1tYXIodGhpcy5wYXJzZUFzc2lnbm1lbnRFeHByZXNzaW9uKTtcblx0ICAgICAgICBpZiAodGhpcy5tYXRjaCgnLCcpKSB7XG5cdCAgICAgICAgICAgIHZhciBleHByZXNzaW9ucyA9IFtdO1xuXHQgICAgICAgICAgICBleHByZXNzaW9ucy5wdXNoKGV4cHIpO1xuXHQgICAgICAgICAgICB3aGlsZSAodGhpcy5zdGFydE1hcmtlci5pbmRleCA8IHRoaXMuc2Nhbm5lci5sZW5ndGgpIHtcblx0ICAgICAgICAgICAgICAgIGlmICghdGhpcy5tYXRjaCgnLCcpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgICAgICAgICAgZXhwcmVzc2lvbnMucHVzaCh0aGlzLmlzb2xhdGVDb3ZlckdyYW1tYXIodGhpcy5wYXJzZUFzc2lnbm1lbnRFeHByZXNzaW9uKSk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZXhwciA9IHRoaXMuZmluYWxpemUodGhpcy5zdGFydE5vZGUoc3RhcnRUb2tlbiksIG5ldyBOb2RlLlNlcXVlbmNlRXhwcmVzc2lvbihleHByZXNzaW9ucykpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gZXhwcjtcblx0ICAgIH07XG5cdCAgICAvLyBFQ01BLTI2MiAxMy4yIEJsb2NrXG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlU3RhdGVtZW50TGlzdEl0ZW0gPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIHN0YXRlbWVudCA9IG51bGw7XG5cdCAgICAgICAgdGhpcy5jb250ZXh0LmlzQXNzaWdubWVudFRhcmdldCA9IHRydWU7XG5cdCAgICAgICAgdGhpcy5jb250ZXh0LmlzQmluZGluZ0VsZW1lbnQgPSB0cnVlO1xuXHQgICAgICAgIGlmICh0aGlzLmxvb2thaGVhZC50eXBlID09PSB0b2tlbl8xLlRva2VuLktleXdvcmQpIHtcblx0ICAgICAgICAgICAgc3dpdGNoICh0aGlzLmxvb2thaGVhZC52YWx1ZSkge1xuXHQgICAgICAgICAgICAgICAgY2FzZSAnZXhwb3J0Jzpcblx0ICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zb3VyY2VUeXBlICE9PSAnbW9kdWxlJykge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvbGVyYXRlVW5leHBlY3RlZFRva2VuKHRoaXMubG9va2FoZWFkLCBtZXNzYWdlc18xLk1lc3NhZ2VzLklsbGVnYWxFeHBvcnREZWNsYXJhdGlvbik7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudCA9IHRoaXMucGFyc2VFeHBvcnREZWNsYXJhdGlvbigpO1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgY2FzZSAnaW1wb3J0Jzpcblx0ICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zb3VyY2VUeXBlICE9PSAnbW9kdWxlJykge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvbGVyYXRlVW5leHBlY3RlZFRva2VuKHRoaXMubG9va2FoZWFkLCBtZXNzYWdlc18xLk1lc3NhZ2VzLklsbGVnYWxJbXBvcnREZWNsYXJhdGlvbik7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudCA9IHRoaXMucGFyc2VJbXBvcnREZWNsYXJhdGlvbigpO1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgY2FzZSAnY29uc3QnOlxuXHQgICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudCA9IHRoaXMucGFyc2VMZXhpY2FsRGVjbGFyYXRpb24oeyBpbkZvcjogZmFsc2UgfSk7XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6XG5cdCAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50ID0gdGhpcy5wYXJzZUZ1bmN0aW9uRGVjbGFyYXRpb24oKTtcblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIGNhc2UgJ2NsYXNzJzpcblx0ICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnQgPSB0aGlzLnBhcnNlQ2xhc3NEZWNsYXJhdGlvbigpO1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgY2FzZSAnbGV0Jzpcblx0ICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnQgPSB0aGlzLmlzTGV4aWNhbERlY2xhcmF0aW9uKCkgPyB0aGlzLnBhcnNlTGV4aWNhbERlY2xhcmF0aW9uKHsgaW5Gb3I6IGZhbHNlIH0pIDogdGhpcy5wYXJzZVN0YXRlbWVudCgpO1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgZGVmYXVsdDpcblx0ICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnQgPSB0aGlzLnBhcnNlU3RhdGVtZW50KCk7XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgIHN0YXRlbWVudCA9IHRoaXMucGFyc2VTdGF0ZW1lbnQoKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHN0YXRlbWVudDtcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlQmxvY2sgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoKTtcblx0ICAgICAgICB0aGlzLmV4cGVjdCgneycpO1xuXHQgICAgICAgIHZhciBibG9jayA9IFtdO1xuXHQgICAgICAgIHdoaWxlICh0cnVlKSB7XG5cdCAgICAgICAgICAgIGlmICh0aGlzLm1hdGNoKCd9JykpIHtcblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGJsb2NrLnB1c2godGhpcy5wYXJzZVN0YXRlbWVudExpc3RJdGVtKCkpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICB0aGlzLmV4cGVjdCgnfScpO1xuXHQgICAgICAgIHJldHVybiB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBOb2RlLkJsb2NrU3RhdGVtZW50KGJsb2NrKSk7XG5cdCAgICB9O1xuXHQgICAgLy8gRUNNQS0yNjIgMTMuMy4xIExldCBhbmQgQ29uc3QgRGVjbGFyYXRpb25zXG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlTGV4aWNhbEJpbmRpbmcgPSBmdW5jdGlvbiAoa2luZCwgb3B0aW9ucykge1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgdmFyIHBhcmFtcyA9IFtdO1xuXHQgICAgICAgIHZhciBpZCA9IHRoaXMucGFyc2VQYXR0ZXJuKHBhcmFtcywga2luZCk7XG5cdCAgICAgICAgLy8gRUNNQS0yNjIgMTIuMi4xXG5cdCAgICAgICAgaWYgKHRoaXMuY29udGV4dC5zdHJpY3QgJiYgaWQudHlwZSA9PT0gc3ludGF4XzEuU3ludGF4LklkZW50aWZpZXIpIHtcblx0ICAgICAgICAgICAgaWYgKHRoaXMuc2Nhbm5lci5pc1Jlc3RyaWN0ZWRXb3JkKChpZCkubmFtZSkpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMudG9sZXJhdGVFcnJvcihtZXNzYWdlc18xLk1lc3NhZ2VzLlN0cmljdFZhck5hbWUpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHZhciBpbml0ID0gbnVsbDtcblx0ICAgICAgICBpZiAoa2luZCA9PT0gJ2NvbnN0Jykge1xuXHQgICAgICAgICAgICBpZiAoIXRoaXMubWF0Y2hLZXl3b3JkKCdpbicpICYmICF0aGlzLm1hdGNoQ29udGV4dHVhbEtleXdvcmQoJ29mJykpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMuZXhwZWN0KCc9Jyk7XG5cdCAgICAgICAgICAgICAgICBpbml0ID0gdGhpcy5pc29sYXRlQ292ZXJHcmFtbWFyKHRoaXMucGFyc2VBc3NpZ25tZW50RXhwcmVzc2lvbik7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgZWxzZSBpZiAoKCFvcHRpb25zLmluRm9yICYmIGlkLnR5cGUgIT09IHN5bnRheF8xLlN5bnRheC5JZGVudGlmaWVyKSB8fCB0aGlzLm1hdGNoKCc9JykpIHtcblx0ICAgICAgICAgICAgdGhpcy5leHBlY3QoJz0nKTtcblx0ICAgICAgICAgICAgaW5pdCA9IHRoaXMuaXNvbGF0ZUNvdmVyR3JhbW1hcih0aGlzLnBhcnNlQXNzaWdubWVudEV4cHJlc3Npb24pO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5WYXJpYWJsZURlY2xhcmF0b3IoaWQsIGluaXQpKTtcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlQmluZGluZ0xpc3QgPSBmdW5jdGlvbiAoa2luZCwgb3B0aW9ucykge1xuXHQgICAgICAgIHZhciBsaXN0ID0gW3RoaXMucGFyc2VMZXhpY2FsQmluZGluZyhraW5kLCBvcHRpb25zKV07XG5cdCAgICAgICAgd2hpbGUgKHRoaXMubWF0Y2goJywnKSkge1xuXHQgICAgICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgICAgICBsaXN0LnB1c2godGhpcy5wYXJzZUxleGljYWxCaW5kaW5nKGtpbmQsIG9wdGlvbnMpKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIGxpc3Q7XG5cdCAgICB9O1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5pc0xleGljYWxEZWNsYXJhdGlvbiA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgcHJldmlvdXNJbmRleCA9IHRoaXMuc2Nhbm5lci5pbmRleDtcblx0ICAgICAgICB2YXIgcHJldmlvdXNMaW5lTnVtYmVyID0gdGhpcy5zY2FubmVyLmxpbmVOdW1iZXI7XG5cdCAgICAgICAgdmFyIHByZXZpb3VzTGluZVN0YXJ0ID0gdGhpcy5zY2FubmVyLmxpbmVTdGFydDtcblx0ICAgICAgICB0aGlzLmNvbGxlY3RDb21tZW50cygpO1xuXHQgICAgICAgIHZhciBuZXh0ID0gdGhpcy5zY2FubmVyLmxleCgpO1xuXHQgICAgICAgIHRoaXMuc2Nhbm5lci5pbmRleCA9IHByZXZpb3VzSW5kZXg7XG5cdCAgICAgICAgdGhpcy5zY2FubmVyLmxpbmVOdW1iZXIgPSBwcmV2aW91c0xpbmVOdW1iZXI7XG5cdCAgICAgICAgdGhpcy5zY2FubmVyLmxpbmVTdGFydCA9IHByZXZpb3VzTGluZVN0YXJ0O1xuXHQgICAgICAgIHJldHVybiAobmV4dC50eXBlID09PSB0b2tlbl8xLlRva2VuLklkZW50aWZpZXIpIHx8XG5cdCAgICAgICAgICAgIChuZXh0LnR5cGUgPT09IHRva2VuXzEuVG9rZW4uUHVuY3R1YXRvciAmJiBuZXh0LnZhbHVlID09PSAnWycpIHx8XG5cdCAgICAgICAgICAgIChuZXh0LnR5cGUgPT09IHRva2VuXzEuVG9rZW4uUHVuY3R1YXRvciAmJiBuZXh0LnZhbHVlID09PSAneycpIHx8XG5cdCAgICAgICAgICAgIChuZXh0LnR5cGUgPT09IHRva2VuXzEuVG9rZW4uS2V5d29yZCAmJiBuZXh0LnZhbHVlID09PSAnbGV0JykgfHxcblx0ICAgICAgICAgICAgKG5leHQudHlwZSA9PT0gdG9rZW5fMS5Ub2tlbi5LZXl3b3JkICYmIG5leHQudmFsdWUgPT09ICd5aWVsZCcpO1xuXHQgICAgfTtcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VMZXhpY2FsRGVjbGFyYXRpb24gPSBmdW5jdGlvbiAob3B0aW9ucykge1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgdmFyIGtpbmQgPSB0aGlzLm5leHRUb2tlbigpLnZhbHVlO1xuXHQgICAgICAgIGFzc2VydF8xLmFzc2VydChraW5kID09PSAnbGV0JyB8fCBraW5kID09PSAnY29uc3QnLCAnTGV4aWNhbCBkZWNsYXJhdGlvbiBtdXN0IGJlIGVpdGhlciBsZXQgb3IgY29uc3QnKTtcblx0ICAgICAgICB2YXIgZGVjbGFyYXRpb25zID0gdGhpcy5wYXJzZUJpbmRpbmdMaXN0KGtpbmQsIG9wdGlvbnMpO1xuXHQgICAgICAgIHRoaXMuY29uc3VtZVNlbWljb2xvbigpO1xuXHQgICAgICAgIHJldHVybiB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBOb2RlLlZhcmlhYmxlRGVjbGFyYXRpb24oZGVjbGFyYXRpb25zLCBraW5kKSk7XG5cdCAgICB9O1xuXHQgICAgLy8gRUNNQS0yNjIgMTMuMy4zIERlc3RydWN0dXJpbmcgQmluZGluZyBQYXR0ZXJuc1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZUJpbmRpbmdSZXN0RWxlbWVudCA9IGZ1bmN0aW9uIChwYXJhbXMsIGtpbmQpIHtcblx0ICAgICAgICB2YXIgbm9kZSA9IHRoaXMuY3JlYXRlTm9kZSgpO1xuXHQgICAgICAgIHRoaXMuZXhwZWN0KCcuLi4nKTtcblx0ICAgICAgICB2YXIgYXJnID0gdGhpcy5wYXJzZVBhdHRlcm4ocGFyYW1zLCBraW5kKTtcblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5SZXN0RWxlbWVudChhcmcpKTtcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlQXJyYXlQYXR0ZXJuID0gZnVuY3Rpb24gKHBhcmFtcywga2luZCkge1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgdGhpcy5leHBlY3QoJ1snKTtcblx0ICAgICAgICB2YXIgZWxlbWVudHMgPSBbXTtcblx0ICAgICAgICB3aGlsZSAoIXRoaXMubWF0Y2goJ10nKSkge1xuXHQgICAgICAgICAgICBpZiAodGhpcy5tYXRjaCgnLCcpKSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgICAgICAgICAgZWxlbWVudHMucHVzaChudWxsKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIGlmICh0aGlzLm1hdGNoKCcuLi4nKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzLnB1c2godGhpcy5wYXJzZUJpbmRpbmdSZXN0RWxlbWVudChwYXJhbXMsIGtpbmQpKTtcblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzLnB1c2godGhpcy5wYXJzZVBhdHRlcm5XaXRoRGVmYXVsdChwYXJhbXMsIGtpbmQpKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGlmICghdGhpcy5tYXRjaCgnXScpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5leHBlY3QoJywnKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICB0aGlzLmV4cGVjdCgnXScpO1xuXHQgICAgICAgIHJldHVybiB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBOb2RlLkFycmF5UGF0dGVybihlbGVtZW50cykpO1xuXHQgICAgfTtcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VQcm9wZXJ0eVBhdHRlcm4gPSBmdW5jdGlvbiAocGFyYW1zLCBraW5kKSB7XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoKTtcblx0ICAgICAgICB2YXIgY29tcHV0ZWQgPSBmYWxzZTtcblx0ICAgICAgICB2YXIgc2hvcnRoYW5kID0gZmFsc2U7XG5cdCAgICAgICAgdmFyIG1ldGhvZCA9IGZhbHNlO1xuXHQgICAgICAgIHZhciBrZXk7XG5cdCAgICAgICAgdmFyIHZhbHVlO1xuXHQgICAgICAgIGlmICh0aGlzLmxvb2thaGVhZC50eXBlID09PSB0b2tlbl8xLlRva2VuLklkZW50aWZpZXIpIHtcblx0ICAgICAgICAgICAgdmFyIGtleVRva2VuID0gdGhpcy5sb29rYWhlYWQ7XG5cdCAgICAgICAgICAgIGtleSA9IHRoaXMucGFyc2VWYXJpYWJsZUlkZW50aWZpZXIoKTtcblx0ICAgICAgICAgICAgdmFyIGluaXQgPSB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBOb2RlLklkZW50aWZpZXIoa2V5VG9rZW4udmFsdWUpKTtcblx0ICAgICAgICAgICAgaWYgKHRoaXMubWF0Y2goJz0nKSkge1xuXHQgICAgICAgICAgICAgICAgcGFyYW1zLnB1c2goa2V5VG9rZW4pO1xuXHQgICAgICAgICAgICAgICAgc2hvcnRoYW5kID0gdHJ1ZTtcblx0ICAgICAgICAgICAgICAgIHRoaXMubmV4dFRva2VuKCk7XG5cdCAgICAgICAgICAgICAgICB2YXIgZXhwciA9IHRoaXMucGFyc2VBc3NpZ25tZW50RXhwcmVzc2lvbigpO1xuXHQgICAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLmZpbmFsaXplKHRoaXMuc3RhcnROb2RlKGtleVRva2VuKSwgbmV3IE5vZGUuQXNzaWdubWVudFBhdHRlcm4oaW5pdCwgZXhwcikpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2UgaWYgKCF0aGlzLm1hdGNoKCc6JykpIHtcblx0ICAgICAgICAgICAgICAgIHBhcmFtcy5wdXNoKGtleVRva2VuKTtcblx0ICAgICAgICAgICAgICAgIHNob3J0aGFuZCA9IHRydWU7XG5cdCAgICAgICAgICAgICAgICB2YWx1ZSA9IGluaXQ7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLmV4cGVjdCgnOicpO1xuXHQgICAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnBhcnNlUGF0dGVybldpdGhEZWZhdWx0KHBhcmFtcywga2luZCk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgIGNvbXB1dGVkID0gdGhpcy5tYXRjaCgnWycpO1xuXHQgICAgICAgICAgICBrZXkgPSB0aGlzLnBhcnNlT2JqZWN0UHJvcGVydHlLZXkoKTtcblx0ICAgICAgICAgICAgdGhpcy5leHBlY3QoJzonKTtcblx0ICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnBhcnNlUGF0dGVybldpdGhEZWZhdWx0KHBhcmFtcywga2luZCk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBOb2RlLlByb3BlcnR5KCdpbml0Jywga2V5LCBjb21wdXRlZCwgdmFsdWUsIG1ldGhvZCwgc2hvcnRoYW5kKSk7XG5cdCAgICB9O1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZU9iamVjdFBhdHRlcm4gPSBmdW5jdGlvbiAocGFyYW1zLCBraW5kKSB7XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoKTtcblx0ICAgICAgICB2YXIgcHJvcGVydGllcyA9IFtdO1xuXHQgICAgICAgIHRoaXMuZXhwZWN0KCd7Jyk7XG5cdCAgICAgICAgd2hpbGUgKCF0aGlzLm1hdGNoKCd9JykpIHtcblx0ICAgICAgICAgICAgcHJvcGVydGllcy5wdXNoKHRoaXMucGFyc2VQcm9wZXJ0eVBhdHRlcm4ocGFyYW1zLCBraW5kKSk7XG5cdCAgICAgICAgICAgIGlmICghdGhpcy5tYXRjaCgnfScpKSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLmV4cGVjdCgnLCcpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHRoaXMuZXhwZWN0KCd9Jyk7XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuT2JqZWN0UGF0dGVybihwcm9wZXJ0aWVzKSk7XG5cdCAgICB9O1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZVBhdHRlcm4gPSBmdW5jdGlvbiAocGFyYW1zLCBraW5kKSB7XG5cdCAgICAgICAgdmFyIHBhdHRlcm47XG5cdCAgICAgICAgaWYgKHRoaXMubWF0Y2goJ1snKSkge1xuXHQgICAgICAgICAgICBwYXR0ZXJuID0gdGhpcy5wYXJzZUFycmF5UGF0dGVybihwYXJhbXMsIGtpbmQpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIGlmICh0aGlzLm1hdGNoKCd7JykpIHtcblx0ICAgICAgICAgICAgcGF0dGVybiA9IHRoaXMucGFyc2VPYmplY3RQYXR0ZXJuKHBhcmFtcywga2luZCk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICBpZiAodGhpcy5tYXRjaEtleXdvcmQoJ2xldCcpICYmIChraW5kID09PSAnY29uc3QnIHx8IGtpbmQgPT09ICdsZXQnKSkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy50b2xlcmF0ZVVuZXhwZWN0ZWRUb2tlbih0aGlzLmxvb2thaGVhZCwgbWVzc2FnZXNfMS5NZXNzYWdlcy5VbmV4cGVjdGVkVG9rZW4pO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHBhcmFtcy5wdXNoKHRoaXMubG9va2FoZWFkKTtcblx0ICAgICAgICAgICAgcGF0dGVybiA9IHRoaXMucGFyc2VWYXJpYWJsZUlkZW50aWZpZXIoa2luZCk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiBwYXR0ZXJuO1xuXHQgICAgfTtcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VQYXR0ZXJuV2l0aERlZmF1bHQgPSBmdW5jdGlvbiAocGFyYW1zLCBraW5kKSB7XG5cdCAgICAgICAgdmFyIHN0YXJ0VG9rZW4gPSB0aGlzLmxvb2thaGVhZDtcblx0ICAgICAgICB2YXIgcGF0dGVybiA9IHRoaXMucGFyc2VQYXR0ZXJuKHBhcmFtcywga2luZCk7XG5cdCAgICAgICAgaWYgKHRoaXMubWF0Y2goJz0nKSkge1xuXHQgICAgICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgICAgICB2YXIgcHJldmlvdXNBbGxvd1lpZWxkID0gdGhpcy5jb250ZXh0LmFsbG93WWllbGQ7XG5cdCAgICAgICAgICAgIHRoaXMuY29udGV4dC5hbGxvd1lpZWxkID0gdHJ1ZTtcblx0ICAgICAgICAgICAgdmFyIHJpZ2h0ID0gdGhpcy5pc29sYXRlQ292ZXJHcmFtbWFyKHRoaXMucGFyc2VBc3NpZ25tZW50RXhwcmVzc2lvbik7XG5cdCAgICAgICAgICAgIHRoaXMuY29udGV4dC5hbGxvd1lpZWxkID0gcHJldmlvdXNBbGxvd1lpZWxkO1xuXHQgICAgICAgICAgICBwYXR0ZXJuID0gdGhpcy5maW5hbGl6ZSh0aGlzLnN0YXJ0Tm9kZShzdGFydFRva2VuKSwgbmV3IE5vZGUuQXNzaWdubWVudFBhdHRlcm4ocGF0dGVybiwgcmlnaHQpKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHBhdHRlcm47XG5cdCAgICB9O1xuXHQgICAgLy8gRUNNQS0yNjIgMTMuMy4yIFZhcmlhYmxlIFN0YXRlbWVudFxuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZVZhcmlhYmxlSWRlbnRpZmllciA9IGZ1bmN0aW9uIChraW5kKSB7XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoKTtcblx0ICAgICAgICB2YXIgdG9rZW4gPSB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgIGlmICh0b2tlbi50eXBlID09PSB0b2tlbl8xLlRva2VuLktleXdvcmQgJiYgdG9rZW4udmFsdWUgPT09ICd5aWVsZCcpIHtcblx0ICAgICAgICAgICAgaWYgKHRoaXMuY29udGV4dC5zdHJpY3QpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMudG9sZXJhdGVVbmV4cGVjdGVkVG9rZW4odG9rZW4sIG1lc3NhZ2VzXzEuTWVzc2FnZXMuU3RyaWN0UmVzZXJ2ZWRXb3JkKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBpZiAoIXRoaXMuY29udGV4dC5hbGxvd1lpZWxkKSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnRocm93VW5leHBlY3RlZFRva2VuKHRva2VuKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIGlmICh0b2tlbi50eXBlICE9PSB0b2tlbl8xLlRva2VuLklkZW50aWZpZXIpIHtcblx0ICAgICAgICAgICAgaWYgKHRoaXMuY29udGV4dC5zdHJpY3QgJiYgdG9rZW4udHlwZSA9PT0gdG9rZW5fMS5Ub2tlbi5LZXl3b3JkICYmIHRoaXMuc2Nhbm5lci5pc1N0cmljdE1vZGVSZXNlcnZlZFdvcmQodG9rZW4udmFsdWUpKSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnRvbGVyYXRlVW5leHBlY3RlZFRva2VuKHRva2VuLCBtZXNzYWdlc18xLk1lc3NhZ2VzLlN0cmljdFJlc2VydmVkV29yZCk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgICAgICBpZiAodGhpcy5jb250ZXh0LnN0cmljdCB8fCB0b2tlbi52YWx1ZSAhPT0gJ2xldCcgfHwga2luZCAhPT0gJ3ZhcicpIHtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLnRocm93VW5leHBlY3RlZFRva2VuKHRva2VuKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIGlmICh0aGlzLnNvdXJjZVR5cGUgPT09ICdtb2R1bGUnICYmIHRva2VuLnR5cGUgPT09IHRva2VuXzEuVG9rZW4uSWRlbnRpZmllciAmJiB0b2tlbi52YWx1ZSA9PT0gJ2F3YWl0Jykge1xuXHQgICAgICAgICAgICB0aGlzLnRvbGVyYXRlVW5leHBlY3RlZFRva2VuKHRva2VuKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuSWRlbnRpZmllcih0b2tlbi52YWx1ZSkpO1xuXHQgICAgfTtcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VWYXJpYWJsZURlY2xhcmF0aW9uID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcblx0ICAgICAgICB2YXIgbm9kZSA9IHRoaXMuY3JlYXRlTm9kZSgpO1xuXHQgICAgICAgIHZhciBwYXJhbXMgPSBbXTtcblx0ICAgICAgICB2YXIgaWQgPSB0aGlzLnBhcnNlUGF0dGVybihwYXJhbXMsICd2YXInKTtcblx0ICAgICAgICAvLyBFQ01BLTI2MiAxMi4yLjFcblx0ICAgICAgICBpZiAodGhpcy5jb250ZXh0LnN0cmljdCAmJiBpZC50eXBlID09PSBzeW50YXhfMS5TeW50YXguSWRlbnRpZmllcikge1xuXHQgICAgICAgICAgICBpZiAodGhpcy5zY2FubmVyLmlzUmVzdHJpY3RlZFdvcmQoKGlkKS5uYW1lKSkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy50b2xlcmF0ZUVycm9yKG1lc3NhZ2VzXzEuTWVzc2FnZXMuU3RyaWN0VmFyTmFtZSk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIGluaXQgPSBudWxsO1xuXHQgICAgICAgIGlmICh0aGlzLm1hdGNoKCc9JykpIHtcblx0ICAgICAgICAgICAgdGhpcy5uZXh0VG9rZW4oKTtcblx0ICAgICAgICAgICAgaW5pdCA9IHRoaXMuaXNvbGF0ZUNvdmVyR3JhbW1hcih0aGlzLnBhcnNlQXNzaWdubWVudEV4cHJlc3Npb24pO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIGlmIChpZC50eXBlICE9PSBzeW50YXhfMS5TeW50YXguSWRlbnRpZmllciAmJiAhb3B0aW9ucy5pbkZvcikge1xuXHQgICAgICAgICAgICB0aGlzLmV4cGVjdCgnPScpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5WYXJpYWJsZURlY2xhcmF0b3IoaWQsIGluaXQpKTtcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlVmFyaWFibGVEZWNsYXJhdGlvbkxpc3QgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuXHQgICAgICAgIHZhciBvcHQgPSB7IGluRm9yOiBvcHRpb25zLmluRm9yIH07XG5cdCAgICAgICAgdmFyIGxpc3QgPSBbXTtcblx0ICAgICAgICBsaXN0LnB1c2godGhpcy5wYXJzZVZhcmlhYmxlRGVjbGFyYXRpb24ob3B0KSk7XG5cdCAgICAgICAgd2hpbGUgKHRoaXMubWF0Y2goJywnKSkge1xuXHQgICAgICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgICAgICBsaXN0LnB1c2godGhpcy5wYXJzZVZhcmlhYmxlRGVjbGFyYXRpb24ob3B0KSk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiBsaXN0O1xuXHQgICAgfTtcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VWYXJpYWJsZVN0YXRlbWVudCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgbm9kZSA9IHRoaXMuY3JlYXRlTm9kZSgpO1xuXHQgICAgICAgIHRoaXMuZXhwZWN0S2V5d29yZCgndmFyJyk7XG5cdCAgICAgICAgdmFyIGRlY2xhcmF0aW9ucyA9IHRoaXMucGFyc2VWYXJpYWJsZURlY2xhcmF0aW9uTGlzdCh7IGluRm9yOiBmYWxzZSB9KTtcblx0ICAgICAgICB0aGlzLmNvbnN1bWVTZW1pY29sb24oKTtcblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5WYXJpYWJsZURlY2xhcmF0aW9uKGRlY2xhcmF0aW9ucywgJ3ZhcicpKTtcblx0ICAgIH07XG5cdCAgICAvLyBFQ01BLTI2MiAxMy40IEVtcHR5IFN0YXRlbWVudFxuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZUVtcHR5U3RhdGVtZW50ID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgdGhpcy5leHBlY3QoJzsnKTtcblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5FbXB0eVN0YXRlbWVudCgpKTtcblx0ICAgIH07XG5cdCAgICAvLyBFQ01BLTI2MiAxMy41IEV4cHJlc3Npb24gU3RhdGVtZW50XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlRXhwcmVzc2lvblN0YXRlbWVudCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgbm9kZSA9IHRoaXMuY3JlYXRlTm9kZSgpO1xuXHQgICAgICAgIHZhciBleHByID0gdGhpcy5wYXJzZUV4cHJlc3Npb24oKTtcblx0ICAgICAgICB0aGlzLmNvbnN1bWVTZW1pY29sb24oKTtcblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5FeHByZXNzaW9uU3RhdGVtZW50KGV4cHIpKTtcblx0ICAgIH07XG5cdCAgICAvLyBFQ01BLTI2MiAxMy42IElmIHN0YXRlbWVudFxuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZUlmU3RhdGVtZW50ID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgdmFyIGNvbnNlcXVlbnQ7XG5cdCAgICAgICAgdmFyIGFsdGVybmF0ZSA9IG51bGw7XG5cdCAgICAgICAgdGhpcy5leHBlY3RLZXl3b3JkKCdpZicpO1xuXHQgICAgICAgIHRoaXMuZXhwZWN0KCcoJyk7XG5cdCAgICAgICAgdmFyIHRlc3QgPSB0aGlzLnBhcnNlRXhwcmVzc2lvbigpO1xuXHQgICAgICAgIGlmICghdGhpcy5tYXRjaCgnKScpICYmIHRoaXMuY29uZmlnLnRvbGVyYW50KSB7XG5cdCAgICAgICAgICAgIHRoaXMudG9sZXJhdGVVbmV4cGVjdGVkVG9rZW4odGhpcy5uZXh0VG9rZW4oKSk7XG5cdCAgICAgICAgICAgIGNvbnNlcXVlbnQgPSB0aGlzLmZpbmFsaXplKHRoaXMuY3JlYXRlTm9kZSgpLCBuZXcgTm9kZS5FbXB0eVN0YXRlbWVudCgpKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgIHRoaXMuZXhwZWN0KCcpJyk7XG5cdCAgICAgICAgICAgIGNvbnNlcXVlbnQgPSB0aGlzLnBhcnNlU3RhdGVtZW50KCk7XG5cdCAgICAgICAgICAgIGlmICh0aGlzLm1hdGNoS2V5d29yZCgnZWxzZScpKSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgICAgICAgICAgYWx0ZXJuYXRlID0gdGhpcy5wYXJzZVN0YXRlbWVudCgpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBOb2RlLklmU3RhdGVtZW50KHRlc3QsIGNvbnNlcXVlbnQsIGFsdGVybmF0ZSkpO1xuXHQgICAgfTtcblx0ICAgIC8vIEVDTUEtMjYyIDEzLjcuMiBUaGUgZG8td2hpbGUgU3RhdGVtZW50XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlRG9XaGlsZVN0YXRlbWVudCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgbm9kZSA9IHRoaXMuY3JlYXRlTm9kZSgpO1xuXHQgICAgICAgIHRoaXMuZXhwZWN0S2V5d29yZCgnZG8nKTtcblx0ICAgICAgICB2YXIgcHJldmlvdXNJbkl0ZXJhdGlvbiA9IHRoaXMuY29udGV4dC5pbkl0ZXJhdGlvbjtcblx0ICAgICAgICB0aGlzLmNvbnRleHQuaW5JdGVyYXRpb24gPSB0cnVlO1xuXHQgICAgICAgIHZhciBib2R5ID0gdGhpcy5wYXJzZVN0YXRlbWVudCgpO1xuXHQgICAgICAgIHRoaXMuY29udGV4dC5pbkl0ZXJhdGlvbiA9IHByZXZpb3VzSW5JdGVyYXRpb247XG5cdCAgICAgICAgdGhpcy5leHBlY3RLZXl3b3JkKCd3aGlsZScpO1xuXHQgICAgICAgIHRoaXMuZXhwZWN0KCcoJyk7XG5cdCAgICAgICAgdmFyIHRlc3QgPSB0aGlzLnBhcnNlRXhwcmVzc2lvbigpO1xuXHQgICAgICAgIHRoaXMuZXhwZWN0KCcpJyk7XG5cdCAgICAgICAgaWYgKHRoaXMubWF0Y2goJzsnKSkge1xuXHQgICAgICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5Eb1doaWxlU3RhdGVtZW50KGJvZHksIHRlc3QpKTtcblx0ICAgIH07XG5cdCAgICAvLyBFQ01BLTI2MiAxMy43LjMgVGhlIHdoaWxlIFN0YXRlbWVudFxuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZVdoaWxlU3RhdGVtZW50ID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgdmFyIGJvZHk7XG5cdCAgICAgICAgdGhpcy5leHBlY3RLZXl3b3JkKCd3aGlsZScpO1xuXHQgICAgICAgIHRoaXMuZXhwZWN0KCcoJyk7XG5cdCAgICAgICAgdmFyIHRlc3QgPSB0aGlzLnBhcnNlRXhwcmVzc2lvbigpO1xuXHQgICAgICAgIGlmICghdGhpcy5tYXRjaCgnKScpICYmIHRoaXMuY29uZmlnLnRvbGVyYW50KSB7XG5cdCAgICAgICAgICAgIHRoaXMudG9sZXJhdGVVbmV4cGVjdGVkVG9rZW4odGhpcy5uZXh0VG9rZW4oKSk7XG5cdCAgICAgICAgICAgIGJvZHkgPSB0aGlzLmZpbmFsaXplKHRoaXMuY3JlYXRlTm9kZSgpLCBuZXcgTm9kZS5FbXB0eVN0YXRlbWVudCgpKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgIHRoaXMuZXhwZWN0KCcpJyk7XG5cdCAgICAgICAgICAgIHZhciBwcmV2aW91c0luSXRlcmF0aW9uID0gdGhpcy5jb250ZXh0LmluSXRlcmF0aW9uO1xuXHQgICAgICAgICAgICB0aGlzLmNvbnRleHQuaW5JdGVyYXRpb24gPSB0cnVlO1xuXHQgICAgICAgICAgICBib2R5ID0gdGhpcy5wYXJzZVN0YXRlbWVudCgpO1xuXHQgICAgICAgICAgICB0aGlzLmNvbnRleHQuaW5JdGVyYXRpb24gPSBwcmV2aW91c0luSXRlcmF0aW9uO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5XaGlsZVN0YXRlbWVudCh0ZXN0LCBib2R5KSk7XG5cdCAgICB9O1xuXHQgICAgLy8gRUNNQS0yNjIgMTMuNy40IFRoZSBmb3IgU3RhdGVtZW50XG5cdCAgICAvLyBFQ01BLTI2MiAxMy43LjUgVGhlIGZvci1pbiBhbmQgZm9yLW9mIFN0YXRlbWVudHNcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VGb3JTdGF0ZW1lbnQgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIGluaXQgPSBudWxsO1xuXHQgICAgICAgIHZhciB0ZXN0ID0gbnVsbDtcblx0ICAgICAgICB2YXIgdXBkYXRlID0gbnVsbDtcblx0ICAgICAgICB2YXIgZm9ySW4gPSB0cnVlO1xuXHQgICAgICAgIHZhciBsZWZ0LCByaWdodDtcblx0ICAgICAgICB2YXIgbm9kZSA9IHRoaXMuY3JlYXRlTm9kZSgpO1xuXHQgICAgICAgIHRoaXMuZXhwZWN0S2V5d29yZCgnZm9yJyk7XG5cdCAgICAgICAgdGhpcy5leHBlY3QoJygnKTtcblx0ICAgICAgICBpZiAodGhpcy5tYXRjaCgnOycpKSB7XG5cdCAgICAgICAgICAgIHRoaXMubmV4dFRva2VuKCk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICBpZiAodGhpcy5tYXRjaEtleXdvcmQoJ3ZhcicpKSB7XG5cdCAgICAgICAgICAgICAgICBpbml0ID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgICAgICAgICAgdmFyIHByZXZpb3VzQWxsb3dJbiA9IHRoaXMuY29udGV4dC5hbGxvd0luO1xuXHQgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmFsbG93SW4gPSBmYWxzZTtcblx0ICAgICAgICAgICAgICAgIHZhciBkZWNsYXJhdGlvbnMgPSB0aGlzLnBhcnNlVmFyaWFibGVEZWNsYXJhdGlvbkxpc3QoeyBpbkZvcjogdHJ1ZSB9KTtcblx0ICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5hbGxvd0luID0gcHJldmlvdXNBbGxvd0luO1xuXHQgICAgICAgICAgICAgICAgaWYgKGRlY2xhcmF0aW9ucy5sZW5ndGggPT09IDEgJiYgdGhpcy5tYXRjaEtleXdvcmQoJ2luJykpIHtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZGVjbCA9IGRlY2xhcmF0aW9uc1swXTtcblx0ICAgICAgICAgICAgICAgICAgICBpZiAoZGVjbC5pbml0ICYmIChkZWNsLmlkLnR5cGUgPT09IHN5bnRheF8xLlN5bnRheC5BcnJheVBhdHRlcm4gfHwgZGVjbC5pZC50eXBlID09PSBzeW50YXhfMS5TeW50YXguT2JqZWN0UGF0dGVybiB8fCB0aGlzLmNvbnRleHQuc3RyaWN0KSkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvbGVyYXRlRXJyb3IobWVzc2FnZXNfMS5NZXNzYWdlcy5Gb3JJbk9mTG9vcEluaXRpYWxpemVyLCAnZm9yLWluJyk7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgIGluaXQgPSB0aGlzLmZpbmFsaXplKGluaXQsIG5ldyBOb2RlLlZhcmlhYmxlRGVjbGFyYXRpb24oZGVjbGFyYXRpb25zLCAndmFyJykpO1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dFRva2VuKCk7XG5cdCAgICAgICAgICAgICAgICAgICAgbGVmdCA9IGluaXQ7XG5cdCAgICAgICAgICAgICAgICAgICAgcmlnaHQgPSB0aGlzLnBhcnNlRXhwcmVzc2lvbigpO1xuXHQgICAgICAgICAgICAgICAgICAgIGluaXQgPSBudWxsO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgZWxzZSBpZiAoZGVjbGFyYXRpb25zLmxlbmd0aCA9PT0gMSAmJiBkZWNsYXJhdGlvbnNbMF0uaW5pdCA9PT0gbnVsbCAmJiB0aGlzLm1hdGNoQ29udGV4dHVhbEtleXdvcmQoJ29mJykpIHtcblx0ICAgICAgICAgICAgICAgICAgICBpbml0ID0gdGhpcy5maW5hbGl6ZShpbml0LCBuZXcgTm9kZS5WYXJpYWJsZURlY2xhcmF0aW9uKGRlY2xhcmF0aW9ucywgJ3ZhcicpKTtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgICAgICAgICAgICAgIGxlZnQgPSBpbml0O1xuXHQgICAgICAgICAgICAgICAgICAgIHJpZ2h0ID0gdGhpcy5wYXJzZUFzc2lnbm1lbnRFeHByZXNzaW9uKCk7XG5cdCAgICAgICAgICAgICAgICAgICAgaW5pdCA9IG51bGw7XG5cdCAgICAgICAgICAgICAgICAgICAgZm9ySW4gPSBmYWxzZTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgIGluaXQgPSB0aGlzLmZpbmFsaXplKGluaXQsIG5ldyBOb2RlLlZhcmlhYmxlRGVjbGFyYXRpb24oZGVjbGFyYXRpb25zLCAndmFyJykpO1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuZXhwZWN0KCc7Jyk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5tYXRjaEtleXdvcmQoJ2NvbnN0JykgfHwgdGhpcy5tYXRjaEtleXdvcmQoJ2xldCcpKSB7XG5cdCAgICAgICAgICAgICAgICBpbml0ID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgICAgICAgICB2YXIga2luZCA9IHRoaXMubmV4dFRva2VuKCkudmFsdWU7XG5cdCAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY29udGV4dC5zdHJpY3QgJiYgdGhpcy5sb29rYWhlYWQudmFsdWUgPT09ICdpbicpIHtcblx0ICAgICAgICAgICAgICAgICAgICBpbml0ID0gdGhpcy5maW5hbGl6ZShpbml0LCBuZXcgTm9kZS5JZGVudGlmaWVyKGtpbmQpKTtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgICAgICAgICAgICAgIGxlZnQgPSBpbml0O1xuXHQgICAgICAgICAgICAgICAgICAgIHJpZ2h0ID0gdGhpcy5wYXJzZUV4cHJlc3Npb24oKTtcblx0ICAgICAgICAgICAgICAgICAgICBpbml0ID0gbnVsbDtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBwcmV2aW91c0FsbG93SW4gPSB0aGlzLmNvbnRleHQuYWxsb3dJbjtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuYWxsb3dJbiA9IGZhbHNlO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBkZWNsYXJhdGlvbnMgPSB0aGlzLnBhcnNlQmluZGluZ0xpc3Qoa2luZCwgeyBpbkZvcjogdHJ1ZSB9KTtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuYWxsb3dJbiA9IHByZXZpb3VzQWxsb3dJbjtcblx0ICAgICAgICAgICAgICAgICAgICBpZiAoZGVjbGFyYXRpb25zLmxlbmd0aCA9PT0gMSAmJiBkZWNsYXJhdGlvbnNbMF0uaW5pdCA9PT0gbnVsbCAmJiB0aGlzLm1hdGNoS2V5d29yZCgnaW4nKSkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBpbml0ID0gdGhpcy5maW5hbGl6ZShpbml0LCBuZXcgTm9kZS5WYXJpYWJsZURlY2xhcmF0aW9uKGRlY2xhcmF0aW9ucywga2luZCkpO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gaW5pdDtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQgPSB0aGlzLnBhcnNlRXhwcmVzc2lvbigpO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBpbml0ID0gbnVsbDtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZGVjbGFyYXRpb25zLmxlbmd0aCA9PT0gMSAmJiBkZWNsYXJhdGlvbnNbMF0uaW5pdCA9PT0gbnVsbCAmJiB0aGlzLm1hdGNoQ29udGV4dHVhbEtleXdvcmQoJ29mJykpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgaW5pdCA9IHRoaXMuZmluYWxpemUoaW5pdCwgbmV3IE5vZGUuVmFyaWFibGVEZWNsYXJhdGlvbihkZWNsYXJhdGlvbnMsIGtpbmQpKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0VG9rZW4oKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgbGVmdCA9IGluaXQ7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0ID0gdGhpcy5wYXJzZUFzc2lnbm1lbnRFeHByZXNzaW9uKCk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGluaXQgPSBudWxsO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBmb3JJbiA9IGZhbHNlO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25zdW1lU2VtaWNvbG9uKCk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGluaXQgPSB0aGlzLmZpbmFsaXplKGluaXQsIG5ldyBOb2RlLlZhcmlhYmxlRGVjbGFyYXRpb24oZGVjbGFyYXRpb25zLCBraW5kKSk7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgdmFyIGluaXRTdGFydFRva2VuID0gdGhpcy5sb29rYWhlYWQ7XG5cdCAgICAgICAgICAgICAgICB2YXIgcHJldmlvdXNBbGxvd0luID0gdGhpcy5jb250ZXh0LmFsbG93SW47XG5cdCAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuYWxsb3dJbiA9IGZhbHNlO1xuXHQgICAgICAgICAgICAgICAgaW5pdCA9IHRoaXMuaW5oZXJpdENvdmVyR3JhbW1hcih0aGlzLnBhcnNlQXNzaWdubWVudEV4cHJlc3Npb24pO1xuXHQgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmFsbG93SW4gPSBwcmV2aW91c0FsbG93SW47XG5cdCAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXRjaEtleXdvcmQoJ2luJykpIHtcblx0ICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY29udGV4dC5pc0Fzc2lnbm1lbnRUYXJnZXQgfHwgaW5pdC50eXBlID09PSBzeW50YXhfMS5TeW50YXguQXNzaWdubWVudEV4cHJlc3Npb24pIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b2xlcmF0ZUVycm9yKG1lc3NhZ2VzXzEuTWVzc2FnZXMuSW52YWxpZExIU0luRm9ySW4pO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMucmVpbnRlcnByZXRFeHByZXNzaW9uQXNQYXR0ZXJuKGluaXQpO1xuXHQgICAgICAgICAgICAgICAgICAgIGxlZnQgPSBpbml0O1xuXHQgICAgICAgICAgICAgICAgICAgIHJpZ2h0ID0gdGhpcy5wYXJzZUV4cHJlc3Npb24oKTtcblx0ICAgICAgICAgICAgICAgICAgICBpbml0ID0gbnVsbDtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMubWF0Y2hDb250ZXh0dWFsS2V5d29yZCgnb2YnKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5jb250ZXh0LmlzQXNzaWdubWVudFRhcmdldCB8fCBpbml0LnR5cGUgPT09IHN5bnRheF8xLlN5bnRheC5Bc3NpZ25tZW50RXhwcmVzc2lvbikge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvbGVyYXRlRXJyb3IobWVzc2FnZXNfMS5NZXNzYWdlcy5JbnZhbGlkTEhTSW5Gb3JMb29wKTtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0VG9rZW4oKTtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLnJlaW50ZXJwcmV0RXhwcmVzc2lvbkFzUGF0dGVybihpbml0KTtcblx0ICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gaW5pdDtcblx0ICAgICAgICAgICAgICAgICAgICByaWdodCA9IHRoaXMucGFyc2VBc3NpZ25tZW50RXhwcmVzc2lvbigpO1xuXHQgICAgICAgICAgICAgICAgICAgIGluaXQgPSBudWxsO1xuXHQgICAgICAgICAgICAgICAgICAgIGZvckluID0gZmFsc2U7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXRjaCgnLCcpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbml0U2VxID0gW2luaXRdO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAodGhpcy5tYXRjaCgnLCcpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdFNlcS5wdXNoKHRoaXMuaXNvbGF0ZUNvdmVyR3JhbW1hcih0aGlzLnBhcnNlQXNzaWdubWVudEV4cHJlc3Npb24pKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgICAgICBpbml0ID0gdGhpcy5maW5hbGl6ZSh0aGlzLnN0YXJ0Tm9kZShpbml0U3RhcnRUb2tlbiksIG5ldyBOb2RlLlNlcXVlbmNlRXhwcmVzc2lvbihpbml0U2VxKSk7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuZXhwZWN0KCc7Jyk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYgKHR5cGVvZiBsZWZ0ID09PSAndW5kZWZpbmVkJykge1xuXHQgICAgICAgICAgICBpZiAoIXRoaXMubWF0Y2goJzsnKSkge1xuXHQgICAgICAgICAgICAgICAgdGVzdCA9IHRoaXMucGFyc2VFeHByZXNzaW9uKCk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgdGhpcy5leHBlY3QoJzsnKTtcblx0ICAgICAgICAgICAgaWYgKCF0aGlzLm1hdGNoKCcpJykpIHtcblx0ICAgICAgICAgICAgICAgIHVwZGF0ZSA9IHRoaXMucGFyc2VFeHByZXNzaW9uKCk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIGJvZHk7XG5cdCAgICAgICAgaWYgKCF0aGlzLm1hdGNoKCcpJykgJiYgdGhpcy5jb25maWcudG9sZXJhbnQpIHtcblx0ICAgICAgICAgICAgdGhpcy50b2xlcmF0ZVVuZXhwZWN0ZWRUb2tlbih0aGlzLm5leHRUb2tlbigpKTtcblx0ICAgICAgICAgICAgYm9keSA9IHRoaXMuZmluYWxpemUodGhpcy5jcmVhdGVOb2RlKCksIG5ldyBOb2RlLkVtcHR5U3RhdGVtZW50KCkpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgdGhpcy5leHBlY3QoJyknKTtcblx0ICAgICAgICAgICAgdmFyIHByZXZpb3VzSW5JdGVyYXRpb24gPSB0aGlzLmNvbnRleHQuaW5JdGVyYXRpb247XG5cdCAgICAgICAgICAgIHRoaXMuY29udGV4dC5pbkl0ZXJhdGlvbiA9IHRydWU7XG5cdCAgICAgICAgICAgIGJvZHkgPSB0aGlzLmlzb2xhdGVDb3ZlckdyYW1tYXIodGhpcy5wYXJzZVN0YXRlbWVudCk7XG5cdCAgICAgICAgICAgIHRoaXMuY29udGV4dC5pbkl0ZXJhdGlvbiA9IHByZXZpb3VzSW5JdGVyYXRpb247XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiAodHlwZW9mIGxlZnQgPT09ICd1bmRlZmluZWQnKSA/XG5cdCAgICAgICAgICAgIHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuRm9yU3RhdGVtZW50KGluaXQsIHRlc3QsIHVwZGF0ZSwgYm9keSkpIDpcblx0ICAgICAgICAgICAgZm9ySW4gPyB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBOb2RlLkZvckluU3RhdGVtZW50KGxlZnQsIHJpZ2h0LCBib2R5KSkgOlxuXHQgICAgICAgICAgICAgICAgdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5Gb3JPZlN0YXRlbWVudChsZWZ0LCByaWdodCwgYm9keSkpO1xuXHQgICAgfTtcblx0ICAgIC8vIEVDTUEtMjYyIDEzLjggVGhlIGNvbnRpbnVlIHN0YXRlbWVudFxuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZUNvbnRpbnVlU3RhdGVtZW50ID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgdGhpcy5leHBlY3RLZXl3b3JkKCdjb250aW51ZScpO1xuXHQgICAgICAgIHZhciBsYWJlbCA9IG51bGw7XG5cdCAgICAgICAgaWYgKHRoaXMubG9va2FoZWFkLnR5cGUgPT09IHRva2VuXzEuVG9rZW4uSWRlbnRpZmllciAmJiAhdGhpcy5oYXNMaW5lVGVybWluYXRvcikge1xuXHQgICAgICAgICAgICBsYWJlbCA9IHRoaXMucGFyc2VWYXJpYWJsZUlkZW50aWZpZXIoKTtcblx0ICAgICAgICAgICAgdmFyIGtleSA9ICckJyArIGxhYmVsLm5hbWU7XG5cdCAgICAgICAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMuY29udGV4dC5sYWJlbFNldCwga2V5KSkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy50aHJvd0Vycm9yKG1lc3NhZ2VzXzEuTWVzc2FnZXMuVW5rbm93bkxhYmVsLCBsYWJlbC5uYW1lKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICB0aGlzLmNvbnN1bWVTZW1pY29sb24oKTtcblx0ICAgICAgICBpZiAobGFiZWwgPT09IG51bGwgJiYgIXRoaXMuY29udGV4dC5pbkl0ZXJhdGlvbikge1xuXHQgICAgICAgICAgICB0aGlzLnRocm93RXJyb3IobWVzc2FnZXNfMS5NZXNzYWdlcy5JbGxlZ2FsQ29udGludWUpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5Db250aW51ZVN0YXRlbWVudChsYWJlbCkpO1xuXHQgICAgfTtcblx0ICAgIC8vIEVDTUEtMjYyIDEzLjkgVGhlIGJyZWFrIHN0YXRlbWVudFxuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZUJyZWFrU3RhdGVtZW50ID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgdGhpcy5leHBlY3RLZXl3b3JkKCdicmVhaycpO1xuXHQgICAgICAgIHZhciBsYWJlbCA9IG51bGw7XG5cdCAgICAgICAgaWYgKHRoaXMubG9va2FoZWFkLnR5cGUgPT09IHRva2VuXzEuVG9rZW4uSWRlbnRpZmllciAmJiAhdGhpcy5oYXNMaW5lVGVybWluYXRvcikge1xuXHQgICAgICAgICAgICBsYWJlbCA9IHRoaXMucGFyc2VWYXJpYWJsZUlkZW50aWZpZXIoKTtcblx0ICAgICAgICAgICAgdmFyIGtleSA9ICckJyArIGxhYmVsLm5hbWU7XG5cdCAgICAgICAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMuY29udGV4dC5sYWJlbFNldCwga2V5KSkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy50aHJvd0Vycm9yKG1lc3NhZ2VzXzEuTWVzc2FnZXMuVW5rbm93bkxhYmVsLCBsYWJlbC5uYW1lKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICB0aGlzLmNvbnN1bWVTZW1pY29sb24oKTtcblx0ICAgICAgICBpZiAobGFiZWwgPT09IG51bGwgJiYgIXRoaXMuY29udGV4dC5pbkl0ZXJhdGlvbiAmJiAhdGhpcy5jb250ZXh0LmluU3dpdGNoKSB7XG5cdCAgICAgICAgICAgIHRoaXMudGhyb3dFcnJvcihtZXNzYWdlc18xLk1lc3NhZ2VzLklsbGVnYWxCcmVhayk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBOb2RlLkJyZWFrU3RhdGVtZW50KGxhYmVsKSk7XG5cdCAgICB9O1xuXHQgICAgLy8gRUNNQS0yNjIgMTMuMTAgVGhlIHJldHVybiBzdGF0ZW1lbnRcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VSZXR1cm5TdGF0ZW1lbnQgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgaWYgKCF0aGlzLmNvbnRleHQuaW5GdW5jdGlvbkJvZHkpIHtcblx0ICAgICAgICAgICAgdGhpcy50b2xlcmF0ZUVycm9yKG1lc3NhZ2VzXzEuTWVzc2FnZXMuSWxsZWdhbFJldHVybik7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgdGhpcy5leHBlY3RLZXl3b3JkKCdyZXR1cm4nKTtcblx0ICAgICAgICB2YXIgaGFzQXJndW1lbnQgPSAhdGhpcy5tYXRjaCgnOycpICYmICF0aGlzLm1hdGNoKCd9JykgJiZcblx0ICAgICAgICAgICAgIXRoaXMuaGFzTGluZVRlcm1pbmF0b3IgJiYgdGhpcy5sb29rYWhlYWQudHlwZSAhPT0gdG9rZW5fMS5Ub2tlbi5FT0Y7XG5cdCAgICAgICAgdmFyIGFyZ3VtZW50ID0gaGFzQXJndW1lbnQgPyB0aGlzLnBhcnNlRXhwcmVzc2lvbigpIDogbnVsbDtcblx0ICAgICAgICB0aGlzLmNvbnN1bWVTZW1pY29sb24oKTtcblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5SZXR1cm5TdGF0ZW1lbnQoYXJndW1lbnQpKTtcblx0ICAgIH07XG5cdCAgICAvLyBFQ01BLTI2MiAxMy4xMSBUaGUgd2l0aCBzdGF0ZW1lbnRcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VXaXRoU3RhdGVtZW50ID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGlmICh0aGlzLmNvbnRleHQuc3RyaWN0KSB7XG5cdCAgICAgICAgICAgIHRoaXMudG9sZXJhdGVFcnJvcihtZXNzYWdlc18xLk1lc3NhZ2VzLlN0cmljdE1vZGVXaXRoKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoKTtcblx0ICAgICAgICB0aGlzLmV4cGVjdEtleXdvcmQoJ3dpdGgnKTtcblx0ICAgICAgICB0aGlzLmV4cGVjdCgnKCcpO1xuXHQgICAgICAgIHZhciBvYmplY3QgPSB0aGlzLnBhcnNlRXhwcmVzc2lvbigpO1xuXHQgICAgICAgIHRoaXMuZXhwZWN0KCcpJyk7XG5cdCAgICAgICAgdmFyIGJvZHkgPSB0aGlzLnBhcnNlU3RhdGVtZW50KCk7XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuV2l0aFN0YXRlbWVudChvYmplY3QsIGJvZHkpKTtcblx0ICAgIH07XG5cdCAgICAvLyBFQ01BLTI2MiAxMy4xMiBUaGUgc3dpdGNoIHN0YXRlbWVudFxuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZVN3aXRjaENhc2UgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoKTtcblx0ICAgICAgICB2YXIgdGVzdDtcblx0ICAgICAgICBpZiAodGhpcy5tYXRjaEtleXdvcmQoJ2RlZmF1bHQnKSkge1xuXHQgICAgICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgICAgICB0ZXN0ID0gbnVsbDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgIHRoaXMuZXhwZWN0S2V5d29yZCgnY2FzZScpO1xuXHQgICAgICAgICAgICB0ZXN0ID0gdGhpcy5wYXJzZUV4cHJlc3Npb24oKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgdGhpcy5leHBlY3QoJzonKTtcblx0ICAgICAgICB2YXIgY29uc2VxdWVudCA9IFtdO1xuXHQgICAgICAgIHdoaWxlICh0cnVlKSB7XG5cdCAgICAgICAgICAgIGlmICh0aGlzLm1hdGNoKCd9JykgfHwgdGhpcy5tYXRjaEtleXdvcmQoJ2RlZmF1bHQnKSB8fCB0aGlzLm1hdGNoS2V5d29yZCgnY2FzZScpKSB7XG5cdCAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBjb25zZXF1ZW50LnB1c2godGhpcy5wYXJzZVN0YXRlbWVudExpc3RJdGVtKCkpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5Td2l0Y2hDYXNlKHRlc3QsIGNvbnNlcXVlbnQpKTtcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlU3dpdGNoU3RhdGVtZW50ID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgdGhpcy5leHBlY3RLZXl3b3JkKCdzd2l0Y2gnKTtcblx0ICAgICAgICB0aGlzLmV4cGVjdCgnKCcpO1xuXHQgICAgICAgIHZhciBkaXNjcmltaW5hbnQgPSB0aGlzLnBhcnNlRXhwcmVzc2lvbigpO1xuXHQgICAgICAgIHRoaXMuZXhwZWN0KCcpJyk7XG5cdCAgICAgICAgdmFyIHByZXZpb3VzSW5Td2l0Y2ggPSB0aGlzLmNvbnRleHQuaW5Td2l0Y2g7XG5cdCAgICAgICAgdGhpcy5jb250ZXh0LmluU3dpdGNoID0gdHJ1ZTtcblx0ICAgICAgICB2YXIgY2FzZXMgPSBbXTtcblx0ICAgICAgICB2YXIgZGVmYXVsdEZvdW5kID0gZmFsc2U7XG5cdCAgICAgICAgdGhpcy5leHBlY3QoJ3snKTtcblx0ICAgICAgICB3aGlsZSAodHJ1ZSkge1xuXHQgICAgICAgICAgICBpZiAodGhpcy5tYXRjaCgnfScpKSB7XG5cdCAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB2YXIgY2xhdXNlID0gdGhpcy5wYXJzZVN3aXRjaENhc2UoKTtcblx0ICAgICAgICAgICAgaWYgKGNsYXVzZS50ZXN0ID09PSBudWxsKSB7XG5cdCAgICAgICAgICAgICAgICBpZiAoZGVmYXVsdEZvdW5kKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy50aHJvd0Vycm9yKG1lc3NhZ2VzXzEuTWVzc2FnZXMuTXVsdGlwbGVEZWZhdWx0c0luU3dpdGNoKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGRlZmF1bHRGb3VuZCA9IHRydWU7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgY2FzZXMucHVzaChjbGF1c2UpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICB0aGlzLmV4cGVjdCgnfScpO1xuXHQgICAgICAgIHRoaXMuY29udGV4dC5pblN3aXRjaCA9IHByZXZpb3VzSW5Td2l0Y2g7XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuU3dpdGNoU3RhdGVtZW50KGRpc2NyaW1pbmFudCwgY2FzZXMpKTtcblx0ICAgIH07XG5cdCAgICAvLyBFQ01BLTI2MiAxMy4xMyBMYWJlbGxlZCBTdGF0ZW1lbnRzXG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlTGFiZWxsZWRTdGF0ZW1lbnQgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoKTtcblx0ICAgICAgICB2YXIgZXhwciA9IHRoaXMucGFyc2VFeHByZXNzaW9uKCk7XG5cdCAgICAgICAgdmFyIHN0YXRlbWVudDtcblx0ICAgICAgICBpZiAoKGV4cHIudHlwZSA9PT0gc3ludGF4XzEuU3ludGF4LklkZW50aWZpZXIpICYmIHRoaXMubWF0Y2goJzonKSkge1xuXHQgICAgICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgICAgICB2YXIgaWQgPSAoZXhwcik7XG5cdCAgICAgICAgICAgIHZhciBrZXkgPSAnJCcgKyBpZC5uYW1lO1xuXHQgICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMuY29udGV4dC5sYWJlbFNldCwga2V5KSkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy50aHJvd0Vycm9yKG1lc3NhZ2VzXzEuTWVzc2FnZXMuUmVkZWNsYXJhdGlvbiwgJ0xhYmVsJywgaWQubmFtZSk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgdGhpcy5jb250ZXh0LmxhYmVsU2V0W2tleV0gPSB0cnVlO1xuXHQgICAgICAgICAgICB2YXIgbGFiZWxlZEJvZHkgPSB0aGlzLnBhcnNlU3RhdGVtZW50KCk7XG5cdCAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmNvbnRleHQubGFiZWxTZXRba2V5XTtcblx0ICAgICAgICAgICAgc3RhdGVtZW50ID0gbmV3IE5vZGUuTGFiZWxlZFN0YXRlbWVudChpZCwgbGFiZWxlZEJvZHkpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgdGhpcy5jb25zdW1lU2VtaWNvbG9uKCk7XG5cdCAgICAgICAgICAgIHN0YXRlbWVudCA9IG5ldyBOb2RlLkV4cHJlc3Npb25TdGF0ZW1lbnQoZXhwcik7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiB0aGlzLmZpbmFsaXplKG5vZGUsIHN0YXRlbWVudCk7XG5cdCAgICB9O1xuXHQgICAgLy8gRUNNQS0yNjIgMTMuMTQgVGhlIHRocm93IHN0YXRlbWVudFxuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZVRocm93U3RhdGVtZW50ID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgdGhpcy5leHBlY3RLZXl3b3JkKCd0aHJvdycpO1xuXHQgICAgICAgIGlmICh0aGlzLmhhc0xpbmVUZXJtaW5hdG9yKSB7XG5cdCAgICAgICAgICAgIHRoaXMudGhyb3dFcnJvcihtZXNzYWdlc18xLk1lc3NhZ2VzLk5ld2xpbmVBZnRlclRocm93KTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIGFyZ3VtZW50ID0gdGhpcy5wYXJzZUV4cHJlc3Npb24oKTtcblx0ICAgICAgICB0aGlzLmNvbnN1bWVTZW1pY29sb24oKTtcblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5UaHJvd1N0YXRlbWVudChhcmd1bWVudCkpO1xuXHQgICAgfTtcblx0ICAgIC8vIEVDTUEtMjYyIDEzLjE1IFRoZSB0cnkgc3RhdGVtZW50XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlQ2F0Y2hDbGF1c2UgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoKTtcblx0ICAgICAgICB0aGlzLmV4cGVjdEtleXdvcmQoJ2NhdGNoJyk7XG5cdCAgICAgICAgdGhpcy5leHBlY3QoJygnKTtcblx0ICAgICAgICBpZiAodGhpcy5tYXRjaCgnKScpKSB7XG5cdCAgICAgICAgICAgIHRoaXMudGhyb3dVbmV4cGVjdGVkVG9rZW4odGhpcy5sb29rYWhlYWQpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICB2YXIgcGFyYW1zID0gW107XG5cdCAgICAgICAgdmFyIHBhcmFtID0gdGhpcy5wYXJzZVBhdHRlcm4ocGFyYW1zKTtcblx0ICAgICAgICB2YXIgcGFyYW1NYXAgPSB7fTtcblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcmFtcy5sZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgICB2YXIga2V5ID0gJyQnICsgcGFyYW1zW2ldLnZhbHVlO1xuXHQgICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHBhcmFtTWFwLCBrZXkpKSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnRvbGVyYXRlRXJyb3IobWVzc2FnZXNfMS5NZXNzYWdlcy5EdXBsaWNhdGVCaW5kaW5nLCBwYXJhbXNbaV0udmFsdWUpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHBhcmFtTWFwW2tleV0gPSB0cnVlO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAodGhpcy5jb250ZXh0LnN0cmljdCAmJiBwYXJhbS50eXBlID09PSBzeW50YXhfMS5TeW50YXguSWRlbnRpZmllcikge1xuXHQgICAgICAgICAgICBpZiAodGhpcy5zY2FubmVyLmlzUmVzdHJpY3RlZFdvcmQoKHBhcmFtKS5uYW1lKSkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy50b2xlcmF0ZUVycm9yKG1lc3NhZ2VzXzEuTWVzc2FnZXMuU3RyaWN0Q2F0Y2hWYXJpYWJsZSk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgdGhpcy5leHBlY3QoJyknKTtcblx0ICAgICAgICB2YXIgYm9keSA9IHRoaXMucGFyc2VCbG9jaygpO1xuXHQgICAgICAgIHJldHVybiB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBOb2RlLkNhdGNoQ2xhdXNlKHBhcmFtLCBib2R5KSk7XG5cdCAgICB9O1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZUZpbmFsbHlDbGF1c2UgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdGhpcy5leHBlY3RLZXl3b3JkKCdmaW5hbGx5Jyk7XG5cdCAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VCbG9jaygpO1xuXHQgICAgfTtcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VUcnlTdGF0ZW1lbnQgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoKTtcblx0ICAgICAgICB0aGlzLmV4cGVjdEtleXdvcmQoJ3RyeScpO1xuXHQgICAgICAgIHZhciBibG9jayA9IHRoaXMucGFyc2VCbG9jaygpO1xuXHQgICAgICAgIHZhciBoYW5kbGVyID0gdGhpcy5tYXRjaEtleXdvcmQoJ2NhdGNoJykgPyB0aGlzLnBhcnNlQ2F0Y2hDbGF1c2UoKSA6IG51bGw7XG5cdCAgICAgICAgdmFyIGZpbmFsaXplciA9IHRoaXMubWF0Y2hLZXl3b3JkKCdmaW5hbGx5JykgPyB0aGlzLnBhcnNlRmluYWxseUNsYXVzZSgpIDogbnVsbDtcblx0ICAgICAgICBpZiAoIWhhbmRsZXIgJiYgIWZpbmFsaXplcikge1xuXHQgICAgICAgICAgICB0aGlzLnRocm93RXJyb3IobWVzc2FnZXNfMS5NZXNzYWdlcy5Ob0NhdGNoT3JGaW5hbGx5KTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuVHJ5U3RhdGVtZW50KGJsb2NrLCBoYW5kbGVyLCBmaW5hbGl6ZXIpKTtcblx0ICAgIH07XG5cdCAgICAvLyBFQ01BLTI2MiAxMy4xNiBUaGUgZGVidWdnZXIgc3RhdGVtZW50XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlRGVidWdnZXJTdGF0ZW1lbnQgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoKTtcblx0ICAgICAgICB0aGlzLmV4cGVjdEtleXdvcmQoJ2RlYnVnZ2VyJyk7XG5cdCAgICAgICAgdGhpcy5jb25zdW1lU2VtaWNvbG9uKCk7XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuRGVidWdnZXJTdGF0ZW1lbnQoKSk7XG5cdCAgICB9O1xuXHQgICAgLy8gRUNNQS0yNjIgMTMgU3RhdGVtZW50c1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZVN0YXRlbWVudCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgc3RhdGVtZW50ID0gbnVsbDtcblx0ICAgICAgICBzd2l0Y2ggKHRoaXMubG9va2FoZWFkLnR5cGUpIHtcblx0ICAgICAgICAgICAgY2FzZSB0b2tlbl8xLlRva2VuLkJvb2xlYW5MaXRlcmFsOlxuXHQgICAgICAgICAgICBjYXNlIHRva2VuXzEuVG9rZW4uTnVsbExpdGVyYWw6XG5cdCAgICAgICAgICAgIGNhc2UgdG9rZW5fMS5Ub2tlbi5OdW1lcmljTGl0ZXJhbDpcblx0ICAgICAgICAgICAgY2FzZSB0b2tlbl8xLlRva2VuLlN0cmluZ0xpdGVyYWw6XG5cdCAgICAgICAgICAgIGNhc2UgdG9rZW5fMS5Ub2tlbi5UZW1wbGF0ZTpcblx0ICAgICAgICAgICAgY2FzZSB0b2tlbl8xLlRva2VuLlJlZ3VsYXJFeHByZXNzaW9uOlxuXHQgICAgICAgICAgICAgICAgc3RhdGVtZW50ID0gdGhpcy5wYXJzZUV4cHJlc3Npb25TdGF0ZW1lbnQoKTtcblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICBjYXNlIHRva2VuXzEuVG9rZW4uUHVuY3R1YXRvcjpcblx0ICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHRoaXMubG9va2FoZWFkLnZhbHVlO1xuXHQgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSAneycpIHtcblx0ICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnQgPSB0aGlzLnBhcnNlQmxvY2soKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGVsc2UgaWYgKHZhbHVlID09PSAnKCcpIHtcblx0ICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnQgPSB0aGlzLnBhcnNlRXhwcmVzc2lvblN0YXRlbWVudCgpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUgPT09ICc7Jykge1xuXHQgICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudCA9IHRoaXMucGFyc2VFbXB0eVN0YXRlbWVudCgpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50ID0gdGhpcy5wYXJzZUV4cHJlc3Npb25TdGF0ZW1lbnQoKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICBjYXNlIHRva2VuXzEuVG9rZW4uSWRlbnRpZmllcjpcblx0ICAgICAgICAgICAgICAgIHN0YXRlbWVudCA9IHRoaXMucGFyc2VMYWJlbGxlZFN0YXRlbWVudCgpO1xuXHQgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgIGNhc2UgdG9rZW5fMS5Ub2tlbi5LZXl3b3JkOlxuXHQgICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLmxvb2thaGVhZC52YWx1ZSkge1xuXHQgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2JyZWFrJzpcblx0ICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50ID0gdGhpcy5wYXJzZUJyZWFrU3RhdGVtZW50KCk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NvbnRpbnVlJzpcblx0ICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50ID0gdGhpcy5wYXJzZUNvbnRpbnVlU3RhdGVtZW50KCk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2RlYnVnZ2VyJzpcblx0ICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50ID0gdGhpcy5wYXJzZURlYnVnZ2VyU3RhdGVtZW50KCk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2RvJzpcblx0ICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50ID0gdGhpcy5wYXJzZURvV2hpbGVTdGF0ZW1lbnQoKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICAgICAgY2FzZSAnZm9yJzpcblx0ICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50ID0gdGhpcy5wYXJzZUZvclN0YXRlbWVudCgpO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudCA9IHRoaXMucGFyc2VGdW5jdGlvbkRlY2xhcmF0aW9uKCk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2lmJzpcblx0ICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50ID0gdGhpcy5wYXJzZUlmU3RhdGVtZW50KCk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JldHVybic6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudCA9IHRoaXMucGFyc2VSZXR1cm5TdGF0ZW1lbnQoKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICAgICAgY2FzZSAnc3dpdGNoJzpcblx0ICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50ID0gdGhpcy5wYXJzZVN3aXRjaFN0YXRlbWVudCgpO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgICAgICBjYXNlICd0aHJvdyc6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudCA9IHRoaXMucGFyc2VUaHJvd1N0YXRlbWVudCgpO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgICAgICBjYXNlICd0cnknOlxuXHQgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnQgPSB0aGlzLnBhcnNlVHJ5U3RhdGVtZW50KCk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3Zhcic6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudCA9IHRoaXMucGFyc2VWYXJpYWJsZVN0YXRlbWVudCgpO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgICAgICBjYXNlICd3aGlsZSc6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudCA9IHRoaXMucGFyc2VXaGlsZVN0YXRlbWVudCgpO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgICAgICBjYXNlICd3aXRoJzpcblx0ICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50ID0gdGhpcy5wYXJzZVdpdGhTdGF0ZW1lbnQoKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcblx0ICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50ID0gdGhpcy5wYXJzZUV4cHJlc3Npb25TdGF0ZW1lbnQoKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgZGVmYXVsdDpcblx0ICAgICAgICAgICAgICAgIHRoaXMudGhyb3dVbmV4cGVjdGVkVG9rZW4odGhpcy5sb29rYWhlYWQpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gc3RhdGVtZW50O1xuXHQgICAgfTtcblx0ICAgIC8vIEVDTUEtMjYyIDE0LjEgRnVuY3Rpb24gRGVmaW5pdGlvblxuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZUZ1bmN0aW9uU291cmNlRWxlbWVudHMgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoKTtcblx0ICAgICAgICB0aGlzLmV4cGVjdCgneycpO1xuXHQgICAgICAgIHZhciBib2R5ID0gdGhpcy5wYXJzZURpcmVjdGl2ZVByb2xvZ3VlcygpO1xuXHQgICAgICAgIHZhciBwcmV2aW91c0xhYmVsU2V0ID0gdGhpcy5jb250ZXh0LmxhYmVsU2V0O1xuXHQgICAgICAgIHZhciBwcmV2aW91c0luSXRlcmF0aW9uID0gdGhpcy5jb250ZXh0LmluSXRlcmF0aW9uO1xuXHQgICAgICAgIHZhciBwcmV2aW91c0luU3dpdGNoID0gdGhpcy5jb250ZXh0LmluU3dpdGNoO1xuXHQgICAgICAgIHZhciBwcmV2aW91c0luRnVuY3Rpb25Cb2R5ID0gdGhpcy5jb250ZXh0LmluRnVuY3Rpb25Cb2R5O1xuXHQgICAgICAgIHRoaXMuY29udGV4dC5sYWJlbFNldCA9IHt9O1xuXHQgICAgICAgIHRoaXMuY29udGV4dC5pbkl0ZXJhdGlvbiA9IGZhbHNlO1xuXHQgICAgICAgIHRoaXMuY29udGV4dC5pblN3aXRjaCA9IGZhbHNlO1xuXHQgICAgICAgIHRoaXMuY29udGV4dC5pbkZ1bmN0aW9uQm9keSA9IHRydWU7XG5cdCAgICAgICAgd2hpbGUgKHRoaXMuc3RhcnRNYXJrZXIuaW5kZXggPCB0aGlzLnNjYW5uZXIubGVuZ3RoKSB7XG5cdCAgICAgICAgICAgIGlmICh0aGlzLm1hdGNoKCd9JykpIHtcblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGJvZHkucHVzaCh0aGlzLnBhcnNlU3RhdGVtZW50TGlzdEl0ZW0oKSk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHRoaXMuZXhwZWN0KCd9Jyk7XG5cdCAgICAgICAgdGhpcy5jb250ZXh0LmxhYmVsU2V0ID0gcHJldmlvdXNMYWJlbFNldDtcblx0ICAgICAgICB0aGlzLmNvbnRleHQuaW5JdGVyYXRpb24gPSBwcmV2aW91c0luSXRlcmF0aW9uO1xuXHQgICAgICAgIHRoaXMuY29udGV4dC5pblN3aXRjaCA9IHByZXZpb3VzSW5Td2l0Y2g7XG5cdCAgICAgICAgdGhpcy5jb250ZXh0LmluRnVuY3Rpb25Cb2R5ID0gcHJldmlvdXNJbkZ1bmN0aW9uQm9keTtcblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5CbG9ja1N0YXRlbWVudChib2R5KSk7XG5cdCAgICB9O1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS52YWxpZGF0ZVBhcmFtID0gZnVuY3Rpb24gKG9wdGlvbnMsIHBhcmFtLCBuYW1lKSB7XG5cdCAgICAgICAgdmFyIGtleSA9ICckJyArIG5hbWU7XG5cdCAgICAgICAgaWYgKHRoaXMuY29udGV4dC5zdHJpY3QpIHtcblx0ICAgICAgICAgICAgaWYgKHRoaXMuc2Nhbm5lci5pc1Jlc3RyaWN0ZWRXb3JkKG5hbWUpKSB7XG5cdCAgICAgICAgICAgICAgICBvcHRpb25zLnN0cmljdGVkID0gcGFyYW07XG5cdCAgICAgICAgICAgICAgICBvcHRpb25zLm1lc3NhZ2UgPSBtZXNzYWdlc18xLk1lc3NhZ2VzLlN0cmljdFBhcmFtTmFtZTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9wdGlvbnMucGFyYW1TZXQsIGtleSkpIHtcblx0ICAgICAgICAgICAgICAgIG9wdGlvbnMuc3RyaWN0ZWQgPSBwYXJhbTtcblx0ICAgICAgICAgICAgICAgIG9wdGlvbnMubWVzc2FnZSA9IG1lc3NhZ2VzXzEuTWVzc2FnZXMuU3RyaWN0UGFyYW1EdXBlO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGVsc2UgaWYgKCFvcHRpb25zLmZpcnN0UmVzdHJpY3RlZCkge1xuXHQgICAgICAgICAgICBpZiAodGhpcy5zY2FubmVyLmlzUmVzdHJpY3RlZFdvcmQobmFtZSkpIHtcblx0ICAgICAgICAgICAgICAgIG9wdGlvbnMuZmlyc3RSZXN0cmljdGVkID0gcGFyYW07XG5cdCAgICAgICAgICAgICAgICBvcHRpb25zLm1lc3NhZ2UgPSBtZXNzYWdlc18xLk1lc3NhZ2VzLlN0cmljdFBhcmFtTmFtZTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBlbHNlIGlmICh0aGlzLnNjYW5uZXIuaXNTdHJpY3RNb2RlUmVzZXJ2ZWRXb3JkKG5hbWUpKSB7XG5cdCAgICAgICAgICAgICAgICBvcHRpb25zLmZpcnN0UmVzdHJpY3RlZCA9IHBhcmFtO1xuXHQgICAgICAgICAgICAgICAgb3B0aW9ucy5tZXNzYWdlID0gbWVzc2FnZXNfMS5NZXNzYWdlcy5TdHJpY3RSZXNlcnZlZFdvcmQ7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZWxzZSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9wdGlvbnMucGFyYW1TZXQsIGtleSkpIHtcblx0ICAgICAgICAgICAgICAgIG9wdGlvbnMuc3RyaWN0ZWQgPSBwYXJhbTtcblx0ICAgICAgICAgICAgICAgIG9wdGlvbnMubWVzc2FnZSA9IG1lc3NhZ2VzXzEuTWVzc2FnZXMuU3RyaWN0UGFyYW1EdXBlO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5cdCAgICAgICAgaWYgKHR5cGVvZiBPYmplY3QuZGVmaW5lUHJvcGVydHkgPT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9wdGlvbnMucGFyYW1TZXQsIGtleSwgeyB2YWx1ZTogdHJ1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9KTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgIG9wdGlvbnMucGFyYW1TZXRba2V5XSA9IHRydWU7XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VSZXN0RWxlbWVudCA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcblx0ICAgICAgICB2YXIgbm9kZSA9IHRoaXMuY3JlYXRlTm9kZSgpO1xuXHQgICAgICAgIHRoaXMuZXhwZWN0KCcuLi4nKTtcblx0ICAgICAgICB2YXIgYXJnID0gdGhpcy5wYXJzZVBhdHRlcm4ocGFyYW1zKTtcblx0ICAgICAgICBpZiAodGhpcy5tYXRjaCgnPScpKSB7XG5cdCAgICAgICAgICAgIHRoaXMudGhyb3dFcnJvcihtZXNzYWdlc18xLk1lc3NhZ2VzLkRlZmF1bHRSZXN0UGFyYW1ldGVyKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYgKCF0aGlzLm1hdGNoKCcpJykpIHtcblx0ICAgICAgICAgICAgdGhpcy50aHJvd0Vycm9yKG1lc3NhZ2VzXzEuTWVzc2FnZXMuUGFyYW1ldGVyQWZ0ZXJSZXN0UGFyYW1ldGVyKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuUmVzdEVsZW1lbnQoYXJnKSk7XG5cdCAgICB9O1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZUZvcm1hbFBhcmFtZXRlciA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cdCAgICAgICAgdmFyIHBhcmFtcyA9IFtdO1xuXHQgICAgICAgIHZhciBwYXJhbSA9IHRoaXMubWF0Y2goJy4uLicpID8gdGhpcy5wYXJzZVJlc3RFbGVtZW50KHBhcmFtcykgOiB0aGlzLnBhcnNlUGF0dGVybldpdGhEZWZhdWx0KHBhcmFtcyk7XG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJhbXMubGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICAgICAgdGhpcy52YWxpZGF0ZVBhcmFtKG9wdGlvbnMsIHBhcmFtc1tpXSwgcGFyYW1zW2ldLnZhbHVlKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgb3B0aW9ucy5wYXJhbXMucHVzaChwYXJhbSk7XG5cdCAgICAgICAgcmV0dXJuICF0aGlzLm1hdGNoKCcpJyk7XG5cdCAgICB9O1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZUZvcm1hbFBhcmFtZXRlcnMgPSBmdW5jdGlvbiAoZmlyc3RSZXN0cmljdGVkKSB7XG5cdCAgICAgICAgdmFyIG9wdGlvbnM7XG5cdCAgICAgICAgb3B0aW9ucyA9IHtcblx0ICAgICAgICAgICAgcGFyYW1zOiBbXSxcblx0ICAgICAgICAgICAgZmlyc3RSZXN0cmljdGVkOiBmaXJzdFJlc3RyaWN0ZWRcblx0ICAgICAgICB9O1xuXHQgICAgICAgIHRoaXMuZXhwZWN0KCcoJyk7XG5cdCAgICAgICAgaWYgKCF0aGlzLm1hdGNoKCcpJykpIHtcblx0ICAgICAgICAgICAgb3B0aW9ucy5wYXJhbVNldCA9IHt9O1xuXHQgICAgICAgICAgICB3aGlsZSAodGhpcy5zdGFydE1hcmtlci5pbmRleCA8IHRoaXMuc2Nhbm5lci5sZW5ndGgpIHtcblx0ICAgICAgICAgICAgICAgIGlmICghdGhpcy5wYXJzZUZvcm1hbFBhcmFtZXRlcihvcHRpb25zKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgdGhpcy5leHBlY3QoJywnKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICB0aGlzLmV4cGVjdCgnKScpO1xuXHQgICAgICAgIHJldHVybiB7XG5cdCAgICAgICAgICAgIHBhcmFtczogb3B0aW9ucy5wYXJhbXMsXG5cdCAgICAgICAgICAgIHN0cmljdGVkOiBvcHRpb25zLnN0cmljdGVkLFxuXHQgICAgICAgICAgICBmaXJzdFJlc3RyaWN0ZWQ6IG9wdGlvbnMuZmlyc3RSZXN0cmljdGVkLFxuXHQgICAgICAgICAgICBtZXNzYWdlOiBvcHRpb25zLm1lc3NhZ2Vcblx0ICAgICAgICB9O1xuXHQgICAgfTtcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VGdW5jdGlvbkRlY2xhcmF0aW9uID0gZnVuY3Rpb24gKGlkZW50aWZpZXJJc09wdGlvbmFsKSB7XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoKTtcblx0ICAgICAgICB0aGlzLmV4cGVjdEtleXdvcmQoJ2Z1bmN0aW9uJyk7XG5cdCAgICAgICAgdmFyIGlzR2VuZXJhdG9yID0gdGhpcy5tYXRjaCgnKicpO1xuXHQgICAgICAgIGlmIChpc0dlbmVyYXRvcikge1xuXHQgICAgICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICB2YXIgbWVzc2FnZTtcblx0ICAgICAgICB2YXIgaWQgPSBudWxsO1xuXHQgICAgICAgIHZhciBmaXJzdFJlc3RyaWN0ZWQgPSBudWxsO1xuXHQgICAgICAgIGlmICghaWRlbnRpZmllcklzT3B0aW9uYWwgfHwgIXRoaXMubWF0Y2goJygnKSkge1xuXHQgICAgICAgICAgICB2YXIgdG9rZW4gPSB0aGlzLmxvb2thaGVhZDtcblx0ICAgICAgICAgICAgaWQgPSB0aGlzLnBhcnNlVmFyaWFibGVJZGVudGlmaWVyKCk7XG5cdCAgICAgICAgICAgIGlmICh0aGlzLmNvbnRleHQuc3RyaWN0KSB7XG5cdCAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FubmVyLmlzUmVzdHJpY3RlZFdvcmQodG9rZW4udmFsdWUpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy50b2xlcmF0ZVVuZXhwZWN0ZWRUb2tlbih0b2tlbiwgbWVzc2FnZXNfMS5NZXNzYWdlcy5TdHJpY3RGdW5jdGlvbk5hbWUpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2Nhbm5lci5pc1Jlc3RyaWN0ZWRXb3JkKHRva2VuLnZhbHVlKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIGZpcnN0UmVzdHJpY3RlZCA9IHRva2VuO1xuXHQgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBtZXNzYWdlc18xLk1lc3NhZ2VzLlN0cmljdEZ1bmN0aW9uTmFtZTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuc2Nhbm5lci5pc1N0cmljdE1vZGVSZXNlcnZlZFdvcmQodG9rZW4udmFsdWUpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgZmlyc3RSZXN0cmljdGVkID0gdG9rZW47XG5cdCAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IG1lc3NhZ2VzXzEuTWVzc2FnZXMuU3RyaWN0UmVzZXJ2ZWRXb3JkO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHZhciBwcmV2aW91c0FsbG93WWllbGQgPSB0aGlzLmNvbnRleHQuYWxsb3dZaWVsZDtcblx0ICAgICAgICB0aGlzLmNvbnRleHQuYWxsb3dZaWVsZCA9ICFpc0dlbmVyYXRvcjtcblx0ICAgICAgICB2YXIgZm9ybWFsUGFyYW1ldGVycyA9IHRoaXMucGFyc2VGb3JtYWxQYXJhbWV0ZXJzKGZpcnN0UmVzdHJpY3RlZCk7XG5cdCAgICAgICAgdmFyIHBhcmFtcyA9IGZvcm1hbFBhcmFtZXRlcnMucGFyYW1zO1xuXHQgICAgICAgIHZhciBzdHJpY3RlZCA9IGZvcm1hbFBhcmFtZXRlcnMuc3RyaWN0ZWQ7XG5cdCAgICAgICAgZmlyc3RSZXN0cmljdGVkID0gZm9ybWFsUGFyYW1ldGVycy5maXJzdFJlc3RyaWN0ZWQ7XG5cdCAgICAgICAgaWYgKGZvcm1hbFBhcmFtZXRlcnMubWVzc2FnZSkge1xuXHQgICAgICAgICAgICBtZXNzYWdlID0gZm9ybWFsUGFyYW1ldGVycy5tZXNzYWdlO1xuXHQgICAgICAgIH1cblx0ICAgICAgICB2YXIgcHJldmlvdXNTdHJpY3QgPSB0aGlzLmNvbnRleHQuc3RyaWN0O1xuXHQgICAgICAgIHZhciBib2R5ID0gdGhpcy5wYXJzZUZ1bmN0aW9uU291cmNlRWxlbWVudHMoKTtcblx0ICAgICAgICBpZiAodGhpcy5jb250ZXh0LnN0cmljdCAmJiBmaXJzdFJlc3RyaWN0ZWQpIHtcblx0ICAgICAgICAgICAgdGhpcy50aHJvd1VuZXhwZWN0ZWRUb2tlbihmaXJzdFJlc3RyaWN0ZWQsIG1lc3NhZ2UpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAodGhpcy5jb250ZXh0LnN0cmljdCAmJiBzdHJpY3RlZCkge1xuXHQgICAgICAgICAgICB0aGlzLnRvbGVyYXRlVW5leHBlY3RlZFRva2VuKHN0cmljdGVkLCBtZXNzYWdlKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgdGhpcy5jb250ZXh0LnN0cmljdCA9IHByZXZpb3VzU3RyaWN0O1xuXHQgICAgICAgIHRoaXMuY29udGV4dC5hbGxvd1lpZWxkID0gcHJldmlvdXNBbGxvd1lpZWxkO1xuXHQgICAgICAgIHJldHVybiB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBOb2RlLkZ1bmN0aW9uRGVjbGFyYXRpb24oaWQsIHBhcmFtcywgYm9keSwgaXNHZW5lcmF0b3IpKTtcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlRnVuY3Rpb25FeHByZXNzaW9uID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgdGhpcy5leHBlY3RLZXl3b3JkKCdmdW5jdGlvbicpO1xuXHQgICAgICAgIHZhciBpc0dlbmVyYXRvciA9IHRoaXMubWF0Y2goJyonKTtcblx0ICAgICAgICBpZiAoaXNHZW5lcmF0b3IpIHtcblx0ICAgICAgICAgICAgdGhpcy5uZXh0VG9rZW4oKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIG1lc3NhZ2U7XG5cdCAgICAgICAgdmFyIGlkID0gbnVsbDtcblx0ICAgICAgICB2YXIgZmlyc3RSZXN0cmljdGVkO1xuXHQgICAgICAgIHZhciBwcmV2aW91c0FsbG93WWllbGQgPSB0aGlzLmNvbnRleHQuYWxsb3dZaWVsZDtcblx0ICAgICAgICB0aGlzLmNvbnRleHQuYWxsb3dZaWVsZCA9ICFpc0dlbmVyYXRvcjtcblx0ICAgICAgICBpZiAoIXRoaXMubWF0Y2goJygnKSkge1xuXHQgICAgICAgICAgICB2YXIgdG9rZW4gPSB0aGlzLmxvb2thaGVhZDtcblx0ICAgICAgICAgICAgaWQgPSAoIXRoaXMuY29udGV4dC5zdHJpY3QgJiYgIWlzR2VuZXJhdG9yICYmIHRoaXMubWF0Y2hLZXl3b3JkKCd5aWVsZCcpKSA/IHRoaXMucGFyc2VJZGVudGlmaWVyTmFtZSgpIDogdGhpcy5wYXJzZVZhcmlhYmxlSWRlbnRpZmllcigpO1xuXHQgICAgICAgICAgICBpZiAodGhpcy5jb250ZXh0LnN0cmljdCkge1xuXHQgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2Nhbm5lci5pc1Jlc3RyaWN0ZWRXb3JkKHRva2VuLnZhbHVlKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMudG9sZXJhdGVVbmV4cGVjdGVkVG9rZW4odG9rZW4sIG1lc3NhZ2VzXzEuTWVzc2FnZXMuU3RyaWN0RnVuY3Rpb25OYW1lKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5uZXIuaXNSZXN0cmljdGVkV29yZCh0b2tlbi52YWx1ZSkpIHtcblx0ICAgICAgICAgICAgICAgICAgICBmaXJzdFJlc3RyaWN0ZWQgPSB0b2tlbjtcblx0ICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gbWVzc2FnZXNfMS5NZXNzYWdlcy5TdHJpY3RGdW5jdGlvbk5hbWU7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLnNjYW5uZXIuaXNTdHJpY3RNb2RlUmVzZXJ2ZWRXb3JkKHRva2VuLnZhbHVlKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIGZpcnN0UmVzdHJpY3RlZCA9IHRva2VuO1xuXHQgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBtZXNzYWdlc18xLk1lc3NhZ2VzLlN0cmljdFJlc2VydmVkV29yZDtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICB2YXIgZm9ybWFsUGFyYW1ldGVycyA9IHRoaXMucGFyc2VGb3JtYWxQYXJhbWV0ZXJzKGZpcnN0UmVzdHJpY3RlZCk7XG5cdCAgICAgICAgdmFyIHBhcmFtcyA9IGZvcm1hbFBhcmFtZXRlcnMucGFyYW1zO1xuXHQgICAgICAgIHZhciBzdHJpY3RlZCA9IGZvcm1hbFBhcmFtZXRlcnMuc3RyaWN0ZWQ7XG5cdCAgICAgICAgZmlyc3RSZXN0cmljdGVkID0gZm9ybWFsUGFyYW1ldGVycy5maXJzdFJlc3RyaWN0ZWQ7XG5cdCAgICAgICAgaWYgKGZvcm1hbFBhcmFtZXRlcnMubWVzc2FnZSkge1xuXHQgICAgICAgICAgICBtZXNzYWdlID0gZm9ybWFsUGFyYW1ldGVycy5tZXNzYWdlO1xuXHQgICAgICAgIH1cblx0ICAgICAgICB2YXIgcHJldmlvdXNTdHJpY3QgPSB0aGlzLmNvbnRleHQuc3RyaWN0O1xuXHQgICAgICAgIHZhciBib2R5ID0gdGhpcy5wYXJzZUZ1bmN0aW9uU291cmNlRWxlbWVudHMoKTtcblx0ICAgICAgICBpZiAodGhpcy5jb250ZXh0LnN0cmljdCAmJiBmaXJzdFJlc3RyaWN0ZWQpIHtcblx0ICAgICAgICAgICAgdGhpcy50aHJvd1VuZXhwZWN0ZWRUb2tlbihmaXJzdFJlc3RyaWN0ZWQsIG1lc3NhZ2UpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAodGhpcy5jb250ZXh0LnN0cmljdCAmJiBzdHJpY3RlZCkge1xuXHQgICAgICAgICAgICB0aGlzLnRvbGVyYXRlVW5leHBlY3RlZFRva2VuKHN0cmljdGVkLCBtZXNzYWdlKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgdGhpcy5jb250ZXh0LnN0cmljdCA9IHByZXZpb3VzU3RyaWN0O1xuXHQgICAgICAgIHRoaXMuY29udGV4dC5hbGxvd1lpZWxkID0gcHJldmlvdXNBbGxvd1lpZWxkO1xuXHQgICAgICAgIHJldHVybiB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBOb2RlLkZ1bmN0aW9uRXhwcmVzc2lvbihpZCwgcGFyYW1zLCBib2R5LCBpc0dlbmVyYXRvcikpO1xuXHQgICAgfTtcblx0ICAgIC8vIEVDTUEtMjYyIDE0LjEuMSBEaXJlY3RpdmUgUHJvbG9ndWVzXG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlRGlyZWN0aXZlID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciB0b2tlbiA9IHRoaXMubG9va2FoZWFkO1xuXHQgICAgICAgIHZhciBkaXJlY3RpdmUgPSBudWxsO1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgdmFyIGV4cHIgPSB0aGlzLnBhcnNlRXhwcmVzc2lvbigpO1xuXHQgICAgICAgIGlmIChleHByLnR5cGUgPT09IHN5bnRheF8xLlN5bnRheC5MaXRlcmFsKSB7XG5cdCAgICAgICAgICAgIGRpcmVjdGl2ZSA9IHRoaXMuZ2V0VG9rZW5SYXcodG9rZW4pLnNsaWNlKDEsIC0xKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgdGhpcy5jb25zdW1lU2VtaWNvbG9uKCk7XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuZmluYWxpemUobm9kZSwgZGlyZWN0aXZlID8gbmV3IE5vZGUuRGlyZWN0aXZlKGV4cHIsIGRpcmVjdGl2ZSkgOlxuXHQgICAgICAgICAgICBuZXcgTm9kZS5FeHByZXNzaW9uU3RhdGVtZW50KGV4cHIpKTtcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlRGlyZWN0aXZlUHJvbG9ndWVzID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBmaXJzdFJlc3RyaWN0ZWQgPSBudWxsO1xuXHQgICAgICAgIHZhciBib2R5ID0gW107XG5cdCAgICAgICAgd2hpbGUgKHRydWUpIHtcblx0ICAgICAgICAgICAgdmFyIHRva2VuID0gdGhpcy5sb29rYWhlYWQ7XG5cdCAgICAgICAgICAgIGlmICh0b2tlbi50eXBlICE9PSB0b2tlbl8xLlRva2VuLlN0cmluZ0xpdGVyYWwpIHtcblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHZhciBzdGF0ZW1lbnQgPSB0aGlzLnBhcnNlRGlyZWN0aXZlKCk7XG5cdCAgICAgICAgICAgIGJvZHkucHVzaChzdGF0ZW1lbnQpO1xuXHQgICAgICAgICAgICB2YXIgZGlyZWN0aXZlID0gc3RhdGVtZW50LmRpcmVjdGl2ZTtcblx0ICAgICAgICAgICAgaWYgKHR5cGVvZiBkaXJlY3RpdmUgIT09ICdzdHJpbmcnKSB7XG5cdCAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBpZiAoZGlyZWN0aXZlID09PSAndXNlIHN0cmljdCcpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5zdHJpY3QgPSB0cnVlO1xuXHQgICAgICAgICAgICAgICAgaWYgKGZpcnN0UmVzdHJpY3RlZCkge1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMudG9sZXJhdGVVbmV4cGVjdGVkVG9rZW4oZmlyc3RSZXN0cmljdGVkLCBtZXNzYWdlc18xLk1lc3NhZ2VzLlN0cmljdE9jdGFsTGl0ZXJhbCk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgICAgICBpZiAoIWZpcnN0UmVzdHJpY3RlZCAmJiB0b2tlbi5vY3RhbCkge1xuXHQgICAgICAgICAgICAgICAgICAgIGZpcnN0UmVzdHJpY3RlZCA9IHRva2VuO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiBib2R5O1xuXHQgICAgfTtcblx0ICAgIC8vIEVDTUEtMjYyIDE0LjMgTWV0aG9kIERlZmluaXRpb25zXG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnF1YWxpZmllZFByb3BlcnR5TmFtZSA9IGZ1bmN0aW9uICh0b2tlbikge1xuXHQgICAgICAgIHN3aXRjaCAodG9rZW4udHlwZSkge1xuXHQgICAgICAgICAgICBjYXNlIHRva2VuXzEuVG9rZW4uSWRlbnRpZmllcjpcblx0ICAgICAgICAgICAgY2FzZSB0b2tlbl8xLlRva2VuLlN0cmluZ0xpdGVyYWw6XG5cdCAgICAgICAgICAgIGNhc2UgdG9rZW5fMS5Ub2tlbi5Cb29sZWFuTGl0ZXJhbDpcblx0ICAgICAgICAgICAgY2FzZSB0b2tlbl8xLlRva2VuLk51bGxMaXRlcmFsOlxuXHQgICAgICAgICAgICBjYXNlIHRva2VuXzEuVG9rZW4uTnVtZXJpY0xpdGVyYWw6XG5cdCAgICAgICAgICAgIGNhc2UgdG9rZW5fMS5Ub2tlbi5LZXl3b3JkOlxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cdCAgICAgICAgICAgIGNhc2UgdG9rZW5fMS5Ub2tlbi5QdW5jdHVhdG9yOlxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuLnZhbHVlID09PSAnWyc7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiBmYWxzZTtcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlR2V0dGVyTWV0aG9kID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgdGhpcy5leHBlY3QoJygnKTtcblx0ICAgICAgICB0aGlzLmV4cGVjdCgnKScpO1xuXHQgICAgICAgIHZhciBpc0dlbmVyYXRvciA9IGZhbHNlO1xuXHQgICAgICAgIHZhciBwYXJhbXMgPSB7XG5cdCAgICAgICAgICAgIHBhcmFtczogW10sXG5cdCAgICAgICAgICAgIHN0cmljdGVkOiBudWxsLFxuXHQgICAgICAgICAgICBmaXJzdFJlc3RyaWN0ZWQ6IG51bGwsXG5cdCAgICAgICAgICAgIG1lc3NhZ2U6IG51bGxcblx0ICAgICAgICB9O1xuXHQgICAgICAgIHZhciBwcmV2aW91c0FsbG93WWllbGQgPSB0aGlzLmNvbnRleHQuYWxsb3dZaWVsZDtcblx0ICAgICAgICB0aGlzLmNvbnRleHQuYWxsb3dZaWVsZCA9IGZhbHNlO1xuXHQgICAgICAgIHZhciBtZXRob2QgPSB0aGlzLnBhcnNlUHJvcGVydHlNZXRob2QocGFyYW1zKTtcblx0ICAgICAgICB0aGlzLmNvbnRleHQuYWxsb3dZaWVsZCA9IHByZXZpb3VzQWxsb3dZaWVsZDtcblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5GdW5jdGlvbkV4cHJlc3Npb24obnVsbCwgcGFyYW1zLnBhcmFtcywgbWV0aG9kLCBpc0dlbmVyYXRvcikpO1xuXHQgICAgfTtcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VTZXR0ZXJNZXRob2QgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoKTtcblx0ICAgICAgICB2YXIgb3B0aW9ucyA9IHtcblx0ICAgICAgICAgICAgcGFyYW1zOiBbXSxcblx0ICAgICAgICAgICAgZmlyc3RSZXN0cmljdGVkOiBudWxsLFxuXHQgICAgICAgICAgICBwYXJhbVNldDoge31cblx0ICAgICAgICB9O1xuXHQgICAgICAgIHZhciBpc0dlbmVyYXRvciA9IGZhbHNlO1xuXHQgICAgICAgIHZhciBwcmV2aW91c0FsbG93WWllbGQgPSB0aGlzLmNvbnRleHQuYWxsb3dZaWVsZDtcblx0ICAgICAgICB0aGlzLmNvbnRleHQuYWxsb3dZaWVsZCA9IGZhbHNlO1xuXHQgICAgICAgIHRoaXMuZXhwZWN0KCcoJyk7XG5cdCAgICAgICAgaWYgKHRoaXMubWF0Y2goJyknKSkge1xuXHQgICAgICAgICAgICB0aGlzLnRvbGVyYXRlVW5leHBlY3RlZFRva2VuKHRoaXMubG9va2FoZWFkKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgIHRoaXMucGFyc2VGb3JtYWxQYXJhbWV0ZXIob3B0aW9ucyk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHRoaXMuZXhwZWN0KCcpJyk7XG5cdCAgICAgICAgdmFyIG1ldGhvZCA9IHRoaXMucGFyc2VQcm9wZXJ0eU1ldGhvZChvcHRpb25zKTtcblx0ICAgICAgICB0aGlzLmNvbnRleHQuYWxsb3dZaWVsZCA9IHByZXZpb3VzQWxsb3dZaWVsZDtcblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5GdW5jdGlvbkV4cHJlc3Npb24obnVsbCwgb3B0aW9ucy5wYXJhbXMsIG1ldGhvZCwgaXNHZW5lcmF0b3IpKTtcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlR2VuZXJhdG9yTWV0aG9kID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgdmFyIGlzR2VuZXJhdG9yID0gdHJ1ZTtcblx0ICAgICAgICB2YXIgcHJldmlvdXNBbGxvd1lpZWxkID0gdGhpcy5jb250ZXh0LmFsbG93WWllbGQ7XG5cdCAgICAgICAgdGhpcy5jb250ZXh0LmFsbG93WWllbGQgPSB0cnVlO1xuXHQgICAgICAgIHZhciBwYXJhbXMgPSB0aGlzLnBhcnNlRm9ybWFsUGFyYW1ldGVycygpO1xuXHQgICAgICAgIHRoaXMuY29udGV4dC5hbGxvd1lpZWxkID0gZmFsc2U7XG5cdCAgICAgICAgdmFyIG1ldGhvZCA9IHRoaXMucGFyc2VQcm9wZXJ0eU1ldGhvZChwYXJhbXMpO1xuXHQgICAgICAgIHRoaXMuY29udGV4dC5hbGxvd1lpZWxkID0gcHJldmlvdXNBbGxvd1lpZWxkO1xuXHQgICAgICAgIHJldHVybiB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBOb2RlLkZ1bmN0aW9uRXhwcmVzc2lvbihudWxsLCBwYXJhbXMucGFyYW1zLCBtZXRob2QsIGlzR2VuZXJhdG9yKSk7XG5cdCAgICB9O1xuXHQgICAgLy8gRUNNQS0yNjIgMTQuNCBHZW5lcmF0b3IgRnVuY3Rpb24gRGVmaW5pdGlvbnNcblx0ICAgIFBhcnNlci5wcm90b3R5cGUuaXNTdGFydE9mRXhwcmVzc2lvbiA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgc3RhcnQgPSB0cnVlO1xuXHQgICAgICAgIHZhciB2YWx1ZSA9IHRoaXMubG9va2FoZWFkLnZhbHVlO1xuXHQgICAgICAgIHN3aXRjaCAodGhpcy5sb29rYWhlYWQudHlwZSkge1xuXHQgICAgICAgICAgICBjYXNlIHRva2VuXzEuVG9rZW4uUHVuY3R1YXRvcjpcblx0ICAgICAgICAgICAgICAgIHN0YXJ0ID0gKHZhbHVlID09PSAnWycpIHx8ICh2YWx1ZSA9PT0gJygnKSB8fCAodmFsdWUgPT09ICd7JykgfHxcblx0ICAgICAgICAgICAgICAgICAgICAodmFsdWUgPT09ICcrJykgfHwgKHZhbHVlID09PSAnLScpIHx8XG5cdCAgICAgICAgICAgICAgICAgICAgKHZhbHVlID09PSAnIScpIHx8ICh2YWx1ZSA9PT0gJ34nKSB8fFxuXHQgICAgICAgICAgICAgICAgICAgICh2YWx1ZSA9PT0gJysrJykgfHwgKHZhbHVlID09PSAnLS0nKSB8fFxuXHQgICAgICAgICAgICAgICAgICAgICh2YWx1ZSA9PT0gJy8nKSB8fCAodmFsdWUgPT09ICcvPScpOyAvLyByZWd1bGFyIGV4cHJlc3Npb24gbGl0ZXJhbFxuXHQgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgIGNhc2UgdG9rZW5fMS5Ub2tlbi5LZXl3b3JkOlxuXHQgICAgICAgICAgICAgICAgc3RhcnQgPSAodmFsdWUgPT09ICdjbGFzcycpIHx8ICh2YWx1ZSA9PT0gJ2RlbGV0ZScpIHx8XG5cdCAgICAgICAgICAgICAgICAgICAgKHZhbHVlID09PSAnZnVuY3Rpb24nKSB8fCAodmFsdWUgPT09ICdsZXQnKSB8fCAodmFsdWUgPT09ICduZXcnKSB8fFxuXHQgICAgICAgICAgICAgICAgICAgICh2YWx1ZSA9PT0gJ3N1cGVyJykgfHwgKHZhbHVlID09PSAndGhpcycpIHx8ICh2YWx1ZSA9PT0gJ3R5cGVvZicpIHx8XG5cdCAgICAgICAgICAgICAgICAgICAgKHZhbHVlID09PSAndm9pZCcpIHx8ICh2YWx1ZSA9PT0gJ3lpZWxkJyk7XG5cdCAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgZGVmYXVsdDpcblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gc3RhcnQ7XG5cdCAgICB9O1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZVlpZWxkRXhwcmVzc2lvbiA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgbm9kZSA9IHRoaXMuY3JlYXRlTm9kZSgpO1xuXHQgICAgICAgIHRoaXMuZXhwZWN0S2V5d29yZCgneWllbGQnKTtcblx0ICAgICAgICB2YXIgYXJndW1lbnQgPSBudWxsO1xuXHQgICAgICAgIHZhciBkZWxlZ2F0ZSA9IGZhbHNlO1xuXHQgICAgICAgIGlmICghdGhpcy5oYXNMaW5lVGVybWluYXRvcikge1xuXHQgICAgICAgICAgICB2YXIgcHJldmlvdXNBbGxvd1lpZWxkID0gdGhpcy5jb250ZXh0LmFsbG93WWllbGQ7XG5cdCAgICAgICAgICAgIHRoaXMuY29udGV4dC5hbGxvd1lpZWxkID0gZmFsc2U7XG5cdCAgICAgICAgICAgIGRlbGVnYXRlID0gdGhpcy5tYXRjaCgnKicpO1xuXHQgICAgICAgICAgICBpZiAoZGVsZWdhdGUpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMubmV4dFRva2VuKCk7XG5cdCAgICAgICAgICAgICAgICBhcmd1bWVudCA9IHRoaXMucGFyc2VBc3NpZ25tZW50RXhwcmVzc2lvbigpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuaXNTdGFydE9mRXhwcmVzc2lvbigpKSB7XG5cdCAgICAgICAgICAgICAgICBhcmd1bWVudCA9IHRoaXMucGFyc2VBc3NpZ25tZW50RXhwcmVzc2lvbigpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHRoaXMuY29udGV4dC5hbGxvd1lpZWxkID0gcHJldmlvdXNBbGxvd1lpZWxkO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5ZaWVsZEV4cHJlc3Npb24oYXJndW1lbnQsIGRlbGVnYXRlKSk7XG5cdCAgICB9O1xuXHQgICAgLy8gRUNNQS0yNjIgMTQuNSBDbGFzcyBEZWZpbml0aW9uc1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZUNsYXNzRWxlbWVudCA9IGZ1bmN0aW9uIChoYXNDb25zdHJ1Y3Rvcikge1xuXHQgICAgICAgIHZhciB0b2tlbiA9IHRoaXMubG9va2FoZWFkO1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgdmFyIGtpbmQ7XG5cdCAgICAgICAgdmFyIGtleTtcblx0ICAgICAgICB2YXIgdmFsdWU7XG5cdCAgICAgICAgdmFyIGNvbXB1dGVkID0gZmFsc2U7XG5cdCAgICAgICAgdmFyIG1ldGhvZCA9IGZhbHNlO1xuXHQgICAgICAgIHZhciBpc1N0YXRpYyA9IGZhbHNlO1xuXHQgICAgICAgIGlmICh0aGlzLm1hdGNoKCcqJykpIHtcblx0ICAgICAgICAgICAgdGhpcy5uZXh0VG9rZW4oKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgIGNvbXB1dGVkID0gdGhpcy5tYXRjaCgnWycpO1xuXHQgICAgICAgICAgICBrZXkgPSB0aGlzLnBhcnNlT2JqZWN0UHJvcGVydHlLZXkoKTtcblx0ICAgICAgICAgICAgdmFyIGlkID0ga2V5O1xuXHQgICAgICAgICAgICBpZiAoaWQubmFtZSA9PT0gJ3N0YXRpYycgJiYgKHRoaXMucXVhbGlmaWVkUHJvcGVydHlOYW1lKHRoaXMubG9va2FoZWFkKSB8fCB0aGlzLm1hdGNoKCcqJykpKSB7XG5cdCAgICAgICAgICAgICAgICB0b2tlbiA9IHRoaXMubG9va2FoZWFkO1xuXHQgICAgICAgICAgICAgICAgaXNTdGF0aWMgPSB0cnVlO1xuXHQgICAgICAgICAgICAgICAgY29tcHV0ZWQgPSB0aGlzLm1hdGNoKCdbJyk7XG5cdCAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXRjaCgnKicpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0VG9rZW4oKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgIGtleSA9IHRoaXMucGFyc2VPYmplY3RQcm9wZXJ0eUtleSgpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHZhciBsb29rYWhlYWRQcm9wZXJ0eUtleSA9IHRoaXMucXVhbGlmaWVkUHJvcGVydHlOYW1lKHRoaXMubG9va2FoZWFkKTtcblx0ICAgICAgICBpZiAodG9rZW4udHlwZSA9PT0gdG9rZW5fMS5Ub2tlbi5JZGVudGlmaWVyKSB7XG5cdCAgICAgICAgICAgIGlmICh0b2tlbi52YWx1ZSA9PT0gJ2dldCcgJiYgbG9va2FoZWFkUHJvcGVydHlLZXkpIHtcblx0ICAgICAgICAgICAgICAgIGtpbmQgPSAnZ2V0Jztcblx0ICAgICAgICAgICAgICAgIGNvbXB1dGVkID0gdGhpcy5tYXRjaCgnWycpO1xuXHQgICAgICAgICAgICAgICAga2V5ID0gdGhpcy5wYXJzZU9iamVjdFByb3BlcnR5S2V5KCk7XG5cdCAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuYWxsb3dZaWVsZCA9IGZhbHNlO1xuXHQgICAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnBhcnNlR2V0dGVyTWV0aG9kKCk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZWxzZSBpZiAodG9rZW4udmFsdWUgPT09ICdzZXQnICYmIGxvb2thaGVhZFByb3BlcnR5S2V5KSB7XG5cdCAgICAgICAgICAgICAgICBraW5kID0gJ3NldCc7XG5cdCAgICAgICAgICAgICAgICBjb21wdXRlZCA9IHRoaXMubWF0Y2goJ1snKTtcblx0ICAgICAgICAgICAgICAgIGtleSA9IHRoaXMucGFyc2VPYmplY3RQcm9wZXJ0eUtleSgpO1xuXHQgICAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnBhcnNlU2V0dGVyTWV0aG9kKCk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gdG9rZW5fMS5Ub2tlbi5QdW5jdHVhdG9yICYmIHRva2VuLnZhbHVlID09PSAnKicgJiYgbG9va2FoZWFkUHJvcGVydHlLZXkpIHtcblx0ICAgICAgICAgICAga2luZCA9ICdpbml0Jztcblx0ICAgICAgICAgICAgY29tcHV0ZWQgPSB0aGlzLm1hdGNoKCdbJyk7XG5cdCAgICAgICAgICAgIGtleSA9IHRoaXMucGFyc2VPYmplY3RQcm9wZXJ0eUtleSgpO1xuXHQgICAgICAgICAgICB2YWx1ZSA9IHRoaXMucGFyc2VHZW5lcmF0b3JNZXRob2QoKTtcblx0ICAgICAgICAgICAgbWV0aG9kID0gdHJ1ZTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYgKCFraW5kICYmIGtleSAmJiB0aGlzLm1hdGNoKCcoJykpIHtcblx0ICAgICAgICAgICAga2luZCA9ICdpbml0Jztcblx0ICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnBhcnNlUHJvcGVydHlNZXRob2RGdW5jdGlvbigpO1xuXHQgICAgICAgICAgICBtZXRob2QgPSB0cnVlO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAoIWtpbmQpIHtcblx0ICAgICAgICAgICAgdGhpcy50aHJvd1VuZXhwZWN0ZWRUb2tlbih0aGlzLmxvb2thaGVhZCk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmIChraW5kID09PSAnaW5pdCcpIHtcblx0ICAgICAgICAgICAga2luZCA9ICdtZXRob2QnO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAoIWNvbXB1dGVkKSB7XG5cdCAgICAgICAgICAgIGlmIChpc1N0YXRpYyAmJiB0aGlzLmlzUHJvcGVydHlLZXkoa2V5LCAncHJvdG90eXBlJykpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMudGhyb3dVbmV4cGVjdGVkVG9rZW4odG9rZW4sIG1lc3NhZ2VzXzEuTWVzc2FnZXMuU3RhdGljUHJvdG90eXBlKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBpZiAoIWlzU3RhdGljICYmIHRoaXMuaXNQcm9wZXJ0eUtleShrZXksICdjb25zdHJ1Y3RvcicpKSB7XG5cdCAgICAgICAgICAgICAgICBpZiAoa2luZCAhPT0gJ21ldGhvZCcgfHwgIW1ldGhvZCB8fCB2YWx1ZS5nZW5lcmF0b3IpIHtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLnRocm93VW5leHBlY3RlZFRva2VuKHRva2VuLCBtZXNzYWdlc18xLk1lc3NhZ2VzLkNvbnN0cnVjdG9yU3BlY2lhbE1ldGhvZCk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBpZiAoaGFzQ29uc3RydWN0b3IudmFsdWUpIHtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLnRocm93VW5leHBlY3RlZFRva2VuKHRva2VuLCBtZXNzYWdlc18xLk1lc3NhZ2VzLkR1cGxpY2F0ZUNvbnN0cnVjdG9yKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgIGhhc0NvbnN0cnVjdG9yLnZhbHVlID0gdHJ1ZTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGtpbmQgPSAnY29uc3RydWN0b3InO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBOb2RlLk1ldGhvZERlZmluaXRpb24oa2V5LCBjb21wdXRlZCwgdmFsdWUsIGtpbmQsIGlzU3RhdGljKSk7XG5cdCAgICB9O1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZUNsYXNzRWxlbWVudExpc3QgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIGJvZHkgPSBbXTtcblx0ICAgICAgICB2YXIgaGFzQ29uc3RydWN0b3IgPSB7IHZhbHVlOiBmYWxzZSB9O1xuXHQgICAgICAgIHRoaXMuZXhwZWN0KCd7Jyk7XG5cdCAgICAgICAgd2hpbGUgKCF0aGlzLm1hdGNoKCd9JykpIHtcblx0ICAgICAgICAgICAgaWYgKHRoaXMubWF0Y2goJzsnKSkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy5uZXh0VG9rZW4oKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIGJvZHkucHVzaCh0aGlzLnBhcnNlQ2xhc3NFbGVtZW50KGhhc0NvbnN0cnVjdG9yKSk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgdGhpcy5leHBlY3QoJ30nKTtcblx0ICAgICAgICByZXR1cm4gYm9keTtcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlQ2xhc3NCb2R5ID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgdmFyIGVsZW1lbnRMaXN0ID0gdGhpcy5wYXJzZUNsYXNzRWxlbWVudExpc3QoKTtcblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5DbGFzc0JvZHkoZWxlbWVudExpc3QpKTtcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlQ2xhc3NEZWNsYXJhdGlvbiA9IGZ1bmN0aW9uIChpZGVudGlmaWVySXNPcHRpb25hbCkge1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgdmFyIHByZXZpb3VzU3RyaWN0ID0gdGhpcy5jb250ZXh0LnN0cmljdDtcblx0ICAgICAgICB0aGlzLmNvbnRleHQuc3RyaWN0ID0gdHJ1ZTtcblx0ICAgICAgICB0aGlzLmV4cGVjdEtleXdvcmQoJ2NsYXNzJyk7XG5cdCAgICAgICAgdmFyIGlkID0gKGlkZW50aWZpZXJJc09wdGlvbmFsICYmICh0aGlzLmxvb2thaGVhZC50eXBlICE9PSB0b2tlbl8xLlRva2VuLklkZW50aWZpZXIpKSA/IG51bGwgOiB0aGlzLnBhcnNlVmFyaWFibGVJZGVudGlmaWVyKCk7XG5cdCAgICAgICAgdmFyIHN1cGVyQ2xhc3MgPSBudWxsO1xuXHQgICAgICAgIGlmICh0aGlzLm1hdGNoS2V5d29yZCgnZXh0ZW5kcycpKSB7XG5cdCAgICAgICAgICAgIHRoaXMubmV4dFRva2VuKCk7XG5cdCAgICAgICAgICAgIHN1cGVyQ2xhc3MgPSB0aGlzLmlzb2xhdGVDb3ZlckdyYW1tYXIodGhpcy5wYXJzZUxlZnRIYW5kU2lkZUV4cHJlc3Npb25BbGxvd0NhbGwpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICB2YXIgY2xhc3NCb2R5ID0gdGhpcy5wYXJzZUNsYXNzQm9keSgpO1xuXHQgICAgICAgIHRoaXMuY29udGV4dC5zdHJpY3QgPSBwcmV2aW91c1N0cmljdDtcblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5DbGFzc0RlY2xhcmF0aW9uKGlkLCBzdXBlckNsYXNzLCBjbGFzc0JvZHkpKTtcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlQ2xhc3NFeHByZXNzaW9uID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgdmFyIHByZXZpb3VzU3RyaWN0ID0gdGhpcy5jb250ZXh0LnN0cmljdDtcblx0ICAgICAgICB0aGlzLmNvbnRleHQuc3RyaWN0ID0gdHJ1ZTtcblx0ICAgICAgICB0aGlzLmV4cGVjdEtleXdvcmQoJ2NsYXNzJyk7XG5cdCAgICAgICAgdmFyIGlkID0gKHRoaXMubG9va2FoZWFkLnR5cGUgPT09IHRva2VuXzEuVG9rZW4uSWRlbnRpZmllcikgPyB0aGlzLnBhcnNlVmFyaWFibGVJZGVudGlmaWVyKCkgOiBudWxsO1xuXHQgICAgICAgIHZhciBzdXBlckNsYXNzID0gbnVsbDtcblx0ICAgICAgICBpZiAodGhpcy5tYXRjaEtleXdvcmQoJ2V4dGVuZHMnKSkge1xuXHQgICAgICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgICAgICBzdXBlckNsYXNzID0gdGhpcy5pc29sYXRlQ292ZXJHcmFtbWFyKHRoaXMucGFyc2VMZWZ0SGFuZFNpZGVFeHByZXNzaW9uQWxsb3dDYWxsKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIGNsYXNzQm9keSA9IHRoaXMucGFyc2VDbGFzc0JvZHkoKTtcblx0ICAgICAgICB0aGlzLmNvbnRleHQuc3RyaWN0ID0gcHJldmlvdXNTdHJpY3Q7XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuQ2xhc3NFeHByZXNzaW9uKGlkLCBzdXBlckNsYXNzLCBjbGFzc0JvZHkpKTtcblx0ICAgIH07XG5cdCAgICAvLyBFQ01BLTI2MiAxNS4xIFNjcmlwdHNcblx0ICAgIC8vIEVDTUEtMjYyIDE1LjIgTW9kdWxlc1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZVByb2dyYW0gPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoKTtcblx0ICAgICAgICB2YXIgYm9keSA9IHRoaXMucGFyc2VEaXJlY3RpdmVQcm9sb2d1ZXMoKTtcblx0ICAgICAgICB3aGlsZSAodGhpcy5zdGFydE1hcmtlci5pbmRleCA8IHRoaXMuc2Nhbm5lci5sZW5ndGgpIHtcblx0ICAgICAgICAgICAgYm9keS5wdXNoKHRoaXMucGFyc2VTdGF0ZW1lbnRMaXN0SXRlbSgpKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuUHJvZ3JhbShib2R5LCB0aGlzLnNvdXJjZVR5cGUpKTtcblx0ICAgIH07XG5cdCAgICAvLyBFQ01BLTI2MiAxNS4yLjIgSW1wb3J0c1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZU1vZHVsZVNwZWNpZmllciA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgbm9kZSA9IHRoaXMuY3JlYXRlTm9kZSgpO1xuXHQgICAgICAgIGlmICh0aGlzLmxvb2thaGVhZC50eXBlICE9PSB0b2tlbl8xLlRva2VuLlN0cmluZ0xpdGVyYWwpIHtcblx0ICAgICAgICAgICAgdGhpcy50aHJvd0Vycm9yKG1lc3NhZ2VzXzEuTWVzc2FnZXMuSW52YWxpZE1vZHVsZVNwZWNpZmllcik7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHZhciB0b2tlbiA9IHRoaXMubmV4dFRva2VuKCk7XG5cdCAgICAgICAgdmFyIHJhdyA9IHRoaXMuZ2V0VG9rZW5SYXcodG9rZW4pO1xuXHQgICAgICAgIHJldHVybiB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBOb2RlLkxpdGVyYWwodG9rZW4udmFsdWUsIHJhdykpO1xuXHQgICAgfTtcblx0ICAgIC8vIGltcG9ydCB7PGZvbyBhcyBiYXI+fSAuLi47XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlSW1wb3J0U3BlY2lmaWVyID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgdmFyIGltcG9ydGVkO1xuXHQgICAgICAgIHZhciBsb2NhbDtcblx0ICAgICAgICBpZiAodGhpcy5sb29rYWhlYWQudHlwZSA9PT0gdG9rZW5fMS5Ub2tlbi5JZGVudGlmaWVyKSB7XG5cdCAgICAgICAgICAgIGltcG9ydGVkID0gdGhpcy5wYXJzZVZhcmlhYmxlSWRlbnRpZmllcigpO1xuXHQgICAgICAgICAgICBsb2NhbCA9IGltcG9ydGVkO1xuXHQgICAgICAgICAgICBpZiAodGhpcy5tYXRjaENvbnRleHR1YWxLZXl3b3JkKCdhcycpKSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgICAgICAgICAgbG9jYWwgPSB0aGlzLnBhcnNlVmFyaWFibGVJZGVudGlmaWVyKCk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgIGltcG9ydGVkID0gdGhpcy5wYXJzZUlkZW50aWZpZXJOYW1lKCk7XG5cdCAgICAgICAgICAgIGxvY2FsID0gaW1wb3J0ZWQ7XG5cdCAgICAgICAgICAgIGlmICh0aGlzLm1hdGNoQ29udGV4dHVhbEtleXdvcmQoJ2FzJykpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMubmV4dFRva2VuKCk7XG5cdCAgICAgICAgICAgICAgICBsb2NhbCA9IHRoaXMucGFyc2VWYXJpYWJsZUlkZW50aWZpZXIoKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMudGhyb3dVbmV4cGVjdGVkVG9rZW4odGhpcy5uZXh0VG9rZW4oKSk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuSW1wb3J0U3BlY2lmaWVyKGxvY2FsLCBpbXBvcnRlZCkpO1xuXHQgICAgfTtcblx0ICAgIC8vIHtmb28sIGJhciBhcyBiYXN9XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlTmFtZWRJbXBvcnRzID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHRoaXMuZXhwZWN0KCd7Jyk7XG5cdCAgICAgICAgdmFyIHNwZWNpZmllcnMgPSBbXTtcblx0ICAgICAgICB3aGlsZSAoIXRoaXMubWF0Y2goJ30nKSkge1xuXHQgICAgICAgICAgICBzcGVjaWZpZXJzLnB1c2godGhpcy5wYXJzZUltcG9ydFNwZWNpZmllcigpKTtcblx0ICAgICAgICAgICAgaWYgKCF0aGlzLm1hdGNoKCd9JykpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMuZXhwZWN0KCcsJyk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgdGhpcy5leHBlY3QoJ30nKTtcblx0ICAgICAgICByZXR1cm4gc3BlY2lmaWVycztcblx0ICAgIH07XG5cdCAgICAvLyBpbXBvcnQgPGZvbz4gLi4uO1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZUltcG9ydERlZmF1bHRTcGVjaWZpZXIgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoKTtcblx0ICAgICAgICB2YXIgbG9jYWwgPSB0aGlzLnBhcnNlSWRlbnRpZmllck5hbWUoKTtcblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5JbXBvcnREZWZhdWx0U3BlY2lmaWVyKGxvY2FsKSk7XG5cdCAgICB9O1xuXHQgICAgLy8gaW1wb3J0IDwqIGFzIGZvbz4gLi4uO1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZUltcG9ydE5hbWVzcGFjZVNwZWNpZmllciA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgbm9kZSA9IHRoaXMuY3JlYXRlTm9kZSgpO1xuXHQgICAgICAgIHRoaXMuZXhwZWN0KCcqJyk7XG5cdCAgICAgICAgaWYgKCF0aGlzLm1hdGNoQ29udGV4dHVhbEtleXdvcmQoJ2FzJykpIHtcblx0ICAgICAgICAgICAgdGhpcy50aHJvd0Vycm9yKG1lc3NhZ2VzXzEuTWVzc2FnZXMuTm9Bc0FmdGVySW1wb3J0TmFtZXNwYWNlKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgdGhpcy5uZXh0VG9rZW4oKTtcblx0ICAgICAgICB2YXIgbG9jYWwgPSB0aGlzLnBhcnNlSWRlbnRpZmllck5hbWUoKTtcblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5JbXBvcnROYW1lc3BhY2VTcGVjaWZpZXIobG9jYWwpKTtcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlSW1wb3J0RGVjbGFyYXRpb24gPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgaWYgKHRoaXMuY29udGV4dC5pbkZ1bmN0aW9uQm9keSkge1xuXHQgICAgICAgICAgICB0aGlzLnRocm93RXJyb3IobWVzc2FnZXNfMS5NZXNzYWdlcy5JbGxlZ2FsSW1wb3J0RGVjbGFyYXRpb24pO1xuXHQgICAgICAgIH1cblx0ICAgICAgICB2YXIgbm9kZSA9IHRoaXMuY3JlYXRlTm9kZSgpO1xuXHQgICAgICAgIHRoaXMuZXhwZWN0S2V5d29yZCgnaW1wb3J0Jyk7XG5cdCAgICAgICAgdmFyIHNyYztcblx0ICAgICAgICB2YXIgc3BlY2lmaWVycyA9IFtdO1xuXHQgICAgICAgIGlmICh0aGlzLmxvb2thaGVhZC50eXBlID09PSB0b2tlbl8xLlRva2VuLlN0cmluZ0xpdGVyYWwpIHtcblx0ICAgICAgICAgICAgLy8gaW1wb3J0ICdmb28nO1xuXHQgICAgICAgICAgICBzcmMgPSB0aGlzLnBhcnNlTW9kdWxlU3BlY2lmaWVyKCk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICBpZiAodGhpcy5tYXRjaCgneycpKSB7XG5cdCAgICAgICAgICAgICAgICAvLyBpbXBvcnQge2Jhcn1cblx0ICAgICAgICAgICAgICAgIHNwZWNpZmllcnMgPSBzcGVjaWZpZXJzLmNvbmNhdCh0aGlzLnBhcnNlTmFtZWRJbXBvcnRzKCkpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMubWF0Y2goJyonKSkge1xuXHQgICAgICAgICAgICAgICAgLy8gaW1wb3J0ICogYXMgZm9vXG5cdCAgICAgICAgICAgICAgICBzcGVjaWZpZXJzLnB1c2godGhpcy5wYXJzZUltcG9ydE5hbWVzcGFjZVNwZWNpZmllcigpKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmlzSWRlbnRpZmllck5hbWUodGhpcy5sb29rYWhlYWQpICYmICF0aGlzLm1hdGNoS2V5d29yZCgnZGVmYXVsdCcpKSB7XG5cdCAgICAgICAgICAgICAgICAvLyBpbXBvcnQgZm9vXG5cdCAgICAgICAgICAgICAgICBzcGVjaWZpZXJzLnB1c2godGhpcy5wYXJzZUltcG9ydERlZmF1bHRTcGVjaWZpZXIoKSk7XG5cdCAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXRjaCgnLCcpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0VG9rZW4oKTtcblx0ICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXRjaCgnKicpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIC8vIGltcG9ydCBmb28sICogYXMgZm9vXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHNwZWNpZmllcnMucHVzaCh0aGlzLnBhcnNlSW1wb3J0TmFtZXNwYWNlU3BlY2lmaWVyKCkpO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLm1hdGNoKCd7JykpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW1wb3J0IGZvbywge2Jhcn1cblx0ICAgICAgICAgICAgICAgICAgICAgICAgc3BlY2lmaWVycyA9IHNwZWNpZmllcnMuY29uY2F0KHRoaXMucGFyc2VOYW1lZEltcG9ydHMoKSk7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRocm93VW5leHBlY3RlZFRva2VuKHRoaXMubG9va2FoZWFkKTtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnRocm93VW5leHBlY3RlZFRva2VuKHRoaXMubmV4dFRva2VuKCkpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGlmICghdGhpcy5tYXRjaENvbnRleHR1YWxLZXl3b3JkKCdmcm9tJykpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gdGhpcy5sb29rYWhlYWQudmFsdWUgPyBtZXNzYWdlc18xLk1lc3NhZ2VzLlVuZXhwZWN0ZWRUb2tlbiA6IG1lc3NhZ2VzXzEuTWVzc2FnZXMuTWlzc2luZ0Zyb21DbGF1c2U7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnRocm93RXJyb3IobWVzc2FnZSwgdGhpcy5sb29rYWhlYWQudmFsdWUpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHRoaXMubmV4dFRva2VuKCk7XG5cdCAgICAgICAgICAgIHNyYyA9IHRoaXMucGFyc2VNb2R1bGVTcGVjaWZpZXIoKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgdGhpcy5jb25zdW1lU2VtaWNvbG9uKCk7XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuSW1wb3J0RGVjbGFyYXRpb24oc3BlY2lmaWVycywgc3JjKSk7XG5cdCAgICB9O1xuXHQgICAgLy8gRUNNQS0yNjIgMTUuMi4zIEV4cG9ydHNcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VFeHBvcnRTcGVjaWZpZXIgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoKTtcblx0ICAgICAgICB2YXIgbG9jYWwgPSB0aGlzLnBhcnNlSWRlbnRpZmllck5hbWUoKTtcblx0ICAgICAgICB2YXIgZXhwb3J0ZWQgPSBsb2NhbDtcblx0ICAgICAgICBpZiAodGhpcy5tYXRjaENvbnRleHR1YWxLZXl3b3JkKCdhcycpKSB7XG5cdCAgICAgICAgICAgIHRoaXMubmV4dFRva2VuKCk7XG5cdCAgICAgICAgICAgIGV4cG9ydGVkID0gdGhpcy5wYXJzZUlkZW50aWZpZXJOYW1lKCk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBOb2RlLkV4cG9ydFNwZWNpZmllcihsb2NhbCwgZXhwb3J0ZWQpKTtcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlRXhwb3J0RGVjbGFyYXRpb24gPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgaWYgKHRoaXMuY29udGV4dC5pbkZ1bmN0aW9uQm9keSkge1xuXHQgICAgICAgICAgICB0aGlzLnRocm93RXJyb3IobWVzc2FnZXNfMS5NZXNzYWdlcy5JbGxlZ2FsRXhwb3J0RGVjbGFyYXRpb24pO1xuXHQgICAgICAgIH1cblx0ICAgICAgICB2YXIgbm9kZSA9IHRoaXMuY3JlYXRlTm9kZSgpO1xuXHQgICAgICAgIHRoaXMuZXhwZWN0S2V5d29yZCgnZXhwb3J0Jyk7XG5cdCAgICAgICAgdmFyIGV4cG9ydERlY2xhcmF0aW9uO1xuXHQgICAgICAgIGlmICh0aGlzLm1hdGNoS2V5d29yZCgnZGVmYXVsdCcpKSB7XG5cdCAgICAgICAgICAgIC8vIGV4cG9ydCBkZWZhdWx0IC4uLlxuXHQgICAgICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgICAgICBpZiAodGhpcy5tYXRjaEtleXdvcmQoJ2Z1bmN0aW9uJykpIHtcblx0ICAgICAgICAgICAgICAgIC8vIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZvbyAoKSB7fVxuXHQgICAgICAgICAgICAgICAgLy8gZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge31cblx0ICAgICAgICAgICAgICAgIHZhciBkZWNsYXJhdGlvbiA9IHRoaXMucGFyc2VGdW5jdGlvbkRlY2xhcmF0aW9uKHRydWUpO1xuXHQgICAgICAgICAgICAgICAgZXhwb3J0RGVjbGFyYXRpb24gPSB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBOb2RlLkV4cG9ydERlZmF1bHREZWNsYXJhdGlvbihkZWNsYXJhdGlvbikpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMubWF0Y2hLZXl3b3JkKCdjbGFzcycpKSB7XG5cdCAgICAgICAgICAgICAgICAvLyBleHBvcnQgZGVmYXVsdCBjbGFzcyBmb28ge31cblx0ICAgICAgICAgICAgICAgIHZhciBkZWNsYXJhdGlvbiA9IHRoaXMucGFyc2VDbGFzc0RlY2xhcmF0aW9uKHRydWUpO1xuXHQgICAgICAgICAgICAgICAgZXhwb3J0RGVjbGFyYXRpb24gPSB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBOb2RlLkV4cG9ydERlZmF1bHREZWNsYXJhdGlvbihkZWNsYXJhdGlvbikpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgaWYgKHRoaXMubWF0Y2hDb250ZXh0dWFsS2V5d29yZCgnZnJvbScpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy50aHJvd0Vycm9yKG1lc3NhZ2VzXzEuTWVzc2FnZXMuVW5leHBlY3RlZFRva2VuLCB0aGlzLmxvb2thaGVhZC52YWx1ZSk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAvLyBleHBvcnQgZGVmYXVsdCB7fTtcblx0ICAgICAgICAgICAgICAgIC8vIGV4cG9ydCBkZWZhdWx0IFtdO1xuXHQgICAgICAgICAgICAgICAgLy8gZXhwb3J0IGRlZmF1bHQgKDEgKyAyKTtcblx0ICAgICAgICAgICAgICAgIHZhciBkZWNsYXJhdGlvbiA9IHRoaXMubWF0Y2goJ3snKSA/IHRoaXMucGFyc2VPYmplY3RJbml0aWFsaXplcigpIDpcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLm1hdGNoKCdbJykgPyB0aGlzLnBhcnNlQXJyYXlJbml0aWFsaXplcigpIDogdGhpcy5wYXJzZUFzc2lnbm1lbnRFeHByZXNzaW9uKCk7XG5cdCAgICAgICAgICAgICAgICB0aGlzLmNvbnN1bWVTZW1pY29sb24oKTtcblx0ICAgICAgICAgICAgICAgIGV4cG9ydERlY2xhcmF0aW9uID0gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5FeHBvcnREZWZhdWx0RGVjbGFyYXRpb24oZGVjbGFyYXRpb24pKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIGlmICh0aGlzLm1hdGNoKCcqJykpIHtcblx0ICAgICAgICAgICAgLy8gZXhwb3J0ICogZnJvbSAnZm9vJztcblx0ICAgICAgICAgICAgdGhpcy5uZXh0VG9rZW4oKTtcblx0ICAgICAgICAgICAgaWYgKCF0aGlzLm1hdGNoQ29udGV4dHVhbEtleXdvcmQoJ2Zyb20nKSkge1xuXHQgICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSB0aGlzLmxvb2thaGVhZC52YWx1ZSA/IG1lc3NhZ2VzXzEuTWVzc2FnZXMuVW5leHBlY3RlZFRva2VuIDogbWVzc2FnZXNfMS5NZXNzYWdlcy5NaXNzaW5nRnJvbUNsYXVzZTtcblx0ICAgICAgICAgICAgICAgIHRoaXMudGhyb3dFcnJvcihtZXNzYWdlLCB0aGlzLmxvb2thaGVhZC52YWx1ZSk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgdGhpcy5uZXh0VG9rZW4oKTtcblx0ICAgICAgICAgICAgdmFyIHNyYyA9IHRoaXMucGFyc2VNb2R1bGVTcGVjaWZpZXIoKTtcblx0ICAgICAgICAgICAgdGhpcy5jb25zdW1lU2VtaWNvbG9uKCk7XG5cdCAgICAgICAgICAgIGV4cG9ydERlY2xhcmF0aW9uID0gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5FeHBvcnRBbGxEZWNsYXJhdGlvbihzcmMpKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZWxzZSBpZiAodGhpcy5sb29rYWhlYWQudHlwZSA9PT0gdG9rZW5fMS5Ub2tlbi5LZXl3b3JkKSB7XG5cdCAgICAgICAgICAgIC8vIGV4cG9ydCB2YXIgZiA9IDE7XG5cdCAgICAgICAgICAgIHZhciBkZWNsYXJhdGlvbiA9IHZvaWQgMDtcblx0ICAgICAgICAgICAgc3dpdGNoICh0aGlzLmxvb2thaGVhZC52YWx1ZSkge1xuXHQgICAgICAgICAgICAgICAgY2FzZSAnbGV0Jzpcblx0ICAgICAgICAgICAgICAgIGNhc2UgJ2NvbnN0Jzpcblx0ICAgICAgICAgICAgICAgICAgICBkZWNsYXJhdGlvbiA9IHRoaXMucGFyc2VMZXhpY2FsRGVjbGFyYXRpb24oeyBpbkZvcjogZmFsc2UgfSk7XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICBjYXNlICd2YXInOlxuXHQgICAgICAgICAgICAgICAgY2FzZSAnY2xhc3MnOlxuXHQgICAgICAgICAgICAgICAgY2FzZSAnZnVuY3Rpb24nOlxuXHQgICAgICAgICAgICAgICAgICAgIGRlY2xhcmF0aW9uID0gdGhpcy5wYXJzZVN0YXRlbWVudExpc3RJdGVtKCk7XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICBkZWZhdWx0OlxuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMudGhyb3dVbmV4cGVjdGVkVG9rZW4odGhpcy5sb29rYWhlYWQpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGV4cG9ydERlY2xhcmF0aW9uID0gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5FeHBvcnROYW1lZERlY2xhcmF0aW9uKGRlY2xhcmF0aW9uLCBbXSwgbnVsbCkpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgdmFyIHNwZWNpZmllcnMgPSBbXTtcblx0ICAgICAgICAgICAgdmFyIHNvdXJjZSA9IG51bGw7XG5cdCAgICAgICAgICAgIHZhciBpc0V4cG9ydEZyb21JZGVudGlmaWVyID0gZmFsc2U7XG5cdCAgICAgICAgICAgIHRoaXMuZXhwZWN0KCd7Jyk7XG5cdCAgICAgICAgICAgIHdoaWxlICghdGhpcy5tYXRjaCgnfScpKSB7XG5cdCAgICAgICAgICAgICAgICBpc0V4cG9ydEZyb21JZGVudGlmaWVyID0gaXNFeHBvcnRGcm9tSWRlbnRpZmllciB8fCB0aGlzLm1hdGNoS2V5d29yZCgnZGVmYXVsdCcpO1xuXHQgICAgICAgICAgICAgICAgc3BlY2lmaWVycy5wdXNoKHRoaXMucGFyc2VFeHBvcnRTcGVjaWZpZXIoKSk7XG5cdCAgICAgICAgICAgICAgICBpZiAoIXRoaXMubWF0Y2goJ30nKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuZXhwZWN0KCcsJyk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgdGhpcy5leHBlY3QoJ30nKTtcblx0ICAgICAgICAgICAgaWYgKHRoaXMubWF0Y2hDb250ZXh0dWFsS2V5d29yZCgnZnJvbScpKSB7XG5cdCAgICAgICAgICAgICAgICAvLyBleHBvcnQge2RlZmF1bHR9IGZyb20gJ2Zvbyc7XG5cdCAgICAgICAgICAgICAgICAvLyBleHBvcnQge2Zvb30gZnJvbSAnZm9vJztcblx0ICAgICAgICAgICAgICAgIHRoaXMubmV4dFRva2VuKCk7XG5cdCAgICAgICAgICAgICAgICBzb3VyY2UgPSB0aGlzLnBhcnNlTW9kdWxlU3BlY2lmaWVyKCk7XG5cdCAgICAgICAgICAgICAgICB0aGlzLmNvbnN1bWVTZW1pY29sb24oKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBlbHNlIGlmIChpc0V4cG9ydEZyb21JZGVudGlmaWVyKSB7XG5cdCAgICAgICAgICAgICAgICAvLyBleHBvcnQge2RlZmF1bHR9OyAvLyBtaXNzaW5nIGZyb21DbGF1c2Vcblx0ICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gdGhpcy5sb29rYWhlYWQudmFsdWUgPyBtZXNzYWdlc18xLk1lc3NhZ2VzLlVuZXhwZWN0ZWRUb2tlbiA6IG1lc3NhZ2VzXzEuTWVzc2FnZXMuTWlzc2luZ0Zyb21DbGF1c2U7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnRocm93RXJyb3IobWVzc2FnZSwgdGhpcy5sb29rYWhlYWQudmFsdWUpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgLy8gZXhwb3J0IHtmb299O1xuXHQgICAgICAgICAgICAgICAgdGhpcy5jb25zdW1lU2VtaWNvbG9uKCk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZXhwb3J0RGVjbGFyYXRpb24gPSB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBOb2RlLkV4cG9ydE5hbWVkRGVjbGFyYXRpb24obnVsbCwgc3BlY2lmaWVycywgc291cmNlKSk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiBleHBvcnREZWNsYXJhdGlvbjtcblx0ICAgIH07XG5cdCAgICByZXR1cm4gUGFyc2VyO1xuXHR9KCkpO1xuXHRleHBvcnRzLlBhcnNlciA9IFBhcnNlcjtcblxuXG4vKioqLyB9LFxuLyogNCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0Ly8gRW5zdXJlIHRoZSBjb25kaXRpb24gaXMgdHJ1ZSwgb3RoZXJ3aXNlIHRocm93IGFuIGVycm9yLlxuXHQvLyBUaGlzIGlzIG9ubHkgdG8gaGF2ZSBhIGJldHRlciBjb250cmFjdCBzZW1hbnRpYywgaS5lLiBhbm90aGVyIHNhZmV0eSBuZXRcblx0Ly8gdG8gY2F0Y2ggYSBsb2dpYyBlcnJvci4gVGhlIGNvbmRpdGlvbiBzaGFsbCBiZSBmdWxmaWxsZWQgaW4gbm9ybWFsIGNhc2UuXG5cdC8vIERvIE5PVCB1c2UgdGhpcyB0byBlbmZvcmNlIGEgY2VydGFpbiBjb25kaXRpb24gb24gYW55IHVzZXIgaW5wdXQuXG5cdFwidXNlIHN0cmljdFwiO1xuXHRmdW5jdGlvbiBhc3NlcnQoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG5cdCAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cblx0ICAgIGlmICghY29uZGl0aW9uKSB7XG5cdCAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBU1NFUlQ6ICcgKyBtZXNzYWdlKTtcblx0ICAgIH1cblx0fVxuXHRleHBvcnRzLmFzc2VydCA9IGFzc2VydDtcblxuXG4vKioqLyB9LFxuLyogNSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0XCJ1c2Ugc3RyaWN0XCI7XG5cdC8vIEVycm9yIG1lc3NhZ2VzIHNob3VsZCBiZSBpZGVudGljYWwgdG8gVjguXG5cdGV4cG9ydHMuTWVzc2FnZXMgPSB7XG5cdCAgICBVbmV4cGVjdGVkVG9rZW46ICdVbmV4cGVjdGVkIHRva2VuICUwJyxcblx0ICAgIFVuZXhwZWN0ZWRUb2tlbklsbGVnYWw6ICdVbmV4cGVjdGVkIHRva2VuIElMTEVHQUwnLFxuXHQgICAgVW5leHBlY3RlZE51bWJlcjogJ1VuZXhwZWN0ZWQgbnVtYmVyJyxcblx0ICAgIFVuZXhwZWN0ZWRTdHJpbmc6ICdVbmV4cGVjdGVkIHN0cmluZycsXG5cdCAgICBVbmV4cGVjdGVkSWRlbnRpZmllcjogJ1VuZXhwZWN0ZWQgaWRlbnRpZmllcicsXG5cdCAgICBVbmV4cGVjdGVkUmVzZXJ2ZWQ6ICdVbmV4cGVjdGVkIHJlc2VydmVkIHdvcmQnLFxuXHQgICAgVW5leHBlY3RlZFRlbXBsYXRlOiAnVW5leHBlY3RlZCBxdWFzaSAlMCcsXG5cdCAgICBVbmV4cGVjdGVkRU9TOiAnVW5leHBlY3RlZCBlbmQgb2YgaW5wdXQnLFxuXHQgICAgTmV3bGluZUFmdGVyVGhyb3c6ICdJbGxlZ2FsIG5ld2xpbmUgYWZ0ZXIgdGhyb3cnLFxuXHQgICAgSW52YWxpZFJlZ0V4cDogJ0ludmFsaWQgcmVndWxhciBleHByZXNzaW9uJyxcblx0ICAgIFVudGVybWluYXRlZFJlZ0V4cDogJ0ludmFsaWQgcmVndWxhciBleHByZXNzaW9uOiBtaXNzaW5nIC8nLFxuXHQgICAgSW52YWxpZExIU0luQXNzaWdubWVudDogJ0ludmFsaWQgbGVmdC1oYW5kIHNpZGUgaW4gYXNzaWdubWVudCcsXG5cdCAgICBJbnZhbGlkTEhTSW5Gb3JJbjogJ0ludmFsaWQgbGVmdC1oYW5kIHNpZGUgaW4gZm9yLWluJyxcblx0ICAgIEludmFsaWRMSFNJbkZvckxvb3A6ICdJbnZhbGlkIGxlZnQtaGFuZCBzaWRlIGluIGZvci1sb29wJyxcblx0ICAgIE11bHRpcGxlRGVmYXVsdHNJblN3aXRjaDogJ01vcmUgdGhhbiBvbmUgZGVmYXVsdCBjbGF1c2UgaW4gc3dpdGNoIHN0YXRlbWVudCcsXG5cdCAgICBOb0NhdGNoT3JGaW5hbGx5OiAnTWlzc2luZyBjYXRjaCBvciBmaW5hbGx5IGFmdGVyIHRyeScsXG5cdCAgICBVbmtub3duTGFiZWw6ICdVbmRlZmluZWQgbGFiZWwgXFwnJTBcXCcnLFxuXHQgICAgUmVkZWNsYXJhdGlvbjogJyUwIFxcJyUxXFwnIGhhcyBhbHJlYWR5IGJlZW4gZGVjbGFyZWQnLFxuXHQgICAgSWxsZWdhbENvbnRpbnVlOiAnSWxsZWdhbCBjb250aW51ZSBzdGF0ZW1lbnQnLFxuXHQgICAgSWxsZWdhbEJyZWFrOiAnSWxsZWdhbCBicmVhayBzdGF0ZW1lbnQnLFxuXHQgICAgSWxsZWdhbFJldHVybjogJ0lsbGVnYWwgcmV0dXJuIHN0YXRlbWVudCcsXG5cdCAgICBTdHJpY3RNb2RlV2l0aDogJ1N0cmljdCBtb2RlIGNvZGUgbWF5IG5vdCBpbmNsdWRlIGEgd2l0aCBzdGF0ZW1lbnQnLFxuXHQgICAgU3RyaWN0Q2F0Y2hWYXJpYWJsZTogJ0NhdGNoIHZhcmlhYmxlIG1heSBub3QgYmUgZXZhbCBvciBhcmd1bWVudHMgaW4gc3RyaWN0IG1vZGUnLFxuXHQgICAgU3RyaWN0VmFyTmFtZTogJ1ZhcmlhYmxlIG5hbWUgbWF5IG5vdCBiZSBldmFsIG9yIGFyZ3VtZW50cyBpbiBzdHJpY3QgbW9kZScsXG5cdCAgICBTdHJpY3RQYXJhbU5hbWU6ICdQYXJhbWV0ZXIgbmFtZSBldmFsIG9yIGFyZ3VtZW50cyBpcyBub3QgYWxsb3dlZCBpbiBzdHJpY3QgbW9kZScsXG5cdCAgICBTdHJpY3RQYXJhbUR1cGU6ICdTdHJpY3QgbW9kZSBmdW5jdGlvbiBtYXkgbm90IGhhdmUgZHVwbGljYXRlIHBhcmFtZXRlciBuYW1lcycsXG5cdCAgICBTdHJpY3RGdW5jdGlvbk5hbWU6ICdGdW5jdGlvbiBuYW1lIG1heSBub3QgYmUgZXZhbCBvciBhcmd1bWVudHMgaW4gc3RyaWN0IG1vZGUnLFxuXHQgICAgU3RyaWN0T2N0YWxMaXRlcmFsOiAnT2N0YWwgbGl0ZXJhbHMgYXJlIG5vdCBhbGxvd2VkIGluIHN0cmljdCBtb2RlLicsXG5cdCAgICBTdHJpY3REZWxldGU6ICdEZWxldGUgb2YgYW4gdW5xdWFsaWZpZWQgaWRlbnRpZmllciBpbiBzdHJpY3QgbW9kZS4nLFxuXHQgICAgU3RyaWN0TEhTQXNzaWdubWVudDogJ0Fzc2lnbm1lbnQgdG8gZXZhbCBvciBhcmd1bWVudHMgaXMgbm90IGFsbG93ZWQgaW4gc3RyaWN0IG1vZGUnLFxuXHQgICAgU3RyaWN0TEhTUG9zdGZpeDogJ1Bvc3RmaXggaW5jcmVtZW50L2RlY3JlbWVudCBtYXkgbm90IGhhdmUgZXZhbCBvciBhcmd1bWVudHMgb3BlcmFuZCBpbiBzdHJpY3QgbW9kZScsXG5cdCAgICBTdHJpY3RMSFNQcmVmaXg6ICdQcmVmaXggaW5jcmVtZW50L2RlY3JlbWVudCBtYXkgbm90IGhhdmUgZXZhbCBvciBhcmd1bWVudHMgb3BlcmFuZCBpbiBzdHJpY3QgbW9kZScsXG5cdCAgICBTdHJpY3RSZXNlcnZlZFdvcmQ6ICdVc2Ugb2YgZnV0dXJlIHJlc2VydmVkIHdvcmQgaW4gc3RyaWN0IG1vZGUnLFxuXHQgICAgVGVtcGxhdGVPY3RhbExpdGVyYWw6ICdPY3RhbCBsaXRlcmFscyBhcmUgbm90IGFsbG93ZWQgaW4gdGVtcGxhdGUgc3RyaW5ncy4nLFxuXHQgICAgUGFyYW1ldGVyQWZ0ZXJSZXN0UGFyYW1ldGVyOiAnUmVzdCBwYXJhbWV0ZXIgbXVzdCBiZSBsYXN0IGZvcm1hbCBwYXJhbWV0ZXInLFxuXHQgICAgRGVmYXVsdFJlc3RQYXJhbWV0ZXI6ICdVbmV4cGVjdGVkIHRva2VuID0nLFxuXHQgICAgRHVwbGljYXRlUHJvdG9Qcm9wZXJ0eTogJ0R1cGxpY2F0ZSBfX3Byb3RvX18gZmllbGRzIGFyZSBub3QgYWxsb3dlZCBpbiBvYmplY3QgbGl0ZXJhbHMnLFxuXHQgICAgQ29uc3RydWN0b3JTcGVjaWFsTWV0aG9kOiAnQ2xhc3MgY29uc3RydWN0b3IgbWF5IG5vdCBiZSBhbiBhY2Nlc3NvcicsXG5cdCAgICBEdXBsaWNhdGVDb25zdHJ1Y3RvcjogJ0EgY2xhc3MgbWF5IG9ubHkgaGF2ZSBvbmUgY29uc3RydWN0b3InLFxuXHQgICAgU3RhdGljUHJvdG90eXBlOiAnQ2xhc3NlcyBtYXkgbm90IGhhdmUgc3RhdGljIHByb3BlcnR5IG5hbWVkIHByb3RvdHlwZScsXG5cdCAgICBNaXNzaW5nRnJvbUNsYXVzZTogJ1VuZXhwZWN0ZWQgdG9rZW4nLFxuXHQgICAgTm9Bc0FmdGVySW1wb3J0TmFtZXNwYWNlOiAnVW5leHBlY3RlZCB0b2tlbicsXG5cdCAgICBJbnZhbGlkTW9kdWxlU3BlY2lmaWVyOiAnVW5leHBlY3RlZCB0b2tlbicsXG5cdCAgICBJbGxlZ2FsSW1wb3J0RGVjbGFyYXRpb246ICdVbmV4cGVjdGVkIHRva2VuJyxcblx0ICAgIElsbGVnYWxFeHBvcnREZWNsYXJhdGlvbjogJ1VuZXhwZWN0ZWQgdG9rZW4nLFxuXHQgICAgRHVwbGljYXRlQmluZGluZzogJ0R1cGxpY2F0ZSBiaW5kaW5nICUwJyxcblx0ICAgIEZvckluT2ZMb29wSW5pdGlhbGl6ZXI6ICclMCBsb29wIHZhcmlhYmxlIGRlY2xhcmF0aW9uIG1heSBub3QgaGF2ZSBhbiBpbml0aWFsaXplcidcblx0fTtcblxuXG4vKioqLyB9LFxuLyogNiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0XCJ1c2Ugc3RyaWN0XCI7XG5cdHZhciBFcnJvckhhbmRsZXIgPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gRXJyb3JIYW5kbGVyKCkge1xuXHQgICAgICAgIHRoaXMuZXJyb3JzID0gW107XG5cdCAgICAgICAgdGhpcy50b2xlcmFudCA9IGZhbHNlO1xuXHQgICAgfVxuXHQgICAgO1xuXHQgICAgRXJyb3JIYW5kbGVyLnByb3RvdHlwZS5yZWNvcmRFcnJvciA9IGZ1bmN0aW9uIChlcnJvcikge1xuXHQgICAgICAgIHRoaXMuZXJyb3JzLnB1c2goZXJyb3IpO1xuXHQgICAgfTtcblx0ICAgIDtcblx0ICAgIEVycm9ySGFuZGxlci5wcm90b3R5cGUudG9sZXJhdGUgPSBmdW5jdGlvbiAoZXJyb3IpIHtcblx0ICAgICAgICBpZiAodGhpcy50b2xlcmFudCkge1xuXHQgICAgICAgICAgICB0aGlzLnJlY29yZEVycm9yKGVycm9yKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgIHRocm93IGVycm9yO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cdCAgICA7XG5cdCAgICBFcnJvckhhbmRsZXIucHJvdG90eXBlLmNvbnN0cnVjdEVycm9yID0gZnVuY3Rpb24gKG1zZywgY29sdW1uKSB7XG5cdCAgICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKG1zZyk7XG5cdCAgICAgICAgdHJ5IHtcblx0ICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGNhdGNoIChiYXNlKSB7XG5cdCAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG5cdCAgICAgICAgICAgIGlmIChPYmplY3QuY3JlYXRlICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkge1xuXHQgICAgICAgICAgICAgICAgZXJyb3IgPSBPYmplY3QuY3JlYXRlKGJhc2UpO1xuXHQgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVycm9yLCAnY29sdW1uJywgeyB2YWx1ZTogY29sdW1uIH0pO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZpbmFsbHkge1xuXHQgICAgICAgICAgICByZXR1cm4gZXJyb3I7XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblx0ICAgIDtcblx0ICAgIEVycm9ySGFuZGxlci5wcm90b3R5cGUuY3JlYXRlRXJyb3IgPSBmdW5jdGlvbiAoaW5kZXgsIGxpbmUsIGNvbCwgZGVzY3JpcHRpb24pIHtcblx0ICAgICAgICB2YXIgbXNnID0gJ0xpbmUgJyArIGxpbmUgKyAnOiAnICsgZGVzY3JpcHRpb247XG5cdCAgICAgICAgdmFyIGVycm9yID0gdGhpcy5jb25zdHJ1Y3RFcnJvcihtc2csIGNvbCk7XG5cdCAgICAgICAgZXJyb3IuaW5kZXggPSBpbmRleDtcblx0ICAgICAgICBlcnJvci5saW5lTnVtYmVyID0gbGluZTtcblx0ICAgICAgICBlcnJvci5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuXHQgICAgICAgIHJldHVybiBlcnJvcjtcblx0ICAgIH07XG5cdCAgICA7XG5cdCAgICBFcnJvckhhbmRsZXIucHJvdG90eXBlLnRocm93RXJyb3IgPSBmdW5jdGlvbiAoaW5kZXgsIGxpbmUsIGNvbCwgZGVzY3JpcHRpb24pIHtcblx0ICAgICAgICB0aHJvdyB0aGlzLmNyZWF0ZUVycm9yKGluZGV4LCBsaW5lLCBjb2wsIGRlc2NyaXB0aW9uKTtcblx0ICAgIH07XG5cdCAgICA7XG5cdCAgICBFcnJvckhhbmRsZXIucHJvdG90eXBlLnRvbGVyYXRlRXJyb3IgPSBmdW5jdGlvbiAoaW5kZXgsIGxpbmUsIGNvbCwgZGVzY3JpcHRpb24pIHtcblx0ICAgICAgICB2YXIgZXJyb3IgPSB0aGlzLmNyZWF0ZUVycm9yKGluZGV4LCBsaW5lLCBjb2wsIGRlc2NyaXB0aW9uKTtcblx0ICAgICAgICBpZiAodGhpcy50b2xlcmFudCkge1xuXHQgICAgICAgICAgICB0aGlzLnJlY29yZEVycm9yKGVycm9yKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgIHRocm93IGVycm9yO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cdCAgICA7XG5cdCAgICByZXR1cm4gRXJyb3JIYW5kbGVyO1xuXHR9KCkpO1xuXHRleHBvcnRzLkVycm9ySGFuZGxlciA9IEVycm9ySGFuZGxlcjtcblxuXG4vKioqLyB9LFxuLyogNyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0XCJ1c2Ugc3RyaWN0XCI7XG5cdChmdW5jdGlvbiAoVG9rZW4pIHtcblx0ICAgIFRva2VuW1Rva2VuW1wiQm9vbGVhbkxpdGVyYWxcIl0gPSAxXSA9IFwiQm9vbGVhbkxpdGVyYWxcIjtcblx0ICAgIFRva2VuW1Rva2VuW1wiRU9GXCJdID0gMl0gPSBcIkVPRlwiO1xuXHQgICAgVG9rZW5bVG9rZW5bXCJJZGVudGlmaWVyXCJdID0gM10gPSBcIklkZW50aWZpZXJcIjtcblx0ICAgIFRva2VuW1Rva2VuW1wiS2V5d29yZFwiXSA9IDRdID0gXCJLZXl3b3JkXCI7XG5cdCAgICBUb2tlbltUb2tlbltcIk51bGxMaXRlcmFsXCJdID0gNV0gPSBcIk51bGxMaXRlcmFsXCI7XG5cdCAgICBUb2tlbltUb2tlbltcIk51bWVyaWNMaXRlcmFsXCJdID0gNl0gPSBcIk51bWVyaWNMaXRlcmFsXCI7XG5cdCAgICBUb2tlbltUb2tlbltcIlB1bmN0dWF0b3JcIl0gPSA3XSA9IFwiUHVuY3R1YXRvclwiO1xuXHQgICAgVG9rZW5bVG9rZW5bXCJTdHJpbmdMaXRlcmFsXCJdID0gOF0gPSBcIlN0cmluZ0xpdGVyYWxcIjtcblx0ICAgIFRva2VuW1Rva2VuW1wiUmVndWxhckV4cHJlc3Npb25cIl0gPSA5XSA9IFwiUmVndWxhckV4cHJlc3Npb25cIjtcblx0ICAgIFRva2VuW1Rva2VuW1wiVGVtcGxhdGVcIl0gPSAxMF0gPSBcIlRlbXBsYXRlXCI7XG5cdH0pKGV4cG9ydHMuVG9rZW4gfHwgKGV4cG9ydHMuVG9rZW4gPSB7fSkpO1xuXHR2YXIgVG9rZW4gPSBleHBvcnRzLlRva2VuO1xuXHQ7XG5cdGV4cG9ydHMuVG9rZW5OYW1lID0ge307XG5cdGV4cG9ydHMuVG9rZW5OYW1lW1Rva2VuLkJvb2xlYW5MaXRlcmFsXSA9ICdCb29sZWFuJztcblx0ZXhwb3J0cy5Ub2tlbk5hbWVbVG9rZW4uRU9GXSA9ICc8ZW5kPic7XG5cdGV4cG9ydHMuVG9rZW5OYW1lW1Rva2VuLklkZW50aWZpZXJdID0gJ0lkZW50aWZpZXInO1xuXHRleHBvcnRzLlRva2VuTmFtZVtUb2tlbi5LZXl3b3JkXSA9ICdLZXl3b3JkJztcblx0ZXhwb3J0cy5Ub2tlbk5hbWVbVG9rZW4uTnVsbExpdGVyYWxdID0gJ051bGwnO1xuXHRleHBvcnRzLlRva2VuTmFtZVtUb2tlbi5OdW1lcmljTGl0ZXJhbF0gPSAnTnVtZXJpYyc7XG5cdGV4cG9ydHMuVG9rZW5OYW1lW1Rva2VuLlB1bmN0dWF0b3JdID0gJ1B1bmN0dWF0b3InO1xuXHRleHBvcnRzLlRva2VuTmFtZVtUb2tlbi5TdHJpbmdMaXRlcmFsXSA9ICdTdHJpbmcnO1xuXHRleHBvcnRzLlRva2VuTmFtZVtUb2tlbi5SZWd1bGFyRXhwcmVzc2lvbl0gPSAnUmVndWxhckV4cHJlc3Npb24nO1xuXHRleHBvcnRzLlRva2VuTmFtZVtUb2tlbi5UZW1wbGF0ZV0gPSAnVGVtcGxhdGUnO1xuXG5cbi8qKiovIH0sXG4vKiA4ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHRcInVzZSBzdHJpY3RcIjtcblx0dmFyIGFzc2VydF8xID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KTtcblx0dmFyIG1lc3NhZ2VzXzEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpO1xuXHR2YXIgY2hhcmFjdGVyXzEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDkpO1xuXHR2YXIgdG9rZW5fMSA9IF9fd2VicGFja19yZXF1aXJlX18oNyk7XG5cdGZ1bmN0aW9uIGhleFZhbHVlKGNoKSB7XG5cdCAgICByZXR1cm4gJzAxMjM0NTY3ODlhYmNkZWYnLmluZGV4T2YoY2gudG9Mb3dlckNhc2UoKSk7XG5cdH1cblx0ZnVuY3Rpb24gb2N0YWxWYWx1ZShjaCkge1xuXHQgICAgcmV0dXJuICcwMTIzNDU2NycuaW5kZXhPZihjaCk7XG5cdH1cblx0dmFyIFNjYW5uZXIgPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gU2Nhbm5lcihjb2RlLCBoYW5kbGVyKSB7XG5cdCAgICAgICAgdGhpcy5zb3VyY2UgPSBjb2RlO1xuXHQgICAgICAgIHRoaXMuZXJyb3JIYW5kbGVyID0gaGFuZGxlcjtcblx0ICAgICAgICB0aGlzLnRyYWNrQ29tbWVudCA9IGZhbHNlO1xuXHQgICAgICAgIHRoaXMubGVuZ3RoID0gY29kZS5sZW5ndGg7XG5cdCAgICAgICAgdGhpcy5pbmRleCA9IDA7XG5cdCAgICAgICAgdGhpcy5saW5lTnVtYmVyID0gKGNvZGUubGVuZ3RoID4gMCkgPyAxIDogMDtcblx0ICAgICAgICB0aGlzLmxpbmVTdGFydCA9IDA7XG5cdCAgICAgICAgdGhpcy5jdXJseVN0YWNrID0gW107XG5cdCAgICB9XG5cdCAgICA7XG5cdCAgICBTY2FubmVyLnByb3RvdHlwZS5lb2YgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuaW5kZXggPj0gdGhpcy5sZW5ndGg7XG5cdCAgICB9O1xuXHQgICAgO1xuXHQgICAgU2Nhbm5lci5wcm90b3R5cGUudGhyb3dVbmV4cGVjdGVkVG9rZW4gPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuXHQgICAgICAgIGlmIChtZXNzYWdlID09PSB2b2lkIDApIHsgbWVzc2FnZSA9IG1lc3NhZ2VzXzEuTWVzc2FnZXMuVW5leHBlY3RlZFRva2VuSWxsZWdhbDsgfVxuXHQgICAgICAgIHRoaXMuZXJyb3JIYW5kbGVyLnRocm93RXJyb3IodGhpcy5pbmRleCwgdGhpcy5saW5lTnVtYmVyLCB0aGlzLmluZGV4IC0gdGhpcy5saW5lU3RhcnQgKyAxLCBtZXNzYWdlKTtcblx0ICAgIH07XG5cdCAgICA7XG5cdCAgICBTY2FubmVyLnByb3RvdHlwZS50b2xlcmF0ZVVuZXhwZWN0ZWRUb2tlbiA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB0aGlzLmVycm9ySGFuZGxlci50b2xlcmF0ZUVycm9yKHRoaXMuaW5kZXgsIHRoaXMubGluZU51bWJlciwgdGhpcy5pbmRleCAtIHRoaXMubGluZVN0YXJ0ICsgMSwgbWVzc2FnZXNfMS5NZXNzYWdlcy5VbmV4cGVjdGVkVG9rZW5JbGxlZ2FsKTtcblx0ICAgIH07XG5cdCAgICA7XG5cdCAgICAvLyBFQ01BLTI2MiAxMS40IENvbW1lbnRzXG5cdCAgICBTY2FubmVyLnByb3RvdHlwZS5za2lwU2luZ2xlTGluZUNvbW1lbnQgPSBmdW5jdGlvbiAob2Zmc2V0KSB7XG5cdCAgICAgICAgdmFyIGNvbW1lbnRzO1xuXHQgICAgICAgIHZhciBzdGFydCwgbG9jO1xuXHQgICAgICAgIGlmICh0aGlzLnRyYWNrQ29tbWVudCkge1xuXHQgICAgICAgICAgICBjb21tZW50cyA9IFtdO1xuXHQgICAgICAgICAgICBzdGFydCA9IHRoaXMuaW5kZXggLSBvZmZzZXQ7XG5cdCAgICAgICAgICAgIGxvYyA9IHtcblx0ICAgICAgICAgICAgICAgIHN0YXJ0OiB7XG5cdCAgICAgICAgICAgICAgICAgICAgbGluZTogdGhpcy5saW5lTnVtYmVyLFxuXHQgICAgICAgICAgICAgICAgICAgIGNvbHVtbjogdGhpcy5pbmRleCAtIHRoaXMubGluZVN0YXJ0IC0gb2Zmc2V0XG5cdCAgICAgICAgICAgICAgICB9LFxuXHQgICAgICAgICAgICAgICAgZW5kOiB7fVxuXHQgICAgICAgICAgICB9O1xuXHQgICAgICAgIH1cblx0ICAgICAgICB3aGlsZSAoIXRoaXMuZW9mKCkpIHtcblx0ICAgICAgICAgICAgdmFyIGNoID0gdGhpcy5zb3VyY2UuY2hhckNvZGVBdCh0aGlzLmluZGV4KTtcblx0ICAgICAgICAgICAgKyt0aGlzLmluZGV4O1xuXHQgICAgICAgICAgICBpZiAoY2hhcmFjdGVyXzEuQ2hhcmFjdGVyLmlzTGluZVRlcm1pbmF0b3IoY2gpKSB7XG5cdCAgICAgICAgICAgICAgICBpZiAodGhpcy50cmFja0NvbW1lbnQpIHtcblx0ICAgICAgICAgICAgICAgICAgICBsb2MuZW5kID0ge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBsaW5lOiB0aGlzLmxpbmVOdW1iZXIsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbjogdGhpcy5pbmRleCAtIHRoaXMubGluZVN0YXJ0IC0gMVxuXHQgICAgICAgICAgICAgICAgICAgIH07XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGVudHJ5ID0ge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBtdWx0aUxpbmU6IGZhbHNlLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICBzbGljZTogW3N0YXJ0ICsgb2Zmc2V0LCB0aGlzLmluZGV4IC0gMV0sXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlOiBbc3RhcnQsIHRoaXMuaW5kZXggLSAxXSxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgbG9jOiBsb2Ncblx0ICAgICAgICAgICAgICAgICAgICB9O1xuXHQgICAgICAgICAgICAgICAgICAgIGNvbW1lbnRzLnB1c2goZW50cnkpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgaWYgKGNoID09PSAxMyAmJiB0aGlzLnNvdXJjZS5jaGFyQ29kZUF0KHRoaXMuaW5kZXgpID09PSAxMCkge1xuXHQgICAgICAgICAgICAgICAgICAgICsrdGhpcy5pbmRleDtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICsrdGhpcy5saW5lTnVtYmVyO1xuXHQgICAgICAgICAgICAgICAgdGhpcy5saW5lU3RhcnQgPSB0aGlzLmluZGV4O1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIGNvbW1lbnRzO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmICh0aGlzLnRyYWNrQ29tbWVudCkge1xuXHQgICAgICAgICAgICBsb2MuZW5kID0ge1xuXHQgICAgICAgICAgICAgICAgbGluZTogdGhpcy5saW5lTnVtYmVyLFxuXHQgICAgICAgICAgICAgICAgY29sdW1uOiB0aGlzLmluZGV4IC0gdGhpcy5saW5lU3RhcnRcblx0ICAgICAgICAgICAgfTtcblx0ICAgICAgICAgICAgdmFyIGVudHJ5ID0ge1xuXHQgICAgICAgICAgICAgICAgbXVsdGlMaW5lOiBmYWxzZSxcblx0ICAgICAgICAgICAgICAgIHNsaWNlOiBbc3RhcnQgKyBvZmZzZXQsIHRoaXMuaW5kZXhdLFxuXHQgICAgICAgICAgICAgICAgcmFuZ2U6IFtzdGFydCwgdGhpcy5pbmRleF0sXG5cdCAgICAgICAgICAgICAgICBsb2M6IGxvY1xuXHQgICAgICAgICAgICB9O1xuXHQgICAgICAgICAgICBjb21tZW50cy5wdXNoKGVudHJ5KTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIGNvbW1lbnRzO1xuXHQgICAgfTtcblx0ICAgIDtcblx0ICAgIFNjYW5uZXIucHJvdG90eXBlLnNraXBNdWx0aUxpbmVDb21tZW50ID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBjb21tZW50cztcblx0ICAgICAgICB2YXIgc3RhcnQsIGxvYztcblx0ICAgICAgICBpZiAodGhpcy50cmFja0NvbW1lbnQpIHtcblx0ICAgICAgICAgICAgY29tbWVudHMgPSBbXTtcblx0ICAgICAgICAgICAgc3RhcnQgPSB0aGlzLmluZGV4IC0gMjtcblx0ICAgICAgICAgICAgbG9jID0ge1xuXHQgICAgICAgICAgICAgICAgc3RhcnQ6IHtcblx0ICAgICAgICAgICAgICAgICAgICBsaW5lOiB0aGlzLmxpbmVOdW1iZXIsXG5cdCAgICAgICAgICAgICAgICAgICAgY29sdW1uOiB0aGlzLmluZGV4IC0gdGhpcy5saW5lU3RhcnQgLSAyXG5cdCAgICAgICAgICAgICAgICB9LFxuXHQgICAgICAgICAgICAgICAgZW5kOiB7fVxuXHQgICAgICAgICAgICB9O1xuXHQgICAgICAgIH1cblx0ICAgICAgICB3aGlsZSAoIXRoaXMuZW9mKCkpIHtcblx0ICAgICAgICAgICAgdmFyIGNoID0gdGhpcy5zb3VyY2UuY2hhckNvZGVBdCh0aGlzLmluZGV4KTtcblx0ICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl8xLkNoYXJhY3Rlci5pc0xpbmVUZXJtaW5hdG9yKGNoKSkge1xuXHQgICAgICAgICAgICAgICAgaWYgKGNoID09PSAweDBEICYmIHRoaXMuc291cmNlLmNoYXJDb2RlQXQodGhpcy5pbmRleCArIDEpID09PSAweDBBKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgKyt0aGlzLmluZGV4O1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgKyt0aGlzLmxpbmVOdW1iZXI7XG5cdCAgICAgICAgICAgICAgICArK3RoaXMuaW5kZXg7XG5cdCAgICAgICAgICAgICAgICB0aGlzLmxpbmVTdGFydCA9IHRoaXMuaW5kZXg7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZWxzZSBpZiAoY2ggPT09IDB4MkEpIHtcblx0ICAgICAgICAgICAgICAgIC8vIEJsb2NrIGNvbW1lbnQgZW5kcyB3aXRoICcqLycuXG5cdCAgICAgICAgICAgICAgICBpZiAodGhpcy5zb3VyY2UuY2hhckNvZGVBdCh0aGlzLmluZGV4ICsgMSkgPT09IDB4MkYpIHtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLmluZGV4ICs9IDI7XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudHJhY2tDb21tZW50KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGxvYy5lbmQgPSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lOiB0aGlzLmxpbmVOdW1iZXIsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW46IHRoaXMuaW5kZXggLSB0aGlzLmxpbmVTdGFydFxuXHQgICAgICAgICAgICAgICAgICAgICAgICB9O1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZW50cnkgPSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBtdWx0aUxpbmU6IHRydWUsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGljZTogW3N0YXJ0ICsgMiwgdGhpcy5pbmRleCAtIDJdLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2U6IFtzdGFydCwgdGhpcy5pbmRleF0sXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2M6IGxvY1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB9O1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBjb21tZW50cy5wdXNoKGVudHJ5KTtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbW1lbnRzO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgKyt0aGlzLmluZGV4O1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgKyt0aGlzLmluZGV4O1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIC8vIFJhbiBvZmYgdGhlIGVuZCBvZiB0aGUgZmlsZSAtIHRoZSB3aG9sZSB0aGluZyBpcyBhIGNvbW1lbnRcblx0ICAgICAgICBpZiAodGhpcy50cmFja0NvbW1lbnQpIHtcblx0ICAgICAgICAgICAgbG9jLmVuZCA9IHtcblx0ICAgICAgICAgICAgICAgIGxpbmU6IHRoaXMubGluZU51bWJlcixcblx0ICAgICAgICAgICAgICAgIGNvbHVtbjogdGhpcy5pbmRleCAtIHRoaXMubGluZVN0YXJ0XG5cdCAgICAgICAgICAgIH07XG5cdCAgICAgICAgICAgIHZhciBlbnRyeSA9IHtcblx0ICAgICAgICAgICAgICAgIG11bHRpTGluZTogdHJ1ZSxcblx0ICAgICAgICAgICAgICAgIHNsaWNlOiBbc3RhcnQgKyAyLCB0aGlzLmluZGV4XSxcblx0ICAgICAgICAgICAgICAgIHJhbmdlOiBbc3RhcnQsIHRoaXMuaW5kZXhdLFxuXHQgICAgICAgICAgICAgICAgbG9jOiBsb2Ncblx0ICAgICAgICAgICAgfTtcblx0ICAgICAgICAgICAgY29tbWVudHMucHVzaChlbnRyeSk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHRoaXMudG9sZXJhdGVVbmV4cGVjdGVkVG9rZW4oKTtcblx0ICAgICAgICByZXR1cm4gY29tbWVudHM7XG5cdCAgICB9O1xuXHQgICAgO1xuXHQgICAgU2Nhbm5lci5wcm90b3R5cGUuc2NhbkNvbW1lbnRzID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBjb21tZW50cztcblx0ICAgICAgICBpZiAodGhpcy50cmFja0NvbW1lbnQpIHtcblx0ICAgICAgICAgICAgY29tbWVudHMgPSBbXTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIHN0YXJ0ID0gKHRoaXMuaW5kZXggPT09IDApO1xuXHQgICAgICAgIHdoaWxlICghdGhpcy5lb2YoKSkge1xuXHQgICAgICAgICAgICB2YXIgY2ggPSB0aGlzLnNvdXJjZS5jaGFyQ29kZUF0KHRoaXMuaW5kZXgpO1xuXHQgICAgICAgICAgICBpZiAoY2hhcmFjdGVyXzEuQ2hhcmFjdGVyLmlzV2hpdGVTcGFjZShjaCkpIHtcblx0ICAgICAgICAgICAgICAgICsrdGhpcy5pbmRleDtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBlbHNlIGlmIChjaGFyYWN0ZXJfMS5DaGFyYWN0ZXIuaXNMaW5lVGVybWluYXRvcihjaCkpIHtcblx0ICAgICAgICAgICAgICAgICsrdGhpcy5pbmRleDtcblx0ICAgICAgICAgICAgICAgIGlmIChjaCA9PT0gMHgwRCAmJiB0aGlzLnNvdXJjZS5jaGFyQ29kZUF0KHRoaXMuaW5kZXgpID09PSAweDBBKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgKyt0aGlzLmluZGV4O1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgKyt0aGlzLmxpbmVOdW1iZXI7XG5cdCAgICAgICAgICAgICAgICB0aGlzLmxpbmVTdGFydCA9IHRoaXMuaW5kZXg7XG5cdCAgICAgICAgICAgICAgICBzdGFydCA9IHRydWU7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZWxzZSBpZiAoY2ggPT09IDB4MkYpIHtcblx0ICAgICAgICAgICAgICAgIGNoID0gdGhpcy5zb3VyY2UuY2hhckNvZGVBdCh0aGlzLmluZGV4ICsgMSk7XG5cdCAgICAgICAgICAgICAgICBpZiAoY2ggPT09IDB4MkYpIHtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLmluZGV4ICs9IDI7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGNvbW1lbnQgPSB0aGlzLnNraXBTaW5nbGVMaW5lQ29tbWVudCgyKTtcblx0ICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50cmFja0NvbW1lbnQpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgY29tbWVudHMgPSBjb21tZW50cy5jb25jYXQoY29tbWVudCk7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgIHN0YXJ0ID0gdHJ1ZTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNoID09PSAweDJBKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmRleCArPSAyO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBjb21tZW50ID0gdGhpcy5za2lwTXVsdGlMaW5lQ29tbWVudCgpO1xuXHQgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyYWNrQ29tbWVudCkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBjb21tZW50cyA9IGNvbW1lbnRzLmNvbmNhdChjb21tZW50KTtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBlbHNlIGlmIChzdGFydCAmJiBjaCA9PT0gMHgyRCkge1xuXHQgICAgICAgICAgICAgICAgLy8gVSswMDNFIGlzICc+J1xuXHQgICAgICAgICAgICAgICAgaWYgKCh0aGlzLnNvdXJjZS5jaGFyQ29kZUF0KHRoaXMuaW5kZXggKyAxKSA9PT0gMHgyRCkgJiYgKHRoaXMuc291cmNlLmNoYXJDb2RlQXQodGhpcy5pbmRleCArIDIpID09PSAweDNFKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIC8vICctLT4nIGlzIGEgc2luZ2xlLWxpbmUgY29tbWVudFxuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kZXggKz0gMztcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgY29tbWVudCA9IHRoaXMuc2tpcFNpbmdsZUxpbmVDb21tZW50KDMpO1xuXHQgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyYWNrQ29tbWVudCkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBjb21tZW50cyA9IGNvbW1lbnRzLmNvbmNhdChjb21tZW50KTtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBlbHNlIGlmIChjaCA9PT0gMHgzQykge1xuXHQgICAgICAgICAgICAgICAgaWYgKHRoaXMuc291cmNlLnNsaWNlKHRoaXMuaW5kZXggKyAxLCB0aGlzLmluZGV4ICsgNCkgPT09ICchLS0nKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmRleCArPSA0OyAvLyBgPCEtLWBcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgY29tbWVudCA9IHRoaXMuc2tpcFNpbmdsZUxpbmVDb21tZW50KDQpO1xuXHQgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyYWNrQ29tbWVudCkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBjb21tZW50cyA9IGNvbW1lbnRzLmNvbmNhdChjb21tZW50KTtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiBjb21tZW50cztcblx0ICAgIH07XG5cdCAgICA7XG5cdCAgICAvLyBFQ01BLTI2MiAxMS42LjIuMiBGdXR1cmUgUmVzZXJ2ZWQgV29yZHNcblx0ICAgIFNjYW5uZXIucHJvdG90eXBlLmlzRnV0dXJlUmVzZXJ2ZWRXb3JkID0gZnVuY3Rpb24gKGlkKSB7XG5cdCAgICAgICAgc3dpdGNoIChpZCkge1xuXHQgICAgICAgICAgICBjYXNlICdlbnVtJzpcblx0ICAgICAgICAgICAgY2FzZSAnZXhwb3J0Jzpcblx0ICAgICAgICAgICAgY2FzZSAnaW1wb3J0Jzpcblx0ICAgICAgICAgICAgY2FzZSAnc3VwZXInOlxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cdCAgICAgICAgICAgIGRlZmF1bHQ6XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblx0ICAgIDtcblx0ICAgIFNjYW5uZXIucHJvdG90eXBlLmlzU3RyaWN0TW9kZVJlc2VydmVkV29yZCA9IGZ1bmN0aW9uIChpZCkge1xuXHQgICAgICAgIHN3aXRjaCAoaWQpIHtcblx0ICAgICAgICAgICAgY2FzZSAnaW1wbGVtZW50cyc6XG5cdCAgICAgICAgICAgIGNhc2UgJ2ludGVyZmFjZSc6XG5cdCAgICAgICAgICAgIGNhc2UgJ3BhY2thZ2UnOlxuXHQgICAgICAgICAgICBjYXNlICdwcml2YXRlJzpcblx0ICAgICAgICAgICAgY2FzZSAncHJvdGVjdGVkJzpcblx0ICAgICAgICAgICAgY2FzZSAncHVibGljJzpcblx0ICAgICAgICAgICAgY2FzZSAnc3RhdGljJzpcblx0ICAgICAgICAgICAgY2FzZSAneWllbGQnOlxuXHQgICAgICAgICAgICBjYXNlICdsZXQnOlxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cdCAgICAgICAgICAgIGRlZmF1bHQ6XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblx0ICAgIDtcblx0ICAgIFNjYW5uZXIucHJvdG90eXBlLmlzUmVzdHJpY3RlZFdvcmQgPSBmdW5jdGlvbiAoaWQpIHtcblx0ICAgICAgICByZXR1cm4gaWQgPT09ICdldmFsJyB8fCBpZCA9PT0gJ2FyZ3VtZW50cyc7XG5cdCAgICB9O1xuXHQgICAgO1xuXHQgICAgLy8gRUNNQS0yNjIgMTEuNi4yLjEgS2V5d29yZHNcblx0ICAgIFNjYW5uZXIucHJvdG90eXBlLmlzS2V5d29yZCA9IGZ1bmN0aW9uIChpZCkge1xuXHQgICAgICAgIHN3aXRjaCAoaWQubGVuZ3RoKSB7XG5cdCAgICAgICAgICAgIGNhc2UgMjpcblx0ICAgICAgICAgICAgICAgIHJldHVybiAoaWQgPT09ICdpZicpIHx8IChpZCA9PT0gJ2luJykgfHwgKGlkID09PSAnZG8nKTtcblx0ICAgICAgICAgICAgY2FzZSAzOlxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIChpZCA9PT0gJ3ZhcicpIHx8IChpZCA9PT0gJ2ZvcicpIHx8IChpZCA9PT0gJ25ldycpIHx8XG5cdCAgICAgICAgICAgICAgICAgICAgKGlkID09PSAndHJ5JykgfHwgKGlkID09PSAnbGV0Jyk7XG5cdCAgICAgICAgICAgIGNhc2UgNDpcblx0ICAgICAgICAgICAgICAgIHJldHVybiAoaWQgPT09ICd0aGlzJykgfHwgKGlkID09PSAnZWxzZScpIHx8IChpZCA9PT0gJ2Nhc2UnKSB8fFxuXHQgICAgICAgICAgICAgICAgICAgIChpZCA9PT0gJ3ZvaWQnKSB8fCAoaWQgPT09ICd3aXRoJykgfHwgKGlkID09PSAnZW51bScpO1xuXHQgICAgICAgICAgICBjYXNlIDU6XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gKGlkID09PSAnd2hpbGUnKSB8fCAoaWQgPT09ICdicmVhaycpIHx8IChpZCA9PT0gJ2NhdGNoJykgfHxcblx0ICAgICAgICAgICAgICAgICAgICAoaWQgPT09ICd0aHJvdycpIHx8IChpZCA9PT0gJ2NvbnN0JykgfHwgKGlkID09PSAneWllbGQnKSB8fFxuXHQgICAgICAgICAgICAgICAgICAgIChpZCA9PT0gJ2NsYXNzJykgfHwgKGlkID09PSAnc3VwZXInKTtcblx0ICAgICAgICAgICAgY2FzZSA2OlxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIChpZCA9PT0gJ3JldHVybicpIHx8IChpZCA9PT0gJ3R5cGVvZicpIHx8IChpZCA9PT0gJ2RlbGV0ZScpIHx8XG5cdCAgICAgICAgICAgICAgICAgICAgKGlkID09PSAnc3dpdGNoJykgfHwgKGlkID09PSAnZXhwb3J0JykgfHwgKGlkID09PSAnaW1wb3J0Jyk7XG5cdCAgICAgICAgICAgIGNhc2UgNzpcblx0ICAgICAgICAgICAgICAgIHJldHVybiAoaWQgPT09ICdkZWZhdWx0JykgfHwgKGlkID09PSAnZmluYWxseScpIHx8IChpZCA9PT0gJ2V4dGVuZHMnKTtcblx0ICAgICAgICAgICAgY2FzZSA4OlxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIChpZCA9PT0gJ2Z1bmN0aW9uJykgfHwgKGlkID09PSAnY29udGludWUnKSB8fCAoaWQgPT09ICdkZWJ1Z2dlcicpO1xuXHQgICAgICAgICAgICBjYXNlIDEwOlxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIChpZCA9PT0gJ2luc3RhbmNlb2YnKTtcblx0ICAgICAgICAgICAgZGVmYXVsdDpcblx0ICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXHQgICAgO1xuXHQgICAgU2Nhbm5lci5wcm90b3R5cGUuY29kZVBvaW50QXQgPSBmdW5jdGlvbiAoaSkge1xuXHQgICAgICAgIHZhciBjcCA9IHRoaXMuc291cmNlLmNoYXJDb2RlQXQoaSk7XG5cdCAgICAgICAgaWYgKGNwID49IDB4RDgwMCAmJiBjcCA8PSAweERCRkYpIHtcblx0ICAgICAgICAgICAgdmFyIHNlY29uZCA9IHRoaXMuc291cmNlLmNoYXJDb2RlQXQoaSArIDEpO1xuXHQgICAgICAgICAgICBpZiAoc2Vjb25kID49IDB4REMwMCAmJiBzZWNvbmQgPD0gMHhERkZGKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgZmlyc3QgPSBjcDtcblx0ICAgICAgICAgICAgICAgIGNwID0gKGZpcnN0IC0gMHhEODAwKSAqIDB4NDAwICsgc2Vjb25kIC0gMHhEQzAwICsgMHgxMDAwMDtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gY3A7XG5cdCAgICB9O1xuXHQgICAgO1xuXHQgICAgU2Nhbm5lci5wcm90b3R5cGUuc2NhbkhleEVzY2FwZSA9IGZ1bmN0aW9uIChwcmVmaXgpIHtcblx0ICAgICAgICB2YXIgbGVuID0gKHByZWZpeCA9PT0gJ3UnKSA/IDQgOiAyO1xuXHQgICAgICAgIHZhciBjb2RlID0gMDtcblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG5cdCAgICAgICAgICAgIGlmICghdGhpcy5lb2YoKSAmJiBjaGFyYWN0ZXJfMS5DaGFyYWN0ZXIuaXNIZXhEaWdpdCh0aGlzLnNvdXJjZS5jaGFyQ29kZUF0KHRoaXMuaW5kZXgpKSkge1xuXHQgICAgICAgICAgICAgICAgY29kZSA9IGNvZGUgKiAxNiArIGhleFZhbHVlKHRoaXMuc291cmNlW3RoaXMuaW5kZXgrK10pO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuXHQgICAgfTtcblx0ICAgIDtcblx0ICAgIFNjYW5uZXIucHJvdG90eXBlLnNjYW5Vbmljb2RlQ29kZVBvaW50RXNjYXBlID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBjaCA9IHRoaXMuc291cmNlW3RoaXMuaW5kZXhdO1xuXHQgICAgICAgIHZhciBjb2RlID0gMDtcblx0ICAgICAgICAvLyBBdCBsZWFzdCwgb25lIGhleCBkaWdpdCBpcyByZXF1aXJlZC5cblx0ICAgICAgICBpZiAoY2ggPT09ICd9Jykge1xuXHQgICAgICAgICAgICB0aGlzLnRocm93VW5leHBlY3RlZFRva2VuKCk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHdoaWxlICghdGhpcy5lb2YoKSkge1xuXHQgICAgICAgICAgICBjaCA9IHRoaXMuc291cmNlW3RoaXMuaW5kZXgrK107XG5cdCAgICAgICAgICAgIGlmICghY2hhcmFjdGVyXzEuQ2hhcmFjdGVyLmlzSGV4RGlnaXQoY2guY2hhckNvZGVBdCgwKSkpIHtcblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGNvZGUgPSBjb2RlICogMTYgKyBoZXhWYWx1ZShjaCk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmIChjb2RlID4gMHgxMEZGRkYgfHwgY2ggIT09ICd9Jykge1xuXHQgICAgICAgICAgICB0aGlzLnRocm93VW5leHBlY3RlZFRva2VuKCk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiBjaGFyYWN0ZXJfMS5DaGFyYWN0ZXIuZnJvbUNvZGVQb2ludChjb2RlKTtcblx0ICAgIH07XG5cdCAgICA7XG5cdCAgICBTY2FubmVyLnByb3RvdHlwZS5nZXRJZGVudGlmaWVyID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBzdGFydCA9IHRoaXMuaW5kZXgrKztcblx0ICAgICAgICB3aGlsZSAoIXRoaXMuZW9mKCkpIHtcblx0ICAgICAgICAgICAgdmFyIGNoID0gdGhpcy5zb3VyY2UuY2hhckNvZGVBdCh0aGlzLmluZGV4KTtcblx0ICAgICAgICAgICAgaWYgKGNoID09PSAweDVDKSB7XG5cdCAgICAgICAgICAgICAgICAvLyBCbGFja3NsYXNoIChVKzAwNUMpIG1hcmtzIFVuaWNvZGUgZXNjYXBlIHNlcXVlbmNlLlxuXHQgICAgICAgICAgICAgICAgdGhpcy5pbmRleCA9IHN0YXJ0O1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29tcGxleElkZW50aWZpZXIoKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBlbHNlIGlmIChjaCA+PSAweEQ4MDAgJiYgY2ggPCAweERGRkYpIHtcblx0ICAgICAgICAgICAgICAgIC8vIE5lZWQgdG8gaGFuZGxlIHN1cnJvZ2F0ZSBwYWlycy5cblx0ICAgICAgICAgICAgICAgIHRoaXMuaW5kZXggPSBzdGFydDtcblx0ICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldENvbXBsZXhJZGVudGlmaWVyKCk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl8xLkNoYXJhY3Rlci5pc0lkZW50aWZpZXJQYXJ0KGNoKSkge1xuXHQgICAgICAgICAgICAgICAgKyt0aGlzLmluZGV4O1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuc291cmNlLnNsaWNlKHN0YXJ0LCB0aGlzLmluZGV4KTtcblx0ICAgIH07XG5cdCAgICA7XG5cdCAgICBTY2FubmVyLnByb3RvdHlwZS5nZXRDb21wbGV4SWRlbnRpZmllciA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgY3AgPSB0aGlzLmNvZGVQb2ludEF0KHRoaXMuaW5kZXgpO1xuXHQgICAgICAgIHZhciBpZCA9IGNoYXJhY3Rlcl8xLkNoYXJhY3Rlci5mcm9tQ29kZVBvaW50KGNwKTtcblx0ICAgICAgICB0aGlzLmluZGV4ICs9IGlkLmxlbmd0aDtcblx0ICAgICAgICAvLyAnXFx1JyAoVSswMDVDLCBVKzAwNzUpIGRlbm90ZXMgYW4gZXNjYXBlZCBjaGFyYWN0ZXIuXG5cdCAgICAgICAgdmFyIGNoO1xuXHQgICAgICAgIGlmIChjcCA9PT0gMHg1Qykge1xuXHQgICAgICAgICAgICBpZiAodGhpcy5zb3VyY2UuY2hhckNvZGVBdCh0aGlzLmluZGV4KSAhPT0gMHg3NSkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy50aHJvd1VuZXhwZWN0ZWRUb2tlbigpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICsrdGhpcy5pbmRleDtcblx0ICAgICAgICAgICAgaWYgKHRoaXMuc291cmNlW3RoaXMuaW5kZXhdID09PSAneycpIHtcblx0ICAgICAgICAgICAgICAgICsrdGhpcy5pbmRleDtcblx0ICAgICAgICAgICAgICAgIGNoID0gdGhpcy5zY2FuVW5pY29kZUNvZGVQb2ludEVzY2FwZSgpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgY2ggPSB0aGlzLnNjYW5IZXhFc2NhcGUoJ3UnKTtcblx0ICAgICAgICAgICAgICAgIGNwID0gY2guY2hhckNvZGVBdCgwKTtcblx0ICAgICAgICAgICAgICAgIGlmICghY2ggfHwgY2ggPT09ICdcXFxcJyB8fCAhY2hhcmFjdGVyXzEuQ2hhcmFjdGVyLmlzSWRlbnRpZmllclN0YXJ0KGNwKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMudGhyb3dVbmV4cGVjdGVkVG9rZW4oKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBpZCA9IGNoO1xuXHQgICAgICAgIH1cblx0ICAgICAgICB3aGlsZSAoIXRoaXMuZW9mKCkpIHtcblx0ICAgICAgICAgICAgY3AgPSB0aGlzLmNvZGVQb2ludEF0KHRoaXMuaW5kZXgpO1xuXHQgICAgICAgICAgICBpZiAoIWNoYXJhY3Rlcl8xLkNoYXJhY3Rlci5pc0lkZW50aWZpZXJQYXJ0KGNwKSkge1xuXHQgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgY2ggPSBjaGFyYWN0ZXJfMS5DaGFyYWN0ZXIuZnJvbUNvZGVQb2ludChjcCk7XG5cdCAgICAgICAgICAgIGlkICs9IGNoO1xuXHQgICAgICAgICAgICB0aGlzLmluZGV4ICs9IGNoLmxlbmd0aDtcblx0ICAgICAgICAgICAgLy8gJ1xcdScgKFUrMDA1QywgVSswMDc1KSBkZW5vdGVzIGFuIGVzY2FwZWQgY2hhcmFjdGVyLlxuXHQgICAgICAgICAgICBpZiAoY3AgPT09IDB4NUMpIHtcblx0ICAgICAgICAgICAgICAgIGlkID0gaWQuc3Vic3RyKDAsIGlkLmxlbmd0aCAtIDEpO1xuXHQgICAgICAgICAgICAgICAgaWYgKHRoaXMuc291cmNlLmNoYXJDb2RlQXQodGhpcy5pbmRleCkgIT09IDB4NzUpIHtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLnRocm93VW5leHBlY3RlZFRva2VuKCk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICArK3RoaXMuaW5kZXg7XG5cdCAgICAgICAgICAgICAgICBpZiAodGhpcy5zb3VyY2VbdGhpcy5pbmRleF0gPT09ICd7Jykge1xuXHQgICAgICAgICAgICAgICAgICAgICsrdGhpcy5pbmRleDtcblx0ICAgICAgICAgICAgICAgICAgICBjaCA9IHRoaXMuc2NhblVuaWNvZGVDb2RlUG9pbnRFc2NhcGUoKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgIGNoID0gdGhpcy5zY2FuSGV4RXNjYXBlKCd1Jyk7XG5cdCAgICAgICAgICAgICAgICAgICAgY3AgPSBjaC5jaGFyQ29kZUF0KDApO1xuXHQgICAgICAgICAgICAgICAgICAgIGlmICghY2ggfHwgY2ggPT09ICdcXFxcJyB8fCAhY2hhcmFjdGVyXzEuQ2hhcmFjdGVyLmlzSWRlbnRpZmllclBhcnQoY3ApKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGhyb3dVbmV4cGVjdGVkVG9rZW4oKTtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBpZCArPSBjaDtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gaWQ7XG5cdCAgICB9O1xuXHQgICAgO1xuXHQgICAgU2Nhbm5lci5wcm90b3R5cGUub2N0YWxUb0RlY2ltYWwgPSBmdW5jdGlvbiAoY2gpIHtcblx0ICAgICAgICAvLyBcXDAgaXMgbm90IG9jdGFsIGVzY2FwZSBzZXF1ZW5jZVxuXHQgICAgICAgIHZhciBvY3RhbCA9IChjaCAhPT0gJzAnKTtcblx0ICAgICAgICB2YXIgY29kZSA9IG9jdGFsVmFsdWUoY2gpO1xuXHQgICAgICAgIGlmICghdGhpcy5lb2YoKSAmJiBjaGFyYWN0ZXJfMS5DaGFyYWN0ZXIuaXNPY3RhbERpZ2l0KHRoaXMuc291cmNlLmNoYXJDb2RlQXQodGhpcy5pbmRleCkpKSB7XG5cdCAgICAgICAgICAgIG9jdGFsID0gdHJ1ZTtcblx0ICAgICAgICAgICAgY29kZSA9IGNvZGUgKiA4ICsgb2N0YWxWYWx1ZSh0aGlzLnNvdXJjZVt0aGlzLmluZGV4KytdKTtcblx0ICAgICAgICAgICAgLy8gMyBkaWdpdHMgYXJlIG9ubHkgYWxsb3dlZCB3aGVuIHN0cmluZyBzdGFydHNcblx0ICAgICAgICAgICAgLy8gd2l0aCAwLCAxLCAyLCAzXG5cdCAgICAgICAgICAgIGlmICgnMDEyMycuaW5kZXhPZihjaCkgPj0gMCAmJiAhdGhpcy5lb2YoKSAmJiBjaGFyYWN0ZXJfMS5DaGFyYWN0ZXIuaXNPY3RhbERpZ2l0KHRoaXMuc291cmNlLmNoYXJDb2RlQXQodGhpcy5pbmRleCkpKSB7XG5cdCAgICAgICAgICAgICAgICBjb2RlID0gY29kZSAqIDggKyBvY3RhbFZhbHVlKHRoaXMuc291cmNlW3RoaXMuaW5kZXgrK10pO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiB7XG5cdCAgICAgICAgICAgIGNvZGU6IGNvZGUsXG5cdCAgICAgICAgICAgIG9jdGFsOiBvY3RhbFxuXHQgICAgICAgIH07XG5cdCAgICB9O1xuXHQgICAgO1xuXHQgICAgLy8gRUNNQS0yNjIgMTEuNiBOYW1lcyBhbmQgS2V5d29yZHNcblx0ICAgIFNjYW5uZXIucHJvdG90eXBlLnNjYW5JZGVudGlmaWVyID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciB0eXBlO1xuXHQgICAgICAgIHZhciBzdGFydCA9IHRoaXMuaW5kZXg7XG5cdCAgICAgICAgLy8gQmFja3NsYXNoIChVKzAwNUMpIHN0YXJ0cyBhbiBlc2NhcGVkIGNoYXJhY3Rlci5cblx0ICAgICAgICB2YXIgaWQgPSAodGhpcy5zb3VyY2UuY2hhckNvZGVBdChzdGFydCkgPT09IDB4NUMpID8gdGhpcy5nZXRDb21wbGV4SWRlbnRpZmllcigpIDogdGhpcy5nZXRJZGVudGlmaWVyKCk7XG5cdCAgICAgICAgLy8gVGhlcmUgaXMgbm8ga2V5d29yZCBvciBsaXRlcmFsIHdpdGggb25seSBvbmUgY2hhcmFjdGVyLlxuXHQgICAgICAgIC8vIFRodXMsIGl0IG11c3QgYmUgYW4gaWRlbnRpZmllci5cblx0ICAgICAgICBpZiAoaWQubGVuZ3RoID09PSAxKSB7XG5cdCAgICAgICAgICAgIHR5cGUgPSB0b2tlbl8xLlRva2VuLklkZW50aWZpZXI7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGVsc2UgaWYgKHRoaXMuaXNLZXl3b3JkKGlkKSkge1xuXHQgICAgICAgICAgICB0eXBlID0gdG9rZW5fMS5Ub2tlbi5LZXl3b3JkO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIGlmIChpZCA9PT0gJ251bGwnKSB7XG5cdCAgICAgICAgICAgIHR5cGUgPSB0b2tlbl8xLlRva2VuLk51bGxMaXRlcmFsO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIGlmIChpZCA9PT0gJ3RydWUnIHx8IGlkID09PSAnZmFsc2UnKSB7XG5cdCAgICAgICAgICAgIHR5cGUgPSB0b2tlbl8xLlRva2VuLkJvb2xlYW5MaXRlcmFsO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgdHlwZSA9IHRva2VuXzEuVG9rZW4uSWRlbnRpZmllcjtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHtcblx0ICAgICAgICAgICAgdHlwZTogdHlwZSxcblx0ICAgICAgICAgICAgdmFsdWU6IGlkLFxuXHQgICAgICAgICAgICBsaW5lTnVtYmVyOiB0aGlzLmxpbmVOdW1iZXIsXG5cdCAgICAgICAgICAgIGxpbmVTdGFydDogdGhpcy5saW5lU3RhcnQsXG5cdCAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcblx0ICAgICAgICAgICAgZW5kOiB0aGlzLmluZGV4XG5cdCAgICAgICAgfTtcblx0ICAgIH07XG5cdCAgICA7XG5cdCAgICAvLyBFQ01BLTI2MiAxMS43IFB1bmN0dWF0b3JzXG5cdCAgICBTY2FubmVyLnByb3RvdHlwZS5zY2FuUHVuY3R1YXRvciA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgdG9rZW4gPSB7XG5cdCAgICAgICAgICAgIHR5cGU6IHRva2VuXzEuVG9rZW4uUHVuY3R1YXRvcixcblx0ICAgICAgICAgICAgdmFsdWU6ICcnLFxuXHQgICAgICAgICAgICBsaW5lTnVtYmVyOiB0aGlzLmxpbmVOdW1iZXIsXG5cdCAgICAgICAgICAgIGxpbmVTdGFydDogdGhpcy5saW5lU3RhcnQsXG5cdCAgICAgICAgICAgIHN0YXJ0OiB0aGlzLmluZGV4LFxuXHQgICAgICAgICAgICBlbmQ6IHRoaXMuaW5kZXhcblx0ICAgICAgICB9O1xuXHQgICAgICAgIC8vIENoZWNrIGZvciBtb3N0IGNvbW1vbiBzaW5nbGUtY2hhcmFjdGVyIHB1bmN0dWF0b3JzLlxuXHQgICAgICAgIHZhciBzdHIgPSB0aGlzLnNvdXJjZVt0aGlzLmluZGV4XTtcblx0ICAgICAgICBzd2l0Y2ggKHN0cikge1xuXHQgICAgICAgICAgICBjYXNlICcoJzpcblx0ICAgICAgICAgICAgY2FzZSAneyc6XG5cdCAgICAgICAgICAgICAgICBpZiAoc3RyID09PSAneycpIHtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cmx5U3RhY2sucHVzaCgneycpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgKyt0aGlzLmluZGV4O1xuXHQgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgIGNhc2UgJy4nOlxuXHQgICAgICAgICAgICAgICAgKyt0aGlzLmluZGV4O1xuXHQgICAgICAgICAgICAgICAgaWYgKHRoaXMuc291cmNlW3RoaXMuaW5kZXhdID09PSAnLicgJiYgdGhpcy5zb3VyY2VbdGhpcy5pbmRleCArIDFdID09PSAnLicpIHtcblx0ICAgICAgICAgICAgICAgICAgICAvLyBTcHJlYWQgb3BlcmF0b3I6IC4uLlxuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kZXggKz0gMjtcblx0ICAgICAgICAgICAgICAgICAgICBzdHIgPSAnLi4uJztcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICBjYXNlICd9Jzpcblx0ICAgICAgICAgICAgICAgICsrdGhpcy5pbmRleDtcblx0ICAgICAgICAgICAgICAgIHRoaXMuY3VybHlTdGFjay5wb3AoKTtcblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICBjYXNlICcpJzpcblx0ICAgICAgICAgICAgY2FzZSAnOyc6XG5cdCAgICAgICAgICAgIGNhc2UgJywnOlxuXHQgICAgICAgICAgICBjYXNlICdbJzpcblx0ICAgICAgICAgICAgY2FzZSAnXSc6XG5cdCAgICAgICAgICAgIGNhc2UgJzonOlxuXHQgICAgICAgICAgICBjYXNlICc/Jzpcblx0ICAgICAgICAgICAgY2FzZSAnfic6XG5cdCAgICAgICAgICAgICAgICArK3RoaXMuaW5kZXg7XG5cdCAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgZGVmYXVsdDpcblx0ICAgICAgICAgICAgICAgIC8vIDQtY2hhcmFjdGVyIHB1bmN0dWF0b3IuXG5cdCAgICAgICAgICAgICAgICBzdHIgPSB0aGlzLnNvdXJjZS5zdWJzdHIodGhpcy5pbmRleCwgNCk7XG5cdCAgICAgICAgICAgICAgICBpZiAoc3RyID09PSAnPj4+PScpIHtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLmluZGV4ICs9IDQ7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICAvLyAzLWNoYXJhY3RlciBwdW5jdHVhdG9ycy5cblx0ICAgICAgICAgICAgICAgICAgICBzdHIgPSBzdHIuc3Vic3RyKDAsIDMpO1xuXHQgICAgICAgICAgICAgICAgICAgIGlmIChzdHIgPT09ICc9PT0nIHx8IHN0ciA9PT0gJyE9PScgfHwgc3RyID09PSAnPj4+JyB8fFxuXHQgICAgICAgICAgICAgICAgICAgICAgICBzdHIgPT09ICc8PD0nIHx8IHN0ciA9PT0gJz4+PScgfHwgc3RyID09PSAnKio9Jykge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluZGV4ICs9IDM7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAvLyAyLWNoYXJhY3RlciBwdW5jdHVhdG9ycy5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgc3RyID0gc3RyLnN1YnN0cigwLCAyKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0ciA9PT0gJyYmJyB8fCBzdHIgPT09ICd8fCcgfHwgc3RyID09PSAnPT0nIHx8IHN0ciA9PT0gJyE9JyB8fFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyID09PSAnKz0nIHx8IHN0ciA9PT0gJy09JyB8fCBzdHIgPT09ICcqPScgfHwgc3RyID09PSAnLz0nIHx8XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHIgPT09ICcrKycgfHwgc3RyID09PSAnLS0nIHx8IHN0ciA9PT0gJzw8JyB8fCBzdHIgPT09ICc+PicgfHxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ciA9PT0gJyY9JyB8fCBzdHIgPT09ICd8PScgfHwgc3RyID09PSAnXj0nIHx8IHN0ciA9PT0gJyU9JyB8fFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyID09PSAnPD0nIHx8IHN0ciA9PT0gJz49JyB8fCBzdHIgPT09ICc9PicgfHwgc3RyID09PSAnKionKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluZGV4ICs9IDI7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAxLWNoYXJhY3RlciBwdW5jdHVhdG9ycy5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ciA9IHRoaXMuc291cmNlW3RoaXMuaW5kZXhdO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCc8Pj0hKy0qJSZ8Xi8nLmluZGV4T2Yoc3RyKSA+PSAwKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyt0aGlzLmluZGV4O1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAodGhpcy5pbmRleCA9PT0gdG9rZW4uc3RhcnQpIHtcblx0ICAgICAgICAgICAgdGhpcy50aHJvd1VuZXhwZWN0ZWRUb2tlbigpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICB0b2tlbi5lbmQgPSB0aGlzLmluZGV4O1xuXHQgICAgICAgIHRva2VuLnZhbHVlID0gc3RyO1xuXHQgICAgICAgIHJldHVybiB0b2tlbjtcblx0ICAgIH07XG5cdCAgICA7XG5cdCAgICAvLyBFQ01BLTI2MiAxMS44LjMgTnVtZXJpYyBMaXRlcmFsc1xuXHQgICAgU2Nhbm5lci5wcm90b3R5cGUuc2NhbkhleExpdGVyYWwgPSBmdW5jdGlvbiAoc3RhcnQpIHtcblx0ICAgICAgICB2YXIgbnVtYmVyID0gJyc7XG5cdCAgICAgICAgd2hpbGUgKCF0aGlzLmVvZigpKSB7XG5cdCAgICAgICAgICAgIGlmICghY2hhcmFjdGVyXzEuQ2hhcmFjdGVyLmlzSGV4RGlnaXQodGhpcy5zb3VyY2UuY2hhckNvZGVBdCh0aGlzLmluZGV4KSkpIHtcblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIG51bWJlciArPSB0aGlzLnNvdXJjZVt0aGlzLmluZGV4KytdO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAobnVtYmVyLmxlbmd0aCA9PT0gMCkge1xuXHQgICAgICAgICAgICB0aGlzLnRocm93VW5leHBlY3RlZFRva2VuKCk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmIChjaGFyYWN0ZXJfMS5DaGFyYWN0ZXIuaXNJZGVudGlmaWVyU3RhcnQodGhpcy5zb3VyY2UuY2hhckNvZGVBdCh0aGlzLmluZGV4KSkpIHtcblx0ICAgICAgICAgICAgdGhpcy50aHJvd1VuZXhwZWN0ZWRUb2tlbigpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4ge1xuXHQgICAgICAgICAgICB0eXBlOiB0b2tlbl8xLlRva2VuLk51bWVyaWNMaXRlcmFsLFxuXHQgICAgICAgICAgICB2YWx1ZTogcGFyc2VJbnQoJzB4JyArIG51bWJlciwgMTYpLFxuXHQgICAgICAgICAgICBsaW5lTnVtYmVyOiB0aGlzLmxpbmVOdW1iZXIsXG5cdCAgICAgICAgICAgIGxpbmVTdGFydDogdGhpcy5saW5lU3RhcnQsXG5cdCAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcblx0ICAgICAgICAgICAgZW5kOiB0aGlzLmluZGV4XG5cdCAgICAgICAgfTtcblx0ICAgIH07XG5cdCAgICA7XG5cdCAgICBTY2FubmVyLnByb3RvdHlwZS5zY2FuQmluYXJ5TGl0ZXJhbCA9IGZ1bmN0aW9uIChzdGFydCkge1xuXHQgICAgICAgIHZhciBudW1iZXIgPSAnJztcblx0ICAgICAgICB2YXIgY2g7XG5cdCAgICAgICAgd2hpbGUgKCF0aGlzLmVvZigpKSB7XG5cdCAgICAgICAgICAgIGNoID0gdGhpcy5zb3VyY2VbdGhpcy5pbmRleF07XG5cdCAgICAgICAgICAgIGlmIChjaCAhPT0gJzAnICYmIGNoICE9PSAnMScpIHtcblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIG51bWJlciArPSB0aGlzLnNvdXJjZVt0aGlzLmluZGV4KytdO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAobnVtYmVyLmxlbmd0aCA9PT0gMCkge1xuXHQgICAgICAgICAgICAvLyBvbmx5IDBiIG9yIDBCXG5cdCAgICAgICAgICAgIHRoaXMudGhyb3dVbmV4cGVjdGVkVG9rZW4oKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYgKCF0aGlzLmVvZigpKSB7XG5cdCAgICAgICAgICAgIGNoID0gdGhpcy5zb3VyY2UuY2hhckNvZGVBdCh0aGlzLmluZGV4KTtcblx0ICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cblx0ICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl8xLkNoYXJhY3Rlci5pc0lkZW50aWZpZXJTdGFydChjaCkgfHwgY2hhcmFjdGVyXzEuQ2hhcmFjdGVyLmlzRGVjaW1hbERpZ2l0KGNoKSkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy50aHJvd1VuZXhwZWN0ZWRUb2tlbigpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiB7XG5cdCAgICAgICAgICAgIHR5cGU6IHRva2VuXzEuVG9rZW4uTnVtZXJpY0xpdGVyYWwsXG5cdCAgICAgICAgICAgIHZhbHVlOiBwYXJzZUludChudW1iZXIsIDIpLFxuXHQgICAgICAgICAgICBsaW5lTnVtYmVyOiB0aGlzLmxpbmVOdW1iZXIsXG5cdCAgICAgICAgICAgIGxpbmVTdGFydDogdGhpcy5saW5lU3RhcnQsXG5cdCAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcblx0ICAgICAgICAgICAgZW5kOiB0aGlzLmluZGV4XG5cdCAgICAgICAgfTtcblx0ICAgIH07XG5cdCAgICA7XG5cdCAgICBTY2FubmVyLnByb3RvdHlwZS5zY2FuT2N0YWxMaXRlcmFsID0gZnVuY3Rpb24gKHByZWZpeCwgc3RhcnQpIHtcblx0ICAgICAgICB2YXIgbnVtYmVyID0gJyc7XG5cdCAgICAgICAgdmFyIG9jdGFsID0gZmFsc2U7XG5cdCAgICAgICAgaWYgKGNoYXJhY3Rlcl8xLkNoYXJhY3Rlci5pc09jdGFsRGlnaXQocHJlZml4LmNoYXJDb2RlQXQoMCkpKSB7XG5cdCAgICAgICAgICAgIG9jdGFsID0gdHJ1ZTtcblx0ICAgICAgICAgICAgbnVtYmVyID0gJzAnICsgdGhpcy5zb3VyY2VbdGhpcy5pbmRleCsrXTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgICsrdGhpcy5pbmRleDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgd2hpbGUgKCF0aGlzLmVvZigpKSB7XG5cdCAgICAgICAgICAgIGlmICghY2hhcmFjdGVyXzEuQ2hhcmFjdGVyLmlzT2N0YWxEaWdpdCh0aGlzLnNvdXJjZS5jaGFyQ29kZUF0KHRoaXMuaW5kZXgpKSkge1xuXHQgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgbnVtYmVyICs9IHRoaXMuc291cmNlW3RoaXMuaW5kZXgrK107XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmICghb2N0YWwgJiYgbnVtYmVyLmxlbmd0aCA9PT0gMCkge1xuXHQgICAgICAgICAgICAvLyBvbmx5IDBvIG9yIDBPXG5cdCAgICAgICAgICAgIHRoaXMudGhyb3dVbmV4cGVjdGVkVG9rZW4oKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYgKGNoYXJhY3Rlcl8xLkNoYXJhY3Rlci5pc0lkZW50aWZpZXJTdGFydCh0aGlzLnNvdXJjZS5jaGFyQ29kZUF0KHRoaXMuaW5kZXgpKSB8fCBjaGFyYWN0ZXJfMS5DaGFyYWN0ZXIuaXNEZWNpbWFsRGlnaXQodGhpcy5zb3VyY2UuY2hhckNvZGVBdCh0aGlzLmluZGV4KSkpIHtcblx0ICAgICAgICAgICAgdGhpcy50aHJvd1VuZXhwZWN0ZWRUb2tlbigpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4ge1xuXHQgICAgICAgICAgICB0eXBlOiB0b2tlbl8xLlRva2VuLk51bWVyaWNMaXRlcmFsLFxuXHQgICAgICAgICAgICB2YWx1ZTogcGFyc2VJbnQobnVtYmVyLCA4KSxcblx0ICAgICAgICAgICAgb2N0YWw6IG9jdGFsLFxuXHQgICAgICAgICAgICBsaW5lTnVtYmVyOiB0aGlzLmxpbmVOdW1iZXIsXG5cdCAgICAgICAgICAgIGxpbmVTdGFydDogdGhpcy5saW5lU3RhcnQsXG5cdCAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcblx0ICAgICAgICAgICAgZW5kOiB0aGlzLmluZGV4XG5cdCAgICAgICAgfTtcblx0ICAgIH07XG5cdCAgICA7XG5cdCAgICBTY2FubmVyLnByb3RvdHlwZS5pc0ltcGxpY2l0T2N0YWxMaXRlcmFsID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIC8vIEltcGxpY2l0IG9jdGFsLCB1bmxlc3MgdGhlcmUgaXMgYSBub24tb2N0YWwgZGlnaXQuXG5cdCAgICAgICAgLy8gKEFubmV4IEIuMS4xIG9uIE51bWVyaWMgTGl0ZXJhbHMpXG5cdCAgICAgICAgZm9yICh2YXIgaSA9IHRoaXMuaW5kZXggKyAxOyBpIDwgdGhpcy5sZW5ndGg7ICsraSkge1xuXHQgICAgICAgICAgICB2YXIgY2ggPSB0aGlzLnNvdXJjZVtpXTtcblx0ICAgICAgICAgICAgaWYgKGNoID09PSAnOCcgfHwgY2ggPT09ICc5Jykge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGlmICghY2hhcmFjdGVyXzEuQ2hhcmFjdGVyLmlzT2N0YWxEaWdpdChjaC5jaGFyQ29kZUF0KDApKSkge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHRydWU7XG5cdCAgICB9O1xuXHQgICAgO1xuXHQgICAgU2Nhbm5lci5wcm90b3R5cGUuc2Nhbk51bWVyaWNMaXRlcmFsID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBzdGFydCA9IHRoaXMuaW5kZXg7XG5cdCAgICAgICAgdmFyIGNoID0gdGhpcy5zb3VyY2Vbc3RhcnRdO1xuXHQgICAgICAgIGFzc2VydF8xLmFzc2VydChjaGFyYWN0ZXJfMS5DaGFyYWN0ZXIuaXNEZWNpbWFsRGlnaXQoY2guY2hhckNvZGVBdCgwKSkgfHwgKGNoID09PSAnLicpLCAnTnVtZXJpYyBsaXRlcmFsIG11c3Qgc3RhcnQgd2l0aCBhIGRlY2ltYWwgZGlnaXQgb3IgYSBkZWNpbWFsIHBvaW50Jyk7XG5cdCAgICAgICAgdmFyIG51bWJlciA9ICcnO1xuXHQgICAgICAgIGlmIChjaCAhPT0gJy4nKSB7XG5cdCAgICAgICAgICAgIG51bWJlciA9IHRoaXMuc291cmNlW3RoaXMuaW5kZXgrK107XG5cdCAgICAgICAgICAgIGNoID0gdGhpcy5zb3VyY2VbdGhpcy5pbmRleF07XG5cdCAgICAgICAgICAgIC8vIEhleCBudW1iZXIgc3RhcnRzIHdpdGggJzB4Jy5cblx0ICAgICAgICAgICAgLy8gT2N0YWwgbnVtYmVyIHN0YXJ0cyB3aXRoICcwJy5cblx0ICAgICAgICAgICAgLy8gT2N0YWwgbnVtYmVyIGluIEVTNiBzdGFydHMgd2l0aCAnMG8nLlxuXHQgICAgICAgICAgICAvLyBCaW5hcnkgbnVtYmVyIGluIEVTNiBzdGFydHMgd2l0aCAnMGInLlxuXHQgICAgICAgICAgICBpZiAobnVtYmVyID09PSAnMCcpIHtcblx0ICAgICAgICAgICAgICAgIGlmIChjaCA9PT0gJ3gnIHx8IGNoID09PSAnWCcpIHtcblx0ICAgICAgICAgICAgICAgICAgICArK3RoaXMuaW5kZXg7XG5cdCAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2NhbkhleExpdGVyYWwoc3RhcnQpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgaWYgKGNoID09PSAnYicgfHwgY2ggPT09ICdCJykge1xuXHQgICAgICAgICAgICAgICAgICAgICsrdGhpcy5pbmRleDtcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zY2FuQmluYXJ5TGl0ZXJhbChzdGFydCk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBpZiAoY2ggPT09ICdvJyB8fCBjaCA9PT0gJ08nKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2Nhbk9jdGFsTGl0ZXJhbChjaCwgc3RhcnQpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgaWYgKGNoICYmIGNoYXJhY3Rlcl8xLkNoYXJhY3Rlci5pc09jdGFsRGlnaXQoY2guY2hhckNvZGVBdCgwKSkpIHtcblx0ICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0ltcGxpY2l0T2N0YWxMaXRlcmFsKCkpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2Nhbk9jdGFsTGl0ZXJhbChjaCwgc3RhcnQpO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB3aGlsZSAoY2hhcmFjdGVyXzEuQ2hhcmFjdGVyLmlzRGVjaW1hbERpZ2l0KHRoaXMuc291cmNlLmNoYXJDb2RlQXQodGhpcy5pbmRleCkpKSB7XG5cdCAgICAgICAgICAgICAgICBudW1iZXIgKz0gdGhpcy5zb3VyY2VbdGhpcy5pbmRleCsrXTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBjaCA9IHRoaXMuc291cmNlW3RoaXMuaW5kZXhdO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAoY2ggPT09ICcuJykge1xuXHQgICAgICAgICAgICBudW1iZXIgKz0gdGhpcy5zb3VyY2VbdGhpcy5pbmRleCsrXTtcblx0ICAgICAgICAgICAgd2hpbGUgKGNoYXJhY3Rlcl8xLkNoYXJhY3Rlci5pc0RlY2ltYWxEaWdpdCh0aGlzLnNvdXJjZS5jaGFyQ29kZUF0KHRoaXMuaW5kZXgpKSkge1xuXHQgICAgICAgICAgICAgICAgbnVtYmVyICs9IHRoaXMuc291cmNlW3RoaXMuaW5kZXgrK107XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgY2ggPSB0aGlzLnNvdXJjZVt0aGlzLmluZGV4XTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYgKGNoID09PSAnZScgfHwgY2ggPT09ICdFJykge1xuXHQgICAgICAgICAgICBudW1iZXIgKz0gdGhpcy5zb3VyY2VbdGhpcy5pbmRleCsrXTtcblx0ICAgICAgICAgICAgY2ggPSB0aGlzLnNvdXJjZVt0aGlzLmluZGV4XTtcblx0ICAgICAgICAgICAgaWYgKGNoID09PSAnKycgfHwgY2ggPT09ICctJykge1xuXHQgICAgICAgICAgICAgICAgbnVtYmVyICs9IHRoaXMuc291cmNlW3RoaXMuaW5kZXgrK107XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl8xLkNoYXJhY3Rlci5pc0RlY2ltYWxEaWdpdCh0aGlzLnNvdXJjZS5jaGFyQ29kZUF0KHRoaXMuaW5kZXgpKSkge1xuXHQgICAgICAgICAgICAgICAgd2hpbGUgKGNoYXJhY3Rlcl8xLkNoYXJhY3Rlci5pc0RlY2ltYWxEaWdpdCh0aGlzLnNvdXJjZS5jaGFyQ29kZUF0KHRoaXMuaW5kZXgpKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIG51bWJlciArPSB0aGlzLnNvdXJjZVt0aGlzLmluZGV4KytdO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgdGhpcy50aHJvd1VuZXhwZWN0ZWRUb2tlbigpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmIChjaGFyYWN0ZXJfMS5DaGFyYWN0ZXIuaXNJZGVudGlmaWVyU3RhcnQodGhpcy5zb3VyY2UuY2hhckNvZGVBdCh0aGlzLmluZGV4KSkpIHtcblx0ICAgICAgICAgICAgdGhpcy50aHJvd1VuZXhwZWN0ZWRUb2tlbigpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4ge1xuXHQgICAgICAgICAgICB0eXBlOiB0b2tlbl8xLlRva2VuLk51bWVyaWNMaXRlcmFsLFxuXHQgICAgICAgICAgICB2YWx1ZTogcGFyc2VGbG9hdChudW1iZXIpLFxuXHQgICAgICAgICAgICBsaW5lTnVtYmVyOiB0aGlzLmxpbmVOdW1iZXIsXG5cdCAgICAgICAgICAgIGxpbmVTdGFydDogdGhpcy5saW5lU3RhcnQsXG5cdCAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcblx0ICAgICAgICAgICAgZW5kOiB0aGlzLmluZGV4XG5cdCAgICAgICAgfTtcblx0ICAgIH07XG5cdCAgICA7XG5cdCAgICAvLyBFQ01BLTI2MiAxMS44LjQgU3RyaW5nIExpdGVyYWxzXG5cdCAgICBTY2FubmVyLnByb3RvdHlwZS5zY2FuU3RyaW5nTGl0ZXJhbCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgc3RhcnQgPSB0aGlzLmluZGV4O1xuXHQgICAgICAgIHZhciBxdW90ZSA9IHRoaXMuc291cmNlW3N0YXJ0XTtcblx0ICAgICAgICBhc3NlcnRfMS5hc3NlcnQoKHF1b3RlID09PSAnXFwnJyB8fCBxdW90ZSA9PT0gJ1wiJyksICdTdHJpbmcgbGl0ZXJhbCBtdXN0IHN0YXJ0cyB3aXRoIGEgcXVvdGUnKTtcblx0ICAgICAgICArK3RoaXMuaW5kZXg7XG5cdCAgICAgICAgdmFyIG9jdGFsID0gZmFsc2U7XG5cdCAgICAgICAgdmFyIHN0ciA9ICcnO1xuXHQgICAgICAgIHdoaWxlICghdGhpcy5lb2YoKSkge1xuXHQgICAgICAgICAgICB2YXIgY2ggPSB0aGlzLnNvdXJjZVt0aGlzLmluZGV4KytdO1xuXHQgICAgICAgICAgICBpZiAoY2ggPT09IHF1b3RlKSB7XG5cdCAgICAgICAgICAgICAgICBxdW90ZSA9ICcnO1xuXHQgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZWxzZSBpZiAoY2ggPT09ICdcXFxcJykge1xuXHQgICAgICAgICAgICAgICAgY2ggPSB0aGlzLnNvdXJjZVt0aGlzLmluZGV4KytdO1xuXHQgICAgICAgICAgICAgICAgaWYgKCFjaCB8fCAhY2hhcmFjdGVyXzEuQ2hhcmFjdGVyLmlzTGluZVRlcm1pbmF0b3IoY2guY2hhckNvZGVBdCgwKSkpIHtcblx0ICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGNoKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3UnOlxuXHQgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd4Jzpcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNvdXJjZVt0aGlzLmluZGV4XSA9PT0gJ3snKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyt0aGlzLmluZGV4O1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ciArPSB0aGlzLnNjYW5Vbmljb2RlQ29kZVBvaW50RXNjYXBlKCk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdW5lc2NhcGVkID0gdGhpcy5zY2FuSGV4RXNjYXBlKGNoKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXVuZXNjYXBlZCkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRocm93VW5leHBlY3RlZFRva2VuKCk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ciArPSB1bmVzY2FwZWQ7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbic6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHIgKz0gJ1xcbic7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncic6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHIgKz0gJ1xccic7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAndCc6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHIgKz0gJ1xcdCc7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnYic6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHIgKz0gJ1xcYic7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZic6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHIgKz0gJ1xcZic7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAndic6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHIgKz0gJ1xceDBCJztcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICc4Jzpcblx0ICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnOSc6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHIgKz0gY2g7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvbGVyYXRlVW5leHBlY3RlZFRva2VuKCk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaCAmJiBjaGFyYWN0ZXJfMS5DaGFyYWN0ZXIuaXNPY3RhbERpZ2l0KGNoLmNoYXJDb2RlQXQoMCkpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9jdFRvRGVjID0gdGhpcy5vY3RhbFRvRGVjaW1hbChjaCk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2N0YWwgPSBvY3RUb0RlYy5vY3RhbCB8fCBvY3RhbDtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShvY3RUb0RlYy5jb2RlKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ciArPSBjaDtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgICsrdGhpcy5saW5lTnVtYmVyO1xuXHQgICAgICAgICAgICAgICAgICAgIGlmIChjaCA9PT0gJ1xccicgJiYgdGhpcy5zb3VyY2VbdGhpcy5pbmRleF0gPT09ICdcXG4nKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICsrdGhpcy5pbmRleDtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5saW5lU3RhcnQgPSB0aGlzLmluZGV4O1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2UgaWYgKGNoYXJhY3Rlcl8xLkNoYXJhY3Rlci5pc0xpbmVUZXJtaW5hdG9yKGNoLmNoYXJDb2RlQXQoMCkpKSB7XG5cdCAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIHN0ciArPSBjaDtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAocXVvdGUgIT09ICcnKSB7XG5cdCAgICAgICAgICAgIHRoaXMuaW5kZXggPSBzdGFydDtcblx0ICAgICAgICAgICAgdGhpcy50aHJvd1VuZXhwZWN0ZWRUb2tlbigpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4ge1xuXHQgICAgICAgICAgICB0eXBlOiB0b2tlbl8xLlRva2VuLlN0cmluZ0xpdGVyYWwsXG5cdCAgICAgICAgICAgIHZhbHVlOiBzdHIsXG5cdCAgICAgICAgICAgIG9jdGFsOiBvY3RhbCxcblx0ICAgICAgICAgICAgbGluZU51bWJlcjogdGhpcy5saW5lTnVtYmVyLFxuXHQgICAgICAgICAgICBsaW5lU3RhcnQ6IHRoaXMubGluZVN0YXJ0LFxuXHQgICAgICAgICAgICBzdGFydDogc3RhcnQsXG5cdCAgICAgICAgICAgIGVuZDogdGhpcy5pbmRleFxuXHQgICAgICAgIH07XG5cdCAgICB9O1xuXHQgICAgO1xuXHQgICAgLy8gRUNNQS0yNjIgMTEuOC42IFRlbXBsYXRlIExpdGVyYWwgTGV4aWNhbCBDb21wb25lbnRzXG5cdCAgICBTY2FubmVyLnByb3RvdHlwZS5zY2FuVGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIGNvb2tlZCA9ICcnO1xuXHQgICAgICAgIHZhciB0ZXJtaW5hdGVkID0gZmFsc2U7XG5cdCAgICAgICAgdmFyIHN0YXJ0ID0gdGhpcy5pbmRleDtcblx0ICAgICAgICB2YXIgaGVhZCA9ICh0aGlzLnNvdXJjZVtzdGFydF0gPT09ICdgJyk7XG5cdCAgICAgICAgdmFyIHRhaWwgPSBmYWxzZTtcblx0ICAgICAgICB2YXIgcmF3T2Zmc2V0ID0gMjtcblx0ICAgICAgICArK3RoaXMuaW5kZXg7XG5cdCAgICAgICAgd2hpbGUgKCF0aGlzLmVvZigpKSB7XG5cdCAgICAgICAgICAgIHZhciBjaCA9IHRoaXMuc291cmNlW3RoaXMuaW5kZXgrK107XG5cdCAgICAgICAgICAgIGlmIChjaCA9PT0gJ2AnKSB7XG5cdCAgICAgICAgICAgICAgICByYXdPZmZzZXQgPSAxO1xuXHQgICAgICAgICAgICAgICAgdGFpbCA9IHRydWU7XG5cdCAgICAgICAgICAgICAgICB0ZXJtaW5hdGVkID0gdHJ1ZTtcblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2UgaWYgKGNoID09PSAnJCcpIHtcblx0ICAgICAgICAgICAgICAgIGlmICh0aGlzLnNvdXJjZVt0aGlzLmluZGV4XSA9PT0gJ3snKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJseVN0YWNrLnB1c2goJyR7Jyk7XG5cdCAgICAgICAgICAgICAgICAgICAgKyt0aGlzLmluZGV4O1xuXHQgICAgICAgICAgICAgICAgICAgIHRlcm1pbmF0ZWQgPSB0cnVlO1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgY29va2VkICs9IGNoO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2UgaWYgKGNoID09PSAnXFxcXCcpIHtcblx0ICAgICAgICAgICAgICAgIGNoID0gdGhpcy5zb3VyY2VbdGhpcy5pbmRleCsrXTtcblx0ICAgICAgICAgICAgICAgIGlmICghY2hhcmFjdGVyXzEuQ2hhcmFjdGVyLmlzTGluZVRlcm1pbmF0b3IoY2guY2hhckNvZGVBdCgwKSkpIHtcblx0ICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGNoKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ24nOlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29va2VkICs9ICdcXG4nO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3InOlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29va2VkICs9ICdcXHInO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3QnOlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29va2VkICs9ICdcXHQnO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3UnOlxuXHQgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd4Jzpcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNvdXJjZVt0aGlzLmluZGV4XSA9PT0gJ3snKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyt0aGlzLmluZGV4O1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvb2tlZCArPSB0aGlzLnNjYW5Vbmljb2RlQ29kZVBvaW50RXNjYXBlKCk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdG9yZSA9IHRoaXMuaW5kZXg7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVuZXNjYXBlZCA9IHRoaXMuc2NhbkhleEVzY2FwZShjaCk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVuZXNjYXBlZCkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb29rZWQgKz0gdW5lc2NhcGVkO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmRleCA9IHJlc3RvcmU7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvb2tlZCArPSBjaDtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnYic6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb29rZWQgKz0gJ1xcYic7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZic6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb29rZWQgKz0gJ1xcZic7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAndic6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb29rZWQgKz0gJ1xcdic7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaCA9PT0gJzAnKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl8xLkNoYXJhY3Rlci5pc0RlY2ltYWxEaWdpdCh0aGlzLnNvdXJjZS5jaGFyQ29kZUF0KHRoaXMuaW5kZXgpKSkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJbGxlZ2FsOiBcXDAxIFxcMDIgYW5kIHNvIG9uXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGhyb3dVbmV4cGVjdGVkVG9rZW4obWVzc2FnZXNfMS5NZXNzYWdlcy5UZW1wbGF0ZU9jdGFsTGl0ZXJhbCk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvb2tlZCArPSAnXFwwJztcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNoYXJhY3Rlcl8xLkNoYXJhY3Rlci5pc09jdGFsRGlnaXQoY2guY2hhckNvZGVBdCgwKSkpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJbGxlZ2FsOiBcXDEgXFwyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50aHJvd1VuZXhwZWN0ZWRUb2tlbihtZXNzYWdlc18xLk1lc3NhZ2VzLlRlbXBsYXRlT2N0YWxMaXRlcmFsKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvb2tlZCArPSBjaDtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgICsrdGhpcy5saW5lTnVtYmVyO1xuXHQgICAgICAgICAgICAgICAgICAgIGlmIChjaCA9PT0gJ1xccicgJiYgdGhpcy5zb3VyY2VbdGhpcy5pbmRleF0gPT09ICdcXG4nKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICsrdGhpcy5pbmRleDtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5saW5lU3RhcnQgPSB0aGlzLmluZGV4O1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2UgaWYgKGNoYXJhY3Rlcl8xLkNoYXJhY3Rlci5pc0xpbmVUZXJtaW5hdG9yKGNoLmNoYXJDb2RlQXQoMCkpKSB7XG5cdCAgICAgICAgICAgICAgICArK3RoaXMubGluZU51bWJlcjtcblx0ICAgICAgICAgICAgICAgIGlmIChjaCA9PT0gJ1xccicgJiYgdGhpcy5zb3VyY2VbdGhpcy5pbmRleF0gPT09ICdcXG4nKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgKyt0aGlzLmluZGV4O1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgdGhpcy5saW5lU3RhcnQgPSB0aGlzLmluZGV4O1xuXHQgICAgICAgICAgICAgICAgY29va2VkICs9ICdcXG4nO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgY29va2VkICs9IGNoO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmICghdGVybWluYXRlZCkge1xuXHQgICAgICAgICAgICB0aGlzLnRocm93VW5leHBlY3RlZFRva2VuKCk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmICghaGVhZCkge1xuXHQgICAgICAgICAgICB0aGlzLmN1cmx5U3RhY2sucG9wKCk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiB7XG5cdCAgICAgICAgICAgIHR5cGU6IHRva2VuXzEuVG9rZW4uVGVtcGxhdGUsXG5cdCAgICAgICAgICAgIHZhbHVlOiB7XG5cdCAgICAgICAgICAgICAgICBjb29rZWQ6IGNvb2tlZCxcblx0ICAgICAgICAgICAgICAgIHJhdzogdGhpcy5zb3VyY2Uuc2xpY2Uoc3RhcnQgKyAxLCB0aGlzLmluZGV4IC0gcmF3T2Zmc2V0KVxuXHQgICAgICAgICAgICB9LFxuXHQgICAgICAgICAgICBoZWFkOiBoZWFkLFxuXHQgICAgICAgICAgICB0YWlsOiB0YWlsLFxuXHQgICAgICAgICAgICBsaW5lTnVtYmVyOiB0aGlzLmxpbmVOdW1iZXIsXG5cdCAgICAgICAgICAgIGxpbmVTdGFydDogdGhpcy5saW5lU3RhcnQsXG5cdCAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcblx0ICAgICAgICAgICAgZW5kOiB0aGlzLmluZGV4XG5cdCAgICAgICAgfTtcblx0ICAgIH07XG5cdCAgICA7XG5cdCAgICAvLyBFQ01BLTI2MiAxMS44LjUgUmVndWxhciBFeHByZXNzaW9uIExpdGVyYWxzXG5cdCAgICBTY2FubmVyLnByb3RvdHlwZS50ZXN0UmVnRXhwID0gZnVuY3Rpb24gKHBhdHRlcm4sIGZsYWdzKSB7XG5cdCAgICAgICAgLy8gVGhlIEJNUCBjaGFyYWN0ZXIgdG8gdXNlIGFzIGEgcmVwbGFjZW1lbnQgZm9yIGFzdHJhbCBzeW1ib2xzIHdoZW5cblx0ICAgICAgICAvLyB0cmFuc2xhdGluZyBhbiBFUzYgXCJ1XCItZmxhZ2dlZCBwYXR0ZXJuIHRvIGFuIEVTNS1jb21wYXRpYmxlXG5cdCAgICAgICAgLy8gYXBwcm94aW1hdGlvbi5cblx0ICAgICAgICAvLyBOb3RlOiByZXBsYWNpbmcgd2l0aCAnXFx1RkZGRicgZW5hYmxlcyBmYWxzZSBwb3NpdGl2ZXMgaW4gdW5saWtlbHlcblx0ICAgICAgICAvLyBzY2VuYXJpb3MuIEZvciBleGFtcGxlLCBgW1xcdXsxMDQ0Zn0tXFx1ezEwNDQwfV1gIGlzIGFuIGludmFsaWRcblx0ICAgICAgICAvLyBwYXR0ZXJuIHRoYXQgd291bGQgbm90IGJlIGRldGVjdGVkIGJ5IHRoaXMgc3Vic3RpdHV0aW9uLlxuXHQgICAgICAgIHZhciBhc3RyYWxTdWJzdGl0dXRlID0gJ1xcdUZGRkYnO1xuXHQgICAgICAgIHZhciB0bXAgPSBwYXR0ZXJuO1xuXHQgICAgICAgIHZhciBzZWxmID0gdGhpcztcblx0ICAgICAgICBpZiAoZmxhZ3MuaW5kZXhPZigndScpID49IDApIHtcblx0ICAgICAgICAgICAgdG1wID0gdG1wXG5cdCAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxcXHVcXHsoWzAtOWEtZkEtRl0rKVxcfXxcXFxcdShbYS1mQS1GMC05XXs0fSkvZywgZnVuY3Rpb24gKCQwLCAkMSwgJDIpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBjb2RlUG9pbnQgPSBwYXJzZUludCgkMSB8fCAkMiwgMTYpO1xuXHQgICAgICAgICAgICAgICAgaWYgKGNvZGVQb2ludCA+IDB4MTBGRkZGKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgc2VsZi50aHJvd1VuZXhwZWN0ZWRUb2tlbihtZXNzYWdlc18xLk1lc3NhZ2VzLkludmFsaWRSZWdFeHApO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgaWYgKGNvZGVQb2ludCA8PSAweEZGRkYpIHtcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlUG9pbnQpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIGFzdHJhbFN1YnN0aXR1dGU7XG5cdCAgICAgICAgICAgIH0pXG5cdCAgICAgICAgICAgICAgICAucmVwbGFjZSgvW1xcdUQ4MDAtXFx1REJGRl1bXFx1REMwMC1cXHVERkZGXS9nLCBhc3RyYWxTdWJzdGl0dXRlKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgLy8gRmlyc3QsIGRldGVjdCBpbnZhbGlkIHJlZ3VsYXIgZXhwcmVzc2lvbnMuXG5cdCAgICAgICAgdHJ5IHtcblx0ICAgICAgICAgICAgUmVnRXhwKHRtcCk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGNhdGNoIChlKSB7XG5cdCAgICAgICAgICAgIHRoaXMudGhyb3dVbmV4cGVjdGVkVG9rZW4obWVzc2FnZXNfMS5NZXNzYWdlcy5JbnZhbGlkUmVnRXhwKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgLy8gUmV0dXJuIGEgcmVndWxhciBleHByZXNzaW9uIG9iamVjdCBmb3IgdGhpcyBwYXR0ZXJuLWZsYWcgcGFpciwgb3Jcblx0ICAgICAgICAvLyBgbnVsbGAgaW4gY2FzZSB0aGUgY3VycmVudCBlbnZpcm9ubWVudCBkb2Vzbid0IHN1cHBvcnQgdGhlIGZsYWdzIGl0XG5cdCAgICAgICAgLy8gdXNlcy5cblx0ICAgICAgICB0cnkge1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cChwYXR0ZXJuLCBmbGFncyk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGNhdGNoIChleGNlcHRpb24pIHtcblx0ICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cblx0ICAgICAgICAgICAgcmV0dXJuIG51bGw7XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblx0ICAgIDtcblx0ICAgIFNjYW5uZXIucHJvdG90eXBlLnNjYW5SZWdFeHBCb2R5ID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBjaCA9IHRoaXMuc291cmNlW3RoaXMuaW5kZXhdO1xuXHQgICAgICAgIGFzc2VydF8xLmFzc2VydChjaCA9PT0gJy8nLCAnUmVndWxhciBleHByZXNzaW9uIGxpdGVyYWwgbXVzdCBzdGFydCB3aXRoIGEgc2xhc2gnKTtcblx0ICAgICAgICB2YXIgc3RyID0gdGhpcy5zb3VyY2VbdGhpcy5pbmRleCsrXTtcblx0ICAgICAgICB2YXIgY2xhc3NNYXJrZXIgPSBmYWxzZTtcblx0ICAgICAgICB2YXIgdGVybWluYXRlZCA9IGZhbHNlO1xuXHQgICAgICAgIHdoaWxlICghdGhpcy5lb2YoKSkge1xuXHQgICAgICAgICAgICBjaCA9IHRoaXMuc291cmNlW3RoaXMuaW5kZXgrK107XG5cdCAgICAgICAgICAgIHN0ciArPSBjaDtcblx0ICAgICAgICAgICAgaWYgKGNoID09PSAnXFxcXCcpIHtcblx0ICAgICAgICAgICAgICAgIGNoID0gdGhpcy5zb3VyY2VbdGhpcy5pbmRleCsrXTtcblx0ICAgICAgICAgICAgICAgIC8vIEVDTUEtMjYyIDcuOC41XG5cdCAgICAgICAgICAgICAgICBpZiAoY2hhcmFjdGVyXzEuQ2hhcmFjdGVyLmlzTGluZVRlcm1pbmF0b3IoY2guY2hhckNvZGVBdCgwKSkpIHtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLnRocm93VW5leHBlY3RlZFRva2VuKG1lc3NhZ2VzXzEuTWVzc2FnZXMuVW50ZXJtaW5hdGVkUmVnRXhwKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIHN0ciArPSBjaDtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBlbHNlIGlmIChjaGFyYWN0ZXJfMS5DaGFyYWN0ZXIuaXNMaW5lVGVybWluYXRvcihjaC5jaGFyQ29kZUF0KDApKSkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy50aHJvd1VuZXhwZWN0ZWRUb2tlbihtZXNzYWdlc18xLk1lc3NhZ2VzLlVudGVybWluYXRlZFJlZ0V4cCk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZWxzZSBpZiAoY2xhc3NNYXJrZXIpIHtcblx0ICAgICAgICAgICAgICAgIGlmIChjaCA9PT0gJ10nKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgY2xhc3NNYXJrZXIgPSBmYWxzZTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIGlmIChjaCA9PT0gJy8nKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGVybWluYXRlZCA9IHRydWU7XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBlbHNlIGlmIChjaCA9PT0gJ1snKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgY2xhc3NNYXJrZXIgPSB0cnVlO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmICghdGVybWluYXRlZCkge1xuXHQgICAgICAgICAgICB0aGlzLnRocm93VW5leHBlY3RlZFRva2VuKG1lc3NhZ2VzXzEuTWVzc2FnZXMuVW50ZXJtaW5hdGVkUmVnRXhwKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgLy8gRXhjbHVkZSBsZWFkaW5nIGFuZCB0cmFpbGluZyBzbGFzaC5cblx0ICAgICAgICB2YXIgYm9keSA9IHN0ci5zdWJzdHIoMSwgc3RyLmxlbmd0aCAtIDIpO1xuXHQgICAgICAgIHJldHVybiB7XG5cdCAgICAgICAgICAgIHZhbHVlOiBib2R5LFxuXHQgICAgICAgICAgICBsaXRlcmFsOiBzdHJcblx0ICAgICAgICB9O1xuXHQgICAgfTtcblx0ICAgIDtcblx0ICAgIFNjYW5uZXIucHJvdG90eXBlLnNjYW5SZWdFeHBGbGFncyA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgc3RyID0gJyc7XG5cdCAgICAgICAgdmFyIGZsYWdzID0gJyc7XG5cdCAgICAgICAgd2hpbGUgKCF0aGlzLmVvZigpKSB7XG5cdCAgICAgICAgICAgIHZhciBjaCA9IHRoaXMuc291cmNlW3RoaXMuaW5kZXhdO1xuXHQgICAgICAgICAgICBpZiAoIWNoYXJhY3Rlcl8xLkNoYXJhY3Rlci5pc0lkZW50aWZpZXJQYXJ0KGNoLmNoYXJDb2RlQXQoMCkpKSB7XG5cdCAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICArK3RoaXMuaW5kZXg7XG5cdCAgICAgICAgICAgIGlmIChjaCA9PT0gJ1xcXFwnICYmICF0aGlzLmVvZigpKSB7XG5cdCAgICAgICAgICAgICAgICBjaCA9IHRoaXMuc291cmNlW3RoaXMuaW5kZXhdO1xuXHQgICAgICAgICAgICAgICAgaWYgKGNoID09PSAndScpIHtcblx0ICAgICAgICAgICAgICAgICAgICArK3RoaXMuaW5kZXg7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3RvcmUgPSB0aGlzLmluZGV4O1xuXHQgICAgICAgICAgICAgICAgICAgIGNoID0gdGhpcy5zY2FuSGV4RXNjYXBlKCd1Jyk7XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKGNoKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGZsYWdzICs9IGNoO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHN0ciArPSAnXFxcXHUnOyByZXN0b3JlIDwgdGhpcy5pbmRleDsgKytyZXN0b3JlKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHIgKz0gdGhpcy5zb3VyY2VbcmVzdG9yZV07XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kZXggPSByZXN0b3JlO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBmbGFncyArPSAndSc7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHN0ciArPSAnXFxcXHUnO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLnRvbGVyYXRlVW5leHBlY3RlZFRva2VuKCk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICBzdHIgKz0gJ1xcXFwnO1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMudG9sZXJhdGVVbmV4cGVjdGVkVG9rZW4oKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIGZsYWdzICs9IGNoO1xuXHQgICAgICAgICAgICAgICAgc3RyICs9IGNoO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiB7XG5cdCAgICAgICAgICAgIHZhbHVlOiBmbGFncyxcblx0ICAgICAgICAgICAgbGl0ZXJhbDogc3RyXG5cdCAgICAgICAgfTtcblx0ICAgIH07XG5cdCAgICA7XG5cdCAgICBTY2FubmVyLnByb3RvdHlwZS5zY2FuUmVnRXhwID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBzdGFydCA9IHRoaXMuaW5kZXg7XG5cdCAgICAgICAgdmFyIGJvZHkgPSB0aGlzLnNjYW5SZWdFeHBCb2R5KCk7XG5cdCAgICAgICAgdmFyIGZsYWdzID0gdGhpcy5zY2FuUmVnRXhwRmxhZ3MoKTtcblx0ICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLnRlc3RSZWdFeHAoYm9keS52YWx1ZSwgZmxhZ3MudmFsdWUpO1xuXHQgICAgICAgIHJldHVybiB7XG5cdCAgICAgICAgICAgIHR5cGU6IHRva2VuXzEuVG9rZW4uUmVndWxhckV4cHJlc3Npb24sXG5cdCAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcblx0ICAgICAgICAgICAgbGl0ZXJhbDogYm9keS5saXRlcmFsICsgZmxhZ3MubGl0ZXJhbCxcblx0ICAgICAgICAgICAgcmVnZXg6IHtcblx0ICAgICAgICAgICAgICAgIHBhdHRlcm46IGJvZHkudmFsdWUsXG5cdCAgICAgICAgICAgICAgICBmbGFnczogZmxhZ3MudmFsdWVcblx0ICAgICAgICAgICAgfSxcblx0ICAgICAgICAgICAgbGluZU51bWJlcjogdGhpcy5saW5lTnVtYmVyLFxuXHQgICAgICAgICAgICBsaW5lU3RhcnQ6IHRoaXMubGluZVN0YXJ0LFxuXHQgICAgICAgICAgICBzdGFydDogc3RhcnQsXG5cdCAgICAgICAgICAgIGVuZDogdGhpcy5pbmRleFxuXHQgICAgICAgIH07XG5cdCAgICB9O1xuXHQgICAgO1xuXHQgICAgU2Nhbm5lci5wcm90b3R5cGUubGV4ID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGlmICh0aGlzLmVvZigpKSB7XG5cdCAgICAgICAgICAgIHJldHVybiB7XG5cdCAgICAgICAgICAgICAgICB0eXBlOiB0b2tlbl8xLlRva2VuLkVPRixcblx0ICAgICAgICAgICAgICAgIGxpbmVOdW1iZXI6IHRoaXMubGluZU51bWJlcixcblx0ICAgICAgICAgICAgICAgIGxpbmVTdGFydDogdGhpcy5saW5lU3RhcnQsXG5cdCAgICAgICAgICAgICAgICBzdGFydDogdGhpcy5pbmRleCxcblx0ICAgICAgICAgICAgICAgIGVuZDogdGhpcy5pbmRleFxuXHQgICAgICAgICAgICB9O1xuXHQgICAgICAgIH1cblx0ICAgICAgICB2YXIgY3AgPSB0aGlzLnNvdXJjZS5jaGFyQ29kZUF0KHRoaXMuaW5kZXgpO1xuXHQgICAgICAgIGlmIChjaGFyYWN0ZXJfMS5DaGFyYWN0ZXIuaXNJZGVudGlmaWVyU3RhcnQoY3ApKSB7XG5cdCAgICAgICAgICAgIHJldHVybiB0aGlzLnNjYW5JZGVudGlmaWVyKCk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIC8vIFZlcnkgY29tbW9uOiAoIGFuZCApIGFuZCA7XG5cdCAgICAgICAgaWYgKGNwID09PSAweDI4IHx8IGNwID09PSAweDI5IHx8IGNwID09PSAweDNCKSB7XG5cdCAgICAgICAgICAgIHJldHVybiB0aGlzLnNjYW5QdW5jdHVhdG9yKCk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIC8vIFN0cmluZyBsaXRlcmFsIHN0YXJ0cyB3aXRoIHNpbmdsZSBxdW90ZSAoVSswMDI3KSBvciBkb3VibGUgcXVvdGUgKFUrMDAyMikuXG5cdCAgICAgICAgaWYgKGNwID09PSAweDI3IHx8IGNwID09PSAweDIyKSB7XG5cdCAgICAgICAgICAgIHJldHVybiB0aGlzLnNjYW5TdHJpbmdMaXRlcmFsKCk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIC8vIERvdCAoLikgVSswMDJFIGNhbiBhbHNvIHN0YXJ0IGEgZmxvYXRpbmctcG9pbnQgbnVtYmVyLCBoZW5jZSB0aGUgbmVlZFxuXHQgICAgICAgIC8vIHRvIGNoZWNrIHRoZSBuZXh0IGNoYXJhY3Rlci5cblx0ICAgICAgICBpZiAoY3AgPT09IDB4MkUpIHtcblx0ICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl8xLkNoYXJhY3Rlci5pc0RlY2ltYWxEaWdpdCh0aGlzLnNvdXJjZS5jaGFyQ29kZUF0KHRoaXMuaW5kZXggKyAxKSkpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNjYW5OdW1lcmljTGl0ZXJhbCgpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHJldHVybiB0aGlzLnNjYW5QdW5jdHVhdG9yKCk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmIChjaGFyYWN0ZXJfMS5DaGFyYWN0ZXIuaXNEZWNpbWFsRGlnaXQoY3ApKSB7XG5cdCAgICAgICAgICAgIHJldHVybiB0aGlzLnNjYW5OdW1lcmljTGl0ZXJhbCgpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICAvLyBUZW1wbGF0ZSBsaXRlcmFscyBzdGFydCB3aXRoIGAgKFUrMDA2MCkgZm9yIHRlbXBsYXRlIGhlYWRcblx0ICAgICAgICAvLyBvciB9IChVKzAwN0QpIGZvciB0ZW1wbGF0ZSBtaWRkbGUgb3IgdGVtcGxhdGUgdGFpbC5cblx0ICAgICAgICBpZiAoY3AgPT09IDB4NjAgfHwgKGNwID09PSAweDdEICYmIHRoaXMuY3VybHlTdGFja1t0aGlzLmN1cmx5U3RhY2subGVuZ3RoIC0gMV0gPT09ICckeycpKSB7XG5cdCAgICAgICAgICAgIHJldHVybiB0aGlzLnNjYW5UZW1wbGF0ZSgpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICAvLyBQb3NzaWJsZSBpZGVudGlmaWVyIHN0YXJ0IGluIGEgc3Vycm9nYXRlIHBhaXIuXG5cdCAgICAgICAgaWYgKGNwID49IDB4RDgwMCAmJiBjcCA8IDB4REZGRikge1xuXHQgICAgICAgICAgICBpZiAoY2hhcmFjdGVyXzEuQ2hhcmFjdGVyLmlzSWRlbnRpZmllclN0YXJ0KHRoaXMuY29kZVBvaW50QXQodGhpcy5pbmRleCkpKSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zY2FuSWRlbnRpZmllcigpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiB0aGlzLnNjYW5QdW5jdHVhdG9yKCk7XG5cdCAgICB9O1xuXHQgICAgO1xuXHQgICAgcmV0dXJuIFNjYW5uZXI7XG5cdH0oKSk7XG5cdGV4cG9ydHMuU2Nhbm5lciA9IFNjYW5uZXI7XG5cblxuLyoqKi8gfSxcbi8qIDkgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdFwidXNlIHN0cmljdFwiO1xuXHQvLyBTZWUgYWxzbyB0b29scy9nZW5lcmF0ZS11bmljb2RlLXJlZ2V4LmpzLlxuXHR2YXIgUmVnZXggPSB7XG5cdCAgICAvLyBVbmljb2RlIHY4LjAuMCBOb25Bc2NpaUlkZW50aWZpZXJTdGFydDpcblx0ICAgIE5vbkFzY2lpSWRlbnRpZmllclN0YXJ0OiAvW1xceEFBXFx4QjVcXHhCQVxceEMwLVxceEQ2XFx4RDgtXFx4RjZcXHhGOC1cXHUwMkMxXFx1MDJDNi1cXHUwMkQxXFx1MDJFMC1cXHUwMkU0XFx1MDJFQ1xcdTAyRUVcXHUwMzcwLVxcdTAzNzRcXHUwMzc2XFx1MDM3N1xcdTAzN0EtXFx1MDM3RFxcdTAzN0ZcXHUwMzg2XFx1MDM4OC1cXHUwMzhBXFx1MDM4Q1xcdTAzOEUtXFx1MDNBMVxcdTAzQTMtXFx1MDNGNVxcdTAzRjctXFx1MDQ4MVxcdTA0OEEtXFx1MDUyRlxcdTA1MzEtXFx1MDU1NlxcdTA1NTlcXHUwNTYxLVxcdTA1ODdcXHUwNUQwLVxcdTA1RUFcXHUwNUYwLVxcdTA1RjJcXHUwNjIwLVxcdTA2NEFcXHUwNjZFXFx1MDY2RlxcdTA2NzEtXFx1MDZEM1xcdTA2RDVcXHUwNkU1XFx1MDZFNlxcdTA2RUVcXHUwNkVGXFx1MDZGQS1cXHUwNkZDXFx1MDZGRlxcdTA3MTBcXHUwNzEyLVxcdTA3MkZcXHUwNzRELVxcdTA3QTVcXHUwN0IxXFx1MDdDQS1cXHUwN0VBXFx1MDdGNFxcdTA3RjVcXHUwN0ZBXFx1MDgwMC1cXHUwODE1XFx1MDgxQVxcdTA4MjRcXHUwODI4XFx1MDg0MC1cXHUwODU4XFx1MDhBMC1cXHUwOEI0XFx1MDkwNC1cXHUwOTM5XFx1MDkzRFxcdTA5NTBcXHUwOTU4LVxcdTA5NjFcXHUwOTcxLVxcdTA5ODBcXHUwOTg1LVxcdTA5OENcXHUwOThGXFx1MDk5MFxcdTA5OTMtXFx1MDlBOFxcdTA5QUEtXFx1MDlCMFxcdTA5QjJcXHUwOUI2LVxcdTA5QjlcXHUwOUJEXFx1MDlDRVxcdTA5RENcXHUwOUREXFx1MDlERi1cXHUwOUUxXFx1MDlGMFxcdTA5RjFcXHUwQTA1LVxcdTBBMEFcXHUwQTBGXFx1MEExMFxcdTBBMTMtXFx1MEEyOFxcdTBBMkEtXFx1MEEzMFxcdTBBMzJcXHUwQTMzXFx1MEEzNVxcdTBBMzZcXHUwQTM4XFx1MEEzOVxcdTBBNTktXFx1MEE1Q1xcdTBBNUVcXHUwQTcyLVxcdTBBNzRcXHUwQTg1LVxcdTBBOERcXHUwQThGLVxcdTBBOTFcXHUwQTkzLVxcdTBBQThcXHUwQUFBLVxcdTBBQjBcXHUwQUIyXFx1MEFCM1xcdTBBQjUtXFx1MEFCOVxcdTBBQkRcXHUwQUQwXFx1MEFFMFxcdTBBRTFcXHUwQUY5XFx1MEIwNS1cXHUwQjBDXFx1MEIwRlxcdTBCMTBcXHUwQjEzLVxcdTBCMjhcXHUwQjJBLVxcdTBCMzBcXHUwQjMyXFx1MEIzM1xcdTBCMzUtXFx1MEIzOVxcdTBCM0RcXHUwQjVDXFx1MEI1RFxcdTBCNUYtXFx1MEI2MVxcdTBCNzFcXHUwQjgzXFx1MEI4NS1cXHUwQjhBXFx1MEI4RS1cXHUwQjkwXFx1MEI5Mi1cXHUwQjk1XFx1MEI5OVxcdTBCOUFcXHUwQjlDXFx1MEI5RVxcdTBCOUZcXHUwQkEzXFx1MEJBNFxcdTBCQTgtXFx1MEJBQVxcdTBCQUUtXFx1MEJCOVxcdTBCRDBcXHUwQzA1LVxcdTBDMENcXHUwQzBFLVxcdTBDMTBcXHUwQzEyLVxcdTBDMjhcXHUwQzJBLVxcdTBDMzlcXHUwQzNEXFx1MEM1OC1cXHUwQzVBXFx1MEM2MFxcdTBDNjFcXHUwQzg1LVxcdTBDOENcXHUwQzhFLVxcdTBDOTBcXHUwQzkyLVxcdTBDQThcXHUwQ0FBLVxcdTBDQjNcXHUwQ0I1LVxcdTBDQjlcXHUwQ0JEXFx1MENERVxcdTBDRTBcXHUwQ0UxXFx1MENGMVxcdTBDRjJcXHUwRDA1LVxcdTBEMENcXHUwRDBFLVxcdTBEMTBcXHUwRDEyLVxcdTBEM0FcXHUwRDNEXFx1MEQ0RVxcdTBENUYtXFx1MEQ2MVxcdTBEN0EtXFx1MEQ3RlxcdTBEODUtXFx1MEQ5NlxcdTBEOUEtXFx1MERCMVxcdTBEQjMtXFx1MERCQlxcdTBEQkRcXHUwREMwLVxcdTBEQzZcXHUwRTAxLVxcdTBFMzBcXHUwRTMyXFx1MEUzM1xcdTBFNDAtXFx1MEU0NlxcdTBFODFcXHUwRTgyXFx1MEU4NFxcdTBFODdcXHUwRTg4XFx1MEU4QVxcdTBFOERcXHUwRTk0LVxcdTBFOTdcXHUwRTk5LVxcdTBFOUZcXHUwRUExLVxcdTBFQTNcXHUwRUE1XFx1MEVBN1xcdTBFQUFcXHUwRUFCXFx1MEVBRC1cXHUwRUIwXFx1MEVCMlxcdTBFQjNcXHUwRUJEXFx1MEVDMC1cXHUwRUM0XFx1MEVDNlxcdTBFREMtXFx1MEVERlxcdTBGMDBcXHUwRjQwLVxcdTBGNDdcXHUwRjQ5LVxcdTBGNkNcXHUwRjg4LVxcdTBGOENcXHUxMDAwLVxcdTEwMkFcXHUxMDNGXFx1MTA1MC1cXHUxMDU1XFx1MTA1QS1cXHUxMDVEXFx1MTA2MVxcdTEwNjVcXHUxMDY2XFx1MTA2RS1cXHUxMDcwXFx1MTA3NS1cXHUxMDgxXFx1MTA4RVxcdTEwQTAtXFx1MTBDNVxcdTEwQzdcXHUxMENEXFx1MTBEMC1cXHUxMEZBXFx1MTBGQy1cXHUxMjQ4XFx1MTI0QS1cXHUxMjREXFx1MTI1MC1cXHUxMjU2XFx1MTI1OFxcdTEyNUEtXFx1MTI1RFxcdTEyNjAtXFx1MTI4OFxcdTEyOEEtXFx1MTI4RFxcdTEyOTAtXFx1MTJCMFxcdTEyQjItXFx1MTJCNVxcdTEyQjgtXFx1MTJCRVxcdTEyQzBcXHUxMkMyLVxcdTEyQzVcXHUxMkM4LVxcdTEyRDZcXHUxMkQ4LVxcdTEzMTBcXHUxMzEyLVxcdTEzMTVcXHUxMzE4LVxcdTEzNUFcXHUxMzgwLVxcdTEzOEZcXHUxM0EwLVxcdTEzRjVcXHUxM0Y4LVxcdTEzRkRcXHUxNDAxLVxcdTE2NkNcXHUxNjZGLVxcdTE2N0ZcXHUxNjgxLVxcdTE2OUFcXHUxNkEwLVxcdTE2RUFcXHUxNkVFLVxcdTE2RjhcXHUxNzAwLVxcdTE3MENcXHUxNzBFLVxcdTE3MTFcXHUxNzIwLVxcdTE3MzFcXHUxNzQwLVxcdTE3NTFcXHUxNzYwLVxcdTE3NkNcXHUxNzZFLVxcdTE3NzBcXHUxNzgwLVxcdTE3QjNcXHUxN0Q3XFx1MTdEQ1xcdTE4MjAtXFx1MTg3N1xcdTE4ODAtXFx1MThBOFxcdTE4QUFcXHUxOEIwLVxcdTE4RjVcXHUxOTAwLVxcdTE5MUVcXHUxOTUwLVxcdTE5NkRcXHUxOTcwLVxcdTE5NzRcXHUxOTgwLVxcdTE5QUJcXHUxOUIwLVxcdTE5QzlcXHUxQTAwLVxcdTFBMTZcXHUxQTIwLVxcdTFBNTRcXHUxQUE3XFx1MUIwNS1cXHUxQjMzXFx1MUI0NS1cXHUxQjRCXFx1MUI4My1cXHUxQkEwXFx1MUJBRVxcdTFCQUZcXHUxQkJBLVxcdTFCRTVcXHUxQzAwLVxcdTFDMjNcXHUxQzRELVxcdTFDNEZcXHUxQzVBLVxcdTFDN0RcXHUxQ0U5LVxcdTFDRUNcXHUxQ0VFLVxcdTFDRjFcXHUxQ0Y1XFx1MUNGNlxcdTFEMDAtXFx1MURCRlxcdTFFMDAtXFx1MUYxNVxcdTFGMTgtXFx1MUYxRFxcdTFGMjAtXFx1MUY0NVxcdTFGNDgtXFx1MUY0RFxcdTFGNTAtXFx1MUY1N1xcdTFGNTlcXHUxRjVCXFx1MUY1RFxcdTFGNUYtXFx1MUY3RFxcdTFGODAtXFx1MUZCNFxcdTFGQjYtXFx1MUZCQ1xcdTFGQkVcXHUxRkMyLVxcdTFGQzRcXHUxRkM2LVxcdTFGQ0NcXHUxRkQwLVxcdTFGRDNcXHUxRkQ2LVxcdTFGREJcXHUxRkUwLVxcdTFGRUNcXHUxRkYyLVxcdTFGRjRcXHUxRkY2LVxcdTFGRkNcXHUyMDcxXFx1MjA3RlxcdTIwOTAtXFx1MjA5Q1xcdTIxMDJcXHUyMTA3XFx1MjEwQS1cXHUyMTEzXFx1MjExNVxcdTIxMTgtXFx1MjExRFxcdTIxMjRcXHUyMTI2XFx1MjEyOFxcdTIxMkEtXFx1MjEzOVxcdTIxM0MtXFx1MjEzRlxcdTIxNDUtXFx1MjE0OVxcdTIxNEVcXHUyMTYwLVxcdTIxODhcXHUyQzAwLVxcdTJDMkVcXHUyQzMwLVxcdTJDNUVcXHUyQzYwLVxcdTJDRTRcXHUyQ0VCLVxcdTJDRUVcXHUyQ0YyXFx1MkNGM1xcdTJEMDAtXFx1MkQyNVxcdTJEMjdcXHUyRDJEXFx1MkQzMC1cXHUyRDY3XFx1MkQ2RlxcdTJEODAtXFx1MkQ5NlxcdTJEQTAtXFx1MkRBNlxcdTJEQTgtXFx1MkRBRVxcdTJEQjAtXFx1MkRCNlxcdTJEQjgtXFx1MkRCRVxcdTJEQzAtXFx1MkRDNlxcdTJEQzgtXFx1MkRDRVxcdTJERDAtXFx1MkRENlxcdTJERDgtXFx1MkRERVxcdTMwMDUtXFx1MzAwN1xcdTMwMjEtXFx1MzAyOVxcdTMwMzEtXFx1MzAzNVxcdTMwMzgtXFx1MzAzQ1xcdTMwNDEtXFx1MzA5NlxcdTMwOUItXFx1MzA5RlxcdTMwQTEtXFx1MzBGQVxcdTMwRkMtXFx1MzBGRlxcdTMxMDUtXFx1MzEyRFxcdTMxMzEtXFx1MzE4RVxcdTMxQTAtXFx1MzFCQVxcdTMxRjAtXFx1MzFGRlxcdTM0MDAtXFx1NERCNVxcdTRFMDAtXFx1OUZENVxcdUEwMDAtXFx1QTQ4Q1xcdUE0RDAtXFx1QTRGRFxcdUE1MDAtXFx1QTYwQ1xcdUE2MTAtXFx1QTYxRlxcdUE2MkFcXHVBNjJCXFx1QTY0MC1cXHVBNjZFXFx1QTY3Ri1cXHVBNjlEXFx1QTZBMC1cXHVBNkVGXFx1QTcxNy1cXHVBNzFGXFx1QTcyMi1cXHVBNzg4XFx1QTc4Qi1cXHVBN0FEXFx1QTdCMC1cXHVBN0I3XFx1QTdGNy1cXHVBODAxXFx1QTgwMy1cXHVBODA1XFx1QTgwNy1cXHVBODBBXFx1QTgwQy1cXHVBODIyXFx1QTg0MC1cXHVBODczXFx1QTg4Mi1cXHVBOEIzXFx1QThGMi1cXHVBOEY3XFx1QThGQlxcdUE4RkRcXHVBOTBBLVxcdUE5MjVcXHVBOTMwLVxcdUE5NDZcXHVBOTYwLVxcdUE5N0NcXHVBOTg0LVxcdUE5QjJcXHVBOUNGXFx1QTlFMC1cXHVBOUU0XFx1QTlFNi1cXHVBOUVGXFx1QTlGQS1cXHVBOUZFXFx1QUEwMC1cXHVBQTI4XFx1QUE0MC1cXHVBQTQyXFx1QUE0NC1cXHVBQTRCXFx1QUE2MC1cXHVBQTc2XFx1QUE3QVxcdUFBN0UtXFx1QUFBRlxcdUFBQjFcXHVBQUI1XFx1QUFCNlxcdUFBQjktXFx1QUFCRFxcdUFBQzBcXHVBQUMyXFx1QUFEQi1cXHVBQUREXFx1QUFFMC1cXHVBQUVBXFx1QUFGMi1cXHVBQUY0XFx1QUIwMS1cXHVBQjA2XFx1QUIwOS1cXHVBQjBFXFx1QUIxMS1cXHVBQjE2XFx1QUIyMC1cXHVBQjI2XFx1QUIyOC1cXHVBQjJFXFx1QUIzMC1cXHVBQjVBXFx1QUI1Qy1cXHVBQjY1XFx1QUI3MC1cXHVBQkUyXFx1QUMwMC1cXHVEN0EzXFx1RDdCMC1cXHVEN0M2XFx1RDdDQi1cXHVEN0ZCXFx1RjkwMC1cXHVGQTZEXFx1RkE3MC1cXHVGQUQ5XFx1RkIwMC1cXHVGQjA2XFx1RkIxMy1cXHVGQjE3XFx1RkIxRFxcdUZCMUYtXFx1RkIyOFxcdUZCMkEtXFx1RkIzNlxcdUZCMzgtXFx1RkIzQ1xcdUZCM0VcXHVGQjQwXFx1RkI0MVxcdUZCNDNcXHVGQjQ0XFx1RkI0Ni1cXHVGQkIxXFx1RkJEMy1cXHVGRDNEXFx1RkQ1MC1cXHVGRDhGXFx1RkQ5Mi1cXHVGREM3XFx1RkRGMC1cXHVGREZCXFx1RkU3MC1cXHVGRTc0XFx1RkU3Ni1cXHVGRUZDXFx1RkYyMS1cXHVGRjNBXFx1RkY0MS1cXHVGRjVBXFx1RkY2Ni1cXHVGRkJFXFx1RkZDMi1cXHVGRkM3XFx1RkZDQS1cXHVGRkNGXFx1RkZEMi1cXHVGRkQ3XFx1RkZEQS1cXHVGRkRDXXxcXHVEODAwW1xcdURDMDAtXFx1REMwQlxcdURDMEQtXFx1REMyNlxcdURDMjgtXFx1REMzQVxcdURDM0NcXHVEQzNEXFx1REMzRi1cXHVEQzREXFx1REM1MC1cXHVEQzVEXFx1REM4MC1cXHVEQ0ZBXFx1REQ0MC1cXHVERDc0XFx1REU4MC1cXHVERTlDXFx1REVBMC1cXHVERUQwXFx1REYwMC1cXHVERjFGXFx1REYzMC1cXHVERjRBXFx1REY1MC1cXHVERjc1XFx1REY4MC1cXHVERjlEXFx1REZBMC1cXHVERkMzXFx1REZDOC1cXHVERkNGXFx1REZEMS1cXHVERkQ1XXxcXHVEODAxW1xcdURDMDAtXFx1REM5RFxcdUREMDAtXFx1REQyN1xcdUREMzAtXFx1REQ2M1xcdURFMDAtXFx1REYzNlxcdURGNDAtXFx1REY1NVxcdURGNjAtXFx1REY2N118XFx1RDgwMltcXHVEQzAwLVxcdURDMDVcXHVEQzA4XFx1REMwQS1cXHVEQzM1XFx1REMzN1xcdURDMzhcXHVEQzNDXFx1REMzRi1cXHVEQzU1XFx1REM2MC1cXHVEQzc2XFx1REM4MC1cXHVEQzlFXFx1RENFMC1cXHVEQ0YyXFx1RENGNFxcdURDRjVcXHVERDAwLVxcdUREMTVcXHVERDIwLVxcdUREMzlcXHVERDgwLVxcdUREQjdcXHVEREJFXFx1RERCRlxcdURFMDBcXHVERTEwLVxcdURFMTNcXHVERTE1LVxcdURFMTdcXHVERTE5LVxcdURFMzNcXHVERTYwLVxcdURFN0NcXHVERTgwLVxcdURFOUNcXHVERUMwLVxcdURFQzdcXHVERUM5LVxcdURFRTRcXHVERjAwLVxcdURGMzVcXHVERjQwLVxcdURGNTVcXHVERjYwLVxcdURGNzJcXHVERjgwLVxcdURGOTFdfFxcdUQ4MDNbXFx1REMwMC1cXHVEQzQ4XFx1REM4MC1cXHVEQ0IyXFx1RENDMC1cXHVEQ0YyXXxcXHVEODA0W1xcdURDMDMtXFx1REMzN1xcdURDODMtXFx1RENBRlxcdURDRDAtXFx1RENFOFxcdUREMDMtXFx1REQyNlxcdURENTAtXFx1REQ3MlxcdURENzZcXHVERDgzLVxcdUREQjJcXHVEREMxLVxcdUREQzRcXHVERERBXFx1REREQ1xcdURFMDAtXFx1REUxMVxcdURFMTMtXFx1REUyQlxcdURFODAtXFx1REU4NlxcdURFODhcXHVERThBLVxcdURFOERcXHVERThGLVxcdURFOURcXHVERTlGLVxcdURFQThcXHVERUIwLVxcdURFREVcXHVERjA1LVxcdURGMENcXHVERjBGXFx1REYxMFxcdURGMTMtXFx1REYyOFxcdURGMkEtXFx1REYzMFxcdURGMzJcXHVERjMzXFx1REYzNS1cXHVERjM5XFx1REYzRFxcdURGNTBcXHVERjVELVxcdURGNjFdfFxcdUQ4MDVbXFx1REM4MC1cXHVEQ0FGXFx1RENDNFxcdURDQzVcXHVEQ0M3XFx1REQ4MC1cXHVEREFFXFx1REREOC1cXHVERERCXFx1REUwMC1cXHVERTJGXFx1REU0NFxcdURFODAtXFx1REVBQVxcdURGMDAtXFx1REYxOV18XFx1RDgwNltcXHVEQ0EwLVxcdURDREZcXHVEQ0ZGXFx1REVDMC1cXHVERUY4XXxcXHVEODA4W1xcdURDMDAtXFx1REY5OV18XFx1RDgwOVtcXHVEQzAwLVxcdURDNkVcXHVEQzgwLVxcdURENDNdfFtcXHVEODBDXFx1RDg0MC1cXHVEODY4XFx1RDg2QS1cXHVEODZDXFx1RDg2Ri1cXHVEODcyXVtcXHVEQzAwLVxcdURGRkZdfFxcdUQ4MERbXFx1REMwMC1cXHVEQzJFXXxcXHVEODExW1xcdURDMDAtXFx1REU0Nl18XFx1RDgxQVtcXHVEQzAwLVxcdURFMzhcXHVERTQwLVxcdURFNUVcXHVERUQwLVxcdURFRURcXHVERjAwLVxcdURGMkZcXHVERjQwLVxcdURGNDNcXHVERjYzLVxcdURGNzdcXHVERjdELVxcdURGOEZdfFxcdUQ4MUJbXFx1REYwMC1cXHVERjQ0XFx1REY1MFxcdURGOTMtXFx1REY5Rl18XFx1RDgyQ1tcXHVEQzAwXFx1REMwMV18XFx1RDgyRltcXHVEQzAwLVxcdURDNkFcXHVEQzcwLVxcdURDN0NcXHVEQzgwLVxcdURDODhcXHVEQzkwLVxcdURDOTldfFxcdUQ4MzVbXFx1REMwMC1cXHVEQzU0XFx1REM1Ni1cXHVEQzlDXFx1REM5RVxcdURDOUZcXHVEQ0EyXFx1RENBNVxcdURDQTZcXHVEQ0E5LVxcdURDQUNcXHVEQ0FFLVxcdURDQjlcXHVEQ0JCXFx1RENCRC1cXHVEQ0MzXFx1RENDNS1cXHVERDA1XFx1REQwNy1cXHVERDBBXFx1REQwRC1cXHVERDE0XFx1REQxNi1cXHVERDFDXFx1REQxRS1cXHVERDM5XFx1REQzQi1cXHVERDNFXFx1REQ0MC1cXHVERDQ0XFx1REQ0NlxcdURENEEtXFx1REQ1MFxcdURENTItXFx1REVBNVxcdURFQTgtXFx1REVDMFxcdURFQzItXFx1REVEQVxcdURFREMtXFx1REVGQVxcdURFRkMtXFx1REYxNFxcdURGMTYtXFx1REYzNFxcdURGMzYtXFx1REY0RVxcdURGNTAtXFx1REY2RVxcdURGNzAtXFx1REY4OFxcdURGOEEtXFx1REZBOFxcdURGQUEtXFx1REZDMlxcdURGQzQtXFx1REZDQl18XFx1RDgzQVtcXHVEQzAwLVxcdURDQzRdfFxcdUQ4M0JbXFx1REUwMC1cXHVERTAzXFx1REUwNS1cXHVERTFGXFx1REUyMVxcdURFMjJcXHVERTI0XFx1REUyN1xcdURFMjktXFx1REUzMlxcdURFMzQtXFx1REUzN1xcdURFMzlcXHVERTNCXFx1REU0MlxcdURFNDdcXHVERTQ5XFx1REU0QlxcdURFNEQtXFx1REU0RlxcdURFNTFcXHVERTUyXFx1REU1NFxcdURFNTdcXHVERTU5XFx1REU1QlxcdURFNURcXHVERTVGXFx1REU2MVxcdURFNjJcXHVERTY0XFx1REU2Ny1cXHVERTZBXFx1REU2Qy1cXHVERTcyXFx1REU3NC1cXHVERTc3XFx1REU3OS1cXHVERTdDXFx1REU3RVxcdURFODAtXFx1REU4OVxcdURFOEItXFx1REU5QlxcdURFQTEtXFx1REVBM1xcdURFQTUtXFx1REVBOVxcdURFQUItXFx1REVCQl18XFx1RDg2OVtcXHVEQzAwLVxcdURFRDZcXHVERjAwLVxcdURGRkZdfFxcdUQ4NkRbXFx1REMwMC1cXHVERjM0XFx1REY0MC1cXHVERkZGXXxcXHVEODZFW1xcdURDMDAtXFx1REMxRFxcdURDMjAtXFx1REZGRl18XFx1RDg3M1tcXHVEQzAwLVxcdURFQTFdfFxcdUQ4N0VbXFx1REMwMC1cXHVERTFEXS8sXG5cdCAgICAvLyBVbmljb2RlIHY4LjAuMCBOb25Bc2NpaUlkZW50aWZpZXJQYXJ0OlxuXHQgICAgTm9uQXNjaWlJZGVudGlmaWVyUGFydDogL1tcXHhBQVxceEI1XFx4QjdcXHhCQVxceEMwLVxceEQ2XFx4RDgtXFx4RjZcXHhGOC1cXHUwMkMxXFx1MDJDNi1cXHUwMkQxXFx1MDJFMC1cXHUwMkU0XFx1MDJFQ1xcdTAyRUVcXHUwMzAwLVxcdTAzNzRcXHUwMzc2XFx1MDM3N1xcdTAzN0EtXFx1MDM3RFxcdTAzN0ZcXHUwMzg2LVxcdTAzOEFcXHUwMzhDXFx1MDM4RS1cXHUwM0ExXFx1MDNBMy1cXHUwM0Y1XFx1MDNGNy1cXHUwNDgxXFx1MDQ4My1cXHUwNDg3XFx1MDQ4QS1cXHUwNTJGXFx1MDUzMS1cXHUwNTU2XFx1MDU1OVxcdTA1NjEtXFx1MDU4N1xcdTA1OTEtXFx1MDVCRFxcdTA1QkZcXHUwNUMxXFx1MDVDMlxcdTA1QzRcXHUwNUM1XFx1MDVDN1xcdTA1RDAtXFx1MDVFQVxcdTA1RjAtXFx1MDVGMlxcdTA2MTAtXFx1MDYxQVxcdTA2MjAtXFx1MDY2OVxcdTA2NkUtXFx1MDZEM1xcdTA2RDUtXFx1MDZEQ1xcdTA2REYtXFx1MDZFOFxcdTA2RUEtXFx1MDZGQ1xcdTA2RkZcXHUwNzEwLVxcdTA3NEFcXHUwNzRELVxcdTA3QjFcXHUwN0MwLVxcdTA3RjVcXHUwN0ZBXFx1MDgwMC1cXHUwODJEXFx1MDg0MC1cXHUwODVCXFx1MDhBMC1cXHUwOEI0XFx1MDhFMy1cXHUwOTYzXFx1MDk2Ni1cXHUwOTZGXFx1MDk3MS1cXHUwOTgzXFx1MDk4NS1cXHUwOThDXFx1MDk4RlxcdTA5OTBcXHUwOTkzLVxcdTA5QThcXHUwOUFBLVxcdTA5QjBcXHUwOUIyXFx1MDlCNi1cXHUwOUI5XFx1MDlCQy1cXHUwOUM0XFx1MDlDN1xcdTA5QzhcXHUwOUNCLVxcdTA5Q0VcXHUwOUQ3XFx1MDlEQ1xcdTA5RERcXHUwOURGLVxcdTA5RTNcXHUwOUU2LVxcdTA5RjFcXHUwQTAxLVxcdTBBMDNcXHUwQTA1LVxcdTBBMEFcXHUwQTBGXFx1MEExMFxcdTBBMTMtXFx1MEEyOFxcdTBBMkEtXFx1MEEzMFxcdTBBMzJcXHUwQTMzXFx1MEEzNVxcdTBBMzZcXHUwQTM4XFx1MEEzOVxcdTBBM0NcXHUwQTNFLVxcdTBBNDJcXHUwQTQ3XFx1MEE0OFxcdTBBNEItXFx1MEE0RFxcdTBBNTFcXHUwQTU5LVxcdTBBNUNcXHUwQTVFXFx1MEE2Ni1cXHUwQTc1XFx1MEE4MS1cXHUwQTgzXFx1MEE4NS1cXHUwQThEXFx1MEE4Ri1cXHUwQTkxXFx1MEE5My1cXHUwQUE4XFx1MEFBQS1cXHUwQUIwXFx1MEFCMlxcdTBBQjNcXHUwQUI1LVxcdTBBQjlcXHUwQUJDLVxcdTBBQzVcXHUwQUM3LVxcdTBBQzlcXHUwQUNCLVxcdTBBQ0RcXHUwQUQwXFx1MEFFMC1cXHUwQUUzXFx1MEFFNi1cXHUwQUVGXFx1MEFGOVxcdTBCMDEtXFx1MEIwM1xcdTBCMDUtXFx1MEIwQ1xcdTBCMEZcXHUwQjEwXFx1MEIxMy1cXHUwQjI4XFx1MEIyQS1cXHUwQjMwXFx1MEIzMlxcdTBCMzNcXHUwQjM1LVxcdTBCMzlcXHUwQjNDLVxcdTBCNDRcXHUwQjQ3XFx1MEI0OFxcdTBCNEItXFx1MEI0RFxcdTBCNTZcXHUwQjU3XFx1MEI1Q1xcdTBCNURcXHUwQjVGLVxcdTBCNjNcXHUwQjY2LVxcdTBCNkZcXHUwQjcxXFx1MEI4MlxcdTBCODNcXHUwQjg1LVxcdTBCOEFcXHUwQjhFLVxcdTBCOTBcXHUwQjkyLVxcdTBCOTVcXHUwQjk5XFx1MEI5QVxcdTBCOUNcXHUwQjlFXFx1MEI5RlxcdTBCQTNcXHUwQkE0XFx1MEJBOC1cXHUwQkFBXFx1MEJBRS1cXHUwQkI5XFx1MEJCRS1cXHUwQkMyXFx1MEJDNi1cXHUwQkM4XFx1MEJDQS1cXHUwQkNEXFx1MEJEMFxcdTBCRDdcXHUwQkU2LVxcdTBCRUZcXHUwQzAwLVxcdTBDMDNcXHUwQzA1LVxcdTBDMENcXHUwQzBFLVxcdTBDMTBcXHUwQzEyLVxcdTBDMjhcXHUwQzJBLVxcdTBDMzlcXHUwQzNELVxcdTBDNDRcXHUwQzQ2LVxcdTBDNDhcXHUwQzRBLVxcdTBDNERcXHUwQzU1XFx1MEM1NlxcdTBDNTgtXFx1MEM1QVxcdTBDNjAtXFx1MEM2M1xcdTBDNjYtXFx1MEM2RlxcdTBDODEtXFx1MEM4M1xcdTBDODUtXFx1MEM4Q1xcdTBDOEUtXFx1MEM5MFxcdTBDOTItXFx1MENBOFxcdTBDQUEtXFx1MENCM1xcdTBDQjUtXFx1MENCOVxcdTBDQkMtXFx1MENDNFxcdTBDQzYtXFx1MENDOFxcdTBDQ0EtXFx1MENDRFxcdTBDRDVcXHUwQ0Q2XFx1MENERVxcdTBDRTAtXFx1MENFM1xcdTBDRTYtXFx1MENFRlxcdTBDRjFcXHUwQ0YyXFx1MEQwMS1cXHUwRDAzXFx1MEQwNS1cXHUwRDBDXFx1MEQwRS1cXHUwRDEwXFx1MEQxMi1cXHUwRDNBXFx1MEQzRC1cXHUwRDQ0XFx1MEQ0Ni1cXHUwRDQ4XFx1MEQ0QS1cXHUwRDRFXFx1MEQ1N1xcdTBENUYtXFx1MEQ2M1xcdTBENjYtXFx1MEQ2RlxcdTBEN0EtXFx1MEQ3RlxcdTBEODJcXHUwRDgzXFx1MEQ4NS1cXHUwRDk2XFx1MEQ5QS1cXHUwREIxXFx1MERCMy1cXHUwREJCXFx1MERCRFxcdTBEQzAtXFx1MERDNlxcdTBEQ0FcXHUwRENGLVxcdTBERDRcXHUwREQ2XFx1MEREOC1cXHUwRERGXFx1MERFNi1cXHUwREVGXFx1MERGMlxcdTBERjNcXHUwRTAxLVxcdTBFM0FcXHUwRTQwLVxcdTBFNEVcXHUwRTUwLVxcdTBFNTlcXHUwRTgxXFx1MEU4MlxcdTBFODRcXHUwRTg3XFx1MEU4OFxcdTBFOEFcXHUwRThEXFx1MEU5NC1cXHUwRTk3XFx1MEU5OS1cXHUwRTlGXFx1MEVBMS1cXHUwRUEzXFx1MEVBNVxcdTBFQTdcXHUwRUFBXFx1MEVBQlxcdTBFQUQtXFx1MEVCOVxcdTBFQkItXFx1MEVCRFxcdTBFQzAtXFx1MEVDNFxcdTBFQzZcXHUwRUM4LVxcdTBFQ0RcXHUwRUQwLVxcdTBFRDlcXHUwRURDLVxcdTBFREZcXHUwRjAwXFx1MEYxOFxcdTBGMTlcXHUwRjIwLVxcdTBGMjlcXHUwRjM1XFx1MEYzN1xcdTBGMzlcXHUwRjNFLVxcdTBGNDdcXHUwRjQ5LVxcdTBGNkNcXHUwRjcxLVxcdTBGODRcXHUwRjg2LVxcdTBGOTdcXHUwRjk5LVxcdTBGQkNcXHUwRkM2XFx1MTAwMC1cXHUxMDQ5XFx1MTA1MC1cXHUxMDlEXFx1MTBBMC1cXHUxMEM1XFx1MTBDN1xcdTEwQ0RcXHUxMEQwLVxcdTEwRkFcXHUxMEZDLVxcdTEyNDhcXHUxMjRBLVxcdTEyNERcXHUxMjUwLVxcdTEyNTZcXHUxMjU4XFx1MTI1QS1cXHUxMjVEXFx1MTI2MC1cXHUxMjg4XFx1MTI4QS1cXHUxMjhEXFx1MTI5MC1cXHUxMkIwXFx1MTJCMi1cXHUxMkI1XFx1MTJCOC1cXHUxMkJFXFx1MTJDMFxcdTEyQzItXFx1MTJDNVxcdTEyQzgtXFx1MTJENlxcdTEyRDgtXFx1MTMxMFxcdTEzMTItXFx1MTMxNVxcdTEzMTgtXFx1MTM1QVxcdTEzNUQtXFx1MTM1RlxcdTEzNjktXFx1MTM3MVxcdTEzODAtXFx1MTM4RlxcdTEzQTAtXFx1MTNGNVxcdTEzRjgtXFx1MTNGRFxcdTE0MDEtXFx1MTY2Q1xcdTE2NkYtXFx1MTY3RlxcdTE2ODEtXFx1MTY5QVxcdTE2QTAtXFx1MTZFQVxcdTE2RUUtXFx1MTZGOFxcdTE3MDAtXFx1MTcwQ1xcdTE3MEUtXFx1MTcxNFxcdTE3MjAtXFx1MTczNFxcdTE3NDAtXFx1MTc1M1xcdTE3NjAtXFx1MTc2Q1xcdTE3NkUtXFx1MTc3MFxcdTE3NzJcXHUxNzczXFx1MTc4MC1cXHUxN0QzXFx1MTdEN1xcdTE3RENcXHUxN0REXFx1MTdFMC1cXHUxN0U5XFx1MTgwQi1cXHUxODBEXFx1MTgxMC1cXHUxODE5XFx1MTgyMC1cXHUxODc3XFx1MTg4MC1cXHUxOEFBXFx1MThCMC1cXHUxOEY1XFx1MTkwMC1cXHUxOTFFXFx1MTkyMC1cXHUxOTJCXFx1MTkzMC1cXHUxOTNCXFx1MTk0Ni1cXHUxOTZEXFx1MTk3MC1cXHUxOTc0XFx1MTk4MC1cXHUxOUFCXFx1MTlCMC1cXHUxOUM5XFx1MTlEMC1cXHUxOURBXFx1MUEwMC1cXHUxQTFCXFx1MUEyMC1cXHUxQTVFXFx1MUE2MC1cXHUxQTdDXFx1MUE3Ri1cXHUxQTg5XFx1MUE5MC1cXHUxQTk5XFx1MUFBN1xcdTFBQjAtXFx1MUFCRFxcdTFCMDAtXFx1MUI0QlxcdTFCNTAtXFx1MUI1OVxcdTFCNkItXFx1MUI3M1xcdTFCODAtXFx1MUJGM1xcdTFDMDAtXFx1MUMzN1xcdTFDNDAtXFx1MUM0OVxcdTFDNEQtXFx1MUM3RFxcdTFDRDAtXFx1MUNEMlxcdTFDRDQtXFx1MUNGNlxcdTFDRjhcXHUxQ0Y5XFx1MUQwMC1cXHUxREY1XFx1MURGQy1cXHUxRjE1XFx1MUYxOC1cXHUxRjFEXFx1MUYyMC1cXHUxRjQ1XFx1MUY0OC1cXHUxRjREXFx1MUY1MC1cXHUxRjU3XFx1MUY1OVxcdTFGNUJcXHUxRjVEXFx1MUY1Ri1cXHUxRjdEXFx1MUY4MC1cXHUxRkI0XFx1MUZCNi1cXHUxRkJDXFx1MUZCRVxcdTFGQzItXFx1MUZDNFxcdTFGQzYtXFx1MUZDQ1xcdTFGRDAtXFx1MUZEM1xcdTFGRDYtXFx1MUZEQlxcdTFGRTAtXFx1MUZFQ1xcdTFGRjItXFx1MUZGNFxcdTFGRjYtXFx1MUZGQ1xcdTIwMENcXHUyMDBEXFx1MjAzRlxcdTIwNDBcXHUyMDU0XFx1MjA3MVxcdTIwN0ZcXHUyMDkwLVxcdTIwOUNcXHUyMEQwLVxcdTIwRENcXHUyMEUxXFx1MjBFNS1cXHUyMEYwXFx1MjEwMlxcdTIxMDdcXHUyMTBBLVxcdTIxMTNcXHUyMTE1XFx1MjExOC1cXHUyMTFEXFx1MjEyNFxcdTIxMjZcXHUyMTI4XFx1MjEyQS1cXHUyMTM5XFx1MjEzQy1cXHUyMTNGXFx1MjE0NS1cXHUyMTQ5XFx1MjE0RVxcdTIxNjAtXFx1MjE4OFxcdTJDMDAtXFx1MkMyRVxcdTJDMzAtXFx1MkM1RVxcdTJDNjAtXFx1MkNFNFxcdTJDRUItXFx1MkNGM1xcdTJEMDAtXFx1MkQyNVxcdTJEMjdcXHUyRDJEXFx1MkQzMC1cXHUyRDY3XFx1MkQ2RlxcdTJEN0YtXFx1MkQ5NlxcdTJEQTAtXFx1MkRBNlxcdTJEQTgtXFx1MkRBRVxcdTJEQjAtXFx1MkRCNlxcdTJEQjgtXFx1MkRCRVxcdTJEQzAtXFx1MkRDNlxcdTJEQzgtXFx1MkRDRVxcdTJERDAtXFx1MkRENlxcdTJERDgtXFx1MkRERVxcdTJERTAtXFx1MkRGRlxcdTMwMDUtXFx1MzAwN1xcdTMwMjEtXFx1MzAyRlxcdTMwMzEtXFx1MzAzNVxcdTMwMzgtXFx1MzAzQ1xcdTMwNDEtXFx1MzA5NlxcdTMwOTktXFx1MzA5RlxcdTMwQTEtXFx1MzBGQVxcdTMwRkMtXFx1MzBGRlxcdTMxMDUtXFx1MzEyRFxcdTMxMzEtXFx1MzE4RVxcdTMxQTAtXFx1MzFCQVxcdTMxRjAtXFx1MzFGRlxcdTM0MDAtXFx1NERCNVxcdTRFMDAtXFx1OUZENVxcdUEwMDAtXFx1QTQ4Q1xcdUE0RDAtXFx1QTRGRFxcdUE1MDAtXFx1QTYwQ1xcdUE2MTAtXFx1QTYyQlxcdUE2NDAtXFx1QTY2RlxcdUE2NzQtXFx1QTY3RFxcdUE2N0YtXFx1QTZGMVxcdUE3MTctXFx1QTcxRlxcdUE3MjItXFx1QTc4OFxcdUE3OEItXFx1QTdBRFxcdUE3QjAtXFx1QTdCN1xcdUE3RjctXFx1QTgyN1xcdUE4NDAtXFx1QTg3M1xcdUE4ODAtXFx1QThDNFxcdUE4RDAtXFx1QThEOVxcdUE4RTAtXFx1QThGN1xcdUE4RkJcXHVBOEZEXFx1QTkwMC1cXHVBOTJEXFx1QTkzMC1cXHVBOTUzXFx1QTk2MC1cXHVBOTdDXFx1QTk4MC1cXHVBOUMwXFx1QTlDRi1cXHVBOUQ5XFx1QTlFMC1cXHVBOUZFXFx1QUEwMC1cXHVBQTM2XFx1QUE0MC1cXHVBQTREXFx1QUE1MC1cXHVBQTU5XFx1QUE2MC1cXHVBQTc2XFx1QUE3QS1cXHVBQUMyXFx1QUFEQi1cXHVBQUREXFx1QUFFMC1cXHVBQUVGXFx1QUFGMi1cXHVBQUY2XFx1QUIwMS1cXHVBQjA2XFx1QUIwOS1cXHVBQjBFXFx1QUIxMS1cXHVBQjE2XFx1QUIyMC1cXHVBQjI2XFx1QUIyOC1cXHVBQjJFXFx1QUIzMC1cXHVBQjVBXFx1QUI1Qy1cXHVBQjY1XFx1QUI3MC1cXHVBQkVBXFx1QUJFQ1xcdUFCRURcXHVBQkYwLVxcdUFCRjlcXHVBQzAwLVxcdUQ3QTNcXHVEN0IwLVxcdUQ3QzZcXHVEN0NCLVxcdUQ3RkJcXHVGOTAwLVxcdUZBNkRcXHVGQTcwLVxcdUZBRDlcXHVGQjAwLVxcdUZCMDZcXHVGQjEzLVxcdUZCMTdcXHVGQjFELVxcdUZCMjhcXHVGQjJBLVxcdUZCMzZcXHVGQjM4LVxcdUZCM0NcXHVGQjNFXFx1RkI0MFxcdUZCNDFcXHVGQjQzXFx1RkI0NFxcdUZCNDYtXFx1RkJCMVxcdUZCRDMtXFx1RkQzRFxcdUZENTAtXFx1RkQ4RlxcdUZEOTItXFx1RkRDN1xcdUZERjAtXFx1RkRGQlxcdUZFMDAtXFx1RkUwRlxcdUZFMjAtXFx1RkUyRlxcdUZFMzNcXHVGRTM0XFx1RkU0RC1cXHVGRTRGXFx1RkU3MC1cXHVGRTc0XFx1RkU3Ni1cXHVGRUZDXFx1RkYxMC1cXHVGRjE5XFx1RkYyMS1cXHVGRjNBXFx1RkYzRlxcdUZGNDEtXFx1RkY1QVxcdUZGNjYtXFx1RkZCRVxcdUZGQzItXFx1RkZDN1xcdUZGQ0EtXFx1RkZDRlxcdUZGRDItXFx1RkZEN1xcdUZGREEtXFx1RkZEQ118XFx1RDgwMFtcXHVEQzAwLVxcdURDMEJcXHVEQzBELVxcdURDMjZcXHVEQzI4LVxcdURDM0FcXHVEQzNDXFx1REMzRFxcdURDM0YtXFx1REM0RFxcdURDNTAtXFx1REM1RFxcdURDODAtXFx1RENGQVxcdURENDAtXFx1REQ3NFxcdURERkRcXHVERTgwLVxcdURFOUNcXHVERUEwLVxcdURFRDBcXHVERUUwXFx1REYwMC1cXHVERjFGXFx1REYzMC1cXHVERjRBXFx1REY1MC1cXHVERjdBXFx1REY4MC1cXHVERjlEXFx1REZBMC1cXHVERkMzXFx1REZDOC1cXHVERkNGXFx1REZEMS1cXHVERkQ1XXxcXHVEODAxW1xcdURDMDAtXFx1REM5RFxcdURDQTAtXFx1RENBOVxcdUREMDAtXFx1REQyN1xcdUREMzAtXFx1REQ2M1xcdURFMDAtXFx1REYzNlxcdURGNDAtXFx1REY1NVxcdURGNjAtXFx1REY2N118XFx1RDgwMltcXHVEQzAwLVxcdURDMDVcXHVEQzA4XFx1REMwQS1cXHVEQzM1XFx1REMzN1xcdURDMzhcXHVEQzNDXFx1REMzRi1cXHVEQzU1XFx1REM2MC1cXHVEQzc2XFx1REM4MC1cXHVEQzlFXFx1RENFMC1cXHVEQ0YyXFx1RENGNFxcdURDRjVcXHVERDAwLVxcdUREMTVcXHVERDIwLVxcdUREMzlcXHVERDgwLVxcdUREQjdcXHVEREJFXFx1RERCRlxcdURFMDAtXFx1REUwM1xcdURFMDVcXHVERTA2XFx1REUwQy1cXHVERTEzXFx1REUxNS1cXHVERTE3XFx1REUxOS1cXHVERTMzXFx1REUzOC1cXHVERTNBXFx1REUzRlxcdURFNjAtXFx1REU3Q1xcdURFODAtXFx1REU5Q1xcdURFQzAtXFx1REVDN1xcdURFQzktXFx1REVFNlxcdURGMDAtXFx1REYzNVxcdURGNDAtXFx1REY1NVxcdURGNjAtXFx1REY3MlxcdURGODAtXFx1REY5MV18XFx1RDgwM1tcXHVEQzAwLVxcdURDNDhcXHVEQzgwLVxcdURDQjJcXHVEQ0MwLVxcdURDRjJdfFxcdUQ4MDRbXFx1REMwMC1cXHVEQzQ2XFx1REM2Ni1cXHVEQzZGXFx1REM3Ri1cXHVEQ0JBXFx1RENEMC1cXHVEQ0U4XFx1RENGMC1cXHVEQ0Y5XFx1REQwMC1cXHVERDM0XFx1REQzNi1cXHVERDNGXFx1REQ1MC1cXHVERDczXFx1REQ3NlxcdUREODAtXFx1RERDNFxcdUREQ0EtXFx1RERDQ1xcdURERDAtXFx1REREQVxcdURERENcXHVERTAwLVxcdURFMTFcXHVERTEzLVxcdURFMzdcXHVERTgwLVxcdURFODZcXHVERTg4XFx1REU4QS1cXHVERThEXFx1REU4Ri1cXHVERTlEXFx1REU5Ri1cXHVERUE4XFx1REVCMC1cXHVERUVBXFx1REVGMC1cXHVERUY5XFx1REYwMC1cXHVERjAzXFx1REYwNS1cXHVERjBDXFx1REYwRlxcdURGMTBcXHVERjEzLVxcdURGMjhcXHVERjJBLVxcdURGMzBcXHVERjMyXFx1REYzM1xcdURGMzUtXFx1REYzOVxcdURGM0MtXFx1REY0NFxcdURGNDdcXHVERjQ4XFx1REY0Qi1cXHVERjREXFx1REY1MFxcdURGNTdcXHVERjVELVxcdURGNjNcXHVERjY2LVxcdURGNkNcXHVERjcwLVxcdURGNzRdfFxcdUQ4MDVbXFx1REM4MC1cXHVEQ0M1XFx1RENDN1xcdURDRDAtXFx1RENEOVxcdUREODAtXFx1RERCNVxcdUREQjgtXFx1RERDMFxcdURERDgtXFx1RERERFxcdURFMDAtXFx1REU0MFxcdURFNDRcXHVERTUwLVxcdURFNTlcXHVERTgwLVxcdURFQjdcXHVERUMwLVxcdURFQzlcXHVERjAwLVxcdURGMTlcXHVERjFELVxcdURGMkJcXHVERjMwLVxcdURGMzldfFxcdUQ4MDZbXFx1RENBMC1cXHVEQ0U5XFx1RENGRlxcdURFQzAtXFx1REVGOF18XFx1RDgwOFtcXHVEQzAwLVxcdURGOTldfFxcdUQ4MDlbXFx1REMwMC1cXHVEQzZFXFx1REM4MC1cXHVERDQzXXxbXFx1RDgwQ1xcdUQ4NDAtXFx1RDg2OFxcdUQ4NkEtXFx1RDg2Q1xcdUQ4NkYtXFx1RDg3Ml1bXFx1REMwMC1cXHVERkZGXXxcXHVEODBEW1xcdURDMDAtXFx1REMyRV18XFx1RDgxMVtcXHVEQzAwLVxcdURFNDZdfFxcdUQ4MUFbXFx1REMwMC1cXHVERTM4XFx1REU0MC1cXHVERTVFXFx1REU2MC1cXHVERTY5XFx1REVEMC1cXHVERUVEXFx1REVGMC1cXHVERUY0XFx1REYwMC1cXHVERjM2XFx1REY0MC1cXHVERjQzXFx1REY1MC1cXHVERjU5XFx1REY2My1cXHVERjc3XFx1REY3RC1cXHVERjhGXXxcXHVEODFCW1xcdURGMDAtXFx1REY0NFxcdURGNTAtXFx1REY3RVxcdURGOEYtXFx1REY5Rl18XFx1RDgyQ1tcXHVEQzAwXFx1REMwMV18XFx1RDgyRltcXHVEQzAwLVxcdURDNkFcXHVEQzcwLVxcdURDN0NcXHVEQzgwLVxcdURDODhcXHVEQzkwLVxcdURDOTlcXHVEQzlEXFx1REM5RV18XFx1RDgzNFtcXHVERDY1LVxcdURENjlcXHVERDZELVxcdURENzJcXHVERDdCLVxcdUREODJcXHVERDg1LVxcdUREOEJcXHVEREFBLVxcdUREQURcXHVERTQyLVxcdURFNDRdfFxcdUQ4MzVbXFx1REMwMC1cXHVEQzU0XFx1REM1Ni1cXHVEQzlDXFx1REM5RVxcdURDOUZcXHVEQ0EyXFx1RENBNVxcdURDQTZcXHVEQ0E5LVxcdURDQUNcXHVEQ0FFLVxcdURDQjlcXHVEQ0JCXFx1RENCRC1cXHVEQ0MzXFx1RENDNS1cXHVERDA1XFx1REQwNy1cXHVERDBBXFx1REQwRC1cXHVERDE0XFx1REQxNi1cXHVERDFDXFx1REQxRS1cXHVERDM5XFx1REQzQi1cXHVERDNFXFx1REQ0MC1cXHVERDQ0XFx1REQ0NlxcdURENEEtXFx1REQ1MFxcdURENTItXFx1REVBNVxcdURFQTgtXFx1REVDMFxcdURFQzItXFx1REVEQVxcdURFREMtXFx1REVGQVxcdURFRkMtXFx1REYxNFxcdURGMTYtXFx1REYzNFxcdURGMzYtXFx1REY0RVxcdURGNTAtXFx1REY2RVxcdURGNzAtXFx1REY4OFxcdURGOEEtXFx1REZBOFxcdURGQUEtXFx1REZDMlxcdURGQzQtXFx1REZDQlxcdURGQ0UtXFx1REZGRl18XFx1RDgzNltcXHVERTAwLVxcdURFMzZcXHVERTNCLVxcdURFNkNcXHVERTc1XFx1REU4NFxcdURFOUItXFx1REU5RlxcdURFQTEtXFx1REVBRl18XFx1RDgzQVtcXHVEQzAwLVxcdURDQzRcXHVEQ0QwLVxcdURDRDZdfFxcdUQ4M0JbXFx1REUwMC1cXHVERTAzXFx1REUwNS1cXHVERTFGXFx1REUyMVxcdURFMjJcXHVERTI0XFx1REUyN1xcdURFMjktXFx1REUzMlxcdURFMzQtXFx1REUzN1xcdURFMzlcXHVERTNCXFx1REU0MlxcdURFNDdcXHVERTQ5XFx1REU0QlxcdURFNEQtXFx1REU0RlxcdURFNTFcXHVERTUyXFx1REU1NFxcdURFNTdcXHVERTU5XFx1REU1QlxcdURFNURcXHVERTVGXFx1REU2MVxcdURFNjJcXHVERTY0XFx1REU2Ny1cXHVERTZBXFx1REU2Qy1cXHVERTcyXFx1REU3NC1cXHVERTc3XFx1REU3OS1cXHVERTdDXFx1REU3RVxcdURFODAtXFx1REU4OVxcdURFOEItXFx1REU5QlxcdURFQTEtXFx1REVBM1xcdURFQTUtXFx1REVBOVxcdURFQUItXFx1REVCQl18XFx1RDg2OVtcXHVEQzAwLVxcdURFRDZcXHVERjAwLVxcdURGRkZdfFxcdUQ4NkRbXFx1REMwMC1cXHVERjM0XFx1REY0MC1cXHVERkZGXXxcXHVEODZFW1xcdURDMDAtXFx1REMxRFxcdURDMjAtXFx1REZGRl18XFx1RDg3M1tcXHVEQzAwLVxcdURFQTFdfFxcdUQ4N0VbXFx1REMwMC1cXHVERTFEXXxcXHVEQjQwW1xcdUREMDAtXFx1RERFRl0vXG5cdH07XG5cdGV4cG9ydHMuQ2hhcmFjdGVyID0ge1xuXHQgICAgZnJvbUNvZGVQb2ludDogZnVuY3Rpb24gKGNwKSB7XG5cdCAgICAgICAgcmV0dXJuIChjcCA8IDB4MTAwMDApID8gU3RyaW5nLmZyb21DaGFyQ29kZShjcCkgOlxuXHQgICAgICAgICAgICBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4RDgwMCArICgoY3AgLSAweDEwMDAwKSA+PiAxMCkpICtcblx0ICAgICAgICAgICAgICAgIFN0cmluZy5mcm9tQ2hhckNvZGUoMHhEQzAwICsgKChjcCAtIDB4MTAwMDApICYgMTAyMykpO1xuXHQgICAgfSxcblx0ICAgIC8vIEVDTUEtMjYyIDExLjIgV2hpdGUgU3BhY2Vcblx0ICAgIGlzV2hpdGVTcGFjZTogZnVuY3Rpb24gKGNwKSB7XG5cdCAgICAgICAgcmV0dXJuIChjcCA9PT0gMHgyMCkgfHwgKGNwID09PSAweDA5KSB8fCAoY3AgPT09IDB4MEIpIHx8IChjcCA9PT0gMHgwQykgfHwgKGNwID09PSAweEEwKSB8fFxuXHQgICAgICAgICAgICAoY3AgPj0gMHgxNjgwICYmIFsweDE2ODAsIDB4MjAwMCwgMHgyMDAxLCAweDIwMDIsIDB4MjAwMywgMHgyMDA0LCAweDIwMDUsIDB4MjAwNiwgMHgyMDA3LCAweDIwMDgsIDB4MjAwOSwgMHgyMDBBLCAweDIwMkYsIDB4MjA1RiwgMHgzMDAwLCAweEZFRkZdLmluZGV4T2YoY3ApID49IDApO1xuXHQgICAgfSxcblx0ICAgIC8vIEVDTUEtMjYyIDExLjMgTGluZSBUZXJtaW5hdG9yc1xuXHQgICAgaXNMaW5lVGVybWluYXRvcjogZnVuY3Rpb24gKGNwKSB7XG5cdCAgICAgICAgcmV0dXJuIChjcCA9PT0gMHgwQSkgfHwgKGNwID09PSAweDBEKSB8fCAoY3AgPT09IDB4MjAyOCkgfHwgKGNwID09PSAweDIwMjkpO1xuXHQgICAgfSxcblx0ICAgIC8vIEVDTUEtMjYyIDExLjYgSWRlbnRpZmllciBOYW1lcyBhbmQgSWRlbnRpZmllcnNcblx0ICAgIGlzSWRlbnRpZmllclN0YXJ0OiBmdW5jdGlvbiAoY3ApIHtcblx0ICAgICAgICByZXR1cm4gKGNwID09PSAweDI0KSB8fCAoY3AgPT09IDB4NUYpIHx8XG5cdCAgICAgICAgICAgIChjcCA+PSAweDQxICYmIGNwIDw9IDB4NUEpIHx8XG5cdCAgICAgICAgICAgIChjcCA+PSAweDYxICYmIGNwIDw9IDB4N0EpIHx8XG5cdCAgICAgICAgICAgIChjcCA9PT0gMHg1QykgfHxcblx0ICAgICAgICAgICAgKChjcCA+PSAweDgwKSAmJiBSZWdleC5Ob25Bc2NpaUlkZW50aWZpZXJTdGFydC50ZXN0KGV4cG9ydHMuQ2hhcmFjdGVyLmZyb21Db2RlUG9pbnQoY3ApKSk7XG5cdCAgICB9LFxuXHQgICAgaXNJZGVudGlmaWVyUGFydDogZnVuY3Rpb24gKGNwKSB7XG5cdCAgICAgICAgcmV0dXJuIChjcCA9PT0gMHgyNCkgfHwgKGNwID09PSAweDVGKSB8fFxuXHQgICAgICAgICAgICAoY3AgPj0gMHg0MSAmJiBjcCA8PSAweDVBKSB8fFxuXHQgICAgICAgICAgICAoY3AgPj0gMHg2MSAmJiBjcCA8PSAweDdBKSB8fFxuXHQgICAgICAgICAgICAoY3AgPj0gMHgzMCAmJiBjcCA8PSAweDM5KSB8fFxuXHQgICAgICAgICAgICAoY3AgPT09IDB4NUMpIHx8XG5cdCAgICAgICAgICAgICgoY3AgPj0gMHg4MCkgJiYgUmVnZXguTm9uQXNjaWlJZGVudGlmaWVyUGFydC50ZXN0KGV4cG9ydHMuQ2hhcmFjdGVyLmZyb21Db2RlUG9pbnQoY3ApKSk7XG5cdCAgICB9LFxuXHQgICAgLy8gRUNNQS0yNjIgMTEuOC4zIE51bWVyaWMgTGl0ZXJhbHNcblx0ICAgIGlzRGVjaW1hbERpZ2l0OiBmdW5jdGlvbiAoY3ApIHtcblx0ICAgICAgICByZXR1cm4gKGNwID49IDB4MzAgJiYgY3AgPD0gMHgzOSk7IC8vIDAuLjlcblx0ICAgIH0sXG5cdCAgICBpc0hleERpZ2l0OiBmdW5jdGlvbiAoY3ApIHtcblx0ICAgICAgICByZXR1cm4gKGNwID49IDB4MzAgJiYgY3AgPD0gMHgzOSkgfHxcblx0ICAgICAgICAgICAgKGNwID49IDB4NDEgJiYgY3AgPD0gMHg0NikgfHxcblx0ICAgICAgICAgICAgKGNwID49IDB4NjEgJiYgY3AgPD0gMHg2Nik7IC8vIGEuLmZcblx0ICAgIH0sXG5cdCAgICBpc09jdGFsRGlnaXQ6IGZ1bmN0aW9uIChjcCkge1xuXHQgICAgICAgIHJldHVybiAoY3AgPj0gMHgzMCAmJiBjcCA8PSAweDM3KTsgLy8gMC4uN1xuXHQgICAgfVxuXHR9O1xuXG5cbi8qKiovIH0sXG4vKiAxMCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0XCJ1c2Ugc3RyaWN0XCI7XG5cdHZhciBzeW50YXhfMSA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cdHZhciBBcnJheUV4cHJlc3Npb24gPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gQXJyYXlFeHByZXNzaW9uKGVsZW1lbnRzKSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0gc3ludGF4XzEuU3ludGF4LkFycmF5RXhwcmVzc2lvbjtcblx0ICAgICAgICB0aGlzLmVsZW1lbnRzID0gZWxlbWVudHM7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gQXJyYXlFeHByZXNzaW9uO1xuXHR9KCkpO1xuXHRleHBvcnRzLkFycmF5RXhwcmVzc2lvbiA9IEFycmF5RXhwcmVzc2lvbjtcblx0dmFyIEFycmF5UGF0dGVybiA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBBcnJheVBhdHRlcm4oZWxlbWVudHMpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguQXJyYXlQYXR0ZXJuO1xuXHQgICAgICAgIHRoaXMuZWxlbWVudHMgPSBlbGVtZW50cztcblx0ICAgIH1cblx0ICAgIHJldHVybiBBcnJheVBhdHRlcm47XG5cdH0oKSk7XG5cdGV4cG9ydHMuQXJyYXlQYXR0ZXJuID0gQXJyYXlQYXR0ZXJuO1xuXHR2YXIgQXJyb3dGdW5jdGlvbkV4cHJlc3Npb24gPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gQXJyb3dGdW5jdGlvbkV4cHJlc3Npb24ocGFyYW1zLCBib2R5LCBleHByZXNzaW9uKSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0gc3ludGF4XzEuU3ludGF4LkFycm93RnVuY3Rpb25FeHByZXNzaW9uO1xuXHQgICAgICAgIHRoaXMuaWQgPSBudWxsO1xuXHQgICAgICAgIHRoaXMucGFyYW1zID0gcGFyYW1zO1xuXHQgICAgICAgIHRoaXMuYm9keSA9IGJvZHk7XG5cdCAgICAgICAgdGhpcy5nZW5lcmF0b3IgPSBmYWxzZTtcblx0ICAgICAgICB0aGlzLmV4cHJlc3Npb24gPSBleHByZXNzaW9uO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIEFycm93RnVuY3Rpb25FeHByZXNzaW9uO1xuXHR9KCkpO1xuXHRleHBvcnRzLkFycm93RnVuY3Rpb25FeHByZXNzaW9uID0gQXJyb3dGdW5jdGlvbkV4cHJlc3Npb247XG5cdHZhciBBc3NpZ25tZW50RXhwcmVzc2lvbiA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBBc3NpZ25tZW50RXhwcmVzc2lvbihvcGVyYXRvciwgbGVmdCwgcmlnaHQpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguQXNzaWdubWVudEV4cHJlc3Npb247XG5cdCAgICAgICAgdGhpcy5vcGVyYXRvciA9IG9wZXJhdG9yO1xuXHQgICAgICAgIHRoaXMubGVmdCA9IGxlZnQ7XG5cdCAgICAgICAgdGhpcy5yaWdodCA9IHJpZ2h0O1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIEFzc2lnbm1lbnRFeHByZXNzaW9uO1xuXHR9KCkpO1xuXHRleHBvcnRzLkFzc2lnbm1lbnRFeHByZXNzaW9uID0gQXNzaWdubWVudEV4cHJlc3Npb247XG5cdHZhciBBc3NpZ25tZW50UGF0dGVybiA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBBc3NpZ25tZW50UGF0dGVybihsZWZ0LCByaWdodCkge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IHN5bnRheF8xLlN5bnRheC5Bc3NpZ25tZW50UGF0dGVybjtcblx0ICAgICAgICB0aGlzLmxlZnQgPSBsZWZ0O1xuXHQgICAgICAgIHRoaXMucmlnaHQgPSByaWdodDtcblx0ICAgIH1cblx0ICAgIHJldHVybiBBc3NpZ25tZW50UGF0dGVybjtcblx0fSgpKTtcblx0ZXhwb3J0cy5Bc3NpZ25tZW50UGF0dGVybiA9IEFzc2lnbm1lbnRQYXR0ZXJuO1xuXHR2YXIgQmluYXJ5RXhwcmVzc2lvbiA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBCaW5hcnlFeHByZXNzaW9uKG9wZXJhdG9yLCBsZWZ0LCByaWdodCkge1xuXHQgICAgICAgIHZhciBsb2dpY2FsID0gKG9wZXJhdG9yID09PSAnfHwnIHx8IG9wZXJhdG9yID09PSAnJiYnKTtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBsb2dpY2FsID8gc3ludGF4XzEuU3ludGF4LkxvZ2ljYWxFeHByZXNzaW9uIDogc3ludGF4XzEuU3ludGF4LkJpbmFyeUV4cHJlc3Npb247XG5cdCAgICAgICAgdGhpcy5vcGVyYXRvciA9IG9wZXJhdG9yO1xuXHQgICAgICAgIHRoaXMubGVmdCA9IGxlZnQ7XG5cdCAgICAgICAgdGhpcy5yaWdodCA9IHJpZ2h0O1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIEJpbmFyeUV4cHJlc3Npb247XG5cdH0oKSk7XG5cdGV4cG9ydHMuQmluYXJ5RXhwcmVzc2lvbiA9IEJpbmFyeUV4cHJlc3Npb247XG5cdHZhciBCbG9ja1N0YXRlbWVudCA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBCbG9ja1N0YXRlbWVudChib2R5KSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0gc3ludGF4XzEuU3ludGF4LkJsb2NrU3RhdGVtZW50O1xuXHQgICAgICAgIHRoaXMuYm9keSA9IGJvZHk7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gQmxvY2tTdGF0ZW1lbnQ7XG5cdH0oKSk7XG5cdGV4cG9ydHMuQmxvY2tTdGF0ZW1lbnQgPSBCbG9ja1N0YXRlbWVudDtcblx0dmFyIEJyZWFrU3RhdGVtZW50ID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIEJyZWFrU3RhdGVtZW50KGxhYmVsKSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0gc3ludGF4XzEuU3ludGF4LkJyZWFrU3RhdGVtZW50O1xuXHQgICAgICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcblx0ICAgIH1cblx0ICAgIHJldHVybiBCcmVha1N0YXRlbWVudDtcblx0fSgpKTtcblx0ZXhwb3J0cy5CcmVha1N0YXRlbWVudCA9IEJyZWFrU3RhdGVtZW50O1xuXHR2YXIgQ2FsbEV4cHJlc3Npb24gPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gQ2FsbEV4cHJlc3Npb24oY2FsbGVlLCBhcmdzKSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0gc3ludGF4XzEuU3ludGF4LkNhbGxFeHByZXNzaW9uO1xuXHQgICAgICAgIHRoaXMuY2FsbGVlID0gY2FsbGVlO1xuXHQgICAgICAgIHRoaXMuYXJndW1lbnRzID0gYXJncztcblx0ICAgIH1cblx0ICAgIHJldHVybiBDYWxsRXhwcmVzc2lvbjtcblx0fSgpKTtcblx0ZXhwb3J0cy5DYWxsRXhwcmVzc2lvbiA9IENhbGxFeHByZXNzaW9uO1xuXHR2YXIgQ2F0Y2hDbGF1c2UgPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gQ2F0Y2hDbGF1c2UocGFyYW0sIGJvZHkpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguQ2F0Y2hDbGF1c2U7XG5cdCAgICAgICAgdGhpcy5wYXJhbSA9IHBhcmFtO1xuXHQgICAgICAgIHRoaXMuYm9keSA9IGJvZHk7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gQ2F0Y2hDbGF1c2U7XG5cdH0oKSk7XG5cdGV4cG9ydHMuQ2F0Y2hDbGF1c2UgPSBDYXRjaENsYXVzZTtcblx0dmFyIENsYXNzQm9keSA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBDbGFzc0JvZHkoYm9keSkge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IHN5bnRheF8xLlN5bnRheC5DbGFzc0JvZHk7XG5cdCAgICAgICAgdGhpcy5ib2R5ID0gYm9keTtcblx0ICAgIH1cblx0ICAgIHJldHVybiBDbGFzc0JvZHk7XG5cdH0oKSk7XG5cdGV4cG9ydHMuQ2xhc3NCb2R5ID0gQ2xhc3NCb2R5O1xuXHR2YXIgQ2xhc3NEZWNsYXJhdGlvbiA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBDbGFzc0RlY2xhcmF0aW9uKGlkLCBzdXBlckNsYXNzLCBib2R5KSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0gc3ludGF4XzEuU3ludGF4LkNsYXNzRGVjbGFyYXRpb247XG5cdCAgICAgICAgdGhpcy5pZCA9IGlkO1xuXHQgICAgICAgIHRoaXMuc3VwZXJDbGFzcyA9IHN1cGVyQ2xhc3M7XG5cdCAgICAgICAgdGhpcy5ib2R5ID0gYm9keTtcblx0ICAgIH1cblx0ICAgIHJldHVybiBDbGFzc0RlY2xhcmF0aW9uO1xuXHR9KCkpO1xuXHRleHBvcnRzLkNsYXNzRGVjbGFyYXRpb24gPSBDbGFzc0RlY2xhcmF0aW9uO1xuXHR2YXIgQ2xhc3NFeHByZXNzaW9uID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIENsYXNzRXhwcmVzc2lvbihpZCwgc3VwZXJDbGFzcywgYm9keSkge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IHN5bnRheF8xLlN5bnRheC5DbGFzc0V4cHJlc3Npb247XG5cdCAgICAgICAgdGhpcy5pZCA9IGlkO1xuXHQgICAgICAgIHRoaXMuc3VwZXJDbGFzcyA9IHN1cGVyQ2xhc3M7XG5cdCAgICAgICAgdGhpcy5ib2R5ID0gYm9keTtcblx0ICAgIH1cblx0ICAgIHJldHVybiBDbGFzc0V4cHJlc3Npb247XG5cdH0oKSk7XG5cdGV4cG9ydHMuQ2xhc3NFeHByZXNzaW9uID0gQ2xhc3NFeHByZXNzaW9uO1xuXHR2YXIgQ29tcHV0ZWRNZW1iZXJFeHByZXNzaW9uID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIENvbXB1dGVkTWVtYmVyRXhwcmVzc2lvbihvYmplY3QsIHByb3BlcnR5KSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0gc3ludGF4XzEuU3ludGF4Lk1lbWJlckV4cHJlc3Npb247XG5cdCAgICAgICAgdGhpcy5jb21wdXRlZCA9IHRydWU7XG5cdCAgICAgICAgdGhpcy5vYmplY3QgPSBvYmplY3Q7XG5cdCAgICAgICAgdGhpcy5wcm9wZXJ0eSA9IHByb3BlcnR5O1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIENvbXB1dGVkTWVtYmVyRXhwcmVzc2lvbjtcblx0fSgpKTtcblx0ZXhwb3J0cy5Db21wdXRlZE1lbWJlckV4cHJlc3Npb24gPSBDb21wdXRlZE1lbWJlckV4cHJlc3Npb247XG5cdHZhciBDb25kaXRpb25hbEV4cHJlc3Npb24gPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gQ29uZGl0aW9uYWxFeHByZXNzaW9uKHRlc3QsIGNvbnNlcXVlbnQsIGFsdGVybmF0ZSkge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IHN5bnRheF8xLlN5bnRheC5Db25kaXRpb25hbEV4cHJlc3Npb247XG5cdCAgICAgICAgdGhpcy50ZXN0ID0gdGVzdDtcblx0ICAgICAgICB0aGlzLmNvbnNlcXVlbnQgPSBjb25zZXF1ZW50O1xuXHQgICAgICAgIHRoaXMuYWx0ZXJuYXRlID0gYWx0ZXJuYXRlO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIENvbmRpdGlvbmFsRXhwcmVzc2lvbjtcblx0fSgpKTtcblx0ZXhwb3J0cy5Db25kaXRpb25hbEV4cHJlc3Npb24gPSBDb25kaXRpb25hbEV4cHJlc3Npb247XG5cdHZhciBDb250aW51ZVN0YXRlbWVudCA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBDb250aW51ZVN0YXRlbWVudChsYWJlbCkge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IHN5bnRheF8xLlN5bnRheC5Db250aW51ZVN0YXRlbWVudDtcblx0ICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gQ29udGludWVTdGF0ZW1lbnQ7XG5cdH0oKSk7XG5cdGV4cG9ydHMuQ29udGludWVTdGF0ZW1lbnQgPSBDb250aW51ZVN0YXRlbWVudDtcblx0dmFyIERlYnVnZ2VyU3RhdGVtZW50ID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIERlYnVnZ2VyU3RhdGVtZW50KCkge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IHN5bnRheF8xLlN5bnRheC5EZWJ1Z2dlclN0YXRlbWVudDtcblx0ICAgIH1cblx0ICAgIHJldHVybiBEZWJ1Z2dlclN0YXRlbWVudDtcblx0fSgpKTtcblx0ZXhwb3J0cy5EZWJ1Z2dlclN0YXRlbWVudCA9IERlYnVnZ2VyU3RhdGVtZW50O1xuXHR2YXIgRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIERpcmVjdGl2ZShleHByZXNzaW9uLCBkaXJlY3RpdmUpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguRXhwcmVzc2lvblN0YXRlbWVudDtcblx0ICAgICAgICB0aGlzLmV4cHJlc3Npb24gPSBleHByZXNzaW9uO1xuXHQgICAgICAgIHRoaXMuZGlyZWN0aXZlID0gZGlyZWN0aXZlO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIERpcmVjdGl2ZTtcblx0fSgpKTtcblx0ZXhwb3J0cy5EaXJlY3RpdmUgPSBEaXJlY3RpdmU7XG5cdHZhciBEb1doaWxlU3RhdGVtZW50ID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIERvV2hpbGVTdGF0ZW1lbnQoYm9keSwgdGVzdCkge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IHN5bnRheF8xLlN5bnRheC5Eb1doaWxlU3RhdGVtZW50O1xuXHQgICAgICAgIHRoaXMuYm9keSA9IGJvZHk7XG5cdCAgICAgICAgdGhpcy50ZXN0ID0gdGVzdDtcblx0ICAgIH1cblx0ICAgIHJldHVybiBEb1doaWxlU3RhdGVtZW50O1xuXHR9KCkpO1xuXHRleHBvcnRzLkRvV2hpbGVTdGF0ZW1lbnQgPSBEb1doaWxlU3RhdGVtZW50O1xuXHR2YXIgRW1wdHlTdGF0ZW1lbnQgPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gRW1wdHlTdGF0ZW1lbnQoKSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0gc3ludGF4XzEuU3ludGF4LkVtcHR5U3RhdGVtZW50O1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIEVtcHR5U3RhdGVtZW50O1xuXHR9KCkpO1xuXHRleHBvcnRzLkVtcHR5U3RhdGVtZW50ID0gRW1wdHlTdGF0ZW1lbnQ7XG5cdHZhciBFeHBvcnRBbGxEZWNsYXJhdGlvbiA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBFeHBvcnRBbGxEZWNsYXJhdGlvbihzb3VyY2UpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguRXhwb3J0QWxsRGVjbGFyYXRpb247XG5cdCAgICAgICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gRXhwb3J0QWxsRGVjbGFyYXRpb247XG5cdH0oKSk7XG5cdGV4cG9ydHMuRXhwb3J0QWxsRGVjbGFyYXRpb24gPSBFeHBvcnRBbGxEZWNsYXJhdGlvbjtcblx0dmFyIEV4cG9ydERlZmF1bHREZWNsYXJhdGlvbiA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBFeHBvcnREZWZhdWx0RGVjbGFyYXRpb24oZGVjbGFyYXRpb24pIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguRXhwb3J0RGVmYXVsdERlY2xhcmF0aW9uO1xuXHQgICAgICAgIHRoaXMuZGVjbGFyYXRpb24gPSBkZWNsYXJhdGlvbjtcblx0ICAgIH1cblx0ICAgIHJldHVybiBFeHBvcnREZWZhdWx0RGVjbGFyYXRpb247XG5cdH0oKSk7XG5cdGV4cG9ydHMuRXhwb3J0RGVmYXVsdERlY2xhcmF0aW9uID0gRXhwb3J0RGVmYXVsdERlY2xhcmF0aW9uO1xuXHR2YXIgRXhwb3J0TmFtZWREZWNsYXJhdGlvbiA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBFeHBvcnROYW1lZERlY2xhcmF0aW9uKGRlY2xhcmF0aW9uLCBzcGVjaWZpZXJzLCBzb3VyY2UpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguRXhwb3J0TmFtZWREZWNsYXJhdGlvbjtcblx0ICAgICAgICB0aGlzLmRlY2xhcmF0aW9uID0gZGVjbGFyYXRpb247XG5cdCAgICAgICAgdGhpcy5zcGVjaWZpZXJzID0gc3BlY2lmaWVycztcblx0ICAgICAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcblx0ICAgIH1cblx0ICAgIHJldHVybiBFeHBvcnROYW1lZERlY2xhcmF0aW9uO1xuXHR9KCkpO1xuXHRleHBvcnRzLkV4cG9ydE5hbWVkRGVjbGFyYXRpb24gPSBFeHBvcnROYW1lZERlY2xhcmF0aW9uO1xuXHR2YXIgRXhwb3J0U3BlY2lmaWVyID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIEV4cG9ydFNwZWNpZmllcihsb2NhbCwgZXhwb3J0ZWQpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguRXhwb3J0U3BlY2lmaWVyO1xuXHQgICAgICAgIHRoaXMuZXhwb3J0ZWQgPSBleHBvcnRlZDtcblx0ICAgICAgICB0aGlzLmxvY2FsID0gbG9jYWw7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gRXhwb3J0U3BlY2lmaWVyO1xuXHR9KCkpO1xuXHRleHBvcnRzLkV4cG9ydFNwZWNpZmllciA9IEV4cG9ydFNwZWNpZmllcjtcblx0dmFyIEV4cHJlc3Npb25TdGF0ZW1lbnQgPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gRXhwcmVzc2lvblN0YXRlbWVudChleHByZXNzaW9uKSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0gc3ludGF4XzEuU3ludGF4LkV4cHJlc3Npb25TdGF0ZW1lbnQ7XG5cdCAgICAgICAgdGhpcy5leHByZXNzaW9uID0gZXhwcmVzc2lvbjtcblx0ICAgIH1cblx0ICAgIHJldHVybiBFeHByZXNzaW9uU3RhdGVtZW50O1xuXHR9KCkpO1xuXHRleHBvcnRzLkV4cHJlc3Npb25TdGF0ZW1lbnQgPSBFeHByZXNzaW9uU3RhdGVtZW50O1xuXHR2YXIgRm9ySW5TdGF0ZW1lbnQgPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gRm9ySW5TdGF0ZW1lbnQobGVmdCwgcmlnaHQsIGJvZHkpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguRm9ySW5TdGF0ZW1lbnQ7XG5cdCAgICAgICAgdGhpcy5sZWZ0ID0gbGVmdDtcblx0ICAgICAgICB0aGlzLnJpZ2h0ID0gcmlnaHQ7XG5cdCAgICAgICAgdGhpcy5ib2R5ID0gYm9keTtcblx0ICAgICAgICB0aGlzLmVhY2ggPSBmYWxzZTtcblx0ICAgIH1cblx0ICAgIHJldHVybiBGb3JJblN0YXRlbWVudDtcblx0fSgpKTtcblx0ZXhwb3J0cy5Gb3JJblN0YXRlbWVudCA9IEZvckluU3RhdGVtZW50O1xuXHR2YXIgRm9yT2ZTdGF0ZW1lbnQgPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gRm9yT2ZTdGF0ZW1lbnQobGVmdCwgcmlnaHQsIGJvZHkpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguRm9yT2ZTdGF0ZW1lbnQ7XG5cdCAgICAgICAgdGhpcy5sZWZ0ID0gbGVmdDtcblx0ICAgICAgICB0aGlzLnJpZ2h0ID0gcmlnaHQ7XG5cdCAgICAgICAgdGhpcy5ib2R5ID0gYm9keTtcblx0ICAgIH1cblx0ICAgIHJldHVybiBGb3JPZlN0YXRlbWVudDtcblx0fSgpKTtcblx0ZXhwb3J0cy5Gb3JPZlN0YXRlbWVudCA9IEZvck9mU3RhdGVtZW50O1xuXHR2YXIgRm9yU3RhdGVtZW50ID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIEZvclN0YXRlbWVudChpbml0LCB0ZXN0LCB1cGRhdGUsIGJvZHkpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguRm9yU3RhdGVtZW50O1xuXHQgICAgICAgIHRoaXMuaW5pdCA9IGluaXQ7XG5cdCAgICAgICAgdGhpcy50ZXN0ID0gdGVzdDtcblx0ICAgICAgICB0aGlzLnVwZGF0ZSA9IHVwZGF0ZTtcblx0ICAgICAgICB0aGlzLmJvZHkgPSBib2R5O1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIEZvclN0YXRlbWVudDtcblx0fSgpKTtcblx0ZXhwb3J0cy5Gb3JTdGF0ZW1lbnQgPSBGb3JTdGF0ZW1lbnQ7XG5cdHZhciBGdW5jdGlvbkRlY2xhcmF0aW9uID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIEZ1bmN0aW9uRGVjbGFyYXRpb24oaWQsIHBhcmFtcywgYm9keSwgZ2VuZXJhdG9yKSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0gc3ludGF4XzEuU3ludGF4LkZ1bmN0aW9uRGVjbGFyYXRpb247XG5cdCAgICAgICAgdGhpcy5pZCA9IGlkO1xuXHQgICAgICAgIHRoaXMucGFyYW1zID0gcGFyYW1zO1xuXHQgICAgICAgIHRoaXMuYm9keSA9IGJvZHk7XG5cdCAgICAgICAgdGhpcy5nZW5lcmF0b3IgPSBnZW5lcmF0b3I7XG5cdCAgICAgICAgdGhpcy5leHByZXNzaW9uID0gZmFsc2U7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gRnVuY3Rpb25EZWNsYXJhdGlvbjtcblx0fSgpKTtcblx0ZXhwb3J0cy5GdW5jdGlvbkRlY2xhcmF0aW9uID0gRnVuY3Rpb25EZWNsYXJhdGlvbjtcblx0dmFyIEZ1bmN0aW9uRXhwcmVzc2lvbiA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBGdW5jdGlvbkV4cHJlc3Npb24oaWQsIHBhcmFtcywgYm9keSwgZ2VuZXJhdG9yKSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0gc3ludGF4XzEuU3ludGF4LkZ1bmN0aW9uRXhwcmVzc2lvbjtcblx0ICAgICAgICB0aGlzLmlkID0gaWQ7XG5cdCAgICAgICAgdGhpcy5wYXJhbXMgPSBwYXJhbXM7XG5cdCAgICAgICAgdGhpcy5ib2R5ID0gYm9keTtcblx0ICAgICAgICB0aGlzLmdlbmVyYXRvciA9IGdlbmVyYXRvcjtcblx0ICAgICAgICB0aGlzLmV4cHJlc3Npb24gPSBmYWxzZTtcblx0ICAgIH1cblx0ICAgIHJldHVybiBGdW5jdGlvbkV4cHJlc3Npb247XG5cdH0oKSk7XG5cdGV4cG9ydHMuRnVuY3Rpb25FeHByZXNzaW9uID0gRnVuY3Rpb25FeHByZXNzaW9uO1xuXHR2YXIgSWRlbnRpZmllciA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBJZGVudGlmaWVyKG5hbWUpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguSWRlbnRpZmllcjtcblx0ICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIElkZW50aWZpZXI7XG5cdH0oKSk7XG5cdGV4cG9ydHMuSWRlbnRpZmllciA9IElkZW50aWZpZXI7XG5cdHZhciBJZlN0YXRlbWVudCA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBJZlN0YXRlbWVudCh0ZXN0LCBjb25zZXF1ZW50LCBhbHRlcm5hdGUpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguSWZTdGF0ZW1lbnQ7XG5cdCAgICAgICAgdGhpcy50ZXN0ID0gdGVzdDtcblx0ICAgICAgICB0aGlzLmNvbnNlcXVlbnQgPSBjb25zZXF1ZW50O1xuXHQgICAgICAgIHRoaXMuYWx0ZXJuYXRlID0gYWx0ZXJuYXRlO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIElmU3RhdGVtZW50O1xuXHR9KCkpO1xuXHRleHBvcnRzLklmU3RhdGVtZW50ID0gSWZTdGF0ZW1lbnQ7XG5cdHZhciBJbXBvcnREZWNsYXJhdGlvbiA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBJbXBvcnREZWNsYXJhdGlvbihzcGVjaWZpZXJzLCBzb3VyY2UpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguSW1wb3J0RGVjbGFyYXRpb247XG5cdCAgICAgICAgdGhpcy5zcGVjaWZpZXJzID0gc3BlY2lmaWVycztcblx0ICAgICAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcblx0ICAgIH1cblx0ICAgIHJldHVybiBJbXBvcnREZWNsYXJhdGlvbjtcblx0fSgpKTtcblx0ZXhwb3J0cy5JbXBvcnREZWNsYXJhdGlvbiA9IEltcG9ydERlY2xhcmF0aW9uO1xuXHR2YXIgSW1wb3J0RGVmYXVsdFNwZWNpZmllciA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBJbXBvcnREZWZhdWx0U3BlY2lmaWVyKGxvY2FsKSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0gc3ludGF4XzEuU3ludGF4LkltcG9ydERlZmF1bHRTcGVjaWZpZXI7XG5cdCAgICAgICAgdGhpcy5sb2NhbCA9IGxvY2FsO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIEltcG9ydERlZmF1bHRTcGVjaWZpZXI7XG5cdH0oKSk7XG5cdGV4cG9ydHMuSW1wb3J0RGVmYXVsdFNwZWNpZmllciA9IEltcG9ydERlZmF1bHRTcGVjaWZpZXI7XG5cdHZhciBJbXBvcnROYW1lc3BhY2VTcGVjaWZpZXIgPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gSW1wb3J0TmFtZXNwYWNlU3BlY2lmaWVyKGxvY2FsKSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0gc3ludGF4XzEuU3ludGF4LkltcG9ydE5hbWVzcGFjZVNwZWNpZmllcjtcblx0ICAgICAgICB0aGlzLmxvY2FsID0gbG9jYWw7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gSW1wb3J0TmFtZXNwYWNlU3BlY2lmaWVyO1xuXHR9KCkpO1xuXHRleHBvcnRzLkltcG9ydE5hbWVzcGFjZVNwZWNpZmllciA9IEltcG9ydE5hbWVzcGFjZVNwZWNpZmllcjtcblx0dmFyIEltcG9ydFNwZWNpZmllciA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBJbXBvcnRTcGVjaWZpZXIobG9jYWwsIGltcG9ydGVkKSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0gc3ludGF4XzEuU3ludGF4LkltcG9ydFNwZWNpZmllcjtcblx0ICAgICAgICB0aGlzLmxvY2FsID0gbG9jYWw7XG5cdCAgICAgICAgdGhpcy5pbXBvcnRlZCA9IGltcG9ydGVkO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIEltcG9ydFNwZWNpZmllcjtcblx0fSgpKTtcblx0ZXhwb3J0cy5JbXBvcnRTcGVjaWZpZXIgPSBJbXBvcnRTcGVjaWZpZXI7XG5cdHZhciBMYWJlbGVkU3RhdGVtZW50ID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIExhYmVsZWRTdGF0ZW1lbnQobGFiZWwsIGJvZHkpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguTGFiZWxlZFN0YXRlbWVudDtcblx0ICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XG5cdCAgICAgICAgdGhpcy5ib2R5ID0gYm9keTtcblx0ICAgIH1cblx0ICAgIHJldHVybiBMYWJlbGVkU3RhdGVtZW50O1xuXHR9KCkpO1xuXHRleHBvcnRzLkxhYmVsZWRTdGF0ZW1lbnQgPSBMYWJlbGVkU3RhdGVtZW50O1xuXHR2YXIgTGl0ZXJhbCA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBMaXRlcmFsKHZhbHVlLCByYXcpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguTGl0ZXJhbDtcblx0ICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG5cdCAgICAgICAgdGhpcy5yYXcgPSByYXc7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gTGl0ZXJhbDtcblx0fSgpKTtcblx0ZXhwb3J0cy5MaXRlcmFsID0gTGl0ZXJhbDtcblx0dmFyIE1ldGFQcm9wZXJ0eSA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBNZXRhUHJvcGVydHkobWV0YSwgcHJvcGVydHkpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguTWV0YVByb3BlcnR5O1xuXHQgICAgICAgIHRoaXMubWV0YSA9IG1ldGE7XG5cdCAgICAgICAgdGhpcy5wcm9wZXJ0eSA9IHByb3BlcnR5O1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIE1ldGFQcm9wZXJ0eTtcblx0fSgpKTtcblx0ZXhwb3J0cy5NZXRhUHJvcGVydHkgPSBNZXRhUHJvcGVydHk7XG5cdHZhciBNZXRob2REZWZpbml0aW9uID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIE1ldGhvZERlZmluaXRpb24oa2V5LCBjb21wdXRlZCwgdmFsdWUsIGtpbmQsIGlzU3RhdGljKSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0gc3ludGF4XzEuU3ludGF4Lk1ldGhvZERlZmluaXRpb247XG5cdCAgICAgICAgdGhpcy5rZXkgPSBrZXk7XG5cdCAgICAgICAgdGhpcy5jb21wdXRlZCA9IGNvbXB1dGVkO1xuXHQgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcblx0ICAgICAgICB0aGlzLmtpbmQgPSBraW5kO1xuXHQgICAgICAgIHRoaXMuc3RhdGljID0gaXNTdGF0aWM7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gTWV0aG9kRGVmaW5pdGlvbjtcblx0fSgpKTtcblx0ZXhwb3J0cy5NZXRob2REZWZpbml0aW9uID0gTWV0aG9kRGVmaW5pdGlvbjtcblx0dmFyIE5ld0V4cHJlc3Npb24gPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gTmV3RXhwcmVzc2lvbihjYWxsZWUsIGFyZ3MpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguTmV3RXhwcmVzc2lvbjtcblx0ICAgICAgICB0aGlzLmNhbGxlZSA9IGNhbGxlZTtcblx0ICAgICAgICB0aGlzLmFyZ3VtZW50cyA9IGFyZ3M7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gTmV3RXhwcmVzc2lvbjtcblx0fSgpKTtcblx0ZXhwb3J0cy5OZXdFeHByZXNzaW9uID0gTmV3RXhwcmVzc2lvbjtcblx0dmFyIE9iamVjdEV4cHJlc3Npb24gPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gT2JqZWN0RXhwcmVzc2lvbihwcm9wZXJ0aWVzKSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0gc3ludGF4XzEuU3ludGF4Lk9iamVjdEV4cHJlc3Npb247XG5cdCAgICAgICAgdGhpcy5wcm9wZXJ0aWVzID0gcHJvcGVydGllcztcblx0ICAgIH1cblx0ICAgIHJldHVybiBPYmplY3RFeHByZXNzaW9uO1xuXHR9KCkpO1xuXHRleHBvcnRzLk9iamVjdEV4cHJlc3Npb24gPSBPYmplY3RFeHByZXNzaW9uO1xuXHR2YXIgT2JqZWN0UGF0dGVybiA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBPYmplY3RQYXR0ZXJuKHByb3BlcnRpZXMpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguT2JqZWN0UGF0dGVybjtcblx0ICAgICAgICB0aGlzLnByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIE9iamVjdFBhdHRlcm47XG5cdH0oKSk7XG5cdGV4cG9ydHMuT2JqZWN0UGF0dGVybiA9IE9iamVjdFBhdHRlcm47XG5cdHZhciBQcm9ncmFtID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIFByb2dyYW0oYm9keSwgc291cmNlVHlwZSkge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IHN5bnRheF8xLlN5bnRheC5Qcm9ncmFtO1xuXHQgICAgICAgIHRoaXMuYm9keSA9IGJvZHk7XG5cdCAgICAgICAgdGhpcy5zb3VyY2VUeXBlID0gc291cmNlVHlwZTtcblx0ICAgIH1cblx0ICAgIHJldHVybiBQcm9ncmFtO1xuXHR9KCkpO1xuXHRleHBvcnRzLlByb2dyYW0gPSBQcm9ncmFtO1xuXHR2YXIgUHJvcGVydHkgPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gUHJvcGVydHkoa2luZCwga2V5LCBjb21wdXRlZCwgdmFsdWUsIG1ldGhvZCwgc2hvcnRoYW5kKSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0gc3ludGF4XzEuU3ludGF4LlByb3BlcnR5O1xuXHQgICAgICAgIHRoaXMua2V5ID0ga2V5O1xuXHQgICAgICAgIHRoaXMuY29tcHV0ZWQgPSBjb21wdXRlZDtcblx0ICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG5cdCAgICAgICAgdGhpcy5raW5kID0ga2luZDtcblx0ICAgICAgICB0aGlzLm1ldGhvZCA9IG1ldGhvZDtcblx0ICAgICAgICB0aGlzLnNob3J0aGFuZCA9IHNob3J0aGFuZDtcblx0ICAgIH1cblx0ICAgIHJldHVybiBQcm9wZXJ0eTtcblx0fSgpKTtcblx0ZXhwb3J0cy5Qcm9wZXJ0eSA9IFByb3BlcnR5O1xuXHR2YXIgUmVnZXhMaXRlcmFsID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIFJlZ2V4TGl0ZXJhbCh2YWx1ZSwgcmF3LCByZWdleCkge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IHN5bnRheF8xLlN5bnRheC5MaXRlcmFsO1xuXHQgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcblx0ICAgICAgICB0aGlzLnJhdyA9IHJhdztcblx0ICAgICAgICB0aGlzLnJlZ2V4ID0gcmVnZXg7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gUmVnZXhMaXRlcmFsO1xuXHR9KCkpO1xuXHRleHBvcnRzLlJlZ2V4TGl0ZXJhbCA9IFJlZ2V4TGl0ZXJhbDtcblx0dmFyIFJlc3RFbGVtZW50ID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIFJlc3RFbGVtZW50KGFyZ3VtZW50KSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0gc3ludGF4XzEuU3ludGF4LlJlc3RFbGVtZW50O1xuXHQgICAgICAgIHRoaXMuYXJndW1lbnQgPSBhcmd1bWVudDtcblx0ICAgIH1cblx0ICAgIHJldHVybiBSZXN0RWxlbWVudDtcblx0fSgpKTtcblx0ZXhwb3J0cy5SZXN0RWxlbWVudCA9IFJlc3RFbGVtZW50O1xuXHR2YXIgUmV0dXJuU3RhdGVtZW50ID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIFJldHVyblN0YXRlbWVudChhcmd1bWVudCkge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IHN5bnRheF8xLlN5bnRheC5SZXR1cm5TdGF0ZW1lbnQ7XG5cdCAgICAgICAgdGhpcy5hcmd1bWVudCA9IGFyZ3VtZW50O1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIFJldHVyblN0YXRlbWVudDtcblx0fSgpKTtcblx0ZXhwb3J0cy5SZXR1cm5TdGF0ZW1lbnQgPSBSZXR1cm5TdGF0ZW1lbnQ7XG5cdHZhciBTZXF1ZW5jZUV4cHJlc3Npb24gPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gU2VxdWVuY2VFeHByZXNzaW9uKGV4cHJlc3Npb25zKSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0gc3ludGF4XzEuU3ludGF4LlNlcXVlbmNlRXhwcmVzc2lvbjtcblx0ICAgICAgICB0aGlzLmV4cHJlc3Npb25zID0gZXhwcmVzc2lvbnM7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gU2VxdWVuY2VFeHByZXNzaW9uO1xuXHR9KCkpO1xuXHRleHBvcnRzLlNlcXVlbmNlRXhwcmVzc2lvbiA9IFNlcXVlbmNlRXhwcmVzc2lvbjtcblx0dmFyIFNwcmVhZEVsZW1lbnQgPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gU3ByZWFkRWxlbWVudChhcmd1bWVudCkge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IHN5bnRheF8xLlN5bnRheC5TcHJlYWRFbGVtZW50O1xuXHQgICAgICAgIHRoaXMuYXJndW1lbnQgPSBhcmd1bWVudDtcblx0ICAgIH1cblx0ICAgIHJldHVybiBTcHJlYWRFbGVtZW50O1xuXHR9KCkpO1xuXHRleHBvcnRzLlNwcmVhZEVsZW1lbnQgPSBTcHJlYWRFbGVtZW50O1xuXHR2YXIgU3RhdGljTWVtYmVyRXhwcmVzc2lvbiA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBTdGF0aWNNZW1iZXJFeHByZXNzaW9uKG9iamVjdCwgcHJvcGVydHkpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguTWVtYmVyRXhwcmVzc2lvbjtcblx0ICAgICAgICB0aGlzLmNvbXB1dGVkID0gZmFsc2U7XG5cdCAgICAgICAgdGhpcy5vYmplY3QgPSBvYmplY3Q7XG5cdCAgICAgICAgdGhpcy5wcm9wZXJ0eSA9IHByb3BlcnR5O1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIFN0YXRpY01lbWJlckV4cHJlc3Npb247XG5cdH0oKSk7XG5cdGV4cG9ydHMuU3RhdGljTWVtYmVyRXhwcmVzc2lvbiA9IFN0YXRpY01lbWJlckV4cHJlc3Npb247XG5cdHZhciBTdXBlciA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBTdXBlcigpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguU3VwZXI7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gU3VwZXI7XG5cdH0oKSk7XG5cdGV4cG9ydHMuU3VwZXIgPSBTdXBlcjtcblx0dmFyIFN3aXRjaENhc2UgPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gU3dpdGNoQ2FzZSh0ZXN0LCBjb25zZXF1ZW50KSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0gc3ludGF4XzEuU3ludGF4LlN3aXRjaENhc2U7XG5cdCAgICAgICAgdGhpcy50ZXN0ID0gdGVzdDtcblx0ICAgICAgICB0aGlzLmNvbnNlcXVlbnQgPSBjb25zZXF1ZW50O1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIFN3aXRjaENhc2U7XG5cdH0oKSk7XG5cdGV4cG9ydHMuU3dpdGNoQ2FzZSA9IFN3aXRjaENhc2U7XG5cdHZhciBTd2l0Y2hTdGF0ZW1lbnQgPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gU3dpdGNoU3RhdGVtZW50KGRpc2NyaW1pbmFudCwgY2FzZXMpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguU3dpdGNoU3RhdGVtZW50O1xuXHQgICAgICAgIHRoaXMuZGlzY3JpbWluYW50ID0gZGlzY3JpbWluYW50O1xuXHQgICAgICAgIHRoaXMuY2FzZXMgPSBjYXNlcztcblx0ICAgIH1cblx0ICAgIHJldHVybiBTd2l0Y2hTdGF0ZW1lbnQ7XG5cdH0oKSk7XG5cdGV4cG9ydHMuU3dpdGNoU3RhdGVtZW50ID0gU3dpdGNoU3RhdGVtZW50O1xuXHR2YXIgVGFnZ2VkVGVtcGxhdGVFeHByZXNzaW9uID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIFRhZ2dlZFRlbXBsYXRlRXhwcmVzc2lvbih0YWcsIHF1YXNpKSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0gc3ludGF4XzEuU3ludGF4LlRhZ2dlZFRlbXBsYXRlRXhwcmVzc2lvbjtcblx0ICAgICAgICB0aGlzLnRhZyA9IHRhZztcblx0ICAgICAgICB0aGlzLnF1YXNpID0gcXVhc2k7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gVGFnZ2VkVGVtcGxhdGVFeHByZXNzaW9uO1xuXHR9KCkpO1xuXHRleHBvcnRzLlRhZ2dlZFRlbXBsYXRlRXhwcmVzc2lvbiA9IFRhZ2dlZFRlbXBsYXRlRXhwcmVzc2lvbjtcblx0dmFyIFRlbXBsYXRlRWxlbWVudCA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBUZW1wbGF0ZUVsZW1lbnQodmFsdWUsIHRhaWwpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguVGVtcGxhdGVFbGVtZW50O1xuXHQgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcblx0ICAgICAgICB0aGlzLnRhaWwgPSB0YWlsO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIFRlbXBsYXRlRWxlbWVudDtcblx0fSgpKTtcblx0ZXhwb3J0cy5UZW1wbGF0ZUVsZW1lbnQgPSBUZW1wbGF0ZUVsZW1lbnQ7XG5cdHZhciBUZW1wbGF0ZUxpdGVyYWwgPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gVGVtcGxhdGVMaXRlcmFsKHF1YXNpcywgZXhwcmVzc2lvbnMpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguVGVtcGxhdGVMaXRlcmFsO1xuXHQgICAgICAgIHRoaXMucXVhc2lzID0gcXVhc2lzO1xuXHQgICAgICAgIHRoaXMuZXhwcmVzc2lvbnMgPSBleHByZXNzaW9ucztcblx0ICAgIH1cblx0ICAgIHJldHVybiBUZW1wbGF0ZUxpdGVyYWw7XG5cdH0oKSk7XG5cdGV4cG9ydHMuVGVtcGxhdGVMaXRlcmFsID0gVGVtcGxhdGVMaXRlcmFsO1xuXHR2YXIgVGhpc0V4cHJlc3Npb24gPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gVGhpc0V4cHJlc3Npb24oKSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0gc3ludGF4XzEuU3ludGF4LlRoaXNFeHByZXNzaW9uO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIFRoaXNFeHByZXNzaW9uO1xuXHR9KCkpO1xuXHRleHBvcnRzLlRoaXNFeHByZXNzaW9uID0gVGhpc0V4cHJlc3Npb247XG5cdHZhciBUaHJvd1N0YXRlbWVudCA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBUaHJvd1N0YXRlbWVudChhcmd1bWVudCkge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IHN5bnRheF8xLlN5bnRheC5UaHJvd1N0YXRlbWVudDtcblx0ICAgICAgICB0aGlzLmFyZ3VtZW50ID0gYXJndW1lbnQ7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gVGhyb3dTdGF0ZW1lbnQ7XG5cdH0oKSk7XG5cdGV4cG9ydHMuVGhyb3dTdGF0ZW1lbnQgPSBUaHJvd1N0YXRlbWVudDtcblx0dmFyIFRyeVN0YXRlbWVudCA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBUcnlTdGF0ZW1lbnQoYmxvY2ssIGhhbmRsZXIsIGZpbmFsaXplcikge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IHN5bnRheF8xLlN5bnRheC5UcnlTdGF0ZW1lbnQ7XG5cdCAgICAgICAgdGhpcy5ibG9jayA9IGJsb2NrO1xuXHQgICAgICAgIHRoaXMuaGFuZGxlciA9IGhhbmRsZXI7XG5cdCAgICAgICAgdGhpcy5maW5hbGl6ZXIgPSBmaW5hbGl6ZXI7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gVHJ5U3RhdGVtZW50O1xuXHR9KCkpO1xuXHRleHBvcnRzLlRyeVN0YXRlbWVudCA9IFRyeVN0YXRlbWVudDtcblx0dmFyIFVuYXJ5RXhwcmVzc2lvbiA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBVbmFyeUV4cHJlc3Npb24ob3BlcmF0b3IsIGFyZ3VtZW50KSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0gc3ludGF4XzEuU3ludGF4LlVuYXJ5RXhwcmVzc2lvbjtcblx0ICAgICAgICB0aGlzLm9wZXJhdG9yID0gb3BlcmF0b3I7XG5cdCAgICAgICAgdGhpcy5hcmd1bWVudCA9IGFyZ3VtZW50O1xuXHQgICAgICAgIHRoaXMucHJlZml4ID0gdHJ1ZTtcblx0ICAgIH1cblx0ICAgIHJldHVybiBVbmFyeUV4cHJlc3Npb247XG5cdH0oKSk7XG5cdGV4cG9ydHMuVW5hcnlFeHByZXNzaW9uID0gVW5hcnlFeHByZXNzaW9uO1xuXHR2YXIgVXBkYXRlRXhwcmVzc2lvbiA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBVcGRhdGVFeHByZXNzaW9uKG9wZXJhdG9yLCBhcmd1bWVudCwgcHJlZml4KSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0gc3ludGF4XzEuU3ludGF4LlVwZGF0ZUV4cHJlc3Npb247XG5cdCAgICAgICAgdGhpcy5vcGVyYXRvciA9IG9wZXJhdG9yO1xuXHQgICAgICAgIHRoaXMuYXJndW1lbnQgPSBhcmd1bWVudDtcblx0ICAgICAgICB0aGlzLnByZWZpeCA9IHByZWZpeDtcblx0ICAgIH1cblx0ICAgIHJldHVybiBVcGRhdGVFeHByZXNzaW9uO1xuXHR9KCkpO1xuXHRleHBvcnRzLlVwZGF0ZUV4cHJlc3Npb24gPSBVcGRhdGVFeHByZXNzaW9uO1xuXHR2YXIgVmFyaWFibGVEZWNsYXJhdGlvbiA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBWYXJpYWJsZURlY2xhcmF0aW9uKGRlY2xhcmF0aW9ucywga2luZCkge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IHN5bnRheF8xLlN5bnRheC5WYXJpYWJsZURlY2xhcmF0aW9uO1xuXHQgICAgICAgIHRoaXMuZGVjbGFyYXRpb25zID0gZGVjbGFyYXRpb25zO1xuXHQgICAgICAgIHRoaXMua2luZCA9IGtpbmQ7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gVmFyaWFibGVEZWNsYXJhdGlvbjtcblx0fSgpKTtcblx0ZXhwb3J0cy5WYXJpYWJsZURlY2xhcmF0aW9uID0gVmFyaWFibGVEZWNsYXJhdGlvbjtcblx0dmFyIFZhcmlhYmxlRGVjbGFyYXRvciA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBWYXJpYWJsZURlY2xhcmF0b3IoaWQsIGluaXQpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguVmFyaWFibGVEZWNsYXJhdG9yO1xuXHQgICAgICAgIHRoaXMuaWQgPSBpZDtcblx0ICAgICAgICB0aGlzLmluaXQgPSBpbml0O1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIFZhcmlhYmxlRGVjbGFyYXRvcjtcblx0fSgpKTtcblx0ZXhwb3J0cy5WYXJpYWJsZURlY2xhcmF0b3IgPSBWYXJpYWJsZURlY2xhcmF0b3I7XG5cdHZhciBXaGlsZVN0YXRlbWVudCA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBXaGlsZVN0YXRlbWVudCh0ZXN0LCBib2R5KSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0gc3ludGF4XzEuU3ludGF4LldoaWxlU3RhdGVtZW50O1xuXHQgICAgICAgIHRoaXMudGVzdCA9IHRlc3Q7XG5cdCAgICAgICAgdGhpcy5ib2R5ID0gYm9keTtcblx0ICAgIH1cblx0ICAgIHJldHVybiBXaGlsZVN0YXRlbWVudDtcblx0fSgpKTtcblx0ZXhwb3J0cy5XaGlsZVN0YXRlbWVudCA9IFdoaWxlU3RhdGVtZW50O1xuXHR2YXIgV2l0aFN0YXRlbWVudCA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBXaXRoU3RhdGVtZW50KG9iamVjdCwgYm9keSkge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IHN5bnRheF8xLlN5bnRheC5XaXRoU3RhdGVtZW50O1xuXHQgICAgICAgIHRoaXMub2JqZWN0ID0gb2JqZWN0O1xuXHQgICAgICAgIHRoaXMuYm9keSA9IGJvZHk7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gV2l0aFN0YXRlbWVudDtcblx0fSgpKTtcblx0ZXhwb3J0cy5XaXRoU3RhdGVtZW50ID0gV2l0aFN0YXRlbWVudDtcblx0dmFyIFlpZWxkRXhwcmVzc2lvbiA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBZaWVsZEV4cHJlc3Npb24oYXJndW1lbnQsIGRlbGVnYXRlKSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0gc3ludGF4XzEuU3ludGF4LllpZWxkRXhwcmVzc2lvbjtcblx0ICAgICAgICB0aGlzLmFyZ3VtZW50ID0gYXJndW1lbnQ7XG5cdCAgICAgICAgdGhpcy5kZWxlZ2F0ZSA9IGRlbGVnYXRlO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIFlpZWxkRXhwcmVzc2lvbjtcblx0fSgpKTtcblx0ZXhwb3J0cy5ZaWVsZEV4cHJlc3Npb24gPSBZaWVsZEV4cHJlc3Npb247XG5cblxuLyoqKi8gfSxcbi8qIDExICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHRcInVzZSBzdHJpY3RcIjtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5cdHZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcblx0ICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuXHQgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG5cdCAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG5cdH07XG5cdHZhciBjaGFyYWN0ZXJfMSA9IF9fd2VicGFja19yZXF1aXJlX18oOSk7XG5cdHZhciB0b2tlbl8xID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3KTtcblx0dmFyIHBhcnNlcl8xID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblx0dmFyIHhodG1sX2VudGl0aWVzXzEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEyKTtcblx0dmFyIGpzeF9zeW50YXhfMSA9IF9fd2VicGFja19yZXF1aXJlX18oMTMpO1xuXHR2YXIgTm9kZSA9IF9fd2VicGFja19yZXF1aXJlX18oMTApO1xuXHR2YXIgSlNYTm9kZSA9IF9fd2VicGFja19yZXF1aXJlX18oMTQpO1xuXHR2YXIgSlNYVG9rZW47XG5cdChmdW5jdGlvbiAoSlNYVG9rZW4pIHtcblx0ICAgIEpTWFRva2VuW0pTWFRva2VuW1wiSWRlbnRpZmllclwiXSA9IDEwMF0gPSBcIklkZW50aWZpZXJcIjtcblx0ICAgIEpTWFRva2VuW0pTWFRva2VuW1wiVGV4dFwiXSA9IDEwMV0gPSBcIlRleHRcIjtcblx0fSkoSlNYVG9rZW4gfHwgKEpTWFRva2VuID0ge30pKTtcblx0dG9rZW5fMS5Ub2tlbk5hbWVbSlNYVG9rZW4uSWRlbnRpZmllcl0gPSAnSlNYSWRlbnRpZmllcic7XG5cdHRva2VuXzEuVG9rZW5OYW1lW0pTWFRva2VuLlRleHRdID0gJ0pTWFRleHQnO1xuXHQvLyBGdWxseSBxdWFsaWZpZWQgZWxlbWVudCBuYW1lLCBlLmcuIDxzdmc6cGF0aD4gcmV0dXJucyBcInN2ZzpwYXRoXCJcblx0ZnVuY3Rpb24gZ2V0UXVhbGlmaWVkRWxlbWVudE5hbWUoZWxlbWVudE5hbWUpIHtcblx0ICAgIHZhciBxdWFsaWZpZWROYW1lO1xuXHQgICAgc3dpdGNoIChlbGVtZW50TmFtZS50eXBlKSB7XG5cdCAgICAgICAgY2FzZSBqc3hfc3ludGF4XzEuSlNYU3ludGF4LkpTWElkZW50aWZpZXI6XG5cdCAgICAgICAgICAgIHZhciBpZCA9IChlbGVtZW50TmFtZSk7XG5cdCAgICAgICAgICAgIHF1YWxpZmllZE5hbWUgPSBpZC5uYW1lO1xuXHQgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICBjYXNlIGpzeF9zeW50YXhfMS5KU1hTeW50YXguSlNYTmFtZXNwYWNlZE5hbWU6XG5cdCAgICAgICAgICAgIHZhciBucyA9IChlbGVtZW50TmFtZSk7XG5cdCAgICAgICAgICAgIHF1YWxpZmllZE5hbWUgPSBnZXRRdWFsaWZpZWRFbGVtZW50TmFtZShucy5uYW1lc3BhY2UpICsgJzonICtcblx0ICAgICAgICAgICAgICAgIGdldFF1YWxpZmllZEVsZW1lbnROYW1lKG5zLm5hbWUpO1xuXHQgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICBjYXNlIGpzeF9zeW50YXhfMS5KU1hTeW50YXguSlNYTWVtYmVyRXhwcmVzc2lvbjpcblx0ICAgICAgICAgICAgdmFyIGV4cHIgPSAoZWxlbWVudE5hbWUpO1xuXHQgICAgICAgICAgICBxdWFsaWZpZWROYW1lID0gZ2V0UXVhbGlmaWVkRWxlbWVudE5hbWUoZXhwci5vYmplY3QpICsgJy4nICtcblx0ICAgICAgICAgICAgICAgIGdldFF1YWxpZmllZEVsZW1lbnROYW1lKGV4cHIucHJvcGVydHkpO1xuXHQgICAgICAgICAgICBicmVhaztcblx0ICAgIH1cblx0ICAgIHJldHVybiBxdWFsaWZpZWROYW1lO1xuXHR9XG5cdHZhciBKU1hQYXJzZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuXHQgICAgX19leHRlbmRzKEpTWFBhcnNlciwgX3N1cGVyKTtcblx0ICAgIGZ1bmN0aW9uIEpTWFBhcnNlcihjb2RlLCBvcHRpb25zLCBkZWxlZ2F0ZSkge1xuXHQgICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIGNvZGUsIG9wdGlvbnMsIGRlbGVnYXRlKTtcblx0ICAgIH1cblx0ICAgIEpTWFBhcnNlci5wcm90b3R5cGUucGFyc2VQcmltYXJ5RXhwcmVzc2lvbiA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICByZXR1cm4gdGhpcy5tYXRjaCgnPCcpID8gdGhpcy5wYXJzZUpTWFJvb3QoKSA6IF9zdXBlci5wcm90b3R5cGUucGFyc2VQcmltYXJ5RXhwcmVzc2lvbi5jYWxsKHRoaXMpO1xuXHQgICAgfTtcblx0ICAgIEpTWFBhcnNlci5wcm90b3R5cGUuc3RhcnRKU1ggPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgLy8gVW53aW5kIHRoZSBzY2FubmVyIGJlZm9yZSB0aGUgbG9va2FoZWFkIHRva2VuLlxuXHQgICAgICAgIHRoaXMuc2Nhbm5lci5pbmRleCA9IHRoaXMuc3RhcnRNYXJrZXIuaW5kZXg7XG5cdCAgICAgICAgdGhpcy5zY2FubmVyLmxpbmVOdW1iZXIgPSB0aGlzLnN0YXJ0TWFya2VyLmxpbmVOdW1iZXI7XG5cdCAgICAgICAgdGhpcy5zY2FubmVyLmxpbmVTdGFydCA9IHRoaXMuc3RhcnRNYXJrZXIubGluZVN0YXJ0O1xuXHQgICAgfTtcblx0ICAgIEpTWFBhcnNlci5wcm90b3R5cGUuZmluaXNoSlNYID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIC8vIFByaW1lIHRoZSBuZXh0IGxvb2thaGVhZC5cblx0ICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgfTtcblx0ICAgIEpTWFBhcnNlci5wcm90b3R5cGUucmVlbnRlckpTWCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB0aGlzLnN0YXJ0SlNYKCk7XG5cdCAgICAgICAgdGhpcy5leHBlY3RKU1goJ30nKTtcblx0ICAgICAgICAvLyBQb3AgdGhlIGNsb3NpbmcgJ30nIGFkZGVkIGZyb20gdGhlIGxvb2thaGVhZC5cblx0ICAgICAgICBpZiAodGhpcy5jb25maWcudG9rZW5zKSB7XG5cdCAgICAgICAgICAgIHRoaXMudG9rZW5zLnBvcCgpO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cdCAgICBKU1hQYXJzZXIucHJvdG90eXBlLmNyZWF0ZUpTWE5vZGUgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdGhpcy5jb2xsZWN0Q29tbWVudHMoKTtcblx0ICAgICAgICByZXR1cm4ge1xuXHQgICAgICAgICAgICBpbmRleDogdGhpcy5zY2FubmVyLmluZGV4LFxuXHQgICAgICAgICAgICBsaW5lOiB0aGlzLnNjYW5uZXIubGluZU51bWJlcixcblx0ICAgICAgICAgICAgY29sdW1uOiB0aGlzLnNjYW5uZXIuaW5kZXggLSB0aGlzLnNjYW5uZXIubGluZVN0YXJ0XG5cdCAgICAgICAgfTtcblx0ICAgIH07XG5cdCAgICBKU1hQYXJzZXIucHJvdG90eXBlLmNyZWF0ZUpTWENoaWxkTm9kZSA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICByZXR1cm4ge1xuXHQgICAgICAgICAgICBpbmRleDogdGhpcy5zY2FubmVyLmluZGV4LFxuXHQgICAgICAgICAgICBsaW5lOiB0aGlzLnNjYW5uZXIubGluZU51bWJlcixcblx0ICAgICAgICAgICAgY29sdW1uOiB0aGlzLnNjYW5uZXIuaW5kZXggLSB0aGlzLnNjYW5uZXIubGluZVN0YXJ0XG5cdCAgICAgICAgfTtcblx0ICAgIH07XG5cdCAgICBKU1hQYXJzZXIucHJvdG90eXBlLnNjYW5YSFRNTEVudGl0eSA9IGZ1bmN0aW9uIChxdW90ZSkge1xuXHQgICAgICAgIHZhciByZXN1bHQgPSAnJic7XG5cdCAgICAgICAgdmFyIHZhbGlkID0gdHJ1ZTtcblx0ICAgICAgICB2YXIgdGVybWluYXRlZCA9IGZhbHNlO1xuXHQgICAgICAgIHZhciBudW1lcmljID0gZmFsc2U7XG5cdCAgICAgICAgdmFyIGhleCA9IGZhbHNlO1xuXHQgICAgICAgIHdoaWxlICghdGhpcy5zY2FubmVyLmVvZigpICYmIHZhbGlkICYmICF0ZXJtaW5hdGVkKSB7XG5cdCAgICAgICAgICAgIHZhciBjaCA9IHRoaXMuc2Nhbm5lci5zb3VyY2VbdGhpcy5zY2FubmVyLmluZGV4XTtcblx0ICAgICAgICAgICAgaWYgKGNoID09PSBxdW90ZSkge1xuXHQgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgdGVybWluYXRlZCA9IChjaCA9PT0gJzsnKTtcblx0ICAgICAgICAgICAgcmVzdWx0ICs9IGNoO1xuXHQgICAgICAgICAgICArK3RoaXMuc2Nhbm5lci5pbmRleDtcblx0ICAgICAgICAgICAgaWYgKCF0ZXJtaW5hdGVkKSB7XG5cdCAgICAgICAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcblx0ICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIC8vIGUuZy4gJyYjMTIzOydcblx0ICAgICAgICAgICAgICAgICAgICAgICAgbnVtZXJpYyA9IChjaCA9PT0gJyMnKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuXHQgICAgICAgICAgICAgICAgICAgICAgICBpZiAobnVtZXJpYykge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZS5nLiAnJiN4NDE7J1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGV4ID0gKGNoID09PSAneCcpO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWQgPSBoZXggfHwgY2hhcmFjdGVyXzEuQ2hhcmFjdGVyLmlzRGVjaW1hbERpZ2l0KGNoLmNoYXJDb2RlQXQoMCkpO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtZXJpYyA9IG51bWVyaWMgJiYgIWhleDtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuXHQgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZCA9IHZhbGlkICYmICEobnVtZXJpYyAmJiAhY2hhcmFjdGVyXzEuQ2hhcmFjdGVyLmlzRGVjaW1hbERpZ2l0KGNoLmNoYXJDb2RlQXQoMCkpKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWQgPSB2YWxpZCAmJiAhKGhleCAmJiAhY2hhcmFjdGVyXzEuQ2hhcmFjdGVyLmlzSGV4RGlnaXQoY2guY2hhckNvZGVBdCgwKSkpO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAodmFsaWQgJiYgdGVybWluYXRlZCAmJiByZXN1bHQubGVuZ3RoID4gMikge1xuXHQgICAgICAgICAgICAvLyBlLmcuICcmI3g0MTsnIGJlY29tZXMganVzdCAnI3g0MSdcblx0ICAgICAgICAgICAgdmFyIHN0ciA9IHJlc3VsdC5zdWJzdHIoMSwgcmVzdWx0Lmxlbmd0aCAtIDIpO1xuXHQgICAgICAgICAgICBpZiAobnVtZXJpYyAmJiBzdHIubGVuZ3RoID4gMSkge1xuXHQgICAgICAgICAgICAgICAgcmVzdWx0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShwYXJzZUludChzdHIuc3Vic3RyKDEpLCAxMCkpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2UgaWYgKGhleCAmJiBzdHIubGVuZ3RoID4gMikge1xuXHQgICAgICAgICAgICAgICAgcmVzdWx0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShwYXJzZUludCgnMCcgKyBzdHIuc3Vic3RyKDEpLCAxNikpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2UgaWYgKCFudW1lcmljICYmICFoZXggJiYgeGh0bWxfZW50aXRpZXNfMS5YSFRNTEVudGl0aWVzW3N0cl0pIHtcblx0ICAgICAgICAgICAgICAgIHJlc3VsdCA9IHhodG1sX2VudGl0aWVzXzEuWEhUTUxFbnRpdGllc1tzdHJdO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiByZXN1bHQ7XG5cdCAgICB9O1xuXHQgICAgLy8gU2NhbiB0aGUgbmV4dCBKU1ggdG9rZW4uIFRoaXMgcmVwbGFjZXMgU2Nhbm5lciNsZXggd2hlbiBpbiBKU1ggbW9kZS5cblx0ICAgIEpTWFBhcnNlci5wcm90b3R5cGUubGV4SlNYID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBjcCA9IHRoaXMuc2Nhbm5lci5zb3VyY2UuY2hhckNvZGVBdCh0aGlzLnNjYW5uZXIuaW5kZXgpO1xuXHQgICAgICAgIC8vIDwgPiAvIDogPSB7IH1cblx0ICAgICAgICBpZiAoY3AgPT09IDYwIHx8IGNwID09PSA2MiB8fCBjcCA9PT0gNDcgfHwgY3AgPT09IDU4IHx8IGNwID09PSA2MSB8fCBjcCA9PT0gMTIzIHx8IGNwID09PSAxMjUpIHtcblx0ICAgICAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5zY2FubmVyLnNvdXJjZVt0aGlzLnNjYW5uZXIuaW5kZXgrK107XG5cdCAgICAgICAgICAgIHJldHVybiB7XG5cdCAgICAgICAgICAgICAgICB0eXBlOiB0b2tlbl8xLlRva2VuLlB1bmN0dWF0b3IsXG5cdCAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG5cdCAgICAgICAgICAgICAgICBsaW5lTnVtYmVyOiB0aGlzLnNjYW5uZXIubGluZU51bWJlcixcblx0ICAgICAgICAgICAgICAgIGxpbmVTdGFydDogdGhpcy5zY2FubmVyLmxpbmVTdGFydCxcblx0ICAgICAgICAgICAgICAgIHN0YXJ0OiB0aGlzLnNjYW5uZXIuaW5kZXggLSAxLFxuXHQgICAgICAgICAgICAgICAgZW5kOiB0aGlzLnNjYW5uZXIuaW5kZXhcblx0ICAgICAgICAgICAgfTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgLy8gXCIgJ1xuXHQgICAgICAgIGlmIChjcCA9PT0gMzQgfHwgY3AgPT09IDM5KSB7XG5cdCAgICAgICAgICAgIHZhciBzdGFydCA9IHRoaXMuc2Nhbm5lci5pbmRleDtcblx0ICAgICAgICAgICAgdmFyIHF1b3RlID0gdGhpcy5zY2FubmVyLnNvdXJjZVt0aGlzLnNjYW5uZXIuaW5kZXgrK107XG5cdCAgICAgICAgICAgIHZhciBzdHIgPSAnJztcblx0ICAgICAgICAgICAgd2hpbGUgKCF0aGlzLnNjYW5uZXIuZW9mKCkpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBjaCA9IHRoaXMuc2Nhbm5lci5zb3VyY2VbdGhpcy5zY2FubmVyLmluZGV4KytdO1xuXHQgICAgICAgICAgICAgICAgaWYgKGNoID09PSBxdW90ZSkge1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgZWxzZSBpZiAoY2ggPT09ICcmJykge1xuXHQgICAgICAgICAgICAgICAgICAgIHN0ciArPSB0aGlzLnNjYW5YSFRNTEVudGl0eShxdW90ZSk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICBzdHIgKz0gY2g7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgcmV0dXJuIHtcblx0ICAgICAgICAgICAgICAgIHR5cGU6IHRva2VuXzEuVG9rZW4uU3RyaW5nTGl0ZXJhbCxcblx0ICAgICAgICAgICAgICAgIHZhbHVlOiBzdHIsXG5cdCAgICAgICAgICAgICAgICBsaW5lTnVtYmVyOiB0aGlzLnNjYW5uZXIubGluZU51bWJlcixcblx0ICAgICAgICAgICAgICAgIGxpbmVTdGFydDogdGhpcy5zY2FubmVyLmxpbmVTdGFydCxcblx0ICAgICAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcblx0ICAgICAgICAgICAgICAgIGVuZDogdGhpcy5zY2FubmVyLmluZGV4XG5cdCAgICAgICAgICAgIH07XG5cdCAgICAgICAgfVxuXHQgICAgICAgIC8vIC4uLiBvciAuXG5cdCAgICAgICAgaWYgKGNwID09PSA0Nikge1xuXHQgICAgICAgICAgICB2YXIgbjEgPSB0aGlzLnNjYW5uZXIuc291cmNlLmNoYXJDb2RlQXQodGhpcy5zY2FubmVyLmluZGV4ICsgMSk7XG5cdCAgICAgICAgICAgIHZhciBuMiA9IHRoaXMuc2Nhbm5lci5zb3VyY2UuY2hhckNvZGVBdCh0aGlzLnNjYW5uZXIuaW5kZXggKyAyKTtcblx0ICAgICAgICAgICAgdmFyIHZhbHVlID0gKG4xID09PSA0NiAmJiBuMiA9PT0gNDYpID8gJy4uLicgOiAnLic7XG5cdCAgICAgICAgICAgIHZhciBzdGFydCA9IHRoaXMuc2Nhbm5lci5pbmRleDtcblx0ICAgICAgICAgICAgdGhpcy5zY2FubmVyLmluZGV4ICs9IHZhbHVlLmxlbmd0aDtcblx0ICAgICAgICAgICAgcmV0dXJuIHtcblx0ICAgICAgICAgICAgICAgIHR5cGU6IHRva2VuXzEuVG9rZW4uUHVuY3R1YXRvcixcblx0ICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcblx0ICAgICAgICAgICAgICAgIGxpbmVOdW1iZXI6IHRoaXMuc2Nhbm5lci5saW5lTnVtYmVyLFxuXHQgICAgICAgICAgICAgICAgbGluZVN0YXJ0OiB0aGlzLnNjYW5uZXIubGluZVN0YXJ0LFxuXHQgICAgICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0LFxuXHQgICAgICAgICAgICAgICAgZW5kOiB0aGlzLnNjYW5uZXIuaW5kZXhcblx0ICAgICAgICAgICAgfTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgLy8gYFxuXHQgICAgICAgIGlmIChjcCA9PT0gOTYpIHtcblx0ICAgICAgICAgICAgLy8gT25seSBwbGFjZWhvbGRlciwgc2luY2UgaXQgd2lsbCBiZSByZXNjYW5uZWQgYXMgYSByZWFsIGFzc2lnbm1lbnQgZXhwcmVzc2lvbi5cblx0ICAgICAgICAgICAgcmV0dXJuIHtcblx0ICAgICAgICAgICAgICAgIHR5cGU6IHRva2VuXzEuVG9rZW4uVGVtcGxhdGUsXG5cdCAgICAgICAgICAgICAgICBsaW5lTnVtYmVyOiB0aGlzLnNjYW5uZXIubGluZU51bWJlcixcblx0ICAgICAgICAgICAgICAgIGxpbmVTdGFydDogdGhpcy5zY2FubmVyLmxpbmVTdGFydCxcblx0ICAgICAgICAgICAgICAgIHN0YXJ0OiB0aGlzLnNjYW5uZXIuaW5kZXgsXG5cdCAgICAgICAgICAgICAgICBlbmQ6IHRoaXMuc2Nhbm5lci5pbmRleFxuXHQgICAgICAgICAgICB9O1xuXHQgICAgICAgIH1cblx0ICAgICAgICAvLyBJZGVudGlmZXIgY2FuIG5vdCBjb250YWluIGJhY2tzbGFzaCAoY2hhciBjb2RlIDkyKS5cblx0ICAgICAgICBpZiAoY2hhcmFjdGVyXzEuQ2hhcmFjdGVyLmlzSWRlbnRpZmllclN0YXJ0KGNwKSAmJiAoY3AgIT09IDkyKSkge1xuXHQgICAgICAgICAgICB2YXIgc3RhcnQgPSB0aGlzLnNjYW5uZXIuaW5kZXg7XG5cdCAgICAgICAgICAgICsrdGhpcy5zY2FubmVyLmluZGV4O1xuXHQgICAgICAgICAgICB3aGlsZSAoIXRoaXMuc2Nhbm5lci5lb2YoKSkge1xuXHQgICAgICAgICAgICAgICAgdmFyIGNoID0gdGhpcy5zY2FubmVyLnNvdXJjZS5jaGFyQ29kZUF0KHRoaXMuc2Nhbm5lci5pbmRleCk7XG5cdCAgICAgICAgICAgICAgICBpZiAoY2hhcmFjdGVyXzEuQ2hhcmFjdGVyLmlzSWRlbnRpZmllclBhcnQoY2gpICYmIChjaCAhPT0gOTIpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgKyt0aGlzLnNjYW5uZXIuaW5kZXg7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBlbHNlIGlmIChjaCA9PT0gNDUpIHtcblx0ICAgICAgICAgICAgICAgICAgICAvLyBIeXBoZW4gKGNoYXIgY29kZSA0NSkgY2FuIGJlIHBhcnQgb2YgYW4gaWRlbnRpZmllci5cblx0ICAgICAgICAgICAgICAgICAgICArK3RoaXMuc2Nhbm5lci5pbmRleDtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHZhciBpZCA9IHRoaXMuc2Nhbm5lci5zb3VyY2Uuc2xpY2Uoc3RhcnQsIHRoaXMuc2Nhbm5lci5pbmRleCk7XG5cdCAgICAgICAgICAgIHJldHVybiB7XG5cdCAgICAgICAgICAgICAgICB0eXBlOiBKU1hUb2tlbi5JZGVudGlmaWVyLFxuXHQgICAgICAgICAgICAgICAgdmFsdWU6IGlkLFxuXHQgICAgICAgICAgICAgICAgbGluZU51bWJlcjogdGhpcy5zY2FubmVyLmxpbmVOdW1iZXIsXG5cdCAgICAgICAgICAgICAgICBsaW5lU3RhcnQ6IHRoaXMuc2Nhbm5lci5saW5lU3RhcnQsXG5cdCAgICAgICAgICAgICAgICBzdGFydDogc3RhcnQsXG5cdCAgICAgICAgICAgICAgICBlbmQ6IHRoaXMuc2Nhbm5lci5pbmRleFxuXHQgICAgICAgICAgICB9O1xuXHQgICAgICAgIH1cblx0ICAgICAgICB0aGlzLnNjYW5uZXIudGhyb3dVbmV4cGVjdGVkVG9rZW4oKTtcblx0ICAgIH07XG5cdCAgICBKU1hQYXJzZXIucHJvdG90eXBlLm5leHRKU1hUb2tlbiA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB0aGlzLmNvbGxlY3RDb21tZW50cygpO1xuXHQgICAgICAgIHRoaXMuc3RhcnRNYXJrZXIuaW5kZXggPSB0aGlzLnNjYW5uZXIuaW5kZXg7XG5cdCAgICAgICAgdGhpcy5zdGFydE1hcmtlci5saW5lTnVtYmVyID0gdGhpcy5zY2FubmVyLmxpbmVOdW1iZXI7XG5cdCAgICAgICAgdGhpcy5zdGFydE1hcmtlci5saW5lU3RhcnQgPSB0aGlzLnNjYW5uZXIubGluZVN0YXJ0O1xuXHQgICAgICAgIHZhciB0b2tlbiA9IHRoaXMubGV4SlNYKCk7XG5cdCAgICAgICAgdGhpcy5sYXN0TWFya2VyLmluZGV4ID0gdGhpcy5zY2FubmVyLmluZGV4O1xuXHQgICAgICAgIHRoaXMubGFzdE1hcmtlci5saW5lTnVtYmVyID0gdGhpcy5zY2FubmVyLmxpbmVOdW1iZXI7XG5cdCAgICAgICAgdGhpcy5sYXN0TWFya2VyLmxpbmVTdGFydCA9IHRoaXMuc2Nhbm5lci5saW5lU3RhcnQ7XG5cdCAgICAgICAgaWYgKHRoaXMuY29uZmlnLnRva2Vucykge1xuXHQgICAgICAgICAgICB0aGlzLnRva2Vucy5wdXNoKHRoaXMuY29udmVydFRva2VuKHRva2VuKSk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiB0b2tlbjtcblx0ICAgIH07XG5cdCAgICBKU1hQYXJzZXIucHJvdG90eXBlLm5leHRKU1hUZXh0ID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHRoaXMuc3RhcnRNYXJrZXIuaW5kZXggPSB0aGlzLnNjYW5uZXIuaW5kZXg7XG5cdCAgICAgICAgdGhpcy5zdGFydE1hcmtlci5saW5lTnVtYmVyID0gdGhpcy5zY2FubmVyLmxpbmVOdW1iZXI7XG5cdCAgICAgICAgdGhpcy5zdGFydE1hcmtlci5saW5lU3RhcnQgPSB0aGlzLnNjYW5uZXIubGluZVN0YXJ0O1xuXHQgICAgICAgIHZhciBzdGFydCA9IHRoaXMuc2Nhbm5lci5pbmRleDtcblx0ICAgICAgICB2YXIgdGV4dCA9ICcnO1xuXHQgICAgICAgIHdoaWxlICghdGhpcy5zY2FubmVyLmVvZigpKSB7XG5cdCAgICAgICAgICAgIHZhciBjaCA9IHRoaXMuc2Nhbm5lci5zb3VyY2VbdGhpcy5zY2FubmVyLmluZGV4XTtcblx0ICAgICAgICAgICAgaWYgKGNoID09PSAneycgfHwgY2ggPT09ICc8Jykge1xuXHQgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgKyt0aGlzLnNjYW5uZXIuaW5kZXg7XG5cdCAgICAgICAgICAgIHRleHQgKz0gY2g7XG5cdCAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfMS5DaGFyYWN0ZXIuaXNMaW5lVGVybWluYXRvcihjaC5jaGFyQ29kZUF0KDApKSkge1xuXHQgICAgICAgICAgICAgICAgKyt0aGlzLnNjYW5uZXIubGluZU51bWJlcjtcblx0ICAgICAgICAgICAgICAgIGlmIChjaCA9PT0gJ1xccicgJiYgdGhpcy5zY2FubmVyLnNvdXJjZVt0aGlzLnNjYW5uZXIuaW5kZXhdID09PSAnXFxuJykge1xuXHQgICAgICAgICAgICAgICAgICAgICsrdGhpcy5zY2FubmVyLmluZGV4O1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgdGhpcy5zY2FubmVyLmxpbmVTdGFydCA9IHRoaXMuc2Nhbm5lci5pbmRleDtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICB0aGlzLmxhc3RNYXJrZXIuaW5kZXggPSB0aGlzLnNjYW5uZXIuaW5kZXg7XG5cdCAgICAgICAgdGhpcy5sYXN0TWFya2VyLmxpbmVOdW1iZXIgPSB0aGlzLnNjYW5uZXIubGluZU51bWJlcjtcblx0ICAgICAgICB0aGlzLmxhc3RNYXJrZXIubGluZVN0YXJ0ID0gdGhpcy5zY2FubmVyLmxpbmVTdGFydDtcblx0ICAgICAgICB2YXIgdG9rZW4gPSB7XG5cdCAgICAgICAgICAgIHR5cGU6IEpTWFRva2VuLlRleHQsXG5cdCAgICAgICAgICAgIHZhbHVlOiB0ZXh0LFxuXHQgICAgICAgICAgICBsaW5lTnVtYmVyOiB0aGlzLnNjYW5uZXIubGluZU51bWJlcixcblx0ICAgICAgICAgICAgbGluZVN0YXJ0OiB0aGlzLnNjYW5uZXIubGluZVN0YXJ0LFxuXHQgICAgICAgICAgICBzdGFydDogc3RhcnQsXG5cdCAgICAgICAgICAgIGVuZDogdGhpcy5zY2FubmVyLmluZGV4XG5cdCAgICAgICAgfTtcblx0ICAgICAgICBpZiAoKHRleHQubGVuZ3RoID4gMCkgJiYgdGhpcy5jb25maWcudG9rZW5zKSB7XG5cdCAgICAgICAgICAgIHRoaXMudG9rZW5zLnB1c2godGhpcy5jb252ZXJ0VG9rZW4odG9rZW4pKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHRva2VuO1xuXHQgICAgfTtcblx0ICAgIEpTWFBhcnNlci5wcm90b3R5cGUucGVla0pTWFRva2VuID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBwcmV2aW91c0luZGV4ID0gdGhpcy5zY2FubmVyLmluZGV4O1xuXHQgICAgICAgIHZhciBwcmV2aW91c0xpbmVOdW1iZXIgPSB0aGlzLnNjYW5uZXIubGluZU51bWJlcjtcblx0ICAgICAgICB2YXIgcHJldmlvdXNMaW5lU3RhcnQgPSB0aGlzLnNjYW5uZXIubGluZVN0YXJ0O1xuXHQgICAgICAgIHRoaXMuc2Nhbm5lci5zY2FuQ29tbWVudHMoKTtcblx0ICAgICAgICB2YXIgbmV4dCA9IHRoaXMubGV4SlNYKCk7XG5cdCAgICAgICAgdGhpcy5zY2FubmVyLmluZGV4ID0gcHJldmlvdXNJbmRleDtcblx0ICAgICAgICB0aGlzLnNjYW5uZXIubGluZU51bWJlciA9IHByZXZpb3VzTGluZU51bWJlcjtcblx0ICAgICAgICB0aGlzLnNjYW5uZXIubGluZVN0YXJ0ID0gcHJldmlvdXNMaW5lU3RhcnQ7XG5cdCAgICAgICAgcmV0dXJuIG5leHQ7XG5cdCAgICB9O1xuXHQgICAgLy8gRXhwZWN0IHRoZSBuZXh0IEpTWCB0b2tlbiB0byBtYXRjaCB0aGUgc3BlY2lmaWVkIHB1bmN0dWF0b3IuXG5cdCAgICAvLyBJZiBub3QsIGFuIGV4Y2VwdGlvbiB3aWxsIGJlIHRocm93bi5cblx0ICAgIEpTWFBhcnNlci5wcm90b3R5cGUuZXhwZWN0SlNYID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdCAgICAgICAgdmFyIHRva2VuID0gdGhpcy5uZXh0SlNYVG9rZW4oKTtcblx0ICAgICAgICBpZiAodG9rZW4udHlwZSAhPT0gdG9rZW5fMS5Ub2tlbi5QdW5jdHVhdG9yIHx8IHRva2VuLnZhbHVlICE9PSB2YWx1ZSkge1xuXHQgICAgICAgICAgICB0aGlzLnRocm93VW5leHBlY3RlZFRva2VuKHRva2VuKTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXHQgICAgLy8gUmV0dXJuIHRydWUgaWYgdGhlIG5leHQgSlNYIHRva2VuIG1hdGNoZXMgdGhlIHNwZWNpZmllZCBwdW5jdHVhdG9yLlxuXHQgICAgSlNYUGFyc2VyLnByb3RvdHlwZS5tYXRjaEpTWCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHQgICAgICAgIHZhciBuZXh0ID0gdGhpcy5wZWVrSlNYVG9rZW4oKTtcblx0ICAgICAgICByZXR1cm4gbmV4dC50eXBlID09PSB0b2tlbl8xLlRva2VuLlB1bmN0dWF0b3IgJiYgbmV4dC52YWx1ZSA9PT0gdmFsdWU7XG5cdCAgICB9O1xuXHQgICAgSlNYUGFyc2VyLnByb3RvdHlwZS5wYXJzZUpTWElkZW50aWZpZXIgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZUpTWE5vZGUoKTtcblx0ICAgICAgICB2YXIgdG9rZW4gPSB0aGlzLm5leHRKU1hUb2tlbigpO1xuXHQgICAgICAgIGlmICh0b2tlbi50eXBlICE9PSBKU1hUb2tlbi5JZGVudGlmaWVyKSB7XG5cdCAgICAgICAgICAgIHRoaXMudGhyb3dVbmV4cGVjdGVkVG9rZW4odG9rZW4pO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgSlNYTm9kZS5KU1hJZGVudGlmaWVyKHRva2VuLnZhbHVlKSk7XG5cdCAgICB9O1xuXHQgICAgSlNYUGFyc2VyLnByb3RvdHlwZS5wYXJzZUpTWEVsZW1lbnROYW1lID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVKU1hOb2RlKCk7XG5cdCAgICAgICAgdmFyIGVsZW1lbnROYW1lID0gdGhpcy5wYXJzZUpTWElkZW50aWZpZXIoKTtcblx0ICAgICAgICBpZiAodGhpcy5tYXRjaEpTWCgnOicpKSB7XG5cdCAgICAgICAgICAgIHZhciBuYW1lc3BhY2UgPSBlbGVtZW50TmFtZTtcblx0ICAgICAgICAgICAgdGhpcy5leHBlY3RKU1goJzonKTtcblx0ICAgICAgICAgICAgdmFyIG5hbWVfMSA9IHRoaXMucGFyc2VKU1hJZGVudGlmaWVyKCk7XG5cdCAgICAgICAgICAgIGVsZW1lbnROYW1lID0gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgSlNYTm9kZS5KU1hOYW1lc3BhY2VkTmFtZShuYW1lc3BhY2UsIG5hbWVfMSkpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIGlmICh0aGlzLm1hdGNoSlNYKCcuJykpIHtcblx0ICAgICAgICAgICAgd2hpbGUgKHRoaXMubWF0Y2hKU1goJy4nKSkge1xuXHQgICAgICAgICAgICAgICAgdmFyIG9iamVjdCA9IGVsZW1lbnROYW1lO1xuXHQgICAgICAgICAgICAgICAgdGhpcy5leHBlY3RKU1goJy4nKTtcblx0ICAgICAgICAgICAgICAgIHZhciBwcm9wZXJ0eSA9IHRoaXMucGFyc2VKU1hJZGVudGlmaWVyKCk7XG5cdCAgICAgICAgICAgICAgICBlbGVtZW50TmFtZSA9IHRoaXMuZmluYWxpemUobm9kZSwgbmV3IEpTWE5vZGUuSlNYTWVtYmVyRXhwcmVzc2lvbihvYmplY3QsIHByb3BlcnR5KSk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIGVsZW1lbnROYW1lO1xuXHQgICAgfTtcblx0ICAgIEpTWFBhcnNlci5wcm90b3R5cGUucGFyc2VKU1hBdHRyaWJ1dGVOYW1lID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVKU1hOb2RlKCk7XG5cdCAgICAgICAgdmFyIGF0dHJpYnV0ZU5hbWU7XG5cdCAgICAgICAgdmFyIGlkZW50aWZpZXIgPSB0aGlzLnBhcnNlSlNYSWRlbnRpZmllcigpO1xuXHQgICAgICAgIGlmICh0aGlzLm1hdGNoSlNYKCc6JykpIHtcblx0ICAgICAgICAgICAgdmFyIG5hbWVzcGFjZSA9IGlkZW50aWZpZXI7XG5cdCAgICAgICAgICAgIHRoaXMuZXhwZWN0SlNYKCc6Jyk7XG5cdCAgICAgICAgICAgIHZhciBuYW1lXzIgPSB0aGlzLnBhcnNlSlNYSWRlbnRpZmllcigpO1xuXHQgICAgICAgICAgICBhdHRyaWJ1dGVOYW1lID0gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgSlNYTm9kZS5KU1hOYW1lc3BhY2VkTmFtZShuYW1lc3BhY2UsIG5hbWVfMikpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgYXR0cmlidXRlTmFtZSA9IGlkZW50aWZpZXI7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiBhdHRyaWJ1dGVOYW1lO1xuXHQgICAgfTtcblx0ICAgIEpTWFBhcnNlci5wcm90b3R5cGUucGFyc2VKU1hTdHJpbmdMaXRlcmFsQXR0cmlidXRlID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVKU1hOb2RlKCk7XG5cdCAgICAgICAgdmFyIHRva2VuID0gdGhpcy5uZXh0SlNYVG9rZW4oKTtcblx0ICAgICAgICBpZiAodG9rZW4udHlwZSAhPT0gdG9rZW5fMS5Ub2tlbi5TdHJpbmdMaXRlcmFsKSB7XG5cdCAgICAgICAgICAgIHRoaXMudGhyb3dVbmV4cGVjdGVkVG9rZW4odG9rZW4pO1xuXHQgICAgICAgIH1cblx0ICAgICAgICB2YXIgcmF3ID0gdGhpcy5nZXRUb2tlblJhdyh0b2tlbik7XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuTGl0ZXJhbCh0b2tlbi52YWx1ZSwgcmF3KSk7XG5cdCAgICB9O1xuXHQgICAgSlNYUGFyc2VyLnByb3RvdHlwZS5wYXJzZUpTWEV4cHJlc3Npb25BdHRyaWJ1dGUgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZUpTWE5vZGUoKTtcblx0ICAgICAgICB0aGlzLmV4cGVjdEpTWCgneycpO1xuXHQgICAgICAgIHRoaXMuZmluaXNoSlNYKCk7XG5cdCAgICAgICAgaWYgKHRoaXMubWF0Y2goJ30nKSkge1xuXHQgICAgICAgICAgICB0aGlzLnRvbGVyYXRlRXJyb3IoJ0pTWCBhdHRyaWJ1dGVzIG11c3Qgb25seSBiZSBhc3NpZ25lZCBhIG5vbi1lbXB0eSBleHByZXNzaW9uJyk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHZhciBleHByZXNzaW9uID0gdGhpcy5wYXJzZUFzc2lnbm1lbnRFeHByZXNzaW9uKCk7XG5cdCAgICAgICAgdGhpcy5yZWVudGVySlNYKCk7XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuZmluYWxpemUobm9kZSwgbmV3IEpTWE5vZGUuSlNYRXhwcmVzc2lvbkNvbnRhaW5lcihleHByZXNzaW9uKSk7XG5cdCAgICB9O1xuXHQgICAgSlNYUGFyc2VyLnByb3RvdHlwZS5wYXJzZUpTWEF0dHJpYnV0ZVZhbHVlID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHJldHVybiB0aGlzLm1hdGNoSlNYKCd7JykgPyB0aGlzLnBhcnNlSlNYRXhwcmVzc2lvbkF0dHJpYnV0ZSgpIDpcblx0ICAgICAgICAgICAgdGhpcy5tYXRjaEpTWCgnPCcpID8gdGhpcy5wYXJzZUpTWEVsZW1lbnQoKSA6IHRoaXMucGFyc2VKU1hTdHJpbmdMaXRlcmFsQXR0cmlidXRlKCk7XG5cdCAgICB9O1xuXHQgICAgSlNYUGFyc2VyLnByb3RvdHlwZS5wYXJzZUpTWE5hbWVWYWx1ZUF0dHJpYnV0ZSA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgbm9kZSA9IHRoaXMuY3JlYXRlSlNYTm9kZSgpO1xuXHQgICAgICAgIHZhciBuYW1lID0gdGhpcy5wYXJzZUpTWEF0dHJpYnV0ZU5hbWUoKTtcblx0ICAgICAgICB2YXIgdmFsdWUgPSBudWxsO1xuXHQgICAgICAgIGlmICh0aGlzLm1hdGNoSlNYKCc9JykpIHtcblx0ICAgICAgICAgICAgdGhpcy5leHBlY3RKU1goJz0nKTtcblx0ICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnBhcnNlSlNYQXR0cmlidXRlVmFsdWUoKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuZmluYWxpemUobm9kZSwgbmV3IEpTWE5vZGUuSlNYQXR0cmlidXRlKG5hbWUsIHZhbHVlKSk7XG5cdCAgICB9O1xuXHQgICAgSlNYUGFyc2VyLnByb3RvdHlwZS5wYXJzZUpTWFNwcmVhZEF0dHJpYnV0ZSA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgbm9kZSA9IHRoaXMuY3JlYXRlSlNYTm9kZSgpO1xuXHQgICAgICAgIHRoaXMuZXhwZWN0SlNYKCd7Jyk7XG5cdCAgICAgICAgdGhpcy5leHBlY3RKU1goJy4uLicpO1xuXHQgICAgICAgIHRoaXMuZmluaXNoSlNYKCk7XG5cdCAgICAgICAgdmFyIGFyZ3VtZW50ID0gdGhpcy5wYXJzZUFzc2lnbm1lbnRFeHByZXNzaW9uKCk7XG5cdCAgICAgICAgdGhpcy5yZWVudGVySlNYKCk7XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuZmluYWxpemUobm9kZSwgbmV3IEpTWE5vZGUuSlNYU3ByZWFkQXR0cmlidXRlKGFyZ3VtZW50KSk7XG5cdCAgICB9O1xuXHQgICAgSlNYUGFyc2VyLnByb3RvdHlwZS5wYXJzZUpTWEF0dHJpYnV0ZXMgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIGF0dHJpYnV0ZXMgPSBbXTtcblx0ICAgICAgICB3aGlsZSAoIXRoaXMubWF0Y2hKU1goJy8nKSAmJiAhdGhpcy5tYXRjaEpTWCgnPicpKSB7XG5cdCAgICAgICAgICAgIHZhciBhdHRyaWJ1dGUgPSB0aGlzLm1hdGNoSlNYKCd7JykgPyB0aGlzLnBhcnNlSlNYU3ByZWFkQXR0cmlidXRlKCkgOlxuXHQgICAgICAgICAgICAgICAgdGhpcy5wYXJzZUpTWE5hbWVWYWx1ZUF0dHJpYnV0ZSgpO1xuXHQgICAgICAgICAgICBhdHRyaWJ1dGVzLnB1c2goYXR0cmlidXRlKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIGF0dHJpYnV0ZXM7XG5cdCAgICB9O1xuXHQgICAgSlNYUGFyc2VyLnByb3RvdHlwZS5wYXJzZUpTWE9wZW5pbmdFbGVtZW50ID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVKU1hOb2RlKCk7XG5cdCAgICAgICAgdGhpcy5leHBlY3RKU1goJzwnKTtcblx0ICAgICAgICB2YXIgbmFtZSA9IHRoaXMucGFyc2VKU1hFbGVtZW50TmFtZSgpO1xuXHQgICAgICAgIHZhciBhdHRyaWJ1dGVzID0gdGhpcy5wYXJzZUpTWEF0dHJpYnV0ZXMoKTtcblx0ICAgICAgICB2YXIgc2VsZkNsb3NpbmcgPSB0aGlzLm1hdGNoSlNYKCcvJyk7XG5cdCAgICAgICAgaWYgKHNlbGZDbG9zaW5nKSB7XG5cdCAgICAgICAgICAgIHRoaXMuZXhwZWN0SlNYKCcvJyk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHRoaXMuZXhwZWN0SlNYKCc+Jyk7XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuZmluYWxpemUobm9kZSwgbmV3IEpTWE5vZGUuSlNYT3BlbmluZ0VsZW1lbnQobmFtZSwgc2VsZkNsb3NpbmcsIGF0dHJpYnV0ZXMpKTtcblx0ICAgIH07XG5cdCAgICBKU1hQYXJzZXIucHJvdG90eXBlLnBhcnNlSlNYQm91bmRhcnlFbGVtZW50ID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVKU1hOb2RlKCk7XG5cdCAgICAgICAgdGhpcy5leHBlY3RKU1goJzwnKTtcblx0ICAgICAgICBpZiAodGhpcy5tYXRjaEpTWCgnLycpKSB7XG5cdCAgICAgICAgICAgIHRoaXMuZXhwZWN0SlNYKCcvJyk7XG5cdCAgICAgICAgICAgIHZhciBuYW1lXzMgPSB0aGlzLnBhcnNlSlNYRWxlbWVudE5hbWUoKTtcblx0ICAgICAgICAgICAgdGhpcy5leHBlY3RKU1goJz4nKTtcblx0ICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmluYWxpemUobm9kZSwgbmV3IEpTWE5vZGUuSlNYQ2xvc2luZ0VsZW1lbnQobmFtZV8zKSk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHZhciBuYW1lID0gdGhpcy5wYXJzZUpTWEVsZW1lbnROYW1lKCk7XG5cdCAgICAgICAgdmFyIGF0dHJpYnV0ZXMgPSB0aGlzLnBhcnNlSlNYQXR0cmlidXRlcygpO1xuXHQgICAgICAgIHZhciBzZWxmQ2xvc2luZyA9IHRoaXMubWF0Y2hKU1goJy8nKTtcblx0ICAgICAgICBpZiAoc2VsZkNsb3NpbmcpIHtcblx0ICAgICAgICAgICAgdGhpcy5leHBlY3RKU1goJy8nKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgdGhpcy5leHBlY3RKU1goJz4nKTtcblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgSlNYTm9kZS5KU1hPcGVuaW5nRWxlbWVudChuYW1lLCBzZWxmQ2xvc2luZywgYXR0cmlidXRlcykpO1xuXHQgICAgfTtcblx0ICAgIEpTWFBhcnNlci5wcm90b3R5cGUucGFyc2VKU1hFbXB0eUV4cHJlc3Npb24gPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZUpTWENoaWxkTm9kZSgpO1xuXHQgICAgICAgIHRoaXMuY29sbGVjdENvbW1lbnRzKCk7XG5cdCAgICAgICAgdGhpcy5sYXN0TWFya2VyLmluZGV4ID0gdGhpcy5zY2FubmVyLmluZGV4O1xuXHQgICAgICAgIHRoaXMubGFzdE1hcmtlci5saW5lTnVtYmVyID0gdGhpcy5zY2FubmVyLmxpbmVOdW1iZXI7XG5cdCAgICAgICAgdGhpcy5sYXN0TWFya2VyLmxpbmVTdGFydCA9IHRoaXMuc2Nhbm5lci5saW5lU3RhcnQ7XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuZmluYWxpemUobm9kZSwgbmV3IEpTWE5vZGUuSlNYRW1wdHlFeHByZXNzaW9uKCkpO1xuXHQgICAgfTtcblx0ICAgIEpTWFBhcnNlci5wcm90b3R5cGUucGFyc2VKU1hFeHByZXNzaW9uQ29udGFpbmVyID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVKU1hOb2RlKCk7XG5cdCAgICAgICAgdGhpcy5leHBlY3RKU1goJ3snKTtcblx0ICAgICAgICB2YXIgZXhwcmVzc2lvbjtcblx0ICAgICAgICBpZiAodGhpcy5tYXRjaEpTWCgnfScpKSB7XG5cdCAgICAgICAgICAgIGV4cHJlc3Npb24gPSB0aGlzLnBhcnNlSlNYRW1wdHlFeHByZXNzaW9uKCk7XG5cdCAgICAgICAgICAgIHRoaXMuZXhwZWN0SlNYKCd9Jyk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICB0aGlzLmZpbmlzaEpTWCgpO1xuXHQgICAgICAgICAgICBleHByZXNzaW9uID0gdGhpcy5wYXJzZUFzc2lnbm1lbnRFeHByZXNzaW9uKCk7XG5cdCAgICAgICAgICAgIHRoaXMucmVlbnRlckpTWCgpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgSlNYTm9kZS5KU1hFeHByZXNzaW9uQ29udGFpbmVyKGV4cHJlc3Npb24pKTtcblx0ICAgIH07XG5cdCAgICBKU1hQYXJzZXIucHJvdG90eXBlLnBhcnNlSlNYQ2hpbGRyZW4gPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIGNoaWxkcmVuID0gW107XG5cdCAgICAgICAgd2hpbGUgKCF0aGlzLnNjYW5uZXIuZW9mKCkpIHtcblx0ICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZUpTWENoaWxkTm9kZSgpO1xuXHQgICAgICAgICAgICB2YXIgdG9rZW4gPSB0aGlzLm5leHRKU1hUZXh0KCk7XG5cdCAgICAgICAgICAgIGlmICh0b2tlbi5zdGFydCA8IHRva2VuLmVuZCkge1xuXHQgICAgICAgICAgICAgICAgdmFyIHJhdyA9IHRoaXMuZ2V0VG9rZW5SYXcodG9rZW4pO1xuXHQgICAgICAgICAgICAgICAgdmFyIGNoaWxkID0gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgSlNYTm9kZS5KU1hUZXh0KHRva2VuLnZhbHVlLCByYXcpKTtcblx0ICAgICAgICAgICAgICAgIGNoaWxkcmVuLnB1c2goY2hpbGQpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGlmICh0aGlzLnNjYW5uZXIuc291cmNlW3RoaXMuc2Nhbm5lci5pbmRleF0gPT09ICd7Jykge1xuXHQgICAgICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9IHRoaXMucGFyc2VKU1hFeHByZXNzaW9uQ29udGFpbmVyKCk7XG5cdCAgICAgICAgICAgICAgICBjaGlsZHJlbi5wdXNoKGNvbnRhaW5lcik7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gY2hpbGRyZW47XG5cdCAgICB9O1xuXHQgICAgSlNYUGFyc2VyLnByb3RvdHlwZS5wYXJzZUNvbXBsZXhKU1hFbGVtZW50ID0gZnVuY3Rpb24gKGVsKSB7XG5cdCAgICAgICAgdmFyIHN0YWNrID0gW107XG5cdCAgICAgICAgd2hpbGUgKCF0aGlzLnNjYW5uZXIuZW9mKCkpIHtcblx0ICAgICAgICAgICAgZWwuY2hpbGRyZW4gPSBlbC5jaGlsZHJlbi5jb25jYXQodGhpcy5wYXJzZUpTWENoaWxkcmVuKCkpO1xuXHQgICAgICAgICAgICB2YXIgbm9kZSA9IHRoaXMuY3JlYXRlSlNYQ2hpbGROb2RlKCk7XG5cdCAgICAgICAgICAgIHZhciBlbGVtZW50ID0gdGhpcy5wYXJzZUpTWEJvdW5kYXJ5RWxlbWVudCgpO1xuXHQgICAgICAgICAgICBpZiAoZWxlbWVudC50eXBlID09PSBqc3hfc3ludGF4XzEuSlNYU3ludGF4LkpTWE9wZW5pbmdFbGVtZW50KSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgb3BlbmluZyA9IChlbGVtZW50KTtcblx0ICAgICAgICAgICAgICAgIGlmIChvcGVuaW5nLnNlbGZDbG9zaW5nKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGNoaWxkID0gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgSlNYTm9kZS5KU1hFbGVtZW50KG9wZW5pbmcsIFtdLCBudWxsKSk7XG5cdCAgICAgICAgICAgICAgICAgICAgZWwuY2hpbGRyZW4ucHVzaChjaGlsZCk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICBzdGFjay5wdXNoKGVsKTtcblx0ICAgICAgICAgICAgICAgICAgICBlbCA9IHsgbm9kZTogbm9kZSwgb3BlbmluZzogb3BlbmluZywgY2xvc2luZzogbnVsbCwgY2hpbGRyZW46IFtdIH07XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgaWYgKGVsZW1lbnQudHlwZSA9PT0ganN4X3N5bnRheF8xLkpTWFN5bnRheC5KU1hDbG9zaW5nRWxlbWVudCkge1xuXHQgICAgICAgICAgICAgICAgZWwuY2xvc2luZyA9IChlbGVtZW50KTtcblx0ICAgICAgICAgICAgICAgIHZhciBvcGVuXzEgPSBnZXRRdWFsaWZpZWRFbGVtZW50TmFtZShlbC5vcGVuaW5nLm5hbWUpO1xuXHQgICAgICAgICAgICAgICAgdmFyIGNsb3NlXzEgPSBnZXRRdWFsaWZpZWRFbGVtZW50TmFtZShlbC5jbG9zaW5nLm5hbWUpO1xuXHQgICAgICAgICAgICAgICAgaWYgKG9wZW5fMSAhPT0gY2xvc2VfMSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMudG9sZXJhdGVFcnJvcignRXhwZWN0ZWQgY29ycmVzcG9uZGluZyBKU1ggY2xvc2luZyB0YWcgZm9yICUwJywgb3Blbl8xKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGlmIChzdGFjay5sZW5ndGggPiAwKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGNoaWxkID0gdGhpcy5maW5hbGl6ZShlbC5ub2RlLCBuZXcgSlNYTm9kZS5KU1hFbGVtZW50KGVsLm9wZW5pbmcsIGVsLmNoaWxkcmVuLCBlbC5jbG9zaW5nKSk7XG5cdCAgICAgICAgICAgICAgICAgICAgZWwgPSBzdGFjay5wb3AoKTtcblx0ICAgICAgICAgICAgICAgICAgICBlbC5jaGlsZHJlbi5wdXNoKGNoaWxkKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiBlbDtcblx0ICAgIH07XG5cdCAgICBKU1hQYXJzZXIucHJvdG90eXBlLnBhcnNlSlNYRWxlbWVudCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgbm9kZSA9IHRoaXMuY3JlYXRlSlNYTm9kZSgpO1xuXHQgICAgICAgIHZhciBvcGVuaW5nID0gdGhpcy5wYXJzZUpTWE9wZW5pbmdFbGVtZW50KCk7XG5cdCAgICAgICAgdmFyIGNoaWxkcmVuID0gW107XG5cdCAgICAgICAgdmFyIGNsb3NpbmcgPSBudWxsO1xuXHQgICAgICAgIGlmICghb3BlbmluZy5zZWxmQ2xvc2luZykge1xuXHQgICAgICAgICAgICB2YXIgZWwgPSB0aGlzLnBhcnNlQ29tcGxleEpTWEVsZW1lbnQoeyBub2RlOiBub2RlLCBvcGVuaW5nOiBvcGVuaW5nLCBjbG9zaW5nOiBjbG9zaW5nLCBjaGlsZHJlbjogY2hpbGRyZW4gfSk7XG5cdCAgICAgICAgICAgIGNoaWxkcmVuID0gZWwuY2hpbGRyZW47XG5cdCAgICAgICAgICAgIGNsb3NpbmcgPSBlbC5jbG9zaW5nO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgSlNYTm9kZS5KU1hFbGVtZW50KG9wZW5pbmcsIGNoaWxkcmVuLCBjbG9zaW5nKSk7XG5cdCAgICB9O1xuXHQgICAgSlNYUGFyc2VyLnByb3RvdHlwZS5wYXJzZUpTWFJvb3QgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgLy8gUG9wIHRoZSBvcGVuaW5nICc8JyBhZGRlZCBmcm9tIHRoZSBsb29rYWhlYWQuXG5cdCAgICAgICAgaWYgKHRoaXMuY29uZmlnLnRva2Vucykge1xuXHQgICAgICAgICAgICB0aGlzLnRva2Vucy5wb3AoKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgdGhpcy5zdGFydEpTWCgpO1xuXHQgICAgICAgIHZhciBlbGVtZW50ID0gdGhpcy5wYXJzZUpTWEVsZW1lbnQoKTtcblx0ICAgICAgICB0aGlzLmZpbmlzaEpTWCgpO1xuXHQgICAgICAgIHJldHVybiBlbGVtZW50O1xuXHQgICAgfTtcblx0ICAgIHJldHVybiBKU1hQYXJzZXI7XG5cdH0ocGFyc2VyXzEuUGFyc2VyKSk7XG5cdGV4cG9ydHMuSlNYUGFyc2VyID0gSlNYUGFyc2VyO1xuXG5cbi8qKiovIH0sXG4vKiAxMiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0Ly8gR2VuZXJhdGVkIGJ5IGdlbmVyYXRlLXhodG1sLWVudGl0aWVzLmpzLiBETyBOT1QgTU9ESUZZIVxuXHRcInVzZSBzdHJpY3RcIjtcblx0ZXhwb3J0cy5YSFRNTEVudGl0aWVzID0ge1xuXHQgICAgcXVvdDogJ1xcdTAwMjInLFxuXHQgICAgYW1wOiAnXFx1MDAyNicsXG5cdCAgICBhcG9zOiAnXFx1MDAyNycsXG5cdCAgICBndDogJ1xcdTAwM0UnLFxuXHQgICAgbmJzcDogJ1xcdTAwQTAnLFxuXHQgICAgaWV4Y2w6ICdcXHUwMEExJyxcblx0ICAgIGNlbnQ6ICdcXHUwMEEyJyxcblx0ICAgIHBvdW5kOiAnXFx1MDBBMycsXG5cdCAgICBjdXJyZW46ICdcXHUwMEE0Jyxcblx0ICAgIHllbjogJ1xcdTAwQTUnLFxuXHQgICAgYnJ2YmFyOiAnXFx1MDBBNicsXG5cdCAgICBzZWN0OiAnXFx1MDBBNycsXG5cdCAgICB1bWw6ICdcXHUwMEE4Jyxcblx0ICAgIGNvcHk6ICdcXHUwMEE5Jyxcblx0ICAgIG9yZGY6ICdcXHUwMEFBJyxcblx0ICAgIGxhcXVvOiAnXFx1MDBBQicsXG5cdCAgICBub3Q6ICdcXHUwMEFDJyxcblx0ICAgIHNoeTogJ1xcdTAwQUQnLFxuXHQgICAgcmVnOiAnXFx1MDBBRScsXG5cdCAgICBtYWNyOiAnXFx1MDBBRicsXG5cdCAgICBkZWc6ICdcXHUwMEIwJyxcblx0ICAgIHBsdXNtbjogJ1xcdTAwQjEnLFxuXHQgICAgc3VwMjogJ1xcdTAwQjInLFxuXHQgICAgc3VwMzogJ1xcdTAwQjMnLFxuXHQgICAgYWN1dGU6ICdcXHUwMEI0Jyxcblx0ICAgIG1pY3JvOiAnXFx1MDBCNScsXG5cdCAgICBwYXJhOiAnXFx1MDBCNicsXG5cdCAgICBtaWRkb3Q6ICdcXHUwMEI3Jyxcblx0ICAgIGNlZGlsOiAnXFx1MDBCOCcsXG5cdCAgICBzdXAxOiAnXFx1MDBCOScsXG5cdCAgICBvcmRtOiAnXFx1MDBCQScsXG5cdCAgICByYXF1bzogJ1xcdTAwQkInLFxuXHQgICAgZnJhYzE0OiAnXFx1MDBCQycsXG5cdCAgICBmcmFjMTI6ICdcXHUwMEJEJyxcblx0ICAgIGZyYWMzNDogJ1xcdTAwQkUnLFxuXHQgICAgaXF1ZXN0OiAnXFx1MDBCRicsXG5cdCAgICBBZ3JhdmU6ICdcXHUwMEMwJyxcblx0ICAgIEFhY3V0ZTogJ1xcdTAwQzEnLFxuXHQgICAgQWNpcmM6ICdcXHUwMEMyJyxcblx0ICAgIEF0aWxkZTogJ1xcdTAwQzMnLFxuXHQgICAgQXVtbDogJ1xcdTAwQzQnLFxuXHQgICAgQXJpbmc6ICdcXHUwMEM1Jyxcblx0ICAgIEFFbGlnOiAnXFx1MDBDNicsXG5cdCAgICBDY2VkaWw6ICdcXHUwMEM3Jyxcblx0ICAgIEVncmF2ZTogJ1xcdTAwQzgnLFxuXHQgICAgRWFjdXRlOiAnXFx1MDBDOScsXG5cdCAgICBFY2lyYzogJ1xcdTAwQ0EnLFxuXHQgICAgRXVtbDogJ1xcdTAwQ0InLFxuXHQgICAgSWdyYXZlOiAnXFx1MDBDQycsXG5cdCAgICBJYWN1dGU6ICdcXHUwMENEJyxcblx0ICAgIEljaXJjOiAnXFx1MDBDRScsXG5cdCAgICBJdW1sOiAnXFx1MDBDRicsXG5cdCAgICBFVEg6ICdcXHUwMEQwJyxcblx0ICAgIE50aWxkZTogJ1xcdTAwRDEnLFxuXHQgICAgT2dyYXZlOiAnXFx1MDBEMicsXG5cdCAgICBPYWN1dGU6ICdcXHUwMEQzJyxcblx0ICAgIE9jaXJjOiAnXFx1MDBENCcsXG5cdCAgICBPdGlsZGU6ICdcXHUwMEQ1Jyxcblx0ICAgIE91bWw6ICdcXHUwMEQ2Jyxcblx0ICAgIHRpbWVzOiAnXFx1MDBENycsXG5cdCAgICBPc2xhc2g6ICdcXHUwMEQ4Jyxcblx0ICAgIFVncmF2ZTogJ1xcdTAwRDknLFxuXHQgICAgVWFjdXRlOiAnXFx1MDBEQScsXG5cdCAgICBVY2lyYzogJ1xcdTAwREInLFxuXHQgICAgVXVtbDogJ1xcdTAwREMnLFxuXHQgICAgWWFjdXRlOiAnXFx1MDBERCcsXG5cdCAgICBUSE9STjogJ1xcdTAwREUnLFxuXHQgICAgc3psaWc6ICdcXHUwMERGJyxcblx0ICAgIGFncmF2ZTogJ1xcdTAwRTAnLFxuXHQgICAgYWFjdXRlOiAnXFx1MDBFMScsXG5cdCAgICBhY2lyYzogJ1xcdTAwRTInLFxuXHQgICAgYXRpbGRlOiAnXFx1MDBFMycsXG5cdCAgICBhdW1sOiAnXFx1MDBFNCcsXG5cdCAgICBhcmluZzogJ1xcdTAwRTUnLFxuXHQgICAgYWVsaWc6ICdcXHUwMEU2Jyxcblx0ICAgIGNjZWRpbDogJ1xcdTAwRTcnLFxuXHQgICAgZWdyYXZlOiAnXFx1MDBFOCcsXG5cdCAgICBlYWN1dGU6ICdcXHUwMEU5Jyxcblx0ICAgIGVjaXJjOiAnXFx1MDBFQScsXG5cdCAgICBldW1sOiAnXFx1MDBFQicsXG5cdCAgICBpZ3JhdmU6ICdcXHUwMEVDJyxcblx0ICAgIGlhY3V0ZTogJ1xcdTAwRUQnLFxuXHQgICAgaWNpcmM6ICdcXHUwMEVFJyxcblx0ICAgIGl1bWw6ICdcXHUwMEVGJyxcblx0ICAgIGV0aDogJ1xcdTAwRjAnLFxuXHQgICAgbnRpbGRlOiAnXFx1MDBGMScsXG5cdCAgICBvZ3JhdmU6ICdcXHUwMEYyJyxcblx0ICAgIG9hY3V0ZTogJ1xcdTAwRjMnLFxuXHQgICAgb2NpcmM6ICdcXHUwMEY0Jyxcblx0ICAgIG90aWxkZTogJ1xcdTAwRjUnLFxuXHQgICAgb3VtbDogJ1xcdTAwRjYnLFxuXHQgICAgZGl2aWRlOiAnXFx1MDBGNycsXG5cdCAgICBvc2xhc2g6ICdcXHUwMEY4Jyxcblx0ICAgIHVncmF2ZTogJ1xcdTAwRjknLFxuXHQgICAgdWFjdXRlOiAnXFx1MDBGQScsXG5cdCAgICB1Y2lyYzogJ1xcdTAwRkInLFxuXHQgICAgdXVtbDogJ1xcdTAwRkMnLFxuXHQgICAgeWFjdXRlOiAnXFx1MDBGRCcsXG5cdCAgICB0aG9ybjogJ1xcdTAwRkUnLFxuXHQgICAgeXVtbDogJ1xcdTAwRkYnLFxuXHQgICAgT0VsaWc6ICdcXHUwMTUyJyxcblx0ICAgIG9lbGlnOiAnXFx1MDE1MycsXG5cdCAgICBTY2Fyb246ICdcXHUwMTYwJyxcblx0ICAgIHNjYXJvbjogJ1xcdTAxNjEnLFxuXHQgICAgWXVtbDogJ1xcdTAxNzgnLFxuXHQgICAgZm5vZjogJ1xcdTAxOTInLFxuXHQgICAgY2lyYzogJ1xcdTAyQzYnLFxuXHQgICAgdGlsZGU6ICdcXHUwMkRDJyxcblx0ICAgIEFscGhhOiAnXFx1MDM5MScsXG5cdCAgICBCZXRhOiAnXFx1MDM5MicsXG5cdCAgICBHYW1tYTogJ1xcdTAzOTMnLFxuXHQgICAgRGVsdGE6ICdcXHUwMzk0Jyxcblx0ICAgIEVwc2lsb246ICdcXHUwMzk1Jyxcblx0ICAgIFpldGE6ICdcXHUwMzk2Jyxcblx0ICAgIEV0YTogJ1xcdTAzOTcnLFxuXHQgICAgVGhldGE6ICdcXHUwMzk4Jyxcblx0ICAgIElvdGE6ICdcXHUwMzk5Jyxcblx0ICAgIEthcHBhOiAnXFx1MDM5QScsXG5cdCAgICBMYW1iZGE6ICdcXHUwMzlCJyxcblx0ICAgIE11OiAnXFx1MDM5QycsXG5cdCAgICBOdTogJ1xcdTAzOUQnLFxuXHQgICAgWGk6ICdcXHUwMzlFJyxcblx0ICAgIE9taWNyb246ICdcXHUwMzlGJyxcblx0ICAgIFBpOiAnXFx1MDNBMCcsXG5cdCAgICBSaG86ICdcXHUwM0ExJyxcblx0ICAgIFNpZ21hOiAnXFx1MDNBMycsXG5cdCAgICBUYXU6ICdcXHUwM0E0Jyxcblx0ICAgIFVwc2lsb246ICdcXHUwM0E1Jyxcblx0ICAgIFBoaTogJ1xcdTAzQTYnLFxuXHQgICAgQ2hpOiAnXFx1MDNBNycsXG5cdCAgICBQc2k6ICdcXHUwM0E4Jyxcblx0ICAgIE9tZWdhOiAnXFx1MDNBOScsXG5cdCAgICBhbHBoYTogJ1xcdTAzQjEnLFxuXHQgICAgYmV0YTogJ1xcdTAzQjInLFxuXHQgICAgZ2FtbWE6ICdcXHUwM0IzJyxcblx0ICAgIGRlbHRhOiAnXFx1MDNCNCcsXG5cdCAgICBlcHNpbG9uOiAnXFx1MDNCNScsXG5cdCAgICB6ZXRhOiAnXFx1MDNCNicsXG5cdCAgICBldGE6ICdcXHUwM0I3Jyxcblx0ICAgIHRoZXRhOiAnXFx1MDNCOCcsXG5cdCAgICBpb3RhOiAnXFx1MDNCOScsXG5cdCAgICBrYXBwYTogJ1xcdTAzQkEnLFxuXHQgICAgbGFtYmRhOiAnXFx1MDNCQicsXG5cdCAgICBtdTogJ1xcdTAzQkMnLFxuXHQgICAgbnU6ICdcXHUwM0JEJyxcblx0ICAgIHhpOiAnXFx1MDNCRScsXG5cdCAgICBvbWljcm9uOiAnXFx1MDNCRicsXG5cdCAgICBwaTogJ1xcdTAzQzAnLFxuXHQgICAgcmhvOiAnXFx1MDNDMScsXG5cdCAgICBzaWdtYWY6ICdcXHUwM0MyJyxcblx0ICAgIHNpZ21hOiAnXFx1MDNDMycsXG5cdCAgICB0YXU6ICdcXHUwM0M0Jyxcblx0ICAgIHVwc2lsb246ICdcXHUwM0M1Jyxcblx0ICAgIHBoaTogJ1xcdTAzQzYnLFxuXHQgICAgY2hpOiAnXFx1MDNDNycsXG5cdCAgICBwc2k6ICdcXHUwM0M4Jyxcblx0ICAgIG9tZWdhOiAnXFx1MDNDOScsXG5cdCAgICB0aGV0YXN5bTogJ1xcdTAzRDEnLFxuXHQgICAgdXBzaWg6ICdcXHUwM0QyJyxcblx0ICAgIHBpdjogJ1xcdTAzRDYnLFxuXHQgICAgZW5zcDogJ1xcdTIwMDInLFxuXHQgICAgZW1zcDogJ1xcdTIwMDMnLFxuXHQgICAgdGhpbnNwOiAnXFx1MjAwOScsXG5cdCAgICB6d25qOiAnXFx1MjAwQycsXG5cdCAgICB6d2o6ICdcXHUyMDBEJyxcblx0ICAgIGxybTogJ1xcdTIwMEUnLFxuXHQgICAgcmxtOiAnXFx1MjAwRicsXG5cdCAgICBuZGFzaDogJ1xcdTIwMTMnLFxuXHQgICAgbWRhc2g6ICdcXHUyMDE0Jyxcblx0ICAgIGxzcXVvOiAnXFx1MjAxOCcsXG5cdCAgICByc3F1bzogJ1xcdTIwMTknLFxuXHQgICAgc2JxdW86ICdcXHUyMDFBJyxcblx0ICAgIGxkcXVvOiAnXFx1MjAxQycsXG5cdCAgICByZHF1bzogJ1xcdTIwMUQnLFxuXHQgICAgYmRxdW86ICdcXHUyMDFFJyxcblx0ICAgIGRhZ2dlcjogJ1xcdTIwMjAnLFxuXHQgICAgRGFnZ2VyOiAnXFx1MjAyMScsXG5cdCAgICBidWxsOiAnXFx1MjAyMicsXG5cdCAgICBoZWxsaXA6ICdcXHUyMDI2Jyxcblx0ICAgIHBlcm1pbDogJ1xcdTIwMzAnLFxuXHQgICAgcHJpbWU6ICdcXHUyMDMyJyxcblx0ICAgIFByaW1lOiAnXFx1MjAzMycsXG5cdCAgICBsc2FxdW86ICdcXHUyMDM5Jyxcblx0ICAgIHJzYXF1bzogJ1xcdTIwM0EnLFxuXHQgICAgb2xpbmU6ICdcXHUyMDNFJyxcblx0ICAgIGZyYXNsOiAnXFx1MjA0NCcsXG5cdCAgICBldXJvOiAnXFx1MjBBQycsXG5cdCAgICBpbWFnZTogJ1xcdTIxMTEnLFxuXHQgICAgd2VpZXJwOiAnXFx1MjExOCcsXG5cdCAgICByZWFsOiAnXFx1MjExQycsXG5cdCAgICB0cmFkZTogJ1xcdTIxMjInLFxuXHQgICAgYWxlZnN5bTogJ1xcdTIxMzUnLFxuXHQgICAgbGFycjogJ1xcdTIxOTAnLFxuXHQgICAgdWFycjogJ1xcdTIxOTEnLFxuXHQgICAgcmFycjogJ1xcdTIxOTInLFxuXHQgICAgZGFycjogJ1xcdTIxOTMnLFxuXHQgICAgaGFycjogJ1xcdTIxOTQnLFxuXHQgICAgY3JhcnI6ICdcXHUyMUI1Jyxcblx0ICAgIGxBcnI6ICdcXHUyMUQwJyxcblx0ICAgIHVBcnI6ICdcXHUyMUQxJyxcblx0ICAgIHJBcnI6ICdcXHUyMUQyJyxcblx0ICAgIGRBcnI6ICdcXHUyMUQzJyxcblx0ICAgIGhBcnI6ICdcXHUyMUQ0Jyxcblx0ICAgIGZvcmFsbDogJ1xcdTIyMDAnLFxuXHQgICAgcGFydDogJ1xcdTIyMDInLFxuXHQgICAgZXhpc3Q6ICdcXHUyMjAzJyxcblx0ICAgIGVtcHR5OiAnXFx1MjIwNScsXG5cdCAgICBuYWJsYTogJ1xcdTIyMDcnLFxuXHQgICAgaXNpbjogJ1xcdTIyMDgnLFxuXHQgICAgbm90aW46ICdcXHUyMjA5Jyxcblx0ICAgIG5pOiAnXFx1MjIwQicsXG5cdCAgICBwcm9kOiAnXFx1MjIwRicsXG5cdCAgICBzdW06ICdcXHUyMjExJyxcblx0ICAgIG1pbnVzOiAnXFx1MjIxMicsXG5cdCAgICBsb3dhc3Q6ICdcXHUyMjE3Jyxcblx0ICAgIHJhZGljOiAnXFx1MjIxQScsXG5cdCAgICBwcm9wOiAnXFx1MjIxRCcsXG5cdCAgICBpbmZpbjogJ1xcdTIyMUUnLFxuXHQgICAgYW5nOiAnXFx1MjIyMCcsXG5cdCAgICBhbmQ6ICdcXHUyMjI3Jyxcblx0ICAgIG9yOiAnXFx1MjIyOCcsXG5cdCAgICBjYXA6ICdcXHUyMjI5Jyxcblx0ICAgIGN1cDogJ1xcdTIyMkEnLFxuXHQgICAgaW50OiAnXFx1MjIyQicsXG5cdCAgICB0aGVyZTQ6ICdcXHUyMjM0Jyxcblx0ICAgIHNpbTogJ1xcdTIyM0MnLFxuXHQgICAgY29uZzogJ1xcdTIyNDUnLFxuXHQgICAgYXN5bXA6ICdcXHUyMjQ4Jyxcblx0ICAgIG5lOiAnXFx1MjI2MCcsXG5cdCAgICBlcXVpdjogJ1xcdTIyNjEnLFxuXHQgICAgbGU6ICdcXHUyMjY0Jyxcblx0ICAgIGdlOiAnXFx1MjI2NScsXG5cdCAgICBzdWI6ICdcXHUyMjgyJyxcblx0ICAgIHN1cDogJ1xcdTIyODMnLFxuXHQgICAgbnN1YjogJ1xcdTIyODQnLFxuXHQgICAgc3ViZTogJ1xcdTIyODYnLFxuXHQgICAgc3VwZTogJ1xcdTIyODcnLFxuXHQgICAgb3BsdXM6ICdcXHUyMjk1Jyxcblx0ICAgIG90aW1lczogJ1xcdTIyOTcnLFxuXHQgICAgcGVycDogJ1xcdTIyQTUnLFxuXHQgICAgc2RvdDogJ1xcdTIyQzUnLFxuXHQgICAgbGNlaWw6ICdcXHUyMzA4Jyxcblx0ICAgIHJjZWlsOiAnXFx1MjMwOScsXG5cdCAgICBsZmxvb3I6ICdcXHUyMzBBJyxcblx0ICAgIHJmbG9vcjogJ1xcdTIzMEInLFxuXHQgICAgbG96OiAnXFx1MjVDQScsXG5cdCAgICBzcGFkZXM6ICdcXHUyNjYwJyxcblx0ICAgIGNsdWJzOiAnXFx1MjY2MycsXG5cdCAgICBoZWFydHM6ICdcXHUyNjY1Jyxcblx0ICAgIGRpYW1zOiAnXFx1MjY2NicsXG5cdCAgICBsYW5nOiAnXFx1MjdFOCcsXG5cdCAgICByYW5nOiAnXFx1MjdFOSdcblx0fTtcblxuXG4vKioqLyB9LFxuLyogMTMgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdFwidXNlIHN0cmljdFwiO1xuXHRleHBvcnRzLkpTWFN5bnRheCA9IHtcblx0ICAgIEpTWEF0dHJpYnV0ZTogJ0pTWEF0dHJpYnV0ZScsXG5cdCAgICBKU1hDbG9zaW5nRWxlbWVudDogJ0pTWENsb3NpbmdFbGVtZW50Jyxcblx0ICAgIEpTWEVsZW1lbnQ6ICdKU1hFbGVtZW50Jyxcblx0ICAgIEpTWEVtcHR5RXhwcmVzc2lvbjogJ0pTWEVtcHR5RXhwcmVzc2lvbicsXG5cdCAgICBKU1hFeHByZXNzaW9uQ29udGFpbmVyOiAnSlNYRXhwcmVzc2lvbkNvbnRhaW5lcicsXG5cdCAgICBKU1hJZGVudGlmaWVyOiAnSlNYSWRlbnRpZmllcicsXG5cdCAgICBKU1hNZW1iZXJFeHByZXNzaW9uOiAnSlNYTWVtYmVyRXhwcmVzc2lvbicsXG5cdCAgICBKU1hOYW1lc3BhY2VkTmFtZTogJ0pTWE5hbWVzcGFjZWROYW1lJyxcblx0ICAgIEpTWE9wZW5pbmdFbGVtZW50OiAnSlNYT3BlbmluZ0VsZW1lbnQnLFxuXHQgICAgSlNYU3ByZWFkQXR0cmlidXRlOiAnSlNYU3ByZWFkQXR0cmlidXRlJyxcblx0ICAgIEpTWFRleHQ6ICdKU1hUZXh0J1xuXHR9O1xuXG5cbi8qKiovIH0sXG4vKiAxNCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0XCJ1c2Ugc3RyaWN0XCI7XG5cdHZhciBqc3hfc3ludGF4XzEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEzKTtcblx0dmFyIEpTWENsb3NpbmdFbGVtZW50ID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIEpTWENsb3NpbmdFbGVtZW50KG5hbWUpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBqc3hfc3ludGF4XzEuSlNYU3ludGF4LkpTWENsb3NpbmdFbGVtZW50O1xuXHQgICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gSlNYQ2xvc2luZ0VsZW1lbnQ7XG5cdH0oKSk7XG5cdGV4cG9ydHMuSlNYQ2xvc2luZ0VsZW1lbnQgPSBKU1hDbG9zaW5nRWxlbWVudDtcblx0dmFyIEpTWEVsZW1lbnQgPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gSlNYRWxlbWVudChvcGVuaW5nRWxlbWVudCwgY2hpbGRyZW4sIGNsb3NpbmdFbGVtZW50KSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0ganN4X3N5bnRheF8xLkpTWFN5bnRheC5KU1hFbGVtZW50O1xuXHQgICAgICAgIHRoaXMub3BlbmluZ0VsZW1lbnQgPSBvcGVuaW5nRWxlbWVudDtcblx0ICAgICAgICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW47XG5cdCAgICAgICAgdGhpcy5jbG9zaW5nRWxlbWVudCA9IGNsb3NpbmdFbGVtZW50O1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIEpTWEVsZW1lbnQ7XG5cdH0oKSk7XG5cdGV4cG9ydHMuSlNYRWxlbWVudCA9IEpTWEVsZW1lbnQ7XG5cdHZhciBKU1hFbXB0eUV4cHJlc3Npb24gPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gSlNYRW1wdHlFeHByZXNzaW9uKCkge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IGpzeF9zeW50YXhfMS5KU1hTeW50YXguSlNYRW1wdHlFeHByZXNzaW9uO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIEpTWEVtcHR5RXhwcmVzc2lvbjtcblx0fSgpKTtcblx0ZXhwb3J0cy5KU1hFbXB0eUV4cHJlc3Npb24gPSBKU1hFbXB0eUV4cHJlc3Npb247XG5cdHZhciBKU1hFeHByZXNzaW9uQ29udGFpbmVyID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIEpTWEV4cHJlc3Npb25Db250YWluZXIoZXhwcmVzc2lvbikge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IGpzeF9zeW50YXhfMS5KU1hTeW50YXguSlNYRXhwcmVzc2lvbkNvbnRhaW5lcjtcblx0ICAgICAgICB0aGlzLmV4cHJlc3Npb24gPSBleHByZXNzaW9uO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIEpTWEV4cHJlc3Npb25Db250YWluZXI7XG5cdH0oKSk7XG5cdGV4cG9ydHMuSlNYRXhwcmVzc2lvbkNvbnRhaW5lciA9IEpTWEV4cHJlc3Npb25Db250YWluZXI7XG5cdHZhciBKU1hJZGVudGlmaWVyID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIEpTWElkZW50aWZpZXIobmFtZSkge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IGpzeF9zeW50YXhfMS5KU1hTeW50YXguSlNYSWRlbnRpZmllcjtcblx0ICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIEpTWElkZW50aWZpZXI7XG5cdH0oKSk7XG5cdGV4cG9ydHMuSlNYSWRlbnRpZmllciA9IEpTWElkZW50aWZpZXI7XG5cdHZhciBKU1hNZW1iZXJFeHByZXNzaW9uID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIEpTWE1lbWJlckV4cHJlc3Npb24ob2JqZWN0LCBwcm9wZXJ0eSkge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IGpzeF9zeW50YXhfMS5KU1hTeW50YXguSlNYTWVtYmVyRXhwcmVzc2lvbjtcblx0ICAgICAgICB0aGlzLm9iamVjdCA9IG9iamVjdDtcblx0ICAgICAgICB0aGlzLnByb3BlcnR5ID0gcHJvcGVydHk7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gSlNYTWVtYmVyRXhwcmVzc2lvbjtcblx0fSgpKTtcblx0ZXhwb3J0cy5KU1hNZW1iZXJFeHByZXNzaW9uID0gSlNYTWVtYmVyRXhwcmVzc2lvbjtcblx0dmFyIEpTWEF0dHJpYnV0ZSA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBKU1hBdHRyaWJ1dGUobmFtZSwgdmFsdWUpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBqc3hfc3ludGF4XzEuSlNYU3ludGF4LkpTWEF0dHJpYnV0ZTtcblx0ICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuXHQgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcblx0ICAgIH1cblx0ICAgIHJldHVybiBKU1hBdHRyaWJ1dGU7XG5cdH0oKSk7XG5cdGV4cG9ydHMuSlNYQXR0cmlidXRlID0gSlNYQXR0cmlidXRlO1xuXHR2YXIgSlNYTmFtZXNwYWNlZE5hbWUgPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gSlNYTmFtZXNwYWNlZE5hbWUobmFtZXNwYWNlLCBuYW1lKSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0ganN4X3N5bnRheF8xLkpTWFN5bnRheC5KU1hOYW1lc3BhY2VkTmFtZTtcblx0ICAgICAgICB0aGlzLm5hbWVzcGFjZSA9IG5hbWVzcGFjZTtcblx0ICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIEpTWE5hbWVzcGFjZWROYW1lO1xuXHR9KCkpO1xuXHRleHBvcnRzLkpTWE5hbWVzcGFjZWROYW1lID0gSlNYTmFtZXNwYWNlZE5hbWU7XG5cdHZhciBKU1hPcGVuaW5nRWxlbWVudCA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBKU1hPcGVuaW5nRWxlbWVudChuYW1lLCBzZWxmQ2xvc2luZywgYXR0cmlidXRlcykge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IGpzeF9zeW50YXhfMS5KU1hTeW50YXguSlNYT3BlbmluZ0VsZW1lbnQ7XG5cdCAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcblx0ICAgICAgICB0aGlzLnNlbGZDbG9zaW5nID0gc2VsZkNsb3Npbmc7XG5cdCAgICAgICAgdGhpcy5hdHRyaWJ1dGVzID0gYXR0cmlidXRlcztcblx0ICAgIH1cblx0ICAgIHJldHVybiBKU1hPcGVuaW5nRWxlbWVudDtcblx0fSgpKTtcblx0ZXhwb3J0cy5KU1hPcGVuaW5nRWxlbWVudCA9IEpTWE9wZW5pbmdFbGVtZW50O1xuXHR2YXIgSlNYU3ByZWFkQXR0cmlidXRlID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIEpTWFNwcmVhZEF0dHJpYnV0ZShhcmd1bWVudCkge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IGpzeF9zeW50YXhfMS5KU1hTeW50YXguSlNYU3ByZWFkQXR0cmlidXRlO1xuXHQgICAgICAgIHRoaXMuYXJndW1lbnQgPSBhcmd1bWVudDtcblx0ICAgIH1cblx0ICAgIHJldHVybiBKU1hTcHJlYWRBdHRyaWJ1dGU7XG5cdH0oKSk7XG5cdGV4cG9ydHMuSlNYU3ByZWFkQXR0cmlidXRlID0gSlNYU3ByZWFkQXR0cmlidXRlO1xuXHR2YXIgSlNYVGV4dCA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBKU1hUZXh0KHZhbHVlLCByYXcpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBqc3hfc3ludGF4XzEuSlNYU3ludGF4LkpTWFRleHQ7XG5cdCAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuXHQgICAgICAgIHRoaXMucmF3ID0gcmF3O1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIEpTWFRleHQ7XG5cdH0oKSk7XG5cdGV4cG9ydHMuSlNYVGV4dCA9IEpTWFRleHQ7XG5cblxuLyoqKi8gfSxcbi8qIDE1ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHRcInVzZSBzdHJpY3RcIjtcblx0dmFyIHNjYW5uZXJfMSA9IF9fd2VicGFja19yZXF1aXJlX18oOCk7XG5cdHZhciBlcnJvcl9oYW5kbGVyXzEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpO1xuXHR2YXIgdG9rZW5fMSA9IF9fd2VicGFja19yZXF1aXJlX18oNyk7XG5cdHZhciBSZWFkZXIgPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gUmVhZGVyKCkge1xuXHQgICAgICAgIHRoaXMudmFsdWVzID0gW107XG5cdCAgICAgICAgdGhpcy5jdXJseSA9IHRoaXMucGFyZW4gPSAtMTtcblx0ICAgIH1cblx0ICAgIDtcblx0ICAgIC8vIEEgZnVuY3Rpb24gZm9sbG93aW5nIG9uZSBvZiB0aG9zZSB0b2tlbnMgaXMgYW4gZXhwcmVzc2lvbi5cblx0ICAgIFJlYWRlci5wcm90b3R5cGUuYmVmb3JlRnVuY3Rpb25FeHByZXNzaW9uID0gZnVuY3Rpb24gKHQpIHtcblx0ICAgICAgICByZXR1cm4gWycoJywgJ3snLCAnWycsICdpbicsICd0eXBlb2YnLCAnaW5zdGFuY2VvZicsICduZXcnLFxuXHQgICAgICAgICAgICAncmV0dXJuJywgJ2Nhc2UnLCAnZGVsZXRlJywgJ3Rocm93JywgJ3ZvaWQnLFxuXHQgICAgICAgICAgICAvLyBhc3NpZ25tZW50IG9wZXJhdG9yc1xuXHQgICAgICAgICAgICAnPScsICcrPScsICctPScsICcqPScsICcqKj0nLCAnLz0nLCAnJT0nLCAnPDw9JywgJz4+PScsICc+Pj49Jyxcblx0ICAgICAgICAgICAgJyY9JywgJ3w9JywgJ149JywgJywnLFxuXHQgICAgICAgICAgICAvLyBiaW5hcnkvdW5hcnkgb3BlcmF0b3JzXG5cdCAgICAgICAgICAgICcrJywgJy0nLCAnKicsICcqKicsICcvJywgJyUnLCAnKysnLCAnLS0nLCAnPDwnLCAnPj4nLCAnPj4+JywgJyYnLFxuXHQgICAgICAgICAgICAnfCcsICdeJywgJyEnLCAnficsICcmJicsICd8fCcsICc/JywgJzonLCAnPT09JywgJz09JywgJz49Jyxcblx0ICAgICAgICAgICAgJzw9JywgJzwnLCAnPicsICchPScsICchPT0nXS5pbmRleE9mKHQpID49IDA7XG5cdCAgICB9O1xuXHQgICAgO1xuXHQgICAgLy8gRGV0ZXJtaW5lIGlmIGZvcndhcmQgc2xhc2ggKC8pIGlzIGFuIG9wZXJhdG9yIG9yIHBhcnQgb2YgYSByZWd1bGFyIGV4cHJlc3Npb25cblx0ICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tb3ppbGxhL3N3ZWV0LmpzL3dpa2kvZGVzaWduXG5cdCAgICBSZWFkZXIucHJvdG90eXBlLmlzUmVnZXhTdGFydCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgcHJldmlvdXMgPSB0aGlzLnZhbHVlc1t0aGlzLnZhbHVlcy5sZW5ndGggLSAxXTtcblx0ICAgICAgICB2YXIgcmVnZXggPSAocHJldmlvdXMgIT09IG51bGwpO1xuXHQgICAgICAgIHN3aXRjaCAocHJldmlvdXMpIHtcblx0ICAgICAgICAgICAgY2FzZSAndGhpcyc6XG5cdCAgICAgICAgICAgIGNhc2UgJ10nOlxuXHQgICAgICAgICAgICAgICAgcmVnZXggPSBmYWxzZTtcblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICBjYXNlICcpJzpcblx0ICAgICAgICAgICAgICAgIHZhciBjaGVjayA9IHRoaXMudmFsdWVzW3RoaXMucGFyZW4gLSAxXTtcblx0ICAgICAgICAgICAgICAgIHJlZ2V4ID0gKGNoZWNrID09PSAnaWYnIHx8IGNoZWNrID09PSAnd2hpbGUnIHx8IGNoZWNrID09PSAnZm9yJyB8fCBjaGVjayA9PT0gJ3dpdGgnKTtcblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICBjYXNlICd9Jzpcblx0ICAgICAgICAgICAgICAgIC8vIERpdmlkaW5nIGEgZnVuY3Rpb24gYnkgYW55dGhpbmcgbWFrZXMgbGl0dGxlIHNlbnNlLFxuXHQgICAgICAgICAgICAgICAgLy8gYnV0IHdlIGhhdmUgdG8gY2hlY2sgZm9yIHRoYXQuXG5cdCAgICAgICAgICAgICAgICByZWdleCA9IGZhbHNlO1xuXHQgICAgICAgICAgICAgICAgaWYgKHRoaXMudmFsdWVzW3RoaXMuY3VybHkgLSAzXSA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICAgICAgICAgICAgICAgIC8vIEFub255bW91cyBmdW5jdGlvbiwgZS5nLiBmdW5jdGlvbigpe30gLzQyXG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGNoZWNrXzEgPSB0aGlzLnZhbHVlc1t0aGlzLmN1cmx5IC0gNF07XG5cdCAgICAgICAgICAgICAgICAgICAgcmVnZXggPSBjaGVja18xID8gIXRoaXMuYmVmb3JlRnVuY3Rpb25FeHByZXNzaW9uKGNoZWNrXzEpIDogZmFsc2U7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLnZhbHVlc1t0aGlzLmN1cmx5IC0gNF0gPT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgICAgICAgICAgICAgICAvLyBOYW1lZCBmdW5jdGlvbiwgZS5nLiBmdW5jdGlvbiBmKCl7fSAvNDIvXG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGNoZWNrXzIgPSB0aGlzLnZhbHVlc1t0aGlzLmN1cmx5IC0gNV07XG5cdCAgICAgICAgICAgICAgICAgICAgcmVnZXggPSBjaGVja18yID8gIXRoaXMuYmVmb3JlRnVuY3Rpb25FeHByZXNzaW9uKGNoZWNrXzIpIDogdHJ1ZTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHJlZ2V4O1xuXHQgICAgfTtcblx0ICAgIDtcblx0ICAgIFJlYWRlci5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uICh0b2tlbikge1xuXHQgICAgICAgIGlmICh0b2tlbi50eXBlID09PSB0b2tlbl8xLlRva2VuLlB1bmN0dWF0b3IgfHwgdG9rZW4udHlwZSA9PT0gdG9rZW5fMS5Ub2tlbi5LZXl3b3JkKSB7XG5cdCAgICAgICAgICAgIGlmICh0b2tlbi52YWx1ZSA9PT0gJ3snKSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLmN1cmx5ID0gdGhpcy52YWx1ZXMubGVuZ3RoO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2UgaWYgKHRva2VuLnZhbHVlID09PSAnKCcpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMucGFyZW4gPSB0aGlzLnZhbHVlcy5sZW5ndGg7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgdGhpcy52YWx1ZXMucHVzaCh0b2tlbi52YWx1ZSk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICB0aGlzLnZhbHVlcy5wdXNoKG51bGwpO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cdCAgICA7XG5cdCAgICByZXR1cm4gUmVhZGVyO1xuXHR9KCkpO1xuXHR2YXIgVG9rZW5pemVyID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIFRva2VuaXplcihjb2RlLCBjb25maWcpIHtcblx0ICAgICAgICB0aGlzLmVycm9ySGFuZGxlciA9IG5ldyBlcnJvcl9oYW5kbGVyXzEuRXJyb3JIYW5kbGVyKCk7XG5cdCAgICAgICAgdGhpcy5lcnJvckhhbmRsZXIudG9sZXJhbnQgPSBjb25maWcgPyAodHlwZW9mIGNvbmZpZy50b2xlcmFudCA9PT0gJ2Jvb2xlYW4nICYmIGNvbmZpZy50b2xlcmFudCkgOiBmYWxzZTtcblx0ICAgICAgICB0aGlzLnNjYW5uZXIgPSBuZXcgc2Nhbm5lcl8xLlNjYW5uZXIoY29kZSwgdGhpcy5lcnJvckhhbmRsZXIpO1xuXHQgICAgICAgIHRoaXMuc2Nhbm5lci50cmFja0NvbW1lbnQgPSBjb25maWcgPyAodHlwZW9mIGNvbmZpZy5jb21tZW50ID09PSAnYm9vbGVhbicgJiYgY29uZmlnLmNvbW1lbnQpIDogZmFsc2U7XG5cdCAgICAgICAgdGhpcy50cmFja1JhbmdlID0gY29uZmlnID8gKHR5cGVvZiBjb25maWcucmFuZ2UgPT09ICdib29sZWFuJyAmJiBjb25maWcucmFuZ2UpIDogZmFsc2U7XG5cdCAgICAgICAgdGhpcy50cmFja0xvYyA9IGNvbmZpZyA/ICh0eXBlb2YgY29uZmlnLmxvYyA9PT0gJ2Jvb2xlYW4nICYmIGNvbmZpZy5sb2MpIDogZmFsc2U7XG5cdCAgICAgICAgdGhpcy5idWZmZXIgPSBbXTtcblx0ICAgICAgICB0aGlzLnJlYWRlciA9IG5ldyBSZWFkZXIoKTtcblx0ICAgIH1cblx0ICAgIDtcblx0ICAgIFRva2VuaXplci5wcm90b3R5cGUuZXJyb3JzID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHJldHVybiB0aGlzLmVycm9ySGFuZGxlci5lcnJvcnM7XG5cdCAgICB9O1xuXHQgICAgO1xuXHQgICAgVG9rZW5pemVyLnByb3RvdHlwZS5nZXROZXh0VG9rZW4gPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgaWYgKHRoaXMuYnVmZmVyLmxlbmd0aCA9PT0gMCkge1xuXHQgICAgICAgICAgICB2YXIgY29tbWVudHMgPSB0aGlzLnNjYW5uZXIuc2NhbkNvbW1lbnRzKCk7XG5cdCAgICAgICAgICAgIGlmICh0aGlzLnNjYW5uZXIudHJhY2tDb21tZW50KSB7XG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbW1lbnRzLmxlbmd0aDsgKytpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGUgPSBjb21tZW50c1tpXTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgY29tbWVudCA9IHZvaWQgMDtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLnNjYW5uZXIuc291cmNlLnNsaWNlKGUuc2xpY2VbMF0sIGUuc2xpY2VbMV0pO1xuXHQgICAgICAgICAgICAgICAgICAgIGNvbW1lbnQgPSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGUubXVsdGlMaW5lID8gJ0Jsb2NrQ29tbWVudCcgOiAnTGluZUNvbW1lbnQnLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWVcblx0ICAgICAgICAgICAgICAgICAgICB9O1xuXHQgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyYWNrUmFuZ2UpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgY29tbWVudC5yYW5nZSA9IGUucmFuZ2U7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyYWNrTG9jKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1lbnQubG9jID0gZS5sb2M7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuYnVmZmVyLnB1c2goY29tbWVudCk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgaWYgKCF0aGlzLnNjYW5uZXIuZW9mKCkpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBsb2MgPSB2b2lkIDA7XG5cdCAgICAgICAgICAgICAgICBpZiAodGhpcy50cmFja0xvYykge1xuXHQgICAgICAgICAgICAgICAgICAgIGxvYyA9IHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmU6IHRoaXMuc2Nhbm5lci5saW5lTnVtYmVyLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uOiB0aGlzLnNjYW5uZXIuaW5kZXggLSB0aGlzLnNjYW5uZXIubGluZVN0YXJ0XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIH0sXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGVuZDoge31cblx0ICAgICAgICAgICAgICAgICAgICB9O1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgdmFyIHRva2VuID0gdm9pZCAwO1xuXHQgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2Nhbm5lci5zb3VyY2VbdGhpcy5zY2FubmVyLmluZGV4XSA9PT0gJy8nKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSB0aGlzLnJlYWRlci5pc1JlZ2V4U3RhcnQoKSA/IHRoaXMuc2Nhbm5lci5zY2FuUmVnRXhwKCkgOiB0aGlzLnNjYW5uZXIuc2NhblB1bmN0dWF0b3IoKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgIHRva2VuID0gdGhpcy5zY2FubmVyLmxleCgpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgdGhpcy5yZWFkZXIucHVzaCh0b2tlbik7XG5cdCAgICAgICAgICAgICAgICB2YXIgZW50cnkgPSB2b2lkIDA7XG5cdCAgICAgICAgICAgICAgICBlbnRyeSA9IHtcblx0ICAgICAgICAgICAgICAgICAgICB0eXBlOiB0b2tlbl8xLlRva2VuTmFtZVt0b2tlbi50eXBlXSxcblx0ICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5zY2FubmVyLnNvdXJjZS5zbGljZSh0b2tlbi5zdGFydCwgdG9rZW4uZW5kKVxuXHQgICAgICAgICAgICAgICAgfTtcblx0ICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyYWNrUmFuZ2UpIHtcblx0ICAgICAgICAgICAgICAgICAgICBlbnRyeS5yYW5nZSA9IFt0b2tlbi5zdGFydCwgdG9rZW4uZW5kXTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyYWNrTG9jKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgbG9jLmVuZCA9IHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgbGluZTogdGhpcy5zY2FubmVyLmxpbmVOdW1iZXIsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbjogdGhpcy5zY2FubmVyLmluZGV4IC0gdGhpcy5zY2FubmVyLmxpbmVTdGFydFxuXHQgICAgICAgICAgICAgICAgICAgIH07XG5cdCAgICAgICAgICAgICAgICAgICAgZW50cnkubG9jID0gbG9jO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgaWYgKHRva2VuLnJlZ2V4KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgZW50cnkucmVnZXggPSB0b2tlbi5yZWdleDtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIHRoaXMuYnVmZmVyLnB1c2goZW50cnkpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiB0aGlzLmJ1ZmZlci5zaGlmdCgpO1xuXHQgICAgfTtcblx0ICAgIDtcblx0ICAgIHJldHVybiBUb2tlbml6ZXI7XG5cdH0oKSk7XG5cdGV4cG9ydHMuVG9rZW5pemVyID0gVG9rZW5pemVyO1xuXG5cbi8qKiovIH1cbi8qKioqKiovIF0pXG59KTtcbjsiLCJ2YXIgXyA9IHJlcXVpcmUoJ3VuZGVyc2NvcmUnKVxuXG4vLyBtZXRhZGF0YSAtIFRPRE86IG1vdmUgdG8gbWV0YWRhdGEuanNcbi8vIG9iamVjdCBleHBsb3JhdGlvbiBhbmQgdHlwZXNcblxudmFyIGdldEpzT2JqZWN0TWV0YWRhdGEgPSBmdW5jdGlvbihvKVxue1xuXHQvL1RPRE86IHBsdWdpbiBjb250YWluZXJcblxuXHR2YXIgcmVzdWx0XG5cdGlmKF8uaXNTdHJpbmcobykpXG5cdHtcblx0XHRyZXN1bHQgPSB7dHlwZTogJ1N0cmluZycsIHZhbHVlOiBvfVxuXHR9XG5cdGVsc2UgaWYoXy5pc051bWJlcihvKSlcblx0e1xuXHRcdHJlc3VsdCA9IHt0eXBlOiAnTnVtYmVyJywgdmFsdWU6IG99XG5cdH1cblx0ZWxzZSBpZihfLmlzQm9vbGVhbihvKSlcblx0e1xuXHRcdHJlc3VsdCA9IHt0eXBlOiAnQm9vbGVhbicsIHZhbHVlOiBvfVxuXHR9XG5cdGVsc2UgaWYoXy5pc0FycmF5KG8pKVxuXHR7XG5cdFx0Ly8gZGVidWdnZXI7XG5cdFx0cmVzdWx0ID0ge3R5cGU6ICdBcnJheSd9XG5cdH1cblx0ZWxzZSBpZihfLmlzRnVuY3Rpb24obykpXG5cdHtcblx0XHR2YXIgZnN0ciA9IG8udG9TdHJpbmcoKSsnJ1xuXHRcdHJlc3VsdCA9IHtcblx0XHRcdHR5cGU6ICdGdW5jdGlvbicsIFxuXHRcdFx0Ly8gdmFsdWU6IGZzdHIsXG5cdFx0XHRzaWduYXR1cmU6IGV4dHJhY3RNZXRob2RTaWduYXR1cmUoZnN0cilcblx0XHR9XG5cdH1cblx0ZWxzZSBpZihfLmlzT2JqZWN0KG8pKVxuXHR7XG5cdFx0cmVzdWx0ID0ge3R5cGU6ICdPYmplY3QnfVxuXHR9XG5cdGVsc2Vcblx0e1xuXHRcdHJlc3VsdCA9IHt0eXBlOiAndW5kZWZpbmVkJ31cblx0fVxuXHRyZXR1cm4gcmVzdWx0XG59XG5cblxuZnVuY3Rpb24gZXh0cmFjdE1ldGhvZFNpZ25hdHVyZShzKVxue1xuXHR2YXIgdmFsXG5cdHRyeVxuXHR7XG5cdFx0dmFyIGVzcHJpbWEgPSByZXF1aXJlKCdlc3ByaW1hJylcblx0XHQvLyBjb25zb2xlLmxvZygndmFyIGEgPSAnK3MpXG5cdFx0dmFyIGFzdCA9IGVzcHJpbWEucGFyc2UoJ3ZhciBhID0gJytzKVxuXHRcdHZhciBwYXJhbXMgPSBhc3QuYm9keVswXS5kZWNsYXJhdGlvbnNbMF0uaW5pdC5wYXJhbXNcblx0XHR2YWwgPSB7XG5cdFx0XHRwYXJhbXM6IF8ubWFwKHBhcmFtcywgKHApPT57cmV0dXJuIHAubmFtZX0pXG5cdFx0fVxuXHR9XG5cdGNhdGNoKGV4KVxuXHR7XG5cdFx0Ly9wYXJzaW5nIGZhaWwgLSBzb21ldGltZXMgY291bGQgYmUgbmF0aXZlIGNvZGUgPyBcblx0XHRyZXR1cm4ge31cblx0fVxuXHRyZXR1cm4gdmFsXG59XG5cbnZhciB2ZXJ5U3RyYW5nZVByb3BlcnR5TmFtZUZvckN5Y2xlcyA9ICdfX19zaG91bGRfbmV2ZXJuZXZlcmhhcHBlbjEyMzIyJ1xudmFyIGV4dHJhY3RPYmplY3RNZXRhZGF0YXMgPSBmdW5jdGlvbihzb3VyY2VPYmplY3QsIHNvdXJjZU9iamVjdE5hbWUsIHJlY3Vyc2UsIGhhbmRsZUN5Y2xlcylcbntcblx0X3Zpc2l0Q291bnQrK1xuXHRpZihfdmlzaXRNYXhDb3VudCAmJiBfdmlzaXRDb3VudCA+IF92aXNpdE1heENvdW50KVxuXHR7XG5cdFx0cmV0dXJuXG5cdH1cblx0dmFyIHJlc3VsdCA9IHt9XG5cdHZhciBteU1ldGFkYXRhID0gZ2V0SnNPYmplY3RNZXRhZGF0YShzb3VyY2VPYmplY3QpXG5cdGlmKGhhbmRsZUN5Y2xlcylcblx0e1xuXHRcdGlmKHNvdXJjZU9iamVjdFt2ZXJ5U3RyYW5nZVByb3BlcnR5TmFtZUZvckN5Y2xlc10pXG5cdFx0e1xuXHRcdFx0cmV0dXJuIC8vaGVhZHMgdXAhIHdlIHN0b3AgcmVjdXJzaW5nXG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRzb3VyY2VPYmplY3RbdmVyeVN0cmFuZ2VQcm9wZXJ0eU5hbWVGb3JDeWNsZXNdPXNvdXJjZU9iamVjdE5hbWVcblx0XHR9XG5cdH1cblxuXHQvL2hlYWRzIHVwICEgdXNpbmcgXy5lYWNoIGZvciBpdGVyYXRpbmcgb2JqZWN0IHByb3BlcnRpZXMgd29uJ3QgdmlzaXQgaW5oZXJpdGVkIHByb3BlcnRpZXMuIENvbmNyZXRlbHksIGJyb3dzZXIncyBkb2N1bWVudFxuXG5cdC8vIF8uZWFjaChzb3VyY2VPYmplY3QsIGZ1bmN0aW9uKHZhbHVlLCBrZXkpXG5cdC8vIHtcblx0Ly8gXHRpZihoYW5kbGVDeWNsZXMgJiYga2V5ID09IHZlcnlTdHJhbmdlUHJvcGVydHlOYW1lRm9yQ3ljbGVzKVxuXHQvLyBcdHtcblx0Ly8gXHRcdHJldHVyblxuXHQvLyBcdH1cblx0Ly8gXHQvLyBjb25zb2xlLmxvZyhrZXkpXG5cdC8vIFx0dmFyIG1ldGFkYXRhID0gZ2V0SnNPYmplY3RNZXRhZGF0YSh2YWx1ZSlcblx0Ly8gXHRyZXN1bHRba2V5XSA9IG1ldGFkYXRhXG5cdC8vIFx0aWYocmVjdXJzZSAmJiBtZXRhZGF0YS50eXBlID09ICdPYmplY3QnKSBcblx0Ly8gXHR7XG5cdC8vIFx0XHRfLmV4dGVuZChyZXN1bHRba2V5XSwgZXh0cmFjdE9iamVjdE1ldGFkYXRhcyh2YWx1ZSwga2V5LCB0cnVlLCBoYW5kbGVDeWNsZXMpKVxuXHQvLyBcdH1cblx0Ly8gXHRlbHNlIGlmKHJlY3Vyc2UgJiYgbWV0YWRhdGEudHlwZT09J0FycmF5JyAmJiB2YWx1ZSAmJiB2YWx1ZS5sZW5ndGgpXG5cdC8vIFx0e1xuXHQvLyBcdFx0Xy5leHRlbmQocmVzdWx0W2tleV0sIHthcnJheUl0ZW1NZXRhZGF0YTogZXh0cmFjdE9iamVjdE1ldGFkYXRhcyh2YWx1ZVswXSwga2V5LCB0cnVlLCBoYW5kbGVDeWNsZXMpfSlcblx0Ly8gXHR9XG5cdC8vIH0pXG5cblx0Zm9yKHZhciBrZXkyIGluIHNvdXJjZU9iamVjdClcblx0e1xuXHRcdHZhciB2YWx1ZTIgPSBzb3VyY2VPYmplY3Rba2V5Ml07XG5cblx0XHQoZnVuY3Rpb24oa2V5LCB2YWx1ZSlcblx0XHR7XG5cdFx0XHRpZihoYW5kbGVDeWNsZXMgJiYga2V5ID09IHZlcnlTdHJhbmdlUHJvcGVydHlOYW1lRm9yQ3ljbGVzKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm5cblx0XHRcdH1cblx0XHRcdC8vIGNvbnNvbGUubG9nKGtleSlcblx0XHRcdHZhciBtZXRhZGF0YSA9IGdldEpzT2JqZWN0TWV0YWRhdGEodmFsdWUpXG5cdFx0XHRyZXN1bHRba2V5XSA9IG1ldGFkYXRhXG5cdFx0XHRpZihyZWN1cnNlICYmIG1ldGFkYXRhLnR5cGUgPT0gJ09iamVjdCcpIFxuXHRcdFx0e1xuXHRcdFx0XHRfLmV4dGVuZChyZXN1bHRba2V5XSwgZXh0cmFjdE9iamVjdE1ldGFkYXRhcyh2YWx1ZSwga2V5LCB0cnVlLCBoYW5kbGVDeWNsZXMpKVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZihyZWN1cnNlICYmIG1ldGFkYXRhLnR5cGU9PSdBcnJheScgJiYgdmFsdWUgJiYgdmFsdWUubGVuZ3RoKVxuXHRcdFx0e1xuXHRcdFx0XHRfLmV4dGVuZChyZXN1bHRba2V5XSwge2FycmF5SXRlbU1ldGFkYXRhOiBleHRyYWN0T2JqZWN0TWV0YWRhdGFzKHZhbHVlWzBdLCBrZXksIHRydWUsIGhhbmRsZUN5Y2xlcyl9KVxuXHRcdFx0fVxuXG5cdFx0fSkoa2V5MiwgdmFsdWUyKVxuXHR9XG5cblx0bXlNZXRhZGF0YS5vYmplY3RNZXRhZGF0YSA9IHJlc3VsdFxuXHRyZXR1cm4gbXlNZXRhZGF0YVxufVxuXG52YXIgZXhjbHVkZU5hbWVzID0gZnVuY3Rpb24oYWJzb2x1dGVOYW1lKVxue1xuXHRyZXR1cm4gXy5maW5kKGV4Y2x1ZGVOYW1lc18sIGZ1bmN0aW9uKGV4Yyl7cmV0dXJuIGFic29sdXRlTmFtZS5pbmRleE9mKGV4YykhPT0tMX0pXG59XG5cbnZhciB2aXNpdE9iamVjdE1ldGFkYXRhID0gZnVuY3Rpb24obWV0YWRhdGEsIG5hbWUsIHBhcmVudE5hbWUsIGxldmVsLCB2aXNpdG9yKVxue1xuXHRsZXZlbCA9IGxldmVsIHx8IDBcblx0cGFyZW50TmFtZSA9IHBhcmVudE5hbWUgfHwgJydcblx0dmFyIGFic29sdXRlTmFtZSA9ICBwYXJlbnROYW1lID8gKHBhcmVudE5hbWUrJy4nK25hbWUpIDogbmFtZVxuXHRpZihleGNsdWRlTmFtZXMoYWJzb2x1dGVOYW1lKSlcblx0e1xuXHRcdHJldHVyblxuXHR9XG5cdHZhciB2aXNpdGFibGUgPSB7XG5cdFx0bmFtZTogbmFtZSwgXG5cdFx0YWJzb2x1dGVOYW1lOiBhYnNvbHV0ZU5hbWVcblx0fVxuXHRfLmV4dGVuZCh2aXNpdGFibGUsIG1ldGFkYXRhKVxuXHR2aXNpdG9yKHZpc2l0YWJsZSlcblx0Xy5lYWNoKG1ldGFkYXRhLm9iamVjdE1ldGFkYXRhLCBmdW5jdGlvbihjaGlsZE1ldGEsIGNoaWxkTmFtZSlcblx0e1xuXHRcdHZpc2l0T2JqZWN0TWV0YWRhdGEoY2hpbGRNZXRhLCBjaGlsZE5hbWUsIGFic29sdXRlTmFtZSwgbGV2ZWwrMSwgdmlzaXRvcilcblx0fSlcbn1cblxuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHR2aXNpdE9iamVjdE1ldGFkYXRhOiB2aXNpdE9iamVjdE1ldGFkYXRhLFxuXHRleHRyYWN0T2JqZWN0TWV0YWRhdGFzOiBleHRyYWN0T2JqZWN0TWV0YWRhdGFzLFxuXHR2ZXJ5U3RyYW5nZVByb3BlcnR5TmFtZUZvckN5Y2xlczogdmVyeVN0cmFuZ2VQcm9wZXJ0eU5hbWVGb3JDeWNsZXNcbn0iLCIvLyAgICAgVW5kZXJzY29yZS5qcyAxLjguM1xuLy8gICAgIGh0dHA6Ly91bmRlcnNjb3JlanMub3JnXG4vLyAgICAgKGMpIDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuLy8gICAgIFVuZGVyc2NvcmUgbWF5IGJlIGZyZWVseSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG5cbihmdW5jdGlvbigpIHtcblxuICAvLyBCYXNlbGluZSBzZXR1cFxuICAvLyAtLS0tLS0tLS0tLS0tLVxuXG4gIC8vIEVzdGFibGlzaCB0aGUgcm9vdCBvYmplY3QsIGB3aW5kb3dgIGluIHRoZSBicm93c2VyLCBvciBgZXhwb3J0c2Agb24gdGhlIHNlcnZlci5cbiAgdmFyIHJvb3QgPSB0aGlzO1xuXG4gIC8vIFNhdmUgdGhlIHByZXZpb3VzIHZhbHVlIG9mIHRoZSBgX2AgdmFyaWFibGUuXG4gIHZhciBwcmV2aW91c1VuZGVyc2NvcmUgPSByb290Ll87XG5cbiAgLy8gU2F2ZSBieXRlcyBpbiB0aGUgbWluaWZpZWQgKGJ1dCBub3QgZ3ppcHBlZCkgdmVyc2lvbjpcbiAgdmFyIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGUsIE9ialByb3RvID0gT2JqZWN0LnByb3RvdHlwZSwgRnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuXG4gIC8vIENyZWF0ZSBxdWljayByZWZlcmVuY2UgdmFyaWFibGVzIGZvciBzcGVlZCBhY2Nlc3MgdG8gY29yZSBwcm90b3R5cGVzLlxuICB2YXJcbiAgICBwdXNoICAgICAgICAgICAgID0gQXJyYXlQcm90by5wdXNoLFxuICAgIHNsaWNlICAgICAgICAgICAgPSBBcnJheVByb3RvLnNsaWNlLFxuICAgIHRvU3RyaW5nICAgICAgICAgPSBPYmpQcm90by50b1N0cmluZyxcbiAgICBoYXNPd25Qcm9wZXJ0eSAgID0gT2JqUHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbiAgLy8gQWxsICoqRUNNQVNjcmlwdCA1KiogbmF0aXZlIGZ1bmN0aW9uIGltcGxlbWVudGF0aW9ucyB0aGF0IHdlIGhvcGUgdG8gdXNlXG4gIC8vIGFyZSBkZWNsYXJlZCBoZXJlLlxuICB2YXJcbiAgICBuYXRpdmVJc0FycmF5ICAgICAgPSBBcnJheS5pc0FycmF5LFxuICAgIG5hdGl2ZUtleXMgICAgICAgICA9IE9iamVjdC5rZXlzLFxuICAgIG5hdGl2ZUJpbmQgICAgICAgICA9IEZ1bmNQcm90by5iaW5kLFxuICAgIG5hdGl2ZUNyZWF0ZSAgICAgICA9IE9iamVjdC5jcmVhdGU7XG5cbiAgLy8gTmFrZWQgZnVuY3Rpb24gcmVmZXJlbmNlIGZvciBzdXJyb2dhdGUtcHJvdG90eXBlLXN3YXBwaW5nLlxuICB2YXIgQ3RvciA9IGZ1bmN0aW9uKCl7fTtcblxuICAvLyBDcmVhdGUgYSBzYWZlIHJlZmVyZW5jZSB0byB0aGUgVW5kZXJzY29yZSBvYmplY3QgZm9yIHVzZSBiZWxvdy5cbiAgdmFyIF8gPSBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgXykgcmV0dXJuIG9iajtcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgXykpIHJldHVybiBuZXcgXyhvYmopO1xuICAgIHRoaXMuX3dyYXBwZWQgPSBvYmo7XG4gIH07XG5cbiAgLy8gRXhwb3J0IHRoZSBVbmRlcnNjb3JlIG9iamVjdCBmb3IgKipOb2RlLmpzKiosIHdpdGhcbiAgLy8gYmFja3dhcmRzLWNvbXBhdGliaWxpdHkgZm9yIHRoZSBvbGQgYHJlcXVpcmUoKWAgQVBJLiBJZiB3ZSdyZSBpblxuICAvLyB0aGUgYnJvd3NlciwgYWRkIGBfYCBhcyBhIGdsb2JhbCBvYmplY3QuXG4gIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAgIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IF87XG4gICAgfVxuICAgIGV4cG9ydHMuXyA9IF87XG4gIH0gZWxzZSB7XG4gICAgcm9vdC5fID0gXztcbiAgfVxuXG4gIC8vIEN1cnJlbnQgdmVyc2lvbi5cbiAgXy5WRVJTSU9OID0gJzEuOC4zJztcblxuICAvLyBJbnRlcm5hbCBmdW5jdGlvbiB0aGF0IHJldHVybnMgYW4gZWZmaWNpZW50IChmb3IgY3VycmVudCBlbmdpbmVzKSB2ZXJzaW9uXG4gIC8vIG9mIHRoZSBwYXNzZWQtaW4gY2FsbGJhY2ssIHRvIGJlIHJlcGVhdGVkbHkgYXBwbGllZCBpbiBvdGhlciBVbmRlcnNjb3JlXG4gIC8vIGZ1bmN0aW9ucy5cbiAgdmFyIG9wdGltaXplQ2IgPSBmdW5jdGlvbihmdW5jLCBjb250ZXh0LCBhcmdDb3VudCkge1xuICAgIGlmIChjb250ZXh0ID09PSB2b2lkIDApIHJldHVybiBmdW5jO1xuICAgIHN3aXRjaCAoYXJnQ291bnQgPT0gbnVsbCA/IDMgOiBhcmdDb3VudCkge1xuICAgICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmMuY2FsbChjb250ZXh0LCB2YWx1ZSk7XG4gICAgICB9O1xuICAgICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24odmFsdWUsIG90aGVyKSB7XG4gICAgICAgIHJldHVybiBmdW5jLmNhbGwoY29udGV4dCwgdmFsdWUsIG90aGVyKTtcbiAgICAgIH07XG4gICAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIGZ1bmMuY2FsbChjb250ZXh0LCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pO1xuICAgICAgfTtcbiAgICAgIGNhc2UgNDogcmV0dXJuIGZ1bmN0aW9uKGFjY3VtdWxhdG9yLCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIGZ1bmMuY2FsbChjb250ZXh0LCBhY2N1bXVsYXRvciwgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKTtcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfTtcblxuICAvLyBBIG1vc3RseS1pbnRlcm5hbCBmdW5jdGlvbiB0byBnZW5lcmF0ZSBjYWxsYmFja3MgdGhhdCBjYW4gYmUgYXBwbGllZFxuICAvLyB0byBlYWNoIGVsZW1lbnQgaW4gYSBjb2xsZWN0aW9uLCByZXR1cm5pbmcgdGhlIGRlc2lyZWQgcmVzdWx0IOKAlCBlaXRoZXJcbiAgLy8gaWRlbnRpdHksIGFuIGFyYml0cmFyeSBjYWxsYmFjaywgYSBwcm9wZXJ0eSBtYXRjaGVyLCBvciBhIHByb3BlcnR5IGFjY2Vzc29yLlxuICB2YXIgY2IgPSBmdW5jdGlvbih2YWx1ZSwgY29udGV4dCwgYXJnQ291bnQpIHtcbiAgICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuIF8uaWRlbnRpdHk7XG4gICAgaWYgKF8uaXNGdW5jdGlvbih2YWx1ZSkpIHJldHVybiBvcHRpbWl6ZUNiKHZhbHVlLCBjb250ZXh0LCBhcmdDb3VudCk7XG4gICAgaWYgKF8uaXNPYmplY3QodmFsdWUpKSByZXR1cm4gXy5tYXRjaGVyKHZhbHVlKTtcbiAgICByZXR1cm4gXy5wcm9wZXJ0eSh2YWx1ZSk7XG4gIH07XG4gIF8uaXRlcmF0ZWUgPSBmdW5jdGlvbih2YWx1ZSwgY29udGV4dCkge1xuICAgIHJldHVybiBjYih2YWx1ZSwgY29udGV4dCwgSW5maW5pdHkpO1xuICB9O1xuXG4gIC8vIEFuIGludGVybmFsIGZ1bmN0aW9uIGZvciBjcmVhdGluZyBhc3NpZ25lciBmdW5jdGlvbnMuXG4gIHZhciBjcmVhdGVBc3NpZ25lciA9IGZ1bmN0aW9uKGtleXNGdW5jLCB1bmRlZmluZWRPbmx5KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKG9iaikge1xuICAgICAgdmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICBpZiAobGVuZ3RoIDwgMiB8fCBvYmogPT0gbnVsbCkgcmV0dXJuIG9iajtcbiAgICAgIGZvciAodmFyIGluZGV4ID0gMTsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpbmRleF0sXG4gICAgICAgICAgICBrZXlzID0ga2V5c0Z1bmMoc291cmNlKSxcbiAgICAgICAgICAgIGwgPSBrZXlzLmxlbmd0aDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICBpZiAoIXVuZGVmaW5lZE9ubHkgfHwgb2JqW2tleV0gPT09IHZvaWQgMCkgb2JqW2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG9iajtcbiAgICB9O1xuICB9O1xuXG4gIC8vIEFuIGludGVybmFsIGZ1bmN0aW9uIGZvciBjcmVhdGluZyBhIG5ldyBvYmplY3QgdGhhdCBpbmhlcml0cyBmcm9tIGFub3RoZXIuXG4gIHZhciBiYXNlQ3JlYXRlID0gZnVuY3Rpb24ocHJvdG90eXBlKSB7XG4gICAgaWYgKCFfLmlzT2JqZWN0KHByb3RvdHlwZSkpIHJldHVybiB7fTtcbiAgICBpZiAobmF0aXZlQ3JlYXRlKSByZXR1cm4gbmF0aXZlQ3JlYXRlKHByb3RvdHlwZSk7XG4gICAgQ3Rvci5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG4gICAgdmFyIHJlc3VsdCA9IG5ldyBDdG9yO1xuICAgIEN0b3IucHJvdG90eXBlID0gbnVsbDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIHZhciBwcm9wZXJ0eSA9IGZ1bmN0aW9uKGtleSkge1xuICAgIHJldHVybiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogPT0gbnVsbCA/IHZvaWQgMCA6IG9ialtrZXldO1xuICAgIH07XG4gIH07XG5cbiAgLy8gSGVscGVyIGZvciBjb2xsZWN0aW9uIG1ldGhvZHMgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgYSBjb2xsZWN0aW9uXG4gIC8vIHNob3VsZCBiZSBpdGVyYXRlZCBhcyBhbiBhcnJheSBvciBhcyBhbiBvYmplY3RcbiAgLy8gUmVsYXRlZDogaHR0cDovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtdG9sZW5ndGhcbiAgLy8gQXZvaWRzIGEgdmVyeSBuYXN0eSBpT1MgOCBKSVQgYnVnIG9uIEFSTS02NC4gIzIwOTRcbiAgdmFyIE1BWF9BUlJBWV9JTkRFWCA9IE1hdGgucG93KDIsIDUzKSAtIDE7XG4gIHZhciBnZXRMZW5ndGggPSBwcm9wZXJ0eSgnbGVuZ3RoJyk7XG4gIHZhciBpc0FycmF5TGlrZSA9IGZ1bmN0aW9uKGNvbGxlY3Rpb24pIHtcbiAgICB2YXIgbGVuZ3RoID0gZ2V0TGVuZ3RoKGNvbGxlY3Rpb24pO1xuICAgIHJldHVybiB0eXBlb2YgbGVuZ3RoID09ICdudW1iZXInICYmIGxlbmd0aCA+PSAwICYmIGxlbmd0aCA8PSBNQVhfQVJSQVlfSU5ERVg7XG4gIH07XG5cbiAgLy8gQ29sbGVjdGlvbiBGdW5jdGlvbnNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvLyBUaGUgY29ybmVyc3RvbmUsIGFuIGBlYWNoYCBpbXBsZW1lbnRhdGlvbiwgYWthIGBmb3JFYWNoYC5cbiAgLy8gSGFuZGxlcyByYXcgb2JqZWN0cyBpbiBhZGRpdGlvbiB0byBhcnJheS1saWtlcy4gVHJlYXRzIGFsbFxuICAvLyBzcGFyc2UgYXJyYXktbGlrZXMgYXMgaWYgdGhleSB3ZXJlIGRlbnNlLlxuICBfLmVhY2ggPSBfLmZvckVhY2ggPSBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgaXRlcmF0ZWUgPSBvcHRpbWl6ZUNiKGl0ZXJhdGVlLCBjb250ZXh0KTtcbiAgICB2YXIgaSwgbGVuZ3RoO1xuICAgIGlmIChpc0FycmF5TGlrZShvYmopKSB7XG4gICAgICBmb3IgKGkgPSAwLCBsZW5ndGggPSBvYmoubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaXRlcmF0ZWUob2JqW2ldLCBpLCBvYmopO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIga2V5cyA9IF8ua2V5cyhvYmopO1xuICAgICAgZm9yIChpID0gMCwgbGVuZ3RoID0ga2V5cy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpdGVyYXRlZShvYmpba2V5c1tpXV0sIGtleXNbaV0sIG9iaik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH07XG5cbiAgLy8gUmV0dXJuIHRoZSByZXN1bHRzIG9mIGFwcGx5aW5nIHRoZSBpdGVyYXRlZSB0byBlYWNoIGVsZW1lbnQuXG4gIF8ubWFwID0gXy5jb2xsZWN0ID0gZnVuY3Rpb24ob2JqLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgIGl0ZXJhdGVlID0gY2IoaXRlcmF0ZWUsIGNvbnRleHQpO1xuICAgIHZhciBrZXlzID0gIWlzQXJyYXlMaWtlKG9iaikgJiYgXy5rZXlzKG9iaiksXG4gICAgICAgIGxlbmd0aCA9IChrZXlzIHx8IG9iaikubGVuZ3RoLFxuICAgICAgICByZXN1bHRzID0gQXJyYXkobGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICB2YXIgY3VycmVudEtleSA9IGtleXMgPyBrZXlzW2luZGV4XSA6IGluZGV4O1xuICAgICAgcmVzdWx0c1tpbmRleF0gPSBpdGVyYXRlZShvYmpbY3VycmVudEtleV0sIGN1cnJlbnRLZXksIG9iaik7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xuICB9O1xuXG4gIC8vIENyZWF0ZSBhIHJlZHVjaW5nIGZ1bmN0aW9uIGl0ZXJhdGluZyBsZWZ0IG9yIHJpZ2h0LlxuICBmdW5jdGlvbiBjcmVhdGVSZWR1Y2UoZGlyKSB7XG4gICAgLy8gT3B0aW1pemVkIGl0ZXJhdG9yIGZ1bmN0aW9uIGFzIHVzaW5nIGFyZ3VtZW50cy5sZW5ndGhcbiAgICAvLyBpbiB0aGUgbWFpbiBmdW5jdGlvbiB3aWxsIGRlb3B0aW1pemUgdGhlLCBzZWUgIzE5OTEuXG4gICAgZnVuY3Rpb24gaXRlcmF0b3Iob2JqLCBpdGVyYXRlZSwgbWVtbywga2V5cywgaW5kZXgsIGxlbmd0aCkge1xuICAgICAgZm9yICg7IGluZGV4ID49IDAgJiYgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IGRpcikge1xuICAgICAgICB2YXIgY3VycmVudEtleSA9IGtleXMgPyBrZXlzW2luZGV4XSA6IGluZGV4O1xuICAgICAgICBtZW1vID0gaXRlcmF0ZWUobWVtbywgb2JqW2N1cnJlbnRLZXldLCBjdXJyZW50S2V5LCBvYmopO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG1lbW87XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKG9iaiwgaXRlcmF0ZWUsIG1lbW8sIGNvbnRleHQpIHtcbiAgICAgIGl0ZXJhdGVlID0gb3B0aW1pemVDYihpdGVyYXRlZSwgY29udGV4dCwgNCk7XG4gICAgICB2YXIga2V5cyA9ICFpc0FycmF5TGlrZShvYmopICYmIF8ua2V5cyhvYmopLFxuICAgICAgICAgIGxlbmd0aCA9IChrZXlzIHx8IG9iaikubGVuZ3RoLFxuICAgICAgICAgIGluZGV4ID0gZGlyID4gMCA/IDAgOiBsZW5ndGggLSAxO1xuICAgICAgLy8gRGV0ZXJtaW5lIHRoZSBpbml0aWFsIHZhbHVlIGlmIG5vbmUgaXMgcHJvdmlkZWQuXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDMpIHtcbiAgICAgICAgbWVtbyA9IG9ialtrZXlzID8ga2V5c1tpbmRleF0gOiBpbmRleF07XG4gICAgICAgIGluZGV4ICs9IGRpcjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpdGVyYXRvcihvYmosIGl0ZXJhdGVlLCBtZW1vLCBrZXlzLCBpbmRleCwgbGVuZ3RoKTtcbiAgICB9O1xuICB9XG5cbiAgLy8gKipSZWR1Y2UqKiBidWlsZHMgdXAgYSBzaW5nbGUgcmVzdWx0IGZyb20gYSBsaXN0IG9mIHZhbHVlcywgYWthIGBpbmplY3RgLFxuICAvLyBvciBgZm9sZGxgLlxuICBfLnJlZHVjZSA9IF8uZm9sZGwgPSBfLmluamVjdCA9IGNyZWF0ZVJlZHVjZSgxKTtcblxuICAvLyBUaGUgcmlnaHQtYXNzb2NpYXRpdmUgdmVyc2lvbiBvZiByZWR1Y2UsIGFsc28ga25vd24gYXMgYGZvbGRyYC5cbiAgXy5yZWR1Y2VSaWdodCA9IF8uZm9sZHIgPSBjcmVhdGVSZWR1Y2UoLTEpO1xuXG4gIC8vIFJldHVybiB0aGUgZmlyc3QgdmFsdWUgd2hpY2ggcGFzc2VzIGEgdHJ1dGggdGVzdC4gQWxpYXNlZCBhcyBgZGV0ZWN0YC5cbiAgXy5maW5kID0gXy5kZXRlY3QgPSBmdW5jdGlvbihvYmosIHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBrZXk7XG4gICAgaWYgKGlzQXJyYXlMaWtlKG9iaikpIHtcbiAgICAgIGtleSA9IF8uZmluZEluZGV4KG9iaiwgcHJlZGljYXRlLCBjb250ZXh0KTtcbiAgICB9IGVsc2Uge1xuICAgICAga2V5ID0gXy5maW5kS2V5KG9iaiwgcHJlZGljYXRlLCBjb250ZXh0KTtcbiAgICB9XG4gICAgaWYgKGtleSAhPT0gdm9pZCAwICYmIGtleSAhPT0gLTEpIHJldHVybiBvYmpba2V5XTtcbiAgfTtcblxuICAvLyBSZXR1cm4gYWxsIHRoZSBlbGVtZW50cyB0aGF0IHBhc3MgYSB0cnV0aCB0ZXN0LlxuICAvLyBBbGlhc2VkIGFzIGBzZWxlY3RgLlxuICBfLmZpbHRlciA9IF8uc2VsZWN0ID0gZnVuY3Rpb24ob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgIHByZWRpY2F0ZSA9IGNiKHByZWRpY2F0ZSwgY29udGV4dCk7XG4gICAgXy5lYWNoKG9iaiwgZnVuY3Rpb24odmFsdWUsIGluZGV4LCBsaXN0KSB7XG4gICAgICBpZiAocHJlZGljYXRlKHZhbHVlLCBpbmRleCwgbGlzdCkpIHJlc3VsdHMucHVzaCh2YWx1ZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH07XG5cbiAgLy8gUmV0dXJuIGFsbCB0aGUgZWxlbWVudHMgZm9yIHdoaWNoIGEgdHJ1dGggdGVzdCBmYWlscy5cbiAgXy5yZWplY3QgPSBmdW5jdGlvbihvYmosIHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIHJldHVybiBfLmZpbHRlcihvYmosIF8ubmVnYXRlKGNiKHByZWRpY2F0ZSkpLCBjb250ZXh0KTtcbiAgfTtcblxuICAvLyBEZXRlcm1pbmUgd2hldGhlciBhbGwgb2YgdGhlIGVsZW1lbnRzIG1hdGNoIGEgdHJ1dGggdGVzdC5cbiAgLy8gQWxpYXNlZCBhcyBgYWxsYC5cbiAgXy5ldmVyeSA9IF8uYWxsID0gZnVuY3Rpb24ob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICBwcmVkaWNhdGUgPSBjYihwcmVkaWNhdGUsIGNvbnRleHQpO1xuICAgIHZhciBrZXlzID0gIWlzQXJyYXlMaWtlKG9iaikgJiYgXy5rZXlzKG9iaiksXG4gICAgICAgIGxlbmd0aCA9IChrZXlzIHx8IG9iaikubGVuZ3RoO1xuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIHZhciBjdXJyZW50S2V5ID0ga2V5cyA/IGtleXNbaW5kZXhdIDogaW5kZXg7XG4gICAgICBpZiAoIXByZWRpY2F0ZShvYmpbY3VycmVudEtleV0sIGN1cnJlbnRLZXksIG9iaikpIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgLy8gRGV0ZXJtaW5lIGlmIGF0IGxlYXN0IG9uZSBlbGVtZW50IGluIHRoZSBvYmplY3QgbWF0Y2hlcyBhIHRydXRoIHRlc3QuXG4gIC8vIEFsaWFzZWQgYXMgYGFueWAuXG4gIF8uc29tZSA9IF8uYW55ID0gZnVuY3Rpb24ob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICBwcmVkaWNhdGUgPSBjYihwcmVkaWNhdGUsIGNvbnRleHQpO1xuICAgIHZhciBrZXlzID0gIWlzQXJyYXlMaWtlKG9iaikgJiYgXy5rZXlzKG9iaiksXG4gICAgICAgIGxlbmd0aCA9IChrZXlzIHx8IG9iaikubGVuZ3RoO1xuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIHZhciBjdXJyZW50S2V5ID0ga2V5cyA/IGtleXNbaW5kZXhdIDogaW5kZXg7XG4gICAgICBpZiAocHJlZGljYXRlKG9ialtjdXJyZW50S2V5XSwgY3VycmVudEtleSwgb2JqKSkgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICAvLyBEZXRlcm1pbmUgaWYgdGhlIGFycmF5IG9yIG9iamVjdCBjb250YWlucyBhIGdpdmVuIGl0ZW0gKHVzaW5nIGA9PT1gKS5cbiAgLy8gQWxpYXNlZCBhcyBgaW5jbHVkZXNgIGFuZCBgaW5jbHVkZWAuXG4gIF8uY29udGFpbnMgPSBfLmluY2x1ZGVzID0gXy5pbmNsdWRlID0gZnVuY3Rpb24ob2JqLCBpdGVtLCBmcm9tSW5kZXgsIGd1YXJkKSB7XG4gICAgaWYgKCFpc0FycmF5TGlrZShvYmopKSBvYmogPSBfLnZhbHVlcyhvYmopO1xuICAgIGlmICh0eXBlb2YgZnJvbUluZGV4ICE9ICdudW1iZXInIHx8IGd1YXJkKSBmcm9tSW5kZXggPSAwO1xuICAgIHJldHVybiBfLmluZGV4T2Yob2JqLCBpdGVtLCBmcm9tSW5kZXgpID49IDA7XG4gIH07XG5cbiAgLy8gSW52b2tlIGEgbWV0aG9kICh3aXRoIGFyZ3VtZW50cykgb24gZXZlcnkgaXRlbSBpbiBhIGNvbGxlY3Rpb24uXG4gIF8uaW52b2tlID0gZnVuY3Rpb24ob2JqLCBtZXRob2QpIHtcbiAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcbiAgICB2YXIgaXNGdW5jID0gXy5pc0Z1bmN0aW9uKG1ldGhvZCk7XG4gICAgcmV0dXJuIF8ubWFwKG9iaiwgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHZhciBmdW5jID0gaXNGdW5jID8gbWV0aG9kIDogdmFsdWVbbWV0aG9kXTtcbiAgICAgIHJldHVybiBmdW5jID09IG51bGwgPyBmdW5jIDogZnVuYy5hcHBseSh2YWx1ZSwgYXJncyk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gQ29udmVuaWVuY2UgdmVyc2lvbiBvZiBhIGNvbW1vbiB1c2UgY2FzZSBvZiBgbWFwYDogZmV0Y2hpbmcgYSBwcm9wZXJ0eS5cbiAgXy5wbHVjayA9IGZ1bmN0aW9uKG9iaiwga2V5KSB7XG4gICAgcmV0dXJuIF8ubWFwKG9iaiwgXy5wcm9wZXJ0eShrZXkpKTtcbiAgfTtcblxuICAvLyBDb252ZW5pZW5jZSB2ZXJzaW9uIG9mIGEgY29tbW9uIHVzZSBjYXNlIG9mIGBmaWx0ZXJgOiBzZWxlY3Rpbmcgb25seSBvYmplY3RzXG4gIC8vIGNvbnRhaW5pbmcgc3BlY2lmaWMgYGtleTp2YWx1ZWAgcGFpcnMuXG4gIF8ud2hlcmUgPSBmdW5jdGlvbihvYmosIGF0dHJzKSB7XG4gICAgcmV0dXJuIF8uZmlsdGVyKG9iaiwgXy5tYXRjaGVyKGF0dHJzKSk7XG4gIH07XG5cbiAgLy8gQ29udmVuaWVuY2UgdmVyc2lvbiBvZiBhIGNvbW1vbiB1c2UgY2FzZSBvZiBgZmluZGA6IGdldHRpbmcgdGhlIGZpcnN0IG9iamVjdFxuICAvLyBjb250YWluaW5nIHNwZWNpZmljIGBrZXk6dmFsdWVgIHBhaXJzLlxuICBfLmZpbmRXaGVyZSA9IGZ1bmN0aW9uKG9iaiwgYXR0cnMpIHtcbiAgICByZXR1cm4gXy5maW5kKG9iaiwgXy5tYXRjaGVyKGF0dHJzKSk7XG4gIH07XG5cbiAgLy8gUmV0dXJuIHRoZSBtYXhpbXVtIGVsZW1lbnQgKG9yIGVsZW1lbnQtYmFzZWQgY29tcHV0YXRpb24pLlxuICBfLm1heCA9IGZ1bmN0aW9uKG9iaiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICB2YXIgcmVzdWx0ID0gLUluZmluaXR5LCBsYXN0Q29tcHV0ZWQgPSAtSW5maW5pdHksXG4gICAgICAgIHZhbHVlLCBjb21wdXRlZDtcbiAgICBpZiAoaXRlcmF0ZWUgPT0gbnVsbCAmJiBvYmogIT0gbnVsbCkge1xuICAgICAgb2JqID0gaXNBcnJheUxpa2Uob2JqKSA/IG9iaiA6IF8udmFsdWVzKG9iaik7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gb2JqLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhbHVlID0gb2JqW2ldO1xuICAgICAgICBpZiAodmFsdWUgPiByZXN1bHQpIHtcbiAgICAgICAgICByZXN1bHQgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpdGVyYXRlZSA9IGNiKGl0ZXJhdGVlLCBjb250ZXh0KTtcbiAgICAgIF8uZWFjaChvYmosIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgbGlzdCkge1xuICAgICAgICBjb21wdXRlZCA9IGl0ZXJhdGVlKHZhbHVlLCBpbmRleCwgbGlzdCk7XG4gICAgICAgIGlmIChjb21wdXRlZCA+IGxhc3RDb21wdXRlZCB8fCBjb21wdXRlZCA9PT0gLUluZmluaXR5ICYmIHJlc3VsdCA9PT0gLUluZmluaXR5KSB7XG4gICAgICAgICAgcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgICAgbGFzdENvbXB1dGVkID0gY29tcHV0ZWQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIFJldHVybiB0aGUgbWluaW11bSBlbGVtZW50IChvciBlbGVtZW50LWJhc2VkIGNvbXB1dGF0aW9uKS5cbiAgXy5taW4gPSBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgdmFyIHJlc3VsdCA9IEluZmluaXR5LCBsYXN0Q29tcHV0ZWQgPSBJbmZpbml0eSxcbiAgICAgICAgdmFsdWUsIGNvbXB1dGVkO1xuICAgIGlmIChpdGVyYXRlZSA9PSBudWxsICYmIG9iaiAhPSBudWxsKSB7XG4gICAgICBvYmogPSBpc0FycmF5TGlrZShvYmopID8gb2JqIDogXy52YWx1ZXMob2JqKTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBvYmoubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFsdWUgPSBvYmpbaV07XG4gICAgICAgIGlmICh2YWx1ZSA8IHJlc3VsdCkge1xuICAgICAgICAgIHJlc3VsdCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGl0ZXJhdGVlID0gY2IoaXRlcmF0ZWUsIGNvbnRleHQpO1xuICAgICAgXy5lYWNoKG9iaiwgZnVuY3Rpb24odmFsdWUsIGluZGV4LCBsaXN0KSB7XG4gICAgICAgIGNvbXB1dGVkID0gaXRlcmF0ZWUodmFsdWUsIGluZGV4LCBsaXN0KTtcbiAgICAgICAgaWYgKGNvbXB1dGVkIDwgbGFzdENvbXB1dGVkIHx8IGNvbXB1dGVkID09PSBJbmZpbml0eSAmJiByZXN1bHQgPT09IEluZmluaXR5KSB7XG4gICAgICAgICAgcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgICAgbGFzdENvbXB1dGVkID0gY29tcHV0ZWQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIFNodWZmbGUgYSBjb2xsZWN0aW9uLCB1c2luZyB0aGUgbW9kZXJuIHZlcnNpb24gb2YgdGhlXG4gIC8vIFtGaXNoZXItWWF0ZXMgc2h1ZmZsZV0oaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9GaXNoZXLigJNZYXRlc19zaHVmZmxlKS5cbiAgXy5zaHVmZmxlID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIHNldCA9IGlzQXJyYXlMaWtlKG9iaikgPyBvYmogOiBfLnZhbHVlcyhvYmopO1xuICAgIHZhciBsZW5ndGggPSBzZXQubGVuZ3RoO1xuICAgIHZhciBzaHVmZmxlZCA9IEFycmF5KGxlbmd0aCk7XG4gICAgZm9yICh2YXIgaW5kZXggPSAwLCByYW5kOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgcmFuZCA9IF8ucmFuZG9tKDAsIGluZGV4KTtcbiAgICAgIGlmIChyYW5kICE9PSBpbmRleCkgc2h1ZmZsZWRbaW5kZXhdID0gc2h1ZmZsZWRbcmFuZF07XG4gICAgICBzaHVmZmxlZFtyYW5kXSA9IHNldFtpbmRleF07XG4gICAgfVxuICAgIHJldHVybiBzaHVmZmxlZDtcbiAgfTtcblxuICAvLyBTYW1wbGUgKipuKiogcmFuZG9tIHZhbHVlcyBmcm9tIGEgY29sbGVjdGlvbi5cbiAgLy8gSWYgKipuKiogaXMgbm90IHNwZWNpZmllZCwgcmV0dXJucyBhIHNpbmdsZSByYW5kb20gZWxlbWVudC5cbiAgLy8gVGhlIGludGVybmFsIGBndWFyZGAgYXJndW1lbnQgYWxsb3dzIGl0IHRvIHdvcmsgd2l0aCBgbWFwYC5cbiAgXy5zYW1wbGUgPSBmdW5jdGlvbihvYmosIG4sIGd1YXJkKSB7XG4gICAgaWYgKG4gPT0gbnVsbCB8fCBndWFyZCkge1xuICAgICAgaWYgKCFpc0FycmF5TGlrZShvYmopKSBvYmogPSBfLnZhbHVlcyhvYmopO1xuICAgICAgcmV0dXJuIG9ialtfLnJhbmRvbShvYmoubGVuZ3RoIC0gMSldO1xuICAgIH1cbiAgICByZXR1cm4gXy5zaHVmZmxlKG9iaikuc2xpY2UoMCwgTWF0aC5tYXgoMCwgbikpO1xuICB9O1xuXG4gIC8vIFNvcnQgdGhlIG9iamVjdCdzIHZhbHVlcyBieSBhIGNyaXRlcmlvbiBwcm9kdWNlZCBieSBhbiBpdGVyYXRlZS5cbiAgXy5zb3J0QnkgPSBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgaXRlcmF0ZWUgPSBjYihpdGVyYXRlZSwgY29udGV4dCk7XG4gICAgcmV0dXJuIF8ucGx1Y2soXy5tYXAob2JqLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGxpc3QpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICBjcml0ZXJpYTogaXRlcmF0ZWUodmFsdWUsIGluZGV4LCBsaXN0KVxuICAgICAgfTtcbiAgICB9KS5zb3J0KGZ1bmN0aW9uKGxlZnQsIHJpZ2h0KSB7XG4gICAgICB2YXIgYSA9IGxlZnQuY3JpdGVyaWE7XG4gICAgICB2YXIgYiA9IHJpZ2h0LmNyaXRlcmlhO1xuICAgICAgaWYgKGEgIT09IGIpIHtcbiAgICAgICAgaWYgKGEgPiBiIHx8IGEgPT09IHZvaWQgMCkgcmV0dXJuIDE7XG4gICAgICAgIGlmIChhIDwgYiB8fCBiID09PSB2b2lkIDApIHJldHVybiAtMTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBsZWZ0LmluZGV4IC0gcmlnaHQuaW5kZXg7XG4gICAgfSksICd2YWx1ZScpO1xuICB9O1xuXG4gIC8vIEFuIGludGVybmFsIGZ1bmN0aW9uIHVzZWQgZm9yIGFnZ3JlZ2F0ZSBcImdyb3VwIGJ5XCIgb3BlcmF0aW9ucy5cbiAgdmFyIGdyb3VwID0gZnVuY3Rpb24oYmVoYXZpb3IpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24ob2JqLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgICAgaXRlcmF0ZWUgPSBjYihpdGVyYXRlZSwgY29udGV4dCk7XG4gICAgICBfLmVhY2gob2JqLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgpIHtcbiAgICAgICAgdmFyIGtleSA9IGl0ZXJhdGVlKHZhbHVlLCBpbmRleCwgb2JqKTtcbiAgICAgICAgYmVoYXZpb3IocmVzdWx0LCB2YWx1ZSwga2V5KTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICB9O1xuXG4gIC8vIEdyb3VwcyB0aGUgb2JqZWN0J3MgdmFsdWVzIGJ5IGEgY3JpdGVyaW9uLiBQYXNzIGVpdGhlciBhIHN0cmluZyBhdHRyaWJ1dGVcbiAgLy8gdG8gZ3JvdXAgYnksIG9yIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBjcml0ZXJpb24uXG4gIF8uZ3JvdXBCeSA9IGdyb3VwKGZ1bmN0aW9uKHJlc3VsdCwgdmFsdWUsIGtleSkge1xuICAgIGlmIChfLmhhcyhyZXN1bHQsIGtleSkpIHJlc3VsdFtrZXldLnB1c2godmFsdWUpOyBlbHNlIHJlc3VsdFtrZXldID0gW3ZhbHVlXTtcbiAgfSk7XG5cbiAgLy8gSW5kZXhlcyB0aGUgb2JqZWN0J3MgdmFsdWVzIGJ5IGEgY3JpdGVyaW9uLCBzaW1pbGFyIHRvIGBncm91cEJ5YCwgYnV0IGZvclxuICAvLyB3aGVuIHlvdSBrbm93IHRoYXQgeW91ciBpbmRleCB2YWx1ZXMgd2lsbCBiZSB1bmlxdWUuXG4gIF8uaW5kZXhCeSA9IGdyb3VwKGZ1bmN0aW9uKHJlc3VsdCwgdmFsdWUsIGtleSkge1xuICAgIHJlc3VsdFtrZXldID0gdmFsdWU7XG4gIH0pO1xuXG4gIC8vIENvdW50cyBpbnN0YW5jZXMgb2YgYW4gb2JqZWN0IHRoYXQgZ3JvdXAgYnkgYSBjZXJ0YWluIGNyaXRlcmlvbi4gUGFzc1xuICAvLyBlaXRoZXIgYSBzdHJpbmcgYXR0cmlidXRlIHRvIGNvdW50IGJ5LCBvciBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGVcbiAgLy8gY3JpdGVyaW9uLlxuICBfLmNvdW50QnkgPSBncm91cChmdW5jdGlvbihyZXN1bHQsIHZhbHVlLCBrZXkpIHtcbiAgICBpZiAoXy5oYXMocmVzdWx0LCBrZXkpKSByZXN1bHRba2V5XSsrOyBlbHNlIHJlc3VsdFtrZXldID0gMTtcbiAgfSk7XG5cbiAgLy8gU2FmZWx5IGNyZWF0ZSBhIHJlYWwsIGxpdmUgYXJyYXkgZnJvbSBhbnl0aGluZyBpdGVyYWJsZS5cbiAgXy50b0FycmF5ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKCFvYmopIHJldHVybiBbXTtcbiAgICBpZiAoXy5pc0FycmF5KG9iaikpIHJldHVybiBzbGljZS5jYWxsKG9iaik7XG4gICAgaWYgKGlzQXJyYXlMaWtlKG9iaikpIHJldHVybiBfLm1hcChvYmosIF8uaWRlbnRpdHkpO1xuICAgIHJldHVybiBfLnZhbHVlcyhvYmopO1xuICB9O1xuXG4gIC8vIFJldHVybiB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIGFuIG9iamVjdC5cbiAgXy5zaXplID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKG9iaiA9PSBudWxsKSByZXR1cm4gMDtcbiAgICByZXR1cm4gaXNBcnJheUxpa2Uob2JqKSA/IG9iai5sZW5ndGggOiBfLmtleXMob2JqKS5sZW5ndGg7XG4gIH07XG5cbiAgLy8gU3BsaXQgYSBjb2xsZWN0aW9uIGludG8gdHdvIGFycmF5czogb25lIHdob3NlIGVsZW1lbnRzIGFsbCBzYXRpc2Z5IHRoZSBnaXZlblxuICAvLyBwcmVkaWNhdGUsIGFuZCBvbmUgd2hvc2UgZWxlbWVudHMgYWxsIGRvIG5vdCBzYXRpc2Z5IHRoZSBwcmVkaWNhdGUuXG4gIF8ucGFydGl0aW9uID0gZnVuY3Rpb24ob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICBwcmVkaWNhdGUgPSBjYihwcmVkaWNhdGUsIGNvbnRleHQpO1xuICAgIHZhciBwYXNzID0gW10sIGZhaWwgPSBbXTtcbiAgICBfLmVhY2gob2JqLCBmdW5jdGlvbih2YWx1ZSwga2V5LCBvYmopIHtcbiAgICAgIChwcmVkaWNhdGUodmFsdWUsIGtleSwgb2JqKSA/IHBhc3MgOiBmYWlsKS5wdXNoKHZhbHVlKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW3Bhc3MsIGZhaWxdO1xuICB9O1xuXG4gIC8vIEFycmF5IEZ1bmN0aW9uc1xuICAvLyAtLS0tLS0tLS0tLS0tLS1cblxuICAvLyBHZXQgdGhlIGZpcnN0IGVsZW1lbnQgb2YgYW4gYXJyYXkuIFBhc3NpbmcgKipuKiogd2lsbCByZXR1cm4gdGhlIGZpcnN0IE5cbiAgLy8gdmFsdWVzIGluIHRoZSBhcnJheS4gQWxpYXNlZCBhcyBgaGVhZGAgYW5kIGB0YWtlYC4gVGhlICoqZ3VhcmQqKiBjaGVja1xuICAvLyBhbGxvd3MgaXQgdG8gd29yayB3aXRoIGBfLm1hcGAuXG4gIF8uZmlyc3QgPSBfLmhlYWQgPSBfLnRha2UgPSBmdW5jdGlvbihhcnJheSwgbiwgZ3VhcmQpIHtcbiAgICBpZiAoYXJyYXkgPT0gbnVsbCkgcmV0dXJuIHZvaWQgMDtcbiAgICBpZiAobiA9PSBudWxsIHx8IGd1YXJkKSByZXR1cm4gYXJyYXlbMF07XG4gICAgcmV0dXJuIF8uaW5pdGlhbChhcnJheSwgYXJyYXkubGVuZ3RoIC0gbik7XG4gIH07XG5cbiAgLy8gUmV0dXJucyBldmVyeXRoaW5nIGJ1dCB0aGUgbGFzdCBlbnRyeSBvZiB0aGUgYXJyYXkuIEVzcGVjaWFsbHkgdXNlZnVsIG9uXG4gIC8vIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBQYXNzaW5nICoqbioqIHdpbGwgcmV0dXJuIGFsbCB0aGUgdmFsdWVzIGluXG4gIC8vIHRoZSBhcnJheSwgZXhjbHVkaW5nIHRoZSBsYXN0IE4uXG4gIF8uaW5pdGlhbCA9IGZ1bmN0aW9uKGFycmF5LCBuLCBndWFyZCkge1xuICAgIHJldHVybiBzbGljZS5jYWxsKGFycmF5LCAwLCBNYXRoLm1heCgwLCBhcnJheS5sZW5ndGggLSAobiA9PSBudWxsIHx8IGd1YXJkID8gMSA6IG4pKSk7XG4gIH07XG5cbiAgLy8gR2V0IHRoZSBsYXN0IGVsZW1lbnQgb2YgYW4gYXJyYXkuIFBhc3NpbmcgKipuKiogd2lsbCByZXR1cm4gdGhlIGxhc3QgTlxuICAvLyB2YWx1ZXMgaW4gdGhlIGFycmF5LlxuICBfLmxhc3QgPSBmdW5jdGlvbihhcnJheSwgbiwgZ3VhcmQpIHtcbiAgICBpZiAoYXJyYXkgPT0gbnVsbCkgcmV0dXJuIHZvaWQgMDtcbiAgICBpZiAobiA9PSBudWxsIHx8IGd1YXJkKSByZXR1cm4gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMV07XG4gICAgcmV0dXJuIF8ucmVzdChhcnJheSwgTWF0aC5tYXgoMCwgYXJyYXkubGVuZ3RoIC0gbikpO1xuICB9O1xuXG4gIC8vIFJldHVybnMgZXZlcnl0aGluZyBidXQgdGhlIGZpcnN0IGVudHJ5IG9mIHRoZSBhcnJheS4gQWxpYXNlZCBhcyBgdGFpbGAgYW5kIGBkcm9wYC5cbiAgLy8gRXNwZWNpYWxseSB1c2VmdWwgb24gdGhlIGFyZ3VtZW50cyBvYmplY3QuIFBhc3NpbmcgYW4gKipuKiogd2lsbCByZXR1cm5cbiAgLy8gdGhlIHJlc3QgTiB2YWx1ZXMgaW4gdGhlIGFycmF5LlxuICBfLnJlc3QgPSBfLnRhaWwgPSBfLmRyb3AgPSBmdW5jdGlvbihhcnJheSwgbiwgZ3VhcmQpIHtcbiAgICByZXR1cm4gc2xpY2UuY2FsbChhcnJheSwgbiA9PSBudWxsIHx8IGd1YXJkID8gMSA6IG4pO1xuICB9O1xuXG4gIC8vIFRyaW0gb3V0IGFsbCBmYWxzeSB2YWx1ZXMgZnJvbSBhbiBhcnJheS5cbiAgXy5jb21wYWN0ID0gZnVuY3Rpb24oYXJyYXkpIHtcbiAgICByZXR1cm4gXy5maWx0ZXIoYXJyYXksIF8uaWRlbnRpdHkpO1xuICB9O1xuXG4gIC8vIEludGVybmFsIGltcGxlbWVudGF0aW9uIG9mIGEgcmVjdXJzaXZlIGBmbGF0dGVuYCBmdW5jdGlvbi5cbiAgdmFyIGZsYXR0ZW4gPSBmdW5jdGlvbihpbnB1dCwgc2hhbGxvdywgc3RyaWN0LCBzdGFydEluZGV4KSB7XG4gICAgdmFyIG91dHB1dCA9IFtdLCBpZHggPSAwO1xuICAgIGZvciAodmFyIGkgPSBzdGFydEluZGV4IHx8IDAsIGxlbmd0aCA9IGdldExlbmd0aChpbnB1dCk7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHZhbHVlID0gaW5wdXRbaV07XG4gICAgICBpZiAoaXNBcnJheUxpa2UodmFsdWUpICYmIChfLmlzQXJyYXkodmFsdWUpIHx8IF8uaXNBcmd1bWVudHModmFsdWUpKSkge1xuICAgICAgICAvL2ZsYXR0ZW4gY3VycmVudCBsZXZlbCBvZiBhcnJheSBvciBhcmd1bWVudHMgb2JqZWN0XG4gICAgICAgIGlmICghc2hhbGxvdykgdmFsdWUgPSBmbGF0dGVuKHZhbHVlLCBzaGFsbG93LCBzdHJpY3QpO1xuICAgICAgICB2YXIgaiA9IDAsIGxlbiA9IHZhbHVlLmxlbmd0aDtcbiAgICAgICAgb3V0cHV0Lmxlbmd0aCArPSBsZW47XG4gICAgICAgIHdoaWxlIChqIDwgbGVuKSB7XG4gICAgICAgICAgb3V0cHV0W2lkeCsrXSA9IHZhbHVlW2orK107XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoIXN0cmljdCkge1xuICAgICAgICBvdXRwdXRbaWR4KytdID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH07XG5cbiAgLy8gRmxhdHRlbiBvdXQgYW4gYXJyYXksIGVpdGhlciByZWN1cnNpdmVseSAoYnkgZGVmYXVsdCksIG9yIGp1c3Qgb25lIGxldmVsLlxuICBfLmZsYXR0ZW4gPSBmdW5jdGlvbihhcnJheSwgc2hhbGxvdykge1xuICAgIHJldHVybiBmbGF0dGVuKGFycmF5LCBzaGFsbG93LCBmYWxzZSk7XG4gIH07XG5cbiAgLy8gUmV0dXJuIGEgdmVyc2lvbiBvZiB0aGUgYXJyYXkgdGhhdCBkb2VzIG5vdCBjb250YWluIHRoZSBzcGVjaWZpZWQgdmFsdWUocykuXG4gIF8ud2l0aG91dCA9IGZ1bmN0aW9uKGFycmF5KSB7XG4gICAgcmV0dXJuIF8uZGlmZmVyZW5jZShhcnJheSwgc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgfTtcblxuICAvLyBQcm9kdWNlIGEgZHVwbGljYXRlLWZyZWUgdmVyc2lvbiBvZiB0aGUgYXJyYXkuIElmIHRoZSBhcnJheSBoYXMgYWxyZWFkeVxuICAvLyBiZWVuIHNvcnRlZCwgeW91IGhhdmUgdGhlIG9wdGlvbiBvZiB1c2luZyBhIGZhc3RlciBhbGdvcml0aG0uXG4gIC8vIEFsaWFzZWQgYXMgYHVuaXF1ZWAuXG4gIF8udW5pcSA9IF8udW5pcXVlID0gZnVuY3Rpb24oYXJyYXksIGlzU29ydGVkLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgIGlmICghXy5pc0Jvb2xlYW4oaXNTb3J0ZWQpKSB7XG4gICAgICBjb250ZXh0ID0gaXRlcmF0ZWU7XG4gICAgICBpdGVyYXRlZSA9IGlzU29ydGVkO1xuICAgICAgaXNTb3J0ZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGl0ZXJhdGVlICE9IG51bGwpIGl0ZXJhdGVlID0gY2IoaXRlcmF0ZWUsIGNvbnRleHQpO1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICB2YXIgc2VlbiA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBnZXRMZW5ndGgoYXJyYXkpOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciB2YWx1ZSA9IGFycmF5W2ldLFxuICAgICAgICAgIGNvbXB1dGVkID0gaXRlcmF0ZWUgPyBpdGVyYXRlZSh2YWx1ZSwgaSwgYXJyYXkpIDogdmFsdWU7XG4gICAgICBpZiAoaXNTb3J0ZWQpIHtcbiAgICAgICAgaWYgKCFpIHx8IHNlZW4gIT09IGNvbXB1dGVkKSByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgICAgIHNlZW4gPSBjb21wdXRlZDtcbiAgICAgIH0gZWxzZSBpZiAoaXRlcmF0ZWUpIHtcbiAgICAgICAgaWYgKCFfLmNvbnRhaW5zKHNlZW4sIGNvbXB1dGVkKSkge1xuICAgICAgICAgIHNlZW4ucHVzaChjb21wdXRlZCk7XG4gICAgICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKCFfLmNvbnRhaW5zKHJlc3VsdCwgdmFsdWUpKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBQcm9kdWNlIGFuIGFycmF5IHRoYXQgY29udGFpbnMgdGhlIHVuaW9uOiBlYWNoIGRpc3RpbmN0IGVsZW1lbnQgZnJvbSBhbGwgb2ZcbiAgLy8gdGhlIHBhc3NlZC1pbiBhcnJheXMuXG4gIF8udW5pb24gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXy51bmlxKGZsYXR0ZW4oYXJndW1lbnRzLCB0cnVlLCB0cnVlKSk7XG4gIH07XG5cbiAgLy8gUHJvZHVjZSBhbiBhcnJheSB0aGF0IGNvbnRhaW5zIGV2ZXJ5IGl0ZW0gc2hhcmVkIGJldHdlZW4gYWxsIHRoZVxuICAvLyBwYXNzZWQtaW4gYXJyYXlzLlxuICBfLmludGVyc2VjdGlvbiA9IGZ1bmN0aW9uKGFycmF5KSB7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHZhciBhcmdzTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gZ2V0TGVuZ3RoKGFycmF5KTsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IGFycmF5W2ldO1xuICAgICAgaWYgKF8uY29udGFpbnMocmVzdWx0LCBpdGVtKSkgY29udGludWU7XG4gICAgICBmb3IgKHZhciBqID0gMTsgaiA8IGFyZ3NMZW5ndGg7IGorKykge1xuICAgICAgICBpZiAoIV8uY29udGFpbnMoYXJndW1lbnRzW2pdLCBpdGVtKSkgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAoaiA9PT0gYXJnc0xlbmd0aCkgcmVzdWx0LnB1c2goaXRlbSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLy8gVGFrZSB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIG9uZSBhcnJheSBhbmQgYSBudW1iZXIgb2Ygb3RoZXIgYXJyYXlzLlxuICAvLyBPbmx5IHRoZSBlbGVtZW50cyBwcmVzZW50IGluIGp1c3QgdGhlIGZpcnN0IGFycmF5IHdpbGwgcmVtYWluLlxuICBfLmRpZmZlcmVuY2UgPSBmdW5jdGlvbihhcnJheSkge1xuICAgIHZhciByZXN0ID0gZmxhdHRlbihhcmd1bWVudHMsIHRydWUsIHRydWUsIDEpO1xuICAgIHJldHVybiBfLmZpbHRlcihhcnJheSwgZnVuY3Rpb24odmFsdWUpe1xuICAgICAgcmV0dXJuICFfLmNvbnRhaW5zKHJlc3QsIHZhbHVlKTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBaaXAgdG9nZXRoZXIgbXVsdGlwbGUgbGlzdHMgaW50byBhIHNpbmdsZSBhcnJheSAtLSBlbGVtZW50cyB0aGF0IHNoYXJlXG4gIC8vIGFuIGluZGV4IGdvIHRvZ2V0aGVyLlxuICBfLnppcCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBfLnVuemlwKGFyZ3VtZW50cyk7XG4gIH07XG5cbiAgLy8gQ29tcGxlbWVudCBvZiBfLnppcC4gVW56aXAgYWNjZXB0cyBhbiBhcnJheSBvZiBhcnJheXMgYW5kIGdyb3Vwc1xuICAvLyBlYWNoIGFycmF5J3MgZWxlbWVudHMgb24gc2hhcmVkIGluZGljZXNcbiAgXy51bnppcCA9IGZ1bmN0aW9uKGFycmF5KSB7XG4gICAgdmFyIGxlbmd0aCA9IGFycmF5ICYmIF8ubWF4KGFycmF5LCBnZXRMZW5ndGgpLmxlbmd0aCB8fCAwO1xuICAgIHZhciByZXN1bHQgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgcmVzdWx0W2luZGV4XSA9IF8ucGx1Y2soYXJyYXksIGluZGV4KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBDb252ZXJ0cyBsaXN0cyBpbnRvIG9iamVjdHMuIFBhc3MgZWl0aGVyIGEgc2luZ2xlIGFycmF5IG9mIGBba2V5LCB2YWx1ZV1gXG4gIC8vIHBhaXJzLCBvciB0d28gcGFyYWxsZWwgYXJyYXlzIG9mIHRoZSBzYW1lIGxlbmd0aCAtLSBvbmUgb2Yga2V5cywgYW5kIG9uZSBvZlxuICAvLyB0aGUgY29ycmVzcG9uZGluZyB2YWx1ZXMuXG4gIF8ub2JqZWN0ID0gZnVuY3Rpb24obGlzdCwgdmFsdWVzKSB7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBnZXRMZW5ndGgobGlzdCk7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHZhbHVlcykge1xuICAgICAgICByZXN1bHRbbGlzdFtpXV0gPSB2YWx1ZXNbaV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHRbbGlzdFtpXVswXV0gPSBsaXN0W2ldWzFdO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIEdlbmVyYXRvciBmdW5jdGlvbiB0byBjcmVhdGUgdGhlIGZpbmRJbmRleCBhbmQgZmluZExhc3RJbmRleCBmdW5jdGlvbnNcbiAgZnVuY3Rpb24gY3JlYXRlUHJlZGljYXRlSW5kZXhGaW5kZXIoZGlyKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGFycmF5LCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICAgIHByZWRpY2F0ZSA9IGNiKHByZWRpY2F0ZSwgY29udGV4dCk7XG4gICAgICB2YXIgbGVuZ3RoID0gZ2V0TGVuZ3RoKGFycmF5KTtcbiAgICAgIHZhciBpbmRleCA9IGRpciA+IDAgPyAwIDogbGVuZ3RoIC0gMTtcbiAgICAgIGZvciAoOyBpbmRleCA+PSAwICYmIGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSBkaXIpIHtcbiAgICAgICAgaWYgKHByZWRpY2F0ZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkpIHJldHVybiBpbmRleDtcbiAgICAgIH1cbiAgICAgIHJldHVybiAtMTtcbiAgICB9O1xuICB9XG5cbiAgLy8gUmV0dXJucyB0aGUgZmlyc3QgaW5kZXggb24gYW4gYXJyYXktbGlrZSB0aGF0IHBhc3NlcyBhIHByZWRpY2F0ZSB0ZXN0XG4gIF8uZmluZEluZGV4ID0gY3JlYXRlUHJlZGljYXRlSW5kZXhGaW5kZXIoMSk7XG4gIF8uZmluZExhc3RJbmRleCA9IGNyZWF0ZVByZWRpY2F0ZUluZGV4RmluZGVyKC0xKTtcblxuICAvLyBVc2UgYSBjb21wYXJhdG9yIGZ1bmN0aW9uIHRvIGZpZ3VyZSBvdXQgdGhlIHNtYWxsZXN0IGluZGV4IGF0IHdoaWNoXG4gIC8vIGFuIG9iamVjdCBzaG91bGQgYmUgaW5zZXJ0ZWQgc28gYXMgdG8gbWFpbnRhaW4gb3JkZXIuIFVzZXMgYmluYXJ5IHNlYXJjaC5cbiAgXy5zb3J0ZWRJbmRleCA9IGZ1bmN0aW9uKGFycmF5LCBvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgaXRlcmF0ZWUgPSBjYihpdGVyYXRlZSwgY29udGV4dCwgMSk7XG4gICAgdmFyIHZhbHVlID0gaXRlcmF0ZWUob2JqKTtcbiAgICB2YXIgbG93ID0gMCwgaGlnaCA9IGdldExlbmd0aChhcnJheSk7XG4gICAgd2hpbGUgKGxvdyA8IGhpZ2gpIHtcbiAgICAgIHZhciBtaWQgPSBNYXRoLmZsb29yKChsb3cgKyBoaWdoKSAvIDIpO1xuICAgICAgaWYgKGl0ZXJhdGVlKGFycmF5W21pZF0pIDwgdmFsdWUpIGxvdyA9IG1pZCArIDE7IGVsc2UgaGlnaCA9IG1pZDtcbiAgICB9XG4gICAgcmV0dXJuIGxvdztcbiAgfTtcblxuICAvLyBHZW5lcmF0b3IgZnVuY3Rpb24gdG8gY3JlYXRlIHRoZSBpbmRleE9mIGFuZCBsYXN0SW5kZXhPZiBmdW5jdGlvbnNcbiAgZnVuY3Rpb24gY3JlYXRlSW5kZXhGaW5kZXIoZGlyLCBwcmVkaWNhdGVGaW5kLCBzb3J0ZWRJbmRleCkge1xuICAgIHJldHVybiBmdW5jdGlvbihhcnJheSwgaXRlbSwgaWR4KSB7XG4gICAgICB2YXIgaSA9IDAsIGxlbmd0aCA9IGdldExlbmd0aChhcnJheSk7XG4gICAgICBpZiAodHlwZW9mIGlkeCA9PSAnbnVtYmVyJykge1xuICAgICAgICBpZiAoZGlyID4gMCkge1xuICAgICAgICAgICAgaSA9IGlkeCA+PSAwID8gaWR4IDogTWF0aC5tYXgoaWR4ICsgbGVuZ3RoLCBpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxlbmd0aCA9IGlkeCA+PSAwID8gTWF0aC5taW4oaWR4ICsgMSwgbGVuZ3RoKSA6IGlkeCArIGxlbmd0aCArIDE7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoc29ydGVkSW5kZXggJiYgaWR4ICYmIGxlbmd0aCkge1xuICAgICAgICBpZHggPSBzb3J0ZWRJbmRleChhcnJheSwgaXRlbSk7XG4gICAgICAgIHJldHVybiBhcnJheVtpZHhdID09PSBpdGVtID8gaWR4IDogLTE7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbSAhPT0gaXRlbSkge1xuICAgICAgICBpZHggPSBwcmVkaWNhdGVGaW5kKHNsaWNlLmNhbGwoYXJyYXksIGksIGxlbmd0aCksIF8uaXNOYU4pO1xuICAgICAgICByZXR1cm4gaWR4ID49IDAgPyBpZHggKyBpIDogLTE7XG4gICAgICB9XG4gICAgICBmb3IgKGlkeCA9IGRpciA+IDAgPyBpIDogbGVuZ3RoIC0gMTsgaWR4ID49IDAgJiYgaWR4IDwgbGVuZ3RoOyBpZHggKz0gZGlyKSB7XG4gICAgICAgIGlmIChhcnJheVtpZHhdID09PSBpdGVtKSByZXR1cm4gaWR4O1xuICAgICAgfVxuICAgICAgcmV0dXJuIC0xO1xuICAgIH07XG4gIH1cblxuICAvLyBSZXR1cm4gdGhlIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIGFuIGl0ZW0gaW4gYW4gYXJyYXksXG4gIC8vIG9yIC0xIGlmIHRoZSBpdGVtIGlzIG5vdCBpbmNsdWRlZCBpbiB0aGUgYXJyYXkuXG4gIC8vIElmIHRoZSBhcnJheSBpcyBsYXJnZSBhbmQgYWxyZWFkeSBpbiBzb3J0IG9yZGVyLCBwYXNzIGB0cnVlYFxuICAvLyBmb3IgKippc1NvcnRlZCoqIHRvIHVzZSBiaW5hcnkgc2VhcmNoLlxuICBfLmluZGV4T2YgPSBjcmVhdGVJbmRleEZpbmRlcigxLCBfLmZpbmRJbmRleCwgXy5zb3J0ZWRJbmRleCk7XG4gIF8ubGFzdEluZGV4T2YgPSBjcmVhdGVJbmRleEZpbmRlcigtMSwgXy5maW5kTGFzdEluZGV4KTtcblxuICAvLyBHZW5lcmF0ZSBhbiBpbnRlZ2VyIEFycmF5IGNvbnRhaW5pbmcgYW4gYXJpdGhtZXRpYyBwcm9ncmVzc2lvbi4gQSBwb3J0IG9mXG4gIC8vIHRoZSBuYXRpdmUgUHl0aG9uIGByYW5nZSgpYCBmdW5jdGlvbi4gU2VlXG4gIC8vIFt0aGUgUHl0aG9uIGRvY3VtZW50YXRpb25dKGh0dHA6Ly9kb2NzLnB5dGhvbi5vcmcvbGlicmFyeS9mdW5jdGlvbnMuaHRtbCNyYW5nZSkuXG4gIF8ucmFuZ2UgPSBmdW5jdGlvbihzdGFydCwgc3RvcCwgc3RlcCkge1xuICAgIGlmIChzdG9wID09IG51bGwpIHtcbiAgICAgIHN0b3AgPSBzdGFydCB8fCAwO1xuICAgICAgc3RhcnQgPSAwO1xuICAgIH1cbiAgICBzdGVwID0gc3RlcCB8fCAxO1xuXG4gICAgdmFyIGxlbmd0aCA9IE1hdGgubWF4KE1hdGguY2VpbCgoc3RvcCAtIHN0YXJ0KSAvIHN0ZXApLCAwKTtcbiAgICB2YXIgcmFuZ2UgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgbGVuZ3RoOyBpZHgrKywgc3RhcnQgKz0gc3RlcCkge1xuICAgICAgcmFuZ2VbaWR4XSA9IHN0YXJ0O1xuICAgIH1cblxuICAgIHJldHVybiByYW5nZTtcbiAgfTtcblxuICAvLyBGdW5jdGlvbiAoYWhlbSkgRnVuY3Rpb25zXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIERldGVybWluZXMgd2hldGhlciB0byBleGVjdXRlIGEgZnVuY3Rpb24gYXMgYSBjb25zdHJ1Y3RvclxuICAvLyBvciBhIG5vcm1hbCBmdW5jdGlvbiB3aXRoIHRoZSBwcm92aWRlZCBhcmd1bWVudHNcbiAgdmFyIGV4ZWN1dGVCb3VuZCA9IGZ1bmN0aW9uKHNvdXJjZUZ1bmMsIGJvdW5kRnVuYywgY29udGV4dCwgY2FsbGluZ0NvbnRleHQsIGFyZ3MpIHtcbiAgICBpZiAoIShjYWxsaW5nQ29udGV4dCBpbnN0YW5jZW9mIGJvdW5kRnVuYykpIHJldHVybiBzb3VyY2VGdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgIHZhciBzZWxmID0gYmFzZUNyZWF0ZShzb3VyY2VGdW5jLnByb3RvdHlwZSk7XG4gICAgdmFyIHJlc3VsdCA9IHNvdXJjZUZ1bmMuYXBwbHkoc2VsZiwgYXJncyk7XG4gICAgaWYgKF8uaXNPYmplY3QocmVzdWx0KSkgcmV0dXJuIHJlc3VsdDtcbiAgICByZXR1cm4gc2VsZjtcbiAgfTtcblxuICAvLyBDcmVhdGUgYSBmdW5jdGlvbiBib3VuZCB0byBhIGdpdmVuIG9iamVjdCAoYXNzaWduaW5nIGB0aGlzYCwgYW5kIGFyZ3VtZW50cyxcbiAgLy8gb3B0aW9uYWxseSkuIERlbGVnYXRlcyB0byAqKkVDTUFTY3JpcHQgNSoqJ3MgbmF0aXZlIGBGdW5jdGlvbi5iaW5kYCBpZlxuICAvLyBhdmFpbGFibGUuXG4gIF8uYmluZCA9IGZ1bmN0aW9uKGZ1bmMsIGNvbnRleHQpIHtcbiAgICBpZiAobmF0aXZlQmluZCAmJiBmdW5jLmJpbmQgPT09IG5hdGl2ZUJpbmQpIHJldHVybiBuYXRpdmVCaW5kLmFwcGx5KGZ1bmMsIHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG4gICAgaWYgKCFfLmlzRnVuY3Rpb24oZnVuYykpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0JpbmQgbXVzdCBiZSBjYWxsZWQgb24gYSBmdW5jdGlvbicpO1xuICAgIHZhciBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpO1xuICAgIHZhciBib3VuZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGV4ZWN1dGVCb3VuZChmdW5jLCBib3VuZCwgY29udGV4dCwgdGhpcywgYXJncy5jb25jYXQoc2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG4gICAgfTtcbiAgICByZXR1cm4gYm91bmQ7XG4gIH07XG5cbiAgLy8gUGFydGlhbGx5IGFwcGx5IGEgZnVuY3Rpb24gYnkgY3JlYXRpbmcgYSB2ZXJzaW9uIHRoYXQgaGFzIGhhZCBzb21lIG9mIGl0c1xuICAvLyBhcmd1bWVudHMgcHJlLWZpbGxlZCwgd2l0aG91dCBjaGFuZ2luZyBpdHMgZHluYW1pYyBgdGhpc2AgY29udGV4dC4gXyBhY3RzXG4gIC8vIGFzIGEgcGxhY2Vob2xkZXIsIGFsbG93aW5nIGFueSBjb21iaW5hdGlvbiBvZiBhcmd1bWVudHMgdG8gYmUgcHJlLWZpbGxlZC5cbiAgXy5wYXJ0aWFsID0gZnVuY3Rpb24oZnVuYykge1xuICAgIHZhciBib3VuZEFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgdmFyIGJvdW5kID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcG9zaXRpb24gPSAwLCBsZW5ndGggPSBib3VuZEFyZ3MubGVuZ3RoO1xuICAgICAgdmFyIGFyZ3MgPSBBcnJheShsZW5ndGgpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBhcmdzW2ldID0gYm91bmRBcmdzW2ldID09PSBfID8gYXJndW1lbnRzW3Bvc2l0aW9uKytdIDogYm91bmRBcmdzW2ldO1xuICAgICAgfVxuICAgICAgd2hpbGUgKHBvc2l0aW9uIDwgYXJndW1lbnRzLmxlbmd0aCkgYXJncy5wdXNoKGFyZ3VtZW50c1twb3NpdGlvbisrXSk7XG4gICAgICByZXR1cm4gZXhlY3V0ZUJvdW5kKGZ1bmMsIGJvdW5kLCB0aGlzLCB0aGlzLCBhcmdzKTtcbiAgICB9O1xuICAgIHJldHVybiBib3VuZDtcbiAgfTtcblxuICAvLyBCaW5kIGEgbnVtYmVyIG9mIGFuIG9iamVjdCdzIG1ldGhvZHMgdG8gdGhhdCBvYmplY3QuIFJlbWFpbmluZyBhcmd1bWVudHNcbiAgLy8gYXJlIHRoZSBtZXRob2QgbmFtZXMgdG8gYmUgYm91bmQuIFVzZWZ1bCBmb3IgZW5zdXJpbmcgdGhhdCBhbGwgY2FsbGJhY2tzXG4gIC8vIGRlZmluZWQgb24gYW4gb2JqZWN0IGJlbG9uZyB0byBpdC5cbiAgXy5iaW5kQWxsID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIGksIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGgsIGtleTtcbiAgICBpZiAobGVuZ3RoIDw9IDEpIHRocm93IG5ldyBFcnJvcignYmluZEFsbCBtdXN0IGJlIHBhc3NlZCBmdW5jdGlvbiBuYW1lcycpO1xuICAgIGZvciAoaSA9IDE7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAga2V5ID0gYXJndW1lbnRzW2ldO1xuICAgICAgb2JqW2tleV0gPSBfLmJpbmQob2JqW2tleV0sIG9iaik7XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH07XG5cbiAgLy8gTWVtb2l6ZSBhbiBleHBlbnNpdmUgZnVuY3Rpb24gYnkgc3RvcmluZyBpdHMgcmVzdWx0cy5cbiAgXy5tZW1vaXplID0gZnVuY3Rpb24oZnVuYywgaGFzaGVyKSB7XG4gICAgdmFyIG1lbW9pemUgPSBmdW5jdGlvbihrZXkpIHtcbiAgICAgIHZhciBjYWNoZSA9IG1lbW9pemUuY2FjaGU7XG4gICAgICB2YXIgYWRkcmVzcyA9ICcnICsgKGhhc2hlciA/IGhhc2hlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIDoga2V5KTtcbiAgICAgIGlmICghXy5oYXMoY2FjaGUsIGFkZHJlc3MpKSBjYWNoZVthZGRyZXNzXSA9IGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIHJldHVybiBjYWNoZVthZGRyZXNzXTtcbiAgICB9O1xuICAgIG1lbW9pemUuY2FjaGUgPSB7fTtcbiAgICByZXR1cm4gbWVtb2l6ZTtcbiAgfTtcblxuICAvLyBEZWxheXMgYSBmdW5jdGlvbiBmb3IgdGhlIGdpdmVuIG51bWJlciBvZiBtaWxsaXNlY29uZHMsIGFuZCB0aGVuIGNhbGxzXG4gIC8vIGl0IHdpdGggdGhlIGFyZ3VtZW50cyBzdXBwbGllZC5cbiAgXy5kZWxheSA9IGZ1bmN0aW9uKGZ1bmMsIHdhaXQpIHtcbiAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcbiAgICByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgcmV0dXJuIGZ1bmMuYXBwbHkobnVsbCwgYXJncyk7XG4gICAgfSwgd2FpdCk7XG4gIH07XG5cbiAgLy8gRGVmZXJzIGEgZnVuY3Rpb24sIHNjaGVkdWxpbmcgaXQgdG8gcnVuIGFmdGVyIHRoZSBjdXJyZW50IGNhbGwgc3RhY2sgaGFzXG4gIC8vIGNsZWFyZWQuXG4gIF8uZGVmZXIgPSBfLnBhcnRpYWwoXy5kZWxheSwgXywgMSk7XG5cbiAgLy8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0LCB3aGVuIGludm9rZWQsIHdpbGwgb25seSBiZSB0cmlnZ2VyZWQgYXQgbW9zdCBvbmNlXG4gIC8vIGR1cmluZyBhIGdpdmVuIHdpbmRvdyBvZiB0aW1lLiBOb3JtYWxseSwgdGhlIHRocm90dGxlZCBmdW5jdGlvbiB3aWxsIHJ1blxuICAvLyBhcyBtdWNoIGFzIGl0IGNhbiwgd2l0aG91dCBldmVyIGdvaW5nIG1vcmUgdGhhbiBvbmNlIHBlciBgd2FpdGAgZHVyYXRpb247XG4gIC8vIGJ1dCBpZiB5b3UnZCBsaWtlIHRvIGRpc2FibGUgdGhlIGV4ZWN1dGlvbiBvbiB0aGUgbGVhZGluZyBlZGdlLCBwYXNzXG4gIC8vIGB7bGVhZGluZzogZmFsc2V9YC4gVG8gZGlzYWJsZSBleGVjdXRpb24gb24gdGhlIHRyYWlsaW5nIGVkZ2UsIGRpdHRvLlxuICBfLnRocm90dGxlID0gZnVuY3Rpb24oZnVuYywgd2FpdCwgb3B0aW9ucykge1xuICAgIHZhciBjb250ZXh0LCBhcmdzLCByZXN1bHQ7XG4gICAgdmFyIHRpbWVvdXQgPSBudWxsO1xuICAgIHZhciBwcmV2aW91cyA9IDA7XG4gICAgaWYgKCFvcHRpb25zKSBvcHRpb25zID0ge307XG4gICAgdmFyIGxhdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICBwcmV2aW91cyA9IG9wdGlvbnMubGVhZGluZyA9PT0gZmFsc2UgPyAwIDogXy5ub3coKTtcbiAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgIGlmICghdGltZW91dCkgY29udGV4dCA9IGFyZ3MgPSBudWxsO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIG5vdyA9IF8ubm93KCk7XG4gICAgICBpZiAoIXByZXZpb3VzICYmIG9wdGlvbnMubGVhZGluZyA9PT0gZmFsc2UpIHByZXZpb3VzID0gbm93O1xuICAgICAgdmFyIHJlbWFpbmluZyA9IHdhaXQgLSAobm93IC0gcHJldmlvdXMpO1xuICAgICAgY29udGV4dCA9IHRoaXM7XG4gICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgaWYgKHJlbWFpbmluZyA8PSAwIHx8IHJlbWFpbmluZyA+IHdhaXQpIHtcbiAgICAgICAgaWYgKHRpbWVvdXQpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcHJldmlvdXMgPSBub3c7XG4gICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgIGlmICghdGltZW91dCkgY29udGV4dCA9IGFyZ3MgPSBudWxsO1xuICAgICAgfSBlbHNlIGlmICghdGltZW91dCAmJiBvcHRpb25zLnRyYWlsaW5nICE9PSBmYWxzZSkge1xuICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgcmVtYWluaW5nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIGFzIGxvbmcgYXMgaXQgY29udGludWVzIHRvIGJlIGludm9rZWQsIHdpbGwgbm90XG4gIC8vIGJlIHRyaWdnZXJlZC4gVGhlIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGFmdGVyIGl0IHN0b3BzIGJlaW5nIGNhbGxlZCBmb3JcbiAgLy8gTiBtaWxsaXNlY29uZHMuIElmIGBpbW1lZGlhdGVgIGlzIHBhc3NlZCwgdHJpZ2dlciB0aGUgZnVuY3Rpb24gb24gdGhlXG4gIC8vIGxlYWRpbmcgZWRnZSwgaW5zdGVhZCBvZiB0aGUgdHJhaWxpbmcuXG4gIF8uZGVib3VuY2UgPSBmdW5jdGlvbihmdW5jLCB3YWl0LCBpbW1lZGlhdGUpIHtcbiAgICB2YXIgdGltZW91dCwgYXJncywgY29udGV4dCwgdGltZXN0YW1wLCByZXN1bHQ7XG5cbiAgICB2YXIgbGF0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBsYXN0ID0gXy5ub3coKSAtIHRpbWVzdGFtcDtcblxuICAgICAgaWYgKGxhc3QgPCB3YWl0ICYmIGxhc3QgPj0gMCkge1xuICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCAtIGxhc3QpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgIGlmICghaW1tZWRpYXRlKSB7XG4gICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICBpZiAoIXRpbWVvdXQpIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICBjb250ZXh0ID0gdGhpcztcbiAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICB0aW1lc3RhbXAgPSBfLm5vdygpO1xuICAgICAgdmFyIGNhbGxOb3cgPSBpbW1lZGlhdGUgJiYgIXRpbWVvdXQ7XG4gICAgICBpZiAoIXRpbWVvdXQpIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcbiAgICAgIGlmIChjYWxsTm93KSB7XG4gICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICB9O1xuXG4gIC8vIFJldHVybnMgdGhlIGZpcnN0IGZ1bmN0aW9uIHBhc3NlZCBhcyBhbiBhcmd1bWVudCB0byB0aGUgc2Vjb25kLFxuICAvLyBhbGxvd2luZyB5b3UgdG8gYWRqdXN0IGFyZ3VtZW50cywgcnVuIGNvZGUgYmVmb3JlIGFuZCBhZnRlciwgYW5kXG4gIC8vIGNvbmRpdGlvbmFsbHkgZXhlY3V0ZSB0aGUgb3JpZ2luYWwgZnVuY3Rpb24uXG4gIF8ud3JhcCA9IGZ1bmN0aW9uKGZ1bmMsIHdyYXBwZXIpIHtcbiAgICByZXR1cm4gXy5wYXJ0aWFsKHdyYXBwZXIsIGZ1bmMpO1xuICB9O1xuXG4gIC8vIFJldHVybnMgYSBuZWdhdGVkIHZlcnNpb24gb2YgdGhlIHBhc3NlZC1pbiBwcmVkaWNhdGUuXG4gIF8ubmVnYXRlID0gZnVuY3Rpb24ocHJlZGljYXRlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuICFwcmVkaWNhdGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9O1xuXG4gIC8vIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGlzIHRoZSBjb21wb3NpdGlvbiBvZiBhIGxpc3Qgb2YgZnVuY3Rpb25zLCBlYWNoXG4gIC8vIGNvbnN1bWluZyB0aGUgcmV0dXJuIHZhbHVlIG9mIHRoZSBmdW5jdGlvbiB0aGF0IGZvbGxvd3MuXG4gIF8uY29tcG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgIHZhciBzdGFydCA9IGFyZ3MubGVuZ3RoIC0gMTtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaSA9IHN0YXJ0O1xuICAgICAgdmFyIHJlc3VsdCA9IGFyZ3Nbc3RhcnRdLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB3aGlsZSAoaS0tKSByZXN1bHQgPSBhcmdzW2ldLmNhbGwodGhpcywgcmVzdWx0KTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCB3aWxsIG9ubHkgYmUgZXhlY3V0ZWQgb24gYW5kIGFmdGVyIHRoZSBOdGggY2FsbC5cbiAgXy5hZnRlciA9IGZ1bmN0aW9uKHRpbWVzLCBmdW5jKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKC0tdGltZXMgPCAxKSB7XG4gICAgICAgIHJldHVybiBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCB3aWxsIG9ubHkgYmUgZXhlY3V0ZWQgdXAgdG8gKGJ1dCBub3QgaW5jbHVkaW5nKSB0aGUgTnRoIGNhbGwuXG4gIF8uYmVmb3JlID0gZnVuY3Rpb24odGltZXMsIGZ1bmMpIHtcbiAgICB2YXIgbWVtbztcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoLS10aW1lcyA+IDApIHtcbiAgICAgICAgbWVtbyA9IGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aW1lcyA8PSAxKSBmdW5jID0gbnVsbDtcbiAgICAgIHJldHVybiBtZW1vO1xuICAgIH07XG4gIH07XG5cbiAgLy8gUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSBleGVjdXRlZCBhdCBtb3N0IG9uZSB0aW1lLCBubyBtYXR0ZXIgaG93XG4gIC8vIG9mdGVuIHlvdSBjYWxsIGl0LiBVc2VmdWwgZm9yIGxhenkgaW5pdGlhbGl6YXRpb24uXG4gIF8ub25jZSA9IF8ucGFydGlhbChfLmJlZm9yZSwgMik7XG5cbiAgLy8gT2JqZWN0IEZ1bmN0aW9uc1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tXG5cbiAgLy8gS2V5cyBpbiBJRSA8IDkgdGhhdCB3b24ndCBiZSBpdGVyYXRlZCBieSBgZm9yIGtleSBpbiAuLi5gIGFuZCB0aHVzIG1pc3NlZC5cbiAgdmFyIGhhc0VudW1CdWcgPSAhe3RvU3RyaW5nOiBudWxsfS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgndG9TdHJpbmcnKTtcbiAgdmFyIG5vbkVudW1lcmFibGVQcm9wcyA9IFsndmFsdWVPZicsICdpc1Byb3RvdHlwZU9mJywgJ3RvU3RyaW5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAncHJvcGVydHlJc0VudW1lcmFibGUnLCAnaGFzT3duUHJvcGVydHknLCAndG9Mb2NhbGVTdHJpbmcnXTtcblxuICBmdW5jdGlvbiBjb2xsZWN0Tm9uRW51bVByb3BzKG9iaiwga2V5cykge1xuICAgIHZhciBub25FbnVtSWR4ID0gbm9uRW51bWVyYWJsZVByb3BzLmxlbmd0aDtcbiAgICB2YXIgY29uc3RydWN0b3IgPSBvYmouY29uc3RydWN0b3I7XG4gICAgdmFyIHByb3RvID0gKF8uaXNGdW5jdGlvbihjb25zdHJ1Y3RvcikgJiYgY29uc3RydWN0b3IucHJvdG90eXBlKSB8fCBPYmpQcm90bztcblxuICAgIC8vIENvbnN0cnVjdG9yIGlzIGEgc3BlY2lhbCBjYXNlLlxuICAgIHZhciBwcm9wID0gJ2NvbnN0cnVjdG9yJztcbiAgICBpZiAoXy5oYXMob2JqLCBwcm9wKSAmJiAhXy5jb250YWlucyhrZXlzLCBwcm9wKSkga2V5cy5wdXNoKHByb3ApO1xuXG4gICAgd2hpbGUgKG5vbkVudW1JZHgtLSkge1xuICAgICAgcHJvcCA9IG5vbkVudW1lcmFibGVQcm9wc1tub25FbnVtSWR4XTtcbiAgICAgIGlmIChwcm9wIGluIG9iaiAmJiBvYmpbcHJvcF0gIT09IHByb3RvW3Byb3BdICYmICFfLmNvbnRhaW5zKGtleXMsIHByb3ApKSB7XG4gICAgICAgIGtleXMucHVzaChwcm9wKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBSZXRyaWV2ZSB0aGUgbmFtZXMgb2YgYW4gb2JqZWN0J3Mgb3duIHByb3BlcnRpZXMuXG4gIC8vIERlbGVnYXRlcyB0byAqKkVDTUFTY3JpcHQgNSoqJ3MgbmF0aXZlIGBPYmplY3Qua2V5c2BcbiAgXy5rZXlzID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKCFfLmlzT2JqZWN0KG9iaikpIHJldHVybiBbXTtcbiAgICBpZiAobmF0aXZlS2V5cykgcmV0dXJuIG5hdGl2ZUtleXMob2JqKTtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIGlmIChfLmhhcyhvYmosIGtleSkpIGtleXMucHVzaChrZXkpO1xuICAgIC8vIEFoZW0sIElFIDwgOS5cbiAgICBpZiAoaGFzRW51bUJ1ZykgY29sbGVjdE5vbkVudW1Qcm9wcyhvYmosIGtleXMpO1xuICAgIHJldHVybiBrZXlzO1xuICB9O1xuXG4gIC8vIFJldHJpZXZlIGFsbCB0aGUgcHJvcGVydHkgbmFtZXMgb2YgYW4gb2JqZWN0LlxuICBfLmFsbEtleXMgPSBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAoIV8uaXNPYmplY3Qob2JqKSkgcmV0dXJuIFtdO1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iaikga2V5cy5wdXNoKGtleSk7XG4gICAgLy8gQWhlbSwgSUUgPCA5LlxuICAgIGlmIChoYXNFbnVtQnVnKSBjb2xsZWN0Tm9uRW51bVByb3BzKG9iaiwga2V5cyk7XG4gICAgcmV0dXJuIGtleXM7XG4gIH07XG5cbiAgLy8gUmV0cmlldmUgdGhlIHZhbHVlcyBvZiBhbiBvYmplY3QncyBwcm9wZXJ0aWVzLlxuICBfLnZhbHVlcyA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHZhciBrZXlzID0gXy5rZXlzKG9iaik7XG4gICAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIHZhciB2YWx1ZXMgPSBBcnJheShsZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhbHVlc1tpXSA9IG9ialtrZXlzW2ldXTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlcztcbiAgfTtcblxuICAvLyBSZXR1cm5zIHRoZSByZXN1bHRzIG9mIGFwcGx5aW5nIHRoZSBpdGVyYXRlZSB0byBlYWNoIGVsZW1lbnQgb2YgdGhlIG9iamVjdFxuICAvLyBJbiBjb250cmFzdCB0byBfLm1hcCBpdCByZXR1cm5zIGFuIG9iamVjdFxuICBfLm1hcE9iamVjdCA9IGZ1bmN0aW9uKG9iaiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICBpdGVyYXRlZSA9IGNiKGl0ZXJhdGVlLCBjb250ZXh0KTtcbiAgICB2YXIga2V5cyA9ICBfLmtleXMob2JqKSxcbiAgICAgICAgICBsZW5ndGggPSBrZXlzLmxlbmd0aCxcbiAgICAgICAgICByZXN1bHRzID0ge30sXG4gICAgICAgICAgY3VycmVudEtleTtcbiAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgY3VycmVudEtleSA9IGtleXNbaW5kZXhdO1xuICAgICAgICByZXN1bHRzW2N1cnJlbnRLZXldID0gaXRlcmF0ZWUob2JqW2N1cnJlbnRLZXldLCBjdXJyZW50S2V5LCBvYmopO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gIH07XG5cbiAgLy8gQ29udmVydCBhbiBvYmplY3QgaW50byBhIGxpc3Qgb2YgYFtrZXksIHZhbHVlXWAgcGFpcnMuXG4gIF8ucGFpcnMgPSBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIga2V5cyA9IF8ua2V5cyhvYmopO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgcGFpcnMgPSBBcnJheShsZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHBhaXJzW2ldID0gW2tleXNbaV0sIG9ialtrZXlzW2ldXV07XG4gICAgfVxuICAgIHJldHVybiBwYWlycztcbiAgfTtcblxuICAvLyBJbnZlcnQgdGhlIGtleXMgYW5kIHZhbHVlcyBvZiBhbiBvYmplY3QuIFRoZSB2YWx1ZXMgbXVzdCBiZSBzZXJpYWxpemFibGUuXG4gIF8uaW52ZXJ0ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIHZhciBrZXlzID0gXy5rZXlzKG9iaik7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGtleXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHJlc3VsdFtvYmpba2V5c1tpXV1dID0ga2V5c1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBSZXR1cm4gYSBzb3J0ZWQgbGlzdCBvZiB0aGUgZnVuY3Rpb24gbmFtZXMgYXZhaWxhYmxlIG9uIHRoZSBvYmplY3QuXG4gIC8vIEFsaWFzZWQgYXMgYG1ldGhvZHNgXG4gIF8uZnVuY3Rpb25zID0gXy5tZXRob2RzID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIG5hbWVzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgaWYgKF8uaXNGdW5jdGlvbihvYmpba2V5XSkpIG5hbWVzLnB1c2goa2V5KTtcbiAgICB9XG4gICAgcmV0dXJuIG5hbWVzLnNvcnQoKTtcbiAgfTtcblxuICAvLyBFeHRlbmQgYSBnaXZlbiBvYmplY3Qgd2l0aCBhbGwgdGhlIHByb3BlcnRpZXMgaW4gcGFzc2VkLWluIG9iamVjdChzKS5cbiAgXy5leHRlbmQgPSBjcmVhdGVBc3NpZ25lcihfLmFsbEtleXMpO1xuXG4gIC8vIEFzc2lnbnMgYSBnaXZlbiBvYmplY3Qgd2l0aCBhbGwgdGhlIG93biBwcm9wZXJ0aWVzIGluIHRoZSBwYXNzZWQtaW4gb2JqZWN0KHMpXG4gIC8vIChodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvYXNzaWduKVxuICBfLmV4dGVuZE93biA9IF8uYXNzaWduID0gY3JlYXRlQXNzaWduZXIoXy5rZXlzKTtcblxuICAvLyBSZXR1cm5zIHRoZSBmaXJzdCBrZXkgb24gYW4gb2JqZWN0IHRoYXQgcGFzc2VzIGEgcHJlZGljYXRlIHRlc3RcbiAgXy5maW5kS2V5ID0gZnVuY3Rpb24ob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICBwcmVkaWNhdGUgPSBjYihwcmVkaWNhdGUsIGNvbnRleHQpO1xuICAgIHZhciBrZXlzID0gXy5rZXlzKG9iaiksIGtleTtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0ga2V5cy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgIGlmIChwcmVkaWNhdGUob2JqW2tleV0sIGtleSwgb2JqKSkgcmV0dXJuIGtleTtcbiAgICB9XG4gIH07XG5cbiAgLy8gUmV0dXJuIGEgY29weSBvZiB0aGUgb2JqZWN0IG9ubHkgY29udGFpbmluZyB0aGUgd2hpdGVsaXN0ZWQgcHJvcGVydGllcy5cbiAgXy5waWNrID0gZnVuY3Rpb24ob2JqZWN0LCBvaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICB2YXIgcmVzdWx0ID0ge30sIG9iaiA9IG9iamVjdCwgaXRlcmF0ZWUsIGtleXM7XG4gICAgaWYgKG9iaiA9PSBudWxsKSByZXR1cm4gcmVzdWx0O1xuICAgIGlmIChfLmlzRnVuY3Rpb24ob2l0ZXJhdGVlKSkge1xuICAgICAga2V5cyA9IF8uYWxsS2V5cyhvYmopO1xuICAgICAgaXRlcmF0ZWUgPSBvcHRpbWl6ZUNiKG9pdGVyYXRlZSwgY29udGV4dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGtleXMgPSBmbGF0dGVuKGFyZ3VtZW50cywgZmFsc2UsIGZhbHNlLCAxKTtcbiAgICAgIGl0ZXJhdGVlID0gZnVuY3Rpb24odmFsdWUsIGtleSwgb2JqKSB7IHJldHVybiBrZXkgaW4gb2JqOyB9O1xuICAgICAgb2JqID0gT2JqZWN0KG9iaik7XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBrZXlzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgIHZhciB2YWx1ZSA9IG9ialtrZXldO1xuICAgICAgaWYgKGl0ZXJhdGVlKHZhbHVlLCBrZXksIG9iaikpIHJlc3VsdFtrZXldID0gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgIC8vIFJldHVybiBhIGNvcHkgb2YgdGhlIG9iamVjdCB3aXRob3V0IHRoZSBibGFja2xpc3RlZCBwcm9wZXJ0aWVzLlxuICBfLm9taXQgPSBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgaWYgKF8uaXNGdW5jdGlvbihpdGVyYXRlZSkpIHtcbiAgICAgIGl0ZXJhdGVlID0gXy5uZWdhdGUoaXRlcmF0ZWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIga2V5cyA9IF8ubWFwKGZsYXR0ZW4oYXJndW1lbnRzLCBmYWxzZSwgZmFsc2UsIDEpLCBTdHJpbmcpO1xuICAgICAgaXRlcmF0ZWUgPSBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgICAgIHJldHVybiAhXy5jb250YWlucyhrZXlzLCBrZXkpO1xuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIF8ucGljayhvYmosIGl0ZXJhdGVlLCBjb250ZXh0KTtcbiAgfTtcblxuICAvLyBGaWxsIGluIGEgZ2l2ZW4gb2JqZWN0IHdpdGggZGVmYXVsdCBwcm9wZXJ0aWVzLlxuICBfLmRlZmF1bHRzID0gY3JlYXRlQXNzaWduZXIoXy5hbGxLZXlzLCB0cnVlKTtcblxuICAvLyBDcmVhdGVzIGFuIG9iamVjdCB0aGF0IGluaGVyaXRzIGZyb20gdGhlIGdpdmVuIHByb3RvdHlwZSBvYmplY3QuXG4gIC8vIElmIGFkZGl0aW9uYWwgcHJvcGVydGllcyBhcmUgcHJvdmlkZWQgdGhlbiB0aGV5IHdpbGwgYmUgYWRkZWQgdG8gdGhlXG4gIC8vIGNyZWF0ZWQgb2JqZWN0LlxuICBfLmNyZWF0ZSA9IGZ1bmN0aW9uKHByb3RvdHlwZSwgcHJvcHMpIHtcbiAgICB2YXIgcmVzdWx0ID0gYmFzZUNyZWF0ZShwcm90b3R5cGUpO1xuICAgIGlmIChwcm9wcykgXy5leHRlbmRPd24ocmVzdWx0LCBwcm9wcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBDcmVhdGUgYSAoc2hhbGxvdy1jbG9uZWQpIGR1cGxpY2F0ZSBvZiBhbiBvYmplY3QuXG4gIF8uY2xvbmUgPSBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAoIV8uaXNPYmplY3Qob2JqKSkgcmV0dXJuIG9iajtcbiAgICByZXR1cm4gXy5pc0FycmF5KG9iaikgPyBvYmouc2xpY2UoKSA6IF8uZXh0ZW5kKHt9LCBvYmopO1xuICB9O1xuXG4gIC8vIEludm9rZXMgaW50ZXJjZXB0b3Igd2l0aCB0aGUgb2JqLCBhbmQgdGhlbiByZXR1cm5zIG9iai5cbiAgLy8gVGhlIHByaW1hcnkgcHVycG9zZSBvZiB0aGlzIG1ldGhvZCBpcyB0byBcInRhcCBpbnRvXCIgYSBtZXRob2QgY2hhaW4sIGluXG4gIC8vIG9yZGVyIHRvIHBlcmZvcm0gb3BlcmF0aW9ucyBvbiBpbnRlcm1lZGlhdGUgcmVzdWx0cyB3aXRoaW4gdGhlIGNoYWluLlxuICBfLnRhcCA9IGZ1bmN0aW9uKG9iaiwgaW50ZXJjZXB0b3IpIHtcbiAgICBpbnRlcmNlcHRvcihvYmopO1xuICAgIHJldHVybiBvYmo7XG4gIH07XG5cbiAgLy8gUmV0dXJucyB3aGV0aGVyIGFuIG9iamVjdCBoYXMgYSBnaXZlbiBzZXQgb2YgYGtleTp2YWx1ZWAgcGFpcnMuXG4gIF8uaXNNYXRjaCA9IGZ1bmN0aW9uKG9iamVjdCwgYXR0cnMpIHtcbiAgICB2YXIga2V5cyA9IF8ua2V5cyhhdHRycyksIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIGlmIChvYmplY3QgPT0gbnVsbCkgcmV0dXJuICFsZW5ndGg7XG4gICAgdmFyIG9iaiA9IE9iamVjdChvYmplY3QpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgICAgaWYgKGF0dHJzW2tleV0gIT09IG9ialtrZXldIHx8ICEoa2V5IGluIG9iaikpIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cblxuICAvLyBJbnRlcm5hbCByZWN1cnNpdmUgY29tcGFyaXNvbiBmdW5jdGlvbiBmb3IgYGlzRXF1YWxgLlxuICB2YXIgZXEgPSBmdW5jdGlvbihhLCBiLCBhU3RhY2ssIGJTdGFjaykge1xuICAgIC8vIElkZW50aWNhbCBvYmplY3RzIGFyZSBlcXVhbC4gYDAgPT09IC0wYCwgYnV0IHRoZXkgYXJlbid0IGlkZW50aWNhbC5cbiAgICAvLyBTZWUgdGhlIFtIYXJtb255IGBlZ2FsYCBwcm9wb3NhbF0oaHR0cDovL3dpa2kuZWNtYXNjcmlwdC5vcmcvZG9rdS5waHA/aWQ9aGFybW9ueTplZ2FsKS5cbiAgICBpZiAoYSA9PT0gYikgcmV0dXJuIGEgIT09IDAgfHwgMSAvIGEgPT09IDEgLyBiO1xuICAgIC8vIEEgc3RyaWN0IGNvbXBhcmlzb24gaXMgbmVjZXNzYXJ5IGJlY2F1c2UgYG51bGwgPT0gdW5kZWZpbmVkYC5cbiAgICBpZiAoYSA9PSBudWxsIHx8IGIgPT0gbnVsbCkgcmV0dXJuIGEgPT09IGI7XG4gICAgLy8gVW53cmFwIGFueSB3cmFwcGVkIG9iamVjdHMuXG4gICAgaWYgKGEgaW5zdGFuY2VvZiBfKSBhID0gYS5fd3JhcHBlZDtcbiAgICBpZiAoYiBpbnN0YW5jZW9mIF8pIGIgPSBiLl93cmFwcGVkO1xuICAgIC8vIENvbXBhcmUgYFtbQ2xhc3NdXWAgbmFtZXMuXG4gICAgdmFyIGNsYXNzTmFtZSA9IHRvU3RyaW5nLmNhbGwoYSk7XG4gICAgaWYgKGNsYXNzTmFtZSAhPT0gdG9TdHJpbmcuY2FsbChiKSkgcmV0dXJuIGZhbHNlO1xuICAgIHN3aXRjaCAoY2xhc3NOYW1lKSB7XG4gICAgICAvLyBTdHJpbmdzLCBudW1iZXJzLCByZWd1bGFyIGV4cHJlc3Npb25zLCBkYXRlcywgYW5kIGJvb2xlYW5zIGFyZSBjb21wYXJlZCBieSB2YWx1ZS5cbiAgICAgIGNhc2UgJ1tvYmplY3QgUmVnRXhwXSc6XG4gICAgICAvLyBSZWdFeHBzIGFyZSBjb2VyY2VkIHRvIHN0cmluZ3MgZm9yIGNvbXBhcmlzb24gKE5vdGU6ICcnICsgL2EvaSA9PT0gJy9hL2knKVxuICAgICAgY2FzZSAnW29iamVjdCBTdHJpbmddJzpcbiAgICAgICAgLy8gUHJpbWl0aXZlcyBhbmQgdGhlaXIgY29ycmVzcG9uZGluZyBvYmplY3Qgd3JhcHBlcnMgYXJlIGVxdWl2YWxlbnQ7IHRodXMsIGBcIjVcImAgaXNcbiAgICAgICAgLy8gZXF1aXZhbGVudCB0byBgbmV3IFN0cmluZyhcIjVcIilgLlxuICAgICAgICByZXR1cm4gJycgKyBhID09PSAnJyArIGI7XG4gICAgICBjYXNlICdbb2JqZWN0IE51bWJlcl0nOlxuICAgICAgICAvLyBgTmFOYHMgYXJlIGVxdWl2YWxlbnQsIGJ1dCBub24tcmVmbGV4aXZlLlxuICAgICAgICAvLyBPYmplY3QoTmFOKSBpcyBlcXVpdmFsZW50IHRvIE5hTlxuICAgICAgICBpZiAoK2EgIT09ICthKSByZXR1cm4gK2IgIT09ICtiO1xuICAgICAgICAvLyBBbiBgZWdhbGAgY29tcGFyaXNvbiBpcyBwZXJmb3JtZWQgZm9yIG90aGVyIG51bWVyaWMgdmFsdWVzLlxuICAgICAgICByZXR1cm4gK2EgPT09IDAgPyAxIC8gK2EgPT09IDEgLyBiIDogK2EgPT09ICtiO1xuICAgICAgY2FzZSAnW29iamVjdCBEYXRlXSc6XG4gICAgICBjYXNlICdbb2JqZWN0IEJvb2xlYW5dJzpcbiAgICAgICAgLy8gQ29lcmNlIGRhdGVzIGFuZCBib29sZWFucyB0byBudW1lcmljIHByaW1pdGl2ZSB2YWx1ZXMuIERhdGVzIGFyZSBjb21wYXJlZCBieSB0aGVpclxuICAgICAgICAvLyBtaWxsaXNlY29uZCByZXByZXNlbnRhdGlvbnMuIE5vdGUgdGhhdCBpbnZhbGlkIGRhdGVzIHdpdGggbWlsbGlzZWNvbmQgcmVwcmVzZW50YXRpb25zXG4gICAgICAgIC8vIG9mIGBOYU5gIGFyZSBub3QgZXF1aXZhbGVudC5cbiAgICAgICAgcmV0dXJuICthID09PSArYjtcbiAgICB9XG5cbiAgICB2YXIgYXJlQXJyYXlzID0gY2xhc3NOYW1lID09PSAnW29iamVjdCBBcnJheV0nO1xuICAgIGlmICghYXJlQXJyYXlzKSB7XG4gICAgICBpZiAodHlwZW9mIGEgIT0gJ29iamVjdCcgfHwgdHlwZW9mIGIgIT0gJ29iamVjdCcpIHJldHVybiBmYWxzZTtcblxuICAgICAgLy8gT2JqZWN0cyB3aXRoIGRpZmZlcmVudCBjb25zdHJ1Y3RvcnMgYXJlIG5vdCBlcXVpdmFsZW50LCBidXQgYE9iamVjdGBzIG9yIGBBcnJheWBzXG4gICAgICAvLyBmcm9tIGRpZmZlcmVudCBmcmFtZXMgYXJlLlxuICAgICAgdmFyIGFDdG9yID0gYS5jb25zdHJ1Y3RvciwgYkN0b3IgPSBiLmNvbnN0cnVjdG9yO1xuICAgICAgaWYgKGFDdG9yICE9PSBiQ3RvciAmJiAhKF8uaXNGdW5jdGlvbihhQ3RvcikgJiYgYUN0b3IgaW5zdGFuY2VvZiBhQ3RvciAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uaXNGdW5jdGlvbihiQ3RvcikgJiYgYkN0b3IgaW5zdGFuY2VvZiBiQ3RvcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgKCdjb25zdHJ1Y3RvcicgaW4gYSAmJiAnY29uc3RydWN0b3InIGluIGIpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gQXNzdW1lIGVxdWFsaXR5IGZvciBjeWNsaWMgc3RydWN0dXJlcy4gVGhlIGFsZ29yaXRobSBmb3IgZGV0ZWN0aW5nIGN5Y2xpY1xuICAgIC8vIHN0cnVjdHVyZXMgaXMgYWRhcHRlZCBmcm9tIEVTIDUuMSBzZWN0aW9uIDE1LjEyLjMsIGFic3RyYWN0IG9wZXJhdGlvbiBgSk9gLlxuXG4gICAgLy8gSW5pdGlhbGl6aW5nIHN0YWNrIG9mIHRyYXZlcnNlZCBvYmplY3RzLlxuICAgIC8vIEl0J3MgZG9uZSBoZXJlIHNpbmNlIHdlIG9ubHkgbmVlZCB0aGVtIGZvciBvYmplY3RzIGFuZCBhcnJheXMgY29tcGFyaXNvbi5cbiAgICBhU3RhY2sgPSBhU3RhY2sgfHwgW107XG4gICAgYlN0YWNrID0gYlN0YWNrIHx8IFtdO1xuICAgIHZhciBsZW5ndGggPSBhU3RhY2subGVuZ3RoO1xuICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgLy8gTGluZWFyIHNlYXJjaC4gUGVyZm9ybWFuY2UgaXMgaW52ZXJzZWx5IHByb3BvcnRpb25hbCB0byB0aGUgbnVtYmVyIG9mXG4gICAgICAvLyB1bmlxdWUgbmVzdGVkIHN0cnVjdHVyZXMuXG4gICAgICBpZiAoYVN0YWNrW2xlbmd0aF0gPT09IGEpIHJldHVybiBiU3RhY2tbbGVuZ3RoXSA9PT0gYjtcbiAgICB9XG5cbiAgICAvLyBBZGQgdGhlIGZpcnN0IG9iamVjdCB0byB0aGUgc3RhY2sgb2YgdHJhdmVyc2VkIG9iamVjdHMuXG4gICAgYVN0YWNrLnB1c2goYSk7XG4gICAgYlN0YWNrLnB1c2goYik7XG5cbiAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIG9iamVjdHMgYW5kIGFycmF5cy5cbiAgICBpZiAoYXJlQXJyYXlzKSB7XG4gICAgICAvLyBDb21wYXJlIGFycmF5IGxlbmd0aHMgdG8gZGV0ZXJtaW5lIGlmIGEgZGVlcCBjb21wYXJpc29uIGlzIG5lY2Vzc2FyeS5cbiAgICAgIGxlbmd0aCA9IGEubGVuZ3RoO1xuICAgICAgaWYgKGxlbmd0aCAhPT0gYi5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgICAgIC8vIERlZXAgY29tcGFyZSB0aGUgY29udGVudHMsIGlnbm9yaW5nIG5vbi1udW1lcmljIHByb3BlcnRpZXMuXG4gICAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgICAgaWYgKCFlcShhW2xlbmd0aF0sIGJbbGVuZ3RoXSwgYVN0YWNrLCBiU3RhY2spKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIERlZXAgY29tcGFyZSBvYmplY3RzLlxuICAgICAgdmFyIGtleXMgPSBfLmtleXMoYSksIGtleTtcbiAgICAgIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgICAgLy8gRW5zdXJlIHRoYXQgYm90aCBvYmplY3RzIGNvbnRhaW4gdGhlIHNhbWUgbnVtYmVyIG9mIHByb3BlcnRpZXMgYmVmb3JlIGNvbXBhcmluZyBkZWVwIGVxdWFsaXR5LlxuICAgICAgaWYgKF8ua2V5cyhiKS5sZW5ndGggIT09IGxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICAgICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICAgIC8vIERlZXAgY29tcGFyZSBlYWNoIG1lbWJlclxuICAgICAgICBrZXkgPSBrZXlzW2xlbmd0aF07XG4gICAgICAgIGlmICghKF8uaGFzKGIsIGtleSkgJiYgZXEoYVtrZXldLCBiW2tleV0sIGFTdGFjaywgYlN0YWNrKSkpIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gUmVtb3ZlIHRoZSBmaXJzdCBvYmplY3QgZnJvbSB0aGUgc3RhY2sgb2YgdHJhdmVyc2VkIG9iamVjdHMuXG4gICAgYVN0YWNrLnBvcCgpO1xuICAgIGJTdGFjay5wb3AoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICAvLyBQZXJmb3JtIGEgZGVlcCBjb21wYXJpc29uIHRvIGNoZWNrIGlmIHR3byBvYmplY3RzIGFyZSBlcXVhbC5cbiAgXy5pc0VxdWFsID0gZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiBlcShhLCBiKTtcbiAgfTtcblxuICAvLyBJcyBhIGdpdmVuIGFycmF5LCBzdHJpbmcsIG9yIG9iamVjdCBlbXB0eT9cbiAgLy8gQW4gXCJlbXB0eVwiIG9iamVjdCBoYXMgbm8gZW51bWVyYWJsZSBvd24tcHJvcGVydGllcy5cbiAgXy5pc0VtcHR5ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKG9iaiA9PSBudWxsKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAoaXNBcnJheUxpa2Uob2JqKSAmJiAoXy5pc0FycmF5KG9iaikgfHwgXy5pc1N0cmluZyhvYmopIHx8IF8uaXNBcmd1bWVudHMob2JqKSkpIHJldHVybiBvYmoubGVuZ3RoID09PSAwO1xuICAgIHJldHVybiBfLmtleXMob2JqKS5sZW5ndGggPT09IDA7XG4gIH07XG5cbiAgLy8gSXMgYSBnaXZlbiB2YWx1ZSBhIERPTSBlbGVtZW50P1xuICBfLmlzRWxlbWVudCA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHJldHVybiAhIShvYmogJiYgb2JqLm5vZGVUeXBlID09PSAxKTtcbiAgfTtcblxuICAvLyBJcyBhIGdpdmVuIHZhbHVlIGFuIGFycmF5P1xuICAvLyBEZWxlZ2F0ZXMgdG8gRUNNQTUncyBuYXRpdmUgQXJyYXkuaXNBcnJheVxuICBfLmlzQXJyYXkgPSBuYXRpdmVJc0FycmF5IHx8IGZ1bmN0aW9uKG9iaikge1xuICAgIHJldHVybiB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gIH07XG5cbiAgLy8gSXMgYSBnaXZlbiB2YXJpYWJsZSBhbiBvYmplY3Q/XG4gIF8uaXNPYmplY3QgPSBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIgdHlwZSA9IHR5cGVvZiBvYmo7XG4gICAgcmV0dXJuIHR5cGUgPT09ICdmdW5jdGlvbicgfHwgdHlwZSA9PT0gJ29iamVjdCcgJiYgISFvYmo7XG4gIH07XG5cbiAgLy8gQWRkIHNvbWUgaXNUeXBlIG1ldGhvZHM6IGlzQXJndW1lbnRzLCBpc0Z1bmN0aW9uLCBpc1N0cmluZywgaXNOdW1iZXIsIGlzRGF0ZSwgaXNSZWdFeHAsIGlzRXJyb3IuXG4gIF8uZWFjaChbJ0FyZ3VtZW50cycsICdGdW5jdGlvbicsICdTdHJpbmcnLCAnTnVtYmVyJywgJ0RhdGUnLCAnUmVnRXhwJywgJ0Vycm9yJ10sIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBfWydpcycgKyBuYW1lXSA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgJyArIG5hbWUgKyAnXSc7XG4gICAgfTtcbiAgfSk7XG5cbiAgLy8gRGVmaW5lIGEgZmFsbGJhY2sgdmVyc2lvbiBvZiB0aGUgbWV0aG9kIGluIGJyb3dzZXJzIChhaGVtLCBJRSA8IDkpLCB3aGVyZVxuICAvLyB0aGVyZSBpc24ndCBhbnkgaW5zcGVjdGFibGUgXCJBcmd1bWVudHNcIiB0eXBlLlxuICBpZiAoIV8uaXNBcmd1bWVudHMoYXJndW1lbnRzKSkge1xuICAgIF8uaXNBcmd1bWVudHMgPSBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBfLmhhcyhvYmosICdjYWxsZWUnKTtcbiAgICB9O1xuICB9XG5cbiAgLy8gT3B0aW1pemUgYGlzRnVuY3Rpb25gIGlmIGFwcHJvcHJpYXRlLiBXb3JrIGFyb3VuZCBzb21lIHR5cGVvZiBidWdzIGluIG9sZCB2OCxcbiAgLy8gSUUgMTEgKCMxNjIxKSwgYW5kIGluIFNhZmFyaSA4ICgjMTkyOSkuXG4gIGlmICh0eXBlb2YgLy4vICE9ICdmdW5jdGlvbicgJiYgdHlwZW9mIEludDhBcnJheSAhPSAnb2JqZWN0Jykge1xuICAgIF8uaXNGdW5jdGlvbiA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT0gJ2Z1bmN0aW9uJyB8fCBmYWxzZTtcbiAgICB9O1xuICB9XG5cbiAgLy8gSXMgYSBnaXZlbiBvYmplY3QgYSBmaW5pdGUgbnVtYmVyP1xuICBfLmlzRmluaXRlID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIGlzRmluaXRlKG9iaikgJiYgIWlzTmFOKHBhcnNlRmxvYXQob2JqKSk7XG4gIH07XG5cbiAgLy8gSXMgdGhlIGdpdmVuIHZhbHVlIGBOYU5gPyAoTmFOIGlzIHRoZSBvbmx5IG51bWJlciB3aGljaCBkb2VzIG5vdCBlcXVhbCBpdHNlbGYpLlxuICBfLmlzTmFOID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIF8uaXNOdW1iZXIob2JqKSAmJiBvYmogIT09ICtvYmo7XG4gIH07XG5cbiAgLy8gSXMgYSBnaXZlbiB2YWx1ZSBhIGJvb2xlYW4/XG4gIF8uaXNCb29sZWFuID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIG9iaiA9PT0gdHJ1ZSB8fCBvYmogPT09IGZhbHNlIHx8IHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgQm9vbGVhbl0nO1xuICB9O1xuXG4gIC8vIElzIGEgZ2l2ZW4gdmFsdWUgZXF1YWwgdG8gbnVsbD9cbiAgXy5pc051bGwgPSBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gb2JqID09PSBudWxsO1xuICB9O1xuXG4gIC8vIElzIGEgZ2l2ZW4gdmFyaWFibGUgdW5kZWZpbmVkP1xuICBfLmlzVW5kZWZpbmVkID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIG9iaiA9PT0gdm9pZCAwO1xuICB9O1xuXG4gIC8vIFNob3J0Y3V0IGZ1bmN0aW9uIGZvciBjaGVja2luZyBpZiBhbiBvYmplY3QgaGFzIGEgZ2l2ZW4gcHJvcGVydHkgZGlyZWN0bHlcbiAgLy8gb24gaXRzZWxmIChpbiBvdGhlciB3b3Jkcywgbm90IG9uIGEgcHJvdG90eXBlKS5cbiAgXy5oYXMgPSBmdW5jdGlvbihvYmosIGtleSkge1xuICAgIHJldHVybiBvYmogIT0gbnVsbCAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KTtcbiAgfTtcblxuICAvLyBVdGlsaXR5IEZ1bmN0aW9uc1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIFJ1biBVbmRlcnNjb3JlLmpzIGluICpub0NvbmZsaWN0KiBtb2RlLCByZXR1cm5pbmcgdGhlIGBfYCB2YXJpYWJsZSB0byBpdHNcbiAgLy8gcHJldmlvdXMgb3duZXIuIFJldHVybnMgYSByZWZlcmVuY2UgdG8gdGhlIFVuZGVyc2NvcmUgb2JqZWN0LlxuICBfLm5vQ29uZmxpY3QgPSBmdW5jdGlvbigpIHtcbiAgICByb290Ll8gPSBwcmV2aW91c1VuZGVyc2NvcmU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLy8gS2VlcCB0aGUgaWRlbnRpdHkgZnVuY3Rpb24gYXJvdW5kIGZvciBkZWZhdWx0IGl0ZXJhdGVlcy5cbiAgXy5pZGVudGl0eSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9O1xuXG4gIC8vIFByZWRpY2F0ZS1nZW5lcmF0aW5nIGZ1bmN0aW9ucy4gT2Z0ZW4gdXNlZnVsIG91dHNpZGUgb2YgVW5kZXJzY29yZS5cbiAgXy5jb25zdGFudCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gIH07XG5cbiAgXy5ub29wID0gZnVuY3Rpb24oKXt9O1xuXG4gIF8ucHJvcGVydHkgPSBwcm9wZXJ0eTtcblxuICAvLyBHZW5lcmF0ZXMgYSBmdW5jdGlvbiBmb3IgYSBnaXZlbiBvYmplY3QgdGhhdCByZXR1cm5zIGEgZ2l2ZW4gcHJvcGVydHkuXG4gIF8ucHJvcGVydHlPZiA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHJldHVybiBvYmogPT0gbnVsbCA/IGZ1bmN0aW9uKCl7fSA6IGZ1bmN0aW9uKGtleSkge1xuICAgICAgcmV0dXJuIG9ialtrZXldO1xuICAgIH07XG4gIH07XG5cbiAgLy8gUmV0dXJucyBhIHByZWRpY2F0ZSBmb3IgY2hlY2tpbmcgd2hldGhlciBhbiBvYmplY3QgaGFzIGEgZ2l2ZW4gc2V0IG9mXG4gIC8vIGBrZXk6dmFsdWVgIHBhaXJzLlxuICBfLm1hdGNoZXIgPSBfLm1hdGNoZXMgPSBmdW5jdGlvbihhdHRycykge1xuICAgIGF0dHJzID0gXy5leHRlbmRPd24oe30sIGF0dHJzKTtcbiAgICByZXR1cm4gZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gXy5pc01hdGNoKG9iaiwgYXR0cnMpO1xuICAgIH07XG4gIH07XG5cbiAgLy8gUnVuIGEgZnVuY3Rpb24gKipuKiogdGltZXMuXG4gIF8udGltZXMgPSBmdW5jdGlvbihuLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgIHZhciBhY2N1bSA9IEFycmF5KE1hdGgubWF4KDAsIG4pKTtcbiAgICBpdGVyYXRlZSA9IG9wdGltaXplQ2IoaXRlcmF0ZWUsIGNvbnRleHQsIDEpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgaSsrKSBhY2N1bVtpXSA9IGl0ZXJhdGVlKGkpO1xuICAgIHJldHVybiBhY2N1bTtcbiAgfTtcblxuICAvLyBSZXR1cm4gYSByYW5kb20gaW50ZWdlciBiZXR3ZWVuIG1pbiBhbmQgbWF4IChpbmNsdXNpdmUpLlxuICBfLnJhbmRvbSA9IGZ1bmN0aW9uKG1pbiwgbWF4KSB7XG4gICAgaWYgKG1heCA9PSBudWxsKSB7XG4gICAgICBtYXggPSBtaW47XG4gICAgICBtaW4gPSAwO1xuICAgIH1cbiAgICByZXR1cm4gbWluICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKTtcbiAgfTtcblxuICAvLyBBIChwb3NzaWJseSBmYXN0ZXIpIHdheSB0byBnZXQgdGhlIGN1cnJlbnQgdGltZXN0YW1wIGFzIGFuIGludGVnZXIuXG4gIF8ubm93ID0gRGF0ZS5ub3cgfHwgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICB9O1xuXG4gICAvLyBMaXN0IG9mIEhUTUwgZW50aXRpZXMgZm9yIGVzY2FwaW5nLlxuICB2YXIgZXNjYXBlTWFwID0ge1xuICAgICcmJzogJyZhbXA7JyxcbiAgICAnPCc6ICcmbHQ7JyxcbiAgICAnPic6ICcmZ3Q7JyxcbiAgICAnXCInOiAnJnF1b3Q7JyxcbiAgICBcIidcIjogJyYjeDI3OycsXG4gICAgJ2AnOiAnJiN4NjA7J1xuICB9O1xuICB2YXIgdW5lc2NhcGVNYXAgPSBfLmludmVydChlc2NhcGVNYXApO1xuXG4gIC8vIEZ1bmN0aW9ucyBmb3IgZXNjYXBpbmcgYW5kIHVuZXNjYXBpbmcgc3RyaW5ncyB0by9mcm9tIEhUTUwgaW50ZXJwb2xhdGlvbi5cbiAgdmFyIGNyZWF0ZUVzY2FwZXIgPSBmdW5jdGlvbihtYXApIHtcbiAgICB2YXIgZXNjYXBlciA9IGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgICByZXR1cm4gbWFwW21hdGNoXTtcbiAgICB9O1xuICAgIC8vIFJlZ2V4ZXMgZm9yIGlkZW50aWZ5aW5nIGEga2V5IHRoYXQgbmVlZHMgdG8gYmUgZXNjYXBlZFxuICAgIHZhciBzb3VyY2UgPSAnKD86JyArIF8ua2V5cyhtYXApLmpvaW4oJ3wnKSArICcpJztcbiAgICB2YXIgdGVzdFJlZ2V4cCA9IFJlZ0V4cChzb3VyY2UpO1xuICAgIHZhciByZXBsYWNlUmVnZXhwID0gUmVnRXhwKHNvdXJjZSwgJ2cnKTtcbiAgICByZXR1cm4gZnVuY3Rpb24oc3RyaW5nKSB7XG4gICAgICBzdHJpbmcgPSBzdHJpbmcgPT0gbnVsbCA/ICcnIDogJycgKyBzdHJpbmc7XG4gICAgICByZXR1cm4gdGVzdFJlZ2V4cC50ZXN0KHN0cmluZykgPyBzdHJpbmcucmVwbGFjZShyZXBsYWNlUmVnZXhwLCBlc2NhcGVyKSA6IHN0cmluZztcbiAgICB9O1xuICB9O1xuICBfLmVzY2FwZSA9IGNyZWF0ZUVzY2FwZXIoZXNjYXBlTWFwKTtcbiAgXy51bmVzY2FwZSA9IGNyZWF0ZUVzY2FwZXIodW5lc2NhcGVNYXApO1xuXG4gIC8vIElmIHRoZSB2YWx1ZSBvZiB0aGUgbmFtZWQgYHByb3BlcnR5YCBpcyBhIGZ1bmN0aW9uIHRoZW4gaW52b2tlIGl0IHdpdGggdGhlXG4gIC8vIGBvYmplY3RgIGFzIGNvbnRleHQ7IG90aGVyd2lzZSwgcmV0dXJuIGl0LlxuICBfLnJlc3VsdCA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHksIGZhbGxiYWNrKSB7XG4gICAgdmFyIHZhbHVlID0gb2JqZWN0ID09IG51bGwgPyB2b2lkIDAgOiBvYmplY3RbcHJvcGVydHldO1xuICAgIGlmICh2YWx1ZSA9PT0gdm9pZCAwKSB7XG4gICAgICB2YWx1ZSA9IGZhbGxiYWNrO1xuICAgIH1cbiAgICByZXR1cm4gXy5pc0Z1bmN0aW9uKHZhbHVlKSA/IHZhbHVlLmNhbGwob2JqZWN0KSA6IHZhbHVlO1xuICB9O1xuXG4gIC8vIEdlbmVyYXRlIGEgdW5pcXVlIGludGVnZXIgaWQgKHVuaXF1ZSB3aXRoaW4gdGhlIGVudGlyZSBjbGllbnQgc2Vzc2lvbikuXG4gIC8vIFVzZWZ1bCBmb3IgdGVtcG9yYXJ5IERPTSBpZHMuXG4gIHZhciBpZENvdW50ZXIgPSAwO1xuICBfLnVuaXF1ZUlkID0gZnVuY3Rpb24ocHJlZml4KSB7XG4gICAgdmFyIGlkID0gKytpZENvdW50ZXIgKyAnJztcbiAgICByZXR1cm4gcHJlZml4ID8gcHJlZml4ICsgaWQgOiBpZDtcbiAgfTtcblxuICAvLyBCeSBkZWZhdWx0LCBVbmRlcnNjb3JlIHVzZXMgRVJCLXN0eWxlIHRlbXBsYXRlIGRlbGltaXRlcnMsIGNoYW5nZSB0aGVcbiAgLy8gZm9sbG93aW5nIHRlbXBsYXRlIHNldHRpbmdzIHRvIHVzZSBhbHRlcm5hdGl2ZSBkZWxpbWl0ZXJzLlxuICBfLnRlbXBsYXRlU2V0dGluZ3MgPSB7XG4gICAgZXZhbHVhdGUgICAgOiAvPCUoW1xcc1xcU10rPyklPi9nLFxuICAgIGludGVycG9sYXRlIDogLzwlPShbXFxzXFxTXSs/KSU+L2csXG4gICAgZXNjYXBlICAgICAgOiAvPCUtKFtcXHNcXFNdKz8pJT4vZ1xuICB9O1xuXG4gIC8vIFdoZW4gY3VzdG9taXppbmcgYHRlbXBsYXRlU2V0dGluZ3NgLCBpZiB5b3UgZG9uJ3Qgd2FudCB0byBkZWZpbmUgYW5cbiAgLy8gaW50ZXJwb2xhdGlvbiwgZXZhbHVhdGlvbiBvciBlc2NhcGluZyByZWdleCwgd2UgbmVlZCBvbmUgdGhhdCBpc1xuICAvLyBndWFyYW50ZWVkIG5vdCB0byBtYXRjaC5cbiAgdmFyIG5vTWF0Y2ggPSAvKC4pXi87XG5cbiAgLy8gQ2VydGFpbiBjaGFyYWN0ZXJzIG5lZWQgdG8gYmUgZXNjYXBlZCBzbyB0aGF0IHRoZXkgY2FuIGJlIHB1dCBpbnRvIGFcbiAgLy8gc3RyaW5nIGxpdGVyYWwuXG4gIHZhciBlc2NhcGVzID0ge1xuICAgIFwiJ1wiOiAgICAgIFwiJ1wiLFxuICAgICdcXFxcJzogICAgICdcXFxcJyxcbiAgICAnXFxyJzogICAgICdyJyxcbiAgICAnXFxuJzogICAgICduJyxcbiAgICAnXFx1MjAyOCc6ICd1MjAyOCcsXG4gICAgJ1xcdTIwMjknOiAndTIwMjknXG4gIH07XG5cbiAgdmFyIGVzY2FwZXIgPSAvXFxcXHwnfFxccnxcXG58XFx1MjAyOHxcXHUyMDI5L2c7XG5cbiAgdmFyIGVzY2FwZUNoYXIgPSBmdW5jdGlvbihtYXRjaCkge1xuICAgIHJldHVybiAnXFxcXCcgKyBlc2NhcGVzW21hdGNoXTtcbiAgfTtcblxuICAvLyBKYXZhU2NyaXB0IG1pY3JvLXRlbXBsYXRpbmcsIHNpbWlsYXIgdG8gSm9obiBSZXNpZydzIGltcGxlbWVudGF0aW9uLlxuICAvLyBVbmRlcnNjb3JlIHRlbXBsYXRpbmcgaGFuZGxlcyBhcmJpdHJhcnkgZGVsaW1pdGVycywgcHJlc2VydmVzIHdoaXRlc3BhY2UsXG4gIC8vIGFuZCBjb3JyZWN0bHkgZXNjYXBlcyBxdW90ZXMgd2l0aGluIGludGVycG9sYXRlZCBjb2RlLlxuICAvLyBOQjogYG9sZFNldHRpbmdzYCBvbmx5IGV4aXN0cyBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkuXG4gIF8udGVtcGxhdGUgPSBmdW5jdGlvbih0ZXh0LCBzZXR0aW5ncywgb2xkU2V0dGluZ3MpIHtcbiAgICBpZiAoIXNldHRpbmdzICYmIG9sZFNldHRpbmdzKSBzZXR0aW5ncyA9IG9sZFNldHRpbmdzO1xuICAgIHNldHRpbmdzID0gXy5kZWZhdWx0cyh7fSwgc2V0dGluZ3MsIF8udGVtcGxhdGVTZXR0aW5ncyk7XG5cbiAgICAvLyBDb21iaW5lIGRlbGltaXRlcnMgaW50byBvbmUgcmVndWxhciBleHByZXNzaW9uIHZpYSBhbHRlcm5hdGlvbi5cbiAgICB2YXIgbWF0Y2hlciA9IFJlZ0V4cChbXG4gICAgICAoc2V0dGluZ3MuZXNjYXBlIHx8IG5vTWF0Y2gpLnNvdXJjZSxcbiAgICAgIChzZXR0aW5ncy5pbnRlcnBvbGF0ZSB8fCBub01hdGNoKS5zb3VyY2UsXG4gICAgICAoc2V0dGluZ3MuZXZhbHVhdGUgfHwgbm9NYXRjaCkuc291cmNlXG4gICAgXS5qb2luKCd8JykgKyAnfCQnLCAnZycpO1xuXG4gICAgLy8gQ29tcGlsZSB0aGUgdGVtcGxhdGUgc291cmNlLCBlc2NhcGluZyBzdHJpbmcgbGl0ZXJhbHMgYXBwcm9wcmlhdGVseS5cbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciBzb3VyY2UgPSBcIl9fcCs9J1wiO1xuICAgIHRleHQucmVwbGFjZShtYXRjaGVyLCBmdW5jdGlvbihtYXRjaCwgZXNjYXBlLCBpbnRlcnBvbGF0ZSwgZXZhbHVhdGUsIG9mZnNldCkge1xuICAgICAgc291cmNlICs9IHRleHQuc2xpY2UoaW5kZXgsIG9mZnNldCkucmVwbGFjZShlc2NhcGVyLCBlc2NhcGVDaGFyKTtcbiAgICAgIGluZGV4ID0gb2Zmc2V0ICsgbWF0Y2gubGVuZ3RoO1xuXG4gICAgICBpZiAoZXNjYXBlKSB7XG4gICAgICAgIHNvdXJjZSArPSBcIicrXFxuKChfX3Q9KFwiICsgZXNjYXBlICsgXCIpKT09bnVsbD8nJzpfLmVzY2FwZShfX3QpKStcXG4nXCI7XG4gICAgICB9IGVsc2UgaWYgKGludGVycG9sYXRlKSB7XG4gICAgICAgIHNvdXJjZSArPSBcIicrXFxuKChfX3Q9KFwiICsgaW50ZXJwb2xhdGUgKyBcIikpPT1udWxsPycnOl9fdCkrXFxuJ1wiO1xuICAgICAgfSBlbHNlIGlmIChldmFsdWF0ZSkge1xuICAgICAgICBzb3VyY2UgKz0gXCInO1xcblwiICsgZXZhbHVhdGUgKyBcIlxcbl9fcCs9J1wiO1xuICAgICAgfVxuXG4gICAgICAvLyBBZG9iZSBWTXMgbmVlZCB0aGUgbWF0Y2ggcmV0dXJuZWQgdG8gcHJvZHVjZSB0aGUgY29ycmVjdCBvZmZlc3QuXG4gICAgICByZXR1cm4gbWF0Y2g7XG4gICAgfSk7XG4gICAgc291cmNlICs9IFwiJztcXG5cIjtcblxuICAgIC8vIElmIGEgdmFyaWFibGUgaXMgbm90IHNwZWNpZmllZCwgcGxhY2UgZGF0YSB2YWx1ZXMgaW4gbG9jYWwgc2NvcGUuXG4gICAgaWYgKCFzZXR0aW5ncy52YXJpYWJsZSkgc291cmNlID0gJ3dpdGgob2JqfHx7fSl7XFxuJyArIHNvdXJjZSArICd9XFxuJztcblxuICAgIHNvdXJjZSA9IFwidmFyIF9fdCxfX3A9JycsX19qPUFycmF5LnByb3RvdHlwZS5qb2luLFwiICtcbiAgICAgIFwicHJpbnQ9ZnVuY3Rpb24oKXtfX3ArPV9fai5jYWxsKGFyZ3VtZW50cywnJyk7fTtcXG5cIiArXG4gICAgICBzb3VyY2UgKyAncmV0dXJuIF9fcDtcXG4nO1xuXG4gICAgdHJ5IHtcbiAgICAgIHZhciByZW5kZXIgPSBuZXcgRnVuY3Rpb24oc2V0dGluZ3MudmFyaWFibGUgfHwgJ29iaicsICdfJywgc291cmNlKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBlLnNvdXJjZSA9IHNvdXJjZTtcbiAgICAgIHRocm93IGU7XG4gICAgfVxuXG4gICAgdmFyIHRlbXBsYXRlID0gZnVuY3Rpb24oZGF0YSkge1xuICAgICAgcmV0dXJuIHJlbmRlci5jYWxsKHRoaXMsIGRhdGEsIF8pO1xuICAgIH07XG5cbiAgICAvLyBQcm92aWRlIHRoZSBjb21waWxlZCBzb3VyY2UgYXMgYSBjb252ZW5pZW5jZSBmb3IgcHJlY29tcGlsYXRpb24uXG4gICAgdmFyIGFyZ3VtZW50ID0gc2V0dGluZ3MudmFyaWFibGUgfHwgJ29iaic7XG4gICAgdGVtcGxhdGUuc291cmNlID0gJ2Z1bmN0aW9uKCcgKyBhcmd1bWVudCArICcpe1xcbicgKyBzb3VyY2UgKyAnfSc7XG5cbiAgICByZXR1cm4gdGVtcGxhdGU7XG4gIH07XG5cbiAgLy8gQWRkIGEgXCJjaGFpblwiIGZ1bmN0aW9uLiBTdGFydCBjaGFpbmluZyBhIHdyYXBwZWQgVW5kZXJzY29yZSBvYmplY3QuXG4gIF8uY2hhaW4gPSBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBfKG9iaik7XG4gICAgaW5zdGFuY2UuX2NoYWluID0gdHJ1ZTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH07XG5cbiAgLy8gT09QXG4gIC8vIC0tLS0tLS0tLS0tLS0tLVxuICAvLyBJZiBVbmRlcnNjb3JlIGlzIGNhbGxlZCBhcyBhIGZ1bmN0aW9uLCBpdCByZXR1cm5zIGEgd3JhcHBlZCBvYmplY3QgdGhhdFxuICAvLyBjYW4gYmUgdXNlZCBPTy1zdHlsZS4gVGhpcyB3cmFwcGVyIGhvbGRzIGFsdGVyZWQgdmVyc2lvbnMgb2YgYWxsIHRoZVxuICAvLyB1bmRlcnNjb3JlIGZ1bmN0aW9ucy4gV3JhcHBlZCBvYmplY3RzIG1heSBiZSBjaGFpbmVkLlxuXG4gIC8vIEhlbHBlciBmdW5jdGlvbiB0byBjb250aW51ZSBjaGFpbmluZyBpbnRlcm1lZGlhdGUgcmVzdWx0cy5cbiAgdmFyIHJlc3VsdCA9IGZ1bmN0aW9uKGluc3RhbmNlLCBvYmopIHtcbiAgICByZXR1cm4gaW5zdGFuY2UuX2NoYWluID8gXyhvYmopLmNoYWluKCkgOiBvYmo7XG4gIH07XG5cbiAgLy8gQWRkIHlvdXIgb3duIGN1c3RvbSBmdW5jdGlvbnMgdG8gdGhlIFVuZGVyc2NvcmUgb2JqZWN0LlxuICBfLm1peGluID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgXy5lYWNoKF8uZnVuY3Rpb25zKG9iaiksIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHZhciBmdW5jID0gX1tuYW1lXSA9IG9ialtuYW1lXTtcbiAgICAgIF8ucHJvdG90eXBlW25hbWVdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhcmdzID0gW3RoaXMuX3dyYXBwZWRdO1xuICAgICAgICBwdXNoLmFwcGx5KGFyZ3MsIGFyZ3VtZW50cyk7XG4gICAgICAgIHJldHVybiByZXN1bHQodGhpcywgZnVuYy5hcHBseShfLCBhcmdzKSk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9O1xuXG4gIC8vIEFkZCBhbGwgb2YgdGhlIFVuZGVyc2NvcmUgZnVuY3Rpb25zIHRvIHRoZSB3cmFwcGVyIG9iamVjdC5cbiAgXy5taXhpbihfKTtcblxuICAvLyBBZGQgYWxsIG11dGF0b3IgQXJyYXkgZnVuY3Rpb25zIHRvIHRoZSB3cmFwcGVyLlxuICBfLmVhY2goWydwb3AnLCAncHVzaCcsICdyZXZlcnNlJywgJ3NoaWZ0JywgJ3NvcnQnLCAnc3BsaWNlJywgJ3Vuc2hpZnQnXSwgZnVuY3Rpb24obmFtZSkge1xuICAgIHZhciBtZXRob2QgPSBBcnJheVByb3RvW25hbWVdO1xuICAgIF8ucHJvdG90eXBlW25hbWVdID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgb2JqID0gdGhpcy5fd3JhcHBlZDtcbiAgICAgIG1ldGhvZC5hcHBseShvYmosIGFyZ3VtZW50cyk7XG4gICAgICBpZiAoKG5hbWUgPT09ICdzaGlmdCcgfHwgbmFtZSA9PT0gJ3NwbGljZScpICYmIG9iai5sZW5ndGggPT09IDApIGRlbGV0ZSBvYmpbMF07XG4gICAgICByZXR1cm4gcmVzdWx0KHRoaXMsIG9iaik7XG4gICAgfTtcbiAgfSk7XG5cbiAgLy8gQWRkIGFsbCBhY2Nlc3NvciBBcnJheSBmdW5jdGlvbnMgdG8gdGhlIHdyYXBwZXIuXG4gIF8uZWFjaChbJ2NvbmNhdCcsICdqb2luJywgJ3NsaWNlJ10sIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICB2YXIgbWV0aG9kID0gQXJyYXlQcm90b1tuYW1lXTtcbiAgICBfLnByb3RvdHlwZVtuYW1lXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHJlc3VsdCh0aGlzLCBtZXRob2QuYXBwbHkodGhpcy5fd3JhcHBlZCwgYXJndW1lbnRzKSk7XG4gICAgfTtcbiAgfSk7XG5cbiAgLy8gRXh0cmFjdHMgdGhlIHJlc3VsdCBmcm9tIGEgd3JhcHBlZCBhbmQgY2hhaW5lZCBvYmplY3QuXG4gIF8ucHJvdG90eXBlLnZhbHVlID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3dyYXBwZWQ7XG4gIH07XG5cbiAgLy8gUHJvdmlkZSB1bndyYXBwaW5nIHByb3h5IGZvciBzb21lIG1ldGhvZHMgdXNlZCBpbiBlbmdpbmUgb3BlcmF0aW9uc1xuICAvLyBzdWNoIGFzIGFyaXRobWV0aWMgYW5kIEpTT04gc3RyaW5naWZpY2F0aW9uLlxuICBfLnByb3RvdHlwZS52YWx1ZU9mID0gXy5wcm90b3R5cGUudG9KU09OID0gXy5wcm90b3R5cGUudmFsdWU7XG5cbiAgXy5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gJycgKyB0aGlzLl93cmFwcGVkO1xuICB9O1xuXG4gIC8vIEFNRCByZWdpc3RyYXRpb24gaGFwcGVucyBhdCB0aGUgZW5kIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQU1EIGxvYWRlcnNcbiAgLy8gdGhhdCBtYXkgbm90IGVuZm9yY2UgbmV4dC10dXJuIHNlbWFudGljcyBvbiBtb2R1bGVzLiBFdmVuIHRob3VnaCBnZW5lcmFsXG4gIC8vIHByYWN0aWNlIGZvciBBTUQgcmVnaXN0cmF0aW9uIGlzIHRvIGJlIGFub255bW91cywgdW5kZXJzY29yZSByZWdpc3RlcnNcbiAgLy8gYXMgYSBuYW1lZCBtb2R1bGUgYmVjYXVzZSwgbGlrZSBqUXVlcnksIGl0IGlzIGEgYmFzZSBsaWJyYXJ5IHRoYXQgaXNcbiAgLy8gcG9wdWxhciBlbm91Z2ggdG8gYmUgYnVuZGxlZCBpbiBhIHRoaXJkIHBhcnR5IGxpYiwgYnV0IG5vdCBiZSBwYXJ0IG9mXG4gIC8vIGFuIEFNRCBsb2FkIHJlcXVlc3QuIFRob3NlIGNhc2VzIGNvdWxkIGdlbmVyYXRlIGFuIGVycm9yIHdoZW4gYW5cbiAgLy8gYW5vbnltb3VzIGRlZmluZSgpIGlzIGNhbGxlZCBvdXRzaWRlIG9mIGEgbG9hZGVyIHJlcXVlc3QuXG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoJ3VuZGVyc2NvcmUnLCBbXSwgZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gXztcbiAgICB9KTtcbiAgfVxufS5jYWxsKHRoaXMpKTtcbiJdfQ==
