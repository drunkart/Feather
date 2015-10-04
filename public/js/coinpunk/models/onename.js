coinpunk.Onename = function() {
	this.network = coinpunk.config.network || 'prod';

	this.findEmail = function(email) {
		var Client = new Bitcoin.OnenameAPI.OnenameClient('e6ae48efb4a458514b70c026707b2a99', 'f7fe13045c84ea4adc5a734d22d4d4463e4a59b2a9510bc9df0aaf3cd9975dbb'),
			usernames = ['fredwilson']
		Client.getUsers(usernames, function(err, users) {
			console.log("Data %s", users)
		})
	};
};
