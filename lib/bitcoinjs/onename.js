var hasprop = require('hasprop');
function OnenameClient(appID, appSecret) {
    this.appID = appID
    this.appSecret = appSecret
    this.baseURL = 'https://api.onename.com/v1'
}

OnenameClient.prototype.hello = function() {
    console.log("Hello woirld")
    return
}

module.exports = {
    OnenameClient: OnenameClient
}
