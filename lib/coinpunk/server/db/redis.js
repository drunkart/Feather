var DB = require('../db');
var crypto = require('crypto');

if(process.env.NODE_ENV == 'test')
  var redis = require('redis-mock');
else
  var redis = require('redis');

function ArgumentError(message) {
  this.name = 'ArgumentError';
  this.message = message || 'missing arguments';
}

ArgumentError.prototype = new Error();
ArgumentError.prototype.constructor = ArgumentError;

DB.prototype = {
  connect: function() {
    this.redis = redis.createClient(null, null);
  },

  getWalletRecord: function(serverKey, callback) {
    this.redis.hgetall(serverKey, function(err, payload) {
      if(err)
        return callback(err);
      callback(undefined, payload);
    });
  },

  sessionKeyValid: function(serverKey, sessionKey, callback) {
    this.getSessionKey(serverKey, function(err, dbKey) {
      if(dbKey && sessionKey == dbKey)
        return callback(undefined, true);
      callback(undefined, false);
    });
  },

  getSessionKey: function(serverKey, callback) {
    this.redis.hget(serverKey, 'sessionKey', function(err, res) {
      if(err)
        return callback(err);
      callback(undefined, res);
    });
  },

  generateSessionKey: function(serverKey, callback) {
    var self = this;
    crypto.randomBytes(24, function(ex, buf) {
      var token = buf.toString('hex');
      self.redis.hset(serverKey, 'sessionKey', token, function(err, res) {
        if(err)
          return callback(err);
        callback(undefined, token);
      });
    });
  },

  setAuthKey: function(serverKey, authKey, callback) {
    this.redis.hset(serverKey, 'authKey', authKey, function(err, res) {
      if(err)
        return callback(err);
      callback(undefined, true);
    });
  },

  disableAuthKey: function(serverKey, callback) {
    this.redis.hdel(serverKey, 'authKey', function(err, res) {
      if(err)
        return callback(err);
      callback(undefined, true);
    });
  },

  getWallet: function(serverKey, callback) {
    this.getWalletRecord(serverKey, function(err, payload) {
      if(err)
        return callback(err);
      if(!payload)
        return callback(undefined, null);

      callback(undefined, payload.wallet);
    });
  },

  set: function(serverKey, address, payload, callback) {
    var self = this;

    if(!payload || (payload && !payload.wallet))
      callback('missing wallet payload');

    this.redis.hgetall(serverKey, function(err, res) {
      if(err)
        return callback('database error: '+err);

      if(payload.newPayloadHash) {
          payload.payloadHash = payload.newPayloadHash;
      }

      delete payload.originalPayloadHash;
      delete payload.newPayloadHash;

      if(address) {
          payload.address = address;
      }
      self.redis.hmset(serverKey, payload, callback);
    });

  },

  delete: function(serverKey, callback) {
    this.redis.del(serverKey, function(err, res) {
      if(err)
        callback(err);

      if(res == 1)
        callback(undefined, true);
      else
        callback(undefined, false);
    });
  },

  checkEmailExists: function(email, callback) {
    var email = email.toString().toLowerCase();
    var self = this;
    this.redis.keys('*', function(err, serverKeys) {
      if(err)
        return callback(err);

      for(var k=0;k<serverKeys.length;k++)
        self.redis.hmget(serverKeys[k], 'email', function(err, res) {
          if(err)
            return callback(err);
          if(res.toString().toLowerCase() == email)
            return callback(undefined, true)
        });

      callback(undefined, false)
    });
  },

  saveMessage: function(data, callback) {
      this.redis.hmset(data.body.txid, {message: data.body.message}, callback)
  },

  getMessage: function(txid, callback) {
      this.redis.hmget(txid, 'message', function(error, response) {
          if (error) {
              return callback(error)
          }
          else if (response) {
              return callback(response)
          }
          else {
              return callback(null)
          }
      })
  },

  emailtoFTC: function(email, callback) {
      var email = email.toString().toLowerCase(),
          self = this
      this.redis.keys('*', function(err, serverKeys) {
        if(err) {
            return callback(err)
        }
        for(var k=0;k<serverKeys.length;k++) {
            var serverKey = serverKeys[k]
            self.redis.hmget(serverKey, 'email', 'address', function(err, res) {
                if(err) {
                    return callback(err)
                } else if (res[0]) {
                    if(res[0].toString().toLowerCase() == email) {
                        return callback(undefined, res[1])
                    }
                }
            });
        }
      });
  }
};

module.exports = DB;
