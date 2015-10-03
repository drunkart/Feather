var OnenameController = function () {
	console.log("Hello world!!");
};

// Inherit from Controller.
OnenameController.prototype = new controller.Controller();
OnenameController.prototype.constructor = OnenameController;
