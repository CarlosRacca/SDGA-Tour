const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  
  sequelize.define('Scores', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, 
      allowNull: false,
      primaryKey: true
    },
    front_nine: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    back__nine: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    handicap: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });

};
