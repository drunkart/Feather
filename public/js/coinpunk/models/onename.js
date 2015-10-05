coinpunk.Onename = function() {
	this.network = coinpunk.config.network || 'prod';
	var OnenameClient = Bitcoin.OnenameAPI.OnenameClient,
		AppID = 'e6ae48efb4a458514b70c026707b2a99',
		AppKey = 'f7fe13045c84ea4adc5a734d22d4d4463e4a59b2a9510bc9df0aaf3cd9975dbb',
		onenameClient = new OnenameClient(AppID, AppKey);

	this.findEmail = function(email) {
		var usernames = ['fredwilson']
		onenameClient.getUsers(usernames, function(err, users) {
			console.log("Error %s", err)
			console.log("Data %s", users)
		})
	};
};
