const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  
  sequelize.define('Dates', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, 
      allowNull: false,
      primaryKey: true
    },
    day: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    exceptional: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }

  });
};