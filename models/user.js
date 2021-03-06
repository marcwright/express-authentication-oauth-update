'use strict';

var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid email address'
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 99],
          msg: 'Name must be between 1 and 99 characters'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8, 99],
          msg: 'Password must be between 8 and 99 characters'
        }
      }
    },
    facebookId: DataTypes.STRING,
    facebookToken: DataTypes.STRING,
    facebookPic: DataTypes.STRING
  // }, {
    // hooks: {
    //   beforeCreate: function(createdUser, options, cb) {
    //     if (!createdUser.password) return cb(null, createdUser);
    //     var hash = bcrypt.hashSync(createdUser.password, 10);
    //     createdUser.password = hash;
    //     cb(null, createdUser);
    //   }
    // },
    // instanceMethods: {
    //   validPassword: function(password) {
    //     return bcrypt.compareSync(password, this.password);
    //   },
    //   toJSON: function() {
    //     var jsonUser = this.get();
    //     delete jsonUser.password;
    //     return jsonUser;
    //   }
    // }
  });

  user.beforeCreate(function(createdUser, options) {
    if (!createdUser.password) { return null }
    var hash = bcrypt.hashSync(createdUser.password, 10);
    createdUser.password = hash;
    return createdUser;
  })

  user.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  }

  user.prototype.toJSON = function() {
    var jsonUser = this.get();
    delete jsonUser.password;
    return jsonUser;
  }

  return user;
};
