const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  
  sequelize.define('users', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, 
      allowNull: false,
      primaryKey: true
    },
   
  });
};
