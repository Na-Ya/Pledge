'use strict';
/*----------------------------------------------------------------
Promises Workshop: build the pledge.js ES6-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:

function $Promise(executor) {
	if (typeof executor !== 'function') {
		throw new TypeError('executor or function is not defined');
	}
	this._state = 'pending';
	this._value;
	this._handlerGroups = [];

	this.then = (successCb, errorCb) => {
		if (typeof successCb !== 'function') {
			successCb = null;
		}
		if (typeof errorCb !== 'function') {
			errorCb = null;
		}
		this._handlerGroups.push({
			successCb: successCb,
			errorCb: errorCb
		});
		this._callHandlers(this._value);
	};

	this._internalResolve = function(value) {
		if (!this._value && this._state === 'pending') {
			this._value = value;
            this._state = 'fulfilled';
            this._callHandlers(this._value);
		}
	};
	this._internalReject = function(value) {
		if (!this._value && this._state === 'pending') {
			this._value = value;
            this._state = 'rejected';
		}
	};

	executor(
		resolve => {
			this._internalResolve(resolve);
		},
		reject => {
			this._internalReject(reject);
		}
	);
}

$Promise.prototype._callHandlers = function(value) {
	this._handlerGroups.forEach((obj, index) => {
		if (obj) {
			if (this._state === 'fulfilled') {
				obj.successCb(value);
				this._handlerGroups.splice(index, 1);
			} else if (this._state === 'rejected') {
				obj.errorCb(value);
				this._handlerGroups.splice(index, 1);
			}
		}
	});
};

/*-------------------------------------------------------
The spec was designed to work with Test'Em, so we don't
actually use module.exports. But here it is for reference:

module.exports = $Promise;

So in a Node-based project we could write things like this:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
