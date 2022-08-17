const {DataTypes, db} = require('../db');

const Cheese = db.define('cheese', {
  title: DataTypes.STRING,
  description: DataTypes.STRING,
});

module.exports = {Cheese};