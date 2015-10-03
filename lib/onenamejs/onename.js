var onenameAPI = require('onename-api'),
    OnenameClient = onenameAPI.OnenameClient
/*var OnenameAPI = function() {
	this.hello = function() {
		console.log("Hello world");
		return;
	};
};
module.exports = Test;
*/
OnenameAPI.prototype.hello = function() {
	console.log("Hello world");
}
