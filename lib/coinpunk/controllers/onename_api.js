var controller = require('./controller.js');

var OnenameController = function (root, express) {
	var that = this;

	// Set up RESTful routes.
	express.post(root, this._create.bind(this));
	express.put(root, this._update.bind(this));
	express.delete(root, this._delete.bind(this));
};

// Inherit from Controller.
OnenameController.prototype = new controller.Controller();
OnenameController.prototype.constructor = OnenameController;

OnenameController.prototype._create = function(req, res) {
	console.log("Onename controller created.");
	res.send({"Hello": "Hello world"});
};

// Exports
module.exports.OnenameController = OnenameController;
