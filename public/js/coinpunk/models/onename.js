coinpunk.Onename = function() {
	var onenameAPI = new OnenameAPI(),
		onenameClient = onenameAPI.OnenameClient

	onenameClient.getUsers(['fredwilson', 'naval'], function(err, data) {
	})
};
