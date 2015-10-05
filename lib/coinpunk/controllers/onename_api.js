var controller = require('./controller.js');
var hasprop = require('hasprop'),
    request = require('request'),
    test = require('tape')

var OnenameController = function (root, express, appID, appSecret) {
	var that = this;

	// Set up RESTful routes.
	express.post(root, this._create.bind(this));
	express.put(root, this._update.bind(this));
	express.delete(root, this._delete.bind(this));
	this.appID = appID;
    this.appSecret = appSecret;
    this.baseURL = 'https://api.onename.com/v1';
};

// Inherit from Controller.
OnenameController.prototype = new controller.Controller();
OnenameController.prototype.constructor = OnenameController;

OnenameController.prototype._authHeader = function() {
    var credentialsBuffer = new Buffer(this.appID + ':' + this.appSecret),
        authorizationHeader = 'Basic ' + credentialsBuffer.toString('base64')
    return authorizationHeader
};

OnenameController.prototype._getRequest = function(url, callback) {
    request({
        url: url,
        headers: {'Authorization': this._authHeader()}
    }, function(error, response, body) {
        if (error) {
            callback(error)
        } else if (response.statusCode !== 200) {
            body = JSON.parse(body)
            if (hasprop(body, 'error')) {
                callback(body.error)
            } else {
                callback('unknown error with status code: ' + response.statusCode)
            }
        } else {
            body = JSON.parse(body)
            callback(null, body)
        }
    })
};

OnenameController.prototype._postRequest = function(url, payload, callback) {
    request({
        url: url,
        method: 'POST',
        json: payload,
        headers: {'Authorization': this._authHeader()}
    }, function(error, response, body) {
        if (error) {
            callback(error)
        } else if (response.statusCode !== 200) {
            body = JSON.parse(body)
            if (hasprop(body, 'error')) {
                callback(body.error)
            } else {
                callback('unknown error with status code: ' + response.statusCode)
            }
        } else {
            body = JSON.parse(body)
            callback(null, body)
        }
    })
};

OnenameController.prototype._getUsers = function(usernames, callback) {
    var url = this.baseURL + '/users/' + usernames.join(',')
    this._getRequest(url, callback)
};

OnenameController.prototype._create = function(req, res) {
	console.log("Onename controller created.");
	var usernames = ['fredwilson'];
	this._getUsers(usernames, function(err, users) {
	    console.log(users)
		res.send({'users': users});
	})
};

// Exports
module.exports.OnenameController = OnenameController;
