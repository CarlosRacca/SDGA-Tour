const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  
  sequelize.define('Users', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, 
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    matricula: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    }
  });
};
