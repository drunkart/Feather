var onenameAPI = require('onename-api')
	/*test = require('tape'),
	hasprop = require('hasprop'),
	app_id = 'e6ae48efb4a458514b70c026707b2a99',
	app_secret = 'f7fe13045c84ea4adc5a734d22d4d4463e4a59b2a9510bc9df0aaf3cd9975dbb',
    OnenameClient = onenameAPI.OnenameClient

onenameClient = new OnenameClient(app_id, app_secret)*/

var Onename = function () {
	//FindEmail function will return true if email found & false if email not found in onename database
	this.FindEmail = function(email) {
		/*test('Search Users', function(t) {
		    t.plan(1)

		    var username = [email]

		    //Search existing user
		    onenameClient.searchUsers(username[0], function(err, user) {
		        t.ok(user)
		        if(user)
		            return true
		        else
		            return false
		    })
		})*/
		return false
	};

	//createAccount will create account if email not found in onename database
	/*this.createAccount = function () {

	};*/

	//todo : if email found in onename database and not found in local database
};

module.exports = Onename
