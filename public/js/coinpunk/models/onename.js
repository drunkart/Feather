coinpunk.Onename = function() {
	this.network = coinpunk.config.network || 'prod';
	this._OnenameClient = Bitcoin.OnenameAPI.OnenameClient;
	this._AppID = 'e6ae48efb4a458514b70c026707b2a99';
	this._AppKey = 'f7fe13045c84ea4adc5a734d22d4d4463e4a59b2a9510bc9df0aaf3cd9975dbb';
	this._onenameClient = new this._OnenameClient(this._AppID, this._AppKey);

	this.findEmail = function(email) {
		var usernames = ['fredwilson']
		this._onenameClient.getUsers(usernames, function(err, users) {
			console.log(err)
			console.log("Data %s", users)
		})
	};
};
