const {DataTypes, db} = require('../db');

const Board = db.define('board', {
  type: DataTypes.STRING,
  description: DataTypes.STRING,
  rating: DataTypes.INTEGER,
});

module.exports = {Board};