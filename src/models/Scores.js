const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  
  sequelize.define('scores', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, 
      allowNull: false,
      primaryKey: true
    },
  });

};
