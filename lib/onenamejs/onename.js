var onenameAPI = require('onename-api'),
	test = require('tape'),
	hasprop = require('hasprop'),
    OnenameClient = onenameAPI.OnenameClient
var Test = function() {
	this.hello = function() {
		console.log("Hello world");
		return;
	};
};
module.exports = Test;
