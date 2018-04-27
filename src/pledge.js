'use strict';
/*----------------------------------------------------------------
Promises Workshop: build the pledge.js ES6-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:

function $Promise(executor) {
	//this context is promise
	this._state = 'pending';
	this._value;

	this._handlerGroups = []
	this._internalResolve = function(value) {
		if (!this._value && this._state === 'pending') {
			this._value = value;
			this._state = 'fulfilled';
		}
	};
	this._internalReject = function(value) {
		if (!this._value && this._state === 'pending') {
			this._value = value;
			this._state = 'rejected';
		}
	};

	if (typeof executor !== 'function') {
		throw new TypeError('executor or function is not defined');
	}

	executor(
		resolve => {
			this._internalResolve(resolve);
		},
		reject => {
			this._internalReject(reject);
		}
	);

	this.then = (successCb, errorCb)=>{
		if (typeof successCb !== 'function'){
			successCb = null;
		}
		if (typeof errorCb !== 'function'){
			errorCb = null;
		}
		this._handlerGroups.push({
			successCb: successCb,
			errorCb: errorCb
		});
		this._callHandlers()
		// console.log('5: ', this._handleGroups[0])
		// console.log(this._handleGroups[0].errorCb);
	};
}

$Promise.prototype._callHandlers = ()=>{
	if(this._state === 'fulfilled'){
		let current = this._handlerGroups.shift()
		current.successCb()
	}
	if(this._state === 'rejected'){
		let current = this._handlerGroups.shift()
		current.errorCb()
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
