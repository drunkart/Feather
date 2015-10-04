function OnenameClient() {
    this.appID = 'e6ae48efb4a458514b70c026707b2a99'
    this.appSecret = 'f7fe13045c84ea4adc5a734d22d4d4463e4a59b2a9510bc9df0aaf3cd9975dbb'
    this.baseURL = 'https://api.onename.com/v1'
}

OnenameClient.prototype.hello = function() {
    console.log("Hello woirld")
    return
}

module.exports = {
    OnenameClient: OnenameClient
}
