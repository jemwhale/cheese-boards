const {DataTypes, db} = require('../db');

const User = db.define('user', {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
});

module.exports = {User};