'use strict';
/*----------------------------------------------------------------
Promises Workshop: build the pledge.js ES6-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:

function $Promise (executor) {
//this context is promise
    this._state = 'pending';
    this._value;

    this._internalResolve = function(value){
        if (!this._value && this._state === 'pending'){
            this._value = value;
            this._state = 'fulfilled';
        }
    };
    this._internalReject = function(value){
        if (!this._value && this._state === 'pending'){
            this._value = value;
            this._state = 'rejected';
        }
    };

    if (typeof executor !== 'function'){
        throw new TypeError('executor or function is not defined');
    }
}






/*-------------------------------------------------------
The spec was designed to work with Test'Em, so we don't
actually use module.exports. But here it is for reference:

module.exports = $Promise;

So in a Node-based project we could write things like this:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
