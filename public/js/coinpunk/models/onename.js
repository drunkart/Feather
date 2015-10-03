coinpunk.Onename = function() {
	/*var onenameAPI = new OnenameAPI.Test();
	onenameAPI.hello();*/
	OnenameAPI.hello();
	this.hello = function() {
		console.log("Hello world");
		return;
	};
};
